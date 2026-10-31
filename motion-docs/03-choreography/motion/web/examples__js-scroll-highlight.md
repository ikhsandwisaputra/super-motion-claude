---
source: https://motion.dev/examples/js-scroll-highlight
title: "Scroll highlight example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Scroll highlight

An example of creating a scroll-triggered skill showcase with dynamic highlighting in Motion.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)14 Jul 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/scroll-highlight)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-scroll-highlight#tutorial)

Difficulty

### Introduction

The Scroll highlight example shows how to create a dynamic skill showcase where items highlight as the user scrolls through the page. This creates an elegant reading experience that draws attention to each item as it moves through a specific viewport region.

This tutorial uses the [`inView`](https://motion.dev/docs/inview) function from Motion to detect when elements enter a custom scroll zone, then applies CSS classes to highlight the active item.

### Get started

Let's start with the HTML structure and base styles:

```
<div class="container">
    <h1>Skills</h1>
    <div class="skills-list">
        <div class="skill-item">Branding</div>
        <div class="skill-item">Web Design</div>
        <div class="skill-item">Marketing</div>
        <div class="skill-item">UI/UX Design</div>
        <div class="skill-item">Development</div>
        <div class="skill-item">Motion Design</div>
    </div>
</div>

<style>
    /** Copy styles from example source code */
</style>
```

The key design elements here are the sticky rotated heading that stays fixed while scrolling, and the skill items that start at `30%` opacity. The `.active` class will be applied dynamically to highlight items as they enter the scroll zone.

### Related examples

* [![Scroll Direction: Hide Header animation example](https://images.motion.dev/examples/previews/vue/scroll-hide-header/v-019a67108f8b/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-hide-header/v-019a67108f8b/preview.mp4)Scroll Direction: Hide Header](https://motion.dev/examples/vue-scroll-hide-header)
* [![Scroll Horizontal Gallery animation example](https://images.motion.dev/examples/previews/vue/scroll-horizontal/v-2ba8d5838798/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-horizontal/v-2ba8d5838798/preview.mp4)Scroll Horizontal Gallery](https://motion.dev/examples/vue-scroll-horizontal)
* [![Scroll Text Lines animation example](https://images.motion.dev/examples/previews/vue/scroll-text-lines/v-1fbc03d5ce58/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-text-lines/v-1fbc03d5ce58/preview.mp4)Scroll Text Lines](https://motion.dev/examples/vue-scroll-text-lines)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
