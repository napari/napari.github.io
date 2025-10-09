(active-roadmap)=
# Napari Roadmap

Updated: **June 22, 2025**

## Project vision and foundation

[napari](https://napari.org/) is a fast, interactive, multi-dimensional image viewer for Python. It's designed for browsing, annotating, analyzing, and processing large multi-dimensional images.

napari has been adopted globally and across scientific disciplines. More information on downloads and project metrics can be found on [our dashboard](https://napari.org/weather-report).

### Vision

napari's vision is to make exploration, annotation, and analysis of
multidimensional image data seamless for both Python and non-Python
users alike.

### Founding principles

The napari team came together around a shared vision for a Python-based image viewer that:

* is n-dimensional first,

* native (no browser required),

* blazing fast (GPU-powered),

* layered, allowing easy visualisation of data in a common space, and

* provides native 2D and 3D views.

### Mission and purpose

napari aims to be the multi-dimensional image viewer for Python and to provide GUI access to a plugin ecosystem of image analysis tools for scientists to use in their daily work. We hope to accomplish this by:

* being easy to use and install. We are careful in taking on new dependencies, sometimes making them optional, and will support a fully packaged installation that works cross-platform.

* being well-documented with comprehensive tutorials and examples. All functions in our API have thorough docstrings clarifying expected inputs and outputs, and we maintain [tutorials and examples on our website](https://napari.org/) to explain different use cases and working modes.

* providing GUI access to all critical functionality so napari can be used by people with no coding experience.

* being interactive and highly performant in order to support very large data sets.

* providing a consistent and stable API to enable plugin developers to build on top of napari without their code constantly breaking and to enable advanced users to build out sophisticated Python workflows.

* ensuring scientific accuracy. We prioritise bug fixes and feature development that affect the scientific interpretation of the displayed data. For example, a bug in which point coordinates are offset by one pixel from the overlaid image coordinates is higher priority than one in which a UI button doesn’t work.

Our documentation provides more information about [napari's mission and values](https://napari.org/stable/community/mission_and_values.html).

## Roadmap strategy

### Approach and philosophy

**This roadmap is a living document** that the team adapts as needed to meet changing priorities, technology shifts, and scientific opportunities. napari's roadmap focuses on expanded core functionality, performance improvements, new features, and compatibility with other scientific tools.

This roadmap **is a high-level view of the project's priorities**. It offers a compass for the core team, contributors, users, and funders to guide us as the project evolves. This roadmap is a relatively "jargon-free" view of essential efforts planned for napari's future. The roadmap should contain strategic deliverables to carry out the project's mission.

This roadmap **is not a detailed project plan** with milestones and assignments. Project plans will be captured in GitHub issues and projects, and the work will be discussed in the project's workgroup meetings. Focusing on strategic deliverables makes the roadmap easier to understand and prioritize than a collection of issues in a project table.

We welcome **input from the community** about needs and priorities. This document will be publicly posted and be easily discoverable from the napari website.

### Potential challenges

Common risks associated with roadmaps are:

* **Scope Creep:** The influx of issues and pull requests can lead to scope creep, diverting focus from the core objectives.

* **Lack of Clarity:** Ambiguous communication between the team and contributors can hinder progress and lead to misunderstandings.

* **"How" Before "Why":** Prioritizing implementation details ("how") over the underlying rationale ("why") can cause misaligned efforts.

* **Estimation Difficulties:** Accurately estimating project timelines and resource requirements is challenging.

### Risk mitigation strategies

These practices reduce risk and increase the likelihood of completing strategic deliverables:

* **Transparent Roadmap:** Maintain a clear and easily discoverable roadmap to guide development and manage expectations.

* **Regular Reviews:** Conduct quarterly reviews and updates to ensure the roadmap remains relevant and aligned with current priorities.

* **Annual Deep Dives:** Perform a yearly in-depth analysis of each focus area to assess progress and identify areas for improvement.

* **Iterative Development:** Embrace an iterative approach to development, incorporating lessons learned into future iterations.

* **Visible Refactoring Plan:** Establish a clear plan for refactoring efforts and track progress beyond individual issues and pull requests.

## Roadmap focus areas

### Core technology

* **API (Code interface):** The interface to the external scientific Python world, enabling extensibility, customization, and integration into pipelines and workflows.

* **Library (Implementation):** The API implementation; new useful features across all interaction modes.

* **Performance:** Optimization efforts to enhance speed and efficiency.

* **Evolution:** Ongoing development and improvement of the core components.

### User experience

* **User Interfaces and Interaction Modes:** The bundled application (using Qt), new applications (NapariLite, browser, WebAssembly), notebook, and programmatic use cases.

* **Plugin Ecosystem:** The engine for extensibility, input/output plugins, domain-specific functionality, and discoverability of plugins.

### Project sustainability and community

* **Bug Fixes:** Addressing reported issues and ensuring software stability.

* **Documentation:** Maintaining comprehensive and up-to-date documentation.

* **Website:** Providing a central hub for information and resources.

* **Community Engagement:** Fostering communication, outreach, and collaboration through conferences and core team meetings.

## Strategic deliverables

This section provides a roadmap of strategic deliverables for these three project focus areas: Core, UX, and Project Health. These items are not ordered by priority.

### Core technology

Since its first commit in 2018, napari has grown organically as functionality was added and improved by a growing community of scientists. Now over 175 contributors have added to the napari code base. However, during this growth, we have accumulated significant technical debt, both in internal architecture and in API inconsistencies.

Since 2020, CZI has helped napari by conducting user surveys. Although respondents consistently find our community welcoming (\~90% in 2022, \~80% in 2023), less than 30% found it easy to contribute to napari in 2023 — down from just over 50% in 2022\. This demonstrates the need to decrease the complexity of the napari codebase to help practicing scientists improve napari for their needs — a common pattern for napari development in prior years.

This roadmap outlines our plans to simplify the napari code base to allow greater flexibility, improve the API's consistency and ease of use, and improve rendering performance.

#### API evolution

***The napari core public API should enable support of new visualization libraries and enable research teams to develop domain-specific front-end user interfaces.***

*Benefits: Timely support of new frontend frameworks and web assembly in the browser, unlock integration into existing research tools, and provide support for new visualization engines.*

* Create a new **napari core API specification** version to support **declarative visualization**, **viewer serialization**, and **front-end agnostic user interfaces**.

* Identify where **decoupling of existing code from Vispy and Qt** is needed to support the core API

#### Core library

**The napari core library aims to be a foundation for cutting-edge visualization for research.**

**Architecture improvements**

* Adopt the psygnal **event signaling library** throughout to enable different user interfaces to work performantly with the napari core library.

* Add **viewer serialization**. The entire viewer state should be saveable and recoverable. We should provide support for deep links to data \+ views.

* **Decouple rendering state** from layer model.

* **Decouple library from application design** by using app-model. [\#7059](https://github.com/napari/napari/issues/7059)

**User-facing improvements**

* Establish a consistent physical model of **data and scene spaces** [\#5949](https://github.com/napari/napari/issues/5949)

* Develop core library to enable a UI-agnostic **multi-canvas viewer,** enabling orthogonal slices, multichannel viewing, and even VR [\#5348](https://github.com/napari/napari/issues/5348)

* Implement highly-requested functionality that improves **visualizations and overlays** [\#7587](https://github.com/napari/napari/issues/7587) [\#5957](https://github.com/napari/napari/issues/5957)

* Improve **file opening and saving** to better support complex scientific data formats

* Refactor the layer models to consistently support **tabular data visualization across layers**. [\#2866](https://github.com/napari/napari/issues/2866)

* Implement core functionality needed to enable **grouping of layers**. [\#5950](https://github.com/napari/napari/issues/5950)

*Benefits: Web browser application support, composable user interfaces, efficient data pipeline, experimentation tools, and scripting for automated workflows.*

#### Performance

***As data size and volume increase, napari must remain blazing fast.***

*Benefits: Providing separation of computation from the user interfaces will keep the core library speedy. Focusing on in-memory optimizations and profiling core library modules will deliver benefits to both code-centric workflows and GUI workflows.*

* Improve **3D rendering of larger-than-memory data** for all layer types. [\#5942](https://github.com/napari/napari/issues/5942)

* Improve performance in **viewing and annotating** **multiscale 2D data**. [\#3630](https://github.com/napari/napari/issues/3630)

  * Large in-memory 2D viewing performance

  * Larger than memory 2D data

  * Larger than memory 2D annotation e.g. in Shapes layer

* **Speed up rendering performance for in-memory data**, even small data. Prioritize fast visualization interactivity over letting async and lazy loading do all the work. [\#5941](https://github.com/napari/napari/issues/5941), [\#5943](https://github.com/napari/napari/issues/5943), [\#5956](https://github.com/napari/napari/issues/5956), [\#6046](https://github.com/napari/napari/issues/6046)

* Improve performance when **slicing layers**. [\#4795](https://github.com/napari/napari/issues/4795), [\#5957](https://github.com/napari/napari/issues/5957)

### User experience

* Improve application **GUI**.

  * Add and improve tools for 3D annotation (core library and application work). [\#5955](https://github.com/napari/napari/issues/5955)

  * Add parity support for all API functions in GUI. [\#5959](https://github.com/napari/napari/issues/5959)

  * Add rich import/export dialog to simplify user workflows.

  * Improve display of task execution and progress information.

  * Improve export of GUI and console sessions.

* Implement **"napari headless is Just Python"** vision so napari can run anywhere that Python can. [\#5958](https://github.com/napari/napari/issues/5958)

* Implement a **new version of the plugin manifest** that addresses current pain points, deduplicates parts of the specification, and includes richer contribution types [\#6227](https://github.com/napari/napari/issues/6227)

* Add support for **composable plugin workflows**. Enable data, including layers and non-layers, to be streamed from one plugin to another. [\#5965](https://github.com/napari/napari/issues/5965)

* Create a **simplified plugin discovery site** to replace the napari hub.

* Create a **highly performant, minimal functionality viewer** (**napari-lite, ndv,** or similar) [\#5940](https://github.com/napari/napari/issues/5940)

### Project sustainability and community

This section lists high-priority items for documentation, issue/pr management, community engagement, project health, and day-to-day sustaining work:

* Create an **ImageJ/Fiji migration guide** for napari. [\#134](https://github.com/napari/docs/issues/134)

* Increase **documentation coverage of all  GUI and API** **features**. [\#180](https://github.com/napari/docs/issues/180)

  * Improve discoverability of all feature documentation

* **Auto-generate images and videos** in our documentation to streamline contribution process and ensure up-to-date visualizations [\#289](https://github.com/napari/docs/issues/289)

* Curate a **plugin reference** to aid discoverability  long-term maintenance of useful plugins

  * Maintain a list off high-quality, well-maintained plugins useful for scientific research.

  * Implement and surface workflows to assist plugin developers in maintaining plugins

* Update **PR workflows** to emphasize smaller PRs and iterative best practices.

* Increase community engagement by focusing more attention on **domain-specific use cases** (a natural progression from the examples we already have for features)

* Manage **issues and PR triage**. Archive all the unactionable problems and PRs.

* Burn down the **high-priority bugs** list. [\#5973](https://github.com/napari/napari/issues/5973)

* Improve **test coverage** for napari bundled application. [\#5951](https://github.com/napari/napari/issues/5951)

* Host **workshops and tutorials** at a regular cadence

  * Build a suite of high quality reusable workshop and tutorial materials

## Timeline

The timeline includes ideas that we have firm commitments to deliver. Over time, this section will cover priorities for the current year, the following year, and the next three to five years.

### 2025

The following items are active priorities for the project:

* Shape triangulation performance
* Hub-lite: a community built and managed alternative to the napari hub
* Modular canvas (API foundational work)
* Decoupling library from application design
* Sustaining the project

Our next priorities are:

* Multi-canvas (foundational work)
* Improvements to the plugin manifest (technical design)
* Core functionality for grouping of layers
* Instanced rendering performance
* Performance under core library
* Additional performance optimization and memory management.

### 2026 milestones and beyond

This section will list commitments for 2026 and beyond.
