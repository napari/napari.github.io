.PHONY: build clean

build:
	yarn build:prod
	jupyter-book build .

clean:
	rm -rf _build/html
	find api/stable/ ! -name 'index.rst' -type f -exec rm -f {} +
	rm -rf theme/static/dist
