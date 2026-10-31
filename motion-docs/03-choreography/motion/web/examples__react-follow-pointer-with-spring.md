---
source: https://motion.dev/examples/react-follow-pointer-with-spring
title: "Follow pointer with spring example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Follow pointer with spring

An example of making an element follow the pointer with a spring using Motion for React's useSpring hook.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)14 Jan 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/follow-pointer-with-spring)

## Source code

```
"use client"

import { frame, motion, useSpring } from "motion/react"
import { RefObject, useEffect, useRef } from "react"

export default function Drag() {
    const ref = useRef<HTMLDivElement>(null)
    const { x, y } = useFollowPointer(ref)

    return <motion.div ref={ref} style={{ ...ball, x, y }} />
}

const spring = { damping: 3, stiffness: 50, restDelta: 0.001 }

export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
    const x = useSpring(0, spring)
    const y = useSpring(0, spring)

    useEffect(() => {
        if (!ref.current) return

        const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
            const element = ref.current!

            frame.read(() => {
                x.set(clientX - element.offsetLeft - element.offsetWidth / 2)
                y.set(clientY - element.offsetTop - element.offsetHeight / 2)
            })
        }

        window.addEventListener("pointermove", handlePointerMove)

        return () =>
            window.removeEventListener("pointermove", handlePointerMove)
    }, [])

    return { x, y }
}

/**
 * ==============   Styles   ================
 */

const ball = {
    width: 100,
    height: 100,
    backgroundColor: "var(--hue-1)",
    borderRadius: "50%",
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-follow-pointer-with-spring#tutorial)

Difficulty

### Introduction

The Follow Pointer with Spring example shows how to make an element smoothly follow your cursor with a spring-like motion. This creates a natural, physical feeling as the element trails behind your mouse movements.

This example uses two key Motion APIs:

* [`useSpring`](https://motion.dev/docs/react-use-spring) - To create spring physics-based animation
* [`frame`](https://motion.dev/docs/frame) - For efficient, batched DOM reads and writes

Spring animations are a great way to add natural motion to your UI because they mimic the behavior of real-world physics. Unlike linear or easing animations, springs respond to changes in velocity, making the motion feel more organic, especially when following user input like mouse movement.

### Get started

Let's start by creating a basic component with a ball that will follow our pointer:

```
"use client"

import { motion } from "motion/react"
import { useRef } from "react"

export default function Drag() {
    const ref = useRef<HTMLDivElement>(null)

    return <motion.div ref={ref} style={ball} />
}

const ball = {
    width: 100,
    height: 100,
    backgroundColor: "#5686F5",
    borderRadius: "50%",
}
```

This gives us a simple blue circle on the screen, but it doesn't follow our pointer yet.

### Let's animate!

#### Import from Motion

First, we need to import the additional Motion APIs we'll be using:

```
import { frame, motion, useSpring } from "motion/react"
```

#### Creating the spring motion values

Now we'll create a custom hook that will handle the pointer-following logic:

```
function useFollowPointer(ref) {
    const x = useSpring(0)
    const y = useSpring(0)

    // We'll add event handling here

    return { x, y }
}
```

The `useSpring` hook creates a special type of motion value that animates changes using spring physics. By default, whenever we set a new value, the motion value will animate to that target with a natural spring motion rather than jumping instantly.

#### Customizing the spring

Let's add some spring configuration to control how the following behavior feels:

```
const spring = { damping: 3, stiffness: 50, restDelta: 0.001 }

function useFollowPointer(ref) {
    const x = useSpring(0, spring)
    const y = useSpring(0, spring)

    // We'll add event handling here

    return { x, y }
}
```

The spring configuration controls:

* `damping`: How quickly the spring settles (lower values create more bounce)
* `stiffness`: The strength of the spring (higher values make it more responsive)
* `restDelta`: When to consider the animation complete (smaller values prevent "snapping" at the end of the animation, but make the animation continue for longer)

#### Adding pointer tracking

Now we need to track the mouse pointer and update our spring values accordingly:

```
useEffect(() => {
    if (!ref.current) return

    const handlePointerMove = ({ clientX, clientY }) => {
        const element = ref.current

        frame.read(() => {
            x.set(clientX - element.offsetLeft - element.offsetWidth / 2)
            y.set(clientY - element.offsetTop - element.offsetHeight / 2)
        })
    }

    window.addEventListener("pointermove", handlePointerMove)

    return () => window.removeEventListener("pointermove", handlePointerMove)
}, [])
```

This is fairly standard but pay attention to `frame.read`. We use this to place the callback on the "read" part of Motion's render loop. This ensures we only update the motion values once per frame, reducing unnecessary work.

#### Using the motion values

Finally, let's update our component to use our custom hook:

```
export default function Drag() {
    const ref = useRef<HTMLDivElement>(null)
    const { x, y } = useFollowPointer(ref)

    return <motion.div ref={ref} style={{ ...ball, x, y }} />
}
```

When we pass our motion values directly to the `style` prop, Motion automatically uses them to drive the transforms of the element. As the values update with spring physics, the element will move accordingly.

### Conclusion

In this tutorial, we learned how to create a UI element that follows the pointer with natural spring physics. We used:

* `useSpring` to create motion values that animate changes with spring physics
* `frame.read()` to efficiently batch DOM reads
* Motion's ability to accept motion values directly in the `style` prop

This technique can be used for various interactive UI elements like hover effects, custom cursors, or draggable elements with inertia. By adjusting the spring configuration, you can create different feels - from tight, responsive following to loose, bouncy motion.

[>Motion+ Â· AI Kit

### Make your AI agent a Motion expert.

Give it current Motion context, Performance Doctor, and production-ready CSS spring generation.

Part of Motion+. One-time fee, lifetime access.

âº](https://motion.dev/ai-kit)

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
