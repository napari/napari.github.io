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
`napari` works as intended. We have

- Unit tests which test if individual modules or functions work correctly
in isolation.

- Integration tests which test if different modules or functions work properly
when combined.

- Functional tests which test if slices of `napari` functionality work as
intended in the whole system.

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

All of `napari` tests are located in folders named `_tests`. We keep our unit
tests located in the individual folders with the modules or functions they are
testing (e.g. the tests for the `Image` layer are located in
[`/napari/layers/image/_tests`](https://github.com/napari/napari/tree/main/napari/layers/image/_tests)
alongside the `Image` layer code).
Our integration and functional tests are located in
the [`napari/_tests`](https://github.com/napari/napari/tree/main/napari/_tests)
folder at the top of the repository.

We also strive to unit test as much of our model and utils code independently of
our GUI code. These tests are located in the following folders:

* [`napari/layers`](https://github.com/napari/napari/tree/main/napari/layers)
* [`napari/components`](https://github.com/napari/napari/tree/main/napari/components)
* [`napari/utils`](https://github.com/napari/napari/tree/main/napari/utils)

Our GUI code is tests in the following folders:

* [`napari/_tests`](https://github.com/napari/napari/tree/main/napari/_tests)
* [`napari/_qt`](https://github.com/napari/napari/tree/main/napari/_qt)
* [`napari/_vispy`](https://github.com/napari/napari/tree/main/napari/_vispy)

The tests in these three folders are ignored when we run them in the subset of our
[continuous integration](https://en.wikipedia.org/wiki/Continuous_integration)
workflows that run in a headless environment (without a Qt backend).
When we are testing "non-GUI" code in a way that requires a GUI backend, they are
placed here.

The `napari/plugins` folder contains tests related to plugins.

Pytest fixtures to aid testing live in:

* [`napari/conftest.py`](https://github.com/napari/napari/blob/main/napari/conftest.py) -
  available globally to all of `napari`.
* [`napari/utils/_testsupport.py`](https://github.com/napari/napari/blob/main/napari/utils/_testsupport.py) -
  available globally to all of `napari` **and** to all tests in the same environment
  that `napari` is in (as this file is exported).

There are also fixtures for testing the `napari` builtin plugin (provides contributions
that come builtin with `napari`).
These live in
[`napari_builtins/_tests/conftest.py`](https://github.com/napari/napari/blob/main/napari_builtins/_tests/conftest.py)
and are available within
[`napari_builtins/_tests`](https://github.com/napari/napari/tree/main/napari_builtins/_tests).

(running-tests)=

## Running tests

To run our test suite locally, run `pytest` on the command line.  If, for some reason
you don't already have the test requirements in your environment, run `python -m pip install -e .[testing]`.

There are some tests that require showing GUI elements (such
as testing screenshots) and window focus (such as testing drag and drop behavior). By default, these are only run during continuous integration.
If you'd like to enable them in local tests, you can set the environment variables: `NAPARI_POPUP_TESTS=1` or `NAPARI_FOCUS_TESTS=1` or set the environment variable `CI=1`:

```sh
CI=1 pytest
```

Note: setting `CI=1` will also disable certain tests that take too long, etc. on CI.
Also, if running the GUI tests that use `pyautogui` on macOS, be sure to give the Terminal app `Accessibility` permissions in `System Settings > Privacy & Security > Accessibility` so `pyautogui` can control the mouse, keyboard, etc.

It is also possible to run test using `tox`. This is the same way as it is done in CI.
The main difference is that tox will create a virtual environment for each test environment, so it will take more time
but it will be more similar to the CI environment.

```sh
tox -e py310-linux-pyqt5
```

To get list of all available environments run:

```sh
tox list
```

### Running tests without pop-up windows

Some tests create visible napari viewers, which pop up on your monitor then quickly disappear.
This can be annoying if you are trying to use your computer while the tests are running.
There are two ways to avoid this:

1. Use the `QT_QPA_PLATFORM=offscreen` environment variable.
This tells Qt to render windows "offscreen", which is slower but will avoid the pop-ups.
   ```shell
   QT_QPA_PLATFORM=offscreen pytest napari
   ```
   or
   ```shell
   QT_QPA_PLATFORM=offscreen tox -e py310-linux-pyqt5
   ```

2. If you are using Linux or WSL, you can use the `xvfb-run` command.
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

Very often when developing new code, you don't need or want to run the entire test suite (which can take many minutes to finish).  With `pytest`, it's easy to run a subset of your tests:

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

We always aim for good [test coverage](https://en.wikipedia.org/wiki/Code_coverage) and we use [codecov](https://app.codecov.io/gh/napari/napari) during continuous integration to make sure we maintain good coverage.  If you'd like to test coverage locally as you develop new code, you can install [`pytest-cov`](https://github.com/pytest-dev/pytest-cov) and take advantage of a few handy commands:

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
it grows. Tests are written in files whose names
begin with `test_*` and which are contained in one of the `_tests` directories.

### Property-based testing with Hypothesis

Property-based tests allow you to test that "for any X, ..." - with a much nicer
developer experience than using truly random data.  We use Hypothesis for unit or
integration tests where there are simple properties like `x == load(save(x))` or
when Napari implements a function we can check against the equivalent in a trusted
library for at least some inputs.

See also [this paper on property-based testing in science](https://conference.scipy.org/proceedings/scipy2020/zac_hatfield-dodds.html),
[issue #2444](https://github.com/napari/napari/issues/2444), and
[the Hypothesis documentation](https://hypothesis.readthedocs.io/en/latest/)
(including [Numpy support](https://hypothesis.readthedocs.io/en/latest/numpy.html)).

(testing-qt)=

### Testing with `Qt` and `napari.Viewer`

There are a couple things to keep in mind when writing a test where a `Qt` event
loop or a {class}`~napari.Viewer` is required.  The important thing is that any widgets
you create during testing need to be cleaned up at the end of each test. We thus
recommend that you use the following fixtures when needing a widget or
{class}`~napari.Viewer` in a test.

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

(make_napari_viewer)=
#### `make_napari_viewer`

We provide a
[pytest fixture](https://docs.pytest.org/en/stable/explanation/fixtures.html) called
`make_napari_viewer` for tests that require the {class}`~napari.Viewer`. This
fixture is available globally and to all tests in the same environment that `napari`
is in (see [](test-organization) for details). Thus, there is no need to import it,
you simply include `make_napari_viewer` as a test function parameter, as shown in the
**Examples** section below:

```{eval-rst}
.. autofunction:: napari.utils._testsupport.make_napari_viewer()
```

#### Skipping tests that show GUI elements or need window focus

Tests that require showing GUI elements should be marked with `skip_local_popups`. If a test requires window focus, it should be marked with `skip_local_focus`.
This is so they can be excluded and run only during continuous integration (see [](running-tests) for details).

#### Testing `QWidget` visibility

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

### Mocking: "Fake it till you make it"

It can be confusing to write unit tests for individual functions, when the
function being tested in turn depends on the output from some other function or
method.  This makes it tempting to write integration tests that "just test the
whole thing together".  A useful tool in this case is the [mock object
library](https://docs.python.org/3/library/unittest.mock.html).  "Mocking" lets
you patch or replace parts of the code being tested with "fake" behavior or
return values, so that you can test how a given function would perform *if* it
were to receive some value from the upstream code.  For a few examples of using
mocks when testing napari, search the codebase for
[`unittest.mock`](https://github.com/napari/napari/search?q=%22unittest.mock%22&type=Code)

## Known issues

There are several known issues with displaying GUI tests on windows in CI, and
so certain tests have been disabled from windows in CI, see
[#1377](https://github.com/napari/napari/pull/1377) for more discussion.
