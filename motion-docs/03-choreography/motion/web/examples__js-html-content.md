---
source: https://motion.dev/examples/js-html-content
title: "HTML content example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# HTML content

An example using Motion to animate HTML content via the Element.innerText property.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)2 Jan 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/html-content)

## Source code

```
<div id="count">0</div>

<script type="module">
    import { animate } from "motion"

    const count = document.getElementById("count")

    animate(0, 100, {
        duration: 2,
        ease: "circOut",
        onUpdate: (latest) => (count.innerHTML = Math.round(latest)),
    })
</script>

<style>
    #count {
        font-family: var(--font-mono);
        font-size: 64px;
        line-height: 1;
        color: var(--hue-6);
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-html-content#tutorial)

Difficulty

### Introduction

The HTML content example shows how to animate any HTML content, not just CSS properties. It uses the [`animate`](https://motion.dev/docs/animate) function from Motion with the `onUpdate` callback to create a counting animation that updates the text content of an element.

This is particularly useful for animating numbers, dynamic text, or any DOM property that isn't a CSS value. Motion handles the smooth interpolation between values, and you control what happens with those values on each frame.

### Get started

Let's start with a simple `<pre>` element that will display our animated number:

```
<pre id="count">0</pre>

<script type="module"></script>

<style>
    #count {
        font-size: 64px;
        color: #8df0cc;
    }
</style>
```

We're using a `<pre>` tag to display the number with monospaced formatting, so when digits change, the width of the character stays the same.

### Let's animate!

#### Import from Motion

First, import the `animate` function from Motion:

```
<script type="module">
    import { animate } from "motion"
</script>
```

#### Get a reference to the element

Before we can animate, we need to get a reference to our count element:

```
<script type="module">
    import { animate } from "motion"

    const count = document.getElementById("count")
</script>
```

#### Animate the number

Now we can use `animate` to smoothly count from `0` to `100`. The key is the `onUpdate` callback, which fires on every frame of the animation:

```
<script type="module">
    import { animate } from "motion"

    const count = document.getElementById("count")

    animate(0, 100, {
        duration: 2,
        ease: "circOut",
        onUpdate: (latest) => (count.innerHTML = Math.round(latest)),
    })
</script>
```

The `animate` function takes three arguments: a start value (`0`), an end value (`100`), and an options object. We're using a `2` second duration and the `"circOut"` easing for a smooth deceleration effect.

The `onUpdate` callback receives the current interpolated value on each frame. We round it to the nearest integer with `Math.round()` and update the element's `innerHTML` to display the current count.

This pattern works for any DOM property you want to animate. You can update any text content or even `data-` attributes.

Motion makes it easy to animate any value over time, and the `onUpdate` callback gives you complete control over what happens with those values. This is especially powerful when you need to animate things that CSS transitions can't handle, like numbers in text or complex state updates.

### Conclusion

We've built a number counter that smoothly animates from `0` to `100` using Motion's `animate` function. By leveraging the `onUpdate` callback, we can update any DOM property or JavaScript value with Motion's smooth interpolation, opening up possibilities far beyond CSS animations.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
