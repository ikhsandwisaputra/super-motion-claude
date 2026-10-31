---
source: https://motion.dev/examples/react-tilt-card
title: "Tilt card example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Tilt card

A card that tilts based on pointer position using Motion for React's useSpring hook.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)27 Feb 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/tilt-card)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-tilt-card#tutorial)

Difficulty

### Introduction

The Tilt Card example shows how to create card tilts towards the user's cursor with a 3D effect.

With Motion, you can create these kinds of gesture-based UIs by combining a couple powerful APIs. In this tutorial, we'll learn to use:

* The [`motion`](https://motion.dev/docs/react-motion-component) component to make elements animatable.
* The [`useSpring`](https://motion.dev/docs/react-use-spring) hook to create smooth, physics-based animations using Motion's motion values.

### Get started

First, let's set up the basic component markup to display an image and caption.

```
import { useRef } from "react"

export default function TiltCard({ maxTilt = 15, src, alt, caption }) {
    return (
        <div style={styles.card}>
            <img src={src} alt={alt} style={styles.image} />
            <div style={styles.gradientOverlay} />
            <div style={styles.caption}>{caption}</div>
        </div>
    )
}

// Copy styles from example source code
```

### Related examples

* [![Add to basket animation example](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/poster.webp)[](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/preview.mp4)Add to basket](https://motion.dev/examples/js-add-to-basket)
* [![Add to basket animation example](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/poster.webp)[](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/preview.mp4)Add to basket](https://motion.dev/examples/react-add-to-basket)
* [![Pointer collision detection animation example](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/poster.webp)[](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/preview.mp4)Pointer collision detection](https://motion.dev/examples/react-collision-hover-grid)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
