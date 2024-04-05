(connecting-events)=

# Hooking up your own events

The napari graphical user interface (GUI) operates within an **event loop** that
waits for and responds to user interaction 'events'. If you are unfamiliar with
event loops, see [napari event loop](intro-to-event-loop) for a more detailed
introduction.

If you would like to set up a custom event listener then you need to hook into
the napari [event loop](intro-to-event-loop). We offer a couple of convenience
decorators to easily connect functions to key and mouse events. You can also
connect to [native napari events](connect-napari-event).

If the function you wish to connect takes a long time (e.g., is computationally
expensive) you may want to consider [multithreading](multithreading-in-napari).
See [Long-running, blocking functions](blocking-functions) for more.

(connect-key-event)=

## Listening for keypress events

One option is to use keybindings, that will listen for keypresses and then call
some callback whenever pressed, with the viewer instance passed as an argument
to that function. As a basic example, to add a random image to the viewer every
time the `i` key is pressed, and delete the last layer when the `k` key is
pressed:

```python
import numpy as np
import napari

viewer = napari.Viewer()

@viewer.bind_key('i')
def add_layer(viewer):
    viewer.add_image(np.random.random((512, 512)))

@viewer.bind_key('k')
def delete_layer(viewer):
    try:
        viewer.layers.pop(0)
    except IndexError:
        pass

napari.run()
```

See also this [custom key bindings
example](https://github.com/napari/napari/blob/main/examples/custom_key_bindings.py).

(connect-mouse-event)=

## Listening for mouse events

You can also listen for and react to mouse events, like a click or drag event,
as shown here where we update the image with random data every time it is
clicked.

```python
import numpy as np
import napari

viewer = napari.Viewer()
layer = viewer.add_image(np.random.random((512, 512)))

@layer.mouse_drag_callbacks.append
def update_layer(layer, event):
    layer.data = np.random.random((512, 512))

napari.run()
```

As of this writing `MouseProvider`s have 4 list of callbacks that can be registered:

   - `mouse_move_callbacks`
   - `mouse_wheel_callbacks`
   - `mouse_drag_callbacks`
   - `mouse_double_click_callbacks`

Please look at the documentation of `MouseProvider` for a more in depth
discussion of when each callback is triggered. In particular single click can be
registered with `mouse_drag_callbacks`, and `mouse_double_click_callbacks` is
triggered _in addition to_ mouse `mouse_drag_callbacks`.

See also the [custom mouse
functions](https://github.com/napari/napari/blob/main/examples/custom_mouse_functions.py)
and [mouse drag
callback](https://github.com/napari/napari/blob/main/examples/mouse_drag_callback.py)
examples.

(connect-napari-event)=

## Connecting functions to native napari events

If you want something to happen following some event that happens *within*
napari, the trick becomes knowing which native signals any given napari object
provides for you to "connect" to.  Until we have centralized documentation for
all of the events offered by napari objects, the best way to find these is to
browse the source code.  Take for instance, the base
{class}`~napari.layers.Layer` class: you'll find in the `__init__` method a
``self.events`` section that looks like this:

```python
self.events = EmitterGroup(
    ...
    data=Event,
    name=Event,
    ...
)
```

That tells you that all layers are capable of emitting events called `data`, and
`name` (among many others) that will (presumably) be emitted when that property
changes. To provide your own response to that change, you can hook up a callback
function that accepts the event object:

```python
def print_layer_name(event):
    print(f"{event.source.name} changed its data!")

layer.events.data.connect(print_layer_name)
```

(blocking-functions)=

## Long-running, blocking functions

An important detail here is that the napari event loop is running in a *single
thread*.  This works just fine if the handling of each event is very short, as
is usually the case with moving sliders, and pressing buttons.  However, if one
of the events in the queue takes a long time to process, then every other event
must wait!

Take this example in napari:

```python
viewer = napari.Viewer()
# everything is fine so far... but if we trigger a long computation
image = np.random.rand(512, 1024, 1024).mean(0)
viewer.add_image(image)
# the entire interface freezes!
```

Here we have a long computation (`np.random.rand(512, 1024, 1024).mean(0)`) that
"blocks" the main thread, meaning *no button press, key press, or any other
event can be processed until it's done*.  In this scenario, it's best to put
your long-running function into another thread or process.  napari provides a
convenience for that, described in {ref}`multithreading-in-napari`.
