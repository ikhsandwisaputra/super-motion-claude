---
source: https://p5js.org/reference/p5/noFill/
title: "noFill"
fetched: 2026-10-28
---

Disables setting the fill color for shapes.

Calling `noFill()` is the same as making the fill completely transparent, as in `fill(0, 0)`. If both [noStroke()](https://p5js.org/reference/p5/noStroke/) and `noFill()` are called, nothing will be drawn to the screen.

## Examples

## Syntax

`noFill()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/setting.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/setting.js#L1342) and open a pull request!

---

## Related References

* [background

  Sets the color used for the background of the canvas.](https://p5js.org/reference/p5/background/)
* [beginClip

  Starts defining a shape that will mask any shapes drawn afterward.](https://p5js.org/reference/p5/beginClip/)
* [blendMode

  Sets the way colors blend when added to the canvas.](https://p5js.org/reference/p5/blendMode/)
* [clear

  Clears the pixels on the canvas.](https://p5js.org/reference/p5/clear/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Draw the top square.
  square(32, 10, 35);

  // Draw the bottom square.
  noFill();
  square(32, 55, 35);

  describe('A white square on above an empty square. Both squares have black outlines.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A purple cube wireframe spinning on a black canvas.');
}

function draw() {
  background(0);

  // Style the box.
  noFill();
  stroke(100, 100, 240);

  // Rotate the coordinates.
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  // Draw the box.
  box(45);
}
```
