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

# Tutorial template

Guided by this template, you will write a tutorial and contribute it to napari.org. 

```{note}
Not sure whether a tutorial is the best document, or how this template fits into our documentation? Check out our [documentation contributor's overview](./index.md)!
```

## What you'll learn
- What a tutorial is and how to structure it.
- The standard headings you'll need to include (What you'll learn, What you'll need, In practice and Further reading) and what to write for each of them.
- How to write a well formatted tutorial that follows our contribution guidelines.

## What you'll need
- This template, [Jupyter notebook](https://jupyter.org/index.html) and [Jupytext](https://jupytext.readthedocs.io/en/latest/index.html).
- A [GitHub](https://github.com) account
- A list of prerequisites the user will need to follow this tutorial e.g.
    - Python package requirements
    - napari plugins used
    - background/domain knowledge needed
    - what Python knowledge the user should have
        - try to be specific about the skills e.g. "familiarity with Pandas dataframes" or "understanding of napari `thread_workers`".
    - Links to existing content that can help e.g. [the viewer tutorial](???) or [napari hub](https://www.napari-hub.org/) plugin pages.
- **Links to sample data that can be used to follow this tutorial**
    
## Download this template
All napari tutorials are MyST markdown documents. This makes them easily executable as Jupyter notebooks. 
You can download this template as a Jupyter notebook file by clicking the button next to the title of this page. 
You can download as markdown (.md) if you already have Jupytext installed, or you can download as a notebook file and pair with Jupytext later. 
Use [this tutorial](./prepare_notebook_tutorial.md) to pair your notebook and learn about other useful tools like taking screenshots of the napari Viewer and hiding code cells.

## Fill out the standard headings
All our tutorials should follow the same structure to maintain cohesion across the website and make them easy to reference. Each tutorial needs to include the following sections.

### Title
The title of your tutorial (unlike this template) should start with "Learn to..." e.g. "Learn to perform a cell segmentation in napari".

### Tutorial header
Right underneath the title, you should have a sentence or two detailing what the user will do in this tutorial e.g. "Guided by this tutorial you will load an image of some cells into napari and perform a segmentation using a few of the plugins on the napari hub". 

Focus on the practical steps the user will take, rather than conceptual takeaways.

### What you'll learn
This section should be a set of bullet points highlighting the main lessons of the tutorial. 
While the header is focused on the concrete steps the user will take, this section focuses on the skills the user will learn that can help them in their other workflows.

### What you'll need
This is a list of prerequisites needed to follow this tutorial.
If a user ticks all the boxes on this list, they should be able to repeat your tutorial line by line.
Refer to this template's [what you'll need section](#what-you-ll-need) for examples.

### Your tutorial
After the "What you'll need" section, you should add your own headings to structure the content of your tutorial.

A tutorial is comprised of a repeatable set of concrete steps that take the user on a guided tour of how to achieve something. 
Each step should be detailed enough to be reproducible by those who meet the prerequisites you've outlined in "What you'll need". 
This means short explanations might be warranted to expand on the reasoning behind decisions being made e.g. 
"We use a Dask delayed function to open this volume as this will allow us to view slices without having to load the entire array into memory".

There might be caveats to the steps you're performing, or alternative options to achieve the same result. 
In general, you should not expand on these in the tutorial, but rather limit yourself to explanations necessary to produce the desired final result.

### In practice (optional)
Any finer details you may have avoided, caveats the user should be aware of or other approaches that could be taken should go in this section. Try to be brief and provide links for further reading below if you think more discussion is relevant.

### Further reading
This is a list of directions the user could go in after finishing this tutorial. Rather than just providing a link, try to write a sentence about the relevance of the content you're linking to the current tutorial.

## Prepare your notebook for submission
Follow this [how-to guide](./prepare_notebook_tutorial.md) to learn how to take screenshots of the Viewer, hide code cells and/or pair a notebook with Jupytext in preparation for submission to napari.org.

### Use the Google developers' style guide
This [style guide](https://developers.google.com/style/) should answer all your questions about when to italicise and when to bold, which
words to capitalize in your headings (spoiler - we use sentence case for our headings) and other style conventions.

### Check your code runs
If you have code in your notebook, it should run from start to finish without errors if the user has met your prerequisites. 
It may be worth following your own instructions in a new environment to make sure you haven't missed anything!

### Preview your tutorial 

*Coming soon...*

## Submit your pull request
Once you're happy with your tutorial and have prepared your MyST markdown document, you should submit a pull request to [napari's base repository](https://github.com/napari/napari). 
Place your tutorial in `napari/docs/tutorials/`. If you're not familiar with Git, you can use our ["Git-free" how-to guide](./how_to_submit_pr_online) to open your pull request.

## Further reading
- For more information on the difference types of documentation we have on napari.org, check out our [overview document](???) or the [Diátaxis framework](https://diataxis.fr/) on which our documentation is based.
- To see an example of a napari tutorial using this template see [the preparing your notebook tutorial](./prepare_notebook_tutorial.md)

