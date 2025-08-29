## Layers list
### Dependencies diagram (related `napari` modules)
```{mermaid}
graph LR
	accTitle: Dependencies between modules in the napari Layers list UI section
	accDescr: Diagram showing the dependencies between the modules involved in the definition of the napari Layers list UI section
	napari._qt._qapp_model(napari._qt._qapp_model)
	napari._qt._qapp_model --> napari._qt._qapp_model._menus
	click napari._qt._qapp_model "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/__init__.py" _blank
	napari._qt._qapp_model._menus(napari._qt._qapp_model._menus)
	click napari._qt._qapp_model._menus "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/_menus.py" _blank
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
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.injection._qprocessors
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.injection._qproviders
	napari._qt._qapp_model.qactions --> napari._qt._qapp_model.qactions._layerlist_context
	napari._qt._qapp_model.qactions --> napari._qt.qt_main_window
	napari._qt._qapp_model.qactions --> napari._qt.qt_viewer
	click napari._qt._qapp_model.qactions "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/__init__.py" _blank
	napari._qt._qapp_model.qactions._layerlist_context(napari._qt._qapp_model.qactions._layerlist_context)
	napari._qt._qapp_model.qactions._layerlist_context --> napari.layers
	click napari._qt._qapp_model.qactions._layerlist_context "https://github.com/napari/napari/tree/main/napari/_qt/_qapp_model/qactions/_layerlist_context.py" _blank
	napari._qt.containers._base_item_model(napari._qt.containers._base_item_model)
	click napari._qt.containers._base_item_model "https://github.com/napari/napari/tree/main/napari/_qt/containers/_base_item_model.py" _blank
	napari._qt.containers._base_item_view(napari._qt.containers._base_item_view)
	napari._qt.containers._base_item_view --> napari._qt.containers._base_item_model
	napari._qt.containers._base_item_view --> napari._qt.containers._factory
	click napari._qt.containers._base_item_view "https://github.com/napari/napari/tree/main/napari/_qt/containers/_base_item_view.py" _blank
	napari._qt.containers._factory(napari._qt.containers._factory)
	napari._qt.containers._factory --> napari.components.layerlist
	click napari._qt.containers._factory "https://github.com/napari/napari/tree/main/napari/_qt/containers/_factory.py" _blank
	napari._qt.containers._layer_delegate(napari._qt.containers._layer_delegate)
	napari._qt.containers._layer_delegate --> napari._qt._qapp_model
	napari._qt.containers._layer_delegate --> napari._qt.containers._base_item_model
	napari._qt.containers._layer_delegate --> napari._qt.containers.qt_layer_model
	napari._qt.containers._layer_delegate --> napari._qt.qt_resources
	napari._qt.containers._layer_delegate --> napari.components.layerlist
	click napari._qt.containers._layer_delegate "https://github.com/napari/napari/tree/main/napari/_qt/containers/_layer_delegate.py" _blank
	napari._qt.containers.qt_layer_list(napari._qt.containers.qt_layer_list)
	napari._qt.containers.qt_layer_list --> napari._qt._qapp_model
	napari._qt.containers.qt_layer_list --> napari._qt._qapp_model.qactions
	napari._qt.containers.qt_layer_list --> napari._qt._qapp_model.qactions._layerlist_context
	napari._qt.containers.qt_layer_list --> napari._qt.containers._base_item_model
	napari._qt.containers.qt_layer_list --> napari._qt.containers._layer_delegate
	napari._qt.containers.qt_layer_list --> napari._qt.containers.qt_list_view
	napari._qt.containers.qt_layer_list --> napari.components.layerlist
	napari._qt.containers.qt_layer_list --> napari.layers
	click napari._qt.containers.qt_layer_list "https://github.com/napari/napari/tree/main/napari/_qt/containers/qt_layer_list.py" _blank
	napari._qt.containers.qt_layer_model(napari._qt.containers.qt_layer_model)
	napari._qt.containers.qt_layer_model --> napari._qt.containers.qt_list_model
	napari._qt.containers.qt_layer_model --> napari.layers
	click napari._qt.containers.qt_layer_model "https://github.com/napari/napari/tree/main/napari/_qt/containers/qt_layer_model.py" _blank
	napari._qt.containers.qt_list_model(napari._qt.containers.qt_list_model)
	napari._qt.containers.qt_list_model --> napari._qt.containers._base_item_model
	click napari._qt.containers.qt_list_model "https://github.com/napari/napari/tree/main/napari/_qt/containers/qt_list_model.py" _blank
	napari._qt.containers.qt_list_view(napari._qt.containers.qt_list_view)
	napari._qt.containers.qt_list_view --> napari._qt.containers._base_item_view
	napari._qt.containers.qt_list_view --> napari._qt.containers.qt_list_model
	click napari._qt.containers.qt_list_view "https://github.com/napari/napari/tree/main/napari/_qt/containers/qt_list_view.py" _blank
	napari._qt.qt_main_window(napari._qt.qt_main_window)
	napari._qt.qt_main_window --> napari._qt._qapp_model
	napari._qt.qt_main_window --> napari._qt._qapp_model.qactions
	napari._qt.qt_main_window --> napari._qt.qt_resources
	napari._qt.qt_main_window --> napari._qt.qt_viewer
	click napari._qt.qt_main_window "https://github.com/napari/napari/tree/main/napari/_qt/qt_main_window.py" _blank
	napari._qt.qt_resources(napari._qt.qt_resources)
	click napari._qt.qt_resources "https://github.com/napari/napari/tree/main/napari/_qt/qt_resources/__init__.py" _blank
	napari._qt.qt_viewer(napari._qt.qt_viewer)
	napari._qt.qt_viewer --> napari.components.layerlist
	napari._qt.qt_viewer --> napari.layers
	napari._qt.qt_viewer --> napari.layers.base
	click napari._qt.qt_viewer "https://github.com/napari/napari/tree/main/napari/_qt/qt_viewer.py" _blank
	napari.components.layerlist(napari.components.layerlist)
	napari.components.layerlist --> napari.layers
	napari.components.layerlist --> napari.layers.utils
	napari.components.layerlist --> napari.layers.utils._link_layers
	napari.components.layerlist --> napari.layers.utils.layer_utils
	click napari.components.layerlist "https://github.com/napari/napari/tree/main/napari/components/layerlist.py" _blank
	napari.layers(napari.layers)
	napari.layers --> napari.layers.base
	napari.layers --> napari.layers.image
	napari.layers --> napari.layers.labels
	napari.layers --> napari.layers.points
	napari.layers --> napari.layers.shapes
	napari.layers --> napari.layers.surface
	napari.layers --> napari.layers.tracks
	napari.layers --> napari.layers.vectors
	click napari.layers "https://github.com/napari/napari/tree/main/napari/layers/__init__.py" _blank
	napari.layers.base(napari.layers.base)
	click napari.layers.base "https://github.com/napari/napari/tree/main/napari/layers/base/__init__.py" _blank
	napari.layers.image(napari.layers.image)
	click napari.layers.image "https://github.com/napari/napari/tree/main/napari/layers/image/__init__.py" _blank
	napari.layers.labels(napari.layers.labels)
	click napari.layers.labels "https://github.com/napari/napari/tree/main/napari/layers/labels/__init__.py" _blank
	napari.layers.points(napari.layers.points)
	click napari.layers.points "https://github.com/napari/napari/tree/main/napari/layers/points/__init__.py" _blank
	napari.layers.shapes(napari.layers.shapes)
	click napari.layers.shapes "https://github.com/napari/napari/tree/main/napari/layers/shapes/__init__.py" _blank
	napari.layers.surface(napari.layers.surface)
	click napari.layers.surface "https://github.com/napari/napari/tree/main/napari/layers/surface/__init__.py" _blank
	napari.layers.tracks(napari.layers.tracks)
	click napari.layers.tracks "https://github.com/napari/napari/tree/main/napari/layers/tracks/__init__.py" _blank
	napari.layers.utils(napari.layers.utils)
	click napari.layers.utils "https://github.com/napari/napari/tree/main/napari/layers/utils/__init__.py" _blank
	napari.layers.utils._link_layers(napari.layers.utils._link_layers)
	click napari.layers.utils._link_layers "https://github.com/napari/napari/tree/main/napari/layers/utils/_link_layers.py" _blank
	napari.layers.utils.layer_utils(napari.layers.utils.layer_utils)
	click napari.layers.utils.layer_utils "https://github.com/napari/napari/tree/main/napari/layers/utils/layer_utils.py" _blank
	napari.layers.vectors(napari.layers.vectors)
	click napari.layers.vectors "https://github.com/napari/napari/tree/main/napari/layers/vectors/__init__.py" _blank
	subgraph module.napari._qt[napari._qt]
		 napari._qt._qapp_model
		 napari._qt.qt_main_window
		 napari._qt.qt_resources
		 napari._qt.qt_viewer
	end
	class module.napari._qt subgraphs
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
		 napari._qt._qapp_model.qactions._layerlist_context
	end
	class module.napari._qt._qapp_model.qactions subgraphs
	subgraph module.napari._qt.containers[napari._qt.containers]
		 napari._qt.containers._base_item_model
		 napari._qt.containers._base_item_view
		 napari._qt.containers._factory
		 napari._qt.containers._layer_delegate
		 napari._qt.containers.qt_layer_list
		 napari._qt.containers.qt_layer_model
		 napari._qt.containers.qt_list_model
		 napari._qt.containers.qt_list_view
	end
	class module.napari._qt.containers subgraphs
	subgraph module.napari.components[napari.components]
		 napari.components.layerlist
	end
	class module.napari.components subgraphs
	subgraph module.napari[napari]
		 napari.layers
	end
	class module.napari subgraphs
	subgraph module.napari.layers[napari.layers]
		 napari.layers.base
		 napari.layers.image
		 napari.layers.labels
		 napari.layers.points
		 napari.layers.shapes
		 napari.layers.surface
		 napari.layers.tracks
		 napari.layers.utils
		 napari.layers.vectors
	end
	class module.napari.layers subgraphs
	subgraph module.napari.layers.utils[napari.layers.utils]
		 napari.layers.utils._link_layers
		 napari.layers.utils.layer_utils
	end
	class module.napari.layers.utils subgraphs
	classDef subgraphs fill:white,strock:black,color:black;	classDef default fill:#00c3ff,color:black;
	linkStyle default stroke:#00c3ff
	classDef external fill:#ffa600,color:black;
```
### Source code directory layout (related to modules inside `napari`)
```
napari/
├─layers/
│ ├─utils/
│ │ ├─__init__.py
│ │ ├─layer_utils.py
│ │ └─_link_layers.py
│ ├─shapes/
│ │ └─__init__.py
│ ├─image/
│ │ └─__init__.py
│ ├─vectors/
│ │ └─__init__.py
│ ├─labels/
│ │ └─__init__.py
│ ├─points/
│ │ └─__init__.py
│ ├─tracks/
│ │ └─__init__.py
│ ├─base/
│ │ └─__init__.py
│ ├─__init__.py
│ └─surface/
│   └─__init__.py
├─components/
│ └─layerlist.py
└─_qt/
  ├─qt_main_window.py
  ├─qt_resources/
  │ └─__init__.py
  ├─qt_viewer.py
  ├─_qapp_model/
  │ ├─_menus.py
  │ ├─qactions/
  │ │ ├─_layerlist_context.py
  │ │ └─__init__.py
  │ ├─injection/
  │ │ ├─_qprocessors.py
  │ │ └─_qproviders.py
  │ └─__init__.py
  └─containers/
    ├─qt_layer_list.py
    ├─_layer_delegate.py
    ├─_base_item_model.py
    ├─_base_item_view.py
    ├─qt_layer_model.py
    ├─qt_list_model.py
    ├─_factory.py
    └─qt_list_view.py
```
