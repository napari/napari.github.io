(sample-data-contribution-guide)=
## Sample Data

This contribution point allows plugin developers to contribute sample data
that will be accessible in the napari interface via the `File > Open Sample`
menu, or via the command line with `viewer.open_sample`.

Sample data can be useful for demonstrating the functionality of a given plugin.
It can take the form of a **Sample Data URI** that points to a static resource
(such as a file included in the plugin distribution, or a remote resource),
or **Sample Data Function** that generates layer data on demand.

### Sample Data example

````{tabbed} npe2
**python implementation**

```python
# example_plugin.some_module
def create_fractal() -> List[LayerData]:
    """An example of a  Sample Data Function.
    
    Note: Sample Data with URIs don't need python code.
    """
    data = ...  # do something cool to create a fractal
    return [(data, {"name": "My cool fractal"})]
```

**manifest**

See [Sample Data contribution reference](./contributions.html#contributions-sample-data)
for field details.

```yaml
contributions:
  commands:
  - id: example-plugin.data.fractal
    title: Create fractal image
    python_name: example_plugin.some_module:create_fractal
  sample_data:
  - key: fractal
    display_name: Fractal
    command: example-plugin.data.fractal
  - key: napari
    display_name: Tabueran Kiribati
    uri: https://en.wikipedia.org/wiki/Napari#/media/File:Tabuaeran_Kiribati.jpg

```
````

````{tabbed} napari-plugin-engine

```{admonition} Deprecated!
This demonstrates the now-deprecated `napari-plugin-engine` pattern.
```

**python implementation**

[hook specificiation](https://napari.org/plugins/stable/hook_specifications.html#napari.plugins.hook_specifications.napari_provide_sample_data)


```python
import numpy as np
from napari_plugin_engine import napari_hook_implementation

def _generate_random_data(shape=(512, 512)):
    data = np.random.rand(*shape)
    return [(data, {'name': 'random data'})]

@napari_hook_implementation
def napari_provide_sample_data():
    return {
        'random data': _generate_random_data,
        'random image': 'https://picsum.photos/1024',
        'sample_key': {
            'display_name': 'Some Random Data (512 x 512)'
            'data': _generate_random_data,
        }
    }
```
````