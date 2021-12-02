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

### Development Mode

Running the book in dev mode runs a custom development server that is a thin
wrapper over `next` and `jupyter-book`. To run the docs in development mode,
run:

```sh
yarn dev
```

After the build is complete, you should be able to access the documentation
at http://localhost:8080.

### Building the book for production

To build the book for production, run:

```sh
yarn build
```

A fully-rendered HTML version of the book will be built in `dist/`.

### Adding a new tutorial

1. Make a copy of the `template-page.ipynb` notebook and add your new tutorial content.
2. Add a line to the table of contents `_toc.yml` to point to your new tutorial.
3. Run `yarn dev` to view your changes locally.
4. Open a pull request to the [napari/napari.github.io repository](https://github.com/napari/napari.github.io)

### Hosting the book

The html version of the book is hosted on the `gh-pages` branch of this repo. A GitHub actions workflow has been created that automatically builds and pushes the book to this branch on a push or pull request to main.

If you wish to disable this automation, you may remove the GitHub actions workflow and build the book manually by:

- Navigating to your local build; and running,
- `ghp-import -n -p -f dist/ --cname="napari.org"`

This will automatically push your build to the `gh-pages` branch. More information on this hosting process can be found [here](https://jupyterbook.org/publish/gh-pages.html#manually-host-your-book-with-github-pages).

## Contributors

We welcome and recognize all contributions. You can see a list of current contributors in the [contributors tab](https://github.com/napari/napari.github.io/graphs/contributors).

## Credits

This project is created using the excellent open source [Jupyter Book project](https://jupyterbook.org/) and the [executablebooks/cookiecutter-jupyter-book template](https://github.com/executablebooks/cookiecutter-jupyter-book).
