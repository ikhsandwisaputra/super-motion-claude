---
source: https://motion.dev/examples/react-path-morphing
title: "Path morphing example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Path morphing

An example of creating smooth SVG path morphing animations with Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)17 Dec 2024

:   React

:   [MotionScoreC](https://score.motion.dev/methodology "This example has a MotionScore of C, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/path-morphing)

## Source code

```
"use client"

import { interpolate } from "flubber"
import {
    animate,
    motion,
    MotionValue,
    useMotionValue,
    useTransform,
} from "motion/react"
import { useEffect, useState } from "react"

export default function PathMorphing() {
    const [pathIndex, setPathIndex] = useState(0)
    const progress = useMotionValue(pathIndex)
    const fill = useTransform(progress, paths.map(getIndex), colors)
    const path = useFlubber(progress, paths)

    useEffect(() => {
        const animation = animate(progress, pathIndex, {
            duration: 0.8,
            ease: "easeInOut",
            onComplete: () => {
                if (pathIndex === paths.length - 1) {
                    progress.set(0)
                    setPathIndex(1)
                } else {
                    setPathIndex(pathIndex + 1)
                }
            },
        })

        return () => animation.stop()
    }, [pathIndex, progress])

    return (
        <svg width="400" height="400">
            <g transform="translate(10 10) scale(17 17)">
                <motion.path fill={fill} d={path} />
            </g>
        </svg>
    )
}

/**
 * ==============   Utils   ================
 */

const getIndex = (_: string, index: number) => index

function useFlubber(progress: MotionValue<number>, paths: string[]) {
    return useTransform(progress, paths.map(getIndex), paths, {
        mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 }),
    })
}

/**
 * ==============   Shape data   ================
 */

// Paths taken from https://github.com/veltman/flubber/blob/master/demos/basic-svg.html
const star =
    "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
const heart =
    "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
const hand =
    "M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"
const plane =
    "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
const lightning = "M7 2v11h3v9l7-12h-4l4-8z"
const note =
    "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"

const paths = [lightning, hand, plane, heart, note, star, lightning]
const colors = [
    "#fff312",
    "#ff0088",
    "#dd00ee",
    "#9911ff",
    "#0d63f8",
    "#0cdcf7",
    "#4ff0b7",
]
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-path-morphing#tutorial)

Difficulty

### Introduction

In this tutorial, we'll explore how to create smooth animations between SVG paths. The Path Morphing example shows how to transform SVG shapes into one another using Motion for React and [Flubber](https://github.com/veltman/flubber).

We'll learn to:

* Using [`useMotionValue`](https://motion.dev/docs/react-motion-value) to track animation progress
* Using [`useTransform`](https://motion.dev/docs/react-use-transform) to derive values from the animation progress
* Integrating with Flubber for smooth SVG path interpolation
* Creating continuous animations that cycle through multiple paths

### Get started

First, let's set up our basic structure. We'll create an SVG container that will hold our morphing shape:

```
import { useEffect, useState } from "react"

export default function PathMorphing() {
    const [pathIndex, setPathIndex] = useState(0)

    return (
        <svg width="400" height="400">
            <g transform="translate(10 10) scale(17 17)">
                <path />
            </g>
        </svg>
    )
}

/** Copy path data, paths array and colors array from example source */
```

We've created a basic SVG with a `path` element and defined several SVG path strings representing different shapes. We've also set up an array of paths that we'll cycle through and corresponding colors for each shape.

### Let's animate!

#### Import from Motion

Now let's import the necessary functions from Motion and Flubber:

```
import { interpolate } from "flubber"
import { animate, motion, useMotionValue, useTransform } from "motion/react"
```

#### Setting up Motion Values

First, we'll create a Motion Value to track our animation progress:

```
const progress = useMotionValue(pathIndex)
```

The `useMotionValue` hook creates a value that we can animate. We initialize it with the current `pathIndex`.

#### Creating derived values

Now, let's use the `useTransform` hook to derive both our fill color and path data from the progress value:

```
const fill = useTransform(
    progress,
    paths.map((_, index) => index),
    colors
)
```

This transforms our progress value into a color based on where we are in the animation. As the progress value changes from 0 to 1, 1 to 2, etc., the fill color will smoothly transition between the corresponding colors in our array.

#### Path interpolation with Flubber

For the path morphing itself, we'll create a custom hook to handle the interpolation between SVG paths:

```
function useFlubber(progress, paths) {
    return useTransform(progress, paths.map(getIndex), paths, {
        mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 }),
    })
}

const path = useFlubber(progress, paths)
```

This custom hook uses `useTransform` with a special mixer function that leverages Flubber's `interpolate` function. The mixer takes two adjacent path strings and returns a function that can generate intermediate path strings based on a progress value.

#### Animating between paths

Finally, we'll set up an effect to animate between the paths:

```
useEffect(() => {
    const animation = animate(progress, pathIndex, {
        duration: 0.8,
        ease: "easeInOut",
        onComplete: () => {
            if (pathIndex === paths.length - 1) {
                progress.set(0)
                setPathIndex(1)
            } else {
                setPathIndex(pathIndex + 1)
            }
        },
    })

    return () => animation.stop()
}, [pathIndex, progress])
```

This effect:

1. Animates our progress value from its current value to the target `pathIndex`
2. When the animation completes, it updates the `pathIndex` to move to the next shape
3. If we reach the end of our paths array, it resets to the beginning
4. Returns a cleanup function that stops the animation if the component unmounts

#### Connecting to the SVG

Now we need to apply our animated values to the SVG path:

```
return (
    <svg width="400" height="400">
        <g transform="translate(10 10) scale(17 17)">
            <motion.path fill={fill} d={path} />
        </g>
    </svg>
)
```

We replace the static `path` element with a `motion.path` and bind our animated values:

* The `fill` attribute uses our derived color value
* The `d` attribute uses our interpolated path data

### Conclusion

In this tutorial, we've learned how to create smooth transitions between SVG paths using Motion for React and Flubber. The key techniques we've explored are:

1. Using `useMotionValue` to create an animation driver
2. Using `useTransform` to derive values from our progress
3. Using Flubber as a custom mixer to interpolate between SVG paths
4. Creating animations that cycle through multiple paths

This technique opens up possibilities for creating engaging UI animations, interactive icons, and creative visual effects in your React applications.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
