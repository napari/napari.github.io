import { createContext, ReactNode, useContext } from 'react';

export interface TOCHeader {
  children?: string[];
  href: string;
  level?: number;
  text: string;
}

/**
 * Deserialized Jupyter Book data from the DOM.
 */
export interface JupyterBookState {
  /**
   * List of TOC headers used for the current page content.
   */
  pageHeaders: TOCHeader[];

  /**
   * Title for the H1 tag on the page.
   */
  pageTitle: string;

  /**
   * HTML string of the page body.
   */
  pageBodyHtml: string;

  /**
   * A dictionary of all global headers mapped by the header ID (in this case,
   * the link href).
   *
   * Additionally, each global header defines a `children` property where the
   * value is an array of string IDs for other headers. Organizing the data this
   * way is known as "data normalization", and is useful for reducing deeply
   * nested data structures into a flatter data structure:
   * https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
   *
   */
  globalHeaders: Record<string, TOCHeader>;

  /**
   * An array of the top-most headers in order of appearance on the DOM.
   */
  rootGlobalHeaders: string[];
}

const JupyterBookContext = createContext<JupyterBookState>({
  pageHeaders: [],
  pageBodyHtml: '',
  pageTitle: '',
  globalHeaders: {},
  rootGlobalHeaders: [],
});

interface Props extends JupyterBookState {
  children: ReactNode;
}

/**
 * Provider for accessing Jupyter Book data. The provider also accepts props so
 * that the pre-renderer can render the application to an HTML string.
 */
export function JupyterBookProvider({ children, ...state }: Props) {
  return (
    <JupyterBookContext.Provider value={state}>
      {children}
    </JupyterBookContext.Provider>
  );
}

export function useJupyterBookData() {
  return useContext(JupyterBookContext);
}
