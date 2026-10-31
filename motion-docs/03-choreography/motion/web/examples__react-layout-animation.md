---
source: https://motion.dev/examples/react-layout-animation
title: "Layout animation example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Layout animation

An example of animating a layout change using Motion for React's simple layout prop.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)17 Dec 2024

:   React

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/layout-animation)

## Source code

```
"use client"

import * as motion from "motion/react-client"
import { useState } from "react"

export default function LayoutAnimation() {
    const [isOn, setIsOn] = useState(false)

    const toggleSwitch = () => setIsOn(!isOn)

    return (
        <button
            className="toggle-container"
            style={{
                ...container,
                justifyContent: "flex-" + (isOn ? "start" : "end"),
            }}
            onClick={toggleSwitch}
        >
            <motion.div
                className="toggle-handle"
                style={handle}
                layout
                transition={{
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.2,
                }}
            />
        </button>
    )
}

/**
 * ==============   Styles   ================
 */

const container = {
    width: 100,
    height: 50,
    backgroundColor: "var(--hue-3-transparent)",
    borderRadius: 50,
    cursor: "pointer",
    display: "flex",
    padding: 10,
}

const handle = {
    width: 50,
    height: 50,
    backgroundColor: "var(--hue-3)",
    borderRadius: "50%",
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-layout-animation#tutorial)

Difficulty

### Introduction

The Layout Animation example shows how to create a toggle switch with smooth animation between two different layouts. It uses the [`layout`](https://motion.dev/docs/react-layout-animations) prop from Motion for React to automatically animate changes in position.

The great thing about Motion's layout animations is you can always define your layouts as you would prefer to using CSS properties that aren't traditionally animatable, for instance switching `justify-content` between `"flex-start"` and `"flex-end"`.

Layout animations enjoy a number of benefits over the browser's in-built view transitions:

* Visually interruptible
* Don't block user input
* Backwards compatibility
* Performance

It's also more advanced than other similar techniques like "FLIP" in libraries like GSAP as it corrects scale-induced distortion on size, position, `borderRadius` and `boxShadow` down infinitely-deep HTML trees.

### Get started

Let's start with the basic structure of our toggle switch:

```
"use client"

import { motion } from "motion/react"
import { useState } from "react"

export default function LayoutAnimation() {
    const [isOn, setIsOn] = useState(false)

    const toggleSwitch = () => setIsOn(!isOn)

    return (
        <button
            className="toggle-container"
            style={{
                width: 100,
                height: 50,
                backgroundColor: "rgba(66, 153, 225, 0.2)",
                borderRadius: 50,
                cursor: "pointer",
                display: "flex",
                padding: 10,
                justifyContent: "flex-end",
            }}
            onClick={toggleSwitch}
        >
            <div
                className="toggle-handle"
                style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "rgb(66, 153, 225)",
                    borderRadius: "50%",
                }}
            />
        </button>
    )
}
```

This gives us a static toggle button with a handle positioned on the right side. When clicked, the `isOn` state will toggle, but without animation, the handle won't visually move yet.

### Let's animate!

We want to animate the `"handle"` element when its layout changes, and to do so we just have to add a `layout` prop:

```
<motion.div
    className="toggle-handle"
    layout
```

That's literally it. With just this simple change, Motion will automatically animate the handle between positions when the `justifyContent` value changes. The `layout` prop tells Motion to animate any layout changes, such as position or size.

To customize how the animation feels, we can add a `transition` prop:

```
<motion.div
    className="toggle-handle"
    style={handle}
    layout
    transition={{
        type: "spring",
        visualDuration: 0.2,
        bounce: 0.2,
    }}
/>
```

This transition configuration:

* Uses a `spring` animation type for natural motion
* Sets `visualDuration` to `0.2` seconds for a quick but visible animation
* Reduces the `bounce` to `0.2` for a more controlled spring effect with less oscillation

### Conclusion

In this tutorial, we've learned how to:

1. Create a toggle switch UI component
2. Use the `layout` prop to automatically animate position changes
3. Customize the animation with spring physics

The `layout` prop is a powerful feature that simplifies creating smooth transitions between UI states. Without it, we'd need to manually calculate and animate positions, which would be more complex and error-prone.

This technique can be applied to many other UI elements beyond toggle switchesâlike expanding cards, rearranging lists, or any component that changes position or size in response to user interaction.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
