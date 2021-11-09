---
jupytext:
  formats: ipynb,md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.10.3
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: python3
theme:
  intro: This page provides an overview of napari.org's documentation types and how to submit new documentation.
---

# Documentation Contributor's Overview

As the napari project grows, so does the need for well organized documentation that's easy to find, read and reference. 
Our community keeps growing too, and we want to support all napari contributors (and users!) to submit documentation if they feel something is missing, or if they want to show off a cool new application of napari.
With this many cooks in the kitchen though, it can be hard to achieve cohesive results.

To keep our documentation consistent and easy to reference, we've organized our documents using the [Diátaxis Framework](https://diataxis.fr/). To make it easy for you to contribute new documentation, we've provided templates for our how-tos and tutorials, and written a few guides to help you prepare your document for submission and open a pull request - even if you're not familiar with Git!

The rest of this document details the different document types you might want to contribute (as well as how to pick among them), the how-to and tutorial templates, preparing your notebook for submission and opening a pull request to the main napari repository.

## Document types
napari's documentation is based on the [Diátaxis Framework](https://diataxis.fr/) and consists of four main types of documents, each with their own section on the website.

![Diátaxis framework placing tutorials, how-to guides, explanations and references on a two axis diagram](https://diataxis.fr/_images/diataxis.png)

**Tutorials** are a contained lesson designed to help the user achieve understanding of a concept, feature, workflow or process through practice. They should be composed of a set of concrete, sequential steps that guide the user towards a clearly defined result. Typically, tutorials are sufficiently detailed to provide a basis for further learning without getting too tangled in explanations, and are aimed at users who don't necessarily know what they want to do and what's available to them.

**How-tos** are also concrete steps that help the user to achieve a defined result. Unlike tutorials, users following a how-to already know *what* they want to achieve, they're just not sure how to do it. How-tos should list steps with only the minimal detail required to repeat them.

**Explanations** focus on theoretical and concept understanding. They are inevitably more in depth than both tutorials and how-tos, and open up the floor for discussion.

### Picking your document

New documentation might be useful when we develop a new viewer or layer interaction, add an entirely new feature to napari's API, change the way things are built under the hood or use napari for a novel application.

Where possible, small new features or interactions with layers or the viewer itself should be added to the existing tutorials and how-tos to make sure they are discoverable. 
For example, auto-scaling contrast limits on a layer should be documented in the Viewer tutorial. 
If a feature is fairly complex it might warrant its own document, e.g. hooking up your own callbacks to layer events or performance monitoring your Python scripts.

To pick your document, you should consider how much detail you want to communicate and to whom. 
For example "I want to document how this feature has been built for future developers, so that it's easy to maintain" - this sounds like you're wanting to communicate complex, in-depth information for developers, and would require an explanation style document. 
"I want users to know how to toggle the theme" is a set of very quick steps for users who know what they want - to change the theme, so this should be a how-to. 
"I want to give biologists an overview of how to perform segmentation in napari" is a broader lesson that may require some explanations for users and pointing out a variety of features, so a tutorial would be suitable. 
Of course, you might want to write more than one document depending on who you're targetting and what information you think is relevant.


## Documentation templates

Our goal is that all tutorials and how-tos are easily downloadable and executable by our users. 
This helps ensure that they are reproducible and makes them easier to maintain. 
[Jupyter notebooks](https://jupyter.org/) are a great option for our documents, because they allow you to easily combine code and well formatted text in markdown. 
However, their [raw JSON format](https://numpy.org/numpy-tutorials/content/pairing.html#background) is not great for version control, so we use [MyST Markdown](https://myst-parser.readthedocs.io/en/latest/) documents in our repository and on napari.org. 

Our documentation templates therefore are MyST markdown documents. 
You can download them as `.md` files and open them directly in Jupyter notebook. 
Our notebooks also use some handy utilities to hide code cells and produce screenshots of the napari viewer. 
Everything you need to know about MyST markdown files, pairing Jupyter notebooks with Jupytext, and preparing your notebook for submission is in [this guide](./prepare_notebook_tutorial.md).

[How-to template](./how_to_template.md)

[Tutorial template](./tutorial_template.md)

## Submitting your Pull Request

Once you have written and prepared your document, it's time to open a pull request to [napari's main repository](https://github.com/napari/napari) to contribute it to our codebase. 
If you're not familiar with Git or pull requests, follow [this how-to](./how_to_submit_pr_online.md) to open your pull request online through GitHub. 
If you already know how to submit pull requests but aren't sure where to put your document, here are the folder paths:

- **Explanations** are in `napari/docs/guides/`
- **Tutorials** are in `napari/docs/tutorials/`
- **How-tos** are in `napari/docs/howtos/`

