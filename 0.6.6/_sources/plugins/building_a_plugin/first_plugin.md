(your-first-plugin)=
# Your first plugin

In this tutorial, we'll step through the fundamental concepts for building a
**bare minimum** napari plugin from scratch.

At the end, we'll point you to the [napari-plugin-template
repository][napari_plugin_template] that helps automate the creation of new plugins, and adds a number
of conveniences for testing, maintaining, and deploying your plugin.

````{admonition} new plugin format!
:class: important
This page describes the creation of a plugin targeting `npe2`, the second
generation plugin engine.
````

## Before you start

We assume you've set up a Python virtual environment (using a virtual
environment instead of a global python installation is **highly
recommended**). If you are new to virtual environments, we recommend
[installing miniconda][miniconda] and [creating a new environment with
python][python_env].

Even though plugins don't necessarily need to list `napari` as a direct dependency, and
[should not depend on a specific Qt backend](best-practices-no-qt-backend),
you will need a working installation of napari in your active Python
environment to use and test your plugin.
See the [installation guide](napari-installation) if this is your first time
installing napari.

## What is a plugin?

Napari plugins are just Python packages. *Minimally*, they must:

1. Include a static [plugin manifest](plugin-manifest) file that details the
   [contributions](contributions-ref) contained in the plugin.
2. Declare a `napari.manifest` [entry point][entry_points] that allows
   napari to detect the plugin at runtime.

## 1. Create a new directory

Let's create a new folder called `napari-hello` for your plugin files, and navigate into it. We'll use a `src` layout for the Python package, which is now the recommended practice.

```sh
mkdir napari-hello
cd napari-hello
mkdir src
mkdir src/napari_hello
```

## 2. Add standard Python package metadata files

In your root `napari-hello` folder, create a `pyproject.toml` file, then create
 an empty `__init__.py` and `napari.yaml` file inside `src/napari_hello/`.

::::{tab-set}

:::{tab-item} macOS / Linux

```sh
touch src/napari_hello/__init__.py src/napari_hello/napari.yaml pyproject.toml
```

:::

:::{tab-item} Windows

```bat
type nul > src\napari_hello\__init__.py
type nul > src\napari_hello\napari.yaml
type nul > pyproject.toml
```

:::

::::

Your project should now look like this:

```text
~/napari-hello/
├── src/
│   └── napari_hello/
│       ├── __init__.py
│       └── napari.yaml
├── pyproject.toml
```

````{admonition} **napari-hello** vs **napari_hello**
:class: tip
You might notice that we used a **dash** in our top level folder, and an 
**underscore** in the inner folder. This is the Python convention: *distribution 
packages* use dashes, while Python *files* and *modules* use underscores. Our 
*package* is named `napari-hello`, and it includes a single top-level module, 
called `napari_hello`.

You would *install* this package with
```sh
python -m pip install napari-hello
```

... and *import* it with ...
```python
import napari_hello
```
````

Next, we will populate `pyproject.toml`.

### `pyproject.toml`

```{note}
`pyproject.toml` is a standard file (introduced in
[PEP518](https://peps.python.org/pep-0518/), May 2016) that tells
the Python package installer [pip](https://pip.pypa.io/en/stable/) how to
build your package. For more background, see
[Clarifying PEP 518](https://snarky.ca/clarifying-pep-518/) and
[What the heck is pyproject.toml?](https://snarky.ca/what-the-heck-is-pyproject-toml/).
```

We provide the bare minimum package metadata (name and version),
along with a [PyPI classifier](https://pypi.org/classifiers/) that identifies
the package as a napari plugin.
Here, we declare we want to use [setuptools](https://setuptools.pypa.io/en/latest/)
for packaging our plugin. We also need to tell setuptools to look for the package
in the `src` directory.
Paste the following text into `pyproject.toml`:

```toml
[project]
name = "napari-hello"
version = "0.0.1"
classifiers = [
    "Framework :: napari",
]

[build-system]
requires = ["setuptools", "wheel"]
build-backend = "setuptools.build_meta"

[tool.setuptools.packages.find]
where = ["src"]

```

There is a *lot* more than can go in the package metadata.
See the [setuptools quickstart](https://setuptools.pypa.io/en/latest/userguide/quickstart.html)
for more.

## 3. Implement the plugin

So far, we've done nothing napari-specific.  Let's create the actual plugin and add
some Python code. We're going to add a
[Widget contribution](contributions-widgets)
with a single button that shows a "Hello, world!" message when clicked.

### Add plugin functionality to `src/napari_hello/__init__.py`

Copy and paste the following text into the file at `napari_hello/__init__.py`.
It just uses the napari notifications API to show a message:

```python
from napari.utils.notifications import show_info

def show_hello_message():
    show_info('Hello, world!')
```

*(It doesn't look like a widget yet! We're going to use napari's widget
autogeneration capabilities to turn this function into a widget)*

### Add a `napari.yaml` manifest

If you haven't already, create an empty [plugin manifest](plugin-manifest) file at
`src/napari_hello/napari.yaml`. We will use this file to tell napari:

1. That our plugin contributes a [**command**](contributions-commands)
   (we give the command an ID of `napari-hello.say_hi`. It must start with our plugin
   name, and be unique).
2. The location of the function that executes the command (the `python_name`, pointing
   to the `show_hello_message` function in the `napari_hello` module).
3. That our plugin contributes a [**widget**](contributions-widgets),
   and that we'd like napari to **autogenerate** the widget from the command signature
   (so we don't need to deal with any GUI code).

Add the following text to `napari.yaml`:

```yaml
name: napari-hello
contributions:
  commands:
    - id: napari-hello.say_hi
      title: Say hello, world!
      python_name: napari_hello:show_hello_message
  widgets:
    - command: napari-hello.say_hi  # note, same as command.id above
      display_name: Hello World
      autogenerate: true
```

```{tip}
We could have put the `show_hello_message` function anywhere, it didn't
need to go in the top `__init__.py` file. Just make sure that the `python_name`
of the corresponding `command` in the manifest points to the correct
`<module_name>:<function_name>`.
```

### Update `pyproject.toml`

Lastly, we need to make a few changes to `pyproject.toml`.

1. Because we are directly using the `napari.utils.notifications` API in our,
   `show_hello_message` function, we need to add `napari` to our package
   **`install_requires`**. (You should add *all* of your required package dependencies
   here.  Assume nothing about your user's environment! Not even napari.)

2. We need to instruct setuptools to *include* that `napari.yaml` file
   when it bundles our package for distribution, by adding
   **`include-package-data = True`** to the `[tool.setuptools]` section and pointing
   `package-data` to all `yaml` files.

3. In order for napari to find our plugin when it's installed, we need to
   add an **entry point** for `napari.manifest` in the `[project.entry-points]` section.
   This tells napari to look for our plugin manifest in the `napari.yaml`
   file we added to the `napari_hello` module.

    ```{tip}
    Entry points are a standard Python mechanism for an installed distribution to
    advertise components it provides to be discovered and used by other code.

    See the [Entry points specification][entry_points] for details.
    ```

With the above changes, your final `pyproject.toml` should look like this:

```toml
[project]
name = "napari-hello"
version = "0.0.1"
classifiers = [
    "Framework :: napari",
]
dependencies = ["napari"]

[build-system]
requires = ["setuptools", "wheel"]
build-backend = "setuptools.build_meta"

[tool.setuptools]
include-package-data = true

[tool.setuptools.packages.find]
where = ["src"]

[tool.setuptools.package-data]
"*" = ["*.yaml"]

[project.entry-points."napari.manifest"]
napari-hello = "napari_hello:napari.yaml"

```

## 4. Install your plugin and try it out!

With that, we're ready to go.  Let's install our package in the environment
and then run napari. Note: we're using `python -m pip install -e .` here to install our
package (in the current working directory) in ["editable" mode][editable_mode].
This means that changes we make to our package during development will be
detected when we re-run napari, without having to run `python -m pip install` again.
In a fresh environment, when you try to run napari, there will be no Qt bindings
installed. To do so, you can install the default Qt bindings with
`pip install napari[pyqt]`. Importantly, your plugin should not depend on a specific Qt backend, read about plugin [Best Practices](best-practices) to learn more.

```sh
python -m pip install -e .
python -m pip install napari[pyqt]
napari
```

Once napari starts, select `napari-hello: Hello World` from the
`Plugins` menu, then click the `Run` button to see the message.

% ![hello-example](../images/hello.png)

## 5. (Optional) Build your plugin for distribution

You can build a distributable package using the
[`build`](https://pypa-build.readthedocs.io/en/latest/) tool.

```sh
python -m build
```

This will create a `dist/` folder containing `.whl` and `.tar.gz` files,
which you can upload to [PyPI](https://pypi.org/) or share with others.

However, you may wish to automate distribution of your plugin using Github,
see below and the [Publishing](plugin-deploy) guide for more details.

## Get going quickly with the napari plugin template

Now that you've learned all of the critical steps for creating a plugin,
you can use our [napari-plugin-template repository][napari_plugin_template]
to get up and running quickly with each new plugin.
This will ask you a few questions about your new plugin, and
autogenerate a package structure much like the one above. It additionally
includes conveniences like testing, continuous integration, version
management, and deployment hooks.

```sh
python -m pip install copier jinja2-time
python -m pip install npe2
copier copy --trust https://github.com/napari/napari-plugin-template new-plugin-name
```

## Next Steps

Plugins can do a lot more than just say hi!  You can see the complete list
of available contributions and their fields in the
[Contributions Reference](contributions-ref), and learn more about each
specific contribution type in the [Guides](plugin-contribution-guides).

Review the [Best Practices](best-practices) when developing plugins and,
when you're ready to share your plugin, see [Testing and Publishing](plugin-test-deploy).

[miniconda]: https://docs.conda.io/projects/conda/en/latest/user-guide/install/download.html
[python_env]: https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-python.html
[editable_mode]: https://pip.pypa.io/en/stable/cli/pip_install/#editable-installs
[napari_plugin_template]: https://github.com/napari/napari-plugin-template
[entry_points]: https://packaging.python.org/en/latest/specifications/entry-points/
