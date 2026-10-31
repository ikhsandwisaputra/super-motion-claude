---
source: https://motion.dev/examples/react-material-design-ripple
title: "Material Design: Ripple example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Material Design: Ripple

An example of creating a press ripple with Motion for React, inspired by Google Material Design.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)16 Aug 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/material-design-ripple)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-material-design-ripple#tutorial)

Difficulty

The Material Design Ripple example recreates the touch ripple effect found in Google's Material Design components. The ripple creates visual feedback when users interact with a button, expanding outward from the point of touch.

In this tutorial, we'll use three Motion for React APIs: the [`motion`](https://motion.dev/docs/react-motion-component) component for gesture handling, [`AnimatePresence`](https://motion.dev/docs/react-animate-presence) for exit animations, and the [`whileHover`](https://motion.dev/docs/react-gestures#hover) prop for hover states.

### Get started

Let's start with a simple button component and the basic structure we need for the ripple effect:

```
"use client"

import { useState, useRef, useCallback } from "react"

export default function MaterialDesignRipple() {
    return (
        <>
            <button className="md-button">
                Click me
                <span className="ripple-container" aria-hidden>
                    {/* Ripples will be rendered here */}
                </span>
            </button>

            <Stylesheet />
        </>
    )
}

function Stylesheet() {
    return <style>{`/** Copy from example source */`}</style>
}
```

The key to our ripple setup is the `.ripple-container` element inside the button. This acts as a clipping mask - any ripples we create will be contained within the button's rounded corners.

We'll need to track multiple ripples in state since users can create overlapping ripples with rapid interactions:

```
const [ripples, setRipples] = useState([])
const buttonRef = useRef(null)
const idRef = useRef(0)
```

Each ripple needs a unique ID for React's key prop, so we'll use a ref to track our ID counter.

### Related examples

* [![Confetti animation example](https://images.motion.dev/examples/previews/vue/confetti/v-18ff6ce2bce5/poster.webp)[](https://images.motion.dev/examples/previews/vue/confetti/v-18ff6ce2bce5/preview.mp4)Confetti](https://motion.dev/examples/vue-confetti)
* [![Copy Button animation example](https://images.motion.dev/examples/previews/vue/copy-button/v-da9d659365b8/poster.webp)[](https://images.motion.dev/examples/previews/vue/copy-button/v-da9d659365b8/preview.mp4)Copy Button](https://motion.dev/examples/vue-copy-button)
* [![Dots Morph Button animation example](https://images.motion.dev/examples/previews/vue/dots-morph-button/v-26eae183fb98/poster.webp)[](https://images.motion.dev/examples/previews/vue/dots-morph-button/v-26eae183fb98/preview.mp4)Dots Morph Button](https://motion.dev/examples/vue-dots-morph-button)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
