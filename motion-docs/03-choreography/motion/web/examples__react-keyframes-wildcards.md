---
source: https://motion.dev/examples/react-keyframes-wildcards
title: "Keyframe wildcards example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Keyframe wildcards

An example of using Motion for React's keyframe wildcards to create interruptible keyframe animations.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)14 Jan 2025

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/keyframes-wildcards)

## Source code

```
import * as motion from "motion/react-client"

export default function WildcardKeyframes() {
    return (
        <motion.div
            style={box}
            /**
             * Setting the initial keyframe to "null" will use
             * the current value to allow for interruptable keyframes.
             */
            whileHover={{
                scale: [null, 1.1, 1.6],
                transition: {
                    duration: 0.5,
                    times: [0, 0.6, 1],
                    ease: ["easeInOut", "easeOut"],
                },
            }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
        />
    )
}

/**
 * ==============   Styles   ================
 */

const box = {
    width: 100,
    height: 100,
    backgroundColor: "var(--hue-5)",
    borderRadius: 5,
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-keyframes-wildcards#tutorial)

Difficulty

### Introduction

The Wildcard Keyframes example shows how to create interruptible hover animations using Motion's wildcard keyframe feature.

A "wildcard" keyframe is any keyframe that is `null`.

When the initial keyframe is `null`, Motion will use the current value of the property as the starting point. This allows even keyframe animations to be interruptible, unlike CSS keyframes.

### Get started

Let's start with a basic component:

```
export default function WildcardKeyframes() {
    return (
        <div
            style={{
                width: 100,
                height: 100,
                backgroundColor: "#c678dd",
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

#### Creating the wildcard animation

First, let's create a basic hover animation with wildcard keyframes:

```
<motion.div
    style={box}
    whileHover={{
        scale: [null, 1.1, 1.6],
        transition: { duration: 0.5 },
    }}
    transition={{
        duration: 0.3,
        ease: "easeOut",
    }}
/>
```

The `scale` array starts with `null`, which means "use whatever the current scale value is". The animation then progresses through two stages: first from the current value to `1.1`, then from `1.1` to `1.6`.

#### Controlling keyframe timing

Now, let's add precise control over **when** each keyframe occurs. By default, keyframes are evenly spaced throughout the duration of the animation.

By adding a `times` array, we can control the exact timing of each keyframe:

```
<motion.div
    style={box}
    whileHover={{
        scale: [null, 1.1, 1.6],
        transition: {
            duration: 0.5,
            times: [0, 0.6, 1],
            ease: ["easeInOut", "easeOut"],
        },
    }}
    transition={{
        duration: 0.3,
        ease: "easeOut",
    }}
/>
```

The `times` array gives us fine-grained control:

* `0`: Start from the current scale (our `null` value)
* `0.6`: Reach scale of `1.1` at 60% of the animation
* `1`: Finish at scale `1.6` at the end of the animation

We can also specify different easing functions for each segment:

* `"easeInOut"` for the first segment (current scale to `1.1`)
* `"easeOut"` for the second segment (`1.1` to `1.6`)

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

* Create interruptible hover animations using wildcard keyframes
* Define multi-step animations with precise timing control
* Use different easing functions for different segments of an animation
* Create smooth transitions back to the initial state

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
