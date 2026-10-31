---
source: https://motion.dev/docs/stagger
title: "stagger"
fetched: 2026-10-28
---

# stagger

stagger() distributes a delay across elements, with control over origin, grids and easing.

Stagger animations delay each element in a sequence by a set amount of time, creating a cascading or wave-like effect. Motion's `stagger()` function makes this easy.

It's perfect for animating lists, grids, navigation menus and loading icons. Its also the key feature in split text animations, where staggering the characters is the whole effect: the [text animation guide](https://motion.dev/docs/text-animation) explains more.

```
import { animate, stagger } from "motion"

animate(
  "li",
  { opacity: 1 },
  { delay: stagger(0.1) }
)
```

Live example: https://examples.motion.dev/js/stagger

## Usage

Import `stagger` from Motion.

```
import { animate, stagger } from "motion"
```

By passing a duration, in seconds, to `stagger`, the `delay` of each element will be increased by that amount for each animation.

```
animate(
  "li",
  { opacity: 1 },
  { delay: stagger(0.1) }
)
```

### Animation sequencing

It's also possible to stagger segments within animation sequences.

```
animate([
  ["ul", { opacity: 1 }]
  ["li", { x: [100, 0] }, { delay: stagger(0.05) }]
])
```

Any subsequent segments will be scheduled after the final staggered element.

### Negative staggers

Motion supports setting `delay` as a negative value in order to start an animation mid-way.

```
animate(
  element,
  keyframes,
  // Will start half-way through the animation
  { delay: -1, duration: 2 }
)
```

This means you can also set `stagger` to a negative offset to start animations at staggered mid-points.

```
delay: stagger(0.05, { startDelay: -1 })
```

For instance, this [loading spinner tutorial](https://motion.dev/examples/js-svg-loading-spinner) explains how, by setting `startDelay` to a negative value, all of the icon segments can start mid-animation rather than waiting for a full iteration before they're all animating together.

Live example: https://examples.motion.dev/js/svg-loading-spinner

### Stagger direction

It's possible to set a stagger direction by choosing a direction to stagger `from`. The `from` option can be set as `"first"`, `"center"`, `"last"`, `"edges"`, `"random"`, or any item `index`.

Live example: https://examples.motion.dev/js/stagger-from-center

`"edges"` staggers inwards from both ends at the same time.

```
stagger(0.1, { from: "edges" })
```

Live example: https://examples.motion.dev/js/stagger-from-edges

`"random"` gives each element a different step in a random order.

```
stagger(0.05, { from: "random" })
```

Live example: https://examples.motion.dev/js/stagger-random

### Grid stagger

By passing the number of `[columns, rows]` to the `grid` option, elements are treated as a grid in reading order. Each delay is then based on the distance from the `from` origin in two dimensions, so the stagger ripples outwards.

```
animate(
  ".cell",
  { opacity: 1 },
  { delay: stagger(0.05, { grid: [8, 6], from: "center" }) }
)
```

Every `from` option works with grids. An index staggers from that cell, `"center"` staggers from the middle of the grid, and `"edges"` staggers inwards from all four sides.

Live example: https://examples.motion.dev/js/stagger-grid

**Tip:**

If your layout uses CSS grid, you can read the number of columns and rows from the grid itself:

```
const style = getComputedStyle(grid)
const columns = style.gridTemplateColumns.split(" ").length
const rows = style.gridTemplateRows.split(" ").length

stagger(0.05, { grid: [columns, rows] })
```

The `grid` option staggers by row and column. To stagger by the real distance between elements on screen, this [physically-aware stagger tutorial](https://motion.dev/examples/js-staggered-grid) explains how to calculate the delays yourself.

### Stagger React animations

`stagger` works with Motion for React via a variant's `delayChildren` option.

```
const parentVariants = {
  open: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.1)
    }
  },
  close: {
    opacity: 0,
    transition: {
      delayChildren: stagger(0.01, { from: "last" })
    }
  }
}
```

By setting `delayChildren` to `stagger`, when children enter the defined variant they'll be delayed by the defined amount of time.

```
<motion.ul animate={isOpen ? "open" : "closed"} variants={parentVariants}>
  <motion.li variants={childVariants} />
</motion.ul>
```

## Options

`stagger` accepts options via its second argument.

### `startDelay`

**Default:** `0`

The initial delay from which to calculate subsequent delays.

```
stagger(0.1, { startDelay: 0.2 }) // 0.2, 0.3, 0.4...
```

### `from`

**Default:** `"first"`

Specifies which element in the array from which to stagger. Can be set as `"first"`, `"center"`, `"last"`, `"edges"`, `"random"`, or a number to specify an index.

```
stagger(0.05, { from: "last" })
```

Live example: https://examples.motion.dev/js/stagger-from-last

- `"edges"`: Staggers inwards from both ends. With `grid`, it staggers inwards from all four sides.
- `"random"`: Gives each element a different step, in a random order.

### `grid`

**Default:** `undefined`

Treats elements as a grid of `[columns, rows]`, in reading order. Delays are then based on the distance from the `from` origin in two dimensions.

```
stagger(0.05, { grid: [8, 6], from: "center" })
```

### `ease`

**Default:** `"linear"`

By passing an easing function, staggers can be redistributed through the total stagger time.

Any easing function or [Motion easing](https://motion.dev/docs/easing-functions) is accepted, like a cubic bezier definition:

```
stagger(0.1, { ease: [.32, .23, .4, .9] })
```

Name of an easing function:

```
stagger(0.1, { ease: "easeOut" })
```

Or a custom easing function:

```
stagger(0.1, { ease: p => Math.sin(p) })
```

## FAQs

### What is a stagger animation?
    A stagger animation delays each element in a group by a fixed amount, creating a cascading, wave, or ripple effect.
### How do I stagger from a different origin?
    Use the `from` option: `stagger(0.1, { from: "center" })`. It also accepts `"edges"`, `"random"` or an index.
### How do I stagger across a grid?
    Pass the number of columns and rows to the `grid` option: `stagger(0.05, { grid: [8, 6], from: "center" })`. The delays then ripple outwards in two dimensions.
### Is it possible to stagger in React or Vue?
    Yes. You can use `stagger` with `useAnimate`, and it's possible to also pass it straight to `delayChildren` when animating with variants.
### How do I create a wave effect with stagger?
    Combine `stagger` with easing functions to adjust the speed throughout the animation.
