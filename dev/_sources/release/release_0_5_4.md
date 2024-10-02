# napari 0.5.4

*Monday, Sep 30, 2024*

We’re happy to announce the release of napari 0.5.4!

napari is a fast, interactive, multi-dimensional image viewer for Python. It’s designed for exploring, annotating, and analyzing multi-dimensional images. It’s built on Qt (for the GUI), VisPy (for performant GPU-based rendering), and the scientific Python stack (NumPy, SciPy, and friends).

For more information, examples, and documentation, please visit our website: https://napari.org/

## Highlights

Another release with a lot of bug fixes, but also some (more!) improvements to
Shapes layer performance ([#7144](https://github.com/napari/napari/pull/7144),
[#7256](https://github.com/napari/napari/pull/7256)), and a few nice
usability/quality of life features!

- you can now follow the value under the cursor around in images in 3D view as
  well as 2D ([#7126](https://github.com/napari/napari/pull/7126))
- Use standard keyboard shortcuts to zoom in and out ({kbd}`Command/Ctrl+=`,
  {kbd}`Command/Ctrl+-`) and to zoom-to-fit ({kbd}`Command/Ctrl+0`)
  ([#7200](https://github.com/napari/napari/pull/7200))
- you can now save tiff files larger than 4GB
  ([#7242](https://github.com/napari/napari/pull/7242))

Finally, we're starting some work on tweaking the UI to make it more
self-consistent, with the ultimate goal of adding functionality such as showing
common controls when multiple layers are selected, so that, for example, you
can select multiple layers and adjust all their opacity settings together. As
the first step for this, the *layer blending* controls have been moved directly
under the opacity control, so that all per-layer controls are next to each
other in the UI ([#7202](https://github.com/napari/napari/pull/7202))

Read on for all the changes in this version!


## New Features

- enable get_value_3d for image layers ([#7126](https://github.com/napari/napari/pull/7126))
- Preserve area of dock widgets between sessions ([#7247](https://github.com/napari/napari/pull/7247))

## Improvements

- Speed up `get_status` for Shapes layer by using bounding boxes ([#7144](https://github.com/napari/napari/pull/7144))
- Enh: Add zoom options and keybindings to View menu ([#7200](https://github.com/napari/napari/pull/7200))
- [ux/ui] Put blending controls under opacity slider in layer controls ([#7202](https://github.com/napari/napari/pull/7202))
- Enable conflicts detection with layer keybindings when changing viewer ones and add group info to conflicts popup ([#7231](https://github.com/napari/napari/pull/7231))
- Speedup `_is_convex` by avoid calling `np.roll` ([#7256](https://github.com/napari/napari/pull/7256))
- Sort plugin manifests in alphabetical order for registration ([#7266](https://github.com/napari/napari/pull/7266))

## Performance

- Speed up `get_status` for Shapes layer by using bounding boxes ([#7144](https://github.com/napari/napari/pull/7144))
- Speedup `_is_convex` by avoid calling `np.roll` ([#7256](https://github.com/napari/napari/pull/7256))

## Bug Fixes

- start/stop status thread on show/hide main window ([#7240](https://github.com/napari/napari/pull/7240))
- Added support for saving tiff files > 4GB :) ([#7242](https://github.com/napari/napari/pull/7242))
- Accept any Mapping as output of a plugin widget ([#7250](https://github.com/napari/napari/pull/7250))
- Eliminate nearly all Qt widget leaks by using qtbot ([#7251](https://github.com/napari/napari/pull/7251))
- Enforce minimum side length when guessing if image is RGB ([#7273](https://github.com/napari/napari/pull/7273))
- Remove skip conditions for PySide2/6 over plugins menu tests and bump `napari-plugin-manager` minimum version (>=0.1.3) ([#7293](https://github.com/napari/napari/pull/7293))
- Fix color shuffling for bool labels ([#7294](https://github.com/napari/napari/pull/7294))
- Fix cursor dimensionality race condition ([#7295](https://github.com/napari/napari/pull/7295))
- Fix overflow error in shuffle colormap for signed integer labels ([#7296](https://github.com/napari/napari/pull/7296))
- When calculating view directions, check ndim, not just ndisplay ([#7301](https://github.com/napari/napari/pull/7301))

## Documentation

- Add beanli161514 to citation file ([#7272](https://github.com/napari/napari/pull/7272))
- Doc/metadata: add jni's ORCID to the CITATION.cff file ([#7275](https://github.com/napari/napari/pull/7275))
- Style fix: use recommended capitalization for "GitHub" in README ([#7284](https://github.com/napari/napari/pull/7284))
- Add psygnal and pydantic to napari --info ([#7285](https://github.com/napari/napari/pull/7285))
- Move images to _static folder ([docs#483](https://github.com/napari/docs/pull/483))
- Update version switcher to add 0.5.3 ([docs#488](https://github.com/napari/docs/pull/488))
- Move release notes to be under Usage ([docs#489](https://github.com/napari/docs/pull/489))
- Update release guide ([docs#491](https://github.com/napari/docs/pull/491))
- Use `get_qapp` or `get_app_model` instead of `get_app` ([docs#495](https://github.com/napari/docs/pull/495))
- Add 0.5.4 release notes ([docs#496](https://github.com/napari/docs/pull/496))
- Add note about questions in landing page ([docs#498](https://github.com/napari/docs/pull/498))
- Add further fixes to release notes ([docs#499](Add further fixes to release notes))

## Other Pull Requests

- Update script for vendored modules ([#5779](https://github.com/napari/napari/pull/5779))
- Update `certifi`, `dask`, `hypothesis`, `ipython`, `numpy`, `qtconsole`, `rich`, `scipy`, `tifffile` ([#7212](https://github.com/napari/napari/pull/7212))
- Block zarr 3.0.0a1 and 3.0.0a2 in pre-release tests ([#7217](https://github.com/napari/napari/pull/7217))
- Add autouse fixture that clears cached property `Action.injected` ([#7224](https://github.com/napari/napari/pull/7224))
- Update `tifffile` ([#7235](https://github.com/napari/napari/pull/7235))
- CI benchmark run comment will now include results table ([#7237](https://github.com/napari/napari/pull/7237))
- [pre-commit.ci] pre-commit autoupdate ([#7239](https://github.com/napari/napari/pull/7239))
- Fix coverage and debug artifacts upload ([#7241](https://github.com/napari/napari/pull/7241))
- Replaced broken link to the "Translations" page :) ([#7243](https://github.com/napari/napari/pull/7243))
- Alow to call benchmark that do not have params ([#7252](https://github.com/napari/napari/pull/7252))
- Block zarr=3.0.0a3 to fix pre-release tests ([#7254](https://github.com/napari/napari/pull/7254))
- Change type of layer Metadata from dict to Mapping ([#7257](https://github.com/napari/napari/pull/7257))
- Update `fsspec`, `hypothesis`, `pydantic`, `tensorstore`, `virtualenv`, `zarr` ([#7258](https://github.com/napari/napari/pull/7258))
- Deprecate usage of `get_app` functions to get `QApplication` or `NapariApplication` instances ([#7269](https://github.com/napari/napari/pull/7269))
- Block `zarr==3.0.0a4` ([#7271](https://github.com/napari/napari/pull/7271))
- Update `dask`, `hypothesis`, `napari-plugin-manager`, `pandas`, `pydantic`, `pytest`, `rich`, `tifffile`, `virtualenv`, `xarray` ([#7274](https://github.com/napari/napari/pull/7274))
- [pre-commit.ci] pre-commit autoupdate ([#7276](https://github.com/napari/napari/pull/7276))
- Fix `test_windows_grouping_overwrite` skip condition and asserts ([#7281](https://github.com/napari/napari/pull/7281))
- Update menu sorting tests still using `mock_app` and `get_app` instead of `mock_app_model` and `get_app_model` ([#7283](https://github.com/napari/napari/pull/7283))
- Remove obsolete self from layout argument ([#7291](https://github.com/napari/napari/pull/7291))


## 11 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [BeanLi](https://github.com/napari/napari/commits?author=beanli161514) - @beanli161514
- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) ([docs](https://github.com/napari/docs/commits?author=dalthviz))  - @dalthviz
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) - @Czaki
- [Ikko Eltociear Ashimine](https://github.com/napari/napari/commits?author=eltociear) - @eltociear +
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni))  - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Lucy Liu](https://github.com/napari/napari/commits?author=lucyleeow) - @lucyleeow
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Sammy Hansali](https://github.com/napari/napari/commits?author=sammyhansali) - @sammyhansali +


## 13 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [andrew sweet](https://github.com/napari/docs/commits?author=andy-sweet) - @andy-sweet
- [Ashley Anderson](https://github.com/napari/docs/commits?author=aganders3) - @aganders3
- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) ([docs](https://github.com/napari/docs/commits?author=dalthviz))  - @dalthviz
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) - @Czaki
- [jaime rodriguez-guerra](https://github.com/napari/docs/commits?author=jaimergp) - @jaimergp
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni))  - @jni
- [kyle i. s. harrington](https://github.com/napari/docs/commits?author=kephale) - @kephale
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Lucy Liu](https://github.com/napari/napari/commits?author=lucyleeow) - @lucyleeow
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Wouter-Michiel Vierdag](https://github.com/napari/docs/commits?author=melonora) - @melonora

