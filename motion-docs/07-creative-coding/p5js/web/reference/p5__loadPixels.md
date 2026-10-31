---
source: https://p5js.org/reference/p5/loadPixels/
title: "loadPixels"
fetched: 2026-10-28
---

Loads the current value of each pixel on the canvas into the [pixels](https://p5js.org/reference/p5/pixels/) array.

`loadPixels()` must be called before reading from or writing to [pixels](https://p5js.org/reference/p5/pixels/).

## Examples

## Syntax

`loadPixels()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/image/pixels.js](https://github.com/processing/p5.js/blob/v2.3.3/src/image/pixels.js#L741) and open a pull request!

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
  image(img, 0, 0, 100, 100);

  // Get the pixel density.
  let d = pixelDensity();

  // Calculate the halfway index in the pixels array.
  let halfImage = 4 * (d * width) * (d * height / 2);

  // Load the pixels array.
  loadPixels();

  // Copy the top half of the canvas to the bottom.
  for (let i = 0; i < halfImage; i += 1) {
    pixels[i + halfImage] = pixels[i];
  }

  // Update the canvas.
  updatePixels();

  describe('Two identical images of mountain landscapes, one on top of the other.');
}
```
