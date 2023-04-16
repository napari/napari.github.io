(napari-preferences)=

# Preferences

Starting with version 0.4.6, napari provides persistent settings.

Settings are managed by getting the global settings object:

```python
from napari.settings import get_settings

settings = get_settings()
# then modify... e.g:
settings.appearance.theme = 'dark'
```

## Sections

The settings are grouped by sections and napari core provides the following:

### APPLICATION

Main application settings.


#### Confirm window or application closing

*Ask for confirmation before closing a napari window or application (all napari windows).*

* <small>Access programmatically with `SETTINGS.application.confirm_close_window`.</small>
* <small>Type: `bool`.</small>
* <small>Default: `True`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Console notification level

*Select the notification level for the console.*

* <small>Access programmatically with `SETTINGS.application.console_notification_level`.</small>
* <small>Type: `NotificationSeverity`.</small>
* <small>Default: `<NotificationSeverity.NONE: 'none'>`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Dask cache

*Settings for dask cache (does not work with distributed arrays)*

* <small>Access programmatically with `SETTINGS.application.dask`.</small>
* <small>Type: `DaskSettings`.</small>
* <small>Default: `{'enabled': True, 'cache': 1.820317696}`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### First time

*Indicate if napari is running for the first time. This setting is managed by the application.*

* <small>Access programmatically with `SETTINGS.application.first_time`.</small>
* <small>Type: `bool`.</small>
* <small>Default: `True`.</small>

#### Grid Height

*Number of rows in the grid.*

* <small>Access programmatically with `SETTINGS.application.grid_height`.</small>
* <small>Type: `ConstrainedIntValue`.</small>
* <small>Default: `-1`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Grid Stride

*Number of layers to place in each grid square.*

* <small>Access programmatically with `SETTINGS.application.grid_stride`.</small>
* <small>Type: `ConstrainedIntValue`.</small>
* <small>Default: `1`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Grid Width

*Number of columns in the grid.*

* <small>Access programmatically with `SETTINGS.application.grid_width`.</small>
* <small>Type: `ConstrainedIntValue`.</small>
* <small>Default: `-1`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### GUI notification level

*Select the notification level for the user interface.*

* <small>Access programmatically with `SETTINGS.application.gui_notification_level`.</small>
* <small>Type: `NotificationSeverity`.</small>
* <small>Default: `<NotificationSeverity.INFO: 'info'>`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Delay to treat button as hold in seconds

*This affects certain actions where a short press and a long press have different behaviors, such as changing the mode of a layer permanently or only during the long press.*

* <small>Access programmatically with `SETTINGS.application.hold_button_delay`.</small>
* <small>Type: `float`.</small>
* <small>Default: `0.5`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### IPython interactive

*Toggle the use of interactive `%gui qt` event loop when creating napari Viewers in IPython.*

* <small>Access programmatically with `SETTINGS.application.ipy_interactive`.</small>
* <small>Type: `bool`.</small>
* <small>Default: `True`.</small>

#### Language

*Select the display language for the user interface.*

* <small>Access programmatically with `SETTINGS.application.language`.</small>
* <small>Type: `Language`.</small>
* <small>Default: `'en'`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Opened folders history

*Last saved list of opened folders. This setting is managed by the application.*

* <small>Access programmatically with `SETTINGS.application.open_history`.</small>
* <small>Type: `List[str]`.</small>
* <small>Default: `[]`.</small>

#### Playback frames per second

*Playback speed in frames per second.*

* <small>Access programmatically with `SETTINGS.application.playback_fps`.</small>
* <small>Type: `int`.</small>
* <small>Default: `10`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Playback loop mode

*Loop mode for playback.*

* <small>Access programmatically with `SETTINGS.application.playback_mode`.</small>
* <small>Type: `LoopMode`.</small>
* <small>Default: `<LoopMode.LOOP: 'loop'>`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Preferences size

*Last saved width and height for the preferences dialog. This setting is managed by the application.*

* <small>Access programmatically with `SETTINGS.application.preferences_size`.</small>
* <small>Type: `Optional[Tuple[int, int]]`.</small>
* <small>Default: `None`.</small>

#### Saved folders history

*Last saved list of saved folders. This setting is managed by the application.*

* <small>Access programmatically with `SETTINGS.application.save_history`.</small>
* <small>Type: `List[str]`.</small>
* <small>Default: `[]`.</small>

#### Save window geometry

*Toggle saving the main window size and position.*

* <small>Access programmatically with `SETTINGS.application.save_window_geometry`.</small>
* <small>Type: `bool`.</small>
* <small>Default: `True`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Save window state

*Toggle saving the main window state of widgets.*

* <small>Access programmatically with `SETTINGS.application.save_window_state`.</small>
* <small>Type: `bool`.</small>
* <small>Default: `False`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Window fullscreen

*Last saved fullscreen state for the main window. This setting is managed by the application.*

* <small>Access programmatically with `SETTINGS.application.window_fullscreen`.</small>
* <small>Type: `bool`.</small>
* <small>Default: `False`.</small>

#### Window maximized state

*Last saved maximized state for the main window. This setting is managed by the application.*

* <small>Access programmatically with `SETTINGS.application.window_maximized`.</small>
* <small>Type: `bool`.</small>
* <small>Default: `False`.</small>

#### Window position

*Last saved x and y coordinates for the main window. This setting is managed by the application.*

* <small>Access programmatically with `SETTINGS.application.window_position`.</small>
* <small>Type: `Optional[Tuple[int, int]]`.</small>
* <small>Default: `None`.</small>

#### Window size

*Last saved width and height for the main window. This setting is managed by the application.*

* <small>Access programmatically with `SETTINGS.application.window_size`.</small>
* <small>Type: `Optional[Tuple[int, int]]`.</small>
* <small>Default: `None`.</small>

#### Window state

*Last saved state of dockwidgets and toolbars for the main window. This setting is managed by the application.*

* <small>Access programmatically with `SETTINGS.application.window_state`.</small>
* <small>Type: `Optional[str]`.</small>
* <small>Default: `None`.</small>

#### Show status bar

*Toggle diplaying the status bar for the main window.*

* <small>Access programmatically with `SETTINGS.application.window_statusbar`.</small>
* <small>Type: `bool`.</small>
* <small>Default: `True`.</small>


### APPEARANCE

User interface appearance settings.


#### Highlight thickness

*Select the highlight thickness when hovering over shapes/points.*

* <small>Access programmatically with `SETTINGS.appearance.highlight_thickness`.</small>
* <small>Type: `ConstrainedIntValue`.</small>
* <small>Default: `1`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Show layer tooltips

*Toggle to display a tooltip on mouse hover.*

* <small>Access programmatically with `SETTINGS.appearance.layer_tooltip_visibility`.</small>
* <small>Type: `bool`.</small>
* <small>Default: `False`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Theme

*Select the user interface theme.*

* <small>Access programmatically with `SETTINGS.appearance.theme`.</small>
* <small>Type: `Theme`.</small>
* <small>Default: `'dark'`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>

### PLUGINS

Plugins settings.


#### Plugin sort order

*Sort plugins for each action in the order to be called.*

* <small>Access programmatically with `SETTINGS.plugins.call_order`.</small>
* <small>Type: `Mapping[str, List[napari.settings._plugins.PluginHookOption]]`.</small>
* <small>Default: `{}`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Disabled plugins

*Plugins to disable on application start.*

* <small>Access programmatically with `SETTINGS.plugins.disabled_plugins`.</small>
* <small>Type: `Set[str]`.</small>
* <small>Default: `set()`.</small>

#### File extension readers

*Assign file extensions to specific reader plugins*

* <small>Access programmatically with `SETTINGS.plugins.extension2reader`.</small>
* <small>Type: `Mapping[str, str]`.</small>
* <small>Default: `{}`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Writer plugin extension association.

*Assign file extensions to specific writer plugins*

* <small>Access programmatically with `SETTINGS.plugins.extension2writer`.</small>
* <small>Type: `Mapping[str, str]`.</small>
* <small>Default: `{}`.</small>

#### Use npe2 adaptor

*Use npe2-adaptor for first generation plugins.
When an npe1 plugin is found, this option will
import its contributions and create/cache
a 'shim' npe2 manifest that allows it to be treated
like an npe2 plugin (with delayed imports, etc...)*

* <small>Access programmatically with `SETTINGS.plugins.use_npe2_adaptor`.</small>
* <small>Type: `bool`.</small>
* <small>Default: `False`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>

### SHORTCUTS

Shortcut settings.


#### shortcuts

*Set keyboard shortcuts for actions.*

* <small>Access programmatically with `SETTINGS.shortcuts.shortcuts`.</small>
* <small>Type: `Mapping[str, List[app_model.types._keys._keybindings.KeyBinding]]`.</small>
* <small>Default: `{'napari:toggle_console_visibility': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a92230fd0>], 'napari:reset_scroll_progress': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a92240070>], 'napari:toggle_ndisplay': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a92240160>], 'napari:toggle_theme': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a922402b0>], 'napari:reset_view': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a92240400>], 'napari:delete_selected_layers': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a92240550>], 'napari:show_shortcuts': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a922406a0>], 'napari:increment_dims_left': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a922407f0>], 'napari:increment_dims_right': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a92240940>], 'napari:focus_axes_up': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a92240a90>], 'napari:focus_axes_down': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a9223abe0>], 'napari:roll_axes': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a9223a700>], 'napari:transpose_axes': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a9223a7f0>], 'napari:toggle_grid': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a9223aa90>], 'napari:toggle_selected_visibility': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a9223ae50>], 'napari:hold_for_pan_zoom': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a92240c70>], 'napari:activate_labels_erase_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a92240d30>], 'napari:activate_labels_paint_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a92240eb0>], 'napari:activate_labels_fill_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c7f040>], 'napari:activate_labels_picker_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c7f190>], 'napari:activate_labels_pan_zoom_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c7f2e0>], 'napari:activate_labels_transform_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c7f430>], 'napari:new_label': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c7f580>], 'napari:set_label_to_background': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c7f6d0>], 'napari:decrease_label_id': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c7f820>], 'napari:increase_label_id': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c7f970>], 'napari:decrease_brush_size': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c7fac0>], 'napari:increase_brush_size': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c7fc10>], 'napari:toggle_preserve_labels': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c7fd60>], 'napari:activate_points_add_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c7feb0>], 'napari:activate_points_select_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c89040>], 'napari:activate_points_pan_zoom_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c89160>], 'napari:activate_points_transform_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c89280>], 'napari:select_all_in_slice': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c893a0>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c894c0>], 'napari:select_all_data': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c89610>], 'napari:delete_selected_points': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c89730>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c89850>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c899a0>], 'napari:activate_add_rectangle_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c89ac0>], 'napari:activate_add_ellipse_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c89be0>], 'napari:activate_add_line_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c89d00>], 'napari:activate_add_path_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c89e20>], 'napari:activate_add_polygon_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c93040>], 'napari:activate_direct_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c930d0>], 'napari:activate_select_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c931f0>], 'napari:activate_shapes_pan_zoom_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c93310>], 'napari:activate_shapes_transform_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c93430>], 'napari:activate_vertex_insert_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c93550>], 'napari:activate_vertex_remove_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c93670>], 'napari:copy_selected_shapes': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c93790>], 'napari:paste_shape': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c938b0>], 'napari:move_shapes_selection_to_front': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c939d0>], 'napari:move_shapes_selection_to_back': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c93b20>], 'napari:select_all_shapes': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c93c70>], 'napari:delete_selected_shapes': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c93d90>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c93eb0>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c9c040>], 'napari:finish_drawing_shape': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c9c130>], 'napari:activate_image_pan_zoom_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c9c250>], 'napari:activate_image_transform_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c9c3a0>], 'napari:activate_vectors_pan_zoom_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c9c4c0>], 'napari:activate_vectors_transform_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c9c5e0>], 'napari:activate_tracks_pan_zoom_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c9c700>], 'napari:activate_tracks_transform_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c9c820>], 'napari:activate_surface_pan_zoom_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c9c940>], 'napari:activate_surface_transform_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f7a90c9ca60>]}`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>

### EXPERIMENTAL

Experimental settings.


#### Render Images Asynchronously

*Asynchronous loading of image data. 
This setting partially loads data while viewing. 
You must restart napari for changes of this setting to apply.*

* <small>Access programmatically with `SETTINGS.experimental.async_`.</small>
* <small>Type: `bool`.</small>
* <small>Default: `False`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Enable Asynchronous Tiling of Images

*Renders images asynchronously using tiles. 
You must restart napari for changes of this setting to apply.*

* <small>Access programmatically with `SETTINGS.experimental.octree`.</small>
* <small>Type: `Union[bool, str]`.</small>
* <small>Default: `False`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>

**Support for plugin specific settings will be provided in an upcoming release.**

## Changing settings programmatically

```python
from napari.settings import SETTINGS

SETTINGS.appearance.theme = "light"
```

## Reset to defaults via CLI

To reset all napari settings to the default values:

```bash
napari --reset
```

## The preferences dialog

Starting with version 0.4.6, napari provides a preferences dialog to manage
some of the provided options.

### Application

![application](../images/_autogenerated/preferences-application.png)



### Appearance

![appearance](../images/_autogenerated/preferences-appearance.png)



### Plugins

![plugins](../images/_autogenerated/preferences-plugins.png)



### Shortcuts

![shortcuts](../images/_autogenerated/preferences-shortcuts.png)



### Experimental

![experimental](../images/_autogenerated/preferences-experimental.png)



### Reset to defaults via UI

To reset the preferences click on the `Restore defaults` button and continue
by clicking on `Restore`.

![](../images/_autogenerated/preferences-reset.png)
