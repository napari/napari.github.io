# napari 0.10.0
⚠️ *Note: these release notes are still in draft while 0.10.0a0 is in prerelease testing.* ⚠️

*Sun, Oct 25, 2026*

We're happy to announce the release of napari 0.10.0!
napari is a fast, interactive, multi-dimensional image viewer for Python.
It's designed for browsing, annotating, and analyzing large multi-dimensional
images. It's built on top of Qt (for the GUI), vispy (for performant GPU-based
rendering), and the scientific Python stack (numpy, scipy).

For more information, examples, and documentation, please visit our website,
https://napari.org.

napari follows [EffVer (Intended Effort Versioning)](https://effver.org/); this is a **Macro** release containing awesome new features, but may require dedication of some significant time when upgrading projects to use this version.

## Highlights

- Add grid overlay ([#7827](https://github.com/napari/napari/pull/7827))

## New Features

- Add grid overlay ([#7827](https://github.com/napari/napari/pull/7827))

## Improvements

- Use global font size for overlays ([#8667](https://github.com/napari/napari/pull/8667))
- Add single-plane projection for 3D points layers ([#9229](https://github.com/napari/napari/pull/9229))
- UI: apply tabular numerals to embedded status bars ([#9407](https://github.com/napari/napari/pull/9407))
- Clean up status for grid/multiple selection ([#9431](https://github.com/napari/napari/pull/9431))
- Fix fuzzy finding and command highlighting in palette ([#9503](https://github.com/napari/napari/pull/9503))
- Implement canvas_to_world on the napari side ([#9517](https://github.com/napari/napari/pull/9517))
- Add option to declare deprecated property using descriptor ([#9527](https://github.com/napari/napari/pull/9527))
- Add `RenamedWarningEmitter` and `DependentEmitter` ([#9529](https://github.com/napari/napari/pull/9529))
- Keep reader and writer commands out of the command palette ([#9582](https://github.com/napari/napari/pull/9582))
- Add warning icon if experimental setting (especially async) is enabled ([#9590](https://github.com/napari/napari/pull/9590))
- Add `locked_data_level` as an argument for `Labels` ([#9603](https://github.com/napari/napari/pull/9603))
- Improve point projections to cover old out_of_slice use case ([#9607](https://github.com/napari/napari/pull/9607))
- Make the layer name overlay bold ([#9616](https://github.com/napari/napari/pull/9616))
- Fix reporting of Qt version in `napari --info` ([#9648](https://github.com/napari/napari/pull/9648))

## Bug Fixes

- fix(shapes): pick shapes on a fractional slice key ([#9394](https://github.com/napari/napari/pull/9394))
- Fix remove() mid-draw when removing shapes shifts the drawn shape's index ([#9441](https://github.com/napari/napari/pull/9441))
- Fix fuzzy finding and command highlighting in palette ([#9503](https://github.com/napari/napari/pull/9503))
- fix(qt): let a dock widget's minimum size shrink again when its content does ([#9532](https://github.com/napari/napari/pull/9532))
- Fix Convert to Labels for shapes in 3D view and with rolled axes ([#9580](https://github.com/napari/napari/pull/9580))
- Fix color of labels in colorpicker ([#9599](https://github.com/napari/napari/pull/9599))
- Measure text at render size for even overlay padding ([#9617](https://github.com/napari/napari/pull/9617))
- Fix font clipping in dock widget titles ([#9619](https://github.com/napari/napari/pull/9619))
- Limit the lasso_vertex_distance preference spin box to 1-50 ([#9626](https://github.com/napari/napari/pull/9626))

## Documentation

- Add info in tooltips for projection mode ([#9497](https://github.com/napari/napari/pull/9497))
- Clarify in `LayerList` docstring when the `changed` event is emitted ([#9504](https://github.com/napari/napari/pull/9504))
- Typing Guide: Tips and Resources ([docs#1135](https://github.com/napari/docs/pull/1135))
- Deprecation policy using time-based windows for removal ([docs#1138](https://github.com/napari/docs/pull/1138))
- Add missed PRs to 0.9.2 release notes. ([docs#1151](https://github.com/napari/docs/pull/1151))
- docs: suggest refined github ([docs#1155](https://github.com/napari/docs/pull/1155))
- Redirect old workshop pages to napari.org/workshops ([docs#1156](https://github.com/napari/docs/pull/1156))
- Move Kyle Harrington to Emeritus Steering Council ([docs#1160](https://github.com/napari/docs/pull/1160))
- Fix failing docs build due to `profiling` clash ([docs#1161](https://github.com/napari/docs/pull/1161))

## Other Pull Requests

- Separate tiling from nontiling overlays ([#9083](https://github.com/napari/napari/pull/9083))
- fix(typing): add typing and fix mypy error in `qt_tracks_controls.py` ([#9176](https://github.com/napari/napari/pull/9176))
- fix (typing): add typing and fix mypy error in `qt_symbol_combobox.py` ([#9182](https://github.com/napari/napari/pull/9182))
- MAINT: Remove deprecated ScaleBar.unit ([#9218](https://github.com/napari/napari/pull/9218))
- feat: initial working version slide out dockwidget ([#9317](https://github.com/napari/napari/pull/9317))
- chore: remove ChunkLoader dead test code  ([#9381](https://github.com/napari/napari/pull/9381))
- Fix labeler action ([#9458](https://github.com/napari/napari/pull/9458))
- Remove deprecated `napari.utils.indexing` module ([#9505](https://github.com/napari/napari/pull/9505))
- TYP: add type hints in `style_encoding.py` ([#9544](https://github.com/napari/napari/pull/9544))
- TYP: add type hints in `color_manager.py` ([#9547](https://github.com/napari/napari/pull/9547))
- TYP: add type hints in `qt_depiction_control.py` ([#9551](https://github.com/napari/napari/pull/9551))
- TYP: add type hints in `qt_contour_spinbox.py` ([#9552](https://github.com/napari/napari/pull/9552))
- TYP: add type hints in `qt_viewer_status_bar.py` ([#9554](https://github.com/napari/napari/pull/9554))
- Change Qt backend used in type testing from PyQt6 to PySide6 ([#9570](https://github.com/napari/napari/pull/9570))
- Update `coverage`, `fsspec`, `hypothesis`, `imageio`, `napari-resources`, `pandas`, `platformdirs`, `pytest-rerunfailures`, `tifffile`, `virtualenv`, `wrapt`, `xarray` ([#9594](https://github.com/napari/napari/pull/9594))
- TYP: annotate `color_kwargs` as dict[str, Any] in color_manager.py ([#9618](https://github.com/napari/napari/pull/9618))
- Update `hypothesis`, `platformdirs`, `virtualenv` ([#9625](https://github.com/napari/napari/pull/9625))
- TYP: add type hints in `qt_welcome.py` ([#9642](https://github.com/napari/napari/pull/9642))
- TYP: add type hints in `base.py` ([#9644](https://github.com/napari/napari/pull/9644))
- TYP: add type hints in `qt_viewer_buttons.py` ([#9649](https://github.com/napari/napari/pull/9649))
- TYP: add type hints in `qt_logger.py` ([#9655](https://github.com/napari/napari/pull/9655))
- Removed obsolete cells3d monkeypatch in test_examples.py ([#9658](https://github.com/napari/napari/pull/9658))
- typing: Enable checking presence of type annotation in functions ([#9662](https://github.com/napari/napari/pull/9662))
- Remove Qt5 from --pre tests ([#9687](https://github.com/napari/napari/pull/9687))
- Update `hypothesis`, `imageio`, `numpy`, `platformdirs`, `pydantic`, `pyside6`, `toolz`, `virtualenv` ([#9692](https://github.com/napari/napari/pull/9692))
- Add Lundy Bernard to CITATION.cff ([#9695](https://github.com/napari/napari/pull/9695))
- ci(dependabot): bump the github-actions group across 1 directory with 2 updates ([docs#1125](https://github.com/napari/docs/pull/1125))
- Rumdl: Add baseline config and format docs/ ([docs#1140](https://github.com/napari/docs/pull/1140))
- Move pre-fetch data step to begin of prep_docs.py ([docs#1148](https://github.com/napari/docs/pull/1148))
- Add missed directories to circelci cache ([docs#1149](https://github.com/napari/docs/pull/1149))
- Post rendered docs link as a sticky PR comment ([docs#1159](https://github.com/napari/docs/pull/1159))


## 12 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aditi Juneja](https://github.com/napari/napari/commits?author=Schefflera-Arboricola) - @Schefflera-Arboricola +
- [Aman kumar](https://github.com/napari/napari/commits?author=ghostiee-11) - @ghostiee-11 +
- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) - @Aniketsy
- [Carlos Mario Rodriguez Reza](https://github.com/napari/napari/commits?author=carlosmariorr) - @carlosmariorr
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) ([docs](https://github.com/napari/docs/commits?author=jacopoabramo))  - @jacopoabramo
- [lettyz3](https://github.com/napari/napari/commits?author=lettyz3) - @lettyz3 +
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Lundy Bernard](https://github.com/napari/napari/commits?author=lundybernard) ([docs](https://github.com/napari/docs/commits?author=lundybernard))  - @lundybernard +
- [Matthias Schabel](https://github.com/napari/napari/commits?author=matthiasschabel) - @matthiasschabel
- [Mridul Seth](https://github.com/napari/napari/commits?author=MridulS) - @MridulS
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko

## 10 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aman kumar](https://github.com/napari/napari/commits?author=ghostiee-11) - @ghostiee-11 +
- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) - @Aniketsy
- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) ([docs](https://github.com/napari/docs/commits?author=jacopoabramo))  - @jacopoabramo
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [lettyz3](https://github.com/napari/napari/commits?author=lettyz3) - @lettyz3 +
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Peter Sobolewski](https://github.com/napari/docs/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
