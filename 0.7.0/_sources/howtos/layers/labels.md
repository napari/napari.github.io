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

(layers-labels)=

# Using the `labels` layer

In this document, you will learn about the `napari` `Labels` layer, including
using the layer to display the results of image segmentation analyses, and how
to manually segment images using the paintbrush and fill buckets. You will also
understand how to add a labels image and edit it from the GUI and the
console.

For more information about layers, refer to [Layers at a glance](../../guides/layers).

## When to use the `labels` layer

The `labels` layer allows you to take an array of integers and display each
integer as a different random color, with the background color 0 rendered as
transparent.

The `labels` layer is especially useful for segmentation tasks where each pixel
is assigned to a different class, as in semantic segmentation, or where pixels
corresponding to different objects all get assigned the same label, as in
instance segmentation.

## GUI tools for the `labels` layer

The GUI contains following tools in the `layer controls` panel for the `labels`
layer:

- Buttons
  - shuffle colors
  - label eraser
  - paintbrush
  - polygon tool
  - fill bucket
  - color picker
  - pan/zoom mode
  - transform mode
- Controls
  - label
  - opacity
  - brush size
  - blending
  - color mode
  - contour
  - n edit dim
  - contiguous
  - preserve labels
  - show selected

### Buttons

- **Shuffle colors**

  The color that each integer gets assigned is random, aside from 0 which always
  gets assigned to be transparent. The colormap we use is designed such that
  nearby integers get assigned distinct colors. The exact colors that get
  assigned are determined by a [random seed](https://numpy.org/doc/stable/reference/random/generated/numpy.random.seed.html).
  Changing that seed will shuffle the colors assigned to each label. To change
  the seed, click on the `shuffle colors` button in the layer controls panel.
  This changes the color of existing labels. Shuffling colors can be useful as
  some colors may be hard to distinguish from the background or nearby objects.

- **Label eraser**

  Use this tool to manually erase a label on the `labels layer`. Other layers
  will not be affected. The label eraser tool looks like this:
  ![image: eraser tool](../../_static/images/labels-layer-eraser.png)

- **Paintbrush**

  One of the major use cases for the `labels layer` is to manually edit or
  create image segmentations. One of the tools that can be used for manual
  editing is the `paintbrush`, activated by clicking the `paintbrush` icon in
  the `layer controls` panel. Once the paintbrush is enabled, the pan and zoom
  functionality of the viewer canvas is disabled, and you can paint on the
  canvas. You can temporarily re-enable pan and zoom by pressing and holding the
  spacebar. This feature is useful if you want to move around the `labels layer`
  as you paint.

  Click the `paintbrush` icon and select a color from the `label` option by
  clicking on the + or - on the label bar in the layer controls panel. This will
  scroll through the available colors.

  ```{tip}
  If you press the {kbd}`m` key, you will get a new, unused label -- one larger than the current
  largest label.
  ```

  Whatever color you pick will be the *edge color* of the label.
  Draw the edge of the label using the `paintbrush`. If you draw a continuous edge,
  you can fill it in using the `paint bucket` or `fill bucket` tool.
  It can be the same color as the edge or a different color.

  Adjust the size of your `paintbrush` using the `brush size` slider or using
  the default keybindings: `[` and `]`. The brush size can be as small as a
  single pixel for incredibly detailed painting.

  If you have a multidimensional `labels layer` then your `paintbrush` will edit
  data only in the visible slice by default. If you switch `n edit dim` from `2` to `3`
  or set the `n_edit_dimensions` property to `3`, then your paintbrush and eraser
  will extend out into neighbouring slices according to its size.

  To quickly select the paintbrush, press the `2` key when the `labels layer` is
  selected.

- **Polygon**

  Another tool that can be used to quickly add or edit image segmentations is
  the `polygon` tool. It combines functionality of the `paintbrush` and `fill bucket`
  tools by allowing for readily drawing enclosed instance segmentations.
  The `polygon` tool can be activated by clicking on the icon
  resembling a polygon in the layer control panel or by pressing `3`. Once
  activated, the user actions are as follows:

  1. Left-click anywhere on the canvas to start drawing the polygon.
  1. Move the mouse to the location where you want the next vertex to be.
  1. Click again to set the vertex that is tracking the mouse cursor.
  1. After this step a polygon overlay will appear when moving the mouse. Repeat
     steps 2 and 3 until the shape to be segmented is enclosed by the polygon
     overlay.
  1. To undo the last added vertex, use a right-click.
  1. To cancel the drawing at any time without making a permanent change on the
     labels layer, press `Esc`. This will delete the polygon overlay.
  1. To finish drawing and complete the shape, use double click for the last vertex
     or press "Enter". This will add the polygon overlay to the labels layer.
     Note that in Settings > Experimental you can enable and set the minimum distance
     to the origin vertex required for double click to complete the shape.

  The polygon overlay will have the color of the label. The polygon overlay also
  has an opacity that can be adjusted the value of the `opacity` slider in the
  layer control panel. Furthermore, while the polygon overlay may be visible
  outside the canvas space during drawing, upon finishing drawing the polygon
  will be cut off so that the part outside the canvas space is removed. This
  ensures that the dimensions of the label image are not larger than the image
  for which you are segmenting of for which you are editing the segmentations.

  Note: if you use the `polygon` tool for adding or editing segmentations of 3D
  image data, you can only adjust labels in one plane, with the exception when
  viewing the image data as RGB. The `polygon` tool cannot be activated if the
  number of displayed dimensions is higher than two. If already active upon
  toggling the number of displayed dimensions, the `polygon` tool will be
  automatically deactivated.

- **Fill bucket**

  Sometimes you might want to replace an entire label with a different label.
  This could be because you want to make two touching regions have the same
  label, or you want to replace only one label with a different one, or maybe
  you have painted around the edge of a region and you want to quickly fill in
  its inside. To do this you can select the `fill bucket` tool by clicking on
  its icon in the `layer controls` panel, and then click on a target region of
  interest in the layer. The fill bucket will fill using the currently selected
  label. If nothing is selected the entire layer will be filled with that label.

  By default, the `fill bucket` will change only contiguous or connected pixels
  of the same label as the pixel that is clicked on. If you want to change all
  the pixels of that label layer regardless of where they are in the slice, then
  you can set the `contiguous` property or checkbox to `False`. Then everything
  on that layer will be colored by the new label.

  If you have a multidimensional `labels layer` the `fill bucket` will edit data
  only in the visible slice by default. However, if you set the
  `n_edit_dimensions` property to `3`, then `fill bucket` will extend out into
  neighbouring slices, either to all pixels with that label in the layer, or only
  connected pixels depending on if the `contiguous` property is disabled or not.

  To quickly select the fill bucket, press the {kbd}`4` key when the `labels layer`
  is selected.

- **Color picker**

  The `color picker` can be used to select another color at any time. Click the
  color picker tool then click on the existing color in the labels layer you
  would like to use. That color now appears on the label bar as the selected
  color. If the color does not exist in the label color palette, it defaults
  to 0 and a checkerboard pattern appears in the thumbnail on the label bar to
  represent the transparent color.

  To quickly select the color picker, press the `5` key when the `labels layer`
  is selected.

  **Note:** The color of the label can be selected by clicking on the + or -
  symbols at either end of the bar or by clicking on the number in the center of
  the bar and typing in the number of the color to use. 255 colors are available.

### Controls

- Label

  Use this control to choose a color for a label you are about to create or to
  change the color of an existing label.

- Opacity

  Click and hold the oval on the opacity slider bar and adjust it to any value
  between 0.00 (clear) and 1.00 (completely opaque).

- Brush size

  Adjust the size of the `paintbrush` using the `brush size` slider to any value
  from 1 to 40. 1 is as small as a single pixel.

- Blending

  Select from `translucent`, `translucent no depth`, `additive`, `minimum`, or
  `opaque` from the dropdown. Refer to the [Blending layers](blending-layers)
  section of _Layers at a glance_ for an explanation of each type of blending.

- Color mode

  Select `auto` or `direct` from the dropdown. Auto is the default and allows
  color to be set via a hash function with a seed. Direct allows the color of
  each label to be set directly by a color dictionary, which can be accessed
  directly via the `color` property of the layer, `layer.color`.

- Contour

  If this field has any value other than 0, only the contours of the labels
  will show. Change the value by clicking the - or + symbols on either end of
  the bar, or by clicking the number in the center of the bar and typing in the
  desired value.

- n edit dim

  This is the number of dimensions across which labels will be edited.

- Contiguous

  If this box is checked, the `fill bucket` changes only connected pixels of the
  same label.

- Preserve labels

  If this box is checked, existing labels are preserved while painting. It
  defaults to false to allow painting on existing labels. When set to true,
  existing labels will be preserved during painting.

  ```{tip}
  You can toggle this mode using the default keybinding {kbd}`b`.
  ```

- Show selected

  When this is checked, only the selected labels will be displayed. Selected
  labels are those labels that match the color in the `label` control. When it
  is not checked, all labels will be displayed.

## Editing using the tools in the GUI

### Pan and zoom mode

The default mode of the `labels layer` is to support panning and zooming. This
mode is represented by the magnifying glass in the `layer controls` panel. While
pan and zoom is selected, editing the layer is not possible. Once you click on
one of the editing tools, pan and zoom is turned off. Return to pan and zoom
mode by pressing the `6` key when the `labels layer` is selected.

### Transform mode

This mode is represented by ![image: Transform](../../_static/images/transform-tool.png) in the
`layer controls` panel. It enables you to rotate, scale, or translate the layer.
Note: at present this feature is limited to 2D viewer display mode.
To reset the transformation, you can Option/Alt-click the transform button (a
confirmation dialog will open to confirm the reset). Enable this mode by pressing
the `7` key when the `labels layer` is selected.

### Creating a new `labels layer`

Create a brand-new empty `labels layer` by clicking the `New labels layer`
button above the layer list. The shape of the new labels layer will match the
size of any currently existing image layers, allowing you to paint on top of
them.

### Selecting a label

A particular label can be chosen in one of three ways:

- Using the label control inside the `layer controls` panel and typing in the
  numeric value of the desired label;

- Using the + or - buttons to get to the desired label color (or press the
  default keybinding {kbd}`m` to set a new label);

- Selecting the `color picker` tool and then clicking on a pixel with the
  desired label color in the image.

When a label is chosen, the integer value associated with it appears inside the
label control and the color of the label is shown in the thumbnail next to the
control. If the 0 label is selected, then a checkerboard pattern is shown in the
thumbnail to represent the transparent color.

You can quickly select the color picker by pressing the `5` key when the labels
layer is selected.

While painting with a label, you can swap between the current (selected) label
and the transparent background label (`0`) by pressing `x`.

You can set the selected label to a new label -- one larger than the current
largest label -- by pressing {kbd}`m`. This selection will guarantee that you are
using a label that hasn't been used before.

You can also increment or decrement the currently selected label by pressing the
`=` or `-` keys, respectively.

### Creating, deleting, merging, and splitting connected components

Create and edit object segmentation maps using the `color picker`, `paintbrush`,
and `fill bucket` tools. Below we show how to use these tools by performing
common editing tasks on connected components (keep the `contiguous` box checked).

- Creating or drawing a connected component

  ```{raw} html
  <figure>
    <video width="100%" controls autoplay loop muted playsinline>
      <source src="../../_static/images/draw_component.webm" type="video/webm" />
      <source src="../../_static/images/draw_component.mp4" type="video/mp4" />
      <img src="../../_static/images/draw_component.png"
        title="Your browser does not support the video tag"
        alt="Using the paintbrush and fill bucket tools to draw a connected component."
      >
    </video>
  </figure>
  ```

  - Press `m` to select a label color that has not been used.
  - Select the `paintbrush` tool and draw a closed contour around the object.
  - Select the `fill bucket` tool and click inside the contour to assign the
    label to all pixels of the object.

- Deleting a connected component

  ```{raw} html
  <figure>
    <video width="100%" controls autoplay loop muted playsinline>
      <source src="../../_static/images/delete_label.webm" type="video/webm" />
      <source src="../../_static/images/delete_label.mp4" type="video/mp4" />
      <img src="../../_static/images/delete_label.png"
        title="Your browser does not support the video tag"
        alt="Deleting selected labels."
      >
    </video>
  </figure>
  ```

  Select the background label with the `color picker` or press `x`, then use the
  `fill bucket` to set all pixels of the
  connected component to background.

- Merging connected components

  ```{raw} html
  <figure>
    <video width="100%" controls autoplay loop muted playsinline>
      <source src="../../_static/images/merge_labels.webm" type="video/webm" />
      <source src="../../_static/images/merge_labels.mp4" type="video/mp4" />
      <img src="../../_static/images/merge_labels.png"
        title="Your browser does not support the video tag"
        alt="Selecting a label and merging with a connecting label."
      >
    </video>
  </figure>
  ```

  - Select the label of one of the components with the `color picker` tool.
  - Select the `fill bucket` and fill the components to be merged.

- Splitting a connected component

  ```{raw} html
  <figure>
    <video width="100%" controls autoplay loop muted playsinline>
      <source src="../../_static/images/split_label.webm" type="video/webm" />
      <source src="../../_static/images/split_label.mp4" type="video/mp4" />
      <img src="../../_static/images/split_label.png"
        title="Your browser does not support the video tag"
        alt="Using the paintbrush tool to split a label into two."
      >
    </video>
  </figure>
  ```

  Splitting a connected component will introduce an additional object.

  - Select the background label with the `color picker` or press `x`.
  - Use the `paintbrush` tool to draw a dividing line where you want to split
    the component.
  - Assign the new label to one of the parts with the `fill bucket`.

### Undo/redo functionality

When using the `fill bucket` or `paintbrush` it can be easy to make a mistake
that you might want to undo or you might want to redo something that has just
been undone. Use `ctrl-z` to redo and `shift-ctrl-z` to redo. There are plans
to support this sort of functionality more generally, but for now these actions
will undo the most recent painting or filling event, up to 100 events in the
past.

```{warning}
If you have multidimensional data, adjusting the currently viewed slice will
cause the undo history to be reset.
```

## Controlling the `labels` layer from the console

### A simple example

Create a new viewer with `napari.Viewer()` and then add a labels image in one go using the {meth}`~napari.Viewer.add_labels` method.
In these examples we'll mainly use `add_labels` to overlay
a `Labels` layer onto on image.

In this example of instance segmentation, we will find and segment each of the
coins in an image, assigning each one an integer label, and then overlay the
results on the original image as follows:

```{code-cell} python
import napari
from skimage import data
from skimage.filters import threshold_otsu
from skimage.segmentation import clear_border
from skimage.measure import label
from skimage.morphology import closing, square, remove_small_objects

coins = data.coins()[50:-50, 50:-50]
# apply threshold
thresh = threshold_otsu(coins)
bw = closing(coins > thresh, square(4))
# remove artifacts connected to image border
cleared = remove_small_objects(clear_border(bw), 20)
# label image regions
label_image = label(cleared)

# create the viewer and add the coins image
viewer, _ = napari.imshow(coins, name='coins')
# add the labels
labels_layer = viewer.add_labels(label_image, name='segmentation')
```

```{code-cell} python
---
tags: [hide-input]
---
from napari.utils import nbscreenshot

nbscreenshot(viewer, alt_text="Segmentation of coins in an image, displayed using a labels layer")
```

```{code-cell} python
---
tags: [remove-cell]
---
viewer.close()
```

### Arguments of `add_labels`

{meth}`~napari.Viewer.add_labels`
accepts the following layer-creation parameters.

```{code-cell} python
---
tags: [hide-output]
---
help(napari.Viewer.add_labels)
```

### Labels data

The `labels` layer is a subclass of the `image` layer and as such can support
the same NumPy-like arrays, including
[dask arrays](https://docs.dask.org/en/stable/array.html),
[xarrays](https://docs.xarray.dev/en/stable/generated/xarray.DataArray.html),
and [zarr arrays](https://zarr.readthedocs.io/en/stable/api/core.html). A
`Labels` layer must be integer valued, and the background label must be
0\.

Because the `labels` layer subclasses the `image` layer, it inherits the great
properties of the `image` layer, like supporting lazy loading and multiscale
images for big data layers. For more information about both these concepts see
the details in the [image layer guide](layers-image).

## Creating a new labels layer

As you can edit a `Labels` layer using the paintbrush and fill bucket, it is
possible to create a brand-new empty labels layers by clicking the new labels
layer button above the layers list. The shape of the new labels layer will match
the size of any currently existing image layers, allowing you to paint on top of
them.

```{admonition} Want to save without compression?
---
class: tip
---
When saving a labels layer, lossless zlib compression is applied by default.
To save with a different level of compression, consider using
[imageio.imwrite](https://imageio.readthedocs.io/en/stable/_autosummary/imageio.v3.imwrite.html).

Adjusting compression can be accomplished by including the appropriate keyword
arguments as outlined in the following locations for
[tif](https://imageio.readthedocs.io/en/stable/_autosummary/imageio.plugins.tifffile.html#metadata-for-writing) or
[png](https://pillow.readthedocs.io/en/stable/handbook/image-file-formats.html#png) files.
```

### Non-editable mode

If you want to disable editing of the labels layer you can set the `editable`
property of the layer to `False`.

As noted in the section on [3D rendering](#3d-rendering), when using 3D
rendering the labels layer is not editable. Similarly, for now, a `labels` layer
where the data is represented as a multiscale image is not editable.

### 3D rendering

All layers can be rendered in both 2D and 3D. One of the viewer buttons at the
bottom of the left panel can toggle between these 2 modes.
When in 2D, the button looks like this: ![image: 2D/3D button](../../_static/images/3D-button.png), ready to switch to 3D mode.
When in 3D, the button looks like this: ![image: 2D/3D button](../../_static/images/2D-button.png), ready to switch to 2D mode.

The number of dimensions sliders will be 2 or 3 less than the total number of
dimensions of the layer, allowing you to browse volumetric timeseries data and
other high dimensional data.

```{code-cell} python
---
tags: [remove-output]
---
import napari
from skimage import data
from scipy import ndimage as ndi

blobs = data.binary_blobs(length=128, volume_fraction=0.1, n_dim=3)
viewer, _ = napari.imshow(blobs.astype(float), name='blobs')
labeled = ndi.label(blobs)[0]
labels_layer = viewer.add_labels(labeled, name='blob ID')
viewer.dims.ndisplay = 3
```

```{code-cell} python
---
tags: [hide-input]
---
# programmatically adjust the camera angle
viewer.camera.zoom = 2
viewer.camera.angles = (3, 38, 53)
nbscreenshot(viewer, alt_text="A 3D view of a labels layer on top of 3D blobs")
```

Note that in 3D rendering mode the `colorpicker`, `paintbrush`, and
`fill bucket` options are all disabled. Those options allow for layer editing
and are only supported when viewing a layer rendered in 2D.
