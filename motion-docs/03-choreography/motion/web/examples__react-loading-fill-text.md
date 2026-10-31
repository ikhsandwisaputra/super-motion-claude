---
source: https://motion.dev/examples/react-loading-fill-text
title: "Fill text example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Fill text

An example of creating a text fill loading animation with Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)4 Mar 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/loading-fill-text)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-loading-fill-text#tutorial)

Difficulty

### Introduction

The Fill text example shows how to create a loading animation where text fills from left to right. This uses [`useSpring`](https://motion.dev/docs/react-use-spring) to create smooth progress updates and [`useTransform`](https://motion.dev/docs/react-use-transform) to map progress to a `clip-path` that reveals the text.

The technique stacks two copies of text - a faded background version and a bright version that's progressively revealed.

### Get started

Start with two overlapping text elements:

```
"use client"

function LoadingFillText() {
    return (
        <div className="container">
            <div className="text-container">
                <div className="text text-bg" aria-hidden>
                    Loading
                </div>
                <div className="text text-fill">
                    Loading
                </div>
            </div>
            <StyleSheet />
        </div>
    )
}

function StyleSheet() {
    return (
        <style>
            {`
            .text-container {
                position: relative;
            }

            .text {
                color: var(--hue-1);
                font-weight: 900;
                font-size: 64px;
            }

            .text-bg {
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0.2;
            }

            .text-fill {
                clip-path: inset(0 100% 0 0);
                will-change: clip-path;
            }
            `}
        </style>
    )
}
```

### Related examples

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)

### Latest in React

* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
* [![Particle orb animation example](https://images.motion.dev/examples/react/particle-orb.png)Particle orb](https://motion.dev/examples/react-particle-orb)
* [![Lenis smooth scroll animation example](https://images.motion.dev/examples/previews/react/lenis-smooth-scroll/v-f15ffe4cd090/poster.webp)[](https://images.motion.dev/examples/previews/react/lenis-smooth-scroll/v-f15ffe4cd090/preview.mp4)Lenis smooth scroll](https://motion.dev/examples/react-lenis-smooth-scroll)
* [![Gallery: Showcase animation example](https://images.motion.dev/examples/previews/react/gallery-showcase/v-007b4233230d/poster.webp)[](https://images.motion.dev/examples/previews/react/gallery-showcase/v-007b4233230d/preview.mp4)Gallery: Showcase](https://motion.dev/examples/react-gallery-showcase)
