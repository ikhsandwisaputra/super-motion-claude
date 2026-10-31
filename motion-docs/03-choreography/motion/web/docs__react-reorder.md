---
source: https://motion.dev/docs/react-reorder
title: "Reorder"
fetched: 2026-10-28
---

# Reorder

Drag-to-reorder lists and grids with automatic layout and exit animations.

The `Reorder` components can be used to create drag-to-reorder layouts, like reorderable tabs, todo lists, or grids.

`Reorder.Group` automatically detects whether its items are arranged horizontally, vertically, or across both dimensions.

```
const [items, setItems] = useState([0, 1, 2, 3])

return (
  <Reorder.Group values={items} onReorder={setItems}>
    {items.map((item) => (
      <Reorder.Item key={item} value={item}>
        {item}
      </Reorder.Item>
    ))}
  </Reorder.Group>
)
```

## Usage

Every reorderable layout is wrapped in the `Reorder.Group` component.

```
import { Reorder } from "motion/react"

function List() {
  return (
    <Reorder.Group>
    
    </Reorder.Group>
  )
}
```

By default, this is rendered as a `<ul>`, but this can be changed with the `as` prop.

```
<Reorder.Group as="ol">
```

`Reorder.Group` must receive the array of values in your reorderable layout through the `values` prop.

An `onReorder` event will fire with the latest calculated order. For items to reorder, this must update the `values` state.

```
import { Reorder } from "motion/react"

function List() {
  const [items, setItems] = useState([0, 1, 2, 3])

  return (
    <Reorder.Group values={items} onReorder={setItems}>
    
    </Reorder.Group>
  )
}
```

To render each reorderable item, use `Reorder.Item`, passing it the value it represents via the `value` prop.

```
import { Reorder } from "motion/react"

function List() {
  const [items, setItems] = useState([0, 1, 2, 3])

  return (
    <Reorder.Group values={items} onReorder={setItems}>
      {items.map(item => (
        <Reorder.Item key={item} value={item}>
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
```

Now, when items are dragged and reordered, `onReorder` will fire with a new order.

### Drag axis

`Reorder.Group` detects the drag axis from the position of its items. A row uses the `x` axis, a column uses the `y` axis, and a grid or wrapped layout uses both.

You can set the `axis` prop to `"x"`, `"y"`, or `"xy"` when you need to override the detected axis.

```jsx
<Reorder.Group
  axis="xy"
  values={items}
  onReorder={setItems}
  className="grid"
>
  {items.map((item) => (
    <Reorder.Item key={item} value={item}>
      {item}
    </Reorder.Item>
  ))}
</Reorder.Group>
```

Live example: https://examples.motion.dev/react/reorder-grid

### Exit animations

`AnimatePresence` can be used as normal to animate items as they enter/leave the React tree.

```
<AnimatePresence>
  {items.map(item => (
    <Reorder.Item
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={item}
    />  
  ))}
</AnimatePresence>
```

### Drag triggers

By default, all of a `Reorder.Item` will be draggable. `useDragControls` can be used to define a different component to act as a drag trigger.

```
import { Reorder, useDragControls } from "motion/react"

function Item({ value }) {
  const controls = useDragControls()
  
  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={controls}
    >
      <div
        className="reorder-handle"
        onPointerDown={(e) => controls.start(e)}
      />
    </Reorder.Item>
  )
}
```

### Auto-scroll lists

If a `Reorder.Group` is within a scrollable container, the container will automatically scroll when a user drags an item towards the top and bottom of the list.

The closer to the edge of the container, the faster the scroll.

Live example: https://examples.motion.dev/react/todo-list

### z-index

`Reorder.Item` will automatically set a `z-index` style on the currently dragged item so it appears above the surrounding items.

However, `z-index` only affects items with `position !== "static"`. So to enable this effect ensure the position of the `Reorder.Item` is set to `relative` or `absolute`.

## API

### `Reorder.Group`

#### `as`

**Default**: `"ul"`

The underlying element for `Reorder.Group` to render as.

```
<Reorder.Group as="div"></Reorder.Group>
```

#### `axis`

**Default**: Automatically detected

The axis used for dragging and reorder detection.

Motion detects `"x"` for horizontal layouts, `"y"` for vertical layouts, and `"xy"` for grids and wrapped layouts. Set `axis` to one of these values to override automatic detection.

```
<Reorder.Group axis="xy" values={items} onReorder={setItems}>
```

#### `values`

The values array that will be reordered. Each item in this list must match a `value` passed to each `Reorder.Item`.

#### `onReorder`

A callback that will fire when items are detected to have reordered. The provided `newOrder` should be passed to a `values` state update function.

```
const [items, setItems] = useState([0, 1, 2, 3])

return (
  <Reorder.Group values={items} onReorder={setItems}>
```

### `Reorder.Item`

`Reorder.Item` components accept all `motion`[ component props](https://motion.dev/docs/react-motion-component) in addition to the following:

#### `as`

**Default:** `"li"`

The element for `Reorder.Item` to render as.

#### `value`

When `onReorder` is called, this is the value that will be passed through in the newly ordered array.
