# napari 0.7.0
⚠️ *Note: these release notes are still in draft while 0.7.0 is in release candidate testing.* ⚠️

*Fri, Jan 09, 2026*

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

For more details on this change and how it affects plugins, see the [detailed
guide](adapted-plugin-guide). If you are a plugin author and your plugin is not
yet npe2-compatible, please see our [npe2 migration
guide](npe2-migration-guide), and, if you encounter any issues, get in touch in
our [Plugins Zulip chat
channel](https://napari.zulipchat.com/#narrow/channel/309872-plugins) or by
coming to one of our [community meetings](meeting-schedule).

### Grid Overlay

...


- Add grid overlay ([#7827](https://github.com/napari/napari/pull/7827))
- Multilayer features table ([#8189](https://github.com/napari/napari/pull/8189))
- Fix camera angles‽ ([#8281](https://github.com/napari/napari/pull/8281))
- Remove `numpydoc` as a base and testing dependency ([#8338](https://github.com/napari/napari/pull/8338))
- (WIP) Histogram ([#8391](https://github.com/napari/napari/pull/8391))
- Texture tiling ([#8395](https://github.com/napari/napari/pull/8395))
- Fix overlay initialization and layer addition slowdown ([#8443](https://github.com/napari/napari/pull/8443))
- Remove shim setting and warning dialog ([#8448](https://github.com/napari/napari/pull/8448))
- Remove PySide2 support ([#8450](https://github.com/napari/napari/pull/8450))
- Speed up the deletion of layers by deduplicating the function calls  ([#8479](https://github.com/napari/napari/pull/8479))

## New Features

- Add grid overlay ([#7827](https://github.com/napari/napari/pull/7827))
- Use information about units when calculate scale of layers when render ([#7889](https://github.com/napari/napari/pull/7889))
- Cursor overlay ([#8017](https://github.com/napari/napari/pull/8017))
- Multilayer features table ([#8189](https://github.com/napari/napari/pull/8189))
- Better text overlay (and subclasses) ([#8236](https://github.com/napari/napari/pull/8236))
- (WIP) Histogram ([#8391](https://github.com/napari/napari/pull/8391))

## Improvements

- perf: reallocate instead of clearing and repopulating set of selected points ([#6895](https://github.com/napari/napari/pull/6895))
- Add a seed argument to built-in samples with random seeds ([#8317](https://github.com/napari/napari/pull/8317))
- Enh: clarify Points selection keybinding behavior: select_in_slice not append by default, add new select_append_in_slice ([#8339](https://github.com/napari/napari/pull/8339))
- Enh: Improve zarr reading by builtins ([#8355](https://github.com/napari/napari/pull/8355))
- ENH: Speedup multiple shapes removal by concat'ing and np.deleting as a batch ([#8375](https://github.com/napari/napari/pull/8375))
- Reordering default colormap to split channels  ([#8383](https://github.com/napari/napari/pull/8383))
- change default blending mode of images on split RGB ([#8385](https://github.com/napari/napari/pull/8385))
- Texture tiling ([#8395](https://github.com/napari/napari/pull/8395))
- Enh: simple speed up of Shapes `_extent_data` ([#8401](https://github.com/napari/napari/pull/8401))
- Enh: performance optimizations to ShapeList outlines ([#8403](https://github.com/napari/napari/pull/8403))
- Set viewer dimension based on number of axis labels ([#8436](https://github.com/napari/napari/pull/8436))
- Enh: Add label value to the labels tooltip ([#8495](https://github.com/napari/napari/pull/8495))
- Use 10x10 pixels rect around mouse position to invalidate tooltip ([#8500](https://github.com/napari/napari/pull/8500))
- Bump to vispy 0.16 ([#8501](https://github.com/napari/napari/pull/8501))
- Avoid materializing property views when updating points highlight ([#8517](https://github.com/napari/napari/pull/8517))

## Performance

- perf: reallocate instead of clearing and repopulating set of selected points ([#6895](https://github.com/napari/napari/pull/6895))
- ENH: Speedup multiple shapes removal by concat'ing and np.deleting as a batch ([#8375](https://github.com/napari/napari/pull/8375))
- Enh: simple speed up of Shapes `_extent_data` ([#8401](https://github.com/napari/napari/pull/8401))
- Enh: performance optimizations to ShapeList outlines ([#8403](https://github.com/napari/napari/pull/8403))
- Fix unnecessary overlay initialization on scenegraph update ([#8423](https://github.com/napari/napari/pull/8423))
- Fix overlay initialization and layer addition slowdown ([#8443](https://github.com/napari/napari/pull/8443))
- Cap point highlight size ([#8504](https://github.com/napari/napari/pull/8504))

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

## API Changes

- Expose force_sync context manager ([#7908](https://github.com/napari/napari/pull/7908))

## Build Tools

- Bump urllib3 from 2.5.0 to 2.6.0 in /resources ([#8484](https://github.com/napari/napari/pull/8484))
- Migrate overlays to psygnal ([#8492](https://github.com/napari/napari/pull/8492))

## Documentation

- Create 3D_vectors_through_time.py ([#8461](https://github.com/napari/napari/pull/8461))
- Fix and improve `dock_widgets` docstrings ([#8494](https://github.com/napari/napari/pull/8494))
- Remove deprecated `view_*` methods from docs materials ([docs#864](https://github.com/napari/docs/pull/864))
- Proposed roadmap updates for Q3 ([docs#873](https://github.com/napari/docs/pull/873))
- Enhance documentation build process with pixi integration and Windows… ([docs#876](https://github.com/napari/docs/pull/876))
- Pixi cross platform support ([docs#879](https://github.com/napari/docs/pull/879))
- Refactor contributor docs: prioritize pixi for local builds ([docs#880](https://github.com/napari/docs/pull/880))
- Reorg of the Usage section of the docs ([docs#881](https://github.com/napari/docs/pull/881))
- Modernize type annotation to use builtins ([docs#883](https://github.com/napari/docs/pull/883))
- Update dark mode colors ([docs#884](https://github.com/napari/docs/pull/884))
- Remove outdated mentions about PySide2 in documentation ([docs#889](https://github.com/napari/docs/pull/889))
- Explain accessing dock widget wrappers ([docs#892](https://github.com/napari/docs/pull/892))
- Add v0.7.0 release notes ([docs#893](https://github.com/napari/docs/pull/893))
- Add npe1 deprecation info to release notes ([docs#894](https://github.com/napari/docs/pull/894))
- Overwrite pooch downloader to fix Zenodo access problems ([docs#895](https://github.com/napari/docs/pull/895))

## Other Pull Requests

- Add codespell support (config, workflow to detect/not fix) and make it fix few typos ([#7619](https://github.com/napari/napari/pull/7619))
- Clipping planes control widget ([#7993](https://github.com/napari/napari/pull/7993))
- Add cell tracking example ([#8051](https://github.com/napari/napari/pull/8051))
- TYP: overload for `labeled_particles` incorrectly notes `Literal[True]=...` as default for `return_density` ([#8114](https://github.com/napari/napari/pull/8114))
- Decompose Layer code by move slicing to specialized class ([#8254](https://github.com/napari/napari/pull/8254))
- Update `hypothesis`, `psygnal` ([#8310](https://github.com/napari/napari/pull/8310))
- Add information about pyside 6 in error information ([#8313](https://github.com/napari/napari/pull/8313))
- Remove `numpydoc` as core dependency, instead use `docstring_parser` ([#8334](https://github.com/napari/napari/pull/8334))
- Remove deprecated `napari.view_*` methods ([#8337](https://github.com/napari/napari/pull/8337))
- Add inertia to camera for panning and rotation ([#8349](https://github.com/napari/napari/pull/8349))
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
- Set custom font ([#8426](https://github.com/napari/napari/pull/8426))
- Update `certifi`, `coverage`, `dask`, `fsspec`, `hypothesis`, `imageio`, `ipython`, `matplotlib`, `numpy`, `pandas`, `pillow`, `pint`, `psutil`, `psygnal`, `pydantic`, `pyqt6`, `pyside6`, `pytest`, `pytest-rerunfailures`, `pyyaml`, `rich`, `scipy`, `tensorstore`, `tifffile`, `toolz`, `virtualenv`, `wrapt`, `xarray` ([#8441](https://github.com/napari/napari/pull/8441))
- [pre-commit.ci] pre-commit autoupdate ([#8442](https://github.com/napari/napari/pull/8442))
- Stop updating python 3.10 docs constraints ([#8444](https://github.com/napari/napari/pull/8444))
- Block problematic numba in docs constraints ([#8454](https://github.com/napari/napari/pull/8454))
- Change link to getting started in Help menu ([#8455](https://github.com/napari/napari/pull/8455))
- Update `coverage`, `dask`, `fsspec`, `hypothesis`, `ipython`, `matplotlib`, `pydantic`, `pyqt6`, `pyside6`, `pytest`, `tensorstore`, `tifffile`, `xarray` ([#8456](https://github.com/napari/napari/pull/8456))
- Use new logos! ([#8457](https://github.com/napari/napari/pull/8457))
- [pre-commit.ci] pre-commit autoupdate ([#8458](https://github.com/napari/napari/pull/8458))
- ci(dependabot): bump the actions group across 1 directory with 7 updates ([#8460](https://github.com/napari/napari/pull/8460))
- Finish typing napari.layers.image ([#8462](https://github.com/napari/napari/pull/8462))
- Bugfix: For FeatureTable `edit` test, check the QAbstractItemView.State and not isPersistentEditorOpen ([#8463](https://github.com/napari/napari/pull/8463))
- Move Ashley Anderson citation to core team section ([#8467](https://github.com/napari/napari/pull/8467))
- Change `exclude` to `extend-exclude` in ruff config ([#8468](https://github.com/napari/napari/pull/8468))
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
- [pre-commit.ci] pre-commit autoupdate ([#8519](https://github.com/napari/napari/pull/8519))
- ci(dependabot): bump the github-actions group with 4 updates ([docs#856](https://github.com/napari/docs/pull/856))
- Allow to redeploy docs after merge new commits to main branch ([docs#874](https://github.com/napari/docs/pull/874))
- Add mdformat to pre-commit config ([docs#878](https://github.com/napari/docs/pull/878))
- Explicitly turn on blobless checkout for CircleCI ([docs#882](https://github.com/napari/docs/pull/882))
- ci(dependabot): bump the github-actions group with 3 updates ([docs#885](https://github.com/napari/docs/pull/885))
- ci(dependabot): bump the github-actions group with 3 updates ([docs#890](https://github.com/napari/docs/pull/890))


## 15 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Ashley Anderson](https://github.com/napari/napari/commits?author=aganders3) - @aganders3
- [David Stansby](https://github.com/napari/napari/commits?author=dstansby) - @dstansby
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) ([docs](https://github.com/napari/docs/commits?author=DragaDoncila))  - @DragaDoncila
- [Edward Andò](https://github.com/napari/napari/commits?author=edwardando) - @edwardando +
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Marco Edward Gorelli](https://github.com/napari/napari/commits?author=MarcoGorelli) - @MarcoGorelli +
- [Melissa Weber Mendonça](https://github.com/napari/napari/commits?author=melissawm) ([docs](https://github.com/napari/docs/commits?author=melissawm))  - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Qin Yu](https://github.com/napari/napari/commits?author=qin-yu) ([docs](https://github.com/napari/docs/commits?author=qin-yu))  - @qin-yu +
- [Rensu Theart](https://github.com/napari/docs/commits?author=rensutheart) - @rensutheart +
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [Yohsuke T. Fukai](https://github.com/napari/napari/commits?author=yfukai) - @yfukai +
- [Zuzana Čočková](https://github.com/napari/napari/commits?author=cockovaz) - @cockovaz +

## 21 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Ashley Anderson](https://github.com/napari/napari/commits?author=aganders3) - @aganders3
- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Daniel Zhang](https://github.com/napari/docs/commits?author=DanGonite57) - @DanGonite57
- [David Stansby](https://github.com/napari/napari/commits?author=dstansby) - @dstansby
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) ([docs](https://github.com/napari/docs/commits?author=DragaDoncila))  - @DragaDoncila
- [Edward Andò](https://github.com/napari/napari/commits?author=edwardando) - @edwardando +
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Guillaume Witz](https://github.com/napari/docs/commits?author=guiwitz) - @guiwitz
- [Jacopo Abramo](https://github.com/napari/docs/commits?author=jacopoabramo) - @jacopoabramo
- [Johannes Soltwedel](https://github.com/napari/docs/commits?author=jo-mueller) - @jo-mueller
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Marcelo Zoccoler](https://github.com/napari/docs/commits?author=zoccoler) - @zoccoler
- [Marco Edward Gorelli](https://github.com/napari/napari/commits?author=MarcoGorelli) - @MarcoGorelli +
- [Melissa Weber Mendonça](https://github.com/napari/napari/commits?author=melissawm) ([docs](https://github.com/napari/docs/commits?author=melissawm))  - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Rensu Theart](https://github.com/napari/docs/commits?author=rensutheart) - @rensutheart +
- [Sesan](https://github.com/napari/docs/commits?author=Olusesan) - @Olusesan
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [Yaroslav Halchenko](https://github.com/napari/docs/commits?author=yarikoptic) - @yarikoptic
- [Zuzana Čočková](https://github.com/napari/napari/commits?author=cockovaz) - @cockovaz +
