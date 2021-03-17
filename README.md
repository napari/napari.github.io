# napari.org

Source for [napari.org](https://napari.org) website.

## Usage

### Building the book

If you'd like to develop on and build the tutorials book, you should:

- Clone this repository
- Run `pip install -r requirements.txt` (it is recommended you do this within a virtual environment)
- (Recommended) Run `make clean` to remove cached files.
- Run `jupyter-book build .`

A fully-rendered HTML version of the book will be built in `_build/html/`.

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
