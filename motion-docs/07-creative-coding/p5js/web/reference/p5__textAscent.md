---
source: https://p5js.org/reference/p5/textAscent/
title: "textAscent"
fetched: 2026-10-28
---

Returns the ascent of the text.

The `textAscent()` function calculates the distance from the baseline to the highest point of the current font. This value represents the ascent, which is essential for determining the overall height of the text along with `textDescent()`. If a text string is provided as an argument, the ascent is calculated based on that specific string; otherwise, the ascent of the current font is returned.

## Examples

## Syntax

`textAscent([txt])`

## Parameters

txt

String: (Optional) The text string for which to calculate the ascent. If omitted, the function returns the ascent for the current font.

## Returns

Number: The ascent value in pixels.

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
  createCanvas(400, 300);
  background(220);

  textSize(48);
  textAlign(LEFT, BASELINE);
  textFont('Georgia');

  let s = "Hello, p5.js!";
  let x = 50, y = 150;

  fill(0);
  text(s, x, y);

  // Get the ascent of the current font
  let asc = textAscent();

  // Draw a red line at the baseline and a blue line at the ascent position
  stroke('red');
  line(x, y, x + 200, y); // Baseline
  stroke('blue');
  line(x, y - asc, x + 200, y - asc); // Ascent (top of text)

  noStroke();
  fill(0);
  textSize(16);
  text("textAscent: " + asc.toFixed(2) + " pixels", x, y - asc - 10);
}
```

```js
let font;

async function setup()  {
  font = await loadFont('/assets/inconsolata.otf');

  createCanvas(100, 100);

  background(200);

  // Style the text.
  textFont(font);

  // Different for each font.
  let fontScale = 0.8;

  let baseY = 75;
  strokeWeight(0.5);

  // Draw small text.
  textSize(24);
  text('dp', 0, baseY);

  // Draw baseline and ascent.
  let a = textAscent() * fontScale;
  line(0, baseY, 23, baseY);
  line(23, baseY - a, 23, baseY);

  // Draw large text.
  textSize(48);
  text('dp', 45, baseY);

  // Draw baseline and ascent.
  a = textAscent() * fontScale;
  line(45, baseY, 91, baseY);
  line(91, baseY - a, 91, baseY);

  describe('The letters "dp" written twice in different sizes. Each version has a horizontal baseline. A vertical line extends upward from each baseline to the top of the "d".');
}
```
