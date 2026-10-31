---
source: https://motion.dev/examples/react-scroll-hide-header
title: "Scroll Direction: Hide Header example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Scroll Direction: Hide Header

A sticky header that hides when scrolling down and reappears when scrolling up. Uses useMotionValueEvent to detect scroll direction.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)29 Jan 2026

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/scroll-hide-header)

## Source code

```
"use client"

import { motion, useScroll, useMotionValueEvent } from "motion/react"
import { useState } from "react"

export default function ScrollHideHeader() {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)

    useMotionValueEvent(scrollY, "change", (current) => {
        const previous = scrollY.getPrevious() ?? 0
        if (current > previous && current > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

    return (
        <div id="example">
            <motion.header
                className="header"
                animate={{
                    y: hidden ? -140 : 0,
                    opacity: hidden ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="header-content">
                    <div className="logo">
                        <MotionLogo className="logo-icon" />
                    </div>
                    <nav>
                        <a href="#">Docs</a>
                        <a href="#">Examples</a>
                        <a href="#">Blog</a>
                    </nav>
                </div>
            </motion.header>

            <main className="content">
                <section className="hero">
                    <p>Scroll down to hide header.<br />Scroll up to reveal header.</p>
                </section>

                {Array.from({ length: 6 }).map((_, i) => (
                    <section key={i} className="placeholder-section">
                        <MotionLogo
                            className="placeholder-logo"
                        />
                    </section>
                ))}
            </main>

            <StyleSheet />
        </div>
    )
}

function MotionLogo({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1260 454"
            className={className}
            fill="currentColor"
        >
            <path d="M475.753 0L226.8 453.6L0 453.6L194.392 99.4116C224.526 44.5081 299.724 0 362.353 0L475.753 0Z" />
            <path d="M1031.93 113.4C1031.93 50.7709 1082.7 0 1145.33 0C1207.96 0 1258.73 50.7709 1258.73 113.4C1258.73 176.029 1207.96 226.8 1145.33 226.8C1082.7 226.8 1031.93 176.029 1031.93 113.4Z" />
            <path d="M518.278 0L745.078 0L496.125 453.6L269.325 453.6L518.278 0Z" />
            <path d="M786.147 0L1012.95 0L818.555 354.188C788.422 409.092 713.223 453.6 650.594 453.6L537.194 453.6L786.147 0Z" />
        </svg>
    )
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
    return (
        <style>{`
            #example {
                height: auto;
                overflow: visible;
            }

            .header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                padding-top: 80px;
                background: rgba(11, 16, 17, 0.9);
                border-bottom: 1px solid var(--border);
                z-index: 100;
                backdrop-filter: blur(12px);
            }

            .header-content {
                max-width: 900px;
                margin: 0 auto;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 24px;
            }

            .logo {
                display: flex;
                align-items: center;
                color: var(--white);
            }

            .logo-icon {
                height: 18px;
                width: auto;
            }

            nav {
                display: flex;
                gap: 32px;
            }

            nav a {
                color: var(--white);
                text-decoration: none;
                font-size: 14px;
                opacity: 0.6;
                transition: opacity 0.2s;
            }

            nav a:hover {
                opacity: 1;
            }

            .content {
                padding-top: 140px;
            }

            .hero {
                height: 40vh;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 20px;
            }

            .hero p {
                font-size: 16px;
                color: var(--white);
                margin: 0;
            }

            .placeholder-section {
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .placeholder-logo {
                width: clamp(200px, 40vw, 400px);
                height: auto;
                color: var(--white);
                opacity: 0.04;
            }

            @media (max-width: 600px) {
                nav {
                    gap: 20px;
                }

                nav a {
                    font-size: 13px;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .header {
                    transition: none;
                }
            }
        `}</style>
    )
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-scroll-hide-header#tutorial)

Difficulty

### Introduction

The Scroll Direction: Hide Header example shows a sticky header that hides when scrolling down and reveals when scrolling up. This is a common UX pattern that maximizes screen space while keeping navigation accessible.

This tutorial uses three Motion APIs:

* [`useScroll`](https://motion.dev/docs/react-use-scroll) to track the scroll position
* [`useMotionValueEvent`](https://motion.dev/docs/react-use-motion-value-event) to listen for scroll changes and detect direction
* [the `animate` prop](https://motion.dev/docs/react-animation#basic-animations) to smoothly hide and show the header

Motion provides a `scrollY` motion value that updates on every scroll event, making it easy to track scroll direction by comparing the current position to the previous one.

### Get started

Let's start with a fixed header and some scrollable content.

```
"use client"

import { motion } from "motion/react"

export default function ScrollHideHeader() {
    return (
        <div id="example">
            <header className="header">
                <div className="header-content">
                    <div className="logo">Logo</div>
                    <nav>
                        <a href="#">Docs</a>
                        <a href="#">Examples</a>
                        <a href="#">Blog</a>
                    </nav>
                </div>
            </header>

            <main className="content">
                <section className="hero">
                    <p>Scroll down to hide header.<br />Scroll up to reveal header.</p>
                </section>

                {Array.from({ length: 6 }).map((_, i) => (
                    <section key={i} className="placeholder-section">
                        Section {i + 1}
                    </section>
                ))}
            </main>

            <style>{`
                /** Copy styles from example source code */
            `}</style>
        </div>
    )
}
```

The header is positioned with `position: fixed` in CSS, so it stays at the top of the viewport while content scrolls beneath it.

### Let's animate!

#### Import from Motion

We'll need `useScroll` to track scroll position, `useMotionValueEvent` to listen for changes, and `useState` to track whether the header is hidden.

```
import { motion, useScroll, useMotionValueEvent } from "motion/react"
import { useState } from "react"
```

#### Track scroll position

`useScroll` returns a `scrollY` motion value that represents the vertical scroll position in pixels.

```
export default function ScrollHideHeader() {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)

    /** ... */
}
```

#### Detect scroll direction

Now we'll use `useMotionValueEvent` to listen for changes to `scrollY` and determine the scroll direction.

```
export default function ScrollHideHeader() {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)

    useMotionValueEvent(scrollY, "change", (current) => {
        const previous = scrollY.getPrevious() ?? 0
        if (current > previous && current > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

    /** ... */
}
```

The callback receives the current scroll position as an argument. We get the previous position by calling `scrollY.getPrevious()`, which returns the value from the last time `scrollY` updated.

The logic is straightforward: if we're scrolling down (`current > previous`) and we've scrolled past `150` pixels, hide the header. Otherwise, show it. The `150` pixel threshold prevents the header from hiding during small scrolls at the top of the page.

#### Animate the header

Finally, we'll convert the `<header>` to a `motion.header` and use the `animate` prop to smoothly hide and show it based on the `hidden` state.

```
<motion.header
    className="header"
    animate={{
        y: hidden ? -140 : 0,
        opacity: hidden ? 0 : 1,
    }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
>
    <div className="header-content">
        <div className="logo">Logo</div>
        <nav>
            <a href="#">Docs</a>
            <a href="#">Examples</a>
            <a href="#">Blog</a>
        </nav>
    </div>
</motion.header>
```

When `hidden` is `true`, we translate the header up by `-140` pixels (moving it out of view) and fade it to `0` opacity. When `hidden` is `false`, we reset both properties to their default values. The `transition` prop ensures the animation is smooth rather than instant.

### Conclusion

We've built a scroll-responsive header that hides when scrolling down and reveals when scrolling up. This pattern uses `useScroll` to track scroll position, `useMotionValueEvent` to detect direction changes, and the `animate` prop to smoothly animate the header in and out of view. The technique is efficient because motion values update without causing re-renders, and the state change only happens when the scroll direction changes.

### Related examples

* [![Scroll Direction: Hide Header animation example](https://images.motion.dev/examples/previews/vue/scroll-hide-header/v-019a67108f8b/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-hide-header/v-019a67108f8b/preview.mp4)Scroll Direction: Hide Header](https://motion.dev/examples/vue-scroll-hide-header)
* [![Scroll Horizontal Gallery animation example](https://images.motion.dev/examples/previews/vue/scroll-horizontal/v-2ba8d5838798/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-horizontal/v-2ba8d5838798/preview.mp4)Scroll Horizontal Gallery](https://motion.dev/examples/vue-scroll-horizontal)
* [![Scroll Text Lines animation example](https://images.motion.dev/examples/previews/vue/scroll-text-lines/v-1fbc03d5ce58/poster.webp)[](https://images.motion.dev/examples/previews/vue/scroll-text-lines/v-1fbc03d5ce58/preview.mp4)Scroll Text Lines](https://motion.dev/examples/vue-scroll-text-lines)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
