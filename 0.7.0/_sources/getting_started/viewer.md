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

(viewer-tutorial)=

# Tour of the napari viewer

+++

This tour assumes you have already installed **napari** and know how to launch the viewer. For help with installation see our [installation](napari-installation) tutorial. For help launching the viewer see our [getting started](launch) tutorial.

This tour will teach you about the **napari** viewer, including how to use its graphical user interface (GUI) and how the data within it is organized. At the end, you should understand both the layout of the viewer on the screen and the data inside of it.

+++

## Launching the viewer

As discussed in the [getting started](launch) tutorial, the napari viewer can be launched from the command-line, a python script, an IPython console, or a Jupyter notebook. All four methods launch the same viewer, and anything related to interacting with the viewer on the screen applies equally to all of them. We will use the syntax for running the code inside a jupyter notebook with each code block below pasted into its own cell, but if you'd like to use a python script instead, simply copy and paste the code blocks into scripts with [`napari.run()`](https://napari.org/stable/api/napari.html#napari.run) as the final line (this starts an event loop which will
open an interactive viewer) and run them.

```{tip}
Starting with release 0.6.0, you can use the [command palette](command-palette) to launch any command via {kbd}`Command/Ctrl+Shift+P`. :art:
```

**Note:** There is also an IPython console available in napari, when napari is launched from the terminal, from a Python script, or when you use the napari bundled app. You can open it with the IPython console button (far left viewer button) or with the menu option **Window** > **console**. You can use this console to programmatically interact with an open viewer using the API methods illustrated in this tutorial.

Let's get started by launching a viewer with a simple 2D image.

The fastest way to open a viewer with an image on the canvas is using {func}`imshow<napari.imshow>`:

```{code-cell} python
from skimage import data

import napari

viewer, image_layer = napari.imshow(data.astronaut(), rgb=True)
```

```{code-cell} python
---
tags: [remove-cell]
---
viewer.close()
```

Calling {func}`imshow<napari.imshow>` will return a {class}`Viewer<napari.Viewer>` object that is the main object inside **napari** and a {class}`Image<napari.layers.Image>` layer object. All the data you add to **napari** will be stored inside the {class}`Viewer<napari.Viewer>` object and will be accessible from it. This command will also open the viewer to create a GUI that you can interact with. The {class}`Image<napari.layers.Image>` will contain information about the image and allow you to access image methods.

You can also create an empty {class}`Viewer<napari.Viewer>` directly and then start adding images to it. For example:

```{code-cell} python
from skimage import data

import napari

viewer = napari.Viewer()
new_layer = viewer.add_image(data.astronaut(), rgb=True)
```

{meth}`add_image<napari.components.ViewerModel.add_image>` accepts the same arguments as {func}`imshow<napari.imshow>` but only returns an {class}`Image<napari.layers.Image>` layer instead of both the {class}`Viewer<napari.Viewer>` and {class}`Image<napari.layers.Image>` layer (as you must already have a viewer to use it).

After running either of those two commands, you should be able to see the photograph of the astronaut in the **napari** viewer as shown below:

```{code-cell} python
---
tags: [hide-input]
---
from napari.utils import nbscreenshot

nbscreenshot(viewer, alt_text="photograph of an astronaut in napari viewer")
```

```{code-cell} python
---
tags: [remove-cell]
---
viewer.close()
```

{func}`imshow<napari.imshow>` and the {meth}`add_image<napari.components.ViewerModel.add_image>` methods accept any numpy-array like object as input, including n-dimensional arrays. For more information on adding images to the viewer see the [image layer guide](layers-image).

Now we will continue exploring the rest of the viewer.

+++

(viewer-layout)=

## Layout of the viewer

The viewer is organized into a few key areas which are explained in the next sections:

- Main Menu (top bar menu)
- Layer Controls
- Layer Buttons
- Layer List
- Viewer Buttons
- Status Bar
- Canvas
- Dimension Sliders
- Scroll Buttons
- Frame Playback

The image below has the areas of the viewer labeled:

![image: viewer layout](../_static/images/Viewer-with-arrows.png)

```{admonition} Tip: Right click advanced option indicator
---
class: tip
---
If you see a button with a chevron mark in the lower right corner, it means you can click it with the right mouse button to bring up more advanced options!

![buttons with right click indicators](../_static/images/button-right-click-indicator.png)
```

We'll go through each of these in the next sections.

### Main menu or top bar menu

The main menu consists of the **File**, **View**, **Layers**, **Plugins**, **Window** and **Help** options.

- **File** has the options to open files, folders, and samples, save layers and screenshots, copy screenshots to clipboard and, in the Windows and Linux versions, preferences. Additionally, you can make a new `Image` layer from an image (or URL to an image) copied to your Clipboard (keybinding {kbd}`Command/Ctrl+N`). The `New Layer` submenu allows you to create new, blank, `Labels`, `Points` or `Shapes` layers, identical to those created by the buttons above the layer list. Plugins can also contribute custom new layer creators to this menu.

  ```{tip}
  **Preferences** opens a dialog that allows you to personalize napari settings, including keyboard shortcuts
  (keybindings). To learn more about this, see our [guide to napari Preferences](napari-preferences).
  **Note:** On macOS, the **Preferences** menu item is under the `napari` menu.
  ```

- **View** allows you to toggle full screen, the menu bar, play, display axes, the scale bar, tooltips, and the activity dock.

- **Layers** contains actions and commands designed to act on existing layers, or generate new ones. The menu is mostly
  designed for use by plugins, but will also be populated with builtin actions. Currently this menu is **in development**,
  so items may change from version to version. For more information on this menu and its usage, see [NAP-6](nap-6-contributable-menus).

- **Plugins** allows you to install and manage plugins and displays a list of plugins that are currently installed.

- **Window** allows you to open the integrated console, and hide or display the layer controls and layer list.

- **Help** contains the citation and about information.

+++

### Canvas

The **canvas** is in the center of the viewer and contains the visual display of the data passed to **napari**, including `Images`, `Points`, `Shapes`, and other supported data types. Under the hood, the canvas is a {class}`vispy.scene.canvas.SceneCanvas` object which has built-in support for features such as zooming and panning. As `vispy` uses `OpenGL` and your graphics card, panning and zooming are highly performant. You can return to the original zoom level by clicking the `home` button in the viewer buttons panel.

+++

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="../_static/images/viewer-pan-zoom.webm" type="video/webm" />
    <source src="../_static/images/viewer-pan-zoom.mp4" type="video/mp4" />
    <img src="../_static/images/viewer-pan-zoom.jpg"
      title="Your browser does not support the video tag"
      alt="Demo of pan and zoom functionality in napari."
    >
  </video>

  <caption>
  <a href="https://noirlab.edu/public/images/noirlab2501a">Data source.<a>
    Credit: Dark Energy Survey/DOE/FNAL/DECam/CTIO/NOIRLab/NSF/AURA <br>
    Image processing: R. Colombari & M. Zamani (NSF NOIRLab)
  </caption>

</figure>
```

+++

(layer-list)=

### Layer list

Layers are one of the basic napari objects. There are different layer types for `Image`, `Points`, `Shapes`, and other data types. They can be added to the viewer either programmatically or through the GUI. Once added, they populate the layer list located on the bottom left side of the canvas.

The layer list contains one widget for each of the layers that have been added to the viewer and includes a `thumbnail` that shows a miniaturized version of the currently viewed data, a `name` that is an editable text box, a `visibility` button (eye icon) that can be toggled on or off to show or hide the layer, and an `icon` for the layer type. Note that you can Option/Alt-click on the `visibility` button to show *just* that one layer, hiding all others. If you then Option/Alt-click on the `visibility` button of a layer a second time, the visibility state of all layers will be restored. Alternately, you can cycle through layers in the layer list, showing only one at a time, by using {kbd}`Shift+Option/Alt` and the {kbd}`Up` or {kbd}`Down` keys.

Adding the following three image layers using the code below adds three-layer widgets to the layer list as follows:

```{code-cell} python
---
tags: [remove-output]
---
import napari

from skimage import data

viewer = napari.Viewer()
viewer.add_image(data.astronaut(), name='astronaut')
viewer.add_image(data.moon(), name='moon')
viewer.add_image(data.camera(), name='camera')
```

```{code-cell} python
---
tags: [hide-input]
---
nbscreenshot(viewer, alt_text="3 image layers shown in napari viewer with the canvas displaying a photograph of a man looking through a camcorder")
```

Note that we've also named each of the layers using the `name` keyword argument in {meth}`add_image<napari.components.viewer_model.ViewerModel.add_image>`, and that name appears as a string in the layer widget. The layer name is coerced into being unique so it can be used to index into the `LayerList`.

You can select layers, which highlights them, by clicking on their layer widget. Multiple layers can be simultaneously selected using either {kbd}`Shift` click to select all the layers in between two clicked-on layers or {kbd}`Ctrl`+click (Windows) or {kbd}`Command`+click to select just the clicked on layers respectively.

You can rearrange the order of the layers by dragging them, including dragging multiple layers at the same time.

The {class}`Viewer<napari.Viewer>` object also contains the {class}`LayerList` object that allows access to the data of all the layers with:

```{code-cell} python
viewer.layers
```

This object can be indexed like a normal list using an `int` or using the `str` name of the layer as follows:

```{code-cell} python
viewer.layers[0]
```

```{code-cell} python
viewer.layers['astronaut']
```

You can rearrange layers by clicking and dragging them.

```{code-cell} python
---
tags: [remove-cell]
---
viewer.close()
```

### Layer controls

Above the **layer list** in the top left corner of the viewer there is a box that contains the layer controls. The controls that are available depend on the layer type selected.

For example, if you add a `Points` layer after adding an `Image` layer, the new `Points` layer will be 'selected' and you will now see different controls.

```{code-cell} python
---
tags: [remove-output]
---
import numpy as np
from skimage import data

import napari

viewer, image_layer = napari.imshow(data.astronaut(), rgb=True)
points = np.array([[100, 100], [200, 200], [300, 100]])
viewer.add_points(points, size=30)
```

```{code-cell} python
---
tags: [hide-input]
---
nbscreenshot(viewer, alt_text="points layer showing 3 white points layered on top of astronaut image in napari viewer")
```

+++

Adjusting these properties in the layers list will cause corresponding changes to properties on the selected individual layers. These properties can also be changed and accessed in the console through `viewer.layers`.

For example, the name and opacity of a layer can be changed within the console as follows:

+++

```{code-cell} python
viewer.layers[0].name = 'astronaut'
viewer.layers[0].opacity = 0.7
```

```{code-cell} python
---
tags: [remove-cell]
---
viewer.close()
```

and these changes will instantly propagate to the GUI. For more information about the different properties for different layer types please see our layer specific tutorials listed at the bottom of this tutorial.

+++

### Create Layer buttons

![layer buttons with visual indicator from selected layers](../_static/images/layer-buttons.png)

New empty `Points`, `Shapes`, and `Labels` layers can be added to the viewer using the layer buttons between the layer controls and layer list. This is equivalent to, for example, the following code to make an empty `Points` layer:

```python
viewer.add_points()
```

```{admonition} Tip: New layer button behavior
---
class: tip
---
Creating a new points or shapes layer with the layer buttons will inherit the dimensions and scale of the selected layer(s), as shown by the highlight around the buttons.
To create layers that inherit the full dimensions and mixed scale of all the layers in the layer list, either select all layers or ensure no layers are selected.
```

Once added, either in the GUI or via the console, these layers become accessible in the layers list section of the GUI and at `viewer.layers`. For example, an empty Points layer created using the code snippet above can be accessed using `viewer.layers['Points']`.

Layers can be deleted by selecting them and clicking on the `delete` button with the trash icon (or using the keybinding as set in the [**Preferences** dialog](napari-preferences)).

In the console a layer at index `i` can be removed by:

```python
viewer.layers.pop(i)
```

+++

## Dimension sliders

One of the main strengths of **napari** is that it has been designed from the beginning to handle n-dimensional data. While much consumer photography is 2D and `RGB`, scientific image data can often be volumetric (i.e. 3D), volumetric timeseries (i.e. 4D), or even higher dimensional. **napari** places no limits on the dimensionality of its input data for all its layer types.

Adding data with a dimensionality greater than 2D will cause dimension sliders to appear directly underneath the canvas and above the status bar. As many sliders as needed will appear to ensure the data can be fully browsed. For example, a 3D dataset needs one slider, a 4D dataset needs two sliders, and so on. The widths of the scroll bars of the dimension sliders are directly related to how many slices are in each dimension.
To the left of each slider will be an integer indicating which dimension is being controlled by that slider. These integers are automatically updated when changing which dimensions are to be displayed. Alternately, the sliders can be labeled by double-clicking on the integer and editing the field. The labels can be retrieved programmatically as follows:

```{code-cell} python
# To get the dimension labels
viewer.dims.axis_labels
```

You can also set the axis labels programmatically as follows:

```{code-cell} python
# To set new axis labels
viewer.dims.axis_labels = ("label_1", "label_2")
```

It is also possible to mix data of different shapes and dimensionality in different layers. If a 2D and 4D dataset are both added to the viewer then the sliders will affect only the 4D dataset, the 2D dataset will remain the
same. Effectively, the two datasets are broadcast together using [NumPy broadcasting rules](https://numpy.org/doc/stable/user/basics.broadcasting.html).

For example, the following commands from the console will add both 2D and 3D datasets to the same viewer:

```{code-cell} python
---
tags: [remove-output]
---
import numpy as np
from skimage import data

import napari

viewer = napari.Viewer()
viewer.add_image(data.moon(), name='moon')
blobs = np.stack(
    [
        data.binary_blobs(
            length=512, blob_size_fraction=0.05, n_dim=2, volume_fraction=f
        )
        for f in np.linspace(0.05, 0.5, 10)
    ],
    axis=0,
).astype(float)
viewer.add_image(blobs, name='blobs', opacity=0.5, colormap='red')
```

```{code-cell} python
---
tags: [hide-input]
---
nbscreenshot(viewer, alt_text="A 2d view of the moon on top of which is overlaid a 3d volume containing blobs through which you can navigate using the dimension slider.")
```

In this example there are three dimensions. In order to get or update the current position of the sliders, use:

```{code-cell} python
# To get the current position returned as tuple of length 3
viewer.dims.current_step
```

And to change the current position of the sliders use:

```{code-cell} python
# To change the current position of this example to step 3
viewer.dims.current_step = (3, 255, 255)
```

The length of the `current_step` tuple corresponds to the number of dimensions. Note that in this example, the last two dimensions are *displayed* (don't have a slider) and thus changing the last two elements of the tuple will have no effect [until the axes order is changed](#roll-dimensions).
The same information but in *world coordinates* (i.e., including
scale and translate transformations) is accessible via `viewer.dims.point`.

By default napari will only show a slice of the data: that which is located *exactly* at this position. However, it is possible to visualize data from a thicker dimensional slice by modifying `viewer.dims.thickness`. This will use each layer's `projection_mode` to visualize the space around `viewer.dims.point`. Alternately, you can set `viewer.dims.margin_left` and `viewer.dims.margin_right` to explicitly set the range of data around `viewer.dims.point` to be projected. Finally, you can use the corresponding `margin_left_step` and `margin_right_step` properties to work in "slider coordinates".

```{code-cell} python
---
tags: [remove-output]
---
import numpy as np
from skimage import data

import napari

viewer, (membranes, nuclei) = napari.imshow(data.cells3d(), channel_axis=1)

viewer.dims.thickness_step = (10, 1, 1)

# average for membranes, but no projection for nuclei (margins are ignored)
membranes.projection_mode = 'mean'
nuclei.projection_mode = 'none'
```

```{code-cell} python
---
tags: [hide-input]
---
nbscreenshot(viewer, alt_text="A slice through a 2-channel (membranes and nuclei) fluorescence image of cells, which the membranes averaged over 10 z-slices.")
```

The margins can also be controlled from the GUI by right-clicking the corresponding dimension slider.

### Scroll buttons

On the left and right ends of the dimension sliders are scroll buttons that take you to the edge of the image or one page back. If you press and hold it, it will scroll through the layers of the image.

### Frame Playback button

On the left end of the dimension slider is the **frame playback** button. Right clicking on this button brings up a control panel that allows you to enter the **number of frames per second**; the **play direction**, either forward or backward; and the **play mode**, once, loop, or back and forth. Left clicking this button will play the image back according to these parameters.

## Viewer buttons

Below the **layer list** is a row containing these buttons:

- Console
- 2D/3D
- Roll Dimensions
- Transpose Dimensions
- Grid display
- Home

![image: Viewer buttons](../_static/images/viewer-buttons.png)

Each one is explained below.

### Console button

The first button on the left end of the row is the `Console` button. It shows or hides the console and allows you to interact with the python kernel. Inside the console, for example, you can access the {class}`Viewer<napari.Viewer>` instance using the `viewer` argument.

This button is enabled if you launch napari from the command line, a script, or use the napari bundled app. The console is disabled if the napari viewer is opened from a Jupyter notebook or launched from within IPython, in favor of the user
continuing to use the existing interactive console.

The console (when available) appears at the bottom of the viewer as shown below:

+++

![image: console within napari](../_static/images/console.png)

+++

### Toggle 2D/3D button

The second button from the left is the 2D/3D button which toggles between `2D` and `3D` renderings of the data.

For example, open the "Cells (3D+2Ch)" sample from the `File -> Open Sample` menu. Now, by clicking the 2D/3D button,
you can switch to viewing the 3D rendering.

![Open Cells 3D+2Ch sample image](../_static/images/open_3d.png)

![Toggle 3D mode for Cells image](../_static/images/toggle_3d_cells.png)

![Cells 3D rendering](../_static/images/3d_cells.png)

Note that the icon will change to the following, to indicate 3D mode:

![image: 3D_button](../_static/images/3D-button.png)

You can achieve the same result by running the following code in the console:

```{code-cell} python
---
tags: [remove-output]
---
from skimage import data
from scipy import ndimage as ndi

import napari

blobs = data.binary_blobs(length=128, volume_fraction=0.1, n_dim=3)
viewer, image_layer = napari.imshow(blobs.astype(float), name='blobs')
labeled = ndi.label(blobs)[0]
viewer.add_labels(labeled, name='blob ID')
```

Then, enter 3D mode programmatically using:

```python
viewer.dims.ndisplay = 3
```

In this mode, when you can drag with the mouse you will rotate the 3D rendering (change the camera view of the
image) and see what it looks like from the side, back, or a different angle. To do this, click on the image and
drag the cursor to a new position, which will give something like the following view:

```{code-cell} python
---
tags: [hide-input]
---
# programmatically adjust the camera angle
viewer.dims.ndisplay = 3
viewer.camera.zoom = 2
viewer.camera.angles = (3, 38, 53)
nbscreenshot(viewer, alt_text="A rotated 3D view")
```

```{tip}
As of napari 0.6.0, the default orientation of the "depth" 3D axis has flipped.
This means that the coordinate frame has gone from being left-handed to right-
handed, a mirror image of the former default. For more information see
[Axis directions, data, and handedness](handedness-guide).
```

Note that if you want to drag the canvas/rendering itself, instead of rotating the view, you have to hold down the
{kbd}`Shift` key while dragging with the mouse. Finally, while in 3D mode you can change the perspective of the
3D view by

- holding {kbd}`Shift` ({kbd}`Control` on macOS), pressing the right mouse button and
  dragging the mouse; or
- right-clicking (on macOS holding {kbd}`Control` and clicking) on the 2D/3D mode
  button, which will bring up the perspective slider.

The camera perspective can also be altered programmatically:

```python
viewer.camera.perspective = 45
```

### Roll dimensions

The third button rolls the dimensions that are currently displayed in the viewer.
For example if you have a `ZYX` volume and are looking at the `YX` slice, this
will then show you the `ZY` slice. You can also right-click this button to pop-up
a widget that allows you to re-order the dimensions by drag-and-drop or lock a
dimension, by clicking on the padlock icon:

![image: roll dimensions widget with padlock icons](../_static/images/dims_roll_lock_widget.png){ w=200px }

Locking prevents a dimension from being rolled (reordered). This can be particularly
useful, for example, with a `3D+time` dataset where you may want to fix the time dimension,
while being able to roll through the spatial dimensions.

(gui-axis-renaming)=

```{tip}
The roll dimensions pop up also lets you rename the dimension axes used by the
viewer: double click on the text to the right of the padlock icon. For
example, for a 3D volume, double-click the default axis name `-3` (see
[explanation](axis-names)) and change it to `Z`. The change will be reflected
in the slider in 2D view and the `axes` overlay.
```

The dimension order can also be checked programmatically as follows:

```{code-cell} python
# To get the current dimension order as tuple of int
viewer.dims.order
```

And then, changed programmatically as follows:

```{code-cell} python
# To change the current dimension order
viewer.dims.order = (2, 1, 0)
```

In this case the third dimension will be controlled by the slider and the first and second dimension will be visible.
Note that this has no effect on the order of `viewer.dims.current_step`. The first element still corresponds to the first dimension for example. These are just examples; the only requirement is that the length of the tuple is the same as the number of dimensions.

### Transpose dimensions

The fourth button transposes the displayed dimensions.

### Grid button

The fifth button, the grid button, toggles between the default layer mode and grid mode. When clicked, it distributes the layers in a grid of cells. Each cell is a small interactive canvas whose camera is linked with all the others.

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="../_static/images/grid-mode.webm" type="video/webm" />
    <source src="../_static/images/grid-mode.mp4" type="video/mp4" />
    <img src="../_static/images/grid-mode.png"
      title="Your browser does not support the video tag"
      alt="a screen recording showing the the Kidney example toggling between normal mode and grid mode"
    >
  </video>
</figure>
```

The distribution of the layers in the grid can be altered according to the settings below, accessible by right-clicking the button (or programmatically through `viewer.grid`). The question icons can be hovered for more information about each setting.

1. Grid stride: By default, 1, placing one layer in each view. The value determines the number of layers overlaid in each view. Negative values reverse the order in which layers are displayed in the grid.
1. Grid width/height: By default, -1, which automatically determines the grid layout.
1. Grid spacing: The value will adjust the spacing between grid views either proportionally to the layer extents (i.e. \[0,1)) or as a pixel value \[1,1500) and will automatically adjust if needed.

![image: Grid Mode Widget](../_static/images/grid-widget.png)

### Home button

Finally, there is the `home` button. It resets the camera to its initial values.

+++

## Status bar

At the very bottom of the GUI there is a status bar that contains useful updates and tips.

On the left side of the status bar there is a message about the position of the mouse and the values of any images or the indices of any `Points` that are currently hovered over, depending on which layer is selected. When there are buttons in the layer controls panel, the status bar displays information about the layer controls button you are clicking. The buttons are not available for every layer type.

The right side of the status bar contains some helpful tips depending on which layer and tools are currently selected.

(viewer-overlays)=

## Viewer overlays

Overlays provide additional information about the render state and the data, displayed on the canvas itself.
In napari there are two main types: canvas overlays - which are locked in position on the screen and hover over the rendered canvas - and scene overlays - which are located somewhere in world coordinates and follow the camera and dims just like layers. Canvas overlays can be positioned in various locations on the canvas (e.g: `top_left`, `bottom_center`), and will automatically tile if multiple are present at the same location.

The viewer gives access to a few such overlays:

- Scale bar (canvas overlay, accessible via `viewer.scale_bar`): you may set its unit, length, and other parameters.
- Axes (scene overlay, accessible via `viewer.axes`): displays basis axes at the origin.
- Text Overlay (canvas overlay, accessible via `viewer.text_overlay`): displays arbitrary text on the canvas.

These overlays can also be accessed via graphical interface through the **View** menu and their respective submenus.

```{tip}
Similarly to the viewer, layers [also have some overlays](layer-overlays) that can be used to display layer-specific information!
```

## Right-click menu

A context-sensitive menu is available when you right-click on any of the layers. The type of layer determines which options are available. Note that if you have multiple layers selected, the menu actions will affect all of the selected layers. The options that are not available for a layer are greyed out. The following options are available depending on which layer type you have selected:

- **Toggle visibility** - invert the visibility state (hides or show) of selected layers: hidden layers will be shown, visible layers will be hidden.
- **Show All Selected Layers** - Set all selected layers to visible.
- **Hide All Selected Layers** - Set all selected layers to hidden.
- **Show All Unselected Layers** - Set all *unselected* layers to visible.
- **Hide All Unselected Layers** - Set all *unselected* layers to hidden.
- **Convert to Labels** - converts an **Image** layer to a **Labels** layer (if the data is already of type `int` it is not copied or altered, only the representation is changed, making this fully reversible). This is useful for converting a binary image segmentation map to a labels layer with each segmented object denoted by its own integer. Can also be used on a **Shapes** layer, in this case a new **Labels** layer will be created.
- **Convert to Image** - converts a **Labels** layer into an **Image** layer (the data is not copied or altered, only the representation is changed, making this fully reversible).
- **Convert datatype** - converts a **Labels** layer into int8, int16, int32, int64, uint8, uint16, uint32, or uint64 data types. The initial data type is the data type of the data itself.
- **Copy scale and transforms** - copies the scale and transformation properties of the selected layer to the clipboard. This can be useful for pasting the properties to another layer. The following options are available in this sub-menu:
  - **Copy all to clipboard** - copy all scale and transform properties to the clipboard.
  - **Copy affine to clipboard** - copy the affine transformations to the clipboard.
  - **Copy rotate to clipboard** - copy the rotation transformations to the clipboard.
  - **Copy scale to clipboard** - copy the scale transformations to the clipboard.
  - **Copy shear to clipboard** - copy the shear transformations to the clipboard.
  - **Copy translate to clipboard** - copy the translation transformations to the clipboard.
- **Apply scale/transforms from Clipboard** - applies the scale and translation properties from the clipboard to the selected layer.
- **Duplicate Layer** - creates a second copy of the selected layer. Can be used on **Points**, **Shapes**, **Labels**, and **Image** layers. This is useful for testing your analysis on a copy instead of on the original image.
- **Split RGB** - if the image layer is an RGB image, it will be split into 3 new layers with red, green, and blue values in separate layers.
- **Split Stack** - if an image layer is a stack (has 3 or more dimensions), it is split into a list of layers along the axis. This option takes a little time to execute. Properties will be changed as follows:
  - **Colormap:** (magenta, green) for a stack with 2 channels, (CYMRGB) for stacks with more than 2 channels
  - **Blending:** additive
  - **Contrast_limits:** min and max values of the layer
  - All other properties, such as **Scale** and **Translate** will be propagated from the original stack.
- **Merge to RGB** - combines a set of 3 image layers with the same dimensionality to a RGB layer. The layers must have one of `red`, `green`, and `blue` colormaps to indicate merging order.
- **Merge to Stack** - combines a set of layers to a single-layer stack. The resulting layer stack will contain the layers with their original ordering in the layer list. Layers must be of the same type (e.g. An **Image** layer can be merged only with other **Image** layers.) and must have the same dimensionality. (e.g. a 1024 x 1024 layer can only be merged with another 1024 x 1024 layer.)
- **Projection** - can be used only on a layer with more than 2 dimensions, also known as a *stack*. It creates a new layer that is a projection of the layer stack with the characteristic the user selects, reducing the number of dimensions by 1. More information about the types of projections is available [here](https://medium.com/@damiandn/an-intoduction-to-biological-image-processing-in-imagej-part-3-stacks-and-stack-projections-942aa789420f). The following projections are available:
  - **max projection** - maximum intensity projection. At each pixel position, we go through the stacks, find the pixel with the maximum intensity, and that becomes the intensity of that pixel value in the projected image.
  - **min projection** - minimum intensity projection. Similar to the maximum intensity projection, except that the minimum pixel value is used for the projected image instead of the maximum pixel value.
  - **std projection** - the standard deviation projection. At each pixel position, the standard deviation of the pixel intensities through the stack is the assigned value of that pixel position. Positions with large differences in the pixel intensities through the stack appear brighter in this projection.
  - **sum projection** - the sum projection simply adds together all the pixel values in the stack for a given position. In this projection, the image is typically re-scaled to a 16-bit image, as the sum of all the pixel intensity values usually exceeds 255, which would result in a completely white 8-bit image.
  - **mean projection** - the mean projection is the average intensity projection. It simply averages all the pixel values in the stacks to make the final projected image.
  - **median projection** - the median projection takes the median pixel intensity for the final projected image.
- **Link Layers** - links the selected layers. Once layers are linked, any action performed on one layer will be performed on all linked layers at the same time. The layer control panel will show _only_ when a single layer is selected. Changing properties with that layer's control panel will change properties in all of the linked layers.
- **Unlink Layers** - appears when layers are linked. It unlinks the layers so that changes to one of the layer's properties no longer result in the same changes to the previously linked layers.
- **Select Linked Layers** - appears only when layers are linked. Selects all layers linked to a given layer.

+++

## Changing the viewer theme

Currently, **napari** comes with `light`, `dark` themes for the viewer; the default is `dark`. Additionally, there is the `system` virtual theme that will attempt to match the viewer theme (`light` or `dark`) to your system theme on macOS, Windows, and some Linux. To change the preferred theme used for all viewers you can use the **Preferences** menu item in the **File** or **napari** menu and then select the **Appearance** tab. You can also change the `theme` property of the *current* viewer by using the following code:

```{code-cell} python
from skimage import data

import napari

viewer, image_layer = napari.imshow(data.astronaut(), name='astronaut')

# change the viewer theme
viewer.theme = 'light'
```

```{code-cell} python
---
tags: [hide-input]
---
nbscreenshot(viewer, alt_text="A napari viewer changed to light theme")
```

```{code-cell} python
---
tags: [remove-cell]
---
# change the viewer theme back to dark (for the rest of tutorial)
viewer.theme = 'dark'
```

You can also change the theme using the "Toggle theme" keyboard shortcut, by default {kbd}`Command/Control+Shift+T`. Note that changing the theme using this shortcut will only change the *current* viewer theme. If you wish to make the change permanent for all viewers, make sure to also change your settings in the **Appearance** tab of the [**Preferences** dialog](napari-preferences).

Adding your own custom theme isn't too hard but it requires creating your own color `palette` and rebuilding the icons. It's also possible for [plugins to contribute a theme](contributions-themes). If people want more themes, we're happy to add them or you can look at our [contributing guidelines](napari-contributing) for more information about building the icons and add one yourself!

+++

## Custom keybinding

napari provides a number of built-in keyboard shortcuts, which you can access and change in the **Shortcuts** section
of the [**Preferences** dialog](napari-preferences).

**Note:** **Preferences** is under the **File** menu on Windows and Linux, and under **napari** on macOS.)

One of the promises of **napari** is to provide a beginner friendly environment for interactive analysis. For example, we want to enable workflows where people can interact with the GUI, say, click on the centers of some objects or paint over some regions and then perform custom analysis. As a first step towards enabling custom interactivity we've provided support to add your own custom keybindings to the `Viewer` or individual `Layer` objects such that when the corresponding key gets clicked, your custom function gets executed. Depending on which object you bind your key to, your function will either get access to the state of the entire `Viewer` or `Layer` object.

For example, to bind a function that loops through all layers in the viewer and prints their names to your console when you press the `p` key you can do the following:

```{code-cell} python
from skimage import data

import napari

viewer, image_layer = napari.imshow(data.astronaut(), name='astronaut')

@viewer.bind_key('p')
def print_names(viewer):
    print([layer.name for layer in viewer.layers])
```

```{code-cell} python
---
tags: [remove-cell]
---
viewer.close()
```

By default, your key will bind to the key press event, but it is also possible to bind to the key release event by including a `yield` inside your function. All code before the `yield` will get executed on key press and all code after the `yield` will get executed on key release. The following example will print `hello` when you start to press the `m` key and print `goodbye` when you release it.

```{code-cell} python
viewer, image_layer = napari.imshow(data.astronaut(), name='astronaut')

@viewer.bind_key('m')
def print_message(viewer):
    print('hello')
    yield
    print('goodbye')
```

```{code-cell} python
---
tags: [remove-cell]
---
viewer.close()
```

Keys can be bound both to the object class or a particular instance depending on if you want the keybinding to apply to all instances of the class or only one particular instance.

Currently the keybindings only work when the canvas is in focus, we are working to ensure they always work.

The ability to add custom keybindings dramatically increases what is possible within **napari** and we hope you take full advantage of them.

+++

## Next steps

This tutorial has given you an overview of the functionality available on the **napari** viewer, including the {class}`LayerList` and some of the different layer types. To learn more about the different layer types **napari** supports, check out [our guides on using layers](using-layers).

For a more detailed introduction to layer manipulation see
[Layers at a glance](layers-glance).
