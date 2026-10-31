---
source: https://motion.dev/examples/js-options
title: "Basic animation example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Basic animation

An example of using easing and duration options to customise a scale animation in Motion.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)2 Jan 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/options)

## Source code

```
<div class="box"></div>

<script type="module">
    import { animate } from "motion"

    animate(".box", window.matchMedia("(prefers-reduced-motion: reduce)").matches ? { scale: 1, opacity: [0, 1] } : { scale: 1 }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? { ease: "easeOut", duration: 0.3, scale: { duration: 0 } } : { ease: "circInOut", duration: 1 })
</script>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: var(--hue-6);
        border-radius: 10px;
        transform: scale(0.4);
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-options#tutorial)

Difficulty

### Introduction

This basic example shows how to use Motion's [transition options](https://motion.dev/docs/animate#options) to configure your animations. We'll be using the `animate` function with custom options to create a smooth scaling animation.

### Get started

Let's start with the basic HTML and CSS structure:

```
<div class="box"></div>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: #ff6c85;
        border-radius: 10px;
        transform: scale(0.4);
    }
</style>
```

### Let's animate!

#### Import from Motion

First, we need to import the `animate` function from Motion:

```
import { animate } from "motion"
```

#### Basic functionality

Now, let's implement the animation that scales our box from its initial size (defined as `0.4` in the above CSS) to full size (`1`):

```
animate(".box", { scale: 1 }, { ease: "circInOut", duration: 1 })
```

This single line does three important things:

* Selects the target element using the CSS selector `".box"`
* Defines the target value for the `scale` property (as `1`)
* Provides options that control how the animation behaves

#### Options explained

Let's break down the options we're using:

```
{ ease: "circInOut", duration: 1 }
```

* `ease: "circInOut"` - This defines the easing function for the animation. The "circInOut" easing creates a circular motion effect that starts slow, speeds up in the middle, and slows down at the end.
* `duration: 1` - This sets the animation duration to 1 second.

Motion provides many options to customize your animations:

* `duration`: Animation length in seconds (default: 0.3)
* `ease`: The easing function (default: "easeOut")
* `delay`: Delay before animation starts in seconds
* `repeat`: Number of times to repeat the animation
* `repeatType`: Can be "loop", "mirror", or "reverse"
* `repeatDelay`: Delay between repeats
* `type`: Can be set to `"spring"` for a physics-based animations

#### Easing Functions

The `ease` option accepts various easing functions that control the rate of change during the animation:

* Linear: `"linear"`
* Ease out: `"easeOut"` (default)
* Ease in: `"easeIn"`
* Ease in and out: `"easeInOut"`
* Circular: `"circIn"`, `"circOut"`, `"circInOut"`
* [Cubic bezier](https://cubic-bezier.com/#.42,.1,.25,.92) curves: For example `[.42,.1,.25,.92]`

[card.css/motion-app

card.cssCard.tsx

```
1.card {2  transition: scale 200ms linear(3    0, 0.009, 0.036, 0.084, 0.157, 0.255, 0.378,4    0.522, 0.679, 0.832, 0.954, 1.029, 1.052, 1.038,5    1.011, 0.99, 0.984, 0.991, 1.001, 1.005, 16  );7}89.card:hover {10  scale: 1.2;11}
```

### Visual editing for your agent.

Edit and preview Motion and CSS transitions live in your code. Tune ease curves, springs, and durations without leaving your editor.

Part of Motion AI Kit. One-time fee, lifetime access.](https://motion.dev/ai-kit)

### Try it yourself

You can experiment with different options to see how they affect the animation:

```
// Slow bounce effect
animate(".box", { scale: 1 }, { ease: "easeIn", duration: 2 })

// A delayed ease in/out with a fast middle
animate(
    ".box",
    { scale: 1 },
    { ease: [0.42, 0.1, 0.25, 0.92], duration: 0.5, delay: 0.3 }
)

// Looping animation
animate(
    ".box",
    { scale: 1 },
    {
        ease: "easeInOut",
        duration: 1,
        repeat: Infinity,
        repeatType: "mirror",
    }
)
```

### Conclusion

In this tutorial, we learned how to use Motion's animation options to control the timing, easing, and behavior of animations. These options provide fine-grained control over your animations, allowing you to create experiences that feel natural and engaging.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
