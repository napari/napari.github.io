import { ChildProcess, spawn } from 'child_process';
import chokidar from 'chokidar';
import express, { Express } from 'express';
import logger from 'morgan';
import { resolve } from 'path';
import reload, { Reloader } from 'reload';

const PUBLIC_DIR = resolve(__dirname, '_build/html');
const OUTPUT_DIR = resolve(__dirname, 'theme/napari/static/dist');
const DEFAULT_PORT = 8080;
const IGNORED_FILES = ['.github', '_build', 'node_modules', 'theme/src'];

class DevServer {
  app?: Express;

  buildProcess?: ChildProcess;

  reloader?: Reloader;

  private reloadBrowser() {
    console.log('Reloading the browser!');
    this.reloader?.reload();
  }

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

    this.buildProcess = spawn('jupyter-book', ['build', '.'], {
      // Pipe process output to terminal
      stdio: 'inherit',
    });
    this.buildProcess.once('exit', (code) => {
      this.buildProcess = undefined;

      // Reload on successful run
      if (this.reloader && code === 0) {
        this.reloadBrowser();
      }
    });
  }

  /**
   * Re-builds the napari docs on file changes.
   */
  private watchDocs() {
    const watcher = chokidar.watch('.', { ignored: IGNORED_FILES });

    watcher.on('change', (path) => {
      // If path is theme asset, we can reload the browser instead of
      // re-building the docs.
      if (path.includes(OUTPUT_DIR)) {
        console.log(`${path} changed, reloading browser`);
        this.reloadBrowser();
      } else {
        console.log(`${path} changed, re-building docs`);
        this.buildDocs();
      }
    });

    // Build docs on initial run
    this.buildDocs();
  }

  /**
   * Starts the dev server using express and reload.
   */
  private async startDevServer() {
    this.app = express();
    this.app.use(logger('dev'));

    // Proxy static path used by Jupyter Book to bypass having to rebuild the
    // docs when the JS / SCSS changes.
    this.app.use('/_static/dist', express.static(OUTPUT_DIR));

    // Serve built docs if other proxy handler is a miss.
    this.app.use(express.static(PUBLIC_DIR));

    this.reloader = await reload(this.app);
    this.app.listen(DEFAULT_PORT, () =>
      console.log(
        `Started napari.org dev server at http://localhost:${DEFAULT_PORT}`,
      ),
    );
  }

  async start() {
    await this.startDevServer();
    this.watchDocs();
  }
}

const server = new DevServer();
server
  .start()
  .catch((err) => console.error('Unable to start dev server!', err));
