# napari 0.7.0
⚠️ *Note: these release notes are still in draft while 0.7.0 is in release candidate testing.* ⚠️

*Tue, Jan 27, 2026*

We're happy to announce the release of napari 0.7.0!
napari is a fast, interactive, multi-dimensional image viewer for Python.
It's designed for browsing, annotating, and analyzing large multi-dimensional
images. It's built on top of Qt (for the GUI), vispy (for performant GPU-based
rendering), and the scientific Python stack (numpy, scipy).

For more information, examples, and documentation, please visit our website,
https://napari.org.

napari follows [EffVer (Intended Effort Versioning)](https://effver.org/); this is a **Macro** release containing awesome new features, but may require dedication of some significant time when upgrading projects to use this version.

## Highlights

More detail coming soon...

### Transition to npe2 plugin engine 🔌

In 0.6.0 we began the process of deprecating npe1 (napari-plugin-engine).
In all 0.6.x releases, npe1 plugins were automatically converted to npe2 by default,
and users could turn off the `use_npe2_adaptor` setting to continue using npe1 plugins
without auto-conversion.

In 0.7.0 this setting is being removed, and plugins will *only* continue to function if
they can be auto-converted to npe2. Most plugins will be unaffected, but those that rely
on import-time behaviour may not work as expected. If a plugin is relying on import-time
behaviour, it may be able to replicate this using the new startup scripts functionality added
in 0.6.5 ([#8188](https://github.com/napari/napari/pull/8188)).

If you encounter conversion issues in a plugin you rely on, please contact the
plugin authors to encourage them to migrate their plugin to the npe2 system.

This change has been a long time coming, and it's allowed us to remove thousands
of lines of tangled and confusing legacy code. Now that we have, it's unleashed
the potential for massive improvements to file opening and saving in `napari`,
and exciting new features for our plugin infrastructure. Stay tuned!

For more details on this change and how it affects plugins, see the [detailed
guide](adapted-plugin-guide). If you are a plugin author and your plugin is not
yet npe2-compatible, please see our [npe2 migration
guide](npe2-migration-guide), and, if you encounter any issues, get in touch in
our [Plugins Zulip chat
channel](https://napari.zulipchat.com/#narrow/channel/309872-plugins) or by
coming to one of our [community meetings](meeting-schedule).

### Grid mode - bigger, better, faster 📈

If you've been playing with our new grid mode since 0.6.5, you 
may have stumbled into performance issues when progressively adding
new layers to the viewer. Stumble no longer! Our grid mode is now wicked fast and buttery smooth 🧈.

We've also fixed some issues with mouse interactions and deleting
layers, so you can tile to your heart's content. Try it out:

```py
import napari

viewer = napari.Viewer()

# enable grid with stride 2 to get layers split two-by-two
viewer.grid.enabled = True
viewer.grid.stride = 2

# set the scale bar to gridded mode so it appears in each grid box
viewer.scale_bar.visible = True
viewer.scale_bar.gridded = True

layers = viewer.open_sample('napari', 'lily')

# enable color bars
for layer in layers:
    layer.colorbar.visible = True
```

### What's in an angle? The truth! Fixed camera angles 🎥

If you've ever set up the camera to take that perfect publication-worthy photo of 
your data (and taken the time to query the camera angles), you may have noticed they seemed... off.
That's because they were! Very... off. This was due to a long-standing bug in how we calculated our
camera angles, fueled in part by some arcane vispy axis-swapping tomfoolery, and in part by napari's
starting position of `viewer.camera.angles = (0, 0, 90)`.

Good news! With [#8281](https://github.com/napari/napari/pull/8281), angles make sense again. The default camera angles are `(0, 0, 0)`, and they
move intuitively -- so `viewer.camera.angles = (0, 0, 10)` actually represents a 10 degree
rotation around the 0th dimension. What a time to be alive!

Old versions of napari:

![Image showing an old version of a napari viewer with a layer opened and its camera angle (10, 0, 0) displayed in the console.](https://github.com/user-attachments/assets/9ae2040c-36f7-4c4c-8ef8-140202d7ccda)

New and sane:

![Image showing the 0.7.0 napari viewer with a layer opened and its camera angle (10, 0, 0) displayed in the console. The layer is rotated 10 degrees in its first dimension](https://github.com/user-attachments/assets/6b972b46-5c3c-439a-8b0a-fe8a293224e5)

All rotations are now right-handed (counterclockwise when the axis points towards the viewer),
with automatic sign-flipping for flipped camera views. We've also removed the unwieldy to type
(and confusing to reason about) `quaternion2euler_degrees` in favour of scipy's `Rotation` class.

Now for the bad news... After many (and we do [mean](https://github.com/napari/napari/pull/8537)
[**many**](https://github.com/napari/napari/pull/8557)) attempts, we realized we couldn't
provide legacy conversion functions to get you to and from the original camera angles. Therefore,
this is a **breaking change**.

If you had scripts or notebooks setting up angles for screenshots, or if you've got workshop
materials or tutorials with preset angles, they'll need to be updated. Any existing code
using `viewer.camera.angles = (z, y, x)` will now produce a different view than before.

...

- Multilayer features table ([#8189](https://github.com/napari/napari/pull/8189))
- Remove `numpydoc` as a base and testing dependency ([#8338](https://github.com/napari/napari/pull/8338))
- Texture tiling ([#8395](https://github.com/napari/napari/pull/8395))
- Fix overlay initialization and layer addition slowdown ([#8443](https://github.com/napari/napari/pull/8443))
- Remove shim setting and warning dialog ([#8448](https://github.com/napari/napari/pull/8448))
- Remove PySide2 support ([#8450](https://github.com/napari/napari/pull/8450))
- Speed up the deletion of layers by deduplicating the function calls  ([#8479](https://github.com/napari/napari/pull/8479))
- Remove `npe1` settings and theme loading ([#8540](https://github.com/napari/napari/pull/8540))
- Use negative indexing for viewer dims axis labels ([#8565](https://github.com/napari/napari/pull/8565))
- Add napari-metadata to napari dependencies ([#8576](https://github.com/napari/napari/pull/8576))

## New Features

- Use information about units when calculate scale of layers when render ([#7889](https://github.com/napari/napari/pull/7889))
- Welcome widget as an overlay ([#8117](https://github.com/napari/napari/pull/8117))
- Multilayer features table ([#8189](https://github.com/napari/napari/pull/8189))
- Better text overlay (and subclasses) ([#8236](https://github.com/napari/napari/pull/8236))
- Allow create Shapes and Points per selected Layer ([#8357](https://github.com/napari/napari/pull/8357))
- Updating `selected_label` by `selected_data` for `Labels` layer toward multiple selection ([#8405](https://github.com/napari/napari/pull/8405))
- Use new logos! ([#8457](https://github.com/napari/napari/pull/8457))
- Add napari-metadata to napari dependencies ([#8576](https://github.com/napari/napari/pull/8576))

## Improvements

- perf: reallocate instead of clearing and repopulating set of selected points ([#6895](https://github.com/napari/napari/pull/6895))
- Add a seed argument to built-in samples with random seeds ([#8317](https://github.com/napari/napari/pull/8317))
- Enh: clarify Points selection keybinding behavior: select_in_slice not append by default, add new select_append_in_slice ([#8339](https://github.com/napari/napari/pull/8339))
- Enh: Improve zarr reading by builtins ([#8355](https://github.com/napari/napari/pull/8355))
- ENH: Speedup multiple shapes removal by concat'ing and np.deleting as a batch ([#8375](https://github.com/napari/napari/pull/8375))
- Enh: Speed up shapes box selection by using bounding boxes and vectorization ([#8378](https://github.com/napari/napari/pull/8378))
- Reordering default colormap to split channels  ([#8383](https://github.com/napari/napari/pull/8383))
- change default blending mode of images on split RGB ([#8385](https://github.com/napari/napari/pull/8385))
- Texture tiling ([#8395](https://github.com/napari/napari/pull/8395))
- Enh: simple speed up of Shapes `_extent_data` ([#8401](https://github.com/napari/napari/pull/8401))
- Enh: performance optimizations to ShapeList outlines ([#8403](https://github.com/napari/napari/pull/8403))
- Enh: Throttle shapes highlight ([#8404](https://github.com/napari/napari/pull/8404))
- Set viewer dimension based on number of axis labels ([#8436](https://github.com/napari/napari/pull/8436))
- Enh: Add label value to the labels tooltip ([#8495](https://github.com/napari/napari/pull/8495))
- Use 10x10 pixels rect around mouse position to invalidate tooltip ([#8500](https://github.com/napari/napari/pull/8500))
- Bump to vispy 0.16 ([#8501](https://github.com/napari/napari/pull/8501))
- Enable antialiasing on all Lines ([#8515](https://github.com/napari/napari/pull/8515))
- Avoid materializing property views when updating points highlight ([#8517](https://github.com/napari/napari/pull/8517))
- Add caching of outlines to reduce delay on Shapes zoom ([#8536](https://github.com/napari/napari/pull/8536))
- Don't warn user when a Zarr array with channel axis is passed ([#8559](https://github.com/napari/napari/pull/8559))
- Use negative indexing for viewer dims axis labels ([#8565](https://github.com/napari/napari/pull/8565))

## Performance

- perf: reallocate instead of clearing and repopulating set of selected points ([#6895](https://github.com/napari/napari/pull/6895))
- ENH: Speedup multiple shapes removal by concat'ing and np.deleting as a batch ([#8375](https://github.com/napari/napari/pull/8375))
- Enh: Speed up shapes box selection by using bounding boxes and vectorization ([#8378](https://github.com/napari/napari/pull/8378))
- Enh: simple speed up of Shapes `_extent_data` ([#8401](https://github.com/napari/napari/pull/8401))
- Enh: performance optimizations to ShapeList outlines ([#8403](https://github.com/napari/napari/pull/8403))
- Enh: Throttle shapes highlight ([#8404](https://github.com/napari/napari/pull/8404))
- Fix unnecessary overlay initialization on scenegraph update ([#8423](https://github.com/napari/napari/pull/8423))
- Fix overlay initialization and layer addition slowdown ([#8443](https://github.com/napari/napari/pull/8443))
- Cap point highlight size ([#8504](https://github.com/napari/napari/pull/8504))
- Add caching of outlines to reduce delay on Shapes zoom ([#8536](https://github.com/napari/napari/pull/8536))
- Fix the Shapes mode setter to use _is_creating for _finish_drawing and clear selection when going to ADD_* ([#8551](https://github.com/napari/napari/pull/8551))
- Delay scipy imports until needed ([#8561](https://github.com/napari/napari/pull/8561))
- Low hanging Labels painting performance improvement ([#8592](https://github.com/napari/napari/pull/8592))

## Bug Fixes

- Fix camera angles‽ ([#8281](https://github.com/napari/napari/pull/8281))
- bugfix & refactor: Use events for shape multiselection ([#8332](https://github.com/napari/napari/pull/8332))
- Fix conversion of vector images to coordinates of vectors ([#8366](https://github.com/napari/napari/pull/8366))
- initialize label selection spinbox to a correct value ([#8382](https://github.com/napari/napari/pull/8382))
- Bugfix: fix erratic Shape sorting ([#8408](https://github.com/napari/napari/pull/8408))
- Bugfix: update magicgui layer combobox if a layer is renamed ([#8412](https://github.com/napari/napari/pull/8412))
- bugfix: Ensure that edge_width is accounted for when using polygon lasso ([#8414](https://github.com/napari/napari/pull/8414))
- Fix Shapes thumbnail z ordering ([#8417](https://github.com/napari/napari/pull/8417))
- Fix unnecessary overlay initialization on scenegraph update ([#8423](https://github.com/napari/napari/pull/8423))
- Bugfix: update magicgui layer combobox if a layer is renamed using LayerList.renamed event ([#8429](https://github.com/napari/napari/pull/8429))
- Fix overlay initialization and layer addition slowdown ([#8443](https://github.com/napari/napari/pull/8443))
- Bugfix: ensure triangle colors are updated properly when using polygon lasso ([#8469](https://github.com/napari/napari/pull/8469))
- Speed up the deletion of layers by deduplicating the function calls  ([#8479](https://github.com/napari/napari/pull/8479))
- Bump to vispy 0.16 ([#8501](https://github.com/napari/napari/pull/8501))
- Cap point highlight size ([#8504](https://github.com/napari/napari/pull/8504))
- Bugfix: recurse through sub-fields when making connections in EventedSettings Config ([#8520](https://github.com/napari/napari/pull/8520))
- Fix dim order of rendering of 2D rgb data in 3D mode ([#8522](https://github.com/napari/napari/pull/8522))
- Fix numpy warning for pure python edge triangulation ([#8523](https://github.com/napari/napari/pull/8523))
- Do not use keyword argument when creating tooltip ([#8528](https://github.com/napari/napari/pull/8528))
- Fix angle label values in ndim popup widget ([#8535](https://github.com/napari/napari/pull/8535))
- Fix update of shape that lead to wrong rendering ([#8543](https://github.com/napari/napari/pull/8543))
- Close proper window on Ctrl+W ([#8548](https://github.com/napari/napari/pull/8548))
- Fix the Shapes mode setter to use _is_creating for _finish_drawing and clear selection when going to ADD_* ([#8551](https://github.com/napari/napari/pull/8551))
- Do not expose legacy angle ([#8557](https://github.com/napari/napari/pull/8557))
- Fix test on PySide6 by change mocking of qt methods ([#8560](https://github.com/napari/napari/pull/8560))
- Account for tile2data in the Labels polygon overlay ([#8563](https://github.com/napari/napari/pull/8563))
- ensure overlays are reused properly when gridded mode is enabled ([#8569](https://github.com/napari/napari/pull/8569))
- Stop welcome screen time on hiding of QtWiewer ([#8585](https://github.com/napari/napari/pull/8585))
- Fix Labels layer controls contiguous checkbox to initialize to the layer state ([#8594](https://github.com/napari/napari/pull/8594))

## Build Tools

- Bump urllib3 from 2.5.0 to 2.6.0 in /resources ([#8484](https://github.com/napari/napari/pull/8484))
- Migrate overlays to psygnal ([#8492](https://github.com/napari/napari/pull/8492))
- Bump urllib3 from 2.6.2 to 2.6.3 in /resources ([#8544](https://github.com/napari/napari/pull/8544))
- Add napari-metadata to napari dependencies ([#8576](https://github.com/napari/napari/pull/8576))
- Plugin dependencies for docs generation ([#8581](https://github.com/napari/napari/pull/8581))

## Documentation

- Create 3D_vectors_through_time.py ([#8461](https://github.com/napari/napari/pull/8461))
- Fix and improve `dock_widgets` docstrings ([#8494](https://github.com/napari/napari/pull/8494))
- Plugin dependencies for docs generation ([#8581](https://github.com/napari/napari/pull/8581))
- Remove deprecated `view_*` methods from docs materials ([docs#864](https://github.com/napari/docs/pull/864))
- Proposed roadmap updates for Q3 ([docs#873](https://github.com/napari/docs/pull/873))
- Enhance documentation build process with pixi integration and Windows… ([docs#876](https://github.com/napari/docs/pull/876))
- Pixi cross platform support ([docs#879](https://github.com/napari/docs/pull/879))
- Refactor contributor docs: prioritize pixi for local builds ([docs#880](https://github.com/napari/docs/pull/880))
- Modernize type annotation to use builtins ([docs#883](https://github.com/napari/docs/pull/883))
- Update dark mode colors ([docs#884](https://github.com/napari/docs/pull/884))
- Remove outdated mentions about PySide2 in documentation ([docs#889](https://github.com/napari/docs/pull/889))
- Explain accessing dock widget wrappers ([docs#892](https://github.com/napari/docs/pull/892))
- Add v0.7.0 release notes ([docs#893](https://github.com/napari/docs/pull/893))
- Add npe1 deprecation info to release notes ([docs#894](https://github.com/napari/docs/pull/894))
- Overwrite pooch downloader to fix Zenodo access problems ([docs#895](https://github.com/napari/docs/pull/895))
- Update docs ahead of 0.7.0 alpha ([docs#897](https://github.com/napari/docs/pull/897))
- Update website to use new logos ([docs#901](https://github.com/napari/docs/pull/901))
- Migrate and update hub customization from wiki to docs ([docs#906](https://github.com/napari/docs/pull/906))
- Improve open image section ([docs#907](https://github.com/napari/docs/pull/907))
- Remove mention of outdated plugin from quick start ([docs#908](https://github.com/napari/docs/pull/908))
- increase stack size to solve import recursion problem ([docs#912](https://github.com/napari/docs/pull/912))
- Update display text copy in shapes.md ([docs#914](https://github.com/napari/docs/pull/914))
- Update release notes for 0.7.0a1 ([docs#915](https://github.com/napari/docs/pull/915))
- Simplify titles in App installation instructions ([docs#918](https://github.com/napari/docs/pull/918))

## Other Pull Requests

- Add cell tracking example ([#8051](https://github.com/napari/napari/pull/8051))
- TYP: overload for `labeled_particles` incorrectly notes `Literal[True]=...` as default for `return_density` ([#8114](https://github.com/napari/napari/pull/8114))
- Decompose Layer code by move slicing to specialized class ([#8254](https://github.com/napari/napari/pull/8254))
- Update `hypothesis`, `psygnal` ([#8310](https://github.com/napari/napari/pull/8310))
- Add information about pyside 6 in error information ([#8313](https://github.com/napari/napari/pull/8313))
- Remove `numpydoc` as core dependency, instead use `docstring_parser` ([#8334](https://github.com/napari/napari/pull/8334))
- Remove deprecated `napari.view_*` methods ([#8337](https://github.com/napari/napari/pull/8337))
- [pre-commit.ci] pre-commit autoupdate ([#8354](https://github.com/napari/napari/pull/8354))
- Remove string translation from PR checklist ([#8362](https://github.com/napari/napari/pull/8362))
- Use coverage upload from shared workflows ([#8367](https://github.com/napari/napari/pull/8367))
- Specify napari revision in build and deploy docs workflow ([#8368](https://github.com/napari/napari/pull/8368))
- [pre-commit.ci] pre-commit autoupdate ([#8369](https://github.com/napari/napari/pull/8369))
- Switch PyPI downloads badge in README ([#8374](https://github.com/napari/napari/pull/8374))
- Update citation file for 0.7.0 ([#8384](https://github.com/napari/napari/pull/8384))
- [pre-commit.ci] pre-commit autoupdate ([#8386](https://github.com/napari/napari/pull/8386))
- Add check if PR author is in citation.cff ([#8388](https://github.com/napari/napari/pull/8388))
- skip check if author in citation.cff if bot created  PR ([#8392](https://github.com/napari/napari/pull/8392))
- Explicitly turn on full checkout for CircleCI ([#8396](https://github.com/napari/napari/pull/8396))
- ci(dependabot): bump the actions group with 3 updates ([#8400](https://github.com/napari/napari/pull/8400))
- Exclude dependabot from PR author check ([#8409](https://github.com/napari/napari/pull/8409))
- Fix cff check for bots ([#8420](https://github.com/napari/napari/pull/8420))
- Add colorbar and overlay tiling example ([#8433](https://github.com/napari/napari/pull/8433))
- Update `certifi`, `coverage`, `dask`, `fsspec`, `hypothesis`, `imageio`, `ipython`, `matplotlib`, `numpy`, `pandas`, `pillow`, `pint`, `psutil`, `psygnal`, `pydantic`, `pyqt6`, `pyside6`, `pytest`, `pytest-rerunfailures`, `pyyaml`, `rich`, `scipy`, `tensorstore`, `tifffile`, `toolz`, `virtualenv`, `wrapt`, `xarray` ([#8441](https://github.com/napari/napari/pull/8441))
- [pre-commit.ci] pre-commit autoupdate ([#8442](https://github.com/napari/napari/pull/8442))
- Stop updating python 3.10 docs constraints ([#8444](https://github.com/napari/napari/pull/8444))
- Block problematic numba in docs constraints ([#8454](https://github.com/napari/napari/pull/8454))
- Change link to getting started in Help menu ([#8455](https://github.com/napari/napari/pull/8455))
- Update `coverage`, `dask`, `fsspec`, `hypothesis`, `ipython`, `matplotlib`, `pydantic`, `pyqt6`, `pyside6`, `pytest`, `tensorstore`, `tifffile`, `xarray` ([#8456](https://github.com/napari/napari/pull/8456))
- [pre-commit.ci] pre-commit autoupdate ([#8458](https://github.com/napari/napari/pull/8458))
- ci(dependabot): bump the actions group across 1 directory with 7 updates ([#8460](https://github.com/napari/napari/pull/8460))
- Finish typing napari.layers.image ([#8462](https://github.com/napari/napari/pull/8462))
- Bugfix: For FeatureTable `edit` test, check the QAbstractItemView.State and not isPersistentEditorOpen ([#8463](https://github.com/napari/napari/pull/8463))
- Move Ashley Anderson citation to core team section ([#8467](https://github.com/napari/napari/pull/8467))
- Change `exclude` to `extend-exclude` in ruff config ([#8468](https://github.com/napari/napari/pull/8468))
- Maint: Update test_prereleases.yml to also test on pyside6 ([#8470](https://github.com/napari/napari/pull/8470))
- Fix constraints upgrade scripts ([#8473](https://github.com/napari/napari/pull/8473))
- Fix coverage upload in comprehensive tests ([#8474](https://github.com/napari/napari/pull/8474))
- Remove building of npe1 menu items for Plugins and Sample menus ([#8476](https://github.com/napari/napari/pull/8476))
- First emit warning, then replace projection mode when convert image to labels ([#8481](https://github.com/napari/napari/pull/8481))
- Finish typing utils.progress ([#8485](https://github.com/napari/napari/pull/8485))
- Maint: Update test_prereleases.yml to bump retries to 3 ([#8488](https://github.com/napari/napari/pull/8488))
- Block numba 0.62.0 for docs constraints ([#8490](https://github.com/napari/napari/pull/8490))
- [pre-commit.ci] pre-commit autoupdate ([#8491](https://github.com/napari/napari/pull/8491))
- [pre-commit.ci] pre-commit autoupdate ([#8499](https://github.com/napari/napari/pull/8499))
- Test on macos-15-intel without numba ([#8503](https://github.com/napari/napari/pull/8503))
- Move constraints calculation to script, allow upgrade subset of packages ([#8505](https://github.com/napari/napari/pull/8505))
- Workaround for Zenodo outage by downloading data from google drive.  ([#8508](https://github.com/napari/napari/pull/8508))
- Fix overlay tests ([#8513](https://github.com/napari/napari/pull/8513))
- Update `certifi`, `coverage`, `dask`, `fsspec`, `hypothesis`, `ipython`, `jsonschema`, `pandas`, `pillow`, `psutil`, `psygnal`, `pyqt6`, `scikit-image`, `scipy`, `superqt`, `tifffile`, `virtualenv` ([#8518](https://github.com/napari/napari/pull/8518))
- [pre-commit.ci] pre-commit autoupdate ([#8519](https://github.com/napari/napari/pull/8519))
- Reduce noise in benchmark logs ([#8525](https://github.com/napari/napari/pull/8525))
- Improve language in Citation PR Author check ([#8526](https://github.com/napari/napari/pull/8526))
- ci(dependabot): bump the actions group with 4 updates ([#8533](https://github.com/napari/napari/pull/8533))
- Enforce unix line endings ([#8541](https://github.com/napari/napari/pull/8541))
- Add temporary tox plugin for fix installation of dependency groups ([#8545](https://github.com/napari/napari/pull/8545))
- Revert: Add temporary tox plugin for fix installation of dependency groups (#8545) ([#8546](https://github.com/napari/napari/pull/8546))
- Fix path to constraints update script  ([#8553](https://github.com/napari/napari/pull/8553))
- [pre-commit.ci] pre-commit autoupdate ([#8554](https://github.com/napari/napari/pull/8554))
- Stop using `get_settings` during import time ([#8556](https://github.com/napari/napari/pull/8556))
- Remove 'axis' prefix from layer axis labels ([#8566](https://github.com/napari/napari/pull/8566))
- [pre-commit.ci] pre-commit autoupdate ([#8571](https://github.com/napari/napari/pull/8571))
- Remove npe1 code for reading and writing ([#8579](https://github.com/napari/napari/pull/8579))
- Fix build constraints with circular napari dependency ([#8588](https://github.com/napari/napari/pull/8588))
- Modify sphinx-external-toc version constraint to eliminate warnings ([#8591](https://github.com/napari/napari/pull/8591))
- Switch logo URL used for reader test ([#8596](https://github.com/napari/napari/pull/8596))
- ci(dependabot): bump the github-actions group with 4 updates ([docs#856](https://github.com/napari/docs/pull/856))
- Allow to redeploy docs after merge new commits to main branch ([docs#874](https://github.com/napari/docs/pull/874))
- Add mdformat to pre-commit config ([docs#878](https://github.com/napari/docs/pull/878))
- Reorg of the Usage section of the docs ([docs#881](https://github.com/napari/docs/pull/881))
- Explicitly turn on blobless checkout for CircleCI ([docs#882](https://github.com/napari/docs/pull/882))
- ci(dependabot): bump the github-actions group with 3 updates ([docs#885](https://github.com/napari/docs/pull/885))
- ci(dependabot): bump the github-actions group with 3 updates ([docs#890](https://github.com/napari/docs/pull/890))
- ci(dependabot): bump the github-actions group with 3 updates ([docs#898](https://github.com/napari/docs/pull/898))
- Allow to use local copy of napari when using pixi ([docs#900](https://github.com/napari/docs/pull/900))
- Fix pixi tasks for different environments ([docs#904](https://github.com/napari/docs/pull/904))
- Stop tracking `docs/release/index.md` so that it is ignored ([docs#905](https://github.com/napari/docs/pull/905))
- Maint Update PIP_CONSTRAINT to UV_CONSTRAINT in config ([docs#909](https://github.com/napari/docs/pull/909))
- Remove pixi configuration for macos intel ([docs#913](https://github.com/napari/docs/pull/913))


## 17 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Ashley Anderson](https://github.com/napari/napari/commits?author=aganders3) - @aganders3
- [Daniel Zhang](https://github.com/napari/napari/commits?author=DanGonite57) - @DanGonite57
- [David Stansby](https://github.com/napari/napari/commits?author=dstansby) ([docs](https://github.com/napari/docs/commits?author=dstansby))  - @dstansby
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) ([docs](https://github.com/napari/docs/commits?author=DragaDoncila))  - @DragaDoncila
- [Edward Andò](https://github.com/napari/napari/commits?author=edwardando) - @edwardando +
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Guillaume Witz](https://github.com/napari/napari/commits?author=guiwitz) ([docs](https://github.com/napari/docs/commits?author=guiwitz))  - @guiwitz
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag))  - @brisvag
- [Marco Edward Gorelli](https://github.com/napari/napari/commits?author=MarcoGorelli) - @MarcoGorelli +
- [Melissa Weber Mendonça](https://github.com/napari/napari/commits?author=melissawm) ([docs](https://github.com/napari/docs/commits?author=melissawm))  - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) ([docs](https://github.com/napari/docs/commits?author=psobolewskiPhD))  - @psobolewskiPhD
- [Qin Yu](https://github.com/napari/napari/commits?author=qin-yu) ([docs](https://github.com/napari/docs/commits?author=qin-yu))  - @qin-yu +
- [Rensu Theart](https://github.com/napari/docs/commits?author=rensutheart) - @rensutheart +
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [Yohsuke T. Fukai](https://github.com/napari/napari/commits?author=yfukai) - @yfukai +
- [Zuzana Čočková](https://github.com/napari/napari/commits?author=cockovaz) - @cockovaz +

## 22 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Ashley Anderson](https://github.com/napari/napari/commits?author=aganders3) - @aganders3
- [Carlos Mario Rodriguez Reza](https://github.com/napari/docs/commits?author=carlosmariorr) - @carlosmariorr
- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Daniel Zhang](https://github.com/napari/napari/commits?author=DanGonite57) - @DanGonite57
- [David Stansby](https://github.com/napari/napari/commits?author=dstansby) ([docs](https://github.com/napari/docs/commits?author=dstansby))  - @dstansby
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) ([docs](https://github.com/napari/docs/commits?author=DragaDoncila))  - @DragaDoncila
- [Edward Andò](https://github.com/napari/napari/commits?author=edwardando) - @edwardando +
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Guillaume Witz](https://github.com/napari/napari/commits?author=guiwitz) ([docs](https://github.com/napari/docs/commits?author=guiwitz))  - @guiwitz
- [Jacopo Abramo](https://github.com/napari/docs/commits?author=jacopoabramo) - @jacopoabramo
- [Johannes Soltwedel](https://github.com/napari/docs/commits?author=jo-mueller) - @jo-mueller
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag))  - @brisvag
- [Marcelo Zoccoler](https://github.com/napari/docs/commits?author=zoccoler) - @zoccoler
- [Marco Edward Gorelli](https://github.com/napari/napari/commits?author=MarcoGorelli) - @MarcoGorelli +
- [Melissa Weber Mendonça](https://github.com/napari/napari/commits?author=melissawm) ([docs](https://github.com/napari/docs/commits?author=melissawm))  - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) ([docs](https://github.com/napari/docs/commits?author=psobolewskiPhD))  - @psobolewskiPhD
- [Rensu Theart](https://github.com/napari/docs/commits?author=rensutheart) - @rensutheart +
- [Sesan](https://github.com/napari/docs/commits?author=Olusesan) - @Olusesan
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [Yohsuke T. Fukai](https://github.com/napari/napari/commits?author=yfukai) - @yfukai +
- [Zuzana Čočková](https://github.com/napari/napari/commits?author=cockovaz) - @cockovaz +
