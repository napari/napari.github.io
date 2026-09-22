---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.10.3
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

(axis-names)=

# Axis names in napari

```{warning}
The napari team is actively working to improve the consistency and user
experience of axis names and other axis metadata. This guide should be up to
date, but things may be in a confusing state. It's not you, it's us! In
summary:

- **Before 0.6.0,** napari's `Viewer.dims` held axis names, and these were
  mapped to layer axes purely based on order. Layer axes did not have names.
- **In 0.6.x,**, layers gained the ability to hold axis names and axis units,
  which was important for [reader plugins](contributions-readers) to be able
  to provide this information. However, napari did not use that information for
  anything: it was up to the user to propagate it to `Viewer.dims`.
- **In 0.7.x,** layer axis *units* propagate to `Viewer.dims` automatically,
  but layer axis *names* were still ignored by default.
- **In 0.9.x,** layer axis *names* now propagate to `Viewer.dims`
  automatically, and new layers created from a selected layer inherit its axis
  labels.
```

napari started out as a tool to look at NumPy arrays. As such, it mimics some
behavior when mixing arrays of different dimensions, known as
[broadcasting](https://numpy.org/doc/stable/user/basics.broadcasting.html).

Specifically, arrays of mixed dimensionality are *right-aligned*. In order to
make array axes match across different elements of napari, napari 0.7.0
started using *negative indexing*, i.e. indexing from the right end of a list
or tuple, for its axes labels.

Suppose we have a time lapse of neuronal activity, with a 3D image with
dimensions T, Y, and X, a set of 2D masks of dimensions Y, X, and a set of
2D centroid coordinates, with dimensions Y, X. Before napari 0.7.0, the default
axis labels would have been:

| component  |  T |  Y |  X |
|------------|----|----|----|
| viewer     |  0 |  1 |  2 |
| image      |  0 |  1 |  2 |
| masks      |    |  0 |  1 |
| centroids  |    |  0 |  1 |

The mismatch between the *layer* axes and the *viewer* axes can result in
confusing UI and subtle bugs.

Using negative indexing, as in napari 0.7.0+, the default axes line up with
the display and NumPy behavior:

| component  |  T |  Y |  X |
|------------|----|----|----|
| viewer     | -3 | -2 | -1 |
| image      | -3 | -2 | -1 |
| masks      |    | -2 | -1 |
| centroids  |    | -2 | -1 |

## Automatic axis labels

The viewer axis labels (`viewer.dims.axis_labels`) are updated automatically
from the axis labels of the layers in the viewer. If you add a layer with `axis_labels` set — or use an [xarray](https://docs.xarray.dev/) `DataArray`
with named dimensions — the viewer dimension sliders and axes overlay are
labelled accordingly, with no extra work.

When several layers have axis labels, napari uses the labels from the
annotated layer with the most dimensions. If multiple equally long annotated
layers are present, the topmost (most recently added) layer wins. Axes without
an explicit label fall back to the default negative-index placeholders
described above.

Creating a new layer from a selected layer — for example, using the buttons
in the GUI — also copies the axis labels of the source layer. If no layer is
selected, or several layers are selected, the new layer falls back to the
default labels.

Of course, as a user, you can still set the axis names for the viewer by
[right-clicking on the roll-dimensions button](gui-axis-renaming), and for the
layers by setting `layer.axis_labels` or by using the
[napari-metadata](https://github.com/napari/napari-metadata) plugin.
