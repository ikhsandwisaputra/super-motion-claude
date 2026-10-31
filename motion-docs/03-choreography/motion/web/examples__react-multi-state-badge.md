---
source: https://motion.dev/examples/react-multi-state-badge
title: "Multi state badge example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Multi state badge

A badge that can be in multiple states, such as processing, success, or error.

![](https://images.motion.dev/magazine/gWduAyVJxJQuFnLveoXQHnbdTmE.png)[BKMN](https://bakemono.space)10 Mar 2025

:   React

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/multi-state-badge)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-multi-state-badge#tutorial)

Difficulty

### Introduction

The Multi-state Badge example shows how to create a component that smoothly animates between different states. This pattern is commonly used in UIs to provide visual feedback during form submissions, network requests, or any process with multiple stages.

In this tutorial, we'll learn to use:

* [`motion`](https://motion.dev/docs/react-motion-component) components for creating animatable elements
* [`AnimatePresence`](https://motion.dev/docs/react-animate-presence) for coordinating the entrance and exit of components
* The [`animate`](https://motion.dev/docs/react-animation#basic-animations) function for triggering imperative animations
* [`useTime`](https://motion.dev/docs/react-use-time) and [`useTransform`](https://motion.dev/docs/react-use-transform) motion value hooks for creating continuous animations

Using Motion for these animations offers significant advantages over standard CSS transitions. Motion handles the complex orchestration of multiple elements entering and exiting simultaneously, manages element measurement for dynamic content, and provides a declarative API for SVG path animations that would otherwise require complex JavaScript.

### Get started

First, let's create the basic structure of our multi-state badge:

```
"use client"

import { useState } from "react"

export default function MultiStateBadge() {
    const [badgeState, setBadgeState] = useState("idle")

    return (
        <div style={styles.container}>
            <button
                onClick={() => {
                    setBadgeState(getNextState(badgeState))
                }}
            >
                <div style={styles.badge}>Badge</div>
            </button>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        height: 80,
    },
    badge: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        display: "flex",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 20px",
        borderRadius: 999,
    },
}

const STATES = {
    idle: "Start",
    processing: "Processing",
    success: "Done",
    error: "Something went wrong",
} as const

const getNextState = (state) => {
    const states = Object.keys(STATES)
    const nextIndex = (states.indexOf(state) + 1) % states.length
    return states[nextIndex]
}
```

This gives us a simple button with a badge that cycles through different states when clicked. When we press the button, the `getNextState` function determines which state comes next in our cycle and updates the state accordingly.

### Related examples

* [![Confetti animation example](https://images.motion.dev/examples/previews/vue/confetti/v-18ff6ce2bce5/poster.webp)[](https://images.motion.dev/examples/previews/vue/confetti/v-18ff6ce2bce5/preview.mp4)Confetti](https://motion.dev/examples/vue-confetti)
* [![Copy Button animation example](https://images.motion.dev/examples/previews/vue/copy-button/v-da9d659365b8/poster.webp)[](https://images.motion.dev/examples/previews/vue/copy-button/v-da9d659365b8/preview.mp4)Copy Button](https://motion.dev/examples/vue-copy-button)
* [![Dots Morph Button animation example](https://images.motion.dev/examples/previews/vue/dots-morph-button/v-26eae183fb98/poster.webp)[](https://images.motion.dev/examples/previews/vue/dots-morph-button/v-26eae183fb98/preview.mp4)Dots Morph Button](https://motion.dev/examples/vue-dots-morph-button)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
