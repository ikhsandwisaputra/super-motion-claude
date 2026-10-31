---
source: https://p5js.org/reference/p5/textStyle/
title: "textStyle"
fetched: 2026-10-28
---

Sets the style for system fonts when [text()](https://p5js.org/reference/p5/text/) is called.

The parameter, `style`, can be either `NORMAL`, `ITALIC`, `BOLD`, or `BOLDITALIC`.

`textStyle()` may be overridden by CSS styling. This function doesn't affect fonts loaded with [loadFont()](https://p5js.org/reference/p5/loadFont/).

## Examples

## Syntax

`textStyle(style)``textStyle()`

## Parameters

style

NORMAL|ITALIC|BOLD|BOLDITALIC: The style to use

## Returns

NORMAL|ITALIC|BOLD|BOLDITALIC: If no arguments are provided, the current style

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

  // Style the text.
  textSize(12);
  textAlign(CENTER);

  // First row.
  textStyle(NORMAL);
  text('Normal', 50, 15);

  // Second row.
  textStyle(ITALIC);
  text('Italic', 50, 40);

  // Third row.
  textStyle(BOLD);
  text('Bold', 50, 65);

  // Fourth row.
  textStyle(BOLDITALIC);
  text('Bold Italic', 50, 90);

  describe('The words "Normal" displayed normally, "Italic" in italic, "Bold" in bold, and "Bold Italic" in bold italics.');
}
```
