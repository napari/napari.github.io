(plugins-index)=

# Plugins

```{warning}
In napari 0.7.0, legacy "npe1" plugins will only work by auto-conversion to the new plugin engine, `npe2`.
The vast majority of plugins will continue working as before. If you notice any issues with a plugin, check out the
[Changes to the plugin engine in 0.6.0](adapted-plugin-guide) document to see if this is affecting you.
```

Plugins extend napari's functionality, allowing for customization and sharing with the community.
While you can use scripts and widgets to extend napari, plugins provide great flexibility.
Existing plugins extend napari to add:

- support for import and export of image and related data types.
- support for working with specialized data formats.
- domain specific features, including microscopy, climate, geoscience, and more.

Share and discover napari plugins on [napari hub](https://napari-hub.org),
[PyPI](https://pypi.org/search/?q=napari), or [conda-forge](https://conda-forge.org/packages/).
Interested in creating a plugin? A [napari-plugin-template](https://github.com/napari/napari-plugin-template),
a [copier](https://copier.readthedocs.io/en/stable/) template, bootstraps authoring
[npe](https://github.com/napari/npe2)-based napari plugins.

## Plugin users

Check out the user focused guides for finding, installing, and using napari plugins.

````{grid} 2
```{grid-item-card} Finding and installing plugins
:link: find-and-install-plugins
:link-type: ref

How to find and install plugins using the napari plugin manager.
```

```{grid-item-card} napari hub
:link: https://napari-hub.org
:link-type: url

Head over to the napari hub to search for plugins that suit your needs.
```
````

## Plugin developers

Check out our plugin developer guides to start creating your own napari plugins.

````{grid} 2
```{grid-item-card} Building a plugin
:link: how-to-build-a-plugin
:link-type: ref

In depth guides to build a plugin for napari.
```

```{grid-item-card} Best practices
:link: best-practices
:link-type: ref

Set of important best practices to have in mind when building a plugin.
```
````

````{grid} 2
```{grid-item-card} Testing and publishing
:link: plugin-test-deploy
:link-type: ref

How to test your plugin works and how to publish it,
along with some tips for making your plugin easy to find.
```

```{grid-item-card} Virtual environments and useful tools
:link: virtual-environments-and-useful-tools
:link-type: ref

Workshop on virtual environments and useful tools for plugin development.
```
````

````{grid}
```{grid-item-card} Technical references
:link: plugin-technical-references
:link-type: ref

Technical references for the plugin system and the plugin API
and guides to convert from first generation plugins to npe2.
```
````

## Looking for help?

If you have questions, try asking on the [zulip chat][napari_zulip].
Submit issues to the [napari github repository][napari_issues].

[napari_issues]: https://github.com/napari/napari/issues/new/choose
[napari_zulip]: https://napari.zulipchat.com/
