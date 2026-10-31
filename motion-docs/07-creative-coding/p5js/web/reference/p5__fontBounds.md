---
source: https://p5js.org/reference/p5/fontBounds/
title: "fontBounds"
fetched: 2026-10-28
---

Computes a generic (non-tight) bounding box for a block of text.

The `fontBounds()` function calculates the bounding box for the text based on the font's intrinsic metrics (such as `fontBoundingBoxAscent` and `fontBoundingBoxDescent`). Unlike `textBounds()`, which measures the exact pixel boundaries of the rendered text, `fontBounds()` provides a looser measurement derived from the font’s default spacing. This measurement is useful for layout purposes where a consistent approximation of the text's dimensions is desired.

## Examples

## Syntax

`fontBounds(str, x, y, [width], [height])`

## Parameters

str

String: The text string to measure.

x

Number: The x-coordinate where the text is drawn.

y

Number: The y-coordinate where the text is drawn.

width

Number: (Optional) The maximum width available for the text block. When specified, the text may be wrapped to fit within this width.

height

Number: (Optional) The maximum height available for the text block. Any lines exceeding this height will be truncated.

## Returns

Object: An object with properties `x`, `y`, `w`, and `h` representing the loose bounding box of the text based on the font's intrinsic metrics.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/type/textCore.js](https://github.com/processing/p5.js/blob/v2.3.3/src/type/textCore.js#L1297) and open a pull request!

---

## Related References

* [textToContours

  Returns an array of arrays of points outlining a string of text written using the font.](https://p5js.org/reference/p5.Font/textToContours/)
* [textToModel

  Converts text into a 3D model that can be rendered in WebGL mode.](https://p5js.org/reference/p5.Font/textToModel/)
* [textToPaths

  Returns a flat array of path commands that describe the outlines of a string of text.](https://p5js.org/reference/p5.Font/textToPaths/)
* [textToPoints

  Returns an array of points outlining a string of text written using the font.](https://p5js.org/reference/p5.Font/textToPoints/)

## Example code (extracted)

```js
function setup() {
  createCanvas(300, 200);
  background(240);

  textSize(32);
  textAlign(LEFT, TOP);
  textFont('Georgia');

  let txt = "Hello, World!";
  // Compute the bounding box based on the font's intrinsic metrics
  let bounds = fontBounds(txt, 50, 50);

  fill(0);
  text(txt, 50, 50);

  noFill();
  stroke('green');
  rect(bounds.x, bounds.y, bounds.w, bounds.h);

  noStroke();
  fill(50);
  textSize(15);
  text("Font Bounds: x=" + bounds.x.toFixed(1) + ", y=" + bounds.y.toFixed(1) +
       ", w=" + bounds.w.toFixed(1) + ", h=" + bounds.h.toFixed(1), 8, 100);
}
```
