---
source: https://motion.dev/docs/curtains
title: "Curtains"
fetched: 2026-10-28
---

# Curtains

Motion+ (paid). Not included in the free motion package. Install Motion UI: https://motion.dev/docs/motion-ui-installation. Import: `import { curtains } from "motion-plus/curtains"`. curtains() runs a page transition that covers the viewport with an effect, swaps your content while it's hidden, then reveals it.

Motion's `curtains()` function creates cover-then-reveal page and element transitions.

```js
import { curtains, wipe } from "motion-plus/curtains"

await curtains(
  () => await update(),
  { effect: wipe({ direction: "left", angle: 12 }) },
)
```

Live example: https://examples.motion.dev/js/curtains-wipe

## Features

- **Mix effects:** Cover with one and reveal with another.
- **Tiny**: Just a couple kb on top of the mini `animate()` function.
- **Hardware accelerated:** All effects are GPU accelerated.
- **Robust:** No `z-index` hacks, uses the browser's Popover API to ensure full-page overlays.
- **Accessible:** Respects a user's `prefers-reduced-motion` setting.

## Install

First, [install Motion UI](https://motion.dev/docs/motion-ui-installation) in your project. You need to be a [Motion+ member](https://motion.dev/plus) to generate an access token.

## Usage

First, import from `motion-plus/curtains`:

```js
import { curtains } from "motion-plus/curtains"
```

### Create a page transition

`curtains` accepts an async `update` function, which can be used to update the page any way you like:

```js
curtains(async () => {
  await loadFonts()
  document.body.innerHTML = newContent
})
```

### Configure the animation

By default, `curtains` will use a faded overlay:

Live example: https://examples.motion.dev/js/curtains-fade

But, it also accepts a set of `options` that you can use to configure the animation with [effects](#effects) and [transition options](https://motion.dev/docs/animate#options):

```js
curtains(update, {
  transition: { duration: 0.4 },
  effect: clipWipe,
})
```

### Mix effects

By default, `curtains` will use the same `transition` and `effect` for both the cover and reveal animations.

Either can be set as a `[cover, reveal]` tuple use different values for each.

```js
curtains(update, {
  effect: [wipe({ direction: "left" }), iris()],
  transition: [{ duration: 0.3 }, { duration: 0.5 }],
})
```

Live example: https://examples.motion.dev/js/curtains-mixed

### Scope to a specific element

By passing a `scope` value, we can apply the overlay to just one element.

The element must establish a containing block, so give it `position: relative` (or another non-`static` position).

```js
curtains(update, { effect: wipe(), scope: cardElement })
```

Live example: https://examples.motion.dev/js/curtains-scope

## Sequencing

`curtains()` returns a promise that resolves once the reveal has finished, so you can sequence work after the transition.

```js
await curtains(update, { effect: wipe() })
// the new view is now fully revealed
```

## Styling the curtain

Every covering element (panel, tile, slat or door) carries the `motion-curtain` class. A dark default fill is applied, which you can override in CSS:

```css
.motion-curtain {
  background: #6d28d9;
}
```

The overlay container carries the `motion-curtains` class, in case you need to position or theme the containing element.

## Effects

Every effect is imported separately to remain tree-shakable for lower bundlesize. Import from `motion-plus/curtains`:

```js
import { curtains, wipe } from "motion-plus/curtains"
```

Pass an effect to the `effect` option to

```js
curtains(update, { effect: iris }) // defaults
curtains(update, {
  effect: iris({ origin: { x: 20, y: 80 } }),
}) // configured
```

### `fade`

The default. A solid panel fades in over the page, then fades back out.

Live example: https://examples.motion.dev/js/curtains-fade

### `wipe`

A solid panel sweeps across the viewport. With an `angle`, the leading edge is slanted.

```js
curtains(update, { effect: wipe({ direction: "left", angle: 12 }) })
```

- `direction` accepts `"up"`, `"down"`, `"left"` or `"right"` (or a `[cover, reveal]` tuple to set each phase).
- `directionMode` is `"normal"` to continue past on the reveal, or `"reverse"` to retreat the way the curtain came.
- `angle` tilts the leading edge, in degrees.

Live example: https://examples.motion.dev/js/curtains-wipe

### `clipWipe`

A wipe whose edge is a clip on a static panel, so the overlay itself never moves. This makes it ideal for revealing fixed content like an image, gradient or poster. The edge can be slanted with `angle`, or bowed into a curve with `bow`.

- `direction` accepts `"up"`, `"down"`, `"left"` or `"right"` (or a `[cover, reveal]` tuple to set each phase).

- `directionMode` is `"normal"` to continue past on the reveal, or `"reverse"` to retreat the way the curtain came.

- `angle` slants the edge, in degrees.

- `bow` bows the leading edge into a convex curve, as a fraction of the box (0 to around 0.4). Takes precedence over `angle`.

Live example: https://examples.motion.dev/js/curtains-clip-wipe

### `iris`

A circle that expands from a point to cover, then contracts to reveal.

- `origin` is `{ x, y }`, where numbers are 0 to 1 fractions of the box (like Motion's `originX`/`originY`), or CSS-length strings such as `"100px"`. Defaults to the centre `{ x: 0.5, y: 0.5 }`.

```js
// grow from the pointer
curtains(update, {
  effect: iris({
    origin: {
      x: clientX / innerWidth,
      y: clientY / innerHeight,
    },
  }),
})
```

Live example: https://examples.motion.dev/js/curtains-iris

Feed the pointer position to `origin` to grow the iris from wherever the user clicked:

Live example: https://examples.motion.dev/js/curtains-iris-click

### `doors`

Two panels meet in the middle to cover, then part to reveal.

- `direction` chooses the axis. Horizontal values give left and right doors, vertical values give top and bottom doors. Defaults to horizontal.

Live example: https://examples.motion.dev/js/curtains-doors

### `pixels`

A grid of tiles fills in to cover, then clears out to reveal. By default they fill in a random `order`; set a `direction` to sweep them in as a wavefront, and `noise` to soften that sweep's edge.

- `size` is the tile edge: px (`100`), a `"50%"` fraction of the box, or `[width, height]` for rectangular tiles. Defaults to `100`.

- `direction` sweeps the fill as a wavefront, angled in degrees like `wipe` (`0` = right, `90` = down, `180` = left, `270` = up). Tiles on the same wavefront flip together, so the edge reads as a hard line. Takes precedence over `order`.

- `noise` softens a `direction` sweep's edge, `0` to `1`: `0` keeps a hard, straight line; higher values dither the edge into a soft band; `1` is fully random.

- `order` is the activation sequence when no `direction` is set: `"rows"`, `"columns"`, `"diagonal"`, `"radial"` or `"random"`. Defaults to `"random"`.

- `directionMode` of `"reverse"` plays the sweep or order backwards on the reveal.

Live example: https://examples.motion.dev/js/curtains-pixels

### `blinds`

Venetian-blind slats scale shut to cover, then open to reveal.

- `size` is the slat thickness in px. Defaults to `64`.

- `direction` of `"row"` gives horizontal slats, `"column"` gives vertical slats. Defaults to `"row"`.

- `directionMode` is `"normal"` to continue past on the reveal, or `"reverse"` to retreat the way the curtain came.

Live example: https://examples.motion.dev/js/curtains-blinds

### `shutter`

Interleaved columns slide in from alternating top and bottom.

- `size` is the column width in px. Defaults to `120`.

Live example: https://examples.motion.dev/js/curtains-shutter

### `staggerWipe`

Strips that each wipe in one direction, staggered across the perpendicular axis, for a cascading wipe. By default, full-height columns wipe downward, staggered left to right.

- `size` is the strip thickness in px. Defaults to `120`.

- `direction` is the way the wipe travels (`"up"`, `"down"`, `"left"` or `"right"`). Defaults to `"down"`.

- `directionMode` is `"normal"` to continue past on the reveal, or `"reverse"` to retreat the way the curtain came.

Live example: https://examples.motion.dev/js/curtains-stagger-wipe

## Custom effects

An effect is just a factory that returns three methods, so you can build your own to cover and reveal however you like.

- `setup(container, box)` builds the overlay's DOM inside `container` and stashes whatever `cover` and `reveal` will animate. `box` is the container's measured `{ width, height }`. Size your effect from `box`, not `window`, so it still works when `scope`d to an element. Add the `motion-curtain` class to your elements to inherit the default fill and the styling hook.

- `cover(transition)` animates those elements in until they fully hide the page. Return the animation: Motion's `animate()` already satisfies the contract (a `finished` promise and a `stop()` method). `transition` is the one from the call site, or `undefined`.

- `reveal(transition)` animates them back out to expose the new view.

Here's a panel that slides up to cover, then continues up to reveal:

```js
import { animate } from "motion/mini"

function slideUp() {
  let panel

  return {
    setup(container) {
      panel = document.createElement("div")
      panel.className = "motion-curtain"
      Object.assign(panel.style, {
        position: "absolute",
        inset: "0",
        transform: "translateY(100%)",
      })
      container.appendChild(panel)
    },
    cover(transition) {
      return animate(
        panel,
        { transform: ["translateY(100%)", "translateY(0%)"] },
        transition,
      )
    },
    reveal(transition) {
      return animate(
        panel,
        { transform: ["translateY(0%)", "translateY(-100%)"] },
        transition,
      )
    },
  }
}
```

Then pass it like any built-in effect:

```js
curtains(update, { effect: slideUp() })
```

To stagger many elements, like the tile effects do, build them all in `setup`, store them in the closure, then pass a `delay: stagger()` in your `animate` call.

## Options

### `effect`

The transition effect to use.

```js
import { curtains, iris } from "motion-plus/curtains"

curtains(update, { effect: iris })
```

### `transition`

The animation timing to use. A single transition times both phases; a `[cover, reveal]` tuple times each independently.

```js
curtains(update, {
  transition: [{ duration: 0.3 }, { duration: 0.6 }],
})
```

This accepts `delay: stagger()` for effects like `pixels`, which animate many elements.

### `scope`

By default the curtain covers the whole viewport, promoted to the top layer via the Popover API so it sits above all content without trapping focus. Pass an element to `scope` to mount the curtain inside it instead, so it covers and tracks just that element and follows it on scroll.

The element must establish a containing block, so give it `position: relative` (or another non-`static` position).

```js
curtains(update, { effect: wipe(), scope: cardElement })
```

Live example: https://examples.motion.dev/js/curtains-scope

## `curtains` vs `animateView`

Motion ships two ways to transition between views, and they work in opposite directions.

[`animateView()`](https://motion.dev/docs/animate-view) is built on the browser's View Transition API. It snapshots the old and new views and animates _between_ them, so elements morph size and position, and shared elements fly across the change. The content itself animates.

`curtains()` never animates your content. It mounts an opaque overlay, the curtain, runs your update while the page is completely hidden, then clears the overlay. Only the curtain moves.

The rest of this page is for Motion+ members: https://motion.dev/docs/curtains
