---
source: https://motion.dev/examples/react-smooth-tabs
title: "Tab animation in React: live demo and code | Motion"
fetched: 2026-10-28
---

# Smooth Tabs

Segmented control with sliding indicator and directional content transitions

This tab animation moves one indicator between tabs with a shared `layoutId`, so Motion animates it with a layout animation. `AnimatePresence` with the `custom` prop slides the old content out and the new content in from the direction of the selected tab.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)20 Jan 2025

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/smooth-tabs)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-smooth-tabs#tutorial)

Difficulty

### Introduction

The Tabs example shows a segmented control UI - a row of tab buttons with a sliding pill indicator that animates between them, and a content panel below that transitions directionally when the active tab changes.

It uses three APIs from Motion:

* [`motion`](https://motion.dev/docs/react-motion-component) to animate the sliding indicator and content panel
* [`AnimatePresence`](https://motion.dev/docs/react-animate-presence) to handle entering and exiting content as tabs change
* [`variants`](https://motion.dev/docs/react-animation#variants) to define directional enter and exit states for the content

### How the sliding indicator works

The indicator is a `motion.div` that sits behind each tab button as an absolute-positioned background. When the active tab changes, the old indicator unmounts and a new one mounts inside the newly active button.

The key is [`layoutId`](https://motion.dev/docs/react-layout-animations#shared-layout-animations). When two `motion` elements share the same `layoutId`, Motion treats them as the same element across renders. So when the indicator disappears from one button and appears in another, Motion animates it seamlessly between the two positions - giving us the sliding pill effect without any manual position tracking.

### Related examples

* [![Command Palette animation example](https://images.motion.dev/examples/previews/vue/command-palette/v-63fd67e87de2/poster.webp)[](https://images.motion.dev/examples/previews/vue/command-palette/v-63fd67e87de2/preview.mp4)Command Palette](https://motion.dev/examples/vue-command-palette)
* [![Context Menu animation example](https://images.motion.dev/examples/previews/vue/context-menu/v-e968164f30f2/poster.webp)[](https://images.motion.dev/examples/previews/vue/context-menu/v-e968164f30f2/preview.mp4)Context Menu](https://motion.dev/examples/vue-context-menu)
* [![Floating Action Button animation example](https://images.motion.dev/examples/previews/vue/floating-action-button/v-76e85b513a0e/poster.webp)[](https://images.motion.dev/examples/previews/vue/floating-action-button/v-76e85b513a0e/preview.mp4)Floating Action Button](https://motion.dev/examples/vue-floating-action-button)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
