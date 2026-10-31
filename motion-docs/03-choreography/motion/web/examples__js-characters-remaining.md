---
source: https://motion.dev/examples/js-characters-remaining
title: "Characters remaining example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Characters remaining

An example of creating a character counter with spring animations in Motion

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)11 Mar 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/characters-remaining)

## Source code

```
<div class="container">
    <input type="text" id="input" />
    <div>
        <span id="counter">12</span>
    </div>
</div>

<script type="module">
    import { animate, transform } from "motion"

    const maxLength = 12
    const input = document.getElementById("input")
    const counter = document.getElementById("counter")

    // Create transform functions outside the event handler
    const mapRemainingToColor = transform([2, 6], ["#ff008c", "#ccc"])
    const mapRemainingToSpringVelocity = transform([0, 5], [50, 0])

    // Set initial state
    counter.style.willChange = "transform"

    input.addEventListener("input", () => {
        const charactersRemaining = maxLength - input.value.length
        counter.textContent = charactersRemaining
        counter.style.color = mapRemainingToColor(charactersRemaining)

        if (charactersRemaining <= 6) {
            animate(
                "#counter",
                { scale: 1 },
                {
                    type: "spring",
                    velocity: mapRemainingToSpringVelocity(charactersRemaining),
                    stiffness: 700,
                    damping: 80,
                }
            )
        }
    })
</script>

<style>
    .container,
    input {
        position: relative;
        font-size: 32px;
        line-height: 1;
    }

    input {
        background-color: var(--layer);
        color: var(--white);
        border: 2px solid var(--border);
        border-radius: 10px;
        padding: 20px;
        padding-right: 70px;
        width: 300px;
    }

    input:focus {
        border-color: var(--hue-blue);
    }

    .container div {
        color: #ccc;
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            var(--layer) 20%
        );
        position: absolute;
        top: 50%;
        right: 2px;
        transform: translateY(-50%);
        padding: 10px;
        padding-right: 20px;
        padding-left: 50px;
    }

    .container div span {
        display: block;
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-characters-remaining#tutorial)

Difficulty

### Introduction

The Characters remaining example shows how to build an interactive character counter for a text input that provides visual feedback as users approach the character limit. The counter changes color and bounces with spring physics when there are only a few characters left.

This tutorial uses the [`animate`](https://motion.dev/docs/animate) function to trigger spring animations and the [`transform`](https://motion.dev/docs/transform) utility to map values between ranges. Motion makes it easy to create these kinds of responsive, physics-based interactions that feel natural and engaging.

### Get started

Let's start by creating the HTML structure for the input field and character counter:

```
<div class="container">
    <input type="text" id="input" />
    <div>
        <span id="counter">12</span>
    </div>
</div>

<script type="module">
    const maxLength = 12
    const input = document.getElementById("input")
    const counter = document.getElementById("counter")
</script>

<style>
    /** Copy styles from example source code */
</style>
```

The counter sits inside a `div` that's positioned absolutely over the right side of the input. We use a gradient background so the counter text remains readable as you type. The initial counter value is set to `12`, which matches our maximum character limit.

### Let's animate!

#### Import from Motion

First, we'll import the functions we need from Motion:

```
import { animate, transform } from "motion"
```

The `animate` function lets us trigger animations on demand, while `transform` helps us convert values from one range to another.

#### Create transform functions

Before we add the event handler, we'll create two `transform` functions that will map the remaining character count to visual properties:

```
const mapRemainingToColor = transform([2, 6], ["#ff008c", "#ccc"])
const mapRemainingToSpringVelocity = transform([0, 5], [50, 0])
```

The `transform` function takes two arrays - an input range and an output range - and returns a function that maps values between them.

The first transform maps characters remaining from `2` to `6` onto colors from pink (`#ff008c`) to gray (`#ccc`). When there are 6 characters left, the counter will be gray. As you continue typing and only 2 characters remain, it transitions to pink.

The second transform maps characters remaining from `0` to `5` onto spring velocities from `50` to `0`. When you're close to the limit, the bounce will be more energetic. This creates an escalating sense of urgency as the counter approaches zero.

We create these functions outside the event handler for performance - there's no need to recreate them on every keystroke.

#### Add willChange optimization

Before animating, we'll optimize for performance:

```
counter.style.willChange = "transform"
```

Setting `willChange` to `"transform"` tells the browser that we'll be animating this property, allowing it to optimize rendering. This is especially important for animations that run frequently, like our character counter.

#### Update the counter on input

Now we'll add an event listener that updates the counter and triggers animations:

```
input.addEventListener("input", () => {
    const charactersRemaining = maxLength - input.value.length
    counter.textContent = charactersRemaining
    counter.style.color = mapRemainingToColor(charactersRemaining)

    if (charactersRemaining <= 6) {
        animate(
            "#counter",
            { scale: 1 },
            {
                type: "spring",
                velocity: mapRemainingToSpringVelocity(charactersRemaining),
                stiffness: 700,
                damping: 80,
            }
        )
    }
})
```

Every time the user types, we calculate how many characters are remaining and update the counter text. Then we use our `mapRemainingToColor` transform to update the color based on the remaining count.

When there are 6 or fewer characters left, we trigger a spring animation. We're animating to `scale: 1`, which might seem odd since that's the element's default scale. But here's the key: we're specifying a spring velocity using our `mapRemainingToSpringVelocity` transform. This creates a bounce effect even though we're animating to the current state.

Think of it like pulling back a spring and releasing it - even if it ends up in the same position, the journey there creates the bounce. The closer you get to the character limit, the higher the velocity, making the bounce more dramatic.

The spring configuration uses high `stiffness` (`700`) for a snappy bounce and moderate `damping` (`80`) to let it oscillate a bit before settling.

### Conclusion

We've built an interactive character counter that uses Motion's `animate` function and `transform` utility to create engaging visual feedback. The example shows how small touches of animation can make forms feel more alive and responsive. By mapping the remaining character count to both color and spring velocity, we create an intuitive sense of urgency that guides users without being intrusive.

### Related examples

* [![Carousel: iOS exposure slider animation example](https://images.motion.dev/examples/previews/vue/carousel-ios-exposure-slider/v-8d5bce13387a/poster.webp)[](https://images.motion.dev/examples/previews/vue/carousel-ios-exposure-slider/v-8d5bce13387a/preview.mp4)Carousel: iOS exposure slider](https://motion.dev/examples/vue-carousel-ios-exposure-slider)
* [![Color picker animation example](https://images.motion.dev/examples/previews/react/color-picker/v-b04efb83db05/poster.webp)[](https://images.motion.dev/examples/previews/react/color-picker/v-b04efb83db05/preview.mp4)Color picker](https://motion.dev/examples/react-color-picker)
* [![Carousel: iOS exposure slider animation example](https://images.motion.dev/examples/previews/react/carousel-ios-exposure-slider/v-eddc4ec5908c/poster.webp)[](https://images.motion.dev/examples/previews/react/carousel-ios-exposure-slider/v-eddc4ec5908c/preview.mp4)Carousel: iOS exposure slider](https://motion.dev/examples/react-carousel-ios-exposure-slider)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
