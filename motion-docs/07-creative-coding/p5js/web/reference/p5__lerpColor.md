---
source: https://p5js.org/reference/p5/lerpColor/
title: "lerpColor"
fetched: 2026-10-28
---

Blends two colors to find a third color between them.

The `amt` parameter specifies the amount to interpolate between the two values. 0 is equal to the first color, 0.1 is very near the first color, 0.5 is halfway between the two colors, and so on. Negative numbers are set to 0. Numbers greater than 1 are set to 1. This differs from the behavior of [lerp](https://p5js.org/reference/p5/lerp/). It's necessary because numbers outside of the interval [0, 1] will produce strange and unexpected colors.

The way that colors are interpolated depends on the current [colorMode()](https://p5js.org/reference/p5/colorMode/).

In p5.strands shader callbacks, `lerpColor()` interpolates between `vec4` colors and returns a normalized `vec4` with RGBA components in the 0–1 range. `colorMode()` has no effect inside shader callbacks.

## Examples

## Syntax

`lerpColor(c1, c2, amt)`

## Parameters

c1

p5.Color: interpolate from this color.

c2

p5.Color: interpolate to this color.

amt

Number: number between 0 and 1.

## Returns

p5.Color: interpolated color.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/creating\_reading.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/creating_reading.js#L1760) and open a pull request!

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

  // Create p5.Color objects to interpolate between.
  let from = color(218, 165, 32);
  let to = color(72, 61, 139);

  // Create intermediate colors.
  let interA = lerpColor(from, to, 0.33);
  let interB = lerpColor(from, to, 0.66);

  // Draw the left rectangle.
  noStroke();
  fill(from);
  rect(10, 20, 20, 60);

  // Draw the left-center rectangle.
  fill(interA);
  rect(30, 20, 20, 60);

  // Draw the right-center rectangle.
  fill(interB);
  rect(50, 20, 20, 60);

  // Draw the right rectangle.
  fill(to);
  rect(70, 20, 20, 60);

  describe(
    'Four rectangles. From left to right, the rectangles are tan, brown, brownish purple, and purple.'
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
  let c1 = color('red');
  let c2 = color('blue');
  let mixed = lerpColor(c1, c2, 0.5);
  finalColor.set(mixed);
  finalColor.end();
}

function draw() {
  shader(myShader);
  noStroke();
  sphere(40);

  describe('A purple sphere, a blend of red and blue.');
}
```
