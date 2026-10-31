---
source: https://motion.dev/examples/react-path-drawing
title: "Path drawing example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Path drawing

An example of animating a SVG path to make a path drawing effect, using Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)17 Dec 2024

:   React

:   [MotionScoreC](https://score.motion.dev/methodology "This example has a MotionScore of C, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/path-drawing)

## Source code

```
"use client"

import { motion, Variants } from "motion/react"

const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
        const delay = i * 0.5
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 },
            },
        }
    },
}

export default function PathDrawing() {
    return (
        <motion.svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            initial="hidden"
            animate="visible"
            style={image}
        >
            <motion.circle
                className="circle-path"
                cx="100"
                cy="100"
                r="80"
                stroke="var(--hue-1)"
                variants={draw}
                custom={1}
                style={shape}
            />
            <motion.line
                x1="220"
                y1="30"
                x2="360"
                y2="170"
                stroke="var(--hue-6)"
                variants={draw}
                custom={2}
                style={shape}
            />
            <motion.line
                x1="220"
                y1="170"
                x2="360"
                y2="30"
                stroke="var(--hue-6)"
                variants={draw}
                custom={2.5}
                style={shape}
            />
            <motion.rect
                width="140"
                height="140"
                x="410"
                y="30"
                rx="20"
                stroke="var(--hue-4)"
                variants={draw}
                custom={3}
                style={shape}
            />
            <motion.circle
                cx="100"
                cy="300"
                r="80"
                stroke="var(--hue-4)"
                variants={draw}
                custom={2}
                style={shape}
            />
            <motion.line
                x1="220"
                y1="230"
                x2="360"
                y2="370"
                stroke="var(--hue-1)"
                custom={3}
                variants={draw}
                style={shape}
            />
            <motion.line
                x1="220"
                y1="370"
                x2="360"
                y2="230"
                stroke="var(--hue-1)"
                custom={3.5}
                variants={draw}
                style={shape}
            />
            <motion.rect
                width="140"
                height="140"
                x="410"
                y="230"
                rx="20"
                stroke="var(--hue-6)"
                custom={4}
                variants={draw}
                style={shape}
            />
            <motion.circle
                cx="100"
                cy="500"
                r="80"
                stroke="var(--hue-6)"
                variants={draw}
                custom={3}
                style={shape}
            />
            <motion.line
                x1="220"
                y1="430"
                x2="360"
                y2="570"
                stroke="var(--hue-4)"
                variants={draw}
                custom={4}
                style={shape}
            />
            <motion.line
                x1="220"
                y1="570"
                x2="360"
                y2="430"
                stroke="var(--hue-4)"
                variants={draw}
                custom={4.5}
                style={shape}
            />
            <motion.rect
                width="140"
                height="140"
                x="410"
                y="430"
                rx="20"
                stroke="var(--hue-1)"
                variants={draw}
                custom={5}
                style={shape}
            />
        </motion.svg>
    )
}

/**
 * ==============   Styles   ================
 */

const image: React.CSSProperties = {
    maxWidth: "80vw",
}

const shape: React.CSSProperties = {
    strokeWidth: 10,
    strokeLinecap: "round",
    fill: "transparent",
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-path-drawing#tutorial)

Difficulty

### Introduction

The Path Drawing example shows how to create a drawing animation effect using SVGs and Motion for React.

In this tutorial, we'll use the [`variants`](https://motion.dev/docs/react-animation#variants) and [`motion`](https://motion.dev/docs/react-motion-component) component from Motion for React to create a staggered animation effect across multiple SVG elements.

### Get started

Let's start by setting up our SVG container and shapes without animation:

```
import React from "react"

export default function PathDrawing() {
    return (
        <svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            style={{ maxWidth: "80vw" }}
        >
            <circle
                cx="100"
                cy="100"
                r="80"
                stroke="#FF0055"
                style={{
                    strokeWidth: 10,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />
            <line
                x1="220"
                y1="30"
                x2="360"
                y2="170"
                stroke="#7700FF"
                style={{
                    strokeWidth: 10,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />
            {/* More shapes would go here */}
        </svg>
    )
}
```

This creates a basic SVG with circle, cross and square shapes.

### Let's animate!

Now let's bring our SVG to life by adding animations.

#### Import from Motion

First, import the `motion` component from Motion for React:

```
import { motion } from "motion/react"
```

#### Creating the animation variants

Next, we'll define how our paths should animate. We'll create variants that control the `pathLength` property, which determines how much of the path is drawn (`0` = none, `1` = all):

```
const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
        const delay = i * 0.5
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 },
            },
        }
    },
}
```

Let's break down what's happening:

* The `hidden` state sets `pathLength: 0` (nothing drawn) and `opacity: 0` (invisible).
* The `visible` state is a function that accepts a custom index parameter (`i`). We'll pass this in to each `motion.path` via its `custom` prop.
* The delay is calculated based on this index, creating a staggered effect.

#### Applying the animation

Now, let's convert our SVG elements to `motion` components and apply our animation:

```
export default function PathDrawing() {
    return (
        <motion.svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            initial="hidden"
            animate="visible"
            style={{ maxWidth: "80vw" }}
        >
            <motion.circle
                cx="100"
                cy="100"
                r="80"
                stroke="#FF0055"
                variants={draw}
                custom={1}
                style={{
                    strokeWidth: 10,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />
            <motion.line
                x1="220"
                y1="30"
                x2="360"
                y2="170"
                stroke="#7700FF"
                variants={draw}
                custom={2}
                style={{
                    strokeWidth: 10,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />
            {/* More shapes would go here */}
        </motion.svg>
    )
}
```

You can see each `path` gets its own `index`, which we use to calculate a staggered delay. The container switches the variant for all its children from `"hidden"` to `"visible"`.

### Conclusion

In this tutorial, we learned how to:

1. Animate SVG paths using the `pathLength` property
2. Create staggered animations using `variants` and the `custom` prop
3. Coordinate multiple animations to create a complex drawing effect

The `pathLength` property is especially powerful for SVG animations, as it gives the appearance of drawing each shape stroke by stroke. Combined with Motion's animation capabilities, it creates visually appealing drawing effects that would be difficult to achieve with CSS alone.

This technique works with any SVG element that has a stroke, including circles, lines, rectangles, and complex paths. Try experimenting with different timing values, transition types, and SVG shapes to create your own unique drawing animations!

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
