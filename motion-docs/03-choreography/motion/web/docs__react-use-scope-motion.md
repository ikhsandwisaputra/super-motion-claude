---
source: https://motion.dev/docs/react-use-scope-motion
title: "useScopeMotion"
fetched: 2026-10-28
---

# useScopeMotion

Run animations, gestures and scroll listeners scoped to a React component, with automatic cleanup.

`useScopeMotion` runs Motion's JavaScript functions, scoped to an element and/or media query.

`useScopeMotion` supports functions like [`animate`](https://motion.dev/docs/animate), [`inView`](https://motion.dev/docs/inview), [`hover`](https://motion.dev/docs/hover) and [`drag`](https://motion.dev/docs/drag).

```
function List({ children }) {
  const ref = useRef(null)

  useScopeMotion(ref, () => {
    inView("li", (element) => animate(element, { opacity: 1 }))
    drag(".handle", { axis: "x" })
  })

  return <ul ref={ref}>{children}</ul>
}
```

Every selector resolves inside the provided `ref` element. So `"li"` only selects the `li` elements in this list, not every `li` on the page.

To pass these directly to a `useEffect`, you'd need to call the cleanup and lifecycle methods for each function like `animate`, `hover` etc when the component unmounts. With `useScopeMotion` they're cleaned up automatically.

It's the React version of [`scopeMotion`](https://motion.dev/docs/scope-motion).

## Usage

### Import

```
import { useScopeMotion } from "motion/react"
```

The `"motion"` functions you use inside it can also be imported from `"motion/react"`. Either import works fine.

```
import { useScopeMotion, animate, inView, drag } from "motion/react"
```

### Create a scope

`useScopeMotion` accepts a `ref` and a setup function. Pass the `ref` to an HTML or SVG element.

```
const ref = useRef(null)

useScopeMotion(ref, () => {
  animate("li", { x: 0 })
})

return <ul ref={ref}>{children}</ul>
```

The setup function runs after the component mounts, before the browser paints. The scope collects the work started by:

- [`animate`](https://motion.dev/docs/animate)

- [`scroll`](https://motion.dev/docs/scroll)

- [`inView`](https://motion.dev/docs/inview)

- [`hover`](https://motion.dev/docs/hover)

- [`press`](https://motion.dev/docs/press)

- [`drag`](https://motion.dev/docs/drag)

- [`resize`](https://motion.dev/docs/resize)

- [`delay`](https://motion.dev/docs/delay)

It also collects animations started in `inView`, `hover`, `press`, `drag`, `scroll` and `delay` callbacks. So this animation stops when the component unmounts, even though it starts later.

```
useScopeMotion(ref, () => {
  hover(".card", (element) => {
    animate(element, { scale: 1.05 })

    return () => animate(element, { scale: 1 })
  })
})
```

If the `ref` isn't attached to an element, selectors resolve in the whole document.

### Cleanup

When the component unmounts, `useScopeMotion` cancels the scope. This:

- Stops every animation.

- Removes every gesture, and every scroll and viewport listener.

- Restores the `style` attribute of every element the scope animated with `animate` or made draggable.

The setup function can also return a cleanup function, for work that the scope doesn't collect.

```
useScopeMotion(ref, () => {
  const onKeyDown = (event) => {}
  window.addEventListener("keydown", onKeyDown)

  return () => window.removeEventListener("keydown", onKeyDown)
})
```

### Dependencies

By default, setup runs once, when the component mounts. A new setup function on each render doesn't run it again.

To run setup again when values change, pass them as `deps`. Motion cancels the current scope, then runs setup in a new one.

```
useScopeMotion(
  ref,
  () => {
    inView("li", (element) => animate(element, { opacity: 1 }))
  },
  { deps: [items] }
)
```

Because the scope is cancelled first, the new setup starts from elements with no inline styles left by the previous one.

`ref`, `transition` and `matchMedia` are also read only when the scope is created. So if the `ref` element mounts later, for instance after a conditional render, add a dependency that changes when it mounts.

### Event handlers

`useScopeMotion` returns a ref to the current [scope](https://motion.dev/docs/scope-motion#scope). Use `run` or `bind` in event handlers, so the scope collects what they start and selectors resolve inside the `ref` element.

```
const scope = useScopeMotion(ref, setup)

const onClick = () => {
  scope.current?.run(() => animate("li", { x: 100 }))
}
```

`scope.current` is `null` after the component unmounts.

### Default transition

`transition` sets the default transition for every `animate` call in the scope.

```
useScopeMotion(ref, setup, {
  transition: { type: "spring", bounce: 0.2 }
})
```

### Media queries

`matchMedia` runs setup only while a media query matches. When it changes, Motion stops everything in the scope and restores inline styles, then runs setup again if the query matches.

```
useScopeMotion(
  ref,
  ({ media }) => {
    animate("li", { x: media.desktop ? 100 : 0 })

    if (!media.reduce) drag(".handle", { axis: "x" })
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

`matchMedia` accepts media queries and shorthands like `">=800"`, `"touch"` and `"!reducedMotion"`. See [`scopeMotion`](https://motion.dev/docs/scope-motion#media-queries) for the full list.

## Options

### `deps`

**Default:** `[]`

Cancel the scope and run setup again when any of these values change.

### `transition`

The default transition for every `animate` call in the scope.

### `matchMedia`

A media query or shorthand, or an object of named conditions. Setup runs only while it matches.
