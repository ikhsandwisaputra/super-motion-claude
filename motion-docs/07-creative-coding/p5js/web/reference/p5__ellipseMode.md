---
source: https://p5js.org/reference/p5/ellipseMode/
title: "ellipseMode"
fetched: 2026-10-28
---

Changes where ellipses, circles, and arcs are drawn.

By default, the first two parameters of [ellipse()](https://p5js.org/reference/p5/ellipse/), [circle()](https://p5js.org/reference/p5/circle/), and [arc()](https://p5js.org/reference/p5/arc/) are the x- and y-coordinates of the shape's center. The next parameters set the shape's width and height. This is the same as calling `ellipseMode(CENTER)`.

`ellipseMode(RADIUS)` also uses the first two parameters to set the x- and y-coordinates of the shape's center. The next parameters are half of the shapes's width and height. Calling `ellipse(0, 0, 10, 15)` draws a shape with a width of 20 and height of 30.

`ellipseMode(CORNER)` uses the first two parameters as the upper-left corner of the shape. The next parameters are its width and height.

`ellipseMode(CORNERS)` uses the first two parameters as the location of one corner of the ellipse's bounding box. The next parameters are the location of the opposite corner.

The argument passed to `ellipseMode()` must be written in ALL CAPS because the constants `CENTER`, `RADIUS`, `CORNER`, and `CORNERS` are defined this way. JavaScript is a case-sensitive language.

Calling `ellipseMode()` without an argument returns the current ellipseMode, either `CENTER`, `RADIUS`, `CORNER`, or `CORNERS`.

## Examples

## Syntax

`ellipseMode(mode)``ellipseMode()`

## Parameters

mode

CENTER|RADIUS|CORNER|CORNERS: either CENTER, RADIUS, CORNER, or CORNERS

## Returns

CENTER|RADIUS|CORNER|CORNERS: the current ellipseMode.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/attributes.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/attributes.js#L84) and open a pull request!

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

  // White ellipse.
  ellipseMode(RADIUS);
  fill(255);
  ellipse(50, 50, 30, 30);

  // Gray ellipse.
  ellipseMode(CENTER);
  fill(100);
  ellipse(50, 50, 30, 30);

  describe('A white circle with a gray circle at its center. Both circles have black outlines.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // White ellipse.
  ellipseMode(CORNER);
  fill(255);
  ellipse(25, 25, 50, 50);

  // Gray ellipse.
  ellipseMode(CORNERS);
  fill(100);
  ellipse(25, 25, 50, 50);

  describe('A white circle with a gray circle at its top-left corner. Both circles have black outlines.');
}
```
