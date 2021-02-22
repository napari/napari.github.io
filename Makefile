.PHONY: clean

clean:
	rm -rf _build/html
	find api ! -name 'index.rst' -type f -exec rm -f {} +
