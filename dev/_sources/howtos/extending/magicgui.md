---
jupytext:
  cell_metadata_filter: -all
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.12
    jupytext_version: 1.8.2
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---
(creating-widgets)=

# Creating widgets

Widgets are small composable graphical elements that can be added to the napari user
interface. The easiest way to add a widget is by using
[`magicgui`](https://pyapp-kit.github.io/magicgui/), a Python package that assists
in building widgets. It is a general abstraction layer on GUI toolkit backends (like
Qt), with an emphasis on mapping Python types to widgets. This enables you to easily
create widgets using annotations.
If you require more extensibility though, you can create your own widget `class` that
subclasses [`QtWidgets.QWidget`](https://doc.qt.io/qt-5/qwidget.html).

This document will describe each widget creation method, in increasing order of
extensibility;

1. creating a widget from a function and
   [`magicgui`](https://pyapp-kit.github.io/magicgui/) (simplest but least extensible
   and flexible)
2. create a widget class that subclasses a
   [`magicgui` widget class](https://pyapp-kit.github.io/magicgui/widgets/#the-widget-hierarchy)
3. create a widget class that subclasses
   [`QtWidgets.QWidget`](https://doc.qt.io/qt-5/qwidget.html) (most extensible but also
   the most difficult to implement)

More examples of widget use can be found in the
['GUI' gallery examples](https://napari.org/stable/_tags/gui.html) (note: not every
example includes a widget). Additionally,
[cookiecutter-napari-plugin](https://github.com/napari/cookiecutter-napari-plugin)
has more robust widget examples that you can adapt to your needs.

There are two ways to then add a widget to a napari viewer:

* via {meth}`napari.qt.Window.add_dock_widget` in a Python script or interactive
  console (see [How to launch napari](getting_started) for details on launching
  and interacting programmatically with napari)
* by adding a [widget contribution](widgets-contribution-guide) in a
  [plugin](plugins-index).

There is an important implementation distinction between the two methods;
{meth}`~napari.qt.Window.add_dock_widget` expects an *instance* of a widget, like
an instance of class {class}`~magicgui.widgets.FunctionGui` or
`qtpy.QtWidgets.QWidget`, whereas
[widget contributions](widgets-contribution-guide), expect a `callable`
(like a function or class) that will return a widget instance. When describing
each of the three widget creation methods below, we will first show how to create a
widget and add it to the viewer
with {meth}`~napari.qt.Window.add_dock_widget`, then how to adapt the widget
for a widget contribution.

(magicgui)=

## `magicgui` decorated functions

[`magicgui`](https://pyapp-kit.github.io/magicgui/) makes building widgets to represent
function inputs easy via the
[`magicgui.magicgui`](https://pyapp-kit.github.io/magicgui/api/magicgui/#magicgui.magicgui)
decorator:

```{code-cell} python
:tags: [remove-stderr]

from magicgui import magicgui
import datetime
import pathlib

@magicgui(
    call_button="Calculate",
    slider_float={"widget_type": "FloatSlider", 'max': 10},
    dropdown={"choices": ['first', 'second', 'third']},
)
def widget_demo(
    maybe: bool,
    some_int: int,
    spin_float=3.14159,
    slider_float=4.5,
    string="Text goes here",
    dropdown='first',
    date=datetime.datetime.now(),
    filename=pathlib.Path('/some/path.ext')
):
    ...

widget_demo.show()
```

`magicgui` uses [type hints](https://peps.python.org/pep-0484/) to infer
the appropriate widget type for a given function parameter, and to indicate a
context-dependent action for the object returned from the function (in the
absence of a type hint, the type of the default value will be used). You can also
customize your widget using
[`magicgui.magicgui`](https://pyapp-kit.github.io/magicgui/api/magicgui/#magicgui.magicgui)
parameters. In the example above, `call_button` specifies the button text and the
`param_options` `slider_float` and `dropdown` let you customize the widget
associated with those function parameters.

Third party packages (like napari in this case) may provide support for their types
using
[`magicgui.register_type`](https://pyapp-kit.github.io/magicgui/usage/types_widgets.html#register-type).
Indeed napari uses
[`magicgui.register_type`](https://pyapp-kit.github.io/magicgui/usage/types_widgets.html#register-type)
to provide support for napari-specific type annotations. This makes it easy to
use `magicgui` to build widgets in napari. Note all type annotations below *require*
that the resulting widget be added to a napari viewer.

Below we demonstrate how to create a simple threshold widget using `magicgui` and add
it to the viewer. Note the `auto_call` parameter tells `magicgui` to call the function
whenever a `threshold_magic_widget` parameter changes, thus the function is called
as soon as we add the 'camera' image.

```{code-cell} python
:tags: [remove-output]
from skimage import data
from skimage.util import img_as_float

import napari

@magicgui(
    threshold={"widget_type": "FloatSlider", "max": 1}, auto_call=True
)
def threshold_magic_widget(
    img_layer: "napari.layers.Image", threshold: "float"
) -> "napari.types.LabelsData":
    return img_as_float(img_layer.data) > threshold

# Create the viewer and add an image
viewer = napari.view_image(data.camera())
# Add widget to viewer
viewer.window.add_dock_widget(threshold_magic_widget)
```

```{code-cell} python
:tags: [remove-input]
from napari.utils import nbscreenshot

viewer.window._qt_window.resize(1225, 900)
nbscreenshot(viewer, alt_text="A magicgui threshold widget")
```

Below we first document how to use napari-specific
[parameter](magicgui-parameter-annotations) and
[return type](magicgui-return-annotations) annotations to easily create your own
widgets. We then explain how to use
[`magicgui` function widgets in plugin widget contributions](magicgui-plugin-widgets).

```{note}
For a more complex example of a `magicgui.magicgui` widget, see the
[gaussian blur example](https://pyapp-kit.github.io/magicgui/generated_examples/napari/napari_parameter_sweep/#napari-parameter-sweeps)
in the `magicgui` documentation.
```

(magicgui-parameter-annotations)=

### Parameter annotations

The following napari types may be used as *parameter* type annotations in
`magicgui` functions to get information from the napari viewer into your
`magicgui` function.

- any napari {class}`~napari.layers.Layer` subclass, such as
  {class}`~napari.layers.Image` or {class}`~napari.layers.Points`
- the napari {class}`~napari.layers.Layer` class
- any of the `<LayerType>Data` types from {mod}`napari.types`, such as
  {attr}`napari.types.ImageData` or  {attr}`napari.types.LabelsData`
- {class}`napari.Viewer`

The consequence of each type annotation is described below:

#### Annotating as a `Layer` subclass

If you annotate one of your function parameters as a
{class}`~napari.layers.Layer` subclass (such as {class}`~napari.layers.Image` or
{class}`~napari.layers.Points`), it will be rendered as a
{class}`~magicgui.widgets.ComboBox` widget (i.e. "dropdown menu"), where the
options in the dropdown box are the layers of the corresponding type currently
in the viewer.

```python
from napari.layers import Image

@magicgui
def my_widget(image: Image):
    # do something with whatever image layer the user has selected
    # note: it *may* be None! so your function should handle the null case
    ...
```

Here's a complete example:

```{code-cell} python
:tags: [remove-output]
import napari
import numpy as np
from napari.layers import Image

@magicgui(image={'label': 'Pick an Image'})
def my_widget(image: Image):
    ...

viewer = napari.view_image(np.random.rand(64, 64), name="My Image")
viewer.window.add_dock_widget(my_widget)
```
*Note the widget on the right side with "My Image" as the currently selected option*

```{code-cell} python
:tags: [remove-input]
from napari.utils import nbscreenshot

viewer.window._qt_window.resize(1225, 900)
nbscreenshot(viewer, alt_text="A magicgui widget using an image layer parameter annotation")
```

#### Annotating as `Layer` class

In the previous example, the dropdown menu will *only* show
{class}`~napari.layers.Image` layers, because the parameter was annotated as an
{class}`~napari.layers.Image`.  If you'd like a dropdown menu that allows the
user to pick from *all* layers in the layer list, annotate your parameter as
{class}`~napari.layers.Layer`

```python
from napari.layers import Layer

@magicgui
def my_widget(layer: Layer):
    # do something with whatever layer the user has selected
    # note: it *may* be None! so your function should handle the null case
    ...
```

(annotating-as-napari-types-data)=
#### Annotating as `napari.types.*Data`

In the previous example, the object passed to your function will be the actual
{class}`~napari.layers.Layer` instance, meaning you will need to access any
attributes (like `layer.data`) on your own.  If your function is designed to
accept a numpy array, you can use any of the special `<LayerType>Data` types
from {mod}`napari.types` to indicate that you only want the data attribute from
the layer (where `<LayerType>` is one of the available layer types).  Here's an
example using {attr}`napari.types.ImageData`:

```python
from napari.types import ImageData
import numpy as np

@magicgui
def my_widget(array: ImageData):
    # note: it *may* be None! so your function should handle the null case
    if array is not None:
      assert isinstance(array, np.ndarray)  # it will be!
```

Like above, it will be rendered as a {class}`~magicgui.widgets.ComboBox`.

#### Annotating as `napari.Viewer`

Lastly, if you need to access the actual {class}`~napari.viewer.Viewer` instance
in which the widget is docked, you can annotate one of your parameters as a
{class}`napari.Viewer`. This will not automatically render as a
{class}`~magicgui.widgets.ComboBox` so you will need to
[specify the *widget option*](https://pyapp-kit.github.io/magicgui/type_map/#customizing-widget-options-with-typingannotated)
to map this parameter to.

```python
from napari import Viewer

@magicgui
def my_widget(viewer: Viewer):
  ...
```

```{caution}
Please use this sparingly, as a last resort. If you need to *add* layers
to the viewer from your function, prefer one of the return-annotation methods
described [below](#return-annotations).
If you find that you require the viewer instance because of functionality that
is otherwise missing here, please consider opening an issue in the
[napari issue tracker](https://github.com/napari/napari/issues/new/choose),
describing your use case.
```
(magicgui-return-annotations)=

### Return annotations

The following napari types may be used as *return* type annotations in `magicgui`
functions to add layers to napari from your `magicgui` function:

- napari {class}`~napari.layers.Layer` class or any of its subclasses, such as
  {class}`~napari.layers.Image` or {class}`~napari.layers.Points`
- any of the `<LayerType>Data` types from {mod}`napari.types`, such as
  {attr}`napari.types.ImageData` or  {attr}`napari.types.LabelsData`
- {attr}`napari.types.LayerDataTuple`
- `List`s of {class}`napari.layers.Layer` or {attr}`napari.types.LayerDataTuple`

The consequence of each type is described below:

#### Returning a `Layer` subclass

If you use a {class}`~napari.layers.Layer` subclass as a *return* annotation on a
`magicgui` function, napari will interpet it to mean that the layer returned
from the function should be added to the viewer.  The object returned from the
function must be an actual {class}`~napari.layers.Layer` instance.

```python
from napari.layers import Image
import numpy as np

@magicgui
def my_widget(ny: int=64, nx: int=64) -> Image:
  return Image(np.random.rand(ny, nx), name='my Image')
```

Here's a complete example

```{code-cell} python
:tags: [remove-output]
@magicgui(call_button='Add Image')
def my_widget(ny: int=64, nx: int=64) -> Image:
  return Image(np.random.rand(ny, nx), name='My Image')

viewer = napari.Viewer()
viewer.window.add_dock_widget(my_widget, area='right')
my_widget()  # "call the widget" to call the function, so it shows in the
             # screenshot below.
             # Normally this would be caused by clicking on 'Add Image' button
```

*Note the new "My Image" layer in the viewer as a result of having called the widget function.*

```{code-cell} python
:tags: [remove-input]
from napari.utils import nbscreenshot

viewer.window._qt_window.resize(1225, 900)
nbscreenshot(viewer, alt_text="A magicgui widget using an image layer return annotation")
```

```{note}
With this method, a new layer will be added to the layer list each time the
function is called.  To update an existing layer, you must use the
`LayerDataTuple` approach described below
```

#### Returning `List[napari.layers.Layer]`

You can create multiple layers by returning a list of
{class}`~napari.layers.Layer`.

```python
from typing import List

@magicgui
def make_points(...) -> List[napari.layers.Layer]:
  ...
```

```{note}
Note: the `List[]` syntax here is optional from the perspective of napari.  You
can return either a single Layer or a list of Layers and they will all be added
to the viewer as long as you annotate with either `List[napari.layers.Layer]` or
`napari.layers.Layer`.  If you want your code to be properly typed, however,
your return type must match your return annotation.
```

(returning-napari-types-data)=
#### Returning `napari.types.*Data`

In the previous example, the object returned by the function had to be an actual
{class}`~napari.layers.Layer` instance (in keeping with the return type
annotation).  In many cases, you may only be interested in receiving and
returning the layer {attr}`~napari.layers.Layer.data`  itself.  (There are
*many* functions already written that accept and return a `numpy.ndarray`, for
example). In this case, you may use a return type annotation of one the special
`<LayerType>Data` types from {mod}`napari.types` to indicate that you want data
returned by your function to be turned into the corresponding
{class}`~napari.layers.Layer` type, and added to the viewer.

For example, in combination with the {attr}`~napari.types.ImageData` paramater
annotation [described above](annotating-as-napari-types-data):

```{code-cell} python
:tags: [remove-output]
from napari.types import LabelsData, ImageData

@magicgui(call_button='Run Threshold')
def threshold(image: ImageData, threshold: int = 75) -> LabelsData:
    """Threshold an image and return a mask."""
    return (image > threshold).astype(int)

viewer = napari.view_image(np.random.randint(0, 100, (64, 64)))
viewer.window.add_dock_widget(threshold)
threshold()  # "call the widget" to call the function, so it shows in the
             # screenshot below.
             # Normally this would be caused by clicking on 'Run Threshold' button
```

```{code-cell} python
:tags: [remove-input]
from napari.utils import nbscreenshot

viewer.window._qt_window.resize(1225, 900)
nbscreenshot(viewer, alt_text="A magicgui widget returning a layer attribute")
```

#### Returning `napari.types.LayerDataTuple`

The most flexible return type annotation is {attr}`napari.types.LayerDataTuple`:
it gives you full control over the layer that will be created and added to the
viewer.  It also lets you update an existing layer with a matching name.

A {attr}`~napari.types.LayerDataTuple` is a {class}`tuple` in one of the
following three forms:

1. `(layer_data,)`
   - a single item tuple containing only layer data (will be interpreted as an
     'image' layer).
2. `(layer_data, {})`
   - a 2-tuple of `layer_data` and a metadata {class}`dict`. the keys in the
     metadata `dict` must be valid keyword arguments to the corresponding
     {class}`napari.layers.Layer` constructor.
3. `(layer_data, {}, 'layer_type')`
   - a 3-tuple of data, metadata, and layer type string.`layer_type` should be a
     lowercase string form of one of the layer types (like `'points'`,
     `'shapes'`, etc...).  If omitted, the layer type is assumed to be
     `'image'`.

The following are all valid {attr}`napari.types.LayerDataTuple` examples:

```python
# an image array
(np.random.rand(64, 64),)

# an image with name and custom blending mode
(np.random.rand(64, 64), {'name': 'My Image', 'blending': 'additive'})

# an empty points layer
(None, {}, 'points')

# points with properties
(np.random.rand(20, 2), {'properties': {'values': np.random.rand(20)}}, 'points')
```

An example of using a {attr}`~napari.types.LayerDataTuple` return annotation in
a `magicgui` function:

```{code-cell} python
:tags: [remove-output]
import napari.types

@magicgui(call_button='Make Points')
def make_points(n_points=40) -> napari.types.LayerDataTuple:
  data = 500 * np.random.rand(n_points, 2)
  props = {'values': np.random.rand(n_points)}
  return (data, {'properties': props}, 'points')

viewer = napari.Viewer()
viewer.window.add_dock_widget(make_points)
make_points()  # "call the widget" to call the function, so it shows in the
               # screenshot below.
               # Normally this would be caused by clicking on 'Make Points' button
```

```{code-cell} python
:tags: [remove-input]
from napari.utils import nbscreenshot

viewer.window._qt_window.resize(1225, 900)
nbscreenshot(viewer, alt_text="A magicgui widget returning a LayerDataTuple")
```

#### Returning `List[napari.types.LayerDataTuple]`

You can also create multiple layers by returning a list of
{attr}`~napari.types.LayerDataTuple`.

```python
from typing import List

@magicgui
def make_points(...) -> List[napari.types.LayerDataTuple]:
  ...
```

```{note}
Note: the `List[]` syntax here is optional from the perspective of napari.  You
can return either a single tuple or a list of tuples and they will all be added
to the viewer as long as you annotate with either `List[napari.types.LayerDataTuple]`
or `napari.types.LayerDataTuple`.  If you want your code to be properly typed, however,
your return type must match your return annotation.
```

### Updating an existing Layer

The default behavior is to add a new layer to the viewer for each
`LayerDataTuple` returned by a `magicgui` function. By specifying the value of
`name` key in your {attr}`~napari.types.LayerDataTuple` metadata dict to be the name
of an existing layer, you can update this layer, rather than creating a new layer each
time the function is called:

```{code-cell} python
:tags: [remove-output]

@magicgui(call_button='Make Points', n_points={'maximum': 200})
def make_points(n_points=40) -> napari.types.LayerDataTuple:
  data = 500 * np.random.rand(n_points, 2)
  # 'My Points' is the name of an existing layer
  return (data, {'name': 'My Points'}, 'points')

viewer = napari.Viewer()
viewer.window.add_dock_widget(make_points)
# calling this multiple times will just update 'My Points'
make_points()
make_points.n_points.value = 80
make_points()
make_points.n_points.value = 120
make_points()
```

```{code-cell} python
:tags: [remove-input]
from napari.utils import nbscreenshot

viewer.window._qt_window.resize(1225, 900)
nbscreenshot(viewer, alt_text="A magicgui widget updating an existing layer")
```

### Avoid imports with forward references

Sometimes, it is undesirable to import and/or depend on napari directly just
to provide type annotations.  It is possible to avoid importing napari
entirely by annotating with the string form of the napari type.  This is called
a [Forward
reference](https://peps.python.org/pep-0484/#forward-references):

```python
@magicgui
def my_func(data: 'napari.types.ImageData') -> 'napari.types.ImageData':
    ...
```

:::{tip}

If you'd like to maintain IDE type support and autocompletion, you can
do so by hiding the napari imports inside of a {attr}`typing.TYPE_CHECKING`
clause:

```python
from typing import TYPE_CHECKING

if TYPE_CHECKING:
  import napari

@magicgui
def my_func(data: 'napari.types.ImageData') -> 'napari.types.ImageData':
    ...
```

This will not require napari at runtime, but if it is installed in your
development environment, you will still get all the type inference.

:::

(magicgui-plugin-widgets)=

## `magicgui` function widgets as plugin contributions

Recall [above](creating-widgets) that plugin
[widget contributions](widgets-contribution-guide) expects a `callable` that returns
a widget instance, whereas {meth}`~napari.qt.Window.add_dock_widget` expects an
*instance* of a widget. The {meth}`~napari.qt.Window.add_dock_widget` examples
above can be easily adapted to be plugin widgets by using
the {func}`@magic_factory <magicgui.magic_factory>` decorator instead of the
{func}`@magicgui <magicgui.magicgui>` decorator.

For example, the threshold widget [shown above](returning-napari-types-data)
could be provided as a napari plugin as follows:

```python
from magicgui import magic_factory
from napari_plugin_engine import napari_hook_implementation

@magic_factory(auto_call=True, threshold={'max': 2 ** 16})
def threshold(
    data: 'napari.types.ImageData', threshold: int
) -> 'napari.types.LabelsData':
    return (data > threshold).astype(int)
```

This function can now be added to the plugin manifest as a widget contribution.
See the [widget contribution guide](widgets-contribution-guide) for details.

Alternatively, you can also directly subclass {class}`~magicgui.widgets.FunctionGui`
(which is the type that is returned by the {func}`@magicgui <magicgui.magicgui>`
decorator). This method would give you more control over your widget.
See [widget classes](widget-classes) below for more.

:::{note}
{func}`@magic_factory <magicgui.magic_factory>` behaves very much like
{func}`functools.partial`: it returns a callable that "remembers" some or
all of the parameters required for a "future" call to {func}`magicgui.magicgui`.
The parameters provided to {func}`@magic_factory <magicgui.magic_factory>` can
also be overridden when creating a widget from a factory:

```python
@magic_factory(call_button=True)
def my_factory(x: int):
    ...

widget1 = my_factory()
widget2 = my_factory(call_button=False, x={'widget_type': 'Slider'})
```

:::


(widget-classes)=

## Widget classes

Generating a widget by creating a widget class allows you to have more control over
your widget. Your widget class must subclass {class}`magicgui.widgets.bases.Widget`
(i.e., a
[`magicgui` widget class](https://pyapp-kit.github.io/magicgui/widgets/#the-widget-hierarchy))
or [`QtWidgets.QWidget`](https://doc.qt.io/qt-5/qwidget.html).
It can then be added to the napari viewer
by instantiating the widget class, then adding this via
{meth}`~napari.qt.Window.add_dock_widget`. You can also create a plugin and add
your widget class (*not* instantiated widget) as a
[widget contribution](widgets-contribution-guide).

Below we will detail how to use various parent classes to generate a widget.
There are several `magicgui` widget classes so we will only document the use of the
two most useful in the napari context; {class}`~magicgui.widgets.FunctionGui` and
{class}`~magicgui.widgets.Container`.
We will begin with the simplest but least extensible parent class and end with the
parent class the most extensible.

### `magicgui.widgets.FunctionGui`

Creating a widget by subclassing {class}`~magicgui.widgets.FunctionGui` is similar in
principle to using the {func}`@magicgui <magicgui.magicgui>` decorator. Decorating
a function with {func}`@magicgui <magicgui.magicgui>` is equivalent to passing
the same function to {class}`~magicgui.widgets.FunctionGui`'s `function` parameter.
The remaining {class}`~magicgui.widgets.FunctionGui` parameters essentially
mirror {func}`@magicgui <magicgui.magicgui>`'s parameters.
Indeed, {class}`~magicgui.widgets.FunctionGui` is the type that is returned by
{func}`@magicgui <magicgui.magicgui>`. Subclassing
{class}`~magicgui.widgets.FunctionGui` however, gives you access to the
`native` `QWidget` of your widget, allowing you change its appearance and add
custom elements.

```python
from magicgui.widgets import FunctionGui

import napari

def my_function(...):
    ...

class MyGui(FunctionGui):
    def __init__(self):
        super().__init__(
          my_function,
          call_button=True,
          layout='vertical',
          param_options={...}
        )
        # do whatever other initialization you want here

# Create a `viewer`
viewer = napari.Viewer()
# Instantiate your widget
my_widg = MyGui(my_function)
# Add widget to `viewer`
viewer.window.add_dock_widget(my_widg)
```

Class widgets are easy to use as
[plugin widget contributions](widgets-contribution-guide). Simply provide the
class definition and add to the plugin manifest.

### `magicgui.widgets.Container`

The {class}`~magicgui.widgets.Container` allows you to build more complex widgets
from sub-widgets. This gives you more control over each sub-widget and how callbacks
are connected to events but you can still use the convenient `magicgui` widget
generation features as shown below.

```python
from magicgui.widgets import Container, create_widget

class ImageThreshold(Container):
    def __init__(self, viewer: "napari.viewer.Viewer"):
        super().__init__()
        self._viewer = viewer
        # use create_widget to generate widgets from type annotations
        self._image_layer_combo = create_widget(
            label="Image", annotation="napari.layers.Image"
        )
        self._threshold_slider = create_widget(
            label="Threshold", annotation=float, widget_type="FloatSlider"
        )

        # connect your own callbacks
        self._threshold_slider.changed.connect(self._threshold_im)
        # append into/extend the container with your widgets
        self.extend(
            [
                self._image_layer_combo,
                self._threshold_slider,
            ]
        )

    def _threshold_im(self):
        image_layer = self._image_layer_combo.value
        if image_layer is None:
            return

        image = img_as_float(image_layer.data)
        name = image_layer.name + "_thresholded"
        threshold = self._threshold_slider.value
        thresholded = image > threshold
        # Update existing layer (if present) or add new labels layer
        if name in self._viewer.layers:
            self._viewer.layers[name].data = thresholded
        else:
            self._viewer.add_labels(thresholded, name=name)

# Create a `viewer`
viewer = napari.Viewer()
# Instantiate your widget
my_widg = ImageThreshold()
# Add widget to `viewer`
viewer.window.add_dock_widget(my_widg)
```

As above to turn this into a [plugin widget contribution](widgets-contribution-guide),
simply provide the class definition and add to the plugin manifest.

### `QtWidgets.QWidget`

For the most control over your widget, subclass
[`QtWidgets.QWidget`](https://doc.qt.io/qt-5/qwidget.html):

```python
from qtpy.QtWidgets import QHBoxLayout, QPushButton, QWidget

class ExampleQWidget(QWidget):
    def __init__(self, viewer: "napari.viewer.Viewer"):
        super().__init__()
        self.viewer = viewer

        btn = QPushButton("Click me!")
        btn.clicked.connect(self._on_click)

        self.setLayout(QHBoxLayout())
        self.layout().addWidget(btn)

    def _on_click(self):
        print("napari has", len(self.viewer.layers), "layers")

# Create a `viewer`
viewer = napari.Viewer()
# Instantiate your widget
my_widg = ExampleQWidget()
# Add widget to `viewer`
viewer.window.add_dock_widget(my_widg)
```

As above to turn this into a [plugin widget contribution](widgets-contribution-guide),
simply provide the class definition and add to the plugin manifest.
