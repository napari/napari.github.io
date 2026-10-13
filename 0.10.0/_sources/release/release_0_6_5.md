# napari 0.6.5

*Wed, Oct 1, 2025*

We're happy to announce the release of napari 0.6.5!
napari is a fast, interactive, multi-dimensional image viewer for Python.
It's designed for browsing, annotating, and analyzing large multi-dimensional
images. It's built on top of Qt (for the GUI), vispy (for performant GPU-based
rendering), and the scientific Python stack (numpy, scipy).

For more information, examples, and documentation, please visit our website,
https://napari.org.

napari follows [EffVer (Intended Effort Versioning)](https://effver.org/); this is a **Meso** release containing awesome new features, but some effort may be needed when updating previous projects to use this version.

## Highlights

This a sizeable release containing a few new exciting features and a lot of bugfixes.

### EffVer and no more _alpha_

It is our first release officially following the [EffVer versioning scheme](https://effver.org/). We also took this occasion to (finally!) remove the `Alpha` qualifier from the project ([#8288](https://github.com/napari/napari/pull/8288)), to better reflect the reality of the extensive use of napari in production. Note that these changes are just formally bringing up to date the state of the project: our development continues as before!

### Define a startup script for custom launch behaviour

Do you have a code snippet that you always find yourself running after you launch napari? No more! You can now put this code in a script and set its path in the new `startup script` setting ([#8188](https://github.com/napari/napari/pull/8188)), and it will be executed every time napari opens. It's just a python script, so sky's the limit :) We found it particularly useful for adding custom colormaps, setting up the scale bar *just right*, or automatically launching our favourite plugin on startup.

![Screenshot of the application settings menu highlighting the field for the startup script path](https://github.com/user-attachments/assets/7b0e5e5c-252b-45a0-ae76-aac88e488cbc)

### Automatically tiled overlays and ColorBar overlay

Canvas overlays such as `scale_bar`, `text_overlay`, and `colorbar` overlay are now automatically tiling ([#7836](https://github.com/napari/napari/pull/7836)), preventing annoying overlap and making them easier to use without having to manage positioning. Wait, `colorbar` overlay you said? You heard it right! This is a new overlay ([#7832](https://github.com/napari/napari/pull/7832)) that shows a color bar legend, and it works with any layer which uses a colormap. All of this works seamlessly with multiple overlays and even grid mode:

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

![Image depicting the napari viewer in grid mode with scale bars and color bars enabled](https://github.com/user-attachments/assets/622b2d36-11a7-4c55-9550-c82ddebc2fda)

Alternatively, you may also activate the `colorbar` (and other layer-related overlays such as `bounding_box`) from the graphical interface by right clicking on selected layers in the layerlist and toggling the relative entries in the **Visualization** submenu ([#8319](https://github.com/napari/napari/pull/8319)).

### Task manager will now try to prevent losing unfinished work

We added a new task manager ([#8211](https://github.com/napari/napari/pull/8211)) which automatically registers any running `thread_worker`, showing a confirmation dialog if you attempt to close napari while a task is running.

### New *remove* and *pop* methods for Points and Shapes

Points and Shapes can now be easily removed, not just added :P ([#8031](https://github.com/napari/napari/pull/8031) and [#8072](https://github.com/napari/napari/pull/8072)).

### A few shiny new updates to our website and documentation

[napari.org](https://napari.org/) can now be visited in *dark mode* ([docs#840](https://github.com/napari/docs/pull/840))! You could try out this new relaxing colorscheme while exploring the new overhauled [Preferences documentation](https://napari.org/stable/guides/preferences.html#preferences) section 😉 ([docs#834](https://github.com/napari/docs/pull/834)).
There's also new sections on [viewer overlays](https://napari.org/stable/tutorials/fundamentals/viewer.html#viewer-overlays) and [layer overlays](https://napari.org/stable/guides/layers.html#layer-overlays), to better explain how to use these old and new tools.
Our [release notes page](https://napari.org/dev/release/index.html) also received a glow-up ([docs#838](https://github.com/napari/docs/pull/838)), displaying past release highlights in collapsible boxes in the timeline. This should make it easier to quickly catch up when updating across multiple releases!

### Extra dependencies for development moved to dependency groups

A note for our contributors and plugin developers: we transferred our dev-related extra dependencies to the new python dependency groups ([#8227](https://github.com/napari/napari/pull/8227)). The installation is therefore slightly different, for example: `pip install napari --group testing` instead of `pip install napari[testing]`. The previous method will continue to work, but we will likely remove the old `optional-dependences` approach in a future release.

## New Features

- Add color bar overlay ([#7832](https://github.com/napari/napari/pull/7832))
- Tiling canvas overlays ([#7836](https://github.com/napari/napari/pull/7836))
- Add `pop()` for `Points` and `Shapes` ([#8072](https://github.com/napari/napari/pull/8072))
- add option to define startup script in settings ([#8188](https://github.com/napari/napari/pull/8188))
- use `Selection` class in shapes layer ([#8297](https://github.com/napari/napari/pull/8297))

## Improvements

- Add `remove()` in Shapes and Points ([#8031](https://github.com/napari/napari/pull/8031))
- Example from SciPy 2025 tutorial; image warping ([#8111](https://github.com/napari/napari/pull/8111))
- Add a tasks manager status for plugins actions and napari processes ([#8211](https://github.com/napari/napari/pull/8211))
- Use single settings path for all `uv tool run` ([#8250](https://github.com/napari/napari/pull/8250))
- Add "Hide completed" checkbox to Tracks layer for improved visualization ([#8253](https://github.com/napari/napari/pull/8253))
- Handle affine layer metadata when splitting RGB images ([#8256](https://github.com/napari/napari/pull/8256))
- Update the Shapes select_all_shapes action to allow selection in all modes and add notification of number ([#8292](https://github.com/napari/napari/pull/8292))
- Implement toggling colorbar and bounding box in layerlist context menu ([#8319](https://github.com/napari/napari/pull/8319))
- Add warning for big stride when toggling grid mode ([#8320](https://github.com/napari/napari/pull/8320))

## Bug Fixes

- Layer controls widgets refactor ([#7355](https://github.com/napari/napari/pull/7355))
- Fix effect of scaling when converting shapes to labels ([#8098](https://github.com/napari/napari/pull/8098))
- Fix disappearing points ([#8223](https://github.com/napari/napari/pull/8223))
- Fix shape position by using a stable algorithm for sorting z_position ([#8232](https://github.com/napari/napari/pull/8232))
- Remove console print action shortcut to prevent collision with command palette shortcut ([#8233](https://github.com/napari/napari/pull/8233))
- Do not update thumbnail on Labels empty slice ([#8251](https://github.com/napari/napari/pull/8251))
- Handle affine layer metadata when splitting RGB images ([#8256](https://github.com/napari/napari/pull/8256))
- fix slice_from_axis to wrap zarr in dask to keep lazy behavior ([#8260](https://github.com/napari/napari/pull/8260))
- Add menu-xdg to XPRA containers ([#8263](https://github.com/napari/napari/pull/8263))
- Check for zarr in `images_to_stack` and use da.stack instead of np.stack ([#8267](https://github.com/napari/napari/pull/8267))
- Better handling of remote zarr ([#8268](https://github.com/napari/napari/pull/8268))
- Use custom logger formatting to most of argument to string ([#8305](https://github.com/napari/napari/pull/8305))

## Documentation

- Use EffVer ([#8243](https://github.com/napari/napari/pull/8243))
- Use shared workflows for build docs ([#8308](https://github.com/napari/napari/pull/8308))
- Bump napari-sphinx-theme in deps and constraints ([#8315](https://github.com/napari/napari/pull/8315))
- Update release notes 0.6.5 for full release ([docs#855](https://github.com/napari/docs/pull/855))
- Add funding information to the home page ([docs#818](https://github.com/napari/docs/pull/818))
- Update version switcher for 0.6.4 ([docs#826](https://github.com/napari/docs/pull/826))
- Fix version switcher URL to prevent problems with unversioned pages ([docs#827](https://github.com/napari/docs/pull/827))
- Update documentation for dependencies groups ([docs#829](https://github.com/napari/docs/pull/829))
- Update and restructure the preferences guide ([docs#834](https://github.com/napari/docs/pull/834))
- Fix @jaimergp's last name ([docs#835](https://github.com/napari/docs/pull/835))
- Auto generate release index with highlights and timeline ([docs#838](https://github.com/napari/docs/pull/838))
- Add EffVer to release guide and link to checklist template ([docs#839](https://github.com/napari/docs/pull/839))
- Enable dark mode for website ([docs#840](https://github.com/napari/docs/pull/840))
- Add draft of 0.6.5 release notes ([docs#845](https://github.com/napari/docs/pull/845))
- Add documentation for startup script. ([docs#846](https://github.com/napari/docs/pull/846))
- Add some info about running python scripts via cli ([docs#847](https://github.com/napari/docs/pull/847))
- Add note about workers registration as tasks and close confirmation dialog when closing napari GUI via close button ([docs#851](https://github.com/napari/docs/pull/851))
- Release notes v0.6.5 ([docs#853](https://github.com/napari/docs/pull/853))
- Re-add palette shortcut to viewer guide ([docs#854](https://github.com/napari/docs/pull/854))
- Add overlays to docs ([docs#857](https://github.com/napari/docs/pull/857))

## Other Pull Requests

- Move the test that requires `make_napari_viewer` from `test_qt_viewer` ([#8176](https://github.com/napari/napari/pull/8176))
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
- Add release checklist template ([#8295](https://github.com/napari/napari/pull/8295))
- Update `coverage`, `dask`, `hypothesis`, `lxml`, `numpy`, `psutil`, `tensorstore`, `tifffile` ([#8296](https://github.com/napari/napari/pull/8296))
- Move Jaime Rodríguez-Guerra to core-team section of CITATION.cff ([#8298](https://github.com/napari/napari/pull/8298))
- Do not use verbose mode for headless test ([#8300](https://github.com/napari/napari/pull/8300))
- Migrate macos-13 to macos-15-intel runner ([#8301](https://github.com/napari/napari/pull/8301))
- Update `remove_ready_to_merge` so it only sweeps on pushed and crons ([#8302](https://github.com/napari/napari/pull/8302))
- [maint] Revert docs constraints changes from #8270 ([#8307](https://github.com/napari/napari/pull/8307))
- Fix constraints generation ([#8309](https://github.com/napari/napari/pull/8309))
- CI: Fix `github.rest.issues.removeLabel` call ([#8311](https://github.com/napari/napari/pull/8311))
- Fix little typos ([#8316](https://github.com/napari/napari/pull/8316))
- Add pooch cache for build docs ([docs#830](https://github.com/napari/docs/pull/830))
- ci(dependabot): bump the github-actions group with 3 updates ([docs#831](https://github.com/napari/docs/pull/831))
- add docs/release/index.md to gitignore ([docs#843](https://github.com/napari/docs/pull/843))
- Add Jaime Rodríguez-Guerra to core-team ([docs#844](https://github.com/napari/docs/pull/844))
- Bump python to 3.12 for build docs workflows ([docs#848](https://github.com/napari/docs/pull/848))
- Use shared workflow for build docs ([docs#850](https://github.com/napari/docs/pull/850))

## 14 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Constantin Aronssohn](https://github.com/napari/napari/commits?author=cnstt) - @cnstt
- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) ([docs](https://github.com/napari/docs/commits?author=dalthviz)) - @dalthviz
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki)) - @Czaki
- [Jaime Rodríguez-Guerra](https://github.com/napari/napari/commits?author=jaimergp) ([docs](https://github.com/napari/docs/commits?author=jaimergp)) - @jaimergp
- [Johannes Soltwedel](https://github.com/napari/napari/commits?author=jo-mueller) - @jo-mueller
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [Jules Vanaret](https://github.com/napari/napari/commits?author=jules-vanaret) - @jules-vanaret
- [Kanai Potts](https://github.com/napari/napari/commits?author=8bitbiscuit) - @8bitbiscuit
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag)) - @brisvag
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) ([docs](https://github.com/napari/docs/commits?author=psobolewskiPhD)) - @psobolewskiPhD
- [Rahul Kumar](https://github.com/napari/napari/commits?author=rahul713rk) - @rahul713rk
- [rwkozar](https://github.com/napari/napari/commits?author=rwkozar) - @rwkozar
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko)) - @TimMonko

## 16 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Andrew Sweet](https://github.com/napari/docs/commits?author=andy-sweet) - @andy-sweet
- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) ([docs](https://github.com/napari/docs/commits?author=dalthviz)) - @dalthviz
- [Davis Bennett](https://github.com/napari/docs/commits?author=d-v-b) - @d-v-b
- [Draga Doncila Pop](https://github.com/napari/docs/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki)) - @Czaki
- [Jaime Rodríguez-Guerra](https://github.com/napari/napari/commits?author=jaimergp) ([docs](https://github.com/napari/docs/commits?author=jaimergp)) - @jaimergp
- [Johannes Soltwedel](https://github.com/napari/napari/commits?author=jo-mueller) - @jo-mueller
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [Jules Vanaret](https://github.com/napari/napari/commits?author=jules-vanaret) - @jules-vanaret
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag)) - @brisvag
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) ([docs](https://github.com/napari/docs/commits?author=psobolewskiPhD)) - @psobolewskiPhD
- [Rahul Kumar](https://github.com/napari/napari/commits?author=rahul713rk) - @rahul713rk
- [rwkozar](https://github.com/napari/napari/commits?author=rwkozar) - @rwkozar
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko)) - @TimMonko
