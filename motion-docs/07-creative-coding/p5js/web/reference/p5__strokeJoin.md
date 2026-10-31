---
source: https://p5js.org/reference/p5/strokeJoin/
title: "strokeJoin"
fetched: 2026-10-28
---

Sets the style of the joints that connect line segments.

Joints are either mitered (`MITER`), beveled (`BEVEL`), or rounded (`ROUND`). The default joint is `MITER` in 2D mode and `ROUND` in WebGL mode.

The argument passed to `strokeJoin()` must be written in ALL CAPS because the constants `MITER`, `BEVEL`, and `ROUND` are defined this way. JavaScript is a case-sensitive language.

Calling `strokeJoin()` without an argument returns the current stroke join style, either `MITER`, `BEVEL`, or `ROUND`.

## Examples

## Syntax

`strokeJoin(join)``strokeJoin()`

## Parameters

join

MITER|BEVEL|ROUND: either MITER, BEVEL, or ROUND

## Returns

MITER|BEVEL|ROUND: the current stroke join style.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/attributes.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/attributes.js#L497) and open a pull request!

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

  // Style the line.
  noFill();
  strokeWeight(10);
  strokeJoin(MITER);

  // Draw the line.
  beginShape();
  vertex(35, 20);
  vertex(65, 50);
  vertex(35, 80);
  endShape();

  describe('A right-facing arrowhead shape with a pointed tip in center of canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the line.
  noFill();
  strokeWeight(10);
  strokeJoin(BEVEL);

  // Draw the line.
  beginShape();
  vertex(35, 20);
  vertex(65, 50);
  vertex(35, 80);
  endShape();

  describe('A right-facing arrowhead shape with a flat tip in center of canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the line.
  noFill();
  strokeWeight(10);
  strokeJoin(ROUND);

  // Draw the line.
  beginShape();
  vertex(35, 20);
  vertex(65, 50);
  vertex(35, 80);
  endShape();

  describe('A right-facing arrowhead shape with a rounded tip in center of canvas.');
}
```
