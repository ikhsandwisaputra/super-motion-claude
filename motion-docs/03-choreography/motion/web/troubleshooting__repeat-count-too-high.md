---
source: https://motion.dev/troubleshooting/repeat-count-too-high
title: "Repeat count too high (Error) | Motion Troubleshooting"
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

# Repeat count too high

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
Repeat count too high, must be less than 20.
```

You're creating an animation sequence with the `animate` [function](https://motion.dev/docs/animate) and you're using the `repeat` option.

```
animate([
  ["ul", { x: 100 }, { repeat: 10 }]
])
```

## Explanation

The way animation sequences work in Motion is each segment automatically plays after the previous segment.

```
animate([
  ["ul", { x: 100 }, { repeat: 10 }],
  ["li", { opacity: 1 }] // plays after ul animation
])
```

In the above example, the `"ul"` animation will repeat 10 times before the `"li"` animation plays.

It's also possible to adjust this using the `at` option.

```
animate([
  ["ul", { x: 100 }, { repeat: 10 }],
  ["li", { opacity: 1 }, { at: "+1" }] // plays 1 second after ul animation
])
```

Both of these behaviours require that the `"ul"` animation actually ends at a specific time. It can't repeat infinitely, and therefore a limit before that has been chosen of `20` repeats.

## Solution

It's always possible to repeat an *entire animation* an infinite number of times.

Therefore, if you want to repeat an animation a higher number of times than `20`, then this segment can be made its own animation.

```
const animation = animate("ul", { x: 100 }, { repeat: 21 })
await animation.finished
animate("li", { opacity: 1 })
```
