---
source: https://motion.dev/examples/react-image-reveal-slider
title: "Image reveal slider example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Image reveal slider

An example of creating an interactive image comparison slider with Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)21 Feb 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/image-reveal-slider)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-image-reveal-slider#tutorial)

Difficulty

### Introduction

The Image reveal slider example shows how to create an interactive slider that reveals a color image from its grayscale version. The same basic pattern can be used for comparisons between any two images.

We'll learn how to make this UI both with pointer and keyboard operation.

To do so, we'll use several key Motion APIs:

* The [`motion`](https://motion.dev/docs/react-motion-component) component to create animated elements
* [`useMotionValue`](https://motion.dev/docs/react-motion-value) to track the slider position
* [`useTransform`](https://motion.dev/docs/react-use-transform) to convert position values into visual properties
* The [`drag`](https://motion.dev/docs/react-gestures#drag) prop for interactive dragging
* [`animate`](https://motion.dev/docs/react-use-animate) for triggering the keyboard-driven animations

### Get started

Let's start by creating the basic structure of our component:

```
function ImageRevealSlider({ src = "/images/example-image.jpg", step = 50 }) {
    const containerRef = React.useRef(null)

    return (
        <div ref={containerRef} className="container">
            <div className="image-container">
                <img src={src} alt="Image" className="image" />
                <img
                    src={src}
                    alt="Image in black and white"
                    className="image overlay"
                />
            </div>

            <div className="slider" tabIndex={0}>
                <div className="handle">
                    <LeftRightIcon />
                </div>
            </div>

            <Stylesheet />
        </div>
    )
}

/** Copy icons and styles from example source code */
```

This creates our basic structure with two images - the original color image and a grayscale overlay - plus a slider with a handle that users will interact with.

### Related examples

* [![Add to basket animation example](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/poster.webp)[](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/preview.mp4)Add to basket](https://motion.dev/examples/js-add-to-basket)
* [![Add to basket animation example](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/poster.webp)[](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/preview.mp4)Add to basket](https://motion.dev/examples/react-add-to-basket)
* [![Pointer collision detection animation example](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/poster.webp)[](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/preview.mp4)Pointer collision detection](https://motion.dev/examples/react-collision-hover-grid)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
