---
source: https://p5js.org/reference/p5/textLeading/
title: "textLeading"
fetched: 2026-10-28
---

Sets the spacing between lines of text when [text()](https://p5js.org/reference/p5/text/) is called.

Note: Spacing is measured in pixels.

Calling `textLeading()` without an argument returns the current spacing.

## Examples

## Syntax

`textLeading([leading])`

## Parameters

leading

Number: The new text leading to apply, in pixels

## Returns

Number: If no arguments are provided, the current text leading

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

  // "\n" starts a new line of text.
  let lines = 'one\ntwo';

  // Left.
  text(lines, 10, 25);

  // Right.
  textLeading(30);
  text(lines, 70, 25);

  describe('The words "one" and "two" written on separate lines twice. The words on the left have less vertical spacing than the words on the right.');
}
```
