# napari 0.5.6

*Tue, Jan 21, 2025*

We’re happy to announce the release of napari 0.5.6!

napari is a fast, interactive, multi-dimensional image viewer for Python. It’s designed for exploring, annotating, and analyzing multi-dimensional images. It’s built on Qt (for the GUI), VisPy (for performant GPU-based rendering), and the scientific Python stack (NumPy, SciPy, and friends).

For more information, examples, and documentation, please visit our website: https://napari.org/

## Highlights

### Faster shapes 🚀

For its whole history, napari has been a pure Python package. As we go deeper
into its performance bottlenecks, though, we're finding that we need some
compiled code. This is a big change to the napari installation story, though,
so we are rolling it out slowly. But if you've been waiting forever to load
your shapes data, this release has some enhancements for you (>2x speedup)!
([#7346](https://github.com/napari/napari/pull/7346))

To use this speedup, you'll need to:

- install napari core developer Grzegorz Bokota's collection of performant
  algorithms,
  [PartSegCore-compiled-backend](https://pypi.org/project/PartSegCore-compiled-backend/).
  You can install it automatically by pip installing `"napari[optional,pyqt]"`
  (or a GUI backend of your choice among pyqt, pyqt6, pyside, pyside6) or
  `"napari[all]"`.
- *and*, in the napari advanced settings, tick the "Use C++ code to speed up
  creation and updates of Shapes layers" box.

Please give it a try and let us know if you encounter any issues! This is the
beginning of a new era of performance improvements in napari, to help it live
up to its promise of a *fast* viewer for n-dimensional data in Python!

### New path drawing tool

Drawing paths is easier and smoother with the open-line equilavent of the
lasso tool. If you want to draw a curve through your data, whether with a
mouse or a tablet+stylus, it is now much easier to freehand rather than
clicking on individual points. Try it out!
([#7099](https://github.com/napari/napari/pull/7099))

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="https://github.com/user-attachments/assets/978584f7-f707-4085-840f-a2f8fee12e21" type="video/mp4" />
    <img src="https://github.com/user-attachments/assets/20892add-2382-490b-8ad8-6efc023395a7"
      title="Your browser does not support the video tag"
      alt="video of new path-drawing tool used to delineate a blood vessel"
    >
  </video>
</figure>
```

### Other improvements

Often, the important information in a layer name is at the *end* of the name
rather than the beginning. We've improved the eliding (…) of long names by
placing the ellipsis in the *middle* of the name rather than the end
([#7461](https://github.com/napari/napari/pull/7461)).

The default value of "flash" has been changed to `False` in
`viewer.screenshot`, so that taking many screenshots in a script will not
result in rapid flickering
([#7476](https://github.com/napari/napari/pull/7476)). This is part of a
broader accessibility initiative by recent contributor [Tim
Monko](https://github.com/TimMonko) to improve napari for light-sensitive
users ([#7433](https://github.com/napari/napari/issues/7433), and we are so
grateful! 🙏

Read on for the full list of changes since 0.5.5.

## New Features

- Add poly line drawing ([#7099](https://github.com/napari/napari/pull/7099))
- Iterative ROI Screenshots ([#7209](https://github.com/napari/napari/pull/7209))
- Elide layer name in the middle instead of the end ([#7461](https://github.com/napari/napari/pull/7461))

## Improvements

- Perform triangulation using compiled backend ([#7346](https://github.com/napari/napari/pull/7346))
- stop/start notification timer on window focus change ([#7392](https://github.com/napari/napari/pull/7392))
- Extend reading with plugins to allow Layer objects ([#7443](https://github.com/napari/napari/pull/7443))
- Add CtrlCmd-Backspace as a 2ndary delete_selected_layer keybind ([#7449](https://github.com/napari/napari/pull/7449))
- Change default flash behavior for `viewer` screenshot-like methods (GUI functionality remains the same) ([#7476](https://github.com/napari/napari/pull/7476))
- Update pyproject.toml remove upper bound on numpy on python 3.9 ([#7500](https://github.com/napari/napari/pull/7500))
- [Enhancement] Modify attenuation slider aspect: attenuation value is displayed ([#7523](https://github.com/napari/napari/pull/7523))

## Performance

- Perform triangulation using compiled backend ([#7346](https://github.com/napari/napari/pull/7346))
- Use faster triangulation edge function form compiled backend ([#7512](https://github.com/napari/napari/pull/7512))

## Bug Fixes

- [bugfix] Adjust scale bar position based on font_size when at top ([#7018](https://github.com/napari/napari/pull/7018))
- [Bugfix] Don't exit Preferences widget when using Return/Enter to confirm a shortcut ([#7420](https://github.com/napari/napari/pull/7420))
- Fix thread warning if not `napari.run()` is called ([#7450](https://github.com/napari/napari/pull/7450))
- Fix highlighting artifacts when selecting multiple shapes ([#7457](https://github.com/napari/napari/pull/7457))
- Fix selection of nD-sliced shapes ([#7459](https://github.com/napari/napari/pull/7459))
- [bugfix] use mean instead of norm for fixed aspect scaling in transform mode ([#7466](https://github.com/napari/napari/pull/7466))
- TracksFilter head_length property bug ([#7474](https://github.com/napari/napari/pull/7474))
- Use faster triangulation edge function form compiled backend ([#7512](https://github.com/napari/napari/pull/7512))
- Bugfix: Check if `Layer._loaded` before returning status ([#7515](https://github.com/napari/napari/pull/7515))
- Breakout gray and gray_r from mpl_colormaps and ensure they work with `ensure_colormap` ([#7517](https://github.com/napari/napari/pull/7517))
- Update camera depth when layer extents change ([#7529](https://github.com/napari/napari/pull/7529))
- Fix missed cache invalidation in transform shape ([#7537](https://github.com/napari/napari/pull/7537))

## Documentation

- Add an image to the get_current_viewer example ([#7462](https://github.com/napari/napari/pull/7462))
- Add initial UI sections docs pages and script for generation ([docs#114](https://github.com/napari/docs/pull/114))
- Update tutorials ([docs#514](https://github.com/napari/docs/pull/514))
- Add version warning banner for old versions of the docs ([docs#531](https://github.com/napari/docs/pull/531))
- Add troubleshooting page ([docs#533](https://github.com/napari/docs/pull/533))
- add info on how to cross-reference gallery examples ([docs#534](https://github.com/napari/docs/pull/534))
- Add reference to napari architecture guide in the contributing guide ([docs#537](https://github.com/napari/docs/pull/537))
- Fix broken link in installation tutorial ([docs#539](https://github.com/napari/docs/pull/539))
- Add docs on advanced contrast limits widget ([docs#542](https://github.com/napari/docs/pull/542))
- Update version_switcher.json for 0.5.5 ([docs#543](https://github.com/napari/docs/pull/543))
- Add resources page with logos ([docs#544](https://github.com/napari/docs/pull/544))
- Fix build-on-windows link in README.md ([docs#546](https://github.com/napari/docs/pull/546))
- add documentation for new path tool ([docs#547](https://github.com/napari/docs/pull/547))
- Add 0.5.6 release notes ([docs#548](https://github.com/napari/docs/pull/548))
- 0.5.6 relnotes updates ([docs#552](https://github.com/napari/docs/pull/552))
- Add missing PRs to release notes ([docs#554](https://github.com/napari/docs/pull/554)
- Add Ashley Anderson to list of core developers ([docs#555](https://github.com/napari/docs/pull/555)

## Other Pull Requests

- Bump tifffile version to 2022.7.28 ([#7371](https://github.com/napari/napari/pull/7371))
- Update `app-model`, `certifi`, `coverage`, `dask`, `hypothesis`, `imageio`, `ipython`, `matplotlib`, `napari-console`, `pydantic`, `pyqt6`, `pytest`, `scikit-image`, `superqt`, `tensorstore`, `tifffile`, `tqdm`, `virtualenv`, `xarray`, `zarr` ([#7406](https://github.com/napari/napari/pull/7406))
- [pre-commit.ci] pre-commit autoupdate ([#7451](https://github.com/napari/napari/pull/7451))
- Update `dask`, `fsspec`, `hypothesis`, `ipython`, `magicgui`, `napari-console`, `psutil`, `pydantic` ([#7464](https://github.com/napari/napari/pull/7464))
- [pre-commit.ci] pre-commit autoupdate ([#7465](https://github.com/napari/napari/pull/7465))
- changes Shapes data to float32 and reduce randomization in tests shapes test ([#7470](https://github.com/napari/napari/pull/7470))
- Fix typo observable in Preferences -> Appearance ([#7472](https://github.com/napari/napari/pull/7472))
- Set pytest configuration file for test run using pip ([#7473](https://github.com/napari/napari/pull/7473))
- Update `coverage`, `hypothesis` ([#7475](https://github.com/napari/napari/pull/7475))
- [py313] Fix test_qt_plugin_sorter on Python >= 3.13 ([#7479](https://github.com/napari/napari/pull/7479))
- [--pre] Update constraints to allow pyOpenGL 3.1.7, but block 3.1.9a1 ([#7480](https://github.com/napari/napari/pull/7480))
- [py313] Update test_prereleases.yml to add py313 ([#7481](https://github.com/napari/napari/pull/7481))
- [py313] Update plugins/test_utils.py to account for Windows py313 os.path.isabs change ([#7482](https://github.com/napari/napari/pull/7482))
- Flip z axis on 3D camera to default to right-handed frame ([#7488](https://github.com/napari/napari/pull/7488))
- [Maint] Update version_denylist.txt to block zarr rc1 in --pre tests ([#7489](https://github.com/napari/napari/pull/7489))
- Update `hypothesis`, `napari-plugin-manager`, `pillow`, `pydantic`, `pygments`, `scipy`, `superqt`, `virtualenv`, `xarray`, `zarr` ([#7491](https://github.com/napari/napari/pull/7491))
- [pre-commit.ci] pre-commit autoupdate ([#7494](https://github.com/napari/napari/pull/7494))
- Specify dtype when using zarr.Group.create_array ([#7497](https://github.com/napari/napari/pull/7497))
- remove xfail from test_add_many_zarr_1d_array_is_ignored ([#7501](https://github.com/napari/napari/pull/7501))
- Remove numpy constraints from docs dependency ([#7510](https://github.com/napari/napari/pull/7510))
- [maint] Update pyproject.toml to move plugin manager to optional and let triangle work on arm64 ([#7511](https://github.com/napari/napari/pull/7511))
- Update `hypothesis`, `scipy`, `tifffile`, `wrapt` ([#7514](https://github.com/napari/napari/pull/7514))
- Revert #7488 "Flip z axis on 3D camera to default to right-handed frame" ([#7519](https://github.com/napari/napari/pull/7519))
- Add test suite without numba ([#7520](https://github.com/napari/napari/pull/7520))
- [pre-commit.ci] pre-commit autoupdate ([#7522](https://github.com/napari/napari/pull/7522))
- Revert PR #3243 ; commit 68157f3 ; (drop compatibility, just use `QLabeled*` sliders) ([#7525](https://github.com/napari/napari/pull/7525))
- Fix formatting after ruff update in #7522 ([#7530](https://github.com/napari/napari/pull/7530))
- Minor grammar fix in preference text ([#7539](https://github.com/napari/napari/pull/7539))
- [pre-commit.ci] pre-commit autoupdate ([#7542](https://github.com/napari/napari/pull/7542))
- Replace twitter with mastodon and bluesky in documentation ([docs#553](https://github.com/napari/docs/pull/553))
- Update `dask`, `hypothesis`, `imageio`, `napari-svg`, `numpy`, `pyopengl`, `virtualenv`, `wrapt` ([#7538](https://github.com/napari/napari/pull/7538)

## 13 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Carol Willing](https://github.com/napari/napari/commits?author=willingc) - @willingc
- [Colin Watson](https://github.com/napari/napari/commits?author=cjwatson) - @cjwatson +
- [Daniel Althviz Moré](https://github.com/napari/docs/commits?author=dalthviz) - @dalthviz
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) - @DragaDoncila
- [Etienne Doumazane](https://github.com/napari/napari/commits?author=edoumazane) - @edoumazane +
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki)) - @Czaki
- [Jordão Bragantini](https://github.com/napari/napari/commits?author=JoOkuma) - @JoOkuma
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni)) - @jni
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Sesan](https://github.com/napari/napari/commits?author=Olusesan) - @Olusesan +
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko)) - @TimMonko
- [Wouter-Michiel Vierdag](https://github.com/napari/napari/commits?author=melonora) ([docs](https://github.com/napari/docs/commits?author=melonora)) - @melonora

## 13 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Daniel Althviz Moré](https://github.com/napari/docs/commits?author=dalthviz) - @dalthviz
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) - @DragaDoncila
- [Etienne Doumazane](https://github.com/napari/napari/commits?author=edoumazane) - @edoumazane +
- [Genevieve Buckley](https://github.com/napari/docs/commits?author=GenevieveBuckley) - @GenevieveBuckley
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki)) - @Czaki
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni)) - @jni
- [kyle i. s. harrington](https://github.com/napari/docs/commits?author=kephale) - @kephale
- [Lorenzo Gaifas](https://github.com/napari/docs/commits?author=brisvag) - @brisvag
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Sesan](https://github.com/napari/napari/commits?author=Olusesan) - @Olusesan +
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko)) - @TimMonko
- [Wouter-Michiel Vierdag](https://github.com/napari/napari/commits?author=melonora) ([docs](https://github.com/napari/docs/commits?author=melonora)) - @melonora
