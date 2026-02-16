# Advanced Topics

```{warning}
In napari 0.7.0, legacy "npe1" plugins will only work by auto-conversion to the new plugin engine, `npe2`.
The vast majority of plugins will continue working as before. If you notice any issues with a plugin, check out the
[Changes to the plugin engine in 0.6.0](adapted-plugin-guide) document to see if this is affecting you.
```

Some plugin developers may find more **in-depth, technical information** helpful. This section describes topics, such as:

- specifications for napari's plugin ecosystem using the plugin engine `npe2`.
- migration to `npe2` from the deprecated napari plugin engine v1.

## npe2: napari plugin engine v2

````{grid}
```{grid-item-card} npe2 manifest reference
:link: plugin-manifest
:link-type: ref

A reference for the `npe2` manifest file, which is used to define the plugin and its contributions.
```

```{grid-item-card} npe2 contributions reference
:link: contributions-ref
:link-type: ref

A technical specification for how plugins can contribute additional functionality and features to napari.
```

```{grid-item-card} Migration guide to npe2
:link: npe2-migration-guide
:link-type: ref
Have a plugin written for the first generation plugin system? This guide will help you migrate to the `npe2` plugin system.
```
````
