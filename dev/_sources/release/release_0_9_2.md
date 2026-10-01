# napari 0.9.2

*Tue, Sep 29, 2026*

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

### Type checking changes and guide

In [#9395](https://github.com/napari/napari/pull/9395) we have switched our type checking from mypy to [pyrefly](https://pyrefly.org/) because its much faster (>20x!), easier to understand, and well supported. Read our new [typing guide](https://napari.org/stable/developers/contributing/typing.html) for more information on typing the napari code base. Contributors have found typing contributions as a great introduction to contributing to napari and it is work that we welcome. To read more about Aniket's experience, check out the new island dispatch blog post: [From Any to Certainty](https://napari.org/island-dispatch/blog/from-any-to-certainty.html).

### New release policy with regular cadence

The napari team has been working hard to improve our release process, and based on our experience and feedback from the community, we have formally adopted a release policy ([napari/docs#1126](https://github.com/napari/docs/pull/1126)). Expect regular monthly releases and clearer communication about review and timing for contributions; read the [full policy](https://napari.org/stable/developers/coredev/release_policy.html).



## New Features

- Add multiscale level extraction as a `LayerList` action ([#9495](https://github.com/napari/napari/pull/9495))

## Improvements

- Feat: allow passing list of layers to Viewer.reset_view and .fit_to_view ([#6120](https://github.com/napari/napari/pull/6120))
- Add setting for global multisampling/antialiasing ([#8570](https://github.com/napari/napari/pull/8570))
- Reorder font-family declaration in console QSS ([#9325](https://github.com/napari/napari/pull/9325))
- Performance: Avoid redundant unit conversion when aggregating layer extents ([#9411](https://github.com/napari/napari/pull/9411))
- Add `RenamedEmitter` subclass of `WarningEmitter` to simplify renaming ([#9482](https://github.com/napari/napari/pull/9482))
- Bump vispy: rgb volumes, fixed perspective and overlay bleed ([#9499](https://github.com/napari/napari/pull/9499))

## Performance

- Reorder font-family declaration in console QSS ([#9325](https://github.com/napari/napari/pull/9325))
- Performance: Avoid redundant unit conversion when aggregating layer extents ([#9411](https://github.com/napari/napari/pull/9411))

## Bug Fixes

- Allow `fourier_transform_playground.py` to work via drag'n'drop ([#8175](https://github.com/napari/napari/pull/8175))
- Fix view direction and refactor camera logic into vispy module ([#9389](https://github.com/napari/napari/pull/9389))
- fix(vectors): emit edge_color_mode when the color setter changes the mode ([#9396](https://github.com/napari/napari/pull/9396))
- Fix _unique_element crash and incorrect result for list-valued features ([#9409](https://github.com/napari/napari/pull/9409))
- Fix changing theme with dynamic controls ([#9460](https://github.com/napari/napari/pull/9460))
- Fix keeping properties and equality operators from parent class ([#9479](https://github.com/napari/napari/pull/9479))
- Fix surface lighting in async mode ([#9493](https://github.com/napari/napari/pull/9493))
- Bump vispy: rgb volumes, fixed perspective and overlay bleed ([#9499](https://github.com/napari/napari/pull/9499))
- Fix calculation of number of viewboxes ([#9509](https://github.com/napari/napari/pull/9509))
- Fix qt command palette row indexing ([#9512](https://github.com/napari/napari/pull/9512))
- Frozen overlay dicts ([#9525](https://github.com/napari/napari/pull/9525))
- fix(qt): let QtViewer attach to a ViewerModel that already holds several layers ([#9533](https://github.com/napari/napari/pull/9533))

## Build Tools

- Bump vispy: rgb volumes, fixed perspective and overlay bleed ([#9499](https://github.com/napari/napari/pull/9499))

## Documentation

- New release policy with regular cadence and responsibilities ([docs#1126](https://github.com/napari/docs/pull/1126))
- Update 0.9.1 release notes to add missed author ([docs#1130](https://github.com/napari/docs/pull/1130))
- Typing guide: Using Pyrefly and understanding the config ([docs#1134](https://github.com/napari/docs/pull/1134))
- Add initial release notes for 0.9.2 ([docs#1137](https://github.com/napari/docs/pull/1137))
- enforce LF line endings ([docs#1139](https://github.com/napari/docs/pull/1139))
- Update release notes for 0.9.2 ([docs#1146](https://github.com/napari/docs/pull/1146))
- Update the version switcher for 0.9.2 ([docs#1150](https://github.com/napari/docs/pull/1150))

## Other Pull Requests

- [pre-commit.ci] pre-commit autoupdate ([docs#1131](https://github.com/napari/docs/pull/1131))
- [pre-commit.ci] pre-commit autoupdate ([docs#1133](https://github.com/napari/docs/pull/1133))
- CI: skip docs build for CI-only changes ([#8859](https://github.com/napari/napari/pull/8859))
- fix(typing): add typing and fix mypy error in `qt_layer_model.py` ([#9168](https://github.com/napari/napari/pull/9168))
- fix(typing): add typing and fix mypy error in `qt_layer_controls_container.py` ([#9173](https://github.com/napari/napari/pull/9173))
- fix(typing): add typing and fix mypy error in `qt_vectors_controls.py` ([#9178](https://github.com/napari/napari/pull/9178))
- chore: cleanup unused functions ([#9387](https://github.com/napari/napari/pull/9387))
- Remove stale viewer context ([#9406](https://github.com/napari/napari/pull/9406))
- Update `coverage`, `dask`, `hypothesis`, `ipython`, `platformdirs`, `pydantic`, `virtualenv`, `wrapt` ([#9471](https://github.com/napari/napari/pull/9471))
- Use new resource package to source logos ([#9477](https://github.com/napari/napari/pull/9477))
- Fix --pre testing workflows to run only specific subset of environments ([#9480](https://github.com/napari/napari/pull/9480))
- Update `coverage`, `hypothesis`, `ipython`, `lxml`, `matplotlib`, `numpy`, `pint`, `platformdirs`, `psygnal`, `pytest-rerunfailures`, `tifffile`, `tqdm`, `virtualenv`, `wrapt` ([#9492](https://github.com/napari/napari/pull/9492))
- [pre-commit.ci] pre-commit autoupdate ([#9496](https://github.com/napari/napari/pull/9496))
- [pre-commit.ci] pre-commit autoupdate ([#9510](https://github.com/napari/napari/pull/9510))
- Disable graphviz on macos-intel, generate dependency pdf conditionally ([#9514](https://github.com/napari/napari/pull/9514))
- TYP: add type hints in `action_manager.py` ([#9538](https://github.com/napari/napari/pull/9538))
- TYP: add type hints in `mouse_bindings.py` ([#9540](https://github.com/napari/napari/pull/9540))
- TYP: add type hints in `qt_text_visibility.py` ([#9541](https://github.com/napari/napari/pull/9541))
- TYP: add type hints in `stubgen.py` ([#9542](https://github.com/napari/napari/pull/9542))
- TYP: add type hints in `string_encoding.py` ([#9545](https://github.com/napari/napari/pull/9545))
- TYP: add type hints in `color_encoding.py` ([#9548](https://github.com/napari/napari/pull/9548))
- TYP: add type hints in `_svg.py` ([#9550](https://github.com/napari/napari/pull/9550))
- [pre-commit.ci] pre-commit autoupdate ([#9553](https://github.com/napari/napari/pull/9553))
- Rename `RenamedEmitter` to `RenamedWarningEmitter` ([#9567](https://github.com/napari/napari/pull/9567))
- [pre-commit.ci] pre-commit autoupdate ([#9587](https://github.com/napari/napari/pull/9587))


## 10 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aditya Nikam](https://github.com/napari/napari/commits?author=adityaanikam) - @adityaanikam +
- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) - @Aniketsy
- [Carlos Mario Rodriguez Reza](https://github.com/napari/napari/commits?author=carlosmariorr) - @carlosmariorr
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) - @jacopoabramo
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Matthias Schabel](https://github.com/napari/napari/commits?author=matthiasschabel) - @matthiasschabel
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko

## 14 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aditya Nikam](https://github.com/napari/napari/commits?author=adityaanikam) - @adityaanikam +
- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) - @Aniketsy
- [Ashley Anderson](https://github.com/napari/docs/commits?author=aganders3) - @aganders3
- [Carlos Mario Rodriguez Reza](https://github.com/napari/napari/commits?author=carlosmariorr) - @carlosmariorr
- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Draga Doncila Pop](https://github.com/napari/docs/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) - @jacopoabramo
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Matt Einhorn](https://github.com/napari/docs/commits?author=matham) - @matham +
- [Matthias Schabel](https://github.com/napari/napari/commits?author=matthiasschabel) - @matthiasschabel
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
