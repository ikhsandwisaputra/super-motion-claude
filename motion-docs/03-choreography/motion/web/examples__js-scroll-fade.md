---
source: https://motion.dev/examples/js-scroll-fade
title: "Scroll fade in/out example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Scroll fade in/out

An example of fading content in and out as you scroll using Motion's scroll function.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)2 Jan 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/scroll-fade)

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

    document.querySelectorAll(".img-container > div").forEach((item) => {
        scroll(animate(item, { opacity: [0, 1, 1, 0] }), {
            target: item,
            offset: ["start end", "end end", "start start", "end start"],
        })
    })
</script>

<style>
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
        color: var(--hue-5);
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
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-scroll-fade#tutorial)

Difficulty

### Introduction

The Scroll fade in/out example shows how to create smooth fade animations that respond to scrolling. As you scroll down the page, each image card fades in when it enters the viewport and fades out as it leaves - creating an elegant, gallery-style experience.

This tutorial uses two functions from Motion: the [`scroll`](https://motion.dev/docs/scroll) function, which triggers animations based on scroll position, and the [`animate`](https://motion.dev/docs/animate) function, which handles the opacity transitions.

### Get started

Let's begin with the basic HTML structure. We'll create several image sections that will scroll vertically:

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

<style>
    /** Copy styles from example source code */
</style>

<script type="module">
    // We'll add Motion animations here
</script>
```

Each section takes up the full viewport height (`height: 100vh`), and we're using `scroll-snap-align: start` to create a smooth snapping effect when scrolling. The images are contained within a `div` element, which will be the target of our fade animations.

### Let's animate!

#### Import from Motion

First, import the `animate` and `scroll` functions from Motion:

```
import { animate, scroll } from "motion"
```

#### Add scroll-triggered fade animations

Now we'll select all the image containers and apply fade animations that respond to scrolling. Add this code inside the script tag:

```
document.querySelectorAll(".img-container > div").forEach((item) => {
    scroll(animate(item, { opacity: [0, 1, 1, 0] }), {
        target: item,
        offset: ["start end", "end end", "start start", "end start"],
    })
})
```

Let's break down what's happening here:

We use `querySelectorAll` to select all the `div` elements inside `.img-container` sections. For each one, we're creating a scroll-linked animation by combining the `animate` and `scroll` functions.

The `animate` function creates an opacity animation with four keyframes: `[0, 1, 1, 0]`. This means the element will:

* Start invisible (`0`)
* Fade to fully visible (`1`)
* Stay visible (`1`)
* Fade back to invisible (`0`)

The `scroll` function connects this animation to the page's scroll position. The `target` option tells Motion which element to track - in this case, the same `item` we're animating.

The `offset` option defines when each opacity keyframe should occur during scrolling. It uses four scroll positions that correspond to our four opacity values:

* `"start end"` - When the element's start edge reaches the viewport's end edge (bottom)
* `"end end"` - When the element's end edge reaches the viewport's end edge
* `"start start"` - When the element's start edge reaches the viewport's start edge (top)
* `"end start"` - When the element's end edge reaches the viewport's start edge

This creates a smooth fade-in as the element enters from the bottom, keeps it visible while it's in the viewport, and fades it out as it exits from the top.

The beauty of this approach is that Motion automatically handles all the scroll event listening and animation calculations. As you scroll, each element's opacity smoothly transitions through these four states, creating a polished gallery experience with just a few lines of code.

### Conclusion

We've built a scroll-based gallery with smooth fade animations using Motion's `scroll` and `animate` functions. By combining these two functions, we created an effect where images elegantly fade in and out as you scroll through the page. The `offset` array gives us precise control over when the fade transitions occur, while Motion handles all the performance optimization and smooth interpolation automatically.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
