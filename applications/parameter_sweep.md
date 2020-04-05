# Parameter sweep in napari using Dask and magicgui

A parametric sweep allows for a parameter to be swept through a range of user-defined values. 
Using napari to perform parameter sweep, allows the user to call a method with different parameter values, by moving the slider across the axis.

This tutorial is designed to help users visualise parameter sweep using napari, dask and magicgui. We start with the example of _lazy parameter sweep_ for a 2D parametric function and then proceed to real-world examples.

The python library, Dask,  allows us to perform our tasks _lazily_. This means that rather than  immediately performing tasks that the function has to perform, it records the tasks and computes them as and when required.

## 1. Lazy parameter sweep using napari and Dask

We begin with an example demonstrating parametrically evaluating functions on arrays.
First we import the following libraries:

```python
import numpy as np
from scipy.ndimage.interpolation import shift
from dask import delayed
import dask.array as da
import napari
from itertools import product
```

We then define a 2D periodic function by generating 200 values between -5π and +5π, and take their sine, and cosine, as illustrated below:

```python
  # define a 2D periodic pattern
  x = np.linspace(-np.pi, np.pi, 200) * 5
  y = x
  field = np.outer(np.sin(y) , np.cos(x))
```

We now define a function that lazily shifts an array. This is done using the method `delayed` from the Dask library. The Dask `delayed` function decorates your functions so that they operate lazily. Rather than executing your function immediately, it will defer execution, placing the function and its arguments into a task graph.<sup>[1]</sup>
```python
def dashift(array, shifts):
    delshift = delayed(shift)
    return da.from_delayed(delshift(array, shifts), dtype='float64', shape=array.shape)
```

Next, we define the desired range of x-shifts and y-shifts:
```python  
 x_shifts = np.arange(-10, 10)
 y_shifts = x_shifts
 n_s = len(x_shifts)
```

In the code snippet below, we take the product of arrays y_shifts and x_shifts to get tuples with all possibilities of (y,x). These tuples are passed to `dashift`, our delayed shift function, and the output arrays are stacked using dask.stack, to create an array of arrays. Finally, we use reshape and rechunk to get a 4D array with the required dimensions and we build the lazily shifted and unshifted arrays:

```python
    shifted = (da.stack(dashift(field, arg)
                    for arg in product(y_shifts, x_shifts))
                    ).reshape((n_s, n_s, *field.shape)).rechunk((1,1,-1,-1))
```

Following is a sample task graph visualization for smaller x_shifts and y_shifts arrays:

![image]({{ '/assets/tutorials/dask_taskgraph.png' | relative_url}})
We now use napari to visualise this parametric function:

```python
with napari.gui_qt():
  napari.view_image(shifted - field)
```
![image]({{ '/assets/tutorials/lazy_param_sweep.gif' | relative_url}})



## 2. Using parameter sweep with napari to find the best thresholding technique

Now, we proceed to a real-world application of the above concept. Making use of parameter sweep in napari can simplify many tasks, such as manually finding the best thresholding technique, or deciding the desired block size or window size to be passed as parameters for thresholding.

In the below example, we use `scikit-image` to import the data of a page, and then apply three different thresholding techniques, using parameter sweeps with napari:
- Adaptive thresholding: varying `block_size`
- Sauvola thresholding: varying `window_size`
- Niblack thresholding: varying `window_size`

The following code snippet illustrates the same:

```python

# importing required libraries
from skimage import data
import dask.array as da
import numpy as np
import napari
from skimage.filters import threshold_sauvola, threshold_local, threshold_niblack

# getting the data page
img = data.page()


# function for applying adaptive threshold for a given image and block_size
def adaptive_threshold(image, block_size):
    arr = da.from_array(image, chunks=image.shape)
    return arr > threshold_local(image, block_size, offset=10)

# function for applying Sauvola threshold for a given image and window_size
def sauvola_threshold(image, window_size):
    arr = da.from_array(image, chunks=image.shape)
    return arr > threshold_sauvola(image, window_size)

# function for applying Niblack threshold for a given image and window_size
def niblack_threshold(image, window_size):
    arr = da.from_array(image, chunks=image.shape)
    return arr > threshold_niblack(image, window_size)

# helper function to stack arrays after applying the thresholding technique passed as a paramenter.
def apply_threshold(f):
    arr=[]
    for t in np.arange(100):
        if t%2!=0:
            thresh=f(img, t)
            arr.append(thresh)
    return da.stack([t] for t in arr)

# creating arrays of thresholded images
all_adaptive_threshold= apply_threshold(adaptive_threshold)
all_sauvola_threshold = apply_threshold(sauvola_threshold)
all_niblack_threshold= apply_threshold(niblack_threshold)

# visualize the thresholded images using napari
with napari.gui_qt():
    viewer = napari.view_image(img, name='page')
    viewer.add_image(all_adaptive_threshold, name='thresholded_adaptive')
    viewer.add_image(all_sauvola_threshold, name='thresholded_sauvola')
    viewer.add_image(all_niblack_threshold, name='thresholded_niblack')
    
```
![image]({{ '/assets/tutorials/param_sweep.gif' | relative_url}})

## 3. Parameter Sweep with napari using the magicgui widget

We can use the magicgui widget along with napari to better visualize the different thresholding techniques. Here, the thresholded image is computed only for the layer and thresholding technique selected from the drop-down menus, for the value of `block_size` or `window_size` passed via the slider to the `apply_threshold` method.

First, we import the following libraries:
```python
from magicgui import magicgui, register_type
from magicgui._qt import QDoubleSlider
from napari import Viewer, gui_qt, layers
from skimage import data
from skimage.filters import threshold_sauvola, threshold_local, threshold_niblack
from math import floor
```

Next, we define the methods `get_layers` and `show_layer_result` to obtain the layers in the napari viewer, as well as add any new layers to display the result of thresholding:
```python
def get_layers(gui, layer_type):
    try:
        viewer = gui.parent().qt_viewer.viewer
        return tuple(l for l in viewer.layers if isinstance(l, layer_type))
    except AttributeError:
        return ()

def show_layer_result(gui, result, return_type) -> None:
    if result is None:
        return
    try:
        viewer = gui.parent().qt_viewer.viewer
    except AttributeError:
        return
    try:
        viewer.layers[gui.result_name].data = result
    except KeyError:
        adder = getattr(viewer, f"add_{return_type.__name__.lower()}")
        adder(data=result, name=gui.result_name)

register_type(layers.Layer, choices=get_layers, return_callback=show_layer_result)

```

We then create a viewer with napari, and add the `data.page()` image layer to try out parameter sweep with different thresholding techniques. We use the `magicgui` decorator for the method `apply_threshold` to turn it into a magicgui. 

`auto_call = True` indicates magicgui to call `apply_threshold` whenever the value of a parameter changes. The QDoubleSlider is used to pass the size parameter to the function, and we offer the choices to threshold an image layer using the adaptive, Sauvola and Niblack techniques:

```python
with gui_qt():
    # creating a viewer and adding the data.page() image layer
    viewer = Viewer()
    viewer.add_image(data.page(), name="page")
    
    # passing size as (2* floor(size/2)+1), as block-size and window size have to be odd natural numbers
    @magicgui(
        auto_call=True,
        size={"widget_type": QDoubleSlider, "maximum": 99, "fixedWidth": 400},
        technique={"choices": ["adaptive", "niblack", "sauvola"]},
    )
    def apply_threshold(layer: layers.Image, size=1, technique="adaptive") -> None:
        if layer:
            if technique=="adaptive":
                return layer.data > threshold_local(layer.data, (2* floor(size/2)+1))
            elif technique=="sauvola":
                return layer.data > threshold_sauvola(layer.data, (2* floor(size/2)+1))
            elif technique=="niblack":
                return layer.data > threshold_niblack(layer.data, (2* floor(size/2)+1))
  ```

Then, we instantiate our magicgui widget and connect it to the current viewer for updation of layer drop-down choices. We also add the gui as a widget to our viewer:

```python          
    gui = apply_threshold.Gui()
    gui.parentChanged.connect(gui.refresh_choices)
    viewer.layers.events.changed.connect(lambda x: gui.refresh_choices("layer"))
    viewer.window.add_dock_widget(gui)
```

The `show_result` method is a callback function to add the thresholded image to the layers. This updates the resultant layer whenever the `apply_threshold` method is called:
```python

    def show_result(result):
          try:
            viewer.layers["thresholded"].data = result
        except KeyError:
            viewer.add_image(data=result, name="thresholded")

       apply_threshold.called.connect(show_result)
 ```

![image]({{ '/assets/tutorials/magicgui.gif' | relative_url}})


### Further Reading:
- [Using Dask and napari to process & view large datasets](https://napari.org/tutorials/applications/dask)

### References:
- [Documentation on dask.delayed](https://docs.dask.org/en/latest/delayed.html)
- [Introducing napari: a fast n-dimensional image viewer in Python](https://ilovesymposia.com/2019/10/24/introducing-napari-a-fast-n-dimensional-image-viewer-in-python)
- [magicgui docs for napari parameter sweeps](https://magicgui.readthedocs.io/en/latest/examples/napari_parameter_sweep)


