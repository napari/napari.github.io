# napari 0.6.1

*Tue, May 20, 2025*

We’re happy to announce the release of napari 0.6.1! This release is a follow-up to 0.6.0, with a few bug fixes and new features.

napari is a fast, interactive, multi-dimensional image viewer for Python. It’s designed for exploring, annotating, and analyzing multi-dimensional images. It’s built on Qt (for the GUI), VisPy (for performant GPU-based rendering), and the scientific Python stack (NumPy, SciPy, and friends).

For more information, examples, and documentation, please visit our website: https://napari.org/

## Highlights

### The HiLo👋 Colormap!

Introducing the HiLo colormap to napari! 🎨 This much-loved colormap (LUT) is like grayscale, except it displays values at or above the maximum contrast limit as red 🔴 and values at or below the minimum contrast limit as blue 🔵. In the scientific imaging world, the HiLo colormap is often used to assess overexposed (saturated) ☀️ and underexposed (dark) 🌑 regions in images.
Enjoy this animation of the HiLo colormap in action! 👇
![HiLo colormap animation](https://github.com/user-attachments/assets/b77e98b4-3f9c-437a-b169-2444544ee454)

The HiLo colormap is now available as a result of the dependency bump to VisPy 0.15.0 [(#7846)](https://github.com/napari/napari/pull/7846), which will soon unlock even more great new features in the coming napari releases.

### The `dims` widget shines brighter! ✨

Have you ever tried to use the `dims` pop-up widget (accessed by right clicking on the third viewer button) and found it to not work as expected? As part of our bugfixes [#7937](https://github.com/napari/napari/pull/7937) , the `dims` widget will continue to interact as expected. The widget is now available in 3D view!
❓Did you know that the `dims` widget allows you to rename the axis labels of your data?
![dims popup widget](https://github.com/user-attachments/assets/3b38462b-8fe2-47b2-be02-66a714d18d8f)

## New Features

- Add inheritance of spatial data for functional plugin that return layer data. ([#6986](https://github.com/napari/napari/pull/6986))
- Bump to vispy 0.15 and update Colormap model ([#7846](https://github.com/napari/napari/pull/7846))
- Add multiplicative blending ([#7868](https://github.com/napari/napari/pull/7868))

## Improvements

- Copy units from layer to layer ([#7727](https://github.com/napari/napari/pull/7727))
- Check return value is valid LayerDataTuple ([#7851](https://github.com/napari/napari/pull/7851))
- Fix broken dims order popup and add to 3D ([#7937](https://github.com/napari/napari/pull/7937))

## Bug Fixes

- Refresh extent on async slicing ([#7853](https://github.com/napari/napari/pull/7853))
- Do not expose vispy BaseColormaps ([#7858](https://github.com/napari/napari/pull/7858))
- Properly determine dtype for view of Labels ([#7883](https://github.com/napari/napari/pull/7883))
- Prevent Shapes corruption when drawing tiny polygons with lasso ([#7914](https://github.com/napari/napari/pull/7914))
- Better refresh extent on async slicing ([#7925](https://github.com/napari/napari/pull/7925))
- Fix async refresh extent ([#7929](https://github.com/napari/napari/pull/7929))
- Mark key events as handled when processed ([#7933](https://github.com/napari/napari/pull/7933))
- Fix broken dims order popup and add to 3D ([#7937](https://github.com/napari/napari/pull/7937))

## Documentation

- Update the version switcher for 0.6.0 ([docs#697](https://github.com/napari/docs/pull/697))
- Update conf.py to try to fix opengraph image for dev and future deployments ([docs#700](https://github.com/napari/docs/pull/700))
- Update sidebar-nav-bs.html to try to fix links ([docs#702](https://github.com/napari/docs/pull/702))
- Draft release notes for 0.6.1 ([docs#704](https://github.com/napari/docs/pull/704))
- release 0.6.1 notes update ([docs#706](https://github.com/napari/docs/pull/706))
- Fix release notes header for 0.6.1 ([docs#707](https://github.com/napari/docs/pull/707))
- Update release notes for 0.6.1 ([docs#708](https://github.com/napari/docs/pull/708))
- Update viewer.md to mention that you can rename axes using the roll dims popup ([docs#709](https://github.com/napari/docs/pull/709))
- 0.6.1 full release notes ([docs#712](https://github.com/napari/docs/pull/712))

## Other Pull Requests

- Remove outdated QSS styling elements ([#7655](https://github.com/napari/napari/pull/7655))
- Update `hypothesis`, `ipython`, `numpy`, `pillow`, `pydantic` ([#7823](https://github.com/napari/napari/pull/7823))
- Update builtins read extensions ([#7826](https://github.com/napari/napari/pull/7826))
- Skip tests that are failing because of Qt bug ([#7884](https://github.com/napari/napari/pull/7884))
- Use `ViewerModel` instead of `make_napari_viewer` in `test_toggle_axes_scale_bar_attr` ([#7885](https://github.com/napari/napari/pull/7885))
- Update `pydantic`, `pyqt6`, `xarray` ([#7886](https://github.com/napari/napari/pull/7886))
- [pre-commit.ci] pre-commit autoupdate ([#7891](https://github.com/napari/napari/pull/7891))
- Fix `test_view_menu.py::test_toggle_menubar` to pass locally ([#7892](https://github.com/napari/napari/pull/7892))
- Add information about launch command to napari info dialog ([#7897](https://github.com/napari/napari/pull/7897))
- Add information about installed plugins to info dialog ([#7899](https://github.com/napari/napari/pull/7899))
- Surface original error when a selected plugin fails to read file. ([#7901](https://github.com/napari/napari/pull/7901))
- Update `hypothesis`, `matplotlib`, `psygnal`, `scipy`, `tifffile`, `virtualenv` ([#7906](https://github.com/napari/napari/pull/7906))
- Change @brisvag affiliation ([#7909](https://github.com/napari/napari/pull/7909))
- [pre-commit.ci] pre-commit autoupdate ([#7910](https://github.com/napari/napari/pull/7910))
- Rename action by add missed word separator ([#7913](https://github.com/napari/napari/pull/7913))
- Update build_trigger.yml to fix Circle pipeline ([docs#701](https://github.com/napari/docs/pull/701))

## 6 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) - @Czaki
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Peter Sobolewski](https://github.com/napari/docs/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko)) - @TimMonko

## 7 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) - @DragaDoncila
- [Genevieve Buckley](https://github.com/napari/docs/commits?author=GenevieveBuckley) - @GenevieveBuckley
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) - @Czaki
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Peter Sobolewski](https://github.com/napari/docs/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko)) - @TimMonko
