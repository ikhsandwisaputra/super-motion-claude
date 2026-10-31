---
source: https://motion.dev/examples/js-bounce-easing
title: "Bounce easing example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Bounce easing

A toggle switch that demonstrates custom easing functions with both bounce and spring animations.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)18 Feb 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/bounce-easing)

## Source code

```
<div class="container">
    <div class="switch">
        <div class="ball"></div>
    </div>
</div>

<script type="module">
    import { animate } from "motion"

    // From https://easings.net/#easeOutBounce
    function bounceEase(x) {
        const n1 = 7.5625
        const d1 = 2.75

        if (x < 1 / d1) {
            return n1 * x * x
        } else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75
        } else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375
        } else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375
        }
    }

    const bounce = {
        duration: 1.2,
        ease: bounceEase,
    }

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30,
    }

    const ball = document.querySelector(".ball")
    const switchEl = document.querySelector(".switch")
    let isOn = true

    switchEl.addEventListener("click", () => {
        isOn = !isOn

        animate(ball, { y: isOn ? 0 : 120 }, isOn ? spring : bounce)
    })
</script>

<style>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 100vh;
    }

    .switch {
        width: 80px;
        height: 200px;
        background-color: #fff3;
        display: flex;
        align-items: flex-start;
        border-radius: 50px;
        padding: 10px;
        cursor: pointer;
    }

    .ball {
        width: 80px;
        height: 80px;
        background-color: var(--white);
        border-radius: 40px;
        will-change: transform;
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-bounce-easing#tutorial)

Difficulty

### Introduction

The Bounce easing example shows a toggle switch that animates a ball downwards with a gravity-esque bounce animation. It uses the [`animate`](https://motion.dev/docs/animate) function from Motion to create smooth animations with custom easing functions and spring physics.

This example demonstrates how to use custom easing functions alongside spring animations. The `ease` option allows you to define your own timing curves, while `spring` physics provides natural motion based on physical properties like stiffness and damping.

### Get started

Let's start with the basic HTML structure and styles for our toggle switch:

```
<div class="container">
    <div class="switch">
        <div class="ball"></div>
    </div>
</div>

<script type="module">
    // We'll add our code here
</script>

<style>
    /** Copy styles from example source code */
</style>
```

The switch is a vertical container that will hold our animated ball. Notice the `will-change: transform` property on the ball - this tells the browser to optimize for transform animations.

### Let's animate!

#### Import from Motion

First, import the `animate` function from Motion:

```
import { animate } from "motion"
```

#### Creating a custom easing function

Before we add interactivity, let's create our custom bounce easing function. This function takes a progress value between `0` and `1` and returns an eased value:

```
// From https://easings.net/#easeOutBounce
function bounceEase(x) {
    const n1 = 7.5625
    const d1 = 2.75

    if (x < 1 / d1) {
        return n1 * x * x
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375
    }
}
```

This easing function creates a bouncing effect by calculating different quadratic curves for different parts of the animation. The constants `n1` and `d1` control the bounce intensity and timing.

#### Defining animation options

Now let's create two different animation configurations - one for bouncing and one for spring physics:

```
const bounce = {
    duration: 1.2,
    ease: bounceEase,
}

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
}
```

The `bounce` configuration uses our custom easing function with a duration of `1.2` seconds. The `spring` configuration creates physics-based motion with high stiffness (`700`) for snappy movement and moderate damping (`30`) to control oscillation.

[>Motion+ Â· AI Kit

### Make your AI agent a Motion expert.

Give it current Motion context, Performance Doctor, and production-ready CSS spring generation.

Part of Motion+. One-time fee, lifetime access.

âº](https://motion.dev/ai-kit)

#### Adding interactivity

Now let's make the switch interactive by tracking state and listening for clicks:

```
const ball = document.querySelector(".ball")
const switchEl = document.querySelector(".switch")
let isOn = true

switchEl.addEventListener("click", () => {
    isOn = !isOn

    animate(ball, { y: isOn ? 0 : 120 }, isOn ? spring : bounce)
})
```

We track the toggle state with `isOn`, then flip it on each click. The ball animates to `y: 0` (top position) when on, and `y: 120` (bottom position) when off.

Here's the clever part: when turning on (moving up), we use the `spring` animation for a snappy return. When turning off (moving down), we use the custom `bounce` easing for a playful falling effect. This creates an asymmetric animation that feels natural - things fall with gravity and bounce, but spring back up quickly.

### Conclusion

We've built a toggle switch that demonstrates the flexibility of Motion's animation system. By combining custom easing functions with spring physics, we created animations that feel both playful and natural. The `animate` function makes it easy to switch between different animation styles dynamically, letting you craft unique motion for different interactions.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
