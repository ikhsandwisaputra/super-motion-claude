---
source: https://motion.dev/examples/react-keyframes
title: "Keyframes example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Keyframes

An example of animating an element using keyframes with Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)17 Dec 2024

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/keyframes)

## Source code

```
import * as motion from "motion/react-client"

export default function Keyframes() {
    return (
        <motion.div
            animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["0%", "0%", "50%", "50%", "0%"],
            }}
            transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
            }}
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
    backgroundColor: "var(--white)",
    borderRadius: 5,
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-keyframes#tutorial)

Difficulty

### Introduction

The Keyframes example shows how to create complex multi-step animations in React using Motion's keyframes feature. With keyframes, you can define a sequence of values that your animation will progress through, creating rich and engaging animations.

Keyframes are simple to define, with an array syntax:

```
x: [0, 100, 100, 50]
```

This will animate the `x` property from `0` to `100`, then back to `50`.

### Get started

Let's start with a basic square component:

```
export default function Keyframes() {
    return (
        <div
            style={{
                width: 100,
                height: 100,
                backgroundColor: "white",
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

Now we can convert our square to a `motion.div`:

```
<motion.div style={box} />
```

#### Creating the keyframe animation

To create our complex animation, we'll use the `animate` prop to define arrays of values for different properties:

```
<motion.div
    animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
    }}
    style={box}
/>
```

We can customise the animation by adding a `transition` prop:

```
transition={{
    duration: 2,
    ease: "easeInOut",
    times: [0, 0.2, 0.5, 0.8, 1],
    repeat: Infinity,
    repeatDelay: 1,
}}
```

The `times` array here adjusts when the timing of each keyframe occurs in the animation, where `0` is the start of the animation and `1` is the end. By default, keyframes are evenly spaced throughout the duration of the animation.

The `repeat` property makes the animation loop forever, and the `repeatDelay` property adds a 1-second pause between each loop.

[card.css/motion-app

card.cssCard.tsx

```
1.card {2  transition: scale 200ms linear(3    0, 0.009, 0.036, 0.084, 0.157, 0.255, 0.378,4    0.522, 0.679, 0.832, 0.954, 1.029, 1.052, 1.038,5    1.011, 0.99, 0.984, 0.991, 1.001, 1.005, 16  );7}89.card:hover {10  scale: 1.2;11}
```

### Visual editing for your agent.

Edit and preview Motion and CSS transitions live in your code. Tune ease curves, springs, and durations without leaving your editor.

Part of Motion AI Kit. One-time fee, lifetime access.](https://motion.dev/ai-kit)

### Conclusion

In this tutorial, we learned how to:

* Create multi-step animations using keyframe arrays
* Animate multiple properties simultaneously
* Control the timing of keyframes using the `times` array
* Create infinite animation loops with delays

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
