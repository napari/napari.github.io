from setuptools import setup

setup(
    name='napari-theme',
    description='A clean customisable Sphinx documentation theme.',
    version='0.1.0',
    include_package_data=True,
    python_requires='>=3.6',
    author='Jeremy Asuncion',
    author_email='jeremyasuncion808@gmail.com',
    package_dir={'': 'src'},
    packages=['napari_theme'],
    install_requires=['nodeenv==1.6.0'],
    entry_points={
        'sphinx.html_themes': [
            'napari=napari_theme'
        ],
    },
)
