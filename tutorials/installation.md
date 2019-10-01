# napari installation tutorial

Welcome to the **napari** installation tutorial!

This tutorial will teach you how to do a clean install of **napari**. It is aimed at people that just want to use napari. For people also interested in contributing to napari please check our [contributing guidelines](https://github.com/napari/napari/tree/master/CONTRIBUTING.md) for more advanced installation procedures. At the end of the tutorial you should have napari successfully installed on your computer and be able to make the napari viewer appear.

## instalation

**napari** can be installed on most macOS and Linux systems with Python 3.6 or 3.7. We're currently working on improving Windows support. There are three different ways to install napari.

### install the latest release from pip
 The simplest option is to install the latest release on PyPi by calling

```sh
$ pip install napari
```

### install from the master branch on Github
To get the most up to date version of through pip call
```sh
$ pip install git+https://github.com/napari/napari
```

### clone the repository locally and install in editable mode
To get the most up to date version directly from github run
```sh
$ git clone https://github.com/napari/napari.git
$ cd napari
$ pip install -e .
```

## checking it worked
After installation you should be able to launch napari from the command line by simply running
```sh
napari
```
An empty napari viewer should appear as follows

![image](./resources/launch_cli_empty.png)

## upgrading

If you installed napari with `pip` you can upgrade by calling
```sh
$ pip install napari --upgrade
```

## troubleshooting

We're currently working on improving our windows support. Right now for some windows systems we have a known issue which we are working to resolve that causes the following error message:
```python
AttributeError: 'LooseVersion' object has no attribute 'version'
```
For mac0S we require at least version 10.12.

## help

We're a community partner on the [imagesc forum](https://forum.image.sc/tags/napari) and all help and support requests should be posted on the forum with the tag `napari`. We look forward to interacting with you there.

## next steps

Now that you've got napari installed, checkout our [getting started](getting_started.md) tutorial to start learning how to use it!

## all tutorials

- [welcome](../README.md)
- [installing napari](installation.md)
- [getting started tutorial](getting_started.md)
- [viewer tutorial](viewer.md)
- [image layer tutorial](image.md)
- [labels layer tutorial](labels.md)
- [points layer tutorial](points.md)
- [shapes layer tutorial](shapes.md)
- [surface layer tutorial](surface.md)
- [vectors layer tutorial](vectors.md)
- [gallery](../gallery/gallery.md)
