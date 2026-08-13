## Layers controls
### Dependencies diagram (related `napari` modules)
```{mermaid}
graph LR
	accTitle: Dependencies between modules in the napari Layers controls UI section
	accDescr: Diagram showing the dependencies between the modules involved in the definition of the napari Layers controls UI section
	napari._qt(napari._qt)
	napari._qt --> napari._qt.qt_main_window
	click napari._qt "https://github.com/napari/napari/tree/main/napari/_qt/__init__.py" _blank
	napari._qt.layer_controls(napari._qt.layer_controls)
	napari._qt.layer_controls --> napari._qt.layer_controls.qt_layer_controls_container
	click napari._qt.layer_controls "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/__init__.py" _blank
	napari._qt.layer_controls.qt_image_controls(napari._qt.layer_controls.qt_image_controls)
	napari._qt.layer_controls.qt_image_controls --> napari._qt.layer_controls.qt_image_controls_base
	napari._qt.layer_controls.qt_image_controls --> napari._qt.layer_controls.widgets
	napari._qt.layer_controls.qt_image_controls --> napari._qt.layer_controls.widgets._image
	napari._qt.layer_controls.qt_image_controls --> napari.layers
	click napari._qt.layer_controls.qt_image_controls "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/qt_image_controls.py" _blank
	napari._qt.layer_controls.qt_image_controls_base(napari._qt.layer_controls.qt_image_controls_base)
	napari._qt.layer_controls.qt_image_controls_base --> napari._qt.layer_controls.qt_layer_controls_base
	napari._qt.layer_controls.qt_image_controls_base --> napari._qt.layer_controls.widgets
	napari._qt.layer_controls.qt_image_controls_base --> napari._qt.layer_controls.widgets.qt_histogram_control
	napari._qt.layer_controls.qt_image_controls_base --> napari.layers
	click napari._qt.layer_controls.qt_image_controls_base "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/qt_image_controls_base.py" _blank
	napari._qt.layer_controls.qt_labels_controls(napari._qt.layer_controls.qt_labels_controls)
	napari._qt.layer_controls.qt_labels_controls --> napari._qt.layer_controls.qt_layer_controls_base
	napari._qt.layer_controls.qt_labels_controls --> napari._qt.layer_controls.widgets
	napari._qt.layer_controls.qt_labels_controls --> napari._qt.layer_controls.widgets._labels
	napari._qt.layer_controls.qt_labels_controls --> napari._qt.widgets.qt_mode_buttons
	napari._qt.layer_controls.qt_labels_controls --> napari.layers
	click napari._qt.layer_controls.qt_labels_controls "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/qt_labels_controls.py" _blank
	napari._qt.layer_controls.qt_layer_controls_base(napari._qt.layer_controls.qt_layer_controls_base)
	napari._qt.layer_controls.qt_layer_controls_base --> napari._qt.layer_controls.widgets
	napari._qt.layer_controls.qt_layer_controls_base --> napari._qt.widgets.qt_mode_buttons
	click napari._qt.layer_controls.qt_layer_controls_base "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/qt_layer_controls_base.py" _blank
	napari._qt.layer_controls.qt_layer_controls_container(napari._qt.layer_controls.qt_layer_controls_container)
	napari._qt.layer_controls.qt_layer_controls_container --> napari._qt.layer_controls.qt_image_controls
	napari._qt.layer_controls.qt_layer_controls_container --> napari._qt.layer_controls.qt_labels_controls
	napari._qt.layer_controls.qt_layer_controls_container --> napari._qt.layer_controls.qt_points_controls
	napari._qt.layer_controls.qt_layer_controls_container --> napari._qt.layer_controls.qt_shapes_controls
	napari._qt.layer_controls.qt_layer_controls_container --> napari._qt.layer_controls.qt_surface_controls
	napari._qt.layer_controls.qt_layer_controls_container --> napari._qt.layer_controls.qt_tracks_controls
	napari._qt.layer_controls.qt_layer_controls_container --> napari._qt.layer_controls.qt_vectors_controls
	napari._qt.layer_controls.qt_layer_controls_container --> napari.layers
	click napari._qt.layer_controls.qt_layer_controls_container "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/qt_layer_controls_container.py" _blank
	napari._qt.layer_controls.qt_points_controls(napari._qt.layer_controls.qt_points_controls)
	napari._qt.layer_controls.qt_points_controls --> napari._qt.layer_controls.qt_layer_controls_base
	napari._qt.layer_controls.qt_points_controls --> napari._qt.layer_controls.widgets
	napari._qt.layer_controls.qt_points_controls --> napari._qt.layer_controls.widgets._points
	napari._qt.layer_controls.qt_points_controls --> napari._qt.widgets.qt_mode_buttons
	napari._qt.layer_controls.qt_points_controls --> napari.layers
	click napari._qt.layer_controls.qt_points_controls "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/qt_points_controls.py" _blank
	napari._qt.layer_controls.qt_shapes_controls(napari._qt.layer_controls.qt_shapes_controls)
	napari._qt.layer_controls.qt_shapes_controls --> napari._qt.layer_controls.qt_layer_controls_base
	napari._qt.layer_controls.qt_shapes_controls --> napari._qt.layer_controls.widgets
	napari._qt.layer_controls.qt_shapes_controls --> napari._qt.layer_controls.widgets._shapes
	napari._qt.layer_controls.qt_shapes_controls --> napari._qt.widgets.qt_mode_buttons
	napari._qt.layer_controls.qt_shapes_controls --> napari.layers
	click napari._qt.layer_controls.qt_shapes_controls "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/qt_shapes_controls.py" _blank
	napari._qt.layer_controls.qt_surface_controls(napari._qt.layer_controls.qt_surface_controls)
	napari._qt.layer_controls.qt_surface_controls --> napari._qt.layer_controls.qt_image_controls_base
	napari._qt.layer_controls.qt_surface_controls --> napari._qt.layer_controls.widgets
	napari._qt.layer_controls.qt_surface_controls --> napari._qt.layer_controls.widgets._surface
	napari._qt.layer_controls.qt_surface_controls --> napari.layers
	click napari._qt.layer_controls.qt_surface_controls "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/qt_surface_controls.py" _blank
	napari._qt.layer_controls.qt_tracks_controls(napari._qt.layer_controls.qt_tracks_controls)
	napari._qt.layer_controls.qt_tracks_controls --> napari._qt.layer_controls.qt_layer_controls_base
	napari._qt.layer_controls.qt_tracks_controls --> napari._qt.layer_controls.widgets
	napari._qt.layer_controls.qt_tracks_controls --> napari._qt.layer_controls.widgets._tracks
	napari._qt.layer_controls.qt_tracks_controls --> napari.layers
	click napari._qt.layer_controls.qt_tracks_controls "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/qt_tracks_controls.py" _blank
	napari._qt.layer_controls.qt_vectors_controls(napari._qt.layer_controls.qt_vectors_controls)
	napari._qt.layer_controls.qt_vectors_controls --> napari._qt.layer_controls.qt_layer_controls_base
	napari._qt.layer_controls.qt_vectors_controls --> napari._qt.layer_controls.widgets
	napari._qt.layer_controls.qt_vectors_controls --> napari._qt.layer_controls.widgets._vectors
	napari._qt.layer_controls.qt_vectors_controls --> napari.layers
	click napari._qt.layer_controls.qt_vectors_controls "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/qt_vectors_controls.py" _blank
	napari._qt.layer_controls.widgets(napari._qt.layer_controls.widgets)
	napari._qt.layer_controls.widgets --> napari._qt.layer_controls.widgets.qt_colormap_control
	napari._qt.layer_controls.widgets --> napari._qt.layer_controls.widgets.qt_contrast_limits
	napari._qt.layer_controls.widgets --> napari._qt.layer_controls.widgets.qt_face_color
	napari._qt.layer_controls.widgets --> napari._qt.layer_controls.widgets.qt_gamma_slider
	napari._qt.layer_controls.widgets --> napari._qt.layer_controls.widgets.qt_histogram_control
	napari._qt.layer_controls.widgets --> napari._qt.layer_controls.widgets.qt_multiscale_level_control
	napari._qt.layer_controls.widgets --> napari._qt.layer_controls.widgets.qt_opacity_blending_controls
	napari._qt.layer_controls.widgets --> napari._qt.layer_controls.widgets.qt_out_slice_checkbox
	napari._qt.layer_controls.widgets --> napari._qt.layer_controls.widgets.qt_projection_mode_control
	napari._qt.layer_controls.widgets --> napari._qt.layer_controls.widgets.qt_text_visibility
	napari._qt.layer_controls.widgets --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	click napari._qt.layer_controls.widgets "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/__init__.py" _blank
	napari._qt.layer_controls.widgets._image(napari._qt.layer_controls.widgets._image)
	napari._qt.layer_controls.widgets._image --> napari._qt.layer_controls.widgets._image.qt_depiction_control
	napari._qt.layer_controls.widgets._image --> napari._qt.layer_controls.widgets._image.qt_interpolation_combobox
	napari._qt.layer_controls.widgets._image --> napari._qt.layer_controls.widgets._image.qt_render_control
	napari._qt.layer_controls.widgets._image --> napari._qt.layer_controls.widgets.qt_histogram_control
	click napari._qt.layer_controls.widgets._image "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_image/__init__.py" _blank
	napari._qt.layer_controls.widgets._image.qt_depiction_control(napari._qt.layer_controls.widgets._image.qt_depiction_control)
	napari._qt.layer_controls.widgets._image.qt_depiction_control --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._image.qt_depiction_control --> napari.layers
	click napari._qt.layer_controls.widgets._image.qt_depiction_control "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_image/qt_depiction_control.py" _blank
	napari._qt.layer_controls.widgets._image.qt_interpolation_combobox(napari._qt.layer_controls.widgets._image.qt_interpolation_combobox)
	napari._qt.layer_controls.widgets._image.qt_interpolation_combobox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._image.qt_interpolation_combobox --> napari.layers
	click napari._qt.layer_controls.widgets._image.qt_interpolation_combobox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_image/qt_interpolation_combobox.py" _blank
	napari._qt.layer_controls.widgets._image.qt_render_control(napari._qt.layer_controls.widgets._image.qt_render_control)
	napari._qt.layer_controls.widgets._image.qt_render_control --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._image.qt_render_control --> napari.layers
	click napari._qt.layer_controls.widgets._image.qt_render_control "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_image/qt_render_control.py" _blank
	napari._qt.layer_controls.widgets._labels(napari._qt.layer_controls.widgets._labels)
	napari._qt.layer_controls.widgets._labels --> napari._qt.layer_controls.widgets._labels.qt_brush_size_slider
	napari._qt.layer_controls.widgets._labels --> napari._qt.layer_controls.widgets._labels.qt_color_mode_combobox
	napari._qt.layer_controls.widgets._labels --> napari._qt.layer_controls.widgets._labels.qt_contiguous_checkbox
	napari._qt.layer_controls.widgets._labels --> napari._qt.layer_controls.widgets._labels.qt_contour_spinbox
	napari._qt.layer_controls.widgets._labels --> napari._qt.layer_controls.widgets._labels.qt_display_selected_label_checkbox
	napari._qt.layer_controls.widgets._labels --> napari._qt.layer_controls.widgets._labels.qt_label_color
	napari._qt.layer_controls.widgets._labels --> napari._qt.layer_controls.widgets._labels.qt_ndim_spinbox
	napari._qt.layer_controls.widgets._labels --> napari._qt.layer_controls.widgets._labels.qt_preserve_labels_checkbox
	napari._qt.layer_controls.widgets._labels --> napari._qt.layer_controls.widgets._labels.qt_render_control
	click napari._qt.layer_controls.widgets._labels "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_labels/__init__.py" _blank
	napari._qt.layer_controls.widgets._labels.qt_brush_size_slider(napari._qt.layer_controls.widgets._labels.qt_brush_size_slider)
	napari._qt.layer_controls.widgets._labels.qt_brush_size_slider --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._labels.qt_brush_size_slider --> napari.layers
	click napari._qt.layer_controls.widgets._labels.qt_brush_size_slider "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_labels/qt_brush_size_slider.py" _blank
	napari._qt.layer_controls.widgets._labels.qt_color_mode_combobox(napari._qt.layer_controls.widgets._labels.qt_color_mode_combobox)
	napari._qt.layer_controls.widgets._labels.qt_color_mode_combobox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._labels.qt_color_mode_combobox --> napari.layers
	click napari._qt.layer_controls.widgets._labels.qt_color_mode_combobox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_labels/qt_color_mode_combobox.py" _blank
	napari._qt.layer_controls.widgets._labels.qt_contiguous_checkbox(napari._qt.layer_controls.widgets._labels.qt_contiguous_checkbox)
	napari._qt.layer_controls.widgets._labels.qt_contiguous_checkbox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._labels.qt_contiguous_checkbox --> napari.layers
	click napari._qt.layer_controls.widgets._labels.qt_contiguous_checkbox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_labels/qt_contiguous_checkbox.py" _blank
	napari._qt.layer_controls.widgets._labels.qt_contour_spinbox(napari._qt.layer_controls.widgets._labels.qt_contour_spinbox)
	napari._qt.layer_controls.widgets._labels.qt_contour_spinbox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._labels.qt_contour_spinbox --> napari.layers
	click napari._qt.layer_controls.widgets._labels.qt_contour_spinbox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_labels/qt_contour_spinbox.py" _blank
	napari._qt.layer_controls.widgets._labels.qt_display_selected_label_checkbox(napari._qt.layer_controls.widgets._labels.qt_display_selected_label_checkbox)
	napari._qt.layer_controls.widgets._labels.qt_display_selected_label_checkbox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._labels.qt_display_selected_label_checkbox --> napari.layers
	click napari._qt.layer_controls.widgets._labels.qt_display_selected_label_checkbox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_labels/qt_display_selected_label_checkbox.py" _blank
	napari._qt.layer_controls.widgets._labels.qt_label_color(napari._qt.layer_controls.widgets._labels.qt_label_color)
	napari._qt.layer_controls.widgets._labels.qt_label_color --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._labels.qt_label_color --> napari.layers
	click napari._qt.layer_controls.widgets._labels.qt_label_color "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_labels/qt_label_color.py" _blank
	napari._qt.layer_controls.widgets._labels.qt_ndim_spinbox(napari._qt.layer_controls.widgets._labels.qt_ndim_spinbox)
	napari._qt.layer_controls.widgets._labels.qt_ndim_spinbox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._labels.qt_ndim_spinbox --> napari.layers
	click napari._qt.layer_controls.widgets._labels.qt_ndim_spinbox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_labels/qt_ndim_spinbox.py" _blank
	napari._qt.layer_controls.widgets._labels.qt_preserve_labels_checkbox(napari._qt.layer_controls.widgets._labels.qt_preserve_labels_checkbox)
	napari._qt.layer_controls.widgets._labels.qt_preserve_labels_checkbox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._labels.qt_preserve_labels_checkbox --> napari.layers
	click napari._qt.layer_controls.widgets._labels.qt_preserve_labels_checkbox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_labels/qt_preserve_labels_checkbox.py" _blank
	napari._qt.layer_controls.widgets._labels.qt_render_control(napari._qt.layer_controls.widgets._labels.qt_render_control)
	napari._qt.layer_controls.widgets._labels.qt_render_control --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._labels.qt_render_control --> napari.layers
	click napari._qt.layer_controls.widgets._labels.qt_render_control "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_labels/qt_render_control.py" _blank
	napari._qt.layer_controls.widgets._points(napari._qt.layer_controls.widgets._points)
	napari._qt.layer_controls.widgets._points --> napari._qt.layer_controls.widgets._points.qt_border_color
	napari._qt.layer_controls.widgets._points --> napari._qt.layer_controls.widgets._points.qt_current_size_slider
	napari._qt.layer_controls.widgets._points --> napari._qt.layer_controls.widgets._points.qt_symbol_combobox
	click napari._qt.layer_controls.widgets._points "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_points/__init__.py" _blank
	napari._qt.layer_controls.widgets._points.qt_border_color(napari._qt.layer_controls.widgets._points.qt_border_color)
	napari._qt.layer_controls.widgets._points.qt_border_color --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._points.qt_border_color --> napari.layers
	click napari._qt.layer_controls.widgets._points.qt_border_color "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_points/qt_border_color.py" _blank
	napari._qt.layer_controls.widgets._points.qt_current_size_slider(napari._qt.layer_controls.widgets._points.qt_current_size_slider)
	napari._qt.layer_controls.widgets._points.qt_current_size_slider --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._points.qt_current_size_slider --> napari.layers
	click napari._qt.layer_controls.widgets._points.qt_current_size_slider "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_points/qt_current_size_slider.py" _blank
	napari._qt.layer_controls.widgets._points.qt_symbol_combobox(napari._qt.layer_controls.widgets._points.qt_symbol_combobox)
	napari._qt.layer_controls.widgets._points.qt_symbol_combobox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._points.qt_symbol_combobox --> napari.layers
	click napari._qt.layer_controls.widgets._points.qt_symbol_combobox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_points/qt_symbol_combobox.py" _blank
	napari._qt.layer_controls.widgets._shapes(napari._qt.layer_controls.widgets._shapes)
	napari._qt.layer_controls.widgets._shapes --> napari._qt.layer_controls.widgets._shapes.qt_edge_color
	napari._qt.layer_controls.widgets._shapes --> napari._qt.layer_controls.widgets._shapes.qt_edge_width_slider
	click napari._qt.layer_controls.widgets._shapes "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_shapes/__init__.py" _blank
	napari._qt.layer_controls.widgets._shapes.qt_edge_color(napari._qt.layer_controls.widgets._shapes.qt_edge_color)
	napari._qt.layer_controls.widgets._shapes.qt_edge_color --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._shapes.qt_edge_color --> napari.layers
	click napari._qt.layer_controls.widgets._shapes.qt_edge_color "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_shapes/qt_edge_color.py" _blank
	napari._qt.layer_controls.widgets._shapes.qt_edge_width_slider(napari._qt.layer_controls.widgets._shapes.qt_edge_width_slider)
	napari._qt.layer_controls.widgets._shapes.qt_edge_width_slider --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._shapes.qt_edge_width_slider --> napari.layers
	click napari._qt.layer_controls.widgets._shapes.qt_edge_width_slider "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_shapes/qt_edge_width_slider.py" _blank
	napari._qt.layer_controls.widgets._surface(napari._qt.layer_controls.widgets._surface)
	napari._qt.layer_controls.widgets._surface --> napari._qt.layer_controls.widgets._surface.qt_shading_combobox
	click napari._qt.layer_controls.widgets._surface "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_surface/__init__.py" _blank
	napari._qt.layer_controls.widgets._surface.qt_shading_combobox(napari._qt.layer_controls.widgets._surface.qt_shading_combobox)
	napari._qt.layer_controls.widgets._surface.qt_shading_combobox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._surface.qt_shading_combobox --> napari.layers
	click napari._qt.layer_controls.widgets._surface.qt_shading_combobox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_surface/qt_shading_combobox.py" _blank
	napari._qt.layer_controls.widgets._tracks(napari._qt.layer_controls.widgets._tracks)
	napari._qt.layer_controls.widgets._tracks --> napari._qt.layer_controls.widgets._tracks.qt_color_properties_combobox
	napari._qt.layer_controls.widgets._tracks --> napari._qt.layer_controls.widgets._tracks.qt_colormap_control
	napari._qt.layer_controls.widgets._tracks --> napari._qt.layer_controls.widgets._tracks.qt_graph_checkbox
	napari._qt.layer_controls.widgets._tracks --> napari._qt.layer_controls.widgets._tracks.qt_head_slider
	napari._qt.layer_controls.widgets._tracks --> napari._qt.layer_controls.widgets._tracks.qt_hide_completed_tracks_checkbox
	napari._qt.layer_controls.widgets._tracks --> napari._qt.layer_controls.widgets._tracks.qt_id_checkbox
	napari._qt.layer_controls.widgets._tracks --> napari._qt.layer_controls.widgets._tracks.qt_tail_control
	click napari._qt.layer_controls.widgets._tracks "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_tracks/__init__.py" _blank
	napari._qt.layer_controls.widgets._tracks.qt_color_properties_combobox(napari._qt.layer_controls.widgets._tracks.qt_color_properties_combobox)
	napari._qt.layer_controls.widgets._tracks.qt_color_properties_combobox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._tracks.qt_color_properties_combobox --> napari.layers
	click napari._qt.layer_controls.widgets._tracks.qt_color_properties_combobox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_tracks/qt_color_properties_combobox.py" _blank
	napari._qt.layer_controls.widgets._tracks.qt_colormap_control(napari._qt.layer_controls.widgets._tracks.qt_colormap_control)
	napari._qt.layer_controls.widgets._tracks.qt_colormap_control --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._tracks.qt_colormap_control --> napari.layers
	click napari._qt.layer_controls.widgets._tracks.qt_colormap_control "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_tracks/qt_colormap_control.py" _blank
	napari._qt.layer_controls.widgets._tracks.qt_graph_checkbox(napari._qt.layer_controls.widgets._tracks.qt_graph_checkbox)
	napari._qt.layer_controls.widgets._tracks.qt_graph_checkbox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._tracks.qt_graph_checkbox --> napari.layers
	click napari._qt.layer_controls.widgets._tracks.qt_graph_checkbox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_tracks/qt_graph_checkbox.py" _blank
	napari._qt.layer_controls.widgets._tracks.qt_head_slider(napari._qt.layer_controls.widgets._tracks.qt_head_slider)
	napari._qt.layer_controls.widgets._tracks.qt_head_slider --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._tracks.qt_head_slider --> napari.layers
	click napari._qt.layer_controls.widgets._tracks.qt_head_slider "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_tracks/qt_head_slider.py" _blank
	napari._qt.layer_controls.widgets._tracks.qt_hide_completed_tracks_checkbox(napari._qt.layer_controls.widgets._tracks.qt_hide_completed_tracks_checkbox)
	napari._qt.layer_controls.widgets._tracks.qt_hide_completed_tracks_checkbox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._tracks.qt_hide_completed_tracks_checkbox --> napari.layers
	click napari._qt.layer_controls.widgets._tracks.qt_hide_completed_tracks_checkbox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_tracks/qt_hide_completed_tracks_checkbox.py" _blank
	napari._qt.layer_controls.widgets._tracks.qt_id_checkbox(napari._qt.layer_controls.widgets._tracks.qt_id_checkbox)
	napari._qt.layer_controls.widgets._tracks.qt_id_checkbox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._tracks.qt_id_checkbox --> napari.layers
	click napari._qt.layer_controls.widgets._tracks.qt_id_checkbox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_tracks/qt_id_checkbox.py" _blank
	napari._qt.layer_controls.widgets._tracks.qt_tail_control(napari._qt.layer_controls.widgets._tracks.qt_tail_control)
	napari._qt.layer_controls.widgets._tracks.qt_tail_control --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._tracks.qt_tail_control --> napari.layers
	click napari._qt.layer_controls.widgets._tracks.qt_tail_control "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_tracks/qt_tail_control.py" _blank
	napari._qt.layer_controls.widgets._vectors(napari._qt.layer_controls.widgets._vectors)
	napari._qt.layer_controls.widgets._vectors --> napari._qt.layer_controls.widgets._vectors.qt_edge_color
	napari._qt.layer_controls.widgets._vectors --> napari._qt.layer_controls.widgets._vectors.qt_line_dimension_spinbox
	napari._qt.layer_controls.widgets._vectors --> napari._qt.layer_controls.widgets._vectors.qt_vector_style_combobox
	click napari._qt.layer_controls.widgets._vectors "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_vectors/__init__.py" _blank
	napari._qt.layer_controls.widgets._vectors.qt_edge_color(napari._qt.layer_controls.widgets._vectors.qt_edge_color)
	napari._qt.layer_controls.widgets._vectors.qt_edge_color --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._vectors.qt_edge_color --> napari.layers
	click napari._qt.layer_controls.widgets._vectors.qt_edge_color "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_vectors/qt_edge_color.py" _blank
	napari._qt.layer_controls.widgets._vectors.qt_line_dimension_spinbox(napari._qt.layer_controls.widgets._vectors.qt_line_dimension_spinbox)
	napari._qt.layer_controls.widgets._vectors.qt_line_dimension_spinbox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._vectors.qt_line_dimension_spinbox --> napari.layers
	click napari._qt.layer_controls.widgets._vectors.qt_line_dimension_spinbox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_vectors/qt_line_dimension_spinbox.py" _blank
	napari._qt.layer_controls.widgets._vectors.qt_vector_style_combobox(napari._qt.layer_controls.widgets._vectors.qt_vector_style_combobox)
	napari._qt.layer_controls.widgets._vectors.qt_vector_style_combobox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets._vectors.qt_vector_style_combobox --> napari.layers
	click napari._qt.layer_controls.widgets._vectors.qt_vector_style_combobox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/_vectors/qt_vector_style_combobox.py" _blank
	napari._qt.layer_controls.widgets.qt_colormap_control(napari._qt.layer_controls.widgets.qt_colormap_control)
	napari._qt.layer_controls.widgets.qt_colormap_control --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	click napari._qt.layer_controls.widgets.qt_colormap_control "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/qt_colormap_control.py" _blank
	napari._qt.layer_controls.widgets.qt_contrast_limits(napari._qt.layer_controls.widgets.qt_contrast_limits)
	napari._qt.layer_controls.widgets.qt_contrast_limits --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets.qt_contrast_limits --> napari._qt.widgets.qt_mode_buttons
	napari._qt.layer_controls.widgets.qt_contrast_limits --> napari.layers
	click napari._qt.layer_controls.widgets.qt_contrast_limits "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/qt_contrast_limits.py" _blank
	napari._qt.layer_controls.widgets.qt_face_color(napari._qt.layer_controls.widgets.qt_face_color)
	napari._qt.layer_controls.widgets.qt_face_color --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets.qt_face_color --> napari.layers
	click napari._qt.layer_controls.widgets.qt_face_color "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/qt_face_color.py" _blank
	napari._qt.layer_controls.widgets.qt_gamma_slider(napari._qt.layer_controls.widgets.qt_gamma_slider)
	napari._qt.layer_controls.widgets.qt_gamma_slider --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	click napari._qt.layer_controls.widgets.qt_gamma_slider "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/qt_gamma_slider.py" _blank
	napari._qt.layer_controls.widgets.qt_histogram_control(napari._qt.layer_controls.widgets.qt_histogram_control)
	napari._qt.layer_controls.widgets.qt_histogram_control --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets.qt_histogram_control --> napari.layers
	click napari._qt.layer_controls.widgets.qt_histogram_control "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/qt_histogram_control.py" _blank
	napari._qt.layer_controls.widgets.qt_multiscale_level_control(napari._qt.layer_controls.widgets.qt_multiscale_level_control)
	napari._qt.layer_controls.widgets.qt_multiscale_level_control --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets.qt_multiscale_level_control --> napari.layers
	click napari._qt.layer_controls.widgets.qt_multiscale_level_control "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/qt_multiscale_level_control.py" _blank
	napari._qt.layer_controls.widgets.qt_opacity_blending_controls(napari._qt.layer_controls.widgets.qt_opacity_blending_controls)
	napari._qt.layer_controls.widgets.qt_opacity_blending_controls --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	click napari._qt.layer_controls.widgets.qt_opacity_blending_controls "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/qt_opacity_blending_controls.py" _blank
	napari._qt.layer_controls.widgets.qt_out_slice_checkbox(napari._qt.layer_controls.widgets.qt_out_slice_checkbox)
	napari._qt.layer_controls.widgets.qt_out_slice_checkbox --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	click napari._qt.layer_controls.widgets.qt_out_slice_checkbox "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/qt_out_slice_checkbox.py" _blank
	napari._qt.layer_controls.widgets.qt_projection_mode_control(napari._qt.layer_controls.widgets.qt_projection_mode_control)
	napari._qt.layer_controls.widgets.qt_projection_mode_control --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	napari._qt.layer_controls.widgets.qt_projection_mode_control --> napari.layers
	click napari._qt.layer_controls.widgets.qt_projection_mode_control "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/qt_projection_mode_control.py" _blank
	napari._qt.layer_controls.widgets.qt_text_visibility(napari._qt.layer_controls.widgets.qt_text_visibility)
	napari._qt.layer_controls.widgets.qt_text_visibility --> napari._qt.layer_controls.widgets.qt_widget_controls_base
	click napari._qt.layer_controls.widgets.qt_text_visibility "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/qt_text_visibility.py" _blank
	napari._qt.layer_controls.widgets.qt_widget_controls_base(napari._qt.layer_controls.widgets.qt_widget_controls_base)
	click napari._qt.layer_controls.widgets.qt_widget_controls_base "https://github.com/napari/napari/tree/main/napari/_qt/layer_controls/widgets/qt_widget_controls_base.py" _blank
	napari._qt.qt_main_window(napari._qt.qt_main_window)
	napari._qt.qt_main_window --> napari._qt.qt_viewer
	napari._qt.qt_main_window --> napari._qt.widgets.qt_command_palette
	napari._qt.qt_main_window --> napari._qt.widgets.qt_viewer_dock_widget
	napari._qt.qt_main_window --> napari._qt.widgets.qt_viewer_tour
	napari._qt.qt_main_window --> napari.viewer
	click napari._qt.qt_main_window "https://github.com/napari/napari/tree/main/napari/_qt/qt_main_window.py" _blank
	napari._qt.qt_viewer(napari._qt.qt_viewer)
	napari._qt.qt_viewer --> napari._qt.layer_controls
	napari._qt.qt_viewer --> napari._qt.widgets.qt_viewer_dock_widget
	napari._qt.qt_viewer --> napari.layers
	click napari._qt.qt_viewer "https://github.com/napari/napari/tree/main/napari/_qt/qt_viewer.py" _blank
	napari._qt.widgets.qt_command_palette(napari._qt.widgets.qt_command_palette)
	napari._qt.widgets.qt_command_palette --> napari._qt.qt_main_window
	click napari._qt.widgets.qt_command_palette "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_command_palette.py" _blank
	napari._qt.widgets.qt_mode_buttons(napari._qt.widgets.qt_mode_buttons)
	napari._qt.widgets.qt_mode_buttons --> napari.layers
	click napari._qt.widgets.qt_mode_buttons "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_mode_buttons.py" _blank
	napari._qt.widgets.qt_viewer_dock_widget(napari._qt.widgets.qt_viewer_dock_widget)
	napari._qt.widgets.qt_viewer_dock_widget --> napari._qt.qt_viewer
	napari._qt.widgets.qt_viewer_dock_widget --> napari.viewer
	click napari._qt.widgets.qt_viewer_dock_widget "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_viewer_dock_widget.py" _blank
	napari._qt.widgets.qt_viewer_tour(napari._qt.widgets.qt_viewer_tour)
	napari._qt.widgets.qt_viewer_tour --> napari._qt.qt_main_window
	click napari._qt.widgets.qt_viewer_tour "https://github.com/napari/napari/tree/main/napari/_qt/widgets/qt_viewer_tour.py" _blank
	napari.layers(napari.layers)
	click napari.layers "https://github.com/napari/napari/tree/main/napari/layers/__init__.py" _blank
	napari.viewer(napari.viewer)
	napari.viewer --> napari._qt
	napari.viewer --> napari._qt.qt_main_window
	click napari.viewer "https://github.com/napari/napari/tree/main/napari/viewer.py" _blank
	subgraph module.napari[napari]
		 napari._qt
		 napari.layers
		 napari.viewer
	end
	class module.napari subgraphs
	subgraph module.napari._qt[napari._qt]
		 napari._qt.layer_controls
		 napari._qt.qt_main_window
		 napari._qt.qt_viewer
	end
	class module.napari._qt subgraphs
	subgraph module.napari._qt.layer_controls[napari._qt.layer_controls]
		 napari._qt.layer_controls.qt_image_controls
		 napari._qt.layer_controls.qt_image_controls_base
		 napari._qt.layer_controls.qt_labels_controls
		 napari._qt.layer_controls.qt_layer_controls_base
		 napari._qt.layer_controls.qt_layer_controls_container
		 napari._qt.layer_controls.qt_points_controls
		 napari._qt.layer_controls.qt_shapes_controls
		 napari._qt.layer_controls.qt_surface_controls
		 napari._qt.layer_controls.qt_tracks_controls
		 napari._qt.layer_controls.qt_vectors_controls
		 napari._qt.layer_controls.widgets
	end
	class module.napari._qt.layer_controls subgraphs
	subgraph module.napari._qt.layer_controls.widgets[napari._qt.layer_controls.widgets]
		 napari._qt.layer_controls.widgets._image
		 napari._qt.layer_controls.widgets._labels
		 napari._qt.layer_controls.widgets._points
		 napari._qt.layer_controls.widgets._shapes
		 napari._qt.layer_controls.widgets._surface
		 napari._qt.layer_controls.widgets._tracks
		 napari._qt.layer_controls.widgets._vectors
		 napari._qt.layer_controls.widgets.qt_colormap_control
		 napari._qt.layer_controls.widgets.qt_contrast_limits
		 napari._qt.layer_controls.widgets.qt_face_color
		 napari._qt.layer_controls.widgets.qt_gamma_slider
		 napari._qt.layer_controls.widgets.qt_histogram_control
		 napari._qt.layer_controls.widgets.qt_multiscale_level_control
		 napari._qt.layer_controls.widgets.qt_opacity_blending_controls
		 napari._qt.layer_controls.widgets.qt_out_slice_checkbox
		 napari._qt.layer_controls.widgets.qt_projection_mode_control
		 napari._qt.layer_controls.widgets.qt_text_visibility
		 napari._qt.layer_controls.widgets.qt_widget_controls_base
	end
	class module.napari._qt.layer_controls.widgets subgraphs
	subgraph module.napari._qt.layer_controls.widgets._image[napari._qt.layer_controls.widgets._image]
		 napari._qt.layer_controls.widgets._image.qt_depiction_control
		 napari._qt.layer_controls.widgets._image.qt_interpolation_combobox
		 napari._qt.layer_controls.widgets._image.qt_render_control
	end
	class module.napari._qt.layer_controls.widgets._image subgraphs
	subgraph module.napari._qt.layer_controls.widgets._labels[napari._qt.layer_controls.widgets._labels]
		 napari._qt.layer_controls.widgets._labels.qt_brush_size_slider
		 napari._qt.layer_controls.widgets._labels.qt_color_mode_combobox
		 napari._qt.layer_controls.widgets._labels.qt_contiguous_checkbox
		 napari._qt.layer_controls.widgets._labels.qt_contour_spinbox
		 napari._qt.layer_controls.widgets._labels.qt_display_selected_label_checkbox
		 napari._qt.layer_controls.widgets._labels.qt_label_color
		 napari._qt.layer_controls.widgets._labels.qt_ndim_spinbox
		 napari._qt.layer_controls.widgets._labels.qt_preserve_labels_checkbox
		 napari._qt.layer_controls.widgets._labels.qt_render_control
	end
	class module.napari._qt.layer_controls.widgets._labels subgraphs
	subgraph module.napari._qt.layer_controls.widgets._points[napari._qt.layer_controls.widgets._points]
		 napari._qt.layer_controls.widgets._points.qt_border_color
		 napari._qt.layer_controls.widgets._points.qt_current_size_slider
		 napari._qt.layer_controls.widgets._points.qt_symbol_combobox
	end
	class module.napari._qt.layer_controls.widgets._points subgraphs
	subgraph module.napari._qt.layer_controls.widgets._shapes[napari._qt.layer_controls.widgets._shapes]
		 napari._qt.layer_controls.widgets._shapes.qt_edge_color
		 napari._qt.layer_controls.widgets._shapes.qt_edge_width_slider
	end
	class module.napari._qt.layer_controls.widgets._shapes subgraphs
	subgraph module.napari._qt.layer_controls.widgets._surface[napari._qt.layer_controls.widgets._surface]
		 napari._qt.layer_controls.widgets._surface.qt_shading_combobox
	end
	class module.napari._qt.layer_controls.widgets._surface subgraphs
	subgraph module.napari._qt.layer_controls.widgets._tracks[napari._qt.layer_controls.widgets._tracks]
		 napari._qt.layer_controls.widgets._tracks.qt_color_properties_combobox
		 napari._qt.layer_controls.widgets._tracks.qt_colormap_control
		 napari._qt.layer_controls.widgets._tracks.qt_graph_checkbox
		 napari._qt.layer_controls.widgets._tracks.qt_head_slider
		 napari._qt.layer_controls.widgets._tracks.qt_hide_completed_tracks_checkbox
		 napari._qt.layer_controls.widgets._tracks.qt_id_checkbox
		 napari._qt.layer_controls.widgets._tracks.qt_tail_control
	end
	class module.napari._qt.layer_controls.widgets._tracks subgraphs
	subgraph module.napari._qt.layer_controls.widgets._vectors[napari._qt.layer_controls.widgets._vectors]
		 napari._qt.layer_controls.widgets._vectors.qt_edge_color
		 napari._qt.layer_controls.widgets._vectors.qt_line_dimension_spinbox
		 napari._qt.layer_controls.widgets._vectors.qt_vector_style_combobox
	end
	class module.napari._qt.layer_controls.widgets._vectors subgraphs
	subgraph module.napari._qt.widgets[napari._qt.widgets]
		 napari._qt.widgets.qt_command_palette
		 napari._qt.widgets.qt_mode_buttons
		 napari._qt.widgets.qt_viewer_dock_widget
		 napari._qt.widgets.qt_viewer_tour
	end
	class module.napari._qt.widgets subgraphs
	classDef subgraphs fill:white,strock:black,color:black;	classDef default fill:#00c3ff,color:black;
	linkStyle default stroke:#00c3ff
	classDef external fill:#ffa600,color:black;
```
### Source code directory layout (related to modules inside `napari`)
```
napari/
├─_qt/
│ ├─__init__.py
│ ├─qt_main_window.py
│ ├─qt_viewer.py
│ ├─layer_controls/
│ │ ├─qt_image_controls.py
│ │ ├─qt_vectors_controls.py
│ │ ├─qt_labels_controls.py
│ │ ├─__init__.py
│ │ ├─qt_tracks_controls.py
│ │ ├─qt_image_controls_base.py
│ │ ├─qt_layer_controls_container.py
│ │ ├─qt_points_controls.py
│ │ ├─qt_surface_controls.py
│ │ ├─widgets/
│ │ │ ├─qt_face_color.py
│ │ │ ├─qt_widget_controls_base.py
│ │ │ ├─_labels/
│ │ │ │ ├─qt_color_mode_combobox.py
│ │ │ │ ├─qt_ndim_spinbox.py
│ │ │ │ ├─qt_label_color.py
│ │ │ │ ├─qt_display_selected_label_checkbox.py
│ │ │ │ ├─__init__.py
│ │ │ │ ├─qt_preserve_labels_checkbox.py
│ │ │ │ ├─qt_render_control.py
│ │ │ │ ├─qt_contour_spinbox.py
│ │ │ │ ├─qt_brush_size_slider.py
│ │ │ │ └─qt_contiguous_checkbox.py
│ │ │ ├─qt_colormap_control.py
│ │ │ ├─_surface/
│ │ │ │ ├─qt_shading_combobox.py
│ │ │ │ └─__init__.py
│ │ │ ├─__init__.py
│ │ │ ├─_tracks/
│ │ │ │ ├─qt_hide_completed_tracks_checkbox.py
│ │ │ │ ├─qt_colormap_control.py
│ │ │ │ ├─__init__.py
│ │ │ │ ├─qt_id_checkbox.py
│ │ │ │ ├─qt_graph_checkbox.py
│ │ │ │ ├─qt_tail_control.py
│ │ │ │ ├─qt_head_slider.py
│ │ │ │ └─qt_color_properties_combobox.py
│ │ │ ├─qt_multiscale_level_control.py
│ │ │ ├─_image/
│ │ │ │ ├─__init__.py
│ │ │ │ ├─qt_render_control.py
│ │ │ │ ├─qt_depiction_control.py
│ │ │ │ └─qt_interpolation_combobox.py
│ │ │ ├─qt_opacity_blending_controls.py
│ │ │ ├─_points/
│ │ │ │ ├─__init__.py
│ │ │ │ ├─qt_symbol_combobox.py
│ │ │ │ ├─qt_current_size_slider.py
│ │ │ │ └─qt_border_color.py
│ │ │ ├─_vectors/
│ │ │ │ ├─qt_line_dimension_spinbox.py
│ │ │ │ ├─qt_edge_color.py
│ │ │ │ ├─__init__.py
│ │ │ │ └─qt_vector_style_combobox.py
│ │ │ ├─qt_contrast_limits.py
│ │ │ ├─qt_out_slice_checkbox.py
│ │ │ ├─qt_text_visibility.py
│ │ │ ├─qt_histogram_control.py
│ │ │ ├─_shapes/
│ │ │ │ ├─qt_edge_color.py
│ │ │ │ ├─__init__.py
│ │ │ │ └─qt_edge_width_slider.py
│ │ │ ├─qt_projection_mode_control.py
│ │ │ └─qt_gamma_slider.py
│ │ ├─qt_shapes_controls.py
│ │ └─qt_layer_controls_base.py
│ └─widgets/
│   ├─qt_mode_buttons.py
│   ├─qt_viewer_dock_widget.py
│   ├─qt_command_palette.py
│   └─qt_viewer_tour.py
├─viewer.py
└─layers/
  └─__init__.py
```
