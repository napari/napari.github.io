# single cell tracking with napari

In this application note, we will use napari (requires version 0.4.0 or greater) to visualize single cell tracking data.

1. Visualization of a Cell tracking challenge dataset
2. Single cell tracking using btrack and napari


## cell tracking challenge data
[cell tracking challenge](http://celltrackingchallenge.net/3d-datasets/)  
[dataset](http://data.celltrackingchallenge.net/training-datasets/Fluo-N3DH-CE.zip)

The volumetric data is anisotropic
```python
SCALE = (1.0, 1.0, 0.09, 0.09)
```


### extracting the tracks from the dataset

### calculating the graph using the lineage information

In the cell tracking challenge dataset, cell lineage information is stored in a LBEP table.

```python
lbep = np.loadtxt(os.path.join(PATH, '01_GT/TRA', 'man_track.txt'), dtype=np.uint)
full_graph = {row[0]: row[3] if row[3]>0 else row[0] for row in lbep}
```

We need to remove the root nodes (*i.e.* cells without a parent):
```python
graph = {k: v for k, v in full_graph.items() if k != v}
```

### traversing the trees to identify the root nodes

One property that is useful to visualize in single cell tracking is the `track_id` of the root node of the lineage trees, *i.e.* the founder cell.

```python
def root(node):
    """ Recursive function to determine the root node of each graph.

    Parameters
    ----------
    node : int
        the track_id of the starting graph node.
    """
    if node == full_graph[node]:
        return node
    return root(full_graph[node])

roots = {k: root(k) for k in full_graph.keys()}
```

Using this information, we can color the tracks using the `root_id` as a property:
```python
properties = {'root_id': [roots[idx] for idx in tracks[:,0]]}
```

We can visualize the tracks in napari. Note that we need to initialize and interact with the napari view in the `with napari.gui_qt()` context manager in order to ensure the GUI is property initialized.

```python
with napari.gui_qt():
    viewer = napari.Viewer()
    viewer.add_image(images, scale=SCALE)
    viewer.add_points(tracks[:, 1:], size=1, scale=SCALE)
    viewer.add_tracks(tracks, properties=properties, graph=graph, scale=SCALE)
```

---

## using `btrack` to track cells


```python
with btrack.BayesianTracker() as tracker:

    # configure the tracker using a config file
    tracker.configure_from_file('../models/cell_config.json')

    tracker.append(objects)
    tracker.volume=((0,1600), (0,1200), (-1e5,1e5))

    # track and optimize
    tracker.track_interactive(step_size=100)
    tracker.optimize()

    # get the tracks in a format for napari visualization
    data, properties, graph = tracker.to_napari(ndim=2)
```


We can test the segmentation and view it in napari. Note that we need to initialize and interact with the napari view in the `with napari.gui_qt()` context manager in order to ensure the GUI is property initialized.



## summary
In this tutorial, we have used napari to view and annotate segmentation results.

## further reading

[Documentation on dask.delayed](https://docs.dask.org/en/latest/delayed.html)


{% include footer.md %}
