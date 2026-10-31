---
source: https://motion.dev/magazine/introducing-magnetic-cursors-in-motion-cursor
title: "Introducing magnetic and zoning features in Motion+ Cursor | Motion Magazine"
fetched: 2026-10-28
---

>[Magazine](https://motion.dev/magazine)/Announcement

# Introducing magnetic and zoning features in Motion+ Cursor

Motion+ Cursor gains powerful magnetic and zoning features, allowing your cursors to react to, snap to, and morph to hit targets.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)13 May 2025

Motion+ Cursor is a creative cursor component for [React](https://motion.dev/docs/cursor) and [Vue](https://motion.dev/docs/vue-cursor). Its simple API makes it quick to spin up cursor effects of any kind, from [floating tooltips](https://examples.motion.dev/react/cursor-follow), [image previews](https://examples.motion.dev/react/cursor-hover-follow), to [entire cursor replacements](https://examples.motion.dev/react/cursor-custom-content).

Today, we're adding two powerful new features to allow your cursors to react dynamically to your site content: **Magnetic cursors** and **cursor zones**.

## Magnetic cursors

Magnetic cursors allow your custom cursor to snap to a pointer target.

Depending on the strength of the `snap`, a cursor can either stick completely onto the target, or respond with a subtle "pull" like in the example above.

By default, a magnetic cursor will morph to the same shape as the target using Motion's layout animations. But this can be disabled with the `morph` option:

In the iOS pointer example you'll notice the button label is also being pulled back towards the `Cursor`, like a mutual attraction. This is implemented with the new `useMagneticPull` hook.

When the provided `ref` becomes the active pointer target, the returned `x`/`y` [motion values](https://motion.dev/docs/react-motion-value) will update with an offset that pulls the element back towards the cursor. This new hook can be used together with custom cursors, or entirely independently.

## Cursor zones

It's now easier to adapt our cursor (or even add/remove one) based on the currently hovered "zone", or area of the web page.

We can define a zone with the `data-cursor-zone` attribute:

We can then use `useCursorState()` to respond when the cursor enters or leaves this zone:

In this example we're choosing to render content into the cursor (or not). Equally, we could:

* Change the cursor color
* Change the `mix-blend-mode`
* Change size/shape
* Add/remove a custom cursor

You have full freedom to invent ways in which you cursor can adapt to cursor zones.

## Accessibility

Motion+ Cursor opens up the full spectrum of cursor effects, from sober zone-isolated tooltips, to experimental full cursor replacements.

Different types of site will lie somewhere on this spectrum, but one thing they should all have in common is to respect users who have enabled prefers reduced motion in their OS settings.

Motion makes this straightforward with its `useReducedMotion` [hook](https://motion.dev/docs/react-use-reduced-motion).

## How do I get Motion+ Cursor?

Motion+ Cursor is a premium API included in [Motion+](https://motion.dev/plus).

Motion+ is a one-time fee, lifetime membership. Besides supporting Motion, it gets you access to:

* Premium APIs like Cursor, `AnimateNumber` and `splitText`
* Source code to all [Motion Examples](https://motion.dev/examples)
* [Early access](https://motion.dev/plus) content and APIs
* A private Discord with over 200 Motion superusers

Hope to see you in the Discord!
