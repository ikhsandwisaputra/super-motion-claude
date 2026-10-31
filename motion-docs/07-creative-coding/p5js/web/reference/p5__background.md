---
source: https://p5js.org/reference/p5/background/
title: "background"
fetched: 2026-10-28
---

Sets the color used for the background of the canvas.

By default, the background is transparent. `background()` is typically used within [draw()](https://p5js.org/reference/p5/draw/) to clear the display window at the beginning of each frame. It can also be used inside [setup()](https://p5js.org/reference/p5/setup/) to set the background on the first frame of animation.

The version of `background()` with one parameter interprets the value one of four ways. If the parameter is a `Number`, it's interpreted as a grayscale value. If the parameter is a `String`, it's interpreted as a CSS color string. RGB, RGBA, HSL, HSLA, hex, and named color strings are supported. If the parameter is a [p5.Color](https://p5js.org/reference/p5/p5.Color) object, it will be used as the background color. If the parameter is a [p5.Image](https://p5js.org/reference/p5/p5.Image) object, it will be used as the background image.

The version of `background()` with two parameters interprets the first one as a grayscale value. The second parameter sets the alpha (transparency) value.

The version of `background()` with three parameters interprets them as RGB, HSB, or HSL colors, depending on the current [colorMode()](https://p5js.org/reference/p5/colorMode/). By default, colors are specified in RGB values. Calling `background(255, 204, 0)` sets the background a bright yellow color.

The version of `background()` with four parameters interprets them as RGBA, HSBA, or HSLA colors, depending on the current [colorMode()](https://p5js.org/reference/p5/colorMode/). The last parameter sets the alpha (transparency) value.

## Examples

## Syntax

`background(color)``background(colorstring, [a])``background(gray, [a])``background(v1, v2, v3, [a])``background(values)``background(image, [a])`

## Parameters

color

p5.Color: any value created by the [color()](https://p5js.org/reference/p5/background/#/p5/color) function

colorstring

String: color string, possible formats include: integer rgb() or rgba(), percentage rgb() or rgba(), 3-digit hex, 6-digit hex.

a

Number: opacity of the background relative to current color range (default is 0-255).

gray

Number: specifies a value between white and black.

v1

Number: red value if color mode is RGB, or hue value if color mode is HSB.

v2

Number: green value if color mode is RGB, or saturation value if color mode is HSB.

v3

Number: blue value if color mode is RGB, or brightness value if color mode is HSB.

values

Number[]: an array containing the red, green, blue and alpha components of the color.

image

p5.Image: image created with [loadImage()](https://p5js.org/reference/p5/background/#/p5/loadImage) or [createImage()](https://p5js.org/reference/p5/background/#/p5/createImage), to set as background. (must be same size as the sketch window).

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/setting.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/setting.js#L580) and open a pull request!

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

  // A grayscale value.
  background(51);

  describe('A canvas with a dark charcoal gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // A grayscale value and an alpha value.
  background(51, 0.4);
  describe('A canvas with a transparent gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // R, G & B values.
  background(255, 204, 0);

  describe('A canvas with a yellow background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

// R, G, B, and Alpha values.
  background(255, 0, 0, 128);

  describe('A canvas with a semi-transparent red background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Use HSB color.
  colorMode(HSB);

  // H, S & B values.
  background(255, 204, 100);

  describe('A canvas with a royal blue background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // A CSS named color.
  background('red');

  describe('A canvas with a red background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Three-digit hex RGB notation.
  background('#fae');

  describe('A canvas with a pink background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Six-digit hex RGB notation.
  background('#222222');

  describe('A canvas with a black background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Integer RGB notation.
  background('rgb(0, 255, 0)');

  describe('A canvas with a bright green background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Integer RGBA notation.
  background('rgba(0, 255, 0, 0.25)');

  describe('A canvas with a transparent green background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Percentage RGB notation.
  background('rgb(100%, 0%, 10%)');

  describe('A canvas with a red background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Percentage RGBA notation.
  background('rgba(100%, 0%, 100%, 0.5)');

  describe('A canvas with a transparent purple background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // A p5.Color object.
  let c = color(0, 0, 255);
  background(c);

  describe('A canvas with a blue background.');
}
```
