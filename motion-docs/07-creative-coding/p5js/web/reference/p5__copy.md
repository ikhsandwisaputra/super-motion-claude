---
source: https://p5js.org/reference/p5/copy/
title: "copy"
fetched: 2026-10-28
---

Copies pixels from a source image to a region of the canvas.

The first parameter, `srcImage`, is the [p5.Image](https://p5js.org/reference/p5/p5.Image) object to blend. The source image can be the canvas itself or a [p5.Image](https://p5js.org/reference/p5/p5.Image) object. `copy()` will scale pixels from the source region if it isn't the same size as the destination region.

The next four parameters, `sx`, `sy`, `sw`, and `sh` determine the region to copy from the source image. `(sx, sy)` is the top-left corner of the region. `sw` and `sh` are the region's width and height.

The next four parameters, `dx`, `dy`, `dw`, and `dh` determine the region of the canvas to copy into. `(dx, dy)` is the top-left corner of the region. `dw` and `dh` are the region's width and height.

## Examples

## Syntax

`copy(srcImage, sx, sy, sw, sh, dx, dy, dw, dh)``copy(sx, sy, sw, sh, dx, dy, dw, dh)`

## Parameters

srcImage

p5.Image|p5.Element: source image.

sx

Integer: x-coordinate of the source's upper-left corner.

sy

Integer: y-coordinate of the source's upper-left corner.

sw

Integer: source image width.

sh

Integer: source image height.

dx

Integer: x-coordinate of the destination's upper-left corner.

dy

Integer: y-coordinate of the destination's upper-left corner.

dw

Integer: destination image width.

dh

Integer: destination image height.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/image/pixels.js](https://github.com/processing/p5.js/blob/v2.3.3/src/image/pixels.js#L196) and open a pull request!

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

  // Use the mountains as the background.
  background(img);

  // Copy a region of pixels to another spot.
  copy(img, 7, 22, 10, 10, 35, 25, 50, 50);

  // Outline the copied region.
  stroke(255);
  noFill();
  square(7, 22, 10);

  describe('An image of a mountain landscape. A square region is outlined in white. A larger square contains a pixelated view of the outlined region.');
}
```
