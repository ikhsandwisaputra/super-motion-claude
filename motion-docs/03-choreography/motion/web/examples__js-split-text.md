---
source: https://motion.dev/examples/js-split-text
title: "Split Text example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Split Text

Demonstrate how to use the splitText function from Motion+ to create staggered text animations.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)26 Feb 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/split-text)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-split-text#tutorial)

Difficulty

### Introduction

The Split Text example shows how to create elegant text animations that reveal words one at a time. It uses the [`splitText`](https://motion.dev/docs/split-text) function from Motion+ to break apart text into animatable pieces, along with the [`animate`](https://motion.dev/docs/animate) function and [`stagger`](https://motion.dev/docs/stagger) helper from Motion to coordinate the animation timing.

The `splitText` function is a Motion+ utility that splits text content into individual words, characters, or lines, each wrapped in its own element. This makes it easy to animate text in sophisticated ways that would be difficult to achieve with CSS alone. The function handles all the DOM manipulation for you, and it intelligently preserves the original layout and line breaks.

### Get started

Let's start with some basic HTML and styles:

```
<div class="container">
    <h1 class="h1">Level up your animations with the all-in membership</h1>
</div>

<script type="module">
    /** We'll add our animation code here */
</script>

<style>
    /** Copy styles from example source code */
</style>
```

We're hiding the container with `visibility: hidden` initially because we want to reveal the text only after the fonts are loaded and the animation is ready to play. This prevents a flash of unstyled text.

The `.split-word` class is what `splitText` will apply to each word element it creates. We add `will-change: transform, opacity` to optimize the animations.

### Related examples

* [![Typewriter: Change Content animation example](https://images.motion.dev/examples/js/typewriter-change-content.png)Typewriter: Change Content](https://motion.dev/examples/js-typewriter-change-content)
* [![Typewriter: Exploding Countdown animation example](https://images.motion.dev/examples/js/typewriter-explode.png)Typewriter: Exploding Countdown](https://motion.dev/examples/js-typewriter-explode)
* [![Typewriter: Natural Typing animation example](https://images.motion.dev/examples/js/typewriter-natural-typing.png)Typewriter: Natural Typing](https://motion.dev/examples/js-typewriter-natural-typing)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
