---
source: https://motion.dev/examples/js-typewriter
title: "Typewriter example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Typewriter

An example of a typewriter animation using the typewriter function from Motion UI for vanilla JavaScript.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)27 Feb 2025

:   JavaScript

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/js/typewriter)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-typewriter#tutorial)

Difficulty

### Introduction

The Typewriter example types "Hello world!" into a heading, character by character, with a blinking cursor. It uses the [`typewriter`](https://motion.dev/docs/typewriter) function from Motion UI.

A typewriter effect looks simple. Slice a string a little more each frame and you're done.

But no. Real people don't type at a steady interval. They slow down for long words, pause at punctuation and speed up mid-word. `typewriter` models all of this, so the animation feels human instead of robotic.

### Get started

Let's start with the HTML structure and styles:

```
<div class="stage">
  <span class="stage-tag">Typewriter</span>
  <h2 class="headline"></h2>
</div>

<script type="module">
  // We'll animate here
</script>

<style>
  /** Copy styles from example source code */
</style>
```

The heading starts empty. `typewriter` renders the text and the cursor into it.

### Related examples

* [![Typewriter: Change Content animation example](https://images.motion.dev/examples/js/typewriter-change-content.png)Typewriter: Change Content](https://motion.dev/examples/js-typewriter-change-content)
* [![Typewriter: Exploding Countdown animation example](https://images.motion.dev/examples/js/typewriter-explode.png)Typewriter: Exploding Countdown](https://motion.dev/examples/js-typewriter-explode)
* [![Typewriter: Natural Typing animation example](https://images.motion.dev/examples/js/typewriter-natural-typing.png)Typewriter: Natural Typing](https://motion.dev/examples/js-typewriter-natural-typing)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
