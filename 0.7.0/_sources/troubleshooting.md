# Troubleshooting

This page collects a few known issues and solutions for common problems that users might encounter when using napari.
If you are facing an error that is not covered by this page, please check existing issues on the
[napari repository](https://github.com/napari/napari/issues). If you can't find what you are looking for,
please open a new issue.

## Known issues

### Plugin errors related to `pydantic`

napari depends on [`pydantic`](https://github.com/pydantic/pydantic), a data validation library.
In napari 0.6.0, we dropped support for `pydantic` v1, changing our minimum required `pydantic` version to 2.2.
This will bring significant speed and functionality advantages to napari. `Pydantic` v2 was released nearly 2
years ago, so we feel that there has been adequate time for plugins to update (there is [a detailed migration guide](https://docs.pydantic.dev/latest/migration/)).
However, there may be plugins that depend on pydantic that have not been updated to work with pydantic 2, but
can be installed with napari 0.6.0, because it is not typical to set upper bounds on dependencies. In this case,
you will get Import or Runtime errors related to `pydantic`. If this occurs, you will need to reach out to the
developers of the plugin and ask them to update the plugin.

To do this, you can open the Plugin Manager using the Plugins menu: `Plugins > Install/Uninstall Plugins...` and then
click the name of the plugin in the `Installed Plugins` list. This will take you to the plugin website, where
you can look for information on opening an issue or contacting the developers.
Alternately, you can install and use napari 0.5.6 (or lower) and specify `"pydantic<2"` when installing to
continue to use such plugins.

### Installed plugin doesn't show up in `Plugins` menu

Installed `npe2` plugins (this is most plugins!) are not loaded until you restart `napari`. Try restarting the viewer
and see whether this resolves your issue.

### Plugin options missing

If you've installed a plugin, restarted `napari`, and some of the plugin's options are missing e.g. there is no `Tools`
menu or you're trying to save layers and can't find the plugin in the listed writers, you might have an auto-converted
plugin using the deprecated `npe1` engine.

Try turning off the `Use npe2 adaptor` setting under `Preferences -> Plugins -> Use npe2 adaptor` and restarting napari.
This setting will be removed in version `0.7.0` of napari, so reach out to the plugin developer to update their plugin.

Learn more about this in the [adapted plugin guide](adapted-plugin-guide).

### Resetting preferences and settings

Changing napari versions—updating or downgrading—within an environment can cause issues with settings. These issues can
manifest as napari failing to start.

Likewise, issues with napari on multiple monitors or with window sizes are also due to settings. These issues can
frequently be solved by resetting the settings back to default using the terminal command:

```bash
napari --reset
```

### torch + rosetta + napari crashes Python

In some cases, when using napari on Mac M1 using Rosetta you may experience crashing when adding layers or using a script.
If you observe this, you should run napari using the native arm64 Python interpreter (see [napari#7259](https://github.com/napari/napari/issues/7259).

### "module napari has no attribute Viewer"

This may happen when doing an editable install on top of a normal one, or when you have a local file called `napari.py`.

To fix this, either rename the file or remove all previous napari versions in your environment before installing the editable version.

### My image renders as all black/all white

This can happen when the contrast limits are not set correctly. You can reset the contrast limits by right-clicking
"contrast limits", then clicking the "Reset" button in the advanced contrast limits widget shown.

See [](contrast-limits) for more information on contrast limits.

### PermissionError when trying to launch napari on Windows

If you have a PermissionError when trying to launch napari on Windows, it could be due to how numba deals with
permissions. Try setting `NUMBA_CACHE_DIR` to an user-accessible location.

See [napari#7288](https://github.com/napari/napari/issues/7288).

### Mixed napari installations

Since napari 0.6.2 we have added a check for the mix of [editable](https://setuptools.pypa.io/en/latest/userguide/development_mode.html) and non-editable napari installations in the same environment.
This occurs when you install napari using `pip install -e path/to/napari` while napari related files are still
present in the typical Python package installation directory (called `site-packages`).

Because of how importing in python works, two installations from even slightly different versions of napari
will often lead to a crash on startup or other unexpected behavior

If you meet an exception starting from `RuntimeError: Mix of local and non local installation detected.` you have two options:

1. Recreate your environment and install napari from scratch; this is the safest option.
   But you need to know which packages you need to install in your environment. You may use `pip freeze` to get the list of packages installed in your environment.
1. Remove the non-editable napari installation from your environment.
   In the exception message you will see the path to the non-editable installation.
   For example `Path to a napari directory: /home/czaki/.pyenv/versions/3.12.9/envs/napari_3.12/lib/python3.12/site-packages/napari.`
   You can fix the error by manually deleting the `napari` directory.
   In some rare situations this solution may not fix the environment,
   so you may need to recreate, as described in the first option.
