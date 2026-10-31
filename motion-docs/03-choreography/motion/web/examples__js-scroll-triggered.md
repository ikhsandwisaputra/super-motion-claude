---
source: https://motion.dev/examples/js-scroll-triggered
title: "Scroll-triggered animation example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Scroll-triggered animation

An example of using Motion's inView function to trigger animations when elements enter the viewport.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)2 Jan 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/scroll-triggered)

## Source code

```
<div class="example">
    <section class="scroll-section"><pre>Scroll</pre></section>
    <section class="scroll-section"><pre>to</pre></section>
    <section class="scroll-section"><pre>trigger</pre></section>
    <section class="scroll-section"><pre>animations!</pre></section>
</div>

<script type="module">
    import { animate, inView } from "motion"

    inView(".scroll-section pre", (element) => {
        animate(
            element,
            { opacity: 1, x: [-100, 0] },
            {
                duration: 0.9,
                easing: [0.17, 0.55, 0.55, 1],
            }
        )

        return () => animate(element, { opacity: 0, x: -100 })
    })
</script>

<style>
    body {
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .example {
        display: flex;
        flex-direction: column;
    }

    .scroll-section {
        box-sizing: border-box;
        width: 100svw;
        height: 100vh;
        display: flex;
        justify-content: flex-start;
        overflow: hidden;
        padding: 50px;
        background: var(--hue-1-transparent);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .scroll-section:nth-child(2) {
        background: var(--hue-2-transparent);
    }

    .scroll-section:nth-child(3) {
        background: var(--hue-3-transparent);
    }

    .scroll-section:nth-child(4) {
        background: var(--hue-4-transparent);
    }

    .scroll-section pre {
        font-size: 48px;
        color: var(--hue-1);
        display: block;
        transform: translateX(-100px);
        opacity: 0;
    }

    .scroll-section:nth-child(2) pre {
        color: var(--hue-2);
    }

    .scroll-section:nth-child(3) pre {
        color: var(--hue-3);
    }

    .scroll-section:nth-child(4) pre {
        color: var(--hue-4);
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-scroll-triggered#tutorial)

Difficulty

### Introduction

The Scroll-triggered animation example shows how to create animations that trigger when elements enter the viewport as users scroll. This is a common pattern for adding polish to landing pages and marketing sites.

This example uses two Motion functions: [`inView`](https://motion.dev/docs/inview) for detecting when elements enter the viewport, and [`animate`](https://motion.dev/docs/animate) for creating smooth animations.

### Get started

Let's begin with a simple layout containing four full-screen sections. Each section will display a single word that we'll animate when it scrolls into view.

```
<div class="example">
    <section class="scroll-section"><pre>Scroll</pre></section>
    <section class="scroll-section"><pre>to</pre></section>
    <section class="scroll-section"><pre>trigger</pre></section>
    <section class="scroll-section"><pre>animations!</pre></section>
</div>

<style>
    /** Copy styles from example source code */
</style>
```

Notice that we've set the `pre` elements to start invisible (`opacity: 0`) and positioned off-screen (`translateX(-100px)`). This ensures they're hidden until we animate them in.

### Let's animate!

#### Import from Motion

First, import the `inView` and `animate` functions from Motion:

```
<script type="module">
    import { animate, inView } from "motion"
</script>
```

#### Detect when elements enter the viewport

The `inView` function lets us run code whenever elements scroll into view. It accepts a selector string and a callback function that runs when matching elements become visible:

```
<script type="module">
    import { animate, inView } from "motion"

    inView(".scroll-section pre", (element) => {
        // This callback runs when each <pre> element enters the viewport
    })
</script>
```

Motion will automatically detect all elements matching the selector `.scroll-section pre` and call our function whenever they enter the viewport. The `element` parameter gives us a reference to the specific element that became visible.

#### Animate elements as they appear

Inside the `inView` callback, we can use the `animate` function to animate the element. The `animate` function accepts three arguments: the element to animate, the properties to animate, and options for controlling the animation:

```
<script type="module">
    import { animate, inView } from "motion"

    inView(".scroll-section pre", (element) => {
        animate(
            element,
            { opacity: 1, x: [-100, 0] },
            {
                duration: 0.9,
                easing: [0.17, 0.55, 0.55, 1],
            }
        )
    })
</script>
```

Let's break down what's happening:

* `opacity: 1` animates the element from its current opacity (`0` from our CSS) to fully visible
* `x: [-100, 0]` animates the element's horizontal position from `-100px` to `0`, creating a slide-in effect from the left
* `duration: 0.9` makes the animation last `0.9` seconds
* `easing: [0.17, 0.55, 0.55, 1]` defines a cubic bezier curve for smooth, natural motion

When you use an array like `x: [-100, 0]`, Motion animates from the first value to the second. This is different from writing `x: 0`, which would animate from the element's current `x` position (set by our CSS `transform`) to `0`.

#### Animate elements as they leave

The `inView` callback can return a cleanup function that runs when the element scrolls out of view. This lets us reverse the animation when users scroll back up:

```
<script type="module">
    import { animate, inView } from "motion"

    inView(".scroll-section pre", (element) => {
        animate(
            element,
            { opacity: 1, x: [-100, 0] },
            {
                duration: 0.9,
                easing: [0.17, 0.55, 0.55, 1],
            }
        )

        return () => animate(element, { opacity: 0, x: -100 })
    })
</script>
```

Now when an element leaves the viewport, Motion calls our cleanup function, which animates the element back to its hidden state. This creates a seamless scroll experience where elements fade in as they enter and fade out as they leave.

### Conclusion

We've built a scroll-triggered animation that brings elements to life as users scroll through the page. By combining `inView` to detect visibility and `animate` to create smooth transitions, we created an engaging scroll experience with just a few lines of code. Motion makes it easy to add this kind of polish to any website without complex setup or manual scroll listeners.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
