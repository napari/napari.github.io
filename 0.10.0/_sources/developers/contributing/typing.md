(napari-typing)=

# Type checking

napari is type-checked with [pyrefly](https://pyrefly.org). The check runs on
every pull request and has to pass before we merge, but
**you are not expected to fix type errors in your own PR**. If it fails and the
fix isn't obvious, ask for help and a team member will be eager to guide you.

```{note}
Why we moved off mypy, and what we compared against, is in the Island Dispatch
post
[*From Any to Certainty*](https://napari.org/island-dispatch/blog/from-any-to-certainty.html).
```

## Running the check

```sh
tox -e pyrefly
```

This builds a small environment from `resources/requirements_pyrefly.txt`
constraints with tox. A run takes about a second with a cached environment.

`tox -e pyrefly` defaults to `pyrefly check`, and arguments after `--`
are appended, so any pyrefly subcommand can also work:

```sh
tox -e pyrefly -- check --count-errors
tox -e pyrefly -- suppress --remove-unused=all
```

Don't run pyrefly from your development environment (e.g.
`uv run pyrefly check`): it resolves the packages you happen to have installed
rather than the pinned ones, and reports a different set of errors. In
addition, the [code editor integration](https://pyrefly.org/en/docs/IDE/) reads
the same `[tool.pyrefly]` configuration, but it sees your environment too — so
treat editor suggestions as a hint and `tox -e pyrefly` as the standard.

## Annotating new code

1. **Annotate the parameters and return values** you are adding or changing,
   and leave unrelated types alone — a bug fix shouldn't turn into a typing
   sweep. Only modify previous annotations if they are relevant to the
   contribution you are making.
2. When feasible, **add `from __future__ import annotations`** at the top of
   any module that doesn't have it yet. This makes annotations lazy, so they
   are not executed at runtime until required, in order to infer the types.
   Where this is not possible (see warning below), annotations that are not
   used in the code should be wrapped in quotes to avoid early evaluation.
3. **Import annotation-only types under `if TYPE_CHECKING:`**, so heavy imports
   and potential import cycles stay out of the runtime path. Ruff rules flag
   these and will often move them for you with pre-commit. To do this, add
   `from typing import TYPE_CHECKING` to the top of the file, then wrap the
   imports in:

   ```python
   if TYPE_CHECKING:
       from some_module import SomeType
   ```

   ```{important}
   Lazy evaluation of annotation breaks tools that require runtime type
   inspection, such as magicgui decorators and Pydantic models. For those, type
   annotations must be real imports!
   ```

4. **Run `tox -e pyrefly`** and read the first complaint before the rest; later
   errors are often consequences of the first one.
5. **If something can't be fixed honestly**, suppress it by error kind and say
   why, as described below.

## Choosing types

- **Annotate parameters and return values, not local variables.** They are the
  contract other modules rely on, and locals are inferred well enough without
  help.
- **Parameters should accept the widest type that works; returns give back the
  concrete type you built.** When psosible, take `Iterable`, `Sequence` or
  `Mapping` rather than `list` or `dict`, and hand back the `list` or `dict`
  you actually made.
- **`Any` switches off checking for everything it touches.** It is sometimes
  the honest answer for a dynamic corner of the code, but it should be a
  decision rather than a way to make one error disappear.
- **Prefer narrowing to `cast()`.**
  [`typing.cast`](https://docs.python.org/3/library/typing.html#typing.cast)
  only tells the checker to believe you, so if it is the only option left, keep
  it as narrow as you can and say in a comment what makes it safe.
- **Type arrays only with what the contract needs.** The full annotation for a
  NumPy array is `np.ndarray`, for example
  `np.ndarray[tuple[int, ...], np.dtype[np.float64]]`, which pins both the
  shape and the dtype. If the shape is not part of the contract, use
  `numpy.typing`'s `npt.NDArray` alias instead, which leaves the shape
  unspecified but the dtype specified, for example `npt.NDArray[np.float64]`.
  If neither shape nor dtype is part of the contract, use `np.ndarray` without
  any arguments. For docstrings, always use the runtime class name `np.ndarray`
  even where the annotation is `npt.NDArray`. Read more in the
  [NumPy typing guide](https://numpy.org/doc/stable/reference/typing.html),
  including about `npt.ArrayLike` for inputs that can be converted to arrays.

## When the check complains

Suppressing should be rare. Most types can be written honestly, and a
suppression in the wrong place hides a real bug. Occasionally one genuinely
will not resolve, because of a third-party stub, a gap in the typing
specification, or dynamic behaviour — that is what suppressions are for. The
important thing is to **name the error kind**, so a reader can tell why it was
needed and pyrefly can check that the suppression is still doing something. The
last word of a pyrefly message is the rule it applied:

```text
ERROR src/napari/utils/tree/node.py:64:31-53: Argument `int | None` is not assignable
to parameter `object` with type `int` in function `list.insert` [bad-argument-type]
                                                                 ^^^^^^^^^^^^^^^^^
```

Put that rule on the offending line:

```python
indices.insert(0, item.index_in_parent())  # pyrefly: ignore[bad-argument-type]
```

A bare `# pyrefly: ignore` silences every diagnostic on the line, including
ones a future pyrefly release adds, and nothing can check it for staleness.

The pyrefly config sets `unused-ignore` as an error, so a suppression that
stops matching anything fails the build. To clear the ones your change left
behind, run `tox -e pyrefly -- suppress --remove-unused=all`.

(expanding-coverage)=

## Modifying the type checking config

- **Don't widen `project-excludes` to make a failure go away.** Adding a module
  takes it out of the check for everyone. Suppress narrowly instead, and if you
  believe a module really can't be checked, raise it in the pull request rather
  than adding it quietly.
- **Bringing a module back into the check** is a self-contained task and a good
  first contribution: delete its entry from `project-excludes` in
  `pyproject.toml`, run `tox -e pyrefly`, fix what you can, suppress what you
  cannot with codes, then run it again and drop any suppression the change
  leaves unused. For example, `utils` are friendlier starting points than the
  Qt widget code.

## What the check does not cover

The environment is deliberately small — it installs
`resources/requirements_pyrefly.txt` and nothing else — so imports like
`vispy`, `scipy`, `pandas`, `dask`, `zarr` and their kind resolve to `Any`.
`project-excludes` also takes many files under `src/napari` out of the check,
tests included, such that zero errors means only that pyrefly found nothing
wrong with the type it could see.

## Where things live

| What | Where |
| --- | --- |
| Checker config | `[tool.pyrefly]` in `pyproject.toml` |
| Pinned checker version and its dependencies | `resources/requirements_pyrefly.in` (source) and `resources/requirements_pyrefly.txt` (lock) |
| Constraints pins regeneration | `tools/compile_constraints.sh` (also run weekly by `upgrade_test_constraints.yml`) |
| Tox environment | `[testenv:pyrefly]` in `tox.ini` |
| CI job | `.github/workflows/test_typing.yml` |

## Where to read more

- [Typing for Python Developers](https://pyrefly.org/en/docs/typing-for-python-developers/)
  — pyrefly's own five-minute tour, if type hints are new to you.
- [Static type checking](https://learn.scientific-python.org/development/guides/typing/)
  — the Scientific Python guide's chapter, written for scientists and research
  software engineers. Its "loose vs. specific types" section is the long
  version of the "accept the widest type that works" point above.
- [Type hints cheat sheet](https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html)
  — syntax suggestions to copy. It is written for mypy, but the syntax is the
  same.
