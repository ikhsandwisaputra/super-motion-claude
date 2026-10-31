---
source: https://motion.dev/examples/react-accordion
title: "Accordion example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Accordion

An example of an accordion component using Motion for React. Animate accordion content using height: auto and accessible markup. Uses focus events and shared layout animations for keyboard accessibility.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)20 Jan 2025

:   React

:   [MotionScoreC](https://score.motion.dev/methodology "This example has a MotionScore of C, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/react/accordion)

## Source code

```
"use client"

import { motion, MotionConfig } from "motion/react"
import { PropsWithChildren, useId, useState } from "react"

function Item({ header, children }: PropsWithChildren<{ header: string }>) {
    const [isOpen, setIsOpen] = useState(false)
    const [hasFocus, setHasFocus] = useState(false)
    const id = useId()

    return (
        <MotionConfig transition={{ duration: 0.3 }}>
            <motion.section
                initial={false}
                animate={isOpen ? "open" : "closed"}
            >
                <h3>
                    <motion.button
                        id={id + "-button"}
                        aria-expanded={isOpen}
                        aria-controls={id}
                        onClick={() => setIsOpen(!isOpen)}
                        onFocus={onlyKeyboardFocus(() => setHasFocus(true))}
                        onBlur={() => setHasFocus(false)}
                    >
                        <span>{header}</span> <ChevronDownIcon />
                        {hasFocus && (
                            <motion.div
                                layoutId="focus-ring"
                                className="focus-ring"
                            />
                        )}
                    </motion.button>
                </h3>
                <motion.div
                    variants={{
                        open: {
                            height: "auto",
                            maskImage:
                                "linear-gradient(to bottom, black 100%, transparent 100%)",
                        },
                        closed: {
                            height: 0,
                            maskImage:
                                "linear-gradient(to bottom, black 50%, transparent 100%)",
                        },
                    }}
                    id={id}
                    aria-labelledby={id + "-button"}
                    className="accordion-content"
                >
                    <motion.div
                        variants={{
                            open: {
                                filter: "blur(0px)",
                                opacity: 1,
                            },
                            closed: {
                                filter: "blur(2px)",
                                opacity: 0,
                            },
                        }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
                <hr />
            </motion.section>
        </MotionConfig>
    )
}

export default function Accordion() {
    return (
        <>
            <div className="accordion">
                <Item header="What is Motion+?">
                    <p>
                        Motion+ is a one-time fee, lifetime access membership
                        that unlocks the source code for all Motion examples,
                        early access features, Motion UI components, and an
                        exclusive Discord community.
                    </p>
                </Item>
                <Item header={`What does "lifetime access" mean?`}>
                    <p>
                        Just that! No one needs another subscription in their
                        life.
                    </p>
                    <p>
                        {`Lifetime access means you'll receive all updates to Motion+ as they're released.`}
                    </p>
                </Item>
                <Item header="How does the team package work?">
                    <p>
                        After purchase, you can nominate up to 10 team members
                        to join Motion+.
                    </p>
                </Item>
            </div>
            <StyleSheet />
        </>
    )
}

/**
 * ==============   Icons   ================
 */
function ChevronDownIcon() {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
            }}
        >
            <path d="m6 9 6 6 6-6" />
        </motion.svg>
    )
}

/**
 * ==============   Utils   ================
 */
function onlyKeyboardFocus(callback: () => void) {
    return (e: React.FocusEvent<HTMLButtonElement>) => {
        if (e.type === "focus" && e.target.matches(":focus-visible")) {
            callback()
        }
    }
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
    return (
        <style>{`
        .accordion {
            display: flex;
            flex-direction: column;
            margin: 20px;
            background: var(--layer);
            border: 1px solid var(--border);
            border-radius: 10px;
            min-width: 300px;
            max-width: 500px;
        }

        .accordion section {
            padding: 20px;
            position: relative;
        }

        .accordion h3 {
            margin: 0;
            display: flex;
        }

        .accordion hr {
            margin: 0;
            border: 0;
            border-bottom: 1px solid var(--border);
            position: absolute;
            bottom: 0;
            left: 20px;
            right: 20px;
            z-index: 0;
        }

        .accordion section:last-child hr {
            display: none;
        }

        .accordion h3 button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1;
            position: relative;
        }

        .accordion h3 span,
        .accordion h3 svg {
            text-align: left;
            z-index: 1;
            position: relative;
        }

        .accordion .focus-ring {
            position: absolute;
            inset: -10px;
            background: var(--hue-4-transparent);
            border-radius: 5px;
            z-index: 0;
        }

        .accordion-content {
            overflow: hidden;
        }

        .accordion-content > div {
            padding: 20px 0 0;
        }

        .accordion-content p {
            line-height: 1.5;
            padding: 0;
            margin: 0;
        }
    `}</style>
    )
}
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-accordion#tutorial)

Difficulty

### Introduction

The Accordion example shows how to build an accessible accordion component with smooth animations. Each item can expand and collapse to reveal content, with animated height transitions and visual effects.

This tutorial uses several Motion APIs: the [`animate` prop](https://motion.dev/docs/react-animation#basic-animations) to control animation states, [`variants`](https://motion.dev/docs/react-animation#variants) to define reusable animation configurations, [`layoutId`](https://motion.dev/docs/react-layout-animations#shared-layout-animations) for the shared focus ring animation, and the [`MotionConfig` component](https://motion.dev/docs/react-motion-config) to set default animation options across multiple elements.

Motion makes animating `height: auto` easy, which is normally difficult with CSS alone. The example also demonstrates how to combine multiple animated properties like `height`, `opacity`, and `filter` to create polished UI transitions.

### Get Started

Let's start with the basic accordion structure. We'll create an `Item` component that displays a header and content:

```
import { useState } from "react"

function Item({ header, children }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <section>
            <h3>
                <button onClick={() => setIsOpen(!isOpen)}>
                    <span>{header}</span> <ChevronDownIcon />
                </button>
            </h3>
            <div className="accordion-content">
                <div>{children}</div>
            </div>
            <hr />
        </section>
    )
}

export default function Accordion() {
    return (
        <div className="accordion">
            <Item header="What is Motion+?">
                <p>
                    Motion+ is a one-time fee, lifetime access membership that
                    unlocks the source code for all Motion examples, early
                    access features, Motion UI components, and an exclusive
                    Discord community.
                </p>
            </Item>
            <Item header={`What does "lifetime access" mean?`}>
                <p>
                    Just that! No one needs another subscription in their life.
                </p>
                <p>
                    {`Lifetime access means you'll receive all updates to Motion+ as they're released.`}
                </p>
            </Item>
            <Item header="How does the team package work?">
                <p>
                    After purchase, you can nominate up to 10 team members to
                    join Motion+.
                </p>
            </Item>
        </div>
    )
}

/** Copy styles and icons from example source code */
```

We're using React's `useState` to track whether each item is open or closed. Clicking the button toggles the `isOpen` state.

### Related examples

* [![Modal dialog animation example](https://images.motion.dev/examples/previews/vue/modal/v-f1fc27d6fbab/poster.webp)[](https://images.motion.dev/examples/previews/vue/modal/v-f1fc27d6fbab/preview.mp4)Modal dialog](https://motion.dev/examples/vue-modal)
* [![Family-style dialog animation example](https://images.motion.dev/examples/previews/vue/family-dialog/v-7a8e7e42c381/poster.webp)[](https://images.motion.dev/examples/previews/vue/family-dialog/v-7a8e7e42c381/preview.mp4)Family-style dialog](https://motion.dev/examples/vue-family-dialog)
* [![Family-style dialog animation example](https://images.motion.dev/examples/previews/js/family-dialog/v-032ee437e7b9/poster.webp)[](https://images.motion.dev/examples/previews/js/family-dialog/v-032ee437e7b9/preview.mp4)Family-style dialog](https://motion.dev/examples/js-family-dialog)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
