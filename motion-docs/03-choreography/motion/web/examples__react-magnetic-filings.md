---
source: https://motion.dev/examples/react-magnetic-filings
title: "Magnetic filings example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Magnetic filings

An example of creating a grid of metal filings that rotate to point towards the cursor position using Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)5 Aug 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/magnetic-filings)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-magnetic-filings#tutorial)

Difficulty

### Introduction

This example shows how to create a grid of metal filings that rotate to point towards the cursor position. Each filing calculates the angle to the cursor and uses spring animations for smooth rotation.

In this tutorial, we'll learn to use the [`usePointerPosition`](https://motion.dev/docs/cursor) hook from Motion+ to track cursor position, and the [`useTransform`](https://motion.dev/docs/react-use-transform) hook to calculate angles between elements.

### Get started

Let's start with a basic template that generates the filings based on a provided grid size.

```
function Filing() {
    return <div className="filing" />
}

export default function MagneticGrid({ size = 16 }) {
    return (
        <div className="container">
            <div
                className="square"
                style={{
                    "--grid-size": size,
                    "--grid-cols": size,
                    "--grid-rows": size,
                }}
            >
                {Array.from({ length: size * size }).map((_, index) => (
                    <Filing key={index} />
                ))}
            </div>

            <StyleSheet />
        </div>
    )
}

// Copy Stylesheet from example source
```

### Related examples

* [![Bobble hover animation example](https://images.motion.dev/examples/previews/react/bobble-hover/v-aca70763c4a9/poster.webp)[](https://images.motion.dev/examples/previews/react/bobble-hover/v-aca70763c4a9/preview.mp4)Bobble hover](https://motion.dev/examples/react-bobble-hover)
* [![Cursor: Floating target animation example](https://images.motion.dev/examples/previews/vue/cursor-floating-target/v-f791718fcc6c/poster.webp)[](https://images.motion.dev/examples/previews/vue/cursor-floating-target/v-f791718fcc6c/preview.mp4)Cursor: Floating target](https://motion.dev/examples/vue-cursor-floating-target)
* [![Cursor: Floating target animation example](https://images.motion.dev/examples/previews/react/cursor-floating-target/v-f00eca12d5d7/poster.webp)[](https://images.motion.dev/examples/previews/react/cursor-floating-target/v-f00eca12d5d7/preview.mp4)Cursor: Floating target](https://motion.dev/examples/react-cursor-floating-target)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
