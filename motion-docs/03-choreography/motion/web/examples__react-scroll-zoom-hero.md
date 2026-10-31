---
source: https://motion.dev/examples/react-scroll-zoom-hero
title: "Scroll Zoom Hero example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Scroll Zoom Hero

An immersive hero section where the background image scales up, blurs, and fades as you scroll. Creates a dramatic entry effect.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)29 Jan 2026

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/scroll-zoom-hero)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-scroll-zoom-hero#tutorial)

Difficulty

### Introduction

The Scroll Zoom Hero example shows how to create a cinematic hero section where a background image scales up, blurs, and fades out as you scroll. This creates an immersive entry effect commonly seen in modern web design.

This tutorial uses three Motion APIs: [`useScroll`](https://motion.dev/docs/react-use-scroll) for tracking scroll position within a specific range, [`useTransform`](https://motion.dev/docs/react-use-transform) for converting scroll progress into multiple animation values, and the [`style` prop](https://motion.dev/docs/react-motion-component#style) for applying those animated values to elements.

### Get started

Let's start with the basic HTML structure and styles. We'll create a hero section with a background image and text content, followed by a content section to enable scrolling.

```
"use client"

import { motion } from "motion/react"
import { useRef } from "react"

export default function ScrollZoomHero() {
    const containerRef = useRef(null)

    return (
        <div id="example">
            <section ref={containerRef} className="hero-section">
                <div className="hero-sticky">
                    <div className="hero-background">
                        <img
                            src="your-image.jpg"
                            alt="Hero image"
                        />
                    </div>

                    <div className="hero-content">
                        <h1 className="impact">YOUR TITLE</h1>
                    </div>
                </div>
            </section>

            <section className="content-section">
                <p className="big">Your content here</p>
            </section>

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

The key structural element here is `containerRef`, which we'll use to track scroll progress. The hero section is set to `200vh` height, giving us plenty of scroll distance to work with. Inside that, `.hero-sticky` uses `position: sticky` to keep the hero in view while we scroll through it.

### Related examples

* [![Scroll Direction: Hide Header animation example](https://images.motion.dev/examples/previews/vue/scroll-hide-header/v-019a67108f8b/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-hide-header/v-019a67108f8b/preview.mp4)Scroll Direction: Hide Header](https://motion.dev/examples/vue-scroll-hide-header)
* [![Scroll Horizontal Gallery animation example](https://images.motion.dev/examples/previews/vue/scroll-horizontal/v-2ba8d5838798/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-horizontal/v-2ba8d5838798/preview.mp4)Scroll Horizontal Gallery](https://motion.dev/examples/vue-scroll-horizontal)
* [![Scroll Text Lines animation example](https://images.motion.dev/examples/previews/vue/scroll-text-lines/v-1fbc03d5ce58/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-text-lines/v-1fbc03d5ce58/preview.mp4)Scroll Text Lines](https://motion.dev/examples/vue-scroll-text-lines)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
