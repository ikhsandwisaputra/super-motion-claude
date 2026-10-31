---
source: https://p5js.org/reference/p5/hue/
title: "hue"
fetched: 2026-10-28
---

Gets the hue value of a color.

`hue()` extracts the hue value from a [p5.Color](https://p5js.org/reference/p5/p5.Color/) object, an array of color components, or a CSS color string.

Hue describes a color's position on the color wheel. By default, `hue()` returns a color's HSL hue in the range 0 to 360. If the [colorMode()](https://p5js.org/reference/p5/colorMode/) is set to HSB or HSL, it returns the hue value in the given mode.

In p5.strands shader callbacks, `hue()` operates on `vec4` values and returns the hue as a normalized value in the 0–1 range. `colorMode()` has no effect inside shader callbacks.

## Examples

## Syntax

`hue(color)`

## Parameters

color

p5.Color|Number[]|String: [p5.Color](https://p5js.org/reference/p5/p5.Color/) object, array of color components, or CSS color string.

## Returns

Number: the hue value.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/creating\_reading.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/creating_reading.js#L1137) and open a pull request!

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

  // Use HSL color.
  colorMode(HSL);

  // Create a p5.Color object.
  let c = color(0, 50, 100);

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 20, 35, 60);

  // Set 'hueValue' to 0.
  let hueValue = hue(c);

  // Draw the right rectangle.
  fill(hueValue);
  rect(50, 20, 35, 60);

  describe(
    'Two rectangles. The rectangle on the left is salmon pink and the one on the right is black.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Use HSL color.
  colorMode(HSL);

  // Create a color array.
  let c = [0, 50, 100];

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 20, 35, 60);

  // Set 'hueValue' to 0.
  let hueValue = hue(c);

  // Draw the right rectangle.
  fill(hueValue);
  rect(50, 20, 35, 60);

  describe(
    'Two rectangles. The rectangle on the left is salmon pink and the one on the right is black.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Use HSL color.
  colorMode(HSL);

  // Create a CSS color string.
  let c = 'rgb(255, 128, 128)';

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 20, 35, 60);

  // Set 'hueValue' to 0.
  let hueValue = hue(c);

  // Draw the right rectangle.
  fill(hueValue);
  rect(50, 20, 35, 60);

  describe(
    'Two rectangles. The rectangle on the left is salmon pink and the one on the right is black.'
  );
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
  let c = color(0, 255, 128);
  let h = hue(c);
  finalColor.set(vec4(h, h, h, 1.0));
  finalColor.end();
}

function draw() {
  shader(myShader);
  noStroke();
  sphere(40);

  describe('A sphere shaded in grayscale based on hue.');
}
```
