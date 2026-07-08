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

(layers-points)=
# Points

```{Admonition} DEPRECATED ATTRIBUTES
---
class: warning
---
As of napari 0.5.0, `edge_*` attributes are being renamed to
`border_*` attributes. We have yet to update the images and/or videos in
this tutorial. Please use `border` in place of `edge` for all `Points` attributes moving forward.

The code in this tutorial uses the latest API. Only images and videos may be out of date.
```

In this document, you will learn about the `napari` `Points` layer, including
displaying `points` over an image that have been found in an automated fashion,
or manually annotating an image with `points`. You will also understand how to
add a `points layer` and edit it from the GUI and from the console.

For more information about layers, refer to [Layers at a glance](layers-glance).

## When to use the `points` layer

The `points` layer allows you to display an `NxD` array of `N` points in `D`
coordinates. You can adjust the size, face color, and border color of all the
points independently. You can also adjust `opacity` and `symbol` representing
all the points simultaneously.

Each data point can have annotations associated with it using the
`Points.features` table. These features can be used to set the face and
border colors of the points. For example, when displaying points of different
classes/types, one could automatically set color the individual points by their
respective class/type. For more details on point features, see
[](#setting-point-border-and-face-color-with-features) or
[point annotation tutorial](annotating-points).

## Creating and editing the `points` layer using the GUI

The GUI contains following tools in the `layer controls` panel for the `points`
layer:

- Buttons
  - Delete selected points
  - Add points
  - Select points
  - Pan/zoom
  - Transform
- Controls
  - Opacity
  - Point size
  - Blending
  - Symbol
  - Face color
  - Border color
  - Display text
  - Out of slice
- Other tools
  - New points layer button
  - 2D/3D button

### Buttons

- **Deleting points**
  ![image: Delete points tool](../../_static/images/point-deleting-tool.png)

  Points can be deleted after they have been selected. First select the point or
  points to delete, then click on the `delete` button in the `layer controls`
  panel or press the delete key on your keyboard.

- **Adding points**
  ![image: Add points tool](../../_static/images/point-adding-tool.png)

  New points can be added using the point adding tool, shown above, from the
  layer controls panel. Points can then be added by clicking in the canvas.

  **Note:** Clicking and dragging moves the image, just as pan/zoom does. Just
  click where you want the point to go. You cannot adjust the point by clicking
  and dragging. Use the `point size` control to make it larger or smaller.

  If you have a multidimensional points layer then the coordinates of the new
  point will keep track of the currently viewed slice the point has been added
  to.

  Quickly select the `add points` tool by pressing the `2` key when the `points`
  layer is selected. The add points tool supports panning and zooming.

  Additionally, you can select all the points in the currently viewed slice by
  pressing the `a` key and all the points in the layer (across all slices) using
  `Shift-a`.

  Note: Pressing either keybinding again will toggle the selection, so you can
  select all points in a layer and the *deselect* points from a slice.

- **Selecting points**
  ![image: Select points tool](../../_static/images/point-selecting-tool.png)

  Select a point using the tool (shown above) and then clicking on that point.
  You can select multiple points by continuing to shift+click on additional
  points, or by dragging a bounding box around the points you want to select.
  You can quickly switch to the `select points` tool by pressing the `3` key
  when the points layer is selected. Select all the points in the currently
  viewed slice by clicking the `a` key while in select mode.

  Using the `select points` tool disables pan and zoom functionality. This
  allows you to select points on the layer. Temporarily re-enable pan and zoom
  by pressing and holding the spacebar. This feature can be useful if you want
  to move around the `points` layer as you create your selection.

- **Pan/zoom**
  ![image: Pan/zoom tool](../../_static/images/pan-zoom-tool.png)

  The default mode of the points layer supports panning and zooming, as in the
  image layer. This mode is represented by the magnifying glass in the layers
  control panel, and while it is selected, the `Add point`,
  `Delete selected points`, and `Select points` tools are all disabled. Those
  options are supported only when viewing a layer using 2D rendering. Return to
  pan and zoom mode by pressing the `4` key when the points layer is selected.

- **Transform**
  ![image: Transform](../../_static/images/transform-tool.png)

  Use this tool to rotate, scale, or translate the layer.
  Note: at present this feature is limited to 2D viewer display mode. To reset the transformation,
  you can Option/Alt-click the transform button (a confirmation dialog will open to
  confirm the reset). Enable this mode by pressing the `5` key when the points layer
  is selected.

### Controls

- Opacity

  The opacity slider adjusts the opacity of a point or points from 0
  (transparent) to 1.00 (completely opaque).

- Point size

  Point size can be adjusted from 1 to 100 using the point size slider.

- Blending

  Select `translucent`, `translucent no depth`, `additive`, `minimum`, or
  `opaque` from the dropdown. Refer to the [Blending layers](blending-layers)
  section of _Layers at a glance_ for an explanation of each type of blending.

- Symbol

  Select one of the symbol types from the dropdown menu. This will be the shape
  of a new point or will change the shape of all points on the current `points`
  layer. The symbol property applies to all the points on a layer so you don't
  need to have any points selected for it to have an effect. In fact, you cannot
  change the symbol for a single point on a layer and leave the rest the same.

- Face and border colors

  To change the point color properties from the GUI first select the points
  whose properties you want to change, otherwise you will just be initializing
  the property for the next point to add. Select the point you want to change,
  then click the thumbnail next to `face color:` or `border color:` to select or
  create a color from the palette.

- Display text

  Check this box to turn `display text` on or off. Currently, text can be added
  to the points only programmatically and not through the GUI. Refer to the
  example [](../../gallery/add_points_with_multicolor_text) for more
  information.

- Out of slice

  If this box is checked, `out of slice` is on or true. If this box is not
  checked, `out of slice` is off or false. If it is on or true, points slightly
  out of slice are rendered. Refer to
  [Changing points size](#changing-points-size) below for more information.

### Other tools

- `New points layer` button

  Create a brand new empty points layer by clicking the `New points layer`
  button at the top of the `layers list` panel. The shape of the points layer is
  defined by the points inside it, as you add new points the shape will adjust
  as needed. The dimension of the new points layer will default to the largest
  dimension of any layer currently in the viewer, or to 2 if no other layers are
  present in the viewer.

- 2D/3D button or `Toggle ndisplay` button

  All layers can be rendered in both 2D and 3D. The `Toggle ndisplay` button at
  the bottom of the left panel toggles between these 2 modes.
  When in 2D, the button looks like this: ![image: 2D/3D button](../../_static/images/3D-button.png), ready to switch to 3D mode.
  When in 3D, the button looks like this: ![image: 2D/3D button](../../_static/images/2D-button.png), ready to switch to 2D mode.
  You can also switch modes by pressing `Ctrl+y`.

  Note that when entering 3D rendering mode the GUI `Add point`,
  `Delete selected points`, and `Select points` tools are all disabled. Those
  options are supported only when viewing a layer using 2D rendering.

- `ctrl-c` and `ctrl-v` (copying and pasting points)

  Copy and paste any selected points using `ctrl-c` and `ctrl-v`, respectively.
  If you have a multidimensional `Points` layer you can copy points from one
  slice to another by pasting them into the new slice. The coordinates of the
  points in the visible dimensions will be in the same place on the new slice as
  in the old slice, but the rest of the coordinates will be updated with the new
  slice values.

## Controlling the `points` layer programmatically

### A simple example

You can create a new viewer with `napari.Viewer()` and add a set of points with the `viewer.add_points` method.
In these examples we'll mainly use `add_points` to overlay points onto an existing image.

Each data point can have annotations associated with it using the
`Points.features` table. These features can be used to set the face and
border colors of the points. For example, when displaying points of different
classes/types, one could automatically set the color of the individual points by
their respective class/type. For more details on point features, see
[](#setting-point-border-and-face-color-with-features) below or the
[Point annotation tutorial](annotating-points).

In this example, we will overlay some points on the image of an astronaut:

```{code-cell} python
import napari
import numpy as np
from skimage import data

viewer, _ = napari.imshow(data.astronaut(), rgb=True)
points = np.array([[100, 100], [200, 200], [300, 100]])

points_layer = viewer.add_points(points, size=30)
```

```{code-cell} python
---
tags: [hide-input]
---
from napari.utils import nbscreenshot

nbscreenshot(viewer, alt_text="3 points overlaid on an astronaut image")
```

```{code-cell} python
---
tags: [remove-cell]
---
viewer.close()
```

### Arguments of `add_points`

{meth}`~napari.Viewer.add_points`
accepts the following layer-creation parameters.

```{code-cell} python
---
tags: [hide-output]
---
help(napari.Viewer.add_points)
```

### Points data

The input data to the `points` layer must be an `NxD` NumPy array containing the
coordinates of `N` points in `D` dimensions. The ordering of these dimensions is
the same as the ordering of the dimensions for image layers. This array is
always accessible through the `layer.data` property and will grow or shrink as
new points are either added or deleted.

(points-features-table)=

### Using the points features table

The `Points` layer can contain features that annotate each point.
`Points.features` stores the features in a table or data frame where each column
represents a feature and each row represents a point.
Therefore, the table has N rows for the N points in `Points.data`.
This table can be provided as a dictionary that maps from feature names to
the columns of feature values.
For example, the following dictionary can be used as the value for the `features`
parameter in {meth}`Viewer.add_points<napari.Viewer.add_points>`

```python
features = {
    'good_point': [True, True, False],
    'confidence': [0.99, 0.8, 0.2],
}
```

and corresponds to the following features table

| point index | good_point | confidence |
| ----------- | ---------- | ---------- |
| 0           | True       | 0.99       |
| 1           | True       | 0.8        |
| 2           | False      | 0.2        |

where the point index is the index for a point in both `data` and its corresponding
row in the `features` table.

As we will see below, we can use feature values to determine the display properties
of the points (e.g., face color or border color).
To see the points features in action, please see the
[Point annotation tutorial](annotating-points).

You can also use the builtin [Features Table Widget](features-table-widget) to select, visualize, edit,
or save the contents of the `features` table.

### Non-editable mode

To disable editing the points layer, set the `editable` property of the layer to
`False`.

When using 3D rendering the points layer cannot be edited.

### 3D rendering

The number of dimensions sliders will be 2 or 3 less than the total number of
dimensions of the layer, allowing you to browse volumetric timeseries data and
other high dimensional data. See for example these points overlaid on an image
in both 2D and 3D:

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="../../_static/images/smFISH.webm" type="video/webm" />
    <source src="../../_static/images/smFISH.mp4" type="video/mp4" />
    <img src="../../_static/images/smFISH.png"
      title="Your browser does not support the video tag"
      alt="smFISH with points overlaid."
    >
  </video>
</figure>
```

### Adding, deleting, and selecting points

To do this in the console, use code something like the example in
[Add points on nD shapes](../../gallery/add_points_on_nD_shapes).

### Changing points size

Each point can have a different size. You can pass a list or 1-dimensional array
of points through the size keyword argument to initialize the layer with points
of different sizes. These sizes are then accessible through the `size` property.
If you pass a single size then all points will get initialized with that size.
Points can be pseudo-visualized as n-dimensional if the `out_of_slice_display`
property is set to `True`. When `True` and viewing different slices of the
layer, points will appear in the neighbouring slices to the ones in which they
are located with a size scaled by the distance from their center to that slice.
This feature can be especially useful when visualizing 2D slices of points that
are located in a 3D volume.

The value of the size of the next point to be added can be found in the
`layer.current_size` property. Note this property is different from `layer.size`
which contains the current sizes of all the points.

### Changing points border and face color

Individual points can each have different border and face colors. You can
initially set these colors by providing a list of colors to the `border_color` or
`face_color` keyword arguments respectively. The colors of each of the points
are available as lists under the `layer.border_color` and `layer.face_color`
properties. Similar to the `size` and `current_size` properties, these
properties are different from the `layer.current_border_color` and
`layer.current_face_color` properties that will determine the color of the next
point to be added or any currently selected points.

### Setting point border and face color with features

Point border and face colors can be set as a function of a feature in
`Points.features`. There are two ways that these feature values can be
mapped to colors: (1) color cycles and (2) colormaps.

Color cycles are sets of colors that are mapped to categorical features.
The colors are repeated if the number of unique feature values is greater
than the number of colors in the color cycle.

Colormaps are a continuum of colors that are mapped to a continuous feature
value. The available colormaps are listed below (colormaps are from
[vispy](https://vispy.org/api/vispy.color.colormap.html#vispy.color.colormap.Colormap)).
For guidance on choosing colormaps, see the
[matplotlib colormap docs](https://matplotlib.org/stable/tutorials/colors/colormaps.html).

```{code-cell} python
list(napari.utils.colormaps.AVAILABLE_COLORMAPS)
```

### Setting border or face color with a color cycle

Here we will set the border color of the markers with a color cycle on a feature.
To do the same for a face color, substitute `face_color` for `border_color` in the
example snippet below.

```{code-cell} python
viewer, _ = napari.imshow(data.astronaut(), rgb=True)
points = np.array([[100, 100], [200, 200], [300, 100]])
point_features = {
    'good_point': [True, True, False],
    'confidence': [0.99, 0.8, 0.2],
}

points_layer = viewer.add_points(
    points,
    features=point_features,
    border_color='good_point',
    border_color_cycle=['magenta', 'green'],
    border_width=0.5,
)
```

```{code-cell} python
---
tags: [hide-input]
---
nbscreenshot(viewer, alt_text="3 points overlaid on an astronaut image, where the border color of the points has been changed to a color cycle")
```

```{code-cell} python
---
tags: [remove-cell]
---
viewer.close()
```

In the example above, the `point_features` table was provided as a
dictionary with two keys or features: `good_point` and `confidence`
as described in [](points-features-table).
The values of each feature are stored in a list of length 3 since there were three
coordinates provided in `points`. We set the border color as a function of the
`good_point` feature by providing the keyword argument
`border_color='good_point'` to the `viewer.add_points()` method.
The color cycle is set via the `border_color_cycle` keyword argument,
`border_color_cycle=['magenta', 'green']`. The color cycle can be provided as a
list of colors (a list of strings or a (M x 4) array of M RGBA colors).

### Setting border or face color with a colormap

In the example snippet below, we set the face color of the markers with a
colormap on a feature. To do the same for a border color, substitute `face` for
`border`.

```{code-cell} python
viewer, _ = napari.imshow(data.astronaut(), rgb=True)
points = np.array([[100, 100], [200, 200], [300, 100]])
point_features = {
    'good_point': [True, True, False],
    'confidence': [0.99, 0.8, 0.2],
}

points_layer = viewer.add_points(
    points,
    features=point_features,
    face_color='confidence',
    face_colormap='viridis',
)
```

```{code-cell} python
---
tags: [hide-input]
---
nbscreenshot(viewer, alt_text="3 points overlaid on an astronaut image, where the face color of the points has been changed to a colormap")
```

```{code-cell} python
---
tags: [remove-cell]
---
viewer.close()
```

In the example above, the `point_features` table was provided as a
dictionary with two keys or features: `good_point` and `confidence`
as described in [](points-features-table).
The values of each feature are stored in a list of length 3 since there were three
coordinates provided in `points`.
We set the face color as a function of the `confidence` feature by providing the
keyword argument `face_color='confidence'` to the `viewer.add_points()` method.
We set the colormap to viridis using the `face_colormap` keyword argument
as `face_colormap='viridis'`.

### Changing the points symbol

The symbol for the points layer is a global property for the layer. All points
on a layer must have the same symbol. You can set the symbol when loading the
layer using the `symbol` keyword argument.

## Putting it all together

Here you can see an example of adding, selecting, deleting points, and changing
their features:

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="../../_static/images/editing_points.webm" type="video/webm" />
    <source src="../../_static/images/editing_points.mp4" type="video/mp4" />
    <img src="../../_static/images/editing_points.png"
      title="Your browser does not support the video tag"
      alt="Selecting and changing points color, size and symbol in napari."
    >
  </video>
</figure>
```
