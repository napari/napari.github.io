(extending-napari)=

# Extending napari

There are a number of ways to extend your usage of the napari application:

- [**Adding widgets**](creating-widgets): adding a widget (new GUI interaction element)
  to your napari application
- **Connecting callbacks**: customize the behavior of napari by connecting an action
  (function) to an event via the [event loop](intro-to-event-loop):
  - [**Key press**](connect-key-event): perform an action based on a keyboard shortcut
  - [**Mouse event**](connect-mouse-event): perform an action based on a mouse event
  - [**Layer/viewer event**](connect-napari-event): perform an action when a layer or
    napari viewer state changes

None of the above require you to create a [plugin](plugins-index) but you can
turn your napari 'extension' into a plugin, which could be shared with the
community.
