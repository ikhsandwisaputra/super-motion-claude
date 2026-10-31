---
source: https://motion.dev/examples/js-loading-three-dots-pulse
title: "Loading: Pulse dots example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Loading: Pulse dots

An example of creating a pulsing dots loading animation with Motion.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Mar 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/loading-three-dots-pulse)

## Source code

```
<div class="container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
</div>

<script type="module">
    import { animate, stagger } from "motion"

    const dots = document.querySelectorAll(".dot")

    animate(
        dots,
        { scale: [1, 1.5, 1] },
        {
            duration: 1.2,
            repeat: Infinity,
            delay: stagger(0.2),
            ease: "easeInOut",
        }
    )
</script>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
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
:   [5 min](https://motion.dev/examples/js-loading-three-dots-pulse#tutorial)

Difficulty

### Introduction

The Pulse dots example shows how to create a classic three-dot loading animation where each dot pulses in sequence. This common loading indicator pattern is found in messaging apps and loading states.

This example uses the [`animate`](https://motion.dev/docs/animate) function and the [`stagger`](https://motion.dev/docs/stagger) function to create a wave effect across multiple elements with minimal code.

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
        gap: 20px;
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

#### Create the pulsing animation

Now animate all the dots with a single call:

```
animate(
    dots,
    { scale: [1, 1.5, 1] },
    {
        duration: 1.2,
        repeat: Infinity,
        delay: stagger(0.2),
        ease: "easeInOut",
    }
)
```

The `scale` array `[1, 1.5, 1]` creates a keyframe animation where each dot starts at normal size, grows to 1.5x, then returns to normal.

The key to the wave effect is `delay: stagger(0.2)`. This tells Motion to delay each dot's animation by 0.2 seconds compared to the previous one. The first dot starts immediately, the second after 0.2s, and the third after 0.4s.

### Conclusion

We've built a smooth pulsing dots animation using Motion's `animate` and `stagger` functions. With just a few lines of code, we created a professional loading indicator that sequences animations across multiple elements.

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
