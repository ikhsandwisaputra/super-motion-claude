---
source: https://motion.dev/examples/js-multi-state-badge
title: "Multi state badge example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Multi state badge

A badge that can be in multiple states, such as processing, success, or error.

![](https://images.motion.dev/magazine/gWduAyVJxJQuFnLveoXQHnbdTmE.png)[BKMN](https://bakemono.space)12 Mar 2025

:   JavaScript

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/multi-state-badge)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-multi-state-badge#tutorial)

Difficulty

### Introduction

The Multi state badge example shows how to build a dynamic badge component that transitions smoothly between four different states: idle, processing, success, and error. Each state has its own icon, label, and custom animations that bring the badge to life.

This tutorial uses several APIs from Motion: the [`animate()`](https://motion.dev/docs/animate) function for creating smooth animations with spring physics and timing controls, the [`press()`](https://motion.dev/docs/press) function for handling user interactions, the [`motionValue()`](https://motion.dev/docs/motion-value) function for reactive animation values, and the [`transform()`](https://motion.dev/docs/transform) utility for mapping values between ranges.

### Get started

Create a button with a badge container that will hold our dynamic content:

```
<div class="container">
    <button id="badge">
        <div class="badge">
            <div class="icon-container"></div>
            <div class="label-container">
                <div class="label-measure"></div>
                <div class="label"></div>
            </div>
        </div>
    </button>
</div>

<style>
    /** Copy styles from example source code */
</style>

<script>
    // We'll add our logic here
</script>
```

The structure uses separate containers for the icon and label to enable independent animations. The `.label-measure` element is a hidden element used to calculate the width of text before animating - this ensures smooth width transitions regardless of the label length.

### Related examples

* [![Confetti animation example](https://images.motion.dev/examples/previews/vue/confetti/v-18ff6ce2bce5/poster.webp)[](https://images.motion.dev/examples/previews/vue/confetti/v-18ff6ce2bce5/preview.mp4)Confetti](https://motion.dev/examples/vue-confetti)
* [![Copy Button animation example](https://images.motion.dev/examples/previews/vue/copy-button/v-da9d659365b8/poster.webp)[](https://images.motion.dev/examples/previews/vue/copy-button/v-da9d659365b8/preview.mp4)Copy Button](https://motion.dev/examples/vue-copy-button)
* [![Dots Morph Button animation example](https://images.motion.dev/examples/previews/vue/dots-morph-button/v-26eae183fb98/poster.webp)[](https://images.motion.dev/examples/previews/vue/dots-morph-button/v-26eae183fb98/preview.mp4)Dots Morph Button](https://motion.dev/examples/vue-dots-morph-button)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
