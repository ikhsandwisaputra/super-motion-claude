---
source: https://motion.dev/examples/react-loading-circle-spinner
title: "Loading: Circle spinner example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Loading: Circle spinner

An example of creating a circle spinner loading animation with Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Mar 2025

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/loading-circle-spinner)

## Source code

```
"use client"

import { motion } from "motion/react"

function LoadingCircleSpinner() {
    return (
        <div className="container">
            <motion.div
                className="spinner"
                animate={{ transform: "rotate(360deg)" }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <StyleSheet />
        </div>
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
                padding: 40px;
                border-radius: 8px;
            }

            .spinner {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 4px solid var(--divider);
                border-top-color: var(--hue-1);
                will-change: transform;
            }
            `}
        </style>
    )
}

export default LoadingCircleSpinner
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-loading-circle-spinner#tutorial)

Difficulty

### Introduction

The Circle Spinner example shows how to create a classic loading spinner using Motion for React. This simple yet effective animation continuously rotates a styled circle, providing users with visual feedback that content is loading.

Infinite rotation is achieved with a single `animate` prop:

```
animate={{ transform: "rotate(360deg)" }}
```

### Get started

Let's start with a basic spinner element using CSS styling:

```
export default function LoadingCircleSpinner() {
    return (
        <div className="container">
            <div className="spinner" />
        </div>
    )
}
```

The spinner is styled as a circle with a partially colored border, creating the classic loading indicator appearance:

```
.spinner {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 4px solid var(--divider);
    border-top-color: var(--hue-1);
}
```

### Let's animate!

#### Import from Motion

First, import `motion` from Motion for React:

```
import { motion } from "motion/react"
```

#### Convert to motion component

Replace the static `div` with a `motion.div`:

```
<motion.div className="spinner" />
```

#### Add the rotation animation

Now add the `animate` prop to create the spinning effect:

```
<motion.div
    className="spinner"
    animate={{ transform: "rotate(360deg)" }}
    transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
    }}
/>
```

The `transition` configuration:

* `duration: 1.5` - Each full rotation takes 1.5 seconds
* `repeat: Infinity` - The animation loops forever
* `ease: "linear"` - Maintains constant speed throughout the rotation

Using `linear` easing is essential for spinners, as it prevents the animation from speeding up or slowing down, creating a smooth, consistent rotation.

#### Hardware acceleration

Motion runs `transform` animations, and shorthands like `rotate: 360`, with hardware acceleration. These run on the GPU rather than the CPU. This is especially important during loading sequences, as loading is typically a time of heavy CPU load. By offloading the animation to the GPU, the spinner remains smooth even when the main thread is busy. [Learn more about web animation performance](https://motion.dev/magazine/web-animation-performance-tier-list).

### Conclusion

In this tutorial, we learned how to:

* Create an infinitely rotating animation using the `animate` prop
* Use `repeat: Infinity` to loop an animation forever
* Apply `linear` easing for consistent rotation speed
* Animate `transform` or `rotate` for hardware-accelerated animations

This simple spinner pattern can be customized with different sizes, colors, and rotation speeds to match your application's design.

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in React

* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
* [![Particle orb animation example](https://images.motion.dev/examples/react/particle-orb.png)Particle orb](https://motion.dev/examples/react-particle-orb)
* [![Lenis smooth scroll animation example](https://images.motion.dev/examples/previews/react/lenis-smooth-scroll/v-f15ffe4cd090/poster.webp)[](https://images.motion.dev/examples/previews/react/lenis-smooth-scroll/v-f15ffe4cd090/preview.mp4)Lenis smooth scroll](https://motion.dev/examples/react-lenis-smooth-scroll)
* [![Gallery: Showcase animation example](https://images.motion.dev/examples/previews/react/gallery-showcase/v-007b4233230d/poster.webp)[](https://images.motion.dev/examples/previews/react/gallery-showcase/v-007b4233230d/preview.mp4)Gallery: Showcase](https://motion.dev/examples/react-gallery-showcase)
