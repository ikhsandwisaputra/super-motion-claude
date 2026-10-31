---
source: https://motion.dev/docs/react-animate-view
title: "AnimateView"
fetched: 2026-10-28
---

# AnimateView

View transitions and page animations for React, with the AnimateView component.

`AnimateView` allows you to animate elements between different views using the browser's native [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API).

It's built on Motion's mini `animate()` function and React's `ViewTransition` component. You can animate values like `clipPath` and configure animations with Motion's [transitions](https://motion.dev/docs/react-transitions), including springs.

It's possible to write specific animations for when elements enter and exit the DOM, when they update, or when performing shared element animations.

```
{isOpen && (
  <AnimateView transition={{ type: spring }}>
    <div className="modal" />
  </AnimateView>
)}
```

Live example: https://examples.motion.dev/react/animate-view-toggle

## Install

Install [Motion](https://motion.dev/docs/react-installation):

```bash
npm install motion
```

`AnimateView` requires **React and React DOM 19.3 or later**. Update both packages together if needed:

```bash
npm install react@^19.3.0 react-dom@^19.3.0
```

Import `AnimateView` from the separate `"motion/react-animate-view"` entry point. It isn't exported from `"motion/react"`. Other Motion for React APIs continue to support React 18.

### Migrate from Motion+

`AnimateView` was originally in Motion+ early access. To migrate, replace imports from `"motion-plus/animate-view"` with `"motion/react-animate-view"`:

```jsx
import { AnimateView } from "motion/react-animate-view"
```

The API stays the same otherwise. `AnimateView` no longer requires a Motion+ membership or access token.

## Usage

Import `AnimateView` from `"motion/react-animate-view"`.

```jsx
import { AnimateView } from "motion/react-animate-view"
```

### Enter/exit animations

To animate an element as it enters and exits the DOM, we can just wrap it in `<AnimateView>`.

```
{show && (
  <AnimateView>
    <div className="box" />
  </AnimateView>
)}
```

Now, when `show` is changed within a React `startTransition`, the element will perform the browser's default fade in/out animation as it enters and leaves the DOM.

```
startTransition(() => setShow(!show))
```

Wrap state changes in `startTransition` to trigger a view transition.

The full setup looks like this:

```
import { AnimateView } from "motion/react-animate-view"
import { startTransition, useState } from "react"

function Example() {
  const [show, setShow] = useState(true)
  
  return (
    <>
      <button onClick={() => startTransition(() => setShow(!show))}>
        Toggle
      </button>
      {show && (
        <AnimateView>
          <div className="box" />
        </AnimateView>
      )}
    </>
  )
}
```

### Configure the transition

It's possible to set a default transition for all view transitions via the `transition` prop. This accepts all Motion's [transition options](https://motion.dev/docs/react-transitions).

```
<AnimateView transition={{ duration: 1, ease: "easeOut" }}>
  <div className="box" />
</AnimateView>
```

You can also set a `transition` for specific `enter`, `exit`, `share` and `update` animations:

```
<AnimateView enter={{
  transition: { type: spring, bounce: 0, duration: 0.6 }
}}>
  <div className="box" />
</AnimateView>
```

`AnimateView` uses Motion's mini `animate()` function. To use a spring, import `spring` from `"motion"` and pass it to the `type` transition option:

```jsx
import { spring } from "motion"
import { AnimateView } from "motion/react-animate-view"

<AnimateView transition={{ type: spring, bounce: 0.2 }}>
  <div className="box" />
</AnimateView>
```

Use `transition.layout` to set separate timing for changes in size and position:

```jsx
<AnimateView
  transition={{
    duration: 0.2,
    layout: { type: spring, duration: 0.6, bounce: 0.2 },
  }}
>
  <div className="box" />
</AnimateView>
```

### Setting values

By default, `AnimateView` will animate elements using the browser's default opacity animation. But, if you set your own values within `enter`, `exit`, `share` or `update` then this crossfade will be disabled.

```
<AnimateView enter={{ clipPath: ["inset(0 50% 0 100%)", "inset(0 0% 0 0%)"] }}>
```

Live example: https://examples.motion.dev/react/animate-view-clip-path

You can re-enable an `opacity` animation by also passing this to the prop:

```
<AnimateView enter={{
  opacity: 1,
  clipPath: ["inset(0 50% 0 100%)", "inset(0 0% 0 0%)"]
}}>
```

### Animating updates

Elements wrapped in `AnimateView` will also animate whenever their content or visual styles change, crossfading between the two views. This animation can be customised with the `update` prop.

```
<AnimateView update={{ transition: { ease: "easeInOut" } }}>
  <div style={{ backgroundColor }} />
</AnimateView>
```

If the element physically moves or changes size, this change will also be animated. We can use this to create, for example, reorder list animations.

```
function ReorderList({ items }) {
  return (
    <div className="list">
      {items.map((item) => (
        <AnimateView
          key={item.id}
          transition={{ type: spring, bounce: 0.2 }}
        >
          <div className="list-item">{item.label}</div>
        </AnimateView>
      ))}
    </div>
  )
}
```

Live example: https://examples.motion.dev/react/animate-view-reorder

### Shared element animations

When an `AnimateView` component with a `name` prop exits the DOM, and another one with the same `name` enters it within the same transition, the two elements will perform a shared element animation.

```
if (selectedItem) {
  return <Modal selectedItem={selectedItem} />
}

return <Items setSelectedItem={setSelectedItem} />
```

```
function Item({ setSelectedItem }) {
  return (
    <AnimateView name="item-1">
      <div
        className="item"
        onClick={() => startTransition(() => setSelectedItem("item-1"))}
      />
    </AnimateView>
  )
}

function Modal({ selectedItem }) {
  return (
    <AnimateView name={selectedItem}>
      <div className="modal" />
    </AnimateView>
  )
}
```

Live example: https://examples.motion.dev/react/animate-view-app-store

If there is more than one element with a specific `name` either before, or after the transition, the animation will fail.

The animation can be configured via the `transition` or `share` props on the entering element:

```
<AnimateView name="item-1" transition={{ duration: 0.4 }}>
```

### Transition types

React's `addTransitionType` lets you set contextual information (like navigation direction) to the current transition.

```
import { addTransitionType, startTransition } from "react"

startTransition(() => {
  addTransitionType("next")
  setItem(2)
})
```

`enter`, `exit`, `share` and `update` props can all resolve dynamically, with a list of values set via `addTransitionType`. You can use this information to generate different animations.

```
<AnimateView
  key={index}
  exit={(types) => ({
    transform: `translateX(${types.includes("prev") ? 100 : -100}%)`,
  })}
  enter={(types) => ({
    transform: [
      `translateX(${types.includes("next") ? 100 : -100}%)`,
      "translateX(0%)",
    ],
  })}
>
```

Live example: https://examples.motion.dev/react/animate-view-types

### Suspense

`AnimateView` integrates with `Suspense`. Wrap a `Suspense` boundary in `AnimateView` to crossfade between its content and fallback:

```
<AnimateView>
  <Suspense fallback={<Placeholder />}>
    <Content />
  </Suspense>
</AnimateView>
```

## Performance

The React docs state:

> `<ViewTransition>` creates an image that can be moved around, scaled and cross-faded. Unlike Layout Animations you may have seen in React Native or Motion, this means that not every individual Element inside of it animates its position. This can lead to better performance and a more continuous feeling, smooth animation compared to animating every individual piece.

Neither of these claims are true.

From our own stress test benchmarking, creating image bitmaps and constructing a pseudo-DOM is more memory intensive and slower than the equivalent layout measurements used by Motion's [layout animations](https://motion.dev/docs/react-layout-animations).

The claim of "a more continuous feeling" is also not right. Layout animations are **interruptible**, which means you can change direction mid-animation and they respond immediately. View transitions are **not interruptible**, meaning they must complete before a new transition can begin. This makes layout animations a far better candidate for micro-interactions where responsiveness matters.

View transitions are best suited for **page-level transitions** (route changes, full-view swaps) where the non-interruptible nature is acceptable and the snapshot-based approach avoids complex per-element coordination.

## Props

### `children`

The content to animate. `AnimateView` uses React's `ViewTransition` boundary and doesn't add a wrapper element to the DOM.

### `name`

A name used to match elements for [shared element animations](#shared-element-animations). Each name must be unique within each view. Omit it when you don't need to match two different elements.

```jsx
<AnimateView name="product-image">
  <img src={src} alt={alt} />
</AnimateView>
```

### `transition`

Default [transition](https://motion.dev/docs/react-transitions) for all animation types. Import `spring` from `"motion"` to use springs. Each animation prop can override this with its own `transition`, including per-value options and `layout` timing.

```
<AnimateView transition={{ type: spring, visualDuration: 0.4, bounce: 0.3 }}>
```

### `enter`

**Default:** Browser fade-in animation.

An animation to use when the wrapped element enters the DOM.

```
<AnimateView enter={{ 
  opacity: 1,
  transform: ["translateX(-100%)", "none"]
}}>
```

Can also be a function that resolves with the list of current transition types.

```
<AnimateView
  enter={(types) => ({
    transform: [
      `translateX(${types.includes("next") ? 100 : -100}%)`,
      "none",
    ],
  })}
>
```

### `exit`

**Default:** Browser fade-out animation.

The animation to use when the wrapped element leaves the DOM. Accepts an object of values and an optional `transition`, or a function that receives the current transition types.

```jsx
<AnimateView exit={{ opacity: 0, transform: "translateY(20px)" }}>
  <div className="box" />
</AnimateView>
```

### `update`

The animation to use when an existing element's content, style, size or position changes. By default, the old and new views crossfade and changes in size and position animate.

```jsx
<AnimateView update={{ transition: { duration: 0.5 } }}>
  <div style={{ backgroundColor }} />
</AnimateView>
```

Accepts an animation object or a function that receives the current transition types. Custom values replace the browser's crossfade while keeping the size and position animation.

### `share`

The animation to use when an element leaves and another with the same `name` enters during the same transition. Set this prop on the entering component.

```jsx
<AnimateView
  name="product-image"
  share={{ transition: { duration: 0.5 } }}
>
  <img src={src} alt={alt} />
</AnimateView>
```

Accepts an animation object or a function that receives the current transition types. Custom values replace the browser's crossfade while keeping the size and position animation.

### `onAnimationStart`

Called when an animation starts. Receives the animation controls and its type: `"enter"`, `"exit"`, `"update"` or `"share"`.

```jsx
<AnimateView
  onAnimationStart={(animation, type) => {
    console.log(type)
    animation.speed = 0.5
  }}
>
  <div className="box" />
</AnimateView>
```

### `onAnimationComplete`

Called when an animation finishes. Receives the animation type. It isn't called for an animation cancelled during React's cleanup.

```jsx
<AnimateView onAnimationComplete={(type) => console.log(type)}>
  <div className="box" />
</AnimateView>
```
