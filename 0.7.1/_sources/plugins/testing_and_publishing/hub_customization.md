(hub-customization)=

# Customizing your plugin's listing on napari hub

Once your plugin is published to [PyPI](https://pypi.org/) with the `Framework :: napari` classifier, it will automatically appear on the [napari hub](https://napari-hub.org/). This guide explains how to customize your plugin's listing to provide the best experience for potential users.

## Overview

The napari hub displays information about your plugin from three main sources:

1. **PyPI** - Core package metadata from your `pyproject.toml`
2. **README** - As defined in your `pyproject.toml`, serves as the description on your plugin's detail page.
3. **npe2 manifest** - Plugin-specific metadata from your `napari.yaml` file

By understanding how these sources work together, you can ensure your plugin appears with accurate, appealing information on the hub.

## Setting package metadata in pyproject.toml

Most of the information displayed on the napari hub comes from your [Python package metadata](https://packaging.python.org/en/latest/specifications/core-metadata/). The napari hub reads this information from [PyPI's JSON API](https://docs.pypi.org/api/json/) after you publish your package.

### Essential fields

These fields appear prominently on your plugin's listing and in search results:

#### Name

The package name as it appears on PyPI. This is what users will use to install your plugin.

```toml
[project]
name = "napari-example-plugin"
```

#### Summary

A one-line description of your plugin. Keep it concise and descriptive - it appears in plugin listings and search results.

```toml
[project]
description = "A plugin for advanced image segmentation using deep learning"
```

#### Version

The current version of your plugin. We strongly recommend using [Semantic Versioning (SemVer)](https://semver.org/) or [Intended Effort Versioning (EffVer)](https://jacobtomlinson.dev/effver/) with Python conventions for pre-releases ([PEP 440](https://www.python.org/dev/peps/pep-0440/)).

```toml
[project]
version = "0.1.0"
```

````{tip}
If you're using dynamic versioning tools like `setuptools-scm` or `hatch-vcs`, you can specify:

```toml
[project]
dynamic = ["version"]
```
````

#### Authors

Plugin authors displayed on your listing. The hub will display this information on the search page and on your plugin's page.

```toml
[project]
authors = [
    {name = "Jane Doe", email = "jane@example.com"},
    {name = "John Smith"},
]
```

#### License

The license under which your plugin is distributed. Use a valid [SPDX identifier](https://spdx.org/licenses/) or the string `"Other"`. Modern Python packaging uses the [`license-expression` format](https://packaging.python.org/en/latest/specifications/core-metadata/#license-expression) for specifying licenses.

```toml
[project]
license = "BSD-3-Clause"
license-files = ["LICENSE"]
```

````{note}
Previously, the valid way to specify license information used the `license` table with `file` or `text` keys and a license trove classifier. This still works for listings on the napari-hub, but is deprecated in favor of `license-expression`.

```toml
[project]
license = {text = "BSD-3-Clause"}
```

````

#### Classifiers

[PyPI Trove classifiers](https://pypi.org/classifiers/) provide structured metadata about your plugin. The `Framework :: napari` classifier is required for hub visibility.

```toml
[project]
classifiers = [
    "Development Status :: 4 - Beta",
    "Framework :: napari",
    "Intended Audience :: Science/Research",
    "Operating System :: OS Independent",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.9",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
    "Programming Language :: Python :: 3.12",
    "Topic :: Scientific/Engineering :: Image Processing",
]
```

#### Python version requirements

Additionally, specify the Python versions your plugin supports. If you specify `">=3.10"`, the hub will tag your plugin as supporting Python 3.10, 3.11, 3.12, etc.

```toml
[project]
requires-python = ">=3.10"
```

#### Dependencies

List your plugin's dependencies. The hub displays these on the detail page.

```toml
[project]
dependencies = [
    "numpy>=1.21",
    "scikit-image>=0.19",
    "torch>=2.0",
    "qtpy",
]
```

```{warning}
**Never include Qt backends** (`PyQt5`, `PyQt6`, `PySide2`, `PySide6`) or `napari[all]` in your base dependencies! See [](best-practices-no-qt-backend) for details.
```

### Project URLs

It is best practice to specify the following URLs in your `pyproject.toml` file:

```toml
[project.urls]
Homepage = "https://github.com/username/napari-example-plugin"
Documentation = "https://napari-example-plugin.readthedocs.io"
"Source Code" = "https://github.com/username/napari-example-plugin"
"Bug Tracker" = "https://github.com/username/napari-example-plugin/issues"
"User Support" = "https://forum.image.sc/tag/napari"
```

The hub displays your project's PyPI link (not specified here, created when you publish your package),
and your project's GitHub link on your plugin details page. The GitHub link will be parsed from
your `Homepage` **or** `Source Code` links under `[project.urls]`, so you can update your `Homepage`
to a dedicated website if you have one.

### Complete example

Here's a complete example of a well-configured `pyproject.toml`:

```toml
[project]
name = "napari-example-plugin"
version = "0.1.0"
description = "Advanced image segmentation using deep learning"
readme = "README.md"
license = "BSD-3-Clause"
license-files = ["LICENSE"]
requires-python = ">=3.10"
authors = [
    {name = "Jane Doe", email = "jane@example.com"},
]
classifiers = [
    "Development Status :: 4 - Beta",
    "Framework :: napari",
    "Intended Audience :: Science/Research",
    "Operating System :: OS Independent",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
    "Programming Language :: Python :: 3.12",
    "Programming Language :: Python :: 3.13",
    "Topic :: Scientific/Engineering :: Image Processing",
]
dependencies = [
    "numpy>=1.21",
    "scikit-image>=0.19",
    "magicgui>=0.8.0",
]

[project.urls]
Homepage = "https://github.com/username/napari-example-plugin"
Documentation = "https://napari-example-plugin.readthedocs.io"
"Bug Tracker" = "https://github.com/username/napari-example-plugin/issues"
"User Support" = "https://forum.image.sc/tag/napari"

[project.entry-points."napari.manifest"]
napari-example-plugin = "napari_example_plugin:napari.yaml"
```

## Plugin Hub Description with README.md

A detailed description of your plugin. This appears on the plugin's detail page and is indexed for search. Use your `README.md` file:

```toml
[project]
readme = "README.md"
```

The hub will render your README with proper Markdown formatting. If you begin with a Level 1 heading, it will be treated as a title and removed from the description.

### Writing a quality Readme

- **Clear summary**: Start with who the plugin is for, what data it works with, and what problems it solves
- **Quick start example**: Include images, GIFs, or videos showing the plugin in action
- **Relevant keywords**: Mention key terms users might search for (e.g., "segmentation", "3D", "time series")
- **Section headings**: Use Level 2 headings (`##`) to organize content - these create navigation links in the sidebar

### Including images and media

There are a few ways to include images and other media in your description, but these assets need to be hosted somewhere and accessible via an absolute URL. In other words, relative paths to images in your repository will not work. Images should use the markdown format `![alt text](https://absolute.url/to/image)`. Consider how an image located on the `main` branch at `./resources/image.png` in your repository could be hosted:

1. The raw path to the image, identified with `raw.githubusercontent.com`. e.g. `![raw image](https://raw.githubusercontent.com/user/repo/main/resources/image.png)`. On Github, you can open the image in the repo, open the image in a new tab and copy the address bar url.
2. The raw blob path to the image, with `?raw=true` appended. e.g. `![blob image](https://github.com/user/repo/blob/main/resources/image.png?raw=true)`. On Github, you can open the image in the repo and right-click the image to copy the link address.
3. The raw path to any image or asset on Github or on any other site, including your own static documentation.

## npe2 manifest metadata

Your plugin's [npe2 manifest](plugin-manifest) (`napari.yaml`) provides napari-specific metadata that appears on the hub.

### Display name

The `display_name`, and not the `name`, appears in plugin listings and the napari plugin manager:

```yaml
name: napari-example-plugin
display_name: Example Segmentation Plugin
```

### Plugin type indicators

The hub automatically detects your plugin's capabilities from your manifest contributions and displays them as Plugin types:

- **Reader plugins**: Detected from `contributions.readers`
- **Writer plugins**: Detected from `contributions.writers`
- **Widget plugins**: Detected from `contributions.widgets`
- **Sample data**: Detected from `contributions.sample_data`

### Reader and writer file extensions

The hub displays supported file extensions for readers and writers:

```yaml
contributions:
  readers:
    - command: napari-example-plugin.read_tiff
      filename_patterns: ["*.tif", "*.tiff"]
    - command: napari-example-plugin.read_custom
      filename_patterns: ["*.custom"]
  
  writers:
    - command: napari-example-plugin.write_tiff
      filename_patterns: ["*.tif"]
      layer_types: ["image", "labels"]
```

### Visibility control

Control whether your plugin appears in hub search and listings, and in the napari plugin manager:

```yaml
name: napari-example-plugin
visibility: public  # or "hidden"
```

- `public` (default): Plugin appears in search and listings
- `hidden`: Detail page is accessible via direct link, but plugin doesn't appear in search. Remains installable via napari plugin manager.

## Troubleshooting

### Removing your plugin from napari and the hub

To completely hide your plugin from all napari-related APIs, workflows and listings, remove the `Framework :: napari` classifier from your `pyproject.toml`:

```toml
[project]
classifiers = [
    # "Framework :: napari",  # Remove or comment out this line
    "Programming Language :: Python :: 3",
    # ... other classifiers
]
```

```{important}
You must release a new version for this change to take effect.
```

After removing the classifier:

- Your plugin will still work when manually installed (e.g. `pip install your-plugin`)
- It won't appear in the napari plugin manager
- It won't appear on the napari hub
- It won't be automatically discovered by napari metadata tools

### My changes aren't showing up on the hub

The napari hub updates plugin information periodically. After publishing a new version to PyPI:

1. Wait up to 4 hours for the hub to refresh
2. Clear your browser cache
3. Check that your new version appears on [PyPI](https://pypi.org/)

### My plugin doesn't appear on the hub at all

Check that:

- Your package is published to PyPI
- You included the `Framework :: napari` classifier
- Your plugin's `visibility` is not set to `hidden` (or is set to `public`)
- Your package has a valid npe2 manifest (`napari.yaml`) with a `napari.manifest` entry point
