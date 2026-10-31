---
source: https://motion.dev/examples/react-hold-to-confirm
title: "Hold to confirm example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Hold to confirm

A Motion for React example showing long-press interaction. The button's events update a progress motion value that drives multiple animations of other motion values.

![](https://images.motion.dev/magazine/gWduAyVJxJQuFnLveoXQHnbdTmE.png)[BKMN](https://bakemono.space)12 Mar 2025

:   React

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/hold-to-confirm)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-hold-to-confirm#tutorial)

Difficulty

### Introduction

The Hold to Confirm example shows how to create a button that visually responds to a long press, before confirming an action.

In this tutorial, we'll learn how to use:

* [`useMotionValue`](https://motion.dev/docs/react-motion-value) to track the progress of holding the button
* [`useTransform`](https://motion.dev/docs/react-use-transform) to link animated values to that progress
* [`animate`](https://motion.dev/docs/animate) to animate the progress value

### Get started

Let's start with the basic structure of our component:

```
"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react"

export default function HoldToConfirm() {
    return (
        <div style={styles.container}>
            <div style={styles.buttonWrapper}>
                <button style={styles.button}>
                    <div style={styles.buttonBackground} />
                    Hold to confirm
                </button>
            </div>
        </div>
    )
}

/** Copy styles from example source */
```

This gives us a simple button with some basic styling, but it doesn't have any interactive behavior yet.

### Related examples

* [![Confetti animation example](https://images.motion.dev/examples/previews/vue/confetti/v-18ff6ce2bce5/poster.webp)[](https://images.motion.dev/examples/previews/vue/confetti/v-18ff6ce2bce5/preview.mp4)Confetti](https://motion.dev/examples/vue-confetti)
* [![Copy Button animation example](https://images.motion.dev/examples/previews/vue/copy-button/v-da9d659365b8/poster.webp)[](https://images.motion.dev/examples/previews/vue/copy-button/v-da9d659365b8/preview.mp4)Copy Button](https://motion.dev/examples/vue-copy-button)
* [![Dots Morph Button animation example](https://images.motion.dev/examples/previews/vue/dots-morph-button/v-26eae183fb98/poster.webp)[](https://images.motion.dev/examples/previews/vue/dots-morph-button/v-26eae183fb98/preview.mp4)Dots Morph Button](https://motion.dev/examples/vue-dots-morph-button)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
