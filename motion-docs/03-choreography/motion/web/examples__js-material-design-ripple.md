---
source: https://motion.dev/examples/js-material-design-ripple
title: "Material Design: Ripple example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Material Design: Ripple

An example of creating a press ripple with Motion, inspired by Google Material Design.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)16 Aug 2025

:   JavaScript

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/material-design-ripple)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-material-design-ripple#tutorial)

Difficulty

The Material Design Ripple example recreates the touch ripple effect found in Google's Material Design components. The ripple creates visual feedback when users interact with a button, expanding outward from the point of touch.

In this tutorial, we'll use two Motion APIs: [`animate`](https://motion.dev/docs/animate) to create the ripple animations and [`hover`](https://motion.dev/docs/hover) to handle button hover states.

### Get started

Let's start with a simple button and the basic HTML structure we need for the ripple effect.

```
<button class="md-button">
    Click me<span class="ripple-container" aria-hidden></span>
</button>

<script type="module">
    // We'll add our JavaScript here
</script>

<style>
    /** Copy from example source */
</style>
```

The key to our ripple setup is the `.ripple-container` element inside the button. This acts as a clipping mask - any ripples we create will be contained within the button's rounded corners. We use `pointer-events: none` so clicks pass through to the button itself.

### Related examples

* [![Confetti animation example](https://images.motion.dev/examples/previews/vue/confetti/v-18ff6ce2bce5/poster.webp)[](https://images.motion.dev/examples/previews/vue/confetti/v-18ff6ce2bce5/preview.mp4)Confetti](https://motion.dev/examples/vue-confetti)
* [![Copy Button animation example](https://images.motion.dev/examples/previews/vue/copy-button/v-da9d659365b8/poster.webp)[](https://images.motion.dev/examples/previews/vue/copy-button/v-da9d659365b8/preview.mp4)Copy Button](https://motion.dev/examples/vue-copy-button)
* [![Dots Morph Button animation example](https://images.motion.dev/examples/previews/vue/dots-morph-button/v-26eae183fb98/poster.webp)[](https://images.motion.dev/examples/previews/vue/dots-morph-button/v-26eae183fb98/preview.mp4)Dots Morph Button](https://motion.dev/examples/vue-dots-morph-button)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
