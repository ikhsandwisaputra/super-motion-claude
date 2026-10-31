---
source: https://motion.dev/examples/react-scroll-image-reveal
title: "Scroll Image Reveal example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Scroll Image Reveal

Images reveal with a clip-path curtain effect as you scroll. Uses useScroll with element targeting and useTransform for clipPath and scale.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)29 Jan 2026

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/scroll-image-reveal)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-scroll-image-reveal#tutorial)

Difficulty

### Introduction

The Scroll Image Reveal example shows how to create a curtain reveal effect where images dramatically unveil themselves as you scroll. The effect combines a horizontal clip-path reveal that opens from the center with a subtle parallax effect on the images themselves.

This example uses three Motion hooks: [`useScroll`](https://motion.dev/docs/react-use-scroll) to track each image's position in the viewport, [`useTransform`](https://motion.dev/docs/react-use-transform) to map scroll progress to clip-path values and transform properties, and [`useRef`](https://react.dev/reference/react/useRef) to target individual elements for scroll tracking.

### Get started

We'll create a reusable `RevealImage` component that handles the scroll-linked animation. Start with this structure:

```
"use client"

import { useRef } from "react"

function RevealImage({ src, alt, aspectRatio }) {
    const ref = useRef(null)

    return (
        <div ref={ref} className="reveal-container">
            <div className="reveal-mask" style={{ aspectRatio }}>
                <img src={src} alt={alt} />
            </div>
        </div>
    )
}

export default function ScrollImageReveal() {
    return (
        <div id="example">
            <RevealImage
                src="your-image-1.jpg"
                alt="Image 1"
                aspectRatio="666 / 500"
            />

            <RevealImage
                src="your-image-2.jpg"
                alt="Image 2"
                aspectRatio="667 / 500"
            />

            <RevealImage
                src="your-image-3.jpg"
                alt="Image 3"
                aspectRatio="375 / 500"
            />

            <section className="spacer" />

            <StyleSheet />
        </div>
    )
}

function StyleSheet() {
    return (
        <style>
            /** Copy styles from example source code */
        </style>
    )
}
```

The `ref` on the container will let us track each image's scroll position individually. The aspect ratio prop ensures each image maintains its dimensions.

### Related examples

* [![Scroll Direction: Hide Header animation example](https://images.motion.dev/examples/previews/vue/scroll-hide-header/v-019a67108f8b/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-hide-header/v-019a67108f8b/preview.mp4)Scroll Direction: Hide Header](https://motion.dev/examples/vue-scroll-hide-header)
* [![Scroll Horizontal Gallery animation example](https://images.motion.dev/examples/previews/vue/scroll-horizontal/v-2ba8d5838798/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-horizontal/v-2ba8d5838798/preview.mp4)Scroll Horizontal Gallery](https://motion.dev/examples/vue-scroll-horizontal)
* [![Scroll Text Lines animation example](https://images.motion.dev/examples/previews/vue/scroll-text-lines/v-1fbc03d5ce58/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-text-lines/v-1fbc03d5ce58/preview.mp4)Scroll Text Lines](https://motion.dev/examples/vue-scroll-text-lines)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
