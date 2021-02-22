.PHONY: clean

clean:
	rm -rf _build/html
	find api/stable/ ! -name 'index.rst' -type f -exec rm -f {} +
