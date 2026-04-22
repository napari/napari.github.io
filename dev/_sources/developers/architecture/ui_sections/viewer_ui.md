## Viewer
### Dependencies diagram (related `napari` modules)
```{mermaid}
graph LR
	accTitle: Dependencies between modules in the napari Viewer UI section
	accDescr: Diagram showing the dependencies between the modules involved in the definition of the napari Viewer UI section
	napari._qt._qapp_model.injection(napari._qt._qapp_model.injection)
	click napari._qt._qapp_model.injection "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/injection/__init__.py" _blank
	napari._qt._qapp_model.injection._qprocessors(napari._qt._qapp_model.injection._qprocessors)
	napari._qt._qapp_model.injection._qprocessors --> napari._qt._qapp_model.injection._qproviders
	napari._qt._qapp_model.injection._qprocessors --> napari.layers
	click napari._qt._qapp_model.injection._qprocessors "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/injection/_qprocessors.py" _blank
	napari._qt._qapp_model.injection._qproviders(napari._qt._qapp_model.injection._qproviders)
	napari._qt._qapp_model.injection._qproviders --> napari._qt.qt_main_window
	napari._qt._qapp_model.injection._qproviders --> napari._qt.qt_viewer
	napari._qt._qapp_model.injection._qproviders --> napari.layers
	click napari._qt._qapp_model.injection._qproviders "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/injection/_qproviders.py" _blank
	napari._qt._qapp_model.qactions(napari._qt._qapp_model.qactions)
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.injection
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.injection._qprocessors
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.injection._qproviders
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._debug
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._layerlist_context
	napari._qt._qapp_model.qactions --> napari._qt.qt_main_window
	napari._qt._qapp_model.qactions --> napari._qt.qt_viewer
	click napari._qt._qapp_model.qactions "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/__init__.py" _blank
	napari._qt._qapp_model.qactions._debug(napari._qt._qapp_model.qactions._debug)
	napari._qt._qapp_model.qactions._debug --> napari._qt.qt_viewer
	click napari._qt._qapp_model.qactions._debug "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/_debug.py" _blank
	napari._qt._qapp_model.qactions._layerlist_context(napari._qt._qapp_model.qactions._layerlist_context)
	napari._qt._qapp_model.qactions._layerlist_context --> napari.layers
	click napari._qt._qapp_model.qactions._layerlist_context "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/_layerlist_context.py" _blank
	napari._qt.containers(napari._qt.containers)
	click napari._qt.containers "https://github.com/napari/napari/tree/main/napari/_qt/containers/__init__.py" _blank
	napari._qt.dialogs(napari._qt.dialogs)
	click napari._qt.dialogs "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/__init__.py" _blank
	napari._qt.layer_controls(napari._qt.layer_controls)
	click napari._qt.layer_controls "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/__init__.py" _blank
	napari._qt.qt_main_window(napari._qt.qt_main_window)
	napari._qt.qt_main_window --> napari._qt._qapp_model.qactions
	napari._qt.qt_main_window --> napari._qt._qapp_model.qactions._debug
	napari._qt.qt_main_window --> napari._qt.dialogs
	napari._qt.qt_main_window --> napari._qt.qt_viewer
	napari._qt.qt_main_window --> napari._qt.threads
	napari._qt.qt_main_window --> napari._qt.threads.status_checker
	napari._qt.qt_main_window --> napari._qt.utils
	napari._qt.qt_main_window --> napari._qt.widgets.qt_command_palette
	napari._qt.qt_main_window --> napari._qt.widgets.qt_viewer_dock_widget
	napari._qt.qt_main_window --> napari._qt.widgets.qt_viewer_status_bar
	click napari._qt.qt_main_window "https://github.com/napari/napari/tree/main/napari/_qt/qt_main_window.py" _blank
	napari._qt.qt_viewer(napari._qt.qt_viewer)
	napari._qt.qt_viewer --> napari._qt.containers
	napari._qt.qt_viewer --> napari._qt.dialogs
	napari._qt.qt_viewer --> napari._qt.layer_controls
	napari._qt.qt_viewer --> napari._qt.utils
	napari._qt.qt_viewer --> napari._qt.widgets.qt_dims
	napari._qt.qt_viewer --> napari._qt.widgets.qt_viewer_buttons
	napari._qt.qt_viewer --> napari._qt.widgets.qt_viewer_dock_widget
	napari._qt.qt_viewer --> napari.components.camera
	napari._qt.qt_viewer --> napari.components.layerlist
	napari._qt.qt_viewer --> napari.layers
	click napari._qt.qt_viewer "https://github.com/napari/napari/tree/main/napari/_qt/qt_viewer.py" _blank
	napari._qt.qthreading(napari._qt.qthreading)
	napari._qt.qthreading --> napari._qt._qapp_model.injection
	napari._qt.qthreading --> napari._qt._qapp_model.injection._qprocessors
	napari._qt.qthreading --> napari.layers
	click napari._qt.qthreading "https://github.com/napari/napari/tree/main/napari/_qt/qthreading.py" _blank
	napari._qt.threads(napari._qt.threads)
	click napari._qt.threads "https://github.com/napari/napari/tree/main/napari/_qt/threads/__init__.py" _blank
	napari._qt.threads.status_checker(napari._qt.threads.status_checker)
	click napari._qt.threads.status_checker "https://github.com/napari/napari/tree/main/napari/_qt/threads/status_checker.py" _blank
	napari._qt.utils(napari._qt.utils)
	napari._qt.utils --> napari._qt.qt_main_window
	click napari._qt.utils "https://github.com/napari/napari/tree/main/napari/_qt/utils.py" _blank
	napari._qt.widgets.qt_command_palette(napari._qt.widgets.qt_command_palette)
	napari._qt.widgets.qt_command_palette --> napari._qt.qt_main_window
	click napari._qt.widgets.qt_command_palette "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_command_palette.py" _blank
	napari._qt.widgets.qt_dims(napari._qt.widgets.qt_dims)
	napari._qt.widgets.qt_dims --> napari._qt.widgets.qt_dims_slider
	napari._qt.widgets.qt_dims --> napari.components.dims
	click napari._qt.widgets.qt_dims "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_dims.py" _blank
	napari._qt.widgets.qt_dims_slider(napari._qt.widgets.qt_dims_slider)
	napari._qt.widgets.qt_dims_slider --> napari._qt.dialogs
	napari._qt.widgets.qt_dims_slider --> napari._qt.utils
	napari._qt.widgets.qt_dims_slider --> napari._qt.widgets.qt_mirrored_sliders_popup
	napari._qt.widgets.qt_dims_slider --> napari._qt.widgets.qt_scrollbar
	click napari._qt.widgets.qt_dims_slider "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_dims_slider.py" _blank
	napari._qt.widgets.qt_dims_sorter(napari._qt.widgets.qt_dims_sorter)
	napari._qt.widgets.qt_dims_sorter --> napari._qt.containers
	napari._qt.widgets.qt_dims_sorter --> napari._qt.widgets.qt_tooltip
	click napari._qt.widgets.qt_dims_sorter "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_dims_sorter.py" _blank
	napari._qt.widgets.qt_mirrored_sliders_popup(napari._qt.widgets.qt_mirrored_sliders_popup)
	napari._qt.widgets.qt_mirrored_sliders_popup --> napari._qt.dialogs
	click napari._qt.widgets.qt_mirrored_sliders_popup "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_mirrored_sliders_popup.py" _blank
	napari._qt.widgets.qt_scrollbar(napari._qt.widgets.qt_scrollbar)
	click napari._qt.widgets.qt_scrollbar "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_scrollbar.py" _blank
	napari._qt.widgets.qt_spinbox(napari._qt.widgets.qt_spinbox)
	click napari._qt.widgets.qt_spinbox "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_spinbox.py" _blank
	napari._qt.widgets.qt_tooltip(napari._qt.widgets.qt_tooltip)
	click napari._qt.widgets.qt_tooltip "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_tooltip.py" _blank
	napari._qt.widgets.qt_viewer_buttons(napari._qt.widgets.qt_viewer_buttons)
	napari._qt.widgets.qt_viewer_buttons --> napari._qt.dialogs
	napari._qt.widgets.qt_viewer_buttons --> napari._qt.widgets.qt_dims_sorter
	napari._qt.widgets.qt_viewer_buttons --> napari._qt.widgets.qt_spinbox
	napari._qt.widgets.qt_viewer_buttons --> napari._qt.widgets.qt_tooltip
	napari._qt.widgets.qt_viewer_buttons --> napari.layers
	click napari._qt.widgets.qt_viewer_buttons "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_viewer_buttons.py" _blank
	napari._qt.widgets.qt_viewer_dock_widget(napari._qt.widgets.qt_viewer_dock_widget)
	napari._qt.widgets.qt_viewer_dock_widget --> napari._qt.qt_viewer
	napari._qt.widgets.qt_viewer_dock_widget --> napari._qt.utils
	click napari._qt.widgets.qt_viewer_dock_widget "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_viewer_dock_widget.py" _blank
	napari._qt.widgets.qt_viewer_status_bar(napari._qt.widgets.qt_viewer_status_bar)
	napari._qt.widgets.qt_viewer_status_bar --> napari._qt.dialogs
	napari._qt.widgets.qt_viewer_status_bar --> napari._qt.qt_main_window
	click napari._qt.widgets.qt_viewer_status_bar "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_viewer_status_bar.py" _blank
	napari.components._layer_slicer(napari.components._layer_slicer)
	napari.components._layer_slicer --> napari.layers
	click napari.components._layer_slicer "https://github.com/napari/napari/tree/main/napari/components/_layer_slicer.py" _blank
	napari.components._viewer_constants(napari.components._viewer_constants)
	click napari.components._viewer_constants "https://github.com/napari/napari/tree/main/napari/components/_viewer_constants.py" _blank
	napari.components._viewer_key_bindings(napari.components._viewer_key_bindings)
	napari.components._viewer_key_bindings --> napari._qt.qt_viewer
	napari.components._viewer_key_bindings --> napari.components.viewer_model
	click napari.components._viewer_key_bindings "https://github.com/napari/napari/tree/main/napari/components/_viewer_key_bindings.py" _blank
	napari.components._viewer_mouse_bindings(napari.components._viewer_mouse_bindings)
	click napari.components._viewer_mouse_bindings "https://github.com/napari/napari/tree/main/napari/components/_viewer_mouse_bindings.py" _blank
	napari.components.camera(napari.components.camera)
	click napari.components.camera "https://github.com/napari/napari/tree/main/napari/components/camera.py" _blank
	napari.components.cursor(napari.components.cursor)
	napari.components.cursor --> napari.components._viewer_constants
	click napari.components.cursor "https://github.com/napari/napari/tree/main/napari/components/cursor.py" _blank
	napari.components.dims(napari.components.dims)
	click napari.components.dims "https://github.com/napari/napari/tree/main/napari/components/dims.py" _blank
	napari.components.grid(napari.components.grid)
	click napari.components.grid "https://github.com/napari/napari/tree/main/napari/components/grid.py" _blank
	napari.components.layerlist(napari.components.layerlist)
	napari.components.layerlist --> napari.components.dims
	napari.components.layerlist --> napari.layers
	click napari.components.layerlist "https://github.com/napari/napari/tree/main/napari/components/layerlist.py" _blank
	napari.components.overlays(napari.components.overlays)
	napari.components.overlays --> napari.components.overlays.axes
	napari.components.overlays --> napari.components.overlays.base
	napari.components.overlays --> napari.components.overlays.bounding_box
	napari.components.overlays --> napari.components.overlays.brush_circle
	napari.components.overlays --> napari.components.overlays.colorbar
	napari.components.overlays --> napari.components.overlays.interaction_box
	napari.components.overlays --> napari.components.overlays.labels_polygon
	napari.components.overlays --> napari.components.overlays.scale_bar
	napari.components.overlays --> napari.components.overlays.text
	napari.components.overlays --> napari.components.overlays.welcome
	napari.components.overlays --> napari.components.overlays.zoom
	click napari.components.overlays "https://github.com/napari/napari/tree/main/napari/components/overlays/__init__.py" _blank
	napari.components.overlays.axes(napari.components.overlays.axes)
	napari.components.overlays.axes --> napari.components.overlays.base
	click napari.components.overlays.axes "https://github.com/napari/napari/tree/main/napari/components/overlays/axes.py" _blank
	napari.components.overlays.base(napari.components.overlays.base)
	napari.components.overlays.base --> napari.components._viewer_constants
	napari.components.overlays.base --> napari.layers
	click napari.components.overlays.base "https://github.com/napari/napari/tree/main/napari/components/overlays/base.py" _blank
	napari.components.overlays.bounding_box(napari.components.overlays.bounding_box)
	napari.components.overlays.bounding_box --> napari.components.overlays.base
	click napari.components.overlays.bounding_box "https://github.com/napari/napari/tree/main/napari/components/overlays/bounding_box.py" _blank
	napari.components.overlays.brush_circle(napari.components.overlays.brush_circle)
	napari.components.overlays.brush_circle --> napari.components.overlays.base
	click napari.components.overlays.brush_circle "https://github.com/napari/napari/tree/main/napari/components/overlays/brush_circle.py" _blank
	napari.components.overlays.colorbar(napari.components.overlays.colorbar)
	napari.components.overlays.colorbar --> napari.components._viewer_constants
	napari.components.overlays.colorbar --> napari.components.overlays.base
	click napari.components.overlays.colorbar "https://github.com/napari/napari/tree/main/napari/components/overlays/colorbar.py" _blank
	napari.components.overlays.interaction_box(napari.components.overlays.interaction_box)
	napari.components.overlays.interaction_box --> napari.components.overlays.base
	napari.components.overlays.interaction_box --> napari.layers
	click napari.components.overlays.interaction_box "https://github.com/napari/napari/tree/main/napari/components/overlays/interaction_box.py" _blank
	napari.components.overlays.labels_polygon(napari.components.overlays.labels_polygon)
	napari.components.overlays.labels_polygon --> napari.components.overlays.base
	napari.components.overlays.labels_polygon --> napari.layers
	click napari.components.overlays.labels_polygon "https://github.com/napari/napari/tree/main/napari/components/overlays/labels_polygon.py" _blank
	napari.components.overlays.scale_bar(napari.components.overlays.scale_bar)
	napari.components.overlays.scale_bar --> napari.components.overlays.base
	click napari.components.overlays.scale_bar "https://github.com/napari/napari/tree/main/napari/components/overlays/scale_bar.py" _blank
	napari.components.overlays.text(napari.components.overlays.text)
	napari.components.overlays.text --> napari.components._viewer_constants
	napari.components.overlays.text --> napari.components.overlays.base
	click napari.components.overlays.text "https://github.com/napari/napari/tree/main/napari/components/overlays/text.py" _blank
	napari.components.overlays.welcome(napari.components.overlays.welcome)
	napari.components.overlays.welcome --> napari.components.overlays.base
	click napari.components.overlays.welcome "https://github.com/napari/napari/tree/main/napari/components/overlays/welcome.py" _blank
	napari.components.overlays.zoom(napari.components.overlays.zoom)
	napari.components.overlays.zoom --> napari.components.overlays.base
	click napari.components.overlays.zoom "https://github.com/napari/napari/tree/main/napari/components/overlays/zoom.py" _blank
	napari.components.tooltip(napari.components.tooltip)
	click napari.components.tooltip "https://github.com/napari/napari/tree/main/napari/components/tooltip.py" _blank
	napari.components.viewer_model(napari.components.viewer_model)
	napari.components.viewer_model --> napari.components._layer_slicer
	napari.components.viewer_model --> napari.components._viewer_mouse_bindings
	napari.components.viewer_model --> napari.components.camera
	napari.components.viewer_model --> napari.components.cursor
	napari.components.viewer_model --> napari.components.dims
	napari.components.viewer_model --> napari.components.grid
	napari.components.viewer_model --> napari.components.layerlist
	napari.components.viewer_model --> napari.components.overlays
	napari.components.viewer_model --> napari.components.tooltip
	napari.components.viewer_model --> napari.layers
	click napari.components.viewer_model "https://github.com/napari/napari/tree/main/napari/components/viewer_model.py" _blank
	napari.layers(napari.layers)
	click napari.layers "https://github.com/napari/napari/tree/main/napari/layers/__init__.py" _blank
	subgraph module.napari._qt._qapp_model[napari._qt._qapp_model]
		 napari._qt._qapp_model.injection
		 napari._qt._qapp_model.qactions
	end
	class module.napari._qt._qapp_model subgraphs
	subgraph module.napari._qt._qapp_model.injection[napari._qt._qapp_model.injection]
		 napari._qt._qapp_model.injection._qprocessors
		 napari._qt._qapp_model.injection._qproviders
	end
	class module.napari._qt._qapp_model.injection subgraphs
	subgraph module.napari._qt._qapp_model.qactions[napari._qt._qapp_model.qactions]
		 napari._qt._qapp_model.qactions._debug
		 napari._qt._qapp_model.qactions._layerlist_context
	end
	class module.napari._qt._qapp_model.qactions subgraphs
	subgraph module.napari._qt[napari._qt]
		 napari._qt.containers
		 napari._qt.dialogs
		 napari._qt.layer_controls
		 napari._qt.qt_main_window
		 napari._qt.qt_viewer
		 napari._qt.qthreading
		 napari._qt.threads
		 napari._qt.utils
	end
	class module.napari._qt subgraphs
	subgraph module.napari._qt.threads[napari._qt.threads]
		 napari._qt.threads.status_checker
	end
	class module.napari._qt.threads subgraphs
	subgraph module.napari._qt.widgets[napari._qt.widgets]
		 napari._qt.widgets.qt_command_palette
		 napari._qt.widgets.qt_dims
		 napari._qt.widgets.qt_dims_slider
		 napari._qt.widgets.qt_dims_sorter
		 napari._qt.widgets.qt_mirrored_sliders_popup
		 napari._qt.widgets.qt_scrollbar
		 napari._qt.widgets.qt_spinbox
		 napari._qt.widgets.qt_tooltip
		 napari._qt.widgets.qt_viewer_buttons
		 napari._qt.widgets.qt_viewer_dock_widget
		 napari._qt.widgets.qt_viewer_status_bar
	end
	class module.napari._qt.widgets subgraphs
	subgraph module.napari.components[napari.components]
		 napari.components._layer_slicer
		 napari.components._viewer_constants
		 napari.components._viewer_key_bindings
		 napari.components._viewer_mouse_bindings
		 napari.components.camera
		 napari.components.cursor
		 napari.components.dims
		 napari.components.grid
		 napari.components.layerlist
		 napari.components.overlays
		 napari.components.tooltip
		 napari.components.viewer_model
	end
	class module.napari.components subgraphs
	subgraph module.napari.components.overlays[napari.components.overlays]
		 napari.components.overlays.axes
		 napari.components.overlays.base
		 napari.components.overlays.bounding_box
		 napari.components.overlays.brush_circle
		 napari.components.overlays.colorbar
		 napari.components.overlays.interaction_box
		 napari.components.overlays.labels_polygon
		 napari.components.overlays.scale_bar
		 napari.components.overlays.text
		 napari.components.overlays.welcome
		 napari.components.overlays.zoom
	end
	class module.napari.components.overlays subgraphs
	subgraph module.napari[napari]
		 napari.layers
	end
	class module.napari subgraphs
	classDef subgraphs fill:white,strock:black,color:black;	classDef default fill:#00c3ff,color:black;
	linkStyle default stroke:#00c3ff
	classDef external fill:#ffa600,color:black;
```
### Source code directory layout (related to modules inside `napari`)
```
napari/
├─components/
│ ├─_viewer_constants.py
│ ├─dims.py
│ ├─cursor.py
│ ├─viewer_model.py
│ ├─tooltip.py
│ ├─layerlist.py
│ ├─overlays/
│ │ ├─bounding_box.py
│ │ ├─labels_polygon.py
│ │ ├─zoom.py
│ │ ├─text.py
│ │ ├─scale_bar.py
│ │ ├─__init__.py
│ │ ├─colorbar.py
│ │ ├─base.py
│ │ ├─brush_circle.py
│ │ ├─interaction_box.py
│ │ ├─axes.py
│ │ └─welcome.py
│ ├─_layer_slicer.py
│ ├─_viewer_key_bindings.py
│ ├─_viewer_mouse_bindings.py
│ ├─grid.py
│ └─camera.py
├─layers/
│ └─__init__.py
└─_qt/
  ├─qt_viewer.py
  ├─dialogs/
  │ └─__init__.py
  ├─threads/
  │ ├─status_checker.py
  │ └─__init__.py
  ├─qthreading.py
  ├─layer_controls/
  │ └─__init__.py
  ├─containers/
  │ └─__init__.py
  ├─_qapp_model/
  │ ├─injection/
  │ │ ├─_qproviders.py
  │ │ ├─__init__.py
  │ │ └─_qprocessors.py
  │ └─qactions/
  │   ├─_layerlist_context.py
  │   ├─_debug.py
  │   └─__init__.py
  ├─qt_main_window.py
  ├─widgets/
  │ ├─qt_dims.py
  │ ├─qt_dims_slider.py
  │ ├─qt_viewer_status_bar.py
  │ ├─qt_viewer_dock_widget.py
  │ ├─qt_viewer_buttons.py
  │ ├─qt_scrollbar.py
  │ ├─qt_mirrored_sliders_popup.py
  │ ├─qt_dims_sorter.py
  │ ├─qt_command_palette.py
  │ ├─qt_spinbox.py
  │ └─qt_tooltip.py
  └─utils.py
```
