---
source: https://motion.dev/docs/react-animate-activity
title: "AnimateActivity"
fetched: 2026-10-28
---

# AnimateActivity

Motion+ early access (paid). Not included in the free motion package. Install Motion UI: https://motion.dev/docs/react-motion-ui-installation. Import: `import { AnimateActivity } from "motion-plus/animate-activity"`. Add enter, exit, and layout animations to components inside React's Activity boundaries.

`AnimateActivity` is an animated version of React's `[Activity](https://react.dev/reference/react/Activity)` component. It allows you to add exit animations when hiding elements.

Whereas `[AnimatePresence](https://motion.dev/docs/react-animate-presence)` animates elements when they're added and removed from the tree, `AnimateActivity` uses the `Activity` component to show and hide the children with `display: none`, maintaining their internal state.

`AnimateActivity` is an animated version of React's `Activity` component. It allows you to add exit animations when hiding elements.

Whereas `AnimatePresence` animates elements when they're **added** and **removed** from the tree, `AnimateActivity` uses the `Activity` component to **show** and **hide** the children with `display: none`, maintaining their internal state.

```
<AnimateActivity mode={isVisible ? "visible" : "hidden"}>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  />
</AnimateActivity>
```

`AnimateActivity` is currently available in [Motion+](https://motion.dev/plus) Early Access. As an Early Access API, expect changes as we receive feedback.

Live example: https://examples.motion.dev/react/animate-activity

## Install

First, [install Motion UI](https://motion.dev/docs/react-motion-ui-installation) in your project. You need to be a [Motion+ member](https://motion.dev/plus) to generate an access token.

Once installed, `AnimateActivity` can be imported via `motion-plus/animate-activity`.

`AnimateActivity` requires `motion@12.23.24` and `react@19.2.0` or above.

Once out of alpha, `AnimateActivity` will be imported from the main `"motion"` package.

## Usage

`AnimateActivity` shares the same API as `Activity`. By switching the `mode` prop from `"visible"` to `"hidden"`, its child element will be hidden with `display: none` **after** child exit animations have completed.

```
<AnimateActivity mode={isVisible ? "visible" : "hidden"}>
  <Tab />
</AnimateActivity>
```

```
function Tab() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )
}
```

### Sequencing

As with `AnimatePresence`, we can use [variants](https://motion.dev/docs/react-animation#variants) to sequence exit animations through a tree.

```
<AnimateActivity mode={isVisible ? "visible" : "hidden"}>
  <motion.ul
    exit="hidden"
    variants={{
      hidden: { delayChildren: stagger(0.1) }
    }}
  >
    {items.map(item => (
      <motion.li
        variants={{ hidden: { opacity: 0 }}}
      >
        {item.title}
      </motion.li>
    ))}
  </motion.ul>
</AnimateActivity>
```

## Layout

By default, exiting children will maintain their default styles in the DOM. This means that if they're `position: static` or in some way affecting the layout of the elements around them, they continue to do so until the exit animation is complete.

We can change this by setting `layoutMode` to `"pop"`. This will immediately pop the element out of its layout, allowing surrounding elements to reflow while it exits.

```
<AnimateActivity
  mode={isVisible ? "visible" : "hidden"}
  layoutMode="pop"
/>
```
