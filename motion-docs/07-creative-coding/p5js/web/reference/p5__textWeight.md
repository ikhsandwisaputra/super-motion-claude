---
source: https://p5js.org/reference/p5/textWeight/
title: "textWeight"
fetched: 2026-10-28
---

Sets or gets the current font weight.

The `textWeight()` function is used to specify the weight (thickness) of the text. When a numeric value is provided, it sets the font weight to that value and updates the rendering properties accordingly (including the "font-variation-settings" on the canvas style). When called without an argument, it returns the current font weight setting.

## Examples

## Syntax

`textWeight(weight)``textWeight()`

## Parameters

weight

Number: The numeric weight value to set for the text.

## Returns

Number: If no arguments are provided, the current font weight

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

  // Set text alignment, size, and font
  textAlign(LEFT, TOP);
  textSize(20);
  textFont("Georgia");

  // Draw text with a normal weight (lighter appearance)
  push();
  textWeight(400);  // Set font weight to 400
  fill(0);
  text("Normal", 50, 50);
  let normalWeight = textWeight();  // Should return 400
  pop();

  // Draw text with a bold weight (heavier appearance)
  push();
  textWeight(900);  // Set font weight to 900
  fill(0);
  text("Bold", 50, 100);
  let boldWeight = textWeight();  // Should return 900
  pop();

  // Display the current font weight values on the canvas
  textSize(16);
  fill(50);
  text("Normal Weight: " + normalWeight, 150, 52);
  text("Bold Weight: " + boldWeight, 150, 100);
}
```

```js
let font;

async function setup() {
  createCanvas(100, 100);
  font = await loadFont(
    'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'
  );
}

function draw() {
  background(255);
  textFont(font);
  textAlign(LEFT, TOP);
  textSize(35);
  textWeight(sin(millis() * 0.002) * 200 + 400);
  text('p5*js', 0, 10);
  describe('The text p5*js pulsing its weight over time');
}
```
