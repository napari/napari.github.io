(napari-testing)=

# Testing

```{note}
This section is about general testing of `napari`. Other testing related information
can be found in:

* [Plugin testing guidelines](plugin-test) - information on testing plugins.
* [](app-model-testing)- information about testing [app-model](app-model) aspects
  of `napari`.
```

## Overview

We use unit tests, integration tests, and functional tests to ensure that
`napari` works as intended. We have:

- Unit tests which test if individual modules or functions work correctly
  in isolation.

- Integration tests which test if different modules or functions work properly
  when combined.

- Functional tests which test if slices of `napari` functionality work as
  intended in the whole system.

### Testing philosophy

To get the most return on investment (ROI) from our coding, we strive to test as
much as we can with unit tests, requiring fewer integration tests, and the least number
of functional tests as depicted in the test pyramid below from
[softwaretestinghelp.com](https://www.softwaretestinghelp.com/the-difference-between-unit-integration-and-functional-testing/):

![Pyramid diagram depicting the relationship between time to write/execute three different types of tests and return on investment for those tests.  The pyramid is split into three sections: the bottom, largest section is Unit testing, the middle section is Integration testing and the top is Functional testing. The size of the section is proportional to the quantity of tests of that type you should write. Moving up the pyramid, tests take longer to write and have a lower return on investment.](../../_static/images/tests.png)

Unit tests are at the base of the pyramid because they are the easiest to write and
the quickest to run. The time and effort to implement and maintain tests increases
from unit tests to integration and functional tests.

(test-organization)=

## Test organization

All of `napari` tests are located in folders named `_tests`. We use the [`pytest`](https://docs.pytest.org/en/stable/)
library and test runner to execute our tests locally and in
[continuous integration](https://en.wikipedia.org/wiki/Continuous_integration), CI.

### Integration and functional tests

Our integration and functional tests are located in the [`napari/_tests`](https://github.com/napari/napari/tree/main/napari/_tests) folder at the top of the repository.

### Unit tests

To keep unit tests close to their related source code, these tests are located in module folders.
For example, units tests for the `Image` layer are located in [`/napari/layers/image/_tests`](https://github.com/napari/napari/tree/main/napari/layers/image/_tests)
alongside the `Image` layer's module code [`/napari/layers/image`](https://github.com/napari/napari/tree/main/napari/layers/image).

napari is made up of its core library code and its GUI code. As a general practice,
we strive to unit test as much of our core library code, models and utils, independently of
our GUI code.

#### Core library unit tests

Core library tests are located in the following folders:

- [`napari/layers`](https://github.com/napari/napari/tree/main/napari/layers)
- [`napari/components`](https://github.com/napari/napari/tree/main/napari/components)
- [`napari/utils`](https://github.com/napari/napari/tree/main/napari/utils)

#### GUI unit tests

Our GUI code have tests in the following folders:

- [`napari/_tests`](https://github.com/napari/napari/tree/main/napari/_tests)
- [`napari/_qt`](https://github.com/napari/napari/tree/main/napari/_qt)
- [`napari/_vispy`](https://github.com/napari/napari/tree/main/napari/_vispy)

These GUI tests are ignored when we run them in the subset of our continuous integration
workflows. Workflows that run in a "headless" environment (without a Qt backend).
Testing of core library, or "non-GUI" code, that requires a specific GUI backend are also found in these folders.

### napari plugin tests

The `napari/plugins` folder contains most tests related to plugins.

### pytest fixtures

Pytest fixtures are used to set up test state, such as setup and teardown, and provide frequently test data. These
fixtures reduce repetitive code when writing and running tests. The fixtures can be found in:

- [`napari/conftest.py`](https://github.com/napari/napari/blob/main/napari/conftest.py) -
  available globally to all of `napari`.
- [`napari/utils/_testsupport.py`](https://github.com/napari/napari/blob/main/napari/utils/_testsupport.py) -
  available globally to all of `napari` **and** to all tests in the same virtual environment
  that `napari` is in (as this `testsupport.py` file is exported).

### `make_napari_viewer` fixture

One often used fixture is `make_napari_viewer`. This fixture can take an argument `show`
which is either `True` or `False`. In case your test depends on rendering of the viewer,
it should be set to `True`. This is, for example, the case when testing a screenshot
functionality. Otherwise, it is best to set the argument to `False` to prevent the viewer
from fully rendering.

### napari builtin plugin fixtures

napari comes with a number of samples and examples builtin.
There are also fixtures for testing these `napari` builtin plugins that provide contributions
that come builtin with `napari`.
These fixtures are found in
[`napari_builtins/_tests/conftest.py`](https://github.com/napari/napari/blob/main/napari_builtins/_tests/conftest.py)
and are available to tests stored in
[`napari_builtins/_tests`](https://github.com/napari/napari/tree/main/napari_builtins/_tests).

(running-tests)=

## Running tests

To run our test suite locally, run `pytest` on the command line.
When running tests, use a
[napari development installation](https://napari.org/stable/developers/contributing/dev_install.html#setting-up-a-development-installation).

### Run GUI tests locally

Since napari can run as an interactive application, some tests require showing GUI elements (such
as testing screenshots) and window focus (such as testing drag and drop behavior).
By default, these tests are only run during continuous integration.
If you'd like to enable GUI element tests to run locally, you can set the environment variables
`NAPARI_POPUP_TESTS=1`, `NAPARI_FOCUS_TESTS=1`, or `CI=1` before the `pytest` command:

```sh
CI=1 pytest
```

Note: setting `CI=1` will also disable certain tests that take too long on CI.

Also, if running the GUI tests that use `pyautogui` on macOS, be sure to set the Terminal app `Accessibility` permissions
in `System Settings > Privacy & Security > Accessibility` so `pyautogui` can control the mouse, keyboard, etc.

### Use tox to run tests locally

It is also possible to run tests locally using `tox`. We use `tox` to run test in CI.
The main difference between running `pytest` locally or `tox` locally is that `tox` will create a virtual environment
for each test environment, so it will take a bit more time. Though, `tox` will be more similar to the CI environment.
To run test using `tox` using Python 3.10 and pyqt5 on Linux, enter:

```sh
tox -e py310-linux-pyqt5
```

To get list of all available environments that may be run:

```sh
tox list
```

### Run tests without pop-up windows

Some tests create visible napari viewers, which pop up on your monitor then quickly disappear.
This can be annoying if you are trying to use your computer while the tests are running.
You can avoid pop-up windows opening two different ways:

1. Use the `QT_QPA_PLATFORM=offscreen` environment variable with pytest or tox.
   This tells Qt to render windows "offscreen", which is slower but will avoid the distracting pop-ups.

   ```shell
   QT_QPA_PLATFORM=offscreen pytest napari
   ```

   or

   ```shell
   QT_QPA_PLATFORM=offscreen tox -e py310-linux-pyqt5
   ```

1. If you are using Linux or WSL (Windows Subsystem for Linux), you can use the `xvfb-run` command.
   This will run the tests in a virtual X server.

   ```sh
   xvfb-run pytest napari
   ```

   or

   ```sh
   xvfb-run tox -e py310-linux-pyqt5
   ```

where the tox environment selector `py310-linux-pyqt5` must match your OS and Python version.

### Tips for speeding up local testing

Very often when developing new code, you don't need or want to run the entire test suite (which can take many minutes to finish).
With `pytest`, it's easy to run a subset of your tests:

```sh
# run tests in a specific subdirectory
pytest napari/components

# run tests in a specific file
pytest napari/components/_tests/test_add_layers.py

# run a specific test within a specific file
pytest napari/components/_tests/test_add_layers.py::test_add_layers_with_plugins

# select tests based on substring match of test name:
pytest napari/layers/ -k 'points and not bindings'
```

In general, it pays to learn a few of the [tips and tricks](https://docs.pytest.org/en/latest/example/index.html) of running pytest.

### Testing coverage locally

We aim for good [test coverage](https://en.wikipedia.org/wiki/Code_coverage), and we use [codecov](https://app.codecov.io/gh/napari/napari)
during continuous integration to make sure we maintain good coverage. If you'd like to test coverage locally as you develop new code, you can install [`pytest-cov`](https://github.com/pytest-dev/pytest-cov) and take advantage of a few handy commands:

```sh
# run the full test suite with coverage
pytest --cov=napari

# instead of coverage in the console, get a nice browser-based cov-report
pytest --cov=napari --cov-report=html
open htmlcov/index.html  # look at the report

# run a subset of tests with coverage
pytest --cov=napari.layers.shapes --cov-report=html napari/layers/shapes
open htmlcov/index.html  # look at the report
```

## Writing tests

Writing tests for new code is a critical part of keeping napari maintainable as
it grows. Tests are written in files with names that
begin with `test_*` and these test files are contained in one of the `_tests` directories.

Writing tests is a learned skill. If you are starting out writing tests,
`pytest`'s documentation provides good examples. Reading existing
tests is also helpful for understanding how tests are written. If you have questions, ask them in our
chat.

### Mocking: "Fake it till you make it"

It can be confusing to write unit tests for individual functions, when the
function being tested in turn depends on the output from some other function or
method. This makes it tempting to write integration tests that "just test the
whole thing together". A useful tool in this case is the [mock object
library](https://docs.python.org/3/library/unittest.mock.html). "Mocking" lets
you patch or replace parts of the code being tested with "fake" behavior or
return values, so that you can test how a given function would perform *if* it
were to receive some value from the upstream code. For a few examples of using
mocks when testing napari, search the codebase for
[`unittest.mock`](https://github.com/search?q=repo%3Anapari%2Fnapari+%22unittest.mock%22&type=Code).

### Property-based testing with Hypothesis

Property-based tests allow you to test that "for any X, ..." - with a much nicer
developer experience than using truly random data. We use Hypothesis for unit or
integration tests where there are simple properties like `x == load(save(x))` or
when Napari implements a function we can check against the equivalent in a trusted
library for at least some inputs.

See also [this paper on property-based testing in science](https://conference.scipy.org/proceedings/scipy2020/zac_hatfield-dodds.html),
[issue #2444](https://github.com/napari/napari/issues/2444), and
[the Hypothesis documentation](https://hypothesis.readthedocs.io/en/latest/)
(including [Numpy support](https://hypothesis.readthedocs.io/en/latest/numpy.html)).

(testing-qt)=

## Writing tests of the GUI

Fixtures are used when testing the GUI. Fixtures are helpful for setting state such as setup and teardown of the GUI.
When using fixtures with mocks, the GUI behavior can be simulated and tested.

### Testing with `Qt` and `napari.Viewer`

There are a couple things to keep in mind when writing a test where a `Qt` event
loop or a {class}`~napari.Viewer` is required. The important thing is that any widgets
you create during testing need to be cleaned up at the end of each test. We thus
recommend that you use the following fixtures when needing a widget or
{class}`~napari.Viewer` in a test.

```{seealso}
Grzegorz Bokota, a napari core team member, has written an excellent blog post on
[preventing segfaults in test suite that has Qt Tests](https://czaki.github.io/blog/2024/09/16/preventing-segfaults-in-test-suite-that-has-qt-tests/).
```

#### qapp and qtbot

If you need to use any Qt related code in your test, you need to ensure that
a `QApplication` is created. To to this we suggest you use the
[`qapp`](https://pytest-qt.readthedocs.io/en/latest/reference.html#module-pytestqt.plugin)
fixture from [`pytest-qt`](https://pytest-qt.readthedocs.io/en/latest/index.html),
a napari testing dependency.

If you need to instantiate a Qt GUI object (e.g., a widget) for your test, we recommend
that you use the
[`qtbot`](https://pytest-qt.readthedocs.io/en/latest/reference.html#pytestqt.qtbot.QtBot)
fixture. `qtbot`, which itself depends on `qapp` , allows you to test user input
(e.g., mouse clicks) by sending events to Qt objects.

````{note}
Fixtures in pytest can be a little mysterious, since it's not always
clear where they are coming from.  The `pytest-qt` `qapp` and `qtbot` fixtures
can be used in two ways; by adding them to the list of arguments of your test function:

```python
def test_something(qtbot):
    ...
```
or by using pytest's `usefixtures`, which avoids adding an unused argument to your
test function:

```python
@pytest.mark.usefixtures('qtbot')
def test_something():
    ...
```
<br/>
````

`qtbot` also provides a convenient
[`add_widget`/`addWidget`](https://pytest-qt.readthedocs.io/en/latest/reference.html#pytestqt.qtbot.QtBot.addWidget)
method that will ensure that the widget gets closed and properly cleaned at the end
of the test. This can prevents segfaults when running several tests. The
[`wait_until`/`waitUntil`](https://pytest-qt.readthedocs.io/en/latest/reference.html#pytestqt.qtbot.QtBot.waitUntil)
method is also useful to wait for a desired condition. The example below
adds a `QtDims` widget, plays the `Dims` and checks that the `QtDim` widget
is playing before we make any assertions.

```python
def test_something_else(qtbot):
    dims = Dims(ndim=3, ndisplay=2, range=((0, 10, 1), (0, 20, 1), (0, 30, 1)))
    view = QtDims(dims)
    qtbot.addWidget(view)
    # Loop to prevent finishing before the assertions in this test.
    view.play(loop_mode='loop')
    qtbot.waitUntil(lambda: view.is_playing)
    ...
```

(qt_viewer)=

#### `qt_viewer` and `viewer_model`

Since `napari==0.5.4` we have implemented the `qt_viewer` [pytest fixture](https://docs.pytest.org/en/stable/explanation/fixtures.html) which can be used for tests that are only using the `ViewerModel` api or are only checking rendering of the viewer.
For the current moment, it is only for internal use and is not exported to the global scope,
as it is defined in `conftest.py` file.

The `qt_viewer` fixture returns the instance of the {class}`~napari.qt.QtViewer` class.
This class does not provide the same api as the {class}`~napari.ViewerModel` class,
but has an associated {class}`~napari.ViewerModel` instance, which can be accessed by the `viewer` attribute.
Alternatively, you could use the `viewer_model` fixture, which returns this instance of {class}`~napari.ViewerModel` class.

```python
def test_something(qt_viewer):
    qt_viewer.viewer.add_image(np.random.random((10, 10)))
    assert len(viewer.layers) == 1
    assert viewer.layers[0].name == 'Image'
```

or

```python
def test_something(qt_viewer, viewer_model):
    viewer_model.add_image(np.random.random((10, 10)))
    assert len(viewer.layers) == 1
    assert viewer.layers[0].name == 'Image'
```

The `qt_viewer` fixture takes care of proper teardown of all qt widgets related to the viewer,
including hiding and clearing any references to viewer instances.
If you need to adjust the QtViewer for a given [test file](https://docs.pytest.org/en/stable/how-to/fixtures.html#override-a-fixture-on-a-test-module-level) you can use the `qt_viewer_` fixture.

```python
@pytest.fixture
def qt_viewer(qt_viewer_):
    # in this file we need to have added data and 3d view for all tests in file
    qt_viewer_.viewer.add_image(np.random.random((5, 10, 10)))
    qt_viewer_.viewer.dims.ndisplay = 3
    return qt_viewer_
```

or

```python
@pytest.fixture
def qt_viewer(qt_viewer_):
    # Make bigger viewer for all tests in file
    qt_viewer_.setGeometry(0, 0, 1000, 1000)
    return qt_viewer_
```

(make_napari_viewer)=

#### `make_napari_viewer`

For more complex test cases where we need to fully test application behaviour
(for example, using the `viewer.window` API) we can use `make_napari_viewer` [pytest fixture](https://docs.pytest.org/en/stable/explanation/fixtures.html).
However, the creating and teardown of the whole viewer is more fragile and slower than using just the `qt_viewer` fixture.
This fixture is available globally and to all tests in the same environment that `napari`
is in (see [](test-organization) for details). Thus, there is no need to import it,
you simply include `make_napari_viewer` as a test function parameter, as shown in the
**Examples** section below:

```{eval-rst}
.. autofunction:: napari.utils._testsupport.make_napari_viewer()
```

### Testing `QWidget` visibility

When checking that `QWidget` visibility is updated correctly, you may need to use
[`qtbot.waitUntil`](https://pytest-qt.readthedocs.io/en/latest/reference.html#pytestqt.qtbot.QtBot.waitUntil) or
[`qtbot.waitExposed`](https://pytest-qt.readthedocs.io/en/latest/reference.html#pytestqt.qtbot.QtBot.waitExposed) (see [](testing-qt) for details on `qtbot`).
This is because visibility can take some time to change.

For example, the following code can be used to check that a widget correctly
appears after it is created.

```python
from qtpy.QtWidgets import QWidget


def test_widget_hidden(make_napari_viewer, qtbot):
    """Check widget visibility correctly updated after hide."""
    # create viewer and make it visible
    viewer = make_napari_viewer(show=True)
    viewer.window.add_dock_widget(QWidget(viewer), name='test')
    widget = viewer.window._dock_widgets['test']
    # wait until the `widget` appears
    qtbot.waitUntil(widget.isVisible)
    assert widget.isVisible()
```

Note that we need to make the `viewer` visible when creating it as we are checking
visibility. Additionally, you can set the timeout for `qtbot.waitUntil` (default is 5
seconds).

Another function that may be useful for testing `QWidget` visibility is
[`QWidget.isVisibleTo`](https://doc.qt.io/qt-5/qwidget.html#isVisibleTo), which
tells you if a widget is visible relative to an ancestor.

### Skipping tests with GUI elements or need window focus

When you want to mark a test that should be skipped during a test run, `pytest` has
built-in decorators that can be added before the test. For example, `@pytest.mark.skip` or `@pyteset.mark.skipif`
can decorate a test that you want to skip:

```python
@pytest.mark.skip(reason="test is causing intermittent failures")
def test_hello_world_exists():
    # test source code
```

You can also use custom napari decorators to skip tests that use popups or need window focus.
These decorators are defined in `napari/_tests/utils`.
Tests that require showing GUI elements should be marked with `skip_local_popups`.
If a test requires window focus, it should be marked with `skip_local_focus`.
To use these custom skip decorators, import the decorator and apply it to a test:

```python
from napari._tests.utils import skip_local_popups

@skip_local_popups
def test_popup_window_after_error():
    # test source code
```

This is so they can be excluded and run only during continuous integration (see [](running-tests) for details).

## Known testing issues

There are several known issues with displaying GUI tests on windows in CI, and
so certain tests have been disabled from windows in CI, see
[#1377](https://github.com/napari/napari/pull/1377) for more discussion.
