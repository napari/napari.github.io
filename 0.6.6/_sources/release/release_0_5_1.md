# napari 0.5.1

*Thursday, Jul 25, 2024*

We're happy to announce the release of napari 0.5.1!

napari is a fast, interactive, multi-dimensional image viewer for Python.
It's designed for exploring, annotating, and analyzing multi-dimensional
images. It's built on Qt (for the GUI), VisPy (for performant GPU-based
rendering), and the scientific Python stack (NumPy, SciPy, and friends).

For more information, examples, and documentation, please visit our website:
https://napari.org/

## Highlights

napari 0.5.1 is a bugfix release hot on the heels of
[napari 0.5.0](release_0_5_0). It fixes a critical bug with creating viewers
multiple times within a single IPython/Jupyter session
([#7106](https://github.com/napari/napari/pull/7106)), as well as regressions
with viewing multiscale 3D time series
([#7103](https://github.com/napari/napari/pull/7103)) and with converting image
layers to labels layers ([#7095](https://github.com/napari/napari/pull/7095)).

It also fixes a bug with NumPy 2 support
([#7104](https://github.com/napari/napari/pull/7104)) and our storing of layer
axis info when using the `channel_axis` keyword argument for images
([#7089](https://github.com/napari/napari/pull/7089)).

Read on for the full list of changes since the last version from just two weeks
ago!

## Improvements

- [enh] add an `add_plane` convenience method to ClippingPlaneList ([#6921](https://github.com/napari/napari/pull/6921))
- Cleanup _image_key_bindings ([#7116](https://github.com/napari/napari/pull/7116))
- Add napari-plugin-manager to optional info list ([#7117](https://github.com/napari/napari/pull/7117))

## Bug Fixes

- Move the _is_created assignment to the top ([#5078](https://github.com/napari/napari/pull/5078))
- [Bugfix] Fix logic in setting settings using env vars. ([#6669](https://github.com/napari/napari/pull/6669))
- Fix handling of units and axis_labels in add_image ([#7089](https://github.com/napari/napari/pull/7089))
- Fix label conversion with proj mode ([#7095](https://github.com/napari/napari/pull/7095))
- Account for displayed dimensions in multiscale translate adjustment ([#7103](https://github.com/napari/napari/pull/7103))
- fix call of np.clip in _update_thumbnail ([#7104](https://github.com/napari/napari/pull/7104))
- Always add `Empty` context key, even if `action` is already registered ([#7106](https://github.com/napari/napari/pull/7106))
- fix condition of adding asterix, when save reader of path ([#7112](https://github.com/napari/napari/pull/7112))
- Normalize path when searching for a plugin to open file ([#7127](https://github.com/napari/napari/pull/7127))

## Documentation

- Add link to partners in README.md ([#7069](https://github.com/napari/napari/pull/7069))
- Restore README image ([#7098](https://github.com/napari/napari/pull/7098))
- Update docs constraints files for new napari-sphinx-theme release ([#7111](https://github.com/napari/napari/pull/7111))
- Update release notes for 0.5.1 with new PRs ([docs#466](https://github.com/napari/docs/pull/466))
- Update Bundled App Installation Instructions ([docs#74](https://github.com/napari/docs/pull/74))
- Update Makefile to be consistent ([docs#448](https://github.com/napari/docs/pull/448))
- Use plausible configuration by the PyData Sphinx Theme ([docs#453](https://github.com/napari/docs/pull/453))
- More fixes to contributing documentation guide ([docs#454](https://github.com/napari/docs/pull/454))
- Add location field to community calendar ([docs#455](https://github.com/napari/docs/pull/455))
- Fix footer items ([docs#456](https://github.com/napari/docs/pull/456))
- Add docs about the new `napari-base` structure ([docs#457](https://github.com/napari/docs/pull/457))
- Add draft 0.5.1 release notes ([docs#464](https://github.com/napari/docs/pull/464))
- Update draft warning on 0.5.1 release notes ([docs#465](https://github.com/napari/docs/pull/465))
- Update release notes for 0.5.1 with new PRs ([docs#466](https://github.com/napari/docs/pull/466))

## Other Pull Requests

- Remove ready to merge on update of constraints PR ([#6984](https://github.com/napari/napari/pull/6984))
- Update `app-model`, `coverage`, `dask`, `fsspec`, `hypothesis`, `imageio`, `ipython`, `jsonschema`, `matplotlib`, `napari-svg`, `numpy`, `pillow`, `pint`, `pydantic`, `pyqt5`, `pyqt6`, `pytest`, `scipy`, `tifffile` ([#7045](https://github.com/napari/napari/pull/7045))
- Add actionlint on CI ([#7049](https://github.com/napari/napari/pull/7049))
- fix: set `target_commitish` for commit sha to fix benchmarks ([#7091](https://github.com/napari/napari/pull/7091))
- Use `viewer.layers` instead of  `_layers.model().sourceModel()._root` for dummy context creation ([#7109](https://github.com/napari/napari/pull/7109))
- Limit setuptools version for minimum requirements test ([#7110](https://github.com/napari/napari/pull/7110))
- [Maint] Update dockerfile for xpra source change ([#7115](https://github.com/napari/napari/pull/7115))
- Fix pinning packages workflow by remove special pinning from macOS and add special for Windows ([#7119](https://github.com/napari/napari/pull/7119))
- Trigger docs deployment on tagged commit ([#7122](https://github.com/napari/napari/pull/7122))
- Update version switcher to include 0.5.0 ([docs#452](https://github.com/napari/docs/pull/452))
- deploy docs on manual trigger ([docs#462](https://github.com/napari/docs/pull/462))
- Add actionlint to prevent GHA workflow errors ([docs#463](https://github.com/napari/docs/pull/463))


## 9 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [danieldegroot2](https://github.com/napari/napari/commits?author=danieldegroot2) - @danieldegroot2 +
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) - @Czaki
- [jaime rodriguez-guerra](https://github.com/napari/napari/commits?author=jaimergp) ([docs](https://github.com/napari/docs/commits?author=jaimergp))  - @jaimergp
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni))  - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Markus Stabrin](https://github.com/napari/napari/commits?author=mstabrin) - @mstabrin
- [Melissa Weber Mendonça](https://github.com/napari/napari/commits?author=melissawm) ([docs](https://github.com/napari/docs/commits?author=melissawm))  - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD


## 11 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [andrew sweet](https://github.com/napari/docs/commits?author=andy-sweet) - @andy-sweet
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) - @DragaDoncila
- [Genevieve Buckley](https://github.com/napari/docs/commits?author=GenevieveBuckley) - @GenevieveBuckley
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) - @Czaki
- [jaime rodriguez-guerra](https://github.com/napari/napari/commits?author=jaimergp) ([docs](https://github.com/napari/docs/commits?author=jaimergp))  - @jaimergp
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni))  - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Lucy Liu](https://github.com/napari/docs/commits?author=lucyleeow) - @lucyleeow
- [Melissa Weber Mendonça](https://github.com/napari/napari/commits?author=melissawm) ([docs](https://github.com/napari/docs/commits?author=melissawm))  - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Wouter-Michiel Vierdag](https://github.com/napari/docs/commits?author=melonora) - @melonora

