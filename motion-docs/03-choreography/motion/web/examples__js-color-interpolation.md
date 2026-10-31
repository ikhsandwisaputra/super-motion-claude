---
source: https://motion.dev/examples/js-color-interpolation
title: "Color interpolation example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Color interpolation

A comparison of color interpolation between Motion and the browser's native interpolation. Motion uses linear RGB color space, which avoids the dimming effect suffered by browser interpolation.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)21 Feb 2025

:   JavaScript

:   [MotionScoreC](https://score.motion.dev/methodology "This example has a MotionScore of C, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/color-interpolation)

## Source code

```
<div class="container">
    <div class="swatch-container">
        <div class="swatch waapi"></div>
        <div class="label">Browser</div>
    </div>
    <div class="swatch-container">
        <div class="swatch motion"></div>
        <div class="label">Motion</div>
    </div>
</div>

<script type="module">
    import { animate } from "motion"

    // Motion animation
    animate(
        ".motion",
        {
            backgroundColor: ["var(--hue-1)", "var(--hue-4)"],
        },
        {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            easing: "linear",
        }
    )

    // Web Animations API animation
    document
        .querySelector(".waapi")
        .animate(
            [
                { backgroundColor: "var(--hue-1)" },
                { backgroundColor: "var(--hue-4)" },
            ],
            {
                duration: 2000,
                iterations: Infinity,
                direction: "alternate",
                easing: "linear",
            }
        )
</script>

<style>
    .container {
        display: flex;
        gap: 30px;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
    }

    .swatch-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }

    .swatch {
        width: 100px;
        height: 100px;
        border-radius: 8px;
        background-color: var(--hue-1);
    }

    .label {
        color: var(--white);
        font-size: 14px;
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-color-interpolation#tutorial)

Difficulty

### Introduction

The Color interpolation example shows a side-by-side comparison of how Motion and the browser's native Web Animations API interpolate colors differently. This example uses the [`animate`](https://motion.dev/docs/animate) function from Motion to create smooth color transitions that avoid the dimming effect common in browser-based animations.

When animating between two colors, browsers typically interpolate in the sRGB color space, which can create an unnatural dimming effect in the middle of the transition. Motion uses linear RGB color space instead, resulting in more vibrant and visually accurate color transitions.

### Get started

First, let's set up the HTML structure with two color swatches - one for the browser's animation and one for Motion's animation:

```
<div class="container">
    <div class="swatch-container">
        <div class="swatch waapi"></div>
        <div class="label">Browser</div>
    </div>
    <div class="swatch-container">
        <div class="swatch motion"></div>
        <div class="label">Motion</div>
    </div>
</div>

<style>
    /** Copy styles from example source code */
</style>
```

This creates two identical color swatches that we'll animate using different methods.

### Let's animate!

#### Import from Motion

Start by importing the `animate` function:

```
<script type="module">
    import { animate } from "motion"
</script>
```

#### Create the browser animation

First, let's create the browser's native animation using the Web Animations API to see the dimming effect:

```
document
    .querySelector(".waapi")
    .animate(
        [
            { backgroundColor: "#ff0088" },
            { backgroundColor: "#1e75f7" },
        ],
        {
            duration: 2000,
            iterations: Infinity,
            direction: "alternate",
            easing: "linear",
        }
    )
```

This animates the `backgroundColor` from pink to blue and back, repeating infinitely. The `direction: "alternate"` option makes the animation reverse on each iteration, and `easing: "linear"` ensures a constant speed throughout.

#### Create the Motion animation

Now let's create the same animation using Motion:

```
animate(
    ".motion",
    {
        backgroundColor: ["#ff0088", "#1e75f7"],
    },
    {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        easing: "linear",
    }
)
```

Motion's syntax is slightly different - it uses a selector as the first argument, the animation values as the second, and options as the third. Notice the `duration` is in seconds (`2`) rather than milliseconds (`2000`), and we use `repeat` and `repeatType` instead of `iterations` and `direction`.

#### Understanding the difference

Watch both swatches animate and you'll notice something interesting: the browser's animation appears to dim in the middle of the transition, creating a muddy, desaturated color between pink and blue. Motion's animation maintains vibrant colors throughout the entire transition.

This happens because browsers interpolate colors in the sRGB color space, which doesn't account for how human perception works. Motion uses linear RGB color space, which produces color transitions that look more natural and vibrant to our eyes.

### Conclusion

We've built a visual comparison that demonstrates Motion's superior color interpolation. By animating the same color transition using both the Web Animations API and Motion, we can see how Motion's linear RGB interpolation maintains color vibrancy throughout the animation, while the browser's sRGB interpolation creates an unnatural dimming effect. This is just one example of how Motion goes beyond the browser's capabilities to create more polished, professional animations.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
