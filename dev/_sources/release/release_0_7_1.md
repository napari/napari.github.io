# napari 0.7.1

*Tue, Jun 16, 2026*

We're happy to announce the release of napari 0.7.1!
napari is a fast, interactive, multi-dimensional image viewer for Python.
It's designed for browsing, annotating, and analyzing large multi-dimensional
images. It's built on top of Qt (for the GUI), vispy (for performant GPU-based
rendering), and the scientific Python stack (numpy, scipy).

For more information, examples, and documentation, please visit our website,
https://napari.org.

napari follows [EffVer (Intended Effort Versioning)](https://effver.org/); this is a **Meso** release containing awesome new features, but some effort may be needed when updating previous projects to use this version.

## Highlights

The napari 0.7.1 release includes many new features and improvements. Here are some of the highlights:

### Signed Windows bundle

Starting with the napari 0.7.1 release, our bundle on Windows is now [signed](https://github.com/napari/packaging/pull/387) with a NumFOCUS certificate, like our macOS bundle has been. This means that you should be able to run napari without any warnings about the application being from an unknown publisher. This is an important step forward for our Windows users, as it enhances security and trust in our application, especially in managed IT environments where unsigned applications may be blocked by default.

The certificate is issued for the NumFOCUS foundation, which supports napari and a large number of other open source projects.

If you encounter any issues related to this change, please let us know!


### Selection of the rendered level for multiscale layers

Prior to napari 0.7.1, when rendering a multiscale layer:

- in 3D display, napari would always render the lowest resolution level of the pyramid
- in 2D display, the pyramid level would be automatically selected based on the viewport

Thanks to [#8917](https://github.com/napari/napari/pull/8917), users can now [select a multiscale level to render](https://napari.org/dev/howtos/layers/image.html#locking-the-multiscale-level) ([check out the awesome new example!](https://napari.org/stable/gallery/add_multiscale_volume.html)). Importantly, this allows choosing a higher resolution rendering than before in 3D, as long as the selected level can fit within GPU texture limits. Meanwhile, for 2D display, you can fix the resolution level, which can be useful for annotation or previewing data prior to an analysis or export step. You can set this resolution using the resolution widget in the layer controls:

![The resolution dropdown in the layer controls allows the user to select different levels of a multiscale image.](https://github.com/user-attachments/assets/862e7512-0309-429c-b155-a9c03acf2db6)


### Colorbars for points layer

The points allows coloring points based of their feature values; in napari 0.7.1 we added support for colorbars ([#8624](https://github.com/napari/napari/pull/8624)), so you can now easily see the mapping between feature values and colors, just like the colorbars for image colormapping. This is especially useful when you have a large number of points and want to quickly understand the distribution of feature values.

![Example of colorbar for points layer](https://github.com/user-attachments/assets/1522aa7c-3520-4e41-85e6-99e9a91c47ee)

### Scalebar with units

In previous versions of napari, if you added a scale bar using **View > Scale Bar > Scale Bar visible**, it was shown with no units. In napari 0.7.1 we now
set default unit to `pixel` in [#8900](https://github.com/napari/napari/pull/8900) and also add calculation of units for scale bar based on currently added layers in [#8907](https://github.com/napari/napari/pull/8907) and [#9007](https://github.com/napari/napari/pull/9007), if they have units set and are logically consistent across layers.
We've also [added a guide about unit and scale aware rendering](https://napari.org/stable/guides/units.html)  ([#1032](https://github.com/napari/docs/pull/1032)).


![Scale bar with units](https://github.com/user-attachments/assets/b25a1a53-b9a0-46f1-b88c-c2625e4287a8)

### Lock layer to prevent accidental deletions

In [#8736](https://github.com/napari/napari/pull/8736) we added the initial implementation for a [lock mechanism for layers](https://napari.org/stable/getting_started/layers.html#layer-locking). Now, when a layer is locked, it cannot be accidentally deleted or destructively modified. This is especially useful when you have a complex project with many layers and want to prevent accidental changes to important layers. Note: the layer controls are not affected by the lock at this time.
In the future we plan to expand this feature to prevent not only deletion but also other modifications.

![Lock layer on layer list](https://github.com/user-attachments/assets/1df17b1e-cb52-4b2f-88b3-495f1e5301a0)



## New Features

- Add points layer face and border colorbar ([#8624](https://github.com/napari/napari/pull/8624))
- UX: Add Layer.locked property to protect layers from accidental deletion ([#8736](https://github.com/napari/napari/pull/8736))

## Improvements

- Example: Enhance theme sample widget with theme colors, widgets ([#8662](https://github.com/napari/napari/pull/8662))
- Do not connect to children events of EventedDict items if there is no callback ([#8673](https://github.com/napari/napari/pull/8673))
- ENH: For multiscale 2d: store materialized thumbnail_level ([#8715](https://github.com/napari/napari/pull/8715))
- Canvas based font size ([#8770](https://github.com/napari/napari/pull/8770))
- Enh, minor, builtins: use urllib (and defer) instead of requests if reading a remote script path ([#8785](https://github.com/napari/napari/pull/8785))
- Perf: Defer importing scipy.spatial ([#8789](https://github.com/napari/napari/pull/8789))
- Revert the switch from Welcome widget to Welcome overlay from #8117 ([#8793](https://github.com/napari/napari/pull/8793))
- Update text in mac installer to improve UX ([#8806](https://github.com/napari/napari/pull/8806))
- Fix: Use Python's tokenize script decoding for builtin reader ([#8838](https://github.com/napari/napari/pull/8838))
- Add note for user how to reset the reader preference ([#8848](https://github.com/napari/napari/pull/8848))
- Ensure all napari and plugin commands use . instead of : ([#8883](https://github.com/napari/napari/pull/8883))
- Improve dask check to support more dask-backed array types ([#8896](https://github.com/napari/napari/pull/8896))
- Fix floating widgets and use custom title bar in all cases ([#8898](https://github.com/napari/napari/pull/8898))
- Set pixel as default scalebar unit ([#8900](https://github.com/napari/napari/pull/8900))
- ScaleBar units from layers ([#8907](https://github.com/napari/napari/pull/8907))
- Turn off contrast/color controls when surface has `vertex_colors` ([#8909](https://github.com/napari/napari/pull/8909))
- Actually use theme type from npe contrib ([#8915](https://github.com/napari/napari/pull/8915))
- Add multiscale level lock for scalar field layers ([#8917](https://github.com/napari/napari/pull/8917))
- Do not add a new colormap if one already exists in napari ([#8924](https://github.com/napari/napari/pull/8924))
- Adjust pt argument of font size increase/decrease based on platform ([#8950](https://github.com/napari/napari/pull/8950))
- Improve sizing of dims ordering popup ([#8952](https://github.com/napari/napari/pull/8952))
- Add float precision setting ([#8975](https://github.com/napari/napari/pull/8975))
- typing: add type hints to `napari/utils/shortcuts.py` ([#8983](https://github.com/napari/napari/pull/8983))
- Use QSS instead of hard-coding style (including font) for the notification action button ([#9001](https://github.com/napari/napari/pull/9001))
- Use actual font-size in the keybind-clash popup ([#9002](https://github.com/napari/napari/pull/9002))

## Performance

- ENH: For multiscale 2d: store materialized thumbnail_level ([#8715](https://github.com/napari/napari/pull/8715))
- Enh, minor, builtins: use urllib (and defer) instead of requests if reading a remote script path ([#8785](https://github.com/napari/napari/pull/8785))
- Perf: Defer importing scipy.spatial ([#8789](https://github.com/napari/napari/pull/8789))
- Revert the switch from Welcome widget to Welcome overlay from #8117 ([#8793](https://github.com/napari/napari/pull/8793))
- Improve dask check to support more dask-backed array types ([#8896](https://github.com/napari/napari/pull/8896))
- Use pep562 to defer AVAILABLE_LABELS_COLORMAPS which imports skimage.color -> scipy.linalg ([#8903](https://github.com/napari/napari/pull/8903))

## Bug Fixes

- Add max depth_value to avoid clipping volumes in 3d (#8809) ([#8810](https://github.com/napari/napari/pull/8810))
- Fix TypeError with anisotropic data in 3D ray intersections ([#8812](https://github.com/napari/napari/pull/8812))
- Reuse QMarginSlidersPopup between rightclicks ([#8819](https://github.com/napari/napari/pull/8819))
- Fix: Use Python's tokenize script decoding for builtin reader ([#8838](https://github.com/napari/napari/pull/8838))
- Fix: Blocks dims slider widget creation feedback to dims model ([#8840](https://github.com/napari/napari/pull/8840))
- Fix: play button loop mode duplication ([#8841](https://github.com/napari/napari/pull/8841))
- Improve dask check to support more dask-backed array types ([#8896](https://github.com/napari/napari/pull/8896))
- Fix floating widgets and use custom title bar in all cases ([#8898](https://github.com/napari/napari/pull/8898))
- Wrap Labels multiscale data in MultiScaleData object in setter ([#8922](https://github.com/napari/napari/pull/8922))
- Fix Labels show_selected_label being silently dropped after color shuffle ([#8947](https://github.com/napari/napari/pull/8947))
- Fix Volume visual crash when adding invisible scalar field in 3D ([#8968](https://github.com/napari/napari/pull/8968))
- Auto-apply XCB/GLX workaround on Linux+Wayland at startup ([#9009](https://github.com/napari/napari/pull/9009))
- Fix update of Shapes._value when remove shape ([#9041](https://github.com/napari/napari/pull/9041))
- Set `Shapes._value`to `None, None` on delete of shape ([#9044](https://github.com/napari/napari/pull/9044))

## Build Tools

- ci(deps): bump aiohttp from 3.13.5 to 3.14.0 in /resources ([#9028](https://github.com/napari/napari/pull/9028))

## Documentation

- Fix typo in 0.7.0 release notes ([docs#967](https://github.com/napari/docs/pull/967))
- Remove draft note from 0.7.0 release notes. ([docs#968](https://github.com/napari/docs/pull/968))
- Reorganize cards in homepage ([docs#970](https://github.com/napari/docs/pull/970))
- Rename "latest" version switch to "dev" ([docs#971](https://github.com/napari/docs/pull/971))
- Use stable version for dev docs bundle links ([docs#973](https://github.com/napari/docs/pull/973))
- Remove mention of unmaintained plugin in quick start ([docs#976](https://github.com/napari/docs/pull/976))
- Rename navbar entries (API and Contribute) ([docs#978](https://github.com/napari/docs/pull/978))
- Update team page ([docs#980](https://github.com/napari/docs/pull/980))
- Add "Edit on Github" to secondary sidebar ([docs#982](https://github.com/napari/docs/pull/982))
- Add deprecation warning section in contributing guide ([docs#984](https://github.com/napari/docs/pull/984))
- Enable search as you type and remove sidebar search ([docs#989](https://github.com/napari/docs/pull/989))
- Use flexible search field for navbar ([docs#991](https://github.com/napari/docs/pull/991))
- Add more info about example tags and _.py ([docs#994](https://github.com/napari/docs/pull/994))
- Remove napari-hub from navbar and add to sidebar ([docs#995](https://github.com/napari/docs/pull/995))
- Update deprecation warning guidance to use `FutureWarning` ([docs#997](https://github.com/napari/docs/pull/997))
- Update Jupyter notebook example screenshot ([docs#1003](https://github.com/napari/docs/pull/1003))
- Update multiscale documentation to describe new level selection ([docs#1004](https://github.com/napari/docs/pull/1004))
- Add release notes for 0.7.1a1 ([docs#1009](https://github.com/napari/docs/pull/1009))
- Add sample databases ([docs#1010](https://github.com/napari/docs/pull/1010))
- Minimal all-contributors setup ([docs#1011](https://github.com/napari/docs/pull/1011))
- Add Carlos to Core Team page ([docs#1012](https://github.com/napari/docs/pull/1012))
- Update release notes for 0.7.1 ([docs#1019](https://github.com/napari/docs/pull/1019))
- Add Curtis and Brian to SC members ([docs#1020](https://github.com/napari/docs/pull/1020))
- Move download links to top of examples ([docs#1021](https://github.com/napari/docs/pull/1021))
- Add Windows bundle signing and reputation info ([docs#1022](https://github.com/napari/docs/pull/1022))
- Fix: `pyqt6` for conda install instructions ([docs#1023](https://github.com/napari/docs/pull/1023))
- Add admonition to gallery examples that require additional packages ([docs#1024](https://github.com/napari/docs/pull/1024))
- Document layer locking in napari GUI and API ([docs#1025](https://github.com/napari/docs/pull/1025))
- Clean up button css for homepage and gallery ([docs#1026](https://github.com/napari/docs/pull/1026))
- Add baseurl to favor stable versions in search engines ([docs#1029](https://github.com/napari/docs/pull/1029))
- Guide about unit and scale aware rendering ([docs#1032](https://github.com/napari/docs/pull/1032))
- Document automatic Wayland/Nvidia workaround in troubleshooting ([docs#1033](https://github.com/napari/docs/pull/1033))
- Fix: Opaque, instead of translucent, sticky version banner ([docs#1035](https://github.com/napari/docs/pull/1035))
- Update homepage video with reproducible napari-animation script ([docs#1036](https://github.com/napari/docs/pull/1036))
- Update release notes to 0.7.1 ([docs#1041](https://github.com/napari/docs/pull/1041))
- Example: Enhance theme sample widget with theme colors, widgets ([#8662](https://github.com/napari/napari/pull/8662))
- Add note to Camera.angles docstring about quaternion normalisation ([#8864](https://github.com/napari/napari/pull/8864))
- Docs: Bump lower version of napari-sphinx-theme ([#8886](https://github.com/napari/napari/pull/8886))
- Replace v (shorter) with viewer in the examples ([#8940](https://github.com/napari/napari/pull/8940))
- Add Carlos Rodríguez-Reza to core team section of citation file ([#8971](https://github.com/napari/napari/pull/8971))
- Unpin sphinx for docs ([#8993](https://github.com/napari/napari/pull/8993))
- add Yann-P to Citation.cff ([#8994](https://github.com/napari/napari/pull/8994))
- Add units to Dims docstring and clarify Layer.units ([#8996](https://github.com/napari/napari/pull/8996))

## Other Pull Requests

- ci(dependabot): bump the github-actions group with 3 updates ([docs#975](https://github.com/napari/docs/pull/975))
- Fix minor typos ([docs#1005](https://github.com/napari/docs/pull/1005))
- ci(dependabot): bump the github-actions group with 3 updates ([docs#1006](https://github.com/napari/docs/pull/1006))
- Remove "auto author assign" workflow ([docs#1008](https://github.com/napari/docs/pull/1008))
- Fix skip condition for build docs based on label ([docs#1031](https://github.com/napari/docs/pull/1031))
- Update workflows to python 3.14 ([#8666](https://github.com/napari/napari/pull/8666))
- Improve typing in qt_dims_slider and clean local functions ([#8683](https://github.com/napari/napari/pull/8683))
- Drop triangle from 3.14 docs dependencies ([#8703](https://github.com/napari/napari/pull/8703))
- Enable `TC003` - typing-only-standard-library-import rule in ruff config ([#8791](https://github.com/napari/napari/pull/8791))
- Solve "Could not resolve type hint for required parameter 'qt_viewer'." ([#8792](https://github.com/napari/napari/pull/8792))
- Add app-model to mypy task dependencies and fix errors ([#8794](https://github.com/napari/napari/pull/8794))
- Update `coverage`, `dask`, `fsspec`, `hypothesis`, `ipython`, `numpy`, `pint`, `pygments`, `pyside6`, `qtconsole`, `superqt` ([#8796](https://github.com/napari/napari/pull/8796))
- Move from `appdirs` to `platformdirs` ([#8797](https://github.com/napari/napari/pull/8797))
- [pre-commit.ci] pre-commit autoupdate ([#8800](https://github.com/napari/napari/pull/8800))
- Enable TC002 ruff rule ([#8804](https://github.com/napari/napari/pull/8804))
- Fix layerlist_context by move Calable from TYPE_CHECKING block ([#8805](https://github.com/napari/napari/pull/8805))
- Add zizmor security CI check ([#8811](https://github.com/napari/napari/pull/8811))
- Ban expensive import in ruff ([#8815](https://github.com/napari/napari/pull/8815))
- Remove `triangle` from `napari[all]` ([#8824](https://github.com/napari/napari/pull/8824))
- Add a Linux aarch64 test run (py313, pyqt6) to --pre, PR, and comprehensive tests  ([#8825](https://github.com/napari/napari/pull/8825))
- [maint] Use ubuntu-slim 1 vCPU runners for simple jobs ([#8826](https://github.com/napari/napari/pull/8826))
- [maint] Add `bermuda` to testing dependencies ([#8827](https://github.com/napari/napari/pull/8827))
- [pre-commit.ci] pre-commit autoupdate ([#8831](https://github.com/napari/napari/pull/8831))
- Add more debug information on fail to import Qt ([#8834](https://github.com/napari/napari/pull/8834))
- maint: replace `StringEnum` base class with with `StrEnum` ([#8835](https://github.com/napari/napari/pull/8835))
- Do not import builtins from core (and forbid doing so) ([#8842](https://github.com/napari/napari/pull/8842))
- ci(dependabot): bump the actions group with 8 updates ([#8844](https://github.com/napari/napari/pull/8844))
- Remove sentinel leftover from `napari.utils.misc` ([#8846](https://github.com/napari/napari/pull/8846))
- Fix checking autogenerated type stubs ([#8847](https://github.com/napari/napari/pull/8847))
- Deprecate str_to_rgb which is unused ([#8849](https://github.com/napari/napari/pull/8849))
- Revert Citation validator from ubuntu-slim to use ubuntu-latest ([#8851](https://github.com/napari/napari/pull/8851))
- Deprecate make_default_color_array ([#8852](https://github.com/napari/napari/pull/8852))
- Dependabot cooldown ([#8853](https://github.com/napari/napari/pull/8853))
- Use bash script instead of docker image for checking PR labels ([#8856](https://github.com/napari/napari/pull/8856))
- Check untyped defs in labels ([#8861](https://github.com/napari/napari/pull/8861))
- add jasper-tms to citation ([#8862](https://github.com/napari/napari/pull/8862))
- Rename tox test step names to include 'qt_backend' ([#8866](https://github.com/napari/napari/pull/8866))
- Update `hypothesis`, `npe2`, `pandas`, `pillow`, `pydantic-extra-types`, `pyqt6` ([#8868](https://github.com/napari/napari/pull/8868))
- [pre-commit.ci] pre-commit autoupdate ([#8869](https://github.com/napari/napari/pull/8869))
- Deprecate color_dict_to_colormap with FutureWarning ([#8871](https://github.com/napari/napari/pull/8871))
- Update `hypothesis`, `lxml`, `magicgui`, `platformdirs`, `pytest`, `rich`, `virtualenv` ([#8876](https://github.com/napari/napari/pull/8876))
- Add session type to --info ([#8880](https://github.com/napari/napari/pull/8880))
- Improve make_release workflow's release steps ([#8882](https://github.com/napari/napari/pull/8882))
- [pre-commit.ci] pre-commit autoupdate ([#8884](https://github.com/napari/napari/pull/8884))
- ci(dependabot): bump the actions group with 4 updates ([#8889](https://github.com/napari/napari/pull/8889))
- Restore ability to push changes to napari-bot/napari repo ([#8891](https://github.com/napari/napari/pull/8891))
- Checkout only citation.cff in milestone checker ([#8892](https://github.com/napari/napari/pull/8892))
- Use hynek for build wheel ([#8893](https://github.com/napari/napari/pull/8893))
- Deprecate image_reader_to_layerdata_reader ([#8895](https://github.com/napari/napari/pull/8895))
- Finish typing bounding box and brush circle overlays ([#8902](https://github.com/napari/napari/pull/8902))
- Update `hypothesis`, `lxml`, `pydantic`, `pydantic-extra-types`, `virtualenv`, `xarray` ([#8906](https://github.com/napari/napari/pull/8906))
- [pre-commit.ci] pre-commit autoupdate ([#8908](https://github.com/napari/napari/pull/8908))
- Update `certifi`, `hypothesis`, `ipython`, `matplotlib`, `pydantic`, `pydantic-settings` ([#8920](https://github.com/napari/napari/pull/8920))
- [pre-commit.ci] pre-commit autoupdate ([#8923](https://github.com/napari/napari/pull/8923))
- Scalar base data setter ([#8925](https://github.com/napari/napari/pull/8925))
- Instead of checking if milestone is added, add the milestone on merge ([#8926](https://github.com/napari/napari/pull/8926))
- Adapt tests that use zarr to work on zarr < 3 and zarr > 3.2.0 ([#8943](https://github.com/napari/napari/pull/8943))
- Don't use random floats for image layer data in screenshot tests ([#8945](https://github.com/napari/napari/pull/8945))
- Remove decreases of font_size from primary UI elements. ([#8948](https://github.com/napari/napari/pull/8948))
- Update `coverage`, `fsspec`, `hypothesis`, `pydantic`, `pydantic-settings`, `tensorstore`, `tifffile`, `virtualenv` ([#8949](https://github.com/napari/napari/pull/8949))
- [pre-commit.ci] pre-commit autoupdate ([#8951](https://github.com/napari/napari/pull/8951))
- Fix auto milestone workflow ([#8954](https://github.com/napari/napari/pull/8954))
- Explicitly pass the repository name in command setting milestone ([#8955](https://github.com/napari/napari/pull/8955))
- Update python version used to generate title and body of update constraints PR ([#8957](https://github.com/napari/napari/pull/8957))
- Use `gh release create` instead of `softprops/action-gh-release` ([#8958](https://github.com/napari/napari/pull/8958))
- Remove CODEOWNERS ([#8959](https://github.com/napari/napari/pull/8959))
- Restore testing on windows-latest (Revert  5d6ab46) ([#8960](https://github.com/napari/napari/pull/8960))
- ci(dependabot): bump the actions group across 1 directory with 8 updates ([#8963](https://github.com/napari/napari/pull/8963))
- Pass token to make `gh` working in create release workflow ([#8964](https://github.com/napari/napari/pull/8964))
- Next fix of release workflow by pass directly `dist/*` ([#8966](https://github.com/napari/napari/pull/8966))
- Try to fix passing prerelease to `gh release create` ([#8969](https://github.com/napari/napari/pull/8969))
- Explicitly set repository in make release workflow ([#8970](https://github.com/napari/napari/pull/8970))
- Update `hypothesis`, `pandas`, `pyside6`, `pytest-rerunfailures`, `virtualenv` ([#8981](https://github.com/napari/napari/pull/8981))
- In vispy overalys use **kwargs instead of synchronizing signature ([#8982](https://github.com/napari/napari/pull/8982))
- Update `numpy`, `tensorstore`, `tifffile` ([#8986](https://github.com/napari/napari/pull/8986))
- [pre-commit.ci] pre-commit autoupdate ([#8988](https://github.com/napari/napari/pull/8988))
- Bump vispy to 0.16.2 ([#8992](https://github.com/napari/napari/pull/8992))
- Docs: Bump napari-sphinx-theme to use sticky banners ([#8997](https://github.com/napari/napari/pull/8997))
- Update `coverage`, `hypothesis`, `ipython`, `platformdirs`, `tifffile`, `virtualenv` ([#9021](https://github.com/napari/napari/pull/9021))
- [pre-commit.ci] pre-commit autoupdate ([#9022](https://github.com/napari/napari/pull/9022))
- Block pydantic==2.14.0a1 in `--pre` tests ([#9023](https://github.com/napari/napari/pull/9023))
- ci(dependabot): bump the actions group with 6 updates ([#9024](https://github.com/napari/napari/pull/9024))
- Mnt: Block qt6 6.11.0, 6.11.1 due to dock widget and resizing bugs ([#9052](https://github.com/napari/napari/pull/9052))


## 25 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) ([docs](https://github.com/napari/docs/commits?author=Aniketsy))  - @Aniketsy +
- [Austin Epiphane Yann Tung-Shan Lefebvre](https://github.com/napari/napari/commits?author=aelefebv) - @aelefebv +
- [Carlos Mario Rodriguez Reza](https://github.com/napari/napari/commits?author=carlosmariorr) - @carlosmariorr
- [Carol Willing](https://github.com/napari/napari/commits?author=willingc) - @willingc
- [Caroline Malin-Mayor](https://github.com/napari/napari/commits?author=cmalinmayor) ([docs](https://github.com/napari/docs/commits?author=cmalinmayor))  - @cmalinmayor +
- [Constantin Aronssohn](https://github.com/napari/docs/commits?author=cnstt) - @cnstt
- [David Stansby](https://github.com/napari/napari/commits?author=dstansby) - @dstansby
- [Draga Doncila Pop](https://github.com/napari/docs/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [hiroalchem](https://github.com/napari/napari/commits?author=hiroalchem) - @hiroalchem
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) - @jacopoabramo
- [Kabilar Gunalan](https://github.com/napari/docs/commits?author=kabilar) - @kabilar
- [LiudengZhang](https://github.com/napari/napari/commits?author=LiudengZhang) - @LiudengZhang
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Lucien Hinderling](https://github.com/napari/napari/commits?author=hinderling) - @hinderling +
- [Margot Chazotte](https://github.com/napari/napari/commits?author=MargotCh) - @MargotCh
- [Martin Weigert](https://github.com/napari/napari/commits?author=maweigert) - @maweigert
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Mélodie Ambroset](https://github.com/napari/napari/commits?author=mambroset) - @mambroset +
- [Niko Sirmpilatze](https://github.com/napari/napari/commits?author=niksirbi) ([docs](https://github.com/napari/docs/commits?author=niksirbi))  - @niksirbi +
- [Peter Newstein](https://github.com/napari/napari/commits?author=pnewstein) - @pnewstein +
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [Wulin Teo](https://github.com/napari/napari/commits?author=wulinteousa2-hash) - @wulinteousa2-hash +
- [Yann Pellegrini](https://github.com/napari/docs/commits?author=Yann-P) - @Yann-P +

## 22 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Aniket](https://github.com/napari/napari/commits?author=Aniketsy) ([docs](https://github.com/napari/docs/commits?author=Aniketsy))  - @Aniketsy +
- [Anniek Stokkermans](https://github.com/napari/docs/commits?author=AnniekStok) - @AnniekStok
- [Carlos Mario Rodriguez Reza](https://github.com/napari/napari/commits?author=carlosmariorr) - @carlosmariorr
- [Carol Willing](https://github.com/napari/napari/commits?author=willingc) - @willingc
- [Caroline Malin-Mayor](https://github.com/napari/napari/commits?author=cmalinmayor) ([docs](https://github.com/napari/docs/commits?author=cmalinmayor))  - @cmalinmayor +
- [Constantin Aronssohn](https://github.com/napari/docs/commits?author=cnstt) - @cnstt
- [David Stansby](https://github.com/napari/napari/commits?author=dstansby) - @dstansby
- [Draga Doncila Pop](https://github.com/napari/docs/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [hiroalchem](https://github.com/napari/napari/commits?author=hiroalchem) - @hiroalchem
- [Jacopo Abramo](https://github.com/napari/napari/commits?author=jacopoabramo) - @jacopoabramo
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [Kabilar Gunalan](https://github.com/napari/docs/commits?author=kabilar) - @kabilar
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Lucien Hinderling](https://github.com/napari/napari/commits?author=hinderling) - @hinderling +
- [Margot Chazotte](https://github.com/napari/napari/commits?author=MargotCh) - @MargotCh
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Niko Sirmpilatze](https://github.com/napari/napari/commits?author=niksirbi) ([docs](https://github.com/napari/docs/commits?author=niksirbi))  - @niksirbi +
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [Wulin Teo](https://github.com/napari/napari/commits?author=wulinteousa2-hash) - @wulinteousa2-hash +
- [Yann Pellegrini](https://github.com/napari/docs/commits?author=Yann-P) - @Yann-P +
