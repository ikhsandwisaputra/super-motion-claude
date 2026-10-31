---
source: https://p5js.org/reference/p5/blue/
title: "blue"
fetched: 2026-10-28
---

Gets the blue value of a color.

`blue()` extracts the blue value from a [p5.Color](https://p5js.org/reference/p5/p5.Color/) object, an array of color components, or a CSS color string.

By default, `blue()` returns a color's blue value in the range 0 to 255. If the [colorMode()](https://p5js.org/reference/p5/colorMode/) is set to RGB, it returns the blue value in the given range.

In p5.strands shader callbacks, `blue()` operates on `vec4` values and returns the blue channel as a normalized value in the 0–1 range. `colorMode()` has no effect inside shader callbacks.

## Examples

## Syntax

`blue(color)`

## Parameters

color

p5.Color|Number[]|String: [p5.Color](https://p5js.org/reference/p5/p5.Color/) object, array of color components, or CSS color string.

## Returns

Number: the blue value.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/creating\_reading.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/creating_reading.js#L875) and open a pull request!

---

## Related References

* [contrast

  Checks the contrast between two colors.](https://p5js.org/reference/p5.Color/contrast/)
* [setAlpha

  Sets the alpha (transparency) value of a color.](https://p5js.org/reference/p5.Color/setAlpha/)
* [setBlue

  Sets the blue component of a color.](https://p5js.org/reference/p5.Color/setBlue/)
* [setGreen

  Sets the green component of a color.](https://p5js.org/reference/p5.Color/setGreen/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create a p5.Color object using RGB values.
  let c = color(175, 100, 220);

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'blueValue' to 220.
  let blueValue = blue(c);

  // Draw the right rectangle.
  fill(0, 0, blueValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is light purple and the right one is royal blue.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create a color array.
  let c = [175, 100, 220];

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'blueValue' to 220.
  let blueValue = blue(c);

  // Draw the right rectangle.
  fill(0, 0, blueValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is light purple and the right one is royal blue.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create a CSS color string.
  let c = 'rgb(175, 100, 220)';

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'blueValue' to 220.
  let blueValue = blue(c);

  // Draw the right rectangle.
  fill(0, 0, blueValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is light purple and the right one is royal blue.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Use RGB color with values in the range 0-100.
  colorMode(RGB, 100);

  // Create a p5.Color object using RGB values.
  let c = color(69, 39, 86);

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'blueValue' to 86.
  let blueValue = blue(c);

  // Draw the right rectangle.
  fill(0, 0, blueValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is light purple and the right one is royal blue.');
}
```

```js
let myShader;
function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildMaterialShader(myShaderBuilder);
}

function myShaderBuilder() {
  finalColor.begin();
  let c = color(50, 100, 200);
  let b = blue(c);
  finalColor.set(vec4(0, 0, b, 1.0));
  finalColor.end();
}

function draw() {
  shader(myShader);
  noStroke();
  sphere(40);

  describe('A sphere colored using only its blue channel.');
}
```
