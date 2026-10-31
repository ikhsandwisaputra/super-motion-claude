---
source: https://p5js.org/reference/p5/filter/
title: "filter"
fetched: 2026-10-28
---

Applies an image filter to the canvas.

The preset options are:

`INVERT` Inverts the colors in the image. No parameter is used.

`GRAY` Converts the image to grayscale. No parameter is used.

`THRESHOLD` Converts the image to black and white. Pixels with a grayscale value above a given threshold are converted to white. The rest are converted to black. The threshold must be between 0.0 (black) and 1.0 (white). If no value is specified, 0.5 is used.

`OPAQUE` Sets the alpha channel to entirely opaque. No parameter is used.

`POSTERIZE` Limits the number of colors in the image. Each color channel is limited to the number of colors specified. Values between 2 and 255 are valid, but results are most noticeable with lower values. The default value is 4.

`BLUR` Blurs the image. The level of blurring is specified by a blur radius. Larger values increase the blur. The default value is 4. A gaussian blur is used in `P2D` mode. A box blur is used in `WEBGL` mode.

`ERODE` Reduces the light areas. No parameter is used.

`DILATE` Increases the light areas. No parameter is used.

`filter()` uses WebGL in the background by default because it's faster. This can be disabled in `P2D` mode by adding a `false` argument, as in `filter(BLUR, false)`. This may be useful to keep computation off the GPU or to work around a lack of WebGL support.

In WebgL mode, `filter()` can also use custom shaders. See [createFilterShader()](https://p5js.org/reference/p5/createFilterShader/) for more information.

## Examples

## Syntax

`filter(filterType, [filterParam], [useWebGL])``filter(filterType, [filterParam], [useWebGL])``filter(shaderFilter)`

## Parameters

filterType

THRESHOLD|GRAY|OPAQUE|INVERT|POSTERIZE|BLUR|ERODE|DILATE|BLUR: either THRESHOLD, GRAY, OPAQUE, INVERT, POSTERIZE, BLUR, ERODE, DILATE or BLUR.

filterParam

Number: parameter unique to each filter.

useWebGL

Boolean: flag to control whether to use fast WebGL filters (GPU) or original image filters (CPU); defaults to `true`.

shaderFilter

p5.Shader: shader that's been loaded, with the frag shader using a `tex0` uniform.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/image/pixels.js](https://github.com/processing/p5.js/blob/v2.3.3/src/image/pixels.js#L517) and open a pull request!

---

## Related References

* [blend

  Copies a region of pixels from one image to another.](https://p5js.org/reference/p5/blend/)
* [copy

  Copies pixels from a source image to a region of the canvas.](https://p5js.org/reference/p5/copy/)
* [filter

  Applies an image filter to the canvas.](https://p5js.org/reference/p5/filter/)
* [get

  Gets a pixel or a region of pixels from the canvas.](https://p5js.org/reference/p5/get/)

## Example code (extracted)

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/bricks.jpg');

  createCanvas(100, 100);

  // Display the image.
  image(img, 0, 0);

  // Apply the INVERT filter.
  filter(INVERT);

  describe('A blue brick wall.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/bricks.jpg');

  createCanvas(100, 100);

  // Display the image.
  image(img, 0, 0);

  // Apply the GRAY filter.
  filter(GRAY);

  describe('A brick wall drawn in grayscale.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/bricks.jpg');

  createCanvas(100, 100);

  // Display the image.
  image(img, 0, 0);

  // Apply the THRESHOLD filter.
  filter(THRESHOLD);

  describe('A brick wall drawn in black and white.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/bricks.jpg');

  createCanvas(100, 100);

  // Display the image.
  image(img, 0, 0);

  // Apply the OPAQUE filter.
  filter(OPAQUE);

  describe('A red brick wall.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/bricks.jpg');

  createCanvas(100, 100);

  // Display the image.
  image(img, 0, 0);

  // Apply the POSTERIZE filter.
  filter(POSTERIZE, 3);

  describe('An image of a red brick wall drawn with limited color palette.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/bricks.jpg');

  createCanvas(100, 100);

  // Display the image.
  image(img, 0, 0);

  // Apply the BLUR filter.
  filter(BLUR, 3);

  describe('A blurry image of a red brick wall.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/bricks.jpg');

  createCanvas(100, 100);

  // Display the image.
  image(img, 0, 0);

  // Apply the DILATE filter.
  filter(DILATE);

  describe('A red brick wall with bright lines between each brick.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/bricks.jpg');

  createCanvas(100, 100);

  // Display the image.
  image(img, 0, 0);

  // Apply the ERODE filter.
  filter(ERODE);

  describe('A red brick wall with faint lines between each brick.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/bricks.jpg');

  createCanvas(100, 100);

  // Display the image.
  image(img, 0, 0);

  // Apply the BLUR filter.
  // Don't use WebGL.
  filter(BLUR, 3, false);

  describe('A blurry image of a red brick wall.');
}
```
