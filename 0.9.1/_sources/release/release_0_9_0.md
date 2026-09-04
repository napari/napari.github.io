# napari 0.9.0

*Tue, Aug 25, 2026*

We're happy to announce the release of napari 0.9.0!
napari is a fast, interactive, multi-dimensional image viewer for Python.
It's designed for browsing, annotating, and analyzing large multi-dimensional
images. It's built on top of Qt (for the GUI), vispy (for performant GPU-based
rendering), and the scientific Python stack (numpy, scipy).

For more information, examples, and documentation, please visit our website,
https://napari.org.

napari follows [EffVer (Intended Effort Versioning)](https://effver.org/); this is a **Macro** release containing awesome new features, but may require dedication of some significant time when upgrading projects to use this version.

## Highlights

### Auto-labelling of viewer axes

napari 0.5.0 laid the ground work for more accurate metadata handling by
allowing users and plugins to set the `axis_labels` on layers. napari 0.9.0
*finally* capitalises on that work by automatically labelling viewer axes based
on the axis labels of layers present in the viewer.
([#9282](https://github.com/napari/napari/pull/9282))

Now, opening a dataset with labelled axes will result in correctly labelled
axes in the viewer:

![napari screenshot showing inherited labeled viewer axes](../_static/images/axis-labels.png)

Additionally, when you create a new layer from an existing one using the
buttons in the GUI, the new layer now inherits the axis labels of the layer(s)
it was derived from. ([#9293](https://github.com/napari/napari/pull/9293))

There is still work to be done here. For example, if layers have labels that
are inconsistent with each other, napari will simply ignore layers with fewer
dimensions, or layers added later. But, for most use cases, layer and viewer
metadata will now be much more informative!

### Xarray metadata is now inherited

In the same vein, if you work with [Xarray](https://docs.xarray.dev/) — common in climate,
geoscience, and many places where data ships with labelled coordinates — napari
now reads metadata straight from your `DataArray`s. When you add an xarray
object to the viewer, napari will use its dimension names as axis labels, infer
`scale` and `translate` from the coordinate values, and pick up `units` from
CF-convention `units` attributes on coordinates ([#9316](https://github.com/napari/napari/pull/9316)).
This closed an 8-year old, double-digit, nearly-as-old-as-napari-itself issue!
([#14](https://github.com/napari/napari/issues/14))

### Status bar coordinates as floats

Continuing on the theme of improved metadata, when scale and/or unit metadata
is set on the layer, the status bar coordinates now have increased precision,
where before they were limited to just integers. This means you can have more
accurate physical estimates of your data coordinates when exploring data.
([#9287](https://github.com/napari/napari/pull/9287))

### Layer controls for multiple selected layers

Until now, layer controls only appeared when a single layer was selected. Now,
napari dynamically builds the layer controls from your selection, so
when you select several layers at once you can see and use the controls that
are shared between them. Pan-zoom is always available, while the layer-specific
buttons still appear only when a single layer is selected.
([#9318](https://github.com/napari/napari/pull/9318))

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="../_static/images/joint-controls.webm" type="video/webm" />
    <source src="../_static/images/joint-controls.mp4" type="video/mp4" />
    <img src="../_static/images/joint-controls.png"
      title="Your browser does not support the video tag"
      alt="Video showing the editing of multiple selected layers at once."
    >
  </video>
</figure>
```

There's also an experimental setting, *Generate GUI layer controls dynamically
instead of using premade panels*, that makes napari use the new dynamic
controls even for single layers.

### Take a guided tour of the viewer

New to napari, or just want a quick refresher on where everything lives? There's
now a guided tour, available from **Help → Take a tour**. The tour highlights
the main areas of the viewer — the canvas, the layer list, layer controls, the
viewer buttons, the dimension sliders, and the status bar — so you can get your
bearings in seconds. If the viewer is empty, napari opens the built-in *Balls
(3D)* sample data so the walkthrough has something to show ([#9290](https://github.com/napari/napari/pull/9290)).

![Screenshot of the napari viewer guided tour](../_static/images/guided-tour.png)

### Contributable plugin preferences

Plugins can now ship their own preferences ([#9308](https://github.com/napari/napari/pull/9308))!
By declaring `configurations` in
their `napari.yaml` manifest, plugins get their own settings — stored
separately from napari's own settings, automatically added to and editable from
the napari **Preferences** dialog, and accessible programmatically from Python:

```python
from napari.settings import get_plugin_settings

settings = get_plugin_settings("my-plugin")
settings.reader.lazy = True
```

Read more in the [Configurations Guide](https://napari.org/dev/plugins/building_a_plugin/guides.html#configurations)
to learn more about how to add this new contribution to your own plugins.

### Adjust grid rendering with hidden layers

Grid mode with hidden layers is much improved: empty
grid spaces are never shown and stride operates on the *full* layer list, so
layer grouping doesn't change when you show or hide layers ([#9244](https://github.com/napari/napari/pull/9244)).

### Fuzzy find in command palette

Have you used our [command palette](command-palette) yet? It's a great way to
quickly access and even discover napari functionality. Now, thanks to
[#8661](https://github.com/napari/napari/pull/8661), it's easier to find
functions when you don't know the exact name, or you mistyped something. You'll
need to have [rapidfuzz](https://rapidfuzz.github.io/RapidFuzz/) installed to
make use of it. It's automatically installed with `napari[all]` or
`napari[optional]`. And if the search feels a bit off, you can set just how
fuzzy you want it to be in Preferences > Experimental > Fuzzy Search Threshold.

![Example of fuzzy find using "scle" to find "scale"](https://github.com/user-attachments/assets/88d4d2e1-36e1-4921-8df6-6f8ded4df12e)

### 2D slicing of surfaces

Ever since we added surfaces, they have been invisible in 2D slices. Now,
thanks to all the work done on [thick slicing](thick-slicing), surface
slices appear in 2D view ([#8783](https://github.com/napari/napari/pull/8783)).
This enhancement is accompanied by support for async slicing, which should
improve viewer responsiveness when slicing large, time varying surfaces, for
example.

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="../_static/images/slicing_surface.webm" type="video/webm" />
    <source src="../_static/images/slicing_surface.mp4" type="video/mp4" />
    <img src="../_static/images/slicing_surface.png"
      title="Your browser does not support the video tag"
      alt="Video showing a slicing of surface layers, with showing how to change thickness of slize and controlling slice mmode."
    >
  </video>
</figure>
```

... And you can try this out yourself with common .obj surface files thanks to
a new built-in reader plugin!
([#9228](https://github.com/napari/napari/pull/9228))

You should now be able to drag and drop .obj files into napari and see them
instantly.

### Public API for auto contrast limits

For a very long time, it's been possible to set automatic contrast limits
updating on a layer *only* through the graphical user interface. This means an
extra click for many workflows and poorer reproducibility. Thanks to
[#9271](https://github.com/napari/napari/pull/9271), you can now set the
`auto_contrast` attribute on Image layers:

```python
image_layer = viewer.add_image(..., auto_contrast=True)
# or
image_layer.auto_contrast = True
```

### The life-changing magic of tidying up the Viewer model

The napari Viewer model, for historical reasons, is a grab-bag of *many*
attributes, which makes usage, discoverability, and code modularity and
composability a major issue. We've taken some *big* steps towards cleaning up
one of our most important namespaces by creating Canvas
([#8633](https://github.com/napari/napari/pull/8633)) and Scene
([#9323](https://github.com/napari/napari/pull/9323)) models, which cleans up
([#9363](https://github.com/napari/napari/pull/9363)) and clarifies
([napari/docs#1083](https://github.com/napari/docs/pull/1083)) many parts of
the API.

The old API is in extremely widespread use, so although it is silently
deprecated, it will continue to work for the foreseeable future. In the
meantime, the new API should be much friendlier to work with by carefully
grouping related concepts and APIs. Some examples:

- `viewer.axes` and `viewer.floating_axes` become `viewer.scene.overlays.axes`
  and `viewer.canvas.overlays.axes`.
- From that API, you may also guess that the scale bar is on
  `viewer.canvas.overlays.scale_bar`.
- You can even get a list of the current overlays (both visible and invisible)
  with `list(viewer.canvas.overlays)` and `list(viewer.scene.overlays)`. (But
  do note that overlays with a `_` prefix are private and may change!)
- `viewer.camera` is now `viewer.scene.camera`.
- Grid mode is now accessed at `viewer.canvas.grid` (e.g.
  `viewer.canvas.grid.enabled = True`).

This has also enabled a new public API: you can now query the canvas size (in
pixels) without accessing private napari APIs! Check `viewer.canvas.size`!

The TL;DR:

```python
# Canvas Model
viewer.scale_bar -> viewer.canvas.overlays.scale_bar
viewer.text_overlay -> viewer.canvas.overlays.text
viewer.floating_axes -> viewer.canvas.overlays.axes
viewer.grid -> viewer.canvas.grid
NOW EXPOSED -> viewer.canvas.overlays.current_slice
NEW -> viewer.canvas.overlay_tiling
NEW -> viewer.canvas.background_color & viewer.canvas.background_color_override
NEW -> viewer.canvas.size

# Scene Model
viewer.camera -> viewer.scene.camera
viewer.axes -> viewer.scene.overlays.axes
```

### Removal of translation code

Several years ago, we started working on implementing localization machinery
into napari. Unfortunately, this work has been sitting unfinished and unused,
while making maintaining napari harder. Given the extra maintenance burden
without benefit, we made the difficult decision to remove it from our codebase
([#8935](https://github.com/napari/napari/pull/8935)), with the hope that in
the future we might restart this effort with a better plan.

We do aim to revisit when napari's foundations are more solid, but for now,
`napari.utils.translations` is deprecated. If you have this code in your
codebase:

```
from napari.utils import translations as trans
```

please remove it. (For now, `trans._()` is a no-op.)



## New Features

- Implement fuzzy find for the command palette ([#8661](https://github.com/napari/napari/pull/8661))
- Implement Surface slicing with async request/response ([#8783](https://github.com/napari/napari/pull/8783))
- feat: add `new` label button to the labels controls ([#9215](https://github.com/napari/napari/pull/9215))
- Add builtin Wavefront OBJ to surfaces reader ([#9228](https://github.com/napari/napari/pull/9228))
- Add guided viewer tour ([#9290](https://github.com/napari/napari/pull/9290))
- Add plugin-defined settings through `ConfigurationContribution`s ([#9308](https://github.com/napari/napari/pull/9308))
- Inherit axis label, scale, unit, and translate from Xarrays ([#9316](https://github.com/napari/napari/pull/9316))
- Dynamically construct layer controls based on selection ([#9318](https://github.com/napari/napari/pull/9318))
- Wrap zarr in dask while projecting multi-scale to keep lazy behavior. ([#9408](https://github.com/napari/napari/pull/9408))

## Improvements

- MAINT Always raise error when `widget_name` given in `get_widget_contribution` ([#6544](https://github.com/napari/napari/pull/6544))
- Small refactor of point slicing + `rescale` projection mode to replace out_of_slice_display ([#8786](https://github.com/napari/napari/pull/8786))
- Refactor out-of-slice display for vectors into a projection mode ([#9032](https://github.com/napari/napari/pull/9032))
- [perf] Use chunk-aware loading for 2d multiscale ([#9145](https://github.com/napari/napari/pull/9145))
- move features table widget command to the Metadata menu ([#9231](https://github.com/napari/napari/pull/9231))
- fix: change the order of edge/face color and border ([#9232](https://github.com/napari/napari/pull/9232))
- Move the layer lock to group with link/unlink in layer list context menu ([#9235](https://github.com/napari/napari/pull/9235))
- fix: adjust the layout based on the hidden layers in grid ([#9244](https://github.com/napari/napari/pull/9244))
- Add multiscale projection `Image` ([#9252](https://github.com/napari/napari/pull/9252))
- Improve slider handle conspicuity by using theme's `current` color for active dim  ([#9255](https://github.com/napari/napari/pull/9255))
- publicly expose auto contrast limits ([#9271](https://github.com/napari/napari/pull/9271))
- update dims axis labels from layers axis labels ([#9282](https://github.com/napari/napari/pull/9282))
- Status bar coordinates as floats ([#9287](https://github.com/napari/napari/pull/9287))
- UX: Indicate web links in Help menu with ↗ (unicode character) ([#9291](https://github.com/napari/napari/pull/9291))
- New layer inherits axis labels when derived from another layer ([#9293](https://github.com/napari/napari/pull/9293))
- Adding histogram to surfaces ([#9306](https://github.com/napari/napari/pull/9306))
- Dynamically construct layer controls based on selection ([#9318](https://github.com/napari/napari/pull/9318))
- Scene model ([#9323](https://github.com/napari/napari/pull/9323))
- UX/UI: Bump the splitter (separator) size by 1px ([#9344](https://github.com/napari/napari/pull/9344))
- Add middle position to canvas overlays (in addition to top and bottom) ([#9374](https://github.com/napari/napari/pull/9374))
- Extend viewbox hiding behaviour on grid to non-1 stride values ([#9397](https://github.com/napari/napari/pull/9397))
- Restyle (vendored) jsonschema form widgets for Validation Errors ([#9401](https://github.com/napari/napari/pull/9401))

## Performance

- [perf] Use chunk-aware loading for 2d multiscale ([#9145](https://github.com/napari/napari/pull/9145))
- [perf] Defer PIL import in labels.py polygon mask ([#9205](https://github.com/napari/napari/pull/9205))
- [perf] Remove extra _update_theme call from Window init ([#9376](https://github.com/napari/napari/pull/9376))

## Bug Fixes

- [shapes] Preserve selection when changing ndisplay or slices and avoid stale highlights  ([#9059](https://github.com/napari/napari/pull/9059))
- Fix multiscale level selection for anisotropic data ([#9201](https://github.com/napari/napari/pull/9201))
- fix async colormap ([#9209](https://github.com/napari/napari/pull/9209))
- Fix cross layer in multiple viewer example to use line vectors. ([#9213](https://github.com/napari/napari/pull/9213))
- Do not update `current_properties` on Shapes selection changed  ([#9221](https://github.com/napari/napari/pull/9221))
- fix: action binding the `new-label` tooltips  with shortcuts ([#9230](https://github.com/napari/napari/pull/9230))
- fix: add minimum value to grid mode strides to allow negative strides ([#9236](https://github.com/napari/napari/pull/9236))
- fix(qt): dimension sliders need a minimum width ([#9254](https://github.com/napari/napari/pull/9254))
- fix(key_bindings): make navigation keys auto-repeat however they are bound ([#9257](https://github.com/napari/napari/pull/9257))
- Fix sync slicing when toggling to 3D with auto contrast ([#9263](https://github.com/napari/napari/pull/9263))
- Fix enum breaks from translations removal ([#9274](https://github.com/napari/napari/pull/9274))
- Fix auto_contrast button state initialization ([#9289](https://github.com/napari/napari/pull/9289))
- OS default behavior consistency : keep popups open when Return is pressed ([#9327](https://github.com/napari/napari/pull/9327))
- Vectors: make edge_color_mode = 'direct' actually leave the feature mapping ([#9333](https://github.com/napari/napari/pull/9333))
- Give cycle color mode a usable default color cycle on Points and Vectors ([#9334](https://github.com/napari/napari/pull/9334))
- Use magnitude of `Layer.scale` for points/shape handles ([#9339](https://github.com/napari/napari/pull/9339))
- fix(layer_utils): handle non-native byte order in convert_to_uint8 ([#9345](https://github.com/napari/napari/pull/9345))
- Vectors: redraw after edge color mode remaps colors ([#9353](https://github.com/napari/napari/pull/9353))
- Change `Dims` slider connection from `textChanged` to `textEdited` to stop wrong updates ([#9355](https://github.com/napari/napari/pull/9355))
- fix(vectors): stop edge-color controls mutating the layer and hiding mode changes ([#9364](https://github.com/napari/napari/pull/9364))
- Fix missing `f` for strings modified in #8935 ([#9371](https://github.com/napari/napari/pull/9371))
- Fix the built-in `nan` colormap setting `bad_color` instead of `nan_color` ([#9373](https://github.com/napari/napari/pull/9373))
- Fix dock widget positioning ([#9393](https://github.com/napari/napari/pull/9393))
- fix: reset `dims axis_labels` when layer labels return to default ([#9398](https://github.com/napari/napari/pull/9398))
- Fix background of contrast limit popup ([#9436](https://github.com/napari/napari/pull/9436))
- Fix connection of callbacks of settings changes ([#9437](https://github.com/napari/napari/pull/9437))
- Restore size policy for layerList docked widget ([#9447](https://github.com/napari/napari/pull/9447))
- Fix spherical projection ([#9453](https://github.com/napari/napari/pull/9453))
- Fix warning on new label button ([#9455](https://github.com/napari/napari/pull/9455))

## Deprecations

- Canvas model ([#8633](https://github.com/napari/napari/pull/8633))
- Small refactor of point slicing + `rescale` projection mode to replace out_of_slice_display ([#8786](https://github.com/napari/napari/pull/8786))
- Refactor out-of-slice display for vectors into a projection mode ([#9032](https://github.com/napari/napari/pull/9032))
- Refactor floating_axes/axes into canvas_axes/scene_axes ([#9363](https://github.com/napari/napari/pull/9363))

## Documentation

- Add info about color and intensity to surface guide ([docs#993](https://github.com/napari/docs/pull/993))
- Create a repository mapping with descriptions for the project ([docs#1007](https://github.com/napari/docs/pull/1007))
- Update homepage video for 0.8.0/0.9.0 changes ([docs#1070](https://github.com/napari/docs/pull/1070))
- Enhance contributing documentation with GitHub edit info ([docs#1075](https://github.com/napari/docs/pull/1075))
- Adding uv to getting started - installation ([docs#1076](https://github.com/napari/docs/pull/1076))
- make napari logo usage page ([docs#1077](https://github.com/napari/docs/pull/1077))
- Delete useless line ([docs#1078](https://github.com/napari/docs/pull/1078))
- Update auto-fill-labels loop video to extend end frame ([docs#1082](https://github.com/napari/docs/pull/1082))
-  NAP 10 migration events ([docs#1086](https://github.com/napari/docs/pull/1086))
- Improve tox usage documentation ([docs#1088](https://github.com/napari/docs/pull/1088))
- Bring several NAPs up to date ([docs#1091](https://github.com/napari/docs/pull/1091))
- Update dev instructions to use prek ([docs#1096](https://github.com/napari/docs/pull/1096))
- Add initial release notes for 0.9.0 ([docs#1097](https://github.com/napari/docs/pull/1097))
- Update release notes for napari 0.9.0rc1 ([docs#1099](https://github.com/napari/docs/pull/1099))
- Create stubs for npe2 `ConfigurationContribution` ([docs#1100](https://github.com/napari/docs/pull/1100))
- Fix building docs with PyQt6 ([docs#1102](https://github.com/napari/docs/pull/1102))
- Triage team and how-to docs ([docs#1106](https://github.com/napari/docs/pull/1106))
- Mention guided viewer tour ([docs#1107](https://github.com/napari/docs/pull/1107))
- Bring NAP 9 up to date ([docs#1108](https://github.com/napari/docs/pull/1108))
- docs: add list of built-in `sample images` ([docs#1111](https://github.com/napari/docs/pull/1111))
- Info about Xarray metadata inheritance ([docs#1113](https://github.com/napari/docs/pull/1113))
- Update `axis_labels` guidance for 0.9 ([docs#1117](https://github.com/napari/docs/pull/1117))
- Update handedness guide for 0.9 changes ([docs#1118](https://github.com/napari/docs/pull/1118))
- Update opengraph preview image for 0.9 with script ([docs#1119](https://github.com/napari/docs/pull/1119))
- Use a pages first image for OpenGraph Preview if there is one ([docs#1120](https://github.com/napari/docs/pull/1120))
- Final update release notes for 0.9.0 ([docs#1121](https://github.com/napari/docs/pull/1121))
- Update version switcher for 0.9.0 ([docs#1122](https://github.com/napari/docs/pull/1122))
- Update overlay docstrings ([#9081](https://github.com/napari/napari/pull/9081))
- Add stereo 3D viewer widget example ([#9219](https://github.com/napari/napari/pull/9219))
- Update recommended Python version in README from 3.11 to 3.13 ([#9223](https://github.com/napari/napari/pull/9223))
- Add (Euro)SciPy Sprint Authors to Citation ([#9234](https://github.com/napari/napari/pull/9234))
- Gallery example of using a background map ([#9245](https://github.com/napari/napari/pull/9245))
- Adding 4D sample data as a heat diffusion ([#9246](https://github.com/napari/napari/pull/9246))
- Add guided viewer tour ([#9290](https://github.com/napari/napari/pull/9290))
- deprecate setting dims axis labels in examples ([#9297](https://github.com/napari/napari/pull/9297))
- Load data from zarr in map example if contextily fails ([#9307](https://github.com/napari/napari/pull/9307))
- Example: combine points and vectors to build a 3D structured object ([#9340](https://github.com/napari/napari/pull/9340))
- Add projection mode to class Image attributes docstring ([#9378](https://github.com/napari/napari/pull/9378))
- Add docstrings for relocated models on ViewerModel ([#9430](https://github.com/napari/napari/pull/9430))

## Other Pull Requests

- Update label name in condition of label trigger build ([docs#1067](https://github.com/napari/docs/pull/1067))
- [pre-commit.ci] pre-commit autoupdate ([docs#1069](https://github.com/napari/docs/pull/1069))
- Update version switcher to point to 0.8.0 as stable ([docs#1071](https://github.com/napari/docs/pull/1071))
- Remove contributing text about adding translations ([docs#1081](https://github.com/napari/docs/pull/1081))
- Update info about Canvas and Scene models ([docs#1083](https://github.com/napari/docs/pull/1083))
- ci(dependabot): bump the github-actions group with 4 updates ([docs#1094](https://github.com/napari/docs/pull/1094))
- [pre-commit.ci] pre-commit autoupdate ([docs#1095](https://github.com/napari/docs/pull/1095))
- Add auto labeling as maintenance PR that edit `.pre-commit-config.yml` ([docs#1098](https://github.com/napari/docs/pull/1098))
- [pre-commit.ci] pre-commit autoupdate ([docs#1101](https://github.com/napari/docs/pull/1101))
- Use PyQt6 when build docs on circleci ([docs#1104](https://github.com/napari/docs/pull/1104))
- fix(typing): add type hints and fix mypy errors in `qt_viewer.py` ([#9076](https://github.com/napari/napari/pull/9076))
- fix(typing): add typing and fix mypy error in `qt_mode_buttons.py` ([#9110](https://github.com/napari/napari/pull/9110))
- Use shared version of label clean workflow ([#9116](https://github.com/napari/napari/pull/9116))
- Remove `qt_dict_table.py` as its unused  ([#9119](https://github.com/napari/napari/pull/9119))
- fix(typing): add typing and fix mypy error in `qt_face_color.py`  ([#9123](https://github.com/napari/napari/pull/9123))
- fix(typing): add typing and fix mypy error in `_base_item_model.py` ([#9126](https://github.com/napari/napari/pull/9126))
- fix(typing): add typing and fix mypy error in `_base_item_view.py` ([#9127](https://github.com/napari/napari/pull/9127))
- fix(typing): add typing and fix mypy error in `qt_axis_model.py` ([#9167](https://github.com/napari/napari/pull/9167))
- fix(typing): add typing and fix mypy error in `qt_list_model.py` ([#9169](https://github.com/napari/napari/pull/9169))
- fix(typing): add typing and fix mypy error in `confirm_close_dialog.py` ([#9170](https://github.com/napari/napari/pull/9170))
- typing: remove `experimental.qt_poll.py` from mypy ignore ([#9171](https://github.com/napari/napari/pull/9171))
- Add hint for missing qt6-wayland when conda Qt cannot start napari on Wayland ([#9174](https://github.com/napari/napari/pull/9174))
- fix(typing): add typing and fix mypy error in `qt_border_color.py` ([#9179](https://github.com/napari/napari/pull/9179))
- fix(typing): add typing and fix mypy error in `qt_current_size_slider.py` ([#9180](https://github.com/napari/napari/pull/9180))
- fix(typing): add typing and fix mypy error in `qt_edge_color.py` ([#9183](https://github.com/napari/napari/pull/9183))
- fix(typing): resolve mypy errors for `qt_widget_controls_base` ([#9185](https://github.com/napari/napari/pull/9185))
- Update `coverage`, `dask`, `hypothesis`, `imageio`, `matplotlib`, `platformdirs`, `tifffile`, `tqdm`, `virtualenv`, `xarray` ([#9194](https://github.com/napari/napari/pull/9194))
- [pre-commit.ci] pre-commit autoupdate ([#9197](https://github.com/napari/napari/pull/9197))
- Update dev dependencies of napari ([#9211](https://github.com/napari/napari/pull/9211))
- Add ``example`` to ``allowed_labels`` in ``check_labels`` job of ``label_and_milestone_checker.yml`` workflow ([#9214](https://github.com/napari/napari/pull/9214))
- TST: parameterizing with iterables is deprecated in pytest ([#9217](https://github.com/napari/napari/pull/9217))
- Make tensorstore optional dependency of `test_labels` again ([#9220](https://github.com/napari/napari/pull/9220))
- Remove unnecessary ``FutureWarning`` ignore for ``test_layers_save_svg`` ([#9225](https://github.com/napari/napari/pull/9225))
- Disable part of test matrix to increase runner availability during sprints/hackathon ([#9226](https://github.com/napari/napari/pull/9226))
- fix(typing): add typing and fix mypy error in `qt_brush_size_slider.py` ([#9238](https://github.com/napari/napari/pull/9238))
- fix(typing): add typing and fix mypy error in `qt_color_mode_combobox.py` ([#9239](https://github.com/napari/napari/pull/9239))
- fix(typing): add typing and fix mypy error in `_evented_dict.py` ([#9240](https://github.com/napari/napari/pull/9240))
- Disable interaction with vispy.gloo in test_vispy_labels_polygon_overlay ([#9264](https://github.com/napari/napari/pull/9264))
- ci(dependabot): bump the actions group across 1 directory with 11 updates ([#9265](https://github.com/napari/napari/pull/9265))
- Remove missing translations GH action ([#9266](https://github.com/napari/napari/pull/9266))
- Asynchronous loading text fix ([#9267](https://github.com/napari/napari/pull/9267))
- Pin octokit to tag, not use main branch ([#9268](https://github.com/napari/napari/pull/9268))
- Fix typing problem by provide strict version of _BaseEventedItemModel.getItem ([#9272](https://github.com/napari/napari/pull/9272))
- Fix test failures when running napari in tiling window managers by forcing the screenshot size. ([#9284](https://github.com/napari/napari/pull/9284))
- Enable coverage annotation in PR changes view ([#9288](https://github.com/napari/napari/pull/9288))
- Update `certifi`, `hypothesis`, `pandas`, `platformdirs`, `tqdm`, `virtualenv` ([#9295](https://github.com/napari/napari/pull/9295))
- [pre-commit.ci] pre-commit autoupdate ([#9303](https://github.com/napari/napari/pull/9303))
- Simplify tox configuration ([#9309](https://github.com/napari/napari/pull/9309))
- Update latlon with map example to follow PEP8 ([#9312](https://github.com/napari/napari/pull/9312))
- Remove `make_napari_viewer` from `test_vispy_labels_polygon_overlay` ([#9314](https://github.com/napari/napari/pull/9314))
- Revert "Disable part of test matrix to increase runner availability during sprints/hackathon (#9226)" ([#9348](https://github.com/napari/napari/pull/9348))
- Drop colormap translation dictionaries ([#9358](https://github.com/napari/napari/pull/9358))
- Use LF for all files in gitattributes ([#9359](https://github.com/napari/napari/pull/9359))
- Stop window-owned worker threads when the interpreter shuts down ([#9367](https://github.com/napari/napari/pull/9367))
- Change tox and codecov configuration to simplify local reports ([#9368](https://github.com/napari/napari/pull/9368))
- Update `coverage`, `hypothesis`, `platformdirs`, `pydantic-settings`, `tensorstore`, `virtualenv` ([#9380](https://github.com/napari/napari/pull/9380))
- chore: remove QRangeSliderPopup ([#9382](https://github.com/napari/napari/pull/9382))
- chore: remove qt_size_preview module ([#9385](https://github.com/napari/napari/pull/9385))
- [pre-commit.ci] pre-commit autoupdate ([#9386](https://github.com/napari/napari/pull/9386))
- Fix handling exception when go to fallback source of data in map example ([#9388](https://github.com/napari/napari/pull/9388))
- Update build docs on circleci to PyQt6 and update python ([#9390](https://github.com/napari/napari/pull/9390))
- Fix broken shapes due to incomplete merge ([#9399](https://github.com/napari/napari/pull/9399))
- Bump npe2 minimum for ConfigurationContribution ([#9400](https://github.com/napari/napari/pull/9400))
- Update `hypothesis`, `numpy`, `platformdirs`, `pygments`, `pyside6`, `pytest-rerunfailures`, `tifffile`, `virtualenv` ([#9414](https://github.com/napari/napari/pull/9414))
- Improve qproviders testing by remove part of make_napari_viewer ([#9416](https://github.com/napari/napari/pull/9416))
- [pre-commit.ci] pre-commit autoupdate ([#9420](https://github.com/napari/napari/pull/9420))
- Bump npe2 dependency and constraints to 0.9.0 ([#9422](https://github.com/napari/napari/pull/9422))
- Fix Points.symbol type annotation ([#9423](https://github.com/napari/napari/pull/9423))
- Follow-up: Rename PluginPreferences to PluginSettings ([#9424](https://github.com/napari/napari/pull/9424))
- Fix comprehensive test configuration for examples job ([#9426](https://github.com/napari/napari/pull/9426))
- Delay deprecation of qt_viewer and private access to 0.10.0 ([#9433](https://github.com/napari/napari/pull/9433))
- Update `lxml`, `pyqt6`, `pyqt6-qt6`, `scipy`, `tifffile` ([#9443](https://github.com/napari/napari/pull/9443))


## 31 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) ([docs](https://github.com/napari/docs/commits?author=Aniketsy))  - @Aniketsy
- [Anwai Archit](https://github.com/napari/napari/commits?author=anwai98) - @anwai98
- [Arne Defauw](https://github.com/napari/napari/commits?author=ArneDefauw) - @ArneDefauw +
- [Aroj Hada](https://github.com/napari/napari/commits?author=ArozHada) - @ArozHada +
- [BadPrograms](https://github.com/napari/napari/commits?author=BadPrograms) - @BadPrograms +
- [Bas Bloemsaat](https://github.com/napari/napari/commits?author=basbloemsaat) - @basbloemsaat +
- [Carlos Mario Rodriguez Reza](https://github.com/napari/napari/commits?author=carlosmariorr) - @carlosmariorr
- [Christophe Creeten](https://github.com/napari/napari/commits?author=ccreeten) - @ccreeten +
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) - @DragaDoncila
- [Edouard Coussoux](https://github.com/napari/napari/commits?author=ecoussoux-ansys) - @ecoussoux-ansys +
- [Filippo  Maria Castelli, PhD](https://github.com/napari/napari/commits?author=filippocastelli) - @filippocastelli +
- [girochat](https://github.com/napari/napari/commits?author=girochat) - @girochat +
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) - @jacopoabramo
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni))  - @jni
- [Kamil Kania](https://github.com/napari/napari/commits?author=Grzyb33k) - @Grzyb33k +
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag))  - @brisvag
- [Lucy Liu](https://github.com/napari/napari/commits?author=lucyleeow) - @lucyleeow
- [Margot Chazotte](https://github.com/napari/napari/commits?author=MargotCh) - @MargotCh
- [Matthias Schabel](https://github.com/napari/napari/commits?author=matthiasschabel) - @matthiasschabel +
- [michalslabs](https://github.com/napari/napari/commits?author=michalslabs) ([docs](https://github.com/napari/docs/commits?author=michalslabs))  - @michalslabs +
- [Mridul Seth](https://github.com/napari/napari/commits?author=MridulS) - @MridulS +
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Revathy Venugopal](https://github.com/napari/napari/commits?author=Revathyvenugopal162) - @Revathyvenugopal162 +
- [Samuel Le Meur-Diebolt](https://github.com/napari/napari/commits?author=sdiebolt) ([docs](https://github.com/napari/docs/commits?author=sdiebolt))  - @sdiebolt
- [Sara Czasak](https://github.com/napari/docs/commits?author=sara-czasak) - @sara-czasak +
- [Sébastien Morais](https://github.com/napari/napari/commits?author=SMoraisAnsys) - @SMoraisAnsys +
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [Venkateswarlu Nagineni](https://github.com/napari/napari/commits?author=VenkateswarluNagineni) - @VenkateswarluNagineni +
- [Wouter-Michiel Vierdag](https://github.com/napari/docs/commits?author=melonora) - @melonora
- [Zuzana Čočková](https://github.com/napari/napari/commits?author=cockovaz) - @cockovaz

## 25 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) ([docs](https://github.com/napari/docs/commits?author=Aniketsy))  - @Aniketsy
- [Anwai Archit](https://github.com/napari/napari/commits?author=anwai98) - @anwai98 +
- [arbor](https://github.com/napari/docs/commits?author=arbormoss) - @arbormoss +
- [Arne Defauw](https://github.com/napari/napari/commits?author=ArneDefauw) - @ArneDefauw +
- [Carlos Mario Rodriguez Reza](https://github.com/napari/napari/commits?author=carlosmariorr) - @carlosmariorr
- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) - @DragaDoncila
- [Filippo  Maria Castelli, PhD](https://github.com/napari/napari/commits?author=filippocastelli) - @filippocastelli +
- [girochat](https://github.com/napari/napari/commits?author=girochat) - @girochat +
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Ian Hunt-Isaak](https://github.com/napari/docs/commits?author=ianhi) - @ianhi +
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) - @jacopoabramo
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni))  - @jni
- [Justus Magin](https://github.com/napari/docs/commits?author=keewis) - @keewis +
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag))  - @brisvag
- [Margot Chazotte](https://github.com/napari/napari/commits?author=MargotCh) - @MargotCh
- [Matthias Schabel](https://github.com/napari/napari/commits?author=matthiasschabel) - @matthiasschabel +
- [Maxime Rey](https://github.com/napari/docs/commits?author=MaxJPRey) - @MaxJPRey +
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Samuel Le Meur-Diebolt](https://github.com/napari/napari/commits?author=sdiebolt) ([docs](https://github.com/napari/docs/commits?author=sdiebolt))  - @sdiebolt +
- [Sara Czasak](https://github.com/napari/docs/commits?author=sara-czasak) - @sara-czasak +
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [Wouter-Michiel Vierdag](https://github.com/napari/docs/commits?author=melonora) - @melonora
- [Zuzana Čočková](https://github.com/napari/napari/commits?author=cockovaz) - @cockovaz
