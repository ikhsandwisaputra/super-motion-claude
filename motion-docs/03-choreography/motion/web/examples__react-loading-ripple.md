---
source: https://motion.dev/examples/react-loading-ripple
title: "Loading ripple example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Loading ripple

An example of creating a ripple loading animation with Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Mar 2025

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/loading-ripple)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-loading-ripple#tutorial)

Difficulty

### Introduction

The Ripple example shows how to create an expanding ripple loading animation. Three circles scale outward while fading, creating a continuous pulsing effect that's perfect for loading indicators.

This example uses the [`animate` prop](https://motion.dev/docs/react-animation#basic-animations) to create looping animations with staggered delays, making each ripple start at a different time.

### Get started

Let's start with the basic structure. We need three overlapping circles:

```
"use client"

function LoadingRipple() {
    return (
        <div className="container">
            <div className="ripple-container">
                <div className="ripple" />
                <div className="ripple" />
                <div className="ripple" />
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
            `}
        </style>
    )
}

export default LoadingRipple
```

The ripples are positioned absolutely so they stack on top of each other.

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in React

* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
* [![Particle orb animation example](https://images.motion.dev/examples/react/particle-orb.png)Particle orb](https://motion.dev/examples/react-particle-orb)
* [![Lenis smooth scroll animation example](https://images.motion.dev/examples/previews/react/lenis-smooth-scroll/v-f15ffe4cd090/poster.webp)[](https://images.motion.dev/examples/previews/react/lenis-smooth-scroll/v-f15ffe4cd090/preview.mp4)Lenis smooth scroll](https://motion.dev/examples/react-lenis-smooth-scroll)
* [![Gallery: Showcase animation example](https://images.motion.dev/examples/previews/react/gallery-showcase/v-007b4233230d/poster.webp)[](https://images.motion.dev/examples/previews/react/gallery-showcase/v-007b4233230d/preview.mp4)Gallery: Showcase](https://motion.dev/examples/react-gallery-showcase)
