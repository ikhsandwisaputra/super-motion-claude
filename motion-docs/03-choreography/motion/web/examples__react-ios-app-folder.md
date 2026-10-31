---
source: https://motion.dev/examples/react-ios-app-folder
title: "iOS App Folder example & tutorial for React | Motion"
fetched: 2026-10-28
---

# iOS App Folder

An iOS-style app folder that expands to reveal apps inside, using Motion for React's layout animations and AnimatePresence.

![](https://images.motion.dev/magazine/xDqDcHrrA6tDlYqVG3EKsh6Xk1s.jpg)[Yenis Lebzar](https://x.com/dev_ya)Inspired by[Apple](https://apple.com)14 Jan 2026

:   React

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/ios-app-folder)

>Ship this

## Use this in your own site

This is not just a demo to learn from. Motion+ unlocks the full, production-ready source so you can copy it straight into your own project and ship it.

[Get Motion+](https://motion.dev/plus?referral=UI+section+react-ios-app-folder)

>Motion UI

* [Component docs](https://motion.dev/ui/components/expand-card)
* [Composed section](https://motion.dev/ui/sections/react-feature-expand)
* [Bento grids](https://motion.dev/ui/bento-grids)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-ios-app-folder#tutorial)

Difficulty

### Introduction

The iOS App Folder example recreates the familiar iOS folder interaction where tapping a folder expands it to reveal all the apps inside. This example showcases several advanced layout animation techniques from Motion for React, creating a polished, native-feeling experience.

We'll use [`AnimatePresence`](https://motion.dev/docs/react-animate-presence) with `mode="popLayout"` to smoothly transition between the closed and open folder states, the [`layoutId`](https://motion.dev/docs/react-layout-animations#shared-layout-animations) prop to create seamless shared element transitions between the mini-grid and expanded view, [`MotionConfig`](https://motion.dev/docs/react-motion-config) to set a consistent transition for all layout animations, and traditional animation props like `initial`, `animate`, and `exit` for items that don't have `layoutId`.

The example also demonstrates staggered animations where different items animate at different times based on their position, and position measurement techniques using `useLayoutEffect` to calculate where items should animate from.

The clever technique here is combining two animation approaches. Some items (those with `layoutId`) appear in both the mini-grid and expanded view, smoothly morphing between positions. Other items animate in from the center of the mini-grid using scale and position transforms, creating the illusion they're emerging from the folder.

### Get started

Let's start with the basic structure. We'll create a closed folder with a mini-grid preview and an overlay that appears when opened.

```
"use client"

import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { useState } from "react"

function AppTile({ iconSrc, label, layoutId }) {
    return (
        <motion.img
            className="tile"
            src={iconSrc}
            alt={label}
            aria-label={label}
            layoutId={layoutId}
            draggable={false}
        />
    )
}

export default function IosAppFolder({ title = "Creator Studio", items = [] }) {
    const layoutSpring = {
        type: "spring",
        stiffness: 200,
        damping: 22,
        bounce: 0,
    }

    const [isOpen, setIsOpen] = useState(false)

    return (
        <MotionConfig transition={layoutSpring}>
            <div id="example">
                <AnimatePresence mode="popLayout" initial={false}>
                    {!isOpen ? (
                        <motion.div
                            key="closed"
                            className="closed-root"
                            onClick={() => setIsOpen(true)}
                        >
                            <div className="folder-preview">
                                <div className="folder-grid">
                                    {/* Apps will go here */}
                                </div>
                            </div>
                            <div className="folder-name">{title}</div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            className="open-overlay"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="open-folder">
                                <div className="open-title">{title}</div>
                                <div className="open-grid">
                                    {/* Expanded apps will go here */}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Stylesheet />
        </MotionConfig>
    )
}

function Stylesheet() {
    return (
        <style>
            {/** Copy styles from example source code */}
        </style>
    )
}
```

We've wrapped everything in `MotionConfig` with our `layoutSpring` transition. This sets a default transition for all descendant `motion` components, so we don't need to pass `transition` props everywhere. Individual components can still override this default with their own `transition` prop when needed.

We've also set up `AnimatePresence` with `mode="popLayout"`. `AnimatePresence` ensures layout animations complete before the next component mounts, preventing visual glitches when elements share `layoutId` values. `popLayout` literally "pops" exiting elements out of the layout so surrounding items can reflow immediately.

The `key` prop on each state is important. `AnimatePresence` uses it to track which component is entering or exiting.

### Related examples

* [![Create Button animation example](https://images.motion.dev/examples/previews/vue/create-button/v-a42aa9660c72/poster.webp)[](https://images.motion.dev/examples/previews/vue/create-button/v-a42aa9660c72/preview.mp4)Create Button](https://motion.dev/examples/vue-create-button)
* [![Now playing animation example](https://images.motion.dev/examples/previews/js/now-playing/v-4bb191ceec83/poster.webp)[](https://images.motion.dev/examples/previews/js/now-playing/v-4bb191ceec83/preview.mp4)Now playing](https://motion.dev/examples/js-now-playing)
* [![Layout Anchor animation example](https://images.motion.dev/examples/previews/react/layout-anchor/v-0bca2f10b133/poster.webp)[](https://images.motion.dev/examples/previews/react/layout-anchor/v-0bca2f10b133/preview.mp4)Layout Anchor](https://motion.dev/examples/react-layout-anchor)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
