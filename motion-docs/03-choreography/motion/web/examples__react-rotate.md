---
source: https://motion.dev/examples/react-rotate
title: "Rotate example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Rotate

An example of animation the rotation of an element with Motion for React

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)15 Dec 2024

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/rotate)

## Source code

```
import * as motion from "motion/react-client"

export default function Rotate() {
    return (
        <motion.div
            style={box}
            animate={{ rotate: 360 }}
            transition={{ duration: 1 }}
        />
    )
}

/**
 * ==============   Styles   ================
 */

const box = {
    width: 100,
    height: 100,
    backgroundColor: "var(--hue-1)",
    borderRadius: 5,
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-rotate#tutorial)

Difficulty

### Introduction

The Rotate example shows how to create a simple rotation animation in React using Motion. This example demonstrates the basics of animating independent transform properties with Motion's declarative API.

### Get started

Let's start with a basic square component:

```
export default function Rotate() {
    return (
        <div
            style={{
                width: 100,
                height: 100,
                backgroundColor: "#98c379",
                borderRadius: 5,
            }}
        />
    )
}
```

### Let's animate!

#### Import from Motion

First, we'll import Motion:

```
import * as motion from "motion/react-client"
```

#### Creating the rotation animation

First, let's change our square to a `motion.div`:

```
<motion.div style={box} />
```

This will allow us to animate the `div`'s `rotate` property via the `animate` prop.

```
<motion.div
    style={box}
    animate={{ rotate: 360 }}
    transition={{ duration: 1 }}
/>
```

By default, `rotate` is animated using a `spring` easing function.

We can change this by passing a `transition` prop:

```
transition={{ duration: 1, ease: "linear" }}
```

This will animate the `rotate` property using a linear easing function, or Motion's other [transition options](https://motion.dev/docs/react-transitions).

### Conclusion

In this tutorial, we learned how to:

* Create a basic rotation animation using Motion
* Use the `animate` prop to declare our target values
* Control animation timing with the `transition` prop
* Let Motion handle complex transform calculations automatically

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
