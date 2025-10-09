# napari 0.6.0

*Thu, May 01, 2025*

We’re happy to announce the release of napari 0.6.0! The right-handed release! This release features major changes so read on to see how they might affect you!

napari is a fast, interactive, multi-dimensional image viewer for Python. It’s designed for exploring, annotating, and analyzing multi-dimensional images. It’s built on Qt (for the GUI), VisPy (for performant GPU-based rendering), and the scientific Python stack (NumPy, SciPy, and friends).

For more information, examples, and documentation, please visit our website: https://napari.org/

## Highlights

### Summary

- Updated viewer handedness ✋
- Command palette 🎨
- Display polygons with holes ⛳️
- Transition to npe2 plugin engine by default 🔌
- Many other GUI improvements 🖥️

### Updated viewer handedness ✋

So. Funny story. 😅

For (checks notes) 5 years or so, napari has had a 3D view, and for those 5
years, for almost all datasets, that view has been a *mirror image* of the 3D
object they were trying to represent. Any biologists among you might have
noticed that loading 3D molecular coordinates of DNA would result in a
left-handed helix, while anatomists among you might have been surprised by how
many of your samples suffered from [situs inversus
totalis](https://en.wikipedia.org/wiki/Situs_inversus)!

By and large, many things that people care about work exactly the same in the
mirror world — volume measurements, forces, tracking, speed, ... — so this bug
has gone mostly unnoticed, or noticed and shrugged off and unfixed for all this
time. But it's important for some things!  Your heart is on the left side of
your body, but the right side of your mirror image's. This can be critical, for
example, when using software to plan surgery! Thankfully, we are not aware of
any cases of napari being used in this way. 😅

napari uses zyx coordinates instead of xyz because it is the most natural way
to work with NumPy arrays and the rest of the scientific Python imaging
ecosystem. Flipping the axes in this way also changes the *handedness* of the
space, *unless* you also flip the direction of one of the dimensions. The
simplest way to illustrate this is [this 3D model of a right
shoe](https://grabcad.com/library/anatomic-shoe-sole-euro-right-41-1), which looks
like this in previous versions of napari:

![right shoe rendered as a left shoe in napari](https://github.com/user-attachments/assets/c9190e2c-f35a-44d1-95d5-f9877dd4c843)

and in 0.6.0, thanks to [#7554](https://github.com/napari/napari/pull/7554):

![right shoe correctly rendered as a right shoe in napari](https://github.com/user-attachments/assets/e187f5e7-8e4a-4526-bae9-80a9bec6fea3)

Most users won't notice. But if you were among the users that noticed and you
implemented workarounds in your code (such as setting the z-scale to a negative
number), now is a good time to undo the workarounds for newer versions of
napari! If you run into any issues please get in touch [on GitHub
issues](https://github.com/napari/napari) or on our [Zulip chat room](https://napari.zulipchat.com)!

On the user space, we now offer several options to orient the axes any way you
like:

1. **Through the camera API:** the `Viewer.camera` instance gains two new
  attributes: `orientation`, and `orientation2d`, which is just the last two
  dimensions of `orientation`. You can set the direction that the *depth*,
  *vertical*, and *horizontal* axes point to, respectively in that order, as
  follows ([#7663](https://github.com/napari/napari/pull/7663)):

  ```python
  # 2D
  viewer.camera.orientation2d = ('up', 'right')
  # 3D
  viewer.camera.orientation = ('away', 'up', 'right')
  ```

  See an example of this in action in
  {ref}`sphx_glr_gallery_xarray-latlon-timeseries.py`.

2. **Through the UI:** By right clicking on the dimension toggle in the viewer,
  and setting the axis orientations using the drop-down menus
  ([#7686](https://github.com/napari/napari/pull/7686)), which in 3D will
  further indicate whether the resulting coordinate frame is [right-handed or
  left-handed](https://en.wikipedia.org/wiki/Right-hand_rule)
  ([#7770](https://github.com/napari/napari/pull/7770)):

  ![axis orientation dialog](https://github.com/user-attachments/assets/f73898ec-9156-4f73-ab7f-ee2a7cc17fe1)

3. **Through the startup settings:** If you want to use a specific axis
  orientation consistently, you can set the default orientation on startup by
  changing the relevant settings
  ([#7787](https://github.com/napari/napari/pull/7787):

  ![napari settings panel with axis orientation options highlighted](https://github.com/user-attachments/assets/f5032320-8b03-4ff7-9cb7-8b182ab232af)

  To restore the orientation from napari 0.5.6 and earlier, change the Depth
  axis setting to "away" (i.e. depth axis points away from you).

### Command palette 🎨

Tired of mousing around? Thanks to
[#5483](https://github.com/napari/napari/pull/5483), napari gains a command
palette! Press {kbd}`Ctrl/Command+Shift+P` and start typing the name of the
action you want to use, and press {kbd}`Enter` when you've highlighted it. It
even works with plugins! This is the culmination of many months of work porting
napari's actions to Talley Lambert's
[app-model](https://github.com/pyapp-kit/app-model). 🥳

![command palette example](https://github.com/user-attachments/assets/a412c3d1-8d29-43a2-87a4-391f2ccec57e)

There's still lots of work to be done here, but in the meantime, give it a try!
We on the team have found it very hard to go back to using napari without the
palette!

### Feature improvements to Shapes layers ⛳️

⚠️  *When using numba for triangulation, some shapes will still not be drawn
correctly, due to a bug in VisPy. We recommend installing `bermuda`, our new
fast triangulation package, for the best performance.* ⚠️

Finally, napari Shapes layers can now display polygons with holes in them,
which starts to open it up for use with mapping data, among other things!
([#7566](https://github.com/napari/napari/pull/7566),
[#6654](https://github.com/napari/napari/pull/6654)]) Implementing this feature
also eliminated a lot of bugs in our polygon drawing code, which could cause
crashes. If you've had issues with Shapes layers before, now might be a good
time to give them another try!

As part of this work, napari gained the ability to select between different
backends for triangulation, which means breaking up polygons into collections
of triangles, which is what GPUs are good at drawing.
([#7747](https://github.com/napari/napari/pull/7747)) To use the new backends,
install the relevant package (for example, `bermuda`,
`partsegcore-compiled-backend`, or `numba`), then go to Settings > Experimental
\> triangulation backend. (If you use `napari[all]`, you will have bermuda
installed and it will be used automatically, as the default option is "fastest
available".)

### Transition to npe2 plugin engine 🔌

npe2 was introduced over four years ago, with napari 0.4.12. npe2 has paved the
way for new plugin functionality, such as [adding menu
items](nap-6-contributable-menus) and the command palette. We are now beginning
the process of deprecating npe1 (napari-plugin-engine) plugins, which we need
to do to continue to improve npe2 functionality, for example in file readers,
which is currently very entangled with npe1 code.

To aid this migration, npe1 plugins will now be automatically converted to npe2
by default. This may break some features if the plugins relied on import-time
behavior. ([#7627](https://github.com/napari/napari/pull/7627))

During the 0.6.x series, if some plugin functionality is broken by the
automatic conversion, you can turn off this conversion in the plugin
preferences. However, the option to not convert npe1 plugins will be
removed in 0.7.0, and npe1 plugins will *only* work through automatic
conversion. We anticipate 0.7.0 will be released in the second half of 2025.

If you encounter conversion issues in a plugin you rely on, please contact the
plugin authors to encourage them to migrate their plugin to the npe2 system.

For more details on this change and how it affects plugins, see the [detailed
guide](adapted-plugin-guide). If you are a plugin author and your plugin is not
yet npe2-compatible, please see our [npe2 migration
guide](npe2-migration-guide), and, if you encounter any issues, get in touch in
our [Plugins Zulip chat
channel](https://napari.zulipchat.com/#narrow/channel/309872-plugins) or by
coming to one of our [community meetings](meeting-schedule).

### GUI improvements 🖥️

You'll notice the main napari GUI is subtly (or not so subtly) different in
0.6.0. Here are some of the improvements:

- Buttons now have an indicator to show whether they contain an extra menu when
  right-clicking. ([#7556](https://github.com/napari/napari/pull/7556))
- The button to change between 2D and 3D views much more clearly shows
  what it does. ([#7608](https://github.com/napari/napari/pull/7608))
- … And it has an extra menu with lots of options to control the camera!
  ([#7626](https://github.com/napari/napari/pull/7626))
- You can now add a bit of spacing between layers in grid mode (and control it
  in the grid mode right-click menu!)
  ([#7597](https://github.com/napari/napari/pull/7597))
- The colormap indicator in image layers is now a button, allowing you to
  create a linear colormap with any color!
  ([#7600](https://github.com/napari/napari/pull/7600))
- If you select multiple layers in the layer list, you can now see the status
  display of all the selected layers in the status bar
  ([#7673](https://github.com/napari/napari/pull/7673))
- If you switch from 2D to 3D view and back again, your 3D viewing angle will
  be preserved ([#7765](https://github.com/napari/napari/pull/7765))
- Notice some weird behavior? Our new log handler and viewer might help! Access
  it with Help > Show logs. ([#6900](https://github.com/napari/napari/pull/6900))

### Other stuff

For developers: napari now depends on Python 3.10+
([#7603](https://github.com/napari/napari/pull/7603) and Pydantic v2.2
([#7589](https://github.com/napari/napari/pull/7589)).

We've supported both pydantic 1 and 2 since 0.4.19, but we're now ready to take
advantage of performance and API improvements in Pydantic 2. If your library
depends on Pydantic 1.x, now would be a good time to upgrade, or it will not be
compatible with napari going forward.

If you were dreading 0.6.0 because you were relying on `_qt_viewer` features,
worry not: we have again postponed that deprecation while we add the required
APIs. 😅 ([#7730](https://github.com/napari/napari/pull/7730))

Also, if you've been wanting to contribute that doc fix but found the process
daunting, it's now easier than ever, because our default documentation preview
build is now much faster! You can propose changes from the GitHub UI and see
the rendered results in only two minutes!
([napari/docs#669](https://github.com/napari/docs/pull/669))

## New Features

- Implement command palette widget ([#5483](https://github.com/napari/napari/pull/5483))
- Add a custom log handler and GUI viewer with filters ([#6900](https://github.com/napari/napari/pull/6900))
- Add Grid Mode Spacing to change distance between layers  ([#7597](https://github.com/napari/napari/pull/7597))
- Enable creation of custom linear colormaps in layer controls ([#7600](https://github.com/napari/napari/pull/7600))
- Add API to Camera model to flip axes ([#7663](https://github.com/napari/napari/pull/7663))
- Show layer status for all visible layers ([#7673](https://github.com/napari/napari/pull/7673))
- Expose new camera orientation API in GUI in ndisplay popup widget ([#7686](https://github.com/napari/napari/pull/7686))

## Improvements

- Fix issues displaying polygons with holes in Shapes ([#6654](https://github.com/napari/napari/pull/6654))
- Add numba warmup step when creating empty Shapes Layer ([#7541](https://github.com/napari/napari/pull/7541))
- Add Image Border / Bounding Box Gallery Examples for both 2D and 3D ([#7546](https://github.com/napari/napari/pull/7546))
- Add right-click indicator to 3D, Roll, Grid, and Square push buttons ([#7556](https://github.com/napari/napari/pull/7556))
- Change naming of 'pan/zoom' mode to 'Move camera' to clarify functionality differences in 2D and 3D ([#7569](https://github.com/napari/napari/pull/7569))
- ENH: adjust layer coordinates in status by _translate_grid ([#7584](https://github.com/napari/napari/pull/7584))
- Add right click indicator to playback icons ([#7590](https://github.com/napari/napari/pull/7590))
- Change ndisplay button to toggle-like to increase discoverability ([#7608](https://github.com/napari/napari/pull/7608))
- [UI] Add Command Palette to the welcome screen ([#7613](https://github.com/napari/napari/pull/7613))
- Fix layout issue in image/surface controls ([#7618](https://github.com/napari/napari/pull/7618))
- Expose additional Camera parameters in GUI with 3D popup widget ([#7626](https://github.com/napari/napari/pull/7626))
- Add 'Extend with Plugins' and 'Contribute to napari' links to the Help menu. ([#7645](https://github.com/napari/napari/pull/7645))
- Restyle visibility icon to clarify different interactions compared to clicking layer ([#7657](https://github.com/napari/napari/pull/7657))
- Add toggle 3D view action ([#7721](https://github.com/napari/napari/pull/7721))
- Add optional font scaling to layer text properties ([#7732](https://github.com/napari/napari/pull/7732))
- Add `viewer.fit_to_view()`, properly calculate 3D data canvas size, and refactor `viewer.reset_view()` ([#7742](https://github.com/napari/napari/pull/7742))
- Add `bermuda` backend for faster triangulation ([#7747](https://github.com/napari/napari/pull/7747))
- Track layer slider max value ([#7756](https://github.com/napari/napari/pull/7756))
- Maintain 3D camera angles when switching between 2D and 3D views ([#7765](https://github.com/napari/napari/pull/7765))
- Add handedness property to camera and display in GUI ([#7770](https://github.com/napari/napari/pull/7770))
- Revert status bar changes for single active layer ([#7775](https://github.com/napari/napari/pull/7775))
- Add 3D support for `viewer.export_figure()` ([#7779](https://github.com/napari/napari/pull/7779))
- Add camera orientation parameters to application settings. ([#7787](https://github.com/napari/napari/pull/7787))
- Update camera orientation tooltips for GUI preferences and camera widget ([#7813](https://github.com/napari/napari/pull/7813))
- Add scale bar box toggle to view > scale bar menu ([#7815](https://github.com/napari/napari/pull/7815))
- Add setter for track colors ([#7833](https://github.com/napari/napari/pull/7833))

## Performance

- Add numba warmup step when creating empty Shapes Layer ([#7541](https://github.com/napari/napari/pull/7541))
- Add benchmarks for triangulation ([#7632](https://github.com/napari/napari/pull/7632))
- When adding shapes, use preallocated array instead of concatenation ([#7845](https://github.com/napari/napari/pull/7845))

## Bug Fixes

- Fix issues displaying polygons with holes in Shapes ([#6654](https://github.com/napari/napari/pull/6654))
- Fix points data selection for 4D ([#6819](https://github.com/napari/napari/pull/6819))
- Update point add to handle multiple coordinates in data_indices ([#7536](https://github.com/napari/napari/pull/7536))
- Use data.dtype for creating slicer ([#7540](https://github.com/napari/napari/pull/7540))
- Fix bounding_box extent for case of 3D multiscale layer ([#7545](https://github.com/napari/napari/pull/7545))
- Flip z axis on 3D camera to default to right-handed frame (#7488 redux) ([#7554](https://github.com/napari/napari/pull/7554))
- Protect few possible access to window that may be triggered by callback ([#7565](https://github.com/napari/napari/pull/7565))
- Implement polygon with holes in compiled triangulation ([#7566](https://github.com/napari/napari/pull/7566))
- Fix / update path (shape layer) icon ([#7582](https://github.com/napari/napari/pull/7582))
- Fix double-click-to-zoom for case of only 2D layer in 3D display ([#7586](https://github.com/napari/napari/pull/7586))
- Set dtype for out of bounds slice when slicing image ([#7606](https://github.com/napari/napari/pull/7606))
- Refactor setting face meshes in Shapes to support other planar axes ([#7622](https://github.com/napari/napari/pull/7622))
- Fix add_shapes.py example: remove duplicate vertex that can cause seg faults ([#7636](https://github.com/napari/napari/pull/7636))
- Move focus to main window before close `NapariQtNotification` ([#7656](https://github.com/napari/napari/pull/7656))
- Update layerlist.py docstring to stop doc build warnings ([#7660](https://github.com/napari/napari/pull/7660))
- Use faster edge triangulation if numba is available ([#7674](https://github.com/napari/napari/pull/7674))
- enforce not restart status checker thread on window close ([#7682](https://github.com/napari/napari/pull/7682))
- Fix `is_convex` to properly handle shapes with self intersection ([#7688](https://github.com/napari/napari/pull/7688))
- [bugfix] Adjust scale_bar box scaling and positioning with font size increases ([#7750](https://github.com/napari/napari/pull/7750))
- Fix layout of help symbols in grid popup ([#7771](https://github.com/napari/napari/pull/7771))
- Clarify color ValueError message ([#7805](https://github.com/napari/napari/pull/7805))
- Fix dump settings ([#7808](https://github.com/napari/napari/pull/7808))
- [bugfix] ensure erasing and fill work with swap and preserve labels ([#7816](https://github.com/napari/napari/pull/7816))
- fix `ScalarField._get_value_3d` to return information about data level for multiscale ([#7849](https://github.com/napari/napari/pull/7849))
- Use  weak reference to slider in `AnimationThread` ([#7866](https://github.com/napari/napari/pull/7866))
- Patch `CONDA_EXE` environment variable to valid conda path ([#7869](https://github.com/napari/napari/pull/7869))
- Compare slice_key array instead of value for use with 4+D data ([#7879](https://github.com/napari/napari/pull/7879))

## API Changes

- Update point add to handle multiple coordinates in data_indices ([#7536](https://github.com/napari/napari/pull/7536))

## Build Tools

- Bump `asv` constraints version  ([#7255](https://github.com/napari/napari/pull/7255))
- Add sphinx opengraph dependency to docs for better social media preview ([#7814](https://github.com/napari/napari/pull/7814))

## Documentation

- Add example to LayerList and docstrings for link_layers/unlink_layers ([#7410](https://github.com/napari/napari/pull/7410))
- Add example for using the glasbey colormap with napari ([#7468](https://github.com/napari/napari/pull/7468))
- Ensure that fps overlay is visible on gallery screenshot in overlay example ([#7558](https://github.com/napari/napari/pull/7558))
- Update NotebookScreenshot docstring ([#7583](https://github.com/napari/napari/pull/7583))
- Cleanup multiple viewer example ([#7593](https://github.com/napari/napari/pull/7593))
- Update README.md to use python 3.10 like napari.org install docs ([#7599](https://github.com/napari/napari/pull/7599))
- Add link to napari weather report dashboard in README.md ([#7609](https://github.com/napari/napari/pull/7609))
- Update README.md to bump the recommended python to 3.11 ([#7610](https://github.com/napari/napari/pull/7610))
- Update layerlist.py docstring to stop doc build warnings ([#7660](https://github.com/napari/napari/pull/7660))
- Skip `multiple_viewers` example from docs Examples gallery ([#7676](https://github.com/napari/napari/pull/7676))
- Unblock examples/surface_timeseries_.py ([#7788](https://github.com/napari/napari/pull/7788))
- Add PyQt6 info to Qt bindings check ImportError message ([#7804](https://github.com/napari/napari/pull/7804))
- Update readme badge from NEP 29 to scientific python ecosystem coordination SPEC 0 ([#7811](https://github.com/napari/napari/pull/7811))
- Add sphinx opengraph dependency to docs for better social media preview ([#7814](https://github.com/napari/napari/pull/7814))
- Gallery: use colors from the South African flag to draw SA ([#7859](https://github.com/napari/napari/pull/7859))
- Update CITATION.cff for 0.6.0 ([#7860](https://github.com/napari/napari/pull/7860))
- Add Constantin Aronssohn to citation.cff ([#7873](https://github.com/napari/napari/pull/7873))
- Update finding and installing plugin docs ([docs#541](https://github.com/napari/docs/pull/541))
- Rename Gallery to Examples ([docs#560](https://github.com/napari/docs/pull/560))
- Update BlueSky link to our actual account (not masto bridge) ([docs#564](https://github.com/napari/docs/pull/564))
- Update installation instructions to mention the `optional` dependency group ([docs#571](https://github.com/napari/docs/pull/571))
- Update conf.py to bump the recommended python version to 3.11 ([docs#572](https://github.com/napari/docs/pull/572))
- Update viewer.md to include spacing for grid mode ([docs#573](https://github.com/napari/docs/pull/573))
- Update shapes path icon ([docs#574](https://github.com/napari/docs/pull/574))
- Update viewer.md to include tip about the chevron for right-click ([docs#576](https://github.com/napari/docs/pull/576))
- Add an explicit list of Steering Council members to Team page ([docs#579](https://github.com/napari/docs/pull/579))
- Edit plugin landing page to add links and update information ([docs#581](https://github.com/napari/docs/pull/581))
- Edit user plugin installation page to simplify instructions ([docs#586](https://github.com/napari/docs/pull/586))
- Untab the plugin users and plugin developers grids ([docs#593](https://github.com/napari/docs/pull/593))
- Add guidance document for adapted npe1 plugins ([docs#597](https://github.com/napari/docs/pull/597))
- Updates to the makefile, contribution guide, and README for the napari[docs] installation ([docs#602](https://github.com/napari/docs/pull/602))
- Add cards to the Advanced Topics landing page for plugins ([docs#603](https://github.com/napari/docs/pull/603))
- Reorganize plugin landing page and remove redundant index file ([docs#609](https://github.com/napari/docs/pull/609))
- Add release notes and community chat links to homepage sidebar ([docs#610](https://github.com/napari/docs/pull/610))
- Suppress detached head warning in prep_docs script ([docs#612](https://github.com/napari/docs/pull/612))
- Move user-facing information to top of preferences and fix autogenerated UI images ([docs#613](https://github.com/napari/docs/pull/613))
- Add sections to Contributing landing page and edit lightly ([docs#614](https://github.com/napari/docs/pull/614))
- Move links out of navbar and into sidebar / other docs. ([docs#620](https://github.com/napari/docs/pull/620))
- Add 0.6.0 alpha release note ([docs#622](https://github.com/napari/docs/pull/622))
- Add info about adapted plugins to troubleshooting guide ([docs#623](https://github.com/napari/docs/pull/623))
- Add information about show= kwarg for make_napari_viewer fixture ([docs#627](https://github.com/napari/docs/pull/627))
- Update release process and procedure documentation ([docs#628](https://github.com/napari/docs/pull/628))
- Update conf.py to use packaging to detect dev vs release versions ([docs#631](https://github.com/napari/docs/pull/631))
- Tidy up conf.py file for contributors ([docs#632](https://github.com/napari/docs/pull/632))
- Update troubleshooting.md to address pydantic 2 change in 0.6.0 ([docs#633](https://github.com/napari/docs/pull/633))
- Edit testing doc and add admonition to Grzegorz blog post on Qt testing ([docs#635](https://github.com/napari/docs/pull/635))
- update left sidebar to persist resources ([docs#636](https://github.com/napari/docs/pull/636))
- remove gui_qt since it is deprecated and will be removed in 0.6.0 ([docs#639](https://github.com/napari/docs/pull/639))
- Update napari-workshops.md to include LIBRE LatAm, SciPy, and I2K ([docs#641](https://github.com/napari/docs/pull/641))
- Update event_loop.md to remove gui_qt which is removed in 0.6.0 ([docs#642](https://github.com/napari/docs/pull/642))
- Withdraw NAP-5 new logo proposal ([docs#644](https://github.com/napari/docs/pull/644))
- Update roadmap index to highlight global roadmap  ([docs#651](https://github.com/napari/docs/pull/651))
- Add missing magicgui imports ([docs#655](https://github.com/napari/docs/pull/655))
- Surface plugin best practices ([docs#656](https://github.com/napari/docs/pull/656))
- Add Tim Monko to core developers list ([docs#662](https://github.com/napari/docs/pull/662))
- Update 0.6.0 release notes with more complete highlights and more PRs ([docs#665](https://github.com/napari/docs/pull/665))
- Improve social media preview with OpenGraph ([docs#667](https://github.com/napari/docs/pull/667))
- Update plugin best practices ([docs#668](https://github.com/napari/docs/pull/668))
- Update 0.6.0 release notes some more ([docs#677](https://github.com/napari/docs/pull/677))
- Add command palette to the Quick start guide and Viewer tutorial ([docs#683](https://github.com/napari/docs/pull/683))
- More 0.6.0 release note updates ([docs#686](https://github.com/napari/docs/pull/686))
- Add triangulation guide ([docs#688](https://github.com/napari/docs/pull/688))
- Update button screenshots in viewer tutorial ([docs#690](https://github.com/napari/docs/pull/690))
- Add image highlighting right-click indicators in viewer tutorial ([docs#691](https://github.com/napari/docs/pull/691))
- Update pan-zoom video with new UI, better data, and better framerate ([docs#692](https://github.com/napari/docs/pull/692))
- Add handedness guide and link from viewer tutorial ([docs#695](https://github.com/napari/docs/pull/695))
- Final release notes for 0.6.0 ([docs#696](https://github.com/napari/docs/pull/696))

## Other Pull Requests

- Add optional dependency sections for gallery and docs ([#7487](https://github.com/napari/napari/pull/7487))
- Small improvement of code readability for Shape painting ([#7544](https://github.com/napari/napari/pull/7544))
- Remove some py38 leftovers ([#7549](https://github.com/napari/napari/pull/7549))
- Update `hypothesis`, `pydantic`, `scikit-image` ([#7557](https://github.com/napari/napari/pull/7557))
- Fix rendering of Fourier example screenshot  ([#7560](https://github.com/napari/napari/pull/7560))
- [pre-commit.ci] pre-commit autoupdate ([#7561](https://github.com/napari/napari/pull/7561))
- Update scale bar tests to actually test white/magenta ([#7563](https://github.com/napari/napari/pull/7563))
- ci(dependabot): update cff-validator and codecov upload ([#7572](https://github.com/napari/napari/pull/7572))
- Update `babel`, `certifi`, `coverage`, `fsspec`, `hypothesis`, `ipython`, `lxml`, `psygnal`, `pyqt6`, `qtpy`, `virtualenv`, `xarray` ([#7575](https://github.com/napari/napari/pull/7575))
- [pre-commit.ci] pre-commit autoupdate ([#7578](https://github.com/napari/napari/pull/7578))
- Update grid / layer button icons (and separate from stop playback icon) ([#7580](https://github.com/napari/napari/pull/7580))
- [pre-commit.ci] pre-commit autoupdate ([#7592](https://github.com/napari/napari/pull/7592))
- Remove andy-sweet from CODEOWNERS ([#7594](https://github.com/napari/napari/pull/7594))
- Block problematic pydantic pre-release ([#7596](https://github.com/napari/napari/pull/7596))
- stop using ubuntu 20.04 runners in actions ([#7598](https://github.com/napari/napari/pull/7598))
- Update `dask`, `hypothesis`, `psutil` ([#7605](https://github.com/napari/napari/pull/7605))
- Update `scipy` ([#7616](https://github.com/napari/napari/pull/7616))
- Fix test_export_rois to work on HiDPI screens ([#7625](https://github.com/napari/napari/pull/7625))
- Add tox to dev dependencies ([#7629](https://github.com/napari/napari/pull/7629))
- Update `hypothesis`, `npe2`, `scikit-image`, `tensorstore`, `tifffile` ([#7635](https://github.com/napari/napari/pull/7635))
- Update pyproject.toml to add missing docs reqs to [docs] ([#7637](https://github.com/napari/napari/pull/7637))
- Update CIrcleCI config.yml to use docs dependency group and pyqt5 (match napari/docs) ([#7638](https://github.com/napari/napari/pull/7638))
- Update build_docs.yml to match napari/docs ([#7640](https://github.com/napari/napari/pull/7640))
- Update `hypothesis` ([#7641](https://github.com/napari/napari/pull/7641))
- Simplify constraints configuration ([#7642](https://github.com/napari/napari/pull/7642))
- [pre-commit.ci] pre-commit autoupdate ([#7647](https://github.com/napari/napari/pull/7647))
- Conditionally call IPython 9+ with a theme_name instead of color_scheme ([#7650](https://github.com/napari/napari/pull/7650))
- Add version info to welcome screen ([#7659](https://github.com/napari/napari/pull/7659))
- Update `hypothesis`, `ipython`, `matplotlib`, `pytest` ([#7664](https://github.com/napari/napari/pull/7664))
- [pre-commit.ci] pre-commit autoupdate ([#7666](https://github.com/napari/napari/pull/7666))
- Cleanup warnings in shapes benchmark, use `_` prefix for unused variables ([#7667](https://github.com/napari/napari/pull/7667))
- Skip 3D sporadically-failing 3D screenshot test in all macOS CI ([#7672](https://github.com/napari/napari/pull/7672))
- Show viewer before trigger screenshot in the camera tests ([#7678](https://github.com/napari/napari/pull/7678))
- Update `fsspec`, `hypothesis`, `ipython`, `virtualenv` ([#7684](https://github.com/napari/napari/pull/7684))
- Block ipykernel==7.0.0a1 ([#7685](https://github.com/napari/napari/pull/7685))
- [pre-commit.ci] pre-commit autoupdate ([#7687](https://github.com/napari/napari/pull/7687))
- Show version for PyQt6 and PySide6 ([#7691](https://github.com/napari/napari/pull/7691))
- Add CI status badge and remove Cirrus CI badge from README ([#7693](https://github.com/napari/napari/pull/7693))
- Bump python versions in CircleCI to match docs repo ([#7694](https://github.com/napari/napari/pull/7694))
- Skip vispy bounding box test on windows ([#7697](https://github.com/napari/napari/pull/7697))
- [CI] skip flaky camera_3d test on windows ([#7709](https://github.com/napari/napari/pull/7709))
- Replace duck-typing check with isinstance check for QRangeSlider ([#7712](https://github.com/napari/napari/pull/7712))
- Update `coverage`, `dask`, `hypothesis`, `superqt`, `tifffile`, `xarray` ([#7713](https://github.com/napari/napari/pull/7713))
- [pre-commit.ci] pre-commit autoupdate ([#7716](https://github.com/napari/napari/pull/7716))
- [CI] Update test_vispy_camera.py to skip orientation_2d test on windows ([#7717](https://github.com/napari/napari/pull/7717))
- Replace duck-typing check with isinstance check for QRangeSlider, v2 ([#7719](https://github.com/napari/napari/pull/7719))
- Remove debug statement in tox.ini to be compatible with local Windows usage ([#7725](https://github.com/napari/napari/pull/7725))
- Remove deprecated - chunk_receiver, old async, as_dict, color in iterables, running_as_bundle, CallDefault ([#7729](https://github.com/napari/napari/pull/7729))
- Remove deprecated camera.interactive ([#7733](https://github.com/napari/napari/pull/7733))
- Remove deprecated rounded_division static method from viewer model ([#7734](https://github.com/napari/napari/pull/7734))
- Remove deprecated gui_qt ([#7735](https://github.com/napari/napari/pull/7735))
- Remove warning about deprecated and renamed params min and max for setting range in progress bar ([#7736](https://github.com/napari/napari/pull/7736))
- Remove deprecated get_app method ([#7737](https://github.com/napari/napari/pull/7737))
- Remove deprecated and renamed points properties ([#7738](https://github.com/napari/napari/pull/7738))
- Test shapes performance against multiple backends  ([#7739](https://github.com/napari/napari/pull/7739))
- Remove warning about since_version parameter in deprecation warnings ([#7740](https://github.com/napari/napari/pull/7740))
- Remove deprecated Interpolation attribute from Image layer ([#7741](https://github.com/napari/napari/pull/7741))
- Add pyqt5-qt5 pin for `uv add` compatibility on Windows ([#7744](https://github.com/napari/napari/pull/7744))
- Fix typo causing mypy error ([#7746](https://github.com/napari/napari/pull/7746))
- Provide fallback version for setuptools-scm ([#7748](https://github.com/napari/napari/pull/7748))
- Fix test for hdpi scaling ([#7759](https://github.com/napari/napari/pull/7759))
- Upload failed triangulations as artifacts from benchmarks run ([#7766](https://github.com/napari/napari/pull/7766))
- Update `coverage`, `fsspec`, `hypothesis`, `pydantic`, `rich`, `superqt`, `tensorstore`, `tifffile`, `xarray` ([#7767](https://github.com/napari/napari/pull/7767))
- improve reporting errors in shape triangulation ([#7768](https://github.com/napari/napari/pull/7768))
- ci(dependabot): bump docker/login-action from 3.3.0 to 3.4.0 in the actions group ([#7769](https://github.com/napari/napari/pull/7769))
- Remove deprecated QtViewer.view and QtViewer.camera properties ([#7783](https://github.com/napari/napari/pull/7783))
- Update task.md ([#7789](https://github.com/napari/napari/pull/7789))
- Postpone QtViewer deprecation to 0.7.0 ([#7791](https://github.com/napari/napari/pull/7791))
- Update `fsspec`, `hypothesis`, `lxml`, `pydantic`, `virtualenv` ([#7792](https://github.com/napari/napari/pull/7792))
- Remove deprecated interpolation argument from add_image ([#7793](https://github.com/napari/napari/pull/7793))
- Remove deprecated type kwarg from Events ([#7794](https://github.com/napari/napari/pull/7794))
- [pre-commit.ci] pre-commit autoupdate ([#7798](https://github.com/napari/napari/pull/7798))
- Prevent from triggering notification animation in tests ([#7802](https://github.com/napari/napari/pull/7802))
- Print contents of stderr and stdout in update dependencies workflow ([#7817](https://github.com/napari/napari/pull/7817))
- Fix newline in message when fail to push to repository in update constraints ([#7818](https://github.com/napari/napari/pull/7818))
- Use napari-bot repository as source of "Update constraints" PRs ([#7820](https://github.com/napari/napari/pull/7820))
- Use proper token in update dependencies workflow ([#7821](https://github.com/napari/napari/pull/7821))
- Update branch name, for update dependencies workflow, to avoid branch name collisions, that prevents push ([#7822](https://github.com/napari/napari/pull/7822))
- [pre-commit.ci] pre-commit autoupdate ([#7824](https://github.com/napari/napari/pull/7824))
- Add PR dependency workflow ([#7828](https://github.com/napari/napari/pull/7828))
- Update to more recent circleci base image that uses uv ([#7830](https://github.com/napari/napari/pull/7830))
- Use OIDC authorization only for push and pull requests from the same repository  ([#7837](https://github.com/napari/napari/pull/7837))
- [maint] Add pyopenGL version to napari info ([#7838](https://github.com/napari/napari/pull/7838))
- [maint] Add whether napari was installed using conda to napari info ([#7844](https://github.com/napari/napari/pull/7844))
- [maint, enh] Add experimental settings status to napari --info ([#7857](https://github.com/napari/napari/pull/7857))
- Update napari-sphinx-theme constraint to 0.7.0 ([#7861](https://github.com/napari/napari/pull/7861))
- [pre-commit.ci] pre-commit autoupdate ([#7867](https://github.com/napari/napari/pull/7867))
- [Maint] Update dockerfile for napari 0.6.0 ([#7872](https://github.com/napari/napari/pull/7872))
- Add bermuda and triangle to docs dependencies ([#7875](https://github.com/napari/napari/pull/7875))
- Add codespell support (config, workflow to detect/not fix) and make it fix few typos ([docs#587](https://github.com/napari/docs/pull/587))
- Update CircleCI config.yml to use napari docs and gallery dependency groups ([docs#590](https://github.com/napari/docs/pull/590))
- Update build_and_deploy.yml to use napari docs dependency group ([docs#591](https://github.com/napari/docs/pull/591))
- Replace two manual screenshots of the viewer (launch_cli_empty and launch_cli_image) with nbscreenshots ([docs#606](https://github.com/napari/docs/pull/606))
- Update conf.py to address pygment -> pygments deprecation ([docs#607](https://github.com/napari/docs/pull/607))
- Update CircleCI config to python orb and image ([docs#611](https://github.com/napari/docs/pull/611))
- Use env var to control if notebooks are executed and add docs, slim, slimfast, and slimgallery variants to Makefile ([docs#646](https://github.com/napari/docs/pull/646))
- [maint, bugfix] Ensure stub targets generated by prep_stubs generate targets ([docs#649](https://github.com/napari/docs/pull/649))
- [bugfix] Fix linkcheck.yml for change to dependencies and removal of req.txt ([docs#654](https://github.com/napari/docs/pull/654))
- Squash deployed gh-pages, relying on this repo for history ([docs#658](https://github.com/napari/docs/pull/658))
- Revert "Squash deployed gh-pages, relying on this repo for history (#658)" ([docs#663](https://github.com/napari/docs/pull/663))
- Default CI to `slimfast` and add comment control to run other builds. ([docs#669](https://github.com/napari/docs/pull/669))
- [bugfix] fix prep_docs logic to ensure npe2 files are written, but not over-written ([docs#671](https://github.com/napari/docs/pull/671))
- Update circleci cimg base to 3.10.17 which includes uv ([docs#673](https://github.com/napari/docs/pull/673))
- Update Makefile to use -WT --keep-going for CI make targets ([docs#675](https://github.com/napari/docs/pull/675))
- Always upload build artifacts in build_docs.yml workflow ([docs#694](https://github.com/napari/docs/pull/694))


## 20 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Andrew Sweet](https://github.com/napari/napari/commits?author=andy-sweet) - @andy-sweet
- [Carol Willing](https://github.com/napari/napari/commits?author=willingc) ([docs](https://github.com/napari/docs/commits?author=willingc))  - @willingc
- [Clement Caporal](https://github.com/napari/napari/commits?author=ClementCaporal) - @ClementCaporal
- [Constantin Aronssohn](https://github.com/napari/napari/commits?author=cnstt) ([docs](https://github.com/napari/docs/commits?author=cnstt))  - @cnstt
- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) - @dalthviz
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) ([docs](https://github.com/napari/docs/commits?author=DragaDoncila))  - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Hanjin Liu](https://github.com/napari/napari/commits?author=hanjinliu) - @hanjinliu +
- [Horst Obenhaus](https://github.com/napari/napari/commits?author=horsto) - @horsto +
- [Johannes Soltwedel](https://github.com/napari/napari/commits?author=jo-mueller) - @jo-mueller
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni))  - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Lukasz Migas](https://github.com/napari/napari/commits?author=lukasz-migas) - @lukasz-migas
- [Matthias Bussonnier](https://github.com/napari/napari/commits?author=Carreau) - @Carreau
- [Melissa Weber Mendonça](https://github.com/napari/napari/commits?author=melissawm) ([docs](https://github.com/napari/docs/commits?author=melissawm))  - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) ([docs](https://github.com/napari/docs/commits?author=psobolewskiPhD))  - @psobolewskiPhD
- [Sofi Milano](https://github.com/napari/napari/commits?author=sfmig) - @sfmig +
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [Wouter-Michiel Vierdag](https://github.com/napari/docs/commits?author=melonora) - @melonora
- [Yaroslav Halchenko](https://github.com/napari/docs/commits?author=yarikoptic) - @yarikoptic +


## 19 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Andy Sweet](https://github.com/napari/napari/commits?author=andy-sweet) - @andy-sweet
- [Ashley Anderson](https://github.com/napari/docs/commits?author=aganders3) - @aganders3
- [Carol Willing](https://github.com/napari/napari/commits?author=willingc) ([docs](https://github.com/napari/docs/commits?author=willingc))  - @willingc
- [Constantin Aronssohn](https://github.com/napari/napari/commits?author=cnstt) ([docs](https://github.com/napari/docs/commits?author=cnstt))  - @cnstt
- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) - @dalthviz
- [Draga Doncila Pop](https://github.com/napari/napari/commits?author=DragaDoncila) ([docs](https://github.com/napari/docs/commits?author=DragaDoncila))  - @DragaDoncila
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Hanjin Liu](https://github.com/napari/napari/commits?author=hanjinliu) - @hanjinliu +
- [Horst Obenhaus](https://github.com/napari/napari/commits?author=horsto) - @horsto +
- [Jacy Lee](https://github.com/napari/docs/commits?author=JensenJacy) - @JensenJacy
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni))  - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Lucy Liu](https://github.com/napari/docs/commits?author=lucyleeow) - @lucyleeow
- [Lukasz Migas](https://github.com/napari/napari/commits?author=lukasz-migas) - @lukasz-migas
- [Melissa Weber Mendonça](https://github.com/napari/napari/commits?author=melissawm) ([docs](https://github.com/napari/docs/commits?author=melissawm))  - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) ([docs](https://github.com/napari/docs/commits?author=psobolewskiPhD))  - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
- [Wouter-Michiel Vierdag](https://github.com/napari/docs/commits?author=melonora) - @melonora
- [Yaroslav Halchenko](https://github.com/napari/docs/commits?author=yarikoptic) - @yarikoptic +

