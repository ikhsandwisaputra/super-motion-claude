---
source: https://motion.dev/docs/scope-motion
title: "scopeMotion"
fetched: 2026-10-28
---

# scopeMotion

scopeMotion() groups animations, gestures and scroll listeners, so you can stop or cancel them together.

Motion's `scopeMotion` function collects everything you start inside it: animations, gestures, and scroll and viewport listeners. You can then stop or cancel all of them with one call.

```
const scope = scopeMotion(() => {
  animate(".box", { x: 100 })
  hover(".button", (element) => animate(element, { scale: 1.1 }))
  inView(".card", (element) => animate(element, { opacity: 1 }))
})

scope.cancel()
```

Without a scope, each of these functions returns its own cleanup function, and you must keep track of every one of them. That's fine for one animation. It gets messy for a page of them.

`scopeMotion` also lets you:

- Resolve selectors inside a root element.

- Set a default transition for every animation in the scope.

- Run animations only while media queries match, for instance on desktop only, or only when the user hasn't turned on reduced motion.

## Usage

### Import

`scopeMotion` can be imported via `"motion"`.

```
import { scopeMotion } from "motion"
```

### Create a scope

`scopeMotion` accepts a setup function. It runs this function immediately.

```
const scope = scopeMotion(() => {
  animate("li", { opacity: 1 })
  drag(".handle", { axis: "x" })
})
```

The scope collects the work started by these functions:

- [`animate`](https://motion.dev/docs/animate)

- [`scroll`](https://motion.dev/docs/scroll)

- [`inView`](https://motion.dev/docs/inview)

- [`hover`](https://motion.dev/docs/hover)

- [`press`](https://motion.dev/docs/press)

- [`drag`](https://motion.dev/docs/drag)

- [`resize`](https://motion.dev/docs/resize)

- [`delay`](https://motion.dev/docs/delay)

- [`animateLayout`](https://motion.dev/docs/layout-animations) and [`animateView`](https://motion.dev/docs/animate-view)

Callbacks are collected too. So an animation started in an `inView`, `hover`, `press`, `drag`, `scroll` or `delay` callback belongs to the scope, as does an animation started in the function that `inView`, `hover` or `press` call when the gesture ends. `resize` callbacks aren't collected.

```
scopeMotion(() => {
  inView(".card", (element) => {
    animate(element, { opacity: 1 })

    return () => animate(element, { opacity: 0 })
  })
})
```

### Stop or cancel

`scope.stop()` stops everything in the scope and removes every listener and gesture. Elements stay where they are.

```
scope.stop()
```

`scope.cancel()` does the same, then restores the `style` attribute of every element the scope animated with `animate` or made draggable, like [`animation.cancel()`](https://motion.dev/docs/animate#cancel). Motion values and SVG attributes keep their current values.

```
scope.cancel()
```

`scope.state` is `"active"`, `"stopped"` or `"cancelled"`. Async code can check it before it starts a new animation.

```
await loadMoreItems()

if (scope.state === "active") {
  scope.run(() => animate(".result", { opacity: 1 }))
}
```

### Cleanup function

The setup function can return a cleanup function. The scope runs it when it stops or is cancelled. Use it for work that the scope doesn't collect, like your own event listeners.

```
scopeMotion(() => {
  const onScroll = () => {}
  window.addEventListener("scroll", onScroll)

  return () => window.removeEventListener("scroll", onScroll)
})
```

### Add work later

`scope.run()` runs a function in the scope, so the scope also collects what it starts.

```
scope.run(() => animate(".title", { y: 0 }))
```

`scope.bind()` returns a version of a function that always runs in the scope. This is useful for event handlers.

```
button.addEventListener(
  "click",
  scope.bind(() => animate(".item", { rotate: 90 }))
)
```

Work that starts later, in a `setTimeout` or after an `await`, runs outside the scope. Wrap it with `scope.bind()` or `scope.run()` to collect it.

```
scopeMotion(({ bind }) => {
  fetchItems().then(bind(() => animate("li", { opacity: 1 })))
})
```

For timers, use [`delay`](https://motion.dev/docs/delay) in place of `setTimeout`. The scope collects it, so stopping the scope also cancels the timer.

```
scopeMotion(() => {
  delay(() => animate(".box", { x: 100 }), 1)
})
```

### Ignore work

`scope.ignore()` runs a function outside the scope. What it starts isn't collected, so it keeps running when the scope stops.

```
scopeMotion(({ ignore }) => {
  animate("li", { x: 0 })
  ignore(() => animate(".page", { opacity: 1 }))
})
```

The setup function receives the scope itself. So `run`, `bind`, `ignore` and `media` are available inside setup, before `scopeMotion` returns. They also work when destructured.

### Root element

To resolve selectors inside one element, pass the element, or a selector for it, as the first argument.

```
scopeMotion(".list", () => {
  // Only animates li elements inside .list
  animate("li", { opacity: 1 })
  inView("li", (element) => animate(element, { y: 0 }))
})
```

This works for every function that accepts a selector, including [effects](https://motion.dev/docs/style-effect) like `styleEffect`.

If the root matches no element, selectors resolve in the whole document.

[`animateLayout`](https://motion.dev/docs/layout-animations) without an element uses the root element.

### Default transition

`transition` sets the default transition for every `animate` and `animateLayout` call in the scope. Options passed to `animate` are merged over it, option by option.

```
scopeMotion(
  () => {
    animate(".box", { x: 100 })
    animate(".circle", { scale: 2 }, { duration: 1 })
  },
  { transition: { duration: 0.4, ease: "easeOut" } }
)
```

For sequences, it's the default for each segment, like `defaultTransition`.

### Media queries

`matchMedia` runs the setup function only while a media query matches.

```
scopeMotion(
  () => {
    scroll(animate(".progress", { scaleX: [0, 1] }))
  },
  { matchMedia: "(min-width: 800px)" }
)
```

When the media query changes, Motion stops everything in the scope and restores inline styles, as `cancel()` does. If the media query matches, Motion then runs setup again. So a user who resizes the window from desktop to mobile gets a clean element, with no inline styles left from the desktop animations.

#### Shorthands

`matchMedia` also accepts shorthands. Width comparisons:

```
">=800"     // (width >= 800px)
"<1200px"   // (width < 1200px)
"> 40em"    // (width > 40em)
```

Keywords:

- `reducedMotion`: The user prefers reduced motion.

- `motion`: The user has no motion preference.

- `dark` and `light`: The colour scheme.

- `hover`: The device can hover, with a fine pointer like a mouse.

- `touch`: The device has a coarse pointer, like a finger.

- `portrait` and `landscape`: The orientation.

Combine shorthands with spaces. Prefix one with `!` to negate it. Don't mix shorthands and media queries in one string: a condition that contains `(` is used as it is.

```
scopeMotion(setup, { matchMedia: ">=800 <1200 !touch" })
```

#### Named conditions

Pass an object to name several conditions. Setup runs while any of them match, and `scope.media` holds the state of each one.

```
scopeMotion(
  ({ media }) => {
    animate(".box", { x: media.desktop ? 300 : 100 })

    if (!media.reduce) {
      inView(".card", (element) => animate(element, { y: [50, 0] }))
    }
  },
  {
    matchMedia: {
      desktop: ">=800",
      mobile: "<800",
      reduce: "reducedMotion"
    }
  }
)
```

When several conditions change at the same time, setup runs once.

`toMediaQuery` turns a shorthand into a media query, for use elsewhere.

```
import { toMediaQuery } from "motion"

window.matchMedia(toMediaQuery(">=800 !touch"))
```

### Refresh

`scope.refresh()` stops everything in an active scope and restores inline styles, then runs setup again. For instance, after new content is added to the page.

```
list.append(newItem)
scope.refresh()
```

### Nested scopes

A scope created inside another scope belongs to it. When the outer scope stops or is cancelled, Motion cancels the inner scope too.

```
const page = scopeMotion(() => {
  scopeMotion(".header", () => {
    animate("h1", { opacity: 1 })
  })
})

page.cancel() // Also cancels the .header scope
```

An inner scope doesn't inherit the outer scope's root or transition. Its own root selector resolves inside the outer root.

### Server-side rendering

Without `window`, setup runs once and Motion adds no media query listeners. Selectors need `document`, so on the server pass an element as the root, or don't call `scopeMotion`.

## Limitations

- Effects like `styleEffect` keep running when the scope stops, because they can use motion values from outside it.

- `cancel()` releases the motion values Motion keeps for each animated element. So a `styleEffect` bound to the same element is also released.

- After `cancel()`, the `x` and `y` motion values of a dragged element can keep their dragged values.

- Work started in a timer or promise inside setup isn't collected. Use `delay` or `scope.bind()`.

## Options

### `transition`

The default transition for every `animate` and `animateLayout` call in the scope.

### `matchMedia`

A media query or shorthand, or an object of named conditions. Setup runs only while it matches.

## Scope

### `state`

`"active"`, `"stopped"` or `"cancelled"`. A scope is `"active"` while its media queries don't match, even though setup hasn't run.

### `media`

Whether each named `matchMedia` condition matched when setup last ran. When `matchMedia` is a string, its state is `media.matches`.

### `run(callback)`

Run `callback` in the scope and return its result.

### `bind(callback)`

Return a function that runs `callback` in the scope.

### `ignore(callback)`

Run `callback` outside of any scope and return its result.

### `stop()`

Stop everything in the scope and remove its media query listeners. Leave styles as they are.

### `cancel()`

As `stop()`, then restore the `style` attribute of every element animated or dragged in the scope.

### `refresh()`

Stop everything in an active scope and restore inline styles, then run setup again if the media queries match.
