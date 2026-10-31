---
source: https://motion.dev/examples/js-notifications-stack
title: "Notifications stack example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Notifications stack

A iOS inspired notifications stack using Motion's variants.

![](https://images.motion.dev/magazine/gWduAyVJxJQuFnLveoXQHnbdTmE.png)[BKMN](https://bakemono.space)12 Mar 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/notifications-stack)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-notifications-stack#tutorial)

Difficulty

### Introduction

The Notifications stack example shows an iOS-inspired notification interface that expands and collapses with smooth spring animations. When collapsed, the notifications stack on top of each other with scaling and opacity effects. When opened, they spread apart to reveal all notifications individually.

This example uses two key APIs from Motion: the [`animate`](https://motion.dev/docs/animate) function to create spring-based animations, and the [`press`](https://motion.dev/docs/press) function to handle click interactions. By organizing animation values into variant objects, we can easily animate between different states while keeping the code clean and maintainable.

### Get started

Let's build the basic HTML structure for the notification stack. We need a container for the stack, a header with a title and close button, and three notification cards:

```
<div class="stack">
    <div class="header">
        <h2 class="header-title">Notifications</h2>
        <button class="header-close">Collapse</button>
    </div>
    <div class="notification" style="z-index: 3"></div>
    <div class="notification" style="z-index: 2"></div>
    <div class="notification" style="z-index: 1"></div>
</div>

<script>
    const N_NOTIFICATIONS = 3
    const NOTIFICATION_HEIGHT = 60
    const NOTIFICATION_WIDTH = 280
    const NOTIFICATION_GAP = 8

    // DOM elements
    const stack = document.querySelector(".stack")
    const header = document.querySelector(".header")
    const headerClose = document.querySelector(".header-close")
    const notifications = document.querySelectorAll(".notification")

    // State
    let isOpen = true
</script>

<style>
    /** Copy styles from example source code */
</style>
```

We've set up constants for the notification dimensions and spacing, selected all the DOM elements we'll need to animate, and created an `isOpen` state variable to track whether the stack is expanded or collapsed. The initial styles position the stack in its open state with the header visible above.

### Related examples

* [![Add to basket animation example](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/poster.webp)[](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/preview.mp4)Add to basket](https://motion.dev/examples/js-add-to-basket)
* [![Add to basket animation example](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/poster.webp)[](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/preview.mp4)Add to basket](https://motion.dev/examples/react-add-to-basket)
* [![Pointer collision detection animation example](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/poster.webp)[](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/preview.mp4)Pointer collision detection](https://motion.dev/examples/react-collision-hover-grid)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
