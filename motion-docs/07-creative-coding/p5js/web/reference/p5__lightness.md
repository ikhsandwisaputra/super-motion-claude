---
source: https://p5js.org/reference/p5/lightness/
title: "lightness"
fetched: 2026-10-28
---

Gets the lightness value of a color.

`lightness()` extracts the HSL lightness value from a [p5.Color](https://p5js.org/reference/p5/p5.Color/) object, an array of color components, or a CSS color string.

By default, `lightness()` returns a color's HSL lightness in the range 0 to 100. If the [colorMode()](https://p5js.org/reference/p5/colorMode/) is set to HSL, it returns the lightness value in the given range.

In p5.strands shader callbacks, `lightness()` operates on `vec4` values and returns the lightness as a normalized value in the 0–1 range. `colorMode()` has no effect inside shader callbacks.

## Examples

## Syntax

`lightness(color)`

## Parameters

color

p5.Color|Number[]|String: [p5.Color](https://p5js.org/reference/p5/p5.Color/) object, array of color components, or CSS color string.

## Returns

Number: the lightness value.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/creating\_reading.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/creating_reading.js#L1669) and open a pull request!

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

  background(50);

  // Use HSL color.
  colorMode(HSL);

  // Create a p5.Color object using HSL values.
  let c = color(0, 100, 75);

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'lightValue' to 75.
  let lightValue = lightness(c);

  // Draw the right rectangle.
  fill(lightValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is salmon pink and the right one is gray.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(50);

  // Use HSL color.
  colorMode(HSL);

  // Create a color array.
  let c = [0, 100, 75];

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'lightValue' to 75.
  let lightValue = lightness(c);

  // Draw the right rectangle.
  fill(lightValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is salmon pink and the right one is gray.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(50);

  // Use HSL color.
  colorMode(HSL);

  // Create a CSS color string.
  let c = 'rgb(255, 128, 128)';

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'lightValue' to 75.
  let lightValue = lightness(c);

  // Draw the right rectangle.
  fill(lightValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is salmon pink and the right one is gray.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(50);

  // Use HSL color with values in the range 0-255.
  colorMode(HSL, 255);

  // Create a p5.Color object using HSL values.
  let c = color(0, 255, 191.5);

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'lightValue' to 191.5.
  let lightValue = lightness(c);

  // Draw the right rectangle.
  fill(lightValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is salmon pink and the right one is gray.');
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
  let c = color(0, 100, 75);
  let l = lightness(c);
  finalColor.set(vec4(l, l, l, 1.0));
  finalColor.end();
}

function draw() {
  shader(myShader);
  noStroke();
  sphere(40);

  describe('A sphere shaded in grayscale based on lightness.');
}
```
