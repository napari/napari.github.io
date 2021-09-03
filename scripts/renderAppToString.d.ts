import { mediaStyles } from '@/components/media';
import { getGlobalHeaders, JupyterBookState } from '@/context/jupyterBook';

export {
  /**
   * Export `getGlobalHeaders` so that the pre-renderer can reuse the DFS based
   * algorithm for getting the global headers.
   */
  getGlobalHeaders,
  /**
   * Export `mediaStyles` so that it can be pre-rendered into the HTML.
   */
  mediaStyles,
};

/**
 * Renders the application as an HTML string for pre-rendering.
 *
 * @param state Jupyter Book state.
 * @returns The rendered app as a string.
 */
export declare function renderAppToString(state: JupyterBookState): string;
