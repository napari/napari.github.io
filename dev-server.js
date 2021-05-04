/**
 * Script for re-running `jupyter-book build` on script changes.
 *
 * TODO There's probably a smarter way to serve the re-built SCSS and JS assets
 * using some proxying magic. Instead of rebuilding the entire docs for SCSS
 * and JS changes, we could probably serve the re-compiled assets directly from
 * `theme/napari/static/dist` instead of rebuilding and using the updated
 * assets in `_build/html/_static/dist`.
 */

const chokidar = require('chokidar');
const { spawn } = require('child_process');
const { resolve } = require('path');

const express = require('express');
const logger = require('morgan');
const reload = require('reload');

const PUBLIC_DIR = resolve(__dirname, '_build/html');
const OUTPUT_DIR = resolve(__dirname, 'theme/napari/static/dist');
const DEFAULT_PORT = 8080;
const IGNORED_FILES = [
  '.github',
  '_build',
  'node_modules',
  'theme/js',
  'theme/scss',
];

class DevServer {
  app = null;
  buildProcess = null;
  reloader = null;

  reloadBrowser() {
    console.log('Reloading the browser!');
    this.reloader.reload();
  }

  /**
   * Runs `jupyter-book` to build the napari docs as a subprocess. Running
   * processes are cancelled to ensure the build is up-to-date.
   */
  buildDocs() {
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
      this.buildProcess = null;

      // Reload on successful run
      if (this.reloader && code === 0) {
        this.reloadBrowser();
      }
    });
  }

  /**
   * Re-builds the napari docs on file changes.
   */
  watchDocs() {
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
  async startDevServer() {
    this.app = express();
    this.app.use(logger('dev'));

    // Proxy static path used by sphinx to bypass having to rebuild the docs
    // when the JS / SCSS changes.
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
server.start();
