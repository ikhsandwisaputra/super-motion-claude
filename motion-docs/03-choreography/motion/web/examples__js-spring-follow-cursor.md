---
source: https://motion.dev/examples/js-spring-follow-cursor
title: "Spring: Follow Cursor example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Spring: Follow Cursor

An example of a spring animation that follows the cursor.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)10 Feb 2025

:   JavaScript

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/spring-follow-cursor)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-spring-follow-cursor#tutorial)

Difficulty

### Introduction

The Spring: Follow Cursor example shows how to create a smooth, spring-based animation that follows your cursor around the screen. Instead of snapping instantly to the pointer position, the ball bounces and settles naturally, mimicking real-world physics.

This example uses three core Motion APIs: [`springValue`](https://motion.dev/docs/spring-value) creates animated values with spring physics, [`styleEffect`](https://motion.dev/docs/style-effect) automatically applies those values to element styles, and [`animate`](https://motion.dev/docs/animate) provides the underlying animation engine.

Spring animations are perfect for cursor followers because they create natural-feeling motion. Unlike linear animations that move at a constant speed, springs accelerate and decelerate smoothly, creating more organic and visually appealing movement.

### Get started

Let's start with the basic HTML structure and styling for the ball that will follow our cursor:

```
<div class="ball"></div>

<script type="module">
    const ball = document.querySelector(".ball")
</script>

<style>
    /** Copy styles from example source code */
</style>
```

We've created a circular element with a pink background. The `overflow: hidden` on the body prevents scrollbars from appearing when the ball moves beyond the viewport edges.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
