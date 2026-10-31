---
source: https://motion.dev/examples/js-ios-slider
title: "iOS slider example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# iOS slider

An example of recreating the iOS slider using Motion for JavaScript. This example creates a brightness slider with iOS-like overscroll and springy animations.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)27 Feb 2025

:   JavaScript

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/ios-slider)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-ios-slider#tutorial)

Difficulty

### Introduction

The iOS slider example recreates the polished feel of iOS brightness controls with overscroll physics and springy animations. When you drag past the slider's bounds, it squishes and stretches naturally before snapping back into place. The example also supports keyboard navigation with arrow keys.

This tutorial uses several Motion+ APIs: [`motionValue`](https://motion.dev/docs/motion-value) creates reactive animation values, [`mapValue`](https://motion.dev/docs/map-value) transforms values through input/output ranges, [`transformValue`](https://motion.dev/docs/transform-value) creates computed reactive values, [`styleEffect`](https://motion.dev/docs/style-effect) automatically updates element styles, and [`animate`](https://motion.dev/docs/animate) creates spring animations. We'll also use utility functions like [`mix`](https://motion.dev/docs/mix), `clamp`, and `progress` from Motion.

### Get started

Let's start with the HTML structure and styles for our slider:

```
<div class="container">
    <div class="slider" tabindex="0">
        <div class="indicator"></div>
        <div class="icon-container">
            <!-- Copy sun icon from example source code -->
        </div>
    </div>
</div>

<style>
    /** Copy styles from example source code */
</style>
```

The `.slider` element is our interactive control. Inside it, the `.indicator` fills from bottom to top based on the slider value, and the `.icon-container` holds a sun icon. Notice `touch-action: none` prevents default scrolling behavior during drags, and `will-change: transform` optimizes animations. The focus-visible style provides keyboard accessibility feedback.

### Related examples

* [![Carousel: iOS exposure slider animation example](https://images.motion.dev/examples/previews/vue/carousel-ios-exposure-slider/v-8d5bce13387a/poster.webp)[](https://images.motion.dev/examples/previews/vue/carousel-ios-exposure-slider/v-8d5bce13387a/preview.mp4)Carousel: iOS exposure slider](https://motion.dev/examples/vue-carousel-ios-exposure-slider)
* [![Color picker animation example](https://images.motion.dev/examples/previews/react/color-picker/v-b04efb83db05/poster.webp)[](https://images.motion.dev/examples/previews/react/color-picker/v-b04efb83db05/preview.mp4)Color picker](https://motion.dev/examples/react-color-picker)
* [![Carousel: iOS exposure slider animation example](https://images.motion.dev/examples/previews/react/carousel-ios-exposure-slider/v-eddc4ec5908c/poster.webp)[](https://images.motion.dev/examples/previews/react/carousel-ios-exposure-slider/v-eddc4ec5908c/preview.mp4)Carousel: iOS exposure slider](https://motion.dev/examples/react-carousel-ios-exposure-slider)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
