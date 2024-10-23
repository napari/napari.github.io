(napari-packaging)=

# Packaging

Once a release is cut, napari is distributed in two main ways:

* Packages: both to [PyPI][20] and [conda-forge][21].
* Installers: bundles that include napari plus its runtime dependencies in a step-by-step
  executable.

## Packages

Despite its numerous dependencies, `napari` itself is a regular Python project that can be packaged using established workflows.

### PyPI packages

Creating and submitting the packages to PyPI (the repository you query when you do `pip install`) is handled in the [`make_release.yml`][2] workflow.
Creation is handled with `make dist` (as specified in our [`Makefile`][3]) and submission is done using the [official PyPA GitHub Action][4].
This workflow will also create a GitHub release. See {doc}`release` for more details.

### conda-forge packages

Once the Python package makes it to PyPI, it will be picked up by the `conda-forge` bots.
The bots will automatically submit a PR to the [`napari-feedstock`][1] repository within a few hours.
This is all automated by the `conda-forge` infrastructure (see [previous examples][16]).
We only need to check that the metadata in the recipe has been adjusted for the new release.
Pay special attention to the runtime dependencies and version strings!

> We keep a copy of the feedstock's recipe in the `napari/packaging` repo, which is updated manually whenever a change to `pyproject.toml` is detected.
> Check the file `conda-recipe/meta.yaml` and make sure its `outputs` contents are synced to the `napari-feedstock` copy.

Once the conda-forge CI is passing and the PR is approved and merged, the final packages will be built on the default branch and uploaded to the `conda-forge` channel.
Due to the staging steps and CDN synchronization delays, the conda packages can take up to 1h to be available after the merge.

```{note}
Check {doc}`release` for more details about the conda-forge release process and maintenance tasks.
```

#### conda packaging split

We provide three different outputs in the conda package recipe:

- `napari-base`: This is the package that ships the actual source and data. The runtime
  requirements only include the basic functionality. This package is recommended as a
  dependency for plugins and other projects. Most end users will prefer the `napari`
  package, below, but this one may be useful for those wanting a more minimal
  environment.
- `napari`: This output is what most users want. It depends on `napari-base`, and adds optional yet
  recommended dependencies for (performant) GUI usage, like the plugin manager or numba. Note that
  the Qt backend is _not_ included.
- `napari-menu`: Depends on `napari`, and ships the menuinst JSON file, in case you want a desktop
  shortcut to start the application easily. This is included as part of the bundled installers for
  convenience.

### conda packages in the `napari` channel

The `napari` project also has a `napari` channel in anaconda.org.
We mainly use it to provide:

- Nightlies built off of `main`, uploaded to the `napari/label/nightly` channel.
- Release candidates, uploaded to `napari/label/rc`.

```{note}
The `napari` channel happens to contain the final releases too.
However, these are not meant to be used by end users, who should use `conda-forge`.
The releases uploaded to our channel are the same ones we use to build our `constructor` installers (see below).
Otherwise, we would have to wait for the `conda-forge` PR, which is only triggered by the PyPI release.
That means we would not be able to create the installers in the same tagging event.
```

To do it in a `conda-forge` compatible way, we clone `napari-feedstock` and patch the `source` instructions to use the code from the repository branch.
The version is also patched to match the `setuptools-scm` string.
After [re-rendering][8] the feedstock, we run `conda-build` in the same way `conda-forge` would do and upload the resulting tarballs to our [Anaconda.org channel][17].

Additionally, the tarballs are also passed as artifacts to the next stage in the pipeline: building the `constructor` installers (more below).

## Installers

Once the packages have been built and uploaded to their corresponding repositories,
we can bundle them along with their dependencies in a single executable that end users can run to install napari on their systems,
with no prior knowledge of `pip`, `conda`, virtual environments, command line prompts or anything.

A software installer is usually expected to fulfill these requirements:

* It will install the application so it can be run immediately after.
* It will provide a convenient way of opening the application, like a shortcut or a menu entry.
* It will allow the user to uninstall the application, leaving no artifacts behind.

We use `constructor` to build the bundled installers, which takes `conda` packages.
`conda` packages offer several advantages when it comes to bundling dependencies, since it makes very few assumptions about the underlying system installation.
As a result, `constructor` bundles include libraries that might be missing in the target system and hence should provide a more robust user experience.

The automation is implemented in the `.github/workflows/make_bundle_conda.yml` workflow, which only
specifies the triggers used to call the actual workflow implementation under the `napari/packaging`
repository. This repository stores all the logic and files needed to create the nightly `conda`
packages and the `constructor` installers.

[`constructor`][6] allows you to build cross-platform installers out of `conda` packages.
It supports the following installer types:

* On Linux, a shell-based installer is generated; users can execute it with `bash installer.sh`.
* On macOS, you can generate both PKG and shell-based installers.
  PKG files are graphical installers native to macOS, so that's the method we use with napari.
* On Windows, a graphical installer based on [NSIS][19] is generated.

The configuration is done through a `construct.yaml` file, documented [here][7].
We generate one on the fly in the `build_installers.py` script found in `napari/packaging`.
For a hypothetical napari v1.2.3 we would have built this configuration file:


```yaml
# os-agnostic configuration
name: napari
version: "0.0.1"  # this is the _internal_ version of the installer infrastructure
company: Napari
license: EULA.md
channels:
  # - local  # only in certain situations, like nightly installers where we build napari locally
  - conda-forge
specs: # specs for the 'base'  environment
  - python   # pinned to the version of the running interpreter, configured in the CI
  - conda    # we add these to manage different napari versions
  - mamba    # we add these to manage different napari versions
  - pip      # we add these to manage different napari versions
extra_envs:
  napari-1.2.3: # this is the environment that will actually contain the napari packages
    specs:
      - napari=1.2.3
      - napari-menu=1.2.3
      - python   # pinned to a specific version, configured by CI
      - pyside2  # pinned to a specific version, configured by CI
      - conda    # needed for the plugin manager
      - mamba    # needed for the plugin manager
      - pip      # needed for the plugin manager
menu_packages:
  - napari-menu  # don't create shortcuts for anything else in the environment

# linux-specific config
default_prefix: $HOME/napari-1.2.3  # default installation path

# macos-specific config
default_location_pkg : Library # first component of the default path under ~/
pkg_name: napari-1.2.3  # second component of the default path
installer_type: pkg  # otherwise, defaults to sh (Linux-like)
welcome_image: resources/napari_1227x600.png  # bg image with the napari logo on bottom-left corner
welcome_file: resources/osx_pkg_welcome.rtf  # rendered text in the first screen
conclusion_text: ""  # set to an empty string to revert constructor customizations back to system's
readme_text: ""  # set to an empty string to revert constructor customizations back to system's
signing_identity_name: "Apple Developer ID: ..."  # Name of our installer signing certicate

# windows-specific config
welcome_image: resources/napari_164x314.png  # logo image for the first screen
header_image:  resources/napari_150x57.png  # logo image (top left) for the rest of the installer
icon_image: napari/resources/icon.ico  # favicon for the taskbar and title bar
default_prefix: '%USERPROFILE%/napari-1.2.3'  # default location for user installs
default_prefix_domain_user: '%LOCALAPPDATA%/napari-1.2.3'  # default location for network installs
default_prefix_all_users: '%ALLUSERSPROFILE%/napari-1.2.3'  # default location for admin installs
signing_certificate: certificate.pfx  # path to signing certificate
```

The main OS-agnostic keys are:

* `channels`: where the packages will be downloaded from.
  We mainly rely on `conda-forge` for this, where `napari` is published.
  In CI, we locally build our own (development) packages for `conda`, without resorting to `conda-forge`.
  To make use of those (which are eventually published to the [napari channel][17]),
  we unpack the GitHub Actions artifact in a specific location that `constructor` recognizes as a _local_ channel once indexed.
* {{ '`extra_envs> napari-NAPARI_VER`'.replace('NAPARI_VER', napari_version) }}: the environment that will actually contain the napari installation.
  In this key, you will find `specs`, which lists the conda packages to be installed in that environment.
  Constructor will perform a conda solve here to retrieve the needed dependencies.
* `menu_packages`: restrict which packages can create shortcuts.
  We only want the shortcuts provided by `napari-menu`, and not any that could come from the (many) dependencies of napari.

Then, depending on the operating systems and the installer format, we customize the configuration a bit more.

The bundled Python version in the installers follows the Python version installed in the CI
`make_bundle_conda.yml` workflow at `napari/packaging`. Update the CI matrix configuration to bump
the bundled Python. We use the oldest version supported by the [SPEC-0][SPEC0] recommendations.

#### Default installation path

This depends on each OS. Our general strategy is to put the general installation under
`~/<hidden>/napari-<VERSION>`, which will eventually contain the napari installations under
`envs/`, with environments named as `napari-<VERSION>`. However, there are several constrains we
need to take into account to make this happen:

* On Windows, users can choose between an "Only me" and "All users" installation. This changes what
  we understand by "user directory". This is further complicated by the existence of "domain users",
  which are not guaranteed to have a user directory per se.
* On macOS, the PKG installer does not offer a lot of flexibility for this configuration. We will
  put it under `~/Library/napari-<VERSION>`, by default.

This means that if you install {{ napari_conda_version }} using the installer, the actual `napari` executable
can be found, by default, on the following locations:

* Linux: {{ '`~/.local/napari-NAPARI_VER/envs/napari-NAPARI_VER/bin/napari`'.replace('NAPARI_VER', napari_version) }}
* macOS: {{ '`~/Library/napari-NAPARI_VER/envs/napari-NAPARI_VER/bin/napari`'.replace('NAPARI_VER', napari_version) }}`
* Windows: {{ '`~/napari-NAPARI_VER/envs/napari-NAPARI_VER/Library/bin/napari`'.replace('NAPARI_VER', napari_version) }}

#### Branding

Graphical installers can be customized with logos and icons. These images are stored under the
`resources/` directory (outside the source), except for the square logos/icons (which
are stored under `napari/resources/` so the shortcuts can find them after the installation).

Some steps are also configured to display a custom text, like the license or the welcome
screen on macOS.

#### Signing

In order to avoid security warnings on the target platform, we need to sign the generated installer.

On macOS, once Apple's _Installer Certificate_ has been installed to a keychain and unlocked
for its use, you can have `constructor` handle the signing via `productsign` automatically.
However, this is not enough for a warning-free installation, since its contents need to be
_notarized_ and _stapled_ too. For this reason, `constructor` has been modified to also
`codesign` the bundled `_conda` executable (the binary provided by conda-standalone, see below) with the _Application Certificate_. Otherwise, notarization fails. After that, two actions take
care of notarizing and stapling the resulting PKG.

On Windows, any Microsoft-blessed certificate will do. `constructor` allows us to specify
a path to a PFX certificate and then have the Windows SDK `signtool` add the signature. Note that
`signtool` is not installed by default on Windows (but it is on GitHub Actions). Right now, we
simply reuse the Apple certificate just to sign the installer with _something_. Note that this
certificate is not recognized by Windows as a valid one, so users will still get the SmartScreen
warning. However, it will allow folks to check the signature metadata and see that it comes
from napari.

---

More details about our packaging infrastructure can be found in the [NAP-2 document][nap-2].

#### Details of the `constructor` stack

Generating a `conda`-based installer requires several components in place:

- `constructor` is the command-line tool that _builds_ the installer.
  - It depends on `conda` to solve the `specs` request.
  - It also requires a copy of `conda-standalone` (a PyInstaller-frozen version of `conda`) to be
   present at build time so it can be bundled in the installer. This is needed because that
   `conda-standalone` copy will handle the extraction, linking and shortcut creation when the user
   runs the installer on their machine.
- `menuinst` handles the creation of shortcuts / desktop menu entries across all platforms.
  - `conda` depends on this library to handle shortcuts when packages are installed.
  - `constructor` delegates the shortcut creation to `conda-standalone`'s `menuinst` bundled copy
    at _installation time_.
    - For performance reasons, uninstalling the shortcut is done via a [bundled script][22]
      that calls `menuinst` directly.


<!-- hyperlinks -->

[1]: https://github.com/conda-forge/napari-feedstock
[2]: https://github.com/napari/napari/blob/main/.github/workflows/make_release.yml
[3]: https://github.com/napari/napari/blob/main/Makefile#L20
[4]: https://github.com/pypa/gh-action-pypi-publish
[6]: https://github.com/conda/constructor
[7]: https://conda.github.io/constructor/construct-yaml/
[8]: https://conda-forge.org/docs/maintainer/updating_pkgs/#rerendering-feedstocks
[16]: https://github.com/conda-forge/napari-feedstock/pulls?q=is%3Apr+sort%3Aupdated-desc+is%3Aclosed
[17]: https://anaconda.org/napari
[19]: https://nsis.sourceforge.io/Main_Page
[20]: https://pypi.org/project/napari
[21]: https://anaconda.org/conda-forge/napari
[22]: https://github.com/conda/constructor/blob/764ba8a/constructor/nsis/_nsis.py
[nap-2]: https://napari.org/dev/naps/2-conda-based-packaging.html
[SPEC0]: https://scientific-python.org/specs/spec-0000/
