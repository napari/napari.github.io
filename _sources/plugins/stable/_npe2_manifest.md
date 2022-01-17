# Manifest Reference

```{important}
Plugin manifests are a feature of the second generation napari plugin engine
("npe2").  If you are still using the first generation `napari-plugin-engine`
(i.e. the  `napari.plugin` entrypoint, along with `@napari_hook_implementation`
decorators) then this page does not apply to your plugin.
```

Every napari plugin needs to ship a manifest file with their package. By
convention, this file is called `napari.yaml` and it is placed in the top level
module of the package, but it can be named anything and placed anywhere.

You tell napari where to find your manifest by adding a `napari.manifest` [entry
point](https://packaging.python.org/en/latest/specifications/entry-points/) to
your package metadata:

```ini
# tell napari where to find to your manifest
[options.entry_points]
napari.manifest =
    example-plugin = example_plugin:napari.yaml

# make sure it gets included in your package
[options.package_data]
example-plugin = napari.yaml
```

## Fields

All fields are optional except those in **bold**.

| Name | Details |
|------|---------|
|  **`name`**  | The name of the plugin. Though this field is mandatory, it *must* match the package `name` as defined in the python package metadata.|
|  `display_name`  | User-facing text to display as the name of this plugin|
|  `schema_version`  | A SemVer compatible version string matching the napari plugin schema version that the plugin is compatible with.|
|  `on_activate`  | Fully qualified python path to a function that will be called upon plugin activation (e.g. `'my_plugin.some_module:activate'`). The activate function can be used to connect command ids to python callables, or perform other side-effects. A plugin will be 'activated' when one of its contributions is requested by the user (such as a widget, or reader).|
|  `on_deactivate`  | Fully qualified python path to a function that will be called when a user deactivates a plugin (e.g. `'my_plugin.some_module:deactivate'`). This is optional, and may be used to perform any plugin cleanup.|
|  `contributions`  | An object describing the plugin's [contributions](./contributions)|

```{note}
Standard python
[package metadata](https://packaging.python.org/en/latest/specifications/core-metadata/)
from your `setup.cfg` file will also be parsed for version, license, and other info.
```

## Example

Here is a complete example of what the manifest of a plugin providing *all*
contributions might look like. (Note: a plugin needn't implement
more than a single contribution type).

```{tip}
Both [YAML](https://yaml.org/) and [TOML](https://toml.io/en/) are supported
manifest formats, though YAML is the "default" and more common format.
```

````{tabbed} yaml
```yaml
name: example-plugin
display_name: Example Plugin
schema_version: 0.1.0
contributions:
  commands:
  - id: example-plugin.hello_world
    title: Hello World
  - id: example-plugin.read_xyz
    title: Read ".xyz" files
    python_name: example_plugin.some_module:get_reader
  - id: example-plugin.write_points
    title: Save points layer to csv
    python_name: example_plugin.some_module:write_points
  - id: example-plugin.my_widget
    title: Open my widget
    python_name: example_plugin.some_module:MyWidget
  - id: example-plugin.do_threshold
    title: Perform threshold on image, return new image
    python_name: example_plugin.some_module:threshold
  - id: example-plugin.threshold_widget
    title: Make threshold widget with magic_factory
    python_name: example_plugin.some_module:widget_factory
  - id: example-plugin.data.fractal
    title: Create fractal image
    python_name: example_plugin.some_module:create_fractal
  readers:
  - command: example-plugin.read_xyz
    filename_patterns:
    - '*.xyz'
    accepts_directories: false
  writers:
  - command: example-plugin.write_points
    layer_types:
    - points
    filename_extensions:
    - .csv
  widgets:
  - command: example-plugin.my_widget
    display_name: Wizard
  - command: example-plugin.threshold_widget
    display_name: Threshold
  - command: example-plugin.do_threshold
    display_name: Threshold
    autogenerate: true
  sample_data:
  - key: fractal
    display_name: Fractal
    command: example-plugin.data.fractal
  - key: napari
    display_name: Tabueran Kiribati
    uri: https://en.wikipedia.org/wiki/Napari#/media/File:Tabuaeran_Kiribati.jpg
  themes:
  - id: monokai
    label: Monokai
    type: dark
    colors:
      canvas: black
      console: black
      background: '#272822'
      foreground: '#75715e'
      primary: '#cfcfc2'
      secondary: '#f8f8f2'
      highlight: '#e6db74'
      text: '#a1ef34'
      warning: '#f92672'
      current: '#66d9ef'

```
````

````{tabbed} toml
```toml
display_name = 'Example Plugin'
name = 'example-plugin'
schema_version = '0.1.0'

[[contributions.commands]]
id = 'example-plugin.hello_world'
title = 'Hello World'

[[contributions.commands]]
id = 'example-plugin.read_xyz'
python_name = 'example_plugin.some_module:get_reader'
title = 'Read ".xyz" files'

[[contributions.commands]]
id = 'example-plugin.write_points'
python_name = 'example_plugin.some_module:write_points'
title = 'Save points layer to csv'

[[contributions.commands]]
id = 'example-plugin.my_widget'
python_name = 'example_plugin.some_module:MyWidget'
title = 'Open my widget'

[[contributions.commands]]
id = 'example-plugin.do_threshold'
python_name = 'example_plugin.some_module:threshold'
title = 'Perform threshold on image, return new image'

[[contributions.commands]]
id = 'example-plugin.threshold_widget'
python_name = 'example_plugin.some_module:widget_factory'
title = 'Make threshold widget with magic_factory'

[[contributions.commands]]
id = 'example-plugin.data.fractal'
python_name = 'example_plugin.some_module:create_fractal'
title = 'Create fractal image'

[[contributions.readers]]
accepts_directories = false
command = 'example-plugin.read_xyz'
filename_patterns = [ '*.xyz' ]

[[contributions.sample_data]]
command = 'example-plugin.data.fractal'
display_name = 'Fractal'
key = 'fractal'

[[contributions.sample_data]]
display_name = 'Tabueran Kiribati'
key = 'napari'
uri = 'https://en.wikipedia.org/wiki/Napari#/media/File:Tabuaeran_Kiribati.jpg'

[[contributions.themes]]
id = 'monokai'
label = 'Monokai'
type = 'dark'

    [contributions.themes.colors]
    background = '#272822'
    canvas = 'black'
    console = 'black'
    current = '#66d9ef'
    foreground = '#75715e'
    highlight = '#e6db74'
    primary = '#cfcfc2'
    secondary = '#f8f8f2'
    text = '#a1ef34'
    warning = '#f92672'

[[contributions.widgets]]
command = 'example-plugin.my_widget'
display_name = 'Wizard'

[[contributions.widgets]]
command = 'example-plugin.threshold_widget'
display_name = 'Threshold'

[[contributions.widgets]]
autogenerate = true
command = 'example-plugin.do_threshold'
display_name = 'Threshold'

[[contributions.writers]]
command = 'example-plugin.write_points'
filename_extensions = [ '.csv' ]
layer_types = [ 'points' ]
```
````
