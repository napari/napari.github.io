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


#### Brush size on mouse move modifiers

*Modifiers to activate changing the brush size by moving the mouse.*

* <small>Access programmatically with `SETTINGS.application.brush_size_on_mouse_move_modifiers`.</small>
* <small>Type: `BrushSizeOnMouseModifiers`.</small>
* <small>Default: `<BrushSizeOnMouseModifiers.ALT: 'Alt'>`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
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
* <small>Default: `DaskSettings(enabled=True, cache=1.814557696)`.</small>
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
* <small>Default: `{'napari:toggle_console_visibility': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3adc30>], 'napari:reset_scroll_progress': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3adae0>], 'napari:toggle_ndisplay': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb39e9b0>], 'napari:toggle_theme': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb39e830>], 'napari:reset_view': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb39f130>], 'napari:delete_selected_layers': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb39ed10>], 'napari:show_shortcuts': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb39ef50>], 'napari:increment_dims_left': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb39efe0>], 'napari:increment_dims_right': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb383c10>], 'napari:focus_axes_up': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb383b50>], 'napari:focus_axes_down': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb383c40>], 'napari:roll_axes': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb383fa0>], 'napari:transpose_axes': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ada20>], 'napari:toggle_grid': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ae020>], 'napari:toggle_selected_visibility': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ae1a0>], 'napari:hold_for_pan_zoom': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ae290>], 'napari:activate_labels_erase_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ae410>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ae500>], 'napari:activate_labels_paint_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ae650>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ae7d0>], 'napari:activate_labels_polygon_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ae8c0>], 'napari:activate_labels_fill_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3aea10>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3aeb60>], 'napari:activate_labels_picker_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3aecb0>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3aee00>], 'napari:activate_labels_pan_zoom_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3aef50>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3af0a0>], 'napari:activate_labels_transform_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3af1f0>], 'napari:new_label': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3af340>], 'napari:swap_selected_and_background_labels': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3af490>], 'napari:decrease_label_id': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3af5e0>], 'napari:increase_label_id': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3af730>], 'napari:decrease_brush_size': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3af880>], 'napari:increase_brush_size': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3af9d0>], 'napari:toggle_preserve_labels': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3afb20>], 'napari:reset_polygon': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3afc70>], 'napari:complete_polygon': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3afdc0>], 'napari:activate_points_add_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3aff10>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cc0a0>], 'napari:activate_points_select_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cc220>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cc340>], 'napari:activate_points_pan_zoom_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cc460>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cc550>], 'napari:activate_points_transform_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cc6d0>], 'napari:select_all_in_slice': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cc7f0>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cc910>], 'napari:select_all_data': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cca00>], 'napari:delete_selected_points': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ccb80>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ccca0>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ccd90>], 'napari:activate_add_rectangle_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ccf10>], 'napari:activate_add_ellipse_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cd030>], 'napari:activate_add_line_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cd150>], 'napari:activate_add_path_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cd270>], 'napari:activate_add_polygon_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cd390>], 'napari:activate_add_polygon_lasso_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cd4b0>], 'napari:activate_direct_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cd5d0>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cd6f0>], 'napari:activate_select_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cd810>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cd900>], 'napari:activate_shapes_pan_zoom_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cda80>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cdba0>], 'napari:activate_shapes_transform_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cdcc0>], 'napari:activate_vertex_insert_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cdde0>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cdf00>], 'napari:activate_vertex_remove_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ce020>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ce110>], 'napari:copy_selected_shapes': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ce290>], 'napari:paste_shape': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ce3b0>], 'napari:move_shapes_selection_to_front': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ce4d0>], 'napari:move_shapes_selection_to_back': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ce5c0>], 'napari:select_all_shapes': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ce740>], 'napari:delete_selected_shapes': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ce860>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ce980>, <app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3ceaa0>], 'napari:finish_drawing_shape': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cebc0>], 'napari:activate_image_pan_zoom_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cece0>], 'napari:activate_image_transform_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cee00>], 'napari:activate_vectors_pan_zoom_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cef20>], 'napari:activate_vectors_transform_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cf040>], 'napari:activate_tracks_pan_zoom_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cf160>], 'napari:activate_tracks_transform_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cf280>], 'napari:activate_surface_pan_zoom_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cf3a0>], 'napari:activate_surface_transform_mode': [<app_model.types._keys._keybindings.KeyBinding object at 0x7f3cfb3cf4c0>]}`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>

### EXPERIMENTAL

Experimental settings.


#### Render Images Asynchronously

*Asynchronous loading of image data. 
This setting partially loads data while viewing.*

* <small>Access programmatically with `SETTINGS.experimental.async_`.</small>
* <small>Type: `bool`.</small>
* <small>Default: `False`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Enable autoswapping rendering buffers.

*Autoswapping rendering buffers improves quality by reducing tearing artifacts, while sacrificing some performance.*

* <small>Access programmatically with `SETTINGS.experimental.autoswap_buffers`.</small>
* <small>Type: `bool`.</small>
* <small>Default: `False`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Minimum distance threshold of shapes lasso tool

*Value determines how many screen pixels one has to move before another vertex can be added to the polygon.*

* <small>Access programmatically with `SETTINGS.experimental.lasso_vertex_distance`.</small>
* <small>Type: `ConstrainedIntValue`.</small>
* <small>Default: `10`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Shapes polygon lasso RDP epsilon

*Setting this higher removes more points from polygons. 
Setting this to 0 keeps all vertices of a given polygon*

* <small>Access programmatically with `SETTINGS.experimental.rdp_epsilon`.</small>
* <small>Type: `ConstrainedFloatValue`.</small>
* <small>Default: `0.5`.</small>
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
