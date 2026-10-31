---
source: https://motion.dev/docs/3d-transforms
title: "3D transforms and perspective"
fetched: 2026-10-28
---

# 3D transforms and perspective

How the z axis, perspective and preserve-3d work on the web, and how to animate them with Motion.

Web pages usually use two-dimensional layouts.

Elements are infinitely thin 2D planes with layout rules that only consider the `x` and `y` axes.

However, CSS transforms do have the concept of 3D space. With transforms, elements can be translated and rotated, yes on the conventional `x` and `y` axes, but also along the `z` axis, with the visual effect of pushing an element into, or pulling it out of, the screen.

In this guide, we'll take a look at 3D transforms and perspective, and how we can use those to build flipping and tilting animations.

## The three axes

CSS coordinates are slightly different from the graph paper you might remember from school. The `0, 0` origin point is in the screen's top-left corner. Positive `x` runs across the top, while positive `y` runs **down** the left.

You can visualise the `0` point of the `z` axis as anywhere on the screen, with positive values coming towards you and negative values going deeper "into" the screen.

## Rotations

Rotating using a CSS `rotate` function will rotate an element in the intuitive way, in 2D space, like a clock.

We can also specify a specific axis to rotate around:

- `rotateX` tips the element forwards and backwards, like closing a laptop.
- `rotateY` swings it like a door on a vertical hinge.
- `rotateZ` spins it on the screen. It's the same movement as `rotate`.

It sometimes feels odd that `rotateZ` is one that provides the 2D rotation. But think rotation axis as a skewer, piercing the element on the given axis. Putting a skewer through the screen, the z-axis, is the one that would result in the clock-like rotation.

## Perspective

Without perspective, however, the browser projects these rotated elements without depth. A `rotateY(45deg)` element looks much like `scaleX(0.5)`: it gets narrower, but its far edge doesn't shrink into the distance.

To fix this, we add perspective. Perspective is defined as the distance, in px, between the viewer and the `z: 0` plane (the screen).

If you've ever used a camera before, this should be familiar. Watch what happens in the above illustration as the camera gets closer to the screen. The field of view gets wider.

Cameras with a wider field of view exaggerate depth. Closer objects look deeper, items in the distance appear further away. Therefore, smaller perspective values that put the viewer "closer" to the screen will provide deeper rotations and greater separation between objects.

Set the `perspective` property on the parent element:

```css
.scene {
  perspective: 800px;
}
```

Setting `perspective` has the side effect of creating a new [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context), scoping internal `z-index` to this element and ensuring `position: absolute` children are positioned relative to the parent.

### `perspective` vs `perspective()`

There are two ways to add perspective, and they are not interchangeable.

The `perspective` **CSS property** goes on a parent. Its children share one vanishing point, as if you'd photographed the whole scene at once.

The `perspective()` **transform function** goes inside an element's own transform. Each element gets a vanishing point at its own centre, as if you'd photographed every object separately.

Use the parent property for shelves, carousels and cubes:

```css
.shelf {
  perspective: 1000px;
}
```

Use the function for a self-contained widget, like a single tilt card:

```css
.card {
  transform: perspective(800px) rotateY(30deg);
}
```

**Note:** `perspective` must go at the start of a transform string to work.

Motion exposes the function as `transformPerspective` and serialises it in the correct place automatically:

```js
import { animate } from "motion"

animate(".card", {
  transformPerspective: 800,
  rotateY: 30,
})
```

### Moving the camera

`perspective-origin` moves the vanishing point. It defaults to `50% 50%`, the centre of the perspective element.

```css
.scene {
  perspective: 800px;
  perspective-origin: 50% 0%;
}
```

Move this origin and we can make it feel like the user is looking up or down at a scene.

Live example: https://examples.motion.dev/js/perspective-origin

## Building a card flip

With a perspective camera in place, `rotateX` and `rotateY` have depth. The card flip is the useful 3D 101 because it contains almost every part you'll use elsewhere.

It needs two faces in the same position. The back begins rotated by `180deg`, facing away from you:

```html
<div class="scene">
  <div class="card">
    <div class="face front">Front</div>
    <div class="face back">Back</div>
  </div>
</div>
```

The parent supplies `perspective`. The card preserves its children's depth, and each face hides when it turns away using `backface-visibility`:

```css
.scene {
  perspective: 1000px;
}

.card {
  position: relative;
  transform-style: preserve-3d;
}

.face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}
```

Without `backface-visibility: hidden`, the browser draws the reverse of each face when it turns away, but here we want to make the illusion of a single card using each element for each face.

By default, `perspective` only extends one element deep, in this example `.card`. Adding `transform-style: preserve-3d` declaration extends the 3D space to the card faces.

The animation itself is a straightforward state switch:

```js
import { animate, press } from "motion"

let flipped = false

press(".card", (card) => {
  flipped = !flipped
  animate(card, { rotateY: flipped ? 180 : 0 })
})
```

Live example: https://examples.motion.dev/js/card-flip

### Forced flattening

Unfortunately, writing `preserve-3d` doesn't guarantee a 3D projection will extend through to an element's children.

Some CSS properties require the browser to render a subtree as one flat image before applying their effect. The spec calls them [grouping property values](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style). When one appears on a 3D parent, the used value of `transform-style` is forced to `flat`.

The common ones are:

- `overflow` with any value except `visible` or `clip`
- `opacity` below `1`
- `filter` with any value except `none`
- `clip-path` with any value except `none`
- `mask-image` with any value except `none`
- `mix-blend-mode` with any value except `normal`
- `isolation: isolate`
- Paint containment, including `contain: paint` and `content-visibility: hidden`

`overflow: hidden` is the usual culprit, often added much earlier to clip a corner. `opacity` is sneakier - fade a 3D scene in and it stays flat during the fade, then pops into depth when opacity reaches `1`.

## Animating 3D with Motion

Unlike CSS, Motion can each transform axis independently. The 3D values are `z`, `rotateX`, `rotateY`, `rotateZ` and `transformPerspective`, alongside the [full transform list](https://motion.dev/docs/animate).

This matters for more than tidy code. One animation can spring the rotation while another [tweens](https://motion.dev/docs/tween) `z`, without either replacing the other's transform string:

```js
import { animate } from "motion"

animate(
  ".card",
  { rotateX: 12, z: -40 },
  {
    type: "spring",
    visualDuration: 0.5,
    bounce: 0.25,
    z: { duration: 0.5, ease: "circInOut" },
  },
)
```

For a hover tilt, map the pointer's position inside the card to `rotateX` and `rotateY`. `hover` handles the listener lifecycle and filters the synthetic hover events emitted by touch devices:

```js
import { animate, hover } from "motion"

const maxTilt = 15

card.addEventListener("pointermove", (event) => {
  const rect = card.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height

  animate(card, {
    transformPerspective: 500,
    rotateX: maxTilt * (0.5 - y),
    rotateY: maxTilt * (x - 0.5),
  }))
})
```

Live example: https://examples.motion.dev/js/tilt-card

The same values work for entrances. A dialog arriving from `z: -100` with a small `rotateY` feels like it moves through space rather than across a sheet of glass.

Live example: https://examples.motion.dev/js/modal

## Performance

3D transforms, despite being so powerful, are the most performance-friendly values in CSS. Motion runs these animations hardware accelerated, whether you animate `transform` directly or independent values like `rotateY` and `z`.

But 3D isn't free.

To sort surfaces in depth, the browser tends to keep them on separate composited layers. Each layer needs a texture in GPU memory, sized to the element.

A handful of cards is fine but if you're using a lot of 3D transforms then, as always, remember to check performance on low-powered devices.
