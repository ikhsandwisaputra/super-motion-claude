---
source: https://motion.dev/examples/react-drag
title: "Drag example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Drag

An example of making an element draggable using Motion for React's drag prop.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)17 Dec 2024

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/drag)

## Source code

```
"use client"

import { motion } from "motion/react"

export default function Drag() {
    return <motion.div drag style={box} />
}

/**
 * ==============   Styles   ================
 */

const box = {
    width: 100,
    height: 100,
    backgroundColor: "var(--hue-2)",
    borderRadius: 10,
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-drag#tutorial)

Difficulty

### Introduction

The Drag example shows how to make an element draggable with Motion for React. It uses the [`drag`](https://www.framer.com/motion/gestures/#drag) prop, which allows users to move elements around the page with mouse or touch input.

Compared to implementing draggable elements with raw browser APIs, Motion's `drag` prop provides several advantages:

* No need to manually track mouse/touch events
* Built-in momentum and boundaries
* Works seamlessly across desktop and mobile devices
* Automatically handles accessibility concerns

### Get started

Let's start by creating a simple box that we'll make draggable:

```
"use client"

export default function Drag() {
    return <div style={box} />
}

/**
 * ==============   Styles   ================
 */

const box = {
    width: 100,
    height: 100,
    backgroundColor: "#2f7cf8",
    borderRadius: 10,
}
```

This creates a blue square on the page, but it doesn't do anything yet.

### Let's animate!

#### Import from Motion

To make our box draggable, we first need to import the `motion` component from Motion for React:

```
import { motion } from "motion/react"
```

#### Basic functionality

Now we can replace the standard `div` with a `motion.div` and add the `drag` prop:

```
export default function Drag() {
    return <motion.div drag style={box} />
}
```

That's it! With that single `drag` prop, our box is now fully draggable. Users can click or touch the element and move it around the page.

By default, the draggable element will:

* Be movable in any direction (both horizontal and vertical)
* Have a natural momentum when released
* Return to its initial position when the component re-renders

#### Customizing the drag behavior

While the basic drag functionality is powerful, you can customize it in many ways:

##### Constraining to an axis

If you want to restrict movement to just horizontal or vertical:

```
// Only horizontal dragging
<motion.div drag="x" style={box} />

// Only vertical dragging
<motion.div drag="y" style={box} />
```

##### Adding constraints

You can limit how far the element can be dragged:

```
<motion.div
    drag
    dragConstraints={{
        top: -50,
        left: -50,
        right: 50,
        bottom: 50,
    }}
    style={box}
/>
```

This keeps the element within 50 pixels of its starting position in all directions.

##### Controlling momentum

By default, elements have a natural momentum when released. You can disable this:

```
<motion.div drag dragMomentum={false} style={box} />
```

##### Visual feedback during drag

You can also add visual effects while the element is being dragged:

```
<motion.div drag whileDrag={{ scale: 1.1 }} style={box} />
```

This makes the element grow slightly while being dragged.

### Conclusion

In this tutorial, we learned how to:

* Make elements draggable with the `drag` prop
* Constrain movement to specific axes
* Set boundaries for how far elements can be dragged
* Control momentum behavior
* Add visual feedback during dragging

Motion for React makes creating draggable UIs much simpler than traditional methods, requiring minimal code while providing a polished, natural-feeling user experience.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
