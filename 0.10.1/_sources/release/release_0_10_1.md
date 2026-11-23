# napari 0.10.1
⚠️ *Note: these release notes are still in draft while 0.10.1rc1 is in prerelease testing.* ⚠️

*Mon, Nov 23, 2026*

We're happy to announce the release of napari 0.10.1!
napari is a fast, interactive, multi-dimensional image viewer for Python.
It's designed for browsing, annotating, and analyzing large multi-dimensional
images. It's built on top of Qt (for the GUI), vispy (for performant GPU-based
rendering), and the scientific Python stack (numpy, scipy).

For more information, examples, and documentation, please visit our website,
https://napari.org.

napari follows [EffVer (Intended Effort Versioning)](https://effver.org/); this is a **Meso** release containing awesome new features, but some effort may be needed when updating previous projects to use this version.

## Highlights

This is a maintenance-focused release: it has few new features, but contains a ton of performance and maintenance work that will enhance both working _with_ napari and _on_ napari! And of course, tons of bug fixes :)

### CI speedups and improvements

Our automated testing and deploying machinery (CI) has accumulated slowness and technical debt over the years. During this release cycle, we tackled several of these issues (chief among them ([#9870](https://github.com/napari/napari/pull/9870))) and cut test time on our pull request by up to half!

### Various Performance enhancements

`Labels` painting, `Shapes` and slicing in general got several performance improvements. Many workflows will benefit from this, so make sure to try out things that used to be slow to check if you're one of the lucky winners ;)

### Typing progress

The napari codebase is getting more and move type annotation coverage! This release merged more than a dozen typing-related pull request, which helped (and will help) us find bugs and develop both napari and napari plugins more easily. We'll continue this trend in the upcoming releases!



## New Features

- Add `dims_displayed` overlay showing the currently displayed axes ([#9855](https://github.com/napari/napari/pull/9855))

## Improvements

- Anchor all viewer button popups to viewer ([#8953](https://github.com/napari/napari/pull/8953))
- Rasterize paths that leave their plane as nD lines ([#9584](https://github.com/napari/napari/pull/9584))
- Add percentiles option to calc_data_range and reset_contrast_limits ([#9691](https://github.com/napari/napari/pull/9691))
- Fix saving multiscale layers with the built-in writer ([#9693](https://github.com/napari/napari/pull/9693))
- Add detection of deprecated properties, create warning in EventedModel ([#9701](https://github.com/napari/napari/pull/9701))
- Add text scaling checkbox to Points and Shapes layer controls ([#9838](https://github.com/napari/napari/pull/9838))

## Performance

- [labels, perf] Batch paint stamps  ([#9469](https://github.com/napari/napari/pull/9469))
- [Shapes, perf] Avoid rebuilding Shapes Layer.data by using Layer.nshapes and Layer._data_view.shapes ([#9501](https://github.com/napari/napari/pull/9501))
- [Shapes, perf] Shapes batch display updates ([#9502](https://github.com/napari/napari/pull/9502))
- [perf] Slice only after setting centered view (only affects async) ([#9698](https://github.com/napari/napari/pull/9698))
- [perf] Refactor coarsest level materializer to the slice request ([#9750](https://github.com/napari/napari/pull/9750))
- [perf] Use numpy for thumbnails, to avoid scipy import and duplicate code ([#9858](https://github.com/napari/napari/pull/9858))
- Postpone welcome widget refresh while it is not visible ([#9869](https://github.com/napari/napari/pull/9869))
- Skip the canvas cleanup when closing the viewer ([#9870](https://github.com/napari/napari/pull/9870))

## Bug Fixes

- TYP: add type hints in `_testsupport.py` ([#9237](https://github.com/napari/napari/pull/9237))
- Add native value search in EnumSchemaWidgets to ensure boolean type compatibility ([#9591](https://github.com/napari/napari/pull/9591))
- Add layers from Future results on the main thread ([#9686](https://github.com/napari/napari/pull/9686))
- Fix saving multiscale layers with the built-in writer ([#9693](https://github.com/napari/napari/pull/9693))
- Allow private classes to generate private `_add_*` methods ([#9766](https://github.com/napari/napari/pull/9766))
- Include point border in Points hover and selection hit-testing ([#9790](https://github.com/napari/napari/pull/9790))
- Fix overlay draws during new viewboxes from new layers ([#9799](https://github.com/napari/napari/pull/9799))
- Fix wrong term in `rotation_matrix_from_vectors_2d` ([#9817](https://github.com/napari/napari/pull/9817))
- Fix floating coordinate grid plane for 2D data in 3D view ([#9827](https://github.com/napari/napari/pull/9827))
- Fix disconnecting old transform in TransformChain.__setitem__ ([#9835](https://github.com/napari/napari/pull/9835))
- fix `imshow` to not set `ndisplay` and `order` if not passed explicitly ([#9850](https://github.com/napari/napari/pull/9850))
- Fix warning notifications without arguments ([#9884](https://github.com/napari/napari/pull/9884))
- Fix menu item chevron overlap ([#9934](https://github.com/napari/napari/pull/9934))
- Fix closing notifications by using keyword-only ([#9935](https://github.com/napari/napari/pull/9935))

## Documentation

- core dev guide text improvement ([docs#1170](https://github.com/napari/docs/pull/1170))
- Typing guide: add code snippets for common patterns and more resources ([docs#1177](https://github.com/napari/docs/pull/1177))
- Redirect coredev files to core_team  ([docs#1194](https://github.com/napari/docs/pull/1194))
- docs: update moved, dead, and src/ layout links ([docs#1195](https://github.com/napari/docs/pull/1195))
- docs: link NAP 2 release-guide footnote by label ([docs#1206](https://github.com/napari/docs/pull/1206))
- docs: update permanently redirected links ([docs#1208](https://github.com/napari/docs/pull/1208))
- docs: update links that redirect to a canonical page ([docs#1210](https://github.com/napari/docs/pull/1210))
- Super  speed up the UI diagram prep ([docs#1212](https://github.com/napari/docs/pull/1212))
- perf: add napari pull and issue links to linkcheck_ignore ([docs#1214](https://github.com/napari/docs/pull/1214))
- docs: add section anchors and https to five links ([docs#1217](https://github.com/napari/docs/pull/1217))
- add draft release notes for 0.10.1 ([docs#1221](https://github.com/napari/docs/pull/1221))
- Fix example highlight styling on the homepage ([docs#1224](https://github.com/napari/docs/pull/1224))
- Fix homepage and community quicklink icon sizes ([docs#1225](https://github.com/napari/docs/pull/1225))
- Release notes for v0.10.1rc0 ([docs#1227](https://github.com/napari/docs/pull/1227))
- Print notebook execution traceback in docs build log ([docs#1228](https://github.com/napari/docs/pull/1228))
- Use livingobjects.ebi.ac.uk for IDR zarr sample in open_images ([docs#1229](https://github.com/napari/docs/pull/1229))
- Last release notes update for 0.10.1 (rc1) ([docs#1230](https://github.com/napari/docs/pull/1230))
- TYP: add type hints in `_evented_list.py` ([#9241](https://github.com/napari/napari/pull/9241))
- docs: update moved tutorial links in two examples ([#9810](https://github.com/napari/napari/pull/9810))
- Add Parameters section to `compute_nice_ticks docstring` ([#9842](https://github.com/napari/napari/pull/9842))
- doc: fix wrong ndim description for point layer ([#9915](https://github.com/napari/napari/pull/9915))
- Fix wrong entries in the `Points` layer docstring ([#9921](https://github.com/napari/napari/pull/9921))

## Other Pull Requests

- [pre-commit.ci] pre-commit autoupdate ([docs#1189](https://github.com/napari/docs/pull/1189))
- fix: update the link check config in conf.py and linkcheck.yml ([docs#1196](https://github.com/napari/docs/pull/1196))
- ci(dependabot): bump the github-actions group with 4 updates ([docs#1198](https://github.com/napari/docs/pull/1198))
- Fix Make on Windows to use env vars during docs builds ([docs#1203](https://github.com/napari/docs/pull/1203))
- fix: allow redirects and ignore blocked hosts in the link check ([docs#1207](https://github.com/napari/docs/pull/1207))
- ci: cut the runtime of the nightly link check ([docs#1215](https://github.com/napari/docs/pull/1215))
- update circle ci redirector version ([docs#1218](https://github.com/napari/docs/pull/1218))
- [pre-commit.ci] pre-commit autoupdate ([docs#1222](https://github.com/napari/docs/pull/1222))
- Silence sphinx-design==0.8.0 warning ([docs#1223](https://github.com/napari/docs/pull/1223))
- Add CITATION.cff validation and re-order authors (with pre-commit) ([#9155](https://github.com/napari/napari/pull/9155))
- TYP: add type hints in `_vispy/canvas.py` and `base.py` ([#9202](https://github.com/napari/napari/pull/9202))
- fix(typing): annotate `napari/utils/key_bindings.py` ([#9253](https://github.com/napari/napari/pull/9253))
- TYP: add type hints in `_multiscale_data.py` ([#9549](https://github.com/napari/napari/pull/9549))
- Update tox configuration to simplify testing against other packages ([#9555](https://github.com/napari/napari/pull/9555))
- TYP: add type hints in `qt_scrollbar.py` ([#9654](https://github.com/napari/napari/pull/9654))
- TYP: add type hints in `qt_highlight_preview.py` ([#9657](https://github.com/napari/napari/pull/9657))
- TYP: add type hints in `view_layers.py` ([#9679](https://github.com/napari/napari/pull/9679))
- Add timeout to --pre tests ([#9711](https://github.com/napari/napari/pull/9711))
- TYP: add type hints in `geometry.py` and `_typed.py` ([#9716](https://github.com/napari/napari/pull/9716))
- Update bug report template to contain more recent version of `napari --info` ([#9721](https://github.com/napari/napari/pull/9721))
- chore: remove superseded code ([#9769](https://github.com/napari/napari/pull/9769))
- TYP: add reusable Vector1D/Matrix2D type aliases ([#9782](https://github.com/napari/napari/pull/9782))
- Remove unused grid_points_in_poly function ([#9802](https://github.com/napari/napari/pull/9802))
- ci: default toxworkdir to {toxinidir}/.tox ([#9826](https://github.com/napari/napari/pull/9826))
- ci(dependabot): bump the actions group across 1 directory with 9 updates ([#9843](https://github.com/napari/napari/pull/9843))
- Update `hypothesis`, `ipython`, `npe2`, `platformdirs`, `pydantic`, `pydantic-settings`, `pyqt6`, `pyqt6-qt6`, `pytest`, `superqt`, `tensorstore`, `virtualenv`, `wrapt` ([#9844](https://github.com/napari/napari/pull/9844))
- Block `tox` 4.67.5 for pre tests to make it working ([#9846](https://github.com/napari/napari/pull/9846))
- Enable stacktrace, disable graphviz in `--pre` tests ([#9847](https://github.com/napari/napari/pull/9847))
- [pre-commit.ci] pre-commit autoupdate ([#9851](https://github.com/napari/napari/pull/9851))
- Speed up test suite: gc.freeze, cached builtins manifest, no sleeps in label color tests ([#9854](https://github.com/napari/napari/pull/9854))
- Fix deadlock between slicing thread and main thread on PySide6 ([#9856](https://github.com/napari/napari/pull/9856))
- Fail quicker at end of test sections on CI ([#9868](https://github.com/napari/napari/pull/9868))
- Update `coverage`, `hypothesis`, `ipython`, `npe2`, `pandas`, `platformdirs`, `pydantic`, `tifffile`, `virtualenv` ([#9873](https://github.com/napari/napari/pull/9873))
- [pre-commit.ci] pre-commit autoupdate ([#9877](https://github.com/napari/napari/pull/9877))
- Update the comment in `VispyCanvas.screenshot()` to reflect current state ([#9878](https://github.com/napari/napari/pull/9878))
- Remove stubgen from napari workflow, fix type annotation and naming of helpers ([#9879](https://github.com/napari/napari/pull/9879))
- Fix flaky test_play_button and abort when closing a playing QtDims ([#9885](https://github.com/napari/napari/pull/9885))
- Skip coverage upload when initial tests fail ([#9887](https://github.com/napari/napari/pull/9887))
- Deprecate `rotation_matrix_from_vectors_2d` ([#9888](https://github.com/napari/napari/pull/9888))
- Change Tim Monko's affiliation in Citation file ([#9894](https://github.com/napari/napari/pull/9894))
- Fix CircleCI redirector by bumping action version ([#9895](https://github.com/napari/napari/pull/9895))
- Silence SC2016 for the git credential helper in upgrade_test_constraints ([#9896](https://github.com/napari/napari/pull/9896))
- Fix missing f-prefix in git diff error message of `check_updated_packages` ([#9899](https://github.com/napari/napari/pull/9899))
- Use PySide6-Essentials instead of the PySide6 metapackage ([#9905](https://github.com/napari/napari/pull/9905))
- [pre-commit.ci] pre-commit autoupdate ([#9909](https://github.com/napari/napari/pull/9909))
- [perf] Labels: Use layer.data.dtype instead of materializing lazy arrays in get_dtype ([#9912](https://github.com/napari/napari/pull/9912))
- Remove unused unit registry accessor ([#9920](https://github.com/napari/napari/pull/9920))
- Configure uv to enforce numpy from wheel on python 3.14 ([#9922](https://github.com/napari/napari/pull/9922))
- Pin tox using constraints ([#9929](https://github.com/napari/napari/pull/9929))
- Fix debug log placeholders in move_multiple and dropMimeData ([#9930](https://github.com/napari/napari/pull/9930))
- Bump tox-min-req and tox-gh-actions ([#9932](https://github.com/napari/napari/pull/9932))
- Fix type issue from merge ([#9938](https://github.com/napari/napari/pull/9938))
- Fix flaky crosshair screenshot test ([#9941](https://github.com/napari/napari/pull/9941))


## 20 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aman kumar](https://github.com/napari/napari/commits?author=ghostiee-11) - @ghostiee-11
- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) - @Aniketsy
- [Carlos Mario Rodriguez Reza](https://github.com/napari/napari/commits?author=carlosmariorr) - @carlosmariorr
- [Clément Caporal](https://github.com/napari/napari/commits?author=ClementCaporal) - @ClementCaporal
- [Felipe Cybis Pereira](https://github.com/napari/napari/commits?author=FelipeCybis) - @FelipeCybis
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Ilgın ](https://github.com/napari/docs/commits?author=zelihaguven) - @zelihaguven +
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) - @jacopoabramo
- [Jaesung Park](https://github.com/napari/napari/commits?author=jaesungkr) - @jaesungkr +
- [KallineB](https://github.com/napari/napari/commits?author=KallineB) - @KallineB +
- [lettyz3](https://github.com/napari/napari/commits?author=lettyz3) - @lettyz3
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag))  - @brisvag
- [Lundy Bernard](https://github.com/napari/napari/commits?author=lundybernard) ([docs](https://github.com/napari/docs/commits?author=lundybernard))  - @lundybernard
- [Lyinno](https://github.com/napari/napari/commits?author=Lyinno) - @Lyinno
- [Maria Laura Soares](https://github.com/napari/napari/commits?author=mlaurabs) - @mlaurabs +
- [Omkar Kabde](https://github.com/napari/napari/commits?author=omkar-334) - @omkar-334
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Shriraj Jadhav](https://github.com/napari/napari/commits?author=Shriraj1901) - @Shriraj1901 +
- [Sparsh Vikas](https://github.com/napari/napari/commits?author=TheCreeperrr) - @TheCreeperrr +
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko

## 14 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aman kumar](https://github.com/napari/napari/commits?author=ghostiee-11) - @ghostiee-11
- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) - @Aniketsy
- [Carlos Mario Rodriguez Reza](https://github.com/napari/napari/commits?author=carlosmariorr) - @carlosmariorr
- [Clément Caporal](https://github.com/napari/napari/commits?author=ClementCaporal) - @ClementCaporal
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Ilgın ](https://github.com/napari/docs/commits?author=zelihaguven) - @zelihaguven +
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) - @jacopoabramo
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [lettyz3](https://github.com/napari/napari/commits?author=lettyz3) - @lettyz3
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag))  - @brisvag
- [Lundy Bernard](https://github.com/napari/napari/commits?author=lundybernard) ([docs](https://github.com/napari/docs/commits?author=lundybernard))  - @lundybernard +
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Sparsh Vikas](https://github.com/napari/napari/commits?author=TheCreeperrr) - @TheCreeperrr +
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
