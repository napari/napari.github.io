import fs from 'fs-extra';
import { basename, resolve } from 'path';
// import { resolve } from 'path';

const ROOT_DIR = resolve(__dirname, '..');
const BUILD_DIR = resolve(ROOT_DIR, '_build/html');

/**
 * Copies static files used by Jupyter Book pages into the Next.js public
 * folder so that Next.js can access it
 */
export async function copyPublicFiles(): Promise<void> {
  const staticFiles = resolve(BUILD_DIR, '_static');
  const searchIndexFile = resolve(BUILD_DIR, 'searchindex.js');
  const imageFiles = resolve(BUILD_DIR, '_images');
  const publicDirectory = resolve(ROOT_DIR, 'public');
  const staticPublicDirectory = resolve(publicDirectory, '_static');

  // Remove public directory to ensure consistent rebuilds during development.
  if (await fs.pathExists(publicDirectory)) {
    await fs.remove(publicDirectory);
  }

  await fs.mkdir(publicDirectory);
  await fs.mkdir(staticPublicDirectory);

  // Copy all files concurrently.
  await Promise.all([
    fs.copy(staticFiles, staticPublicDirectory),
    fs.copy(imageFiles, resolve(publicDirectory, '_images')),
    fs.copy(
      searchIndexFile,
      resolve(staticPublicDirectory, basename(searchIndexFile)),
    ),
  ]);
}

// same as `if __name__ == 'main'`
if (require.main === module) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  copyPublicFiles();
}
