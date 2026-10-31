---
source: https://motion.dev/docs/clamp
title: "clamp"
fetched: 2026-10-28
---

# clamp

clamp() limits a value to a minimum and maximum.

`clamp` keeps a value inside a range.

```
clamp(0, 100, 150) // 100
```

Where [`wrap`](https://motion.dev/docs/wrap) loops a value back around, `clamp` stops it at the edge. It's useful for keeping a calculated position, scale or progress value in bounds.

## Usage

Import from Motion:

```
import { clamp } from "motion"
```

`clamp` accepts a `min`, a `max` and a value.

Values inside the range are returned unchanged:

```
clamp(0, 1, 0.5) // 0.5
```

Values outside the range are limited to the nearest edge:

```
clamp(0, 1, 2) // 1
clamp(0, 1, -1) // 0
```

It pairs well with [`progress`](https://motion.dev/docs/progress), which doesn't limit its output:

```
const amount = clamp(0, 1, progress(100, 400, scrollY))
```
