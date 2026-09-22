# napari 0.9.2
⚠️ *Note: these release notes are still in draft while 0.9.2rc1 is in prerelease testing.* ⚠️

*Sun, Sep 27, 2026*

We're happy to announce the release of napari 0.9.2!
napari is a fast, interactive, multi-dimensional image viewer for Python.
It's designed for browsing, annotating, and analyzing large multi-dimensional
images. It's built on top of Qt (for the GUI), vispy (for performant GPU-based
rendering), and the scientific Python stack (numpy, scipy).

For more information, examples, and documentation, please visit our website,
https://napari.org.

napari follows [EffVer (Intended Effort Versioning)](https://effver.org/); this is a **Meso** release containing awesome new features, but some effort may be needed when updating previous projects to use this version.

## Highlights

### Vispy update

In [#9499](https://github.com/napari/napari/pull/9499) we improved and updated [Vispy](https://vispy.org/) (napari's rendering engine), which brings us a few fixes and new features. Some important ones:

- perspective rendering of points and text is no longer broken (Shift+right-click-drag to change FOV in 3D!)
- RGB data can now be viewed in 3D. This might still have some kinks to smooth out, so if you see issues, make sure to report them on the issue tracker.

### Change of type-checker

In [#9395](https://github.com/napari/napari/pull/9395) we decided to change from [`mypy`](https://mypy-lang.org/) to [`pyrefly`](https://pyrefly.org/).
`pyrefly` is faster and support more typing features than `mypy`.

*add blogpost link here*

### More strict release cadence

Based on our experience and feedback from the community, we decided to make our release cadence more strict. We decided to go to monthly cadence with exception for December. The formalization is added in [napari/docs#1126](https://github.com/napari/docs/pull/1126). The actual policy is [here](https://napari.org/stable/developers/coredev/release_policy.html).



## New Features

- Add multiscale level extraction as a `LayerList` action ([#9495](https://github.com/napari/napari/pull/9495))

## Improvements

- Add setting for global multisampling/antialiasing ([#8570](https://github.com/napari/napari/pull/8570))
- Reorder font-family declaration in console QSS ([#9325](https://github.com/napari/napari/pull/9325))
- Performance: Avoid redundant unit conversion when aggregating layer extents ([#9411](https://github.com/napari/napari/pull/9411))
- Add `RenamedEmitter` subclass of `WarningEmitter` to simplify renaming ([#9482](https://github.com/napari/napari/pull/9482))
- Bump vispy: rgb volumes, fixed perspective and overlay bleed ([#9499](https://github.com/napari/napari/pull/9499))
- Add nD projection modes to points layer (replaces `out_of_slice_display`) ([#9534](https://github.com/napari/napari/pull/9534))

## Performance

- Reorder font-family declaration in console QSS ([#9325](https://github.com/napari/napari/pull/9325))
- Performance: Avoid redundant unit conversion when aggregating layer extents ([#9411](https://github.com/napari/napari/pull/9411))

## Bug Fixes

- Allow `fourier_transform_playground.py` to work via drag'n'drop ([#8175](https://github.com/napari/napari/pull/8175))
- Fix view direction and refactor camera logic into vispy module ([#9389](https://github.com/napari/napari/pull/9389))
- fix(vectors): emit edge_color_mode when the color setter changes the mode ([#9396](https://github.com/napari/napari/pull/9396))
- Fix _unique_element crash and incorrect result for list-valued features ([#9409](https://github.com/napari/napari/pull/9409))
- Keep dock widgets resizable when their widget asks for vertical space ([#9462](https://github.com/napari/napari/pull/9462))
- Fix keeping properties and equality operators from parent class ([#9479](https://github.com/napari/napari/pull/9479))
- Bump vispy: rgb volumes, fixed perspective and overlay bleed ([#9499](https://github.com/napari/napari/pull/9499))
- Fix calculation of number of viewboxes ([#9509](https://github.com/napari/napari/pull/9509))
- Fix qt command palette row indexing ([#9512](https://github.com/napari/napari/pull/9512))
- Frozen overlay dicts ([#9525](https://github.com/napari/napari/pull/9525))
- Add nD projection modes to points layer (replaces `out_of_slice_display`) ([#9534](https://github.com/napari/napari/pull/9534))

## Build Tools

- Bump vispy: rgb volumes, fixed perspective and overlay bleed ([#9499](https://github.com/napari/napari/pull/9499))

## Documentation

- New release policy with regular cadence and responsibilities ([docs#1126](https://github.com/napari/docs/pull/1126))
- Update 0.9.1 release notes to add missed author ([docs#1130](https://github.com/napari/docs/pull/1130))
- Add initial release notes for 0.9.2 ([docs#1137](https://github.com/napari/docs/pull/1137))

## Other Pull Requests

- CI: skip docs build for CI-only changes ([#8859](https://github.com/napari/napari/pull/8859))
- fix(typing): add typing and fix mypy error in `qt_layer_model.py` ([#9168](https://github.com/napari/napari/pull/9168))
- chore: cleanup unused functions ([#9387](https://github.com/napari/napari/pull/9387))
- Remove stale viewer context ([#9406](https://github.com/napari/napari/pull/9406))
- Update `coverage`, `dask`, `hypothesis`, `ipython`, `platformdirs`, `pydantic`, `virtualenv`, `wrapt` ([#9471](https://github.com/napari/napari/pull/9471))
- Fix --pre testing workflows to run only specific subset of environments ([#9480](https://github.com/napari/napari/pull/9480))
- Update `coverage`, `hypothesis`, `ipython`, `lxml`, `matplotlib`, `numpy`, `pint`, `platformdirs`, `psygnal`, `pytest-rerunfailures`, `tifffile`, `tqdm`, `virtualenv`, `wrapt` ([#9492](https://github.com/napari/napari/pull/9492))
- [pre-commit.ci] pre-commit autoupdate ([#9496](https://github.com/napari/napari/pull/9496))
- [pre-commit.ci] pre-commit autoupdate ([#9510](https://github.com/napari/napari/pull/9510))
- Disable graphviz on macos-intel, generate dependency pdf conditionally ([#9514](https://github.com/napari/napari/pull/9514))
- TYP: add type hints in `mouse_bindings.py` ([#9540](https://github.com/napari/napari/pull/9540))


## 8 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aditya Nikam](https://github.com/napari/napari/commits?author=adityaanikam) - @adityaanikam +
- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) - @Aniketsy
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) - @jacopoabramo
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Matthias Schabel](https://github.com/napari/napari/commits?author=matthiasschabel) - @matthiasschabel
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) - @TimMonko

## 14 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aditya Nikam](https://github.com/napari/napari/commits?author=adityaanikam) - @adityaanikam +
- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) - @Aniketsy
- [Ashley Anderson](https://github.com/napari/docs/commits?author=aganders3) - @aganders3
- [Carlos Mario Rodriguez Reza](https://github.com/napari/docs/commits?author=carlosmariorr) - @carlosmariorr
- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Draga Doncila Pop](https://github.com/napari/docs/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) - @jacopoabramo
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Matt Einhorn](https://github.com/napari/docs/commits?author=matham) - @matham +
- [Matthias Schabel](https://github.com/napari/napari/commits?author=matthiasschabel) - @matthiasschabel
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) - @TimMonko
