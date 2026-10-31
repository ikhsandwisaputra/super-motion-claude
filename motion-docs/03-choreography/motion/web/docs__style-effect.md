---
source: https://motion.dev/docs/style-effect
title: "styleEffect"
fetched: 2026-10-28
---

# styleEffect

styleEffect() applies motion values to HTML element styles, with independent transforms.

`styleEffect` applies the output of [motion values](https://motion.dev/docs/motion-value) to the `.style` attribute of one or more elements.

When these motion values update, the element will re-render once per frame during the [render step of the frameloop](https://motion.dev/docs/frame).

```
const blur = motionValue(2)
const filter = transformValue(() => `blur(${blur.get()}px)`)

styleEffect("img", { filter })
```

In addition to regular styles, `styleEffect` supports:

- Independent transforms (`x`, `scaleY` etc)

- Default unit types (i.e use numbers like `100` instead of `"100px"`)

- CSS properties

Live example: https://examples.motion.dev/js/hold-to-confirm

## Usage

Import `styleEffect` from `"motion"`:

```
import { styleEffect } from "motion"
```

`styleEffect` accepts an element, list of elements, or CSS selector, plus a map of motion values:

```
const opacity = motionValue(0.5)
const backgroundColor = motionValue("#00f")

styleEffect("div", { opacity, backgroundColor })
```

When any of the motion values update, the element(s) will re-render on the next animation frame:

```
opacity.set(1)
animate(backgroundColor, "rgba(34, 255, 0, 1)")
```

Each motion value can be applied to any number of styles, and any number of elements.

```
const progress = motionValue(0)

styleEffect("#progress", {
  opacity: progress,
  scaleX: progress
})
```

Any motion value can be provided, including those defined by `mapValue` and `transformValue`:

```
const blur = motionValue(2)
const filter = transformValue(() => `blur(${blur.get()}px)`)

styleEffect("img", { filter })
```

### Cancel

`styleEffect` returns a cleanup function which, when called, will stop applying changes to the motion values to the element:

```
const width = motionValue("0px")
const cancel = styleEffect("#progress", { width })

cancel()
```
