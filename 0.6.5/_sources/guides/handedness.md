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

(handedness-guide)=

# Axis directions, data, and handedness

In version 0.6.0, napari gained the ability to adjust the direction each axis
is facing.

In 2D, the first axis is the *vertical* axis and points down, and the second
axis is the *horizontal* axis and points right. This matches the convention
expected when displaying NumPy arrays, for example.

In 3D, an additional *depth* axis is *pre*pended to the other two. 
```{important}
In versions 0.5.6 and earlier, it pointed *away* from the camera, while in versions 0.6.0
it points *towards* the camera. This affects how 3D images and models are rendered, see
[3D data, 3D axis orientation, and handedness](3D-handedness).
```

## Displaying 2D data

In order to flip data about an axis, users can set a negative number as the
scale for each layer. This is good enough for many cases, but it sub-par when
the data coordinates have an absolute correspondence to physical space — as is
the case for latitude and longitude, for example:

```{code-cell} python
:tags: [hide-input]

# function to convert xarray metadata to napari layer metadata
def get_scale_translate(dataset, array_name):
    array = getattr(dataset, array_name)
    dims = [getattr(dataset, dim) for dim in array.dims]
    translate = [float(d[0]) for d in dims]
    scale = [float(d[1] - d[0]) for d in dims]
    return {'scale': scale, 'translate': translate}
```

```{code-cell} python
import napari
import xarray as xr

sst = xr.tutorial.open_dataset('ersstv5')
viewer, sst_layer = napari.imshow(
        sst.sst,
        name='sea surface temp',
        **get_scale_translate(sst, 'sst'),
        colormap='magma',
        )
viewer.dims.axis_labels = sst.sst.dims
viewer.axes.visible = True
```

```{code-cell} python
:tags: [remove-input]
from napari.utils import nbscreenshot
nbscreenshot(
        viewer,
        alt_text=(
                "screenshot of napari viewer showing global sea surface "
                "temperature, but the map is flipped, with north facing down."
                ),
        )
```

In napari's default orientation, latitude points down. If we were to multiply
the scale by -1, the image would be flipped, but the latitude *values* (shown
when hovering over the viewer) would be wrong, and latitude would still point
down (incorrectly [since Ptolemy][ptolemy]). Instead, we can flip the *axis
orientation* so that the vertical axis (latitude) points up:

```{code-cell} python
viewer.camera.orientation2d = ('up', 'right')
```

```{code-cell} python
:tags: [remove-input]
from napari.utils import nbscreenshot
nbscreenshot(
        viewer,
        alt_text=(
                "screenshot of napari viewer showing global sea surface "
                "temperature, with north now correctly facing up."
                ),
        )
```

You can also change the axis orientation by right-clicking on the 2D/3D toggle
button in the viewer.

```{code-cell} python
:tags: [remove-cell]

viewer.close()
```
(3D-handedness)= 
## 3D data, 3D axis orientation, and handedness

The situation is slightly more subtle in 3D. Just like in 2D, flipping an axis
results in viewing a mirror image of the image before the flip, but it can be
difficult to know whether one is looking at the real world, or the mirror
world.

To illustrate, let's look at [a B-DNA molecule][1bna], famously a
[right-handed helix][dna-wikipedia]. This means that if you slide your right
hand along the helix, it will move in the direction of your thumb — and the
opposite is true of your left-hand, or of the mirror image of this DNA.

```{code-cell} python
:tags: [remove-stdout,remove-stderr]
from vispy.io import read_mesh
vertices, faces, _, _ = read_mesh('../data/1BNA.obj.gz')

viewer = napari.Viewer(ndisplay=3)
layer = viewer.add_surface((vertices, faces), name='1BNA', shading='smooth')
```

```{code-cell} python
:tags: [remove-input]

viewer.camera.angles = (90, 0, 90)
viewer.camera.zoom = 16
viewer.axes.visible = True

nbscreenshot(viewer)
```

Starting with napari 0.6.0, using the default orientations, the above image will correctly represent
a right-handed helix. However, if we flip one of the axes (as they were in napari prior to 0.6.0), 
we will get the mirror image of the DNA, which will be physically inaccurate:

```{code-cell} python
viewer.camera.orientation = ('away', 'down', 'right')
```

```{code-cell} python
:tags: [remove-input]

nbscreenshot(viewer)
```

```{code-cell} python
:tags: [remove-cell]

viewer.close()
```

```{tip}
The camera controls, accessible by right-clicking the 2D/3D toggle button,
will display whether your current axis orientations form a [right-handed or a
left-handed coordinate frame][wiki-right-hand-rule].

![camera controls, with a "right handed reference frame" icon highlighted
  next to the axis orientation boxes](../_static/images/handedness.png)
```

[ptolemy]: https://en.wikipedia.org/wiki/History_of_cartography#Ptolemy
[1bna]: https://www.rcsb.org/structure/1BNA
[dna-wikipedia]: https://en.wikipedia.org/wiki/DNA
[wiki-right-hand-rule]: https://en.wikipedia.org/wiki/Right-hand_rule#Coordinates