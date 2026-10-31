---
source: https://p5js.org/reference/p5/pixelDensity/
title: "pixelDensity"
fetched: 2026-10-28
---

Sets the pixel density or returns the current density.

Computer displays are grids of little lights called *pixels*. A display's *pixel density* describes how many pixels it packs into an area. Displays with smaller pixels have a higher pixel density and create sharper images.

`pixelDensity()` sets the pixel scaling for high pixel density displays. By default, the pixel density is set to match the display's density. Calling `pixelDensity(1)` turn this off.

Calling `pixelDensity()` without an argument returns the current pixel density.

## Examples

## Syntax

`pixelDensity([val])``pixelDensity()`

## Parameters

val

Number: desired pixel density.

## Returns

Number: current pixel density of the sketch.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L871) and open a pull request!

---

## Related References

* [cursor

  Changes the cursor's appearance.](https://p5js.org/reference/p5/cursor/)
* [deltaTime

  A Number variable that tracks the number of milliseconds it took to draw the last frame.](https://p5js.org/reference/p5/deltaTime/)
* [describe

  Creates a screen reader-accessible description of the canvas.](https://p5js.org/reference/p5/describe/)
* [describeElement

  Creates a screen reader-accessible description of elements in the canvas.](https://p5js.org/reference/p5/describeElement/)

## Example code (extracted)

```js
function setup() {
  // Set the pixel density to 1.
  pixelDensity(1);

  // Create a canvas and draw
  // a circle.
  createCanvas(100, 100);
  background(200);
  circle(50, 50, 70);

  describe('A fuzzy white circle on a gray canvas.');
}
```

```js
function setup() {
  // Set the pixel density to 3.
  pixelDensity(3);

  // Create a canvas, paint the
  // background, and draw a
  // circle.
  createCanvas(100, 100);
  background(200);
  circle(50, 50, 70);

  describe('A sharp white circle on a gray canvas.');
}
```
