# napari 0.6.6
⚠️ *Note: these release notes are still in draft while 0.6.6 is in release candidate testing.* ⚠️

*Fri, Oct 10, 2025*

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


## Bug Fixes

- Fix invisible zoom box ([#8344](https://github.com/napari/napari/pull/8344))

## Documentation

- Add release notes for v0.6.6 ([docs#866](https://github.com/napari/docs/pull/866))

## Other Pull Requests

- Add a new `attr_to_settr` utility function and simplify layer control widgets layer to widget setup ([#8274](https://github.com/napari/napari/pull/8274))
- ci(dependabot): bump the actions group with 9 updates ([#8324](https://github.com/napari/napari/pull/8324))
- Delay settings import to avoid circular import ([#8327](https://github.com/napari/napari/pull/8327))
- Add info about conda forge manual trigger to release checklist ([#8328](https://github.com/napari/napari/pull/8328))


## 3 authors added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) - @dalthviz
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) - @Czaki
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag

## 6 reviewers added to this release (alphabetical)

(+) denotes first-time contributors 🥳

- [Carol Willing](https://github.com/napari/docs/commits?author=willingc) - @willingc
- [Daniel Althviz Moré](https://github.com/napari/napari/commits?author=dalthviz) - @dalthviz
- [Grzegorz Bokota](https://github.com/napari/napari/commits?author=Czaki) - @Czaki
- [Lorenzo Gaifas](https://github.com/napari/napari/commits?author=brisvag) - @brisvag
- [Melissa Weber Mendonça](https://github.com/napari/docs/commits?author=melissawm) - @melissawm
- [Tim Monko](https://github.com/napari/docs/commits?author=TimMonko) - @TimMonko
