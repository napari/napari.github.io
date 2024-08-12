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

# Using the `shapes` layer

In this document, you will learn about the `napari` `shapes` layer, including
how to display and edit shapes like rectangle, ellipses, polygons, paths, and
lines. You will also understand how to add a `shapes` layer and edit it from the
GUI and from the console.

For more information about layers, refer to [Layers at a glance](../../guides/layers).

## When to use the `shapes` layer

The `shapes` layer allows you to display a list of an NxD arrays, where each
array corresponds to one shape, specified by N points in D coordinates. You can
adjust the position, size, face color, edge color, and opacity of all the shapes
independently, both programmatically and from the GUI.

## Controlling the `shapes` layer using the GUI

Before we start talking about all the controls on the GUI, here is an overview
of how to handle the `shapes` layer.

### Selecting, resizing, moving, editing, and deleting shapes

All shapes are edited in the same way:
1. Click the select shapes tool.
2. Draw a box around the shape you want to edit.
3. Adjust the size or contour of the shape using the square handles that appear
   on the bounding box of the shape. When resizing a layer, hold down the
   `shift` key to lock the aspect ratio of the shape. Then you can continue to
   resize the shape with a fixed aspect ratio. Note: you have to hold the
   `shift` key down and when finished release the mouse button first! Here is a
   shape being resized:

   ```{raw} html
   <figure>
     <video width="100%" controls autoplay loop muted playsinline>
       <source src="../../_static/images/shape_resizing.webm" type="video/webm" />
       <source src="../../_static/images/shape_resizing.mp4" type="video/mp4" />
       <img src="../../_static/images/shape_resizing.png"
         title="Your browser does not support the video tag"
         alt="Resizing a shape"
       >
     </video>
   </figure>
   ```

4. Change the face or edge color by clicking on the thumbnail to the right of
   `face color:` or `edge color:` and choosing or creating a color from the
   pallette.
5. Change the edge width of a shape or the width of a line or path by clicking
   the circle next to `edge width:` and dragging it to a new width.
6. Move the shape by dragging it.
7. Rotate the shape by clicking and dragging on the rotation handle above the
   shape bounding box.
8. Select multiple shapes by continuing to `shift`+click additional shapes after
   the first, or drag a box around the shapes to select.
9. Select all the shapes in the current slice by clicking the `a` key if you are
   in select mode. Once selected you can delete the shapes by clicking the
   delete button in the layer controls panel or pressing the delete key on the
   keyboard.

### Copying and pasting shapes

Copy and paste any selected shapes using the `ctrl-c` and `ctrl-v` keybindings
respectively. If you have a multidimensional shapes layer you can copy shapes
from one slice to another by pasting them into the new slice. The coordinates of
the shapes in the visible dimensions will be in the same place on the new slice
as in the old slice, but the rest of the coordinates will be updated with the
new slice values.

### Adding (inserting), editing, and deleting (removing) individual vertices

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="../../_static/images/shape_vertex_editing.webm" type="video/webm" />
    <source src="../../_static/images/shape_vertex_editing.mp4" type="video/mp4" />
    <img src="../../_static/images/shape_vertex_editing.png"
      title="Your browser does not support the video tag"
      alt="animation of napari viewer with a shapes layer bounded by vertices over an initial static image. The shapes are selected and the vertices moved by the mouse pointer, resulting in new shapes."
    >
  </video>
</figure>
```

### Creating a new `shapes` layer

You can create a brand-new empty `shapes` layer by clicking the
`New shapes layer` button at the top of the `layer list` panel. The shape of the
new layer is defined by the shapes inside it, as new shapes are added the new
shape layer will adjust as needed. The dimension of the new shapes layer will
default to the largest dimension of any layer currently in the viewer, or to 2
if no other layers are present in the viewer.

### `shapes` layer buttons and controls

Here are the buttons and controls that are available in the GUI for the `shapes`
layer. This is the order they are presented in, not necessarily the order they
are used. i.e. You can't remove a vertex before you have created a shape.

* Buttons
    * Remove vertex
    * Insert vertex
    * Delete selected shape
    * Select vertices
    * Select shapes
    * Pan/zoom
    * Transform
    * Move to back
    * Move to front
    * Add ellipses
    * Add rectangles
    * Add polygons
    * Add polygons lasso
    * Add lines
    * Add path
* Controls
    * Opacity
    * Edge width
    * Blending
    * Face color
    * Edge color
    * Display text
* Other tools
  * 2D/3D button or `Toggle ndisplay` button
  * `New shapes layer` button

### Buttons

* **Remove vertex**
  ![image: Remove vertex](../../images/shape_vertex_delete.png)

  To remove a vertex, click this button and then click the vertex you want to
  remove.

* **Insert vertex (Add vertex)**
  ![image: Insert vertex](../../images/shape-vertex-insert.png)

  Click this button and then click where you want to insert (add) a vertex.

* **Delete selected shape**
  ![image: Delete shape](../../images/shape-delete-shape.png)

  Select the vertex to delete using the `select vertices` tool (below), then
  click this button, or hit the delete key on your keyboard.

* **Select vertices**
  ![image: Select vertices](../../images/shape-vertices-select.png)

  Use this tool to select the vertex or vertices you want to move or delete. To
  select more than one vertex, select one, hold down the shift key and select
  the rest. Once a vertex is selected, it can be moved by dragging it to a new
  location.

* **Select shapes**
  ![image: Select shapes](../../images/shape-select-shape.png)

  Use this tool to select the shape or shapes you want to delete. To select more
  than one shape, select one, hold down the shift key and select the rest.

* **Pan/zoom**
  ![image: Pan/zoom](../../images/pan-zoom-tool.png)

  Use this tool to pan around the layer or zoom in. Pan functionality
  is disabled when using the adding and editing tools; however, zoom using the mouse-wheel will typically continue to work. To activate the tool,
  you can press `6`. Temporarily re-enable pan and zoom by pressing and holding
  the spacebar. This feature can be useful if you want to move around the shapes
  layer as you edit it.

* **Transform**
  ![image: Transform](../../images/transform-tool.png)

  Use this tool to rotate, scale, or translate the layer. Note: at present this feature is limited to 2D viewer display mode. To activate the tool,
  you can press `7`. To reset the transformation, you can Option/Alt-click the
  transform button (a confirmation dialog will open to confirm the reset).

* **Move to back**
  ![image: Move to back](../../images/shape-move-to-back.png)

  Using the `select shapes` tool, select the shape to move behind other shapes
  and then click this button.

* **Move to front**
  ![image: Move to front](../../images/shape-move-to-front.png)

  Using the `select shapes` tool, select the shape to move in front of other
  shapes and then click this button.

* **Add ellipses**
  ![image: Add ellipses](../../images/shape-add-ellipses.png)

  Use this tool to draw ovals or circles. Click the tool or press `e` (the
  default keybinding for this tool); next, click the point where you want the
  ellipse to begin. Hold down the left button on the mouse and go to the point
  where you want the ellipse to end. Release the mouse button. Add other
  ellipses as needed. A single click creates an ellipse of default size centered
  on that click.

* **Add rectangles**
  ![image: Add rectangles](../../images/shape-add-rectangles.png)

  Select `Add rectangles` from the layer controls panel or by pressing the `r`
  key when the `shapes` layer is selected. Click and drag the rectangle to the
  desired size. Releasing the mouse completes the rectangle. Add other
  rectangles as needed. A single click creates a rectangle of default size
  centered on that click.
 
* **Add polygons**
  ![image: Add polygons](../../images/shape-add-polygons.png)

  The `Add polygon` tool can be selected from the layer controls panel or by
  pressing the `p` key when the shapes layer is selected. When adding a polygon,
  each click will add a vertex at the clicked location. To finish,
  double click or press the `Esc` key: this adds a final vertex at the current mouse
  position and completes the polygon. You can then add another polygon.

* **Add polygons lasso**
  ![image: Add polygons lasso](../../images/shape-add-lasso.png)

  `Polygons` can also be created with the polygon lasso creation tool, which can
  be found in the layer control panel or by pressing `shift+p`. The tool can be
  used to draw complex `Polygons` with the mouse or tablet.

  :::{dropdown} More details on the lasso tool

  When using the mouse, the sequence of events to draw a polygon is as follows:

  1. Click mouse (left-click) to begin drawing.
  2. Move mouse -- without holding down the mouse button -- to draw the polygon.
  3. Click mouse (left-click) or press `Esc` to end drawing—the polygon will
     auto-complete.

  The polygon lasso tool can also be used to draw `Polygons` using a tablet. In
  this case, drawing the polygon is started by touching the tablet screen with
  the tablet stylus and drawing will continue for as long as the pencil is moved
  while touching the tablet screen. Note that similar behavior is also available
  when using a macOS trackpad, using three-finger drag mode.

  For both modes, vertices are added only if the vertex to be added is at a
  certain number of screen pixels away from the previous vertex. This value can
  be adjusted in the settings in napari by going to `File` -> `Preferences` (or
  `control + shift + p`), then in the menu on the left-clicking on
  `Experimental` and then adjusting the value of
  `Minimum distance threshold of shapes lasso tool`. The default is 10 and can
  be any integer higher than 0 and lower than 50. As with the polygon creation
  tool, drawing the shape can also be finished by pressing the `Esc` key.

  After finishing drawing a polygon using the polygon lasso tool, an
  implementation of the [Ramer–Douglas–Peucker algorithm](https://en.wikipedia.org/wiki/Ramer–Douglas–Peucker_algorithm)
  is applied to reduce the number of vertices that make up the shape, while
  preserving its contours. The aggressiveness with which the algorithm reduces
  the number of vertices of the polygon is determined by an `epsilon` parameter,
  which is a perpendicular distance threshold. Any vertices beyond the threshold
  will be preserved, so if `epsilon` is set to `0`, no vertices will be removed.
  With increasing values of `epsilon`, more and more vertices will be removed.
  The value of `epsilon` can be set in napari by going to `File` ->
  `Preferences` (or `control + shift + p`), then in the menu on the
  left-clicking on `Experimental` and then adjusting the value of `RDP epsilon`.
  The default value is 0.5 and cannot be set lower than 0.
  :::

* **Add lines**
  ![image: Add lines](../../images/shape-add-lines.png)

  Select the `Add lines` tool from the layer controls panel or by pressing the
  `l` key when the shapes layer is selected. `Lines` consist of two vertices
  representing the end points of the line. Click where you want the line to
  start and then click where you want it to stop. The first click marks the
  coordinates of the first endpoint and the second click marks the coordinates
  of the second endpoint. Add other lines as needed.

* **Add path**
  ![image: Add path](../../images/shape-add-path.png)

  Select the `Add path` tool from the layer controls panel or by pressing the
  `t` key when the shapes layer is selected. Click where you want the path to
  start and then click each location where the direction of the path changes,
  this adds a vertex at that location. When you have drawn the complete path,
  hit `Esc`. This adds a final vertex at the current mouse position and
  completes the path. You can then add another path.

### Controls

* Opacity

  Click and hold the oval on the opacity slider bar and adjust it to any value
  between 0.00 (clear) and 1.00 (completely opaque).

* Edge width

  Click and drag the circle on the `edge width` slider bar to adjust
  `edge width` from 0 to 40.

* Blending

  `blending` has the options of `opaque`, `translucent`, `translucent no depth`,
  `additive`, and `minimum` in the dropdown. Refer to the
  [Blending layers](blending-layers) section of _Layers at a glance_ for an
  explanation of each type of blending.

* Face and edge colors

  To change the shape color properties from the GUI, first select the shapes
  whose properties you want to change, otherwise you will just be initializing
  the color for the next shape to add. Select the shape you want to change,
  click the thumbnail next to `face color:` or `edge color:` to select or create
  a color from the pallette.

* Display text

  Check this box to turn `display text` on or off. Text can be added to the
  points only programmatically and not through the GUI. Refer to
  [](../../gallery/add_points_with_multicolor_text) for more information.

### Other tools

* 2D/3D button or `Toggle ndisplay` button

  All layers can be rendered in both 2D and 3D. The `Toggle ndisplay` button at
  the bottom of the left panel toggles between these 2 modes.
  When in 2D, the button looks like this: ![image: 2D/3D button](../../images/3D-button.png), ready to switch to 3D mode.
  When in 3D, the button looks like this: ![image: 2D/3D button](../../images/2D-button.png), ready to switch to 2D mode.

  You can also switch modes by pressing `ctrl+y`.

  Note that when entering 3D rendering mode the GUI `Add point`,
  `Delete selected points`, and `Select points` tools are all disabled. Those
  options are supported only when viewing a layer using 2D rendering.

* `New shapes layer` button

  Create a brand new empty `shapes` layer by clicking the `New shapes layer`
  button at the top of the `layers list` panel. The shape of this layer is
  defined by the shapes inside it, as new shapes are added the layer will adjust
  as needed.

## Controlling the shapes layer programmatically
### A simple example

You can create a new viewer and add a list of shapes in one go using the
{meth}`napari.view_shapes` method, or if you already have an existing viewer,
you can add shapes to it using `viewer.add_shapes`. The API of both methods is
the same. In these examples we'll mainly use `add_shapes` to overlay shapes onto
an existing image.

In this example, we will overlay shapes on the image of a photographer:

```{code-cell} python
import napari
import numpy as np
from skimage import data

# create the list of polygons
triangle = np.array([[11, 13], [111, 113], [22, 246]])

person = np.array([[505, 60], [402, 71], [383, 42], [251, 95],
                   [212, 59], [131, 137], [126, 187], [191, 204],
                   [171, 248], [211, 260], [273, 243], [264, 225],
                   [430, 173], [512, 160]])

building = np.array([[310, 382], [229, 381], [209, 401], [221, 411],
                     [258, 411], [300, 412], [306, 435], [268, 434],
                     [265, 454], [298, 461], [307, 461], [307, 507],
                     [349, 510], [352, 369], [330, 366], [330, 366]])

polygons = [triangle, person, building]

# add the image
viewer = napari.view_image(data.camera(), name='photographer')

# add the polygons
shapes_layer = viewer.add_shapes(
    polygons,
    shape_type='polygon',
    edge_width=5,
    edge_color='coral',
    face_color='royalblue'
)
```

```{code-cell} python
:tags: [hide-input]

from napari.utils import nbscreenshot

nbscreenshot(viewer, alt_text="Shapes overlaid on image")
```

```{code-cell} python
:tags: [remove-cell]

viewer.close()
```

### Arguments of `view_shapes` and `add_shapes`

{meth}`~napari.view_layers.view_shapes` and {meth}`~napari.Viewer.add_shapes`
accept the same layer-creation parameters.

```{code-cell} python
:tags: [hide-output]

help(napari.view_shapes)
```

### Shapes data

The input data to the `shapes` layer must be a list of NxD NumPy array, with
each array containing the coordinates of the N vertices in D dimensions that
make up the shape. The ordering of these dimensions is the same as the ordering
of the dimensions for image layers. This list of arrays is always accessible
through the `layer.data` property and will grow or shrink as new shapes are
added or deleted. By storing data as a list of arrays it is possible for each
shape to have a different number of vertices in it. This is especially useful
when drawing polygons and paths.

### Adding different shape types

Right now the shapes layer supports 5 types of shapes, `Lines`, `Rectangles`,
`Ellipses`, `Polygons`, and `Paths`. When adding new data can set the shape type
through the `shape_type` keyword argument, as either a single shape type if all
the shapes to be added have the same type or as a list of shape types if some of
the shapes have different types. The actual shape types of all the shapes is
accessible through the `layer.shape_types` property.

* `Lines` consist of two vertices representing the end points of the line. The
  line creation tool can be selected from the layer control panel or by pressing
  the `l` key when the shapes layer is selected. When adding a new line the
  first click will coordinates of the first endpoint and the second click will
  mark the coordinates of the second endpoint. You'll then be able to add
  another line.

* `Rectangles` can be added using two vertices representing the corners of the
  rectangle for axis aligned rectangle, or using four corners so that non-axis
  aligned rectangle can be represented. Internally we use the four vertex
  representation so we can always support rotated rectangles.

* `Ellipses` can be added using either two vectors, one representing the center
  position of the ellipse and the other representing the radii of the ellipse in
  all dimensions for an axis aligned ellipse, or by using the four corners of
  the ellipse bounding box for a non-axis aligned ellipse. Internally we use the
  four vertex representation so we can always support rotated ellipses.

* `Polygons` can be added using an array of N vertices. Polygons are closed by
  default, so you don't also need to include the first point at the end of the
  array. The order of the vertices will determine the triangulation of the
  polygon, which can be non-convex, but cannot have holes. For drawing polygons,
  multiple tools can be used.

* `Paths` are like polygons but are not closed or filled in. They can be added
  using an array of N vertices.

### Adding new shapes

You can add new shapes to an existing `shapes` layer programmatically using the
`add` method. This allows you to pass in a `shape_type` list when there is mixed
shape data (data for different types of shapes).

```{code-cell} python
import napari
import numpy as np
from skimage import data

# add the image
viewer = napari.view_image(data.camera(), name='photographer')

# create a triangle
triangle = np.array([[11, 13], [111, 113], [22, 246]])

# create an ellipse
ellipse = np.array([[59, 222], [110, 289], [170, 243], [119, 176]])

# put both shapes in a list
mixed_shapes = [triangle, ellipse]

# add an empty shapes layer
shapes_layer = viewer.add_shapes()

# add mixed shapes using the `add` method
shapes_layer.add(
  mixed_shapes,
  shape_type=['polygon', 'ellipse'],
  edge_width=5,
  edge_color='coral',
  face_color='royalblue'
)
```

```{code-cell} python
:tags: [hide-input]

from napari.utils import nbscreenshot

nbscreenshot(viewer, alt_text="Add new shapes to an existing shapes layer")
```

```{code-cell} python
:tags: [remove-cell]

viewer.close()
```

Finally, each shape type has its own convenience method for adding new shapes to
a layer. Their arguments are identical to those of the `add` method, but they do
not take a `shape_type`.

```{code-cell} python
import napari
import numpy as np
from skimage import data

# add the image
viewer = napari.view_image(data.camera(), name='photographer')

# create some ellipses
ellipse = np.array([[59, 222], [110, 289], [170, 243], [119, 176]])

ellipse2 = np.array([[165, 329], [165, 401], [234, 401], [234, 329]])

# put both shapes in a list
ellipses = [ellipse, ellipse2]

# add an empty shapes layer
shapes_layer = viewer.add_shapes()

# add ellipses using their convenience method
shapes_layer.add_ellipses(
  ellipses,
  edge_width=5,
  edge_color='coral',
  face_color='royalblue'
)
```

```{code-cell} python
:tags: [hide-input]

from napari.utils import nbscreenshot

nbscreenshot(viewer, alt_text="Add new ellipses to an existing shapes layer using the specific method for this layer type")
```

```{code-cell} python
:tags: [remove-cell]

viewer.close()
```

### Non-editable mode

To disable editing of the shapes layer, set the `editable` property of the layer
to `False`.

As noted in [3D rendering](#3d-rendering), below, the shapes layer is not
editable when using 3D rendering.

### 3D rendering

All layers can be rendered in both 2D and 3D.

The number of dimensions sliders will be 2 or 3 less than the total number of
dimensions of the layer, allowing you to browse volumetric timeseries data and
other high dimensional data. See [](../../gallery/nD_shapes) to see shapes in
both 2D and 3D:

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="../../_static/images/nD_shapes.webm" type="video/webm" />
    <source src="../../_static/images/nD_shapes.mp4" type="video/mp4" />
    <img src="../../_static/images/nD_shapes.png"
      title="Your browser does not support the video tag"
      alt="A stack of colorful polygon shapes over an image layer. The view alternates between 2D and 3D views of the data."
    >
  </video>
</figure>
```

Also note that for a multidimensional shape to be displayed on a given view
slice, all of its non-displayed coordinates must match the coordinates of that
view slice, i.e. the shape must be entirely defined within that plane.

For paths that are defined by coordinates spanning more than two dimensions, it
is possible to visualize them as 3D cylinders, see [](../../gallery/3D_paths)
for examples.

![image: 3D paths](../../images/3D_paths.png)

```{note}
Right now, it is not possible to display 3D cuboids or 3D spheroids, but we will
be supporting those options soon.
```

### Changing shape edge and face colors

Individual shapes can each have different edge and face colors. You can
initially set these colors by providing a list of colors to the `edge_color` or
`face_color` keyword arguments respectively. The colors of each of the shapes
are available as lists under the `layer.edge_color` and `layer.face_color`
properties. These properties are different from the `layer.current_edge_color`
and `layer.current_face_color` properties that will determine the color of the
next shape to be added or any currently selected shapes.

### Changing shape edge widths

Individual shapes can each have different edge widths. You can initially set the
edge widths by providing a list of values to the `edge_width` keyword arguments
respectively, or you can edit them from the GUI. The widths of each of the
shapes are available as a list under the `layer.edge_width` property. Similar
to the edge and face colors, these property is different from the
`layer.current_edge_width` property that will determine the edge width of the
next shape to be added or any currently selected shapes.

### Layer ordering

You can get the ordering of all the shapes using the `layer.z_indices` property.
You can also set the initial ordering of shapes by passing a list to the
`layer.z_index` property.

### `shapes` layer opacity

The {ref}`opacity value <layer_opacity>` applies to all shapes. You can
initialize the shape opacities using the `opacity` keyword argument which
accepts a single opacity value that will be applied globally. You can then
access the opacity using the `layer.opacity` property. In order to adjust the
opacity of individual shapes you need to adjust the alpha value in the
`layer.edge_color` and `layer.face_color` properties.

### Putting it all together

Here you can see an example of adding, selecting, and editing shapes and
changing their properties:

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="../../_static/images/editing_shapes.webm" type="video/webm" />
    <source src="../../_static/images/editing_shapes.mp4" type="video/mp4" />
    <img src="../../_static/images/editing_shapes.png"
      title="Your browser does not support the video tag"
      alt="Editing shapes properties in napari."
    >
  </video>
</figure>
```
