---
source: https://motion.dev/docs/svelte
title: "Svelte"
fetched: 2026-10-28
---

# Svelte

Use Motion in Svelte 5 for layout animations, gestures, scroll, and view animations.

Motion works seamlessly with Svelte via `@attach`.

Svelte already has good animation built in. `transition:`, `animate:flip`, and the `Tween` and `Spring` classes cover a lot of simple enter, exit and list animations. So why add Motion?

Because Motion does the things Svelte doesn't:

- Gestures that filter out emulated hover events on touch screens, and press events that are keyboard accessible out the box.
- Interruptible animations that keep their velocity when they change direction.
- Scroll-linked animations that run off the main thread where the browser supports `ScrollTimeline`.
- Layout and view animations between any two DOM states.
- Hardware-accelerated animations with springs.

Live example: https://examples.motion.dev/svelte/hover

## Install

```
npm install motion
```

The examples on this page use Svelte 5 attachments (`{@attach}`), which need Svelte 5.29 or later. If you use an earlier version, the same functions work as actions (`use:`).

## Gestures

Motion's gesture handlers each have unique twists that make it easier to build app-quality interfaces than built-in event handlers. For instance, `press` is automatically keyboard accessible, and filters out secondary presses.

All Motion gesture handlers take an element and return a cleanup function. An attachment does the same thing, so a gesture plugs straight in:

```svelte
<script>

  function scaleOnHover(element) {
    return hover(element, () => {
      animate(element, { scale: 1.3 })

      return () => animate(element, { scale: 1 })
    })
  }
</script>

<div class="box" {@attach scaleOnHover}></div>
```

When the element unmounts, Svelte calls the cleanup function and [`hover`](https://motion.dev/docs/hover) removes its event listeners.

[`press`](https://motion.dev/docs/press) works the same way. It handles pointer and keyboard presses, so use it on an element that can take focus, like a `button`.

```svelte
<script>
  import { animate, press } from "motion"

  function pressScale(element) {
    return press(element, () => {
      animate(element, { scale: 0.8 }, { type: "spring", stiffness: 1000 })

      return () => animate(element, { scale: 1 }, { type: "spring", stiffness: 500 })
    })
  }
</script>

<button {@attach pressScale}>Press me</button>
```

Live example: https://examples.motion.dev/svelte/press

## Animate on state change

To animate when state changes, call [`animate`](https://motion.dev/docs/animate) in an `$effect`. Svelte runs the effect again whenever the state it reads changes:

```svelte
<script>
  import { animate } from "motion"

  let isOpen = $state(false)
  let box

  $effect(() => {
    animate(
      box,
      { rotate: isOpen ? 180 : 0 },
      { type: "spring", visualDuration: 0.4, bounce: 0.3 }
    )
  })
</script>

<div class="box" bind:this={box}></div>
<button onclick={() => (isOpen = !isOpen)}>Toggle</button>
```

If you click before the animation finishes, the new animation starts from the current value and keeps its velocity. You don't need to stop the old one.

Live example: https://examples.motion.dev/svelte/animate

## Scroll

[`scroll`](https://motion.dev/docs/scroll) also returns a cleanup function, so a scroll-linked animation is an attachment too:

```svelte
<script>
  import { animate, scroll } from "motion"

  function scrollProgress(element) {
    return scroll(animate(element, { scaleX: [0, 1] }, { ease: "linear" }))
  }
</script>

<div class="progress" {@attach scrollProgress}></div>
```

Live example: https://examples.motion.dev/svelte/scroll

[`inView`](https://motion.dev/docs/inview) works the same way for scroll-triggered animations.

## View animations

[`animateView`](https://motion.dev/docs/animate-view) takes a function that updates the DOM. The browser takes a snapshot before and after that function runs.

There is one catch in Svelte. When you change `$state`, Svelte doesn't update the DOM at once. It batches the change and applies it later. So the browser takes its second snapshot before anything has changed, and nothing animates.

The fix is `flushSync`. It tells Svelte to apply pending changes to the DOM now:

```svelte
<script>
  import { animateView } from "motion"
  import { flushSync } from "svelte"

  let isOn = $state(false)
  let handle

  function toggle() {
    animateView(() => {
      isOn = !isOn
      flushSync()
    }).add(handle)
  }
</script>
```

Live example: https://examples.motion.dev/svelte/animate-view

## Layout animations

[`animateLayout`](https://motion.dev/docs/layout-animations) has the same rule. It measures the layout before and after your update function, so call `flushSync()` at the end of it:

```svelte
<script>
  import { animate, animateLayout, hover } from "motion"
  import { flushSync } from "svelte"

  let isOn = $state(false)
  let container

  function toggle() {
    animateLayout(container, () => {
      isOn = !isOn
      flushSync()
    })
  }
</script>

<button bind:this={container} class:on={isOn} onclick={toggle}>
  <div class="handle" data-layout></div>
</button>
```

Elements with a `data-layout` attribute animate to their new size and position.

Live example: https://examples.motion.dev/svelte/animate-layout

## `svelte/motion` and `motion`

The names are close, so it's easy to mix them up. `svelte/motion` is Svelte's own module, with the `Tween` and `Spring` classes. `motion` is this library.

They work together. Svelte's `Spring` gives you a reactive number to use in your markup. Motion's `animate` animates an element's styles directly, without a re-render each frame. Use whichever suits the job.

## Components

Motion doesn't have an official Svelte component API, like the `motion` component in React and Vue. The JavaScript API above covers gestures, scroll, layout and view animations without one.

If you prefer a declarative API, there are community packages built on Motion, like [`@humanspeak/svelte-motion`](https://motion.svelte.page/).
