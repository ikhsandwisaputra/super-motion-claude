---
source: https://motion.dev/examples/react-enter-animation
title: "Enter animation example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Enter animation

An example of animating an element when it's added to the DOM using Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)17 Dec 2024

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/enter-animation)

## Source code

```
import * as motion from "motion/react-client"

export default function EnterAnimation() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            style={ball}
        />
    )
}

/**
 * ==============   Styles   ================
 */

const ball = {
    width: 100,
    height: 100,
    backgroundColor: "var(--hue-2)",
    borderRadius: "50%",
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-enter-animation#tutorial)

Difficulty

### Introduction

The Enter animation example shows how to animate an element when it first appears on the page. It uses the [`initial`](https://www.framer.com/motion/animation/#initial) and [`animate`](https://www.framer.com/motion/animation/#animate) props from Motion for React to create a smooth entrance effect.

CSS animations can only handle when elements appear, and even then only with the modern [`@starting-style` rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style).

### Get started

Let's start by creating a simple ball component without any animations:

```
export default function EnterAnimation() {
    return <div style={ball} />
}

/**
 * ==============   Styles   ================
 */

const ball = {
    width: 100,
    height: 100,
    backgroundColor: "#5686F5",
    borderRadius: "50%",
}
```

This creates a blue circle on the page, but it just appears instantly without any animation.

### Let's animate!

#### Import from Motion

To animate our ball, we first need to import the `motion` component from Motion for React:

```
import * as motion from "motion/react-client"
```

#### Basic functionality

Now we can replace the standard `div` with a `motion.div`:

```
export default function EnterAnimation() {
    return <motion.div style={ball} />
}
```

To create an enter animation, we need to define:

1. An initial state for the element before animation starts
2. The final state we want it to animate to

We do this using the `initial` and `animate` props:

```
export default function EnterAnimation() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            style={ball}
        />
    )
}
```

#### Customizing the animation

We can further customize how the animation behaves using the `transition` prop:

```
export default function EnterAnimation() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            style={ball}
        />
    )
}
```

This creates a pleasant bouncy effect as the ball appears, making it feel more lively and natural than a typical CSS easing curve.

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

* Create enter animations using the `initial` and `animate` props
* Define different animation states using JavaScript objects
* Customize animations with the `transition` prop
* Use spring animations for more natural movement

Motion for React makes creating entrance animations straightforward, allowing you to add polish to your UI with minimal code.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
