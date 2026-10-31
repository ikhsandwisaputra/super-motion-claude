---
source: https://motion.dev/examples/react-html-content
title: "HTML content example & tutorial for React | Motion"
fetched: 2026-10-28
---

# HTML content

An example using Motion for React to animate HTML content by rendering a MotionValue.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)14 Jan 2025

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/html-content)

## Source code

```
"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"

export default function HTMLContent() {
    const count = useMotionValue(0)
    const rounded = useTransform(() => Math.round(count.get()))

    useEffect(() => {
        const controls = animate(count, 100, { duration: 5 })
        return () => controls.stop()
    }, [])

    return (
        <motion.div
            style={{
                fontFamily: "var(--font-mono)",
                fontSize: 64,
                lineHeight: 1,
                color: "var(--hue-6)",
            }}
        >
            {rounded}
        </motion.div>
    )
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-html-content#tutorial)

Difficulty

### Introduction

The HTML Content example shows how to animate numerical content in React without animating React state. This is much better for performance.

The magic is in the [`motion` component's](https://motion.dev/docs/react-motion-component) ability to render [motion values](https://motion.dev/docs/react-motion-value). This bypasses React's diffing algorithm, and assigns the value of the motion value to the DOM node directly.

### Get started

Let's start with a basic component structure:

```
export default function HTMLContent() {
    return <pre style={{ fontSize: 64, color: "#61afef" }}>0</pre>
}
```

### Let's animate!

#### Import from Motion

First, we'll import the necessary hooks and functions from Motion:

```
import { animate, motion, useMotionValue, useTransform } from "motion/react"
```

#### Creating the animation

1. Create a motion value to track our counter:

```
const count = useMotionValue(0)
```

2. Use `useTransform` to round the number as it animates:

```
const rounded = useTransform(() => Math.round(count.get()))
```

3. Start the animation when the component mounts using Motion's `animate` function:

```
useEffect(() => {
    const controls = animate(count, 100, { duration: 5 })
    return () => controls.stop()
}, [])
```

4. Display the animated value using a `motion.pre` component:

```
return <motion.pre style={text}>{rounded}</motion.pre>
```

### Conclusion

In this tutorial, we learned how to:

* Create an animated counter using `useMotionValue`
* Transform motion values into new values with `useTransform`
* Start and clean up animations with `useEffect`
* Display animated numerical content in a React component

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
