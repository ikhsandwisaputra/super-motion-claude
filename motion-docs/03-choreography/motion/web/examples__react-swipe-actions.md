---
source: https://motion.dev/examples/react-swipe-actions
title: "Swipe actions example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Swipe actions

iOS-style swipe actions where UI elements and animations respond dynamically to swipe progress. Actions trigger via taps or full swipes (for primary actions). A modern, space-efficient alternative to dropdown menus that keeps actions hidden behind the main item until revealed by a swipe gesture.

![](https://images.motion.dev/magazine/gWduAyVJxJQuFnLveoXQHnbdTmE.png)[BKMN](https://bakemono.space)28 Jan 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/swipe-actions)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-swipe-actions#tutorial)

Difficulty

### Introduction

The Swipe actions example shows how to implement an iOS-style swipe gesture interface where swiping an item left or right reveals contextual actions. This pattern is commonly used in mobile UIs for actions like archive, delete, or flag, providing a space-efficient alternative to having these actions permanently visible.

This tutorial explores several advanced Motion for React APIs:

* [`useMotionValue`](https://motion.dev/docs/react-motion-value) to track the swipe position
* [`useTransform`](https://motion.dev/docs/react-use-transform) to derive styles from the swipe amount
* [`useSpring`](https://motion.dev/docs/react-use-spring) to add realistic physics to the animations
* [`animate`](https://motion.dev/docs/react-use-animate) to manually trigger animations
* [`useMotionValueEvent`](https://motion.dev/docs/react-use-motion-value-event) to trigger events when motion values change

### Get started

Let's start with the basic structure of our component:

```
"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { Archive, Clock9, Flag, MailOpen } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const ITEM_HEIGHT = 80
const ITEM_MAX_WIDTH = 384

const SPRING_OPTIONS = {
    stiffness: 900,
    damping: 80,
}

export default function SwipeActions() {
    const [isSwiping, setIsSwiping] = useState(false)

    const swipeItemRef = useRef(null)
    const swipeItemWidth = useRef(0)
    const swipeStartX = useRef(0)
    const swipeStartOffset = useRef(0)
    const fullSwipeSnapPosition = useRef(null)
    const swipeContainerRef = useRef(null)

    return (
        <div style={styles.outerContainer}>
            <motion.div ref={swipeContainerRef} style={styles.swipeContainer}>
                <div style={styles.swipeItem}>
                    <SwipeItemContent />
                </div>
            </motion.div>
        </div>
    )
}

// We'll define these components later
const SwipeItemContent = () => {
    return (
        <div style={styles.swipeItemContent}>
            <div style={styles.messageContent}>
                <div style={styles.messageHeader}>
                    <div style={styles.messageTitle}>Welcome to Inbox</div>
                    <div style={styles.messageTime}>9:41 AM</div>
                </div>
                <div style={styles.messageText}>
                    Swipe left or right to see available actions
                </div>
            </div>
        </div>
    )
}

/**
 * ==============   Styles   ================
 */
/** Copy styles from example source code */
```

### Related examples

* [![Add to basket animation example](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/poster.webp)[](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/preview.mp4)Add to basket](https://motion.dev/examples/js-add-to-basket)
* [![Add to basket animation example](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/poster.webp)[](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/preview.mp4)Add to basket](https://motion.dev/examples/react-add-to-basket)
* [![Pointer collision detection animation example](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/poster.webp)[](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/preview.mp4)Pointer collision detection](https://motion.dev/examples/react-collision-hover-grid)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
