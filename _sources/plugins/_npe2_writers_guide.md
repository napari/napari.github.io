(writers-contribution-guide)=
## Writers

Writer plugins add support for exporting data from napari.
They are invoked whenever `viewer.layers.save('some/path.ext')`
is used on the command line, or when a user requests to save one
or more layers in the graphical user interface with
`File -> Save Selected Layer(s)...` or `Save All Layers...`

```{important}
This guide describes the second generation (`npe2`) plugin specification.
New plugins should no longer use the old `napari_get_writer` hook
specification from the first generation `napari_plugin_engine`.
```

### Writer plugin function signatures

Writer plugins are *functions* that:

1. Accept a destination path and data from one or more layers in the viewer
2. Write layer data and associated attributes to disk
3. Return a list of strings containing the path(s) that were successfully written.

They must follow one of two calling conventions (where the convention used
is determined by the [`layer_type` constraints](#layer-type-constraints) provided
by the corresponding writer contribution in the manifest).

#### 1. single-layer writer

   Single-layer writers will receive a **path**, layer **data**, and a `dict` of layer
   **attributes**, (e.g. `{'name': 'My Layer', 'opacity': 0.6}`)

   ```python
   def single_layer_writer(path: str, data: Any, attributes: dict) -> List[str]:
       ...
   ```

   The formal type is as follows:

   ```python
   DataType = Any  # usually something like a numpy array, but varies by layer
   LayerAttributes = dict
   SingleWriterFunction = Callable[[str, DataType, LayerAttributes], List[str]]
   ```

#### 2. multi-layer writer

   Multi-layer writers will receive a **path**, and a list of full
   [layer data tuples](layer-data-tuples).

   ```python
   def multi_layer_writer(path: str, layer_data: List[FullLayerData]) -> List[str]:
       ...
   ```

   The formal type is as follows:

   ```python
   DataType = Any  # usually something like a numpy array, but varies by layer
   LayerAttributes = dict
   LayerName = Literal["image", "labels", "points", "shapes", "surface", "tracks", "vectors"]
   FullLayerData = Tuple[DataType, LayerAttributes, LayerName]
   MultiWriterFunction = Callable[[str, List[FullLayerData]], List[str]]
   ```

### Layer type constraints

Individual writer contributions are determined to be **single-layer writers** or
**multi-layer writers** based on their **`writer.layer_types`** constraints
provided in the [contribution metadata](./contributions.html#contributions-writers).

A writer plugin declares that it can accept between *m* and *n* layers of a
specific *type* (where *0 ≤ m ≤ n*), using regex-like syntax with the special
characters **`?`**, **`+`** and **`*`**:

- **`image`**: Writes exactly 1 image layer.
- **`image?`**: Writes 0 or 1 image layers.
- **`image+`**: Writes 1 or more image layers.
- **`image*`**: Writes 0 or more image layers.
- **`image{k}`**: Writes exactly k image layers.
- **`image{m,n}`**: Writes between *m* and *n* layers (inclusive range). Must have *m <= n*.

A writer plugin will *only* be invoked when its `layer_types` constraint is
compatible with the layer type(s) that the user is saving. When a type is not
present in the list of constraints, it is assumed the writer is **not**
compatible with that type.

**Consider this example contributions section in a manifest:**

```yaml
contributions:
  writers:
  - command: example-plugin.some_writer
    layer_types: ["image+", "points?"]
    filename_extensions: [".ext"]
```

This writer would be considered when 1 or more `Image` layers and 0 or 1
`Points` layers are selected (i.e. the `Points` layer is optional). This
writer would *not* be selected when the user tries to save an `image`
and a `vectors` layer, because `vectors` is not listed in the `layer_types`.


### Writer example

````{tabbed} npe2
**python implementation**

```python
# example_plugin.some_module
def write_points(path: str, layer_data: Any, attributes: Dict[str, Any]) -> List[str]:
    with open(path, "w") as fh:
        ...  # save layer_data and attributes to file

    # return path to any file(s) that were successfully written
    return [path]
```

**manifest**

See [Writers contribution reference](./contributions.html#contributions-writers)
for field details.

```yaml
contributions:
  commands:
  - id: example-plugin.write_points
    title: Save points layer to csv
    python_name: example_plugin.some_module:write_points
  writers:
  - command: example-plugin.write_points
    layer_types:
    - points
    filename_extensions:
    - .csv

```
````

````{tabbed} napari-plugin-engine

```{admonition} Deprecated!
This demonstrates the now-deprecated `napari-plugin-engine` pattern.
```

**python implementation**

[hook specification](https://napari.org/plugins/stable/npe1.html#single-layers-io)

```python
from napari_plugin_engine import napari_hook_implementation

@napari_hook_implementation
def napari_write_points(path: str, data: Any, meta: dict) -> Optional[str]:
    """Write points data and metadata into a path.

    Parameters
    ----------
    path : str
        Path to file, directory, or resource (like a URL).
    data : array (N, D)
        Points layer data
    meta : dict
        Points metadata.

    Returns
    -------
    path : str or None
        If data is successfully written, return the ``path`` that was written.
        Otherwise, if nothing was done, return ``None``.
    """
```
````