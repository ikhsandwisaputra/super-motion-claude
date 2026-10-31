---
source: https://motion.dev/examples/js-loading-ripple
title: "Loading ripple example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Loading ripple

An example of creating a ripple loading animation with Motion.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Mar 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/loading-ripple)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-loading-ripple#tutorial)

Difficulty

### Introduction

The Ripple example shows how to create an expanding ripple loading animation. Three circles scale outward while fading, creating a continuous pulsing effect that's perfect for loading indicators.

This example uses the [`animate`](https://motion.dev/docs/animate) function with the [`stagger`](https://motion.dev/docs/stagger) function to automatically delay each ripple, creating a continuous wave effect.

### Get started

Let's start with the basic HTML structure:

```
<div class="container">
    <div class="ripple-container">
        <div class="ripple"></div>
        <div class="ripple"></div>
        <div class="ripple"></div>
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ripple-container {
        position: relative;
        width: 100px;
        height: 100px;
    }

    .ripple {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        border: 5px solid var(--hue-1);
        will-change: transform, opacity;
        opacity: 0;
    }
</style>
```

The ripples are positioned absolutely so they stack on top of each other.

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
