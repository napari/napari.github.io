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

(napari-quick-start)=

# Quickstart

+++

## About napari

napari is a fast, interactive, multi-dimensional image viewer, with [a vibrant plugin ecosystem](https://www.napari-hub.org/) that expands its capability to tackle various domain-specific visualization and analysis needs. It is built on Qt (for the GUI), [vispy](https://vispy.org/) (for performant GPU-based rendering), and the scientific Python stack (numpy, scipy, and scikit-image).

napari is an open source project on [GitHub](https://github.com/napari/napari) to facilitate transparency, reuse, and extensibility.

At its core, it provides critical viewer features out-of-the-box, such as support for [large multi-dimensional data](dask-napari); [“layers”](layers-glance) to simultaneously visualize images, models, and analysis results; and easy manual, interactive annotation in 3D.

+++

## What's covered in this page

This tutorial is for napari first-timers to give them a quick glance of what napari does, and give it a try right away. We will cover:

- Open napari
- Open an image
- Image display adjustment
- Manually label the cell
- Get the cell area measurement
- Plugins
- Next steps

Along the way, you will see how to access napari functions from [Python code](api) and from GUI - though for different purposes, one method might be easier than another. This quick start guide will not cover ALL possible methods but only some ways to perform basic tasks. For the more complete guide, please visit [our usage guide](usage).

You will also see some examples of plugins. The core napari viewer focuses on domain-agnostic functions such as layer controls. Analyses and domain specific functions, such as reading a special file format and image segmentation, live in the realm of [plugins](https://www.napari-hub.org/).

+++

## Launch the napari GUI application

napari can be opened in one of [multiple ways](launch), depending on how it's used in your image analysis workflow.

Here we will be mainly focused on the GUI application.

- From command line:

  Once installed, run

```bash
napari
```

- If you installed the bundled app:

  Click on the app icon to open it.

  *Note: macOS users might need to right click on the app icon and select "Open" to bypass the security check. You can also go to System Settings > Privacy & Security and click on "Open Anyway".*

+++

```{tip}
Starting with release 0.6.0, you can use the [command palette](command-palette) to launch any command. 🎨
```

## Open an image

napari natively supports tiff and many other formats supported by [skimage.io.imread](https://scikit-image.org/docs/dev/api/skimage.io.html) as input image file format.

Try with your own images or download [this ome tiff file](https://downloads.openmicroscopy.org/images/OME-TIFF/2016-06/MitoCheck/00001_01.ome.tiff).

Additional input file formats may be supported [by plugins](https://www.napari-hub.org/).
Try [napari-aicsimageio](https://www.napari-hub.org/plugins/napari-aicsimageio) if you have czi, lif, or nd2 files.

Once you have the proper plugin installed, use File > Open Files(s)
and select the image file, or simply drag and drop the image into napari.

For demo purpose, we will use a sample image that comes with napari.

### Option 1: Using the GUI to open an image

1. In napari, go to `File -> Open Sample -> napari built-ins -> Cell`

![Open sample image](../_static/images/open_image.png)

### Option 2: Using the napari console to open an image

1. Open napari IPython console

![IPython console](../_static/images/IPython.png)

2. Type

```python
from skimage import data

viewer.add_image(data.cell(), name='cell')
```

```{code-cell} ipython3
---
tags: [remove-input]
---
import napari
from napari.utils import nbscreenshot

viewer = napari.Viewer()

from skimage import data
viewer.add_image(data.cell(), name='cell')
nbscreenshot(viewer, alt_text="image of a single cell opened in napari viewer")
```

```{note}
Once you have a napari viewer open, you can also make a new `Image` layer from an image (or URL to an image) copied to your Clipboard using `File -> New Image from Clipboard` menu item (keybinding {kbd}`Command/Ctrl+N`).
```

## Image display adjustment

The layer controls panel at the upper left of the viewer allows you to adjust contrast, colormap, and other layer properties. These settings affect the visualization, but do not affect the underlying data.

To change the image display through the [API](api), in IPython console, type

```python
viewer.layers['cell'].colormap = 'yellow'
```

```{code-cell} ipython3
---
tags: [remove-input]
---
viewer.layers['cell'].colormap = "yellow"
nbscreenshot(viewer, alt_text="image of singular cell with yellow tint")
```

## Manually label the cell

To measure the area of the cell, we can use a labels layer and manually "paint" the cell.
The labels layer allows you to record the segmentation result by assigning `background = 0`, and assigning each object with an integer.

1. Add a new labels layer
1. Click on "paint"
1. Circle the cell
1. Use "fill" bucket to fill it.

```{tip}
To switch to a new, unique label -- one larger than the current largest label -- press
the default keybinding {kbd}`m`.
```

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="../../_static/images/manual_label.webm" type="video/webm" />
    <source src="../../_static/images/manual_label.mp4" type="video/mp4" />
    <img src="../../_static/images/manual_label.png"
      title="Your browser does not support the video tag"
      alt="Manually labeling a region of interest in napari"
    >
  </video>
</figure>
```

+++

## Get the cell area measurement

To analyze labels our layer, we can use [scikit-image](https://scikit-image.org/), a popular Python library that comes with your napari installation. [skimage.measure.regionprops](https://scikit-image.org/docs/dev/api/skimage.measure.html#skimage.measure.regionprops) provides a good set of features that can be extracted from labels, including area measurement.

In IPython console, type

```python
from skimage.measure import regionprops

props = regionprops(viewer.layers['Labels'].data)
print('the cell area is: ', props[0].area)
```

Alternatively, try [this plugin](https://napari-hub.org/plugins/napari-skimage.html) to use a GUI widget instead of the console.

**Note:** the area reported by `regionprops` is the number of pixels. Check pixel size and convert the reported number to physical units.

```{code-cell} ipython3
---
tags: [remove-cell]
---
viewer.close_all()
```

## Plugins

napari features a rich ecosystem of plugins which add functionality to the core napari viewer. Plugins can provide:

- file readers/writers, including support for import and export of image and related data types;
- support for working with specialized data formats;
- domain-specific features and analysis tools, including microscopy, climate, geoscience, and more.

Plugins can be installed as Python packages via pip or conda, or directly from within napari using the [napari plugin manager](https://napari.org/napari-plugin-manager/).

To explore existing plugins, visit the [napari hub](https://napari-hub.org/). For more details, check out our documentation on [finding and installing plugins](https://napari.org/stable/plugins/start_using_plugins/finding_and_installing_plugins.html#finding-and-installing-plugins).

## Next steps

- napari provides a variety of settings that can be adjusted to customize the user experience, including theme and keyboard shortcuts (keybindings). To learn more, see our guide to the [**Preferences** dialog](napari-preferences).

- napari provides the flexibility to handle multi-dimensional data. Try opening 3D or higher dimensional images, and switch to 3D view.

![ndisplay](../_static/images/ndisplay.png)

- Test some [examples](https://github.com/napari/napari/tree/main/examples) to see how to add different layer types and add your own widgets to napari.

- Explore other [plugins](https://www.napari-hub.org/). A few fun ones: [napari-clusters-plotter](https://www.napari-hub.org/plugins/napari-clusters-plotter), [napari-pyclesperanto-assistant](https://www.napari-hub.org/plugins/napari-pyclesperanto-assistant), [napari-animation](https://www.napari-hub.org/plugins/napari-animation).

- If you don't see the functions you need in existing plugins, try to make your own widget with [magicgui](https://napari.org/magicgui/).

- If you've developed some functionality that you think would benefit the community as a whole, consider publishing it as a [plugin](plugins-index)!

- Help the napari project by [filing issues](https://github.com/napari/napari/issues) for bugs you encounter or features that you'd like to see! Or even better, come [join the community meetings](meeting-schedule) and get to know the team.
