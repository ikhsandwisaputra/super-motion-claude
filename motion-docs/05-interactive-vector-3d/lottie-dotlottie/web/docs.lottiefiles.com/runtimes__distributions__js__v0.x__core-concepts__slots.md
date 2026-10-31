---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/core-concepts/slots.md
title: ""
fetched: 2026-10-28
---

# Override properties with slots
Use the slot system to dynamically modify animation properties at runtime, including colors, text, scalars, vectors, and gradients.

Slots let you override individual properties inside an animation at runtime — a brand color, a headline text, a gradient — without modifying the source file. A slot is a named, typed placeholder that a designer exposes in the animation; your code sets its value. Slot types are `color`, `scalar`, `vector`, `gradient`, `text`, and `image`. For the concept behind slots and how they relate to themes, see [How the web player works](/en/runtimes/distributions/js/v0.x/core-concepts#themes-and-slots).

## Discover the available slots

Use `getSlotIds()` after the animation loads to find all slots defined in it, and `getSlotType()` to check a slot's type:

```javascript
import { DotLottie } from "@lottiefiles/dotlottie-web";

const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "animation.lottie",
  autoplay: true,
  loop: true,
});

dotLottie.addEventListener("load", () => {
  const slotIds = dotLottie.getSlotIds();
  console.log("Available slots:", slotIds);
  // e.g. ["primaryColor", "headlineText", "backgroundGradient"]

  // Check a slot's type
  const type = dotLottie.getSlotType("primaryColor");
  console.log("primaryColor type:", type); // "color"
});
```

## Set slot values

Each slot type has a dedicated setter. Values can be static or animated with keyframes (see [Animate slot values](#animate-slot-values-with-keyframes)).

### Set a color slot

Color values are `[r, g, b, a]` arrays with values in the 0–1 range:

```javascript
// Static color
dotLottie.setColorSlot("primaryColor", [1, 0, 0, 1]); // Red

// Animated color (keyframes)
dotLottie.setColorSlot("primaryColor", [
  { t: 0, s: [1, 0, 0, 1] }, // Red at frame 0
  { t: 30, s: [0, 0, 1, 1] }, // Blue at frame 30
]);
```

### Set a scalar slot

```javascript
// Static value
dotLottie.setScalarSlot("opacity", 0.5);

// Animated value
dotLottie.setScalarSlot("opacity", [
  { t: 0, s: 0 },
  { t: 60, s: 1 },
]);
```

### Set a vector slot

```javascript
// Static vector [x, y]
dotLottie.setVectorSlot("offset", [10, 20]);

// Animated vector
dotLottie.setVectorSlot("offset", [
  { t: 0, s: [0, 0] },
  { t: 30, s: [100, 50] },
]);
```

### Set a gradient slot

Gradients are a flat number array in the format `[offset, r, g, b, offset, r, g, b, ...]`, where each color stop is 4 numbers: an offset (0–1) followed by R, G, B values (0–1). Pass the number of color stops as the third argument:

```javascript
// Two-stop gradient: red at 0%, blue at 100%
dotLottie.setGradientSlot(
  "backgroundGradient",
  [
    0,
    1,
    0,
    0, // offset=0, R=1, G=0, B=0 (red)
    1,
    0,
    0,
    1,
  ], // offset=1, R=0, G=0, B=1 (blue)
  2 // colorStopCount
);
```

### Set a text slot

Text slots accept a `TextDocument` object:

```javascript
dotLottie.setTextSlot("headlineText", {
  t: "Hello, World!", // text content
  s: 24, // font size
  fc: [0, 0, 0, 1], // fill color [r, g, b, a]
  f: "Arial", // font family
});
```

### Set several slots at once

Use `setSlots` to update multiple slots in a single call — this is also how image slots are set:

```javascript
dotLottie.setSlots({
  primaryColor: [1, 0, 0, 1],
  headlineText: { t: "Updated!" },
  opacity: 0.8,
});
```

## Read slot values

```javascript
// Get a single slot value
const value = dotLottie.getSlot("primaryColor");

// Get all slot values
const allSlots = dotLottie.getSlots();
console.log(allSlots);
```

## Reset or clear slots

Reset restores a slot's default value; clear removes the override without restoring the default:

```javascript
// Reset one slot to its default value
dotLottie.resetSlot("primaryColor");

// Reset all slots
dotLottie.resetSlots();

// Clear a slot value (removes override without restoring default)
dotLottie.clearSlot("primaryColor");

// Clear all slot values
dotLottie.clearSlots();
```

## Animate slot values with keyframes

Animated slot values use keyframes with the following structure (Lottie native format):

```typescript
interface Keyframe<T> {
  t: number; // frame number (time)
  s: T; // start value at this keyframe
  h?: 0 | 1; // hold keyframe (1 = no interpolation to next keyframe)
  i?: BezierHandle; // incoming bezier easing handle
  o?: BezierHandle; // outgoing bezier easing handle
}

interface BezierHandle {
  x: number[];
  y: number[];
}
```

## Related

- [Apply themes at runtime](/en/runtimes/distributions/js/v0.x/core-concepts/theming) for whole-animation restyling
- [API Reference — Slot System](/en/runtimes/distributions/js/v0.x/api/reference#slot-system-dynamic-properties) for the full method and type list
