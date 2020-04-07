# Using Dask and napari to view and process a high-resolution human brain imaging dataset.
We used napari to view and process a high-resolution human brain imaging dataset, and in the following tutorial we will break down how it all builds up!

The dataset was obtained from Dr. Brian Edlow's Lab for NeuroImaging of Coma and Consciousness, which is dedicated to promoting recovery of consciousness in people with severe brain injuries.
This dataset is a 100 micron resolution magnetic resonance imaging (MRI) scan of an ex vivo human brain specimen. The brain specimen was donated by a 58-year-old woman who had no history of neurological disease and died of non-neurological causes.

An important concept to bear in mind when going through this tutorial is [Lazy Loading](https://en.wikipedia.org/wiki/Lazy_evaluation), i.e., only loading images to memory when the position slider on napari maps to that particular image, which is very useful when using large datasets.

#### So how can we lazily load an image using dask?
First, we import delayed from dask, which is the main function responsible for handling __Lazy Loading__. Here we defined a function *load_image()* that will lazy load the image data when called given a path to the data. 
```python

from dask import delayed
import dask.array as da
def load_image(image_name):
	delayed_image_load = delayed(io.imread)
	return da.from_delayed(delayed_image_load(image_name), dtype='float64', shape=(1760, 1760))
```
#### Getting the data

You can download the dataset from [here](https://datadryad.org/stash/downloads/file_stream/223913). A ZIP file will be downloaded, after unzipping the compressed dataset, the `.tiff` images will be extracted to the `SYNTHESIZED_TIFF_Images_Raw/Synthesized_FLASH25_100um_TIFF_Axial_Images/` directory. Now your dataset is ready to be used!



#### Reading images from a folder
To load images from a folder we use [`io.imread`](https://scikit-image.org/docs/dev/api/skimage.io.html#skimage.io.imread), but first we need to import io from skimage.
```python
 delayed_image_load = delayed(io.imread)
```

And to read images from a folder, you should `import glob` to list all the images in the dataset folder:
```python
images_names = glob.glob(
'SYNTHESIZED_TIFF_Images_Raw/Synthesized_FLASH25_100um_TIFF_Axial_Images/Synthesized_FLASH25_Axial_*.tiff')
images_names = sorted(images_names)
```
Here we use the `sorted` function to sort the images, as `glob` returns the images unsorted.


#### Using dask.stack() to concatenate images

Dask.array.stack (seq, axis=0) used to stack many existing dask arrays into a new array, creating a new dimension (axis=0 by default), And this is how it is used:
```python
images = da.stack(load_image(image_name) for image_name in images_names) 
```



Here's the complete code:
``` python
from dask import delayed
import dask.array as da
import napari
import glob
from skimage import io

def load_image(image_name):
	delayed_image_load = delayed(io.imread)
	return da.from_delayed(delayed_image_load(image_name), dtype='float64', shape=(1760, 1760))

if __name__ == '__main__':
    # Load images
    images_names = glob.glob(
        'SYNTHESIZED_TIFF_Images_Raw/Synthesized_FLASH25_100um_TIFF_Axial_Images/Synthesized_FLASH25_Axial_*.tiff')
    images_names = sorted(images_names)
    images = da.stack(load_image(image_name) for image_name in images_names).reshape(len(images_names), 1760, 1760)
    with napari.gui_qt():
        napari.view_image(images) 
```

__And here's the final output!__
![Alt text](https://media.giphy.com/media/LO3gPbCs5AxApjAehW/giphy.gif)
