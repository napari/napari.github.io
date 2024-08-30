# napari 0.5.3

*Thursday, Aug 29, 2024*

We’re happy to announce the release of napari 0.5.3!

napari is a fast, interactive, multi-dimensional image viewer for Python. It’s designed for exploring, annotating, and analyzing multi-dimensional images. It’s built on Qt (for the GUI), VisPy (for performant GPU-based rendering), and the scientific Python stack (NumPy, SciPy, and friends).

For more information, examples, and documentation, please visit our website: https://napari.org/

## Highlights

This is primarily a bug-fix release, including fixes for a couple of nasty
regressions in 0.5.0 ([#7184](https://github.com/napari/napari/pull/7184)) and
0.5.2 ([#7201](https://github.com/napari/napari/pull/7201)). However, we also
have a couple of *excellent* user-facing improvements:

- In [#7090](https://github.com/napari/napari/pull/7090), new contributor [Bean
  Li](https://github.com/beanli161514) fixed a *very* long-standing issue in
  napari: 3D picking didn't work when using a perspective projection (rather
  than the default orthogonal projection. The result is glorious:

  ![animated gif showing picking of points in 3D filaments using a perspective projection camera](https://private-user-images.githubusercontent.com/68546131/348254048-58036c3c-5776-4f13-bb49-562334b53834.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjQ5NTU3OTcsIm5iZiI6MTcyNDk1NTQ5NywicGF0aCI6Ii82ODU0NjEzMS8zNDgyNTQwNDgtNTgwMzZjM2MtNTc3Ni00ZjEzLWJiNDktNTYyMzM0YjUzODM0LmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODI5VDE4MTgxN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTU2N2JjYmY2NmFkNTFiMWJjZDM5NzcyZGFlNDI5MGI2NDRjY2JiNmUyNjY0MmJmZmEyZDI0ZmIzMDhkYTg4ZDgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.HcFhx2vhFut1H3C2Bw_uYf8UIqcNRUgGUXZ58mYGUMU)

  There's still a lot of work to be done in perspective projection (dragging
  planes, for example, still doesn't work), but this is an exciting first step,
  and we are thrilled that it came from a new community member! Thanks
  [@beanli161514](https://github.com/beanli161514)!

- In [#7146](https://github.com/napari/napari/pull/7146), napari team member
  [Grzegorz Bokota](https://github.com/Czaki) fixed a long-standing issue in
  napari: Layer.get_status used to be computed on the main thread, which meant
  that layers for which this involved heavy computation (such as large Labels
  layers, or Shapes layers or 3D surface layers with lots of polygons) would
  slow down the viewer refresh rate. Grzegorz's changes move the computation to
  a separate thread, which will dramatically improve performance in many
  situations. 🚀🚀🚀

Thanks as always to all our contributors, and read on for the full list of
changes!

## Improvements

- [enh] Add a keybinding for rotating layer and alt-click on Transpose button ([#7052](https://github.com/napari/napari/pull/7052))
- enable 3D picking with perspective camera ([#7090](https://github.com/napari/napari/pull/7090))
- [UX/UI] Update layer controls tooltips ([#7153](https://github.com/napari/napari/pull/7153))
- Update labels_with_features example for #7025 ([#7199](https://github.com/napari/napari/pull/7199))

## Performance

- Fix missing extent cache invalidation ([#7015](https://github.com/napari/napari/pull/7015))
- Calculate status in a separate thread ([#7146](https://github.com/napari/napari/pull/7146))
- If a shape is convex, use faster fan triangulation ([#7214](https://github.com/napari/napari/pull/7214))
- Speed up highlighting in the Shapes layer ([#7223](https://github.com/napari/napari/pull/7223))

## Bug Fixes

- Fix missing extent cache invalidation ([#7015](https://github.com/napari/napari/pull/7015))
- enable 3D picking with perspective camera ([#7090](https://github.com/napari/napari/pull/7090))
- Implement shortcuts widget `setValue` to handle shortcuts settings updates ([#7180](https://github.com/napari/napari/pull/7180))
- Fix bug preventing from change symbol for points initialized with single value ([#7184](https://github.com/napari/napari/pull/7184))
- Add `napari.benchmarks.util` to sdist and wheel to fix balls example data ([#7186](https://github.com/napari/napari/pull/7186))
- Bugfix: Revert "Emit highlight event only if selection changed (#7162)" ([#7201](https://github.com/napari/napari/pull/7201))
- Use new DOI for surface example ([#7222](https://github.com/napari/napari/pull/7222))

## Documentation

- Use new DOI for surface example ([#7222](https://github.com/napari/napari/pull/7222))
- Add 0.5.3 release notes ([docs#485](https://github.com/napari/docs/pull/485))
- Add short guide on updating constraints files ([docs#460](https://github.com/napari/docs/pull/460))
- Add 0.5.2 to the version switcher ([docs#479](https://github.com/napari/docs/pull/479))
- Minor improvement to `qtbot` testing section ([docs#481](https://github.com/napari/docs/pull/481))
- Improve informations on community page ([docs#482](https://github.com/napari/docs/pull/482))

## Other Pull Requests

- Fix/add some typing to napari.layers.tracks ([#7014](https://github.com/napari/napari/pull/7014))
- Call workflow providing target directory name ([#7181](https://github.com/napari/napari/pull/7181))
- Improve error message in `combine_widgets` ([#7194](https://github.com/napari/napari/pull/7194))
- [Maint] Remove some pytest skipif for python <3.9 ([#7203](https://github.com/napari/napari/pull/7203))
- Update `dask`, `hypothesis`, `imageio`, `matplotlib` ([#7206](https://github.com/napari/napari/pull/7206))
- [pre-commit.ci] pre-commit autoupdate ([#7207](https://github.com/napari/napari/pull/7207))
- [pre-commit.ci] pre-commit autoupdate ([#7216](https://github.com/napari/napari/pull/7216))
- Fix example by connect missing event ([#7218](https://github.com/napari/napari/pull/7218))
- Improve deploy workflow by use deploy directory from workflow dispatch input  ([docs#477](https://github.com/napari/docs/pull/477))

## 9 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [BeanLi](https://github.com/napari/napari/commits?author=beanli161514) - @beanli161514 +
- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) - @dalthviz
- [David Stansby](https://github.com/napari/napari/commits?author=dstansby) - @dstansby
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni))  - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Lucy Liu](https://github.com/napari/napari/commits?author=lucyleeow) ([docs](https://github.com/napari/docs/commits?author=lucyleeow))  - @lucyleeow
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD


## 13 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [BeanLi](https://github.com/napari/napari/commits?author=beanli161514) - @beanli161514 +
- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) - @dalthviz
- [David Stansby](https://github.com/napari/napari/commits?author=dstansby) - @dstansby
- [Draga Doncila Pop](https://github.com/napari/docs/commits?author=DragaDoncila) - @DragaDoncila
- [Genevieve Buckley](https://github.com/napari/docs/commits?author=GenevieveBuckley) - @GenevieveBuckley
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) ([docs](https://github.com/napari/docs/commits?author=Czaki))  - @Czaki
- [Juan Nunez-Iglesias](https://github.com/napari/napari/commits?author=jni) ([docs](https://github.com/napari/docs/commits?author=jni))  - @jni
- [Kevin Yamauchi](https://github.com/napari/docs/commits?author=kevinyamauchi) - @kevinyamauchi
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Lucy Liu](https://github.com/napari/napari/commits?author=lucyleeow) ([docs](https://github.com/napari/docs/commits?author=lucyleeow))  - @lucyleeow
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Wouter-Michiel Vierdag](https://github.com/napari/docs/commits?author=melonora) - @melonora

