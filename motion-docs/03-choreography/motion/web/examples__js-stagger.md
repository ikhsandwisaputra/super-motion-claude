---
source: https://motion.dev/examples/js-stagger
title: "Stagger example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Stagger

An example of staggering animations in Motion using its stagger() function.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)2 Jan 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/stagger)

## Source code

```
<div class="stagger-stage">
    <ul class="example" aria-label="Items staggered in order">
        <li class="stagger-origin"><span class="stagger-index">01</span><span class="stagger-delay"></span></li>
        <li><span class="stagger-index">02</span><span class="stagger-delay"></span></li>
        <li><span class="stagger-index">03</span><span class="stagger-delay"></span></li>
        <li><span class="stagger-index">04</span><span class="stagger-delay"></span></li>
    </ul>
</div>

<script type="module">
    import { animate, stagger } from "motion"

    const items = document.querySelectorAll(".example li")
    const delay = stagger(0.42)

    animate(items, { opacity: 1, y: [50, 0] }, { delay })

    // Label each item with the delay stagger() gives it
    items.forEach((item, i) => {
        const seconds = delay(i, items.length)
        item.querySelector(".stagger-delay").textContent = `${seconds.toFixed(2)}s`
    })
</script>

<style>
    #example-container {
        display: flex;
        flex: 1;
        align-self: stretch;
    }

    .stagger-stage {
        --ink: oklch(0.145 0.01 148);
        --paper: oklch(0.94 0.008 96);
        --plate: var(--paper);
        --origin: oklch(0.88 0.18 96);

        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 32px 16px;
        background-color: var(--ink);
        color: var(--paper);
    }

    ul.example {
        display: flex;
        justify-content: center;
        gap: clamp(4px, 1.4vw, 10px);
        margin: 0;
        padding: 0;
        list-style: none;
    }

    ul.example li {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        width: clamp(40px, 9vw, 64px);
        aspect-ratio: 4 / 5;
        padding: clamp(4px, 1vw, 6px);
        background-color: var(--plate);
        color: var(--ink);
        opacity: 0;
    }

    ul.example li.stagger-origin {
        background-color: var(--origin);
    }

    .stagger-index,
    .stagger-delay {
        font-family: var(--font-mono);
        font-size: 10px;
        font-variation-settings: "wght" 600;
        letter-spacing: 0.04em;
        line-height: 1;
    }

    .stagger-index {
        color: color-mix(in oklch, var(--ink) 55%, transparent);
    }

    @media (max-width: 420px) {
        .stagger-index,
        .stagger-delay {
            font-size: 9px;
            letter-spacing: 0;
        }
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-stagger#tutorial)

Difficulty

### Introduction

The Stagger example shows how to create elegant sequential animations where multiple elements animate one after another with a delay between them. This example uses the [`animate`](https://motion.dev/docs/animate) function to animate multiple elements, and the [`stagger`](https://motion.dev/docs/stagger) utility to control the timing between each animation.

Staggered animations are everywhere in modern UIs - from list items fading in on page load to menu items cascading open.

### Get started

Let's start with four list items that are invisible by default:

```
<ul class="example">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>

<style>
    /** Copy styles from example source code */
</style>
```

Notice that each list item has `opacity: 0`, making them invisible when the page loads. We'll use Motion to animate them into view with a stagger effect.

### Let's animate!

#### Import from Motion

First, import the functions we need from Motion:

```
import { animate, stagger } from "motion"
```

The `animate` function lets us animate any DOM element, and `stagger` is a special timing utility that creates sequential delays.

#### Create the staggered animation

Now we can animate all four list items with a single call to `animate`:

```
animate(".example li", { opacity: 1, y: [50, 0] }, { delay: stagger(0.05) })
```

Let's break down what's happening here:

First, `animate` accepts a CSS selector as its first argument - `".example li"` targets all four list items at once.

The second argument defines what to animate. We're animating `opacity: 1` to fade the elements in, and `y: [50, 0]` to move them from `50` pixels below their final position up to `0`. Using an array like `[50, 0]` tells Motion to animate from the first value to the second, creating an upward sliding motion.

The third argument is where the magic happens. By setting `delay: stagger(0.05)`, we're telling Motion to add a `0.05` second delay between each element's animation. So the first element animates immediately, the second starts `0.05` seconds later, the third at `0.1` seconds, and the fourth at `0.15` seconds. This creates the smooth cascading effect.

Without `stagger`, all four elements would animate at exactly the same time. The `stagger` utility makes it effortless to sequence animations across multiple elements.

### Conclusion

We've built a staggered animation that brings list items into view one after another. This technique works with any number of elements and any CSS properties - try experimenting with different stagger delays, animation properties, or adding more list items to see how Motion automatically handles them all.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
