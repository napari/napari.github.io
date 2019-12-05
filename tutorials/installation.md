# napari installation tutorial

Welcome to the **napari** installation tutorial!

This tutorial will teach you how to do a clean install of **napari**. It is aimed at people that just want to use napari. For people also interested in contributing to napari please check our [contributing guidelines](https://github.com/napari/napari/tree/master/docs/CONTRIBUTING.md) for more advanced installation procedures. At the end of the tutorial you should have napari successfully installed on your computer and be able to make the napari viewer appear.

## installation

**napari** can be installed on most macOS, Linux, and Windows systems with Python 3.6 or 3.7. There are three different ways to install napari.

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

We're currently working on improving our Windows support. Right now for some older Windows systems we have a known issue which we are working to resolve that causes the following error message:
```python
AttributeError: 'LooseVersion' object has no attribute 'version'
```
For mac0S we require at least version 10.12.

If you are running into issue please make a bug report on our issues and include the results of the following command

```python
import vispy
print(vispy.sys_info())
```

If everything is working fine you might see an output that looks like this:
```
Platform: Darwin-18.5.0-x86_64-i386-64bit
Python:   3.7.3 (default, Mar 27 2019, 16:54:48)  [Clang 4.0.1 (tags/RELEASE_401/final)]
NumPy:    1.17.2
Backend:  PyQt5
pyqt4:    None
pyqt5:    ('PyQt5', '5.12.2', '5.12.3')
pyside:   None
pyside2:  None
pyglet:   None
glfw:     None
sdl2:     None
wx:       None
egl:      None
osmesa:   None
_test:    None

GL version:  '2.1 INTEL-12.8.38'
MAX_TEXTURE_SIZE: 16384
```

If things are not working you might see
```
GL version: ''
```

## help

We're a community partner on the [imagesc forum](https://forum.image.sc/tags/napari) and all help and support requests should be posted on the forum with the tag `napari`. We look forward to interacting with you there.

## next steps

Now that you've got napari installed, checkout our [getting started](getting_started.md) tutorial to start learning how to use it!

{% include footer.md %}