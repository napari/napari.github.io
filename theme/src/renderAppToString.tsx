import { renderToString } from 'react-dom/server';

import { App } from '@/components/App';
import { JupyterBookProvider, JupyterBookState } from '@/context/jupyterBook';

export function renderAppToString(sphinx: JupyterBookState): string {
  return renderToString(
    <JupyterBookProvider {...sphinx}>
      <App />
    </JupyterBookProvider>,
  );
}
