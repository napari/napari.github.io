(napari-themes)=

# Creating and testing themes

A napari theme is a named collection of colors and style values used across the
viewer canvas, widgets, icons, and console. If you want to programmatically
prototype a theme, check out the {ref}`sphx_glr_gallery_new_theme.py` example.
However, the `npe2` theme contribution allows declaratively 
defining themes and enables easy distribution to others via plugins.

If you want other people to install and reuse your theme, prefer the [plugin
workflow](plugin-workflow). The programmatic workflow is still useful for local experiments and
rapid iteration.

(preview-themes)=
## Preview themes in a full napari UI

The most complete theme preview tool lives in the example gallery as
{ref}`sphx_glr_gallery_theme_sample.py`. It opens napari with a dock widget
that shows the theme color roles, common widget states, and a theme selector
that includes plugin-contributed themes after plugins are initialized. 
A [WCAG contrast ratio](https://webaim.org/resources/contrastchecker/) table
displays the most important color pairs for accessibility testing.

You can download the python script from the example page and drag'n'drop it onto napari to run it.

If you are working from a local checkout of `napari/napari`, you can run it
directly:

```sh
python examples/theme_sample.py
```

(plugin-workflow)=

## Ship a theme in a plugin

The supported way to distribute a theme is via a [plugin](plugins-index)
[theme contribution](contributions-themes). A theme contribution uses the plugin manifest
(`napari.yaml`) to declaratively define properties of a theme.

After the plugin is installed, the contributed theme becomes available in
napari's appearance settings and can also be selected with `viewer.theme`.
For richer visual testing, use the [theme preview sample](preview-themes).

If you are contributing a builtin theme to napari itself rather than shipping a
plugin, see the core theme definitions in `napari/utils/theme.py`.
