---
source: https://p5js.org/reference/p5/noErase/
title: "noErase"
fetched: 2026-10-28
---

Ends erasing that was started with [erase()](https://p5js.org/reference/p5/erase/).

The [fill()](https://p5js.org/reference/p5/fill/), [stroke()](https://p5js.org/reference/p5/stroke/), and [blendMode()](https://p5js.org/reference/p5/blendMode/) settings will return to what they were prior to calling [erase()](https://p5js.org/reference/p5/erase/).

## Examples

## Syntax

`noErase()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/setting.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/setting.js#L1726) and open a pull request!

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

  background(235, 145, 15);

  // Draw the left rectangle.
  noStroke();
  fill(30, 45, 220);
  rect(30, 10, 10, 80);

  // Erase a circle.
  erase();
  circle(50, 50, 60);
  noErase();

  // Draw the right rectangle.
  rect(70, 10, 10, 80);

  describe('An orange canvas with two tall blue rectangles. A circular hole in the center erases the rectangle on the left but not the one on the right.');
}
```
