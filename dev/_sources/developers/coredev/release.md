(napari-release)=

# Release guide

This guide documents `napari`'s release process. Most required tools mentioned here are in https://github.com/napari/napari-release-tools

# Timeline

Currently, we are releasing a new napari version every 2-3 weeks. Release candidates are made available as a reasonableness check for 1-24h before the full release is published: since the release cadence is so high, any new bugs can be quickly rectified, and more quickly identified by making a full release.

When major API changes and deprecations happen, we will provide longer release candidate cycles to ensure proper testing by the community.

The latest release candidate can be installed with

`python -m pip install --pre napari`

# Release management
The release will be coordinated by a release manager whose responsibilities include the following.

## One week before release
- Look through currently open PRs and get a sense of what would be good to merge before the first release candidate. Set milestones appropriately;
- Ensure `conda-recipe/meta.yaml` in `napari/packaging` is up-to-date (e.g. `run` dependencies match `pyproject.toml` requirements);
- Create a zulip thread in [the release channel](https://napari.zulipchat.com/#narrow/stream/215289-release) letting people know the release candidate is coming and pointing out PRs that would be nice to merge before release.

At this stage, bug fixes and features that are close to landing should be prioritized. The release manager will follow up with PR authors, reviewing and merging as needed. New features should wait until after release.

## 1-2 days before release

- Add a header and highlights section to the [`additional notes`](https://github.com/napari/napari-release-tools/tree/main/additional_notes) folder for the given release. Use the [highlight label](https://github.com/napari/napari/pulls?q=sort%3Aupdated-desc+is%3Apr+is%3Aopen+label%3Ahighlight) for the relevant milestone to note which PRs to comment on.
- Generate release notes with the [`generate_release_notes.py` script from napari/napari-release-tools](https://github.com/napari/napari-release-tools/blob/main/generate_release_notes.py);
- make a PR with the release notes, making sure to add the new document to the [napari/docs table of contents file](https://github.com/napari/docs/blob/main/docs/_toc.yml). See an example of such a PR: [https://github.com/napari/docs/pull/485](https://github.com/napari/docs/pull/485)

At this point the release manager should ideally be the only person merging PRs on the repo for the next few days before the release.

## 1-0 days before release

- Merge any remaining PRs and update release notes accordingly;
- Merge release notes;
- Make the release candidate and announce on zulip;
- Announce to release stream on zulip that the first release candidate is available for testing.

## The day of release
- Make sure final rc has been tested;
- Ensure all PRs have been added to release notes;
- Make sure docs are correctly deployed;
- Make release and announce on zulip.

# Release process

Additional `release` dependencies (`python -m pip install -e .[release]`, from the `napari/napari` root folder) are required to complete the release process.

> [`MANIFEST.in`](https://github.com/napari/napari/blob/main/MANIFEST.in) determines which non-Python files are included.
> Make sure to check that all necessary ones are listed before beginning the release process.

The `napari/napari` repository must have a PyPI API token as a GitHub secret.
This likely has been done already, but if it has not, follow
[this guide](https://pypi.org/help/#apitoken) to gain a token and
[this guide](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
to add it as a secret.

## Determining the version

The version of `napari` is automatically determined at install time by
[`setuptools_scm`](https://github.com/pypa/setuptools_scm) from the latest
[`git` tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) beginning with
`v`. Thus, you'll need to tag the
[reference](https://git-scm.com/book/en/v2/Git-Internals-Git-References) with
the new version number. It is likely something like `X.Y.Z`. Before making a
release though we need to generate the release notes.

## Generating release notes

1. Grab the `generate_release_notes.py` script from the
   [napari/napari-release-tools](https://github.com/napari/napari-release-tools)
   repo. Make a list of merges, contributors, and reviewers by running
   ``python generate_release_notes.py -h`` and following that file's usage.
   For each release generate the list to include everything since the last release for which there
   are release notes (which should just be the last release). To substitute GitHub handles for author names, use the `--correction-file` option.

   For example, to create release notes for the `0.5.4` release, use:

   ```bash
   python generate_release_notes.py 0.5.4 --target-directory=/path/to/docs/release/ --correction-file /path/to/name_corrections.yaml
   ```
   See [name_corrections.yaml](https://github.com/napari/napari-release-tools/blob/main/name_corrections.yaml).

2. Scan the PR titles for highlights, deprecations, API changes,
   and bugfixes, and mention these in the relevant sections of the notes.
   Try to present the information in an expressive way by mentioning
   the affected functions, elaborating on the changes and their
   consequences. If possible, organize semantically close PRs in groups.

3. Make sure the file name is of the form ``doc/release/release_<major>_<minor>_<release>.md``.

4. Make and merge a PR with these release notes before moving onto the next steps.

## Update constraints files

`napari` uses a set of constraints files to prevent test failures due to dependency updates. This also allows for reproducible builds (see [](dev-installation)).
These constraints files need to be updated at least weekly on Monday, and may also be triggered manually by a maintainer. You can find these files at
[resources/constraints](https://github.com/napari/napari/tree/main/resources/constraints).

To get updated constraints for a PR, use `@napari-bot update constraints` in a PR comment, then follow the instruction added by the bot to the conversation.

````{admonition} Example
To update the docs constraints file, assuming you have the `napari/napari` repo and `napari/docs` repo cloned next to each other, you can install [uv](https://astral.sh/blog/uv) and run the following command from the root of the `napari` repo:

```bash
uv pip compile --python-version 3.11 --upgrade --output-file resources/constraints/constraints_py3.11_docs.txt pyproject.toml resources/constraints/version_denylist.txt resources/constraints/version_denylist_examples.txt ../docs/requirements.txt resources/constraints/pydantic_le_2.txt --extra pyqt5 --extra pyqt6 --extra pyside2 --extra pyside6_experimental --extra testing --extra testing_extra --extra optional
```
````

To see other examples, check out the [upgrade test constraints action](https://github.com/napari/napari/blob/main/.github/workflows/upgrade_test_constraints.yml).

## Tagging the new release candidate

First we will generate a release candidate, which will contain the letters `rc`.
Using release candidates allows us to test releases on PyPI without using up the actual
release number.

You can tag the current source code as a release candidate with:

```bash
git tag vX.Y.Zrc1 main
```

If the tag is meant for a previous version of main, simply reference the specific commit:

```bash
git tag vX.Y.Zrc1 abcde42
```

Note here how we are using `rc` for release candidate to create a version of our release we can test
before making the real release.

You can read more on tagging [here](https://git-scm.com/book/en/v2/Git-Basics-Tagging).

## Testing the release candidate

Our CI automatically makes a release, copying the release notes to the tag and uploading the distribution to PyPI.
You can trigger this by pushing the new tag to `napari/napari`:

```bash
git push upstream --tags
```

The release candidate can then be tested with

```bash
python -m pip install --pre napari
```

It is recommended that the release candidate is tested in a virtual environment in order to isolate dependencies.

If the release candidate is not what you want, make your changes and repeat the process from the beginning but
incrementing the number after `rc` on tag (e.g. `vX.Y.Zrc2`).

Once you are satisfied with the release candidate it is time to generate the actual release.

## Generating the actual release

To generate the actual release you will now repeat the processes above but now dropping the `rc`.
For example:

```bash
git tag vX.Y.Z main
git push upstream --tags
```

Once the new tag is pushed, the [`make_release.yml` workflow](https://github.com/napari/napari/blob/main/.github/workflows/make_release.yml) will be triggered, using the [PyPI Publish action](https://github.com/pypa/gh-action-pypi-publish) to publish the new napari version to PyPI using [Trusted Publishers](https://docs.pypi.org/trusted-publishers/).

## conda-forge packages

The packages on `conda-forge` are not controlled directly by our repositories.
Instead, they are governed by the `conda-forge/napari-feedstock` repository.
The essential actions are automated, but there are a few maintenance notes we need to have in mind.
For a more complete description of the napari packaging infrastructure, see {ref}`napari-packaging`.

### New releases

Once the PyPI release is available, the `conda-forge` bots will submit a PR to `conda-forge/napari-feedstock` within a few hours.
Merging that PR to `main` will trigger the `conda-forge` release.
Accounting for the build times and the CDN sync, this means that the `conda-forge` packages will be available 30-60 mins after the PR is merged.

Before merging, please pay special attention to these aspects:

- Version string has been correctly updated. The build number should have been reset to `0` now.
- The CI passes correctly. Do check the logs, especially the test section (search for `TEST START`).
- The `run` dependencies in `recipe/meta.yaml` match the runtime requirements of the PyPI release (listed in `pyproject.toml`).
  Watch for modified version constraints, as well as added or removed packages.
  Note that the `conda-forge` packages include some more dependencies for convenience,
  so you might need to check the `optional` sections in `pyproject.toml`.

```{note}
See these PRs for examples on previous conda-forge releases:
- [napari v0.4.16](https://github.com/conda-forge/napari-feedstock/pull/41)
- [napari v0.4.17](https://github.com/conda-forge/napari-feedstock/pull/42)
- [napari v0.5.3](https://github.com/conda-forge/napari-feedstock/pull/68)
```

### Patch dependencies of previous releases

`conda-forge` offers a mechanism to patch the metadata of existing releases.
This is useful when a new dependency release breaks `napari` in some way or, in general,
when the metadata of an existing package is proven wrong after it has been released.

To amend the metadata, we need to:

* Encode the patch instructions as a PR to
  [`conda-forge/conda-forge-repodata-patches-feedstock`](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock):
  - Add the required changes to `recipe/gen_patch_json.py`, under the [`record_name == 'napari'` section](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock/blob/6aa624be7fe4e3627daea095c8d92b7379b3bb66/recipe/gen_patch_json.py#L1562).
  - Use a [timestamp condition](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock/blob/6aa624be7fe4e3627daea095c8d92b7379b3bb66/recipe/gen_patch_json.py#L1564) to ensure only existing releases are patched.
* If necessary, make sure the metadata is amended in the feedstock too.
  Usually this is not needed until a new release is made, but it's important to remember!

Some previous examples include:

- [Fix `vispy` dependencies](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock/pull/314)
- [Fix `pillow` dependencies](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock/pull/214)

### Broken packages

In some cases, a wrongly merged PR might cause the release of a broken artifact.
If this is not fixable with a metadata patch (see above), then the packages can be marked as broken.
To do so, we can submit a PR to `conda-forge/admin-requests`.

For more details, follow the instructions for
["Mark packages as broken on conda-forge"](https://github.com/conda-forge/admin-requests#mark-packages-as-broken-on-conda-forge).

Please make sure a correct build for the problematic release is available before (or shortly after) the `admin-requests` PR is merged!

## Post release: update the documentation

The [napari docs](https://napari.org) are versioned, meaning that each release has its own documentation, selected throught the version switcher dropdown. Once you tag a new version in the `napari/napari` repo, the [`build_and_deploy.yml` workflow](https://github.com/napari/docs/blob/main/.github/workflows/build_and_deploy.yml) will automatically create a new folder for this version number in the `gh-pages` branch of the `napari/napari.github.io` repo.

Next, you need to do the following:

1. In the `napari/napari.github.io` repo, update the `stable` symlink in the `gh-pages` branch to point to the new version. This can be done by running the following commands in the `napari/napari.github.io` repo:

```bash
git checkout gh-pages
rm stable
ln -s X.Y.Z stable
git add stable
git commit -m "Update stable symlink to X.Y.Z"
git push
```

2. In the `napari/docs` repo, update the [`docs/_static/version_switcher.json` file](https://github.com/napari/docs/blob/main/docs/_static/version_switcher.json) so that `stable` points to the right version. The active version switcher is read from the file in the `dev` folder, so this can be done as the last step in the process.

