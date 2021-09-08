import clsx from 'clsx';

import { AppBar } from '@/components/AppBar';
import { Media } from '@/components/media';
import { TableOfContents } from '@/components/TableOfContents';
import { useJupyterBookData } from '@/context/jupyterBook';

import styles from './App.module.scss';

function InPageTableOfContents() {
  const { pageHeaders } = useJupyterBookData();
  return <TableOfContents headers={pageHeaders} />;
}

function Content() {
  const { pageTitle, pageBodyHtml } = useJupyterBookData();

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
        <p>Global TOC placeholder</p>
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

        {/* In page table of content that renders above the main content. */}
        <Media lessThan="screen-1425">
          <div className="my-6">
            <InPageTableOfContents />
          </div>
        </Media>

        {/* Page content */}
        <div
          className={clsx('prose max-w-full', styles.content)}
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
