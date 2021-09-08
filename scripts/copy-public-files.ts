import fs from 'fs-extra';
import { basename, resolve } from 'path';

const ROOT_DIR = resolve(__dirname, '..');

/**
 * Copies static files used by Jupyter Book pages into the Next.js public
 * folder so that Next.js can access it
 */
export async function copyPublicFiles(): Promise<void> {
  const staticFiles = ['pygments.css'].map((file) =>
    resolve(ROOT_DIR, '_build/html/_static', file),
  );
  const imageFiles = resolve(ROOT_DIR, '_build/html/_images');
  const publicDirectory = resolve(ROOT_DIR, 'public');

  // Remove public directory to ensure consistent rebuilds during development.
  if (await fs.pathExists(publicDirectory)) {
    await fs.remove(publicDirectory);
  }

  // Copy all files concurrently.
  await Promise.all([
    ...staticFiles.map((file) =>
      fs.copy(file, resolve(publicDirectory, basename(file))),
    ),
    fs.copy(imageFiles, resolve(publicDirectory, '_images')),
  ]);
}

// same as `if __name__ == 'main'`
if (require.main === module) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  copyPublicFiles();
}
