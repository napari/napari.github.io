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
* <small>Default: `DaskSettings(enabled=True, cache=4.189335552)`.</small>
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
* <small>Default: `{'napari:toggle_console_visibility': [<KeyBinding at 0x7f7ffb968580: Ctrl+Shift+C>], 'napari:reset_scroll_progress': [<KeyBinding at 0x7f7ffb968940: Ctrl>], 'napari:toggle_ndisplay': [<KeyBinding at 0x7f7ffb968490: Ctrl+Y>], 'napari:toggle_theme': [<KeyBinding at 0x7f7ffb9688e0: Ctrl+Shift+T>], 'napari:reset_view': [<KeyBinding at 0x7f7ffb968d90: Ctrl+R>], 'napari:delete_selected_layers': [<KeyBinding at 0x7f7ffb968f10: Ctrl+Delete>], 'napari:show_shortcuts': [<KeyBinding at 0x7f7ffb969600: Ctrl+Alt+/>], 'napari:increment_dims_left': [<KeyBinding at 0x7f7ffb969180: Left>], 'napari:increment_dims_right': [<KeyBinding at 0x7f7ffb969540: Right>], 'napari:focus_axes_up': [<KeyBinding at 0x7f7ffb94bca0: Alt+Up>], 'napari:focus_axes_down': [<KeyBinding at 0x7f7ffb94bc40: Alt+Down>], 'napari:roll_axes': [<KeyBinding at 0x7f7ffb94beb0: Ctrl+E>], 'napari:transpose_axes': [<KeyBinding at 0x7f7ffb971360: Ctrl+T>], 'napari:toggle_grid': [<KeyBinding at 0x7f7ffb9714b0: Ctrl+G>], 'napari:toggle_selected_visibility': [<KeyBinding at 0x7f7ffb971630: V>], 'napari:toggle_unselected_visibility': [<KeyBinding at 0x7f7ffb971720: Shift+V>], 'napari:show_only_layer_above': [<KeyBinding at 0x7f7ffb971870: Shift+Alt+Up>], 'napari:show_only_layer_below': [<KeyBinding at 0x7f7ffb9719f0: Shift+Alt+Down>], 'napari:hold_for_pan_zoom': [<KeyBinding at 0x7f7ffb971b10: Space>], 'napari:activate_labels_erase_mode': [<KeyBinding at 0x7f7ffb971c30: 1>, <KeyBinding at 0x7f7ffb971d20: E>], 'napari:activate_labels_paint_mode': [<KeyBinding at 0x7f7ffb971e70: 2>, <KeyBinding at 0x7f7ffb971ff0: P>], 'napari:activate_labels_polygon_mode': [<KeyBinding at 0x7f7ffb9720e0: 3>], 'napari:activate_labels_fill_mode': [<KeyBinding at 0x7f7ffb972230: 4>, <KeyBinding at 0x7f7ffb972380: F>], 'napari:activate_labels_picker_mode': [<KeyBinding at 0x7f7ffb9724d0: 5>, <KeyBinding at 0x7f7ffb972620: L>], 'napari:activate_labels_pan_zoom_mode': [<KeyBinding at 0x7f7ffb972770: 6>, <KeyBinding at 0x7f7ffb9728c0: Z>], 'napari:activate_labels_transform_mode': [<KeyBinding at 0x7f7ffb972a10: 7>], 'napari:new_label': [<KeyBinding at 0x7f7ffb972b60: M>], 'napari:swap_selected_and_background_labels': [<KeyBinding at 0x7f7ffb972cb0: X>], 'napari:decrease_label_id': [<KeyBinding at 0x7f7ffb972e00: ->], 'napari:increase_label_id': [<KeyBinding at 0x7f7ffb972f50: =>], 'napari:decrease_brush_size': [<KeyBinding at 0x7f7ffb9730a0: [>], 'napari:increase_brush_size': [<KeyBinding at 0x7f7ffb9731f0: ]>], 'napari:toggle_preserve_labels': [<KeyBinding at 0x7f7ffb973340: B>], 'napari:reset_polygon': [<KeyBinding at 0x7f7ffb973490: Escape>], 'napari:complete_polygon': [<KeyBinding at 0x7f7ffb9735e0: Enter>], 'napari:activate_points_add_mode': [<KeyBinding at 0x7f7ffb973730: 2>, <KeyBinding at 0x7f7ffb973880: P>], 'napari:activate_points_select_mode': [<KeyBinding at 0x7f7ffb973a00: 3>, <KeyBinding at 0x7f7ffb973b20: S>], 'napari:activate_points_pan_zoom_mode': [<KeyBinding at 0x7f7ffb973c40: 4>, <KeyBinding at 0x7f7ffb973d30: Z>], 'napari:activate_points_transform_mode': [<KeyBinding at 0x7f7ffb973eb0: 5>], 'napari:select_all_in_slice': [<KeyBinding at 0x7f7ffb973fd0: A>, <KeyBinding at 0x7f7ffb994130: Ctrl+A>], 'napari:select_all_data': [<KeyBinding at 0x7f7ffb994220: Shift+A>], 'napari:delete_selected_points': [<KeyBinding at 0x7f7ffb9943a0: 1>, <KeyBinding at 0x7f7ffb9944c0: Delete>, <KeyBinding at 0x7f7ffb9945e0: Backspace>], 'napari:activate_add_rectangle_mode': [<KeyBinding at 0x7f7ffb994700: R>], 'napari:activate_add_ellipse_mode': [<KeyBinding at 0x7f7ffb9947f0: E>], 'napari:activate_add_line_mode': [<KeyBinding at 0x7f7ffb994970: L>], 'napari:activate_add_path_mode': [<KeyBinding at 0x7f7ffb994a90: T>], 'napari:activate_add_polygon_mode': [<KeyBinding at 0x7f7ffb994bb0: P>], 'napari:activate_add_polygon_lasso_mode': [<KeyBinding at 0x7f7ffb994cd0: Shift+P>], 'napari:activate_direct_mode': [<KeyBinding at 0x7f7ffb994df0: 4>, <KeyBinding at 0x7f7ffb994f10: D>], 'napari:activate_select_mode': [<KeyBinding at 0x7f7ffb995030: 5>, <KeyBinding at 0x7f7ffb995120: S>], 'napari:activate_shapes_pan_zoom_mode': [<KeyBinding at 0x7f7ffb9952a0: 6>, <KeyBinding at 0x7f7ffb9953c0: Z>], 'napari:activate_shapes_transform_mode': [<KeyBinding at 0x7f7ffb9954e0: 7>], 'napari:activate_vertex_insert_mode': [<KeyBinding at 0x7f7ffb995600: 2>, <KeyBinding at 0x7f7ffb995720: I>], 'napari:activate_vertex_remove_mode': [<KeyBinding at 0x7f7ffb995840: 1>, <KeyBinding at 0x7f7ffb995930: X>], 'napari:copy_selected_shapes': [<KeyBinding at 0x7f7ffb995ab0: Ctrl+C>], 'napari:paste_shape': [<KeyBinding at 0x7f7ffb995bd0: Ctrl+V>], 'napari:move_shapes_selection_to_front': [<KeyBinding at 0x7f7ffb995cf0: F>], 'napari:move_shapes_selection_to_back': [<KeyBinding at 0x7f7ffb995e10: B>], 'napari:select_all_shapes': [<KeyBinding at 0x7f7ffb995f30: A>], 'napari:delete_selected_shapes': [<KeyBinding at 0x7f7ffb996050: 3>, <KeyBinding at 0x7f7ffb996170: Delete>, <KeyBinding at 0x7f7ffb996290: Backspace>], 'napari:finish_drawing_shape': [<KeyBinding at 0x7f7ffb9963b0: Escape>], 'napari:orient_plane_normal_along_x': [<KeyBinding at 0x7f7ffb9964d0: X>], 'napari:orient_plane_normal_along_y': [<KeyBinding at 0x7f7ffb9965f0: Y>], 'napari:orient_plane_normal_along_z': [<KeyBinding at 0x7f7ffb996710: Z>], 'napari:orient_plane_normal_along_view_direction': [<KeyBinding at 0x7f7ffb996830: O>], 'napari:activate_image_pan_zoom_mode': [<KeyBinding at 0x7f7ffb996950: 1>], 'napari:activate_image_transform_mode': [<KeyBinding at 0x7f7ffb996a40: 2>], 'napari:activate_vectors_pan_zoom_mode': [<KeyBinding at 0x7f7ffb996bc0: 1>], 'napari:activate_vectors_transform_mode': [<KeyBinding at 0x7f7ffb996ce0: 2>], 'napari:activate_tracks_pan_zoom_mode': [<KeyBinding at 0x7f7ffb996e00: 1>], 'napari:activate_tracks_transform_mode': [<KeyBinding at 0x7f7ffb996f20: 2>], 'napari:activate_surface_pan_zoom_mode': [<KeyBinding at 0x7f7ffb997040: 1>], 'napari:activate_surface_transform_mode': [<KeyBinding at 0x7f7ffb997160: 2>]}`.</small>
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
