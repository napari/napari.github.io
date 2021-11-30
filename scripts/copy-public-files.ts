import fs from 'fs-extra';
import { basename, resolve } from 'path';

const ROOT_DIR = resolve(__dirname, '..');
const BUILD_DIR = resolve(ROOT_DIR, '_build/html');

const STATIC_FILES = resolve(BUILD_DIR, '_static');
const SEARCH_INDEX_FILE = resolve(BUILD_DIR, 'searchindex.js');
const IMAGE_FILES = resolve(BUILD_DIR, '_images');
const SOURCES_DIRECTORY = resolve(BUILD_DIR, '_sources');
const PUBLIC_DIRECTORY = resolve(ROOT_DIR, 'public');
const STATIC_PUBLIC_DIRECTORY = resolve(PUBLIC_DIRECTORY, '_static');
const IMAGE_PUBLIC_DIRECTORY = resolve(PUBLIC_DIRECTORY, '_images');
const SOURCES_PUBLIC_DIRECTORY = resolve(PUBLIC_DIRECTORY, '_sources');
const PUBLIC_DIRECTORIES = [
  STATIC_PUBLIC_DIRECTORY,
  IMAGE_PUBLIC_DIRECTORY,
  SOURCES_PUBLIC_DIRECTORY,
];

/**
 * Copies static files used by Jupyter Book pages into the Next.js public
 * folder so that Next.js can access it
 */
export async function copyPublicFiles(): Promise<void> {
  // Remove generated public directory to ensure consistent rebuilds during development.
  await Promise.all(
    PUBLIC_DIRECTORIES.map(async (dir) => {
      if (await fs.pathExists(dir)) {
        await fs.remove(dir);
      }

      await fs.mkdirp(dir);
    }),
  );

  // Copy all files concurrently.
  await Promise.all([
    fs.copy(STATIC_FILES, STATIC_PUBLIC_DIRECTORY),
    fs.copy(IMAGE_FILES, IMAGE_PUBLIC_DIRECTORY),
    fs.copy(SOURCES_DIRECTORY, SOURCES_PUBLIC_DIRECTORY),
    fs.copy(
      SEARCH_INDEX_FILE,
      resolve(STATIC_PUBLIC_DIRECTORY, basename(SEARCH_INDEX_FILE)),
    ),
  ]);
}

// same as `if __name__ == 'main'`
if (require.main === module) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  copyPublicFiles();
}
