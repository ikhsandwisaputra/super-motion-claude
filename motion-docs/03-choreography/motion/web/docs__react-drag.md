---
source: https://motion.dev/docs/react-drag
title: "Drag animation"
fetched: 2026-10-28
---

# Drag animation

Physics-based drag interactions for React.

Drag animations allow users to move elements with their pointer.

Motion provides a suite of features to create app-quality drag animations with a simple API:

- Momentum

- Axis control

- Elastic constraints

- Direction locking

- Optional imperative start/stop controls

Although browsers provide a native [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API), it can be challenging to create a pleasant experience, with an odd "ghost image" effect. On the other hand, it also contains native dropzone functionality - which isn't yet in Motion.

In this guide we'll take a look at all Motion's drag features and how to customise them.

Video: https://www.youtube.com/embed/lxNd50Nxi1E?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=0&mute=1

Live example: https://examples.motion.dev/react/drag

If you're building a swipeable slider rather than a bare drag gesture, Motion+ has a ready-made [React carousel component](https://motion.dev/docs/react-carousel) with pointer, wheel and keyboard navigation already handled.

## Usage

### The `drag` prop

The simplest way to make a component draggable is to add the `drag` prop to a `motion` component.

```
<motion.div drag />
```

### Axis locking

To lock dragging to a single axis, you can set the prop to `"x"` or `"y"`.

```
<motion.div drag="x" />
```

### Visual feedback with `whileDrag`

You can animate to an animation state while an element is being dragged using the `whileDrag` prop.

When the gesture starts, the component will animate to the state defined in `whileDrag`. When it ends, it will animate back to its default `animate` state.

This is great for creating a "lift" effect, for instance by increasing the element's scale and adding a box shadow.

```
<motion.div
  drag
  whileDrag={{
    scale: 1.1,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.2)"
  }}
/>
```

### Momentum

By default, when a user releases a draggable element, it has **momentum**. It will perform an inertia animation based on the velocity of the pointer, creating a realistic, physical feel.

You can disable this behaviour by setting the `dragMomentum` prop to `false`.

```
<motion.div drag dragMomentum={false} />
```

You can also customise the physics of this inertia animation with the `dragTransition` prop. This is useful for creating a heavier or bouncier feel.

```
<motion.div
  drag
  dragTransition={{
    bounceStiffness: 600,
    bounceDamping: 10
  }}
/>
```

### Constraints

You can constrain the movement of a draggable element using the `dragConstraints` prop.

Live example: https://examples.motion.dev/react/drag-constraints

#### Pixel constraints

The simplest way to apply constraints is by passing an object of `top`, `left`, `right`, and `bottom` values, measured in pixels.

```
<motion.div
  drag
  dragConstraints={{
    top: -50,
    left: -50,
    right: 50,
    bottom: 50,
  }}
/>
```

#### Ref-based constraints

For more dynamic constraints, you can pass a `ref` to another component. The draggable element will then be constrained to the bounding box of that element.

```
import { motion } from "motion/react"
import { useRef } from "react"

export function DragContainer() {
  const constraintsRef = useRef(null)

  return (
    <motion.div ref={constraintsRef} style={{ width: 300, height: 200 }}>
      <motion.div drag dragConstraints={constraintsRef} />
    </motion.div>
  )
}
```

#### Elastic constraints

By default, dragging an element beyond its constraints will "tug" with some elasticity. You can change this behavior with the `dragElastic` prop, which accepts a value between `0` (no movement) and `1` (full movement).

```
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300 }}
  dragElastic={0.1}
/>
```

#### Direction locking

You can lock an element to the first axis it's dragged on by setting the `dragDirectionLock` prop to `true`.

```
<motion.div
  drag="x"
  dragDirectionLock
  onDirectionLock={axis => console.log(`Locked to ${axis} axis`)}
/>
```

Live example: https://examples.motion.dev/react/drag-lock-direction

### Drag events

You can listen to the lifecycle of a drag gesture with a set of event listeners. These are useful for updating other parts of your UI in response to a drag.

The main events are `onDragStart`, `onDrag`, and `onDragEnd`.

Live example: https://examples.motion.dev/react/multifollow-pointer-with-spring

Each callback is provided with the original `PointerEvent`, and an `info` object containing valuable data about the gesture's state:

- `point`: The `x` and `y` coordinates of the pointer.

- `delta`: The distance moved since the last event.

- `offset`: The distance from the element's origin.

- `velocity`: The current velocity of the pointer.

```
function onDrag(event, info) {
  console.log(info.point.x, info.point.y)
}

<motion.div drag onDrag={onDrag} />
```

### Manual control

In some cases, you might want to initiate a drag from a different element, like a handle or a video scrubber. You can achieve this with the `useDragControls` hook.

The hook returns a set of `dragControls` that you can pass to the draggable element. You can then call the `controls.start()` method from any event to begin the gesture.

```
import { motion, useDragControls } from "motion/react"

export function Scrubber() {
  const dragControls = useDragControls()

  function startDrag(event) {
    // Start the drag gesture imperatively
    dragControls.start(event, { snapToCursor: true })
  }

  return (
    <>
      <div onPointerDown={startDrag} className="scrubber-track" />
      <motion.div
        drag="x"
        dragControls={dragControls}
        dragListener={false} // Disable the default drag handler
        className="scrubber-handle"
      />
    </>
  )
}
```

## Troubleshooting

### Dragging inside a transformed parent moves the wrong distance

If a parent element has a CSS `transform`, the pointer and the dragged element are working in different coordinate spaces. Inside a parent scaled to `0.5`, the element will travel twice as far as the pointer. Drag constraints and [Reorder](https://motion.dev/docs/react-reorder) thresholds will be out by the same amount.

Pass the transformed parent's ref to `correctParentTransform`, and the result to `MotionConfig` via [`transformPagePoint`](https://motion.dev/docs/react-motion-config#transformpagepoint).

```
import { motion, MotionConfig, correctParentTransform } from "motion/react"
import { useRef } from "react"

export function Component() {
  const ref = useRef(null)

  return (
    <div ref={ref} style={{ transform: "scale(0.5)" }}>
      <MotionConfig transformPagePoint={correctParentTransform(ref)}>
        <motion.div drag />
      </MotionConfig>
    </div>
  )
}
```

The same fix applies to `rotate` and `skew`. If the mismatch comes from an SVG `viewBox` rather than a parent transform, use `transformViewBoxPoint` instead, covered in [SVG animation](https://motion.dev/docs/react-svg-animation).

### Layout animations misbehave inside a scaled parent

[Layout animations](https://motion.dev/docs/react-layout-animations) measure elements in screen space, and can't detect a CSS `transform` applied to an ancestor outside Motion. Elements inside a scaled parent will measure a layout that doesn't match their own coordinate space. If that parent's `transform` is animating, every frame reads as a layout change, so its children can animate their layout continuously.

`correctParentTransform` corrects the gesture but not this measurement. Instead, drive the parent's transform with a motion value, which Motion can account for.

```
import { motion, useMotionValue } from "motion/react"

export function Component() {
  const scale = useMotionValue(1)

  return (
    <motion.div style={{ scale }}>
      <motion.div drag layout />
    </motion.div>
  )
}
```

### Dragging an image shows a ghost image

Draggable components will automatically set `draggable="false"` on their rendered HTML elements, so the browser knows not to handle drag itself. However, `<img>` children will still be actively draggable, showing the browser's default ghost image effect.

These elements need `draggable` set to `false` to disable this ghost effect.

```
<motion.li drag>
  <img draggable={false} />
</motion.li>
```
