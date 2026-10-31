---
source: https://motion.dev/examples/react-loading-line-reveal
title: "Loading overlay example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Loading overlay

An example of creating a line reveal loading animation with clipPath in Motion for React

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Mar 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/loading-line-reveal)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-loading-line-reveal#tutorial)

Difficulty

### Introduction

The Line reveal example creates a dramatic loading animation where a thin vertical line extends from the center of the screen, then expands horizontally to reveal content beneath.

This example combines several Motion APIs: [`useSpring`](https://motion.dev/docs/react-use-spring) for smooth progress, [`useTransform`](https://motion.dev/docs/react-use-transform) to map progress to clip-path coordinates, [`useMotionTemplate`](https://motion.dev/docs/react-motion-value#usemotiontemplate) to compose values into a CSS polygon, [`useMotionValueEvent`](https://motion.dev/docs/react-use-motion-value-event) to detect completion, and the [`animate`](https://motion.dev/docs/animate) function for the horizontal expansion.

### Get started

The structure has a gallery behind two overlays - a black one and a pink one that will animate:

```
"use client"

import { useEffect, useState } from "react"

function LoadingLineReveal() {
    return (
        <div className="container">
            <Gallery />
            <div className="black-overlay" />
            <div className="pink-overlay" />
            <StyleSheet />
        </div>
    )
}
```

The pink overlay will have a clip-path that creates a vertical line revealing the content beneath.

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in React

* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
* [![Particle orb animation example](https://images.motion.dev/examples/react/particle-orb.png)Particle orb](https://motion.dev/examples/react-particle-orb)
* [![Lenis smooth scroll animation example](https://images.motion.dev/examples/previews/react/lenis-smooth-scroll/v-f15ffe4cd090/poster.webp)[](https://images.motion.dev/examples/previews/react/lenis-smooth-scroll/v-f15ffe4cd090/preview.mp4)Lenis smooth scroll](https://motion.dev/examples/react-lenis-smooth-scroll)
* [![Gallery: Showcase animation example](https://images.motion.dev/examples/previews/react/gallery-showcase/v-007b4233230d/poster.webp)[](https://images.motion.dev/examples/previews/react/gallery-showcase/v-007b4233230d/preview.mp4)Gallery: Showcase](https://motion.dev/examples/react-gallery-showcase)
