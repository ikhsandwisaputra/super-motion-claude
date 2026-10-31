---
source: https://motion.dev/examples/react-use-animation-frame
title: "Spinning 3D cube example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Spinning 3D cube

An example of using Motion for React's useAnimationFrame hook to animate a 3D cube.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)14 Jan 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/use-animation-frame)

## Source code

```
"use client"

import { useAnimationFrame } from "motion/react"
import { useRef } from "react"

export default function UseAnimationFrame() {
    const ref = useRef<HTMLDivElement>(null)

    useAnimationFrame((t) => {
        if (!ref.current) return

        const rotate = Math.sin(t / 10000) * 200
        const y = (1 + Math.sin(t / 1000)) * -50
        ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`
    })

    return (
        <div className="container">
            <div className="cube" ref={ref}>
                <div className="side front" />
                <div className="side left" />
                <div className="side right" />
                <div className="side top" />
                <div className="side bottom" />
                <div className="side back" />
            </div>
            <StyleSheet />
        </div>
    )
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
    return (
        <style>{`

        .container {
            perspective: 800px;
            width: 200px;
            height: 200px;
        }

        .cube {
            width: 200px;
            height: 200px;
            position: relative;
            transform-style: preserve-3d;
        }

        .side {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: red;
            opacity: 0.6;
        }

        .front {
            transform: rotateY(0deg) translateZ(100px);
            background-color: var(--hue-1-transparent);
        }
        .right {
            transform: rotateY(90deg) translateZ(100px);
            background-color: var(--hue-2-transparent);
        }
        .back {
            transform: rotateY(180deg) translateZ(100px);
            background-color: var(--hue-3-transparent);
        }
        .left {
            transform: rotateY(-90deg) translateZ(100px);
            background-color: var(--hue-4-transparent);
        }
        .top {
            transform: rotateX(90deg) translateZ(100px);
            background-color: var(--hue-5-transparent);
        }
        .bottom {
            transform: rotateX(-90deg) translateZ(100px);
            background-color: var(--hue-6-transparent);
        }

    `}</style>
    )
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-use-animation-frame#tutorial)

Difficulty

### Introduction

The `useAnimationFrame` example shows how to create complex continuous animations using Motion's `useAnimationFrame` hook. This hook provides a way to run a function on every frame, perfect for creating dynamic, math-based animations that need to run continuously.

### Get started

Let's start with the basic structure of our 3D cube:

```
export default function UseAnimationFrame() {
    return (
        <div className="container">
            <div className="cube">
                <div className="side front" />
                <div className="side left" />
                <div className="side right" />
                <div className="side top" />
                <div className="side bottom" />
                <div className="side back" />
            </div>
        </div>
    )
}
```

### Let's animate!

#### Import from Motion

First, we'll import the necessary hooks:

```
import { useAnimationFrame } from "motion/react"
import { useRef } from "react"
```

#### Setting up direct DOM manipulation

For this animation, we're calculating our own `transform` values every animation frame. So we can directly assign the `transform` property to the DOM element.

For this, we need a reference to our cube element:

```
export default function UseAnimationFrame() {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div className="container">
            <div className="cube" ref={ref}>
                {/* ... cube sides ... */}
            </div>
        </div>
    )
}
```

#### Creating the continuous animation

Now, let's add the frame-by-frame animation using `useAnimationFrame`. This hook runs a function on every animation frame, providing a timestamp we can use to create smooth continuous motion:

```
useAnimationFrame((t) => {
    if (!ref.current) return

    const rotate = Math.sin(t / 10000) * 200
    const y = (1 + Math.sin(t / 1000)) * -50
    ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`
})
```

The timestamp, `t`, increases continuously, allowing us to create cyclical motion. We use [`Math.sin`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin) to create smooth oscillating values between -1 and 1.

For rotation: `t / 10000` creates a slow cycle, multiplied by 200 for a -200Â° to 200Â° range.

For vertical movement (`y`): `t / 1000` creates a faster cycle, transformed to move between 0 and -100px.

### Conclusion

In this tutorial, we learned how to:

* Use refs for direct DOM manipulation in React
* Create frame-by-frame animations with `useAnimationFrame`
* Generate smooth motion using mathematical functions
* Combine multiple transforms for rich 3D effects
* Optimize performance by bypassing React's state system

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
