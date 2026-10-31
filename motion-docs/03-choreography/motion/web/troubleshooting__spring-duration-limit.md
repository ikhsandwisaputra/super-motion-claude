---
source: https://motion.dev/troubleshooting/spring-duration-limit
title: "Spring duration limit (Warning) | Motion Troubleshooting"
fetched: 2026-10-28
---

* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING

>[Troubleshooting](https://motion.dev/troubleshooting)/WARNING

# Spring duration limit

* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING

>You've received the following message

```
Spring duration must be 10 seconds or less
```

You're trying to animate using a spring using a duration of more than `10` seconds and receiving this message.

```
animate(
  element,
  { filter: "blur(0)" },
  { type: "spring", duration: 20, bounce: 0 }
)
```

## Explanation

When defining a spring via `duration`, Motion has to "find" a spring of the defined bounciness that finishes as close to this `duration` as possible.

An undamped spring lasts for an infinite amount of time and this kind of spring would be impossible to "search" for. Given also the incompatibility there with the `bounce` option, and the performance implications of finding a spring with the longer duration, a limit is placed on `duration`. This is currently `10` seconds.

## Solution

### Use `visualDuration`

Visual duration is the amount of time an animation appears to take to reach its target, with the remaining oscillation happening after this duration has elapsed.

This makes it easier to edit the feeling of a spring with `bounce` alone, and coordinating the duration of a spring animation so it visually matches other non-spring animations.

You can use the [Motion AI Kit](https://motion.dev/docs/ai-kit) transition editor to visually play with the difference between `duration` and `visualDuration`.

Additionally, Motion can derive spring properties directly from `visualDuration` and `bounce`. It doesn't need to "find" a spring. Therefore `visualDuration` doesn't come with the same performance considerations and is therefore uncapped.

```
animate(
  element,
  { filter: "blur(0)" },
  { type: "spring", visualDuration: 20, bounce: 0 }
)
```

## Use physics-based springs

If you want a spring that lasts for an `Infinity` duration, then this is an undamped spring.

To create this kind of spring, set `damping` to `0`:

```
animate(
  element,
  { filter: "blur(0)" },
  { type: "spring", stiffness: 200, damping: 0 }
)
```
