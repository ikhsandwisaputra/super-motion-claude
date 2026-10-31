---
source: https://motion.dev/docs/arc
title: "arc"
fetched: 2026-10-28
---

# arc

`arc` can change the path between two points from a straight line to a curved one.

By default, when Motion animates `x` and `y` between two values, the element travels in a straight line. `arc()` can bend that line.

```
import { arc, motion } from "motion/react"

<motion.div
  animate={{ x: 200, y: 100 }}
  transition={{ duration: 1, path: arc() }}
/>
```

`arc()` is passed to `transition.path`. It works with `motion` components, `animate`, and `useAnimate`.

Live example: https://examples.motion.dev/react/add-to-basket

**Note:**
`arc()` is **not** supported by the mini `animate()` from `"motion/mini"`.

## Usage

Import `arc` from `"motion"` or `"motion/react"`.

```
import { arc } from "motion"
```

When passed to `transition.path`, it will automatically curve the line between two `x` and `y` points.

```
const path = arc({ strength: 1 })

animate(".box", { x: 200, y: 100 }, { duration: 1, path })
```

### Keyframe animations

`transition.path` works anywhere a `transition` is accepted. The path interpolates between the first and last `x`/`y` value, including across keyframe arrays.

```
<motion.div
  animate={{ x: [0, 200], y: [0, 100] }}
  transition={{ duration: 1, path: arc({ strength: 1 }) }}
/>
```

```
// useAnimate
const [scope, animate] = useAnimate()

animate(
  scope.current,
  { x: 200, y: 100 },
  { duration: 1, path: arc({ strength: 1 }) }
)
```

### Layout animations

Pass `arc()` to `transition.layout.path` to curve the motion of a layout animation. This is where `arc()` does work straight-line interpolation can't: every element moving from A to B will follow a curve, even when A and B are defined by surrounding layout rather than fixed keyframes.

```
<motion.div
  layout
  transition={{
    layout: { duration: 0.6, path: arc({ strength: 0.6 }) },
  }}
/>
```

It also works with `layoutId` for shared element transitions:

```
<motion.div
  layoutId="bubble"
  transition={{ layout: { path: arc() } }}
/>
```

### Springs

`transition.path` only describes the curve. The driving transition is whatever you pass alongside it. With a spring, the progress value overshoots `t = 1` and oscillates back, so the element samples past the endpoint and settles with a bouncy arc.

```
<motion.div
  animate={{ x: 200, y: 100 }}
  transition={{
    type: "spring",
    bounce: 0.5,
    visualDuration: 0.6,
    path: arc({ strength: 1 }),
  }}
/>
```

## Options

### `strength`

**Default:** `0.5`

The strength of the arc's bend. A value of `1` peaks at a height equal to the distance between the two points, whereas `0` is no bend.

```
arc({ strength: 1 })
```

### `peak`

**Default:** `0.5`

Where along the bend the arc reaches its maximum height. The default `0.5` produces a symmetric arc, whereas lower values bring the peak towards the start of the bend.

```
arc({ peak: 0.75 })
```

### `direction`

**Default:** automatic

Which side the arc bulges toward.

- `"cw"` — clockwise relative to the direction of travel.
- `"ccw"` — counter-clockwise.
- Automatic — `arc()` picks a stable screen-space side and keeps the bulge on that side even when the direction of travel flips between calls.

```
arc({ direction: "cw" })
```

### `rotate`

**Default:** `false`

Rotates the element to follow the tangent of the arc, so a card flying along the curve tilts naturally as it moves.

- `true` — full tangent following.
- A number between `0` and `1` — scaled tangent following. `0` is off.

```
arc({ rotate: true })
```

The rotation is additive to the element's existing `rotate`, so existing `rotate` animations continue to work alongside this setting.

## Memoisation

When using automatic `direction`, you can create a single `arc()` instance for all animations on the same component to enable improved interruption.

```
// React
const path = useMemo(() => arc({ strength: 1 }), [])
```

```
// Vanilla JS
const path = arc({ strength: 1 })
```
