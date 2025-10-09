(nap-9)=
# NAP-9 — Multiple Views

```{eval-rst}
:Authors: Ashley Anderson <aandersoniii@chanzuckerberg.com>, Wouter-Michiel Vierdag, Lorenzo Gaifas
:Created: 2023-08-04
:Status: Draft
:Type: Standards Track
```

## Definitions
:::{note}
This NAP was previously discussed as *Multiple Canvases*, but due to the term *Canvas* having a well-established and more restrictive meaning of what we aim to implement, we're shifting to using the term *View* for a (hopefully) clearer distinction from existing terms. For a more thorough discussion of terminology, see [alternative terminology](#terminology).
:::

In order to facilitate discussion - this NAP will use the following definitions.

*Viewer* - Currently maps basically 1:1 to the napari application main window, including canvas, dims sliders, layer list, layer controls, and dock widgets. Related is the `ViewerModel`, a class in napari that maintains the state of the Viewer.

*Canvas* - Currently usually used to refer to the central widget of the napari Viewer which renders the data from the current slice, as well as keeping track of all the visualisation scenegraph from vispy and various other napari-vispy interfaces.

*View* - New term introduced by this NAP in order to formalize and disentangle the previous notions of *Canvas* and *Viewer*. This NAP introduces a `View` class in napari with its own `Layerlist`, `Dims`, and `Camera`.

*Layer* - The base unit of the napari image data model. Currently, a `ViewerModel` maintains an ordered list of `Layers` that it may display on its `View`.

*Layer Slice* - A subset of data from a Layer, reduced to 2D or 3D (via slicing and projecting) for visualization. This concept was introduced in [NAP-4](https://napari.org/stable/naps/4-async-slicing.html) as part of the async slicing work, and was already implemented for most layer types in subsequent PRs (`Image`, `Labels`, `Points`, and `Vectors`).

:::{warning}
[VisPy](https://vispy.org/) (the only current rendering backend in napari) has its own specific definitions for some of these or related concepts, such as:
- [`Canvas`](https://vispy.org/api/vispy.app.canvas.html#module-vispy.app.canvas): the whole surface on which things can be rendered (and which can be embedded in the GUI as we do in napari)
- [`ViewBox`](https://vispy.org/api/vispy.scene.widgets.viewbox.html#module-vispy.scene.widgets.viewbox): a rectangular portion of a canvas where a Scene can be visualised
- [`Scene`](https://vispy.org/api/vispy.scene.html#module-vispy.scene): a collection of renderable objects and cameras that the canvas can use to render inside a ViewBox. In vispy, scenes are tree-like structures called scenegraphs composed by Nodes.

Where necessary to refer to these concepts in this NAP (or discussion), such concepts will be qualified accordingly (for example: "a VisPy Canvas")
:::

## Abstract
Current napari architecture supports a single canvas/camera/view per viewer. Simultaneously showing multiple views of the same (or different) data generally necessitates opening an entirely new napari viewer window or low-level work with Qt widgets and private napari APIs. This wastes resources (primarily memory) and complicates interaction.
This NAP establishes a plan to implement a builtin system for opening, visualizing and interacting with multiple views within a single viewer.

We propose to achieve this in two parts that can be implemented independently:
1. Splitting of part of the current `ViewerModel` into a new `View` model holding a `Layerlist`, a `Dims`, and a `Camera`. `ViewerModel` will hold a `list`/`Sequence` of `Views`, allowing for multiple independent views.
2. Completion of the async `LayerSlicer` and `SliceRequest`/`SliceResponse` work for each layer type, and subsequent complete separation of layer slicing state from the layer models. This will allow to reuse layer objects between different views.

## Motivation and Scope
The ability to view n-D data from multiple perspectives (ortho-view), or different data from the *same* perspective (for example side-by-side segmentations) is a common feature request, and has proved useful in many other tools for data exploration and analysis. Here is a sampling of issues requesting support and discussing potential implementations:

* [#5348](https://github.com/napari/napari/issues/5348) Multicanvas viewer
* [#2338](https://github.com/napari/napari/issues/2338) Multicanvas API Thoughts
* [#760](https://github.com/napari/napari/issues/760) Linked multicanvas support
* [#662](https://github.com/napari/napari/issues/662) Linked 2D views
* [#561](https://github.com/napari/napari/issues/561) multicanvas grid display for layers in Napari
* [#1478](https://github.com/napari/napari/issues/1478) Orthogonal viewer plugin

Several plugins and examples have been created to address these limitations, for example:
* [napari-3d-ortho-viewer](https://github.com/gatoniel/napari-3d-ortho-viewer/tree/main)
* [multiple viewer widgets example](https://napari.org/stable/gallery/multiple_viewer_widget.html#sphx-glr-gallery-multiple-viewer-widget-py)

Significant overlap of issues ideas can also be found in [NAP-3](https://napari.org/dev/naps/3-spaces.html) and its surrounding discussions ([#4419](https://github.com/napari/napari/issues/4419), [#4684](https://github.com/napari/napari/pull/4684), [#4734](https://github.com/napari/napari/pull/4734)).

This document is intended to cover what [#5348](https://github.com/napari/napari/issues/5348) refers to as "True Multicanvas".

Providing native support in napari would allow developers to more easily create these experiences, enable interoperability between such plugins, and improve performance.

### Out of Scope
* Improvements to VisPy to support multiple views of the same `SceneGraph` (sharing data, saving VRAM) - for relevant discussion start with [vispy/#1992](https://github.com/vispy/vispy/issues/1992).
* For now, view arrangement (for example: tiling behavior) will be handled in the viewer only (left to Qt or custom Qt widgets). Making this state (de)serializable is out of scope for this project, but may be relevant when implementing a “savable viewer state” feature.
* Normalizing slice data for different layer types to a uniform protocol/system, though this may benefit in the course of this work.
* Specific UI implementations will be explored as part of this work, but UX and UI will likely be formalized later. Since this NAP was first drafted, a lot of work and discussion a on UX and UI has already been carried on in [#5348](https://github.com/napari/napari/issues/5348), which may be included in this NAP or developed later depending on discussion.
* Supporting alternative frontend (Qt) and backend (Vispy) frameworks. While this work should not make such tasks more difficult in the future, explicit consideration is out-of-scope until further progress is made in these areas.
* [Non-goals also in NAP-3](https://napari.org/dev/naps/3-spaces.html#non-goals) are related but also considered out-of-scope here
    * Separation of rendering information (e.g: colormap) from the data (e.g: features) which currently both live on the layer model
    * Window state restoration and "workspaces" (see [#4227](https://github.com/napari/napari/issues/4227) for further discussion)

## Requirements
* The application data model (`ViewerModel` + Layers) shall support multiple views.
* The application shall natively display multiple views simultaneously.
    * There shall be a minimum of one view (current status) per viewer.
* Each view shall have independent:
    * Layer list - or layerlist "subview" (see [#Alternative single LayerList](#single-layerlist) for details) (necessary for visualizing different data)
    * Camera (necessary for viewing data from different POV)
    * Dims model (necessary for viewing different slices/dimensions of the data)
* The implementation should minimize changes to the existing public API.
* The napari application (`ViewerModel`) shall maintain a concept of a single “active” (currently focused) view.
    * Alternatively, there could be a “main” view that does not change (“main” and “active” could even be simultaneously supported).
    * There will be no possibility of a viewer with no views.
* Users shall be able to add, remove, and (eventually[^maybe-rearrange]) rearrange views.


[^maybe-rearrange]: Exact UI/UX may is yet to be decided, see [Part 3: GUI and UX](#part-3-gui-and-ux) for some discussion.

## Design Considerations & Decisions
Part of this design document is intended to capture the desired behavior and prevent scope creep. At the extreme “multiple views” can be achieved with “multiple viewers”. Therefore we need to draw a line somewhere to differentiate a “view” from a “viewer”. [^napari-lite]

[^napari-lite]: A lightweight "view" might be relevant to the implementation of ["napari-lite"](https://github.com/napari/napari/issues/5940).

An important consideration is to minimize breaking changes to the public napari API. While napari is still pre-1.0, there is already a healthy developing ecosystem of plugins, scripts, and users. Changes to the API may be necessary and should be made if they constitute improvements, but should be minimized and well documented.

In addition to maintaining the model-view-controller (MVC) architecture of napari, this proposal aims to maintain or improve decoupling of the UI framework (currently Qt), the visualization library (currently VisPy), and the napari core code.

### Grid mode vs Multi-View

The napari viewer currently has a [grid mode](https://napari.org/stable/tutorials/fundamentals/viewer.html#grid-button) that can be activated to distribute all layers in a rectangular grid of vispy `ViewBox`es according to a few simple parameters (mainly shape and stride) (as of time of writing, the viewbox-based implementation in [#7870](https://github.com/napari/napari/pull/7870) is not yet merged, but will be soon).

This feature has some theoretical and functional overlap with the multi-view described in this NAP, but with a few key differences:
- grid mode allows *no* control over individual viewbox size and placement except through grid shape and stride. Viewboxes cannot be reordered, removed, or added.
- grid mode does not create views with independent dims and cameras. The same `Camera` and `Dims` are used to control all viewboxes.
- grid mode does not have fine-grained control of which layers are displayed in which viewbox. Layers are simply distributed based on the order of the layerlist and according to the stride.

These limitations dramatically simplify the usability of grid mode (one button click is usually all that's needed for most use cases). On the other hand, multi-view as described in this NAP offers greater control over every aspect described above, at the cost of a more complicate API and GUI accessibility.

In this NAP, we assume that grid mode and multiple views remain separate features. For discussion about why (and whether they should instead be merged into a single feature) see [#Alternative: Multi-View grid mode](#multi-view-grid-mode).

## Related Work
See other image viewers for examples for multiple views (mostly demonstrating orthogonal views):
* [3D Slicer](https://www.slicer.org/)
* [Orthogonal views in ImageJ and Imaris](https://www.youtube.com/watch?v=94d8sHMP_w8)
* [OHIF/Cornerstone.js](https://www.cornerstonejs.org/live-examples/crosshairs)
* [neuroglancer](https://neuroglancer-demo.appspot.com/#!%7B%22dimensions%22:%7B%22x%22:%5B8e-9%2C%22m%22%5D%2C%22y%22:%5B8e-9%2C%22m%22%5D%2C%22z%22:%5B8e-9%2C%22m%22%5D%7D%2C%22position%22:%5B2914.500732421875%2C3088.243408203125%2C4045%5D%2C%22crossSectionScale%22:3.762185354999915%2C%22projectionOrientation%22:%5B0.31435418128967285%2C0.8142172694206238%2C0.4843378961086273%2C-0.06040274351835251%5D%2C%22projectionScale%22:4593.980956070107%2C%22layers%22:%5B%7B%22type%22:%22image%22%2C%22source%22:%22precomputed://gs://neuroglancer-public-data/flyem_fib-25/image%22%2C%22tab%22:%22source%22%2C%22name%22:%22image%22%7D%2C%7B%22type%22:%22segmentation%22%2C%22source%22:%22precomputed://gs://neuroglancer-public-data/flyem_fib-25/ground_truth%22%2C%22tab%22:%22source%22%2C%22segments%22:%5B%2221894%22%2C%2222060%22%2C%22158571%22%2C%2224436%22%2C%222515%22%5D%2C%22name%22:%22ground-truth%22%7D%5D%2C%22showSlices%22:false%2C%22layout%22:%224panel%22%7D)
* [ITK-SNAP](https://www.itksnap.org/pmwiki/pmwiki.php)

## Implementation

(part-1-view-model)=
### Part 1: View model

* Introduce a minimally disruptive `_views` attribute on the ViewerModel, and implement a `View` model to hold a `Layerlist`, a `Dims`, and a `Camera` (as well as some related concepts and models).
* using a `SelectableEventedList` for `_views` lets us easily introduce the concept of an `active` View. This, together with some simple dispatch of current viewer elements to the active view, will make this part of the implementation a drop-in replacement.
* At this stage, only the active view will be displayed. This will leave the GUI identical to before. When a new view becomes active, the contents of the QtViewer and vispy canvas are simply swapped to be linked with the new layerlist, camera, and dims.
* Similarly, existing events and event callbacks will connected to the active view only.
* Add APIs to add, remove and select views

The concept of an "active" view will work in service of minimizing API changes. This will allow existing APIs on the main Viewer/ViewerModel to remain and simply delegate to the active view.

Additionally, by providing access to the components of the active view through the `ViewerModel`, we can also seamlessly transition to a multiview system without breaking any high level API.

Currently, the `ViewerModel` (when stripped down to its barebones) contains the following fields and functionality:

```py
class ViewerModel:
    camera: Camera
    cursor: Cursor
    dims: Dims
    grid: GridCanvas
    layers: LayerList
    help: str
    status: Union[str, dict]
    tooltip: Tooltip
    theme: str
    title: str
    _overlays: EventedDict[str, Overlay]
    _layer_slicer: _LayerSlicer
```

With this NAP and the above considerations, we expect to separate the above components roughly as follows:

```py
class View:
    camera: Camera
    cursor: Cursor
    dims: Dims
    grid: GridCanvas
    layers: LayerList
    _overlays: EventedDict[str, Overlay]
    _layer_slicer: _LayerSlicer

class ViewerModel:
    _views: SelectableEventedList[View]
    help: str
    status: Union[str, dict]
    tooltip: Tooltip
    theme: str
    title: str

    @property
    def camera(self):
        return self._views.active.camera

    [...]
```

:::{admonition} TODO
Discuss whether the LayerSlicer should be singleton on the viewer or one per view.
:::

:::{seealso}
An alternative implementation could maintain a single centralized `LayerList`, with `Views` only having control over layer visibility. See [#Alternative single LayerList](#single-layerlist) for pros and cons.
:::

(part-2-decouple-slicing-state)=
### Part 2: Decouple slicing state from layer models

:::{important}
The following assumes that we work from the top down. However, this refactoring work is *very large*, encompassing a large portion of the layer code.

Therefore, it might be better to simple rewrite the layer classes from the ground up (as has been discussed and suggested in many other occasions).
If that option were to be chosen, a new NAP will likely be in order.
:::

* following the existing implementations, add `SliceResponse` classes for each layer type (currently remaining: `Shapes`, `Surface`, `Tracks`).
* move *all* layer slicing state from `Layer`s to the `SliceResponse` objects living in the `View`s. This includes base attributes like `_slice_input`, `_data_slice` and so on, as well as layer-specific properties and methods such as all the `Points._view_*` attributes. One way of handling this is to add a (private?) mapping of layers to slice responses on the `View`, which is updated by the `LayerSlicer` when slicing occurs:

```py
class View:
    ...
    _layer_slices: EventedDict[Layer, SliceResponse]
```

* On the vispy side, `VispyLayer` subclasses will now hold references to their `Layer` (for rendering information) as well as a `SliceResponse` (for data).
* If we retain a singleton LayerSlicer, it will need to update the sync and async callbacks to pass a view parameter where the resulting sliced data will be stored, rather than storing it on the layer itself. Slice task cancellation logic will need to be revisited accordingly.
    * async callback: `LayerSlicer._on_slice_done`
    * sync callback: `Layer._slice_dims`

:::{note}
some layers include "selection" information (Points, Shapes, and Tracks). These will be considered as Layer-level concepts, and will not be view-dependent but global for that specific layer object.
:::

:::{note}
Consider to codify a protocol ([`typing.Protocol`](https://docs.python.org/3/library/typing.html#typing.Protocol)) for `Response` classes.
:::

***Table 1** - Layer attributes and methods that hold, manipulate, or depend on slice data. For brevity, some implied attributes are left out (such as `_thumbnail` and `_thumbnail_shape` since the public `thumbnail` is listed). These attributes will either be moved from the Layer onto the SliceResponse objects, moved to mouse or shortcut callbacks (`Shapes._is_moving`), rendered obsolete (`update_draw`), refactored to not use slicing state (`get_value`), or require further discussion (`cursor`).*

:::{note}
A question mark is next to attributes and methods that need particular discussion
:::

| Layer Class | Attributes |
| -------- | -------- |
| Base/all subclasses | `_slice_input`
| | `_update_dims`
| | `_data_slice`
| | `corner_pixels`
| | `thumbnail` ?
| | `cursor` ?
| | `set_view_slice`
| | `_set_view_slice`
| | `_make_slice_input`
| | `_update_slice_response`
| | `_get_value`
| | `get_`
| | `loaded` ?
| | `_update_draw`
| | `_get_value`
| | `_get_value_3d`
| | `_get_value_ray`
| Image, Labels | `_data_view`
| | `_data_level`
| Points | all `_view_*` and `_*_view` properties
| | `interaction_box` ?
| | `_set_drag_start`
| Surface | all `_view_*` and `_*_view` properties
| Vectors | all `_view_*` and `_*_view` properties
| Tracks | all `_view_*` and `_*_view` properties
|| `_current_displayed_dims`
| Shapes | `_data_dict`
|| `_data_view`
| | all `_*_box` properties
| | all `_drag_*` properties
| | `_is_moving`
| | `_is_selecting`
| | `_is_creating`
| | `_fixed_aspect`
| | `_fixed_index`
| | `_update_properties`
| | `_allow_thumbnail_update`
| | `_vertex_size `
| | `_rotation_handle_length `

(part-3-gui-and-ux)=
### Part 3: GUI and UX

In this last step we want to unlock the ability to visualize multiple views *at the same time*. This requires changes to our `_qt` and `_vispy` modules (and any other potential future backend for GUI and rendering).

#### UX design
:::{seealso}
Since this NAP was first drafted, a UX/UI design deep-dive was separately carried out in [#5348](https://github.com/napari/napari/issues/5348#issuecomment-2150349638). Depending on feedback on this NAP, that discussion may be integrated as part of this NAP or left to a followup.
:::

Specific UI design and architecture remains to be determined. UI design needs additional refinement and exploration, and this is expected to continue after basic/core implementation proposed in this NAP is complete. UI changes may also be described in a separate NAP or followup issue along with a discussion of convenience functions and affordances for common operations. Some placeholder or experimental code will be used in the meantime as a prototype implementation.

Some open questions here are (for example):
* Should each view also have visible dims sliders, or can we keep one set of dims sliders that changes based on the active (selected) view?
* What kind of cross-reference displays or tools should there be, and how to implement them?
    * through-plane slice indicators
    * three-point slice definition
* What kinds of camera-linking should be supported by publicly exposed builtin callbacks?
    * orthogonal
    * stereoscopic
Beyond showing a grid of views, it would be nice for individual views to be:
* Resizable
* Reorderable
* Re-tileable (for example, changing number of rows and columns to tile)
* Maybe: Maximized, stacked, and minimized (e.g. with tabs)

Here are some Qt classes that may provide a sound base for multiview UI implementation:
* `QDockWidget`, with the main window being modified to allow dock widget nesting (`dockNestingEnabled`). This may require the fewest modifications to the existing Qt viewer. Allowing widgets to be undocked would make this extremely flexible, but possibly also confusing.
* `QMdiArea` (“multiple document interface”) satisfies most of these requirements, and should be customizable to satisfy them all. This would offer extreme flexibility of layout.
* `GridLayout` would likely provide a quite simple but otherwise inflexible solution. For example this may make independent resizing of views difficult


#### Implementation

* `QtViewer` will be changed to hold a mapping (or list?) of `View`s to `VispyCanvas`es (with the latter likely being renamed to `VispyView` for consistency)
* Methods, shortcuts, and menus/buttons must be added to allow showing/hiding, reordering, adding/removing, and selecting views.


## Backward Compatibility

Maintaining the proxy API on the viewer via the concepts of a main and/or active view will make this work mostly backward-compatible, though there will inevitably be some breaking changes. There will likely be significant breaking changes to private APIs. For example if plugins are attempting to access slice data directly from a layer instance, it may no longer be as expected. If this is a large burden, it too may be mitigated by delegating from the layer to the slice corresponding to the main or active view.

## Future Work

The goal of this NAP is to cover the main architectural changes to enable multi-view work. Future work is expected in
1. user experience, design, and GUI implementation details
2. consistent, ergonomic, and documented public APIs for advanced interaction with multiple views.
3. development of frequently requested features dependent on this work (e.g.: orthoview)

## Alternatives

### Terminology

Other names for `View` that were discussed are:
- `Canvas`: does not convey the independent dims and camera
- `Viewport`: used similarly in other rendering software, conveys canvas + camera
- `Portal`: more evocative of camera + dims, but no established meaning
- `Realm`: same as above, but a stronger implication of "separate space" which might be undesirable

`View` is very similar to viewport but shorter and less jargony, so it seems the best candidate so far.

### Single LayerList

An alternative to each `View` holding a separate layerlist would be to have a single, centralized layerlist held by the `ViewerModel`, while each `View` only allows to independently set the visibility of each layer within that specific `View`.
From the user perspective this makes it a bit easier to keep track of layers (as they are all always available in the layerlist) and to "transfer" layers across `Views` (by simply toggling visibility instead of moving them between lists).
On the flip side, this makes working with large layerlists and several views more cumbersome from the GUI as the layerlist gets more crowded.

On the implementation side, this would require deprecating `Layer.visible` since layer visibility would now be a property of the `View`. This might accessible via something like a set of indices `View.visible_layers = {0, 1}`. This could be completely transparent via the GUI, but would be significantly more cumbersome programmatically.

A significant advantage of using multiple layerlists over a single one is that it allows us to proceed with [part 1](#part-1-view-model) (and potentially [part 3](#part-3-gui-and-ux) without depending on [part 2](#part-2-decouple-slicing-state), by initially disallowing layers to live in myultiple views (and thus having multiple slicing states).

:::{admonition} TODO
discuss other differences
:::

### Multi-View grid mode
Grid mode is currently distinct from multi-view. However, the two could be merged by implementing grid-mode as a one-button activation of a preset multi view (similar to how we plan to implement ortho-view). This would require the following:

- Generate and NxM grid of views based on the grid shape and stride
- link all view `Camera`s together
- link all view `Dims` together
- distribute layers in the various view layerlists according to stride
- add callbacks so that modifying stride and grid shape will redistribute layers
- add callbacks so adding/removing/reordering layers causes Views to change accordingly. This can only be done if the [single layerlist alternative](#single-layerlist) is used, otherwise users will have to manually access individual layerlists.
- potentially allow destroying all views when clicking the grid mode button again (this might break any manual modifications made by the user)
- potentially hide all unnecessary controls, such as redundant dims, redundant layerlist, etc, which  (depending on UI implementation) might take up precious screen real estate

It's unclear/undecided how the above should behave if at any point the user "breaks" the assumptions of the grid mode (e.g: reorders views manually, unlinks dims, then adds new layers, etc).

While this alternative unified two code branches into a single one, the downsides for grid mode users are significant. With separate features, users of grid-mode who want more control can easily move to a multiview approach when needed, while retaining the one-click simplicity of grid mode.

Additionally, differently from this NAP's proposal, the implementation described above would disallow enabling grid mode in a canvas while retaining other canvases in "normal" mode. Refer to [#5348](https://github.com/napari/napari/issues/5348) for extensive discussion about this.

### Users can open multiple napari viewers
Using multiple napari viewers does not satisfy the core user needs for multiple views when processing or manipulating data. Multiple viewers also wastes system resources as viewers do not communicate or share memory, as well as wasting screen real estate by duplicating widgets unnecessarily.

### Leave multiview to plugins and custom widgets
Unifying an implementation and (eventually) providing a stable multi-view API will save work for plugin authors, and allow more plugins to interoperate.

### Implement slices using shallow Layer copies
This is a good and reasonable alternative to the proposed implementation, and is how the [multiple viewer widgets example](https://napari.org/stable/gallery/multiple_viewer_widget.html#sphx-glr-gallery-multiple-viewer-widget-py) is implemented. This implementation also makes it easier to configure rendering/appearance per-view (layer visibility, colormap, etc.). However this implementation relies more on careful bookkeeping than data modeling. If this is desired functionality, layer data should be fully separated from the data view (slice and view state). Ultimately this implementation is similar to that proposed in this NAP, and could be considered along a continuum of separating layer data, slice data, and rendering configuration.

## Discussion

* [#5348](https://github.com/napari/napari/issues/5348) Multicanvas viewer
    * This is the most recent and thorough discussion multi-view prior to this NAP

## Copyright

This document is dedicated to the public domain with the Creative Commons CC0
license [^id3]. Attribution to this source is encouraged where appropriate, as per
CC0+BY [^id4].


[^id3]: CC0 1.0 Universal (CC0 1.0) Public Domain Dedication,
    <https://creativecommons.org/publicdomain/zero/1.0/>

[^id4]: <https://dancohen.org/2013/11/26/cc0-by/>
