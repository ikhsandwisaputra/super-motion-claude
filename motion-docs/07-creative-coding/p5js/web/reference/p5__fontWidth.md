---
source: https://p5js.org/reference/p5/fontWidth/
title: "fontWidth"
fetched: 2026-10-28
---

Returns the loose width of a text string based on the current font.

The `fontWidth()` function measures the width of the provided text string using the font's default measurement (i.e., the width property from the text metrics returned by the browser). Unlike `textWidth()`, which calculates the tight pixel boundaries of the text glyphs, `fontWidth()` uses the font's intrinsic spacing, which may include additional space for character spacing and kerning. This makes it useful for scenarios where an approximate width is sufficient for layout and positioning.

## Examples

## Syntax

`fontWidth(theText)`

## Parameters

theText

String: The text string to measure.

## Returns

Number: The loose width of the text in pixels.

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

  let s = "Hello, World!";
  let fw = fontWidth(s);

  fill(0);
  text(s, 50, 50);

  stroke('blue');
  line(50, 90, 50 + fw, 90);

  noStroke();
  fill(50);
  textSize(16);
  text("Font width: " + fw.toFixed(2) + " pixels", 50, 100);
}
```
