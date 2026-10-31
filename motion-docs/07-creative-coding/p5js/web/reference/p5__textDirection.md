---
source: https://p5js.org/reference/p5/textDirection/
title: "textDirection"
fetched: 2026-10-28
---

Sets or gets the text drawing direction.

The `textDirection()` function allows you to specify the direction in which text is rendered on the canvas. When provided with a `direction` parameter (such as "ltr" for left-to-right, "rtl" for right-to-left, or "inherit"), it updates the renderer's state with that value and applies the new setting. When called without any arguments, it returns the current text direction. This function is particularly useful for rendering text in languages with different writing directions.

## Examples

## Syntax

`textDirection(direction)``textDirection()`

## Parameters

direction

String: The text direction to set ("ltr", "rtl", or "inherit").

## Returns

String: If no arguments are provided, the current text direction, either "ltr", "rtl", or "inherit"

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
  background(240);

  textSize(32);
  textFont("Georgia");
  textAlign(LEFT, TOP);

  // Set text direction to right-to-left and draw Arabic text.
  textDirection("rtl");
  fill(0);
  text("مرحبًا!", 50, 50);

  // Set text direction to left-to-right and draw English text.
  textDirection("ltr");
  text("Hello, p5.js!", 50, 150);

  // Display the current text direction.
  textSize(16);
  fill(50);
  textAlign(LEFT, TOP);
  text("Current textDirection: " + textDirection(), 50, 250);
}
```
