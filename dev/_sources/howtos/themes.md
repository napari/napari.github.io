(themes)=

# Creating and testing themes

A theme is a set of colors used throughout napari.  See, for example, the
builtin themes in `napari/utils/theme.py`.  To make a new theme, create a new
`dict` with the same keys as one of the existing themes, and
replace the values with your new colors.  For example

```python
from napari.utils.theme import get_theme, register_theme


blue_theme = get_theme('dark')
blue_theme.update(
    background='rgb(28, 31, 48)',
    foreground='rgb(45, 52, 71)',
    primary='rgb(80, 88, 108)',
    current='rgb(184, 112, 0)',
)

register_theme('blue', blue_theme)
```


To test out the theme, use the
`qt_theme_sample.py` file from the command line as follows:

```sh
python -m napari._qt.widgets.qt_theme_sample
```
*note*: you may specify a theme with one additional argument on the command line:
```sh
python -m napari._qt.widgets.qt_theme_sample dark
```
(providing no arguments will show all themes in `theme.py`)

## Sharing your theme via a plugin

You can also share your theme with the community via a [plugin](plugins-index)
by adding a [theme contribution](contributions-themes). See the
[plugin](plugins-index) documentation for details on creating a plugin.
