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
* <small>Default: `DaskSettings(enabled=True, cache=4.1893376)`.</small>
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
* <small>Default: `{'napari:toggle_console_visibility': [<KeyBinding at 0x7fcbc37e1420: Ctrl+Shift+C>], 'napari:reset_scroll_progress': [<KeyBinding at 0x7fcbc37e1390: Ctrl>], 'napari:toggle_ndisplay': [<KeyBinding at 0x7fcbc37e11b0: Ctrl+Y>], 'napari:toggle_theme': [<KeyBinding at 0x7fcbc37e1660: Ctrl+Shift+T>], 'napari:reset_view': [<KeyBinding at 0x7fcbc37e17b0: Ctrl+R>], 'napari:delete_selected_layers': [<KeyBinding at 0x7fcbc37e1900: Ctrl+Delete>], 'napari:show_shortcuts': [<KeyBinding at 0x7fcbc37e1a50: Ctrl+Alt+/>], 'napari:increment_dims_left': [<KeyBinding at 0x7fcbc37e1ba0: Left>], 'napari:increment_dims_right': [<KeyBinding at 0x7fcbc37e1cf0: Right>], 'napari:focus_axes_up': [<KeyBinding at 0x7fcbc37e1e40: Alt+Up>], 'napari:focus_axes_down': [<KeyBinding at 0x7fcbc37e1f90: Alt+Down>], 'napari:roll_axes': [<KeyBinding at 0x7fcbc37e20e0: Ctrl+E>], 'napari:transpose_axes': [<KeyBinding at 0x7fcbc37e2230: Ctrl+T>], 'napari:toggle_grid': [<KeyBinding at 0x7fcbc37e2380: Ctrl+G>], 'napari:toggle_selected_visibility': [<KeyBinding at 0x7fcbc37e2500: V>], 'napari:toggle_unselected_visibility': [<KeyBinding at 0x7fcbc37e25f0: Shift+V>], 'napari:show_only_layer_above': [<KeyBinding at 0x7fcbc37e2740: Shift+Alt+Up>], 'napari:show_only_layer_below': [<KeyBinding at 0x7fcbc37e28c0: Shift+Alt+Down>], 'napari:hold_for_pan_zoom': [<KeyBinding at 0x7fcbc37e29e0: Space>], 'napari:activate_labels_erase_mode': [<KeyBinding at 0x7fcbc37e2b00: 1>, <KeyBinding at 0x7fcbc37e2bf0: E>], 'napari:activate_labels_paint_mode': [<KeyBinding at 0x7fcbc37e2d40: 2>, <KeyBinding at 0x7fcbc37e2ec0: P>], 'napari:activate_labels_polygon_mode': [<KeyBinding at 0x7fcbc37e2fb0: 3>], 'napari:activate_labels_fill_mode': [<KeyBinding at 0x7fcbc37e3100: 4>, <KeyBinding at 0x7fcbc37e3250: F>], 'napari:activate_labels_picker_mode': [<KeyBinding at 0x7fcbc37e33a0: 5>, <KeyBinding at 0x7fcbc37e34f0: L>], 'napari:activate_labels_pan_zoom_mode': [<KeyBinding at 0x7fcbc37e3640: 6>, <KeyBinding at 0x7fcbc37e3790: Z>], 'napari:activate_labels_transform_mode': [<KeyBinding at 0x7fcbc37e38e0: 7>], 'napari:new_label': [<KeyBinding at 0x7fcbc37e3a30: M>], 'napari:swap_selected_and_background_labels': [<KeyBinding at 0x7fcbc37e3b80: X>], 'napari:decrease_label_id': [<KeyBinding at 0x7fcbc37e3cd0: ->], 'napari:increase_label_id': [<KeyBinding at 0x7fcbc37e3e20: =>], 'napari:decrease_brush_size': [<KeyBinding at 0x7fcbc37e3f70: [>], 'napari:increase_brush_size': [<KeyBinding at 0x7fcbc37f0100: ]>], 'napari:toggle_preserve_labels': [<KeyBinding at 0x7fcbc37f0250: B>], 'napari:reset_polygon': [<KeyBinding at 0x7fcbc37f03a0: Escape>], 'napari:complete_polygon': [<KeyBinding at 0x7fcbc37f04f0: Enter>], 'napari:activate_points_add_mode': [<KeyBinding at 0x7fcbc37f0640: 2>, <KeyBinding at 0x7fcbc37f0790: P>], 'napari:activate_points_select_mode': [<KeyBinding at 0x7fcbc37f0910: 3>, <KeyBinding at 0x7fcbc37f0a30: S>], 'napari:activate_points_pan_zoom_mode': [<KeyBinding at 0x7fcbc37f0b50: 4>, <KeyBinding at 0x7fcbc37f0c40: Z>], 'napari:activate_points_transform_mode': [<KeyBinding at 0x7fcbc37f0dc0: 5>], 'napari:select_all_in_slice': [<KeyBinding at 0x7fcbc37f0ee0: A>, <KeyBinding at 0x7fcbc37f1000: Ctrl+A>], 'napari:select_all_data': [<KeyBinding at 0x7fcbc37f10f0: Shift+A>], 'napari:delete_selected_points': [<KeyBinding at 0x7fcbc37f1270: Backspace>, <KeyBinding at 0x7fcbc37f1390: Delete>, <KeyBinding at 0x7fcbc37f1480: 1>], 'napari:activate_add_rectangle_mode': [<KeyBinding at 0x7fcbc37f1600: R>], 'napari:activate_add_ellipse_mode': [<KeyBinding at 0x7fcbc37f1720: E>], 'napari:activate_add_line_mode': [<KeyBinding at 0x7fcbc37f1840: L>], 'napari:activate_add_path_mode': [<KeyBinding at 0x7fcbc37f1960: T>], 'napari:activate_add_polygon_mode': [<KeyBinding at 0x7fcbc37f1a80: P>], 'napari:activate_add_polygon_lasso_mode': [<KeyBinding at 0x7fcbc37f1ba0: Shift+P>], 'napari:activate_direct_mode': [<KeyBinding at 0x7fcbc37f1cc0: 4>, <KeyBinding at 0x7fcbc37f1de0: D>], 'napari:activate_select_mode': [<KeyBinding at 0x7fcbc37f1f00: 5>, <KeyBinding at 0x7fcbc37f1ff0: S>], 'napari:activate_shapes_pan_zoom_mode': [<KeyBinding at 0x7fcbc37f2170: 6>, <KeyBinding at 0x7fcbc37f2290: Z>], 'napari:activate_shapes_transform_mode': [<KeyBinding at 0x7fcbc37f23b0: 7>], 'napari:activate_vertex_insert_mode': [<KeyBinding at 0x7fcbc37f24d0: 2>, <KeyBinding at 0x7fcbc37f25f0: I>], 'napari:activate_vertex_remove_mode': [<KeyBinding at 0x7fcbc37f2710: 1>, <KeyBinding at 0x7fcbc37f2800: X>], 'napari:copy_selected_shapes': [<KeyBinding at 0x7fcbc37f2980: Ctrl+C>], 'napari:paste_shape': [<KeyBinding at 0x7fcbc37f2aa0: Ctrl+V>], 'napari:move_shapes_selection_to_front': [<KeyBinding at 0x7fcbc37f2bc0: F>], 'napari:move_shapes_selection_to_back': [<KeyBinding at 0x7fcbc37f2ce0: B>], 'napari:select_all_shapes': [<KeyBinding at 0x7fcbc37f2e00: A>], 'napari:delete_selected_shapes': [<KeyBinding at 0x7fcbc37f2f20: Backspace>, <KeyBinding at 0x7fcbc37f3040: Delete>, <KeyBinding at 0x7fcbc37f3160: 3>], 'napari:finish_drawing_shape': [<KeyBinding at 0x7fcbc37f3280: Escape>], 'napari:activate_image_pan_zoom_mode': [<KeyBinding at 0x7fcbc37f33a0: 1>], 'napari:activate_image_transform_mode': [<KeyBinding at 0x7fcbc37f34c0: 2>], 'napari:activate_vectors_pan_zoom_mode': [<KeyBinding at 0x7fcbc37f35e0: 1>], 'napari:activate_vectors_transform_mode': [<KeyBinding at 0x7fcbc37f3700: 2>], 'napari:activate_tracks_pan_zoom_mode': [<KeyBinding at 0x7fcbc37f3820: 1>], 'napari:activate_tracks_transform_mode': [<KeyBinding at 0x7fcbc37f3940: 2>], 'napari:activate_surface_pan_zoom_mode': [<KeyBinding at 0x7fcbc37f3a60: 1>], 'napari:activate_surface_transform_mode': [<KeyBinding at 0x7fcbc37f3b80: 2>]}`.</small>
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
