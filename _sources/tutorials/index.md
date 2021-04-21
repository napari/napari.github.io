---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.10.3
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# napari tutorials

+++

Welcome to the napari tutorials! Our main development occurs on the
[napari/napari](https://github.com/napari/napari) repository. Here we've
provided a few tutorials to explore the main usage modes and methods of napari.
Before we dive in, let's talk a bit about what napari actually is and why we're
developing it.

+++

## what is napari?

**napari** is a fast, interactive, multi-dimensional image viewer for Python.
It's designed for browsing, annotating, and analyzing large multi-dimensional
images. It's built on top of `Qt` (for the GUI), `vispy` (for performant
GPU-based rendering), and the scientific Python stack (e.g. `numpy`, `scipy`).
It includes critical viewer features out-of-the-box, such as support for large
multi-dimensional data, and layering and annotation. By integrating closely with
the Python ecosystem, **napari** can be easily coupled to leading machine
learning and image analysis tools (e.g. `scikit-image`, `scikit-learn`,
`TensorFlow`, `PyTorch`), enabling more user-friendly automated analysis.

```{code-cell} python
import napari
from skimage.data import cells3d

cells = cells3d()[30, 1]  # get some data
viewer = napari.view_image(cells, colormap='magma')
```

```{code-cell} python
:tags: [hide-input]

from napari.utils import nbscreenshot

nbscreenshot(viewer)
```

We're developing **napari** in the open! But the project is in an **alpha**
stage, and there will still likely be **breaking changes** with each release.
You can follow progress on this repository, test out new versions as we release
them, and contribute ideas and code.

To get a sense of our current plans checkout and contribute to the discussion on
some of our [long-term feature
issues](https://github.com/napari/napari/issues?q=is%3Aissue+is%3Aopen+label%3A%22long-term+feature%22)
on Github.

To checkout some cool example uses of **napari** with scientific data see our
[gallery](./gallery).

+++

## getting started

These tutorials target people who want to use napari as a user. If you are also
interested in contributing to napari then please check out [contributing
guidelines](https://github.com/napari/napari/blob/master/docs/developers/contributing.md).

If you've already got napari installed, then begin with our [getting
started](./fundamentals/getting_started) tutorial. For help installing napari
checkout our [installing napari](./fundamentals/installation) tutorial.

+++

## help

We're a community partner on the [imagesc
forum](https://forum.image.sc/tags/napari) and all help and support requests
should be posted on the forum with the tag `napari`. We look forward to
interacting with you there.

+++

## improving the tutorials

Our tutorials are hosted on Github at
[napari/tutorials](https://github.com/napari/tutorials). If as you're going
through the tutorials you spot any errors or can think of ways to improve them
please raise an issue on the repository or make a PR, we'd love to have the
community help make them better for everyone.

[napari tutorials home page](http://www.napari.org/tutorials)

```{code-cell} python
:tags: [remove-cell]

viewer.close()
```
