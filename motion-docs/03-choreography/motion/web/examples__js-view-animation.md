---
source: https://motion.dev/examples/js-view-animation
title: "View animation example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# View animation

An example of animating a layout change using the View Transitions API via Motion's simple view function.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)6 Jan 2025

:   JavaScript

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/view-animation)

## Source code

```
<button class="toggle-container">
    <div class="toggle-handle"></div>
</button>

<script type="module">
    // Note: animateView is currently in alpha and importable via the "motion-dom" package
    import { press, animateView } from "motion-dom"
    import { spring } from "motion"

    let isOn = false

    press(".toggle-container", (element) => {
        animateView(
            () => {
                isOn = !isOn

                if (isOn) {
                    element.classList.add("on")
                } else {
                    element.classList.remove("on")
                }
            },
            { type: spring, bounce: 0.3, visualDuration: 0.3 }
        ).add(".toggle-handle")
    })
</script>

<style>
    .toggle-container {
        width: 100px;
        height: 50px;
        background-color: var(--hue-3-transparent);
        border-radius: 50px;
        cursor: pointer;
        display: flex;
        padding: 10px;
        border: none;
        justify-content: flex-start;
    }

    .toggle-container.on {
        justify-content: flex-end;
    }

    .toggle-handle {
        width: 50px;
        height: 50px;
        background-color: var(--hue-3);
        border-radius: 50%;
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-view-animation#tutorial)

Difficulty

### Introduction

The View animation example shows how to animate layout changes using the browser's [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) with Motion's [`animateView`](https://motion.dev/docs/animate-view) function. When you click the toggle, the handle smoothly slides from one side to the other - but instead of manually animating the position, we just change the CSS layout and let `animateView` handle the animation automatically.

This example also uses the [`press`](https://motion.dev/docs/press) gesture from Motion to detect clicks, and the [`spring`](https://motion.dev/docs/spring) easing function to create a bouncy animation.

One of the biggest benefits of using `animateView` over traditional CSS transitions is that it can animate between completely different layouts. With CSS, you'd need to manually animate the `translate` property. With `animateView`, you simply change the layout (like switching from `justify-content: flex-start` to `flex-end`) and Motion figures out the animation for you.

### Get started

Let's start by creating a simple toggle button with a handle inside:

```
<button class="toggle-container">
    <div class="toggle-handle"></div>
</button>

<script type="module">
    let isOn = false
</script>

<style>
    /** Copy styles from example source code */
</style>
```

The button uses flexbox with `justify-content` to position the handle. When we add the `on` class later, the handle will jump to the other side.

Notice the `.toggle-handle` has a special property in the CSS: `view-transition-name: toggle-handle`. This tells the browser which element should be animated when we use the View Transitions API. You can think of it like giving the element an ID for animations.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
