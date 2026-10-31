---
source: https://p5js.org/reference/p5/stroke/
title: "stroke"
fetched: 2026-10-28
---

Sets the color used to draw points, lines, and the outlines of shapes.

Calling `stroke(255, 165, 0)` or `stroke('orange')` means all shapes drawn after calling `stroke()` will be outlined with the color orange. The way these parameters are interpreted may be changed with the [colorMode()](https://p5js.org/reference/p5/colorMode/) function.

The version of `stroke()` with one parameter interprets the value one of three ways. If the parameter is a `Number`, it's interpreted as a grayscale value. If the parameter is a `String`, it's interpreted as a CSS color string. A [p5.Color](https://p5js.org/reference/p5/p5.Color) object can also be provided to set the stroke color.

The version of `stroke()` with two parameters interprets the first one as a grayscale value. The second parameter sets the alpha (transparency) value.

The version of `stroke()` with three parameters interprets them as RGB, HSB, or HSL colors, depending on the current `colorMode()`.

The version of `stroke()` with four parameters interprets them as RGBA, HSBA, or HSLA colors, depending on the current `colorMode()`. The last parameter sets the alpha (transparency) value.

Calling `stroke()` without an argument returns the current stroke as a [p5.Color](https://p5js.org/reference/p5/p5.Color) object.

## Examples

## Syntax

`stroke(v1, v2, v3, [alpha])``stroke(value)``stroke(gray, [alpha])``stroke(values)``stroke(color)``stroke()`

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

Number[]: an array containing the red, green, blue, and alpha components of the color.

color

p5.Color: the stroke color.

## Returns

p5.Color: the current stroke color.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/setting.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/setting.js#L1612) and open a pull request!

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
  strokeWeight(4);
  stroke(51);
  square(20, 20, 60);

  describe('A white square with a dark charcoal gray outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // R, G & B values.
  stroke(255, 204, 0);
  strokeWeight(4);
  square(20, 20, 60);

  describe('A white square with a yellow outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Use HSB color.
  colorMode(HSB);

  // H, S & B values.
  strokeWeight(4);
  stroke(255, 204, 100);
  square(20, 20, 60);

  describe('A white square with a royal blue outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // A CSS named color.
  stroke('red');
  strokeWeight(4);
  square(20, 20, 60);

  describe('A white square with a red outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Three-digit hex RGB notation.
  stroke('#fae');
  strokeWeight(4);
  square(20, 20, 60);

  describe('A white square with a pink outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Six-digit hex RGB notation.
  stroke('#222222');
  strokeWeight(4);
  square(20, 20, 60);

  describe('A white square with a black outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Integer RGB notation.
  stroke('rgb(0, 255, 0)');
  strokeWeight(4);
  square(20, 20, 60);

  describe('A white square with a bright green outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Integer RGBA notation.
  stroke('rgba(0, 255, 0, 0.25)');
  strokeWeight(4);
  square(20, 20, 60);

  describe('A white square with a soft green outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Percentage RGB notation.
  stroke('rgb(100%, 0%, 10%)');
  strokeWeight(4);
  square(20, 20, 60);

  describe('A white square with a red outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Percentage RGBA notation.
  stroke('rgba(100%, 0%, 100%, 0.5)');
  strokeWeight(4);
  square(20, 20, 60);

  describe('A white square with a dark fuchsia outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // A p5.Color object.
  stroke(color(0, 0, 255));
  strokeWeight(4);
  square(20, 20, 60);

  describe('A white square with a blue outline.');
}
```
