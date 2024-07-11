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
(image-layer)=
# Using the `image` layer

In this document, you will learn how to use the `napari` `image` layer,
including the types of images that can be displayed, and how to set properties
like `contrast limits`, `opacity`, `colormaps`, `blending` and `interpolation`.
You will also understand how to add and manipulate a variety of different types
of images both from the GUI and from the console.

For more information about layers, refer to [Layers at a glance](../../guides/layers).

## Controlling the `image` layer using the GUI

The GUI contains following tools in the `layer controls` panel for the `image`
layer:

* Buttons
    * Pan/zoom
    * Transform
* Controls
    * Opacity
    * Contrast Limits
    * Auto-contrast
    * Gamma
    * Colormap
    * Blending
    * Interpolation

Before we can use any of the GUI `layer controls`, we must load an image.
1. Start napari.
2. Click `File` > `Open Sample` > `napari builtins` > `Cells (3D+2Ch)` or any
sample image of your choice.

### Buttons

* `Pan/zoom` ![image: Pan/zoom tool](../../images/pan-zoom-tool.png) is the default mode
  of the layer and supports panning and zooming. Press the `1` key when the layer is selected
  to use this mode.

* `Transform` ![image: Transform](../../images/transform-tool.png) enables you to
  rotate, scale, or translate the layer. Note: at present this feature is limited to 2D viewer display mode.
  To reset the transformation,
  you can Option/Alt-click the transform button (a confirmation dialog will open to
  confirm the reset). Press the `2` key when the layer is selected to use this mode.

### Controls

The GUI controls may be adjusted as follows:

* `opacity` is adjusted by moving the circle along the slider until the image
  has the opacity you want. 0 is transparent and 1 is completely opaque.

* `contrast limits` are adjusted by moving the minimum and maximum circles along
  the slider until you have the contrast limits you want. For more precise
  control, including the ability to set specific numerical values, you can
  right-click on the slider. **Note:** Contrast limits are explained in
  [Adjusting contrast limits](#adjusting-contrast-limits).

* `auto-contrast` is adjusted by selecting either `once` or `continuous`. `once`
  adjusts the contrast one time while `continuous` adjusts the contrast as you
  explore the image.

* `gamma` can be adjusted from a minimum of 0.20 to a maximum of 2.00.
  *Gamma correction* or *gamma* is a nonlinear operation used to encode and
  decode luminance or tristimulus values.

* `colormap` is selected from the dropdown. **Note:** If the image you select is
  an RGB or RGBA image, the colormap is automatically assigned RGB and cannot be
  changed. You can find out if your image is RGB or RGBA by looking at the
  `.rgb` property of the image layer.

* `blending` has the options of `translucent`, `translucent no depth`,
  `additive`, `minimum`, or `opaque` in the dropdown. Refer to the
  [Blending layers](blending-layers) section of _Layers at a glance_ for an
  explanation of each type of blending.

* `interpolation` may be assigned one of the following from the dropdown:
  * `cubic`
  * `linear`
  * `kaiser`
  * `nearest` - default
  * `spline36`

  **Note:** There is a brief explation of [interpolation](layer-interpolation)
  in [Layers at a glance](../../guides/layers).

## Controlling the `image` layer from the console

### A simple example

Create a new viewer and add an image in one go using the {func}`napari.view_image`
function, or if you already have an existing viewer, add an image to it using
`viewer.add_image`. The API for both methods is the same. In these examples
we'll mainly use `view_image`.

A simple example of viewing an image is as follows:

```{code-cell} python
import napari
from skimage import data

cells = data.cells3d()[30, 1]  # grab some data
viewer = napari.view_image(cells, colormap='magma')
```

```{code-cell} python
:tags: [hide-input]

from napari.utils import nbscreenshot

nbscreenshot(viewer, alt_text="Cells")
```

```{code-cell} python
:tags: [remove-cell]

viewer.close()
```

## Arguments of `view_image` and `add_image`

{meth}`~napari.view_layers.view_image` and {meth}`~napari.Viewer.add_image`
accept the same layer-creation parameters.

```{code-cell} python
:tags: [hide-output]

help(napari.view_image)
```

## Image data and NumPy-like arrays

napari can take any NumPy-like array as input for its image layer. A NumPy-like
array can be a
[numpy array](https://numpy.org/doc/stable/reference/generated/numpy.array.html),
a [dask array](https://docs.dask.org/en/stable/array.html), an
[xarray](https://docs.xarray.dev/en/stable/generated/xarray.DataArray.html), a
[zarr array](https://zarr.readthedocs.io/en/stable/api/core.html), or any other
object that you can index into and when you call
[`np.asarray`](https://numpy.org/doc/stable/reference/generated/numpy.asarray.html)
on it you get back a NumPy array.

The great thing about napari support of array-like objects is that you get to
keep on using your favorite array libraries without worrying about any
conversions. napari handles all of that for you.

napari will also wait until just before it displays data onto the screen to
actually generate a NumPy array from your data, and so if you're using a library
like `dask` or `zarr` that supports lazy loading and lazy evaluation, we won't
force you to load or compute data that you're not examining. This enables
napari to seamlessly browse enormous datasets that are loaded in the right way.
For example, here we are browsing over 100GB of lattice lightsheet data stored
in a `zarr` file:

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="../../_static/images/LLSM.webm" type="video/webm" />
    <source src="../../_static/images/LLSM.mp4" type="video/mp4" />
    <img src="../../_static/images/LLSM.png"
      title="Your browser does not support the video tag"
      alt="napari viewer with an image layer of lattice lightsheet data opened. It can be browsed using the slider at the bottom of the viewer."
    >
  </video>
</figure>
```

## Multiscale images

For exceptionally large datasets, napari supports multiscale images (sometimes
called image pyramids). A multiscale image is a list of arrays, where each
array is downsampling of the previous array in the list. This means you end up
with images of successively smaller and smaller shapes. A standard multiscale
image might have a 2x downsampling at each level, but napari can support any
type of multiscale image as long as the shapes are getting smaller each time.

Multiscale images are especially useful for incredibly large 2D images when
viewed in 2D or incredibly large 3D images when viewed in 3D. For example this
~100k x 200k pixel pathology image consists of 10 pyramid levels and can be
easily browsed as at each moment in time we only load the level of the
multiscale image and the part of the image that needs to be displayed:

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="../../_static/images/pathology.webm" type="video/webm" />
    <source src="../../_static/images/pathology.mp4" type="video/mp4" />
    <img src="../../_static/images/pathology.png"
      title="Your browser does not support the video tag"
      alt="napari viewer with a large image layer zoomed all the way in and all the way out in a matter of seconds thanks to multiscale image support."
    >
  </video>
</figure>
```

This example had precomputed multiscale images stored in a `zarr` file, which is
best for performance. If you don't have a precomputed multiscale image but try
and show an exceptionally large image, napari will try and compute the
multiscale image for you unless you tell it not to.

You can use the boolean `multiscale` keyword argument when creating an image
layer to specify if your data is a multiscale image or not. If you don't provide
this value, then napari will try and guess whether your data is or needs to be a
multiscale image.

## Loading multichannel images

Each channel in a multichannel image can be displayed as an individual layer by
using the `channel_axis` argument in {meth}`viewer.add_image()`. All the rest of
the arguments to `viewer.add_image()` (e.g. `name`, `colormap`,
`contrast_limit`) can take the form of a list of the same size as the number of
channels.

For example, the multichannel image below has dimensions (60, 2, 256, 256) with
axes ordered ZCYX (so the channel axis has an index of 1). It is loaded into
napari in one line, as shown below:

```{code-cell} python
import napari
from skimage import data

cells = data.cells3d() #ZCYX image data

# load multichannel image in one line
viewer = napari.view_image(cells, channel_axis=1)

# load multichannel image in one line, with additional options
viewer = napari.view_image(
    cells,
    channel_axis=1,
    name=["membrane", "nuclei"],
    colormap=["green", "magenta"],
    contrast_limits=[[1000, 20000], [1000, 50000]],
)
```

```{code-cell} python
:tags: [hide-input]

from napari.utils import nbscreenshot

nbscreenshot(viewer, alt_text="napari viewer with a multichannel image of cells displayed as two image layers: nuclei and membrane.")
```

```{code-cell} python
:tags: [remove-cell]

viewer.close()
```

## Viewing RGB vs luminance (grayscale) images

In this example, the `rgb` keyword is explicitly set to `True` because we know
we are working with an `rgb` image:

```{code-cell} python
viewer = napari.view_image(data.astronaut(), rgb=True)
```

```{code-cell} python
:tags: [hide-input]

from napari.utils import nbscreenshot

nbscreenshot(viewer, alt_text="napari viewer with the left sidebar layer controls and an image of astronaut Eileen Collins. In the layer controls, the colormap is fixed to RGB")
```

```{code-cell} python
:tags: [remove-cell]

viewer.close()
```

If we had left the `rgb` keyword argument out, napari would have successfully
guessed that we were trying to show an `rgb` or `rgba` image because the final
dimension for the image array was 3 or 4. If you have a luminance image where
the last dimension is 3 or 4, you can set the `rgb` argument to `False` to
explicitly state this is not a color image and get a slider for that dimension.

`rgb` data must either be `uint8`, corresponding to values between 0 and 255, or
`float` and between 0 and 1. If the values are `float` and outside the 0 to 1
range they will be clipped.

## Working with colormaps

napari supports any colormap that is created with `vispy.color.Colormap`. We
provide access to some standard colormaps that you can set using a string of
their name. These include:

```{code-cell} python
list(napari.utils.colormaps.AVAILABLE_COLORMAPS)
```

Pass any of these strings to set the image colormap as shown below:


```{code-cell} python
viewer = napari.view_image(data.moon(), colormap='red')
```

You can also access the current colormap through the `layer.colormap` property
which returns a tuple of the colormap name followed by the vispy colormap
object. You can list all the available colormaps using `layer.colormaps`.

It is also possible to create your own colormaps using vispy's
`vispy.color.Colormap` object. See its
[full documentation](https://vispy.org/api/vispy.color.colormap.html#vispy.color.colormap.Colormap).
Briefly, you can pass `Colormap` a list of length 3 or 4, corresponding to the
`rgb` or `rgba` values at different points along the colormap.

For example, to make a diverging colormap that goes from red to blue through
black, and color a random array, you can use this example code:

```{code-cell} python
import napari
from skimage.data import cell
from vispy.color import Colormap

cmap = Colormap([[1, 0, 0], [0, 0, 0], [0, 0, 1]])
image = cell()

viewer = napari.view_image(image, colormap=('diverging', cmap))
```

```{code-cell} python
:tags: [hide-input]

from napari.utils import nbscreenshot

nbscreenshot(viewer, alt_text="napari viewer with colormap example using the cell example from skimage")
```

Note in this example the colormap keyword argument was passed as a tuple
containing both a name for the new custom colormap and the colormap itself. If
we had passed only the colormap it would have been given a default name.

The named colormap now appears in the dropdown alongside a thumbnail of the full
range of the colormap.

## Adjusting contrast limits

Each image layer gets mapped through its colormap according to values called
contrast limits. Contrast limits are a 2-tuple where the second value is
larger than the first. The smaller contrast limit corresponds to the value of
the image data that will get mapped to the color defined by 0 in the colormap.
All values of image data smaller than this value will also get mapped to this
color. The larger contrast limit corresponds to the value of the image data that
will get mapped to the color defined by 1 in the colormap. All values of image
data larger than this value will also get mapped to this color.

For example, if you are looking at an image that has values between 0 and 100 with
a standard `gray` colormap, and you set the contrast limits to `(20, 75)`, then
all the pixels with values less than 20 will get mapped to black, the color
corresponding to 0 in the colormap, and all pixels with values greater than 75
will get mapped to white, the color corresponding to 1 in the colormap. All
other pixel values between 20 and 75 will get linearly mapped onto the range of
colors between black and white.

In napari you can set the *contrast limits* when creating an `Image` layer or on
an existing layer using the `contrast_limits` keyword argument or property,
respectively.

```{code-cell} python
viewer = napari.view_image(data.moon(), name='moon')
viewer.layers['moon'].contrast_limits=(100, 175)
```

```{code-cell} python
:tags: [hide-input]

from napari.utils import nbscreenshot

nbscreenshot(viewer, alt_text="A viewer where the contrast limits have been adjusted")
```

```{code-cell} python
:tags: [remove-cell]

viewer.close()
```

Because the contrast limits are defined by two values, the corresponding slider
has two handles: one adjusts the smaller value, and one adjusts the larger
value.

As of right now, adjusting the contrast limits has no effect for `rgb` data.

If contrast limits are not passed, napari will compute them. If your data is
small, napari will take the minimum and maximum values across your
entire image. If your data is exceptionally large, this operation can be very
time consuming and so if you pass an image pyramid then napari will use only the
top level of that pyramid, or it will use the minimum and maximum values
across the top, middle, and bottom slices of your image. In general, if working
with big images, it is recommended to explicitly set the contrast limits if you
can.

Currently if you pass contrast limits as a keyword argument to a layer, then the
full extent of the `contrast limits:` range slider will be set to those values.

## Saving without image compression

When saving an image layer, lossless zlib compression is applied by default. To
save with a different level of compression, consider using
[imageio.imwrite](https://imageio.readthedocs.io/en/stable/_autosummary/imageio.v3.imwrite.html).
Adjusting compression can be accomplished by including the appropriate kwargs as
outlined in the following locations for
[tiff](https://imageio.readthedocs.io/en/stable/_autosummary/imageio.plugins.tifffile.html#metadata-for-writing) or
[png](https://pillow.readthedocs.io/en/stable/handbook/image-file-formats.html#png) files.
