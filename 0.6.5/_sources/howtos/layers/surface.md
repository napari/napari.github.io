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

(layers-surface)=
# Using the `surface` layer

In this document, you will learn about the `napari` `surface` layer, including
how to display surface data and edit the properties of surfaces like the
contrast, opacity, colormaps and blending mode. You will also understand how to
add and manipulate surfaces mostly from the console. There are a few slider
controls that are available in the GUI.

For more information about layers, refer to [Layers at a glance](../../guides/layers).

```{note}
Surface layers can be created only programmatically, i.e. in the console, or
using a script, not from the GUI. Please refer to
[A simple example](#a-simple-example) and use the code there to add a surface
layer first, then explore the GUI controls.
```

## When to use the `surface` layer

The surface layer allows you to display a precomputed surface mesh that is
defined by an `NxD` array of `N` vertices in `D` coordinates, an `Mx3` integer
array of the indices of the triangles making up the faces of the surface, and a
length `N` list of values to associate with each vertex to use alongside a
colormap.

## A simple example

You can create a new viewer and add a surface in one go using the
{meth}`napari.view_surface` method, or if you already have an existing viewer,
you can add an image to it using `viewer.add_surface`. The API of both methods
is the same. In these examples we'll mainly use `view_surface`.

A simple example of viewing a surface follows. You can copy and paste these
statements into the napari console to see how they work:

```{code-cell} python
import napari
import numpy as np

vertices = np.array([[0, 0], [0, 20], [10, 0], [10, 10]])
faces = np.array([[0, 1, 2], [1, 2, 3]])
values = np.linspace(0, 1, len(vertices))
surface = (vertices, faces, values)

viewer = napari.view_surface(surface)  # add the surface
```

```{code-cell} python
:tags: [hide-input]

from napari.utils import nbscreenshot

nbscreenshot(viewer, alt_text="A viewer with a surface")
```

```{code-cell} python
:tags: [remove-cell]

viewer.close()
```

## GUI controls for the `surface` layer

Once you have created a `surface` layer programmatically, the following GUI
controls are available in the viewer:

* **Buttons**
  * Pan/zoom - ![image: Pan/zoom tool](../../_static/images/pan-zoom-tool.png) is the default
    mode of the layer and supports panning and zooming. Press the `1` key when the
    layer is selected to use this mode.
  * Transform - ![image: Transform](../../_static/images/transform-tool.png) enables you to
    rotate, scale, or translate the layer. Note: at present this feature is limited to 2D viewer display mode. To reset the transformation, you can
    Option/Alt-click the transform button (a confirmation dialog will open to
    confirm the reset). Press the `2` key when the layer is selected to use this mode.
* **Controls**
  * Opacity - use this slider control to assign opacity from 0 to 1.00 where 0 is
    transparent and 1.00 is completely opaque.
  * Contrast Limits - click and slide the dots on either end of the slider bar to
    adjust upper and lower contrast limits.
  * Auto-contrast - choose once or continuous.
  * Gamma - Click on the oval on the gamma slider bar and adjust it to any value
    between 0.20 and 2.00. Gamma correction or gamma is a nonlinear operation used
    to encode and decode luminance or tristimulus values in video or still image
    systems.
  * Colormap - select a value from the dropdown list.
  * Blending - Choose `opaque`, `translucent`, `translucent no depth`, or
    `additive` from the dropdown. Refer to the [Blending layers](blending-layers)
    section of _Layers at a glance_ for an explanation of each type of blending.
  * Shading - Choose `none`, `flat`, or `smooth` from the dropdown.

## Arguments of `view_surface` and `add_surface`

{meth}`~napari.view_layers.view_surface` and {meth}`~napari.Viewer.add_surface`
accept the same layer-creation parameters.

```{code-cell} python
:tags: [hide-output]

help(napari.view_surface)
```

## Surface data

The data for a `surface` layer is defined by a 3-tuple of its vertices, faces,
and vertex values. The vertices are an `NxD` array of `N` vertices in `D`
coordinates. The faces are an `Mx3` integer array of the indices of the
triangles making up the faces of the surface. The vertex values are a length `N`
list of values to associate with each vertex to use alongside a colormap. This
3-tuple is accessible through the `layer.data` property.

## 3D rendering

All layers can be rendered in both 2D and 3D. One of the viewer buttons at the
bottom of the left panel can toggle between these 2 modes.
When in 2D, the button looks like this: ![image: 2D/3D button](../../_static/images/3D-button.png), ready to switch to 3D mode.
When in 3D, the button looks like this: ![image: 2D/3D button](../../_static/images/2D-button.png), ready to switch to 2D mode.

The number of dimensions sliders will be 2 or 3 less than the total number of
dimensions of the layer, allowing you to browse volumetric timeseries data and
other high dimensional data. An example is these brain surfaces rendered in 3D:

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="../../_static/images/brain_surface.webm" type="video/webm" />
    <source src="../../_static/images/brain_surface.mp4" type="video/mp4" />
    <img src="../../_static/images/brain_surface.png"
      title="Your browser does not support the video tag"
      alt="Brain surface in 3D view."
    >
  </video>
</figure>
```

## Working with colormaps

The same colormaps available for the `image` layer are also available for the
`surface` layer. napari supports any colormap that is created with
`vispy.color.Colormap`. We provide access to some standard colormaps that you
can set using a string of their name. Please see the list below.

```{code-cell} python
list(napari.utils.colormaps.AVAILABLE_COLORMAPS)
```

Passing any of these as keyword arguments will set the colormap of that surface.
You can also access the current colormap through the `layer.colormap` property
which returns a tuple of the colormap name followed by the vispy colormap
object. You can list all the available colormaps using `layer.colormaps`.

It is also possible to create your own colormaps using vispy's
`vispy.color.Colormap` object, see it's full
[documentation here](https://vispy.org/api/vispy.color.colormap.html#vispy.color.colormap.Colormap).
For more detail see the [image layer guide](layers-image).

## Adjusting contrast limits

The vertex values of the `surface` layer get mapped through its colormap according
to values called `contrast limits`. These are a 2-tuple of values defining how
what values get applied the minimum and maximum of the colormap and follow the
same principles as the `contrast_limits` described in the
[image layer guide](layers-image). They are also accessible through the same keyword
arguments, properties, and GUI layer controls as in the image layer.
