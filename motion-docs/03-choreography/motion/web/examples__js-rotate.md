---
source: https://motion.dev/examples/js-rotate
title: "Rotate example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Rotate

An example of a rotation animation in Motion.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)2 Jan 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/rotate)

## Source code

```
<div class="box"></div>

<script type="module">
    import { animate } from "motion"

    animate(".box", { rotate: 360 }, { duration: 1 })
</script>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: var(--hue-3);
        border-radius: 10px;
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-rotate#tutorial)

Difficulty

### Introduction

The Rotate example shows how to create a simple rotation animation using Motion's [`animate`](https://motion.dev/docs/animate) function. This is one of the most fundamental animations you can create, perfect for learning the basics of Motion.

The `animate` function from Motion lets you animate any HTML element with just one line of code. Unlike CSS animations that require you to define keyframes and manage animation states, Motion handles all the complexity for you - you just specify what you want to animate, what values to animate to, and Motion takes care of the rest.

### Get started

Let's start with a simple colored box:

```
<div class="box"></div>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: #9911ff;
        border-radius: 10px;
    }
</style>
```

This creates a purple square with rounded corners. Right now it's static, but we're about to make it spin.

### Let's animate!

#### Import from Motion

First, import the `animate` function from Motion:

```
<script type="module">
    import { animate } from "motion"
</script>
```

The `animate` function is Motion's core animation tool for vanilla JavaScript. It works with any HTML element and can animate any CSS property.

#### Add the rotation animation

Now we can animate our box with a single line:

```
<script type="module">
    import { animate } from "motion"

    animate(".box", { rotate: 360 }, { duration: 1 })
</script>
```

Let's break down what's happening:

1. **First argument** - `".box"`: This is a CSS selector that tells Motion which element to animate. Motion will find the element with the class `box` and animate it.
2. **Second argument** - `{ rotate: 360 }`: This is the animation target. We're telling Motion to rotate the element `360` degrees. Motion automatically handles the rotation transform for you - you don't need to write any CSS transform syntax.
3. **Third argument** - `{ duration: 1 }`: These are the animation options. The `duration` is measured in seconds, so `1` means the animation will take one second to complete.

When the page loads, the box will smoothly rotate 360 degrees (a full rotation) over one second. Motion automatically applies smooth easing to make the animation feel natural, so the box doesn't just spin at a constant speed - it has a pleasant acceleration and deceleration.

### Conclusion

We've built a simple rotation animation using Motion's `animate` function. This example demonstrates the core concept of Motion: you specify what element to animate, what properties to change, and Motion handles all the technical details. From here, you can experiment with different rotation values, durations, or even try animating other properties like `scale`, `opacity`, or `x` and `y` positions.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
