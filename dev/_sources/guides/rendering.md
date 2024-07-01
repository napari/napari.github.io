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

(rendering)=

# Rendering

This document explains how napari produces a 2- or 3-dimensional render in the canvas from layers' n-dimensional array-like data.
The intended audience is someone who wants to understand napari's rendering pipeline to help optimize its performance for their usage,
or someone who wants to contribute to and help improve the clarity or performance of napari's rendering pipeline itself.

## Overview

At a high level, rendering in napari is simple.

1. Viewing: {attr}`ViewerModel.dims<napari.components.ViewerModel.dims>` defines which 2D or 3D region is currently being viewed.
2. Slicing: [`Layer._slice_dims`](https://github.com/napari/napari/blob/b3a8dd22895c913d8183735f52b9d1d71c963d7f/napari/layers/base/base.py#L1184) loads the corresponding 2D or 3D region of the layer's ND data into RAM.
3. Drawing: [`VispyBaseLayer._on_data_change`](https://github.com/napari/napari/blob/b3a8dd22895c913d8183735f52b9d1d71c963d7f/napari/_vispy/layers/base.py#L126) pushes the 2D or 3D sliced data from RAM to VRAM to be drawn on screen.

But as the details of this document reveal, rendering in napari is, in fact, very complicated.

Consider some of the more important reasons for this.

- Multiple layers can have different extents with different transforms.
- Different layer types (e.g. Images vs. Points) handle slicing differently.
- Layer data can be large or slow to load into RAM.
- Sliced layer data may exceed the maximum texture size supported by the GPU.
- There are experimental settings that enable asynchronous slicing.

As a result, rendering in napari is the source of many bugs and performance problems that we are actively trying to fix and improve.

This document describes napari's simple rendering paths with pointers to the more powerful, unusual, and complicated ones.

We will use scikit-image's 3D cells data as a running example throughout this documentation.

```{code-cell} python
import napari

viewer = napari.Viewer()
viewer.open_sample('napari', 'cells3d')
```

```{code-cell} python
:tags: [hide-input]
from napari.utils import nbscreenshot

nbscreenshot(viewer, alt_text="3D cell nuclei and membranes rendered as 2D slices in the napari viewer")
```

## Dimensions

The region visible in napari's canvas is almost entirely determined by the state in {attr}`ViewerModel.dims<napari.components.ViewerModel.dims>`.
Changes to the attributes and properties of this class typically represent changes to that region, which then triggers slicing and rendering
so that the canvas is updated to present layers' data in that region.

### Range and world extent

{attr}`Dims.range<napari.components.Dims.range>` describes the extent of all layers in their shared world coordinate system,
in addition to the `step` that should be taken in each dimension as its corresponding slider position changes.

In our running example, the range

```{code-cell} python
viewer.dims.range
```

is solely determined by the shape of the data

```{code-cell} python
viewer.layers[0].data.shape
```

because the layers have the same shape and identity transforms.

### Point and selective slicing

{attr}`Dims.point<napari.components.Dims.point>` describes the coordinates of the current slice plane in that same world coordinate system.

In our running example, the default 2D view defines {attr}`Dims.point<napari.components.Dims.point>` to be

```{code-cell} python
viewer.dims.point
```

which represents the mid-point through all three dimensions.
As the last two dimensions are visualized in the canvas, this represents the 2D plane through the middle of the first dimension.

Only the dimensions in {attr}`Dims.not_displayed<napari.components.Dims.not_displayed>` have meaningful values in
{attr}`Dims.point<napari.components.Dims.point>` because all data in displayed dimensions is retained in a slice,
even though those data may not be visible in the canvas due to the current camera parameter values.

The current slice plane can be changed using the sliders or using the API directly

```{code-cell} python
viewer.dims.point = (0, 0, 0)
```

```{code-cell} python
:tags: [hide-input]
nbscreenshot(viewer, alt_text="3D cell nuclei and membranes rendered as 2D slices in the napari viewer")
```

again noting that the last two values are meaningless, but must be provided when using the API in this way.

### Margins and thick slicing

napari's API also has some support for performing thick slicing, which integrates over sub-volumes of data instead of selecting sub-regions.

{attr}`Dims.margin_left<napari.components.Dims.margin_left>` and {attr}`Dims.margin_right<napari.components.Dims.margin_right>`
are offsets around {attr}`Dims.point<napari.components.Dims.point>` that define the start and end-points for that integration.
{attr}`Dims.thickness<napari.components.Dims.thickness>` is simply the sum of the two margins.

By default, these thick slicing attributes are all zero

```{code-cell} python
print(f'{viewer.dims.margin_left=}')
print(f'{viewer.dims.margin_right=}')
print(f'{viewer.dims.thickness=}')
```

The margins can be changed individually to define an asymmetric window around `point`,
but it is more common to change {attr}`Dims.thickness<napari.components.Dims.thickness>` which defines a symmetric window instead

```{code-cell} python
viewer.dims.point = (29, 0, 0)
viewer.dims.thickness = (16, 0, 0)
print(f'{viewer.dims.margin_left=}')
print(f'{viewer.dims.margin_right=}')
```

In order for these parameters to have an effect on slicing a layer, that layer must support thick slicing and must define an interesting `projection_mode`.
For example, we can use the mean data over the slicing region for one of the layers

```{code-cell} python
viewer.layers[1].projection_mode = 'mean'
```

which takes an arithmetic mean across the slices in the window defined by the margins.
This effectively smooths the rendered slice across that window, which is particularly helpful when each individual slice is noisy.

```{code-cell} python
:tags: [hide-input]
nbscreenshot(viewer, alt_text="3D cell nuclei and membranes rendered as 2D slices in the napari viewer")
```

Thick slicing is still a work in progress (see [issue #5957](https://github.com/napari/napari/issues/5957)),
so feel free to suggest fixes and improvements.

## Slicing

Once the visible region in the world coordinate system is defined,
we need to transform that region into each layer's data coordinate system,
then read the layer's data in that region.

### Mapping from world to layer dimensions

The first step maps the shared world dimensions to the layer dimensions.
In the case that all layers have the same number of dimensions, this mapping is just the identity function.

In the case that layers have different numbers of dimensions,
napari uses the same approach as the [numpy broadcasting rules](https://numpy.org/doc/stable/user/basics.broadcasting.html#broadcasting)
to right-align the dimensions to determine the mapping.

For example, let's consider the case of one 2D and one 3D layer.

| World   | 0 | 1 | 2 |
| ------- | - | - | - |
| 2DLayer |   | 0 | 1 |
| 3DLayer | 0 | 1 | 2 |

As before, the mapping from the world dimensions to the 3D layer's dimensions is the identity function.
But the mapping from the world dimensions to the 2D layer's dimensions is a little trickier.
In this case, the world's dimensions 1 and 2 map to the 2D layer's dimension 0 and 1 respectively.

Using our example, we can see this in practice by replacing the membrane layer with its 2D mean projection over its first dimension

```{code-cell} python
import numpy as np
from napari.layers import Image

mean_data = np.mean(viewer.layers[0].data, axis=0)
viewer.layers[0] = Image(mean_data, colormap=viewer.layers[0].colormap)
world_dims = np.asarray(viewer.dims.order)
layer0_dims = viewer.layers[0]._world_to_layer_dims(
  world_dims=world_dims, ndim_world=3)
layer1_dims = viewer.layers[1]._world_to_layer_dims(
  world_dims=world_dims, ndim_world=3)
print(f'{layer0_dims=}')
print(f'{layer1_dims=}')
```

where `Layer._world_to_layer_dims` is a private method that is called as a part of slicing.

For simple cases like the above, this right-alignment approach tends to work well.

But for more complex cases, it quickly runs into problems.
For example, changing the dimensions that are displayed in the canvas (by changing {attr}`Dims.order<napari.components.Dims.order>`)
causes the mapping to change (see [issue #3882](https://github.com/napari/napari/issues/3882)).

We would love to fix these problems.
There are few related issues and conversations, but maybe the best way to track our progress is to follow [issue #5949](https://github.com/napari/napari/issues/5949)
which aims to enrich napari's handling of dimensions in general.

### Mapping from layer world to data coordinates

After identifying the layer's dimensions that are in view, we need to define how we are going to slice its data across its dimensions that are *not* in view.
In order to do this, we need to map from the layer's world coordinates to the layer's data coordinates.

This is achieved with `Layer.world_to_data` which transforms the world coordinates
(which take into account the layer's transform properties like `Layer.scale`, `Layer.translate`, and `Layer.affine`)
to data coordinates.

Using our example, we can see this in practice by transforming the coordinates associated with the current slice plane

```{code-cell} python
point = viewer.dims.point
layer0_point = viewer.layers[0].world_to_data(point)
layer1_point = viewer.layers[1].world_to_data(point)
print(f'{layer0_point=}')
print(f'{layer1_point=}')
```

These data coordinates are still continuous values that may not perfectly align with data array indices and may even fall outside of the valid range of the layer's data array.
But after clamping and rounding the coordinates, the resulting indices can be used to look-up the sub-set of the layer's data that are in view.
The exact form of this look-up depends on if the layer is an image-like layer.

When a layer's transform state includes non-trivial rotations, slicing is limited as described in some related issues (e.g. [#2616](https://github.com/napari/napari/issues/2616)).
That's because the slicing operation is no longer selecting an axis-aligned region of the layer's data.
While there are some ideas to improve this (see [#3783](https://github.com/napari/napari/issues/3783)), there are no active efforts in development.

### Loading layer data

Once we have the slice indices into a layer's data, we need to load the corresponding region of data into RAM.

### Loading array-like image data

{class}`Image<napari.layers.Image>` layer data does not have a single specific type (e.g. numpy's `ndarray`).
Instead it must only have the attributes and methods defined in [`LayerDataProtocol`](https://github.com/napari/napari/blob/eab7661459e70479c7c7d587a36463f3b099b64a/napari/layers/_data_protocols.py#L51).

Numpy's `ndarray` is compatible with this protocol, but so are array types from other packages like [Dask](https://docs.dask.org/en/latest/array.html), [Zarr](https://zarr.readthedocs.io/en/stable/_autoapi/zarr.core.Array.html), and more.
This flexibility allows you refer to image data that does not fit in memory or still needs to be lazily computed, without complicating napari's core implementation at all.

However, it also means that simply reading image data may be slow because the data must be read from disk, downloaded across a network, or calculated from a compute graph.
This means array accesses can take an arbitrary long time to complete.

### Loading multi-scale image data

`Image` and `Labels` layers also support multi-scale image data, where multiple resolutions of the same image content are stored.
Similarly to regular image data, this is supported by defining a [`MultiScaleData`](https://github.com/napari/napari/blob/eab7661459e70479c7c7d587a36463f3b099b64a/napari/layers/_multiscale_data.py#L13) protocol.
As this protocol is mostly just `Sequence[LayerDataProtocol]`, this comes with the same flexibility and arbitrary load times.

However, rendering multi-scale image data differs from regular image data because we must choose which scale or data level to load.
In order to do this, [`compute_multiscale_level`](https://github.com/napari/napari/blob/40ac1fb242d905d503aed8200099efd02ebceb95/napari/layers/utils/layer_utils.py#L532)
uses the canvas' field of view and the canvas' size in screen pixels to find the finest resolution data level that ensures that there is at least one layer data pixel per screen pixel.
As a part of these calculations, {attr}`Layer.corner_pixels<napari.layers.Layer.corner_pixels>` is updated to store the top-left and bottom-right corner of the canvas' field of view in the data coordinates of the currently rendered level.

This means that whenever the canvas' camera is panned or zoomed, napari fetches all the data needed to draw the current field of view.
While this can work well with local data, it will be slow with remote or other high latency data.

### Loading non-image data

Other layer types, like {class}`Points<napari.layers.Points>` and {class}`Shapes<napari.layers.Shapes>`, have layer specific data structures.
Therefore, they also have layer specific slicing logic and associated data reads.
They also do not currently support data protocols, which makes them less flexible, but more predictable.
This may change in the future.

### Asynchronous slicing

Since we don't know how long an array access will take, and we never want the GUI thread to block, we should not access array-like objects in the main or GUI thread.
Instead, napari's rendering can be done _asynchronously_.
This means rendering proceeds at full speed drawing only the data which is in memory ready to be drawn,
while in the background worker threads load more data into memory to be drawn in the future.
This also allows you to continue interacting with napari while data is being fetched.

#### Past

Before napari v0.4, all slicing was performed on the main thread.

From v0.4.3, two experimental implementations were introduced to perform slicing asynchronously.
These implementations could be enabled using the `NAPARI_ASYNC` and `NAPARI_OCTREE` settings.
To understand how to use these in napari v0.4, see the [associated documentation](https://napari.org/0.4.19/guides/rendering.html).

:::{warning}
These implementations are unfinished and not well maintained, so may not work at all on some later v0.4.* versions.
:::

#### Present

In napari v0.5, the prior implementations were removed in favor of the approach described in [NAP-4 — Asynchronous slicing](https://napari.org/dev/naps/4-async-slicing.html) for the reasons given in that document.

This effort is tracked by [issue #4795](https://github.com/napari/napari/issues/4795).
It is partially complete as an experimental setting that should at least work for image-like layers.
To enable the experimental setting, change it in napari's settings or preferences,
or set `NAPARI_ASYNC=1` as an environment variable before running napari.

The key code changes push all slicing (including synchronous slicing) through a dedicated controller [`_LayerSlicer`](https://github.com/napari/napari/blob/b3a8dd22895c913d8183735f52b9d1d71c963d7f/napari/components/_layer_slicer.py#L80),
and define all the layer-specific slicing logic in dedicated callable classes (e.g. [`_ImageSliceRequest`](https://github.com/napari/napari/blob/b3a8dd22895c913d8183735f52b9d1d71c963d7f/napari/layers/image/_slice.py#L154)).
An instance of one of these callables captures all the state needed to perform slicing,
so that it can be executed asynchronously on another thread without needing to guard competing access to that state with locks.

Unfortunately, these new additions make following the old synchronous slicing code paths more complicated.
But eventually we hope to mostly remove those complications and make both synchronous and asynchronous slicing consistent and easy enough to follow.

#### Future

The current experimental asynchronous slicing approach is limited.
While it prevents napari from blocking the main thread, fetching and rendering the data in view can still be slow.

Most large image viewers improve on this experience by progressively fetching and rendering chunks or tiles of data.
This allows some data to be presented quickly rather than waiting for everything in view,
which often results in a much better user experience when fetching the data is slow.

These efforts across all layers are generally tracked by [issue #5942](https://github.com/napari/napari/issues/5942).
Currently, the most focus is on the image layer in [issue #5561](https://github.com/napari/napari/issues/5561),
with lots of progress towards that in [PR #6043](https://github.com/napari/napari/pull/6043).

## Drawing

After the current view of a layer's data has been sliced into RAM, the data is pushed to VRAM with any associated transforms and parameters.

Each napari layer type has a corresponding vispy layer type.
For example, the [`VispyImageLayer`](https://github.com/napari/napari/blob/5e8dc098cb213c5f963524e619f223ad4fe90be8/napari/_vispy/layers/base.py#L21)
corresponds to the {class}`Image<napari.layers.Image>` layer.
For each instance of a layer, there is a corresponding instance of its type's vispy layer.
These correspondences can be found in [`VispyCanvas.layer_to_visual`](https://github.com/napari/napari/blob/5e8dc098cb213c5f963524e619f223ad4fe90be8/napari/_vispy/canvas.py#L69).

The vispy layer instance has a reference to its corresponding layer.
Updates to the layer's state and its current slice are handled using [napari's event system](connect-napari-event).
Of particular interest here is the [`Layer.events.set_data` event](events_reference.md#layer-events), which is connected to the abstract method
[`VispyBaseLayer._on_data_change`](https://github.com/napari/napari/blob/5e8dc098cb213c5f963524e619f223ad4fe90be8/napari/_vispy/layers/base.py#L74).
This event is triggered when slicing is finished and the latest slice state can be read.

Each vispy layer type is responsible for implementing the `_on_data_change` method.
The implementation of this method should read the updated state from the layer, then update the vispy layer appropriately.
In turn, vispy makes the appropriate updates to VRAM and executes any programs needed to update the display on napari's canvas.

```{code-cell} python
:tags: [remove-cell]
viewer.close()
```