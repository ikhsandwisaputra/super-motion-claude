---
source: https://motion.dev/examples/react-scroll-velocity-linked-offset
title: "Scroll velocity effect in React: live demo and code | Motion"
fetched: 2026-10-28
---

# Scroll velocity: 3D planes

An example of creating a 3D gallery with a scroll velocity-linked wave and a detail view, using the Motion+ Gallery component for React.

This scroll velocity effect bends a 3D carousel of planes into a wave as you scroll. `useVelocity` reads the velocity of a spring-smoothed scroll value, and `useSpring` turns it into each plane's wave offset. `useTransform` builds each plane's 3D transform from its position and the wave.

![](https://images.motion.dev/magazine/htJFzLHE31sFxTHcTifEpmUSk.jpg)[Joel](https://x.com/joelbqz)27 Jan 2026

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/scroll-velocity-linked-offset)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-scroll-velocity-linked-offset#tutorial)

Difficulty

### Introduction

The Scroll velocity: 3D planes example lays a collection of photos out as a line of angled planes that rises into the distance. Scroll or drag it, and a wave ripples through the planes with a strength that follows your speed. Hover a plane and it lifts towards you with a scrambled label. Click it and it opens into a detail view, with the rest of the collection lined up in a strip below.

The Motion+ [`Gallery`](https://motion.dev/docs/react-gallery) component does the heavy lifting. Its `list` arrangement places the planes, the `ripple` modifier makes the wave, and `galleryDetail` opens the detail view. We also use [`AnimatePresence`](https://motion.dev/docs/react-animate-presence), [`useTransform`](https://motion.dev/docs/react-use-transform) and the Motion+ [`ScrambleText`](https://motion.dev/docs/react-scramble-text) component for the labels.

### Get started

Let's start with the page: a header, a hint and a list of plane components, each with an image and an index.

```
"use client"

const images = Array.from({ length: 16 }, (_, i) => `/photos/${i + 1}.jpg`)
const labels = ["Afterglow", "Drift Frame", "Peripheral" /* ... */]

function Plane({ index }) {
    return (
        <div className="plane">
            <img
                src={images[index]}
                alt={labels[index]}
                className="plane-image"
                draggable={false}
            />
            <div className="plane-index">{String(index).padStart(2, "0")}</div>
        </div>
    )
}

export default function ScrollVelocityLinkedOffset() {
    return (
        <>
            <div className="heritage">
                <div className="header">
                    <div className="title">HERITAGE FW25/26</div>
                    <div className="title title-collection">COLLECTION</div>
                </div>
                <div className="hint">scroll to surf, click to open</div>
                <div className="viewport">
                    {images.map((_, index) => (
                        <Plane key={index} index={index} />
                    ))}
                </div>
            </div>
            <Stylesheet />
        </>
    )
}

function Stylesheet() {
    return (
        <style>
            {/** Copy styles from example source code */}
        </style>
    )
}
```

Right now the planes sit in a plain row. In the next steps, `Gallery` turns them into a 3D line that we can scroll, drag and open.

### Related examples

* [![Scroll Direction: Hide Header animation example](https://images.motion.dev/examples/previews/vue/scroll-hide-header/v-019a67108f8b/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-hide-header/v-019a67108f8b/preview.mp4)Scroll Direction: Hide Header](https://motion.dev/examples/vue-scroll-hide-header)
* [![Scroll Horizontal Gallery animation example](https://images.motion.dev/examples/previews/vue/scroll-horizontal/v-2ba8d5838798/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-horizontal/v-2ba8d5838798/preview.mp4)Scroll Horizontal Gallery](https://motion.dev/examples/vue-scroll-horizontal)
* [![Scroll Text Lines animation example](https://images.motion.dev/examples/previews/vue/scroll-text-lines/v-1fbc03d5ce58/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-text-lines/v-1fbc03d5ce58/preview.mp4)Scroll Text Lines](https://motion.dev/examples/vue-scroll-text-lines)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
