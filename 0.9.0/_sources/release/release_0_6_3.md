# napari 0.6.3

*Thu, Jul 31, 2025*

We’re happy to announce the release of napari 0.6.3!

napari is a fast, interactive, multi-dimensional image viewer for Python. It’s designed for exploring, annotating, and analyzing multi-dimensional images. It’s built on Qt (for the GUI), VisPy (for performant GPU-based rendering), and the scientific Python stack (NumPy, SciPy, and friends).

For more information, examples, and documentation, please visit our website: https://napari.org/

## Highlights

### A Zoom with a View 🔍

Pardon the play on words, but you can now zoom directly to a region of interest in the viewer by holding `Alt` and dragging with the mouse [(#8004)](https://github.com/napari/napari/pull/8004). The camera will pan and zoom to fit the selected region, making it much easier to focus on specific areas of your data. This feature works in both 2D and 3D views.

![GIF Displaying Alt-Drag Zoom Box Behavior](https://github.com/user-attachments/assets/f32ea020-28e2-4059-90b9-491bdd4a962b)

### Fine Tuning Thick Slicing from the GUI 📏

Thick slicing controls are now available in the GUI [(#6146)](https://github.com/napari/napari/pull/6146)! This allows you to project multiple slices together using different modes (sum, mean, max, and min) for better visualization of your multidimensional data. You can access the thickness controls by right-clicking on the dimension sliders to open a popup to change the margins either symmetrically or asymmetrical and projection mode settings are now available per layer in the layer controls widget.

![GIF Displaying Thick Slicing GUI Controls](https://github.com/user-attachments/assets/f61636d6-8540-4c33-9abc-1e065c5f9d38)

### Run Scripts by Dragging and Dropping into the Viewer 🖱️

Scripts can now be run by dragging and dropping them into the viewer [(#8135)](https://github.com/napari/napari/pull/8135)! This is particularly useful for running [napari examples](https://napari.org/stable/gallery.html#gallery) without having to use the command line; you can even run these scripts from the bundled install! This works by adding a `.py` reader to napari's builtins.

![Image Depicting a User dragging a script into the viewer](https://github.com/user-attachments/assets/af4edaa3-fd77-4697-85ea-4f2eb662f5ec)

### Windows: Access ~~Denied~~ Fixed 🪟

A critical Windows-specific bug that caused Access Violation errors has been resolved [(#8122)](https://github.com/napari/napari/pull/8122)! This longstanding issue would cause napari to stop displaying layers due to various events and often occurred at seemingly non-reproducible times, and required a full restart of napari. The fix ensures proper cleanup and syncing of GPU resources, also reducing memory usage on all platforms. If you were an effected user, you may recall it as `Access Violation`, `0x000000000000001C` if triggered without a plugin, or `0x000000000000034C` if triggered with a plugin.

### Improved PySide6 Support 🛠️

Napari now has improved support for PySide6 [(#7887)](https://github.com/napari/napari/pull/7887). We encourage plugin developers to test against PySide6, as a fully supported backend going forward. Additionally, this change will enable us to drop PySide2 along side Python 3.10, in the near future. If you are a plugin developer or otherwise depend on napari and PySide2, please reach out on Zulip or Github.

## New Features

- Qt controls for thick slicing ([#6146](https://github.com/napari/napari/pull/6146))
- Add automatic area and perimeter measurement for shapes + action ([#7262](https://github.com/napari/napari/pull/7262))
- Add 'zoom-box' to the viewer ([#8004](https://github.com/napari/napari/pull/8004))
- Add viewbox coordinates to events and Cursor ([#8130](https://github.com/napari/napari/pull/8130))
- feat: Add option to execute python code by drag'n'drop script to viewer ([#8135](https://github.com/napari/napari/pull/8135))

## Improvements

- Allow use functions from PartSegCore-compiled-backend as numba alternative for data to texture mapping ([#6617](https://github.com/napari/napari/pull/6617))
- Enable testing on recent PySide6 ([#7887](https://github.com/napari/napari/pull/7887))
- Implement pasting spatial information into higher dimensions ([#7973](https://github.com/napari/napari/pull/7973))
- Improve performance and memory usage of editing Shapes layer ([#8006](https://github.com/napari/napari/pull/8006))
- Colorblind friendly image sample of kidney and lily ([#8090](https://github.com/napari/napari/pull/8090))
- Added fixed seed and tested the value. ([#8097](https://github.com/napari/napari/pull/8097))
- Add alpha to split rgba into channels and remerge image. ([#8112](https://github.com/napari/napari/pull/8112))
- Add keybinding (CtrlCmd-up/down) to select layer above/below ([#8119](https://github.com/napari/napari/pull/8119))
- Do not calculate projection on slices of thickness 1 ([#8157](https://github.com/napari/napari/pull/8157))
- Add variables from drag and drop to console ([#8174](https://github.com/napari/napari/pull/8174))

## Performance

- Allow use functions from PartSegCore-compiled-backend as numba alternative for data to texture mapping ([#6617](https://github.com/napari/napari/pull/6617))

## Bug Fixes

- ensure sync when taking a screenshot ([#8064](https://github.com/napari/napari/pull/8064))
- Updated code to use current symbol and border width for new points. ([#8102](https://github.com/napari/napari/pull/8102))
- Improve performance and memory usage of editing Shapes layer (#8006 again) ([#8109](https://github.com/napari/napari/pull/8109))
- Add alpha to split rgba into channels and remerge image. ([#8112](https://github.com/napari/napari/pull/8112))
- Prevent Windows Access Violation with GPU resource cleanup on layer removal ([#8122](https://github.com/napari/napari/pull/8122))
- Only use scale to transform margins in thick slices ([#8137](https://github.com/napari/napari/pull/8137))
- Fix scalebar behaviour at high/low zoom ([#8144](https://github.com/napari/napari/pull/8144))
- Ensure contrast limits are computed on original dtype with projected thick slices ([#8149](https://github.com/napari/napari/pull/8149))
- Fix multiscale clim estimation by using full visible data, not first row ([#8152](https://github.com/napari/napari/pull/8152))
- Remove `np.asarray(self.cursor._view_direction)` that return unbound array ([#8172](https://github.com/napari/napari/pull/8172))

## API Changes

- Add viewbox coordinates to events and Cursor ([#8130](https://github.com/napari/napari/pull/8130))

## Documentation

- Update docs constraints and pyprojecttoml for npe2 ([#8075](https://github.com/napari/napari/pull/8075))
- Typo ismhow -> imshow ([#8084](https://github.com/napari/napari/pull/8084))
- Replace deprecated `view_*()` method from examples ([#8091](https://github.com/napari/napari/pull/8091))
- Comment the HEX codes of each color theme and where they're used ([#8099](https://github.com/napari/napari/pull/8099))
- New example for affine transformations in 3D using meshio and stl ([#8103](https://github.com/napari/napari/pull/8103))
- Added a try it out now section to README.md for using uv. ([#8107](https://github.com/napari/napari/pull/8107))
- Update README wording about scikit-image example ([#8125](https://github.com/napari/napari/pull/8125))
- Add example for grid mode. ([#8131](https://github.com/napari/napari/pull/8131))
- Update `xarray_nD_image_.py` to use xarray tag ([#8167](https://github.com/napari/napari/pull/8167))
- Autogenerate images of parts of the viewer ([docs#621](https://github.com/napari/docs/pull/621))
- Update instructions on how to update constraints files ([docs#672](https://github.com/napari/docs/pull/672))
- Updates to NAP-9: Multiple Views ([docs#730](https://github.com/napari/docs/pull/730))
- Update guides.md to add menu contribution guide ([docs#747](https://github.com/napari/docs/pull/747))
- Update building your first plugin guide ([docs#753](https://github.com/napari/docs/pull/753))
- Update version switcher for 0.6.2 ([docs#754](https://github.com/napari/docs/pull/754))
- Update Release Guide ([docs#755](https://github.com/napari/docs/pull/755))
- Fix information about `site-packages` directory ([docs#756](https://github.com/napari/docs/pull/756))
- Add empty release notes for 0.6.3 ([docs#757](https://github.com/napari/docs/pull/757))
- Add roadmap to sidebar links ([docs#760](https://github.com/napari/docs/pull/760))
- Refactor contributing guide landing page ([docs#761](https://github.com/napari/docs/pull/761))
- Reorganize homepage with grid columns ([docs#767](https://github.com/napari/docs/pull/767))
- Fix sidebar roadmap link ([docs#768](https://github.com/napari/docs/pull/768))
- Fix Image Annotation example ([docs#777](https://github.com/napari/docs/pull/777))
- Add website colors to community resources ([docs#779](https://github.com/napari/docs/pull/779))
- Update napari.org homepage to remove the `imshow` "button" ([docs#780](https://github.com/napari/docs/pull/780))
- Add instructions for headless docs build on Wayland ([docs#781](https://github.com/napari/docs/pull/781))
- Add module docstrings to scripts ([docs#787](https://github.com/napari/docs/pull/787))
- Update pre-commit config to add some python checkers ([docs#788](https://github.com/napari/docs/pull/788))
- Group event docs in order ([docs#789](https://github.com/napari/docs/pull/789))
- Add 0.6.3 release notes draft for release candidate ([docs#792](https://github.com/napari/docs/pull/792))
- Add docs for thick slicing ([docs#794](https://github.com/napari/docs/pull/794))
- Minor roadmap update ([docs#795](https://github.com/napari/docs/pull/795))
- Add "feature highlights" page ([docs#796](https://github.com/napari/docs/pull/796))
- Add introductory paragraph to starting an event loop api doc ([docs#797](https://github.com/napari/docs/pull/797))
- Update title of event loop api page for discoverability of napari.run ([docs#799](https://github.com/napari/docs/pull/799))
- Improve API docs for `view_*` pending removal in 0.7 ([docs#800](https://github.com/napari/docs/pull/800))
- Update 0.6.3 release notes ([docs#803](https://github.com/napari/docs/pull/803))
- Drag and drop python scripts ([docs#805](https://github.com/napari/docs/pull/805))
- Add Carol Willing to list of core developers in documentation ([docs#806](https://github.com/napari/docs/pull/806))
- Update announcement and version switcher ([docs#807](https://github.com/napari/docs/pull/807))

## Other Pull Requests

- Move export ROI and export figure implementations into `QtViewer` ([#7950](https://github.com/napari/napari/pull/7950))
- [pre-commit.ci] pre-commit autoupdate ([#8062](https://github.com/napari/napari/pull/8062))
- Block the recent pytest-qt version on python 3.10 to keep PySide2 support in testing. ([#8067](https://github.com/napari/napari/pull/8067))
- Add configurable suffix for test artifacts ([#8069](https://github.com/napari/napari/pull/8069))
- Update `coverage`, `hypothesis`, `ipython`, `pillow`, `psygnal`, `pytest-qt`, `tensorstore`, `xarray` ([#8073](https://github.com/napari/napari/pull/8073))
- [pre-commit.ci] pre-commit autoupdate ([#8074](https://github.com/napari/napari/pull/8074))
- Move non-qt file actions from qactions module ([#8076](https://github.com/napari/napari/pull/8076))
- Move more view actions from qaction to actions ([#8077](https://github.com/napari/napari/pull/8077))
- Report benchmark on non skipped status ([#8086](https://github.com/napari/napari/pull/8086))
- Enable SIM117 ruff rule ([#8088](https://github.com/napari/napari/pull/8088))
- Remove dotenv from dev dependencies ([#8089](https://github.com/napari/napari/pull/8089))
- Add deprecation warning for `view_<layer_type>` functions ([#8092](https://github.com/napari/napari/pull/8092))
- Revert #8006 Improve performance and memory usage of editing Shapes layer ([#8104](https://github.com/napari/napari/pull/8104))
- Improve stability of tests by ensuring cleaning of QtViewer instances ([#8113](https://github.com/napari/napari/pull/8113))
- Do not crash test with leaked graph if test failed ([#8123](https://github.com/napari/napari/pull/8123))
- [pre-commit.ci] pre-commit autoupdate ([#8124](https://github.com/napari/napari/pull/8124))
- Cleanup of `test_qt_utils.py` ([#8129](https://github.com/napari/napari/pull/8129))
- Small fix to shapes measurement ([#8133](https://github.com/napari/napari/pull/8133))
- Update Citation file for 0.6.1 through 0.6.3 ([#8138](https://github.com/napari/napari/pull/8138))
- Slightly increase pip test workflow timeout ([#8143](https://github.com/napari/napari/pull/8143))
- Use `pytest-rerunfailures` for flaky `test_toggle_fullscreen_from_maximized` test ([#8151](https://github.com/napari/napari/pull/8151))
- [pre-commit.ci] pre-commit autoupdate ([#8158](https://github.com/napari/napari/pull/8158))
- Move scalar field `_slice` machinery to proper module and update naming ([#8164](https://github.com/napari/napari/pull/8164))
- Fix reporting python version in benchmark bug reports ([#8169](https://github.com/napari/napari/pull/8169))
- Clean benchmark logs by using the non-deprecated layer-adding method ([#8170](https://github.com/napari/napari/pull/8170))
- Update list of affiliation of Grzegorz Bokota ([#8179](https://github.com/napari/napari/pull/8179))
- Update triggered_target_build.yml regex to ensure we match on hyphen ([docs#764](https://github.com/napari/docs/pull/764))
- Pin Github Actions actions to their hashes ([docs#804](https://github.com/napari/docs/pull/804))

## 15 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Andrew](https://github.com/napari/napari/commits?author=ahuang11) - @ahuang11 +
- [Carol Willing](https://github.com/napari/napari/commits?author=willingc) ([docs](https://github.com/napari/docs/commits?author=willingc)) - @willingc
- [Filippo Balzaretti](https://github.com/napari/napari/commits?author=FilBalza) ([docs](https://github.com/napari/docs/commits?author=FilBalza)) - @FilBalza +
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki)) - @Czaki
- [Ian Coccimiglio](https://github.com/napari/docs/commits?author=ian-coccimiglio) - @ian-coccimiglio +
- [Jaime Rodríguez-Guerra](https://github.com/napari/docs/commits?author=jaimergp) - @jaimergp
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [Kanai Potts](https://github.com/napari/napari/commits?author=8bitbiscuit) - @8bitbiscuit +
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag)) - @brisvag
- [Lukasz Migas](https://github.com/napari/napari/commits?author=lukasz-migas) - @lukasz-migas
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) ([docs](https://github.com/napari/docs/commits?author=psobolewskiPhD)) - @psobolewskiPhD
- [Rahul Kumar](https://github.com/napari/napari/commits?author=rahul713rk) - @rahul713rk
- [rwkozar](https://github.com/napari/napari/commits?author=rwkozar) - @rwkozar
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko)) - @TimMonko

## 18 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [andrew sweet](https://github.com/napari/docs/commits?author=andy-sweet) - @andy-sweet
- [Carol Willing](https://github.com/napari/napari/commits?author=willingc) ([docs](https://github.com/napari/docs/commits?author=willingc)) - @willingc
- [Constantin Aronssohn](https://github.com/napari/docs/commits?author=cnstt) - @cnstt
- [Daniel Althviz Moré](https://github.com/napari/docs/commits?author=dalthviz) - @dalthviz
- [Davis Bennett](https://github.com/napari/docs/commits?author=d-v-b) - @d-v-b
- [Draga Doncila Pop](https://github.com/napari/docs/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki)) - @Czaki
- [Jacopo Abramo](https://github.com/napari/docs/commits?author=jacopoabramo) - @jacopoabramo
- [Jaime Rodríguez-Guerra](https://github.com/napari/docs/commits?author=jaimergp) - @jaimergp
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag)) - @brisvag
- [Lukasz Migas](https://github.com/napari/napari/commits?author=lukasz-migas) - @lukasz-migas
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) ([docs](https://github.com/napari/docs/commits?author=psobolewskiPhD)) - @psobolewskiPhD
- [Rahul Kumar](https://github.com/napari/napari/commits?author=rahul713rk) - @rahul713rk
- [rwkozar](https://github.com/napari/napari/commits?author=rwkozar) - @rwkozar
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko)) - @TimMonko
- [Wouter-Michiel Vierdag](https://github.com/napari/docs/commits?author=melonora) - @melonora
