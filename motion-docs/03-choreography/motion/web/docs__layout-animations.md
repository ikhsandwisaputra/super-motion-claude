---
source: https://motion.dev/docs/layout-animations
title: "Layout animations"
fetched: 2026-10-28
---

# Layout animations

Animate complex layout changes and shared element transitions.

Motion makes it simple to **animate an element's size and position** between different layouts.

With `animateLayout` and the `data-layout` prop, you can perform layout animations, and by using `data-layout-id` you can create seamless "magic motion" effects between two separate elements.

Layout animations can animate previously unanimatable CSS values, like switching `justify-content` between `flex-start` and `flex-end`.

```
animateLayout(() => {
  element.style.justifyContent = isOn ? "flex-start" : "flex-end"
})
```

Live example: https://examples.motion.dev/js/layout-animation

## Install

`animateLayout` is included in the `motion` package.

```
npm install motion
```

`animateLayout` requires `motion@14.1.0` or above.

## Usage

Import `animateLayout` from `"motion"`.

```
import { animateLayout } from "motion"
```

Wrap any layout change with `animateLayout`:

```
animateLayout(() => {
  document.getElementById("box").style.width = "500px"
})
```

Any elements tagged with a `data-layout` will animate to their new size and position.

```
<div id="toggle-handle" data-layout />
```

Live example: https://examples.motion.dev/js/layout-animation

### Configure transitions

Pass a Motion transition to `animateLayout` to configure the animation.

```
animateLayout(update, { type: "spring" })
```

Live example: https://examples.motion.dev/js/reorder-items

### Scope layout animations

We can scope layout animations to a specific part of a page by passing a selector or element(s) as the first argument:

```
// Either as a selector
animateLayout(".container", update)

// Or an element/element list
const container = document.getElementById("#container")
animateLayout(container, update)
```

### Shared element transitions

It's possible to animate from one element to another different element by removing an existing element and then adding a new element to the DOM with matching `data-layout-id` attributes:

```
<ul class="tabs">
  <li>
    First
    <div data-layout-id="underline" class="underline"></div>
  </li>
  <li>Second</li>
  <li>Third</li>
</ul>
```

```
const firstItem = document.querySelector(".tabs li:first-child")
const underline = firstItem.querySelector("[data-layout-id='underline']")
underline.remove()
 
 // Add underline to second item
const secondItem = document.querySelector(".tabs li:nth-child(2)")
const newUnderline = document.createElement("div")
newUnderline.setAttribute("data-layout-id", "underline")
newUnderline.className = "underline"
secondItem.appendChild(newUnderline)
```

Live example: https://examples.motion.dev/js/shared-layout-animation

### Crossfade

You can also crossfade between two elements with matching `data-layout-id` attributes by leaving the initial element in the DOM.

```
<div class="cards">
  <div data-layout-id="card-1" class="card">
    <h3>Card Title</h3>
  </div>
</div>
<div class="modal-container"></div>
```

```
animateLayout(() => {
  container.innerHTML = expandedView
  // Add expanded version to modal container
  const modalContainer = document.querySelector(".modal-container")
  modalContainer.innerHTML = `
    <div data-layout-id="card-1" class="modal">
      <h3>Card Title</h3>
      <p>Expanded content...</p>
    </div>
  `
})
```

Live example: https://examples.motion.dev/js/app-store-layout

In the React version of layout animations, we can also crossfade back to the original element by removing the new element using `<AnimatePresence>`. As there is not yet an `<AnimatePresence>` equivalent for vanilla JS, this is not yet possible.

### Configure shared transitions

We can override the default layout transition using the `.shared()` method.

Pass it the `data-layout-id` of the matching pair we want to animate and a Motion transition:

```
animateLayout(update)
  .shared("card", { duration: 0.5 })
```

### Controls

`animateLayout` is an `async` function that returns `AnimationPlaybackControls` like `animate`.

Therefore, we can `play`, `pause`, set `time`, or power the animation with a scroll animation.

```
const controls = await animateLayout(update)

controls.pause()
controls.play()
controls.cancel()
controls.time = 0.4
await controls.finished

scroll(controls)
```
