.PHONY: build dev clean

build:
	jupyter-book build .
	yarn build:prod

dev:
# Theme needs to be built first since the theme build watcher and
# jupyter-book watcher run concurrently. Otherwise, the initial theme build
# will cancel the initial jupyter-book build.
	yarn build
# HTML directory has to be created initially so that the dev server doens't
# throw an error.
	mkdir -p _build/html
	yarn dev

clean:
	rm -rf _build/html
	find api/stable/ ! -name 'index.rst' -type f -exec rm -f {} +
	rm -rf theme/static/dist
