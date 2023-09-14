# Documentation and website deployment

```{note}
This guide is intended for napari core contributors and is not required reading
for regular contributors. If you're looking for information on how to contribute
to the documentation, see [](docs_contributing_guide).
```

The napari documentation and website sources are spread over three repositories,
and these are connected and used to generate the documentation and website
through several CI workflows detailed below.

1. [`napari/napari`](https://github.com/napari/napari)
    - **Workflow file:** [`build_docs.yml`](https://github.com/napari/napari/blob/main/.github/workflows/build_docs.yml)
        - **job:** `build-and-upload`
        - Pulls in sources from `napari/docs` and builds docs locally. Uploads
          artifacts to this repo (`napari/napari`).
        - This is triggered on every Pull Request and shows up as a "Build PR
          Docs" check on the PR.
    - **Workflow file:** [`deploy_docs.yml`](https://github.com/napari/napari/blob/main/.github/workflows/deploy_docs.yml)
        - **job:** `build-and-deploy`
        - Triggers [`deploy_docs.yml`](https://github.com/napari/docs/blob/main/.github/workflows/deploy_docs.yml)
          workflow at the [napari/docs](https://github.com/napari/docs) repo.
          Waits for results and reports it.
        - This is triggered on any commit to the `main` branch on
          `napari/napari` (and consequently triggers a new deployment of the
          `napari.org` website.)

2. [`napari/docs`](https://github.com/napari/docs)
    - **Workflow file:** [`build_docs.yml`](https://github.com/napari/docs/blob/main/.github/workflows/build_docs.yml)
        - **job:** `build-and-upload`
        - Pulls in sources from `napari/napari` and builds docs locally. Uploads
          artifacts to this repo (`napari/docs`).
        - This is triggered on every Pull Request and shows up as a "Build PR
          Docs" check on the PR.
    - **Workflow file:** [`deploy_docs.yml`](https://github.com/napari/docs/blob/main/.github/workflows/deploy_docs.yml)
        - **job:** `build-and-deploy`
        - Builds docs locally and deploys resulting artifacts to GitHub pages at
          the `gh-pages` branch of [napari/napari.github.io](https://github.com/napari/napari.github.io/tree/gh-pages).
        - Always deploys to the `dev/` folder on `napari.github.io` (version
          "latest" on the website).
        - This is triggered on any commit to the `main` branch on `napari/docs`
          (and consequently triggers a new deployment of the `napari.org`
          website.)

    Note that these file are not identical to the `napari/napari` versions.

3. [`napari/napari.github.io`](https://github.com/napari/napari.github.io)
    - Contains built documentation files (.html) for all versions in the
      `gh-pages` branch. Auto-deploys to `gh-pages` on every commit (which in
      turn happens on every commit to the `main` branches of either
      `napari/napari` or `napari/docs`).

## Notes

CircleCI is set up in both `napari/napari` and `napari/docs`, but doesn't deploy
documentation. It serves to test the docs build and to provide documentation
previews for PRs. The relevant configuration files are:

- On `napari/napari`:
  - [`.circleci/config.yml`](https://github.com/napari/napari/blob/main/.circleci/config.yml): builds documentation and stores artifact in the CircleCI platform
  - [`.github/workflows/circleci.yml`](https://github.com/napari/napari/blob/main/.github/workflows/circleci.yml): adds a link to the documentation preview to each PR.

- On `napari/docs`:
  - [`.circleci/config.yml`](https://github.com/napari/docs/blob/main/.circleci/config.yml): builds documentation and stores artifact in the CircleCI platform
  - [`.github/workflows/circleci.yml`](https://github.com/napari/docs/blob/main/.github/workflows/circleci.yml): adds a link to the documentation preview to each PR.
