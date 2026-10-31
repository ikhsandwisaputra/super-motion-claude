---
source: https://p5js.org/reference/p5/textAlign/
title: "textAlign"
fetched: 2026-10-28
---

Sets the way text is aligned when [text()](https://p5js.org/reference/p5/text/) is called.

By default, calling `text('hi', 10, 20)` places the bottom-left corner of the text's bounding box at (10, 20).

The first parameter, `horizAlign`, changes the way [text()](https://p5js.org/reference/p5/text/) interprets x-coordinates. By default, the x-coordinate sets the left edge of the bounding box. `textAlign()` accepts the following values for `horizAlign`: `LEFT`, `CENTER`, or `RIGHT`.

The second parameter, `vertAlign`, is optional. It changes the way [text()](https://p5js.org/reference/p5/text/) interprets y-coordinates. By default, the y-coordinate sets the bottom edge of the bounding box. `textAlign()` accepts the following values for `vertAlign`: `TOP`, `BOTTOM`, `CENTER`, or `BASELINE`.

Calling `textAlign()` without arguments returns the current alignment settings.

## Examples

## Syntax

`textAlign([horizAlign], [vertAlign])`

## Parameters

horizAlign

LEFT|CENTER|RIGHT: horizontal alignment

vertAlign

TOP|BOTTOM|CENTER|BASELINE: vertical alignment

## Returns

Object: If no arguments are provided, returns an object with current horizontal and vertical alignment

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
  createCanvas(100, 100);

  background(200);

  // Draw a vertical line.
  strokeWeight(0.5);
  line(50, 0, 50, 100);

  // Top line.
  textSize(16);
  textAlign(RIGHT);
  text('ABCD', 50, 30);

  // Middle line.
  textAlign(CENTER);
  text('EFGH', 50, 50);

  // Bottom line.
  textAlign(LEFT);
  text('IJKL', 50, 70);

  describe('The letters ABCD displayed at top-left, EFGH at center, and IJKL at bottom-right. A vertical line divides the canvas in half.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  strokeWeight(0.5);

  // First line.
  line(0, 12, width, 12);
  textAlign(CENTER, TOP);
  text('TOP', 50, 12);

  // Second line.
  line(0, 37, width, 37);
  textAlign(CENTER, CENTER);
  text('CENTER', 50, 37);

  // Third line.
  line(0, 62, width, 62);
  textAlign(CENTER, BASELINE);
  text('BASELINE', 50, 62);

  // Fourth line.
  line(0, 97, width, 97);
  textAlign(CENTER, BOTTOM);
  text('BOTTOM', 50, 97);

  describe('The words "TOP", "CENTER", "BASELINE", and "BOTTOM" each drawn relative to a horizontal line. Their positions demonstrate different vertical alignments.');
}
```
