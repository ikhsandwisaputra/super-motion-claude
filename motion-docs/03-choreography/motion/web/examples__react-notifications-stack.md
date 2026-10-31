---
source: https://motion.dev/examples/react-notifications-stack
title: "iOS Notifications stack example & tutorial for React | Motion"
fetched: 2026-10-28
---

# iOS Notifications stack

A iOS inspired notifications stack using Motion for React's variants.

![](https://images.motion.dev/magazine/gWduAyVJxJQuFnLveoXQHnbdTmE.png)[BKMN](https://bakemono.space)7 Jan 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/notifications-stack)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-notifications-stack#tutorial)

Difficulty

### Introduction

The iOS Notifications Stack example shows how to create an expandable stack of notification cards with smooth spring animations. When collapsed, the notifications are stacked on top of each other with a subtle scaling effect. When expanded, they spread out for better visibility, with a header appearing at the top.

In this tutorial, we'll learn to use several Motion for React APIs to create this effect:

* [Variants](https://motion.dev/docs/react-animation#variants) to define animation states
* [Motion components](https://motion.dev/docs/react-motion-component) to animate DOM elements

### Get started

Let's begin by setting up the basic structure and some constants for our notifications stack:

```
"use client"

import { CSSProperties, useState } from "react"

const N_NOTIFICATIONS = 3
const NOTIFICATION_HEIGHT = 60
const NOTIFICATION_WIDTH = 280
const NOTIFICATION_GAP = 8

export default function NotificationsStack() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div style={stackStyle}>
            <Header isOpen={isOpen} onClose={() => setIsOpen(false)} />

            {Array.from({ length: N_NOTIFICATIONS }).map((_, i) => (
                <Notification
                    key={i}
                    index={i}
                    onClick={() => {
                        setIsOpen((open) => !open)
                    }}
                />
            ))}
        </div>
    )
}

const Header = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) => {
    return (
        <div style={headerStyle}>
            <h2 style={headerTitleStyle}>Notifications</h2>
            <button style={headerCloseStyle} onClick={onClose}>
                Collapse
            </button>
        </div>
    )
}

const Notification = ({
    index,
    onClick,
}: {
    index: number
    onClick: () => void
}) => {
    const notificationStyle = getNotificationStyle(index)

    return <div style={notificationStyle} onClick={onClick} />
}

/**
 * ==============   Styles   ================
 */
const stackStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: NOTIFICATION_GAP,
}

const headerStyle: CSSProperties = {
    position: "absolute",
    top: -40,
    left: 0,
    height: 28,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transformOrigin: "bottom center",
    pointerEvents: "none",
}

const headerTitleStyle: CSSProperties = {
    fontSize: 18,
    lineHeight: 1,
    marginLeft: 8,
}

const headerCloseStyle: CSSProperties = {
    fontSize: 14,
    lineHeight: 1,
    marginRight: 8,
    backgroundColor: "#1f1f1f",
    padding: "4px 12px",
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    cursor: "pointer",
    pointerEvents: "auto",
    userSelect: "none",
}

/**
 * ==============   Utils   ================
 */
function getNotificationStyle(index: number): CSSProperties {
    return {
        height: NOTIFICATION_HEIGHT,
        width: NOTIFICATION_WIDTH,
        backgroundColor: `#ffffff`,
        borderRadius: 16,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: N_NOTIFICATIONS - index,
        userSelect: "none",
    }
}
```

This code creates the basic structure of our component:

1. A parent component `NotificationsStack` that manages the open/closed state
2. A `Header` component that appears when the stack is expanded
3. Multiple `Notification` components that will be animated

### Related examples

* [![Add to basket animation example](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/poster.webp)[](https://images.motion.dev/examples/previews/js/add-to-basket/v-8f93cb3ecd5d/preview.mp4)Add to basket](https://motion.dev/examples/js-add-to-basket)
* [![Add to basket animation example](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/poster.webp)[](https://images.motion.dev/examples/previews/react/add-to-basket/v-c72b35c77f6c/preview.mp4)Add to basket](https://motion.dev/examples/react-add-to-basket)
* [![Pointer collision detection animation example](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/poster.webp)[](https://images.motion.dev/examples/previews/react/collision-hover-grid/v-2c40c845a432/preview.mp4)Pointer collision detection](https://motion.dev/examples/react-collision-hover-grid)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
