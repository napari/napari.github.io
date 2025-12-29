---
jupytext:
  formats: ipynb,md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: python3
---

(napari-installation)=

# How to install napari

This guide will teach you how to do a clean install of **napari** and launch the viewer.

If you're already familiar with Python, napari can be installed from PyPI or conda-forge using your favorite virtual environment and package manager. Otherwise, keep reading for instructions on how to install napari as a Python package.

```{tip}
If you just want to get started quickly with napari as an app, check out our [napari app installation instructions](installation_bundle_conda.md).
```

(install-python-package)=

## Install as Python package (recommended)

This installation method allows you to use napari from Python to programmatically
interact with the app. It is the best way to install napari and make full use of
all its features.

```{note}
If you want to contribute code back into napari, you should follow the [development installation instructions in the contributing guide](dev-installation) instead.
```

It requires:

- [Python {{ python_version_range }}](https://www.python.org/downloads/)
- the ability to install python packages via [pip](https://pypi.org/project/pip/) OR [conda-forge](https://conda-forge.org/docs/user/introduction.html)

You may also want:

- an environment manager like [conda](https://docs.conda.io/projects/conda/en/stable/user-guide/getting-started.html) or
  [venv](https://docs.python.org/3/library/venv.html) **(Highly recommended)**

```{note}
New to Python or uncertain about conda, pip, and virtual environments?
Here are some resources we recommend:

- [Talley Lambert's "Getting started running Python" slides](https://hms-iac.github.io/bobiac/content/02_getting_started_with_python/getting_started_with_python.html#slides)
- [Scientific Python: Getting started with Python for science](https://lectures.scientific-python.org/intro/index.html)
- [Detailed comparison of Python environment management tools](https://www.nijho.lt/post/python-environments/)
```

Python package distributions of napari can be installed via `pip`, `conda-forge`, or from source.

```{important}
While not strictly required, it is highly recommended to install
napari into a clean virtual environment using an environment manager like
[conda](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html) or
[venv](https://docs.python.org/3/library/venv.html).

This should be set up *before* you install napari. For example, setting with
up a Python {{ python_version }} environment with `conda`:

{{ conda_create_env }}
```

Choose one of the options below to install napari as a Python package.

``````{tab-set}

`````{tab-item} From conda-forge using conda

If you prefer to manage packages with conda, napari is available on the
conda-forge channel. We also recommend this path for users of arm64 macOS machines
([Apple Silicon](https://support.apple.com/en-us/116943), meaning a processor with a name like "M1"). You can install it with:

```sh
conda install -c conda-forge napari pyqt
```

You can then upgrade to a new version of napari using:

```sh
conda update napari
```

If you want to install napari with PySide6 as the backend you need to install it using

```sh
conda install -c conda-forge napari pyside6
```

````{note}
In some cases, `conda`'s default solver can struggle to find out which packages need to be
installed for napari. If it takes too long or you get the wrong version of napari
(see below), consider:
1. Overriding your default channels to use only `conda-forge` by adding
`--override-channels` and specifying the napari and Python versions explicitly.
For example, use {{ python_version_code }} to get Python {{ python_version }} and
{{ napari_conda_version }} to specify the napari version as {{ napari_version }},
the current release.

2. Switching to the new, faster [`libmamba` solver](https://conda.github.io/conda-libmamba-solver/libmamba-vs-classic/),
by updating your `conda` (`libmamba` is the default solver from conda 23.10 onwards):

```bash
conda update -n base conda
```
````
`````

`````{tab-item} From PyPI using pip

napari can be installed from PyPI on most macOS, Linux, and Windows systems with Python
{{ python_version_range }} using pip:

```sh
python -m pip install "napari[all]"
```

You can then upgrade napari to a new version using:

```sh
python -m pip install "napari[all]" --upgrade
```

*(See [Choosing a different Qt backend](#choosing-a-different-qt-backend) below for an explanation of the `[all]`
notation.)*

*(See [Using constraints file](#using-constraints-files) for help installing older versions of napari)*
`````

`````{tab-item} From the main branch on Github

To install the latest version with yet to be released features from Github you can use pip:

```sh
python -m pip install "git+https://github.com/napari/napari.git#egg=napari[all]"
```
`````
``````

## Checking it worked

After installation you should be able to launch napari from the command line by
simply running

```sh
napari
```

An empty napari viewer should appear as follows:

```{code-cell} ipython3
---
tags: [remove-input]
---
import napari
from napari.utils import nbscreenshot


viewer = napari.Viewer()

nbscreenshot(viewer, alt_text="Screenshot of an empty napari viewer, right after launching.")
```

```{note}
On some platforms, particularly macOS and Windows, there may be a ~30 second
delay before the viewer appears on first launch. This is expected and subsequent
launches should be quick. However, anti-malware and other security software
measures may further delay launches—even after the first launch.
```

You can check the napari version, to ensure it's what you expect, for example
the current release {{ napari_version }}, using the command: `napari --version` .

## Advanced installation options

### Choosing a different Qt backend

(choosing-qt-backend)=

napari needs a library called [Qt](https://www.qt.io/) to run its user interface
(UI). In Python, there are three alternative libraries to run this, called
[PyQt5](https://www.riverbankcomputing.com/software/pyqt/download) for Qt5,
[PyQt5](https://www.riverbankcomputing.com/software/pyqt/download) and [PySide6](https://doc.qt.io/qtforpython-6/) for Qt6. By default, we don't choose for you,
and simply running `python -m pip install napari` will not install either. You *might*
already have one of them installed in your environment, thanks to other
scientific packages such as Spyder or matplotlib. If neither is available,
running napari will result in an error message asking you to install one of
them.

Running `python -m pip install "napari[all]"` will install the default framework, which is currently
PyQt5--but this could change in the future.

To install napari with a specific framework, you can use:

```sh
python -m pip install "napari[pyqt6, optional]"    # for PyQt6

# OR
python -m pip install "napari[pyside6, optional]"  # for PySide6
```

By including `optional` you will install everything that `napari[all]` includes, but with the Qt backend of your choice.

```{note}
If you switch backends, it's a good idea to `pip uninstall` the one
you're not using.
```

```{note}
As PySide2 is not maintained, we drop support for it in napari 0.7.0. 
PyQt5 is still supported, as there is no PyQt6 on conda-forge yet. 
```

### Using constraints files

Since napari 0.4.18, we store constraints files with information about each exact dependency version against which napari was tested.
This could be useful if you need to install napari as a package from PyPI, and prevents creating environments where napari does not start or work properly.

The constraints files are stored in the napari repository under `resources/constraints/constraints_py3.10.txt`. To find
constraints for specific releases, go under the link `https://github.com/napari/napari/tree/{tag}/resources/constraints`
replacing `{tag}` with the desired napari version.

```sh
pip install napari[backend_selection] -c path/to/constraints/file
```

For example, if you would like to install napari with PyQt6 on python 3.10:

```sh
pip install napari[pyqt6, optional] -c constraints_py3.10.txt
```

## Next steps

- to start learning how to use napari, checkout our [getting started](launch) tutorial
- if you are interested in
  contributing to napari please check our [contributing
  guidelines](napari-contributing)
- if you are running into issues or bugs, please open a [new issue](https://github.com/napari/napari/issues/new/choose) on our [issue
  tracker](https://github.com/napari/napari/issues)
- if you want help using napari, we are a community partner on the [imagesc
  forum](https://forum.image.sc/tag/napari) and all usage support requests should
  be posted on the forum with the tag `napari`. We look forward to interacting
  with you there!
