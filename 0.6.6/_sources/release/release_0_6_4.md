# napari 0.6.4

*Sat, Aug 16, 2025*

We’re happy to announce the release of napari 0.6.4!

napari is a fast, interactive, multi-dimensional image viewer for Python. It’s designed for exploring, annotating, and analyzing multi-dimensional images. It’s built on Qt (for the GUI), VisPy (for performant GPU-based rendering), and the scientific Python stack (NumPy, SciPy, and friends).

For more information, examples, and documentation, please visit our website: https://napari.org/

## Highlights

### Run scripts with napari from the command line

As a follow-up to the ability to drag-n-drop scripts into the napari window from 0.6.3, you can now run scripts directly from the command line using the `napari` command and the path to the script ([#8185](https://github.com/napari/napari/pull/8185) and [#8187](https://github.com/napari/napari/pull/8187)).
To open a local napari and run a local script, enter: `napari examples/magic_immage_arithmetic.py`.
You can also run scripts from a remote location ([#8208](https://github.com/napari/napari/pull/8208)), including Github, Gist, Gitlab, and the napari gallery.
To run a remote script, for example, enter: `napari https://github.com/napari/napari/blob/main/examples/grid_mode.py`.
If you have `uv` you can even run a script without installing napari by using `uvx --with "napari[gallery,all]" napari https://napari.org/stable/_downloads/55f878f7d41dc4c7c2e28483653273cb/affine_coffee_cup.py`, serving as a clever way to trial napari or share your script. As always with remote connections, only use this feature with scripts you trust.

### Toggling the napari console now places focus on the console

Toggling the napari console (with the keyboard (`Cmd/Ctrl+Shift+C`), GUI, or command palette) will now transfer focus on the console, allowing you to immediately start typing commands without needing to click into the console first ([#8182](https://github.com/napari/napari/pull/8182)). We have found this to be a very useful feature for a keyboard-centric workflow combining the power of the command palette and console together.

## Improvements

- Remove old path handle in napari start ([#8185](https://github.com/napari/napari/pull/8185))
- Prevent `napari.run` from being executed when running scripts from napari ([#8187](https://github.com/napari/napari/pull/8187))
- Add option to load script from a remote location ([#8208](https://github.com/napari/napari/pull/8208))

## Bug Fixes

- Set focus after toggling dockwidget via `DockWidgetToggleAction` ([#8182](https://github.com/napari/napari/pull/8182))
- Fix slider label shifted down, by overrwite QLineEdit qss rules ([#8184](https://github.com/napari/napari/pull/8184))
- Fix feature table widget sorting and editing of floats ([#8190](https://github.com/napari/napari/pull/8190))
- Add check if selected label is out of data range. ([#8202](https://github.com/napari/napari/pull/8202))
- Explicit copy of layers data for balls example ([#8203](https://github.com/napari/napari/pull/8203))

## Documentation

- Reorganize bundle instructions page to make it easier to navigate and provide download links ([docs#813](https://github.com/napari/docs/pull/813))
- Simplify installation guide & better highlight bundle ([docs#814](https://github.com/napari/docs/pull/814))
- Update codespell config and minor corrections ([docs#816](https://github.com/napari/docs/pull/816))
- Add contracted roles to team page and rename core dev -> core TM ([docs#817](https://github.com/napari/docs/pull/817))
- Pre-release notes for 0.6.4 ([docs#820](https://github.com/napari/docs/pull/820))
- Final 0.6.4 Release Notes ([docs#822](https://github.com/napari/docs/pull/822))

## Other Pull Requests

- Pin Github Actions actions to their hashes ([#8140](https://github.com/napari/napari/pull/8140))
- [pre-commit.ci] pre-commit autoupdate ([#8193](https://github.com/napari/napari/pull/8193))
- Fix fallback version in setuptools_scm to pass schema validation ([#8196](https://github.com/napari/napari/pull/8196))
- Use napari url for test rather than Fiji ([#8198](https://github.com/napari/napari/pull/8198))
- [pre-commit.ci] pre-commit autoupdate ([#8204](https://github.com/napari/napari/pull/8204))
- Pin `pytest-qt` for python 3.10 to fix pyapp-kit projects tests ([#8205](https://github.com/napari/napari/pull/8205))
- Retry second fullscreen test ([#8206](https://github.com/napari/napari/pull/8206))
- Fix script for checking for updated dependencies. ([#8207](https://github.com/napari/napari/pull/8207))
- Update `certifi`, `coverage`, `hypothesis`, `matplotlib`, `psygnal`, `pytest-rerunfailures`, `rich`, `scipy`, `superqt`, `virtualenv`, `wrapt` ([#8209](https://github.com/napari/napari/pull/8209))
- Update Version Switcher to 0.6.3 ([docs#808](https://github.com/napari/docs/pull/808))
- ci(dependabot): bump napari/napari from 0.6.2 to 0.6.3 in the github-actions group ([docs#810](https://github.com/napari/docs/pull/810))


## 8 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) - @dalthviz
- [Draga Doncila Pop](https://github.com/napari/docs/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) - @Czaki
- [Jaime Rodríguez-Guerra](https://github.com/napari/napari/commits?author=jaimergp) - @jaimergp
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Peter Sobolewski](https://github.com/napari/docs/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko


## 8 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Draga Doncila Pop](https://github.com/napari/docs/commits?author=DragaDoncila) - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) - @Czaki
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/docs/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko

