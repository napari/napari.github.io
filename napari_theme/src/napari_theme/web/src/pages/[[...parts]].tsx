import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { resolve } from 'path';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';

import { App } from '@/components/App';
import { BUILD_PROD } from '@/constants/env';
import { JupyterBookProvider, JupyterBookState } from '@/context/jupyterBook';
import { getHTMLFiles } from '@/utils/jupyterBook';
import { getPageData } from '@/utils/ssg';

interface Props {
  state: JupyterBookState;
}

/**
 * Build directory relative to the .next directory.
 */
const BUILD_DIR = resolve(__dirname, '../../../../../sphinx');

/**
 * Returns a list of paths to export during pre-rendering:
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const files = await getHTMLFiles();
  const routes = files.map((file) => file.replace(`${BUILD_DIR}/`, ''));
  const paths: GetStaticPathsResult['paths'] = [
    // Index page /.
    {
      params: {
        parts: [],
      },
    },
  ];

  for (const route of routes) {
    // Split route into URL parts.
    paths.push({
      params: {
        parts: route.split('/'),
      },
    });

    // Allow support for `/<path>` given `/<path>/index.html` in development
    // mode. Most web server support both `/<path>` and `/<path>/index.html`,
    // but Next.js needs to have it configured explicitly.
    if (!BUILD_PROD && route.endsWith('/index.html')) {
      paths.push({
        params: {
          parts: route.replace('/index.html', '').split('/').filter(Boolean),
        },
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
}

interface Params extends ParsedUrlQuery {
  parts?: string[];
}

/**
 * Extracts data from the Jupyter Book HTML files for pre-rendering at build time:
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation.
 */
export async function getStaticProps({
  params,
}: GetStaticPropsContext<Params>): Promise<GetStaticPropsResult<Props>> {
  const files = await getHTMLFiles();
  const path = params?.parts?.join('/') ?? '';

  const [file] = files.filter((currentFile): boolean => {
    if (path) {
      return (
        currentFile.endsWith(path) ||
        currentFile.endsWith(`${path}.html`) ||
        currentFile.endsWith(`${path}/index.html`)
      );
    }

    // If path is undefined, then the current page is /.
    return currentFile.replace(BUILD_DIR, '') === '/index.html';
  });
  const state = await getPageData(file);

  return {
    props: {
      state,
    },
  };
}

/**
 * Component for rendering all pages for napari.org.
 */
export default function Page({ state }: Props) {
  const router = useRouter();
  const isSearch = router.asPath.includes('/search');

  // Remove non-JS fallback UI for search page.
  useEffect(() => {
    if (isSearch) {
      document.querySelector('#fallback')?.remove();
    }
  }, [isSearch]);

  return (
    <>
      <Head>
        <title>
          {state.pageTitle === 'napari' ? 'Home' : state.pageTitle} - napari
        </title>
      </Head>

      <JupyterBookProvider {...state}>
        <App />
      </JupyterBookProvider>
    </>
  );
}
