---
source: https://motion.dev/examples/js-modal
title: "Modal dialog example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Modal dialog

An example of a modal dialog using Motion and the HTML <dialog /> element. This example demonstrates smooth animations for opening and closing the modal, with a backdrop overlay and click-outside-to-close functionality.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)18 Feb 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/modal)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-modal#tutorial)

Difficulty

### Introduction

The Modal dialog example shows how to create a smooth, interactive modal using Motion and the HTML `<dialog>` element. This example uses the [`animate()`](https://motion.dev/docs/animate) function to orchestrate opening and closing animations, [`hover()`](https://motion.dev/docs/hover) to add scale effects on hover, and [`press()`](https://motion.dev/docs/press) to handle tap interactions. Together, these Motion APIs create a polished modal experience with 3D perspective transforms, backdrop animations, and multiple ways to dismiss the dialog.

### Get started

Let's start by creating the modal structure. We'll use the native HTML `<dialog>` element along with a custom overlay and an open button:

```
<button class="openButton">Open modal</button>

<div class="overlay"></div>
<dialog class="modal">
    <h2 class="title">Confirm</h2>
    <p>Are you sure you want to become a Motion expert?</p>
    <div class="controls">
        <button class="cancel">Cancel</button>
        <button class="save">Expert me</button>
    </div>
    <button class="closeButton" aria-label="Close">
        /** Copy icon from example source code */
    </button>
</dialog>

<script type="module">
    const openButton = document.querySelector(".openButton")
    const modal = document.querySelector(".modal")
    const overlay = document.querySelector(".overlay")
    const closeButton = modal.querySelector(".closeButton")
    const cancelButton = modal.querySelector(".cancel")
    const saveButton = modal.querySelector(".save")
</script>

<style>
    /** Copy styles from example source code */
</style>
```

Note that we're using `transform-style: preserve-3d` on the modal to enable 3D transforms, and we've hidden the default backdrop with `::backdrop { display: none }` so we can animate our custom overlay instead.

### Related examples

* [![Modal dialog animation example](https://images.motion.dev/examples/previews/vue/modal/v-f1fc27d6fbab/poster.webp)[](https://images.motion.dev/examples/previews/vue/modal/v-f1fc27d6fbab/preview.mp4)Modal dialog](https://motion.dev/examples/vue-modal)
* [![Family-style dialog animation example](https://images.motion.dev/examples/previews/vue/family-dialog/v-7a8e7e42c381/poster.webp)[](https://images.motion.dev/examples/previews/vue/family-dialog/v-7a8e7e42c381/preview.mp4)Family-style dialog](https://motion.dev/examples/vue-family-dialog)
* [![Family-style dialog animation example](https://images.motion.dev/examples/previews/js/family-dialog/v-032ee437e7b9/poster.webp)[](https://images.motion.dev/examples/previews/js/family-dialog/v-032ee437e7b9/preview.mp4)Family-style dialog](https://motion.dev/examples/js-family-dialog)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
