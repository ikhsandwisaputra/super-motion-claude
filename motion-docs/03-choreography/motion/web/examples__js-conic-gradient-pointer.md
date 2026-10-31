---
source: https://motion.dev/examples/js-conic-gradient-pointer
title: "Conic gradient pointer example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Conic gradient pointer

An example of creating a dynamic conic gradient that follows the pointer position.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)27 Feb 2025

:   JavaScript

:   [MotionScoreC](https://score.motion.dev/methodology "This example has a MotionScore of C, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/conic-gradient-pointer)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-conic-gradient-pointer#tutorial)

Difficulty

### Introduction

The Conic gradient pointer example shows how to create a dynamic conic gradient that follows your pointer as you move it across the screen. This creates a striking visual effect where the gradient's center point tracks with your cursor position.

This example uses [`motionValue`](https://motion.dev/docs/motion-value) from Motion to track the gradient's center coordinates, and [`frame`](https://motion.dev/docs/frame) to schedule efficient updates. Motion values let you track state that changes frequently (like pointer position) without triggering component re-renders, while `frame` ensures DOM updates happen at the optimal time in the browser's render cycle.

### Get started

Start with this basic HTML structure and styles:

```
<div class="container">
    <div class="gradient-box"></div>
</div>

<script type="module">
    const container = document.querySelector(".container")
    const gradientBox = document.querySelector(".gradient-box")
</script>

<style>
    /** Copy styles from example source code */
</style>
```

The container fills the viewport, centering our gradient box. We're setting `cursor: none` to hide the cursor since the gradient itself becomes a visual indicator of the pointer position.

### Related examples

* [![Particle orb animation example](https://images.motion.dev/examples/react/particle-orb.png)Particle orb](https://motion.dev/examples/react-particle-orb)
* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Color picker animation example](https://images.motion.dev/examples/previews/vue/color-picker/v-e88c4703364b/poster.webp)[](https://images.motion.dev/examples/previews/vue/color-picker/v-e88c4703364b/preview.mp4)Color picker](https://motion.dev/examples/vue-color-picker)

### Latest in JavaScript

* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)
