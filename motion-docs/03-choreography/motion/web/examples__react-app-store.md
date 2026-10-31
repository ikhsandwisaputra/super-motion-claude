---
source: https://motion.dev/examples/react-app-store
title: "iOS App Store animation in React: live demo and code | Motion"
fetched: 2026-10-28
---

# iOS App Store

An example of animating cards inspired by the iOS App Store using Motion for React's layout animations.

This iOS App Store animation expands a card into a full-screen article. The card and its open view share `layoutId` values, so Motion's layout animations morph the card, image and title between the two states. `AnimatePresence` animates the open view in and out.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)14 Jan 2025

:   React

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/app-store)

>Ship this

## Use this in your own site

This is not just a demo to learn from. Motion+ unlocks the full, production-ready source so you can copy it straight into your own project and ship it.

[Get Motion+](https://motion.dev/plus?referral=UI+section+react-app-store)

>Motion UI

* [Component docs](https://motion.dev/ui/components/expand-card)
* [Composed section](https://motion.dev/ui/sections/react-feature-expand)
* [Bento grids](https://motion.dev/ui/bento-grids)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-app-store#tutorial)

Difficulty

### Introduction

In this tutorial, we'll build an App Store-inspired card animation using Motion for React. This example shows how to create smooth, app-store-style transitions when opening and closing content cards.

We'll learn to use Motion APIs including:

* The [`motion`](https://motion.dev/docs/react-motion-component) component to create animated elements
* [`layoutId`](https://motion.dev/docs/react-layout-animations) for smooth transitions between entirely different components (in this case the menu and the opened item)
* [`AnimatePresence`](https://motion.dev/docs/react-animate-presence) to handle elements entering and exiting the DOM

This technique creates fluid transitions between the card grid and expanded detail views, similar to what you'd see in the iOS App Store.

### Get started

Let's start by creating the basic structure of our App Store example:

```
"use client"

import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useState } from "react"

function AppStore() {
    return (
        <div id="app-store">
            <header>
                <div>
                    <h2 className="store-title">Today</h2>
                </div>
                <div className="avatar">
                    <Image
                        src="/authors/matt-perry.png"
                        alt="Photo of Matt Perry"
                        width={40}
                        height={40}
                    />
                </div>
            </header>
            <StoreFront />
            <StyleSheet />
        </div>
    )
}

function StyleSheet() {
    return (
        <style>{`
      /** Copy styles from example source code */
    `}</style>
    )
}

// Mock data
const items = [
    /** Copy mock data from example source code */
]

export default AppStore
```

### Related examples

* [![Create Button animation example](https://images.motion.dev/examples/previews/vue/create-button/v-a42aa9660c72/poster.webp)[](https://images.motion.dev/examples/previews/vue/create-button/v-a42aa9660c72/preview.mp4)Create Button](https://motion.dev/examples/vue-create-button)
* [![Now playing animation example](https://images.motion.dev/examples/previews/js/now-playing/v-4bb191ceec83/poster.webp)[](https://images.motion.dev/examples/previews/js/now-playing/v-4bb191ceec83/preview.mp4)Now playing](https://motion.dev/examples/js-now-playing)
* [![Layout Anchor animation example](https://images.motion.dev/examples/previews/react/layout-anchor/v-0bca2f10b133/poster.webp)[](https://images.motion.dev/examples/previews/react/layout-anchor/v-0bca2f10b133/preview.mp4)Layout Anchor](https://motion.dev/examples/react-layout-anchor)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
