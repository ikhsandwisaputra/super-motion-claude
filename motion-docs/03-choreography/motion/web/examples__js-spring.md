---
source: https://motion.dev/examples/js-spring
title: "Spring example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Spring

An example of a spring animation in Motion.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)2 Jan 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/spring)

## Source code

```
<div class="box"></div>

<script type="module">
    import { animate } from "motion"

    animate(
        ".box",
        { rotate: 90 },
        { type: "spring", repeat: Infinity, repeatDelay: 0.2 }
    )
</script>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: var(--hue-1);
        border-radius: 10px;
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-spring#tutorial)

Difficulty

### Introduction

The Spring example shows how to create smooth, physics-based animations using Motion's [`animate`](https://motion.dev/docs/animate) function with spring animations. Spring animations feel more natural than traditional tween animations because they simulate real-world physics, creating organic motion that responds to changes with realistic momentum and bounce.

Instead of manually calculating velocities, damping, and stiffness values, you simply set `type: "spring"` in your animation options, and Motion handles all the physics for you.

### Get started

Let's start with a simple HTML structure and styling:

```
<div class="box"></div>

<script type="module">
</script>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: #ff0088;
        border-radius: 10px;
    }
</style>
```

This creates a pink square with rounded corners that we'll animate.

### Let's animate!

#### Import from Motion

First, import the [`animate`](https://motion.dev/docs/animate) function from Motion:

```
<script type="module">
    import { animate } from "motion"
</script>
```

#### Add the spring animation

Now we can animate the box with a spring animation. Add this inside the script tag:

```
animate(
    ".box",
    { rotate: 90 },
    { type: "spring" }
)
```

The [`animate`](https://motion.dev/docs/animate) function takes three arguments:

1. **Target** - A CSS selector (`.box`) or DOM element to animate
2. **Values** - An object defining what to animate (`{ rotate: 90 }`)
3. **Options** - Configuration for how the animation behaves

By setting `type: "spring"`, Motion uses physics-based motion instead of a linear or eased transition. This creates a more natural feel with realistic overshoot and settling.

#### Make it loop

To see the spring animation repeat, add the `repeat` and `repeatDelay` options:

```
animate(
    ".box",
    { rotate: 90 },
    { type: "spring", repeat: Infinity, repeatDelay: 0.2 }
)
```

The `repeat: Infinity` option makes the animation loop forever, while `repeatDelay: 0.4` adds a brief pause between each rotation. This gives you time to appreciate how the spring physics naturally settles into place before starting again.

#### Customizing spring physics

Motion provides two ways to configure spring behavior. The first uses physics-based parameters:

```
animate(
    ".box",
    { rotate: 90 },
    {
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 1,
    }
)
```

* **stiffness** - Controls how rigid the spring feels. Higher values create faster, snappier motion. Default is `100`.
* **damping** - Controls how quickly the spring settles. Lower values create more oscillation. Default is `10`.
* **mass** - The mass of the moving object. Higher values create slower, more lumbering motion. Default is `1`.

The second approach uses duration and bounce, which is often more intuitive:

```
animate(
    ".box",
    { rotate: 90 },
    {
        type: "spring",
        duration: 0.8,
        bounce: 0.25,
    }
)
```

* **duration** - How long the animation takes to settle, in seconds.
* **bounce** - A value between `-1` and `1` controlling how much the spring overshoots. A value of `0` creates no bounce (like a critically damped spring), while higher values create more oscillation. Negative values make the spring overdamped, so it settles more slowly into its target with no overshoot.

The duration/bounce API is useful when you need predictable timing, while the physics parameters give you finer control over the feel of the motion.

### Conclusion

We've built a simple but effective spring animation that demonstrates physics-based motion. Spring animations are perfect for UI interactions because they feel responsive and natural.

[>Motion+ Â· AI Kit

### Make your AI agent a Motion expert.

Give it current Motion context, Performance Doctor, and production-ready CSS spring generation.

Part of Motion+. One-time fee, lifetime access.

âº](https://motion.dev/ai-kit)

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
