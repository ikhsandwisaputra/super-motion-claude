---
source: https://p5js.org/reference/p5/set/
title: "set"
fetched: 2026-10-28
---

Sets the color of a pixel or draws an image to the canvas.

`set()` is easy to use but it's not as fast as [pixels](https://p5js.org/reference/p5/pixels/). Use [pixels](https://p5js.org/reference/p5/pixels/) to set many pixel values.

`set()` interprets the first two parameters as x- and y-coordinates. It interprets the last parameter as a grayscale value, a `[R, G, B, A]` pixel array, a [p5.Color](https://p5js.org/reference/p5/p5.Color) object, or a [p5.Image](https://p5js.org/reference/p5/p5.Image) object. If an image is passed, the first two parameters set the coordinates for the image's upper-left corner, regardless of the current [imageMode()](https://p5js.org/reference/p5/imageMode/).

[updatePixels()](https://p5js.org/reference/p5/updatePixels/) must be called after using `set()` for changes to appear.

## Examples

## Syntax

`set(x, y, c)`

## Parameters

x

Number: x-coordinate of the pixel.

y

Number: y-coordinate of the pixel.

c

Number|Number[]|Object: grayscale value | pixel array | [p5.Color](https://p5js.org/reference/p5/p5.Color/) object | [p5.Image](https://p5js.org/reference/p5/p5.Image/) to copy.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/image/pixels.js](https://github.com/processing/p5.js/blob/v2.3.3/src/image/pixels.js#L848) and open a pull request!

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
function setup() {
  createCanvas(100, 100);

  background(200);

  // Set four pixels to black.
  set(30, 20, 0);
  set(85, 20, 0);
  set(85, 75, 0);
  set(30, 75, 0);

  // Update the canvas.
  updatePixels();

  describe('Four black dots arranged in a square drawn on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create a p5.Color object.
  let black = color(0);

  // Set four pixels to black.
  set(30, 20, black);
  set(85, 20, black);
  set(85, 75, black);
  set(30, 75, black);

  // Update the canvas.
  updatePixels();

  describe('Four black dots arranged in a square drawn on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(255);

  // Draw a horizontal color gradient.
  for (let x = 0; x < 100; x += 1) {
    for (let y = 0; y < 100; y += 1) {
      // Calculate the grayscale value.
      let c = map(x, 0, 100, 0, 255);

      // Set the pixel using the grayscale value.
      set(x, y, c);
    }
  }

  // Update the canvas.
  updatePixels();

  describe('A horiztonal color gradient from black to white.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/rockies.jpg');

  createCanvas(100, 100);

  // Use the image to set all pixels.
  set(0, 0, img);

  // Update the canvas.
  updatePixels();

  describe('An image of a mountain landscape.');
}
```
