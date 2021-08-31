import 'modern-normalize/modern-normalize.css';
import '@/scss/tailwind.scss';
import '@/scss/main.scss';

import clsx from 'clsx';

import { AppBar } from '@/components/AppBar';
import { useJupyterBookData } from '@/context/jupyterBook';

import styles from './App.module.scss';

function Content() {
  const { pageBodyHtml } = useJupyterBookData();

  return (
    <div className="grid grid-cols-napari-5 justify-center gap-6 screen-495:gap-12">
      <div />

      <div
        className={clsx(
          'col-start-2 col-span-3 prose max-w-full',
          styles.content,
        )}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: pageBodyHtml }}
      />

      <div />
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
