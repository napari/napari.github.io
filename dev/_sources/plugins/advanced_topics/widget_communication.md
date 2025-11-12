(widget-communication)=

## Widget communication

Sometimes complex workflows require access to other docked widgets, information from other plugins, which may be created by other developers.

## Access another plugin widget with `viewer.window.add_plugin_dock_widget`

If a desired plugin widget is already docked in the viewer,
calling the `add_plugin_dock_widget` method will return the existing widget instance.
If the desired widget is absent, it will be created and added to the viewer.
`add_plugin_dock_widget` is the most convenient way to access a plugin widget that is required by your plugin.

## Access a widget by name with `viewer.window.dock_widgets`

If the goal is to access a target widget, without creating a widget, use the `dock_widgets` property.
The `dock_widgets` property provides access to a read-only mapping of all docked widgets in the viewer.

This method returns the widget itself, not the `QtViewerDockWidget` wrapper.

*The `dock_widgets` property was added in napari 0.6.2.*

## Widget name

When a widget is added to the viewer via a plugin contribution (by using a menu or `add_plugin_dock_widget`), it is assigned a name.
The name is created by concatenating the widget `display_name` from the plugin manifest and the plugin name in parentheses, like this: `"Widget name (plugin_name)"`. Note: this is the same name that is shown in the napari menus and the title bar of the widget.

```{important}
We don't recommend using the `viewer.window._dock_widgets` attribute to access `QtViewerDockWidget` widgets. This is a private, internal API and may stop working on any release. Please use the above described public API instead.
```

## Shared state between widgets

If you have a need for multiple widgets to share a state, you can use a shared global object.

```python
from psygnal import EventedModel


class GlobalState(EventedModel):
    """A global state object that can be shared between widgets."""

    # Define your shared state attributes here
    some_value: int = 0
    another_value: str = 'default'


GLOBAL_STATE = None


def get_global_state():
    """Get the global state object, creating it if it does not exist."""
    global GLOBAL_STATE
    if GLOBAL_STATE is None:
        GLOBAL_STATE = GlobalState()
    return GLOBAL_STATE
```

If you need to be sure that state is related to a specific viewer, you can use the `viewer` as a dictionary key:

```python
from weakref import WeakKeyDictionary

from psygnal import EventedModel


class GlobalState(EventedModel):
    """A global state object that can be shared between widgets."""

    # Define your shared state attributes here
    some_value: int = 0
    another_value: str = 'default'


GLOBAL_STATE = WeakKeyDictionary()


def get_global_state(viewer):
    """Get the global state object for the given viewer, creating it if it does not exist."""
    if viewer not in GLOBAL_STATE:
        GLOBAL_STATE[viewer] = GlobalState()
    return GLOBAL_STATE[viewer]
```

To store state between sessions, you can enhance the `get_global_state` to load state from persistent storage, such as a drive or database.
To get a location for storing the state, you can use the `get_settings().config_path` to have a path per napari installation.
Or you can use [`appdirs.user_config_dir`](https://pypi.org/project/appdirs/)

```python
import logging
from pathlib import Path

from psygnal import EventedModel
from pydantic import ValidationError


class GlobalState(EventedModel):
    """A global state object that can be shared between widgets."""

    # Define your shared state attributes here
    some_value: int = 0
    another_value: str = 'default'


GLOBAL_STATE = None


def get_save_path():
    """Get the path to save the global state."""
    from napari.settings import get_settings

    return Path(get_settings().config_path).parent / 'plugin_name' / 'state.json'


def get_global_state():
    """Get the global state object, creating it if it does not exist."""
    global GLOBAL_STATE
    if GLOBAL_STATE is None:
        save_path = get_save_path()
        if save_path.exists():
            # Load the state from the file
            try:
                with save_path.open('r') as f:
                    GLOBAL_STATE = GlobalState.model_validate_json(f.read())
            except ValidationError:
                # If loading fails, create a new global state
                logging.exception(
                    'Failed to load global state from file, creating a new one.'
                )
                GLOBAL_STATE = GlobalState()
        else:
            # Create a new global state if the file does not exist
            GLOBAL_STATE = GlobalState()
        GLOBAL_STATE.events.connect(
            save_global_state
        )  # Connect the save event to the global state on change
    return GLOBAL_STATE


def save_global_state(event):
    """Save the global state by serializing it to a file."""
    save_path = get_save_path()
    state = event.source  # The source of the event is the global state object
    save_path.parent.mkdir(parents=True, exist_ok=True)  # Ensure the directory exists

    with save_path.open('w') as f:
        f.write(state.model_dump_json)
```
