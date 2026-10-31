---
source: https://motion.dev/examples/js-notifications-list
title: "Notifications list example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Notifications list

An example of animating a list of animations as they're added and removed, using Motion for JavaScript's animation capabilities. It implements manual FLIP animations so that notifications animate into their new layouts.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)27 Feb 2025

:   JavaScript

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/notifications-list)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-notifications-list#tutorial)

Difficulty

### Introduction

The Notifications list example shows how to build an animated notification system where notifications can be added and removed with smooth animations. When notifications are added or removed, the remaining items animate smoothly into their new positions.

This example uses three key features from Motion:

* The [`animate`](https://motion.dev/docs/animate) function for creating entry and exit animations
* The [`press`](https://motion.dev/docs/press) function for handling button interactions
* Manual FLIP animations to smoothly transition notifications into their new layouts when the list changes

FLIP (First, Last, Invert, Play) is a technique where you measure element positions before and after a DOM change, then animate from the old position to the new one. This creates smooth layout animations that would otherwise feel jarring.

### Get started

Let's start with the basic markup and styles for our notification system:

```
<div id="notifications">
    <ul id="notification-list"></ul>
    <button class="add" id="add-button">Add notification +</button>
</div>

<style>
    /** Copy styles from example source code */
</style>
```

The notification list is positioned at the bottom center of the screen, with `pointer-events: none` on the container so it doesn't block interactions, but `pointer-events: all` on the list items and buttons so they remain interactive.

### Related examples

* [![Add to basket animation example](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/poster.webp)[](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/preview.mp4)Add to basket](https://motion.dev/examples/js-add-to-basket)
* [![Add to basket animation example](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/poster.webp)[](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/preview.mp4)Add to basket](https://motion.dev/examples/react-add-to-basket)
* [![Pointer collision detection animation example](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/poster.webp)[](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/preview.mp4)Pointer collision detection](https://motion.dev/examples/react-collision-hover-grid)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
