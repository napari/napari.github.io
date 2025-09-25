# napari 0.6.5
⚠️ *Note: these release notes are still in draft while 0.6.5 is in release candidate testing.* ⚠️

*Fri, Sep 26, 2025*


We're happy to announce the release of napari 0.6.5!
napari is a fast, interactive, multi-dimensional image viewer for Python.
It's designed for browsing, annotating, and analyzing large multi-dimensional
images. It's built on top of Qt (for the GUI), vispy (for performant GPU-based
rendering), and the scientific Python stack (numpy, scipy).

For more information, examples, and documentation, please visit our website,
https://napari.org.

## Highlights

- Add colormap overlay ([#7832](https://github.com/napari/napari/pull/7832))
- add option to define startup script in settings ([#8188](https://github.com/napari/napari/pull/8188))
- Multilayer features table ([#8189](https://github.com/napari/napari/pull/8189))
- Add a tasks manager status for plugins actions and napari processes ([#8211](https://github.com/napari/napari/pull/8211))
- Migrate non-user extras to dependency-groups ([#8227](https://github.com/napari/napari/pull/8227))
- Auto generate release index with highlights and timeline ([docs#838](https://github.com/napari/docs/pull/838))

## New Features

- Feature: labels layer with a closed predefined set of named labels + combobox selection ([#5875](https://github.com/napari/napari/pull/5875))
- Tiling canvas overlays ([#7836](https://github.com/napari/napari/pull/7836))
- Use information about units when calculate scale of layers when render ([#7889](https://github.com/napari/napari/pull/7889))
- Add hot-reload for the devs ([#8007](https://github.com/napari/napari/pull/8007))
- Cursor overlay ([#8017](https://github.com/napari/napari/pull/8017))
- add option to define startup script in settings ([#8188](https://github.com/napari/napari/pull/8188))
- Multilayer features table ([#8189](https://github.com/napari/napari/pull/8189))

## Improvements

- [Update] Added `remove` and `remove_selected` in Shapes and Points ([#8031](https://github.com/napari/napari/pull/8031))
- Add Features using Features Table widget ([#8093](https://github.com/napari/napari/pull/8093))
- Example from SciPy 2025 tutorial; image warping ([#8111](https://github.com/napari/napari/pull/8111))
- Add a tasks manager status for plugins actions and napari processes ([#8211](https://github.com/napari/napari/pull/8211))
- Use single settings path for all `uv tool run` ([#8250](https://github.com/napari/napari/pull/8250))
- Add "Hide completed" checkbox to Tracks layer for improved visualization ([#8253](https://github.com/napari/napari/pull/8253))
- Handle affine layer metadata when splitting RGB images ([#8256](https://github.com/napari/napari/pull/8256))
- Update the Shapes select_all_shapes action to allow selection in all modes and add notification of number ([#8292](https://github.com/napari/napari/pull/8292))

## Bug Fixes

- Layer controls widgets refactor ([#7355](https://github.com/napari/napari/pull/7355))
- Set the dimensions of the label equal to the maximum value of the layers world ([#8098](https://github.com/napari/napari/pull/8098))
- Fix disappearing points ([#8223](https://github.com/napari/napari/pull/8223))
- Fix shape position by using a stable algorithm for sorting z_position ([#8232](https://github.com/napari/napari/pull/8232))
- Remove console print action shortcut to prevent collision with command palette shortcut ([#8233](https://github.com/napari/napari/pull/8233))
- Do not update thumbnail on Labels empty slice ([#8251](https://github.com/napari/napari/pull/8251))
- fix slice_from_axis to wrap zarr in dask to keep lazy behavior ([#8260](https://github.com/napari/napari/pull/8260))
- Add menu-xdg to XPRA containers ([#8263](https://github.com/napari/napari/pull/8263))
- Check for zarr in `images_to_stack` and use da.stack instead of np.stack ([#8267](https://github.com/napari/napari/pull/8267))
- Better handling of remote zarr ([#8268](https://github.com/napari/napari/pull/8268))

## API Changes

- Expose force_sync context manager ([#7908](https://github.com/napari/napari/pull/7908))

## Documentation

- Use EffVer ([#8243](https://github.com/napari/napari/pull/8243))
- Add funding information to the home page ([docs#818](https://github.com/napari/docs/pull/818))
- Update version switcher for 0.6.4 ([docs#826](https://github.com/napari/docs/pull/826))
- Fix version switcher URL to prevent problems with unversioned pages ([docs#827](https://github.com/napari/docs/pull/827))
- Update documentation for dependencies groups ([docs#829](https://github.com/napari/docs/pull/829))
- Update and restructure the preferences guide ([docs#834](https://github.com/napari/docs/pull/834))
- Fix @jaimergp's last name ([docs#835](https://github.com/napari/docs/pull/835))
- Auto generate release index with highlights and timeline ([docs#838](https://github.com/napari/docs/pull/838))
- Add EffVer to release guide and link to checklist template ([docs#839](https://github.com/napari/docs/pull/839))

## Other Pull Requests

- Add codespell support (config, workflow to detect/not fix) and make it fix few typos ([#7619](https://github.com/napari/napari/pull/7619))
- Clipping planes control widget ([#7993](https://github.com/napari/napari/pull/7993))
- Add cell tracking example ([#8051](https://github.com/napari/napari/pull/8051))
- [Update] Added `pop` for `Points` and `Shapes` ([#8072](https://github.com/napari/napari/pull/8072))
- Welcome widget as an overlay ([#8117](https://github.com/napari/napari/pull/8117))
- Improve workflow naming by prefixing triage- doc- make- ([#8159](https://github.com/napari/napari/pull/8159))
- Move the test that requires `make_napari_viewer` from `test_qt_viewer` ([#8176](https://github.com/napari/napari/pull/8176))
- Bump `superqt` min version ([#8212](https://github.com/napari/napari/pull/8212))
- Change headless setup for Windows and Linux to `pyvista/setup-headless-display-action` ([#8216](https://github.com/napari/napari/pull/8216))
- Update `coverage`, `hypothesis`, `pint`, `pyopengl`, `virtualenv`, `xarray` ([#8221](https://github.com/napari/napari/pull/8221))
- [pre-commit.ci] pre-commit autoupdate ([#8222](https://github.com/napari/napari/pull/8222))
- Use global register for units in ScaleBar ([#8226](https://github.com/napari/napari/pull/8226))
- Wait until viewer show in the test in `make_napari_viewer` ([#8228](https://github.com/napari/napari/pull/8228))
- Update Qt backends used in tests to test more on Qt6 than Qt5 ([#8229](https://github.com/napari/napari/pull/8229))
- Change properties for features usage in the Vectors layer controls ([#8231](https://github.com/napari/napari/pull/8231))
- Add cache for pooch on CI for Linux jobs ([#8235](https://github.com/napari/napari/pull/8235))
- Temporary increase timeout of macOS jobs ([#8237](https://github.com/napari/napari/pull/8237))
- Update `coverage`, `hypothesis`, `ipython`, `matplotlib`, `pyside6`, `pytest-rerunfailures`, `tifffile` ([#8239](https://github.com/napari/napari/pull/8239))
- ci(dependabot): bump the actions group with 6 updates ([#8240](https://github.com/napari/napari/pull/8240))
- Make `connect_setattr` handle value conversion for widgets like checkboxes ([#8244](https://github.com/napari/napari/pull/8244))
- Update `fsspec`, `hypothesis`, `pytest`, `pytest-rerunfailures`, `xarray` ([#8249](https://github.com/napari/napari/pull/8249))
- [pre-commit.ci] pre-commit autoupdate ([#8252](https://github.com/napari/napari/pull/8252))
- Add typing to points mouse bindings ([#8255](https://github.com/napari/napari/pull/8255))
- Use proper name for ruff pre-commit hook and reorder hooks ([#8259](https://github.com/napari/napari/pull/8259))
- [maint] Revert back to windows-2022 for windows runners ([#8265](https://github.com/napari/napari/pull/8265))
- Update `dask`, `hypothesis`, `pydantic`, `qtconsole`, `scipy`, `tifffile` ([#8270](https://github.com/napari/napari/pull/8270))
- Add napari to trove classifiers to populate builtins on napari hub ([#8277](https://github.com/napari/napari/pull/8277))
- [maint] Drop alpha mentions ([#8288](https://github.com/napari/napari/pull/8288))
- Add release checklist template ([#8295](https://github.com/napari/napari/pull/8295))
- Update `coverage`, `dask`, `hypothesis`, `lxml`, `numpy`, `psutil`, `tensorstore`, `tifffile` ([#8296](https://github.com/napari/napari/pull/8296))
- Move Jaime Rodríguez-Guerra to core-team section of CITATION.cff ([#8298](https://github.com/napari/napari/pull/8298))
- Add pooch cache for build docs ([docs#830](https://github.com/napari/docs/pull/830))
- ci(dependabot): bump the github-actions group with 3 updates ([docs#831](https://github.com/napari/docs/pull/831))
- Add Jaime Rodríguez-Guerra to core-team ([docs#844](https://github.com/napari/docs/pull/844))


## 9 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) - @dalthviz
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jaime Rodríguez-Guerra](https://github.com/napari/napari/commits?author=jaimergp) ([docs](https://github.com/napari/docs/commits?author=jaimergp))  - @jaimergp
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [Kanai Potts](https://github.com/napari/napari/commits?author=8bitbiscuit) - @8bitbiscuit
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) ([docs](https://github.com/napari/docs/commits?author=psobolewskiPhD))  - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko


## 18 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Andrew Sweet](https://github.com/napari/docs/commits?author=andy-sweet) - @andy-sweet
- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) - @dalthviz
- [Davis Bennett](https://github.com/napari/docs/commits?author=d-v-b) - @d-v-b
- [Draga Doncila Pop](https://github.com/napari/docs/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jaime Rodríguez-Guerra](https://github.com/napari/napari/commits?author=jaimergp) ([docs](https://github.com/napari/docs/commits?author=jaimergp))  - @jaimergp
- [Johannes Soltwedel](https://github.com/napari/docs/commits?author=jo-mueller) - @jo-mueller
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Marcelo Zoccoler](https://github.com/napari/docs/commits?author=zoccoler) - @zoccoler
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) ([docs](https://github.com/napari/docs/commits?author=psobolewskiPhD))  - @psobolewskiPhD
- [Rahul Kumar](https://github.com/napari/docs/commits?author=rahul713rk) - @rahul713rk
- [rwkozar](https://github.com/napari/docs/commits?author=rwkozar) - @rwkozar
- [Sesan](https://github.com/napari/docs/commits?author=Olusesan) - @Olusesan
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [Yaroslav Halchenko](https://github.com/napari/docs/commits?author=yarikoptic) - @yarikoptic

