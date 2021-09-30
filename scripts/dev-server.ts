/* eslint-disable no-await-in-loop */

import { ChildProcess, spawn } from 'child_process';
import chokidar from 'chokidar';
import { createHash } from 'crypto';
import { EventEmitter } from 'events';
import FileType from 'file-type';
import fs from 'fs-extra';
import { resolve } from 'path';

import { getTOCFiles } from '../theme/src/utils/jupyterBook';
import { copyPublicFiles } from './copy-public-files';

const ROOT_DIR = resolve(__dirname, '..');
const PORT = process.env.PORT || '8080';
const BUILD_HASH_FILE = resolve(ROOT_DIR, '_build/jupyter-build-hash');

const BUILD_HASH_IGNORE_PATTERN = /\.DS_Store/;
const MEDIA_FILE_PATTERN = /image|video/;

function isErronoException(value: unknown): value is NodeJS.ErrnoException {
  return !!(value as NodeJS.ErrnoException).errno;
}

/**
 * Events emitted by the dev server.
 */
enum Events {
  /**
   * Event for when the Jupyter Book build is complete.
   */
  JupyterBuildComplete = 'jupyter-build-complete',
}

class DevServer extends EventEmitter {
  buildProcess?: ChildProcess;

  /**
   * Runs `jupyter-book` to build the napari docs as a subprocess. Running
   * processes are cancelled to ensure the build is up-to-date.
   */
  private async buildDocs() {
    // Kill existing build if there is one
    if (this.buildProcess) {
      console.log('Cancelling existing build');
      this.buildProcess.kill();
    }

    const buildHash = await this.createBuildHash();
    const prevBuildHash = await this.getBuildHash();

    if (buildHash === prevBuildHash) {
      console.log('Skipping Jupyter Book build');
      console.log('Hash:', buildHash);
      this.emit(Events.JupyterBuildComplete);

      return;
    }

    console.log('Building Jupyter Book');
    console.log('Hash:', buildHash);

    this.buildProcess = spawn('jupyter-book', ['build', ROOT_DIR], {
      // Pipe process output to terminal
      stdio: 'inherit',
    });

    this.buildProcess.on('error', (error) => {
      if (isErronoException(error) && error.code === 'ENOENT') {
        console.error('Unable to find `jupyter-book`. Is it installed?');
        process.exit(-1);
      }

      console.error('Error running Jupyter Book:', error);
    });

    this.buildProcess.once('exit', () => {
      this.writeBuildHash(buildHash).catch((err) =>
        console.error('Unable to write build hash:', err),
      );

      this.buildProcess = undefined;
      this.emit(Events.JupyterBuildComplete);
    });
  }

  /**
   * Creates a new SHA256 hash string from the file contents of the files used
   * by Jupyter Book. This hash is used for speeding up future `yarn dev`
   * invocations so that the Jupyter Book HTML doesn't have to rebuilt if the
   * files hasn't changed.
   *
   * @returns The build hash string.
   */
  private async createBuildHash() {
    const fileStack = await this.getWatchFiles();
    const files: string[] = [];
    const hash = createHash('sha256');

    // Get full file list recursively.
    while (fileStack.length > 0) {
      const file = fileStack.pop() as string;
      if (await fs.pathExists(file)) {
        const stats = await fs.stat(file);

        if (stats.isDirectory()) {
          const nextFiles = await fs.readdir(file);
          fileStack.push(
            ...nextFiles.map((nextFile) => resolve(file, nextFile)),
          );
        } else if (!BUILD_HASH_IGNORE_PATTERN.exec(file)) {
          files.push(file);
        }
      }
    }

    // Concurrently read files and update the file hash.
    const hashValues = await Promise.all(
      files.map(async (file) => {
        const fileType = await FileType.fromFile(file);
        const mime = fileType?.mime ?? '';

        // For media files, create a hash based on their creation and modified
        // time to speed up hashing.
        if (MEDIA_FILE_PATTERN.exec(mime)) {
          const stats = await fs.stat(file);
          return (stats.ctimeMs + stats.mtimeMs).toString();
        }

        return fs.readFile(file, 'utf-8');
      }),
    );

    // Sort hash values to ensure a consistent hash is produced.
    hashValues.sort().forEach((value) => hash.update(value));

    return hash.digest('base64').toString();
  }

  /**
   * Writes the build hash to the build hash file.
   *
   * @param hash The build hash string.
   */
  private async writeBuildHash(hash: string) {
    return fs.writeFile(BUILD_HASH_FILE, hash);
  }

  /**
   * Reads the build hash file or returns an empty string if it doesn't exist.
   *
   * @returns The build hash string.
   */
  private async getBuildHash() {
    const exists = await fs.pathExists(BUILD_HASH_FILE);
    if (!exists) {
      return '';
    }

    return fs.readFile(BUILD_HASH_FILE, 'utf-8');
  }

  /**
   * Returns a list of files that should be watched for Jupyter Book rebuilds.
   * This reads from the `_toc.yml` to get a list of the documentation files to
   * watch.
   *
   * @returns The list of files to watch
   */
  private async getWatchFiles() {
    const files = await getTOCFiles();
    const watchFiles = new Set([
      'assets',
      '_toc.yml',
      '_config.yml',
      'theme/napari',
      'theme/napari_code_theme.py',
    ]);

    // For each file, add the top-most directory so we can watch all files
    // within that directory.
    for (const file of files) {
      if (file === 'index') {
        watchFiles.add('index.md');
      } else {
        const [parentDir] = file.split('/');
        if (parentDir) {
          watchFiles.add(parentDir);
        }
      }
    }

    return Array.from(watchFiles);
  }

  /**
   * Re-builds the napari docs on file changes.
   */
  private async watchDocs() {
    const watchFiles = await this.getWatchFiles();
    const watcher = chokidar.watch(watchFiles);

    watcher.on('change', (path) => {
      console.log(`${path} changed, re-building docs`);

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.buildDocs().catch((err) => {
        console.error('Unable to build docs on file changes:', err);
        process.exit(-1);
      });
    });

    // Build docs on initial run
    await this.buildDocs();
  }

  private startNextDevServer() {
    const nextCli = resolve(ROOT_DIR, 'node_modules/.bin/next');
    spawn(nextCli, ['-p', PORT], {
      stdio: 'inherit',
    });
  }

  async start() {
    // Start Next.js dev server after the first build is complete.
    this.once(Events.JupyterBuildComplete, () => {
      this.startNextDevServer();
    });

    // Copy public files after every build.
    this.on(Events.JupyterBuildComplete, () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      copyPublicFiles();
    });

    await this.watchDocs();
  }
}

const server = new DevServer();
server
  .start()
  .catch((err) => console.error('Unable to start dev server!', err));
