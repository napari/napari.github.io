# annotating videos with napari

In this tutorial, we will use napari (requires version 0.3.2 or greater) to make a simple GUI application for annotating points in videos. This GUI could be useful for making annotations required to train algorithms for markless tracking of animals (e.g., [DeepLabCut](http://www.mousemotorlab.org/deeplabcut)). In this tutorial, we will cover creating and interacting with a Points layer with properties (i.e., labels for the points), connecting custom UI elements to events, and creating custom keybindings.

At the end of this tutorial, we will have created a GUI for annotating points in videos that we can simply call by:

```python
im_path = '<path to directory with data>/*.png'
output = '<path to directory with data>/annotations.csv'
point_annotator(im_path, labels=['ear_l', 'ear_r', 'tail'], output_path=output)

```
that looks like this:

![image]({{ '/assets/tutorials/point_annotator_demo.gif' | relative_url }})


You can explore the project in [this repository](https://github.com/kevinyamauchi/PointAnnotator) or check out the main function below. We will walk through the code in the following sections.

```python
def point_annotator(
        im_path: str,
        labels: List[str],
        output_path: str='anno.csv',
        scorer: str='user'
):
    """Create a GUI for annotating points in a series of images.

    Parameters
    ----------
    im_path : str
        glob-like string for the images to be labeled.
    labels : List[str]
        list of the labels for each keypoint to be annotated (e.g., the body parts to be labeled).
    output_path : str
        path to the csv file to which the annotations will be saved
    scorer : str
        name of the person performing the annotation
    """
    stack = imread(im_path)
    
    with napari.gui_qt():
        viewer = napari.view_image(stack, contrast_limits=[0, 256])
        properties = {'label': labels}
        points_layer = viewer.add_points(
            properties=properties,
            edge_color='label',
            edge_color_cycle=COLOR_CYCLE,
            symbol='o',
            face_color='transparent',
            edge_width=8,
            size=12
        )
        points_layer.edge_color_mode = 'cycle'

        # Create the label selection menu
        @magicgui(label={'choices': labels})
        def label_selection(label):
            return label
        label_menu = label_selection.Gui()

        def update_label_menu(event):
            """Update the label menu when the point selection changes"""
            label_menu.label = points_layer.current_properties['label'][0]

        points_layer.events.current_properties.connect(update_label_menu)

        def label_changed(result):
            """Update the Points layer when the label menu selection changes"""
            selected_label = result
            current_properties = points_layer.current_properties
            current_properties['label'] = np.asarray([selected_label])
            points_layer.current_properties = current_properties

        label_menu.label_changed.connect(label_changed)

        # add the label menu widget to the viewer
        viewer.window.add_dock_widget(label_menu)

        @viewer.bind_key('.')
        def next_label(event=None):
            """Keybinding to advance to the next label with wraparound"""
            current_properties = points_layer.current_properties
            current_label = current_properties['label'][0]
            ind = list(labels).index(current_label)
            new_ind = (ind + 1) % len(labels)
            new_label = labels[new_ind]
            current_properties['label'] = np.array([new_label])
            points_layer.current_properties = current_properties

        def next_on_click(layer, event):
            """Mouse click binding to advance the label when a point is added"""
            if layer.mode == 'add':
                next_label()

                # by default, napari selects the point that was just added
                # disable that behavior, as the highlight gets in the way
                layer.selected_data = {}

        points_layer.mouse_drag_callbacks.append(next_on_click)


        @viewer.bind_key(',')
        def prev_label(event):
            """Keybinding to decrement to the previous label with wraparound"""
            current_properties = points_layer.current_properties
            current_label = current_properties['label'][0]
            ind = list(labels).index(current_label)
            n_labels = len(labels)
            new_ind = ((ind - 1) + n_labels) % n_labels
            new_label = labels[new_ind]
            current_properties['label'] = np.array([new_label])
            points_layer.current_properties = current_properties


        @viewer.bind_key('Control-S')
        def save_points(event):
            """Save the added points to a CSV file"""
            # get the frame indices
            frame_indices = np.unique(points_layer.data[:, 0]).astype(np.int)

            # get the filenames
            all_files = np.asarray(glob.glob(im_path))
            file_names = all_files[frame_indices]

            # create and write dataframe
            header = pd.MultiIndex.from_product(
                [[scorer], labels, ['x', 'y']],
                names=['scorer', 'bodyparts', 'coords']
            )
            df = pd.DataFrame(
                index=file_names,
                columns=header,
            )

            # populate the dataframe
            for label, coord in zip(points_layer.properties['label'], points_layer.data):
                fname = all_files[coord[0].astype(np.int)]
                df.loc[fname][scorer][label]['x'] = coord[2]
                df.loc[fname][scorer][label]['y'] = coord[1]

            # write the dataframe
            df.to_csv(output_path)
        
```
## point_annotator()
We will create the GUI within a function called `point_annotator()`. Wrapping the GUI creation in the function allows us to integrate it into other functions (e.g., a command line interface) and applications. See below for the function definition.

```python
def point_annotator(
	im_path: str,
	labels: List[str],
	output_path: str='anno.csv',
	scorer: str='user'
):
    """Create a GUI for annotating points in a series of images.

    Parameters
    ----------
    im_path : str
        glob-like string for the images to be labeled.
    labels : List[str]
        list of the labels for each keypoint to be annotated (e.g., the body parts to be labeled).
    output_path : str
        path to the csv file to which the annotations will be saved
    scorer : str
        name of the person performing the annotation
    """

```

## Loading the video
First, we load the movie to be annotated. Since behavior movies can be quite long, we will use a lazy loading strategy (i.e., we will only load the frames as they are used). Using [`dask-image`](https://github.com/dask/dask-image), we can construct an object that we can pass to napari for lazy loading in just one line. For more explanation on using dask to lazily load images in napari, see [this](https://napari.org/tutorials/applications/dask) tutorial.

```python
stack = imread(im_path)
```

We can then start the viewer Note that we use the `napari.gui_qt()` context manager to start and manage Qt event loop. We must provide the `contrast_limits` to prevent the image stack from being evaluated (i.e., loaded) upon layer creation. All of the following GUI code should be within the `napari.gui_qt()` context manager.

```python
with napari.gui_qt():
    viewer = napari.view_image(stack, contrast_limits=[0, 255])
```

## Annotating with points
We will annotate the features of interest using points in a napari Points layer. Each feature will be given a different label so that we can track them across frames. To achieve this, we will store the label in the `Points.properties` property in the 'label' key. We will instantiate the `Points` layer without any points. However, we will initialize `Points.properties` with the property values we will be using to annotate the images. To do so, we will define a properties dictionary with a key named `label` and values `labels`. The key, 'label', is the name of the property we are storing which feature of interest each point corresponds with. The values, 'labels', is the list of the names of the features we will annotating (defined above in the "point_annotator()" section). 

```python
properties = {'label': labels}
```

We then add the points layer to the viewer using the `viewer.add_points()` method. As discussed above, we will be storing which feature of interest each points corresponds to via the `label` property we defined in the `properties` dictionary. To visualize the feature each points represent, we set the edge color as a color cycle mapped to the `label` property (`edge_color='label'`). 

```python
properties = {'label': labels}
points_layer = viewer.add_points(
    properties=properties,
    edge_color='label',
    edge_color_cycle=COLOR_CYCLE,
    symbol='o',
    face_color='transparent',
    edge_width=8,
    size=12
)
```

Note that we set the `edge_color_cycle` to `COLOR_CYCLE`. You can define your own color cycle as a list of colors. The colors can be defined as hex strings, standard color names or RGBA arrays. For example, the [category10 color pallete](https://github.com/d3/d3-3.x-api-reference/blob/master/Ordinal-Scales.md#category10) would be:

```python
COLOR_CYCLE = [
	'#1f77b4',
	'#ff7f0e',
	'#2ca02c',
	'#d62728',
	'#9467bd',
	'#8c564b',
	'#e377c2',
	'#7f7f7f',
	'#bcbd22',
	'#17becf'
]
```

Finally, we set the edge color to a color cycle:

```python
	points_layer.edge_color_mode = 'cycle'
```

## Adding a GUI for selecting points
Next, we will use magicgui to add a dropdown menu for selecting which point we would like to add. [magicgui](https://github.com/napari/magicgui) is a library from the napari team for building GUIs from functions and works by applying function decorators. To make the a dropdown menu populated with the valid point labels, we simply define the function with the label as an input argument and then decorate it with the `magicgui()` decorator, passing the labels choice as `label={'choices': labels}` (recall that labels was passed to `point_annotator() as a list of the allowable labels).

```python
@magicgui(label={'choices': labels})
def label_selection(label):
    return label
```

To create the GUI, we call the label_selection. Gui() method.

```python
label_menu = label_selection.Gui()
```

We then need to connect the dropdown menu (`label_menu`) to the points layer to ensure the menu selection is always synchronized to the `Points` layer model.

First, we define a function to update the label dropdown menu GUI when the value of the selected point or next point to be added is changed. On the points layer, the property values of the next point to be added are stored in the `current_properties` property. The points layer has an event that gets emitted when the `current_properties` property is changed (`points_layer.events.current_properties`). We connect the function we created to the event so that `update_label_menu()` is called whenever `Points.current_property` is changed.

```python
def update_label_menu(event):
    """Update the label menu when the point selection changes"""
    label_menu.label = points_layer.current_properties['label'][0]

points_layer.events.current_properties.connect(update_label_menu)
```

Next, we define a function to update the points layer if the selection in the labels dropdown menu is changed. Similar to the points layer, the magicgui object has an event that gets emitted whenever the selected label is changed (`label_menu.label_changed`). To ensure the points layer is updated whenever the GUI selection is changed, we connect `label_changed()` to the `label_menu.label_changed` event.

```python
def label_changed(result):
    """Update the Points layer when the label menu selection changes"""
    selected_label = result
    current_properties = points_layer.current_properties
    current_properties['label'] = np.asarray([selected_label])
    points_layer.current_properties = current_properties
    
label_menu.label_changed.connect(label_changed)
``` 

Finally, we add the GUI created by magicgui to the napari viewer dock.

```python
 # add the label menu widget to the viewer
viewer.window.add_dock_widget(label_menu)
```

## Keybindings for switching labels
For convenience, we can also define functions to increment and decrement the currently selected label and bind them to key presses using the napari keybindings framework.

First, we define a function to increment to the next label and decorate it with the viewer key binding decorator. The decorator requires that we pass the key to bind the function to as a string and the decorated function should take an event as an input argument. In this case, we are binding `next_label()` to the `.` key.

```python
@viewer.bind_key('.')
def next_label(event=None):
    """Keybinding to advance to the next label with wraparound"""
    
    # get the currently selected label
    current_properties = points_layer.current_properties
    current_label = current_properties['label'][0]
    
    # determine the index of that label in the labels list
    ind = list(labels).index(current_label)
    
    # increment the label with wraparound 
    new_ind = (ind + 1) % len(labels)
    
    # get the new label and assign it
    new_label = labels[new_ind]
    current_properties['label'] = np.array([new_label])
    points_layer.current_properties = current_properties
```

We can do the same with another function that instead decrements the label with wraparound.

```python
@viewer.bind_key(',')
def prev_label(event):
    """Keybinding to decrement to the previous label with wraparound"""
    current_properties = points_layer.current_properties
    current_label = current_properties['label'][0]
    ind = list(labels).index(current_label)
    n_labels = len(labels)
    new_ind = ((ind - 1) + n_labels) % n_labels
    new_label = labels[new_ind]
    current_properties['label'] = np.array([new_label])
    points_layer.current_properties = current_properties
```

## Mousebinding to iterate through labels
Similar to keybindings, we can also bind functions to mouse events such as clicking or dragging. Here, we create a function that will increment the label after a point is added (i.e., the mouse is clicked in the viewer canvas when in the point adding mode). This is convenient for quickly adding all labels to a frame, as one can simply click each feature in order without having to manually swap labels. To achieve this, we first check if the points layer is the the adding mode (`layer.mode == 'add'`). If so, we then reuse the next_label() function we defined above in the keybindings to increment the label. Finally, 

```python
def next_on_click(layer, event):
    """Mouse click binding to advance the label when a point is added"""
    # only do something if we are adding points
    if layer.mode == 'add':
        next_label()

        # by default, napari selects the point that was just added
        # disable that behavior, as the highlight gets in the way
        layer.selected_data = []
```

After creating the function, we then add it to the `points_layer` mouse drag callbacks. In napari, clicking and dragging events are both handled under the `mouse_drag_callbacks`. For more details on how mouse event callbacks work see the examples [[1](https://github.com/napari/napari/blob/master/examples/custom_mouse_functions.py), [2](https://github.com/napari/napari/blob/master/examples/mouse_drag_callback.py)].

```python
# bind the callback to the mouse drag event
points_layer.mouse_drag_callbacks.append(next_on_click)
```

## Saving annotation keybinding
Finally, we will bind a function to the `Control-Alt-s` (control+alt+s) keypress combination to save the annotations to the csv file path passed into the `point_annotator()` function (described above). We use the built in csv writer for the points layer using the `Points.save()` method. In the future, we could specify a writer plugin for writing a file compatible with specific downstream analysis tools (e.g., DeepLabCut) using the `plugin` kwarg. Conveniently, napari will automatically convert ctrl+alt+s to ⌘+alt+s on Mac OS.

```python
@viewer.bind_key('Control-Alt-S')
def save_points(event):
    """Save the added points to a CSV file"""
    points_layer.save(output_path)
    
```
    
## Using the GUI
Now that you've put it all together, you should be ready to test! You can call the function as shown below.

```python
im_path = '<path to directory with data>/*.png'
output = '<path to directory with data>/annotations.csv'
point_annotator(im_path, labels=['ear_l', 'ear_r', 'tail'], output_path=output)

```