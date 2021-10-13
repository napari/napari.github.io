import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import slug from 'slug';

import { AppBar } from '@/components/AppBar';
import { Footer } from '@/components/Footer';
import { GlobalTableOfContents } from '@/components/GlobalTableOfContents';
import { Media } from '@/components/media';
import { QuickLinks } from '@/components/QuickLinks';
import {
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
        const href = `#${slug(text)}`;
        sectionHeaders.push({ href, text });
      }
    }
  }

  return (
    <>
      <Media greaterThanOrEqual="screen-1425">
        <TableOfContents headers={[...sectionHeaders, ...pageHeaders]} />
      </Media>

      <Media lessThan="screen-1425">
        <TableOfContents
          headers={[...sectionHeaders, ...pageHeaders]}
          variant="collapsed"
        />
      </Media>
    </>
  );
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
        'screen-1150:grid-cols-napari-4 screen-1425:grid-cols-napari-5',

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
          'col-span-3 mb-6 screen-495:mb-12',
          'screen-1425:col-start-2 screen-1425:col-span-3',

          // Allow overflow for really long content. This can happen for things
          // like long Python class names on the API reference pages.
          'overflow-x-auto',
        )}
      >
        {/* Page title */}
        <h1 className="text-5xl leading-tight font-bold mb-3 screen-875:mb-10">
          {pageTitle}
        </h1>

        {pageIntro && (
          <h2 className="font-semibold text-xs screen-875:text-base">
            {pageIntro}
          </h2>
        )}

        {/* In page table of content that renders above the main content. */}
        {!isSearch && (
          <Media lessThan="screen-1425">
            <InPageTableOfContents />
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

        {/* Render links + descriptions in a grid. */}
        <QuickLinks className="mt-20" />
      </div>

      {/* In page table of contents that renders to the right of the main content. */}
      <Media greaterThanOrEqual="screen-1425">
        <InPageTableOfContents />
      </Media>
    </div>
  );
}

/**
 * Scripts that should load during the `beforeInteractive` stage:
 * https://nextjs.org/docs/basic-features/script
 */
const BEFORE_INTERACTIVE_SCRIPTS = [
  // Everyone and their grandma knows what jQuery is :)
  'jquery.js',

  // JavaScript utility library.
  'underscore.js',

  // Sphinx documentation data used by extensions.
  'documentation_options.js',

  // Utility functions for working with the Sphinx documentation.
  'doctools.js',

  // Language specific data used by `searchtools.js
  'language_data.js',
];

/**
 * Scripts that should only be loaded on the search page.
 */
const SEARCH_SCRIPTS = ['doctools.js', 'language_data.js'];

/**
 * Root application component responsible for rendering the entire napari.org
 * website. This is used by both the client entry and pre-renderer for rendering
 * the application on the client and server.
 */
export function App() {
  const initialLoadRef = useRef(true);
  const router = useRouter();
  const {
    appScripts,
    appStyleSheets,
    pageFrontMatter: { metaDescription, intro },
  } = useJupyterBookData();
  const isSearch = router.asPath.includes('/search');

  useEffect(() => {
    initialLoadRef.current = false;
  }, []);

  return (
    <>
      <Head>
        {/*
          Use `metaDescription` (or `intro` if `undefined`) from frontmatter for
          meta description tag.
        */}
        {(metaDescription || intro) && (
          <meta name="description" content={metaDescription || intro} />
        )}

        {appStyleSheets.map((props) => (
          <link key={props.href} {...props} />
        ))}
      </Head>

      {/*
        Every page emits a node with ID `documentation_options` in the page body
        HTML except for the search page, so we need to render it in React.

        This is used by the `documentation_options.js` script to get the
        document root, which is used by extensions and documentation search.
      */}
      {isSearch && <div id="documentation_options" data-url_root="./" />}

      <div className="min-h-screen flex flex-col">
        <AppBar />

        <main className="mt-6 flex-grow">
          <Content />
        </main>

        <Footer />
      </div>

      {appScripts
        .filter(({ src }) => {
          // Allow all inline scripts.
          if (!src) {
            return true;
          }

          // Filter scripts that are only used on the search page if the user is
          // loading a non-search page.
          return (
            isSearch || SEARCH_SCRIPTS.every((script) => !src.includes(script))
          );
        })
        .map((props) => {
          // Get ID from either the src URL or the JS source if available.
          const id =
            props.src || (props.children && String(props.children)) || '';

          return (
            <Script
              id={id}
              key={id}
              {...props}
              strategy={
                BEFORE_INTERACTIVE_SCRIPTS.some((script) => id.includes(script))
                  ? 'beforeInteractive'
                  : undefined
              }
            >
              {props.children}
            </Script>
          );
        })}
    </>
  );
}
