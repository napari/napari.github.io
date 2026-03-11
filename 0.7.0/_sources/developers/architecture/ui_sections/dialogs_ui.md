## Dialogs
### Dependencies diagram (related `napari` modules)
```{mermaid}
graph LR
	accTitle: Dependencies between modules in the napari Dialogs UI section
	accDescr: Diagram showing the dependencies between the modules involved in the definition of the napari Dialogs UI section
	napari._qt._qapp_model._menus(napari._qt._qapp_model._menus)
	click napari._qt._qapp_model._menus "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/_menus.py" _blank
	napari._qt._qapp_model.injection._qprocessors(napari._qt._qapp_model.injection._qprocessors)
	napari._qt._qapp_model.injection._qprocessors --> napari._qt._qapp_model.injection._qproviders
	click napari._qt._qapp_model.injection._qprocessors "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/injection/_qprocessors.py" _blank
	napari._qt._qapp_model.injection._qproviders(napari._qt._qapp_model.injection._qproviders)
	napari._qt._qapp_model.injection._qproviders --> napari._qt.qt_main_window
	napari._qt._qapp_model.injection._qproviders --> napari._qt.qt_viewer
	click napari._qt._qapp_model.injection._qproviders "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/injection/_qproviders.py" _blank
	napari._qt._qapp_model.qactions(napari._qt._qapp_model.qactions)
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.injection._qprocessors
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.injection._qproviders
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._debug
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._file
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._help
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._plugins
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
	napari._qt._qapp_model.qactions._plugins(napari._qt._qapp_model.qactions._plugins)
	napari._qt._qapp_model.qactions._plugins --> napari._qt.qt_main_window
	click napari._qt._qapp_model.qactions._plugins "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/_plugins.py" _blank
	napari._qt._qplugins._qnpe2(napari._qt._qplugins._qnpe2)
	napari._qt._qplugins._qnpe2 --> napari._qt._qapp_model.injection._qproviders
	napari._qt._qplugins._qnpe2 --> napari._qt.dialogs.qt_reader_dialog
	click napari._qt._qplugins._qnpe2 "https://github.com/napari/napari/tree/main/napari/_qt/_qplugins/_qnpe2.py" _blank
	napari._qt.dialogs.confirm_close_dialog(napari._qt.dialogs.confirm_close_dialog)
	click napari._qt.dialogs.confirm_close_dialog "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/confirm_close_dialog.py" _blank
	napari._qt.dialogs.preferences_dialog(napari._qt.dialogs.preferences_dialog)
	napari._qt.dialogs.preferences_dialog --> napari._vendor.qt_json_builder
	napari._qt.dialogs.preferences_dialog --> napari._vendor.qt_json_builder.qt_jsonschema_form
	click napari._qt.dialogs.preferences_dialog "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/preferences_dialog.py" _blank
	napari._qt.dialogs.qt_about(napari._qt.dialogs.qt_about)
	click napari._qt.dialogs.qt_about "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/qt_about.py" _blank
	napari._qt.dialogs.qt_activity_dialog(napari._qt.dialogs.qt_activity_dialog)
	napari._qt.dialogs.qt_activity_dialog --> napari._qt.widgets.qt_progress_bar
	click napari._qt.dialogs.qt_activity_dialog "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/qt_activity_dialog.py" _blank
	napari._qt.dialogs.qt_modal(napari._qt.dialogs.qt_modal)
	click napari._qt.dialogs.qt_modal "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/qt_modal.py" _blank
	napari._qt.dialogs.qt_notification(napari._qt.dialogs.qt_notification)
	napari._qt.dialogs.qt_notification --> napari._qt.qt_main_window
	napari._qt.dialogs.qt_notification --> napari._qt.utils
	click napari._qt.dialogs.qt_notification "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/qt_notification.py" _blank
	napari._qt.dialogs.qt_reader_dialog(napari._qt.dialogs.qt_reader_dialog)
	click napari._qt.dialogs.qt_reader_dialog "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/qt_reader_dialog.py" _blank
	napari._qt.dialogs.screenshot_dialog(napari._qt.dialogs.screenshot_dialog)
	click napari._qt.dialogs.screenshot_dialog "https://github.com/napari/napari/tree/main/napari/_qt/dialogs/screenshot_dialog.py" _blank
	napari._qt.qt_main_window(napari._qt.qt_main_window)
	napari._qt.qt_main_window --> napari._qt._qapp_model.qactions
	napari._qt.qt_main_window --> napari._qt._qapp_model.qactions._debug
	napari._qt.qt_main_window --> napari._qt.dialogs.confirm_close_dialog
	napari._qt.qt_main_window --> napari._qt.dialogs.preferences_dialog
	napari._qt.qt_main_window --> napari._qt.dialogs.qt_activity_dialog
	napari._qt.qt_main_window --> napari._qt.dialogs.qt_notification
	napari._qt.qt_main_window --> napari._qt.dialogs.screenshot_dialog
	napari._qt.qt_main_window --> napari._qt.qt_viewer
	napari._qt.qt_main_window --> napari._qt.utils
	napari._qt.qt_main_window --> napari._qt.widgets.qt_command_palette
	napari._qt.qt_main_window --> napari._qt.widgets.qt_viewer_status_bar
	click napari._qt.qt_main_window "https://github.com/napari/napari/tree/main/napari/_qt/qt_main_window.py" _blank
	napari._qt.qt_viewer(napari._qt.qt_viewer)
	napari._qt.qt_viewer --> napari._qt.dialogs.qt_reader_dialog
	napari._qt.qt_viewer --> napari._qt.dialogs.screenshot_dialog
	napari._qt.qt_viewer --> napari._qt.utils
	napari._qt.qt_viewer --> napari._qt.widgets.qt_dims
	click napari._qt.qt_viewer "https://github.com/napari/napari/tree/main/napari/_qt/qt_viewer.py" _blank
	napari._qt.utils(napari._qt.utils)
	napari._qt.utils --> napari._qt.qt_main_window
	click napari._qt.utils "https://github.com/napari/napari/tree/main/napari/_qt/utils.py" _blank
	napari._qt.widgets.qt_color_swatch(napari._qt.widgets.qt_color_swatch)
	napari._qt.widgets.qt_color_swatch --> napari._qt.dialogs.qt_modal
	click napari._qt.widgets.qt_color_swatch "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_color_swatch.py" _blank
	napari._qt.widgets.qt_command_palette(napari._qt.widgets.qt_command_palette)
	napari._qt.widgets.qt_command_palette --> napari._qt.qt_main_window
	click napari._qt.widgets.qt_command_palette "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_command_palette.py" _blank
	napari._qt.widgets.qt_dims(napari._qt.widgets.qt_dims)
	napari._qt.widgets.qt_dims --> napari._qt.widgets.qt_dims_slider
	click napari._qt.widgets.qt_dims "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_dims.py" _blank
	napari._qt.widgets.qt_dims_slider(napari._qt.widgets.qt_dims_slider)
	napari._qt.widgets.qt_dims_slider --> napari._qt.dialogs.qt_modal
	napari._qt.widgets.qt_dims_slider --> napari._qt.utils
	napari._qt.widgets.qt_dims_slider --> napari._qt.widgets.qt_scrollbar
	click napari._qt.widgets.qt_dims_slider "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_dims_slider.py" _blank
	napari._qt.widgets.qt_dims_sorter(napari._qt.widgets.qt_dims_sorter)
	napari._qt.widgets.qt_dims_sorter --> napari._qt.widgets.qt_tooltip
	click napari._qt.widgets.qt_dims_sorter "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_dims_sorter.py" _blank
	napari._qt.widgets.qt_extension2reader(napari._qt.widgets.qt_extension2reader)
	click napari._qt.widgets.qt_extension2reader "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_extension2reader.py" _blank
	napari._qt.widgets.qt_font_size(napari._qt.widgets.qt_font_size)
	napari._qt.widgets.qt_font_size --> napari._qt.widgets.qt_spinbox
	click napari._qt.widgets.qt_font_size "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_font_size.py" _blank
	napari._qt.widgets.qt_highlight_preview(napari._qt.widgets.qt_highlight_preview)
	napari._qt.widgets.qt_highlight_preview --> napari._qt.widgets.qt_color_swatch
	click napari._qt.widgets.qt_highlight_preview "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_highlight_preview.py" _blank
	napari._qt.widgets.qt_logger(napari._qt.widgets.qt_logger)
	napari._qt.widgets.qt_logger --> napari._qt.dialogs.qt_about
	click napari._qt.widgets.qt_logger "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_logger.py" _blank
	napari._qt.widgets.qt_progress_bar(napari._qt.widgets.qt_progress_bar)
	click napari._qt.widgets.qt_progress_bar "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_progress_bar.py" _blank
	napari._qt.widgets.qt_scrollbar(napari._qt.widgets.qt_scrollbar)
	click napari._qt.widgets.qt_scrollbar "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_scrollbar.py" _blank
	napari._qt.widgets.qt_spinbox(napari._qt.widgets.qt_spinbox)
	click napari._qt.widgets.qt_spinbox "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_spinbox.py" _blank
	napari._qt.widgets.qt_tooltip(napari._qt.widgets.qt_tooltip)
	click napari._qt.widgets.qt_tooltip "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_tooltip.py" _blank
	napari._qt.widgets.qt_viewer_status_bar(napari._qt.widgets.qt_viewer_status_bar)
	napari._qt.widgets.qt_viewer_status_bar --> napari._qt.dialogs.qt_activity_dialog
	napari._qt.widgets.qt_viewer_status_bar --> napari._qt.qt_main_window
	click napari._qt.widgets.qt_viewer_status_bar "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_viewer_status_bar.py" _blank
	napari._vendor.qt_json_builder(napari._vendor.qt_json_builder)
	click napari._vendor.qt_json_builder "https://github.com/napari/napari/tree/main/napari/_vendor/qt_json_builder/__init__.py" _blank
	napari._vendor.qt_json_builder.qt_jsonschema_form(napari._vendor.qt_json_builder.qt_jsonschema_form)
	napari._vendor.qt_json_builder.qt_jsonschema_form --> napari._vendor.qt_json_builder.qt_jsonschema_form.form
	click napari._vendor.qt_json_builder.qt_jsonschema_form "https://github.com/napari/napari/tree/main/napari/_vendor/qt_json_builder/qt_jsonschema_form/__init__.py" _blank
	napari._vendor.qt_json_builder.qt_jsonschema_form.defaults(napari._vendor.qt_json_builder.qt_jsonschema_form.defaults)
	click napari._vendor.qt_json_builder.qt_jsonschema_form.defaults "https://github.com/napari/napari/tree/main/napari/_vendor/qt_json_builder/qt_jsonschema_form/defaults.py" _blank
	napari._vendor.qt_json_builder.qt_jsonschema_form.form(napari._vendor.qt_json_builder.qt_jsonschema_form.form)
	napari._vendor.qt_json_builder.qt_jsonschema_form.form --> napari._vendor.qt_json_builder.qt_jsonschema_form.defaults
	napari._vendor.qt_json_builder.qt_jsonschema_form.form --> napari._vendor.qt_json_builder.qt_jsonschema_form.widgets
	click napari._vendor.qt_json_builder.qt_jsonschema_form.form "https://github.com/napari/napari/tree/main/napari/_vendor/qt_json_builder/qt_jsonschema_form/form.py" _blank
	napari._vendor.qt_json_builder.qt_jsonschema_form.signal(napari._vendor.qt_json_builder.qt_jsonschema_form.signal)
	click napari._vendor.qt_json_builder.qt_jsonschema_form.signal "https://github.com/napari/napari/tree/main/napari/_vendor/qt_json_builder/qt_jsonschema_form/signal.py" _blank
	napari._vendor.qt_json_builder.qt_jsonschema_form.utils(napari._vendor.qt_json_builder.qt_jsonschema_form.utils)
	click napari._vendor.qt_json_builder.qt_jsonschema_form.utils "https://github.com/napari/napari/tree/main/napari/_vendor/qt_json_builder/qt_jsonschema_form/utils.py" _blank
	napari._vendor.qt_json_builder.qt_jsonschema_form.widgets(napari._vendor.qt_json_builder.qt_jsonschema_form.widgets)
	napari._vendor.qt_json_builder.qt_jsonschema_form.widgets --> napari._qt.widgets.qt_extension2reader
	napari._vendor.qt_json_builder.qt_jsonschema_form.widgets --> napari._qt.widgets.qt_font_size
	napari._vendor.qt_json_builder.qt_jsonschema_form.widgets --> napari._qt.widgets.qt_highlight_preview
	napari._vendor.qt_json_builder.qt_jsonschema_form.widgets --> napari._qt.widgets.qt_spinbox
	napari._vendor.qt_json_builder.qt_jsonschema_form.widgets --> napari._vendor.qt_json_builder.qt_jsonschema_form.form
	napari._vendor.qt_json_builder.qt_jsonschema_form.widgets --> napari._vendor.qt_json_builder.qt_jsonschema_form.signal
	napari._vendor.qt_json_builder.qt_jsonschema_form.widgets --> napari._vendor.qt_json_builder.qt_jsonschema_form.utils
	click napari._vendor.qt_json_builder.qt_jsonschema_form.widgets "https://github.com/napari/napari/tree/main/napari/_vendor/qt_json_builder/qt_jsonschema_form/widgets.py" _blank
	subgraph module.napari._qt._qapp_model[napari._qt._qapp_model]
		 napari._qt._qapp_model._menus
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
		 napari._qt._qapp_model.qactions._file
		 napari._qt._qapp_model.qactions._help
		 napari._qt._qapp_model.qactions._plugins
	end
	class module.napari._qt._qapp_model.qactions subgraphs
	subgraph module.napari._qt._qplugins[napari._qt._qplugins]
		 napari._qt._qplugins._qnpe2
	end
	class module.napari._qt._qplugins subgraphs
	subgraph module.napari._qt.dialogs[napari._qt.dialogs]
		 napari._qt.dialogs.confirm_close_dialog
		 napari._qt.dialogs.preferences_dialog
		 napari._qt.dialogs.qt_about
		 napari._qt.dialogs.qt_activity_dialog
		 napari._qt.dialogs.qt_modal
		 napari._qt.dialogs.qt_notification
		 napari._qt.dialogs.qt_reader_dialog
		 napari._qt.dialogs.screenshot_dialog
	end
	class module.napari._qt.dialogs subgraphs
	subgraph module.napari._qt[napari._qt]
		 napari._qt.qt_main_window
		 napari._qt.qt_viewer
		 napari._qt.utils
	end
	class module.napari._qt subgraphs
	subgraph module.napari._qt.widgets[napari._qt.widgets]
		 napari._qt.widgets.qt_color_swatch
		 napari._qt.widgets.qt_command_palette
		 napari._qt.widgets.qt_dims
		 napari._qt.widgets.qt_dims_slider
		 napari._qt.widgets.qt_dims_sorter
		 napari._qt.widgets.qt_extension2reader
		 napari._qt.widgets.qt_font_size
		 napari._qt.widgets.qt_highlight_preview
		 napari._qt.widgets.qt_logger
		 napari._qt.widgets.qt_progress_bar
		 napari._qt.widgets.qt_scrollbar
		 napari._qt.widgets.qt_spinbox
		 napari._qt.widgets.qt_tooltip
		 napari._qt.widgets.qt_viewer_status_bar
	end
	class module.napari._qt.widgets subgraphs
	subgraph module.napari._vendor[napari._vendor]
		 napari._vendor.qt_json_builder
	end
	class module.napari._vendor subgraphs
	subgraph module.napari._vendor.qt_json_builder[napari._vendor.qt_json_builder]
		 napari._vendor.qt_json_builder.qt_jsonschema_form
	end
	class module.napari._vendor.qt_json_builder subgraphs
	subgraph module.napari._vendor.qt_json_builder.qt_jsonschema_form[napari._vendor.qt_json_builder.qt_jsonschema_form]
		 napari._vendor.qt_json_builder.qt_jsonschema_form.defaults
		 napari._vendor.qt_json_builder.qt_jsonschema_form.form
		 napari._vendor.qt_json_builder.qt_jsonschema_form.signal
		 napari._vendor.qt_json_builder.qt_jsonschema_form.utils
		 napari._vendor.qt_json_builder.qt_jsonschema_form.widgets
	end
	class module.napari._vendor.qt_json_builder.qt_jsonschema_form subgraphs
	classDef subgraphs fill:white,strock:black,color:black;	classDef default fill:#00c3ff,color:black;
	linkStyle default stroke:#00c3ff
	classDef external fill:#ffa600,color:black;
```
### Source code directory layout (related to modules inside `napari`)
```
napari/
├─_qt/
│ ├─qt_viewer.py
│ ├─widgets/
│ │ ├─qt_dims_sorter.py
│ │ ├─qt_extension2reader.py
│ │ ├─qt_highlight_preview.py
│ │ ├─qt_dims_slider.py
│ │ ├─qt_scrollbar.py
│ │ ├─qt_dims.py
│ │ ├─qt_spinbox.py
│ │ ├─qt_color_swatch.py
│ │ ├─qt_command_palette.py
│ │ ├─qt_font_size.py
│ │ ├─qt_tooltip.py
│ │ ├─qt_viewer_status_bar.py
│ │ ├─qt_logger.py
│ │ └─qt_progress_bar.py
│ ├─utils.py
│ ├─_qplugins/
│ │ └─_qnpe2.py
│ ├─qt_main_window.py
│ ├─dialogs/
│ │ ├─confirm_close_dialog.py
│ │ ├─qt_activity_dialog.py
│ │ ├─qt_reader_dialog.py
│ │ ├─screenshot_dialog.py
│ │ ├─qt_about.py
│ │ ├─qt_notification.py
│ │ ├─preferences_dialog.py
│ │ └─qt_modal.py
│ └─_qapp_model/
│   ├─_menus.py
│   ├─injection/
│   │ ├─_qprocessors.py
│   │ └─_qproviders.py
│   └─qactions/
│     ├─_file.py
│     ├─_help.py
│     ├─__init__.py
│     ├─_debug.py
│     └─_plugins.py
└─_vendor/
  └─qt_json_builder/
    ├─qt_jsonschema_form/
    │ ├─signal.py
    │ ├─utils.py
    │ ├─__init__.py
    │ ├─widgets.py
    │ ├─defaults.py
    │ └─form.py
    └─__init__.py
```
