# napari 0.10.0
⚠️ *Note: these release notes are still in draft while 0.10.0rc0 is in prerelease testing.* ⚠️

*Mon, Oct 26, 2026*

We're happy to announce the release of napari 0.10.0!
napari is a fast, interactive, multi-dimensional image viewer for Python.
It's designed for browsing, annotating, and analyzing large multi-dimensional
images. It's built on top of Qt (for the GUI), vispy (for performant GPU-based
rendering), and the scientific Python stack (numpy, scipy).

For more information, examples, and documentation, please visit our website,
https://napari.org.

napari follows [EffVer (Intended Effort Versioning)](https://effver.org/); this is a **Macro** release containing awesome new features, but may require dedication of some significant time when upgrading projects to use this version.

## Highlights

This release contains several new features and many enhancements and bugfixes. We also welcomed a ton of new contributors to the community!

### Grid Lines, axes and ticks
This features has been requested for years, and we finally managed to get a version that we're happy with! With [#7827](https://github.com/napari/napari/pull/7827), you can now use `viewer.scene.overlays.grid_lines` to display a grid on your data, including unit-aware tick marks and axis labels! Try it out:

```py
import napari

viewer = napari.Viewer(ndisplay=3)
layers = viewer.open_sample('napari', 'cells3d')

for layer in layers:
    layer.units = 'nm'
    layer.axis_labels = ['z', 'y', 'x']

viewer.scene.overlays.grid_lines.visible = True
```

![screenshot of the viewer with the grid_lines overlay enabled, showing the grid with axis labels and units, and axis ticks](https://github.com/user-attachments/assets/54993979-4774-4e66-87fb-d1bfcb27fb98)

### Colorful names

Another long-requested feature: displaying [layer names](https://napari.org/stable/getting_started/layers.html#layer-overlays) on the canvas now has colormap-aware colors ([#9598](https://github.com/napari/napari/pull/9598))! This comes with some fancy machinery to ensure that colors are shifted enough to be always readable.

```py
import napari

viewer = napari.Viewer()
layers = viewer.open_sample('napari', 'lily')

for layer in layers:
    layer.name_overlay.visible = True

viewer.canvas.grid.enabled = True
viewer.canvas.grid.stride = 2
```

![screenshot of the viewer with layer names overlays enabled, colored based on each layer's colormap](https://github.com/user-attachments/assets/629e63f5-381a-4a92-ba17-de02fa408edf)

### Cursor crosshair

Ever use the [grid mode](https://napari.org/stable/gallery/grid_mode.html#grid-mode) for your multichannel data but then struggle to know where you're clicking? Struggle no more! You can now enable the new crosshair overlay ([#8017](https://github.com/napari/napari/pull/8017)) to always locate your exact position in every viewbox.

![screenshot of the viewer with grid-mode and the crosshair enabled](https://github.com/user-attachments/assets/cff866f3-fa28-42a8-a8df-94062b118573)

### Default dock area and tabify for plugin dock widgets

Some plugin dock widgets are wider than they are tall, fitting poorly on the right-side dock and forcing users to manually move the widget to a different area every time on first launch. With [#9526](https://github.com/napari/napari/pull/9526)) and ([#9707](https://github.com/napari/napari/pull/9707), you can now specify a default dock area and tabify behaviour for a dock widget contribution, which will prevent the need for this manual rearranging step:

```yaml
  widgets:
    - command: example-plugin.my_widget
      display_name: My wide widget
      default_dock_area: bottom
      tabify: True
```


- Remove `PyQt5` support, part 1 ([#9650](https://github.com/napari/napari/pull/9650))

## New Features

- Add grid overlay ([#7827](https://github.com/napari/napari/pull/7827))
- 2D/3D Crosshair overlay for cursor position ([#8017](https://github.com/napari/napari/pull/8017))
- Allow plugins widgets to specify dock area ([#9526](https://github.com/napari/napari/pull/9526))
- Add tabify default for plugin widgets ([#9707](https://github.com/napari/napari/pull/9707))

## Breaking Changes

### Dropped support for Qt5 backend

We started warning about this in release v0.8.0; it is now time to fully drop support of Qt5! Qt5 has reached End Of Life on the 26th of May 2025. We migrated our bundle to Qt6 (PySide6) a year ago.
[#9650](https://github.com/napari/napari/pull/9650) is effectively removing PyQt5 support. PySide2 support was already removed in release [0.7.0](https://github.com/napari/napari/pull/8450), so we are now fully on Qt6!

### Tidied up mouse callbacks

Custom mouse callbacks can be [defined via generators](https://napari.org/stable/howtos/extending/connecting_events.html#listening-for-mouse-events). Some quirks with this machinery have been smoothed out and some bugs fixed ([#9513](https://github.com/napari/napari/pull/9513)); this might cause some callbacks to no longer work as before. In principle, this should only affect callbacks that relied on buggy behavior, but please make sure to check if your old callbacks are still working, and open an issue on the napari repository if that's not the case.

A notable change is that `mouse_move` callbacks previously did not work during `drag`, but now they do. If that's not what you want, guard your callback with `if not event.is_dragging`!

### Removed `scale_bar.unit`

After deprecating it, we're finally removing this field completely ([#9218](https://github.com/napari/napari/pull/9218)). Now the only way to set the unit on the scale bar is by [setting units on the layers themselves](https://napari.org/stable/guides/units.html#scale-and-units-live-on-layers)!

### Unified default font sizes

We previously hardcoded default font sizes for all visuals in the canvas. Now ([#8667](https://github.com/napari/napari/pull/8667), [#9524](https://github.com/napari/napari/pull/9524)), they respond to the global application settings (`Preferences > Appearance > Font size`) unless the font size is explicitly set for that specific model (by default it will be `None`).

So if you use the `scale_bar`, or `Points.text` or other layers and overlays that display text and you don't like the new default, make sure to set your font size explicitly!



## Improvements

- Use global font size for overlays ([#8667](https://github.com/napari/napari/pull/8667))
- Prepare track columns data ([#9015](https://github.com/napari/napari/pull/9015))
- Add single-plane projection for 3D points layers ([#9229](https://github.com/napari/napari/pull/9229))
- Deliver key auto-repeat by default, suppressing only hold-semantics bindings ([#9361](https://github.com/napari/napari/pull/9361))
- UI: apply tabular numerals to embedded status bars ([#9407](https://github.com/napari/napari/pull/9407))
- Performance [Shapes]: don't draw empty sub-visuals ([#9418](https://github.com/napari/napari/pull/9418))
- Clean up status for grid/multiple selection ([#9431](https://github.com/napari/napari/pull/9431))
- Use canvas size to estimate scale_bar target size ([#9474](https://github.com/napari/napari/pull/9474))
- Fix fuzzy finding and command highlighting in palette ([#9503](https://github.com/napari/napari/pull/9503))
- Implement canvas_to_world on the napari side ([#9517](https://github.com/napari/napari/pull/9517))
- Use global font size for layers ([#9524](https://github.com/napari/napari/pull/9524))
- Add option to declare deprecated property using descriptor ([#9527](https://github.com/napari/napari/pull/9527))
- Add `RenamedWarningEmitter` and `DependentEmitter` ([#9529](https://github.com/napari/napari/pull/9529))
- Keep reader and writer commands out of the command palette ([#9582](https://github.com/napari/napari/pull/9582))
- Add warning icon if experimental setting (especially async) is enabled ([#9590](https://github.com/napari/napari/pull/9590))
- Draw the layer name overlay in the layer's colormap color ([#9598](https://github.com/napari/napari/pull/9598))
- Add `locked_data_level` as an argument for `Labels` ([#9603](https://github.com/napari/napari/pull/9603))
- Make the layer name overlay bold ([#9616](https://github.com/napari/napari/pull/9616))
- Add Grid toggle action ([#9646](https://github.com/napari/napari/pull/9646))
- Fix reporting of Qt version in `napari --info` ([#9648](https://github.com/napari/napari/pull/9648))
- Use vispy text scaling for smooth text calculations ([#9735](https://github.com/napari/napari/pull/9735))
- fix: `axis_labels` is no longer set in the viewer dims after layer creation in `imshow` ([#9749](https://github.com/napari/napari/pull/9749))
- Crosshair Overlay colored lines like scene/canvas axes ([#9755](https://github.com/napari/napari/pull/9755))

## Performance

- Performance [Shapes]: don't draw empty sub-visuals ([#9418](https://github.com/napari/napari/pull/9418))
- [multiscale, perf] Combine crop and projection in _project_thick_slice to prevent premature materialization. ([#9537](https://github.com/napari/napari/pull/9537))
- Rasterize shapes to pixel indices instead of full masks ([#9583](https://github.com/napari/napari/pull/9583))
- PERF: Speed up grid mode with many layers ([#9633](https://github.com/napari/napari/pull/9633))
- [perf] Remove duplicate calls in VispyImageLayer (already done in super()) ([#9697](https://github.com/napari/napari/pull/9697))
- [perf] Defer the expensive import from scipy.spatial.transform until ndisplay=3 ([#9746](https://github.com/napari/napari/pull/9746))
- Effectively revert PR #8725 so viewer shows when files are opened from CLI ([#9747](https://github.com/napari/napari/pull/9747))

## Bug Fixes

- fix(shapes): pick shapes on a fractional slice key ([#9394](https://github.com/napari/napari/pull/9394))
- Fix remove() mid-draw when removing shapes shifts the drawn shape's index ([#9441](https://github.com/napari/napari/pull/9441))
- Fix logger from console 2 ([#9465](https://github.com/napari/napari/pull/9465))
- Fix fuzzy finding and command highlighting in palette ([#9503](https://github.com/napari/napari/pull/9503))
- Fix and unify mouse callback generator machinery ([#9513](https://github.com/napari/napari/pull/9513))
- fix(qt): let a dock widget's minimum size shrink again when its content does ([#9532](https://github.com/napari/napari/pull/9532))
- Fix `Shapes.data = (data, shape_type)` failing when the shape count changes ([#9564](https://github.com/napari/napari/pull/9564))
- Keep colormap, contrast limits and blending when a tiled image changes tile count ([#9565](https://github.com/napari/napari/pull/9565))
- Fix Convert to Labels for shapes in 3D view and with rolled axes ([#9580](https://github.com/napari/napari/pull/9580))
- Fix color of labels in colorpicker ([#9599](https://github.com/napari/napari/pull/9599))
- Fix a few font sizes, adjust some padding ([#9615](https://github.com/napari/napari/pull/9615))
- Measure text at render size for even overlay padding ([#9617](https://github.com/napari/napari/pull/9617))
- Fix font clipping in dock widget titles ([#9619](https://github.com/napari/napari/pull/9619))
- Fix position and clipping of dims slider label widgets ([#9620](https://github.com/napari/napari/pull/9620))
- Treat a colormap list of only None like a single None in add_image ([#9624](https://github.com/napari/napari/pull/9624))
- Limit the lasso_vertex_distance preference spin box to 1-50 ([#9626](https://github.com/napari/napari/pull/9626))
- Fix SlowMemoryStore latency being ignored on zarr 3 ([#9628](https://github.com/napari/napari/pull/9628))
- PERF: Speed up grid mode with many layers ([#9633](https://github.com/napari/napari/pull/9633))
- Fix Shapes keeping the cursor vertex when switching mode mid-draw ([#9637](https://github.com/napari/napari/pull/9637))
- Fix degenerate case of view direction ([#9670](https://github.com/napari/napari/pull/9670))
- Fix stale perfmon callable reference ([#9671](https://github.com/napari/napari/pull/9671))
- Emit layer.events.loaded again when the loaded state changes ([#9689](https://github.com/napari/napari/pull/9689))
- fix: accept None for Cursor.viewbox over an empty grid viewbox ([#9696](https://github.com/napari/napari/pull/9696))
- Fix polygon lasso error when Enter or Escape ends a drag ([#9699](https://github.com/napari/napari/pull/9699))
- fix: timeout of notifications in a stack and after regain of window focus (#9560) ([#9731](https://github.com/napari/napari/pull/9731))
- Fix screenshot with scale!=1 ([#9738](https://github.com/napari/napari/pull/9738))
- Effectively revert PR #8725 so viewer shows when files are opened from CLI ([#9747](https://github.com/napari/napari/pull/9747))
- fix: `axis_labels` is no longer set in the viewer dims after layer creation in `imshow` ([#9749](https://github.com/napari/napari/pull/9749))
- Fix `canvas_to_world` calculation with grid spacing ([#9752](https://github.com/napari/napari/pull/9752))
- fix: preserve thick-slice margins under scale flips ([#9759](https://github.com/napari/napari/pull/9759))
- fix: update return_annotation in create_func to use cls_name rather than cls ([#9765](https://github.com/napari/napari/pull/9765))

## Documentation

- Document single-plane projection for points layer ([docs#1074](https://github.com/napari/docs/pull/1074))
- Prepare tracks data docs ([docs#1132](https://github.com/napari/docs/pull/1132))
- Typing Guide: Tips and Resources ([docs#1135](https://github.com/napari/docs/pull/1135))
- Deprecation policy using time-based windows for removal ([docs#1138](https://github.com/napari/docs/pull/1138))
- Rumdl: Enable more MD rules that require edits by hand (not autofixable) ([docs#1142](https://github.com/napari/docs/pull/1142))
- Rumdl: Reflow all the docs to 79-char length ([docs#1144](https://github.com/napari/docs/pull/1144))
- Clarify mouse event properties in the `3D interactivity guide` ([docs#1147](https://github.com/napari/docs/pull/1147))
- Add missed PRs to 0.9.2 release notes. ([docs#1151](https://github.com/napari/docs/pull/1151))
- docs: suggest refined github ([docs#1155](https://github.com/napari/docs/pull/1155))
- Move past workshop pages to napari.org/workshops ([docs#1156](https://github.com/napari/docs/pull/1156))
- Move Kyle Harrington to Emeritus Steering Council ([docs#1160](https://github.com/napari/docs/pull/1160))
- Fix failing docs build due to `profiling` clash ([docs#1161](https://github.com/napari/docs/pull/1161))
- Create release notes for v0.10.0a0 ([docs#1164](https://github.com/napari/docs/pull/1164))
- Add release notes for v0.10.0rc0 ([docs#1165](https://github.com/napari/docs/pull/1165))
- Reorganize and spruce up the community pages ([docs#1168](https://github.com/napari/docs/pull/1168))
- Add icons to persistent sidebar links ([docs#1169](https://github.com/napari/docs/pull/1169))
- Missing overlays in docs ([docs#1173](https://github.com/napari/docs/pull/1173))
- Add info in tooltips for projection mode ([#9497](https://github.com/napari/napari/pull/9497))
- Clarify in `LayerList` docstring when the `changed` event is emitted ([#9504](https://github.com/napari/napari/pull/9504))

## Other Pull Requests

- ci(dependabot): bump the github-actions group across 1 directory with 2 updates ([docs#1125](https://github.com/napari/docs/pull/1125))
- Rumdl: Add baseline config and format docs/ ([docs#1140](https://github.com/napari/docs/pull/1140))
- Rumdl: Parse and Format code blocks with ruff ([docs#1143](https://github.com/napari/docs/pull/1143))
- Move pre-fetch data step to begin of prep_docs.py ([docs#1148](https://github.com/napari/docs/pull/1148))
- Add missed directories to circelci cache ([docs#1149](https://github.com/napari/docs/pull/1149))
- Post rendered docs link as a sticky PR comment ([docs#1159](https://github.com/napari/docs/pull/1159))
- [pre-commit.ci] pre-commit autoupdate ([docs#1163](https://github.com/napari/docs/pull/1163))
- Add write permissions for a statuses in label trigger build for docs ([docs#1167](https://github.com/napari/docs/pull/1167))
- [pre-commit.ci] pre-commit autoupdate ([docs#1172](https://github.com/napari/docs/pull/1172))
- fix(typing): add typing and fix mypy error in `qt_tracks_controls.py` ([#9176](https://github.com/napari/napari/pull/9176))
- fix (typing): add typing and fix mypy error in `qt_symbol_combobox.py` ([#9182](https://github.com/napari/napari/pull/9182))
- chore: remove ChunkLoader dead test code  ([#9381](https://github.com/napari/napari/pull/9381))
- Fix labeler action ([#9458](https://github.com/napari/napari/pull/9458))
- Remove deprecated `napari.utils.indexing` module ([#9505](https://github.com/napari/napari/pull/9505))
- TYP: add type hints in `style_encoding.py` ([#9544](https://github.com/napari/napari/pull/9544))
- TYP: add type hints in `color_manager.py` ([#9547](https://github.com/napari/napari/pull/9547))
- TYP: add type hints in `qt_depiction_control.py` ([#9551](https://github.com/napari/napari/pull/9551))
- TYP: add type hints in `qt_contour_spinbox.py` ([#9552](https://github.com/napari/napari/pull/9552))
- TYP: add type hints in `qt_viewer_status_bar.py` ([#9554](https://github.com/napari/napari/pull/9554))
- Change Qt backend used in type testing from PyQt6 to PySide6 ([#9570](https://github.com/napari/napari/pull/9570))
- Move autoswap buffers from experimental to advanced settings ([#9589](https://github.com/napari/napari/pull/9589))
- Add missed directories to circelci cache ([#9593](https://github.com/napari/napari/pull/9593))
- Update `coverage`, `fsspec`, `hypothesis`, `imageio`, `napari-resources`, `pandas`, `platformdirs`, `pytest-rerunfailures`, `tifffile`, `virtualenv`, `wrapt`, `xarray` ([#9594](https://github.com/napari/napari/pull/9594))
- chore: remove unused user keymap ([#9602](https://github.com/napari/napari/pull/9602))
- ci(dependabot): bump the actions group across 1 directory with 9 updates ([#9613](https://github.com/napari/napari/pull/9613))
- TYP: annotate `color_kwargs` as dict[str, Any] in color_manager.py ([#9618](https://github.com/napari/napari/pull/9618))
- Update `hypothesis`, `platformdirs`, `virtualenv` ([#9625](https://github.com/napari/napari/pull/9625))
- [pre-commit.ci] pre-commit autoupdate ([#9634](https://github.com/napari/napari/pull/9634))
- TYP: add type hints in `qt_welcome.py` ([#9642](https://github.com/napari/napari/pull/9642))
- TYP: add type hints in `base.py` ([#9644](https://github.com/napari/napari/pull/9644))
- TYP: add type hints in `qt_viewer_buttons.py` ([#9649](https://github.com/napari/napari/pull/9649))
- TYP: add type hints in `qt_logger.py` ([#9655](https://github.com/napari/napari/pull/9655))
- Make Shapes path and polygon tests deterministic ([#9656](https://github.com/napari/napari/pull/9656))
- Removed obsolete cells3d monkeypatch in test_examples.py ([#9658](https://github.com/napari/napari/pull/9658))
- typing: Enable checking presence of type annotation in functions ([#9662](https://github.com/napari/napari/pull/9662))
- Use mocked plugin manager with sample plugin from npe2 ([#9672](https://github.com/napari/napari/pull/9672))
- TYP: add type hints in `window.py` ([#9678](https://github.com/napari/napari/pull/9678))
- TYP: add type hints in `theme.py` and `notebook_display.py` ([#9683](https://github.com/napari/napari/pull/9683))
- TYP: add simple return annotations generated by `pyrefly infer` ([#9684](https://github.com/napari/napari/pull/9684))
- Remove Qt5 from --pre tests ([#9687](https://github.com/napari/napari/pull/9687))
- Update `hypothesis`, `imageio`, `numpy`, `platformdirs`, `pydantic`, `pyside6`, `toolz`, `virtualenv` ([#9692](https://github.com/napari/napari/pull/9692))
- Add Lundy Bernard to CITATION.cff ([#9695](https://github.com/napari/napari/pull/9695))
- Add layout tests for single-widget rows in layer controls ([#9704](https://github.com/napari/napari/pull/9704))
- Update release checklist ([#9705](https://github.com/napari/napari/pull/9705))
- Fix failing test by wait on worker clean ([#9710](https://github.com/napari/napari/pull/9710))
- TYP: add type hints in `io.py` ([#9715](https://github.com/napari/napari/pull/9715))
- TYP: add type hints in `_proxies.py` , `_migrations.py` , `_fields.py` and `_base.py` ([#9719](https://github.com/napari/napari/pull/9719))
- Change all `exec_` to `exec` for Qt objects ([#9725](https://github.com/napari/napari/pull/9725))
- Update links in doc strings to point to the Qt6 documentation. ([#9726](https://github.com/napari/napari/pull/9726))
- Apply `QCheckBox.stateChanged` to `QCheckBox.toggled` migration ([#9727](https://github.com/napari/napari/pull/9727))
- Update `certifi`, `hypothesis`, `npe2`, `pillow`, `platformdirs`, `pydantic-settings`, `superqt`, `tifffile`, `virtualenv`, `wrapt` ([#9736](https://github.com/napari/napari/pull/9736))
- Use QEnumComboBox for depiction control ([#9742](https://github.com/napari/napari/pull/9742))


## 23 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aditi Juneja](https://github.com/napari/napari/commits?author=Schefflera-Arboricola) - @Schefflera-Arboricola +
- [Aman kumar](https://github.com/napari/napari/commits?author=ghostiee-11) - @ghostiee-11 +
- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) ([docs](https://github.com/napari/docs/commits?author=Aniketsy))  - @Aniketsy
- [Bruno Pannunzio](https://github.com/napari/napari/commits?author=bruno-pannunzio) - @bruno-pannunzio +
- [Carlos Mario Rodriguez Reza](https://github.com/napari/napari/commits?author=carlosmariorr) - @carlosmariorr
- [Chirag Anand](https://github.com/napari/napari/commits?author=chirag-433) - @chirag-433 +
- [Clément Caporal](https://github.com/napari/napari/commits?author=ClementCaporal) - @ClementCaporal
- [Felipe Cybis Pereira](https://github.com/napari/napari/commits?author=FelipeCybis) - @FelipeCybis +
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) ([docs](https://github.com/napari/docs/commits?author=jacopoabramo))  - @jacopoabramo
- [KRiedmiller](https://github.com/napari/napari/commits?author=KRiedmiller) - @KRiedmiller +
- [lettyz3](https://github.com/napari/napari/commits?author=lettyz3) - @lettyz3 +
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag))  - @brisvag
- [Lundy Bernard](https://github.com/napari/napari/commits?author=lundybernard) ([docs](https://github.com/napari/docs/commits?author=lundybernard))  - @lundybernard +
- [Lyinno](https://github.com/napari/napari/commits?author=Lyinno) - @Lyinno +
- [Matthias Schabel](https://github.com/napari/napari/commits?author=matthiasschabel) - @matthiasschabel
- [Mridul Seth](https://github.com/napari/napari/commits?author=MridulS) - @MridulS
- [Omkar Kabde](https://github.com/napari/napari/commits?author=omkar-334) ([docs](https://github.com/napari/docs/commits?author=omkar-334))  - @omkar-334
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Samuel Le Meur-Diebolt](https://github.com/napari/napari/commits?author=sdiebolt) - @sdiebolt
- [Sesan](https://github.com/napari/napari/commits?author=Olusesan) ([docs](https://github.com/napari/docs/commits?author=Olusesan))  - @Olusesan
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [ymka](https://github.com/napari/napari/commits?author=i-ymka) - @i-ymka +

## 18 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aman kumar](https://github.com/napari/napari/commits?author=ghostiee-11) - @ghostiee-11 +
- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) ([docs](https://github.com/napari/docs/commits?author=Aniketsy))  - @Aniketsy
- [Bruno Pannunzio](https://github.com/napari/napari/commits?author=bruno-pannunzio) - @bruno-pannunzio +
- [Carlos Mario Rodriguez Reza](https://github.com/napari/napari/commits?author=carlosmariorr) - @carlosmariorr
- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Caroline Malin-Mayor](https://github.com/napari/docs/commits?author=cmalinmayor) - @cmalinmayor
- [Clément Caporal](https://github.com/napari/napari/commits?author=ClementCaporal) - @ClementCaporal +
- [Draga Doncila Pop](https://github.com/napari/docs/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) ([docs](https://github.com/napari/docs/commits?author=jacopoabramo))  - @jacopoabramo
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [lettyz3](https://github.com/napari/napari/commits?author=lettyz3) - @lettyz3 +
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag))  - @brisvag
- [Lundy Bernard](https://github.com/napari/napari/commits?author=lundybernard) ([docs](https://github.com/napari/docs/commits?author=lundybernard))  - @lundybernard +
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Sesan](https://github.com/napari/napari/commits?author=Olusesan) ([docs](https://github.com/napari/docs/commits?author=Olusesan))  - @Olusesan
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [ymka](https://github.com/napari/napari/commits?author=i-ymka) - @i-ymka +
