---
source: https://motion.dev/troubleshooting/spring-two-frames
title: "Spring only supports two keyframes (Error) | Motion Troubleshooting"
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

# Spring only supports two keyframes

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
Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes}.
```

You're attempting to create a spring animation either with a `<motion />` [component](https://motion.dev/docs/react-motion-component) or `animate()` [function](https://motion.dev/docs/animate) and you've received a message that you can only animate a maximum of two keyframes.

```
<motion.div animate={{ x: [0, 100, 50] }} transition={{ type: "spring" }} />
```

```
animate(element, { x: [0, 100, 50] }, { type: "spring" })
```

## Explanation

The very basic technical explanation behind this limitation is that it'd take a little more code to support this and we're not certain it would be worth the overhead.

It's not impossible, and if you would like to see this functionality added, please [make a feature request](https://github.com/motiondivision/motion).

The further considerations include the fact that spring animations are physics-based. As a result, an animation like this:

```
animate(
  element,
  { x: [0, 100, 50], y: [0, 10, 5] },
  { type: "spring" }
)
```

Could fall out of sync in a surprising way as the `y` animations complete sooner.

## Solution

### Change animation type

Multiple keyframes will not use a spring animation by default, so removing `type: "spring"` will fix the error.

```
animate(element, { x: [0, 100, 50] }, { duration: 1 })
```

It's possible to continue using a spring animation for other values by only removing the spring animation on the affected value using transition overrides:

```
<motion.div
  animate={{
    x: [0, 100, 50],
    y: 100
  }}
  transition={{
    type: "spring",
    x: { duration: 1 }
  }}
/>
```

### Use multiple animations or sequence

Alternatively, when using `animate()`, it's possible to play spring animations subsequently:

```
await animate(element, { x: 100 }, { type: "spring" }).finished
animate(element, { x: 50 }, { type: "spring" })
```

Or explicitly sequence them within a single `animate()` call:

```
animate([
  [element, { x: [0, 100] }, { type: "spring" }],
  [element, { x: 50 }, { type: "spring" }]
])
```
