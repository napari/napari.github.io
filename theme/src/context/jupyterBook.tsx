import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import slug from 'slug';

import { TOCHeader } from '@/components/TableOfContents';

export interface GlobalHeader {
  children: string[];
  href: string;
  level: number;
  text: string;
}

export interface JupyterBookState {
  contentHeaders: TOCHeader[];
  contentHTML: string;
  globalHeaders: Record<string, GlobalHeader>;
  rootGlobalHeaders: string[];
}

const JupyterBookContext = createContext<JupyterBookState>({
  contentHeaders: [],
  contentHTML: '',
  globalHeaders: {},
  rootGlobalHeaders: [],
});

interface Props extends Partial<JupyterBookState> {
  children: ReactNode;
}

function useContentHTML(propContentHTML?: string) {
  const [contentHTML, setContentHTML] = useState(propContentHTML ?? '');

  useEffect(() => {
    if (propContentHTML) {
      return;
    }

    const html = document.querySelector('#content-body')?.innerHTML ?? '';
    if (html) {
      setContentHTML(html);
    }
  }, [propContentHTML]);

  return { contentHTML };
}

function useContentHeaders(propContentHeaders?: TOCHeader[]) {
  const [contentHeaders, setContentHeaders] = useState(
    propContentHeaders ?? [],
  );

  useEffect(() => {
    if (propContentHeaders) {
      return;
    }

    const linkNodes = Array.from(
      document.querySelectorAll('#content-toc > ul > li > ul > li > a'),
    );

    if (linkNodes.length > 0) {
      setContentHeaders(
        linkNodes.map((node) => ({
          id: slug(node.textContent ?? ''),
          text: node.textContent ?? '',
        })),
      );
    }
  }, [propContentHeaders]);

  return { contentHeaders };
}

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

    interface StackItem {
      level: number;
      node: Element;
      parentId?: string;
    }

    function getTocSelector(level = 1) {
      return `#global-toc .toctree-l${level}`;
    }

    const globalHeadersResult: Record<string, GlobalHeader> = {};
    const rootGlobalHeadersResult: string[] = [];
    const stack: StackItem[] = [];
    const rootNodes = document.querySelectorAll(getTocSelector());

    for (const node of rootNodes) {
      stack.push({
        node,
        level: 1,
      });
    }

    while (stack.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { level, node, parentId } = stack.pop()!;

      const linkNode = node.querySelector('a.reference.internal');
      const linkHref = linkNode?.getAttribute('href');
      const linkText = linkNode?.textContent;

      if (linkHref && linkText) {
        globalHeadersResult[linkHref] = {
          level,
          children: [],
          href: linkHref,
          text: linkText,
        };

        if (level === 1) {
          rootGlobalHeadersResult.push(linkHref);
        }

        if (parentId) {
          globalHeadersResult[parentId].children.push(linkHref);
        }

        const nextLevel = level + 1;
        const nextNodes = node.querySelectorAll(getTocSelector(nextLevel));

        for (const nextNode of nextNodes) {
          stack.push({
            parentId: linkHref,
            level: level + 1,
            node: nextNode,
          });
        }
      }
    }

    // Reverse results because stack pops items in reverse.
    rootGlobalHeadersResult.reverse();
    for (const header of Object.values(globalHeadersResult)) {
      header.children.reverse();
    }

    setGlobalHeaders(globalHeadersResult);
    setRootGlobalHeaders(rootGlobalHeadersResult);
  }, [propGlobalHeaders]);

  return { globalHeaders, rootGlobalHeaders };
}

function useRemoveSphinxData() {
  useEffect(() => {
    document.querySelector('#jupyter-book-data')?.remove();
  }, []);
}

export function JupyterBookProvider({ children, ...props }: Props) {
  const { contentHTML } = useContentHTML(props.contentHTML);
  const { contentHeaders } = useContentHeaders(props.contentHeaders);
  const { globalHeaders, rootGlobalHeaders } = useGlobalHeaders(
    props.globalHeaders,
    props.rootGlobalHeaders,
  );
  useRemoveSphinxData();

  const jupyterBookData = {
    contentHeaders,
    contentHTML,
    globalHeaders,
    rootGlobalHeaders,
  };

  return (
    <JupyterBookContext.Provider value={jupyterBookData}>
      {children}
    </JupyterBookContext.Provider>
  );
}

export function useJupyterBookData() {
  return useContext(JupyterBookContext);
}
