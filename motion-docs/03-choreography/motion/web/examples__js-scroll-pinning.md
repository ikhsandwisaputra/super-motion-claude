---
source: https://motion.dev/examples/js-scroll-pinning
title: "Scroll pinning example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Scroll pinning

An example of pinning content on scroll and animating content horizontally using position: sticky and Motion's scroll function.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)2 Jan 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/scroll-pinning)

## Source code

```
<article id="gallery">
    <header>
        <h2>Lines of London</h2>
    </header>
    <section class="img-group-container">
        <div>
            <ul class="img-group">
                <li class="img-container">
                    <img src="/photos/cityscape/1.jpg" />
                    <h3>#001</h3>
                </li>
                <li class="img-container">
                    <img src="/photos/cityscape/2.jpg" />
                    <h3>#002</h3>
                </li>
                <li class="img-container">
                    <img src="/photos/cityscape/3.jpg" />
                    <h3>#003</h3>
                </li>
                <li class="img-container">
                    <img src="/photos/cityscape/4.jpg" />
                    <h3>#004</h3>
                </li>
                <li class="img-container">
                    <img src="/photos/cityscape/5.jpg" />
                    <h3>#005</h3>
                </li>
            </ul>
        </div>
    </section>
    <footer>
        <p>
            Photos by
            <a target="_blank" href="https://twitter.com/mattgperry"
                >Matt Perry</a
            >
        </p>
    </footer>
</article>
<div class="progress"></div>

<script type="module">
    import { animate, scroll } from "motion"

    const items = document.querySelectorAll(".img-container")

    // Animate gallery horizontally during vertical scroll
    scroll(
        animate(".img-group", {
            transform: ["none", `translateX(-${items.length - 1}00vw)`],
        }),
        { target: document.querySelector(".img-group-container") }
    )

    // Progress bar representing gallery scroll
    scroll(animate(".progress", { scaleX: [0, 1] }), {
        target: document.querySelector(".img-group-container"),
    })
</script>

<style>
    #gallery {
        width: 98vw;
    }

    #gallery h3 {
        font-family: "Geist Mono", monospace;
    }

    #gallery header,
    #gallery footer {
        height: 70vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .img-group-container {
        height: 500vh;
        position: relative;
    }

    .img-group-container > div {
        position: sticky;
        top: 0;
        overflow: hidden;
        height: 100vh;
    }

    .img-group {
        display: flex;
    }

    .img-container {
        display: flex;
        width: 100vw;
        height: 100vh;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    #gallery header h2 {
        font-size: 56px;
        font-weight: 700;
        letter-spacing: -3px;
        line-height: 1.2;
        text-align: center;
        margin: 0;
    }

    .img-container h3 {
        margin: 0;
        font-size: 50px;
        font-weight: 700;
        letter-spacing: -3px;
        line-height: 1.2;
        position: relative;
        bottom: 30px;
        display: inline-block;
    }

    .img-container img {
        width: 300px;
        height: 400px;
    }

    .progress {
        position: fixed;
        left: 0;
        right: 0;
        height: 5px;
        background: var(--hue-3);
        bottom: 50px;
        transform: scaleX(0);
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-scroll-pinning#tutorial)

Difficulty

### Introduction

The Scroll pinning example shows how to create a horizontal scrolling gallery that moves as you scroll vertically down the page. The gallery "pins" in place while scrolling, revealing images one by one, and includes a progress bar that fills as you progress through the images.

This example uses the [`scroll`](https://motion.dev/docs/scroll) function from Motion to link scroll position to animations, along with the [`animate`](https://motion.dev/docs/animate) function to define what properties should change. Motion makes it easy to create scroll-linked animations without writing complex scroll event listeners or calculating percentages manually.

### Get started

Let's build a horizontal photo gallery. We'll create the HTML structure with a header, image container, footer, and progress bar:

```
<article id="gallery">
    <section class="img-group-container">
        <div>
            <ul class="img-group">
                <li class="img-container">
                    <img src="your-image-1.jpg" />
                    <h3>#001</h3>
                </li>
                <li class="img-container">
                    <img src="your-image-2.jpg" />
                    <h3>#002</h3>
                </li>
                <li class="img-container">
                    <img src="your-image-3.jpg" />
                    <h3>#003</h3>
                </li>
                <li class="img-container">
                    <img src="your-image-4.jpg" />
                    <h3>#004</h3>
                </li>
                <li class="img-container">
                    <img src="your-image-5.jpg" />
                    <h3>#005</h3>
                </li>
            </ul>
        </div>
    </section>
</article>
<div class="progress"></div>

<script type="module">
    // We'll add our Motion code here
</script>

<style>
    /** Copy styles from example source code */
</style>
```

The structure includes five photo containers arranged in a flexbox list. The key to making this work is the combination of HTML structure and CSS positioning.

### Let's animate!

#### The CSS pinning technique

Before adding Motion animations, we need to understand how scroll pinning works with CSS. The technique uses three key elements working together:

The `.img-group-container` has a large height (`500vh` - five times the viewport height). This creates the scrollable area:

```
.img-group-container {
    height: 500vh;
    position: relative;
}
```

Inside it, a `div` uses `position: sticky` to stay fixed in the viewport while you scroll through the container:

```
.img-group-container > div {
    position: sticky;
    top: 0;
    overflow: hidden;
    height: 100vh;
}
```

The `sticky` positioning means the element stays in place relative to the viewport as long as you're scrolling within the `.img-group-container`. This creates the "pinned" effect - the gallery stays visible while you scroll vertically.

The `.img-group` contains all our images laid out horizontally:

```
.img-group {
    display: flex;
}

.img-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
```

Each image container is exactly one viewport width (`100vw`), so five images side by side create a `500vw` wide row.

#### Import from Motion

Now let's import the Motion functions we need to bring this gallery to life:

```
import { animate, scroll } from "motion"
```

The [`animate`](https://motion.dev/docs/animate) function creates animations, and the [`scroll`](https://motion.dev/docs/scroll) function links those animations to scroll progress.

#### Count the images

First, we need to know how many images we have so we can calculate how far to move the gallery:

```
const items = document.querySelectorAll(".img-container")
```

#### Animate the gallery horizontally

Here's where the magic happens. We'll use the `scroll` function to move the gallery horizontally as the user scrolls vertically:

```
scroll(
    animate(".img-group", {
        transform: ["none", `translateX(-${items.length - 1}00vw)`],
    }),
    { target: document.querySelector(".img-group-container") }
)
```

Let's break this down:

The `scroll` function takes two arguments. The first is an animation created with `animate`. The second is a configuration object that tells Motion which element to track for scroll progress.

The `animate` function targets `.img-group` and animates its `transform` property. The value is an array representing the start and end states: `["none", "translateX(-400vw)"]`.

Why `-400vw`? With five images, we need to move four viewport widths to the left to show all of them. The first image is visible at `0vw`, and by the time we've scrolled to the bottom of the container, we want the last image visible, which means moving `${items.length - 1}00vw` (that's `400vw`) to the left.

The `target` option tells Motion to track scroll progress within the `.img-group-container` element, not the entire page. This means the animation only happens while scrolling through our tall container.

As you scroll down through the `500vh` tall container, Motion smoothly interpolates the horizontal position from `0vw` to `-400vw`, creating the illusion that you're scrolling horizontally.

#### Add the progress bar

Finally, let's add a progress indicator that shows how far through the gallery you've scrolled:

```
scroll(animate(".progress", { scaleX: [0, 1] }), {
    target: document.querySelector(".img-group-container"),
})
```

This works the same way as the gallery animation, but instead of translating position, we're scaling the progress bar from `0` (invisible) to `1` (full width). The bar grows from left to right as you scroll through the gallery.

The progress bar is styled with `transform: scaleX(0)` initially and positioned at the bottom of the screen:

```
.progress {
    position: fixed;
    left: 0;
    right: 0;
    height: 5px;
    background: #9911ff;
    bottom: 50px;
    transform: scaleX(0);
}
```

Both scroll animations use the same `target`, so they stay perfectly synchronized as you scroll.

### Conclusion

We've built a horizontal scrolling gallery controlled by vertical scroll using Motion's `scroll` and `animate` functions. The CSS `position: sticky` technique creates the pinned effect, while Motion handles the smooth animation of the gallery's horizontal position and the progress bar's width. This pattern works great for photo galleries, timelines, or any content you want to reveal gradually as users scroll.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
