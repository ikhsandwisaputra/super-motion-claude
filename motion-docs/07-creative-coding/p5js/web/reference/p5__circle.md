---
source: https://p5js.org/reference/p5/circle/
title: "circle"
fetched: 2026-10-28
---

Draws a circle.

A circle is a round shape defined by the `x`, `y`, and `d` parameters. `x` and `y` set the location of its center. `d` sets its width and height (diameter). Every point on the circle's edge is the same distance, `0.5 * d`, from its center. `0.5 * d` (half the diameter) is the circle's radius. See [ellipseMode()](https://p5js.org/reference/p5/ellipseMode/) for other ways to set its position.

## Examples

## Syntax

`circle(x, y, d)`

## Parameters

x

Number: x-coordinate of the center of the circle.

y

Number: y-coordinate of the center of the circle.

d

Number: diameter of the circle.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/2d\_primitives.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/2d_primitives.js#L472) and open a pull request!

---

## Related References

* [arc

  Draws an arc.](https://p5js.org/reference/p5/arc/)
* [circle

  Draws a circle.](https://p5js.org/reference/p5/circle/)
* [ellipse

  Draws an ellipse (oval).](https://p5js.org/reference/p5/ellipse/)
* [line

  Draws a straight line between two points.](https://p5js.org/reference/p5/line/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  circle(50, 50, 25);

  describe('A white circle with black outline in the middle of a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  background(200);

  circle(0, 0, 25);

  describe('A white circle with black outline in the middle of a gray canvas.');
}
```
