---
source: https://p5js.org/reference/p5/textWrap/
title: "textWrap"
fetched: 2026-10-28
---

Sets the style for wrapping text when [text()](https://p5js.org/reference/p5/text/) is called.

The parameter, `style`, can be one of the following values:

`WORD` starts new lines of text at spaces. If a string of text doesn't have spaces, it may overflow the text box and the canvas. This is the default style.

`CHAR` starts new lines as needed to stay within the text box.

`textWrap()` only works when the maximum width is set for a text box. For example, calling `text('Have a wonderful day', 0, 10, 100)` sets the maximum width to 100 pixels.

Calling `textWrap()` without an argument returns the current style.

## Examples

## Syntax

`textWrap(style)``textWrap()`

## Parameters

style

WORD|CHAR: The wrapping style to use

## Returns

CHAR|WORD: If no arguments are provided, the current wrapping style

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
  textSize(20);
  textWrap(WORD);

  // Display the text.
  text('Have a wonderful day', 0, 10, 100);

  describe('The text "Have a wonderful day" written across three lines.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the text.
  textSize(20);
  textWrap(CHAR);

  // Display the text.
  text('Have a wonderful day', 0, 10, 100);

  describe('The text "Have a wonderful day" written across two lines.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the text.
  textSize(20);
  textWrap(CHAR);

  // Display the text.
  text('祝你有美好的一天', 0, 10, 100);

  describe('The text "祝你有美好的一天" written across two lines.');
}
```
