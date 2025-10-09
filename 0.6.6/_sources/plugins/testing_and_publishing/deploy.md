(plugin-deploy)=
# Publish your plugin

## Preparing for release

To help users find your plugin, make sure to use the `Framework :: napari`
[classifier] in your package's core metadata. (If you used the napari plugin
template, this has already been done for you.)

Once your package is listed on [PyPI] (and includes the `Framework :: napari`
[classifier]), it will also be visible on the [napari
hub](https://napari-hub.org/). To ensure you are providing the relevant metadata and
description for your plugin, see the following documentation in the [napari hub
wiki](https://github.com/chanzuckerberg/napari-hub/wiki/Plugin-Developer's-Guide-to-the-napari-hub):

- [Customizing your plugin’s
  listing](https://github.com/chanzuckerberg/napari-hub/wiki/Customizing-your-plugin's-listing)
- [Writing the perfect description for your
  plugin](https://github.com/chanzuckerberg/napari-hub/wiki/Writing-the-Perfect-Description-for-your-Plugin)

```{admonition} The hub
For more about the napari hub, see the [napari hub About
page](https://www.napari-hub.org/about). To learn more about the hub’s
development process, see the [napari hub GitHub’s
Wiki](https://github.com/chanzuckerberg/napari-hub/wiki).

If you want your plugin to be available on PyPI, but not visible on the napari
hub, add a `visibility` flag to your plugin manifest. For more details, see the 
[manifest reference](plugin-manifest) and napari hub [customization
guide][hub-guide-custom-viz].
```

## Deployment

When you are ready to share your plugin, [upload the Python package to
PyPI][pypi-upload] after which it will be installable using `python -m pip install
<yourpackage>`, or (assuming you added the `Framework :: napari` classifier)
in the builtin plugin installer dialog.

If you used the {ref}`napari-plugin-template`, you can also
[setup automated deployments][autodeploy] on GitHub for every tagged commit.

```{admonition} conda-forge
:class: attention

You can also deploy your plugin to conda-forge. Check out [deploying to conda-forge](deploying-to-conda-forge) for more
details on how to do that.
```

The [napari-plugin-manager](https://napari.org/napari-plugin-manager/) can be used to install plugins deployed to both
PyPI and conda-forge.

When you are ready for users, announce your plugin on the [Image.sc
forum](https://forum.image.sc/tag/napari).


[classifier]: https://pypi.org/classifiers/
[pypi]: https://pypi.org/
[pypi-upload]: https://packaging.python.org/en/latest/tutorials/packaging-projects/#uploading-the-distribution-archives
[hubguide]: https://github.com/chanzuckerberg/napari-hub/blob/main/docs/customizing-plugin-listing.md
[hub-guide-custom-viz]: https://github.com/chanzuckerberg/napari-hub/wiki/Customizing-your-plugin's-listing#visibility
[autodeploy]: https://github.com/napari/napari-plugin-template#set-up-automatic-deployments
