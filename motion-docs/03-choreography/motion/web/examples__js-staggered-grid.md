---
source: https://motion.dev/examples/js-staggered-grid
title: "Physical stagger example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Physical stagger

An example of animating elements with a delay staggered by physical distance.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)3 Mar 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/staggered-grid)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-staggered-grid#tutorial)

Difficulty

### Introduction

The Physical stagger example shows how to create animations that stagger based on physical distance rather than index order. Instead of animating grid cells one after another sequentially, each cell animates based on how far it is from a random origin point - creating a ripple effect that spreads outward.

This tutorial uses the [`animate`](https://motion.dev/docs/animate) function from Motion to animate multiple elements with custom delays calculated from their physical positions.

### Get started

Let's start by setting up a grid of cells:

```
<div class="grid-container">
    <div class="grid">
        <!-- Dynamically generate cells -->
    </div>
</div>

<script type="module">

</script>

<style>
    /** Copy styles from example source code */
</style>
```

We've created a container with CSS Grid that will hold 10x10 cells. The `.origin` class will highlight our starting point.

Now let's generate the grid cells with JavaScript:

```
const grid = document.querySelector(".grid")
const gridSize = 10
const totalCells = gridSize * gridSize

for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div")
    cell.className = "cell"
    grid.appendChild(cell)
}

const cells = document.querySelectorAll(".cell")
```

This creates 100 cells and stores them in a `cells` variable we'll use for animation.

Next, let's pick a random cell to be our origin point:

```
const originIndex = Math.floor(Math.random() * totalCells)
const originCell = cells[originIndex]

originCell.classList.add("origin")
```

We'll need a utility function to find the center point of each cell:

```
function getCenter(element) {
    const { x, y, width, height } = element.getBoundingClientRect()
    return { x: x + width / 2, y: y + height / 2 }
}
```

This uses `getBoundingClientRect()` to get the element's position and dimensions, then calculates the center coordinates.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
