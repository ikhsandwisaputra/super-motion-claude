---
source: https://motion.dev/troubleshooting/cubic-bezier-length
title: "Incorrect cubic bezier length (Error) | Motion Troubleshooting"
fetched: 2026-10-28
---

* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR

>[Troubleshooting](https://motion.dev/troubleshooting)/ERROR

# Incorrect cubic bezier length

* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR

>You've received the following message

```
Cubic bezier arrays must contain four numerical values.
```

You've defined a cubic bezier curve with an incorrect number of points.

```
animate(
  element,
  { x: 100 },
  { ease: [0.3, 0.05, 0.45, 0.9, 1] }
)
```

## Solution

Cubic bezier curves must only contain four points. Use the [Motion AI Kit](https://motion.dev/docs/ai-kit) transition editor to visually design easing curves that are always syntactically valid.
