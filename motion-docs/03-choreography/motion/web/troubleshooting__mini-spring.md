---
source: https://motion.dev/troubleshooting/mini-spring
title: "Mini animate() doesn't support type: \"spring\" (Error) | Motion Troubleshooting"
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

# Mini animate() doesn't support type: "spring"

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
Mini animate() doesn't support "type" as a string.
```

You're using the mini `animate()` [function](https://motion.dev/docs/animate) and you've set `type: "spring"`.

```
animate(
  element,
  { transform: "translateX(100px)" },
  { type: "spring" }
)
```

## Explanation

The mini `animate()` function is built exclusively on the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API). It's designed to be as small as possible, while maintaining as many features from the hybrid WAAPI/JS `animate()` function as possible.

To hit this tiny bundlesize, [spring animations](https://motion.dev/docs/spring) are not included by default.

## Solution

Import `spring` from `"motion"`:

```
import { animate } from "motion/mini"
import { spring } from "motion"
```

Or if you're creating a React animation using useAnimate:

Then set `type` directly to the imported `spring`:

```
animate(
  element,
  { transform: "translateX(100px)" },
  { type: spring }
)
```
