(napari-typing-patterns)=

# Typing cheat sheet

Short, self-contained examples of the rules in [Type checking](napari-typing).
For how to run the checker and how to handle its errors, see the
[main page](napari-typing).

## Annotations with and without `from __future__ import annotations`

On Python versions before 3.14, without the `__future__` import, Python
evaluates annotations when the function or class is defined. A name that does
not exist yet at that point, such as the class being defined or a type imported
under `if TYPE_CHECKING:`, then has to be written as a string. With the import,
annotations are stored as strings automatically, so the quotes are not needed:

`````{tab-set}

````{tab-item} Without the import
```python
class Node:
    children: list['Node']

    def add_child(self, child: 'Node') -> 'Node':
        self.children.append(child)
        return child
```
````

````{tab-item} With the import
```python
from __future__ import annotations


class Node:
    children: list[Node]

    def add_child(self, child: Node) -> Node:
        self.children.append(child)
        return child
```
````

`````

Tools that read annotations at runtime, such as
[magicgui](https://pyapp-kit.github.io/magicgui/) and
[Pydantic](https://docs.pydantic.dev/latest/), need
extra care here, as explained in
[Annotating new code](napari-typing-annotating).

## Values that may be `None`

Write `X | None` for an optional value and `X | Y` for a union. They mean the
same as `Optional[X]` and `Union[X, Y]`, which you will still see in older
modules while napari's ruff config disables the automatic rewrite (`UP007`,
`UP045`).

```python
def format_float(value: float, precision: int | None = None) -> str:
    if precision is None:
        # since the input `precision` is `None`, set it to a default value
        precision = 3
    # from here on, the checker knows that `precision` is an `int`
    return f'{value:.{precision}f}'
```

## Flexible inputs, concrete outputs

`collections.abc` is a Python module establishing abstract, reusable and
pythonic-like interfaces for customizable classes that implement common
patterns.

It's best to annotate the input types of a function or method through these
types. Instead, output types should return clearly defined types. In general
the idea is "flexible inputs, strict outputs".

An abstract type describes what an object can do, not which class it is. Any
class that defines `__iter__` counts as an `Iterable`, without inheriting from
it:

```python
from collections.abc import Iterable


class Fruits:
    def __iter__(self):
        yield 'apple'
        yield 'banana'


isinstance(Fruits(), Iterable)  # True
```

```python
from collections.abc import Iterable, Mapping


def unique_sorted(items: Iterable[str]) -> list[str]:
    return sorted(set(items))


def normalize(weights: Mapping[str, float]) -> dict[str, float]:
    total = sum(weights.values())
    return {name: weight / total for name, weight in weights.items()}
```

`unique_sorted` accepts a list, a tuple, a set, a generator, or any custom
object that implements `__iter__`, such as `Fruits` above, without changing its
signature. If a function modifies its argument in place, ask for
`MutableSequence` or `MutableMapping` instead.

```{note}
`Mapping` and `Sequence` only promise read access, such as lookups, `len()` and
iteration. `MutableMapping` and `MutableSequence` add the methods that change
the object, such as item assignment, `append()`, `pop()` and `update()`. The
[`collections.abc` documentation](https://docs.python.org/3/library/collections.abc.html)
lists the methods each type supports.
```

## Generic functions with `TypeVar`

When the output type depends on the input type, describe the relationship with
a `TypeVar`:

```python
from collections.abc import Sequence
from typing import TypeVar

T = TypeVar('T')


def first(items: Sequence[T]) -> T:
    return items[0]
```

The checker now knows that `first([1, 2])` is an `int` and `first(["a"])` is a
`str`. napari still supports Python 3.11, so use `TypeVar` rather than the
`def first[T](...)` syntax added in Python 3.12.

## NumPy arrays

```python
import numpy as np
import numpy.typing as npt


def to_float(data: npt.ArrayLike) -> npt.NDArray[np.float64]:
    return np.asarray(data, dtype=np.float64)
```

`npt.NDArray` is generic in its dtype: `np.float64` fills that type parameter,
so `npt.NDArray[np.float64]` is shorthand for
`np.ndarray[tuple[Any, ...], np.dtype[np.float64]]`, an array of any shape with
a `float64` dtype. `npt.ArrayLike` accepts anything `np.asarray` can convert,
such as lists, tuples and arrays.

## Protocols for "anything with these members"

A `Protocol` describes what a function uses instead of which class it expects:

```python
from typing import Protocol


class HasShape(Protocol):
    @property
    def shape(self) -> tuple[int, ...]: ...


def ndim(data: HasShape) -> int:
    return len(data.shape)
```

Any object with a `shape` attribute satisfies `HasShape` without inheriting
from it, so NumPy, dask and zarr arrays all work.

```python
from typing import Protocol


class Named(Protocol):
    name: str

    def label(self) -> str: ...


class Sample:
    name: str

    def __init__(self, name: str) -> None:
        self.name = name

    def label(self) -> str:
        return self.name


sample: Named = Sample('cells')
sample.name = 'tissue'
sample.label()
```

The checker treats `name` as a read-write attribute, so assigning a `str` is
allowed and assigning another type is an error. `shape` on `HasShape` stays
read-only, so assigning to it is an error. `label` is a method: the object
must define it, and the checker checks the call and the `str` return.

Decorate the `Protocol` with `@runtime_checkable` only if you also need
`isinstance()` checks.
