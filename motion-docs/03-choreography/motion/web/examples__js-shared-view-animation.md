---
source: https://motion.dev/examples/js-shared-view-animation
title: "Shared view animation example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Shared view animation

Animate shared elements between states using View Transitions API via Motion's view() function.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)6 Jan 2025

:   JavaScript

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/shared-view-animation)

## Source code

```
<div class="container">
    <nav>
        <ul class="tabs">
            <li class="tab selected" data-tab="tomato">ð Tomato</li>
            <li class="tab" data-tab="lettuce">ð¥¬ Lettuce</li>
            <li class="tab" data-tab="cheese">ð§ Cheese</li>
        </ul>
    </nav>

    <main class="icon-container">
        <div class="icon">ð</div>
    </main>
</div>

<script type="module">
    import { press, animateView } from "motion-dom"
    import { spring } from "motion"

    let selectedName = "tomato"

    const icons = {
        tomato: "ð",
        lettuce: "ð¥¬",
        cheese: "ð§",
    }

    function setTab(tabName) {
        selectedName = tabName

        // Update icon text
        const icon = document.querySelector(".icon")
        icon.textContent = icons[tabName]

        // Remove selected class from current tab
        const selectedTab = document.querySelector(".tab.selected")
        selectedTab.classList.remove("selected")

        // Add selected class to new tab
        const newTab = document.querySelector(`[data-tab="${tabName}"]`)
        newTab.classList.add("selected")
    }

    press(".tab", (element) => {
        const tabName = element.dataset.tab

        if (tabName === selectedName) return

        animateView(() => setTab(tabName), {
            duration: 0.4,
            ease: [0.24, 0.02, 0.13, 1.01],
        })
    })
</script>

<style>
    .container {
        width: 480px;
        height: 60vh;
        max-height: 360px;
        border-radius: 10px;
        background: white;
        overflow: hidden;
        box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075);
        display: flex;
        flex-direction: column;
    }

    .container nav {
        background: #fdfdfd;
        padding: 5px 5px 0;
        border-radius: 10px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom: 1px solid #eeeeee;
        height: 44px;
    }

    .container .tabs {
        list-style: none;
        padding: 0;
        margin: 0;
        font-weight: 500;
        font-size: 14px;
        display: flex;
        width: 100%;
    }

    .container .tab {
        color: var(--black);
        border-radius: 5px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        width: 100%;
        padding: 10px 15px;
        position: relative;
        background: white;
        cursor: pointer;
        height: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        min-width: 0;
        user-select: none;
    }

    .tab.selected {
        background: #eee;
    }

    .tab.selected::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--hue-4);
        view-transition-name: underline;
    }

    .icon-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
    }

    .icon {
        font-size: 128px;
        view-transition-name: icon;
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-shared-view-animation#tutorial)

Difficulty

### Introduction

The Shared view animation example shows how to create smooth animations between different UI states using the browser's View Transitions API through Motion. When clicking between tabs, the icon morphs seamlessly and the underline slides smoothly to the new position.

This example uses [`press`](https://motion.dev/docs/press) from Motion to listen for clicks on the tabs, and [`animateView`](https://motion.dev/docs/animate-view) to animate the DOM changes using the browser's native View Transitions API.

The View Transitions API lets browsers automatically animate elements that share the same `view-transition-name` CSS property. Motion's `animateView` function wraps this API, making it simple to trigger these animations whenever your UI changes.

### Get started

Let's start by creating the basic tab navigation structure:

```
<div class="container">
    <nav>
        <ul class="tabs">
            <li class="tab selected" data-tab="tomato">ð Tomato</li>
            <li class="tab" data-tab="lettuce">ð¥¬ Lettuce</li>
            <li class="tab" data-tab="cheese">ð§ Cheese</li>
        </ul>
    </nav>

    <main class="icon-container">
        <div class="icon">ð</div>
    </main>
</div>

<style>
    /** Copy styles from example source code */
</style>
```

We've created a tab navigation with three tabs. The first tab starts with the `selected` class. Each tab has a `data-tab` attribute that we'll use to identify which tab was clicked. Below the tabs is a large icon that will change based on the selected tab.

### Related examples

* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
* [![Drag: Lock direction animation example](https://images.motion.dev/examples/js/drag-lock-direction.png)Drag: Lock direction](https://motion.dev/examples/js-drag-lock-direction)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag with spring follow animation example](https://images.motion.dev/examples/js/multifollow-pointer-with-spring.png)Drag with spring follow](https://motion.dev/examples/js-multifollow-pointer-with-spring)
* [![Sheet Modal animation example](https://images.motion.dev/examples/js/sheet-modal.png)Sheet Modal](https://motion.dev/examples/js-sheet-modal)
