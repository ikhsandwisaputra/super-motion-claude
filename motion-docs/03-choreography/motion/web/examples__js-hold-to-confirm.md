---
source: https://motion.dev/examples/js-hold-to-confirm
title: "Hold to confirm example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Hold to confirm

A Motion example showing long-press interaction. The button's events update a progress motion value that drives multiple animations of other motion values.

![](https://images.motion.dev/magazine/gWduAyVJxJQuFnLveoXQHnbdTmE.png)[BKMN](https://bakemono.space)12 Mar 2025

:   JavaScript

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/hold-to-confirm)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-hold-to-confirm#tutorial)

Difficulty

### Introduction

The Hold to confirm example shows an interactive button that requires a long press to trigger an action. This pattern is commonly used for destructive or important actions, giving users time to reconsider before completing the action.

This example uses several Motion APIs working together. The [`press`](https://motion.dev/docs/press) function detects when the button is held down, the [`animate`](https://motion.dev/docs/animate) function drives the progress animation, [`motionValue`](https://motion.dev/docs/motion-value) stores the animation progress, [`mapValue`](https://motion.dev/docs/transform) transforms the progress into different visual properties, and [`styleEffect`](https://motion.dev/docs/motion-value#styleeffect) automatically updates element styles as the Motion value changes.

The example creates a sophisticated multi-element animation from a single progress value. When you press and hold the button, a circular progress ring draws around it, the button scales down slightly, and a glowing background slides into view. All these animations are driven by one Motion value that updates as you hold the button.

### Get started

Let's start by setting up the HTML structure and basic styles. We need a button with a background element for the glow effect, and an SVG progress ring positioned behind it:

```
<div class="container">
    <div class="button-wrapper">
        <button class="button">
            <div class="button-background"></div>
            Hold to confirm
        </button>

        <svg
            class="progress-ring"
            width="320"
            height="320"
            viewBox="0 0 320 320"
        >
            <circle
                cx="160"
                cy="160"
                r="120"
                fill="none"
                stroke="#898d8e"
                stroke-width="24"
                stroke-linecap="round"
                stroke-dasharray="0"
            />
        </svg>
    </div>
</div>

<style>
    /** Copy styles from example source code */
</style>
```

A few styling details are important here. The button uses `isolation: isolate` so the background element's `z-index: -1` positions it behind the text but not behind the button itself. The background has `filter: blur(20px)` and `transform: scale(2)` to create a soft glow effect. The progress ring is set to `pointer-events: none` so clicks pass through to the button.

The circle starts rotated `-90deg` so the animation begins at the top of the circle rather than the right side.

### Related examples

* [![Confetti animation example](https://images.motion.dev/examples/previews/vue/confetti/v-18ff6ce2bce5/poster.webp)[](https://images.motion.dev/examples/previews/vue/confetti/v-18ff6ce2bce5/preview.mp4)Confetti](https://motion.dev/examples/vue-confetti)
* [![Copy Button animation example](https://images.motion.dev/examples/previews/vue/copy-button/v-da9d659365b8/poster.webp)[](https://images.motion.dev/examples/previews/vue/copy-button/v-da9d659365b8/preview.mp4)Copy Button](https://motion.dev/examples/vue-copy-button)
* [![Dots Morph Button animation example](https://images.motion.dev/examples/previews/vue/dots-morph-button/v-26eae183fb98/poster.webp)[](https://images.motion.dev/examples/previews/vue/dots-morph-button/v-26eae183fb98/preview.mp4)Dots Morph Button](https://motion.dev/examples/vue-dots-morph-button)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
