---
source: https://p5js.org/reference/p5/fill/
title: "fill"
fetched: 2026-10-28
---

Sets the color used to fill shapes.

Calling `fill(255, 165, 0)` or `fill('orange')` means all shapes drawn after the fill command will be filled with the color orange.

The version of `fill()` with one parameter interprets the value one of three ways. If the parameter is a `Number`, it's interpreted as a grayscale value. If the parameter is a `String`, it's interpreted as a CSS color string. A [p5.Color](https://p5js.org/reference/p5/p5.Color) object can also be provided to set the fill color.

The version of `fill()` with three parameters interprets them as RGB, HSB, or HSL colors, depending on the current [colorMode()](https://p5js.org/reference/p5/colorMode/). The default color space is RGB, with each value in the range from 0 to 255.

The version of `fill()` with four parameters interprets them as `RGBA`, `HSBA`, or `HSLA` colors, depending on the current [colorMode()](https://p5js.org/reference/p5/colorMode/). The last parameter sets the alpha (transparency) value.

Calling `fill()` without an argument returns the current fill as a [p5.Color](https://p5js.org/reference/p5/p5.Color) object.

## Examples

## Syntax

`fill(v1, v2, v3, [alpha])``fill(value)``fill(gray, [alpha])``fill(values)``fill(color)``fill()`

## Parameters

v1

Number: red value if color mode is RGB or hue value if color mode is HSB.

v2

Number: green value if color mode is RGB or saturation value if color mode is HSB.

v3

Number: blue value if color mode is RGB or brightness value if color mode is HSB.

alpha

Number: alpha value, controls transparency (0 - transparent, 255 - opaque).

value

String: a color string.

gray

Number: a grayscale value.

values

Number[]: an array containing the red, green, blue & and alpha components of the color.

color

p5.Color: the fill color.

## Returns

p5.Color: the current fill color.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/setting.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/setting.js#L1290) and open a pull request!

---

## Related References

* [background

  Sets the color used for the background of the canvas.](https://p5js.org/reference/p5/background/)
* [beginClip

  Starts defining a shape that will mask any shapes drawn afterward.](https://p5js.org/reference/p5/beginClip/)
* [blendMode

  Sets the way colors blend when added to the canvas.](https://p5js.org/reference/p5/blendMode/)
* [clear

  Clears the pixels on the canvas.](https://p5js.org/reference/p5/clear/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // A grayscale value.
  fill(51);
  square(20, 20, 60);

  describe('A dark charcoal gray square with a black outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // R, G & B values.
  fill(255, 204, 0);
  square(20, 20, 60);

  describe('A yellow square with a black outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // R, G, B, and Alpha values.
  fill(255, 0, 0, 128);
  square(20, 20, 60);

  describe('A semi-transparent red square with a black outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(100);

  // Use HSB color.
  colorMode(HSB);

  // H, S & B values.
  fill(255, 204, 100);
  square(20, 20, 60);

  describe('A royal blue square with a black outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // A CSS named color.
  fill('red');
  square(20, 20, 60);

  describe('A red square with a black outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Three-digit hex RGB notation.
  fill('#fae');
  square(20, 20, 60);

  describe('A pink square with a black outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Six-digit hex RGB notation.
  fill('#A251FA');
  square(20, 20, 60);

  describe('A purple square with a black outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Integer RGB notation.
  fill('rgb(0, 255, 0)');
  square(20, 20, 60);

  describe('A bright green square with a black outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Integer RGBA notation.
  fill('rgba(0, 255, 0, 0.25)');
  square(20, 20, 60);

  describe('A soft green rectange with a black outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Percentage RGB notation.
  fill('rgb(100%, 0%, 10%)');
  square(20, 20, 60);

  describe('A red square with a black outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Percentage RGBA notation.
  fill('rgba(100%, 0%, 100%, 0.5)');
  square(20, 20, 60);

  describe('A dark fuchsia square with a black outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // A p5.Color object.
  let c = color(0, 0, 255);
  fill(c);
  square(20, 20, 60);

  describe('A blue square with a black outline.');
}
```
