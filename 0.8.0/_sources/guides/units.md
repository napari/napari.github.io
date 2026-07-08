(units-guide)=

# Scale and unit-aware rendering

Units in napari describe the physical meaning of each layer axis. They work
alongside layer transforms such as `scale` and `translate`, combining into a
spatial transformation with dimensions that carry physical meaning.
All layers of napari contain these transforms and `units` metadata, and they work
together to determine how the layer is rendered and how it interacts with
other unit-aware features, such as the scale bar.

For interactive editing, the
[napari-metadata](https://napari.org/napari-metadata/) plugin can expose
layer scale and units in a dock widget.

## Scale and units live on layers

Scale and units are layer metadata. You can provide them when creating a layer or update
them later from Python:

```python
import numpy as np
import napari

viewer = napari.Viewer()
layer = viewer.add_image(
    np.zeros((16, 32, 64)),
    scale=(4, 0.25, 0.25),
    units=('s', 'um', 'um'),
)

layer.units = ('usec','nm', 'nm')  # update units later
```

In this example, each pixel of the image layer is spaced by `0.25` micrometers along both axes.
The scale is used to transform each layer from its data coordinates into rendered world coordinates,
so both vector-based layers (points, shapes, vectors, tracks) and raster-based layers (images, labels)
are affected by scale and units. 

Units can be any valid [Pint](https://pint.readthedocs.io/en/stable/) unit,
of which [there are a plethora](https://github.com/hgrecco/pint/blob/master/pint/default_en.txt)
to serve many different disciplines.
Pint also has logic to disambiguate unit names, for example,
`'micrometer'`, `'um'`, and `'µm'` are all valid and will equate to `'µm'` in napari.

If you do not set units, napari assumes pixels.
To set *no* units, use `layer.units = ('dimensionless',...)`.

## When units are consistent across layers

napari can use units to render layers in the same physical space even when the
numerical scale values are different. This matters when, for example, one layer
is stored in nanometers and another is stored in micrometers.

The gallery example {ref}`sphx_glr_gallery_units_impact_rendering.py` shows
this directly: two image layers use different units and different scale values,
but napari still aligns them in the same world coordinate system.

## How the scale bar gets its units

The scale bar is a viewer overlay, but its label is tied to the same world
coordinates used to render the scene.
If units are consistent across layers, the scale bar will automatically display
the correct units and length to scale. If you do not provide units, napari falls
back to pixels.

If napari cannot infer a consistent layer-list unit, the scale bar becomes
dimensionless. There is also one important special case: the scale bar label
corresponds to the last displayed axis. If the displayed axes do not all have
the same dimensionality, napari will warn that only the last displayed axis unit is being used.

The gallery example {ref}`sphx_glr_gallery_scale_bar.py` focuses on scale bar
appearance and layout. The gallery example
{ref}`sphx_glr_gallery_units_impact_rendering.py` focuses on unit-aware world
space. Taken together, they currently provide the clearest picture of how scale
bar display and layer units interact.

## What units do not do

Units do not rename axes. Axis labels and units are related metadata, but they
solve different problems:

- axis labels describe what an axis represents, such as `time`, `z`, `y`, or
  `x`
- units describe the measurement system on that axis, such as `s`, `nm`, or
  `pixel`

For more about axis labels, broadcasting, and how layer metadata maps onto the
viewer, see {ref}`axis-names`.
