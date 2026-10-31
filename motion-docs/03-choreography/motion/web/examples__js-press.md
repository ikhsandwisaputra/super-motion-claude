---
source: https://motion.dev/examples/js-press
title: "Press example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Press

An example of using Motion's press function to animate elements as a user presses them. press() automatically filters out right clicks and secondary touch points. Every element with a press gesture is keyboard accessible by default.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Feb 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/press)

## Source code

```
<div class="box"></div>

<script type="module">
    import { animate, press } from "motion"

    press(".box", (element) => {
        animate(element, { scale: 0.8 }, { type: "spring", stiffness: 1000 })

        return () =>
            animate(element, { scale: 1 }, { type: "spring", stiffness: 500 })
    })
</script>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: var(--hue-6);
        border-radius: 10px;
        cursor: pointer;
    }

    .box:focus-visible {
        outline: 2px solid var(--hue-6);
        outline-offset: 2px;
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-press#tutorial)

Difficulty

### Introduction

The Press example shows how to create an interactive button that responds to user presses with spring animations. This example uses two key APIs from Motion:

* The [`press`](https://motion.dev/docs/press) function detects when users press down and release on an element
* The [`animate`](https://motion.dev/docs/animate) function creates smooth animations

Motion's `press` function automatically handles important details for you - it filters out right clicks and secondary touch points, and makes every element keyboard accessible by default. This means your interactive elements work great for all users without extra code.

### Get started

Let's start with the basic HTML and CSS for a simple box element:

```
<div class="box"></div>

<style>
    /** Copy styles from example source code */
</style>
```

The `.box:focus-visible` styles ensure keyboard users can see when the box is focused. This is important for accessibility.

### Let's animate!

#### Import from Motion

First, import the `press` and `animate` functions from Motion:

```
<script type="module">
    import { animate, press } from "motion"
</script>
```

#### Add the press gesture

Now we can use the `press` function to detect when users interact with the box. The `press` function takes two arguments: a CSS selector (or element) and a callback function that runs when the press starts:

```
press(".box", (element) => {
    // This runs when the user presses down
})
```

The callback receives the element being pressed as its first argument.

#### Animate on press

When the user presses down, we want to scale the box down to `0.8` using a spring animation. Add this animation inside the callback:

```
press(".box", (element) => {
    animate(element, { scale: 0.8 }, { type: "spring", stiffness: 1000 })
})
```

The `animate` function takes three arguments:

* The element to animate
* The target values (in this case, `scale: 0.8`)
* Animation options (we're using a spring with high `stiffness` for a snappy feel)

#### Animate on release

The `press` callback can return a function that runs when the user releases. This is where we'll animate the box back to its original size:

```
press(".box", (element) => {
    animate(element, { scale: 0.8 }, { type: "spring", stiffness: 1000 })

    return () =>
        animate(element, { scale: 1 }, { type: "spring", stiffness: 500 })
})
```

Notice the release animation uses a lower `stiffness` value of `500`. This makes the box spring back a bit more slowly, creating a nice bouncy effect.

### Conclusion

We've built an interactive button with press animations using Motion's `press` and `animate` functions. The `press` function automatically handles cross-platform touch and mouse events, filters out unwanted interactions, and ensures keyboard accessibility - all without any extra code from us. By using spring animations with different stiffness values for press and release, we created a tactile, responsive feel that makes the button satisfying to interact with.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
