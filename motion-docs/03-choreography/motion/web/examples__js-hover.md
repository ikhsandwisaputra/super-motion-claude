---
source: https://motion.dev/examples/js-hover
title: "Hover example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Hover

An example of using Motion's hover function to animate elements as a user hovers over them. hover() automatically filters out polyfilled hover events from touch screens, which can normally lead to broken visual states.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)20 Jan 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/hover)

## Source code

```
<div class="box"></div>

<script type="module">
    import { animate, hover } from "motion"

    hover(".box", (element) => {
        animate(element, { scale: 1.3 })

        return () => animate(element, { scale: 1 })
    })
</script>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: var(--hue-3);
        border-radius: 10px;
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-hover#tutorial)

Difficulty

### Introduction

The Hover example demonstrates how to create a simple animation that triggers when a user hovers on and off an element.

In this example, we'll learn to use:

* [`hover`](https://motion.dev/docs/hover) - To detect when an element is being hovered over
* [`animate`](https://motion.dev/docs/animate) - To animate properties of an element

#### Why use `hover`?

Motion's `hover` function provides several advantages over
traditional event listeners:

##### Simple API

`hover` automatically handle attaching and cleaning up event listeners. It also supports CSS selectors to add gestures to multiple elements at once.

```
hover(".box", (element) => {
    animate(element, { scale: 1.2 })

    return () => animate(element, { scale: 1 })
})
```

##### Touch filtering

For legacy reasons dating back to the first iPhones, browsers polyfill `pointerenter` and `pointerleave` events even from touch devices. So you can trigger `:hover` selectors from a touch pointer. This can lead to stuck or unexpected interactions.

`hover` automatically filters out touch events, so you can be sure that your animations will only trigger from mouse-like devices.

### Get started

Let's begin with our basic HTML structure and styles:

```
<div class="box"></div>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: #6100ff;
        border-radius: 10px;
    }
</style>
```

This creates a simple purple box that will be the target of our hover animation.

### Let's animate!

#### Import from Motion

First, we need to import the necessary functions from Motion:

```
import { animate, hover } from "motion"
```

The `hover` function allows us to detect when an element is being hovered over and execute callback functions when hover begins and ends. The `animate` function will create our animations.

#### Setting up hover detection

Now, let's use the `hover` function to detect when our box is being hovered over:

```
hover(".box", (element) => {
    // Code to run when hover starts

    return () => {
        // Code to run when hover ends
    }
})
```

The `hover` function takes two arguments:

1. A CSS selector or DOM element to watch for hover events
2. A callback function that receives the target element

The callback function should return another function that will be called when the hover ends, allowing us to define both the "hover start" and "hover end" behaviors.

#### Adding animations

Let's define what happens when a user hovers over the box:

```
hover(".box", (element) => {
    animate(element, { scale: 1.3 })

    return () => animate(element, { scale: 1 })
})
```

When the hover starts, we animate the box to scale up to 1.3 times its original size. Motion animates `scale` with a spring animation by default for a natural, physical feel.

When the hover ends, we return a function that animates the box back to its original scale.

#### The complete code

Putting it all together:

```
<div class="box"></div>

<script type="module">
    import { animate, hover } from "motion"

    hover(".box", (element) => {
        animate(element, { scale: 1.3 })

        return () => animate(element, { scale: 1 })
    })
</script>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: #6100ff;
        border-radius: 10px;
    }
</style>
```

### Conclusion

In this example, we learned how to use Motion's `hover` and `animate` functions to create an engaging hover effect. The `hover` function makes it easy to detect when a user hovers over an element, and the `animate` function provides a clean way to create animations with spring physics.

This approach gives you more control than CSS hover effects while requiring much less code than vanilla JavaScript. You can expand on this by animating multiple properties, creating multi-stage animations, or combining hover with other gesture detectors.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
