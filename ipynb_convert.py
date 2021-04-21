"""Convert all jupytext files in this repo to ipynb."""
from subprocess import run
from pathlib import Path
from glob import glob


def _is_jupytext(fname):
    return Path(fname).read_text(encoding="utf-8").startswith("---")


def create_notebooks(dest_dir="notebooks"):
    dest_dir = Path(dest_dir)
    dest_dir.mkdir(exist_ok=True)
    for f in glob("**/*.md", recursive=True):
        if "_build" not in f and _is_jupytext(f):
            dest = dest_dir / f"{Path(f).stem}.ipynb"
            run(["jupytext", "--to", "ipynb", "-o", str(dest), f])


if __name__ == "__main__":
    create_notebooks()
