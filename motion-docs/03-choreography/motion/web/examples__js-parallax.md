---
source: https://motion.dev/examples/js-parallax
title: "Parallax example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Parallax

An example of creating a parallax effect using Motion's scroll function.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)2 Jan 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/parallax)

## Source code

```
<section class="img-container">
    <div>
        <img src="/photos/cityscape/1.jpg" />
        <h2>#001</h2>
    </div>
</section>
<section class="img-container">
    <div>
        <img src="/photos/cityscape/2.jpg" />
        <h2>#002</h2>
    </div>
</section>
<section class="img-container">
    <div>
        <img src="/photos/cityscape/3.jpg" />
        <h2>#003</h2>
    </div>
</section>
<section class="img-container">
    <div>
        <img src="/photos/cityscape/4.jpg" />
        <h2>#004</h2>
    </div>
</section>
<section class="img-container">
    <div>
        <img src="/photos/cityscape/5.jpg" />
        <h2>#005</h2>
    </div>
</section>
<div class="progress"></div>

<script type="module">
    import { animate, scroll } from "motion"

    // Progress bar representing gallery scroll
    scroll(animate(".progress", { scaleX: [0, 1] }, { ease: "linear" }))

    document.querySelectorAll(".img-container").forEach((section) => {
        const header = section.querySelector("h2")
        scroll(animate(header, { y: [-400, 400] }, { ease: "linear" }), {
            target: header,
        })
    })
</script>

<style>
    html {
        scroll-snap-type: y mandatory;
    }

    .img-container {
        height: 100vh;
        scroll-snap-align: start;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .img-container > div {
        width: 300px;
        height: 400px;
        margin: 20px;
        background: var(--white);
        overflow: hidden;
    }

    .img-container img {
        width: 300px;
        height: 400px;
    }

    .img-container h2 {
        color: var(--accent);
        margin: 0;
        font-family: "Geist Mono", monospace;
        font-size: 50px;
        font-weight: 700;
        letter-spacing: -3px;
        line-height: 1.2;
        position: absolute;
        display: inline-block;
        top: calc(50% - 25px);
        left: calc(50% + 120px);
    }

    .progress {
        position: fixed;
        left: 0;
        right: 0;
        height: 5px;
        background: var(--accent);
        bottom: 50px;
        transform: scaleX(0);
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-parallax#tutorial)

Difficulty

### Introduction

The Parallax example shows how to create smooth scroll-linked animations using Motion. As you scroll through a gallery of images, the numbered labels move at a different speed than the page scroll, creating a classic parallax effect. There's also a progress bar at the bottom that grows as you scroll down the page.

This example uses two key functions from Motion: [`scroll`](https://motion.dev/docs/scroll) for linking animations to scroll progress and [`animate`](https://motion.dev/docs/animate) for defining what should animate.

The `scroll` function makes it easy to create scroll-driven animations without manually tracking scroll events or calculating percentages. Instead of writing event listeners and doing math, Motion handles all the complexity for you.

### Get started

Let's start with the HTML structure for our scrollable gallery. We'll create five image sections and a progress bar:

```
<section class="img-container">
    <div>
        <img src="your-image-1.jpg" />
        <h2>#001</h2>
    </div>
</section>
<section class="img-container">
    <div>
        <img src="your-image-2.jpg" />
        <h2>#002</h2>
    </div>
</section>
<section class="img-container">
    <div>
        <img src="your-image-3.jpg" />
        <h2>#003</h2>
    </div>
</section>
<section class="img-container">
    <div>
        <img src="your-image-4.jpg" />
        <h2>#004</h2>
    </div>
</section>
<section class="img-container">
    <div>
        <img src="your-image-5.jpg" />
        <h2>#005</h2>
    </div>
</section>
<div class="progress"></div>

<script type="module">
    // We'll add our animations here
</script>

<style>
    /** Copy styles from example source code */
</style>
```

Each `.img-container` section is full viewport height (`100vh`) and uses CSS scroll snapping to create a smooth, sectioned scrolling experience. The numbered headers are positioned absolutely to the right of each image.

The progress bar at the bottom starts at `scaleX(0)`, making it invisible until we animate it.

### Let's animate!

#### Import from Motion

First, let's import the functions we need from Motion:

```
import { animate, scroll } from "motion"
```

The `animate` function creates animations, and `scroll` links those animations to scroll progress.

#### Animate the progress bar

Let's start by animating the progress bar. We want it to grow from left to right as the user scrolls down the page:

```
scroll(animate(".progress", { scaleX: [0, 1] }, { ease: "linear" }))
```

Here's what's happening: `animate` creates an animation that scales the progress bar from `0` to `1` on the x-axis. The `{ ease: "linear" }` option ensures the animation progresses at a constant rate rather than easing in or out.

By wrapping this animation with `scroll`, Motion automatically links it to the page's scroll progress. When you're at the top of the page, `scaleX` will be `0`. When you scroll to the bottom, it becomes `1`.

#### Create the parallax effect

Now for the parallax effect on the numbered headers. We want each number to move vertically as its section scrolls into and out of view:

```
document.querySelectorAll(".img-container").forEach((section) => {
    const header = section.querySelector("h2")
    scroll(animate(header, { y: [-400, 400] }, { ease: "linear" }), {
        target: header,
    })
})
```

We loop through each image container and find its header element. Then we create a scroll animation that moves the header from `-400px` to `400px` on the y-axis.

The key difference here is the `{ target: header }` option passed to `scroll`. This tells Motion to link the animation to that specific header's scroll progress rather than the entire page. The animation starts when the header scrolls into view and ends when it scrolls out, creating a localized parallax effect for each section.

As you scroll, each number appears to slide upward through its section at a different rate than the actual scroll speed - that's the parallax illusion.

### Conclusion

We've built a smooth parallax gallery using Motion's `scroll` and `animate` functions. The `scroll` function handles all the complexity of linking animations to scroll position, whether for the entire page or specific elements. This approach is much simpler than manually tracking scroll events and calculating animation values yourself.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
