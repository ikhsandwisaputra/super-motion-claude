---
source: https://p5js.org/reference/p5/fontDescent/
title: "fontDescent"
fetched: 2026-10-28
---

Returns the loose descent of the text based on the font's intrinsic metrics.

The `fontDescent()` function calculates the descent of the text using the font's intrinsic metrics (e.g., `fontBoundingBoxDescent`). This value represents the space below the baseline that the font inherently occupies, and is useful for layout purposes when an approximate vertical measurement is required.

## Examples

## Syntax

`fontDescent()`

## Parameters

## Returns

Number: The loose descent value in pixels.

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
  createCanvas(300, 300);
  background(220);

  textSize(48);
  textAlign(LEFT, BASELINE);
  textFont('Georgia');

  let s = "Hello, p5.js!";
  let x = 50, y = 150;

  fill(0);
  text(s, x, y);

  // Get the font descent of the current font
  let fdesc = fontDescent();

  // Draw a red line at the baseline and a blue line at the descent position
  stroke('red');
  line(x, y, x + 200, y); // Baseline
  stroke('blue');
  line(x, y + fdesc, x + 200, y + fdesc); // Font descent position

  noStroke();
  fill(0);
  textSize(16);
  text("fontDescent: " + fdesc.toFixed(2) + " pixels", x, y + fdesc + 20);
}
```
