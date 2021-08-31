import { renderToString } from 'react-dom/server';

import { App } from '@/components/App';
import {
  getGlobalHeaders,
  JupyterBookProvider,
  JupyterBookState,
} from '@/context/jupyterBook';

/**
 * Export getGlobalHeaders so that the pre-renderer can reuse the DFS based
 * algorithm for getting the global headers.
 */
export { getGlobalHeaders };

/**
 * Renders the application as an HTML string for pre-rendering.
 *
 * @param state Jupyter Book state.
 * @returns The rendered app as a string.
 */
export function renderAppToString(state: JupyterBookState): string {
  return renderToString(
    <JupyterBookProvider {...state}>
      <App />
    </JupyterBookProvider>,
  );
}
