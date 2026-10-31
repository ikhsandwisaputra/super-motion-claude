---
source: https://motion.dev/examples/js-svg-path-morphing
title: "SVG path morphing example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# SVG path morphing

An example of using Motion and Flubber to animate an SVG between different shapes.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)2 Jan 2025

:   JavaScript

:   [MotionScoreC](https://score.motion.dev/methodology "This example has a MotionScore of C, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/svg-path-morphing)

## Source code

```
<svg id="icon" width="200" height="200" viewBox="0 0 400 400">
    <g transform="translate(10 10) scale(17 17)">
        <path />
    </g>
</svg>

<script type="module">
    import { interpolate } from "https://cdn.jsdelivr.net/npm/flubber@0.4.2/+esm"
    import { animate } from "motion"

    const paths = {
        star: {
            color: "#fff312",
            d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
        },
        heart: {
            color: "#ff0088",
            d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
        },
    }

    const path = document.querySelector("#icon path")
    let currentPath = paths.star

    path.setAttribute("fill", currentPath.color)
    path.setAttribute("d", currentPath.d)

    function togglePath() {
        currentPath = currentPath === paths.star ? paths.heart : paths.star

        const mixPaths = interpolate(path.getAttribute("d"), currentPath.d, {
            maxSegmentLength: 0.1,
        })

        const duration = 0.5

        animate(path, { fill: currentPath.color }, { duration })
        animate(0, 1, {
            onUpdate: (progress) => path.setAttribute("d", mixPaths(progress)),
            duration,
        })
    }

    setInterval(togglePath, 1000)
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
:   [5 min](https://motion.dev/examples/js-svg-path-morphing#tutorial)

Difficulty

### Introduction

The SVG path morphing example shows how to smoothly animate between different SVG shapes - in this case, morphing a star into a heart and back again.

This example uses two key tools: the [`animate`](https://motion.dev/docs/animate) function from Motion to handle the animations, and the Flubber library to generate smooth transitions between different SVG paths. Flubber calculates the intermediate shapes needed to morph from one path to another, while Motion animates the progression between them.

Unlike CSS transitions which can only interpolate simple values, SVG path morphing requires special handling because the `d` attribute of a path contains complex coordinate data. Flubber solves this by creating a function that can generate any intermediate path shape, and Motion's `animate` function provides smooth timing and synchronization with the color change.

### Get started

Let's start with a basic SVG element containing a path we'll animate:

```
<svg id="icon" width="200" height="200" viewBox="0 0 400 400">
    <g transform="translate(10 10) scale(17 17)">
        <path />
    </g>
</svg>

<script type="module">
    const paths = {
        star: {
            color: "#fff312",
            d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
        },
        heart: {
            color: "#ff0088",
            d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
        },
    }

    const path = document.querySelector("#icon path")
    let currentPath = paths.star

    path.setAttribute("fill", currentPath.color)
    path.setAttribute("d", currentPath.d)
</script>
```

We've created an object containing two shapes - a star and a heart - each with a color and a path definition (the `d` attribute). The `viewBox` is set to `"0 0 400 400"` and we scale the path by `17` to make the shapes visible, since the path coordinates are designed for a smaller space.

After selecting the path element, we initialize it with the star shape by setting both the `fill` color and the `d` attribute.

### Let's animate!

#### Import from Motion

First, we'll import the functions we need:

```
import { interpolate } from "https://cdn.jsdelivr.net/npm/flubber@0.4.2/+esm"
import { animate } from "motion"
```

The `interpolate` function from Flubber creates smooth transitions between SVG paths, and the `animate` function from Motion handles the animation timing.

#### Toggle between shapes

Now we'll create a function that switches between the star and heart:

```
function togglePath() {
    currentPath = currentPath === paths.star ? paths.heart : paths.star

    const mixPaths = interpolate(path.getAttribute("d"), currentPath.d, {
        maxSegmentLength: 0.1,
    })

    const duration = 0.5

    animate(path, { fill: currentPath.color }, { duration })
    animate(0, 1, {
        onUpdate: (progress) => path.setAttribute("d", mixPaths(progress)),
        duration,
    })
}

setInterval(togglePath, 1000)
```

Let's break down what's happening. First, we toggle `currentPath` to point to whichever shape we're not currently showing.

Next, we create the `mixPaths` function using Flubber's `interpolate`. This function takes the current path, the target path, and an options object. The `maxSegmentLength: 0.1` option tells Flubber to break the paths into small segments for smoother morphing - smaller values create smoother animations but require more computation.

The `mixPaths` function can now generate any intermediate shape by calling it with a value between `0` and `1`, where `0` is the starting shape and `1` is the ending shape.

We run two animations simultaneously, both lasting `0.5` seconds. The first animates the `fill` color using Motion's standard property animation. The second is more interesting - we animate from `0` to `1`, and use the `onUpdate` callback to receive the current progress value. For each frame, we call `mixPaths(progress)` to get the intermediate path shape and apply it with `setAttribute`.

Finally, `setInterval` calls our `togglePath` function every `1000` milliseconds (1 second), creating a continuous morphing loop.

### Conclusion

We've built a smooth SVG path morphing animation by combining Motion's `animate` function with Flubber's path interpolation. This technique lets you create organic shape transitions that would be difficult to achieve with CSS alone, perfect for icon animations, logo reveals, or any creative effect that needs to transform between different shapes.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
