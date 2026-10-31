---
source: https://motion.dev/examples/react-exit-animation
title: "Exit animation example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Exit animation

An example of animating an element when it's removed from the DOM using AnimatePresence in Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)19 Dec 2024

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/exit-animation)

## Source code

```
"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

export default function ExitAnimation() {
    const [isVisible, setIsVisible] = useState(true)

    return (
        <div style={container}>
            <AnimatePresence initial={false}>
                {isVisible ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        style={box}
                        key="box"
                    />
                ) : null}
            </AnimatePresence>
            <motion.button
                style={button}
                onClick={() => setIsVisible(!isVisible)}
                whileTap={{ y: 1 }}
            >
                {isVisible ? "Hide" : "Show"}
            </motion.button>
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: 100,
    height: 160,
    position: "relative",
}

const box: React.CSSProperties = {
    width: 100,
    height: 100,
    backgroundColor: "var(--hue-5)",
    borderRadius: "10px",
}

const button: React.CSSProperties = {
    backgroundColor: "var(--hue-5)",
    borderRadius: "10px",
    padding: "10px 20px",
    color: "var(--black)",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-exit-animation#tutorial)

Difficulty

### Introduction

The Exit animation example shows how to animate an element before it's removed from the DOM. It uses the [`AnimatePresence`](https://motion.dev/docs/react-animate-presence) component and [`exit`](https://motion.dev/docs/react-animation#exit) prop from Motion for React to create smooth transitions when elements are removed.

CSS animations can only handle when elements appear, and even then only with the modern [`@starting-style` rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style). They can't handle when elements leave.

Whereas JS animations need careful orchestration to handle when elements leave.

`AnimatePresence` is a React component that makes it easy to animate elements when they exit.

### Get started

Let's start by creating a component with a box that can be toggled on and off:

```
"use client"

import { useState } from "react"

export default function ExitAnimation() {
    const [isVisible, setIsVisible] = useState(true)

    return (
        <div style={container}>
            {isVisible ? <div style={box} /> : null}
            <button style={button} onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? "Hide" : "Show"}
            </button>
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: 100,
    height: 160,
    position: "relative",
}

const box: React.CSSProperties = {
    width: 100,
    height: 100,
    backgroundColor: "#FF5449",
    borderRadius: "10px",
}

const button: React.CSSProperties = {
    backgroundColor: "#FF5449",
    borderRadius: "10px",
    padding: "10px 20px",
    color: "#000000",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
}
```

This creates a simple component with a red box and a button that toggles the box's visibility. Currently, the box just instantly appears and disappears when toggled.

### Let's animate!

#### Import from Motion

To animate our box as it enters and exits, we need to import the necessary components from Motion for React:

```
import { AnimatePresence, motion } from "motion/react"
```

Let's replace our standard `div` with a `motion.div`:

```
{
    isVisible ? <motion.div style={box} /> : null
}
```

This alone won't give us exit animations. For that, we need to wrap our conditionally rendered element in `AnimatePresence`:

```
<AnimatePresence>
    {isVisible ? <motion.div style={box} /> : null}
</AnimatePresence>
```

#### Animations

Now we can add our animation properties. We'll need:

1. An `initial` state for when the element first appears.
2. An `animate` state for its normal visible state.
3. An `exit` state for how it should animate out before being removed from the DOM by `AnimatePresence`.

```
<AnimatePresence initial={false}>
    {isVisible ? (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={box}
            key="box"
        />
    ) : null}
</AnimatePresence>
```

With these props:

* The box starts invisible and scaled down to nothing
* It animates to fully visible and full size when it appears
* When toggled off, it animates back to invisible and scaled down before being removed from the DOM

A couple important details:

* We set `initial={false}` on `AnimatePresence` to prevent the initial animation when the component first loads
* We added a `key` to our motion component, which is required for `AnimatePresence` to track elements properly

[card.css/motion-app

card.cssCard.tsx

```
1.card {2  transition: scale 200ms linear(3    0, 0.009, 0.036, 0.084, 0.157, 0.255, 0.378,4    0.522, 0.679, 0.832, 0.954, 1.029, 1.052, 1.038,5    1.011, 0.99, 0.984, 0.991, 1.001, 1.005, 16  );7}89.card:hover {10  scale: 1.2;11}
```

### Visual editing for your agent.

Edit and preview Motion and CSS transitions live in your code. Tune ease curves, springs, and durations without leaving your editor.

Part of Motion AI Kit. One-time fee, lifetime access.](https://motion.dev/ai-kit)

#### Adding button animation

Let's also add a small animation to the button when it's pressed:

```
<motion.button
    style={button}
    onClick={() => setIsVisible(!isVisible)}
    whileTap={{ y: 1 }}
>
    {isVisible ? "Hide" : "Show"}
</motion.button>
```

The `whileTap` prop moves the button down slightly when pressed, creating a satisfying tactile feel.

### Conclusion

In this tutorial, we learned how to:

* Create exit animations using the `AnimatePresence` component
* Define enter and exit animations with the `initial`, `animate`, and `exit` props
* Create a toggle effect with state and conditional rendering
* Add tactile feedback to interactive elements with `whileTap`

Motion for React makes it easy to add these polished transitions to your UI, improving the user experience by maintaining visual continuity when elements are added or removed.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
