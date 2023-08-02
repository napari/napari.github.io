(plugin-test)=
# Testing guidelines

(plugin-testing-tips)=
## Tips for testing napari plugins

Testing is a big topic!  If you are completely new to writing tests in python,
consider reading this post on [Getting Started With Testing in
Python](https://realpython.com/python-testing/)

We recommend using
[pytest](https://docs.pytest.org/en/6.2.x/getting-started.html) for testing your
plugin. Aim for [100% test coverage](../building_a_plugin/best_practices.md#how-to-check-test-coverage)!

### The `make_napari_viewer_proxy` fixture

Testing a napari `Viewer` requires some setup and teardown each time.  We have
created a [pytest fixture](https://docs.pytest.org/en/6.2.x/fixture.html) called
`make_napari_viewer_proxy` that you can use (this requires that you have napari
installed in your environment).

To use a fixture in pytest, you simply include the name of the fixture in the
test parameters (oddly enough, you don't need to import it!).  For example, to
create a napari viewer for testing:

```py
def test_something_with_a_viewer(make_napari_viewer_proxy):
    viewer = make_napari_viewer_proxy()
    ...  # carry on with your test
```

If you embed the viewer in your own application and need to access private attributes,
you can use the `make_napari_viewer` fixture.

### Prefer smaller unit tests when possible

The most common issue people run into when designing tests for napari plugins is
that they try to test everything as a full "integration test", starting from the
napari event or action that would trigger their plugin to do something.  For
example, let's say you have a dock widget that connects a mouse callback to the
viewer:

```py
class MyWidget:
    def __init__(self, viewer: 'napari.Viewer'):
        self._viewer = viewer

        @viewer.mouse_move_callbacks.append
        def _on_mouse_move(viewer, event):
            if 'Shift' in event.modifiers:
                ...

@napari_hook_implementation
def napari_experimental_provide_dock_widget():
    return MyWidget
```

You might think that you need to somehow simulate a mouse movement in napari in
order to test this, but you don't! Just *trust* that napari will call this
function with a `Viewer` and an `Event` when a mouse move has been made, and
otherwise leave `napari` out of it.

Instead, focus on "unit testing" your code: just call the function directly with
objects that emulate, or "mock" the objects that your function expects to
receive from napari. You may also need to slightly reorganize your code.  Let's
modify the above widget to make it easier to test:

```py
class MyWidget:
    def __init__(self, viewer: 'napari.Viewer'):
        self._viewer = viewer
        # connecting to a method rather than a local function
        # makes it easier to test
        viewer.mouse_move_callbacks.append(self._on_mouse_move)

    def _on_mouse_move(self, viewer, event):
        if 'Shift' in event.modifiers:
            ...
```

To test this, we can often just instantiate the widget with our own viewer, and
then call the methods directly. As for the `event` object, notice that all we
care about in this plugin is that it has a `modifiers` attribute that may or may
not contain the string `"Shift"`.  So let's just fake it!

```py
class FakeEvent:
    modifiers = {'Shift'}

def test_mouse_callback(make_napari_viewer):
    viewer = make_napari_viewer()
    wdg = MyWidget(viewer)
    wdg._on_mouse_move(viewer, FakeEvent())
    # assert that what you expect to happen actually happened!
```
