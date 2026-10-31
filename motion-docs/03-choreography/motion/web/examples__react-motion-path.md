---
source: https://motion.dev/examples/react-motion-path
title: "Motion along a path example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Motion along a path

An example of animating an element along a path using Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)17 Dec 2024

:   React

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/motion-path)

## Source code

```
import { Transition } from "motion/react"
import * as motion from "motion/react-client"

const transition: Transition = {
    duration: 4,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
}

export default function MotionPath() {
    return (
        <div style={{ position: "relative" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="451" height="437">
                <motion.path
                    d="M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5"
                    fill="transparent"
                    strokeWidth="12"
                    stroke="var(--hue-6-transparent)"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={transition}
                />
            </svg>
            <motion.div
                style={box}
                initial={{ offsetDistance: "0%", scale: 2.5 }}
                animate={{ offsetDistance: "100%", scale: 1 }}
                transition={transition}
            />
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

const box: React.CSSProperties = {
    width: 50,
    height: 50,
    backgroundColor: "var(--hue-6)",
    borderRadius: 10,
    position: "absolute",
    top: 0,
    left: 0,
    offsetPath: `path("M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5")`,
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-motion-path#tutorial)

Difficulty

### Introduction

The Motion Path example shows how to animate elements along a pre-defined path using Motion for React.

In this tutorial, we'll learn how to use the [`animate`](https://motion.dev/docs/react-animation#basic-animations) prop to animate both the drawing of an SVG path using Motion's convenient `pathLength` style, and move an element along that same path.

### Get started

Let's start by creating the basic structure of our example:

```
export default function MotionPath() {
    return (
        <div style={{ position: "relative" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="451" height="437">
                {/* Our SVG path will go here */}
            </svg>

            {/* Our moving box will go here */}
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

const box = {
    width: 50,
    height: 50,
    backgroundColor: "#4a9df8",
    borderRadius: 10,
    position: "absolute",
    top: 0,
    left: 0,
}
```

Here we've created a container that holds both an SVG element and will eventually contain our animated box.

### Let's animate!

#### Import from Motion

First, let's import the motion components we need:

```
import * as motion from "motion/react-client"
```

#### Creating the drawing animation

Now, let's define our SVG path and animate it. We'll create a spiral-like path:

```
const transition = { duration: 4, yoyo: Infinity, ease: "easeInOut" }

<svg xmlns="http://www.w3.org/2000/svg" width="451" height="437">
  <motion.path
    d="M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5"
    fill="transparent"
    strokeWidth="12"
    stroke="#4a9df866"
    strokeLinecap="round"
    transition={transition}
  />
</svg>
```

This will render a `path` with a spiral design, and by adding these props:

```
initial={{ pathLength: 0.001 }}
animate={{ pathLength: 1 }}
```

The path will appear to draw in. This `pathLength` property is a special Motion style that makes it easy to create these kind of drawing effects, where `0` is none of the line drawn in, and `1` is the full line.

In this example we've used `0.001` instead of `0`. This is because when setting `0` with this path, in combination with the "rounded" line cap, the browser will render a little circle at the **end** of the line at the start of the animation, which is a little browser quirk we're working around here.

#### Animating along the path

Now, let's add our box element and make it move along the same path:

```
<motion.div
    style={box}
    initial={{ offsetDistance: "0%", scale: 2.5 }}
    animate={{ offsetDistance: "100%", scale: 1 }}
    transition={transition}
/>
```

Here we're animating `offsetDistance`, a [CSS style](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance) that determines how far along the defined `offsetPath` an element will be rendered.

To see this in action, need to update our box styles to include the `offsetPath` property:

```
const box = {
    width: 50,
    height: 50,
    backgroundColor: "#4a9df8",
    borderRadius: 10,
    position: "absolute",
    top: 0,
    left: 0,
    offsetPath: `path("M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5")`,
}
```

This is the same path definition in our drawing animation above. Now this is set, and we're driving `offsetDistance` using `animate`, the element will physically move through this path in tandem with the drawing effect.

[card.css/motion-app

card.cssCard.tsx

```
1.card {2  transition: scale 200ms linear(3    0, 0.009, 0.036, 0.084, 0.157, 0.255, 0.378,4    0.522, 0.679, 0.832, 0.954, 1.029, 1.052, 1.038,5    1.011, 0.99, 0.984, 0.991, 1.001, 1.005, 16  );7}89.card:hover {10  scale: 1.2;11}
```

### Visual editing for your agent.

Edit and preview Motion and CSS transitions live in your code. Tune ease curves, springs, and durations without leaving your editor.

Part of Motion AI Kit. One-time fee, lifetime access.](https://motion.dev/ai-kit)

### Conclusion

In this tutorial, we've learned how to create animations along SVG paths with Motion for React. This technique combines two powerful features:

1. SVG path drawing animation with the `pathLength` property.
2. Element movement along a path using CSS `offsetPath` and `offsetDistance` properties.

By combining these animations with a synchronized transition, we create an animation where a path draws itself while an element travels along it.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
