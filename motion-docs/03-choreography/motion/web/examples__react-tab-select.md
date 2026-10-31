---
source: https://motion.dev/examples/react-tab-select
title: "Tab select example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Tab select

An example of using making a tab select component with Motion for React's shared layout animations. Because it uses onTap and whileFocus, it's keyboard-accessible by default. Try tabbing between the options and hitting Enter.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)16 Jan 2025

:   React

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/tab-select)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-tab-select#tutorial)

Difficulty

### Introduction

The Tab Select example shows a common UI pattern: a set of tabs where the selected indicator smoothly animates from the old tab to the new one.

In this example, the selected indicator looks like one element but it's actually several elements, all animating between each other as if there were just one.

This shared element "magic move" effect can be complex to build manually, but Motion makes it simple. In this tutorial, we'll learn to use:

* The [`layoutId`](https://motion.dev/docs/react-layout-animations#shared-layout-animations) prop to create a shared layout animation.
* Gesture props like [`whileTap`](https://motion.dev/docs/react-gestures#tap) and [`whileFocus`](https://motion.dev/docs/react-gestures#focus) to add satisfying micro-interactions.

### Get started

Let's begin with the basic structure of the tabs. We'll use React's `useState` hook to keep track of the currently selected tab and then map over an array of tab names to render the list.

For now, this will be a functional but unanimated component.

```
import { useState } from "react"

const tabs = ["Home", "React", "Vue", "Svelte"]

export default function TabSelect() {
    const [selectedTab, setSelectedTab] = useState(0)

    return (
        <nav className="container">
            <ul>
                {tabs.map((name, index) => {
                    const isSelected = selectedTab === index

                    return (
                        <li
                            key={index}
                            className={isSelected ? "selected" : ""}
                            role="tab"
                            aria-selected={isSelected}
                        >
                            <button onClick={() => setSelectedTab(index)}>
                                {name}
                            </button>
                        </li>
                    )
                })}
            </ul>
            {/* Copy StyleSheet component from example source code */}
        </nav>
    )
}
```

### Related examples

* [![Command Palette animation example](https://images.motion.dev/examples/previews/vue/command-palette/v-63fd67e87de2/poster.webp)[](https://images.motion.dev/examples/previews/vue/command-palette/v-63fd67e87de2/preview.mp4)Command Palette](https://motion.dev/examples/vue-command-palette)
* [![Context Menu animation example](https://images.motion.dev/examples/previews/vue/context-menu/v-e968164f30f2/poster.webp)[](https://images.motion.dev/examples/previews/vue/context-menu/v-e968164f30f2/preview.mp4)Context Menu](https://motion.dev/examples/vue-context-menu)
* [![Floating Action Button animation example](https://images.motion.dev/examples/previews/vue/floating-action-button/v-76e85b513a0e/poster.webp)[](https://images.motion.dev/examples/previews/vue/floating-action-button/v-76e85b513a0e/preview.mp4)Floating Action Button](https://motion.dev/examples/vue-floating-action-button)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
