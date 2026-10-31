---
source: https://motion.dev/docs/react-use-velocity
title: "useVelocity"
fetched: 2026-10-28
---

# useVelocity

A motion value that outputs the velocity of another motion value.

`useVelocity` accepts a [motion value](https://motion.dev/docs/react-motion-value) and returns a new one that updates with the provided motion value's velocity.

```
const x = useMotionValue(0)
const xVelocity = useVelocity(x)
const scale = useTransform(
  xVelocity,
  [-3000, 0, 3000],
  [2, 1, 2],
  { clamp: false }
)

return <motion.div drag="x" style={{ x, scale }} />
```

## Usage

Import `useVelocity` from Motion:

```
import { useVelocity } from "motion/react"
```

Pass any numerical motion value to `useVelocity`. It'll return a new motion value that updates with the velocity of the original value.

```
import { useMotionValue, useVelocity } from "framer-motion"

function Component() {
  const x = useMotionValue(0)
  const xVelocity = useVelocity(x)

  useMotionValueEvent(xVelocity, "change", latest => {
    console.log("Velocity", latestVelocity)
  })
  
  return <motion.div style={{ x }} />
}
```

Any numerical motion value will work. Even one returned from `useVelocity`.

```
const x = useMotionValue(0)
const xVelocity = useVelocity(x)
const xAcceleration = useVelocity(xVelocity)
```
