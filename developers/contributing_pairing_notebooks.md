---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.13.0
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: python3
---

# Learn to contribute Jupyter notebooks to napari documentation
Guided by this template, you will prepare a Jupyter notebook for submission to napari's documentation.

## You'll learn:
- How to use napari's `nbscreenshot` utility to produce screenshots of the napari Viewer
- How to use tags on Jupyter notebook cells to show/hide input
- How to use Jupytext to pair your notebook with a markdown file

## You'll need:
- This notebook template
- Familiarity with Jupyter notebooks (code cells and markdown cells)
- Familiarity with using napari through a Jupyter notebook
- A Jupyter notebook you'd like to contribute as a how-to, tutorial or explanation to napari's documentation

## Using `nbscreenshot`
It's common for napari documentation to include code that has some effect in the napari Viewer e.g. adding layers,
changing layer properties or using a plugin. These changes in the Viewer should be shown to the user, and this can
be easily achieved in your notebook with napari's `nbscreenshot` utility.

This utility allows you to pass an active Viewer as a parameter and produces a screenshot of the Viewer at that 
point in time. This screenshot will be displayed to the user in the notebook.

```{code-cell} ipython3
import napari
from napari.utils import nbscreenshot

viewer = napari.Viewer()
# opens sample data and adds layer to the Viewer
viewer.open_sample('scikit-image', 'cells3d')

# takes a screenshot and produces it as output for this cell
nbscreenshot(viewer)
```

## Hiding input

As you can see, it's simple to produce screenshots of the napari Viewer in your notebooks. However, if you look through napari's
existing documentation, none of the code cells include calls to `nbscreenshot`, yet the screenshots are still produced. In fact,
it would be distracting if all the code cells included `nbscreenshot`, and might be frustrating for users who
want to execute these notebooks in their own workflows.

To avoid this frustration, we place calls to `nbscreenshot` in a hidden cell in your notebooks.
You can completely remove input (i.e. the code that's running) in a notebook cell by adding a `remove-input` tag to the cell metadata:

```
{
    "tags": [
        "remove-input",
    ]
}
```

You can also place other potentially distracting code in these cells, such as resizing the Viewer window or opening a menu.
The screenshot below is produced by the following code, which has been hidden from you!

```python
from napari.utils import nbscreenshot

viewer.window._qt_window.resize(750, 550)
nbscreenshot(viewer)
```

Note how we've included the `nbscreenshot` import in this hidden cell. Even though in the
example above we imported `nbscreenshot` to show its functionality, you should place the
import in a hidden cell when you write your documentation.

```{code-cell} ipython3
:tags: [remove-input]

from napari.utils import nbscreenshot

viewer.window._qt_window.resize(750, 550)
nbscreenshot(viewer)
```



+++
