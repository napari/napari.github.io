import 'modern-normalize/modern-normalize.css';
import '@/scss/tailwind.scss';
import '@/scss/main.scss';

import clsx from 'clsx';

import { AppBar } from '@/components/AppBar';
import { Media, MediaContextProvider } from '@/components/media';
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
        'screen-875:grid-cols-4 screen-1425:grid-cols-napari-5',

        'justify-center gap-6 screen-495:gap-12',
        'p-6 screen-495:p-12',
      )}
    >
      <Media greaterThanOrEqual="screen-1150">
        <p>Global TOC placeholder</p>
      </Media>

      <div
        className={clsx(
          'col-span-3 screen-1425:col-start-2 screen-1425:col-span-3',
        )}
      >
        <h1 className="text-5xl font-bold">{pageTitle}</h1>

        <Media lessThan="screen-1425">
          <div className="my-6">
            <InPageTableOfContents />
          </div>
        </Media>

        <div
          className={clsx('prose max-w-full', styles.content)}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: pageBodyHtml }}
        />
      </div>

      <Media greaterThanOrEqual="screen-1425">
        <InPageTableOfContents />
      </Media>
    </div>
  );
}

export function App() {
  return (
    <MediaContextProvider>
      <AppBar />

      <main className="mt-6">
        <Content />
      </main>
    </MediaContextProvider>
  );
}
