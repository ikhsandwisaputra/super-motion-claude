---
source: https://p5js.org/reference/p5/noStroke/
title: "noStroke"
fetched: 2026-10-28
---

Disables drawing points, lines, and the outlines of shapes.

Calling `noStroke()` is the same as making the stroke completely transparent, as in `stroke(0, 0)`. If both `noStroke()` and [noFill()](https://p5js.org/reference/p5/noFill/) are called, nothing will be drawn to the screen.

## Examples

## Syntax

`noStroke()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/setting.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/setting.js#L1391) and open a pull request!

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

  noStroke();
  square(20, 20, 60);

  describe('A white square with no outline.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A pink cube with no edge outlines spinning on a black canvas.');
}

function draw() {
  background(0);

  // Style the box.
  noStroke();
  fill(240, 150, 150);

  // Rotate the coordinates.
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  // Draw the box.
  box(45);
}
```
