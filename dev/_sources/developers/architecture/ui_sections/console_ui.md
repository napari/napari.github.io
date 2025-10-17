## Console (napari-console)
### Dependencies diagram (related `napari` modules)
```{mermaid}
graph LR
	accTitle: Dependencies between modules in the napari Console (napari-console) UI section
	accDescr: Diagram showing the dependencies between the modules involved in the definition of the napari Console (napari-console) UI section
	napari._qt.qt_main_window(napari._qt.qt_main_window)
	napari._qt.qt_main_window --> napari._qt.qt_viewer
	napari._qt.qt_main_window --> napari.utils.notifications
	napari._qt.qt_main_window --> napari.viewer
	click napari._qt.qt_main_window "https://github.com/napari/napari/tree/main/napari/_qt/qt_main_window.py" _blank
	napari._qt.qt_viewer(napari._qt.qt_viewer)
	napari._qt.qt_viewer --> napari._qt.widgets.qt_viewer_buttons
	napari._qt.qt_viewer --> napari.utils.notifications
	napari._qt.qt_viewer --> napari_console
	click napari._qt.qt_viewer "https://github.com/napari/napari/tree/main/napari/_qt/qt_viewer.py" _blank
	napari._qt.widgets.qt_viewer_buttons(napari._qt.widgets.qt_viewer_buttons)
	napari._qt.widgets.qt_viewer_buttons --> napari.viewer
	click napari._qt.widgets.qt_viewer_buttons "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_viewer_buttons.py" _blank
	napari.components._viewer_key_bindings(napari.components._viewer_key_bindings)
	napari.components._viewer_key_bindings --> napari.components.viewer_model
	napari.components._viewer_key_bindings --> napari.utils.notifications
	napari.components._viewer_key_bindings --> napari.viewer
	click napari.components._viewer_key_bindings "https://github.com/napari/napari/tree/main/napari/components/_viewer_key_bindings.py" _blank
	napari.components.viewer_model(napari.components.viewer_model)
	click napari.components.viewer_model "https://github.com/napari/napari/tree/main/napari/components/viewer_model.py" _blank
	napari.utils.notifications(napari.utils.notifications)
	click napari.utils.notifications "https://github.com/napari/napari/tree/main/napari/utils/notifications.py" _blank
	napari.viewer(napari.viewer)
	napari.viewer --> napari._qt.qt_main_window
	napari.viewer --> napari.components.viewer_model
	click napari.viewer "https://github.com/napari/napari/tree/main/napari/viewer.py" _blank
	napari_console(napari_console)
	napari_console --> napari_console.qt_console
	napari_console.qt_console(napari_console.qt_console)
	subgraph module.napari._qt[napari._qt]
		 napari._qt.qt_main_window
		 napari._qt.qt_viewer
	end
	class module.napari._qt subgraphs
	subgraph module.napari._qt.widgets[napari._qt.widgets]
		 napari._qt.widgets.qt_viewer_buttons
	end
	class module.napari._qt.widgets subgraphs
	subgraph module.napari.components[napari.components]
		 napari.components._viewer_key_bindings
		 napari.components.viewer_model
	end
	class module.napari.components subgraphs
	subgraph module.napari.utils[napari.utils]
		 napari.utils.notifications
	end
	class module.napari.utils subgraphs
	subgraph module.napari[napari]
		 napari.viewer
	end
	class module.napari subgraphs
	subgraph module.external[external]
		 napari_console
		 napari_console.qt_console
	end
	class module.external subgraphs
	classDef subgraphs fill:white,strock:black,color:black;	classDef default fill:#00c3ff,color:black;
	linkStyle default stroke:#00c3ff
	classDef external fill:#ffa600,color:black;
	class napari_console external
	class napari_console.qt_console external
```
### Source code directory layout (related to modules inside `napari`)
```
napari/
├─utils/
│ └─notifications.py
├─viewer.py
├─_qt/
│ ├─widgets/
│ │ └─qt_viewer_buttons.py
│ ├─qt_main_window.py
│ └─qt_viewer.py
└─components/
  ├─_viewer_key_bindings.py
  └─viewer_model.py
```
