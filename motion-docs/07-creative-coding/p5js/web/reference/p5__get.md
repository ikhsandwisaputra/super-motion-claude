---
source: https://p5js.org/reference/p5/get/
title: "get"
fetched: 2026-10-28
---

Gets a pixel or a region of pixels from the canvas.

`get()` is easy to use but it's not as fast as [pixels](https://p5js.org/reference/p5/pixels/). Use [pixels](https://p5js.org/reference/p5/pixels/) to read many pixel values.

The version of `get()` with no parameters returns the entire canvas.

The version of `get()` with two parameters interprets them as coordinates. It returns an array with the `[R, G, B, A]` values of the pixel at the given point.

The version of `get()` with four parameters interprets them as coordinates and dimensions. It returns a subsection of the canvas as a [p5.Image](https://p5js.org/reference/p5/p5.Image) object. The first two parameters are the coordinates for the upper-left corner of the subsection. The last two parameters are the width and height of the subsection.

Use [p5.Image.get()](https://p5js.org/reference/p5.Image/get/) to work directly with [p5.Image](https://p5js.org/reference/p5/p5.Image) objects.

## Examples

## Syntax

`get(x, y, w, h)``get()``get(x, y)`

## Parameters

x

Number: x-coordinate of the pixel.

y

Number: y-coordinate of the pixel.

w

Number: width of the subsection to be returned.

h

Number: height of the subsection to be returned.

## Returns

p5.Image: subsection as a [p5.Image](https://p5js.org/reference/p5/p5.Image/) object.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/image/pixels.js](https://github.com/processing/p5.js/blob/v2.3.3/src/image/pixels.js#L696) and open a pull request!

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
  img = await loadImage('/assets/rockies.jpg');

  createCanvas(100, 100);

  // Display the image.
  image(img, 0, 0);

  // Get the entire canvas.
  let c = get();

  // Display half the canvas.
  image(c, 50, 0);

  describe('Two identical mountain landscapes shown side-by-side.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/rockies.jpg');

  createCanvas(100, 100);

  // Display the image.
  image(img, 0, 0);

  // Get the color of a pixel.
  let c = get(50, 90);

  // Style the square with the pixel's color.
  fill(c);
  noStroke();

  // Display the square.
  square(25, 25, 50);

  describe('A mountain landscape with an olive green square in its center.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/rockies.jpg');

  createCanvas(100, 100);

  // Display the image.
  image(img, 0, 0);

  // Get a region of the image.
  let c = get(0, 0, 50, 50);

  // Display the region.
  image(c, 50, 50);

  describe('A mountain landscape drawn on top of another mountain landscape.');
}
```
