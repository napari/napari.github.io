# tracks layer tutorial

Welcome to the tutorial on the **napari** `Tracks` layer! Please note that `Tracks` layer is a new layer type that will be released in `napari 0.4.0`, but it is available for preview on the [master branch](https://github.com/napari/napari). 

This tutorial assumes you have already installed **napari**,
know how to launch the viewer,
and are familiar with its layout.
For help with installation see our [installation](./installation) tutorial.
For help getting started with the viewer see our [getting started](./getting_started) tutorial.
For help understanding the organisation of the viewer,
including things like the layers list,
the layer properties widgets,
the layer control panels,
and the dimension sliders
see our [napari viewer](./viewer) tutorial.

This tutorial will teach you about the **napari** `Tracks` layer,
including displaying tracks and defining relationships between tracks.

The tracks layer allows you to display trajectories in nD + t while visualizing the recent history of the track via a fading tail.

Each track can have annotations associated with it using the `Tracks.properties` dictionary.
These properties can be used to set the colors of the tracks.

For example, when displaying tracks of different classes/types,
one could automatically set color the individual points by their respective class/type.

## a simple example

You can create a new viewer and add a set of points in one go using the `napari.view_points` method,
or if you already have an existing viewer,
you can add points to it using `viewer.add_points`.
The api of both methods is the same.
In these examples we'll mainly use `add_points` to overlay points onto on an existing image.

In this example of we will overlay some tracks on an image from the Hubble space telescope:

```python
import napari
from skimage import data

hubble_image = data.hubble_deep_field()

tracks_data = np.asarray([
    [1, 0, 236, 0],
    [1, 1, 236, 100],
    [1, 2, 236, 200],
    [1, 3, 236, 500],
    [1, 4, 236, 1000],
    [2, 0, 436, 0],
    [2, 1, 436, 100],
    [2, 2, 436, 200],
    [2, 3, 436, 500],
    [2, 4, 436, 1000],
    [3, 0, 636, 0],
    [3, 1, 636, 100],
    [3, 2, 636, 200],
    [3, 3, 636, 500],
    [3, 4, 636, 1000]
])

with napari.gui_qt():
    viewer = napari.view_image(test_im, name='image')
    viewer.add_tracks(tracks_data, name='tracks')

```

![image]({{ '/assets/tutorials/add_points.png' | relative_url }})

## arguments of view_points and add_points

Both `view_tracks` and `add_tracks` have the following doc strings:

```python
"""
Parameters
----------
data : array (N, D+1)
    Coordinates for N points in D+1 dimensions. ID,T,(Z),Y,X. The first
    axis is the integer ID of the track. D is either 3 or 4 for planar
    or volumetric timeseries respectively.
properties : dict {str: array (N,)}, DataFrame
    Properties for each point. Each property should be an array of length N,
    where N is the number of points.
graph : dict {int: list}
    Graph representing associations between tracks. Dictionary defines the
    mapping between a track ID and the parents of the track. This can be
    one (the track has one parent, and the parent has >=1 child) in the
    case of track splitting, or more than one (the track has multiple
    parents, but only one child) in the case of track merging.
    See examples/tracks_3d_with_graph.py
color_by: str
    Track property (from property keys) by which to color vertices.
tail_width : float
    Width of the track tails in pixels.
tail_length : float
    Length of the track tails in units of time.
colormap : str
    Default colormap to use to set vertex colors. Specialized colormaps,
    relating to specified properties can be passed to the layer via
    colormaps_dict.
colormaps_dict : dict {str: napari.utils.Colormap}
    Optional dictionary mapping each property to a colormap for that
    property. This allows each property to be assigned a specific colormap,
    rather than having a global colormap for everything.
name : str
    Name of the layer.
metadata : dict
    Layer metadata.
scale : tuple of float
    Scale factors for the layer.
translate : tuple of float
    Translation values for the layer.
opacity : float
    Opacity of the layer visual, between 0.0 and 1.0.
blending : str
    One of a list of preset blending modes that determines how RGB and
    alpha values of the layer visual get mixed. Allowed values are
    {'opaque', 'translucent', and 'additive'}.
visible : bool
    Whether the layer visual is currently being displayed.

Returns
-------
layer : napari.layers.Tracks
    The newly-created tracks layer.
"""
```

## tracks data

The input data to the points layer must be an NxD numpy array
containing the coordinates of N points in D dimensions.
The ordering of these dimensions is the same as the ordering of the dimensions for image layers.
This array is always accessible through the `layer.data` property
and will grow or shrink as new points are either added or deleted.

## tracks parent_graph

## using the points properties dictionary

The `Points` layer can contain properties that annotate each point.
`Points.properties` stores the properties in a dictionary
where each key is the name of the property
and the values are numpy arrays with a value for each point (i.e., length N for N points in `Points.data`).
As we will see below, we can use the values in a property to set the display properties of the points (e.g., face color or edge color).
To see the points properties in action,
please see the [point annotation tutorial](../applications/annotate_points).

## creating a new tracks layer

As you can add new points to a points layer using the add points tool,
it is possible to create a brand new empty points layers
by clicking the new points layer button above the layers list.
The shape of the points layer is defined by the points inside it,
and so as you add new points the shape will adjust as needed.
The dimension of the new points layer will default to the largest dimension of any layer currently in the viewer,
or to 2 if no other layers are present in the viewer.

## non-editable mode

If you want to disable editing of the points layer
you can set the `editable` property of the layer to `False`.

As note in the section on 3D rendering, when using 3D rendering the points layer is not editable.

## 3D rendering of tracks

All our layers can be rendered in both 2D and 3D mode,
and one of our viewer buttons can toggle between each mode.
The number of dimensions sliders will be 2 or 3 less than the total number of dimensions of the layer.
See for example these points overlaid on an image in both 2D and 3D:

![image]({{ '/assets/tutorials/smFISH.gif' | relative_url }})

Note though that when entering 3D rendering mode
the point add, delete, and select tools are all disabled.
Those options are only supported when viewing a layer using 2D rendering.


## changing track width


## changing track colors


## setting the track color with properties




## layer visibility

All our layers support a visibility toggle that allows you to set the `visible` property of each layer.
This property is located inside the layer widget in the layers list and is represented by an eye icon.

## layer opacity

All our layers support an opacity slider and `opacity` property
that allow you to adjust the layer opacity between 0, fully invisible, and 1, fully visible.
The opacity value applies globally to all the points in the layer,
and so you don't need to have any points selected for it to have an effect.

## blending layers

All our layers support three blending modes `translucent`, `additive`, and `opaque`
that determine how the visuals for this layer get mixed with the visuals from the other layers.

An `opaque` layer renders all the other layers below it invisible
and will fade to black as you decrease its opacity.

The `translucent` setting will cause the layer to blend with the layers below it if you decrease its opacity
but will fully block those layers if its opacity is 1.
This is a reasonable default, useful for many applications.

The final blending mode `additive` will cause the layer to blend with the layers below even when it has full opacity.
This mode is especially useful for visualizing multiple layers at the same time.

## naming layers

All our layers support a `name` property that can be set inside a text box inside the layer widget in the layers list.
The name of each layer is forced into being unique
so that you can use the name to index into `viewer.layers` to retrieve the layer object.

## scaling layers

All our layers support a `scale` property and keyword argument
that will rescale the layer multiplicatively according to the scale values (one for each dimension).
This property can be particularly useful for viewing anisotropic data
where the size of the voxel in the z dimension might be different then the size in the x and y dimensions.

## translating layers

All our layers support a `translate` property and keyword argument
that you can use to offset a layer relative to the other layers,
which could be useful if you are trying to overlay two layers for image registration purposes.

## layer metadata

All our layers also support a `metadata` property and keyword argument
that you can use to store an arbitrary metadata dictionary on the layer.

## putting it all together

Here you can see an example of adding, selecting, deleting points and change their properties:

![image]({{ '/assets/tutorials/editing_points.gif' | relative_url }})

## next steps

Hopefully, this tutorial has given you a detailed understanding of the `Tracks` layer,
including how to create one and control its properties.
To learn more about some of the other layer types that **napari** supports
checkout some more of our tutorials listed below.
The [shapes layer](./shapes) tutorial is a great one to try next
as it describes more complex shapes and interactivity.

{% include footer.md %}
