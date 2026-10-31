---
source: https://motion.dev/examples/react-loading-jumping-dots
title: "Loading: Jumping dots example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Loading: Jumping dots

An example of creating a jumping dots loading animation with Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Mar 2025

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/loading-jumping-dots)

## Source code

```
"use client"

import { motion, Variants } from "motion/react"

function LoadingThreeDotsJumping() {
    const dotVariants: Variants = {
        jump: {
            transform: "translateY(-30px)",
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    }

    return (
        <motion.div
            animate="jump"
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
                gap: 10px;
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

export default LoadingThreeDotsJumping
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-loading-jumping-dots#tutorial)

Difficulty

### Introduction

The Jumping dots example shows how to create an animated loading indicator with three dots that bounce up and down in sequence. This playful animation pattern is perfect for loading states where you want to add some personality.

This example uses [`variants`](https://motion.dev/docs/react-animation#variants) to define the jump animation and `staggerChildren` to create the wave effect as each dot animates in sequence.

### Get started

Let's start with a basic component structure:

```
"use client"

function LoadingJumpingDots() {
    return (
        <div className="container">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
        </div>
    )
}
```

The dots are styled as small circles:

```
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--hue-1);
}
```

### Let's animate!

#### Import from Motion

Import `motion` and the `Variants` type:

```
import { motion, Variants } from "motion/react"
```

#### Define the jump animation

Create a variants object that defines the jump animation:

```
const dotVariants: Variants = {
    jump: {
        transform: "translateY(-30px)",
        transition: {
            duration: 0.8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
        },
    },
}
```

The `transform: "translateY(-30px)"` moves each dot 30 pixels upward. The `repeatType: "mirror"` makes the animation play in reverse after completing, creating a smooth up-and-down bounce.

#### Why use transform directly?

We're using `transform: "translateY(-30px)"` instead of the shorthand `y: -30`. Animating the `transform` property directly enables hardware-accelerated animations, which run on the GPU rather than the CPU. This is especially important during loading sequences, as loading is typically a time of heavy CPU load. By offloading the animation to the GPU, the dots remain smooth even when the main thread is busy. [Learn more about web animation performance](https://motion.dev/magazine/web-animation-performance-tier-list).

#### Apply the animation with stagger

Convert the elements to motion components and apply the staggered animation:

```
function LoadingJumpingDots() {
    return (
        <motion.div
            animate="jump"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="container"
        >
            <motion.div className="dot" variants={dotVariants} />
            <motion.div className="dot" variants={dotVariants} />
            <motion.div className="dot" variants={dotVariants} />
        </motion.div>
    )
}
```

The `staggerChildren: -0.2` creates a 0.2 second delay between each dot's animation start. The `staggerDirection: -1` reverses the order so the last dot starts first.

### Conclusion

We've built an engaging jumping dots animation using Motion's variant and stagger systems. The `repeatType: "mirror"` creates smooth bouncing, while `staggerChildren` orchestrates the wave effect across all three dots.

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in React

* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
* [![Particle orb animation example](https://images.motion.dev/examples/react/particle-orb.png)Particle orb](https://motion.dev/examples/react-particle-orb)
* [![Lenis smooth scroll animation example](https://images.motion.dev/examples/previews/react/lenis-smooth-scroll/v-f15ffe4cd090/poster.webp)[](https://images.motion.dev/examples/previews/react/lenis-smooth-scroll/v-f15ffe4cd090/preview.mp4)Lenis smooth scroll](https://motion.dev/examples/react-lenis-smooth-scroll)
* [![Gallery: Showcase animation example](https://images.motion.dev/examples/previews/react/gallery-showcase/v-007b4233230d/poster.webp)[](https://images.motion.dev/examples/previews/react/gallery-showcase/v-007b4233230d/preview.mp4)Gallery: Showcase](https://motion.dev/examples/react-gallery-showcase)
