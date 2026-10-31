---
source: https://motion.dev/examples/react-infinite-loading
title: "Infinite loading example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Infinite loading

An example of creating an infinite loading list with staggered animations in Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)28 Jul 2025

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/infinite-loading)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-infinite-loading#tutorial)

Difficulty

### Introduction

The Infinite Loading example shows how to create a news feed that automatically loads more content when the user scrolls to the end of the list, with staggered animations for incoming items.

It uses the [`stagger`](https://motion.dev/docs/stagger) function within [`variants`](https://motion.dev/docs/react-animation#variants) to create the enter animations, and the [`motion`](https://motion.dev/docs/react-motion-component) component for scroll-triggered loading.

### Get started

Let's start by creating the basic structure and fake data for our news feed.

```
"use client"

import { useState } from "react"

export default function InfiniteLoading() {
    const [items, fetchMoreItems] = useFakeNews()

    return (
        <div className="container">
            <header>
                <h1 className="h1">News</h1>
                <p className="big">The latest news from the world of Motion</p>
            </header>

            <main className="news-list">
                {items.map((item, index) => (
                    <NewsItem
                        key={`${item.headline}-${index}`}
                        headline={item.headline}
                        subtitle={item.subtitle}
                    />
                ))}
            </main>

            <LoadingSpinner key={items.length} onInView={fetchMoreItems} />
        </div>
    )
}

function NewsItem({ headline, subtitle }) {
    return (
        <article className="news-item">
            <h3 className="h3">{headline}</h3>
            <p className="small">{subtitle}</p>
        </article>
    )
}

function LoadingSpinner({ onInView }) {
    return (
        <div className="loading-spinner">
            <div className="spinner" />
        </div>
    )
}

/**
 * ==============   Utils & Data   ================
 */

/**
 * ==============   Styles   ================
 */

// Copy these sections from the example Source tab
```

### Related examples

* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Reorder grid animation example](https://images.motion.dev/examples/previews/vue/reorder-grid/v-223b30f1f488/poster.webp)[](https://images.motion.dev/examples/previews/vue/reorder-grid/v-223b30f1f488/preview.mp4)Reorder grid](https://motion.dev/examples/vue-reorder-grid)
* [![Multidimensional reorder animation example](https://images.motion.dev/examples/previews/react/reorder-grid/v-6218a2888c89/poster.webp)[](https://images.motion.dev/examples/previews/react/reorder-grid/v-6218a2888c89/preview.mp4)Multidimensional reorder](https://motion.dev/examples/react-reorder-grid)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
