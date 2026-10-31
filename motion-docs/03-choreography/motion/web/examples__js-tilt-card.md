---
source: https://motion.dev/examples/js-tilt-card
title: "Tilt card example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Tilt card

A card that tilts based on pointer position using Motion's spring animations.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)27 Feb 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/tilt-card)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-tilt-card#tutorial)

Difficulty

### Introduction

The Tilt card example shows how to create an interactive card that tilts in 3D based on where your pointer is positioned. When you move your pointer over the card, it rotates to follow the movement, creating a dynamic parallax effect.

This tutorial uses the [`animate`](https://motion.dev/docs/animate) function from Motion to create smooth spring animations, and the [`frame`](https://motion.dev/docs/frame) API to schedule animations efficiently. If `transformPerspective` and `preserve-3d` are new to you, [3D transforms and perspective](https://motion.dev/docs/3d-transforms) explains what each one is doing here.

### Get started

Let's start with a basic card containing an image, a gradient overlay, and a caption:

```
<div class="card">
    <img src="your-image.jpg" alt="Image description" />
    <div class="gradient-overlay"></div>
    <div class="caption">Caption text</div>
</div>

<script type="module"></script>

<style>
    /** Copy styles from example source code */
</style>
```

The card has an image as the background, with a gradient overlay at the bottom to make the caption text more readable.

### Related examples

* [![Add to basket animation example](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/poster.webp)[](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/preview.mp4)Add to basket](https://motion.dev/examples/js-add-to-basket)
* [![Add to basket animation example](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/poster.webp)[](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/preview.mp4)Add to basket](https://motion.dev/examples/react-add-to-basket)
* [![Pointer collision detection animation example](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/poster.webp)[](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/preview.mp4)Pointer collision detection](https://motion.dev/examples/react-collision-hover-grid)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
