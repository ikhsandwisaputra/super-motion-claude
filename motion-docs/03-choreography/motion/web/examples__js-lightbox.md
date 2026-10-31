---
source: https://motion.dev/examples/js-lightbox
title: "Lightbox example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Lightbox

An example and tutorial for a lightbox shared element transition, using Motion's view function.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)7 Jan 2025

:   JavaScript

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/lightbox)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-lightbox#tutorial)

Difficulty

### Introduction

The Lightbox example shows how to create an image gallery with smooth shared element transitions. When you click an image in the gallery, it expands into a full-screen lightbox overlay with a seamless animation that morphs the thumbnail into the enlarged view.

This example uses [`press`](https://motion.dev/docs/press) from Motion to detect clicks on images, [`animateView`](https://motion.dev/docs/animate-view) to create smooth view transitions between the thumbnail and lightbox states, and [`spring`](https://motion.dev/docs/spring) for natural, physics-based animations.

Compared to traditional JavaScript approaches that require manually calculating positions and animating transforms, Motion's `animateView` function leverages the browser's [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) to automatically handle the complex math of morphing elements between states. This means you can focus on what changes rather than how to animate those changes.

### Get started

Let's start with the basic HTML structure for our image gallery and overlay:

```
<nav>
    <ul class="items-container">
        <li>
            <img src="your-image-1.jpg" alt="Image 1" width="200" height="150" />
        </li>
        <li>
            <img src="your-image-2.jpg" alt="Image 2" width="150" height="200" />
        </li>
        <li>
            <img src="your-image-3.jpg" alt="Image 3" width="200" height="150" />
        </li>
        <li>
            <img src="your-image-4.jpg" alt="Image 4" width="200" height="150" />
        </li>
        <li>
            <img src="your-image-5.jpg" alt="Image 5" width="150" height="200" />
        </li>
        <li>
            <img src="your-image-6.jpg" alt="Image 6" width="200" height="150" />
        </li>
    </ul>
</nav>

<div id="overlay">
    <img src="" alt="" />
</div>

<style>
    /** Copy styles from example source code */
</style>
```

We have a grid of thumbnail images and a hidden overlay that will contain the enlarged image. The overlay is positioned to cover the entire viewport with a semi-transparent black background.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
