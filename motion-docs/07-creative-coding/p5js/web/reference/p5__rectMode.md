---
source: https://p5js.org/reference/p5/rectMode/
title: "rectMode"
fetched: 2026-10-28
---

Changes where rectangles and squares are drawn.

By default, the first two parameters of [rect()](https://p5js.org/reference/p5/rect/) and [square()](https://p5js.org/reference/p5/square/), are the x- and y-coordinates of the shape's upper left corner. The next parameters set the shape's width and height. This is the same as calling `rectMode(CORNER)`.

`rectMode(CORNERS)` also uses the first two parameters as the location of one of the corners. The next parameters are the location of the opposite corner. This mode only works for [rect()](https://p5js.org/reference/p5/rect/).

`rectMode(CENTER)` uses the first two parameters as the x- and y-coordinates of the shape's center. The next parameters are its width and height.

`rectMode(RADIUS)` also uses the first two parameters as the x- and y-coordinates of the shape's center. The next parameters are half of the shape's width and height.

The argument passed to `rectMode()` must be written in ALL CAPS because the constants `CENTER`, `RADIUS`, `CORNER`, and `CORNERS` are defined this way. JavaScript is a case-sensitive language.

Calling `rectMode()` without an argument returns the current rectMode, either `CORNER`, `CORNERS`, `CENTER`, or `RADIUS`.

## Examples

## Syntax

`rectMode(mode)``rectMode()`

## Parameters

mode

CENTER|RADIUS|CORNER|CORNERS: either CORNER, CORNERS, CENTER, or RADIUS

## Returns

CENTER|RADIUS|CORNER|CORNERS: the current rectMode.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/attributes.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/attributes.js#L272) and open a pull request!

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

  rectMode(CORNER);
  fill(255);
  rect(25, 25, 50, 50);

  rectMode(CORNERS);
  fill(100);
  rect(25, 25, 50, 50);

  describe('A small gray square drawn at the top-left corner of a white square.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  rectMode(RADIUS);
  fill(255);
  rect(50, 50, 30, 30);

  rectMode(CENTER);
  fill(100);
  rect(50, 50, 30, 30);

  describe('A small gray square drawn at the center of a white square.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  rectMode(CORNER);
  fill(255);
  square(25, 25, 50);

  describe('A white square.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  rectMode(RADIUS);
  fill(255);
  square(50, 50, 30);

  rectMode(CENTER);
  fill(100);
  square(50, 50, 30);

  describe('A small gray square drawn at the center of a white square.');
}
```
