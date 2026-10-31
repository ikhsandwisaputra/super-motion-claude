---
source: https://motion.dev/examples/react-parallax
title: "Parallax effect in React: scroll-linked demo and code | Motion"
fetched: 2026-10-28
---

# Parallax

Scroll-linked parallax effect where background images move at a different speed to foreground content, creating a sense of depth.

This parallax effect is scroll-linked: each background moves more slowly than the page, so it appears further away. `useScroll` tracks each section's progress through the viewport, and `useTransform` maps that progress to the image's `y` offset and the caption's opacity.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)14 Jan 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/parallax)

>Ship this

## Use this in your own site

This is not just a demo to learn from. Motion+ unlocks the full, production-ready source so you can copy it straight into your own project and ship it.

[Get Motion+](https://motion.dev/plus?referral=UI+section+react-parallax)

>Motion UI

* [Component docs](https://motion.dev/ui/components/parallax-layers)
* [Composed section](https://motion.dev/ui/sections/react-hero-parallax-layers)
* [Hero sections](https://motion.dev/ui/hero-sections)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-parallax#tutorial)

Difficulty

### Introduction

The Parallax example shows how to build a full-page scrolling gallery where background images move at a different speed to the foreground text, creating a sense of depth. It also fades text in and out as each section moves through the viewport.

It uses three APIs from Motion:

* [`useScroll`](https://motion.dev/docs/react-use-scroll) to track how far each section has scrolled through the viewport
* [`useTransform`](https://motion.dev/docs/react-use-transform) to map that scroll progress to image position and text opacity/position values
* The [`motion`](https://motion.dev/docs/react-motion-component) component to apply those values as live styles

### Get started

We'll build the page as a list of sections, each containing a background image and an overlay with a title and subtitle. Here's the starter markup:

```
"use client"

import { useRef } from "react"

interface SectionData {
    image: string
    title: string
    subtitle: string
}

const SECTIONS: SectionData[] = [
    {
        image: "your-image-1.jpg",
        title: "Title 1",
        subtitle: "Subtitle 1",
    },
    {
        image: "your-image-2.jpg",
        title: "Title 2",
        subtitle: "Subtitle 2",
    },
]

const ParallaxSection = ({
    image,
    title,
    subtitle,
}: SectionData) => {
    const ref = useRef(null)

    return (
        <section ref={ref} className="parallax-section">
            <div className="parallax-bg">
                <img src={image} alt={title} />
            </div>
            <div className="parallax-overlay" />
            <div className="parallax-content">
                <h2 className="parallax-title">{title}</h2>
                <p className="parallax-subtitle">{subtitle}</p>
            </div>
        </section>
    )
}

export default function Parallax() {
    return (
        <div className="parallax-page">
            {SECTIONS.map((section, i) => (
                <ParallaxSection key={i} index={i} {...section} />
            ))}
        </div>
    )
}

<style>
    /** Copy styles from example source code */
</style>
```

Each section is `100vh` tall and has `overflow: hidden` so that the background image - which is taller than the section - gets clipped as it moves. The `parallax-overlay` is a semi-transparent gradient layered over the image to make the text readable.

### Related examples

* [![Scroll Direction: Hide Header animation example](https://images.motion.dev/examples/previews/vue/scroll-hide-header/v-019a67108f8b/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-hide-header/v-019a67108f8b/preview.mp4)Scroll Direction: Hide Header](https://motion.dev/examples/vue-scroll-hide-header)
* [![Scroll Horizontal Gallery animation example](https://images.motion.dev/examples/previews/vue/scroll-horizontal/v-2ba8d5838798/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-horizontal/v-2ba8d5838798/preview.mp4)Scroll Horizontal Gallery](https://motion.dev/examples/vue-scroll-horizontal)
* [![Scroll Text Lines animation example](https://images.motion.dev/examples/previews/vue/scroll-text-lines/v-1fbc03d5ce58/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-text-lines/v-1fbc03d5ce58/preview.mp4)Scroll Text Lines](https://motion.dev/examples/vue-scroll-text-lines)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
