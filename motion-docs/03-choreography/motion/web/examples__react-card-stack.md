---
source: https://motion.dev/examples/react-card-stack
title: "Card stack example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Card stack

An example of creating a swipeable card stack with photos in Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)19 Aug 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/card-stack)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-card-stack#tutorial)

Difficulty

### Introduction

The Card stack example shows how to build a swipeable photo stack interface where users can drag the top card left or right to cycle through images. When a card is swiped with enough force or distance, it animates off-screen and cycles to the back of the stack.

In this tutorial, we'll learn to use the [`drag`](https://motion.dev/docs/react-gestures#drag) gesture, [`useMotionValue`](https://motion.dev/docs/react-motion-value), [`useTransform`](https://motion.dev/docs/react-use-transform) for connecting values, and the [`animate`](https://motion.dev/docs/animate) function for manual animations.

### Get started

Let's start with our basic card stack structure. We want to create two components, `CardStack` and `StackImage`:

```
"use client"

import Image from "next/image"
import { useState } from "react"

export default function CardStack() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const images = [
        { src: "/photos/prague/image-03.jpg", ratio: 3 / 4 },
        { src: "/photos/prague/image-09.jpg", ratio: 3 / 4 },
        { src: "/photos/prague/image-01.jpg", ratio: 4 / 3 },
        // Add more images...
    ]

    return (
        <>
            <ul className="stack">
                {images.map((image, index) => (
                    <StackImage
                        key={image.src}
                        src={image.src}
                        ratio={image.ratio}
                        index={index}
                        currentIndex={currentIndex}
                        totalImages={images.length}
                        onNext={() =>
                            setCurrentIndex((currentIndex + 1) % images.length)
                        }
                    />
                ))}
            </ul>
            <p className="instructions">Swipe the top photo left or right.</p>
            {/** Copy styles from example source code */}
        </>
    )
}

function StackImage({ src, ratio, index, currentIndex, totalImages, onNext }) {
    return (
        <li className="item">
            <Image src={src} fill alt="" />
        </li>
    )
}
```

This creates a basic stack of images with state to track which card is currently on top.

Note: The state is a simple index, rather than a reordering of the list. For performant animations it's best to keep DOM manipulation to a minimum. By using an index we can keep the items in the same physical order but visually reorder them using `transform`, `opacity` and `zIndex` alone.

### Related examples

* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Reorder grid animation example](https://images.motion.dev/examples/previews/vue/reorder-grid/v-223b30f1f488/poster.webp)[](https://images.motion.dev/examples/previews/vue/reorder-grid/v-223b30f1f488/preview.mp4)Reorder grid](https://motion.dev/examples/vue-reorder-grid)
* [![Multidimensional reorder animation example](https://images.motion.dev/examples/previews/react/reorder-grid/v-6218a2888c89/poster.webp)[](https://images.motion.dev/examples/previews/react/reorder-grid/v-6218a2888c89/preview.mp4)Multidimensional reorder](https://motion.dev/examples/react-reorder-grid)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
