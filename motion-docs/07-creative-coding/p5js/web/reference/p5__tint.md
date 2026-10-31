---
source: https://p5js.org/reference/p5/tint/
title: "tint"
fetched: 2026-10-28
---

Tints images using a color.

The version of `tint()` with one parameter interprets it one of four ways. If the parameter is a number, it's interpreted as a grayscale value. If the parameter is a string, it's interpreted as a CSS color string. An array of `[R, G, B, A]` values or a [p5.Color](https://p5js.org/reference/p5/p5.Color) object can also be used to set the tint color.

The version of `tint()` with two parameters uses the first one as a grayscale value and the second as an alpha value. For example, calling `tint(255, 128)` will make an image 50% transparent.

The version of `tint()` with three parameters interprets them as RGB or HSB values, depending on the current [colorMode()](https://p5js.org/reference/p5/colorMode/). The optional fourth parameter sets the alpha value. For example, `tint(255, 0, 0, 100)` will give images a red tint and make them transparent.

Calling `tint()` without an argument returns the current tint as a [p5.Color](https://p5js.org/reference/p5/p5.Color) object.

## Examples

## Syntax

`tint(v1, v2, v3, [alpha])``tint(value)``tint(gray, [alpha])``tint(values)``tint(color)``tint()`

## Parameters

v1

Number: red or hue value.

v2

Number: green or saturation value.

v3

Number: blue or brightness.

alpha

Number:

value

String: CSS color string.

gray

Number: grayscale value.

values

Number[]: array containing the red, green, blue & alpha components of the color.

color

p5.Color: the tint color

## Returns

p5.Color: the current tint color

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/image/loading\_displaying.js](https://github.com/processing/p5.js/blob/v2.3.3/src/image/loading_displaying.js#L1307) and open a pull request!

---

## Related References

* [MAX\_GIF\_PIXELS

  The largest possible number of pixels a gif frame can contain.](https://p5js.org/reference/p5/constants/MAX_GIF_PIXELS/)
* [image

  Draws an image to the canvas.](https://p5js.org/reference/p5/image/)
* [imageMode

  Changes the location from which images are drawn when image() is called.](https://p5js.org/reference/p5/imageMode/)
* [loadImage

  Loads an image to create a p5.Image object.](https://p5js.org/reference/p5/loadImage/)

## Example code (extracted)

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/laDefense.jpg');

  createCanvas(100, 100);

  // Left image.
  image(img, 0, 0);

  // Right image.
  // Tint with a CSS color string.
  tint('red');
  image(img, 50, 0);

  describe('Two images of an umbrella and a ceiling side-by-side. The image on the right has a red tint.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/laDefense.jpg');

  createCanvas(100, 100);

  // Left image.
  image(img, 0, 0);

  // Right image.
  // Tint with RGB values.
  tint(255, 0, 0);
  image(img, 50, 0);

  describe('Two images of an umbrella and a ceiling side-by-side. The image on the right has a red tint.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/laDefense.jpg');

  createCanvas(100, 100);

  // Left.
  image(img, 0, 0);

  // Right.
  // Tint with RGBA values.
  tint(255, 0, 0, 100);
  image(img, 50, 0);

  describe('Two images of an umbrella and a ceiling side-by-side. The image on the right has a transparent red tint.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/laDefense.jpg');

  createCanvas(100, 100);

  // Left.
  image(img, 0, 0);

  // Right.
  // Tint with grayscale and alpha values.
  tint(255, 180);
  image(img, 50, 0);

  describe('Two images of an umbrella and a ceiling side-by-side. The image on the right is transparent.');
}
```
