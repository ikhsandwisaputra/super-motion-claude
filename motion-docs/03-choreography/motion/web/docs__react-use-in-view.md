---
source: https://motion.dev/docs/react-use-in-view
title: "useInView"
fetched: 2026-10-28
---

# useInView

Switch React state when an element enters or leaves the viewport.

`useInView` is a tiny (0.6kb) hook that detects when the provided element is within the viewport. It can be used with any React element.

```
const ref = useRef(null)
const isInView = useInView(ref)

return <div ref={ref} />
```

Video: https://www.youtube.com/embed/nC7qvT_yCxY?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=0&mute=1

## Usage

Import `useInView` from Motion:

```
import { useInView } from "motion/react"
```

`useInView` can track the visibility of any HTML element. Pass a `ref` object to both `useInView` and the HTML element.

```
function Component() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return <div ref={ref} />
}
```

While the element is outside the viewport, `useInView` will return `false`. When it moves inside the view, it'll re-render the component and return `true`.

### Effects

`useInView` is vanilla React state, so firing functions when `isInView` changes is a matter of passing it to a `useEffect`.

```
useEffect(() => {
  console.log("Element is in view: ", isInView)
}, [isInView])
```

## Options

`useInView` can accept options to define how the element is tracked within the viewport.

```
const isInView = useInView(ref, { once: true })
```

### `root`

By default, `useInView` will track the visibility of an element as it enters/leaves the window viewport. Set `root` to be the ref of a scrollable parent, and it'll use that element to be the viewport instead.

```
function Carousel() {
  const container = useRef(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { root: container })
  
  return (
    <div ref={container} style={{ overflow: "scroll" }}>
      <div ref={ref} />
    </div>
  )
}
```

### `margin`
**Default: **`"0px"`

A margin to add to the viewport to change the detection area. Use multiple values to adjust top/right/bottom/left, e.g. `"0px -20px 0px 100px"`.

```
const isInView = useInView(ref, {
  margin: "0px 100px -50px 0px"
})
```

**Warning:**
For browser security reasons, `margin` <a href="https://w3c.github.io/IntersectionObserver/#dom-intersectionobserver-rootmargin">won't take affect within cross-origin iframes</a> unless `root` is explicitly defined.

### `once`

**Default: **`false`

If `true`, once an element is in view, useInView will stop observing the element and always return `true`.

```
const isInView = useInView(ref, { once: true })
```

### `initial`

**Default: **`false`

Set an initial value to return until the element has been measured.

```
const isInView = useInView(ref, { initial: true })
```

### `amount`

**Default:** `"some"`

The amount of an element that should enter the viewport to be considered "entered". Either `"some"`, `"all"` or a number between `0` and `1`.

## Example

Live example: https://examples.motion.dev/react/scroll-triggered
