---
source: https://p5js.org/reference/p5/alpha/
title: "alpha"
fetched: 2026-10-28
---

Gets the alpha (transparency) value of a color.

`alpha()` extracts the alpha value from a [p5.Color](https://p5js.org/reference/p5/p5.Color) object, an array of color components, or a CSS color string.

In p5.strands shader callbacks, `alpha()` operates on `vec4` values and returns the alpha channel as a normalized value in the 0–1 range. `colorMode()` has no effect inside shader callbacks.

## Examples

## Syntax

`alpha(color)`

## Parameters

color

p5.Color|Number[]|String: [p5.Color](https://p5js.org/reference/p5/p5.Color/) object, array of color components, or CSS color string.

## Returns

Number: the alpha value.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/creating\_reading.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/creating_reading.js#L996) and open a pull request!

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

  // Create a p5.Color object.
  let c = color(0, 126, 255, 102);

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'alphaValue' to 102.
  let alphaValue = alpha(c);

  // Draw the right rectangle.
  fill(alphaValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is light blue and the right one is charcoal gray.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create a color array.
  let c = [0, 126, 255, 102];

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'alphaValue' to 102.
  let alphaValue = alpha(c);

  // Draw the left rectangle.
  fill(alphaValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is light blue and the right one is charcoal gray.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create a CSS color string.
  let c = 'rgba(0, 126, 255, 0.4)';

  // Draw the left rectangle.
  noStroke();
  fill(c);
  rect(15, 15, 35, 70);

  // Set 'alphaValue' to 102.
  let alphaValue = alpha(c);

  // Draw the right rectangle.
  fill(alphaValue);
  rect(50, 15, 35, 70);

  describe('Two rectangles. The left one is light blue and the right one is charcoal gray.');
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
  let c = color(255, 0, 0, 128);
  let a = alpha(c);
  finalColor.set(vec4(1.0, 0, 0, a * 0.5));
  finalColor.end();
}

function draw() {
  shader(myShader);
  noStroke();
  sphere(40);

  describe('A semi-transparent sphere.');
}
```
