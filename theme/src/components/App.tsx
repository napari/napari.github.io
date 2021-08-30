import 'modern-normalize/modern-normalize.css';
import '@/scss/tailwind.scss';
import '@/scss/main.scss';

import clsx from 'clsx';

import { TableOfContents } from '@/components/TableOfContents';
import { useJupyterBookData } from '@/context/jupyterBook';

import styles from './App.module.scss';
import { AppBar } from './AppBar';
import { GlobalTableOfContents } from './GlobalTableOfContents';

function Content() {
  const { contentHeaders, contentHTML } = useJupyterBookData();

  return (
    <div className="grid grid-cols-napari-5 justify-center gap-6 screen-495:gap-12">
      <div className="overflow-auto">
        <GlobalTableOfContents />
      </div>

      <div
        className={clsx(
          'col-start-2 col-span-3 prose max-w-full',
          styles.content,
        )}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: contentHTML }}
      />

      <div>
        <TableOfContents headers={contentHeaders} />
      </div>
    </div>
  );
}

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
