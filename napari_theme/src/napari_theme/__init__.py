import os
import os.path as osp
import logging
from pathlib import Path
from sphinx.application import Sphinx
from typing import Dict, Optional

from .build import ThemeBuilder

THEME_PATH = (Path(__file__).parent / 'napari').resolve()

__version__ = '0.1.0'

logger = logging.getLogger(osp.basename(__file__))
logging.basicConfig(level=logging.INFO)

def _build_nextjs(
    app: Sphinx,
    exception: Optional[Exception]
):
    if exception is not None:
        return

    if os.environ.get('THEME_ENV') == 'development':
        logger.info('In development mode, skipping theme build.')
        return

    builder = ThemeBuilder(app.builder.outdir)
    builder.build()

def setup(app: Sphinx) -> Dict[str, any]:
    app.require_sphinx('3.0')
    app.add_html_theme('napari', THEME_PATH)
    app.connect('build-finished', _build_nextjs)

    return {
        'parallel_read_safe': True,
        'parallel_write_safe': True,
        'version': __version__,
    }
