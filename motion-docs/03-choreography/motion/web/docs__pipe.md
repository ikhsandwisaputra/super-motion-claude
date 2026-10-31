---
source: https://motion.dev/docs/pipe
title: "pipe"
fetched: 2026-10-28
---

# pipe

pipe() combines functions into one, passing each result to the next.

`pipe` combines several functions into one. Each function receives the result of the one before it.

```
const double = (v) => v * 2
const addOne = (v) => v + 1

const doubleThenAddOne = pipe(double, addOne)

doubleThenAddOne(5) // 11
```

## Usage

Import from Motion:

```
import { pipe } from "motion"
```

`pipe` accepts any number of functions and returns a new function. The functions run from left to right.

This is useful for building a value from small steps. For instance, to convert a scroll position into a whole-number percentage between `0` and `100`:

```
import { pipe, progress, clamp } from "motion"

const toPercent = pipe(
  (y) => progress(0, 1000, y),
  (p) => clamp(0, 1, p),
  (p) => Math.round(p * 100)
)

toPercent(250) // 25
toPercent(1500) // 100
```

The order matters. `pipe(a, b)` runs `a` first, then `b`.
