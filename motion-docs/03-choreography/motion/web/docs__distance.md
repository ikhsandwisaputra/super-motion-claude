---
source: https://motion.dev/docs/distance
title: "distance"
fetched: 2026-10-28
---

# distance

distance() and distance2D() measure how far apart two values or points are.

`distance` measures how far apart two numbers are. `distance2D` measures how far apart two points are.

```
distance(100, 40) // 60
distance2D({ x: 0, y: 0 }, { x: 30, y: 40 }) // 50
```

These are useful for gesture thresholds. For instance, to only start a drag after the pointer moves a few pixels, or to make an effect stronger the closer the pointer is to an element.

## Usage

Import from Motion:

```
import { distance, distance2D } from "motion"
```

### `distance`

`distance` accepts two numbers and returns the difference between them. The result is always positive, so the order doesn't matter:

```
distance(10, 50) // 40
distance(50, 10) // 40
```

### `distance2D`

`distance2D` accepts two points, each with an `x` and `y`, and returns the straight-line distance between them:

```
const start = { x: 100, y: 100 }

window.addEventListener("pointermove", (event) => {
  const moved = distance2D(start, { x: event.clientX, y: event.clientY })

  if (moved > 3) {
    // Start dragging
  }
})
```
