import { ChildProcess, spawn } from 'child_process';
import chokidar from 'chokidar';
import { EventEmitter } from 'events';
import fs from 'fs-extra';
import { resolve } from 'path';

import { getTOCFiles } from '../theme/src/utils/jupyterBook';

const ROOT_DIR = resolve(__dirname, '..');
const PORT = process.env.PORT || '8080';

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
  private buildDocs() {
    // Kill existing build if there is one
    if (this.buildProcess) {
      console.log('Cancelling existing build');
      this.buildProcess.kill();
    }

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
      this.buildProcess = undefined;
      this.emit(Events.JupyterBuildComplete);
    });
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
    const watchFiles = new Set(['assets', '_toc.yml', '_config.yml']);

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
      this.buildDocs();
    });

    // Build docs on initial run
    this.buildDocs();
  }

  private startNextDevServer() {
    const nextCli = resolve(ROOT_DIR, 'node_modules/.bin/next');
    spawn(nextCli, ['-p', PORT], {
      stdio: 'inherit',
    });
  }

  /**
   * Copies static files used by Jupyter Book pages into the Next.js public
   * folder so that Next.js can access it
   */
  private async copyPublicFiles() {
    const staticFiles = resolve(ROOT_DIR, '_build/html/_static');
    const publicDirectory = resolve(ROOT_DIR, 'public');

    // Remove public directory to ensure consistent rebuilds during development.
    if (await fs.pathExists(publicDirectory)) {
      await fs.remove(publicDirectory);
    }

    await fs.copy(staticFiles, publicDirectory);
  }

  async start() {
    await this.watchDocs();

    // Start Next.js dev server after the first build is complete.
    this.once(Events.JupyterBuildComplete, () => {
      this.startNextDevServer();
    });

    // Copy public files after every build.
    this.on(Events.JupyterBuildComplete, () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.copyPublicFiles();
    });
  }
}

const server = new DevServer();
server
  .start()
  .catch((err) => console.error('Unable to start dev server!', err));
