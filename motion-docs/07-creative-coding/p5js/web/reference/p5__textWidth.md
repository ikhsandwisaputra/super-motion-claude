---
source: https://p5js.org/reference/p5/textWidth/
title: "textWidth"
fetched: 2026-10-28
---

Calculates the width of the given text string in pixels.

The `textWidth()` function processes the provided text string to determine its tight bounding box based on the current text properties such as font, textSize, and textStyle. Internally, it splits the text into individual lines (if line breaks are present) and computes the bounding box for each line using the renderer’s measurement functions. The final width is determined as the maximum width among all these lines.

For example, if the text contains multiple lines due to wrapping or explicit line breaks, textWidth() will return the width of the longest line.

Note: In p5.js 2.0+, leading and trailing spaces are ignored. `textWidth(" Hello ")` returns the same width as `textWidth("Hello")`.

## Examples

## Syntax

`textWidth(text)`

## Parameters

text

String: The text to measure

## Returns

Number: The width of the text

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
  createCanvas(200, 200);
  background(220);

  // Set text size and alignment
  textSize(48);
  textAlign(LEFT, TOP);

  let myText = "Hello";

  // Calculate the width of the text
  let tw = textWidth(myText);

  // Draw the text on the canvas
  fill(0);
  text(myText, 50, 50);

  // Display the text width below
  noStroke();
  fill(0);
  textSize(20);
  text("Text width: " + tw, 10, 150);
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the text.
  textSize(28);
  strokeWeight(0.5);

  // Calculate the text width.
  let s = 'yoyo';
  let w = textWidth(s);

  // Display the text.
  text(s, 22, 55);

  // Underline the text.
  line(22, 55, 22 + w, 55);

  describe('The word "yoyo" underlined.');
}
```

```js
function setup() {
  createCanvas(200, 160);
  background(235);
  noLoop();

  textSize(18);
  textAlign(LEFT, TOP);

  const x = 12, h = 24;
  const s1 = 'Hello';
  const s2 = 'Hello  ';      // 2 trailing spaces
  const s3 = 'Hello     ';   // many trailing spaces

  // draw text
  fill(0);
  text(s1, x, 12);
  text(s2, x, 56);
  text(s3, x, 100);

  // measure and draw tight boxes (all same width)
  noFill(); stroke(255, 0, 0);
  const w1 = textWidth(s1);
  const w2 = textWidth(s2);
  const w3 = textWidth(s3);
  rect(x, 10,  w1, h);
  rect(x, 54, w2, h);
  rect(x, 98, w3, h);

  // small captions show the actual strings (spaces as ·)
  textSize(10); noStroke(); fill(30);
  text('"' + s1.replace(/ /g, '·') + '"  w=' + w1.toFixed(1), x, 10 + h + 2);
  text('"' + s2.replace(/ /g, '·') + '"  w=' + w2.toFixed(1), x, 54 + h + 2);
  text('"' + s3.replace(/ /g, '·') + '"  w=' + w3.toFixed(1), x, 98 + h + 2);

  describe('Three lines: Hello with 0, 2, and many trailing spaces. Red boxes use textWidth and are identical. Captions show spaces as dots.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the text.
  textSize(28);
  strokeWeight(0.5);

  // Calculate the text width.
  // "\n" starts a new line.
  let s = 'yo\nyo';
  let w = textWidth(s);

  // Display the text.
  text(s, 22, 55);

  // Underline the text.
  line(22, 55, 22 + w, 55);

  describe('The word "yo" written twice, one copy beneath the other. The words are divided by a horizontal line.');
}
```
