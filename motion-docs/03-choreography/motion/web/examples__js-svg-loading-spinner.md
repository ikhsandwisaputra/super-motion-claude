---
source: https://motion.dev/examples/js-svg-loading-spinner
title: "SVG loading spinner example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# SVG loading spinner

An example of using Motion to animate an SVG loading spinner.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)2 Jan 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/svg-loading-spinner)

## Source code

```
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <g class="segment" opacity="0">
        <path
            id="loading-path"
            d="M 94 25 C 94 21.686 96.686 19 100 19 L 100 19 C 103.314 19 106 21.686 106 25 L 106 50 C 106 53.314 103.314 56 100 56 L 100 56 C 96.686 56 94 53.314 94 50 Z"
        ></path>
    </g>
    <g class="segment" opacity="0">
        <use href="#loading-path" style="transform: rotate(45deg)" />
    </g>
    <g class="segment" opacity="0">
        <use href="#loading-path" style="transform: rotate(90deg)" />
    </g>
    <g class="segment" opacity="0">
        <use href="#loading-path" style="transform: rotate(135deg)" />
    </g>
    <g class="segment" opacity="0">
        <use href="#loading-path" style="transform: rotate(180deg)" />
    </g>
    <g class="segment" opacity="0">
        <use href="#loading-path" style="transform: rotate(225deg)" />
    </g>
    <g class="segment" opacity="0">
        <use href="#loading-path" style="transform: rotate(270deg)" />
    </g>
    <g class="segment" opacity="0">
        <use href="#loading-path" style="transform: rotate(315deg)" />
    </g>
</svg>

<script type="module">
    import { animate, stagger } from "motion"

    const segments = document.querySelectorAll(".segment")

    const numSegments = segments.length

    /**
     * Stagger offset (in seconds)
     * Decrease this to speed the animation up or increase
     * to slow it down.
     */
    const offset = 0.09
    const duration = numSegments * offset

    animate(
        segments,
        { opacity: [0, 1, 0] },
        {
            offset: [0, 0.1, 1],
            duration,
            delay: stagger(offset, { startDelay: -duration }),
            repeat: Infinity,
        }
    )
</script>

<style>
    .segment use,
    .segment path {
        fill: var(--hue-1);
        transform-origin: 100px 100px;
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-svg-loading-spinner#tutorial)

Difficulty

### Introduction

The SVG Loading Spinner example shows how to create a smooth, circular loading animation using SVG elements. This example uses the [`animate`](https://motion.dev/docs/animate) function from Motion to fade spinner segments in and out, and the [`stagger`](https://motion.dev/docs/stagger) utility to create a wave-like effect around the circle.

The example animates multiple SVG elements at once, with each segment starting its animation slightly after the previous one. This creates the classic "loading spinner" effect you see in many applications.

### Get started

Let's start by creating the SVG structure. We'll use a single path definition and reuse it eight times, rotated at different angles to form a circle:

```
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <g class="segment" opacity="0">
        <path
            id="loading-path"
            d="M 94 25 C 94 21.686 96.686 19 100 19 L 100 19 C 103.314 19 106 21.686 106 25 L 106 50 C 106 53.314 103.314 56 100 56 L 100 56 C 96.686 56 94 53.314 94 50 Z"
        ></path>
    </g>
    <g class="segment" opacity="0">
        <use href="#loading-path" style="transform: rotate(45deg)" />
    </g>
    <g class="segment" opacity="0">
        <use href="#loading-path" style="transform: rotate(90deg)" />
    </g>
    <g class="segment" opacity="0">
        <use href="#loading-path" style="transform: rotate(135deg)" />
    </g>
    <g class="segment" opacity="0">
        <use href="#loading-path" style="transform: rotate(180deg)" />
    </g>
    <g class="segment" opacity="0">
        <use href="#loading-path" style="transform: rotate(225deg)" />
    </g>
    <g class="segment" opacity="0">
        <use href="#loading-path" style="transform: rotate(270deg)" />
    </g>
    <g class="segment" opacity="0">
        <use href="#loading-path" style="transform: rotate(315deg)" />
    </g>
</svg>

<script type="module">
</script>

<style>
    .segment use,
    .segment path {
        fill: #f97316;
        transform-origin: 100px 100px;
    }
</style>
```

The SVG uses the `<use>` element to reference the same path multiple times. Each segment is wrapped in a `<g>` (group) element with the `segment` class and starts with `opacity="0"` so they're invisible until Motion animates them.

The style block sets the fill color and ensures all rotations happen around the center of the SVG at `100px 100px`.

### Let's animate!

#### Import from Motion

First, import the `animate` function and `stagger` utility from Motion:

```
import { animate, stagger } from "motion"
```

#### Create the animation

Now we can select all the segments and animate them. Add this code to your script:

```
const segments = document.querySelectorAll(".segment")

const numSegments = segments.length

const offset = 0.09
const duration = numSegments * offset

animate(
    segments,
    { opacity: [0, 1, 0] },
    {
        offset: [0, 0.1, 1],
        duration,
        delay: stagger(offset, { startDelay: -duration }),
        repeat: Infinity,
    }
)
```

Let's break down what's happening here.

The `animate` function can animate multiple elements at once. We're passing all eight segments and animating their `opacity` property through three values: `[0, 1, 0]`. This makes each segment fade in from invisible to fully visible, then back to invisible.

The `offset` option controls the timing of those three opacity values. By setting it to `[0, 0.1, 1]`, we're telling Motion to reach full opacity quickly (at 10% of the animation duration) and stay visible longer before fading out. This creates a more pronounced wave effect.

The `duration` is calculated as `numSegments * offset`, which equals `0.72` seconds. This ensures the animation speed stays consistent as the wave travels around the circle.

The `stagger` utility is what creates the wave effect. It delays each segment's animation by `0.09` seconds after the previous one. The `startDelay: -duration` option is a trick that makes the animation start already in progress, so users don't see a blank spinner when the page loads. Without this, there would be a delay before anything appears.

Finally, `repeat: Infinity` makes the animation loop forever, which is what you want for a loading indicator.

You can adjust the `offset` value to change the animation speed. A smaller value like `0.05` makes it spin faster, while a larger value like `0.15` makes it slower and more deliberate.

### Conclusion

We've built a smooth SVG loading spinner using Motion's `animate` function and `stagger` utility. The key techniques we learned are animating multiple elements simultaneously, using offset arrays to control animation timing, and applying staggered delays to create sequential effects. This pattern is useful for any kind of loading indicator or sequential animation where elements need to animate one after another.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
