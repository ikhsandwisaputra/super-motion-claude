---
source: https://motion.dev/docs/transform-value
title: "transformValue"
fetched: 2026-10-28
---

# transformValue

transformValue() derives a new motion value by computing output from one or more existing values.

`transformValue` creates a new read-only [motion value](https://motion.dev/docs/motion-value) computed from the output of one or more motion values.

```
const blur = motionValue(0)
const filter = transformValue(() => `blur(${blur.get()}px)`)

styleEffect("img", { filter })
```

This is useful for combining multiple motion values into a single value, or performing calculations on a motion value's output.

```
const scale = motionValue(1)
const inverseScale = transformValue(() => 1 / scale.get())

styleEffect(".parent", { scale })
styleEffect(".child", { scale: inverseScale })
```

Live example: https://examples.motion.dev/js/ios-slider

## Usage

`transformValue` accepts a single function, that returns the computed output of one or more other motion values.

```
import { motionValue, transformValue } from "motion"

const x = motionValue(0)
const doubleX = transformValue(() => x.get() * 2)
```

Any motion values that call `.get()` in this function will be tracked, so when they update, the motion value returned from `transformValue` will also update.

```
doubleX.on("change", (latest) => console.log(latest))

x.set(10) // doubleX will log 20
```

### Compose

Motion values returned from `transformValue` can be composed into other `transformValue` callbacks:

```
const x = motionValue(0)
const y = motionValue(0)
const rotate = transformValue(() => x.get() + y.get())
const transform = transformValue(() => `translate3d(${x.get()}px ${y.get()}px 0) rotate(${rotate.get()}deg)`)
```
