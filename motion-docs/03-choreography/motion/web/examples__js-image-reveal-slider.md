---
source: https://motion.dev/examples/js-image-reveal-slider
title: "Image reveal slider example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Image reveal slider

An image reveal slider that uses Motion's drag() function to create a before/after image comparison with a sliding reveal effect. It includes keyboard accessibility and smooth animations.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)27 Feb 2025

:   JavaScript

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/image-reveal-slider)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-image-reveal-slider#tutorial)

Difficulty

### Introduction

The Image reveal slider example shows how to build an interactive before/after image comparison slider. By dragging a handle left and right, users can reveal or hide a black-and-white overlay to compare two versions of the same image.

This example uses several powerful APIs from Motion: [`motionValue`](https://motion.dev/docs/motion-value) to track the slider's position, [`styleEffect`](https://motion.dev/docs/style-effect) to efficiently update styles based on Motion values, [`mapValue`](https://motion.dev/docs/map-value) to transform the slider position into CSS properties, and [`animate`](https://motion.dev/docs/animate) to create smooth spring animations when snapping to boundaries or responding to keyboard input. We'll also use `clamp` to constrain values within boundaries.

The example includes elastic resistance at the edges, keyboard navigation with arrow keys, and smooth spring animations that give the slider a physical, responsive feel.

### Get started

Let's start with the basic HTML structure for our image comparison UI:

```
<div class="container" id="container">
    <div class="image-container">
        <img src="your-image.jpg" alt="Image" class="image" />
        <img
            src="your-image-b.jpg"
            alt="Image in black and white"
            class="image overlay"
            id="overlay"
        />
    </div>

    <div class="slider" id="slider" tabindex="0">
        <div class="handle">/** Copy icon from example source code */</div>
    </div>
</div>

<style>
    /** Copy styles from example source code */
</style>

<script type="module">
    // We'll add Motion code here
</script>
```

The key to this effect is layering two images on top of each other. The bottom image shows the full-color version, while the top image has a `filter: grayscale(100%)` applied. We'll use `clip-path` to reveal or hide portions of the grayscale overlay, creating the comparison effect.

The slider element is positioned absolutely over the images and includes a circular handle for dragging. We've added `tabindex="0"` to make the slider keyboard-accessible.

### Related examples

* [![Add to basket animation example](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/poster.webp)[](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/preview.mp4)Add to basket](https://motion.dev/examples/js-add-to-basket)
* [![Add to basket animation example](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/poster.webp)[](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/preview.mp4)Add to basket](https://motion.dev/examples/react-add-to-basket)
* [![Pointer collision detection animation example](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/poster.webp)[](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/preview.mp4)Pointer collision detection](https://motion.dev/examples/react-collision-hover-grid)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
