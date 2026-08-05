# napari 0.9.0
⚠️ *Note: these release notes are still in draft while 0.9.0a1 is in prerelease testing.* ⚠️

*Mon, Aug 17, 2026*

We're happy to announce the release of napari 0.9.0!
napari is a fast, interactive, multi-dimensional image viewer for Python.
It's designed for browsing, annotating, and analyzing large multi-dimensional
images. It's built on top of Qt (for the GUI), vispy (for performant GPU-based
rendering), and the scientific Python stack (numpy, scipy).

For more information, examples, and documentation, please visit our website,
https://napari.org.

napari follows [EffVer (Intended Effort Versioning)](https://effver.org/); this is a **Macro** release containing awesome new features, but may require dedication of some significant time when upgrading projects to use this version.

## Highlights

### Fuzzy find in command palette

Implement fuzzy find for the command palette ([#8661](https://github.com/napari/napari/pull/8661))

### Adjust grid rendering with hidden layers

If using grid layout without using stride, there are no blanks fields for hidden layers
thanks to [#9244](https://github.com/napari/napari/pull/9244)

### Inherit axis labels from layers

Thanks to [#9282](https://github.com/napari/napari/pull/9282) the axis labels in interface, next to slide and `Dims.axis_labels`
are calculated based on axis labels of layers

### Status bar coordinates as floats

Thanks to [#9287](https://github.com/napari/napari/pull/9287) we no longer render coordinates on scale bar
as integers, but as floats. It is important for all who use fractional
`Layer.scale`

### Public API for auto contrast limit

In [#9271](https://github.com/napari/napari/pull/9271) the public API for auto contrast limits is added



- Canvas model ([#8633](https://github.com/napari/napari/pull/8633))
- Implement Surface slicing with async request/response ([#8783](https://github.com/napari/napari/pull/8783))
- Remove translations code ([#8935](https://github.com/napari/napari/pull/8935))
- Add builtin Wavefront OBJ to surfaces reader ([#9228](https://github.com/napari/napari/pull/9228))


- Dynamically construct layer controls based on selection ([#9318](https://github.com/napari/napari/pull/9318))

## New Features

- Implement fuzzy find for the command palette ([#8661](https://github.com/napari/napari/pull/8661))
- Implement Surface slicing with async request/response ([#8783](https://github.com/napari/napari/pull/8783))
- Small refactor of point slicing + `rescale` projection mode to replace out_of_slice_display ([#8786](https://github.com/napari/napari/pull/8786))
- feat: add `new` label button to the labels controls ([#9215](https://github.com/napari/napari/pull/9215))
- Add builtin Wavefront OBJ to surfaces reader ([#9228](https://github.com/napari/napari/pull/9228))
- Dynamically construct layer controls based on selection ([#9318](https://github.com/napari/napari/pull/9318))

## Improvements

- MAINT Always raise error when `widget_name` given in `get_widget_contribution` ([#6544](https://github.com/napari/napari/pull/6544))
- move features table widget command to the Metadata menu ([#9231](https://github.com/napari/napari/pull/9231))
- fix: change the order of edge/face color and border ([#9232](https://github.com/napari/napari/pull/9232))
- Move the layer lock to group with link/unlink, rather than with visib… ([#9235](https://github.com/napari/napari/pull/9235))
- fix: adjust the layout based on the hidden layers in grid ([#9244](https://github.com/napari/napari/pull/9244))
- Improve slider handle conspicuity by using theme's `current` color for active dim  ([#9255](https://github.com/napari/napari/pull/9255))
- publicly expose auto contrast limits ([#9271](https://github.com/napari/napari/pull/9271))
- update dims axis labels from layers axis labels ([#9282](https://github.com/napari/napari/pull/9282))
- Status bar coordinates as floats ([#9287](https://github.com/napari/napari/pull/9287))
- UX: Indicate web links in Help menu with ↗ (unicode character) ([#9291](https://github.com/napari/napari/pull/9291))
- New layer inherits axis labels when derived from another layer ([#9293](https://github.com/napari/napari/pull/9293))
- Adding histogram to surfaces ([#9306](https://github.com/napari/napari/pull/9306))
- Dynamically construct layer controls based on selection ([#9318](https://github.com/napari/napari/pull/9318))
- UX/UI: Bump the splitter (separator) size by 1px ([#9344](https://github.com/napari/napari/pull/9344))

## Performance

- [perf] Defer PIL import in labels.py polygon mask ([#9205](https://github.com/napari/napari/pull/9205))

## Bug Fixes

- Fix multiscale level selection for anisotropic data ([#9201](https://github.com/napari/napari/pull/9201))
- fix async colormap ([#9209](https://github.com/napari/napari/pull/9209))
- Fix cross layer in multiple viewer example to use line vectors. ([#9213](https://github.com/napari/napari/pull/9213))
- Do not update `current_properties` on Shapes selection changed  ([#9221](https://github.com/napari/napari/pull/9221))
- fix: action binding the `new-label` tooltips  with shortcuts ([#9230](https://github.com/napari/napari/pull/9230))
- fix: add minimum value to grid mode strides to allow negative strides ([#9236](https://github.com/napari/napari/pull/9236))
- fix(qt): dimension sliders need a minimum width ([#9254](https://github.com/napari/napari/pull/9254))
- Fix sync slicing when toggling to 3D with auto contrast ([#9263](https://github.com/napari/napari/pull/9263))
- Fix enum breaks from translations removal ([#9274](https://github.com/napari/napari/pull/9274))
- Fix auto_contrast button state initialization ([#9289](https://github.com/napari/napari/pull/9289))
- Vectors: make edge_color_mode = 'direct' actually leave the feature mapping ([#9333](https://github.com/napari/napari/pull/9333))
- Use magnitude of Layer.scale for points/shape handles ([#9339](https://github.com/napari/napari/pull/9339))
- Change `Dims` slider connection from `textChanged` to `textEdited` to stop wrong updates ([#9355](https://github.com/napari/napari/pull/9355))

## Documentation

- [pre-commit.ci] pre-commit autoupdate ([docs#1069](https://github.com/napari/docs/pull/1069))
- Update homepage video for 0.8.0/.1 changes ([docs#1070](https://github.com/napari/docs/pull/1070))
- Enhance contributing documentation with GitHub edit info ([docs#1075](https://github.com/napari/docs/pull/1075))
- Adding uv to getting started - installation ([docs#1076](https://github.com/napari/docs/pull/1076))
- make napari logo usage page ([docs#1077](https://github.com/napari/docs/pull/1077))
- Delete useless line ([docs#1078](https://github.com/napari/docs/pull/1078))
- Update auto-fill-labels loop video to extend end frame ([docs#1082](https://github.com/napari/docs/pull/1082))
- Bring several NAPs up to date ([docs#1091](https://github.com/napari/docs/pull/1091))
- [pre-commit.ci] pre-commit autoupdate ([docs#1095](https://github.com/napari/docs/pull/1095))
- Update dev instructions to use prek ([docs#1096](https://github.com/napari/docs/pull/1096))
- Add initial release notes for 0.9.0 ([docs#1097](https://github.com/napari/docs/pull/1097))
- Update recommended Python version in README from 3.11 to 3.13 ([#9223](https://github.com/napari/napari/pull/9223))
- Load data from zarr in map example if contextily fails ([#9307](https://github.com/napari/napari/pull/9307))

## Other Pull Requests

- Update label name in condition of label trigger build ([docs#1067](https://github.com/napari/docs/pull/1067))
- Update version switcher to point to 0.8.0 as stable ([docs#1071](https://github.com/napari/docs/pull/1071))
- Remove contributing text about adding translations ([docs#1081](https://github.com/napari/docs/pull/1081))
- ci(dependabot): bump the github-actions group with 4 updates ([docs#1094](https://github.com/napari/docs/pull/1094))
- fix(typing): add typing and fix mypy error in `qt_mode_buttons.py` ([#9110](https://github.com/napari/napari/pull/9110))
- Use shared version of label clean workflow ([#9116](https://github.com/napari/napari/pull/9116))
- Remove `qt_dict_table.py` as its unused  ([#9119](https://github.com/napari/napari/pull/9119))
- fix(typing): add typing and fix mypy error in `qt_face_color.py`  ([#9123](https://github.com/napari/napari/pull/9123))
- fix(typing): add typing and fix mypy error in `_base_item_model.py` ([#9126](https://github.com/napari/napari/pull/9126))
- fix(typing): add typing and fix mypy error in `_base_item_view.py` ([#9127](https://github.com/napari/napari/pull/9127))
- fix(typing): add typing and fix mypy error in `qt_axis_model.py` ([#9167](https://github.com/napari/napari/pull/9167))
- fix(typing): add typing and fix mypy error in `qt_list_model.py` ([#9169](https://github.com/napari/napari/pull/9169))
- typing: remove `experimental.qt_poll.py` from mypy ignore ([#9171](https://github.com/napari/napari/pull/9171))
- fix(typing): add typing and fix mypy error in `qt_border_color.py` ([#9179](https://github.com/napari/napari/pull/9179))
- fix(typing): add typing and fix mypy error in `qt_edge_color.py` ([#9183](https://github.com/napari/napari/pull/9183))
- fix(typing): resolve mypy errors for `qt_widget_controls_base` ([#9185](https://github.com/napari/napari/pull/9185))
- Update `coverage`, `dask`, `hypothesis`, `imageio`, `matplotlib`, `platformdirs`, `tifffile`, `tqdm`, `virtualenv`, `xarray` ([#9194](https://github.com/napari/napari/pull/9194))
- [pre-commit.ci] pre-commit autoupdate ([#9197](https://github.com/napari/napari/pull/9197))
- Add ``example`` to ``allowed_labels`` in ``check_labels`` job of ``label_and_milestone_checker.yml`` workflow ([#9214](https://github.com/napari/napari/pull/9214))
- TST: parameterizing with iterables is deprecated in pytest ([#9217](https://github.com/napari/napari/pull/9217))
- Add stereo 3D viewer widget example ([#9219](https://github.com/napari/napari/pull/9219))
- Make tensorstore optional dependency of `test_labels` again ([#9220](https://github.com/napari/napari/pull/9220))
- Remove unnecessary ``FutureWarning`` ignore for ``test_layers_save_svg`` ([#9225](https://github.com/napari/napari/pull/9225))
- Disable part of test matrix to increase runner availability during sprints/hackathon ([#9226](https://github.com/napari/napari/pull/9226))
- Add (Euro)SciPy Sprint Authors to Citation ([#9234](https://github.com/napari/napari/pull/9234))
- fix(typing): add typing and fix mypy error in `qt_brush_size_slider.py` ([#9238](https://github.com/napari/napari/pull/9238))
- fix(typing): add typing and fix mypy error in `_evented_dict.py` ([#9240](https://github.com/napari/napari/pull/9240))
- Gallery example of using a background map ([#9245](https://github.com/napari/napari/pull/9245))
- Adding 4D sample data as a heat diffusion ([#9246](https://github.com/napari/napari/pull/9246))
- Disable interaction with vispy.gloo in test_vispy_labels_polygon_overlay ([#9264](https://github.com/napari/napari/pull/9264))
- ci(dependabot): bump the actions group across 1 directory with 11 updates ([#9265](https://github.com/napari/napari/pull/9265))
- Remove missing translations GH action ([#9266](https://github.com/napari/napari/pull/9266))
- Asynchronous loading text fix ([#9267](https://github.com/napari/napari/pull/9267))
- Pin octokit to tag, not use main branch ([#9268](https://github.com/napari/napari/pull/9268))
- Fix typing problem by provide strict version of _BaseEventedItemModel.getItem ([#9272](https://github.com/napari/napari/pull/9272))
- Fix test failures when running napari in tiling window managers by forcing the screenshot size. ([#9284](https://github.com/napari/napari/pull/9284))
- Update `certifi`, `hypothesis`, `pandas`, `platformdirs`, `tqdm`, `virtualenv` ([#9295](https://github.com/napari/napari/pull/9295))
- deprecate setting dims axis labels in examples ([#9297](https://github.com/napari/napari/pull/9297))
- [pre-commit.ci] pre-commit autoupdate ([#9303](https://github.com/napari/napari/pull/9303))
- Update latlon with map example to follow PEP8 ([#9312](https://github.com/napari/napari/pull/9312))
- Example: combine points and vectors to build a 3D structured object ([#9340](https://github.com/napari/napari/pull/9340))
- Revert "Disable part of test matrix to increase runner availability during sprints/hackathon (#9226)" ([#9348](https://github.com/napari/napari/pull/9348))


## 24 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) - @Aniketsy
- [Arne Defauw](https://github.com/napari/napari/commits?author=ArneDefauw) - @ArneDefauw +
- [Aroj Hada](https://github.com/napari/napari/commits?author=ArozHada) - @ArozHada +
- [BadPrograms](https://github.com/napari/napari/commits?author=BadPrograms) - @BadPrograms +
- [Bas Bloemsaat](https://github.com/napari/napari/commits?author=basbloemsaat) - @basbloemsaat +
- [Christophe Creeten](https://github.com/napari/napari/commits?author=ccreeten) - @ccreeten +
- [Edouard Coussoux](https://github.com/napari/napari/commits?author=ecoussoux-ansys) - @ecoussoux-ansys +
- [Filippo  Maria Castelli, PhD](https://github.com/napari/napari/commits?author=filippocastelli) - @filippocastelli +
- [girochat](https://github.com/napari/napari/commits?author=girochat) - @girochat +
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) - @jacopoabramo
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni))  - @jni
- [Kamil Kania](https://github.com/napari/napari/commits?author=Grzyb33k) - @Grzyb33k +
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag))  - @brisvag
- [Margot Chazotte](https://github.com/napari/napari/commits?author=MargotCh) - @MargotCh
- [Matthias Schabel](https://github.com/napari/napari/commits?author=matthiasschabel) - @matthiasschabel +
- [michalslabs](https://github.com/napari/napari/commits?author=michalslabs) ([docs](https://github.com/napari/docs/commits?author=michalslabs))  - @michalslabs +
- [Mridul Seth](https://github.com/napari/napari/commits?author=MridulS) - @MridulS +
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Revathy Venugopal](https://github.com/napari/napari/commits?author=Revathyvenugopal162) - @Revathyvenugopal162 +
- [Sara Czasak](https://github.com/napari/docs/commits?author=sara-czasak) - @sara-czasak +
- [Sébastien Morais](https://github.com/napari/napari/commits?author=SMoraisAnsys) - @SMoraisAnsys +
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [Zuzana Čočková](https://github.com/napari/napari/commits?author=cockovaz) - @cockovaz

## 16 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) - @Aniketsy
- [arbor](https://github.com/napari/docs/commits?author=arbormoss) - @arbormoss
- [Arne Defauw](https://github.com/napari/napari/commits?author=ArneDefauw) - @ArneDefauw +
- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Draga Doncila Pop](https://github.com/napari/docs/commits?author=DragaDoncila) - @DragaDoncila
- [Filippo  Maria Castelli, PhD](https://github.com/napari/napari/commits?author=filippocastelli) - @filippocastelli +
- [girochat](https://github.com/napari/napari/commits?author=girochat) - @girochat +
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) - @jacopoabramo
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni))  - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag))  - @brisvag
- [Maxime Rey](https://github.com/napari/docs/commits?author=MaxJPRey) - @MaxJPRey
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Sara Czasak](https://github.com/napari/docs/commits?author=sara-czasak) - @sara-czasak +
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [Zuzana Čočková](https://github.com/napari/napari/commits?author=cockovaz) - @cockovaz
