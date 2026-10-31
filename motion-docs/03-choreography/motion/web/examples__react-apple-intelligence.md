---
source: https://motion.dev/examples/react-apple-intelligence
title: "Apple Intelligence animation in React: live demo and code | Motion"
fetched: 2026-10-28
---

# Apple Intelligence ripple

An example of the 'ripple' part of the Apple Intelligence animation using Motion for React. It uses a cloned version of the current content rather than using shaders.

This recreates the ripple from the Apple Intelligence animation without shaders. It clones the screen content, blends the copy over the original, and uses `animate` to scale it and sweep a radial-gradient `maskImage` across the screen.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)Inspired by[Apple](https://apple.com)18 Apr 2025

:   React

:   [MotionScoreC](https://score.motion.dev/methodology "This example has a MotionScore of C, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/apple-intelligence)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-apple-intelligence#tutorial)

Difficulty

### Introduction

The Apple Intelligence Ripple example is an experimental attempt at emulating the ripple animation on iOS, triggered by holding down the iPhone side button.

The original effect is a complex distortion achieved with GPU shaders. This replication, however, uses standard web technologies to create a similar feel. It relies on cloning a UI element and animating CSS properties like `mix-blend-mode`, `filter`, and `mask-image`. While it doesn't achieve the same fidelity as the original, the techniques involved are interesting to explore.

This kind of one-off, complex animation is a great use case for Motion's imperative [`animate`](https://motion.dev/docs/animate) function. It's perfect for animations that aren't tied directly to React state and gives us the control to manually trigger and sequence effects within other logic, like (in this case) cloning a DOM element.

### Get started

Let's begin with the static UI. This includes the iPhone mock, a grid of app icons, and all the necessary layout styles. The entire UI is completely static and unanimated for now.

The core of our animation logic will go into a `useEffect` hook, which we'll leave empty to start.

```
import { useEffect, useRef } from "react"

export default function AppleIntelligence() {
    const appContent = useRef(null)
    const screen = useRef(null)

    useEffect(() => {
        // Our animation logic will go here
    }, [])

    return (
        <div className="iphone-wrapper">
            <div className="iphone-mock">
                <div className="iphone-screen" ref={screen}>
                    <div className="dynamic-island"></div>
                    <div className="app-content" ref={appContent}>
                        <div className="app-grid-container">
                            <AppGrid />
                        </div>
                    </div>
                    <div className="iphone-home-indicator"></div>
                </div>
            </div>
            {/* Copy StyleSheet component from example source code */}
        </div>
    )
}

function AppGrid() {
    return (
        <div className="app-grid">
            {appIcons.map((app, index) => (
                <div className="app-icon" key={index}>
                    <div
                        className="app-icon-inner"
                        style={{ backgroundColor: app.color }}
                    >
                        <app.icon size={32} color="#FFFFFF" strokeWidth={1.5} />
                    </div>
                    <p className="app-label">{app.label}</p>
                </div>
            ))}
        </div>
    )
}

// Copy appIcons data from example source code
```

### Related examples

* [![Particle orb animation example](https://images.motion.dev/examples/react/particle-orb.png)Particle orb](https://motion.dev/examples/react-particle-orb)
* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Color picker animation example](https://images.motion.dev/examples/previews/vue/color-picker/v-e88c4703364b/poster.webp)[](https://images.motion.dev/examples/previews/vue/color-picker/v-e88c4703364b/preview.mp4)Color picker](https://motion.dev/examples/vue-color-picker)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
