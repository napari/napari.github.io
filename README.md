# napari.org

Source for [napari.org](https://napari.org) website.

## Usage

### Setup Dev Environment

#### Python

The documentation is built using `jupyter-book` and various other Python dependencies. You'll need to run the following:

```sh
# it is recommended you do this within a virtual environment
pip install -r requirements.txt
```

#### Node.js

The napari theme is built with React and bundled with Next.js using the [Static
HTML Export](https://nextjs.org/docs/advanced-features/static-html-export).
feature.

You will need to setup Node.js and Yarn to work with the theme and run the
dev server:

- Install nvm
  - Bash: [nvm](https://github.com/nvm-sh/nvm)
  - Fish: [nvm.fish](https://github.com/jorgebucaran/nvm.fish)
  - Zsh: [zsh-nvm](https://github.com/lukechilds/zsh-nvm)
- Then run:

```sh
# Install and use Node.js version defined in .nvmrc
nvm install && nvm use
# Install yarn for installing dependencies
npm install -g yarn
# Install dependencies
yarn
```

### Dev Server

The Dev Server a is thin wrapper over `next` and `jupyter-book` to live
reload the browser whenever the theme or documentation is modified. To use
the Dev Server, run the command:

```sh
yarn dev
```

After the build is complete, you should be able to access the documentation
at http://localhost:8080.

#### Live Reloading

The following outlines the current behavior of the dev server:

- Update documentation content: Markdown file, Jupyter notebook file, etc.
  1. Dev Server is notified file has been modified.
  2. `jupyter-book build`.
- Update the theme's HTML layouts.
  1. Dev Server is notified file has been modified.
  2. `jupyter-book build`.
- Update the theme React source code.
  1. Next.js is notified file has been modified.
  2. Next.js rebuilds only the file that has been changed.
  3. The Next.js dev client reloads the browser UI.

Because of how long `jupyter-book build` can take, the dev server will
automatically cancel the existing build process in case files are modified
during the build.

### Building the book for production

If you'd like to develop on and build the tutorials book, you should clone
this repository and run:

```sh
# Build theme in production mode and run `jupyter-book build .`
yarn build
```

A fully-rendered HTML version of the book will be built in `dist/`.

### Working on the napari Theme

The napari theme is currently work-in-progress and is stored under
[theme/](theme/). By default, the documentation is still using
[Furo](https://github.com/pradyunsg/furo).

To enable the napari theme, you'll need to update [\_config.yml](_config.yml):

<details>
<summary>_config.yml patch</summary>

```diff
diff --git a/_config.yml b/_config.yml
index 0df4bfc..1388a45 100644
--- a/_config.yml
+++ b/_config.yml
@@ -39,11 +39,11 @@ sphinx:
     exclude_patterns:
       - _build
       - node_modules
-    html_theme: furo
+    # html_theme: furo
     # (WIP) napari theme
-    # html_theme: napari
-    # html_theme_path:
-    #   - theme
+    html_theme: napari
+    html_theme_path:
+      - theme
     pygments_style: solarized-dark
     templates_path:
       - '_templates'
```

</details>

To deploy with the napari theme, you'll need to uncomment the steps in the
[deploy.yml](.github/workflows/deploy.yml) workflow:

<details>
<summary>.github/workflows/deploy.yml patch</summary>

```diff
diff --git a/.github/workflows/deploy.yml b/.github/workflows/deploy.yml
index c131bd6..7f826ad 100644
--- a/.github/workflows/deploy.yml
+++ b/.github/workflows/deploy.yml
@@ -22,7 +22,7 @@ jobs:
         os: [ubuntu-latest]
         python-version: [3.8]
         # TODO Uncomment when napari theme is ready
-        # node-version: [15]
+        node-version: [15]
     steps:
       - uses: actions/checkout@v2.3.3

@@ -32,10 +32,10 @@ jobs:
           python-version: ${{ matrix.python-version }}

       # TODO Uncomment when napari theme is ready
-      # - name: Set up Node.js ${{ matrix.node-version }}
-      #   uses: actions/setup-node@v2
-      #   with:
-      #     node-version: ${{ matrix.node-version }}
+      - name: Set up Node.js ${{ matrix.node-version }}
+        uses: actions/setup-node@v2
+        with:
+          node-version: ${{ matrix.node-version }}

       # Install dependencies
       - name: Install dependencies
@@ -56,8 +56,8 @@ jobs:

           # Install Node.js dependencies
           # TODO Uncomment when napari theme is ready
-          # npm install -g npm
-          # yarn install
+          npm install -g npm
+          yarn install

       # Test the notebooks
       - name: Test notebooks
@@ -67,8 +67,8 @@ jobs:

       # TODO Uncomment when napari theme is ready
       # Build the theme
-      # - name: Build the theme
-      #   run: yarn build:prod
+      - name: Build the theme
+        run: yarn build:prod

       # Build the book
       - name: Build the book
```

</details>

### Adding a new tutorial

1. Make a copy of the `template-page.ipynb` notebook and add your new tutorial content.
2. Add a line to the table of contents `_toc.yml` to point to your new tutorial.
3. Run `jupyter-book build .` to view your changes locally.
4. Open a pull request to the [napari/napari.github.io repository](https://github.com/napari/napari.github.io)

### Hosting the book

The html version of the book is hosted on the `gh-pages` branch of this repo. A GitHub actions workflow has been created that automatically builds and pushes the book to this branch on a push or pull request to main.

If you wish to disable this automation, you may remove the GitHub actions workflow and build the book manually by:

- Navigating to your local build; and running,
- `ghp-import -n -p -f _build/html --cname="napari.org"`

This will automatically push your build to the `gh-pages` branch. More information on this hosting process can be found [here](https://jupyterbook.org/publish/gh-pages.html#manually-host-your-book-with-github-pages).

## Contributors

We welcome and recognize all contributions. You can see a list of current contributors in the [contributors tab](https://github.com/napari/napari.github.io/graphs/contributors).

## Credits

This project is created using the excellent open source [Jupyter Book project](https://jupyterbook.org/) and the [executablebooks/cookiecutter-jupyter-book template](https://github.com/executablebooks/cookiecutter-jupyter-book).
