---
source: https://motion.dev/examples/react-ios-slider
title: "iOS slider example & tutorial for React | Motion"
fetched: 2026-10-28
---

# iOS slider

An example of recreating the iOS slider using Motion for React. This example uses useTransform to map input to slider state, and slider state to pull, squish and squash animations. It uses React'setModal onFocus and onBlur to set up keyboard-accessible inputs, with Motion's whileFocus prop to animate a custom focus indicator.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)20 Jan 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/ios-slider)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-ios-slider#tutorial)

Difficulty

### Introduction

The iOS slider example recreates the playful brightness slider found in the iOS shortcut screen using Motion for React. It features an intuitive drag interaction with a satisfying elastic pull effect, squish and stretch animations, and keyboard accessibility.

In this tutorial, we'll learn to use:

* [`useMotionValue`](https://motion.dev/docs/react-motion-value) to track the slider's progress
* [`useTransform`](https://motion.dev/docs/react-use-transform) to map values between different ranges
* The [`motion`](https://motion.dev/docs/react-motion-component) component to create interactive animations
* Gesture handling with [`onTapStart`](https://motion.dev/docs/react-gestures#tap), [`onPan`](https://motion.dev/docs/react-gestures#pan), and [`onPanEnd`](https://motion.dev/docs/react-gestures#pan)
* The [`whileFocus`](https://motion.dev/docs/react-gestures#focus) prop for animating keyboard accessibility highlighting

### Get started

Let's start by setting up the basic structure of our component:

```
"use client"

import { useRef } from "react"

export default function Slider({
    maxPull = 20,
    maxSquish = 0.92,
    maxStretch = 1.08,
    keyboardStep = 0.05,
    keyboardSpring = { stiffness: 200, damping: 60 },
}) {
    const ref = useRef(null)

    return (
        <div style={container}>
            <div ref={ref} style={slider}>
                <div style={indicator} />
                <div>
                    <SunIcon />
                </div>
            </div>
        </div>
    )
}

/** Copy icons and styles from the example source */
```

This provides us with a basic slider that looks right, but no interactivity or animations yet.

### Related examples

* [![Carousel: iOS exposure slider animation example](https://images.motion.dev/examples/previews/vue/carousel-ios-exposure-slider/v-8d5bce13387a/poster.webp)[](https://images.motion.dev/examples/previews/vue/carousel-ios-exposure-slider/v-8d5bce13387a/preview.mp4)Carousel: iOS exposure slider](https://motion.dev/examples/vue-carousel-ios-exposure-slider)
* [![Color picker animation example](https://images.motion.dev/examples/previews/react/color-picker/v-b04efb83db05/poster.webp)[](https://images.motion.dev/examples/previews/react/color-picker/v-b04efb83db05/preview.mp4)Color picker](https://motion.dev/examples/react-color-picker)
* [![Carousel: iOS exposure slider animation example](https://images.motion.dev/examples/previews/react/carousel-ios-exposure-slider/v-eddc4ec5908c/poster.webp)[](https://images.motion.dev/examples/previews/react/carousel-ios-exposure-slider/v-eddc4ec5908c/preview.mp4)Carousel: iOS exposure slider](https://motion.dev/examples/react-carousel-ios-exposure-slider)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
