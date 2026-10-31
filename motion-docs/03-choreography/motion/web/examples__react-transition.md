---
source: https://motion.dev/examples/react-transition
title: "Transition options example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Transition options

An example of setting transition options in Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)17 Dec 2024

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/transition)

## Source code

```
import * as motion from "motion/react-client"

export default function TransitionOptions() {
    return (
        <motion.div
            style={ball}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        />
    )
}

/**
 * ==============   Styles   ================
 */

const ball = {
    width: 200,
    height: 200,
    borderRadius: "50%",
    background: "var(--accent)",
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-transition#tutorial)

Difficulty

### Introduction

The Transition example shows how to adjust animations using Motion's transition options. With Motion, you can precisely control the timing, easing, and delay of your animations to create polished UI interactions.

### Get started

Let's start with a basic circle component:

```
export default function TransitionOptions() {
    return (
        <div
            style={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "var(--accent)",
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

#### Creating the entrance animation

Let's start with a simple fade and scale animation:

```
<motion.div
    style={ball}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
/>
```

This creates a basic animation where our circle:

* Starts invisible (`opacity: 0`) and at half size (`scale: 0.5`)
* Animates to fully visible (`opacity: 1`) and full size (`scale: 1`)

#### Adding duration

We can control how long the animation takes using the `duration` option:

```
<motion.div
    style={ball}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
/>
```

Now our animation takes exactly `0.8` seconds to complete.

#### Adding a delay

We can make the animation start after a short pause using the `delay` option:

```
<motion.div
    style={ball}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
        duration: 0.8,
        delay: 0.5,
    }}
/>
```

The animation now waits `0.5` seconds before starting.

#### Custom easing

Finally, let's add a custom easing curve to make the animation more dynamic:

```
<motion.div
    style={ball}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
    }}
/>
```

The `ease` array `[0, 0.71, 0.2, 1.01]` creates a custom "bounce" effect:

* The animation starts fast
* Overshoots slightly
* Settles back to its final position

This creates a more playful and engaging entrance animation than a linear transition would.

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

* Create basic entrance animations with `initial` and `animate`
* Control animation duration for precise timing
* Add delays to stagger animation starts
* Create custom easing curves for more dynamic motion

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
