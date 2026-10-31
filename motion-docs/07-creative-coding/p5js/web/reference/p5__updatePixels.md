---
source: https://p5js.org/reference/p5/updatePixels/
title: "updatePixels"
fetched: 2026-10-28
---

Updates the canvas with the RGBA values in the [pixels](https://p5js.org/reference/p5/pixels/) array.

`updatePixels()` only needs to be called after changing values in the [pixels](https://p5js.org/reference/p5/pixels/) array. Such changes can be made directly after calling [loadPixels()](https://p5js.org/reference/p5/loadPixels/) or by calling [set()](https://p5js.org/reference/p5/set/).

## Examples

## Syntax

`updatePixels([x], [y], [w], [h])``updatePixels()`

## Parameters

x

Number: x-coordinate of the upper-left corner of region to update.

y

Number: y-coordinate of the upper-left corner of region to update.

w

Number: width of region to update.

h

Number: height of region to update.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/p5.Framebuffer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/p5.Framebuffer.js#L1134) and open a pull request!

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

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  background(200);

  // Create a p5.Framebuffer object.
  let myBuffer = createFramebuffer();

  // Load the pixels array.
  myBuffer.loadPixels();

  // Get the number of pixels in the
  // top half of the framebuffer.
  let numPixels = myBuffer.pixels.length / 2;

  // Set the framebuffer's top half to pink.
  for (let i = 0; i < numPixels; i += 4) {
    myBuffer.pixels[i] = 255;
    myBuffer.pixels[i + 1] = 102;
    myBuffer.pixels[i + 2] = 204;
    myBuffer.pixels[i + 3] = 255;
  }

  // Update the pixels array.
  myBuffer.updatePixels();

  // Draw the p5.Framebuffer object to the canvas.
  image(myBuffer, -50, -50);

  describe('A pink rectangle above a gray rectangle.');
}
```
