---
source: https://motion.dev/examples/js-split-text-scatter
title: "Split Text: Scatter example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Split Text: Scatter

Demonstrate how to use the splitText function from Motion+ to create scatter text animations.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)26 Feb 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/split-text-scatter)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-split-text-scatter#tutorial)

Difficulty

### Introduction

The Split Text: Scatter example shows how to create a dynamic text animation where individual characters scatter away from the pointer based on its movement speed and direction. This uses three Motion APIs: the [`splitText`](https://motion.dev/docs/split-text) function from Motion+ to break text into individual characters, the [`hover`](https://motion.dev/docs/hover) function to detect when the pointer moves over each character, and the [`animate`](https://motion.dev/docs/animate) function to create smooth spring animations.

The `splitText` function automatically splits text into characters or words, making it easy to animate each piece independently. Combined with Motion's gesture detection and animation functions, we can create sophisticated interactive effects with minimal code.

### Get started

Let's start with the basic HTML structure and styles:

```
<div class="container">
    <h1 class="h1">Move your pointer over the text to scatter.</h1>
</div>

<script type="module">
    // We'll add our animation code here
</script>

<style>
    /** Copy styles from example source code */
</style>
```

The `.split-char` class is automatically applied by `splitText` to each character. We set `will-change` to hint to the browser that these elements will be animated.

### Related examples

* [![Typewriter: Change Content animation example](https://images.motion.dev/examples/js/typewriter-change-content.png)Typewriter: Change Content](https://motion.dev/examples/js-typewriter-change-content)
* [![Typewriter: Exploding Countdown animation example](https://images.motion.dev/examples/js/typewriter-explode.png)Typewriter: Exploding Countdown](https://motion.dev/examples/js-typewriter-explode)
* [![Typewriter: Natural Typing animation example](https://images.motion.dev/examples/js/typewriter-natural-typing.png)Typewriter: Natural Typing](https://motion.dev/examples/js-typewriter-natural-typing)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
