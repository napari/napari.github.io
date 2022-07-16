(widgets-contribution-guide)=
## Widgets

Widget plugins allow developers to contribute novel graphical
elements (aka "widgets") to the user interface.  These widgets can request
access to the viewer instance in which they are docked, enabling a broad
range of functionality: essentially, anything that can be done with the
napari `Viewer` and `Layer` APIs can be accomplished with widgets.

```{important}
Because this is a powerful and open-ended plugin specification, we
ask that plugin developers take additional care when providing widget plugins.
Make sure to only use public methods on the `viewer` and `layer` instances.
Also, be mindful of the fact that the user may be using your plugin along with
other plugins or workflows: try to only modify layers added by your plugin, or
specifically requested by the user.
```

The widget specification requires that the plugin provide napari with a
*callable* object that, when called, returns an *instance* of a widget
(where a "widget" is an instance of `QtWidgets.QWidget` or `magicgui.widgets.Widget`).

There are a few commonly used patterns that fulfill this `Callable[..., Widget]`
specification:

1. Provide a `class` object directly, such as a `QtWidgets.QWidget` or
   `magicgui.widgets.Widget` subclass:

   ```python
   from qtpy.QtWidgets import QWidget

   class MyPluginWidget(QWidget):
       def __init__(self, viewer: 'napari.viewer.Viewer'):
           super().__init__()
           self._viewer = viewer
   ```

2. Provide a wrapper function, or `magicgui.magic_factory` object:

    ```python
    from magicgui import magic_factory

    @magic_factory
    def create_widget(image: 'napari.types.ImageData') -> 'napari.types.ImageData':
        ...
    ```

    *(reminder, in the example above, each time the `magic_factory`-decorated
    `create_widget()` function is called, it returns a new widget instance ––
    just as we need for the widget specification.)*

3. Lastly, you can provide an arbitrary function and request that napari
   autogenerate a widget using `magicgui.magicgui`.  In the first generation
   `napari_plugin_engine`, this was the `napari_experimental_provide_function`
   hook specification.  In the new `npe2` pattern, one uses the `autogenerate`
   field in the [WidgetContribution](contributions-widgets).


### Widget example

````{tabbed} npe2
**python implementation**

```python
# example_plugin.some_module
Widget = Union["magicgui.widgets.Widget", "qtpy.QtWidgets.QWidget"]


class MyWidget(QWidget):
    """Any QtWidgets.QWidget or magicgui.widgets.Widget subclass can be used."""

    def __init__(self, viewer: "napari.viewer.Viewer", parent=None):
        super().__init__(parent)
        ...

@magic_factory
def widget_factory(
    image: "napari.types.ImageData", threshold: int
) -> "napari.types.LabelsData":
    """Generate thresholded image.

    This pattern uses magicgui.magic_factory directly to turn a function
    into a callable that returns a widget.
    """
    return (image > threshold).astype(int)

def threshold(
    image: "napari.types.ImageData", threshold: int
) -> "napari.types.LabelsData":
    """Generate thresholded image.

    This function will be turned into a widget using `autogenerate: true`.
    """
    return (image > threshold).astype(int)
```

**manifest**

See [Widgets contribution reference](contributions-widgets) for field details.

```yaml
contributions:
  commands:
  - id: example-plugin.my_widget
    title: Open my widget
    python_name: example_plugin.some_module:MyWidget
  - id: example-plugin.threshold_widget
    title: Make threshold widget with magic_factory
    python_name: example_plugin.some_module:widget_factory
  - id: example-plugin.do_threshold
    title: Perform threshold on image, return new image
    python_name: example_plugin.some_module:threshold
  widgets:
  - command: example-plugin.my_widget
    display_name: Wizard
  - command: example-plugin.threshold_widget
    display_name: Threshold
  - command: example-plugin.do_threshold
    display_name: Threshold
    autogenerate: true

```
````

````{tabbed} napari-plugin-engine

```{admonition} Deprecated!
This demonstrates the now-deprecated `napari-plugin-engine` pattern.
```

**python implementation**

[hook_specification](https://napari.org/plugins/stable/npe1.html#napari.plugins.hook_specifications.napari_experimental_provide_dock_widget)

```python
from qtpy.QtWidgets import QWidget
from napari_plugin_engine import napari_hook_implementation


class AnimationWizard(QWidget):
    def __init__(self, viewer: "napari.viewer.Viewer", parent=None):
        super().__init__(parent)
        ...


@magic_factory
def widget_factory(
    image: "napari.types.ImageData", threshold: int
) -> "napari.types.LabelsData":
    """Generate thresholded image.

    This pattern uses magicgui.magic_factory directly to turn a function
    into a callable that returns a widget.
    """
    return (image > threshold).astype(int)


def threshold(
    image: "napari.types.ImageData", threshold: int
) -> "napari.types.LabelsData":
    """Generate thresholded image.

    This function will be turned into a widget using `autogenerate: true`.
    """
    return (image > threshold).astype(int)


# in the first generation plugin engine, these widgets were declared
# using special `napari_hook_implementation`-decorated functions.

@napari_hook_implementation
def napari_experimental_provide_dock_widget():
    return [AnimationWizard, widget_factory]


@napari_hook_implementation
def napari_experimental_provide_function():
    return [threshold]
```
````