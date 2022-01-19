clean:
	rm -rf dist src/*.egg-info

uninstall:
	pip uninstall -y napari_theme

build:
	python -m build .

install: clean uninstall build
	pip install dist/napari_theme*.whl

.PHONY: uninstall build install reinstall
