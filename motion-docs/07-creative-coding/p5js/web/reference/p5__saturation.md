---
source: https://p5js.org/reference/p5/saturation/
title: "saturation"
fetched: 2026-10-28
---

Gets the saturation value of a color.

`saturation()` extracts the saturation value from a [p5.Color](https://p5js.org/reference/p5/p5.Color/) object, an array of color components, or a CSS color string.

Saturation is scaled differently in HSB and HSL. By default, `saturation()` returns a color's HSL saturation in the range 0 to 100. If the [colorMode()](https://p5js.org/reference/p5/colorMode/) is set to HSB or HSL, it returns the saturation value in the given mode.

In p5.strands shader callbacks, `saturation()` operates on `vec4` values and returns the saturation as a normalized value in the 0–1 range. `colorMode()` has no effect inside shader callbacks.

## Examples

## Syntax

`saturation(color)`

## Parameters

color

p5.Color|Number[]|String: [p5.Color](https://p5js.org/reference/p5/p5.Color/) object, array of color components, or CSS color string.

## Returns

Number: the saturation value

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/creating\_reading.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/creating_reading.js#L1344) and open a pull request!

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

  // Use HSB color.
  colorMode(HSB);

  // Create a p5.Color object.
  let c = color(0, 50, 100);

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'satValue' to 50.
  let satValue = saturation(c);

  // Draw the right rectangle.
  fill(satValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is salmon pink and the right one is dark gray.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(50);

  // Use HSB color.
  colorMode(HSB);

  // Create a color array.
  let c = [0, 50, 100];

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'satValue' to 100.
  let satValue = saturation(c);

  // Draw the right rectangle.
  fill(satValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is salmon pink and the right one is gray.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(50);

  // Use HSB color.
  colorMode(HSB);

  // Create a CSS color string.
  let c = 'rgb(255, 128, 128)';

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'satValue' to 100.
  let satValue = saturation(c);

  // Draw the right rectangle.
  fill(satValue);
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

  // Create a p5.Color object.
  let c = color(0, 100, 75);

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'satValue' to 100.
  let satValue = saturation(c);

  // Draw the right rectangle.
  fill(satValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is salmon pink and the right one is white.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(50);

  // Use HSL color with values in the range 0-255.
  colorMode(HSL, 255);

  // Create a p5.Color object.
  let c = color(0, 255, 191.5);

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'satValue' to 255.
  let satValue = saturation(c);

  // Draw the right rectangle.
  fill(satValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is salmon pink and the right one is white.');
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
  let c = color(255, 128, 128);
  let s = saturation(c);
  finalColor.set(vec4(s, s, s, 1.0));
  finalColor.end();
}

function draw() {
  shader(myShader);
  noStroke();
  sphere(40);

  describe('A sphere shaded in grayscale based on saturation.');
}
```
