---
source: https://motion.dev/examples/js-loading-line-reveal
title: "Loading overlay example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Loading overlay

An example of creating a line reveal loading animation with clipPath in Motion

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Mar 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/loading-line-reveal)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-loading-line-reveal#tutorial)

Difficulty

### Introduction

The Line reveal example creates a dramatic loading animation where a thin vertical line extends from the center of the screen, then expands horizontally to reveal content beneath.

This example uses the [`animate`](https://motion.dev/docs/animate) function and [`transform`](https://motion.dev/docs/transform) utility to create a complex clip-path animation that responds to loading progress.

### Get started

The structure has a gallery behind two overlays:

```
<div class="container">
    <ul class="gallery-container"></ul>
    <div class="black-overlay"></div>
    <div class="pink-overlay"></div>
</div>
```

The pink overlay will have a clip-path that creates a vertical line revealing the content beneath.

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
