---
source: https://motion.dev/docs/base-ui
title: "Base UI & Motion"
fetched: 2026-10-28
---

# Base UI & Motion

Animate Base UI components with Motion.

[Base UI](https://base-ui.com/) is a component library for React that's rapidly growing in popularity.

It's possible to animate almost all Base UI components with Motion, and in this guide we'll explore how.

Live example: https://examples.motion.dev/react/base-tabs

## Setup `motion` components

By default, Base UI components render and control their own DOM elements. However most components provide [the ](https://base-ui.com/react/handbook/composition#composing-custom-react-components)`render`[ prop](https://base-ui.com/react/handbook/composition#composing-custom-react-components) that allows you to switch this out for a `motion`[ component](https://motion.dev/docs/react-motion-component).

```
import { Menu } from "@base-ui-components/react/menu"
import { motion } from "motion/react"

function Component() {
  return (
    <Menu.Trigger render={
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whilePress={{ scale: 0.9 }}
      />
    } />
  )
}
```

## Exit animations
In most situations, you can animate Base UI components as they leave the DOM using `AnimatePresence` and the `exit` prop, as usual:

```
<AnimatePresence>
  {open && (
    <Menu.Trigger render={
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    } />
  )}
</AnimatePresence>
```

However, some Base UI components like `ContextMenu` and `Popover` control this conditional rendering themselves. To add exit animations to these components, we must:

- Hoist their `open` state

- Add `keepMounted` to their `Portal` component

- Conditionally render the `Portal` component with `AnimatePresence`

A component's `open` state can be hoisted by defining it manually with `useState`:

```
const [open, setOpen] = useState(false)

return (
  <ContextMenu.Root open={open} onOpenChange={setOpen}>
```

Then, conditionally render the `Portal` (with a `keepMounted` prop) as a child of `AnimatePresence`:

```
return (
   <ContextMenu.Root open={open} onOpenChange={setOpen}>
    <ContextMenu.Trigger>Open menu</ContextMenu.Trigger>
    <AnimatePresence>
      {open && (
        <ContextMenu.Portal keepMounted>
```

We can then add an exit animation via a `motion` component rendered via a `render` prop:

```
function App() {
  const [open, setOpen] = useState(false)
  
  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger>Open menu</ContextMenu.Trigger>
      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner>
              <ContextMenu.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, transform: "scale(0.9)" }}
                    animate={{ opacity: 1, transform: "scale(1)" }}
                    exit={{ opacity: 0, transform: "scale(0.9)" }}
                  />
                }
              >
                {/* Children */}
              </ContextMenu.Popup>
```

**Note:**
`Portal` will keep the tree mounted as long as Base UI detects animations on an element using <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/getAnimations">element.getAnimations()</a></code>. Motion will run `opacity`, `transform`, `filter`, and `clipPath` animations via hardware acceleration, so ensure at least one of these values is used for the exit animation.

## Examples

Live example: https://examples.motion.dev/react/base-progress

[Motion+](https://motion.dev/plus) unlocks the source code to the full vault of Motion examples. It's a one-time payment, lifetime update membership that also unlocks a creative animation library containing components like `Cursor` and `AnimateNumber`.

Check out all the [Motion x Base UI examples](https://motion.dev/examples?platform=react&category=base-ui).

Motion+ also includes a custom LLM ruleset for Motion x Base UI to improve the way your AI editor will integrate the two libraries.

Live example: https://examples.motion.dev/react/base-dialog
