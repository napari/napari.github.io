# napari 0.5.2

*Tuesday, Aug 13, 2024*

We’re happy to announce the release of napari 0.5.2!

napari is a fast, interactive, multi-dimensional image viewer for Python. It’s designed for exploring, annotating, and analyzing multi-dimensional images. It’s built on Qt (for the GUI), VisPy (for performant GPU-based rendering), and the scientific Python stack (NumPy, SciPy, and friends).

For more information, examples, and documentation, please visit our website: https://napari.org/

## Highlights

This is primarily a bug-fix release, but we snuck a couple of new features in
there, including smoother, prettier, better rendering of Labels volumes in 3D
([#7100](https://github.com/napari/napari/pull/7100)) and the ability to
display scale bar at a fixed length in world coordinates, rather than having it
resize dynamically to take up a small part of the screen
([#7167](https://github.com/napari/napari/pull/7100)).

See below for the full list of changes!

## New Features

- Add option for smoother labels rendering in 3D ([#7100](https://github.com/napari/napari/pull/7100))
- Add optional fixed `length` parameter to scale bar  ([#7167](https://github.com/napari/napari/pull/7167))

## Improvements

- Update shortcuts.py to have `Enter` be primary Shapes completion ([#7063](https://github.com/napari/napari/pull/7063))
- Change shortcuts `_mark_conflicts` logic to always compare between strings representations of shortcuts ([#7124](https://github.com/napari/napari/pull/7124))
- Allow easy call single benchmark ([#7145](https://github.com/napari/napari/pull/7145))

## Bug Fixes

- [bugfix] update Point size slider on selection (current_size event) ([#7137](https://github.com/napari/napari/pull/7137))
- Disconnect all dims events when closing viewer ([#7140](https://github.com/napari/napari/pull/7140))
- Update event connection order ([#7150](https://github.com/napari/napari/pull/7150))
- Run slider animation without using timer ([#7158](https://github.com/napari/napari/pull/7158))
- Emit highlight event only if selection changed ([#7162](https://github.com/napari/napari/pull/7162))
- [Bugfix] Only import darkdetect when needed ([#7163](https://github.com/napari/napari/pull/7163))
- FIX `QtViewer._open_files_dialog` handing of `stack` ([#7172](https://github.com/napari/napari/pull/7172))

## Documentation

- Update example annotate_segmentation_with_text.py to add link to the tutorial ([#7134](https://github.com/napari/napari/pull/7134))
- Document command ID naming conventions ([docs#405](https://github.com/napari/docs/pull/405))
- Turn on warnings as error option for sphinx build ([docs#409](https://github.com/napari/docs/pull/409))
- Update version switcher for v0.5.1 ([docs#468](https://github.com/napari/docs/pull/468))
- Add documentation for run benchmark under debugger ([docs#470](https://github.com/napari/docs/pull/470))
- Update installation notes about macOS arm processors and Qt5 backends  ([docs#471](https://github.com/napari/docs/pull/471))
- Fix docs CI ([docs#472](https://github.com/napari/docs/pull/472))
- Add October and July workshops from 2023 ([docs#473](https://github.com/napari/docs/pull/473))
- Add 0.5.2 release notes ([docs#476](https://github.com/napari/docs/pull/476))
- Remove warning and update date on 0.5.2 release notes ([docs#478](https://github.com/napari/docs/pull/478))

## Other Pull Requests

- [pre-commit.ci] pre-commit autoupdate ([#7000](https://github.com/napari/napari/pull/7000))
- Add CI action to check that set milestone is the next release ([#7083](https://github.com/napari/napari/pull/7083))
- Use app-model `KeyBinding.to_text` and `KeyCode.os_symbol` over `Shortcut` logic ([#7113](https://github.com/napari/napari/pull/7113))
- Add some basic codeowners ([#7118](https://github.com/napari/napari/pull/7118))
- Clean action manager to avoid side effects during tests ([#7120](https://github.com/napari/napari/pull/7120))
- [maint] Drop singularity action to fix failed container action ([#7121](https://github.com/napari/napari/pull/7121))
- Remove `post` identifier in fetching release notes ([#7125](https://github.com/napari/napari/pull/7125))
- Update `coverage`, `hypothesis`, `magicgui`, `matplotlib`, `napari-plugin-manager`, `npe2`, `pytest`, `tensorstore`, `tifffile`, `tqdm`, `xarray` ([#7138](https://github.com/napari/napari/pull/7138))
- ci(dependabot): bump the actions group across 1 directory with 2 updates ([#7147](https://github.com/napari/napari/pull/7147))
- [Maint] Update version_denylist.txt to block mpl 3.9.1 on windows ([#7154](https://github.com/napari/napari/pull/7154))
- [Maint] Increase timeout in `test_async_out_of_bounds_layer_loaded` to 500 ms ([#7157](https://github.com/napari/napari/pull/7157))
- Use `delete` instead of `get`method for delete `ready to merge` label ([#7160](https://github.com/napari/napari/pull/7160))
- [pre-commit.ci] pre-commit autoupdate ([#7161](https://github.com/napari/napari/pull/7161))
- fix: typo in shape model name ([#7166](https://github.com/napari/napari/pull/7166))
- Update `dask`, `hypothesis`, `magicgui`, `matplotlib`, `pyyaml` ([#7169](https://github.com/napari/napari/pull/7169))
- Update docs constraints to pin sphinx<8 ([#7170](https://github.com/napari/napari/pull/7170))
- Move parallel setting for coverage calculation to tox.ini ([#7173](https://github.com/napari/napari/pull/7173))
- Clarify workflow names ([#7174](https://github.com/napari/napari/pull/7174))
- correct typos in comments ([#7175](https://github.com/napari/napari/pull/7175))
- MNT Parametrize `test_open_files_dialog` to check for `stack` `True` and `False` ([#7176](https://github.com/napari/napari/pull/7176))
- Update `babel`, `hypothesis`, `lxml`, `numpydoc`, `tifffile` ([#7179](https://github.com/napari/napari/pull/7179))
- Remove `post` identifier when determine deploy directory ([docs#467](https://github.com/napari/docs/pull/467))

## 12 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [andrew sweet](https://github.com/napari/napari/commits?author=andy-sweet) - @andy-sweet
- [Antoine J.-F. Salomon](https://github.com/napari/napari/commits?author=AJFSalomon) - @AJFSalomon +
- [Ashley Anderson](https://github.com/napari/napari/commits?author=aganders3) - @aganders3
- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) - @dalthviz
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Johannes Soltwedel](https://github.com/napari/napari/commits?author=jo-mueller) - @jo-mueller
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [kyle i. s. harrington](https://github.com/napari/docs/commits?author=kephale) - @kephale
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Lucy Liu](https://github.com/napari/napari/commits?author=lucyleeow) ([docs](https://github.com/napari/docs/commits?author=lucyleeow))  - @lucyleeow
- [Melissa Weber Mendonça](https://github.com/napari/napari/commits?author=melissawm) ([docs](https://github.com/napari/docs/commits?author=melissawm))  - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD

## 13 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [andrew sweet](https://github.com/napari/napari/commits?author=andy-sweet) - @andy-sweet
- [Antoine J.-F. Salomon](https://github.com/napari/napari/commits?author=AJFSalomon) - @AJFSalomon +
- [Ashley Anderson](https://github.com/napari/napari/commits?author=aganders3) - @aganders3
- [Draga Doncila Pop](https://github.com/napari/docs/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Johannes Soltwedel](https://github.com/napari/napari/commits?author=jo-mueller) - @jo-mueller
- [Jordão Bragantini](https://github.com/napari/docs/commits?author=JoOkuma) - @JoOkuma
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Lucy Liu](https://github.com/napari/napari/commits?author=lucyleeow) ([docs](https://github.com/napari/docs/commits?author=lucyleeow))  - @lucyleeow
- [Melissa Weber Mendonça](https://github.com/napari/napari/commits?author=melissawm) ([docs](https://github.com/napari/docs/commits?author=melissawm))  - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Wouter-Michiel Vierdag](https://github.com/napari/docs/commits?author=melonora) - @melonora

