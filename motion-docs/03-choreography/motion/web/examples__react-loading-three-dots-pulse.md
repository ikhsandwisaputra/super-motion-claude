---
source: https://motion.dev/examples/react-loading-three-dots-pulse
title: "Loading: Pulse dots example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Loading: Pulse dots

An example of creating a pulsing dots loading animation with Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Mar 2025

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/loading-three-dots-pulse)

## Source code

```
"use client"

import { motion, Variants } from "motion/react"

function LoadingThreeDotsPulse() {
    const dotVariants: Variants = {
        pulse: {
            scale: [1, 1.5, 1],
            transition: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    }

    return (
        <motion.div
            animate="pulse"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="container"
        >
            <motion.div className="dot" variants={dotVariants} />
            <motion.div className="dot" variants={dotVariants} />
            <motion.div className="dot" variants={dotVariants} />
            <StyleSheet />
        </motion.div>
    )
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
    return (
        <style>
            {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 20px;
            }

            .dot {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: var(--hue-1);
                will-change: transform;
            }
            `}
        </style>
    )
}

export default LoadingThreeDotsPulse
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-loading-three-dots-pulse#tutorial)

Difficulty

### Introduction

The Pulse dots example shows how to create a classic three-dot loading animation where each dot pulses in sequence. This common loading indicator pattern is found in messaging apps and loading states.

This example uses the [`animate` prop](https://motion.dev/docs/react-animation#basic-animations) to trigger animations and [`variants`](https://motion.dev/docs/react-animation#variants) to define reusable animation configurations. The key feature is child animation sequencing using `staggerChildren` to automatically delay each child's animation.

### Get started

Let's start with the basic markup and styles:

```
"use client"

function LoadingThreeDotsPulse() {
    return (
        <div className="container">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <StyleSheet />
        </div>
    )
}

function StyleSheet() {
    return (
        <style>
            {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 20px;
            }

            .dot {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: var(--hue-1);
                will-change: transform;
            }
            `}
        </style>
    )
}

export default LoadingThreeDotsPulse
```

### Let's animate!

#### Import from Motion

First, import the components we need:

```
import { motion, Variants } from "motion/react"
```

#### Add the pulse animation

Define the pulse animation using variants:

```
const dotVariants: Variants = {
    pulse: {
        scale: [1, 1.5, 1],
        transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
}
```

The `scale` array `[1, 1.5, 1]` creates a keyframe animation where the dot starts at normal size, grows to 1.5x, then returns to normal.

#### Apply Motion to the elements

Convert the elements to motion components and apply the stagger effect:

```
<motion.div
    animate="pulse"
    transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
    className="container"
>
    <motion.div className="dot" variants={dotVariants} />
    <motion.div className="dot" variants={dotVariants} />
    <motion.div className="dot" variants={dotVariants} />
    <StyleSheet />
</motion.div>
```

The parent's `staggerChildren: -0.2` delays each child's animation by 0.2 seconds. The `staggerDirection: -1` reverses the order, creating a wave effect from right to left.

### Conclusion

We've built a smooth pulsing dots animation using Motion's variant and stagger systems. By defining the animation once in variants and using `staggerChildren` on the parent, we created an elegant sequential effect with minimal code.

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in React

* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
* [![Particle orb animation example](https://images.motion.dev/examples/react/particle-orb.png)Particle orb](https://motion.dev/examples/react-particle-orb)
* [![Lenis smooth scroll animation example](https://images.motion.dev/examples/previews/react/lenis-smooth-scroll/v-f15ffe4cd090/poster.webp)[](https://images.motion.dev/examples/previews/react/lenis-smooth-scroll/v-f15ffe4cd090/preview.mp4)Lenis smooth scroll](https://motion.dev/examples/react-lenis-smooth-scroll)
* [![Gallery: Showcase animation example](https://images.motion.dev/examples/previews/react/gallery-showcase/v-007b4233230d/poster.webp)[](https://images.motion.dev/examples/previews/react/gallery-showcase/v-007b4233230d/preview.mp4)Gallery: Showcase](https://motion.dev/examples/react-gallery-showcase)
