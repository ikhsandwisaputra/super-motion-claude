---
source: https://motion.dev/examples/js-gestures
title: "Gestures example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Gestures

An example of using Motion's press and hover functions to animate elements as a user presses and hovers over them.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)20 Feb 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/gestures)

## Source code

```
<div class="box"></div>

<script type="module">
    import { animate, press, hover } from "motion"

    const gestureState = new WeakMap()

    const transition = { type: "spring", stiffness: 500, damping: 25 }

    const initialState = {
        isHovered: false,
        isPressed: false,
    }

    function setGesture(element, update) {
        const state = gestureState.get(element) || { ...initialState }
        const newState = { ...state, ...update }
        gestureState.set(element, newState)

        let scale = 1
        if (newState.isPressed) {
            scale = 0.8
        } else if (newState.isHovered) {
            scale = 1.2
        }

        animate(element, { scale }, transition)
    }

    hover(".box", (element) => {
        setGesture(element, { isHovered: true })
        return () => setGesture(element, { isHovered: false })
    })

    press(".box", (element) => {
        setGesture(element, { isPressed: true })
        return () => setGesture(element, { isPressed: false })
    })
</script>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: var(--hue-2);
        border-radius: 10px;
        cursor: pointer;
    }

    .box:focus-visible {
        outline: 2px solid var(--hue-6);
        outline-offset: 2px;
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-gestures#tutorial)

Difficulty

### Introduction

The Gesture example demonstrates how to create animations triggered by user input.

We'll be using three Motion APIs:

* [`hover`](https://motion.dev/docs/hover) - Detects when a user hovers over an element
* [`press`](https://motion.dev/docs/press) - Detects when a user presses an element
* [`animate`](https://motion.dev/docs/animate) - Animates an element's styles

#### Why use `hover` and `press`?

Motion's `hover` and `press` functions provide several advantages over
traditional event listeners:

##### Simple API

Both functions automatically handle attaching and cleaning up event listeners. They also support CSS selectors to add gestures to multiple elements at once.

```
hover(".box", (element) => {
    animate(element, { scale: 1.2 })

    return () => animate(element, { scale: 1 })
})
```

##### Pointer filtering

Normal pointer events fire for all pointers, whereas `hover` will filter out touch events and `pointer` will filter out secondary pointers (right-click, secondary touch, etc.).

##### Keyboard accessibility

When `press` is attached to an element, it will automatically become keyboard accessible. This means it can receive focus, and be pressed via the enter key. This ensures that keyboard users get the same great experience as pointer users.

### Get started

Let's start by creating a simple box element that we'll animate:

```
<div class="box"></div>

<script type="module">
    // We'll add our Motion code here
</script>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: #dd00ee;
        border-radius: 10px;
        cursor: pointer;
    }

    .box:focus-visible {
        outline: 2px solid #8df0cc;
        outline-offset: 2px;
    }
</style>
```

### Let's animate!

#### Import from Motion

First, we need to import the functions we'll use from Motion:

```
import { animate, press, hover } from "motion"
```

#### Basic functionality

In this example we're combining both `hover` and `press` gestures on the same element. To ensure we always animate to the correct state, we need a way to track the current gesture state for both.

Let's create an `initialState` object that contains the initial state for each gesture:

```
const initialState = {
    isHovered: false,
    isPressed: false,
}
```

We can use a `WeakMap` to store the state for each element:

```
const gestureState = new WeakMap()
```

A `WeakMap` is perfect for this use case because it allows us to associate data with DOM elements without preventing those elements from being [garbage collected](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management) if they're removed from the page.

Next, we'll create a function that updates an element's state:

```
function setGesture(element, update) {
    const state = gestureState.get(element) || { ...initialState }
    const newState = { ...state, ...update }
    gestureState.set(element, newState)
}
```

This function can be called with an element and an update object to update the state for that element:

```
setGesture(element, { isHovered: true })
```

So let's add our gesture handlers to do this as the hover and press gestures start and end:

```
hover(".box", (element) => {
    setGesture(element, { isHovered: true })
    return () => setGesture(element, { isHovered: false })
})

press(".box", (element) => {
    setGesture(element, { isPressed: true })
    return () => setGesture(element, { isPressed: false })
})
```

#### Animations

Now that we have our state functionality in place, let's add the animation. We'll update our `setGesture` function to animate an element based on its current state:

```
const transition = { type: "spring", stiffness: 500, damping: 25 }

function setGesture(element, update) {
    const state = gestureState.get(element) || { ...initialState }
    const newState = { ...state, ...update }
    gestureState.set(element, newState)

    let scale = 1
    if (newState.isPressed) {
        scale = 0.8
    } else if (newState.isHovered) {
        scale = 1.2
    }

    animate(element, { scale }, transition)
}
```

This animation logic works as follows:

* If the element is pressed, scale it down to 0.8
* If the element is hovered (but not pressed), scale it up to 1.2
* Otherwise, keep it at its original size (scale 1)

This ensures that if an element stops being pressed, it will animate correctly either to its hovered state or its default state, depending on what the user is doing.

### Conclusion

In this tutorial, we learned how to:

* Use Motion's `hover` and `press` functions to detect user gestures.
* Manage state for elements with multiple gestures using a `WeakMap`.
* Create smooth animations that respond to user interaction with the `animate` function.

This pattern is a good (if simplified) representation of how Motion for React's [`motion` component](https://motion.dev/docs/react-motion-component) internally handles gesture state.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
