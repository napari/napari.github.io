(intro-to-event-loop)=

# napari event loop

## Introduction

Like most applications with a graphical user interface (GUI), napari operates
within an **event loop** that waits for and responds to user interaction 'events'.
Events could be a mouse click, slider movement or a keypress, and usually correspond
to some specific action taken by the user (e.g. "user moved the gamma slider").
These actions add events to the queue and the event loop handles them one at a time
by executing functions that are connected to each event.

If you're coming from a background of scripting or working with python in an
interactive console, thinking in terms of the "event loop" can feel a bit
strange at times. Often we write code in a very procedural way: "Step 1: do this,
Step 2: do that, etc ...". With napari and other GUI programs however, usually you
connect events to "callback" functions, which essentially specifies; "If this event
happens, then call this function". Next you start the event loop and hope you
connected everything correctly!  Indeed, much of the napari source code is
dedicated to creating and handling events: search the codebase for
[`.emit(`](https://github.com/napari/napari/search?q=%22.emit%28%22&type=code)
and
[`.connect(`](https://github.com/napari/napari/search?q=%22.connect%28%22&type=code)
to find examples of creating and handling internal events, respectively.

It is not necessary to have a deep understanding of event loops to use
napari but a basic understanding can be useful if you would like to customize
the behavior of napari.

## Starting the event loop

### In IPython or Jupyter Notebook

Simply creating a viewer (e.g., with `viewer = napari.Viewer()`) will start the event
loop. napari will then detect if you are running an IPython or Jupyter shell, and
will automatically use the
[IPython GUI event loop](https://ipython.readthedocs.io/en/stable/config/eventloops.html#integrating-with-gui-event-loops). This prevents *blocking* of the Python
interpreter, allowing you to continue executing code in your interactive environment.
Note that this was not always the case - prior to
[version 0.4.7](https://github.com/napari/napari/releases/tag/v0.4.7) you needed to
manually call `%gui qt` first to prevent blocking.

Example:

```python
In [1]: import napari

In [2]: viewer = napari.Viewer()  # Viewer will show in a new window

In [3]: ... # Continue interactive usage
```

````{tip}
If you would prefer that napari did *not* start the interactive
event loop for you in IPython, then you can disable it with:

```python
from napari.settings import get_settings

get_settings().application.ipy_interactive = False
```

... but then you will have to start the program yourself as described [below](#in-a-script).
````

### In a script

Outside of interactve Python environments, you must tell napari when to
"start the event loop" by using {func}`napari.run`. This will *block* execution of
your script at that point, show the viewer, and wait for any user interaction.
When the last napari viewer closes, execution of the script will proceed.

```python
import napari

viewer = napari.Viewer()
...  # Continue setting  up your program

# Start the program, show the viewer, wait for GUI interaction.
napari.run()

# Anything below here will execute only after all viewers are closed.
```

-----------

## More in depth

At its core, an event loop is rather simple.  It amounts to something that looks
like this (in pseudo-code):

```python
event_queue = Queue()

while True:  # infinite loop!
    if not event_queue.is_empty():
        event = get_next_event()
        if event.value == 'Quit':
            break
        else:
            process_event(event)
```

Actions taken by the user add events to the queue and the event loop handles them one
at a time.

## Qt applications, event loops, and widgets

Currently, napari uses Qt as its GUI backend, and the main loop handling events
in napari is the [Qt
EventLoop](https://wiki.qt.io/Threads_Events_QObjects#Events_and_the_event_loop).

A deep dive into the Qt event loop is beyond the scope of this document, but
it's worth being aware of two critical steps in the "lifetime" of a Qt
Application:

1) Any program that would like to create a
   [`QWidget`](https://doc.qt.io/qt-5/qwidget.html) (the class from which all
   napari's graphical elements are subclassed), must create a
   [`QApplication`](https://doc.qt.io/qt-5/qapplication.html) instance *before*
   instantiating any widgets.

   ```python
   from qtpy.QtWidgets import QApplication

   app = QApplication([])  # where [] is a list of args passed to the App
   ```

2) In order to actually show and interact with widgets, one must start the
   application's event loop:

   ```python
   app.exec_()
   ```

If you would like to create your own widgets in napari see {ref}`creating-widgets`.

### napari's `QApplication`

In napari, the initial step of creating the `QApplication` is handled by
{func}`napari.qt.get_app`.  (Note however, that napari will do this for you
automatically behind the scenes when you create a viewer with
{class}`napari.Viewer()`)

The second step – starting the Qt event loop – is handled by {func}`napari.run`

```python
import napari

viewer = napari.Viewer()  # This will create a Application if one doesn't exist

napari.run()  # This will call `app.exec_()` and start the event loop.
```

(gui-qt-deprecated)=

:::{admonition}  What about `napari.gui_qt`?
:class: caution

**{func}`napari.gui_qt` was deprecated in version 0.4.8.**

The autocreation of the `QApplication` instance and the {func}`napari.run`
function was introduced in
[PR#2056](https://github.com/napari/napari/pull/2056), and released in [version
0.4.3](https://github.com/napari/napari/releases/tag/v0.4.3).  Prior to that,
all napari examples included this `gui_qt()` context manager:

```python
# deprecated
with napari.gui_qt():
    viewer = napari.Viewer()
```

On entering the context, `gui_qt` would create a `QApplication`, and on exiting
the context, it would start the event loop (the two critical steps [mentioned
above](#qt-applications-event-loops-and-widgets)).

Unlike a typical context manager, however, it did not actually *destroy* the
`QApplication` (since it may still be needed in the same session)... and future
calls to `gui_qt` were only needed to start the event loop.  By auto-creating
the `QApplication` during {class}`~napari.Viewer` creation, introducing the
explicit {func}`napari.run` function, and using the [integrated IPython event
loop](#in-ipython-or-jupyter-notebook) when applicable, we hope to simplify the
usage of napari.

:::

Now that you have an understanding of how napari creates the event loop, you may
wish to learn more about {ref}`hooking up your own callbacks <connecting-events>`
to specific events.
