import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import slug from 'slug';

export interface TOCHeader {
  id: string;
  text: string;
}
export interface GlobalHeader {
  children: string[];
  href: string;
  level: number;
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
  globalHeaders: Record<string, GlobalHeader>;

  /**
   * An array of the top-most headers in order of appearance on the DOM.
   */
  rootGlobalHeaders: string[];
}

const JupyterBookContext = createContext<JupyterBookState>({
  pageHeaders: [],
  pageBodyHtml: '',
  globalHeaders: {},
  rootGlobalHeaders: [],
});

interface Props extends Partial<JupyterBookState> {
  children: ReactNode;
}

function usePageBodyHtml(propPageBodyHtml?: string) {
  const [pageBodyHtml, setPageBodyHtml] = useState(propPageBodyHtml ?? '');

  useEffect(() => {
    if (propPageBodyHtml) {
      return;
    }

    const html = document.querySelector('#page-body')?.innerHTML ?? '';
    if (html) {
      setPageBodyHtml(html);
    }
  }, [propPageBodyHtml]);

  return { pageBodyHtml };
}

function usePageHeaders(propPageHeaders?: TOCHeader[]) {
  const [pageHeaders, setPageHeaders] = useState(propPageHeaders ?? []);

  useEffect(() => {
    if (propPageHeaders) {
      return;
    }

    const linkNodes = Array.from(
      document.querySelectorAll('#page-toc > ul > li > ul > li > a'),
    );

    if (linkNodes.length > 0) {
      setPageHeaders(
        linkNodes.map((node) => ({
          id: slug(node.textContent ?? ''),
          text: node.textContent ?? '',
        })),
      );
    }
  }, [propPageHeaders]);

  return { pageHeaders };
}

interface StackItem<T> {
  level: number;
  node: T;
  parentId?: string;
}

interface LinkData {
  href: string;
  text: string;
}

interface GetGlobalHeadersOptions<T> {
  /**
   * Gets the initial list of TOC tree nodes to parse.
   */
  getRootNodes(): T[];

  /**
   * Gets link data for some link under the given parent node.
   *
   * @param parentNode The parent node.
   */
  getLinkData(parentNode: T): LinkData;

  /**
   * Gets the next level of TOC tree nodes given some parent node and next level.
   *
   * @param parentNode The parent node.
   */
  getNextNodes(parentNode: T, level: number): T[];
}

/**
 * Utility function for getting global header data from a DOM tree. The function
 * is implemented generically enough so that it can be used on the browser and
 * by the pre-renderer. Since the DOM is a tree, we can use Depth First Search
 * to traverse the tree and serialize it into the global headers data
 * structures.
 */
export function getGlobalHeaders<T>({
  getRootNodes,
  getLinkData: getLinkNode,
  getNextNodes,
}: GetGlobalHeadersOptions<T>) {
  const globalHeaders: Record<string, GlobalHeader> = {};
  const rootGlobalHeaders: string[] = [];

  const stack: StackItem<T>[] = getRootNodes().map((node) => ({
    node,
    level: 1,
  }));

  while (stack.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { level, node, parentId } = stack.pop()!;

    const link = getLinkNode(node);

    if (link.href && link.text) {
      globalHeaders[link.href] = {
        level,
        children: [],
        href: link.href,
        text: link.text,
      };

      if (level === 1) {
        rootGlobalHeaders.push(link.href);
      }

      if (parentId) {
        globalHeaders[parentId].children.push(link.href);
      }

      const nextLevel = level + 1;
      const nextNodes = getNextNodes(node, nextLevel);

      for (const nextNode of nextNodes) {
        stack.push({
          parentId: link.href,
          level: level + 1,
          node: nextNode,
        });
      }
    }
  }

  // Reverse header lists because stacks pop items in reverse.
  rootGlobalHeaders.reverse();
  for (const header of Object.values(globalHeaders)) {
    header.children.reverse();
  }

  return {
    globalHeaders,
    rootGlobalHeaders,
  };
}

function getTocSelector(level = 1) {
  return `#global-toc .toctree-l${level}`;
}

/**
 * Hook that gets the global header data if the prop data is not available.
 */
function useGlobalHeaders(
  propGlobalHeaders?: Record<string, GlobalHeader>,
  propRootGlobalHeaders?: string[],
) {
  const [globalHeaders, setGlobalHeaders] = useState(propGlobalHeaders ?? {});
  const [rootGlobalHeaders, setRootGlobalHeaders] = useState(
    propRootGlobalHeaders ?? [],
  );

  useEffect(() => {
    if (propGlobalHeaders) {
      return;
    }

    const result = getGlobalHeaders({
      getRootNodes: () =>
        Array.from(document.querySelectorAll(getTocSelector())),

      getLinkData: (node) => {
        const link = node.querySelector('a.reference.internal');

        return {
          href: link?.getAttribute('href') ?? '',
          text: link?.textContent ?? '',
        };
      },

      getNextNodes: (node, level) =>
        Array.from(node?.querySelectorAll(getTocSelector(level)) ?? []),
    });

    setGlobalHeaders(result.globalHeaders);
    setRootGlobalHeaders(result.rootGlobalHeaders);
  }, [propGlobalHeaders]);

  return { globalHeaders, rootGlobalHeaders };
}

/**
 * Hook that removes the Jupyter Book data from the DOM once it's no longer needed.
 */
function useRemoveSphinxData() {
  useEffect(() => {
    document.querySelector('#jupyter-book-data')?.remove();
  }, []);
}

/**
 * Provider for accessing Jupyter Book data. The provider also accepts props so
 * that the pre-renderer can render the application to an HTML string.
 */
export function JupyterBookProvider({ children, ...props }: Props) {
  const { pageBodyHtml } = usePageBodyHtml(props.pageBodyHtml);
  const { pageHeaders } = usePageHeaders(props.pageHeaders);
  const { globalHeaders, rootGlobalHeaders } = useGlobalHeaders(
    props.globalHeaders,
    props.rootGlobalHeaders,
  );
  useRemoveSphinxData();

  const state: JupyterBookState = {
    pageHeaders,
    pageBodyHtml,
    globalHeaders,
    rootGlobalHeaders,
  };

  return (
    <JupyterBookContext.Provider value={state}>
      {children}
    </JupyterBookContext.Provider>
  );
}

export function useJupyterBookData() {
  return useContext(JupyterBookContext);
}
