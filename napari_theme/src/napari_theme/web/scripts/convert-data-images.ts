/* eslint-disable no-await-in-loop */

import { img as convertBase64ToImage } from 'base64-img';
import cheerio from 'cheerio';
import { createHash } from 'crypto';
import fs from 'fs-extra';
import path from 'path';

import { getHTMLFiles } from '../src/utils/jupyterBook';

const DATA_IMAGES = `_data-images`;
const DATA_IMAGES_DIR = path.resolve(__dirname, '../public', DATA_IMAGES);

/**
 * Parses an HTML file extracts data URL images (`data:...`) to a file so that
 * they can be accessed via static file hosting. This is so that the picture can
 * be fetched from OpenGraph and Twitter previews.
 *
 * @param file The HTML file.
 */
async function convertDataImage(file: string) {
  const html = await fs.readFile(file, 'utf-8');
  const $ = cheerio.load(html);
  const prevHtml = $.html();

  for (const node of $('img').toArray()) {
    const src = $(node)?.attr('src') ?? '';

    if (src.startsWith('data:')) {
      const [, data] = src.split(';');

      // Create file name from content hash.
      const hash = createHash('sha256').update(data).digest('base64');
      const name = hash
        // Replace forward slashes so that we don't create nested files.
        .replaceAll('/', '-')
        // Remove trailing equal sign from base64 string.
        .replaceAll(/=$/g, '');

      // Convert base64 data to image file.
      const filename = await new Promise<string>((resolve, reject) =>
        convertBase64ToImage(src, DATA_IMAGES_DIR, name, (error, imageFile) => {
          if (error) {
            reject(error);
          } else {
            resolve(imageFile);
          }
        }),
      );

      // Replace image `src` in HTML with the updated static file path.
      $(node)?.attr(
        'src',
        path.join('/', DATA_IMAGES, path.basename(filename)),
      );
    }

    // Only update the HTML file if the contents have been changed.
    const nextHtml = $.html();
    if (nextHtml !== prevHtml) {
      await fs.writeFile(file, nextHtml);
    }
  }
}

async function convertDataImages() {
  const files = await getHTMLFiles();

  if (!(await fs.pathExists(DATA_IMAGES_DIR))) {
    await fs.mkdirp(DATA_IMAGES_DIR);
  }

  await Promise.all(files.map(convertDataImage));
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
convertDataImages();
