---
source: https://motion.dev/examples/js-loading-infinite-path-drawing
title: "Loading: Infinite path drawing example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Loading: Infinite path drawing

An example of creating an infinite path drawing loading animation with Motion. This example uses svgEffect to animate the path. svgEffect is the next-generation Motion SVG renderer that makes it easy to create these infinitely looping drawing animations. In a future version of Motion it'll be possible to just use the animate function below without the svgEffect setup.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)27 May 2025

:   JavaScript

:   [MotionScoreC](https://score.motion.dev/methodology "This example has a MotionScore of C, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/loading-infinite-path-drawing)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-loading-infinite-path-drawing#tutorial)

Difficulty

### Introduction

The Infinite path drawing example shows how to create a smooth, infinitely looping SVG path animation. A segment of an infinity symbol continuously traces along the path, creating a mesmerizing loading indicator.

This example uses [`svgEffect`](https://motion.dev/docs/svg-effect) for rendering animated SVG properties, [`motionValue`](https://motion.dev/docs/motion-value) for creating animated values, and [`animate`](https://motion.dev/docs/animate) for driving the animation.

### Get started

Start with an SVG containing two paths - a faded background path and the animated path:

```
<div class="container">
    <svg
        class="infinity-loader"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width="200px"
        height="200px"
    >
        <path
            d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8"
            fill="none"
            stroke="var(--border)"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            id="loading-path"
            d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8"
            fill="none"
            stroke="var(--hue-1)"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0"
        />
    </svg>
</div>
```

The second path starts with `opacity="0"` because we'll control its visibility through Motion.

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
