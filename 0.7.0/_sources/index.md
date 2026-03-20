---
html_theme.sidebar_secondary.remove: true
theme:
  metaDescription: napari is a fast multi-dimensional image viewer for Python. It can help you **explore** any image-like data, be it 2D, 3D, or even higher-dimensional. It can also help you **overlay** downstream or **associated data**, such as point coordinates or segmentations, which you can use to **annotate** and **proofread** your image data.
  quickLinks:
    - title: Community
      content: Meet the team, our mission, and our values
      url: /community/index.html

    - title: Tutorials
      content: Step by step guides for common napari workflows
      url: /tutorials/index.html

    - title: Plugins
      content: Learn how to create a plugin that works with the napari ecosystem
      url: /plugins/index.html

    - title: Release notes
      content: See what’s been updated in the latest releases
      url: /release/index.html

    - title: API reference
      content: Information on specific functions, classes, and methods
      url: /api/index.html

    - title: Roadmaps
      content: Find out what we plan to build next and into the near future
      url: /roadmaps/index.html

    - title: Developer guides
      content: Explanations about how napari works behind the screen
      url: /guides/index.html

    - title: Developer resources
      content: All you need to know to contribute to the napari codebase
      url: /developers/index.html

    - title: Source code
      content: Jump out to GitHub to take a look at the code that runs napari
      url: https://github.com/napari/napari

    - title: napari hub
      content: Discover, install, and share napari plugins
      url: https://www.napari-hub.org
---

# napari: a fast, interactive viewer for multi-dimensional images in Python

`````{grid} 1 1 2 2

````{grid-item}
:columns: 12 12 5 5

- **view and explore** 2D, 3D, and higher-dimensional arrays on a canvas;
- **overlay** derived data such as *points*, *polygons*, *segmentations*, and
  more;
- **annotate** and **edit** derived datasets, using standard data structures
  such as NumPy or Zarr arrays, allowing you to
- **seamlessly weave** exploration, computation, and annotation together in
  imaging data analysis.
````

````{grid-item}
:columns: 12 12 7 7

```{raw} html
<figure>

  <video width="100%" controls autoplay loop muted playsinline>
    <source src="_static/images/tribolium.webm" type="video/webm" />
    <source src="_static/images/tribolium.mp4" type="video/mp4" />
    <img src="_static/images/tribolium.jpg"
      title="your browser does not support the video tag"
      alt="napari viewer showing a 4D image of a developing Tribolium embryo.  Dataset Fluo-N3DL-TRIF from the [cell tracking challenge](http://celltrackingchallenge.net/3d-datasets/) by Dr. A. Jain, MPI-CBG, Dresden, Germany."
    >
  </video>

</figure>
```

````

`````

`````{grid} 1 2 2 4
:gutter: 3

````{grid-item-card} Install with Python
:link: install-python-package
:link-type: ref
:class-card: homepage-card-accent

Install napari in a Python environment for the most customizable experience.
````

````{grid-item-card} Download napari app
:link: installation_bundle_conda
:link-type: ref
:class-card: homepage-card-accent

A standalone installer for when you want napari without setting up Python first.
````

````{grid-item-card} Quick start
:link: napari-quick-start
:link-type: ref

Launch napari, open images, and learn the core interactions of the viewer.
````

````{grid-item-card} Plugins
:link: plugins-index
:link-type: ref

Discover how plugins extend napari and learn to build your own.
````

`````

```{raw} html
<div class="homepage-quicklinks">
  <a href="https://napari.zulipchat.com/"><i class="fa-solid fa-comments"></i><span>Community chat</span></a>
  <a href="community/meeting_schedule.html"><i class="fa-solid fa-calendar-days"></i><span>Calendar</span></a>
  <a href="release/index.html"><i class="fa-solid fa-newspaper"></i><span>Release notes</span></a>
  <a href="troubleshooting.html"><i class="fa-solid fa-circle-question"></i><span>Troubleshooting</span></a>
  <a href="roadmaps/index.html"><i class="fa-solid fa-map"></i><span>Roadmap</span></a>
  <a href="https://napari.org/island-dispatch"><i class="fa-solid fa-rss"></i><span>Blog</span></a>
</div>
```

```{raw} html
<section class="homepage-featured-example" aria-labelledby="homepage-featured-example-title">
  <div class="homepage-featured-example__copy">
    <h3 id="homepage-featured-example-title" class="homepage-featured-example__title">
      <a id="homepage-featured-example-link" href="gallery/add_image.html">Add image</a>
    </h3>
    <p id="homepage-featured-example-description" class="homepage-featured-example__description">
      Display an image in napari and explore the viewer with a minimal example.
    </p>
    <div class="homepage-featured-example__actions">
      <a class="sd-btn sd-btn-primary sd-shadow-sm" href="gallery.html">Examples gallery</a>
      <button class="sd-btn sd-btn-outline-primary sd-shadow-sm" id="homepage-featured-example-reroll" type="button">Show another example</button>
    </div>
  </div>
  <a class="homepage-featured-example__media" href="gallery/add_image.html" aria-label="View the featured napari example">
    <img
      id="homepage-featured-example-image"
      src="_images/sphx_glr_add_image_001.png"
      alt="Screenshot preview of the add image example"
      loading="lazy"
    >
  </a>
</section>
```

## funding

If you like napari and want to support our [mission](mission-and-values),
please consider a [donation](https://numfocus.org/donate-to-napari) to our
efforts.

napari is a fiscally sponsored project of [NumFOCUS], a US-based non-profit
supporting open science and open source scientific software.

We gratefully acknowledge funding support from the [Chan Zuckerberg
Initiative][czi] (CZI) and [NumFOCUS].

`````{grid} 1 1 3 3

````{grid-item-card}
:text-align: center
:class-body: d-flex align-items-center justify-content-center

[![CZI logo](_static/images/czi-logo.png)](https://chanzuckerberg.com)
````

````{grid-item-card}
:text-align: center
:class-body: d-flex align-items-center justify-content-center

[![NumFOCUS logo](_static/images/nf-logo.png)](https://numfocus.org)
````

````{grid-item-card} ADD YOUR LOGO HERE
:text-align: center
:class-body: d-flex align-items-center justify-content-center
:link: funding
:link-type: ref
````

`````

[czi]: https://chanzuckerberg.com
[numfocus]: https://numfocus.org
