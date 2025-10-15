# napari 0.6.6

*Wed, Oct 15, 2025*

We're happy to announce the release of napari 0.6.6!
napari is a fast, interactive, multi-dimensional image viewer for Python.
It's designed for browsing, annotating, and analyzing large multi-dimensional
images. It's built on top of Qt (for the GUI), vispy (for performant GPU-based
rendering), and the scientific Python stack (numpy, scipy).

For more information, examples, and documentation, please visit our website,
https://napari.org.

napari follows [EffVer (Intended Effort Versioning)](https://effver.org/); this is a **Meso** release containing awesome new features, but some effort may be needed when updating previous projects to use this version.

## Highlights

This a small bugfix release, following up the changes in 0.6.5.

### Zooming in the dark?
In the previous release we accidentally made the [zoom tool added in v0.6.3](https://napari.org/stable/release/release_0_6_3.html#a-zoom-with-a-view) invisible. Whoops! No worries, it's back 🔍.

### "Open with napari"

When using the [napari bundle](https://napari.org/stable/tutorials/fundamentals/installation_bundle_conda.html#how-to-install-the-napari-app), it will now detect when a file can be opened with napari based on the extension. This allows you to use the `open with >` menu from your operative system to open files with napari!

![image showing a context menu with the the `open with > napari` option available](https://github.com/user-attachments/assets/f13d58e5-ce2d-460a-b92e-2f23ecc8d438)

PS: Since we did quite a few changes behind the scenes on this new version of the bundle, you might experience some issues. Don't hesitate to open an issue or contact us on zulip if you do!


## Improvements

- Update menuinst configuration with file type associations ([#8359](https://github.com/napari/napari/pull/8359))

## Bug Fixes

- Fix shape selection in a single plane when shapes are on multiple planes ([#8335](https://github.com/napari/napari/pull/8335))
- Fix invisible zoom box ([#8344](https://github.com/napari/napari/pull/8344))

## Documentation

- Update release notes v0.6.6 ([docs#868](https://github.com/napari/docs/pull/868))
- Add info about manual trigger of conda update to release guide ([docs#859](https://github.com/napari/docs/pull/859))
- Fix version switcher for 0.6.5 ([docs#861](https://github.com/napari/docs/pull/861))
- Remove trailing comma in version switcher json ([docs#862](https://github.com/napari/docs/pull/862))
- Add release notes for v0.6.6 ([docs#866](https://github.com/napari/docs/pull/866))

## Other Pull Requests

- Add a new `attr_to_settr` utility function and simplify layer control widgets layer to widget setup ([#8274](https://github.com/napari/napari/pull/8274))
- [pre-commit.ci] pre-commit autoupdate ([#8275](https://github.com/napari/napari/pull/8275))
- ci(dependabot): bump the actions group with 9 updates ([#8324](https://github.com/napari/napari/pull/8324))
- Delay settings import to avoid circular import ([#8327](https://github.com/napari/napari/pull/8327))
- Add info about conda forge manual trigger to release checklist ([#8328](https://github.com/napari/napari/pull/8328))
- Add sponsor badge and reorganize badges into groups ([#8343](https://github.com/napari/napari/pull/8343))
- Fix vispy error traceback ([#8346](https://github.com/napari/napari/pull/8346))
- Migrate license settings to modern standards ([#8350](https://github.com/napari/napari/pull/8350))


## 7 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) - @dalthviz
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) - @Czaki
- [Jaime Rodríguez-Guerra](https://github.com/napari/napari/commits?author=jaimergp) - @jaimergp
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag))  - @brisvag
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko

## 8 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) - @dalthviz
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) - @Czaki
- [Juan Nunez-Iglesias](https://github.com/napari/docs/commits?author=jni) - @jni
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) ([docs](https://github.com/napari/docs/commits?author=brisvag))  - @brisvag
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Peter Sobolewski](https://github.com/napari/napari/commits?author=psobolewskiPhD) - @psobolewskiPhD
- [Tim Monko](https://github.com/napari/napari/commits?author=TimMonko) ([docs](https://github.com/napari/docs/commits?author=TimMonko))  - @TimMonko
