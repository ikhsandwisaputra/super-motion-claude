---
source: https://motion.dev/docs/react-layout-group
title: "LayoutGroup"
fetched: 2026-10-28
---

# LayoutGroup

Coordinate React layout animations between Motion components.

`motion`[ components](https://motion.dev/docs/react-motion-component) with a `layout` prop will perform [layout animations](https://motion.dev/docs/react-layout-animations) every time they commit a React render, or (if set) when their `layoutDependency` prop changes.

`LayoutGroup` is used to group components that might not render together but do affect each-other's visual state.

## Usage

Take these accordion items that each handle their own state:

```
function Item({ header, content }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
    >
      <motion.h2 layout>{header}</motion.h2>
      {isOpen ? content : null}
    </motion.div>
  )
}
```

If we arrange these next to each other in an `Accordion`, when their state updates, their siblings have no way of knowing:

```
function Accordion() {
  return (
    <>
      <ToggleContent />
      <ToggleContent />
    </>  
  )
}
```

This can be fixed by grouping both components with `LayoutGroup`:

```
import { LayoutGroup } from "motion/react"

function Accordion() {
  return (
    <LayoutGroup>
      <ToggleContent />
      <ToggleContent />
    </LayoutGroup>  
  )
}
```

### Namespace `layoutId`

Components expecting to perform shared layout animations are provided a `layoutId` prop.

In this following example, each `Tab` renders an element with the `layoutId="underline"` prop.

```
function Tab({ label, isSelected }) {
  return (
    <li>
      {label}
      {isSelected
        ? <motion.div layoutId="underline" />
        : null}
    </li>  
  )
}

function TabRow({ items }) {
  return items.map(item => <Tab {...item} />)
}
```

`layoutId` is global across your site. So to render multiple `TabRow`s we want to group them with `LayoutGroup` and `id` prop:

```
function TabRow({ id, items }) {
  return (
    <LayoutGroup id={id}>
      {items.map(item => <Tab {...item} />)}
    </LayoutGroup>
}
```
