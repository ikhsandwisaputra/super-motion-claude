---
source: https://p5js.org/reference/p5/strokeWeight/
title: "strokeWeight"
fetched: 2026-10-28
---

Sets the width of the stroke used for points, lines, and the outlines of shapes.

Note: In 2D mode, `strokeWeight()` is affected by transformations, especially calls to [scale()](https://p5js.org/reference/p5/scale/). It isn't affected by transformations in WebGL and WebGPU modes.

Calling `strokeWeight()` without an argument returns the current stroke weight as a number.

## Examples

## Syntax

`strokeWeight(weight)``strokeWeight()`

## Parameters

weight

Number: the weight of the stroke (in pixels).

## Returns

Number: the current stroke weight.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/attributes.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/attributes.js#L567) and open a pull request!

---

## Related References

* [ellipseMode

  Changes where ellipses, circles, and arcs are drawn.](https://p5js.org/reference/p5/ellipseMode/)
* [noSmooth

  Draws certain features with jagged (aliased) edges.](https://p5js.org/reference/p5/noSmooth/)
* [rectMode

  Changes where rectangles and squares are drawn.](https://p5js.org/reference/p5/rectMode/)
* [smooth

  Draws certain features with smooth (antialiased) edges.](https://p5js.org/reference/p5/smooth/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Top.
  line(20, 20, 80, 20);

  // Middle.
  strokeWeight(4);
  line(20, 40, 80, 40);

  // Bottom.
  strokeWeight(10);
  line(20, 70, 80, 70);

  describe('Three horizontal black lines. The top line is thin, the middle is medium, and the bottom is thick.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Top.
  line(20, 20, 80, 20);

  // Scale by a factor of 5.
  scale(5);

  // Bottom. Coordinates are adjusted for scaling.
  line(4, 8, 16, 8);

  describe('Two horizontal black lines. The top line is thin and the bottom is five times thicker than the top.');
}
```
