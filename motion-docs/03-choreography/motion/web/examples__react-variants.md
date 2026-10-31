---
source: https://motion.dev/examples/react-variants
title: "Variants example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Variants

An example of orchestrating animation sequences using Motion for React's variants.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)17 Dec 2024

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/variants)

## Source code

```
"use client"

import type { Variants } from "motion/react"
import { stagger } from "motion/react"
import * as motion from "motion/react-client"
import { useEffect, useRef, useState } from "react"

export default function Variants() {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const { height } = useDimensions(containerRef)

    return (
        <div>
            <div style={container}>
                <motion.nav
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    custom={height}
                    ref={containerRef}
                    style={nav}
                >
                    <motion.div style={background} variants={sidebarVariants} />
                    <Navigation />
                    <MenuToggle toggle={() => setIsOpen(!isOpen)} />
                </motion.nav>
            </div>
        </div>
    )
}

const navVariants = {
    open: {
        transition: { delayChildren: stagger(0.07, { startDelay: 0.2 }) },
    },
    closed: {
        transition: { delayChildren: stagger(0.05, { from: "last" }) },
    },
}

const Navigation = () => (
    <motion.ul style={list} variants={navVariants}>
        {[0, 1, 2, 3, 4].map((i) => (
            <MenuItem i={i} key={i} />
        ))}
    </motion.ul>
)

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
}

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"]

const MenuItem = ({ i }: { i: number }) => {
    const border = `2px solid ${colors[i]}`
    return (
        <motion.li
            style={listItem}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <div style={{ ...iconPlaceholder, border }} />
            <div style={{ ...textPlaceholder, border }} />
        </motion.li>
    )
}

const sidebarVariants: Variants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
}

interface PathProps {
    d?: string
    variants: Variants
    transition?: { duration: number }
}

const Path = (props: PathProps) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
)

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
    <button style={toggleContainer} onClick={toggle}>
        <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                }}
            />
        </svg>
    </button>
)

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flex: 1,
    width: 500,
    maxWidth: "100%",
    height: 400,
    backgroundColor: "var(--accent)",
    borderRadius: 20,
    overflow: "hidden",
}

const nav: React.CSSProperties = {
    width: 300,
}

const background: React.CSSProperties = {
    backgroundColor: "var(--white)",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
}

const toggleContainer: React.CSSProperties = {
    outline: "none",
    border: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    cursor: "pointer",
    position: "absolute",
    top: 18,
    left: 15,
    width: 50,
    height: 50,
    borderRadius: "50%",
    background: "transparent",
}

const list: React.CSSProperties = {
    listStyle: "none",
    padding: 25,
    margin: 0,
    position: "absolute",
    top: 80,
    width: 230,
}

const listItem: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
    listStyle: "none",
    marginBottom: 20,
    cursor: "pointer",
}

const iconPlaceholder: React.CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: "50%",
    flex: "40px 0",
    marginRight: 20,
}

const textPlaceholder: React.CSSProperties = {
    borderRadius: 5,
    width: 200,
    height: 20,
    flex: 1,
}

/**
 * ==============   Utils   ================
 */

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
    const dimensions = useRef({ width: 0, height: 0 })

    useEffect(() => {
        if (ref.current) {
            dimensions.current.width = ref.current.offsetWidth
            dimensions.current.height = ref.current.offsetHeight
        }
    }, [ref])

    return dimensions.current
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-variants#tutorial)

Difficulty

### Introduction

The variants example shows a common UI pattern: a hamburger menu that opens to reveal a navigation list. The animation is orchestrated, with the background, the list items, and the icon itself all animating in a coordinated sequence.

Managing this kind of complex animation manually would be difficult. This is where **variants** come in. In this tutorial, we'll learn how to use the [`variants`](https://motion.dev/docs/react-animation#variants) API to define animation states and automatically propagate them through a tree of motion components.

### Getting started

Let's begin with the basic structure of the menu. This includes the `MenuToggle`, `Navigation`, and `MenuItem` components, with the state to control the open/closed status. For now, it will be a functional but unanimated menu.

```
import { useEffect, useRef, useState } from "react"

export default function Variants() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <div style={container}>
                <nav style={nav}>
                    <div style={background} />
                    <Navigation />
                    <MenuToggle toggle={() => setIsOpen(!isOpen)} />
                </nav>
            </div>
        </div>
    )
}

const Navigation = () => (
    <ul style={list}>
        {[0, 1, 2, 3, 4].map((i) => (
            <MenuItem i={i} key={i} />
        ))}
    </ul>
)

const MenuItem = ({ i }) => {
    return (
        <li style={listItem}>
            <div style={iconPlaceholder} />
            <div style={textPlaceholder} />
        </li>
    )
}

// MenuToggle, Path, styles, and useDimensions hook copied from example
```

### Animating with variants

Variants are visual states with names.

```
const variants = {
    open: { height: "auto" },
    closed: { height: 0 },
}
```

These states can be passed to a `motion` component and then we can provide the names to animation props like `initial` and `animate`:

```
<motion.div variants={variants} initial="closed" animate="open" />
```

What makes variants so powerful is children can also define their own `variants`:

```
const itemVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
}
```

And then these can be controlled via their parent:

```
<motion.ul variants={variants} initial="closed" animate="open">
    <motion.li variants={itemVariants} />
</motion.ul>
```

The real superpower is that the parent can now orchestrate when children animations are performed. Child animations can be played before or after those of the parent. Or using `delayChildren` after a set delay. This delay can also be staggered using the `stagger()` function.

With that in mind, let's see this in action.

#### Step 1: Animating the menu items

Let's start from the inside out. We want each `MenuItem` to fade in and slide up. We can define `itemVariants` for this.

```
const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: { y: { stiffness: 1000, velocity: -100 } },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: { y: { stiffness: 1000 } },
    },
}
```

Now, we can convert our `li` to a `motion.li` and pass it these variants. We also add some `whileHover` and `whileTap` gestures to add some microinteraction animations.

```
const MenuItem = ({ i }) => {
    // ...
    return (
        <motion.li
            style={listItem}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* ... */}
        </motion.li>
    )
}
```

#### Step 2: Orchestrating the list with `stagger`

We don't want the items to appear all at once. Instead, we want them to animate in one by one. We can achieve this on their parent, the `Navigation` component, using the `stagger` function.

The `stagger` function is a powerful tool that generates a dynamic delay for the `delayChildren` transition property, based on the child index.

* For the `open` variant, we'll wait `0.2` seconds before starting, then animate each child with a `0.07s` delay.
* For the `closed` variant, we'll use `{ from: "last" }` to stagger in reverse, making the items disappear from the bottom up.

```
import { stagger } from "motion/react"

const navVariants = {
    open: {
        transition: { delayChildren: stagger(0.07, { startDelay: 0.2 }) },
    },
    closed: {
        transition: { delayChildren: stagger(0.05, { from: "last" }) },
    },
}

const Navigation = () => (
    <motion.ul style={list} variants={navVariants}>
        {/* ... */}
    </motion.ul>
)
```

#### Step 3: Animating the background

The background uses a different technique: a circular reveal created by animating a `clip-path`.

The `sidebarVariants` define a `closed` state with a small circle around the menu icon, and an `open` state with a circle large enough to cover the entire menu.

Notice the `open` variant is a function: `open: (height = 1000) => ({ ... })`. This is a **dynamic variant**. It can receive a value from the parent's `custom` prop. We do this to pass in the measured `height` of the menu, ensuring our circle is always big enough.

```
const sidebarVariants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        // ... transition
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        // ... transition
    },
}
```

#### Step 4: Putting it all together

Finally, we assemble everything in our main component. The top-level `motion.nav` component acts as the orchestra conductor.

* `animate={isOpen ? "open" : "closed"}`: This single prop controls everything. When `isOpen` changes, it tells all children to switch to the new variant state.
* `custom={height}`: This passes the measured height of the container down to any dynamic variants that need it (like our `sidebarVariants`).

Here is the final top-level component:

```
import * as motion from "motion/react-client"
// ...

export default function Variants() {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef(null)
    const { height } = useDimensions(containerRef)

    return (
        <div>
            <div style={container}>
                <motion.nav
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    custom={height}
                    ref={containerRef}
                    style={nav}
                >
                    <motion.div style={background} variants={sidebarVariants} />
                    <Navigation />
                    <MenuToggle toggle={() => setIsOpen(!isOpen)} />
                </motion.nav>
            </div>
        </div>
    )
}
```

### Conclusion

In this tutorial, we learned how variants can simplify complex, orchestrated animations. By defining named animation states, we can control a whole tree of components with a single prop. We also saw how to use the `stagger` function to create beautiful cascading sequences and how to pass data to animations using the `custom` prop and dynamic variants.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
