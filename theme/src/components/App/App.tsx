import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import slug from 'slug';

import { AppBar } from '@/components/AppBar';
import { Media } from '@/components/media';
import {
  GlobalTableOfContents,
  SubPageTableOfContents,
  TableOfContents,
} from '@/components/TableOfContents';
import { TOCHeader, useJupyterBookData } from '@/context/jupyterBook';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { isExternalUrl } from '@/utils/url';

import styles from './App.module.scss';

/**
 * Hook for determining if the Sub Page TOC is enabled for the current page.
 * This will only be true when the user clicks on a level 1 link.
 */
function useSubPageTocEnabled() {
  const { rootGlobalHeaders } = useJupyterBookData();
  const currentPathname = useCurrentPathname();
  return rootGlobalHeaders.includes(currentPathname);
}

function InPageTableOfContents() {
  const { pageHeaders, globalHeaders } = useJupyterBookData();
  const currentPathname = useCurrentPathname();
  const subPageTocEnabled = useSubPageTocEnabled();
  const sectionHeaders: TOCHeader[] = [];

  // Add headers from the Sub Page TOC if it's enabled.
  if (subPageTocEnabled) {
    const header = globalHeaders[currentPathname];

    for (const childId of header.children ?? []) {
      const childHeader = globalHeaders[childId];

      if ((childHeader.children?.length ?? 0) > 0) {
        const { text } = childHeader;
        const href = slug(text);
        sectionHeaders.push({ href, text });
      }
    }
  }

  return <TableOfContents headers={[...sectionHeaders, ...pageHeaders]} />;
}

function Content() {
  const pageContentRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const isSearch = router.asPath.includes('/search');

  const {
    globalHeaders,
    rootGlobalHeaders,
    pageTitle,
    pageBodyHtml,
    pageFrontMatter: { intro: pageIntro },
  } = useJupyterBookData();
  const currentPathname = useCurrentPathname();
  const subPageTocEnabled = useSubPageTocEnabled();

  useEffect(() => {
    const pageContentNode = pageContentRef.current;
    if (!pageContentNode) {
      return;
    }

    const linkNodes = Array.from(pageContentNode.querySelectorAll('a'));
    for (const link of linkNodes) {
      const href = link.href.replace(window.location.origin, '');
      if (!isExternalUrl(href)) {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          router.push(href);
        });
      }
    }
  }, [router]);

  return (
    <div
      className={clsx(
        'grid grid-cols-3',
        'screen-1150:grid-cols-4 screen-1425:grid-cols-napari-5',

        'justify-center gap-6 screen-495:gap-12',
        'px-6 pt-4 screen-495:px-12 screen-495:pt-9',
      )}
    >
      {/* Global table of contents */}
      <Media greaterThanOrEqual="screen-1150">
        <GlobalTableOfContents
          headers={globalHeaders}
          rootHeaders={rootGlobalHeaders}
        />
      </Media>

      {/* Main content */}
      <div
        className={clsx(
          'col-span-3',
          'screen-1425:col-start-2 screen-1425:col-span-3',
        )}
      >
        {/* Page title */}
        <h1 className="text-5xl font-bold">{pageTitle}</h1>

        {pageIntro && (
          <h2 className="font-semibold text-xs mt-3 screen-875:text-base screen-875:mt-10">
            {pageIntro}
          </h2>
        )}

        {/* In page table of content that renders above the main content. */}
        {!isSearch && (
          <Media lessThan="screen-1425">
            <div className="my-6">
              <InPageTableOfContents />
            </div>
          </Media>
        )}

        {/* In page table of contents that renders a TOC for sub-pages. */}
        {subPageTocEnabled && (
          <SubPageTableOfContents className="mt-6" headerId={currentPathname} />
        )}

        {/* Page content */}
        <div
          ref={pageContentRef}
          className={clsx(
            'prose max-w-full',
            styles.content,
            isSearch && styles.search,
          )}
          // Role is used by the search engine to extract the text content of
          // each page.
          role="main"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: pageBodyHtml }}
        />
      </div>

      {/* In page table of contents that renders to the right of the main content. */}
      <Media greaterThanOrEqual="screen-1425">
        <InPageTableOfContents />
      </Media>
    </div>
  );
}

/**
 * Root application component responsible for rendering the entire napari.org
 * website. This is used by both the client entry and pre-renderer for rendering
 * the application on the client and server.
 */
export function App() {
  return (
    <>
      <AppBar />

      <main className="mt-6">
        <Content />
      </main>
    </>
  );
}
