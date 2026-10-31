---
source: https://motion.dev/examples/react-loading-progress-bar
title: "Loading progress bar example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Loading progress bar

An example of creating a progress bar loading animation with Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Mar 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/loading-progress-bar)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-loading-progress-bar#tutorial)

Difficulty

### Introduction

The Progress bar example shows how to create a smooth, spring-animated progress bar. This example uses [`useSpring`](https://motion.dev/docs/react-use-spring) to create a Motion Value with spring physics, making progress updates feel smooth and organic even when the underlying values change in discrete jumps.

### Get started

Let's start with the basic structure:

```
"use client"

function LoadingProgressBar() {
    return (
        <div className="container">
            <div className="progress-container">
                <div className="progress-bar" />
            </div>
            <StyleSheet />
        </div>
    )
}

function StyleSheet() {
    return (
        <style>
            {`
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
            }
            `}
        </style>
    )
}

export default LoadingProgressBar
```

The `transform-origin: 0% 50%` ensures the bar scales from the left edge.

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in React

* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
* [![Particle orb animation example](https://images.motion.dev/examples/react/particle-orb.png)Particle orb](https://motion.dev/examples/react-particle-orb)
* [![Lenis smooth scroll animation example](https://images.motion.dev/examples/previews/react/lenis-smooth-scroll/v-f15ffe4cd090/poster.webp)[](https://images.motion.dev/examples/previews/react/lenis-smooth-scroll/v-f15ffe4cd090/preview.mp4)Lenis smooth scroll](https://motion.dev/examples/react-lenis-smooth-scroll)
* [![Gallery: Showcase animation example](https://images.motion.dev/examples/previews/react/gallery-showcase/v-007b4233230d/poster.webp)[](https://images.motion.dev/examples/previews/react/gallery-showcase/v-007b4233230d/preview.mp4)Gallery: Showcase](https://motion.dev/examples/react-gallery-showcase)
