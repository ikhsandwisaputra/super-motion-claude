---
source: https://motion.dev/examples/react-carousel-ios-exposure-slider
title: "Carousel: iOS exposure slider example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Carousel: iOS exposure slider

An example of creating a camera exposure slider interface with animated notches using the Motion+ Carousel component for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)Inspired by[Apple](https://apple.com)17 Oct 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/carousel-ios-exposure-slider)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-carousel-ios-exposure-slider#tutorial)

Difficulty

### Introduction

The Carousel: iOS exposure slider example recreates the smooth, tactile feel of iOS camera's exposure adjustment control. As users drag the slider, notches animate in and out with spring physics, mimicking the visual feedback of the native control.

This example uses several Motion APIs working together:

* The Motion+ [`Carousel`](https://motion.dev/docs/react-carousel) component for the draggable slider.
* [`useTicker`](https://motion.dev/docs/react-carousel#useticker) and [`useTickerItem`](https://motion.dev/docs/react-carousel#usetickeritem) hooks to track individual notch positions.
* [`useMotionValue`](https://motion.dev/docs/react-motion-value) to hold the exposure value.
* [`useTransform`](https://motion.dev/docs/react-use-transform) to derive display values.
* [`useMotionValueEvent`](https://motion.dev/docs/react-use-motion-value-event) to respond to position changes.
* The [`animate`](https://motion.dev/docs/react-animation#basic-animations) prop to spring-animate notches as they grow and shrink.

### Get started

Let's build a simple exposure slider interface with an image and circular progress indicator.

```
"use client"

import { motion, useMotionValue } from "motion/react"

export default function CameraExposureSlider() {
    const exposure = useMotionValue(0)

    return (
        <div className="container">
            <div className="image-container">
                <img src="your-image.jpg" alt="Sample photo" />
            </div>

            <ProgressIndicator value={exposure} />

            <div className="exposure-slider">{/* Carousel will go here */}</div>
        </div>
    )
}

function ProgressIndicator({ value }) {
    return (
        <div className="progress-circle">
            <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" className="circle-border" />
            </svg>
            <div className="progress-value">0</div>
        </div>
    )
}

function Stylesheet() {
    return <style>/** Copy styles from example source code */</style>
}
```

### Related examples

* [![Carousel: iOS exposure slider animation example](https://images.motion.dev/examples/previews/vue/carousel-ios-exposure-slider/v-8d5bce13387a/poster.webp)[](https://images.motion.dev/examples/previews/vue/carousel-ios-exposure-slider/v-8d5bce13387a/preview.mp4)Carousel: iOS exposure slider](https://motion.dev/examples/vue-carousel-ios-exposure-slider)
* [![Color picker animation example](https://images.motion.dev/examples/previews/react/color-picker/v-b04efb83db05/poster.webp)[](https://images.motion.dev/examples/previews/react/color-picker/v-b04efb83db05/preview.mp4)Color picker](https://motion.dev/examples/react-color-picker)
* [![Characters remaining animation example](https://images.motion.dev/examples/previews/vue/characters-remaining/v-664a9d7b65ae/poster.webp)[](https://images.motion.dev/examples/previews/vue/characters-remaining/v-664a9d7b65ae/preview.mp4)Characters remaining](https://motion.dev/examples/vue-characters-remaining)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
