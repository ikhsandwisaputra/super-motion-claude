---
source: https://motion.dev/examples/js-app-store
title: "iOS App Store example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# iOS App Store

An example of creating a card layout inspired by the iOS App Store with Modal functionality using View Transitions in Motion.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)27 Feb 2025

:   JavaScript

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/app-store)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-app-store#tutorial)

Difficulty

### Introduction

The iOS App Store example recreates the card expand/collapse animation seen in Apple's App Store. When you click a card, it smoothly expands into a full-screen modal with additional content visible. Clicking outside the modal or pressing Escape closes it with the reverse animation.

This tutorial uses the [`animateView`](https://motion.dev/docs/animate-view) function from Motion. This function wraps the browser's native [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API), which handles the complex layout calculations and creates seamless morphing animations between the card's collapsed and expanded states.

### Get started

Let's build the card grid layout with some sample content cards:

```
<div id="app-store">
    <header>
        <div>
            <h2 class="store-title">Today</h2>
        </div>
        <div class="avatar">
            <img
                src="/authors/matt-perry.png"
                alt="Photo of Matt Perry"
                width="40"
                height="40"
            />
        </div>
    </header>
    <ul class="card-list">
        <!-- Card A -->
        <li class="card" data-id="a">
            <div class="card-content">
                <div class="card-image-container">
                    <img
                        class="card-image"
                        src="/photos/app-store/a.jpg"
                        alt=""
                        style="top: -300px"
                    />
                </div>
                <div class="title-container">
                    <span class="h6">Travel</span>
                    <h2 class="h3">5 Inspiring Apps for Your Next Trip</h2>
                </div>
                <div class="content-container small hidden">
                    <p class="big">
                        Love to travel? So do the makers of these five
                        subscription apps. For a small monthly fee, they'll
                        help you find the best deals on flights, hotels, and
                        some other stuff we turn a blind eye to.
                    </p>
                    <p class="big">
                        Plan your perfect itinerary with intelligent
                        recommendations based on your interests, time, and
                        credit history.
                    </p>
                </div>
            </div>
        </li>

        <!-- Card B -->
        <li class="card" data-id="b">
            <div class="card-content">
                <div class="card-image-container">
                    <img
                        class="card-image"
                        src="/photos/app-store/b.jpg"
                        alt=""
                        style="bottom: -100px"
                    />
                </div>
                <div class="title-container">
                    <span class="h6">Hats</span>
                    <h2 class="h3">
                        Take Control of Your Hat Life With This Stunning New App
                    </h2>
                </div>
                <div class="content-container small hidden">
                    <p class="big">
                        Whether you're serious hat enthusiast, or just a
                        filthy casual, this new app revolutionizes how you
                        organize, care for, and expand your hat collection.
                    </p>
                </div>
            </div>
        </li>
    </ul>
</div>

<script>
    // We'll add Motion code here
</script>

<style>
    /** Copy styles from example source code */
</style>
```

Each card has a `data-id` attribute for identification. The `.content-container` elements are initially hidden with the `hidden` class - they'll only appear when a card expands.

### Related examples

* [![Create Button animation example](https://images.motion.dev/examples/previews/vue/create-button/v-a42aa9660c72/poster.webp)[](https://images.motion.dev/examples/previews/vue/create-button/v-a42aa9660c72/preview.mp4)Create Button](https://motion.dev/examples/vue-create-button)
* [![Now playing animation example](https://images.motion.dev/examples/previews/js/now-playing/v-4bb191ceec83/poster.webp)[](https://images.motion.dev/examples/previews/js/now-playing/v-4bb191ceec83/preview.mp4)Now playing](https://motion.dev/examples/js-now-playing)
* [![Layout Anchor animation example](https://images.motion.dev/examples/previews/react/layout-anchor/v-0bca2f10b133/poster.webp)[](https://images.motion.dev/examples/previews/react/layout-anchor/v-0bca2f10b133/preview.mp4)Layout Anchor](https://motion.dev/examples/react-layout-anchor)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
