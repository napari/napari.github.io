## Application menus
### Dependencies diagram (related `napari` modules)
```{mermaid}
graph LR
	accTitle: Dependencies between modules in the napari Application menus UI section
	accDescr: Diagram showing the dependencies between the modules involved in the definition of the napari Application menus UI section
	napari._qt(napari._qt)
	napari._qt --> napari._qt.qt_main_window
	click napari._qt "https://github.com/napari/napari/tree/main/napari/_qt/__init__.py" _blank
	napari._qt._qapp_model.injection._qprocessors(napari._qt._qapp_model.injection._qprocessors)
	napari._qt._qapp_model.injection._qprocessors --> napari._qt._qapp_model.injection._qproviders
	napari._qt._qapp_model.injection._qprocessors --> napari.viewer
	click napari._qt._qapp_model.injection._qprocessors "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/injection/_qprocessors.py" _blank
	napari._qt._qapp_model.injection._qproviders(napari._qt._qapp_model.injection._qproviders)
	napari._qt._qapp_model.injection._qproviders --> napari._qt.qt_main_window
	napari._qt._qapp_model.injection._qproviders --> napari._qt.qt_viewer
	napari._qt._qapp_model.injection._qproviders --> napari.viewer
	click napari._qt._qapp_model.injection._qproviders "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/injection/_qproviders.py" _blank
	napari._qt._qapp_model.qactions(napari._qt._qapp_model.qactions)
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.injection._qprocessors
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.injection._qproviders
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._debug
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._file
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._help
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._layerlist_context
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._layers_actions
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._plugins
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._view
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._window
	napari._qt._qapp_model.qactions --> napari._qt.qt_main_window
	napari._qt._qapp_model.qactions --> napari._qt.qt_viewer
	click napari._qt._qapp_model.qactions "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/__init__.py" _blank
	napari._qt._qapp_model.qactions._debug(napari._qt._qapp_model.qactions._debug)
	napari._qt._qapp_model.qactions._debug --> napari._qt.qt_viewer
	click napari._qt._qapp_model.qactions._debug "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/_debug.py" _blank
	napari._qt._qapp_model.qactions._file(napari._qt._qapp_model.qactions._file)
	napari._qt._qapp_model.qactions._file --> napari._qt.qt_main_window
	napari._qt._qapp_model.qactions._file --> napari._qt.qt_viewer
	click napari._qt._qapp_model.qactions._file "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/_file.py" _blank
	napari._qt._qapp_model.qactions._help(napari._qt._qapp_model.qactions._help)
	napari._qt._qapp_model.qactions._help --> napari._qt.dialogs.qt_about
	napari._qt._qapp_model.qactions._help --> napari._qt.qt_main_window
	napari._qt._qapp_model.qactions._help --> napari._qt.widgets.qt_logger
	click napari._qt._qapp_model.qactions._help "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/_help.py" _blank
	napari._qt._qapp_model.qactions._layerlist_context(napari._qt._qapp_model.qactions._layerlist_context)
	click napari._qt._qapp_model.qactions._layerlist_context "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/_layerlist_context.py" _blank
	napari._qt._qapp_model.qactions._layers_actions(napari._qt._qapp_model.qactions._layers_actions)
	click napari._qt._qapp_model.qactions._layers_actions "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/_layers_actions.py" _blank
	napari._qt._qapp_model.qactions._plugins(napari._qt._qapp_model.qactions._plugins)
	napari._qt._qapp_model.qactions._plugins --> napari._qt.dialogs.qt_plugin_report
	napari._qt._qapp_model.qactions._plugins --> napari._qt.qt_main_window
	click napari._qt._qapp_model.qactions._plugins "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/_plugins.py" _blank
	napari._qt._qapp_model.qactions._toggle_action(napari._qt._qapp_model.qactions._toggle_action)
	napari._qt._qapp_model.qactions._toggle_action --> napari._qt.qt_main_window
	click napari._qt._qapp_model.qactions._toggle_action "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/_toggle_action.py" _blank
	napari._qt._qapp_model.qactions._view(napari._qt._qapp_model.qactions._view)
	napari._qt._qapp_model.qactions._view --> napari._qt.qt_main_window
	napari._qt._qapp_model.qactions._view --> napari._qt.qt_viewer
	click napari._qt._qapp_model.qactions._view "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/_view.py" _blank
	napari._qt._qapp_model.qactions._window(napari._qt._qapp_model.qactions._window)
	napari._qt._qapp_model.qactions._window --> napari._qt._qapp_model.qactions._toggle_action
	click napari._qt._qapp_model.qactions._window "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/_window.py" _blank
	napari._qt.dialogs.confirm_close_dialog(napari._qt.dialogs.confirm_close_dialog)
	click napari._qt.dialogs.confirm_close_dialog "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/confirm_close_dialog.py" _blank
	napari._qt.dialogs.preferences_dialog(napari._qt.dialogs.preferences_dialog)
	click napari._qt.dialogs.preferences_dialog "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/preferences_dialog.py" _blank
	napari._qt.dialogs.qt_about(napari._qt.dialogs.qt_about)
	click napari._qt.dialogs.qt_about "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/qt_about.py" _blank
	napari._qt.dialogs.qt_modal(napari._qt.dialogs.qt_modal)
	click napari._qt.dialogs.qt_modal "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/qt_modal.py" _blank
	napari._qt.dialogs.qt_plugin_report(napari._qt.dialogs.qt_plugin_report)
	click napari._qt.dialogs.qt_plugin_report "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/qt_plugin_report.py" _blank
	napari._qt.dialogs.qt_reader_dialog(napari._qt.dialogs.qt_reader_dialog)
	click napari._qt.dialogs.qt_reader_dialog "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/qt_reader_dialog.py" _blank
	napari._qt.dialogs.screenshot_dialog(napari._qt.dialogs.screenshot_dialog)
	click napari._qt.dialogs.screenshot_dialog "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/screenshot_dialog.py" _blank
	napari._qt.qt_main_window(napari._qt.qt_main_window)
	napari._qt.qt_main_window --> napari._qt._qapp_model.qactions
	napari._qt.qt_main_window --> napari._qt._qapp_model.qactions._debug
	napari._qt.qt_main_window --> napari._qt.dialogs.confirm_close_dialog
	napari._qt.qt_main_window --> napari._qt.dialogs.preferences_dialog
	napari._qt.qt_main_window --> napari._qt.dialogs.screenshot_dialog
	napari._qt.qt_main_window --> napari._qt.qt_viewer
	napari._qt.qt_main_window --> napari._qt.widgets.qt_command_palette
	napari._qt.qt_main_window --> napari.viewer
	click napari._qt.qt_main_window "https://github.com/napari/napari/tree/main/napari/_qt/qt_main_window.py" _blank
	napari._qt.qt_viewer(napari._qt.qt_viewer)
	napari._qt.qt_viewer --> napari._qt.dialogs.qt_reader_dialog
	napari._qt.qt_viewer --> napari._qt.dialogs.screenshot_dialog
	napari._qt.qt_viewer --> napari._qt.widgets.qt_viewer_buttons
	click napari._qt.qt_viewer "https://github.com/napari/napari/tree/main/napari/_qt/qt_viewer.py" _blank
	napari._qt.qthreading(napari._qt.qthreading)
	napari._qt.qthreading --> napari._qt._qapp_model.injection._qprocessors
	napari._qt.qthreading --> napari.viewer
	click napari._qt.qthreading "https://github.com/napari/napari/tree/main/napari/_qt/qthreading.py" _blank
	napari._qt.widgets.qt_command_palette(napari._qt.widgets.qt_command_palette)
	napari._qt.widgets.qt_command_palette --> napari._qt.qt_main_window
	click napari._qt.widgets.qt_command_palette "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_command_palette.py" _blank
	napari._qt.widgets.qt_logger(napari._qt.widgets.qt_logger)
	napari._qt.widgets.qt_logger --> napari._qt.dialogs.qt_about
	click napari._qt.widgets.qt_logger "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_logger.py" _blank
	napari._qt.widgets.qt_viewer_buttons(napari._qt.widgets.qt_viewer_buttons)
	napari._qt.widgets.qt_viewer_buttons --> napari._qt.dialogs.qt_modal
	napari._qt.widgets.qt_viewer_buttons --> napari.viewer
	click napari._qt.widgets.qt_viewer_buttons "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_viewer_buttons.py" _blank
	napari.viewer(napari.viewer)
	napari.viewer --> napari._qt
	napari.viewer --> napari._qt.qt_main_window
	click napari.viewer "https://github.com/napari/napari/tree/main/napari/viewer.py" _blank
	subgraph module.napari[napari]
		 napari._qt
		 napari.viewer
	end
	class module.napari subgraphs
	subgraph module.napari._qt._qapp_model.injection[napari._qt._qapp_model.injection]
		 napari._qt._qapp_model.injection._qprocessors
		 napari._qt._qapp_model.injection._qproviders
	end
	class module.napari._qt._qapp_model.injection subgraphs
	subgraph module.napari._qt._qapp_model[napari._qt._qapp_model]
		 napari._qt._qapp_model.qactions
	end
	class module.napari._qt._qapp_model subgraphs
	subgraph module.napari._qt._qapp_model.qactions[napari._qt._qapp_model.qactions]
		 napari._qt._qapp_model.qactions._debug
		 napari._qt._qapp_model.qactions._file
		 napari._qt._qapp_model.qactions._help
		 napari._qt._qapp_model.qactions._layerlist_context
		 napari._qt._qapp_model.qactions._layers_actions
		 napari._qt._qapp_model.qactions._plugins
		 napari._qt._qapp_model.qactions._toggle_action
		 napari._qt._qapp_model.qactions._view
		 napari._qt._qapp_model.qactions._window
	end
	class module.napari._qt._qapp_model.qactions subgraphs
	subgraph module.napari._qt.dialogs[napari._qt.dialogs]
		 napari._qt.dialogs.confirm_close_dialog
		 napari._qt.dialogs.preferences_dialog
		 napari._qt.dialogs.qt_about
		 napari._qt.dialogs.qt_modal
		 napari._qt.dialogs.qt_plugin_report
		 napari._qt.dialogs.qt_reader_dialog
		 napari._qt.dialogs.screenshot_dialog
	end
	class module.napari._qt.dialogs subgraphs
	subgraph module.napari._qt[napari._qt]
		 napari._qt.qt_main_window
		 napari._qt.qt_viewer
		 napari._qt.qthreading
	end
	class module.napari._qt subgraphs
	subgraph module.napari._qt.widgets[napari._qt.widgets]
		 napari._qt.widgets.qt_command_palette
		 napari._qt.widgets.qt_logger
		 napari._qt.widgets.qt_viewer_buttons
	end
	class module.napari._qt.widgets subgraphs
	classDef subgraphs fill:white,strock:black,color:black;	classDef default fill:#00c3ff,color:black;
	linkStyle default stroke:#00c3ff
	classDef external fill:#ffa600,color:black;
```
### Source code directory layout (related to modules inside `napari`)
```
napari/
├─viewer.py
└─_qt/
  ├─qt_viewer.py
  ├─qthreading.py
  ├─widgets/
  │ ├─qt_command_palette.py
  │ ├─qt_viewer_buttons.py
  │ └─qt_logger.py
  ├─__init__.py
  ├─qt_main_window.py
  ├─dialogs/
  │ ├─confirm_close_dialog.py
  │ ├─qt_reader_dialog.py
  │ ├─screenshot_dialog.py
  │ ├─qt_plugin_report.py
  │ ├─qt_about.py
  │ ├─preferences_dialog.py
  │ └─qt_modal.py
  └─_qapp_model/
    ├─injection/
    │ ├─_qprocessors.py
    │ └─_qproviders.py
    └─qactions/
      ├─_view.py
      ├─_toggle_action.py
      ├─_window.py
      ├─_file.py
      ├─_help.py
      ├─_layers_actions.py
      ├─__init__.py
      ├─_debug.py
      ├─_layerlist_context.py
      └─_plugins.py
```
