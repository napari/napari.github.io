(how-to-build-a-plugin)=

# Building a plugin

Plugins allow developers to customize and extend napari. This includes

- Adding file format support with [readers] and [writers]
- Adding custom [widgets] and user interface elements
- Providing [sample data][sample_data]
- Changing the look of napari with a color [theme]

````{grid}
```{grid-item-card} Your first plugin
:link: your-first-plugin
:link-type: ref

If you're just getting started with napari plugins, try our tutorial to build your first plugin!
```

```{grid-item-card} Plugin functionality
:link: plugin-contribution-guides
:link-type: ref

New pieces of functionality are termed contributions. To understand what plugins can add to napari, see the plugin contributions guide.
```
````

````{grid}
```{grid-item-card} Best practices
:link: best-practices
:link-type: ref

There are a few best practices to keep in mind when building a plugin. See the best practices guide for details.
```

```{grid-item-card} Testing and publishing
:link: plugin-test-deploy
:link-type: ref

Testing your plugin is an important step before publishing. Once your plugin is ready, you can publish it to PyPI, conda-forge and the napari-hub. See the testing and publishing guide for details.
```
````

```{admonition} Introducing npe2
---
class: important
---
We introduced a new plugin engine [`npe2`](https://github.com/napari/npe2) in December 2021.

Unless otherwise stated, most of the documentation herein pertains
to the new npe2 format (which uses a static `napari.yaml` manifest)

Plugins targeting the first generation `napari-plugin-engine` 
(using `@napari_hook_implementation` decorators, see [npe1](https://github.com/napari/napari-plugin-engine)) will
continue to work for at least the first half of 2022, but we
recommend migrating to `npe2`. See the
[migration guide](npe2-migration-guide) for details.
```

[readers]: contributions-readers
[sample_data]: contributions-sample-data
[theme]: contributions-themes
[widgets]: contributions-widgets
[writers]: contributions-writers
