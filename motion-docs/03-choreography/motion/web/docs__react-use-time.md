---
source: https://motion.dev/docs/react-use-time
title: "useTime"
fetched: 2026-10-28
---

# useTime

A motion value that returns elapsed time in milliseconds, every frame.

`useTime` returns a [motion value](https://motion.dev/docs/react-motion-value) that updates once per frame with the duration, in milliseconds, since it was first created.

This is especially useful in generating perpetual animations.

```
const time = useTime();
const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });

return <motion.div style={{ rotate }} />
```

Live example: https://examples.motion.dev/react/use-time

## Usage

Import from Motion:

```
import { useTime } from "motion/react"
```

When called, `useTime` will create a new motion value. This value will update every frame with the time since its creation.

You can use this either directly or by composing with other motion value hooks.

```
const time = useTime()
const rotate = useTransform(
  time,
  [0, 4000], // For every 4 seconds...
  [0, 360], // ...rotate 360deg
  { clamp: false }
)
```
