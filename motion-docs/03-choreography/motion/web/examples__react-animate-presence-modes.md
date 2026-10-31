---
source: https://motion.dev/examples/react-animate-presence-modes
title: "AnimatePresence modes example & tutorial for React | Motion"
fetched: 2026-10-28
---

# AnimatePresence modes

An example of the three AnimatePresence modes (sync, wait, and popLayout) demonstrating how elements enter and exit the DOM with Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)24 Sept 2025

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/animate-presence-modes)

## Source code

```
"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

function ModeExample({
    mode,
    icon,
    state,
}: {
    mode: "sync" | "wait" | "popLayout"
    icon: React.ReactNode
    state: boolean
}) {
    const defaultEase = [0.26, 0.02, 0.23, 0.94]
    const motionProps = {
        style: {
            ...baseCircleStyle,
            backgroundColor: state ? "var(--white)" : "transparent",
            color: state ? "var(--black)" : "var(--white)",
            border: state
                ? "2px solid var(--border)"
                : "2px solid var(--white)",
        },
        initial: { opacity: 0, scale: 0.6 },
        animate: {
            opacity: 1,
            scale: 1,
            ease: mode === "wait" ? [0.02, 0.35, 0.25, 0.99] : defaultEase,
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            ease: mode === "wait" ? [0.46, 0.04, 0.97, 0.44] : defaultEase,
        },
        transition: { duration: 0.3 },
    }

    return (
        <div style={modeSection}>
            <div style={iconContainer}>
                <AnimatePresence mode={mode}>
                    <motion.div key={String(state)} {...motionProps}>
                        {icon}
                    </motion.div>
                </AnimatePresence>
            </div>
            <code style={modeTitle}>{mode}</code>
        </div>
    )
}

export default function AnimatePresenceModes() {
    const [state, setState] = useState(true)

    const switchItems = () => {
        setState((prev) => !prev)
    }

    return (
        <div style={container}>
            <div style={modesContainer}>
                <ModeExample mode="sync" icon={<SyncIcon />} state={state} />
                <ModeExample mode="wait" icon={<WaitIcon />} state={state} />
                <ModeExample
                    mode="popLayout"
                    icon={<PopLayoutIcon />}
                    state={state}
                />
            </div>

            <motion.button
                style={button}
                onClick={switchItems}
                whileTap={{ scale: 0.95 }}
            >
                Switch
            </motion.button>
        </div>
    )
}

function SyncIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
        </svg>
    )
}

function WaitIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
        </svg>
    )
}

function PopLayoutIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
            <path d="m21 3-9 9" />
            <path d="M15 3h6v6" />
        </svg>
    )
}

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "40px",
    color: "var(--white)",
    borderRadius: "12px",
}

const modesContainer: React.CSSProperties = {
    display: "flex",
    gap: "60px",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
}

const modeSection: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
}

const iconContainer: React.CSSProperties = {
    width: "80px",
    height: "80px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
}

const modeTitle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "500",
    color: "var(--white)",
    opacity: "0.9",
}

const button: React.CSSProperties = {
    backgroundColor: "var(--white)",
    color: "var(--black)",
    border: "none",
    borderRadius: "8px",
    padding: "12px 32px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    outline: "none",
}

const baseCircleStyle: React.CSSProperties = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    willChange: "transform",
    boxSizing: "border-box",
    flexShrink: 0,
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-animate-presence-modes#tutorial)

Difficulty

### Understanding `AnimatePresence`

When elements enter or leave the DOM in React, they typically just appear or disappear instantly. The [`AnimatePresence`](https://motion.dev/docs/react-animate-presence) component from Motion gives you the power to animate these transitions, and the `mode` prop determines *how* those animations coordinate with each other.

Think of it this way: when you're swapping one element for another, should they animate at the same time? Should one wait for the other? Should the old element get out of the way immediately? Each scenario calls for a different mode.

Let's take a look at each and find out.

#### `sync`: Simultaneous animations

The default mode, `"sync"`, animates elements in and out at the same time. There's no sequencing - as soon as an element is added or removed, its animation begins.

```
<AnimatePresence>
    <motion.div
        key={currentItem}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    />
</AnimatePresence>
```

##### When to use sync mode

* Cross-fade transitions where both elements should be visible simultaneously
* Overlapping elements with `position: absolute` that don't affect each other's layout
* Background images or full-screen transitions
* Any situation where you want both animations happening at once

The catch with `"sync"` is that if your elements occupy the same space in the document flow, you'll see layout conflicts, with elements stacking or jumping. You'll need to handle positioning yourself, typically with `position: absolute`.

#### `wait`: Sequential animations

In `"wait"` mode, the entering element waits until the exiting element has fully animated out before it begins its entrance animation.

```
<AnimatePresence mode="wait">
    <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
    />
</AnimatePresence>
```

##### When to use wait mode

* Multi-step wizards or onboarding flows
* Tab content that should transition one at a time
* Modal or dialog content changes
* Any UI where you want to present information sequentially

A useful pattern with `"wait"` mode is using complementary easing functions. Set `ease: "easeIn"` on the exit animation and `ease: "easeOut"` on the enter animation - this creates an overall `easeInOut` feel across the combined transition.

```
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { ease: "easeOut" } }}
    exit={{ opacity: 0, transition: { ease: "easeIn" } }}
/>
```

Note that `"wait"` mode only supports one child at a time. If you need to animate multiple children, consider `"sync"` or `"popLayout"`.

#### `popLayout`: Instant reflow

The `"popLayout"` mode removes the exiting element from document flow immediately, allowing surrounding elements to reflow while the exit animation plays. The exiting element animates out from its "popped" position.

```
<AnimatePresence mode="popLayout">
    {items.map((item) => (
        <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
        />
    ))}
</AnimatePresence>
```

##### When to use popLayout mode

* Lists where items can be added or removed
* Grid layouts with dynamic content
* Any situation where remaining elements should immediately take their new positions
* Interfaces where responsive reflow matters more than exit animation positioning

The `"popLayout"` mode pairs especially well with the [`layout`](https://motion.dev/docs/react-layout-animations) prop. When you remove an item from a list, the remaining items smoothly animate to their new positions while the removed item fades out in place.

One important detail: when using `"popLayout"`, any custom component that's an immediate child of `AnimatePresence` must be wrapped in React's `forwardRef`, forwarding the ref to the DOM element you want to pop from the layout.

```
const ListItem = forwardRef(function ListItem({ children }, ref) {
    return (
        <motion.li ref={ref} layout exit={{ opacity: 0 }}>
            {children}
        </motion.li>
    )
})
```

### Choosing the right mode

Here's a quick decision guide:

| Scenario | Recommended mode |
| --- | --- |
| Full-screen page transitions | `sync` with absolute positioning |
| Step-by-step wizard | `wait` |
| Tab content switching | `wait` |
| Dynamic list items | `popLayout` with `layout` |
| Image gallery with captions | `sync` for images, `wait` for captions |
| Notification toasts | `popLayout` |

### See it in action

The example above demonstrates all three modes side by side. Click the "Switch" button and observe how each mode handles the transition differently:

* **sync**: Both circles animate simultaneously, briefly overlapping
* **wait**: The old circle exits completely before the new one enters
* **popLayout**: The exiting circle pops out of flow while animating out

Experiment with different animation properties and durations to see how each mode affects the overall feel of your transitions.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
