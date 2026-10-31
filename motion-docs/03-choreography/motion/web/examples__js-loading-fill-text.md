---
source: https://motion.dev/examples/js-loading-fill-text
title: "Fill text example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Fill text

An example of creating a text fill loading animation with Motion.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Mar 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/loading-fill-text)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-loading-fill-text#tutorial)

Difficulty

### Introduction

The Fill text example shows how to create a loading animation where text fills from left to right. This uses the [`transform`](https://motion.dev/docs/transform) utility to map progress values to `clip-path` strings, and the [`animate`](https://motion.dev/docs/animate) function with spring physics for smooth transitions.

The technique stacks two copies of text - a faded background version and a bright version that's progressively revealed.

### Get started

Start with two overlapping text elements:

```
<div class="container">
    <div class="text-container">
        <div class="text text-bg" aria-hidden>Loading</div>
        <div class="text text-fill">Loading</div>
    </div>
</div>

<style>
    .text-container {
        position: relative;
    }

    .text {
        color: var(--hue-1);
        font-weight: 900;
        font-size: 64px;
    }

    .text-bg {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.2;
    }

    .text-fill {
        clip-path: inset(0 100% 0 0);
        will-change: clip-path;
    }
</style>
```

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
