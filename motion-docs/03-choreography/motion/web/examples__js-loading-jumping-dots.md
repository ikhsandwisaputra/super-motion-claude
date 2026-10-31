---
source: https://motion.dev/examples/js-loading-jumping-dots
title: "Loading: Jumping dots example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Loading: Jumping dots

An example of creating a jumping dots loading animation with Motion.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Mar 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/loading-jumping-dots)

## Source code

```
<div class="container">
    <div class="dot dot-1"></div>
    <div class="dot dot-2"></div>
    <div class="dot dot-3"></div>
</div>

<script type="module">
    import { animate, stagger } from "motion"

    const dots = document.querySelectorAll(".dot")

    animate(
        dots,
        { transform: "translateY(-30px)" },
        {
            duration: 0.6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            times: [0, 0.5, 1],
            delay: stagger(0.2, { startDelay: -0.5 }),
        }
    )
</script>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: var(--hue-1);
        will-change: transform;
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-loading-jumping-dots#tutorial)

Difficulty

### Introduction

The Jumping dots example shows how to create an animated loading indicator with three dots that bounce up and down in sequence. This playful animation pattern is perfect for loading states where you want to add some personality.

This example uses the [`animate`](https://motion.dev/docs/animate) function with the [`stagger`](https://motion.dev/docs/stagger) function to create a wave effect as each dot animates in sequence.

### Get started

Let's start with the basic HTML structure:

```
<div class="container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: var(--hue-1);
        will-change: transform;
    }
</style>
```

### Let's animate!

#### Import from Motion

Import the functions we need:

```
<script type="module">
    import { animate, stagger } from "motion"
</script>
```

#### Select the dots

Get references to all the dot elements:

```
const dots = document.querySelectorAll(".dot")
```

#### Create the jumping animation

Animate the dots with a mirrored repeat:

```
animate(
    dots,
    { transform: "translateY(-30px)" },
    {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: stagger(0.2, { startDelay: -0.5 }),
    }
)
```

The `transform: "translateY(-30px)"` moves each dot 30 pixels upward. The `repeatType: "mirror"` makes the animation play in reverse after completing, creating a smooth up-and-down bounce.

#### Why use transform directly?

We're using `transform: "translateY(-30px)"` instead of the shorthand `y: -30`. Animating the `transform` property directly enables hardware-accelerated animations, which run on the GPU rather than the CPU. This is especially important during loading sequences, as loading is typically a time of heavy CPU load. By offloading the animation to the GPU, the dots remain smooth even when the main thread is busy. [Learn more about web animation performance](https://motion.dev/magazine/web-animation-performance-tier-list).

The `stagger(0.2, { startDelay: -0.5 })` creates a 0.2 second delay between each dot. The `startDelay: -0.5` starts the animation partway through, so the dots begin in a staggered state rather than all starting together.

### Conclusion

We've built an engaging jumping dots animation using Motion's `animate` and `stagger` functions. The `repeatType: "mirror"` creates smooth bouncing, while `stagger` with `startDelay` ensures the dots start in a visually interesting state.

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
