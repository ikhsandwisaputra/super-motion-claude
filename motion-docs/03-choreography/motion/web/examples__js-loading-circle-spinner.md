---
source: https://motion.dev/examples/js-loading-circle-spinner
title: "Loading: Circle spinner example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Loading: Circle spinner

An example of creating a circle spinner loading animation with Motion.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Mar 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/loading-circle-spinner)

## Source code

```
<div class="container">
    <div class="spinner"></div>
</div>

<script type="module">
    import { animate } from "motion"

    const spinner = document.querySelector(".spinner")

    animate(
        spinner,
        { transform: "rotate(360deg)" },
        {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
        }
    )
</script>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px;
        border-radius: 8px;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 4px solid var(--divider);
        border-top-color: var(--hue-1);
        will-change: transform;
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-loading-circle-spinner#tutorial)

Difficulty

### Introduction

The Circle Spinner example shows how to create a classic loading spinner using Motion. This simple yet effective animation continuously rotates a styled circle, providing users with visual feedback that content is loading.

Infinite rotation is achieved with a single `animate` call:

```
animate(".spinner", { transform: "rotate(360deg)" }, { duration: 1.5, repeat: Infinity })
```

### Get started

Let's start with the HTML structure:

```
<div class="container">
    <div class="spinner"></div>
</div>
```

The spinner is styled as a circle with a partially colored border, creating the classic loading indicator appearance:

```
.spinner {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 4px solid var(--divider);
    border-top-color: var(--hue-1);
}
```

### Let's animate!

#### Import from Motion

First, import the `animate` function from Motion:

```
import { animate } from "motion"
```

#### Add the rotation animation

Now call `animate` to create the spinning effect:

```
animate(
    ".spinner",
    { transform: "rotate(360deg)" },
    {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
    }
)
```

The animation configuration:

* `duration: 1.5` - Each full rotation takes 1.5 seconds
* `repeat: Infinity` - The animation loops forever
* `ease: "linear"` - Maintains constant speed throughout the rotation

Using `linear` easing is essential for spinners, as it prevents the animation from speeding up or slowing down, creating a smooth, consistent rotation.

#### Hardware acceleration

Motion runs `transform` animations, and shorthands like `rotate: 360`, with hardware acceleration. These run on the GPU rather than the CPU. This is especially important during loading sequences, as loading is typically a time of heavy CPU load. By offloading the animation to the GPU, the spinner remains smooth even when the main thread is busy. [Learn more about web animation performance](https://motion.dev/magazine/web-animation-performance-tier-list).

### Conclusion

In this tutorial, we learned how to:

* Create an infinitely rotating animation using the `animate` function
* Use `repeat: Infinity` to loop an animation forever
* Apply `linear` easing for consistent rotation speed
* Animate `transform` or `rotate` for hardware-accelerated animations

This simple spinner pattern can be customized with different sizes, colors, and rotation speeds to match your application's design.

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
