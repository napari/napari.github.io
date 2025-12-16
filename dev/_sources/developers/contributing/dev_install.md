(dev-installation)=

## Setting up a development installation

In order to make changes to `napari`, you will need to [fork](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project) the
[repository](https://github.com/napari/napari). If you are not familiar with `git`, we recommend reading up on [this guide](https://docs.github.com/en/get-started/using-git/about-git#basic-git-commands).

1. Clone the forked repository to your local machine and change directories:

   ```sh
   git clone https://github.com/your-username/napari.git
   cd napari
   ```

1. Set the `upstream` remote to the base `napari` repository:

   ```sh
   git remote add upstream https://github.com/napari/napari.git
   ```

1. If you haven't already, create a development environment:

   `````{tab-set}

   ````{tab-item} Using conda
   After [installing `conda`](https://www.anaconda.com/download), create an environment called `napari-env` with Python {{ python_version }} and activate it.

   {{ conda_create_env }}
   ````

   ````{tab-item} Using venv
   After installing Python on your machine, create a virtual environment on your terminal and activate it. On Linux and macOS, you can run

   ```sh
   python -m venv <path-to-env>
   source <path-to-env>/bin/activate
   ```

   See the [venv](https://docs.python.org/3/library/venv.html) documentation for instructions on Windows.
   ````
   `````

   ```{note}
   It is highly recommended to create a fresh environment when working with
   napari, to prevent issues with outdated or conflicting packages in your
   development environment.
   ```

1. Install the package in editable mode, along with all of the developer tools (`dev`)
   and optionally a Qt backend (`pyqt`, `pyside`).

   ```{note}
   If you only want to use napari and do not wish to develop napari itself,
   you can install napari on most macOS, Linux and
   Windows systems with Python {{ python_version_range }}
   by following the steps on the
   [instructions page](install-python-package).
   ```

   napari supports different Qt backends and Qt versions. In this step, choose one of the following
   commands to install the developer tools and your preferred Qt backend.

   For PyQt5, the default Qt backend, use:

   ```sh
   pip install -e ".[pyqt]" --group dev  # (quotes only needed for zsh shell)
   ```

   To use PySide6 instead of the PyQt5, use:

   ```sh
   pip install -e ".[pyside]" --group dev  # (quotes only needed for zsh shell)
   ```

   For PyQt6, use:

   ```sh
   pip install -e ".[pyqt6]" --group dev  # (quotes only needed for zsh shell)
   ```

   If you wish to install the developer tools only, use the following. Choose
   this option if you wish to install your Qt backend separately, such as if you already have
   a Qt backend installed or if you use an experimental backend like PySide6:

   ```sh
   pip install -e . --group dev  # (quotes only needed for zsh shell)
   ```

   Note that in this last case you will need to install your Qt backend separately.

   ```{note}
   In all of the above cases, you may wish to include the `optional` extra (optional dependency),
   in addition to `dev`, by using `pip install -e ".[optional]" --group dev`, for example.
   The `optional` extra (optional dependency) includes `numba` and other performance packages that are
   included with the typical end-user `napari[all]` installation.
   ```

1. We use [`pre-commit`](https://pre-commit.com) to format code with
   [`ruff-format`](https://docs.astral.sh/ruff/formatter/) and lint with
   [`ruff`](https://github.com/astral-sh/ruff) automatically prior to each commit.
   To minimize test errors when submitting pull requests, please install `pre-commit`
   in your environment as follows:

   ```sh
   pre-commit install
   ```

   Upon committing, your code will be formatted according to our [`ruff-format`
   configuration](https://github.com/napari/napari/blob/main/pyproject.toml).

   Code will also be linted to enforce the stylistic and logistical rules specified
   in the `[tool.ruff]` section of
   [our `pyproject.toml` file](https://github.com/napari/napari/blob/main/pyproject.toml).
   For information on any specific `ruff` error code, see the
   [Ruff Rules](https://docs.astral.sh/ruff/rules/). You may also wish to refer
   to the [PEP 8 style guide](https://peps.python.org/pep-0008/).

   If you wish to tell the linter to ignore a specific line use the `# noqa`
   comment along with the specific error code (e.g. `import sys  # noqa: E402`) but
   please do not ignore errors lightly.

Now you are all set to start developing with napari.
