# napari installation tutorial

Welcome to the **napari** installation tutorial!

This tutorial will teach you how to do a clean install of **napari**. It is
aimed at people that just want to use napari. For people also interested in
contributing to napari please check our [contributing
guidelines](https://github.com/napari/napari/blob/master/docs/developers/CONTRIBUTING.md)
for more advanced installation procedures. At the end of the tutorial you should
have napari successfully installed on your computer and be able to make the
napari viewer appear.

## installation

### from pip, with "batteries included"

napari can be installed on most macOS, Linux, and Windows systems with
Python 3.6, 3.7 and 3.8 using pip:

```sh
pip install napari[all]
```

Note: while not strictly required, it is *highly* recommended to install
napari into a clean virtual environment using an environment manager like
[conda](https://docs.conda.io/en/latest/miniconda.html) or
[venv](https://docs.python.org/3/library/venv.html).  For example, with `conda`:

```sh
conda create -y -n napari-env python=3.8
conda activate napari-env
pip install napari[all]
```

### install from the master branch on Github

To install the "next-release" version from github via pip, call

```sh
pip install git+https://github.com/napari/napari.git#egg=napari[all]
```

### clone the repository locally and install in editable mode

To clone the github repository for local install

```sh
git clone https://github.com/napari/napari.git
cd napari
pip install -e .[all]
```

## checking it worked

After installation you should be able to launch napari from the command line by
simply running

```sh
napari
```

An empty napari viewer should appear as follows

![image]({{ '/assets/tutorials/launch_cli_empty.png' | relative_url }})

## upgrading

If you installed napari with `pip` you can upgrade by calling

```sh
pip install napari[all] --upgrade
```

## choosing a different Qt backend

> ℹ️ **NOTE**
>
> napari needs a library called [Qt](https://www.qt.io/) to run its user
> interface (UI). In Python, there are two alternative libraries to run this,
> called [PyQt5](https://www.riverbankcomputing.com/software/pyqt/download5) and
> [PySide2](https://doc.qt.io/qtforpython/). By default, we don't choose for
> you, and simply running `pip install napari` will not install either. You
> *might* already have one of them installed in your environment, thanks to
> other scientific packages such as Spyder or matplotlib. If neither is
> available, running napari will result in an error message asking you to
> install one of them.

As mentioned above, `pip install napari[all]` will (currently) install
[PyQt](https://www.riverbankcomputing.com/software/pyqt/intro).

If you wish to use [PySide2](https://wiki.qt.io/Qt_for_Python), or specify the
backend explicitly you may do using either

```sh
pip install napari[pyside2]

# or for PyQt5
pip install napari[pyqt5]
```

Note: if you switch backends, it's a good idea to `pip uninstall` the one you're
not using.

## bug reports

If you are running into issues, please open a new issue on our [issue
tracker](https://github.com/napari/napari/issues) and include the output of the
following command

```sh
napari --info
```

## help

We're a community partner on the [imagesc
forum](https://forum.image.sc/tags/napari) and all usage support requests should
be posted on the forum with the tag `napari`. We look forward to interacting
with you there.

## next steps

Now that you've got napari installed, checkout our [getting
started](./getting_started) tutorial to start learning how to use it!

{% include footer.md %}
