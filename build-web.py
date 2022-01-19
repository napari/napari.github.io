import os.path as osp
from pathlib import Path
from shutil import copytree, rmtree

from build import ThemeBuilder

if __name__ == '__main__':
    build_dir = (Path(__file__).parent / '_build').resolve()
    theme_build_dir = build_dir / 'html'
    sphinx_build_dir = build_dir / 'sphinx'
    theme_build_dir_copy = build_dir / 'html2'

    for dir in [theme_build_dir, sphinx_build_dir]:
        if osp.isdir(dir):
            print(f'removing {dir}')
            rmtree(dir)

    copytree(theme_build_dir_copy, theme_build_dir)

    builder = ThemeBuilder(theme_build_dir)
    builder.build()
