---
source: https://motion.dev/docs/transform
title: "transform"
fetched: 2026-10-28
---

# transform

transform() maps an input range to numbers, colours, or complex strings.

`transform` can map an input value from one range of values to another.

```
const numberToColor = transform(
  [0, 100], // Input
  ["#000", "#fff"] // Output
)

numberToColor(50) // rgba(128, 128, 128, 1)
```

## Usage
Import `transform` from Motion.

```
import { transform } from "motion"
```

A transformation function can be created by passing two ranges, an **input** range and an **output** range:

```
const transformer = transform([0, 100], [0, 360])
```

The transformer can now be called with an input value:

```
transformer(50) // 180
```

- Both ranges **must always be the same length**.

- The **input range** must always be a linear series of numbers, either counting up or counting down.

- The **output range** can be a non-linear series of numbers, colors, or complex strings.

The input and output ranges can accept any number of values:

```
const x = [-100, 0, 100, 200]
const opacity = [0, 1, 1, 0]
const transformer = transform(x, opacity)

transformer(-50) // 0.5
transformer(50) // 1
transformer(150) // 0.5
```

If `clamp: false` is provided, the returned function will map infinitely:

```
const transformer = transform([0, 100], [0, 360], { clamp: false })

const rotation = transformer(200) // 720
```

**Note:**
React users can also use the <a href="https://motion.dev/docs/react-use-transform">useTransform</a> hook for use with <a href="https://motion.dev/docs/react-motion-value">motion values</a>.
