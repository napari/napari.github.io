/* eslint-disable import/no-extraneous-dependencies */

import cheerio, { Cheerio, Element } from 'cheerio';
import fs from 'fs-extra';

import {
  getGlobalHeaders,
  JupyterBookState,
  TOCHeader,
} from '@/context/jupyterBook';

function getPageHeaders(contentToc: Cheerio<Element>) {
  return contentToc
    .find('#page-toc > ul > li > ul > li > a')
    .toArray()
    .map<TOCHeader>((element) => {
      const link = cheerio(element);
      const href = link.attr('href') ?? '';

      return {
        // Remove the starting hash on the link if it exists.
        id: href.replace(/^#/, ''),
        text: link.text(),
      };
    });
}

function getTocSelector(level = 1) {
  return `.toctree-l${level}`;
}

function getGlobalTocHeaders(globalToc: Cheerio<Element>) {
  return getGlobalHeaders<Element>({
    getRootNodes: () => globalToc.find(getTocSelector()).toArray(),
    getLinkData: (node) => {
      const link = cheerio(node).find('a').first();

      return {
        href: link.attr('href') ?? '',
        text: link.text(),
      };
    },
    getNextNodes: (node, level) =>
      cheerio(node).find(getTocSelector(level)).toArray(),
  });
}

/**
 * Scrapes page data from an HTML file for pre-rendering.
 *
 * @param file The HTML file to extract data from.
 */
export async function getPageData(file: string): Promise<JupyterBookState> {
  const rawHtml = await fs.readFile(file, 'utf-8');
  const $ = cheerio.load(rawHtml);

  const pageBody = $('#page-body');
  const pageToc = $('#page-toc');
  const globalToc = $('#global-toc');

  // Remove header link automatically added by Jupyter Book.
  pageBody.find('.headerlink').remove();

  // Get page title from header text content.
  const pageHeader = pageBody.find('h1').first();
  const pageTitle = pageHeader.text();
  pageHeader.remove();

  const result = {
    ...getGlobalTocHeaders(globalToc),
    pageTitle,
    pageBodyHtml: pageBody.html() ?? '',
    pageHeaders: getPageHeaders(pageToc),
  };

  return result;
}
