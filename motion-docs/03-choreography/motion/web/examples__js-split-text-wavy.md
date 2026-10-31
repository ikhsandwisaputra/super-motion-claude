---
source: https://motion.dev/examples/js-split-text-wavy
title: "Split Text: Wavy example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Split Text: Wavy

Demonstrate how to use the splitText function from Motion+ to create wavy text animations.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)26 Feb 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/split-text-wavy)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-split-text-wavy#tutorial)

Difficulty

### Introduction

The Split Text: Wavy example shows how to create a wavy text animation where individual characters move up and down in a wave pattern. This example uses the [`splitText`](https://motion.dev/docs/split-text) function from Motion+ to break text into individual characters, the [`animate`](https://motion.dev/docs/animate) function to create repeating animations, and the [`stagger`](https://motion.dev/docs/stagger) function to create a sequential delay that produces the wave effect.

Motion UI, included with Motion+, extends Motion with advanced features like text splitting. The `splitText` function automatically splits text into individual characters, words, or lines and wraps them in elements that can be animated independently.

### Get started

Let's start with the basic HTML structure. We'll create a container with a heading that includes a span with the `wavy` class around the text we want to animate:

```
<div class="container">
    <h1 class="h1">That&rsquo;s <span class="wavy">waaaavy</span>.</h1>
</div>

<script type="module">
    // We'll add our JavaScript here
</script>

<style>
    /** Copy styles from example source code */
</style>
```

Notice that the container starts hidden with `visibility: hidden`. We'll make it visible once the text is split and ready to animate. This prevents a flash of unstyled content.

The `.split-char` class will be automatically applied to each character by the `splitText` function. We add `will-change: transform, opacity` to optimize rendering performance for the animated characters.

### Related examples

* [![Typewriter: Change Content animation example](https://images.motion.dev/examples/js/typewriter-change-content.png)Typewriter: Change Content](https://motion.dev/examples/js-typewriter-change-content)
* [![Typewriter: Exploding Countdown animation example](https://images.motion.dev/examples/js/typewriter-explode.png)Typewriter: Exploding Countdown](https://motion.dev/examples/js-typewriter-explode)
* [![Typewriter: Natural Typing animation example](https://images.motion.dev/examples/js/typewriter-natural-typing.png)Typewriter: Natural Typing](https://motion.dev/examples/js-typewriter-natural-typing)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
