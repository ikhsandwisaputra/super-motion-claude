---
source: https://motion.dev/examples/react-split-text
title: "Split text example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Split text

An example of creating a text reveal animation with split text in Motion for React

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)13 Mar 2025

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/split-text)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-split-text#tutorial)

Difficulty

### Introduction

In this tutorial, we'll explore how to create a staggered text animation using the `splitText` utility from [Motion+](https://motion.dev/docs/split-text). This technique breaks text into individual words or characters that can be animated independently, creating elegant text reveal effects.

We'll learn how to use:

* [`splitText`](https://motion.dev/docs/split-text) to separate text into animatable elements
* [`animate`](https://motion.dev/docs/animate) to control the animation of those elements
* [`stagger`](https://motion.dev/docs/stagger) to create sequential timing effects

### Get started

Let's start by setting up our basic component structure:

```
import { useEffect, useRef } from "react"

export default function SplitText() {
    const containerRef = useRef(null)

    return (
        <div className="container" ref={containerRef}>
            <h1 className="h1">
                Level up your animations with the all-in membership
            </h1>
            <Stylesheet />
        </div>
    )
}

/**
 * Copy styles from example source code
 */
```

Note that we're setting `visibility: hidden` on the container. This prevents the text from showing until fonts are downloaded and we're ready to animate it.

### Related examples

* [![Typewriter: Change Content animation example](https://images.motion.dev/examples/js/typewriter-change-content.png)Typewriter: Change Content](https://motion.dev/examples/js-typewriter-change-content)
* [![Typewriter: Exploding Countdown animation example](https://images.motion.dev/examples/js/typewriter-explode.png)Typewriter: Exploding Countdown](https://motion.dev/examples/js-typewriter-explode)
* [![Typewriter: Natural Typing animation example](https://images.motion.dev/examples/js/typewriter-natural-typing.png)Typewriter: Natural Typing](https://motion.dev/examples/js-typewriter-natural-typing)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
