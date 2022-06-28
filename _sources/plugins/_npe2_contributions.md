# Contributions Reference

**Contributions** are a set of static declarations that you make in the
`contributions` field of the [Plugin Manifest](./manifest). Your extension registers
**Contributions** to extend various functionalities within napari.
Here is a list of all available **Contributions**:

- [`commands`](#contributions-commands)
- [`readers`](#contributions-readers)
- [`writers`](#contributions-writers)
- [`widgets`](#contributions-widgets)
- [`sample_data`](#contributions-sample-data)
- [`themes`](#contributions-themes)

You may add as many contributions as you'd like to a single manifest. For
clarity, the following examples include only the specific contribution that
is being discussed.

(contributions-commands)=
## `contributions.commands`


Contribute a **command** (a python callable) consisting of a unique `id`,
a `title` and (optionally) a `python_path` that points to a fully qualified python
callable.  If a `python_path` is not included in the manifest, it *must* be
registered during activation with `register_command`.

Note, some other contributions (e.g. `readers`, `writers` and `widgets`) will
*point* to a specific command.  The command itself (i.e. the callable python
object) will always appear in the `contributions.commands` section, but those
contribution types may add additional contribution-specific metadata.

```{admonition} Future Plans
Command contributions will eventually include an **icon**, **category**, and
**enabled** state. Enablement is expressed with *when clauses*, that capture a
conditional expression determining whether the command should be enabled or not,
based on the current state of the program.  (i.e. "*If the active layer is a
`Labels` layer*")

Commands will eventually be availble in a Command Palette (accessible with a
hotkey) but they can also show in other menus.
```




**Fields**
- **`commands.id`** : A unique identifier used to reference this command. While this may look like a python fully qualified name this does *not* refer to a python object; this identifier is specific to napari.  It must begin with the name of the package, and include only alphanumeric characters, plus dashes and underscores.
- **`commands.title`** : User facing title representing the command. This might be used, for example, when searching in a command palette. Examples: 'Generate lily sample', 'Read tiff image', 'Open gaussian blur widget'. 
- **`commands.python_name`** : 
*(Optional: default=None).*
Fully qualified name to a callable python object implementing this command. This usually takes the form of `{obj.__module__}:{obj.__qualname__}` (e.g. `my_package.a_module:some_function`)

### Commands example

````{tabbed} yaml
```yaml
contributions:
  commands:
  - id: example-plugin.hello_world
    title: Hello World

```
````

````{tabbed} toml
```toml
[[contributions.commands]]
id = 'example-plugin.hello_world'
title = 'Hello World'
```
````

(contributions-readers)=
## `contributions.readers`


Contribute a file reader.

Readers may be associated with specific **filename_patterns** (e.g. "*.tif",
"*.zip") and are invoked whenever `viewer.open('some/path')` is used on the
command line, or when a user opens a file in the graphical user interface by
dropping a file into the canvas, or using `File -> Open...`


See the [Readers Guide](./guides.html#readers-contribution-guide)
for more details on implementing this contribution.



**Fields**
- **`readers.command`** : Identifier of the command providing `napari_get_reader`.
- **`readers.filename_patterns`** : List of filename patterns (for fnmatch) that this reader can accept. Reader will be tried only if `fnmatch(filename, pattern) == True`. Use `['*']` to match all filenames.
- **`readers.accepts_directories`** : 
*(Optional: default=False).*
Whether this reader accepts directories

### Readers example

````{tabbed} yaml
```yaml
contributions:
  commands:
  - id: example-plugin.read_xyz
    title: Read ".xyz" files
    python_name: example_plugin.some_module:get_reader
  readers:
  - command: example-plugin.read_xyz
    filename_patterns:
    - '*.xyz'
    accepts_directories: false

```
````

````{tabbed} toml
```toml
[[contributions.commands]]
id = 'example-plugin.read_xyz'
python_name = 'example_plugin.some_module:get_reader'
title = 'Read ".xyz" files'

[[contributions.readers]]
accepts_directories = false
command = 'example-plugin.read_xyz'
filename_patterns = [ '*.xyz' ]
```
````

(contributions-writers)=
## `contributions.writers`


Contribute a layer writer.

Writers accept data from one or more layers and write them to file. Writers declare
support for writing one or more **layer_types**, may be associated with specific
**filename_patterns** (e.g. "\*.tif", "\*.zip") and are invoked whenever
`viewer.layers.save('some/path.ext')` is used on the command line, or when a user
requests to save one or more layers in the graphical user interface with `File ->
Save Selected Layer(s)...` or `Save All Layers...`


See the [Writers Guide](./guides.html#writers-contribution-guide)
for more details on implementing this contribution.



**Fields**
- **`writers.command`** : Identifier of the command providing a writer.
- **`writers.layer_types`** : List of layer type constraints. These determine what layers (or combinations thereof) this writer handles.
- **`writers.filename_extensions`** : 
*(Optional: default=None).*
List of filename extensions compatible with this writer. The first entry is used as the default if necessary. Empty by default. When empty, any filename extension is accepted.
- **`writers.display_name`** : 
*(Optional: default=).*
Brief text used to describe this writer when presented. Empty by default. When present, this string is presented in the save dialog along side the plugin name and may be used to distinguish the kind of writer for the user. E.g. “lossy” or “lossless”.

### Writers example

````{tabbed} yaml
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

````{tabbed} toml
```toml
[[contributions.commands]]
id = 'example-plugin.write_points'
python_name = 'example_plugin.some_module:write_points'
title = 'Save points layer to csv'

[[contributions.writers]]
command = 'example-plugin.write_points'
filename_extensions = [ '.csv' ]
layer_types = [ 'points' ]
```
````

(contributions-widgets)=
## `contributions.widgets`


Contribute a widget that can be added to the napari viewer.

Widget contributions point to a **command** that, when called, returns a widget
*instance*; this includes functions that return a widget instance, (e.g. those
decorated with `magicgui.magic_factory`) and subclasses of either
[`QtWidgets.QWidget`](https://doc.qt.io/qt-5/qwidget.html) or
[`magicgui.widgets.Widget`](https://napari.org/magicgui/api/_autosummary/magicgui.widgets._bases.Widget.html).

Optionally, **autogenerate** may be used to create a widget (using
[magicgui](https://napari.org/magicgui/)) from a command.  (In this case, the
command needn't return a widget instance; it can be any function suitable as an
argument to `magicgui.magicgui()`.)


See the [Widgets Guide](./guides.html#widgets-contribution-guide)
for more details on implementing this contribution.



**Fields**
- **`widgets.command`** : Identifier of a command that returns a widget instance.  Or, if `autogenerate` is `True`, any command suitable as an argument to `magicgui.magicgui()`.
- **`widgets.display_name`** : Name for the widget, as presented in the UI.
- **`widgets.autogenerate`** : 
*(Optional: default=False).*
If true, a widget will be autogenerated from the signature of the associated command using [magicgui](https://napari.org/magicgui/).

### Widgets example

````{tabbed} yaml
```yaml
contributions:
  commands:
  - id: example-plugin.my_widget
    title: Open my widget
    python_name: example_plugin.some_module:MyWidget
  - id: example-plugin.threshold_widget
    title: Make threshold widget with magic_factory
    python_name: example_plugin.some_module:widget_factory
  - id: example-plugin.do_threshold
    title: Perform threshold on image, return new image
    python_name: example_plugin.some_module:threshold
  widgets:
  - command: example-plugin.my_widget
    display_name: Wizard
  - command: example-plugin.threshold_widget
    display_name: Threshold
  - command: example-plugin.do_threshold
    display_name: Threshold
    autogenerate: true

```
````

````{tabbed} toml
```toml
[[contributions.commands]]
id = 'example-plugin.my_widget'
python_name = 'example_plugin.some_module:MyWidget'
title = 'Open my widget'

[[contributions.commands]]
id = 'example-plugin.threshold_widget'
python_name = 'example_plugin.some_module:widget_factory'
title = 'Make threshold widget with magic_factory'

[[contributions.commands]]
id = 'example-plugin.do_threshold'
python_name = 'example_plugin.some_module:threshold'
title = 'Perform threshold on image, return new image'

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
```
````

(contributions-sample_data)=
## `contributions.sample_data`

```{tip}
This contribution accepts 2 schema types
```
##### 1. Sample Data Function
Contribute a callable command that creates data on demand.


See the [Sample Data Guide](./guides.html#sample-data-contribution-guide)
for more details on implementing this contribution.



**Fields**
- **`sample_data.key`** : A unique key to identify this sample.
- **`sample_data.display_name`** : String to show in the UI when referring to this sample
- **`sample_data.command`** : Identifier of a command that returns layer data tuple.
##### 2. Sample Data URI
Contribute a URI to static local or remote data. This can be data included in
the plugin package, or a URL to remote data.  The URI must be readable by either
napari's builtin reader, or by a plugin that is included/required.


See the [Sample Data Guide](./guides.html#sample-data-contribution-guide)
for more details on implementing this contribution.



**Fields**
- **`sample_data.key`** : A unique key to identify this sample.
- **`sample_data.display_name`** : String to show in the UI when referring to this sample
- **`sample_data.uri`** : Path or URL to a data resource. This URI should be a valid input to `io_utils.read`
- **`sample_data.reader_plugin`** : 
*(Optional: default=None).*
Name of plugin to use to open URI

### Sample Data example

````{tabbed} yaml
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

````{tabbed} toml
```toml
[[contributions.commands]]
id = 'example-plugin.data.fractal'
python_name = 'example_plugin.some_module:create_fractal'
title = 'Create fractal image'

[[contributions.sample_data]]
command = 'example-plugin.data.fractal'
display_name = 'Fractal'
key = 'fractal'

[[contributions.sample_data]]
display_name = 'Tabueran Kiribati'
key = 'napari'
uri = 'https://en.wikipedia.org/wiki/Napari#/media/File:Tabuaeran_Kiribati.jpg'
```
````

(contributions-themes)=
## `contributions.themes`


Contribute a color theme to napari.

You must specify an **id**, **label**, and whether the theme is a dark theme or a
light theme **type** (such that the rest of napari changes to match your theme).
Any color keys omitted from the theme contribution will use the default napari
dark/light theme colors.




**Fields**
- **`themes.id`** : Identifier of the color theme as used in the user settings.
- **`themes.label`** : Label of the color theme as shown in the UI.
- **`themes.type`** : Base theme type, used for icons and filling in unprovided colors. Must be either `'dark'` or  `'light'`.
- **`themes.colors`** : Theme colors. Valid keys include: `canvas`, `console`, `background`, `foreground`, `primary`, `secondary`, `highlight`, `text`, `icon`, `warning`, `current`. All keys are optional. Color values can be defined via:
   - name: `"Black"`, `"azure"`
   - hexadecimal value: `"0x000"`, `"#FFFFFF"`, `"7fffd4"`
   - RGB/RGBA tuples: `(255, 255, 255)`, `(255, 255, 255, 0.5)`
   - RGB/RGBA strings: `"rgb(255, 255, 255)"`, `"rgba(255, 255, 255, 0.5)`"
   - HSL strings: "`hsl(270, 60%, 70%)"`, `"hsl(270, 60%, 70%, .5)`"


### Themes example

````{tabbed} yaml
```yaml
contributions:
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
```
````



