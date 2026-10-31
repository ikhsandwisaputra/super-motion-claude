---
source: https://motion.dev/examples/react-gestures
title: "Gestures example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Gestures

An example of using gestures to animate an element using Motion for React's simple whileTap and whileHover props.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)17 Dec 2024

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/gestures)

## Source code

```
import * as motion from "motion/react-client"

export default function Gestures() {
    return (
        <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            style={box}
        />
    )
}

/**
 * ==============   Styles   ================
 */

const box = {
    width: 100,
    height: 100,
    backgroundColor: "var(--hue-3)",
    borderRadius: 5,
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-gestures#tutorial)

Difficulty

### Introduction

The Gestures example shows how to animate an element in response to user interactions like hovering and tapping. It uses the [`whileHover`](https://motion.dev/docs/react-gestures#hover) and [`whileTap`](https://motion.dev/docs/react-gestures#tap) props from Motion for React to create intuitive interactive animations.

Motion's `whileHover` and `whileTap` functions provide a couple of key advantages over traditional event listeners, beyond the power of Motion's spring animations and independent transform animations:

##### Pointer filtering

Normal pointer events fire for all pointers, whereas `whileHover` will filter out touch events and `whileTap` will filter out secondary pointers (right-click, secondary touch, etc.).

##### Keyboard accessibility

When `whileTap` is attached to an element, it will automatically become keyboard accessible. This means it can receive focus, and be pressed via the enter key. This ensures that keyboard users get the same great experience as pointer users.

### Get started

Let's start by creating a simple colored box without any animations:

```
export default function Gestures() {
    return <div style={box} />
}

/**
 * ==============   Styles   ================
 */

const box = {
    width: 100,
    height: 100,
    backgroundColor: "#46CF76",
    borderRadius: 5,
}
```

This creates a green square on the page, but it doesn't respond to any user interactions yet.

### Let's animate!

#### Import from Motion

To add gesture animations to our box, we first need to import the `motion` component from Motion for React:

```
import * as motion from "motion/react-client"
```

#### Basic functionality

Now we can replace the standard `div` with a `motion.div`:

```
export default function Gestures() {
    return <motion.div style={box} />
}
```

To create gesture animations, we use the `whileHover` and `whileTap` props. These define values to animate to while the gestures are active.

```
export default function Gestures() {
    return (
        <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            style={box}
        />
    )
}
```

With these props:

* `whileHover`: When the user hovers over the box, it will scale up to 1.2 times its original size
* `whileTap`: When the user clicks or taps the box, it will scale down to 0.8 times its original size

These animations happen automatically when the respective gestures are detected, and they smoothly reverse when the gesture ends.

#### Customizing gesture animations

You can customize gesture animations further by adding more properties or providing a `transition` prop:

```
export default function Gestures() {
    return (
        <motion.div
            whileHover={{
                scale: 1.2,
                rotate: 5,
                backgroundColor: "#2BB95D",
                transition: { duration: 0.2 },
            }}
            whileTap={{
                scale: 0.8,
                rotate: -5,
                backgroundColor: "#1A7A3E",
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
            }}
            style={box}
        />
    )
}
```

This version adds rotation and color changes to the gesture animations, and uses a default spring transition for more natural movement. `whileHover` receives a specific `transition` that will trigger when the gesture starts.

Motion has several other convenient props for gesture animations, like `whileDrag`, `whileInView`, and `whileFocus`.

### Conclusion

In this tutorial, we learned how to:

* Create hover animations with the `whileHover` prop
* Create tap/click animations with the `whileTap` prop
* Define animation states using JavaScript objects
* Combine multiple animation properties for richer interactions

Motion for React makes it easy to add engaging, interactive animations to your UI elements, creating a more dynamic and responsive user experience with minimal code.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
