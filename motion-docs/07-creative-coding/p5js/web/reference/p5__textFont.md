---
source: https://p5js.org/reference/p5/textFont/
title: "textFont"
fetched: 2026-10-28
---

Sets the font used by the [text()](https://p5js.org/reference/p5/text/) function.

The first parameter, `font`, sets the font. `textFont()` recognizes either a [p5.Font](https://p5js.org/reference/p5/p5.Font) object or a string with the name of a system font. For example, `'Courier New'`.

The second parameter, `size`, is optional. It sets the font size in pixels. This has the same effect as calling [textSize()](https://p5js.org/reference/p5/textSize/).

Calling `textFont()` without arguments returns the current font.

Note: `WEBGL` mode only supports fonts loaded with [loadFont()](https://p5js.org/reference/p5/loadFont/).

## Examples

## Syntax

`textFont([font], [size])`

## Parameters

font

p5.Font|String|Object: The font to apply

size

Number: An optional text size to apply.

## Returns

String|p5.Font: If no arguments are provided, returns the current font

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
  textFont('Courier New');
  textSize(24);
  text('hi', 35, 55);

  describe('The text "hi" written in a black, monospace font on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);
  background('black');
  fill('palegreen');
  textFont('Courier New', 10);
  text('You turn to the left and see a door. Do you enter?', 5, 5, 90, 90);
  text('>', 5, 70);

  describe('A text prompt from a game is written in a green, monospace font on a black background.');
}
```

```js
function setup() {
  createCanvas(100, 100);
  background(200);
  textFont('Verdana');
  let currentFont = textFont();
  text(currentFont, 25, 50);

  describe('The text "Verdana" written in a black, sans-serif font on a gray background.');
}
```

```js
let fontRegular;
let fontItalic;
let fontBold;

async function setup() {
  createCanvas(100, 100);
  fontRegular = await loadFont('/assets/Regular.otf');
  fontItalic = await loadFont('/assets/Italic.ttf');
  fontBold = await loadFont('/assets/Bold.ttf');

  background(200);
  textFont(fontRegular);
  text('I am Normal', 10, 30);
  textFont(fontItalic);
  text('I am Italic', 10, 50);
  textFont(fontBold);
  text('I am Bold', 10, 70);

  describe('The statements "I am Normal", "I am Italic", and "I am Bold" written in black on separate lines. The statements have normal, italic, and bold fonts, respectively.');
}
```
