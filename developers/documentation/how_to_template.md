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
---

# How-to template

This template will guide you to write a well formatted how-to and prepare it for contribution to napari.org.

```{note}
Not sure whether a how-to is the best document, or how this template fits into our documentation? Check out our [documentation contributor's overview](./index.md)!
```

## Prerequisites

- this template (download it using [this link](???))
- [Jupyter notebook](https://jupyter.org/index.html) and [Jupytext](https://jupytext.readthedocs.io/en/latest/index.html)
- A [GitHub](https://github.com) account
- a list of what the user needs to prepare to be ready to start this how-to guide 
- links to any existing napari.org tutorials or how-to guides that can help the user fulfill these prerequisites
- the level of python/napari knowledge required to follow this how-to
    - try to be specific about what skills are needed e.g. 
    'connecting callbacks to layer events' or 'using matplotlib to produce plots'
- plugins that should be installed
- python packages that should be installed (don't list napari or its dependencies)

## Open this template in Jupyter notebook
This template isn't just plain markdown! It's MyST Markdown, which means you can open it directly in Jupyter notebook and start writing your content and/or code. If you have an existing notebook you'd like to convert to a How-to, or the words MyST Markdown mean nothing to you, check out [our tutorial](./contributing_pairing_notebooks.md) on pairing notebooks with MyST markdown using Jupytext.

## Fill out the standard headings
Each "How-to" needs to contain the following sections.

### Title
Unlike this template, your title should start with "How to..." and describe exactly what the user will do e.g. "How to translate a layer" or "How to change the contrast limits of a layer".

### Headline sentence
A  sentence or short paragraph underneath the title describing what the user will achieve after following your how-to.

### Prerequisites section
This section details everything the user needs to do before they can start. Use this template's [prerequisites section](#prerequisites) as a guide for what to include.

### Your how-to steps
Headings in this section are yours to decide on. You should split your how-to guide into easy to follow, sequential steps to achieve the stated goal. Remember that your how-to may be used as a reference, so your headings should be descriptive and allow users to get a quick overview of the document, and which steps are relevant to them.

```{note} 
A how-to is a step by step guide designed to answer a specific "How do I..." question. This means the user already knows **what** they want to do, just not how. A how-to does not explain concepts or engage in discussion, and should prioritise practical usability, so try to make your steps clear and succinct.
```

### Further reading
How-tos are designed to be brief, and to the point. If you felt robbed of your chance to provide explanations, this is your opportunity to link out to useful references or discussions. You should also link to any relevant napari.org how-tos, tutorials or examples that can help the user learn more about the topic.

You may want to fill out this section last.


## Write your how-to steps
Fill out the main section of the document - your how-to steps. Check out our [Preparing your notebook](./contributing_pairing_notebooks.md) tutorial for details on including screenshots of the napari viewer, hiding notebook cells and pairing your notebook with Jupytext.


### Include pictures

You should include pictures/videos, particularly when describing interactions with the viewer. If an action can be performed both through the viewer and through code, you should include both options. Keep accessibility in mind when adding images. Each image should be
accompanied by complete and descriptive alt-text. If you're using arrows/circles to highlight portions of the image, make sure
they contrast well against the background of the image.

### Use the Google developer's style guide

This [style guide](https://developers.google.com/style/) should answer all your questions about when to italicise and when to bold, which
words to capitalize in your headings (spoiler - we use sentence case for our headings) and other style conventions.

## Check that your notebook runs

If your guide contains any code the user is expected to run, make sure that the notebook can be executed from start to finish without requiring any data or packages that you haven't listed in the prerequisites.

## Preview your guide 

*Coming soon*

## Open your pull request

Once you're happy with your how-to, you should place this document under `napari/docs/how-tos` and open a pull request to [napari's repository](https://github.com/napari/napari). 

If you've never opened a pull request before but are familiar with Git check out [GitHub's docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) to get you started.

If you're not familiar with Git and would like to open your pull request online, check out our [How-to open a pull request in GitHub](./how_to_submit_pr_online.md) guide.


## Further Reading

- The [Diátaxis Framework](https://diataxis.fr/) is the basis for how we are organising our documentation. You can read an overview of our documentation process [here](./index.md)
- This [Divio document](https://documentation.divio.com/how-to-guides/) explains how-to guides in more detail
- To see an example how-to guide using this template, check out our [installation guide](???) or our [GitHub pull request guide](./how_to_submit_pr_online.md)
