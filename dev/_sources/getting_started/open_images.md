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

# Open images in napari

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
