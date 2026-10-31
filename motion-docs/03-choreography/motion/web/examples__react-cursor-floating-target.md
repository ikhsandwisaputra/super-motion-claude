---
source: https://motion.dev/examples/react-cursor-floating-target
title: "Cursor: Floating target example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Cursor: Floating target

An example of creating a floating target with rotating text and hover effects using the Motion+ Cursor and usePointerPosition.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)21 Aug 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/cursor-floating-target)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-cursor-floating-target#tutorial)

Difficulty

### Introduction

The Floating Target example creates a rotating button that reacts to your cursor with a smooth spring animation. As well as creating a custom `usePointerReaction` hook, we'll use several Motion APIs:

* The [`usePointerPosition`](https://motion.dev/docs/cursor) hook from Motion+ for tracking cursor position.
* The [`useTransform`](https://motion.dev/docs/react-use-transform) and [`useSpring`](https://motion.dev/docs/react-use-spring) hooks for smooth cursor following.
* The [`useAnimate`](https://motion.dev/docs/react-use-animate) hook for continuous rotation.
* The [`Cursor`](https://motion.dev/docs/cursor) component from Motion+ for custom cursor effects.
* Motion [variants](https://motion.dev/docs/react-animation#variants) for hover and press animations.

### Get started

Let's start with the basic structure and styling:

```
"use client"

import { Cursor, usePointerPosition } from "motion-plus/react"
import {
    motion,
    transform,
    useAnimate,
    useSpring,
    useTransform,
} from "motion/react"
import { useEffect, useState } from "react"

export default function CursorFloatingTarget() {
    return (
        <>
            <div className="decorative-title">Amsterdam</div>

            <motion.button className="target">
                <motion.div className="target-circle">
                    <motion.div className="fill-circle" />
                </motion.div>
                <motion.div className="text">View project</motion.div>
            </motion.button>

            <Stylesheet />
        </>
    )
}

function Stylesheet() {
    /** Copy from example */
}
```

This gives us the basic structure with a decorative title, a circular target button, and all the necessary styling. The target has a border circle and a fill circle that will animate on hover, plus text that will rotate continuously.

### Related examples

* [![Bobble hover animation example](https://images.motion.dev/examples/previews/react/bobble-hover/v-aca70763c4a9/poster.webp)[](https://images.motion.dev/examples/previews/react/bobble-hover/v-aca70763c4a9/preview.mp4)Bobble hover](https://motion.dev/examples/react-bobble-hover)
* [![Cursor: Floating target animation example](https://images.motion.dev/examples/previews/vue/cursor-floating-target/v-f791718fcc6c/poster.webp)[](https://images.motion.dev/examples/previews/vue/cursor-floating-target/v-f791718fcc6c/preview.mp4)Cursor: Floating target](https://motion.dev/examples/vue-cursor-floating-target)
* [![Magnetic filings animation example](https://images.motion.dev/examples/previews/vue/magnetic-filings/v-d08df510d054/poster.webp)[](https://images.motion.dev/examples/previews/vue/magnetic-filings/v-d08df510d054/preview.mp4)Magnetic filings](https://motion.dev/examples/vue-magnetic-filings)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
