---
source: https://p5js.org/reference/p5/endClip/
title: "endClip"
fetched: 2026-10-28
---

Ends defining a mask that was started with [beginClip()](https://p5js.org/reference/p5/beginClip/).

## Examples

## Syntax

`endClip()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/setting.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/setting.js#L194) and open a pull request!

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

  // Create a mask.
  beginClip();
  triangle(15, 37, 30, 13, 43, 37);
  circle(45, 45, 7);
  endClip();

  // Draw a backing shape.
  square(5, 5, 45);

  describe('A white triangle and circle on a gray background.');
}
```
