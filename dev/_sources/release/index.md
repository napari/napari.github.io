(release-notes)=

# Release Notes

Each section shows the highlights from recent releases. Click on the version links to view the complete release notes.

*Last updated: June 30, 2026*


## Recent Releases (Last 3 Months)

Latest features and improvements:

````{dropdown} napari 0.7.1 (June 2026)
:open:

The napari 0.7.1 release includes many new features and improvements. Here are some of the highlights:

### Signed Windows bundle

Starting with the napari 0.7.1 release, our bundle on Windows is now [signed](https://github.com/napari/packaging/pull/387) with a NumFOCUS certificate, like our macOS bundle has been. This means that you should be able to run napari without any warnings about the application being from an unknown publisher. This is an important step forward for our Windows users, as it enhances security and trust in our application, especially in managed IT environments where unsigned applications may be blocked by default.

The certificate is issued for the NumFOCUS foundation, which supports napari and a large number of other open source projects.

If you encounter any issues related to this change, please let us know!


### Selection of the rendered level for multiscale layers

Prior to napari 0.7.1, when rendering a multiscale layer:

- in 3D display, napari would always render the lowest resolution level of the pyramid
- in 2D display, the pyramid level would be automatically selected based on the viewport

Thanks to [#8917](https://github.com/napari/napari/pull/8917), users can now [select a multiscale level to render](https://napari.org/dev/howtos/layers/image.html#locking-the-multiscale-level) ([check out the awesome new example!](https://napari.org/stable/gallery/add_multiscale_volume.html)). Importantly, this allows choosing a higher resolution rendering than before in 3D, as long as the selected level can fit within GPU texture limits. Meanwhile, for 2D display, you can fix the resolution level, which can be useful for annotation or previewing data prior to an analysis or export step. You can set this resolution using the resolution widget in the layer controls:

![The resolution dropdown in the layer controls allows the user to select different levels of a multiscale image.](https://github.com/user-attachments/assets/862e7512-0309-429c-b155-a9c03acf2db6)


### Colorbars for points layer

The points allows coloring points based of their feature values; in napari 0.7.1 we added support for colorbars ([#8624](https://github.com/napari/napari/pull/8624)), so you can now easily see the mapping between feature values and colors, just like the colorbars for image colormapping. This is especially useful when you have a large number of points and want to quickly understand the distribution of feature values.

![Example of colorbar for points layer](https://github.com/user-attachments/assets/1522aa7c-3520-4e41-85e6-99e9a91c47ee)

### Scalebar with units

In previous versions of napari, if you added a scale bar using **View > Scale Bar > Scale Bar visible**, it was shown with no units. In napari 0.7.1 we now
set default unit to `pixel` in [#8900](https://github.com/napari/napari/pull/8900) and also add calculation of units for scale bar based on currently added layers in [#8907](https://github.com/napari/napari/pull/8907) and [#9007](https://github.com/napari/napari/pull/9007), if they have units set and are logically consistent across layers.
We've also [added a guide about unit and scale aware rendering](https://napari.org/stable/guides/units.html)  ([#1032](https://github.com/napari/docs/pull/1032)).


![Scale bar with units](https://github.com/user-attachments/assets/b25a1a53-b9a0-46f1-b88c-c2625e4287a8)

### Lock layer to prevent accidental deletions

In [#8736](https://github.com/napari/napari/pull/8736) we added the initial implementation for a [lock mechanism for layers](https://napari.org/stable/getting_started/layers.html#layer-locking). Now, when a layer is locked, it cannot be accidentally deleted or destructively modified. This is especially useful when you have a complex project with many layers and want to prevent accidental changes to important layers. Note: the layer controls are not affected by the lock at this time.
In the future we plan to expand this feature to prevent not only deletion but also other modifications.

![Lock layer on layer list](https://github.com/user-attachments/assets/1df17b1e-cb52-4b2f-88b3-495f1e5301a0)

[View full release notes →](release_0_7_1)

````




## Releases from 3-6 Months Ago

````{dropdown} napari 0.7.0 (March 2026)
:open:

### Breaking Changes

#### Transition to npe2 plugin engine 🔌

In 0.6.0 we began the process of deprecating npe1 (napari-plugin-engine).
In all 0.6.x releases, npe1 plugins were automatically converted to npe2 by default,
and users could turn off the `use_npe2_adaptor` setting to continue using npe1 plugins
without auto-conversion.

In 0.7.0 this setting is being removed ([PR #8448](https://github.com/napari/napari/pull/8448)),
and plugins will *only* continue to function if
they can be auto-converted to npe2. Most plugins will be unaffected, but those that rely
on import-time behaviour may not work as expected. If a plugin is relying on import-time
behaviour, it may be able to replicate this using the new startup scripts functionality added
in 0.6.5 ([#8188](https://github.com/napari/napari/pull/8188)).

If you encounter conversion issues in a plugin you rely on, please contact the
plugin authors to encourage them to migrate their plugin to the npe2 system.

This change has been a long time coming, and it's allowed us to remove thousands
of lines of tangled and confusing legacy code. Now that we have, it's unleashed
the potential for massive improvements to file opening and saving in `napari`,
and exciting new features for our plugin infrastructure. Stay tuned!

For more details on this change and how it affects plugins, see the [detailed
guide](adapted-plugin-guide). If you are a plugin author and your plugin is not
yet npe2-compatible, please see our [npe2 migration
guide](npe2-migration-guide), and, if you encounter any issues, get in touch in
our [Plugins Zulip chat
channel](https://napari.zulipchat.com/#narrow/channel/309872-plugins) or by
coming to one of our [community meetings](meeting-schedule).

#### Negative axis labels? A real positive

If you've ever loaded data of mixed dimensionality in napari, like a TYX volume
alongside a YX segmentation, you may have noticed the default axis labels didn't
quite line up:

| axes   | 0 | 1 | 2 |
|--------|---|---|---|
| volume | 0 | 1 | 2 |
| segmt  |   | 0 | 1 |

That's because napari used 0-based indexing for its viewer axis labels, which breaks
down when layers have different numbers of dimensions. With
[#8565](https://github.com/napari/napari/pull/8565),
viewer axis labels now use negative indexing by default, combining Python's negative indexing
semantics with NumPy's array broadcasting semantics. The last axis is always `-1`,
the second-to-last is always `-2`, and so on:

| axes   | 0  | 1  | 2  |
|--------|----|----|----|
| volume | -3 | -2 | -1 |
| segmt  |    | -2 | -1 |

This means axis labels stay consistent as you add or remove layers of different
dimensionality -- axis `-1` is always your last axis. This also fixes
a long-standing bug where axis labels could end up duplicated when mixing layers of
different dimensionality ([#6569](https://github.com/napari/napari/issues/6569)).

You'll notice this change in the dims slider labels, the axis overlay, and the dims
popup widget. If you already label your axes with your own names (e.g. `z`, `y`, `x`),
nothing's changed. For everyone else, we have consistency at last!


#### What's in an angle? The truth! Fixed camera angles 🎥

If you've ever set up the camera to take that perfect publication-worthy photo of
your data (and taken the time to query the camera angles), you may have noticed they seemed... off.
That's because they were! Very... off. This was due to a long-standing bug in how we calculated our
camera angles, fueled in part by some arcane vispy axis-swapping tomfoolery, and in part by napari's
starting position of `viewer.camera.angles = (0, 0, 90)`.

Good news! With [#8281](https://github.com/napari/napari/pull/8281), angles make sense again. The default camera angles are `(0, 0, 0)`, and they
move intuitively -- so `viewer.camera.angles = (10, 0, 0)` actually represents a 10 degree
rotation around the [-3rd](#negative-axis-labels-a-real-positive) dimension. What a time to be alive!

Old versions of napari:

![Image showing an old version of a napari viewer with a layer opened and its camera angle (10, 0, 0) displayed in the console.](https://github.com/user-attachments/assets/9ae2040c-36f7-4c4c-8ef8-140202d7ccda)

New and sane:

![Image showing the 0.7.0 napari viewer with a layer opened and its camera angle (10, 0, 0) displayed in the console. The layer is rotated 10 degrees in its first dimension](https://github.com/user-attachments/assets/6b972b46-5c3c-439a-8b0a-fe8a293224e5)

All rotations are now right-handed (counterclockwise when the axis points towards the viewer),
with automatic sign-flipping for flipped camera views.

Now for the bad news... After many (and we do [mean](https://github.com/napari/napari/pull/8537)
[**many**](https://github.com/napari/napari/pull/8557)) attempts, we realized we couldn't
provide legacy conversion functions to get you to and from the original camera angles. Therefore,
this is a **breaking change**.

If you had scripts or notebooks setting up angles for screenshots, or if you've got workshop
materials or tutorials with preset angles, they'll need to be updated. Any existing code
using `viewer.camera.angles = (z, y, x)` will now produce a different view than before.

#### Limiting `self.events` callbacks

In [#8672](https://github.com/napari/napari/pull/8672), we changed how we emit events from
the parent `self.events` group.

Previously, connecting a callback to an `EventedModel`'s top-level event group
(e.g. `model.events.connect(callback)`) would cause that callback to fire multiple times
when a single assignment triggered multiple dependent fields. For example:

```python
class MyModel(EventedModel):
    a: int

    @property
    def b(self):
        return self.a * 2

    @b.setter
    def b(self, value):
        self.a = value // 2

model = MyModel(a=1)
model.events.connect(my_callback)

model.a = 4  # previously called my_callback twice (once for 'a', once for 'b')
             # now calls my_callback once
```

The callback connected to `model.events` will now be called exactly once, with the event `type`
set to the first changed field and `value` set to its new value. Callbacks connected to specific
field events (e.g. `model.events.a.connect(...)`) are unaffected and continue to work as before.

If you connect to `model.events` directly and relied on receiving one call per dependent field
change, you will need to connect to the individual field events instead.

### New features & widgets

#### What's my metadata? Where's my metadata? `napari-metadata` to the rescue

With a lot of work from our community contributor, Carlos Mario Rodriguez Reza
(https://github.com/carlosmariorr), and
our venerable community manager Tim Monko (https://github.com/timmonko),
`napari` now has a metadata viewing and editing plugin
included in our `napari[all]` installation and our bundle ([PR #8576](https://github.com/napari/napari/pull/8576)).

![Screenshot of napari displaying an image of neurons, with the napari-metadata Layer Metadata widget across the bottom of the viewer.](https://raw.githubusercontent.com/napari/napari-metadata/main/docs/images/horizontal-widget.png)

Open the `Layer metadata` widget from the `Plugins` menu and you can view File information, and view and edit Axes metadata such as
axis labels, translation and scale! You can also use the widget to copy specified metadata across to other layers.

Check out the [README](https://github.com/napari/napari-metadata) for some usage documentation, and feel
free to open an issue to request new features -- we're actively improving this plugin so, more to come!

#### (Layer) Features galore

Prior to 0.7.0, our Features table widget only supported showing individual selected layer features.

With [#8189](https://github.com/napari/napari/pull/8189), courtesy of Marcelo Zoccoler
(https://github.com/zoccoler), the widget will display
features of all selected layers! The layer's name is displayed in an additional column, so you
always know what you're looking at, and you can choose to display only the shared feature columns
across all layers. Pretty slick!

![GIF displaying the usage of the features table with multiple selected layers.](https://github.com/user-attachments/assets/e06fd403-ed03-4edd-9192-a4e287d25ff7)

#### Smarter new layer buttons - inheriting from selected layers

Prior to 0.7.0, creating a new layer Points, Shapes or Labels layer would give you a layer
with extent and dimensionality equal to the union of all currently open layers, and with
none of the other spatial information (scale, units, etc.) inherited.

Now, with [#8357](https://github.com/napari/napari/pull/8357) and [#8702](https://github.com/napari/napari/pull/8702)
you can create new Shapes, Points or Labels layer that inherits from a selected layer
(or a combination of selected layers).

##### Shapes & Points

If you have one layer selected, your new `Shapes` or `Points` layer will copy
all spatial information from its ancestor, ready for annotating!
If you have multiple layers selected, only scale is copied.

If you wish to recover the original behavior, select all existing layers before creating your new layer.
Deselecting all layers gives you a layer with only the number of dimensions inherited,
and no other properties.

##### Labels

`Labels` layers inherit all spatial information when a single `Image` or `Labels` layer is selected.
When multiple `Image` or `Labels` layers are selected, or the selection includes any combination of
other layer types, the new `Labels` layer will span their extent -- take note, this layer could be
huge!

The `Labels` button is disabled when layers are present in the viewer and none are selected.
(You can still create a (512 x 512) `Labels` layer when there are no layers present).

##### Visual cues

[#8768](https://github.com/napari/napari/pull/8768) ensures this change is not invisible!
When your selection will result in full inheritance of spatial information for the new layer,
the new layer buttons will be highlighted.
The highlight color will become dimmer when your selection will result in the new layer only
inheriting the extent of your existing selection. If you're lost
in the inheritance madness, you can also hover over the buttons to get details about the behavior.

![GIF displaying the highlights on the Shapes, Points and Labels new layer buttons when one or more layers are selected in the layerlist](https://github.com/user-attachments/assets/17361e45-dbca-4770-be11-d74c882eedb5)

PS -- You can now also create these new layers from the `File -> New Layer` menu!

#### Better text overlays 🔡

With [#8236](https://github.com/napari/napari/pull/8236), we've not only refactored text overlays
so they're easier to implement, but we've also introduced two new long-requested overlays:
the layer name overlay, and an overlay for the current slice. Together, they make generating
publication-ready figures much easier!

![Image showing the napari viewer with two layers in grid mode. Each layer has its name displayed in the top left, and the current slice displayed in the bottom right.](https://github.com/user-attachments/assets/3c96b38d-44c1-432b-b294-aa9c0934a553)

Try it yourself:

```python
import napari
v = napari.Viewer()
v.grid.enabled = True
ll = v.open_sample('napari', 'cells3d')
for l in ll:
    l.name_overlay.visible = True
v.scale_bar.visible = True
v.scale_bar.gridded = True
v._overlays['current_slice'].visible = True
v._overlays['current_slice'].gridded = True
v.dims.axis_labels = ['z', 'y', 'x']
```

**Note**: the `v._overlays` attribute is still private as we're working out the best API.

### Rendering & display

#### More pixels to play with - texture tiling

Ever loaded a large 2D image in napari just to zoom in and feel like you're not
really getting a lot of bang for your pixel bucks? That's because we were
downsampling images that were too large to send the whole thing to the GPU.

Courtesy of Guillaume Witz (https://github.com/guiwitz), and his PR for
texture tiling ([PR #8395](https://github.com/napari/napari/pull/8395)) 2D
images that exceed OpenGL's maximum texture size will be split into multiple
tiles, each small enough to fit on the GPU.

![Image with a screenshot of napari 0.6.6 on the left and napari 0.7.0 on the right displaying a DeCAM image of the Milky Way. The image on the left is pixelated, while the image on the right is displayed at full resolution.](https://github.com/user-attachments/assets/d0a115a8-49d5-432c-b561-f29fe9ac8116)

#### Rendering layers in physical space - units matter!

In 0.6.6 and below, units were stored in metadata, but not used for rendering.
Adding two layers that represented the same physical space, but had different
units, e.g. a layer with `scale=500, units='nm'` and one with `scale=0.5, units='μm'`
wouldn't overlap correctly, even though they should.

Thanks to [#7889](https://github.com/napari/napari/pull/8395), layers with
compatible units (i.e. those that share the same physical dimension per axis,
like all spatial), will make use of `units` and `scale` to overlap correctly,
using the smallest unit as the rendering space.

Units can also be set globally on the layer list using `viewer.layers.units = ('nm', 'nm')`,
forcing layers to be rendered in this space. If a new layer is added with more dimensions
than the current layers, this global override is dropped with a warning.

#### Points - any size you like 🟣

On macOS, the points layer has never been able to reach its full potential, as OpenGL
drivers limit the size of an individual marker to a certain number of screen pixels.

With [#8552](https://github.com/napari/napari/pull/8552) and the release of `vispy v0.16`,
this long-standing issue has finally been resolved. Across all operating systems, you can
make your points as big as you want!

This change has also propagated to the zoom behaviour on macOS -- points now zoom
proportionally to the data, rather than staying the same size in screen pixels.

Here's the behaviour pre 0.7.0:

```{raw} html
<figure>
  <video width="100%" controls autoplay loop muted playsinline> 
    <source src="../_static/images/points_zoom_066.webm" type="video/webm" /> 
    <source src="../_static/images/points_zoom_066.mp4" type="video/mp4" /> 
    <img src="../_static/images/points_zoom_066.png" 
      title="Your browser does not support the video tag" 
      alt="Video with a points layer on a grid of white squares. When zooming, the points stay the same size in screen pixels." 
    > 
  </video> 
</figure> 
``` 

And now:

```{raw} html
<figure> 
  <video width="100%" controls autoplay loop muted playsinline> 
    <source src="../_static/images/points_zoom_070.webm" type="video/webm" /> 
    <source src="../_static/images/points_zoom_070.mp4" type="video/mp4" /> 
    <img src="../_static/images/points_zoom_070.png" 
      title="Your browser does not support the video tag" 
      alt="Video with a points layer on a grid of white squares. When zooming, the points scale proportionally to the data." 
    > 
  </video> 
</figure> 
```

### Performance

#### Grid mode -- bigger, better, faster 📈

If you've been playing with our new grid mode since 0.6.5, you
may have stumbled into performance issues when progressively adding
new layers to the viewer. Stumble no longer! Our grid mode is now wicked fast and buttery smooth 🧈.

We've also fixed some issues with mouse interactions and deleting
layers, so you can tile to your heart's content. Try it out:

```py
import napari

viewer = napari.Viewer()

# enable grid with stride 2 to get layers split two-by-two
viewer.grid.enabled = True
viewer.grid.stride = 2

# set the scale bar to gridded mode so it appears in each grid box
viewer.scale_bar.visible = True
viewer.scale_bar.gridded = True

layers = viewer.open_sample('napari', 'lily')

# enable color bars
for layer in layers:
    layer.colorbar.visible = True
```

#### Add & delete layers without delay

[#8479](https://github.com/napari/napari/pull/8479) and [#8443](https://github.com/napari/napari/pull/8443)
made a number of improvements to
our layer and overlay clean-up, addressing a number of issues with large numbers of layers
in the viewer - adding them, deleting them, and even closing the viewer is now snappy
and smooth!

#### Shapes layers -- select, zoom, delete, repeat

If you've ever tried working with thousands of shapes in napari, you'll know
it could get... painful. Selecting 10,000 shapes with a box took over 50 seconds,
deleting 5,000 shapes took over a minute, and zooming with shapes selected
would lock up the viewer entirely. Not anymore!

0.7.0 brings a flurry of performance improvements:

- Box selection now uses bounding boxes and vectorized intersection tests,
  delivering a more than 100x speedup ([#8378](https://github.com/napari/napari/pull/8378)).
  Selecting 10,000 shapes goes from >50s to ~0.3s.
- Batch deletion replaces one-by-one removal for another 100x speedup
  ([#8375](https://github.com/napari/napari/pull/8375))! Deleting 50,000 shapes
  now takes under half a second.
- Outline computation is batched and cached, so zooming and panning with
  selected shapes no longer blocks
  ([#8403](https://github.com/napari/napari/pull/8403),
  [#8536](https://github.com/napari/napari/pull/8536)).
- Highlight updates are throttled for large layers, enabling smooth zoom
  even with 200,000+ shapes ([#8404](https://github.com/napari/napari/pull/8404)).
- Mode switching no longer triggers unnecessary redraws, giving another
  ~3x speedup when many shapes are selected
  ([#8551](https://github.com/napari/napari/pull/8551)).

Beware: there's still more to do, because drawing and drag-moving large selections
remain slow!

#### Multiscale -- less to update, more to celebrate

PR [#8678](https://github.com/napari/napari/pull/8678) introduced a small change
with a big effect! Now, zooming in (and panning while zoomed in), will only trigger
a data refresh if the multiscale level has changed **or** if the new view falls outside
of already loaded data.

#### Delete the launch codes -- no more macOS hacks on launch

In 0.6.6 and below, we had some macOS specific launch code that skirted around some
issues (which are now no longer relevant), and hackily "relaunched" napari to make
sure the application name was correct.

This code added up to a whole second to our launch time, as well as being potentially
problematic for some users. PR [#8705](https://github.com/napari/napari/pull/8705)
removed this code, making our start-up a little less hacky and a little more snappy.
The downside is that when launching napari on macOS, the app name may be listed as
Python, instead of napari. We think the trade-off is worth it.


### Infrastructure & dependencies

A couple of notes on big changes in our dependencies:

- With #8509 we improved our support for `pydantic v2`, allowing us to enable support for Python 3.14!
This brings us one step closer to fully adopting `psygnal` as our event library.
- In [#8450](https://github.com/napari/napari/pull/8450) we dropped support for PySide2. If you
were using napari with PySide for your Qt bindings, you'll need to upgrade to PySide6. Good news
is that PySide6 is looking pretty stable, while PySide2 had some compatibility issues with numpy2,
and had to be built from source for Python 3.11+.
- In ([#8665](https://github.com/napari/napari/pull/8665)) we updated the default qt
binding to PyQt6. PyQt6 will now be installed with `napari[all]` installations. Windows users
should see improvements to their display with better support for fractional scaling!
- In [#8338](https://github.com/napari/napari/pull/8338) we replaced `numpydoc` with `docstring_parser`
for parsing our docstrings. This will be a pretty invisible change from a user's perspective, but
it saves more than 50MB of disk space for a napari install!

[View full release notes →](release_0_7_0)

````




## Releases from 6-12 Months Ago

````{dropdown} napari 0.6.6 (October 2025)
:open:

This a small bugfix release, following up the changes in 0.6.5.

### Zooming in the dark?

In the previous release we accidentally made the [zoom tool added in v0.6.3](https://napari.org/stable/release/release_0_6_3.html#a-zoom-with-a-view) invisible. Whoops! No worries, it's back 🔍.

### "Open with napari"

When using the [napari bundle](https://napari.org/stable/tutorials/fundamentals/installation_bundle_conda.html#how-to-install-the-napari-app), it will now detect when a file can be opened with napari based on the extension. This allows you to use the `open with >` menu from your operative system to open files with napari!

![image showing a context menu with the the "open with > napari" option available](https://github.com/user-attachments/assets/f13d58e5-ce2d-460a-b92e-2f23ecc8d438)

PS: Since we did quite a few changes behind the scenes on this new version of the bundle, you might experience some issues. Don't hesitate to open an issue or contact us on zulip if you do!

[View full release notes →](release_0_6_6)

````

````{dropdown} napari 0.6.5 (October 2025)
:open:

This a sizeable release containing a few new exciting features and a lot of bugfixes.

### EffVer and no more _alpha_

It is our first release officially following the [EffVer versioning scheme](https://effver.org/). We also took this occasion to (finally!) remove the `Alpha` qualifier from the project ([#8288](https://github.com/napari/napari/pull/8288)), to better reflect the reality of the extensive use of napari in production. Note that these changes are just formally bringing up to date the state of the project: our development continues as before!

### Define a startup script for custom launch behaviour

Do you have a code snippet that you always find yourself running after you launch napari? No more! You can now put this code in a script and set its path in the new `startup script` setting ([#8188](https://github.com/napari/napari/pull/8188)), and it will be executed every time napari opens. It's just a python script, so sky's the limit :) We found it particularly useful for adding custom colormaps, setting up the scale bar *just right*, or automatically launching our favourite plugin on startup.

![Screenshot of the application settings menu highlighting the field for the startup script path](https://github.com/user-attachments/assets/7b0e5e5c-252b-45a0-ae76-aac88e488cbc)

### Automatically tiled overlays and ColorBar overlay

Canvas overlays such as `scale_bar`, `text_overlay`, and `colorbar` overlay are now automatically tiling ([#7836](https://github.com/napari/napari/pull/7836)), preventing annoying overlap and making them easier to use without having to manage positioning. Wait, `colorbar` overlay you said? You heard it right! This is a new overlay ([#7832](https://github.com/napari/napari/pull/7832)) that shows a color bar legend, and it works with any layer which uses a colormap. All of this works seamlessly with multiple overlays and even grid mode:

```py
import napari

viewer = napari.Viewer()

# enable grid with stride 2 to get layers split two-by-two
viewer.grid.enabled = True
viewer.grid.stride = 2

# set the scale bar to gridded mode so it appears in each grid box
viewer.scale_bar.visible = True
viewer.scale_bar.gridded = True

layers = viewer.open_sample('napari', 'lily')

# enable color bars
for layer in layers:
    layer.colorbar.visible = True
```

![Image depicting the napari viewer in grid mode with scale bars and color bars enabled](https://github.com/user-attachments/assets/622b2d36-11a7-4c55-9550-c82ddebc2fda)

Alternatively, you may also activate the `colorbar` (and other layer-related overlays such as `bounding_box`) from the graphical interface by right clicking on selected layers in the layerlist and toggling the relative entries in the **Visualization** submenu ([#8319](https://github.com/napari/napari/pull/8319)).

### Task manager will now try to prevent losing unfinished work

We added a new task manager ([#8211](https://github.com/napari/napari/pull/8211)) which automatically registers any running `thread_worker`, showing a confirmation dialog if you attempt to close napari while a task is running.

### New *remove* and *pop* methods for Points and Shapes

Points and Shapes can now be easily removed, not just added :P ([#8031](https://github.com/napari/napari/pull/8031) and [#8072](https://github.com/napari/napari/pull/8072)).

### A few shiny new updates to our website and documentation

[napari.org](https://napari.org/) can now be visited in *dark mode* ([docs#840](https://github.com/napari/docs/pull/840))! You could try out this new relaxing colorscheme while exploring the new overhauled [Preferences documentation](https://napari.org/stable/guides/preferences.html#preferences) section 😉 ([docs#834](https://github.com/napari/docs/pull/834)).
There's also new sections on [viewer overlays](https://napari.org/stable/tutorials/fundamentals/viewer.html#viewer-overlays) and [layer overlays](https://napari.org/stable/guides/layers.html#layer-overlays), to better explain how to use these old and new tools.
Our [release notes page](https://napari.org/dev/release/index.html) also received a glow-up ([docs#838](https://github.com/napari/docs/pull/838)), displaying past release highlights in collapsible boxes in the timeline. This should make it easier to quickly catch up when updating across multiple releases!

### Extra dependencies for development moved to dependency groups

A note for our contributors and plugin developers: we transferred our dev-related extra dependencies to the new python dependency groups ([#8227](https://github.com/napari/napari/pull/8227)). The installation is therefore slightly different, for example: `pip install napari --group testing` instead of `pip install napari[testing]`. The previous method will continue to work, but we will likely remove the old `optional-dependences` approach in a future release.

[View full release notes →](release_0_6_5)

````

````{dropdown} napari 0.6.4 (August 2025)
:open:

### Run scripts with napari from the command line

As a follow-up to the ability to drag-n-drop scripts into the napari window from 0.6.3, you can now run scripts directly from the command line using the `napari` command and the path to the script ([#8185](https://github.com/napari/napari/pull/8185) and [#8187](https://github.com/napari/napari/pull/8187)).
To open a local napari and run a local script, enter: `napari examples/magic_immage_arithmetic.py`.
You can also run scripts from a remote location ([#8208](https://github.com/napari/napari/pull/8208)), including Github, Gist, Gitlab, and the napari gallery.
To run a remote script, for example, enter: `napari https://github.com/napari/napari/blob/main/examples/grid_mode.py`.
If you have `uv` you can even run a script without installing napari by using `uvx --with "napari[gallery,all]" napari https://napari.org/stable/_downloads/55f878f7d41dc4c7c2e28483653273cb/affine_coffee_cup.py`, serving as a clever way to trial napari or share your script. As always with remote connections, only use this feature with scripts you trust.

### Toggling the napari console now places focus on the console

Toggling the napari console (with the keyboard (`Cmd/Ctrl+Shift+C`), GUI, or command palette) will now transfer focus on the console, allowing you to immediately start typing commands without needing to click into the console first ([#8182](https://github.com/napari/napari/pull/8182)). We have found this to be a very useful feature for a keyboard-centric workflow combining the power of the command palette and console together.

[View full release notes →](release_0_6_4)

````

````{dropdown} napari 0.6.3 (July 2025)
:open:

### A Zoom with a View 🔍

Pardon the play on words, but you can now zoom directly to a region of interest in the viewer by holding `Alt` and dragging with the mouse [(#8004)](https://github.com/napari/napari/pull/8004). The camera will pan and zoom to fit the selected region, making it much easier to focus on specific areas of your data. This feature works in both 2D and 3D views.

![GIF Displaying Alt-Drag Zoom Box Behavior](https://github.com/user-attachments/assets/f32ea020-28e2-4059-90b9-491bdd4a962b)

### Fine Tuning Thick Slicing from the GUI 📏

Thick slicing controls are now available in the GUI [(#6146)](https://github.com/napari/napari/pull/6146)! This allows you to project multiple slices together using different modes (sum, mean, max, and min) for better visualization of your multidimensional data. You can access the thickness controls by right-clicking on the dimension sliders to open a popup to change the margins either symmetrically or asymmetrical and projection mode settings are now available per layer in the layer controls widget.

![GIF Displaying Thick Slicing GUI Controls](https://github.com/user-attachments/assets/f61636d6-8540-4c33-9abc-1e065c5f9d38)

### Run Scripts by Dragging and Dropping into the Viewer 🖱️

Scripts can now be run by dragging and dropping them into the viewer [(#8135)](https://github.com/napari/napari/pull/8135)! This is particularly useful for running [napari examples](https://napari.org/stable/gallery.html#gallery) without having to use the command line; you can even run these scripts from the bundled install! This works by adding a `.py` reader to napari's builtins.

![Image Depicting a User dragging a script into the viewer](https://github.com/user-attachments/assets/af4edaa3-fd77-4697-85ea-4f2eb662f5ec)

### Windows: Access ~~Denied~~ Fixed 🪟

A critical Windows-specific bug that caused Access Violation errors has been resolved [(#8122)](https://github.com/napari/napari/pull/8122)! This longstanding issue would cause napari to stop displaying layers due to various events and often occurred at seemingly non-reproducible times, and required a full restart of napari. The fix ensures proper cleanup and syncing of GPU resources, also reducing memory usage on all platforms. If you were an effected user, you may recall it as `Access Violation`, `0x000000000000001C` if triggered without a plugin, or `0x000000000000034C` if triggered with a plugin.

### Improved PySide6 Support 🛠️

Napari now has improved support for PySide6 [(#7887)](https://github.com/napari/napari/pull/7887). We encourage plugin developers to test against PySide6, as a fully supported backend going forward. Additionally, this change will enable us to drop PySide2 along side Python 3.10, in the near future. If you are a plugin developer or otherwise depend on napari and PySide2, please reach out on Zulip or Github.

[View full release notes →](release_0_6_3)

````

````{dropdown} napari 0.6.2 (July 2025)
:open:

### The amazing new Grid mode! 🗺️

The visualization of Grid mode has been redone from the ground up! This new Grid mode [(#7870)](https://github.com/napari/napari/pull/7870) now puts each layer into its own view (a VisPy Viewbox) with cameras linked together. Now, you can pan and zoom one view, and all other views in the grid will follow along. Layers are no longer awkwardly transformed into the same world space and displayed in a grid, only to make comparing the details of each a challenge.

Grid based exploration is now fluid, fast, and intuitive, especially when working with large images and 3D+ data! The mouse can even be used over one View, while updating the data, such as a label or shape annotation, in the selected layer of a different view. The usual napari overlays can now also be added to each grid, instead of just the canvas (eg. `viewer.scale_bar.gridded = True`).

Grid mode spacing now works proportionally to the layer extents (i.e. \[0,1), as in 0.6.0) or as a pixel value \[1,1500) and will automatically adjust if needed.

![grid mode](https://github.com/user-attachments/assets/fbcb216c-666b-43a6-bf25-aad82d5e9d92)

To coincide with this new Grid mode, we have chosen to reverse the ordering of layers in the grid [(#8053)](https://github.com/napari/napari/pull/8053). The first layer added to the viewer will now be at the top left of the grid, and the last layer added will be at the bottom right; new layers will be added to the bottom right of the grid. If you prefer the previous behavior, you can set the Grid Stride to `-1` in the Preferences dialog.

![Stride preference](https://github.com/user-attachments/assets/528aebca-d623-4f9a-97f4-691329d2a2a7)

### The Features Table Widget is now a napari builtin! 📊

The features table from [napari-properties-viewer](https://github.com/kevinyamauchi/napari-properties-viewer) is now a builtin widget in napari [(#7877)](https://github.com/napari/napari/pull/7877) *and* greatly improved! This widget allows you to view and edit the properties of Points, Shapes, and Labels layers in a table widget.

The widget can be opened from the `Layers` menu -> `Visualize` -> `Features table widget (napari builtins)` or from the command palette. You can also save the properties table to a CSV file. Check out the [Features table widget](https://napari.org/dev/gallery/features_table_widget.html) example to learn more.

![Features table widget in napari](https://github.com/user-attachments/assets/2c218f05-6510-4192-b5c8-fb6d135e4863)

### Community developments! 📅

We are excited to share our new [active roadmap](https://napari.org/stable/roadmaps/active_roadmap.html) which is a living document that will be updated as we continue to develop napari. This document is intended to help the community understand the priorities of the napari team and to help us all work together to make napari better.

We are also now including all napari related events in the [community calendar](https://napari.org/stable/community/meeting_schedule.html) and as an [image.sc post](https://forum.image.sc/t/napari-community-meetings-and-events/113689), including conferences, tutorials, sprints, virtual seminars, and more. If you have an event you would like to add, please reach out to us!

### Some great features for contributors! 🛠️

1. **Contributing documentation is now a much smoother experience!** By default, new documentation will build in around 3 minutes, instead of the previous 20 minutes. This speed is thanks to new, slimmer `make` commands (`slimfast` by default) that can also be triggered in PRs with a bot (eg. `@napari-bot make docs`). Read our updated [docs contribution guide](https://napari.org/dev/developers/contributing/documentation/index.html) and reach out for help.
1. **The organization of the napari repo has been updated by moving into a `src/` directory [(#7952)](https://github.com/napari/napari/pull/7952).** This is modern best practice in Python projects (and what has long been standard in our [napari-plugin-template](https://github.com/napari/napari-plugin-template)) to avoid issues with relative imports and *should* now always result in importing the napari version installed in the current environment. For developers, especially of pull requests prior to this release, you may have many merge conflicts to resolve. Please ping the napari team if you would like help resolving these conflicts.
1. **There is now public API to access widgets docked in the viewer [(#7965)](https://github.com/napari/napari/pull/7965).** Check out the new documentation on the napari website to learn more about using this API to [communicate between widgets](https://napari.org/dev/plugins/advanced_topics/widget_communication.html). If you previously used `viewer.window._dock_widgets`, you should now use `viewer.window.dock_widgets`.

[View full release notes →](release_0_6_2)

````




## Older Releases

- **[napari 0.6.1](release_0_6_1)** (May 2025) - ### The HiLo👋 Colormap!
- **[napari 0.6.0](release_0_6_0)** (May 2025) - ### Summary
- **[napari 0.5.6](release_0_5_6)** (January 2025) - ### Faster shapes 🚀
- **[napari 0.5.5](release_0_5_5)** (December 2024) - This release continues the 0.5 tradition of churning out the bug fixes and enhancements, with 24 pull requests total in that category. If you are a us...
- **[napari 0.5.4](release_0_5_4)** (September 2024) - Another release with a lot of bug fixes, but also some (more!) improvements to Shapes layer performance ([#7144](https://github.com/napari/napari/pull...
- **[napari 0.5.3](release_0_5_3)** (August 2024) - This is primarily a bug-fix release, including fixes for a couple of nasty regressions in 0.5.0 ([#7184](https://github.com/napari/napari/pull/7184)) ...
- **[napari 0.5.2](release_0_5_2)** (August 2024) - This is primarily a bug-fix release, but we snuck a couple of new features in there, including smoother, prettier, better rendering of Labels volumes ...
- **[napari 0.5.1](release_0_5_1)** (July 2024) - napari 0.5.1 is a bugfix release hot on the heels of [napari 0.5.0](release_0_5_0). It fixes a critical bug with creating viewers
- **[napari 0.5.0](release_0_5_0)** (July 2024) - napari 0.5.0 is the beginning of an architectural overhaul of napari. The architecture improvements, which are still ongoing, enable more responsive
- **[napari 0.4.19](release_0_4_19)** - This release mostly contains a lot of bug fixes and performance improvements. But look out for 0.5.0, coming to a software repository near you — we ex...
- **[napari 0.4.18](release_0_4_18)** - - Drawing polygons in the Shapes layer can now be done much faster with   the new lasso tool ([napari/napari/#5555](https://github.com/napari/napari/p...
- **[napari 0.4.17](release_0_4_17)** - This release is focused on documentation improvements and bug fixes, with few changes to napari’s API. We picked out a few highlights, but keep readin...
- **[napari 0.4.16](release_0_4_16)** - - Added sphinx-gallery (#4288) - Add NAP process for major proposals (#4299)
- **[napari 0.4.15](release_0_4_15)** - This release is focused on documentation improvements and bug fixes, with few changes to napari's API. The napari documentation is now entirely contai...
- **[napari 0.4.14](release_0_4_14)** - - Enable shapes layer (right click) > convert to labels (#3978) - Out-of-slice rendering for Vectors (#2902)
- **[napari 0.4.13](release_0_4_13)** - - Spherical Points (#3430) - Point selection in 3d (#3508)
- **[napari 0.4.12](release_0_4_12)** - This is a bug fix release with many minor improvements and bug fixes. The user experience for users of dask arrays might be significantly improved by ...
- **[napari 0.4.11](release_0_4_11)** - This release introduces ways to interact with data in 3D (#3037). Features like label picking (#3074) and label painting/erasing (#3108) now work in 3...
- **[napari 0.4.10](release_0_4_10)** - This is a fairly small release, that follows on quickly from 0.4.9 to fix a regression in our ability to save layer data (fixed in #2876). It also con...
- **[napari 0.4.9](release_0_4_9)** - This release adds a couple nice new features like additional shading modes for our surface layer (#2972) and the ability to copy a screenshot directly...
- **[napari 0.4.8](release_0_4_8)** - This release adds a new plugin type (i.e. a hook specification) for plugins to provide sample data (#2483). No more demos with `np.random`! 🎉 We've ad...
- **[napari 0.4.7](release_0_4_7)** - After nearly a year of planning, thanks to help from the fine folks at [Quansight](https://labs.quansight.org/), napari now has a preferences dialog!
- **[napari 0.4.6](release_0_4_6)** - This release is the first that adds support for persistent settings in napari (#2212). Right now we just store the current theme and window geometry b...
- **[napari 0.4.5](release_0_4_5)** - This release is our first release using Jupyter Book to build our documentation (#2187) which can be seen at https://napari.org/docs/dev/, or
- **[napari 0.4.4](release_0_4_4)** - This release is a quick follow on from our `0.4.3` release and contains some nice improvements to the GUI and analysis function hookspecs we experimen...
- **[napari 0.4.3](release_0_4_3)** - In this release we've added two new analysis and GUI focused [hook specifications](https://github.com/napari/napari/blob/87961d0554b2bb1574553e23bf223...
- **[napari 0.4.2](release_0_4_2)** - This is an emergency patch release to fix a regression in `0.4.1` that broke magicgui generated dockwidgets which accepted layers as input (#1962). Th...
- **[napari 0.4.1](release_0_4_1)** - This release follows our recent 0.4.0 release with a number of bug fixes and small improvements. We fixed a regression that caused the status bar to a...
- **[napari 0.4.0](release_0_4_0)** - napari 0.4.0 is the culmination of months of improvements to our data models. It finally brings the data from all layers into a consistent, global coo...
- **[napari 0.3.8](release_0_3_8)** - This release is mainly a bug fix release, with a number of small improvements including around our contrast limits updates (#1622) and points coloring...
- **[napari 0.3.7](release_0_3_7)** - With this release, we are launching an experimental standalone app (#1289). You can find it on our [GitHub releases
- **[napari 0.3.6](release_0_3_6)** - This release contains the long awaited addition of text to both the points and shapes layers (#1374). Checkout our `examples/*_with_text.py` for simpl...
- **[napari 0.3.5](release_0_3_5)** - This release contains a number of bug fixes on various platforms. For those interested in napari performance, we have added a new performance monitori...
- **[napari 0.3.0](release_0_3_0)** - ### Community and governance
- **[napari 0.2.11](release_0_2_11)** - - Point face color and edge color are now settable as a property in a columnar   data table, mapped using a colormap (continuous values) or a color cy...
- **[napari 0.2.9](release_0_2_9)** - - better support for surface timeseries (#831) - contrast limits slider popup on right click (#837)
- **[napari 0.2.7](release_0_2_7)** - - Play button for animating axes now in the GUI - Threshold slider for much improved isosurface rendering

