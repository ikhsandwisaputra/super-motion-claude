---
source: https://motion.dev/examples/js-text-reveal
title: "Reveal text effect example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Reveal text effect

An example of revealing text on hover using flexbox and Motion's layout animations.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)18 Feb 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/text-reveal)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-text-reveal#tutorial)

Difficulty

### Introduction

The Reveal text effect example shows how to create an elegant hover animation where text slides upward to reveal alternative content underneath. This effect uses the [`hover`](https://motion.dev/docs/hover) function from Motion to detect hover interactions and the [`animate`](https://motion.dev/docs/animate) function to create smooth vertical animations.

The `hover` function makes it easy to add enter and exit animations to elements, while `animate` provides a simple way to animate DOM elements with hardware-accelerated transforms.

### Get started

Let's start with the basic HTML structure. Each menu item contains two identical text elements stacked vertically, with the second one hidden initially:

```
<ul class="list">
    <li class="item">
        <span class="text">
            <span class="number-label">01</span>
            Home
        </span>
        <span class="text" aria-hidden>
            <span class="number-label">01</span>
            Home
        </span>
    </li>
    <li class="item">
        <span class="text">
            <span class="number-label">02</span>
            Photos
        </span>
        <span class="text" aria-hidden>
            <span class="number-label">02</span>
            Photos
        </span>
    </li>
    <li class="item">
        <span class="text">
            <span class="number-label">03</span>
            Contact
        </span>
        <span class="text" aria-hidden>
            <span class="number-label">03</span>
            Contact
        </span>
    </li>
</ul>

<script type="module">
</script>

<style>
    /** Copy styles from example source code */
</style>
```

The key to this effect is having two identical text elements inside each item. The second element has `aria-hidden` to keep it accessible since it's purely decorative.

The styles use `overflow: hidden` on the `.item` to clip the text, and set a fixed `height: 32px` to show only one line at a time. The text elements are positioned within this container so they can slide up and down.

### Related examples

* [![Typewriter: Change Content animation example](https://images.motion.dev/examples/js/typewriter-change-content.png)Typewriter: Change Content](https://motion.dev/examples/js-typewriter-change-content)
* [![Typewriter: Exploding Countdown animation example](https://images.motion.dev/examples/js/typewriter-explode.png)Typewriter: Exploding Countdown](https://motion.dev/examples/js-typewriter-explode)
* [![Typewriter: Natural Typing animation example](https://images.motion.dev/examples/js/typewriter-natural-typing.png)Typewriter: Natural Typing](https://motion.dev/examples/js-typewriter-natural-typing)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
