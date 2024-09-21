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
* <small>Default: `DaskSettings(enabled=True, cache=4.191691776)`.</small>
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
#### New labels data type

*data type for labels layers created with the "new labels" button.*

* <small>Access programmatically with `SETTINGS.application.new_labels_dtype`.</small>
* <small>Type: `LabelDTypes`.</small>
* <small>Default: `<LabelDTypes.uint8: 'uint8'>`.</small>
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
#### Plugin widget positions

*Per-widget last saved position of plugin dock widgets. This setting is managed by the application.*

* <small>Access programmatically with `SETTINGS.application.plugin_widget_positions`.</small>
* <small>Type: `Mapping[str, str]`.</small>
* <small>Default: `{}`.</small>

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


#### Font size

*Select the user interface font size.*

* <small>Access programmatically with `SETTINGS.appearance.font_size`.</small>
* <small>Type: `ConstrainedIntValue`.</small>
* <small>Default: `9`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>
#### Highlight

*Select the highlight color and thickness to use when hovering over shapes/points.*

* <small>Access programmatically with `SETTINGS.appearance.highlight`.</small>
* <small>Type: `HighlightSettings`.</small>
* <small>Default: `HighlightSettings(highlight_thickness=1, highlight_color=[0.0, 0.6, 1.0, 1.0])`.</small>
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
#### Update status based on layer

*Calculate status bar based on current active layer and mose position.*

* <small>Access programmatically with `SETTINGS.appearance.update_status_based_on_layer`.</small>
* <small>Type: `bool`.</small>
* <small>Default: `True`.</small>
* <small>UI: This setting can be configured via the preferences dialog.</small>

### PLUGINS

Plugins settings.


#### Plugin sort order

*Sort plugins for each action in the order to be called.*

* <small>Access programmatically with `SETTINGS.plugins.call_order`.</small>
* <small>Type: `Mapping[str, list[napari.settings._plugins.PluginHookOption]]`.</small>
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
* <small>Type: `Mapping[str, list[app_model.types._keys._keybindings.KeyBinding]]`.</small>
* <small>Default: `{'napari:toggle_console_visibility': [<KeyBinding at 0x7fe783aecfa0: Ctrl+Shift+C>], 'napari:reset_scroll_progress': [<KeyBinding at 0x7fe783aed3f0: Ctrl>], 'napari:toggle_ndisplay': [<KeyBinding at 0x7fe783aeca00: Ctrl+Y>], 'napari:toggle_theme': [<KeyBinding at 0x7fe783aed060: Ctrl+Shift+T>], 'napari:reset_view': [<KeyBinding at 0x7fe783aed1e0: Ctrl+R>], 'napari:delete_selected_layers': [<KeyBinding at 0x7fe783aed990: Ctrl+Delete>], 'napari:show_shortcuts': [<KeyBinding at 0x7fe783aed390: Ctrl+Alt+/>], 'napari:increment_dims_left': [<KeyBinding at 0x7fe783aed840: Left>], 'napari:increment_dims_right': [<KeyBinding at 0x7fe783aed9c0: Right>], 'napari:focus_axes_up': [<KeyBinding at 0x7fe783aee170: Alt+Up>], 'napari:focus_axes_down': [<KeyBinding at 0x7fe783aedd80: Alt+Down>], 'napari:roll_axes': [<KeyBinding at 0x7fe783aee020: Ctrl+E>], 'napari:transpose_axes': [<KeyBinding at 0x7fe783bfe140: Ctrl+T>], 'napari:rotate_layers': [<KeyBinding at 0x7fe783af9f60: Ctrl+Alt+T>], 'napari:toggle_grid': [<KeyBinding at 0x7fe783afa0e0: Ctrl+G>], 'napari:toggle_selected_visibility': [<KeyBinding at 0x7fe783afa200: V>], 'napari:toggle_unselected_visibility': [<KeyBinding at 0x7fe783afa2f0: Shift+V>], 'napari:show_only_layer_above': [<KeyBinding at 0x7fe783afa440: Shift+Alt+Up>], 'napari:show_only_layer_below': [<KeyBinding at 0x7fe783afa5c0: Shift+Alt+Down>], 'napari:hold_for_pan_zoom': [<KeyBinding at 0x7fe783afa6e0: Space>], 'napari:activate_labels_erase_mode': [<KeyBinding at 0x7fe783afa800: 1>, <KeyBinding at 0x7fe783afa8f0: E>], 'napari:activate_labels_paint_mode': [<KeyBinding at 0x7fe783afaa40: 2>, <KeyBinding at 0x7fe783afabc0: P>], 'napari:activate_labels_polygon_mode': [<KeyBinding at 0x7fe783afacb0: 3>], 'napari:activate_labels_fill_mode': [<KeyBinding at 0x7fe783afae00: 4>, <KeyBinding at 0x7fe783afaf50: F>], 'napari:activate_labels_picker_mode': [<KeyBinding at 0x7fe783afb0a0: 5>, <KeyBinding at 0x7fe783afb1f0: L>], 'napari:activate_labels_pan_zoom_mode': [<KeyBinding at 0x7fe783afb340: 6>, <KeyBinding at 0x7fe783afb490: Z>], 'napari:activate_labels_transform_mode': [<KeyBinding at 0x7fe783afb5e0: 7>], 'napari:new_label': [<KeyBinding at 0x7fe783afb730: M>], 'napari:swap_selected_and_background_labels': [<KeyBinding at 0x7fe783afb880: X>], 'napari:decrease_label_id': [<KeyBinding at 0x7fe783afb9d0: ->], 'napari:increase_label_id': [<KeyBinding at 0x7fe783afbb20: =>], 'napari:decrease_brush_size': [<KeyBinding at 0x7fe783afbc70: [>], 'napari:increase_brush_size': [<KeyBinding at 0x7fe783afbdc0: ]>], 'napari:toggle_preserve_labels': [<KeyBinding at 0x7fe783afbf10: B>], 'napari:reset_polygon': [<KeyBinding at 0x7fe783b0c0a0: Escape>], 'napari:complete_polygon': [<KeyBinding at 0x7fe783b0c1f0: Enter>], 'napari:activate_points_add_mode': [<KeyBinding at 0x7fe783b0c340: 2>, <KeyBinding at 0x7fe783b0c490: P>], 'napari:activate_points_select_mode': [<KeyBinding at 0x7fe783b0c610: 3>, <KeyBinding at 0x7fe783b0c730: S>], 'napari:activate_points_pan_zoom_mode': [<KeyBinding at 0x7fe783b0c850: 4>, <KeyBinding at 0x7fe783b0c940: Z>], 'napari:activate_points_transform_mode': [<KeyBinding at 0x7fe783b0cac0: 5>], 'napari:select_all_in_slice': [<KeyBinding at 0x7fe783b0cbe0: A>, <KeyBinding at 0x7fe783b0cd00: Ctrl+A>], 'napari:select_all_data': [<KeyBinding at 0x7fe783b0cdf0: Shift+A>], 'napari:delete_selected_points': [<KeyBinding at 0x7fe783b0cf70: 1>, <KeyBinding at 0x7fe783b0d090: Delete>, <KeyBinding at 0x7fe783b0d1b0: Backspace>], 'napari:activate_add_rectangle_mode': [<KeyBinding at 0x7fe783b0d2d0: R>], 'napari:activate_add_ellipse_mode': [<KeyBinding at 0x7fe783b0d3c0: E>], 'napari:activate_add_line_mode': [<KeyBinding at 0x7fe783b0d540: L>], 'napari:activate_add_path_mode': [<KeyBinding at 0x7fe783b0d660: T>], 'napari:activate_add_polygon_mode': [<KeyBinding at 0x7fe783b0d780: P>], 'napari:activate_add_polygon_lasso_mode': [<KeyBinding at 0x7fe783b0d8a0: Shift+P>], 'napari:activate_direct_mode': [<KeyBinding at 0x7fe783b0d9c0: 4>, <KeyBinding at 0x7fe783b0dae0: D>], 'napari:activate_select_mode': [<KeyBinding at 0x7fe783b0dc00: 5>, <KeyBinding at 0x7fe783b0dcf0: S>], 'napari:activate_shapes_pan_zoom_mode': [<KeyBinding at 0x7fe783b0de70: 6>, <KeyBinding at 0x7fe783b0df90: Z>], 'napari:activate_shapes_transform_mode': [<KeyBinding at 0x7fe783b0e0b0: 7>], 'napari:activate_vertex_insert_mode': [<KeyBinding at 0x7fe783b0e1d0: 2>, <KeyBinding at 0x7fe783b0e2f0: I>], 'napari:activate_vertex_remove_mode': [<KeyBinding at 0x7fe783b0e410: 1>, <KeyBinding at 0x7fe783b0e500: X>], 'napari:copy_selected_shapes': [<KeyBinding at 0x7fe783b0e680: Ctrl+C>], 'napari:paste_shape': [<KeyBinding at 0x7fe783b0e7a0: Ctrl+V>], 'napari:move_shapes_selection_to_front': [<KeyBinding at 0x7fe783b0e8c0: F>], 'napari:move_shapes_selection_to_back': [<KeyBinding at 0x7fe783b0e9e0: B>], 'napari:select_all_shapes': [<KeyBinding at 0x7fe783b0eb00: A>], 'napari:delete_selected_shapes': [<KeyBinding at 0x7fe783b0ec20: 3>, <KeyBinding at 0x7fe783b0ed40: Delete>, <KeyBinding at 0x7fe783b0ee60: Backspace>], 'napari:finish_drawing_shape': [<KeyBinding at 0x7fe783b0ef80: Enter>, <KeyBinding at 0x7fe783b0f0a0: Escape>], 'napari:orient_plane_normal_along_x': [<KeyBinding at 0x7fe783b0f1c0: X>], 'napari:orient_plane_normal_along_y': [<KeyBinding at 0x7fe783b0f2e0: Y>], 'napari:orient_plane_normal_along_z': [<KeyBinding at 0x7fe783b0f400: Z>], 'napari:orient_plane_normal_along_view_direction': [<KeyBinding at 0x7fe783b0f520: O>], 'napari:activate_image_pan_zoom_mode': [<KeyBinding at 0x7fe783b0f640: 1>], 'napari:activate_image_transform_mode': [<KeyBinding at 0x7fe783b0f730: 2>], 'napari:activate_vectors_pan_zoom_mode': [<KeyBinding at 0x7fe783b0f8b0: 1>], 'napari:activate_vectors_transform_mode': [<KeyBinding at 0x7fe783b0f9d0: 2>], 'napari:activate_tracks_pan_zoom_mode': [<KeyBinding at 0x7fe783b0faf0: 1>], 'napari:activate_tracks_transform_mode': [<KeyBinding at 0x7fe783b0fc10: 2>], 'napari:activate_surface_pan_zoom_mode': [<KeyBinding at 0x7fe783b0fd30: 1>], 'napari:activate_surface_transform_mode': [<KeyBinding at 0x7fe783b0fe50: 2>]}`.</small>
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
#### Double-click Labels polygon completion radius (-1 to always complete)

*Max radius in pixels from first vertex for double-click to complete a polygon; set -1 to always complete.*

* <small>Access programmatically with `SETTINGS.experimental.completion_radius`.</small>
* <small>Type: `int`.</small>
* <small>Default: `-1`.</small>
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
