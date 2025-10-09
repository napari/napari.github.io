# napari 0.6.2

*Tue, Jul 01, 2025*

We’re happy to announce the release of napari 0.6.2!

napari is a fast, interactive, multi-dimensional image viewer for Python. It’s designed for exploring, annotating, and analyzing multi-dimensional images. It’s built on Qt (for the GUI), VisPy (for performant GPU-based rendering), and the scientific Python stack (NumPy, SciPy, and friends).

For more information, examples, and documentation, please visit our website: https://napari.org/

## Highlights

### The amazing new Grid mode! 🗺️

The visualization of Grid mode has been redone from the ground up! This new Grid mode [(#7870)](https://github.com/napari/napari/pull/7870) now puts each layer into its own view (a VisPy Viewbox) with cameras linked together. Now, you can pan and zoom one view, and all other views in the grid will follow along. Layers are no longer awkwardly transformed into the same world space and displayed in a grid, only to make comparing the details of each a challenge.

Grid based exploration is now fluid, fast, and intuitive, especially when working with large images and 3D+ data! The mouse can even be used over one View, while updating the data, such as a label or shape annotation, in the selected layer of a different view. The usual napari overlays can now also be added to each grid, instead of just the canvas (eg. `viewer.scale_bar.gridded = True`).

Grid mode spacing now works proportionally to the layer extents (i.e. [0,1), as in 0.6.0) or as a pixel value [1,1500) and will automatically adjust if needed.

![grid mode](https://github.com/user-attachments/assets/fbcb216c-666b-43a6-bf25-aad82d5e9d92)

To coincide with this new Grid mode, we have chosen to reverse the ordering of layers in the grid [(#8053)](https://github.com/napari/napari/pull/8053). The first layer added to the viewer will now be at the top left of the grid, and the last layer added will be at the bottom right; new layers will be added to the bottom right of the grid. If you prefer the previous behavior, you can set the Grid Stride to `-1` in the Preferences dialog. 

![Stride preference](https://github.com/user-attachments/assets/528aebca-d623-4f9a-97f4-691329d2a2a7)

### The Features Table Widget is now a napari builtin! 📊

The features table from [napari-properties-viewer](https://github.com/kevinyamauchi/napari-properties-viewer) is now a builtin widget in napari [(#7877)](https://github.com/napari/napari/pull/7877) *and* greatly improved! This widget allows you to view and edit the properties of Points, Shapes, and Labels layers in a table widget.

The widget can be opened from the `Layers` menu -> `Visualize` -> `Features table widget (napari builtins)` or from the command palette.  You can also save the properties table to a CSV file. Check out the [Features table widget](https://napari.org/dev/gallery/features_table_widget.html) example to learn more.

![Features table widget in napari](https://github.com/user-attachments/assets/2c218f05-6510-4192-b5c8-fb6d135e4863)

### Community developments! 📅

We are excited to share our new [active roadmap](https://napari.org/stable/roadmaps/active_roadmap.html) which is a living document that will be updated as we continue to develop napari. This document is intended to help the community understand the priorities of the napari team and to help us all work together to make napari better. 

We are also now including all napari related events in the [community calendar](https://napari.org/stable/community/meeting_schedule.html) and as an [image.sc post](https://forum.image.sc/t/napari-community-meetings-and-events/113689), including conferences, tutorials, sprints, virtual seminars, and more. If you have an event you would like to add, please reach out to us!

### Some great features for contributors! 🛠️

1. **Contributing documentation is now a much smoother experience!** By default, new documentation will build in around 3 minutes, instead of the previous 20 minutes. This speed is thanks to new, slimmer `make` commands (`slimfast` by default) that can also be triggered in PRs with a bot (eg. `@napari-bot make docs`). Read our updated [docs contribution guide](https://napari.org/dev/developers/contributing/documentation/index.html) and reach out for help.
2. **The organization of the napari repo has been updated by moving into a `src/` directory [(#7952)](https://github.com/napari/napari/pull/7952).** This is modern best practice in Python projects (and what has long been standard in our [napari-plugin-template](https://github.com/napari/napari-plugin-template)) to avoid issues with relative imports and *should* now always result in importing the napari version installed in the current environment. For developers, especially of pull requests prior to this release, you may have many merge conflicts to resolve. Please ping the napari team if you would like help resolving these conflicts.
3. **There is now public API to access widgets docked in the viewer [(#7965)](https://github.com/napari/napari/pull/7965).** Check out the new documentation on the napari website to learn more about using this API to [communicate between widgets](https://napari.org/dev/plugins/advanced_topics/widget_communication.html). If you previously used `viewer.window._dock_widgets`, you should now use `viewer.window.dock_widgets`.


## New Features

- Grid mode using vispy ViewBox and linked cameras ([#7870](https://github.com/napari/napari/pull/7870))
- Features table widget as builtin ([#7877](https://github.com/napari/napari/pull/7877))

## Improvements

- Add check if there is mix of local and non local installation ([#7745](https://github.com/napari/napari/pull/7745))
- Reduce warmup of numba if non numba backend is selected ([#7917](https://github.com/napari/napari/pull/7917))
- Optional rotation handle for selection box overlay + simplify inheritance for Vispy overlays ([#7958](https://github.com/napari/napari/pull/7958))
- Add public API to get access to docked widgets ([#7965](https://github.com/napari/napari/pull/7965))
- Allow to use ViewerModel as annotation of plugin constructor argument ([#8002](https://github.com/napari/napari/pull/8002))
- Update [shapes]: 'make select_all_shapes' keybinding a toggle ([#8014](https://github.com/napari/napari/pull/8014))
- Update[shortcuts]: add Ctrl/Cmd-A as secondary keybinding for select_all_shapes ([#8015](https://github.com/napari/napari/pull/8015))
- Fix Shapes layer to work with Features Table ([#8048](https://github.com/napari/napari/pull/8048))
- Reverse canvas grid order ([#8053](https://github.com/napari/napari/pull/8053))
- Improve tooltips for Grid attributes ([#8058](https://github.com/napari/napari/pull/8058))

## Performance

- [Shapes] Use the plural methods to update colors of all selected shapes at once ([#7995](https://github.com/napari/napari/pull/7995))

## Bug Fixes

- Fix scalebar theme connection ([#7902](https://github.com/napari/napari/pull/7902))
- Don't add widgets to non-contributable menus ([#7926](https://github.com/napari/napari/pull/7926))
- Fix handle mouse events ([#7936](https://github.com/napari/napari/pull/7936))
- Fix moving of first/last vertex of polygons added in ring mode ([#7942](https://github.com/napari/napari/pull/7942))
- Update shapes highlight on zoom ([#7953](https://github.com/napari/napari/pull/7953))
- Fix invalidate of extent cache in Layers ([#7972](https://github.com/napari/napari/pull/7972))
- [Points] Fix events.data_indices for ActionType.ADDED event when adding single point ([#7983](https://github.com/napari/napari/pull/7983))
- Fix interaction box initialization ([#8011](https://github.com/napari/napari/pull/8011))
- Fix angles not showing correctly in UI ([#8013](https://github.com/napari/napari/pull/8013))
- Bugfix: ensure multiscale images can be merged using contextual action ([#8025](https://github.com/napari/napari/pull/8025))
- Fix Shapes layer to work with Features Table ([#8048](https://github.com/napari/napari/pull/8048))
- Fix grid stride layering ([#8057](https://github.com/napari/napari/pull/8057))

## Build Tools

- Bump requests from 2.32.3 to 2.32.4 in /resources ([#8010](https://github.com/napari/napari/pull/8010))

## Documentation

- Update README to use `imshow` and add example to generate image ([#7989](https://github.com/napari/napari/pull/7989))
- Update docstring in `mouse_drag_callback.py` ([#8019](https://github.com/napari/napari/pull/8019))
- Add information about conda version and downloads to badges ([#8054](https://github.com/napari/napari/pull/8054))
- Add links to napari troubleshooting documentation ([#8061](https://github.com/napari/napari/pull/8061))
- Update version switcher for 0.6.1 ([docs#713](https://github.com/napari/docs/pull/713))
- Update contributing docs page ([docs#715](https://github.com/napari/docs/pull/715))
- Update code of conduct committee members ([docs#716](https://github.com/napari/docs/pull/716))
- Add features table widget ([docs#718](https://github.com/napari/docs/pull/718))
- Update docker build links ([docs#720](https://github.com/napari/docs/pull/720))
- Add initial documentation about widget communication ([docs#721](https://github.com/napari/docs/pull/721))
- update grid mode explanation and add video ([docs#725](https://github.com/napari/docs/pull/725))
- Update installation.md to link to conda getting started not miniconda ([docs#726](https://github.com/napari/docs/pull/726))
- Update governance docs ([docs#729](https://github.com/napari/docs/pull/729))
- Initial release notes for alpha of 0.6.2 ([docs#734](https://github.com/napari/docs/pull/734))
- Add active roadmap document ([docs#735](https://github.com/napari/docs/pull/735))
- Use darker blue for community meetings in napari calendar ([docs#736](https://github.com/napari/docs/pull/736))
- Add draft of 0.6.2 release notes ([docs#743](https://github.com/napari/docs/pull/743))
- 0.6.2rc1 release notes ([docs#744](https://github.com/napari/docs/pull/744))
- Final 0.6.2 Release Notes ([docs#751](https://github.com/napari/docs/pull/751))
- Add troubleshooting section about mixed local and non local installations ([docs#752](https://github.com/napari/docs/pull/752))

## Other Pull Requests

- Add docs constraints for python 3.12 ([#7714](https://github.com/napari/napari/pull/7714))
- Include Qt PyPI server for pre-releases ([#7803](https://github.com/napari/napari/pull/7803))
- Refactor layer overlays visuals from VispyLayer to VispyCanvas ([#7835](https://github.com/napari/napari/pull/7835))
- Update `dask`, `hypothesis`, `numpy`, `tensorstore`, `vispy` ([#7948](https://github.com/napari/napari/pull/7948))
- [pre-commit.ci] pre-commit autoupdate ([#7951](https://github.com/napari/napari/pull/7951))
- Restore image in Readme ([#7959](https://github.com/napari/napari/pull/7959))
- Add cron check to update reader extensions v3 ([#7966](https://github.com/napari/napari/pull/7966))
- Update `coverage`, `dask`, `fsspec`, `hypothesis`, `pydantic`, `tifffile`, `vispy` ([#7967](https://github.com/napari/napari/pull/7967))
- fix vendored script and trigger workflow on pull_request ([#7968](https://github.com/napari/napari/pull/7968))
- [pre-commit.ci] pre-commit autoupdate ([#7970](https://github.com/napari/napari/pull/7970))
- Remove `layers_change` event that is marked to be removed in 0.5.0 ([#7971](https://github.com/napari/napari/pull/7971))
- [maintenance] Use Wandalen/wretry.action to auto-retry fail in --pre tests ([#7986](https://github.com/napari/napari/pull/7986))
- Update `hypothesis`, `ipython`, `jsonschema`, `tifffile` ([#7987](https://github.com/napari/napari/pull/7987))
- [pre-commit.ci] pre-commit autoupdate ([#7988](https://github.com/napari/napari/pull/7988))
- Remove the reset_scroll_progress action and keybinding ([#7990](https://github.com/napari/napari/pull/7990))
- Stop status thread on Keyboard Interruption (Ctrl+C) ([#7994](https://github.com/napari/napari/pull/7994))
- Update `hypothesis`, `magicgui`, `pandas`, `pyqt6`, `pytest`, `pytest-pretty` ([#8000](https://github.com/napari/napari/pull/8000))
- Update pyproject.toml to fix coverage paths (alt) ([#8001](https://github.com/napari/napari/pull/8001))
- [Maintenance] Remove redundant initialization in Points layer and restructure for clarity ([#8005](https://github.com/napari/napari/pull/8005))
- Fix numba fail of compile on GHA macOS runners ([#8018](https://github.com/napari/napari/pull/8018))
- Update `certifi`, `coverage`, `hypothesis`, `pydantic`, `superqt`, `tifffile`, `xarray` ([#8029](https://github.com/napari/napari/pull/8029))
- Update `hypothesis`, `pytest`, `superqt` ([#8036](https://github.com/napari/napari/pull/8036))
- Stop benchmark reporting if benchmark action is skipped ([#8037](https://github.com/napari/napari/pull/8037))
- Update `app-model` pin to >=0.4.0, update `hypothesis`, `pygments`, `scipy` ([#8041](https://github.com/napari/napari/pull/8041))
- [pre-commit.ci] pre-commit autoupdate ([#8042](https://github.com/napari/napari/pull/8042))
- Bump bermuda to 0.1.5 ([#8052](https://github.com/napari/napari/pull/8052))
- Update `hypothesis`, `lxml`, `numpydoc` ([#8060](https://github.com/napari/napari/pull/8060))
- Fix comment and manual dispatch triggered build jobs ([docs#723](https://github.com/napari/docs/pull/723))
- Test passing PR number instead of ref on triggered build ([docs#738](https://github.com/napari/docs/pull/738))
- [maint] fix circleCI branch naming in trigger action ([docs#739](https://github.com/napari/docs/pull/739))
- [Enh] When `ready-to-merge` is applied, do a full build of docs ([docs#745](https://github.com/napari/docs/pull/745))
- Only build artifact on ready-to-merge label ([docs#749](https://github.com/napari/docs/pull/749))


## 13 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Ashley Anderson](https://github.com/napari/docs/commits?author=aganders3) - @aganders3
- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) ([docs](https://github.com/napari/docs/commits?author=DragaDoncila))  - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) - @jacopoabramo +
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni))  - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag))  - @brisvag
- [Lukasz Migas](https://github.com/napari/napari/commits?author=lukasz-migas) - @lukasz-migas
- [Maximilian Mayrhauser](https://github.com/napari/napari/commits?author=Llewi) - @Llewi +
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) ([docs](https://github.com/napari/docs/commits?author=psobolewskiPhD))  - @psobolewskiPhD
- [Rahul Kumar](https://github.com/napari/napari/commits?author=rahul713rk) - @rahul713rk +
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko


## 11 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Ashley Anderson](https://github.com/napari/docs/commits?author=aganders3) - @aganders3
- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) ([docs](https://github.com/napari/docs/commits?author=DragaDoncila))  - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) - @jacopoabramo +
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni))  - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag))  - @brisvag
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) ([docs](https://github.com/napari/docs/commits?author=psobolewskiPhD))  - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [Wouter-Michiel Vierdag](https://github.com/napari/docs/commits?author=melonora) - @melonora

