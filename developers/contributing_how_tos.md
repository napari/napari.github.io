---
jupytext:
  formats: ipynb,md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.13.0
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: python3
---

# How to contribute a napari How-To

This should be a sentence (or brief paragraph) about what the reader will achieve after following this
how-to and how it helps address a common problem/task/need.

## Prerequisites

- this template
- a list of what the user needs to prepare to be ready to start this how-to guide 
- links to any existing napari.org tutorials or how-to guides that can help the user fulfill these prerequisites
- the level of python/napari knowledge required to follow this how-to
    - try to be specific about what skills are needed e.g. 
    'connecting callbacks to layer events' or 'using matplotlib to produce plots'
- plugins that should be installed
- python packages that should be installed (don't list napari dependencies)

## How-to steps

Headings in this section are yours to decide on. You should split your how-to guide into easy to follow, sequential steps to achieve the stated goal. Remember that your how-to may be used as a reference, so your headings should be descriptive and allow users to get a quick overview of the document, and which steps are relevant to them.

## Executable documentation

napari's goal is that every how-to, tutorial or explanation should be executable. That's why this template isn't just plain markdown! It's MyST Markdown, which means you can open this directly in Jupyter notebook and start writing your code. If you have an existing notebook you'd like to convert to a How-to, or the words MyST Markdown mean nothing to you, check out [our tutorial](./contributing_pairing_notebooks.md) for adding viewer screenshots, hiding notebook cells and pairing your notebook with Jupytext (this is where MyST Markdown comes in).

## How-to vs. tutorial

A how-to is a step by step guide designed to answer a specific "How do I..." question. This means the user already knows **what** they want to do, just not how. A how-to does not explain concepts or engage in discussion, and should prioritise practical usability.

## Include pictures

You should include pictures/videos, particularly when describing interactions with the viewer. If an action can be performed both through the viewer and through code, you should include both options. Keep accessibility in mind when adding images. Each image should be
accompanied by complete and descriptive alt-text. If you're using arrows/circles to highlight portions of the image, make sure
they contrast well against the background of the image.

## Use the Google developer's style guide

This [style guide](https://developers.google.com/style/) should answer all your questions about when to italicise and when to bold, which
words to capitalize in your headings (spoiler - we use sentence case for our headings) and other style conventions.

## Where does this how-to go?

Once you've written your how-to, you should place this document under `how_tos/` and open a PR in the [napari.github.io](https://github.com/napari/napari.github.io) repository.

## Further Reading

If you felt robbed of your chance to provide explanations, this is your opportunity to link out to useful references or discussions. You should also link to any relevant napari.org how-tos, tutorials or examples that can help the user learn more about the topic.

- The [Diátaxis Framework](https://diataxis.fr/) is the basis for how we are organising our documentation
- This [Divio document](https://documentation.divio.com/how-to-guides/) explains how-to guides in more detail
