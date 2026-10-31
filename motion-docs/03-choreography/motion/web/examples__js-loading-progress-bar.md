---
source: https://motion.dev/examples/js-loading-progress-bar
title: "Loading progress bar example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Loading progress bar

An example of creating a progress bar loading animation with Motion.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Mar 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/loading-progress-bar)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-loading-progress-bar#tutorial)

Difficulty

### Introduction

The Progress bar example shows how to create a smooth, spring-animated progress bar. This example uses the [`animate`](https://motion.dev/docs/animate) function with spring physics to create fluid transitions between progress updates.

### Get started

Let's start with the basic HTML structure:

```
<div class="container">
    <div class="progress-container">
        <div class="progress-bar"></div>
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--border);
        padding: 10px;
        border-radius: 20px;
    }

    .progress-container {
        width: 100%;
        max-width: 300px;
        height: 10px;
        background-color: var(--divider);
        border-radius: 20px;
        overflow: hidden;
    }

    .progress-bar {
        height: 100%;
        width: 400px;
        background-color: var(--hue-1);
        border-radius: 20px;
        will-change: transform;
        transform-origin: 0% 50%;
        transform: scaleX(0);
    }
</style>
```

The `transform-origin: 0% 50%` ensures the bar scales from the left edge.

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
