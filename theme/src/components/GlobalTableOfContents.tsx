import clsx from 'clsx';

import { GlobalHeader, useJupyterBookData } from '@/context/jupyterBook';

const LEVEL_CLASSES = ['ml-0', 'ml-2', 'ml-4', 'ml-6', 'ml-8', 'ml-10'];

export function GlobalTableOfContents() {
  const { globalHeaders, rootGlobalHeaders } = useJupyterBookData();

  function render({ children, href, level, text }: GlobalHeader) {
    return (
      <li className={clsx('mt-2 mb-2', LEVEL_CLASSES[level])} key={href}>
        <a href={href}>{text}</a>
        <ul>{children.map((child) => render(globalHeaders[child]))}</ul>
      </li>
    );
  }

  return (
    <ul>{rootGlobalHeaders.map((header) => render(globalHeaders[header]))}</ul>
  );
}
