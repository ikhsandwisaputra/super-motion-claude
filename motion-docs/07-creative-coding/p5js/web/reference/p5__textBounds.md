---
source: https://p5js.org/reference/p5/textBounds/
title: "textBounds"
fetched: 2026-10-28
---

Computes the tight bounding box for a block of text.

The `textBounds()` function calculates the precise pixel boundaries that enclose the rendered text based on the current text properties (such as font, textSize, textStyle, and alignment). If the text spans multiple lines (due to line breaks or wrapping), the function measures each line individually and then aggregates these measurements into a single bounding box. The resulting object contains the x and y coordinates along with the width (w) and height (h) of the text block.

## Examples

## Syntax

`textBounds(str, x, y, [width], [height])`

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

Object: An object with properties `x`, `y`, `w`, and `h` that represent the tight bounding box of the rendered text.

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
  background(220);

  // Set up text properties for clarity
  textSize(32);
  textAlign(LEFT, TOP);

  let txt = "Hello, World!";
  // Compute the bounding box for the text starting at (50, 50)
  let bounds = textBounds(txt, 50, 50);

  // Draw the text
  fill(0);
  text(txt, 50, 50);

  // Draw the computed bounding box in red to visualize the measured area
  noFill();
  stroke('red');
  rect(bounds.x, bounds.y, bounds.w, bounds.h);
}
```
