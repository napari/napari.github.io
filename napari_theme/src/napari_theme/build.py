import os
import os.path as osp
import logging
from re import L
import subprocess
import sys
from pathlib import Path
from shutil import copytree, rmtree
from typing import Dict, List, Optional

NODE_VERSION = '16.13.2'
THEME_PATH = (Path(__file__).parent / 'napari').resolve()
THEME_WEB_PATH = (Path(__file__).parent / 'web').resolve()

__version__ = '0.1.0'

logger = logging.getLogger(osp.basename(__file__))

def _run_command(command: List[str], env: Optional[Dict[str, str]]=None, cwd: Optional[str]=None):
    '''
    Wrapper over `subprocess.run()` with basic error handling.
    '''

    result = subprocess.run(command, env=env, cwd=cwd)

    if result.returncode != 0:
      command_str = ' '.join([str(arg) for arg in command])
      print(f'Error running {command_str}')
      sys.exit(result.returncode)

class ThemeBuilder:
    build_dir: str
    html_build_dir: str
    sphinx_build_dir: str
    theme_build_dir: str

    node_dir: str
    node_env: Dict[str, str]

    def __init__(self, out_dir: str):
        self.html_build_dir = Path(out_dir)
        self.build_dir = self.html_build_dir.parent
        self.sphinx_build_dir = self.build_dir / 'sphinx'
        self.theme_build_dir = self.build_dir / 'napari_theme' / __version__

        self.node_dir = self.build_dir / 'napari_theme_node' / NODE_VERSION
        self.node_env = os.environ.copy()
        self.node_env['PATH']  = f'{self.node_dir}{os.pathsep}{self.node_env["PATH"]}'

    def _rename_sphinx_dir(self):
        '''
        Moves the Sphinx HTML directory to a new location for processing.
        '''

        logger.info('Renaming Sphinx build dir')
        if osp.isdir(self.sphinx_build_dir) :
            rmtree(self.sphinx_build_dir)
        os.rename(self.html_build_dir, self.sphinx_build_dir)

    def _setup_nodejs_env(self):
        '''
        Set up node.js environment required to build the theme.

        TODO Add support to use host environment.
        '''

        if osp.isdir(self.node_dir):
            logger.info(f'Using existing node.js env: {self.node_dir}')
        else:
            # Install node.js in _build directory as
            # `_build/napari_theme_node/<version>` for the user's current operating
            # system. This uses `nodeenv` to set up the environment for us.
            logger.info(f'Creating node.js env: {self.node_dir}')
            _run_command(['nodeenv', f'--node={NODE_VERSION}', self.node_dir])

            # Install yarn for installing theme dependencies.
            logger.info('Installing yarn')
            _run_command(['npm', 'install', '-g', 'yarn'], env=self.node_env)

    def _copy_theme_source(self):
        '''
        Copy napari theme source code for the current theme version to the
        Jupyter Book build directory.
        '''

        logger.info('Copying napari theme web source')
        if not osp.isdir(self.theme_build_dir):
            copytree(THEME_WEB_PATH, self.theme_build_dir)

            # Install theme dependencies using yarn.n
            logger.info('Installing theme dependencies')
            _run_command(['yarn', 'install'], env=self.node_env, cwd=self.theme_build_dir)

    def _build_theme(self):
        '''
        Build the theme using Next.js.
        '''

        logger.info('Building theme')
        _run_command(['yarn', 'build'], env=self.node_env, cwd=self.theme_build_dir)

    def build(self):
        '''
        Builds the napari theme.
        '''

        self._rename_sphinx_dir()
        self._setup_nodejs_env()
        self._copy_theme_source()
        self._build_theme()
