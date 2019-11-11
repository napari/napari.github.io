# points layer tutorial

Welcome to the tutorial on the **napari** `Points` layer!

This tutorial assumes you have already installed **napari**, know how to launch the viewer, and are familiar with its layout. For help with installation see our [installation](installation.md) tutorial. For help getting started with the viewer see our [getting started](getting_started.md) tutorial. For help understanding the organisation of the viewer, including things like the layers list, the layer properties widgets, the layer control panels, and the dimension sliders see our [napari viewer](viewer.md) tutorial.

This tutorial will teach you about the **napari** `Points` layer, including displays spots over an image that have been found in an automated fashion, or manually annotating an image with points. At the end of the tutorial you should understand how to add a points layer and edit it from the GUI and from the console.

The points layer allows you to display an NxD array of N points in D coordinates. You can adjust the size, face color, edge color of all of the points independently. You can also adjust the opactiy, edge width, and symbol representing all the points simultaneously.

## a simple example

You can create a new viewer and add a set of points in one go using the `napari.view_points` method, or if you already have an existing viewer, you can add points to it using `viewer.add_points`. The api of both methods is the same. In these examples we'll mainly use `add_points` to overlay points onto on an existing image.

In this example of we will overlay some points on the image of an astronaut:

```python
from skimage import data
import napari

viewer = napari.view_image(data.astronaut(), rgb=True)
points = np.array([[100, 100], [200, 200], [300, 100]])
viewer.add_points(points, size=30)
```

![image](./resources/add_points.png)

## arguments of view_points and add_points

Both `view_points` and `add_points` have the following doc strings:

```
Parameters
----------
coords : np.ndarray
    Coordinates for each point.
symbol : Symbol or {'arrow', 'clobber', 'cross', 'diamond', 'disc',
                     'hbar', 'ring', 'square', 'star', 'tailed_arrow',
                     'triangle_down', 'triangle_up', 'vbar', 'x'}
    Symbol to be used as a point. If given as a string, must be one of
    the following: arrow, clobber, cross, diamond, disc, hbar, ring,
    square, star, tailed_arrow, triangle_down, triangle_up, vbar, x
size : int, float, np.ndarray, list
    Size of the point marker. If given as a scalar, all points are the same
    size. If given as a list/array, size must be the same length as
    coords and sets the point marker size for each point in coords
    (element-wise). If n_dimensional is True then can be a list of
    length dims or can be an array of shape Nxdims where N is the
    number of points and dims is the number of dimensions
edge_width : int, float, None
    Width of the symbol edge in pixels.
edge_color : Color, ColorArray
    Color of the point marker border.
face_color : Color, ColorArray
    Color of the point marker body.
n_dimensional : bool
    If True, renders points not just in central plane but also in all
    n-dimensions according to specified point marker size.

Returns
-------
layer : napari.layers.Points
    The newly-created points layer.

```

## points data

The input data to the points layer must be an NxD numpy array containing the coordinates of N points in D dimensions. The ordering of these dimensions is the same as the ordering of the dimensions for image layers. This array is always accessible through the `layer.data` property and will grow or shrink as new points are either added or deleted.

## creating a new points layer

As you can add new points to a points layer using the add points tool, it is possible to create a brand new empty points layers by clicking the new points layer button above the layers list. The shape of the points layer is defined by the points inside it, and so as you add new points the shape will adjust as needed. The dimension of the new points layer will default to the largest dimension of any layer currently in the viewer, or to 2 if no other layers are present in the viewer.

## non-editable mode

If you want to disable editing of the points layer you can set the `editable` property of the layer to `False`.

As note in the section on 3D rendering, when using 3D rendering the points layer is not editable.

## 3D rendering of points

All our layers can be rendered in both 2D and 3D mode, and one of our viewer buttons can toggle between each mode. The number of dimensions sliders will be 2 or 3 less then the total number of dimensions of the layer. See for example these points overlaid on an image in both 2D and 3D:

![image](./resources/smFISH.gif)

Note though that when entering 3D rendering mode the point add, delete, and select tools are all disabled. Those options are only supported when viewing a layer using 2D rendering.

## pan and zoom mode

The default mode of the points layer is to support panning and zooming, as in the image layer. This mode is represent by the magnifying glass in the layers control panel, and while it is selected editing the layer is not possible. Continue reading to learn how to use some of the editing modes. You can always return to pan and zoom mode by pressing the `Z` key when the points layer is selected.

## adding, deleting, and selecting points

New points can be added using the point adding tool. This tool can be selected from layer controls panel. Points can then be added by clicking in the canvas. If you have a multidimensional points layer then the coordinates of the new point will keep track of the currently viewed slice that you added the point too. You can quickly select the add points tool by pressing the `P` key when the points layer is selected.

You can select a point by selecting the select points tool and then clicking on that point. You can select multiple points by continuing to shift click on additional points, or by dragging a bounding box around the points you want to select. You can quickly select the select points tool by pressing the `S` key when the points layer is selected.

You can select all the points in the currently viewed slice by clicking the `A` key if you are in select mode.

Once selected you can delete the selected points by clicking on the delete button in the layer controls panel or pressing the delete key.

When using these point editing tools the pan and zoom functionality of the viewer canvas is disabled and you are able to edit the layer. You can temporarily re-enable pan and zoom by pressing and holding the spacebar. This feature can be useful if you want to move around the points layer as you edit it.

## changing points size

Each point can have a different size. You can pass a list or 1-dimensional array of points through the size keyword argument to initialize the layer with points of different sizes. These sizes are then accessible through the `sizes` property. If you pass a single size then all points will get initialized with that size. Points can be pseduo-visualized as n-dimensionsal if the `n-dimensional` property is set to `True` or the `n-dimensional` checkbox is checked. In this setting when viewing different slices of the layer points will appear in the neighbouring slices to the ones in which they are located with a size scaled by the distance from their center to that slice. This feature can be very useful when visualizing 2D slices of points that are located in a 3D volume.

Points can also be resized within the GUI by first selecting them and then adjusting the point size slider. If no points are selected then adjusting the slider value will only serve to initialize the size for new points that are about to be added. The value of the size of the next point to be added can be found in the `layer.size` property. Note this property is different from `layer.sizes` which contains the current sizes of all the points.

## changing points edge and face color
Individual points can each have different edge and face colors. You can initially set these colors by providing a list of colors to the `edge_color` or `face_color` keyword arguments respectively, or you can edit them from the GUI. The colors of each of the points are available as lists under the `layer.edge_colors` and `layer.face_colors` properties. Similar to the `sizes` and `size` properties these properties are different from the `layer.edge_color` and `layer.face_color` properties that will determine the color of the next point to be added or any currently selected points.

To change the point color properties from the GUI you must first select the points whose properties you want to change, otherwise you will just be initializing the property for the next point you add.

## changing the points symbol
The symbol for the points layer is a global property for the layer. All points must have the same symbol. You can set the symbol on the loading of the layer using the `symbol` keyword argument, or you can change it from the the GUI using the symbol dropdown menu. Since the symbol property applies to all the points you don't need to have any points selected for it to have an effect.

## copying and pasting points

It is possible to copy and paste any selected points using the `ctrl-C` and `ctrl-V` keybindings respectively. If you have a multidimensional points layer you can copy points from one slice to another by pasting them into the new slice. The coordinates of the points in the visible dimensions will be in the same place on the new slice as in the old slice, but the rest of the coordinates will be updated with the new slice values.

## layer visibility

All our layers support a visibility toggle that allows you to set the `visible` property of each layer. This property is located inside the layer widget in the layers list and is represented by an eye icon.

## layer opacity

All our layers support an opacity slider and `opacity` property that allow you to adjust the layer opacity between 0, fully invisible, and 1, fully visible. The opacity value applies globally to all the points in the layer, and so you don't need to have any points selected for it to have an effect.

## blending layers

All our layers support three blending modes `translucent`, `additive`, and `opaque` that determine how the visuals for this layer get mixed with the visuals from the other layers.

An `opaque` layer renders all the other layers below it invisibile, and will fade to black as you decrease its opacity.

The `translucent` setting will cause the layer to blend with the layers below it if you decrease its opacity, but will fully block those layers if its opacity is 1. This is a reasonable default, useful for many applications.

The final blending mode `additive` will cause the layer to blend with the layers below even when it has full opacity. This mode is very useful for visualizing multiple layers at the same time.

## naming layers

All our layers support a `name` property that can be set inside a text box inside the layer widget in the layers list. The name of each layer is forced into being unique so that you can use the name to index into `viewer.layers` to retrieve the layer object.

## scaling layers

All our layers support a `scale` property and keyword argument that will rescale the layer multiplicatively according to the scale values (one for each dimension). This property can be particularly useful for viewing anisotropic data where the size of the voxel in the z dimension might be different then the size in the x and y dimensions.

## translating layers

All our layers support a `translate` property and keyword argument that you can use to offset a layer relative to the other layers, which could be useful if you are trying to overlay two layers for image registration purposes.

## layer metadata

All our layers also support a `metadata` property and keyword argument that you can use to store an arbitrary metadata dictionary on the layer.

## putting it all together

Here you can see an example of adding, selecting, deleting points and change their properties:

![image](./resources/editing_points.gif)

## next steps

Hopefully this tutorial has given you a detailed understanding of the `Points` layer, including how to create one and control its properties. To learn more about some of the other layer types that **napari** supports checkout some more of our tutorials listed below. The [shapes layer](shapes.md) tutorial is a great one to try next as it describes more complex shapes and interactivity.

## all tutorials

- [welcome](../README.md)
- [installing napari](installation.md)
- [getting started tutorial](getting_started.md)
- [viewer tutorial](viewer.md)
- [image layer tutorial](image.md)
- [labels layer tutorial](labels.md)
- [points layer tutorial](points.md)
- [shapes layer tutorial](shapes.md)
- [surface layer tutorial](surface.md)
- [vectors layer tutorial](vectors.md)
- [gallery](../gallery/gallery.md)
- [napari-tutorials on GitHub](https://github.com/napari/napari-tutorials)
- [napari on GitHub](https://github.com/napari/napari)
