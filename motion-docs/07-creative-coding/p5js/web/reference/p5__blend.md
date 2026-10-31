---
source: https://p5js.org/reference/p5/blend/
title: "blend"
fetched: 2026-10-28
---

Copies a region of pixels from one image to another.

The first parameter, `srcImage`, is the [p5.Image](https://p5js.org/reference/p5/p5.Image) object to blend.

The next four parameters, `sx`, `sy`, `sw`, and `sh` determine the region to blend from the source image. `(sx, sy)` is the top-left corner of the region. `sw` and `sh` are the regions width and height.

The next four parameters, `dx`, `dy`, `dw`, and `dh` determine the region of the canvas to blend into. `(dx, dy)` is the top-left corner of the region. `dw` and `dh` are the regions width and height.

The tenth parameter, `blendMode`, sets the effect used to blend the images' colors. The options are `BLEND`, `DARKEST`, `LIGHTEST`, `DIFFERENCE`, `MULTIPLY`, `EXCLUSION`, `SCREEN`, `REPLACE`, `OVERLAY`, `HARD_LIGHT`, `SOFT_LIGHT`, `DODGE`, `BURN`, `ADD`, or `NORMAL`

## Examples

## Syntax

`blend(srcImage, sx, sy, sw, sh, dx, dy, dw, dh, blendMode)``blend(sx, sy, sw, sh, dx, dy, dw, dh, blendMode)`

## Parameters

srcImage

p5.Image: source image.

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

blendMode

BLEND|DARKEST|LIGHTEST|DIFFERENCE|MULTIPLY|EXCLUSION|SCREEN|REPLACE|OVERLAY|HARD\_LIGHT|SOFT\_LIGHT|DODGE|BURN|ADD|NORMAL: the blend mode. either BLEND, DARKEST, LIGHTEST, DIFFERENCE, MULTIPLY, EXCLUSION, SCREEN, REPLACE, OVERLAY, HARD\_LIGHT, SOFT\_LIGHT, DODGE, BURN, ADD or NORMAL.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/image/pixels.js](https://github.com/processing/p5.js/blob/v2.3.3/src/image/pixels.js#L125) and open a pull request!

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
let img0;
let img1;

async function setup() {
  // Load the images.
  img0 = await loadImage('/assets/rockies.jpg');
  img1 = await loadImage('/assets/bricks_third.jpg');

  createCanvas(100, 100);

  // Use the mountains as the background.
  background(img0);

  // Display the bricks.
  image(img1, 0, 0);

  // Display the bricks faded into the landscape.
  blend(img1, 0, 0, 33, 100, 67, 0, 33, 100, LIGHTEST);

  describe('A wall of bricks in front of a mountain landscape. The same wall of bricks appears faded on the right of the image.');
}
```

```js
let img0;
let img1;

async function setup() {
  // Load the images.
  img0 = await loadImage('/assets/rockies.jpg');
  img1 = await loadImage('/assets/bricks_third.jpg');

  createCanvas(100, 100);

  // Use the mountains as the background.
  background(img0);

  // Display the bricks.
  image(img1, 0, 0);

  // Display the bricks partially transparent.
  blend(img1, 0, 0, 33, 100, 67, 0, 33, 100, DARKEST);

  describe('A wall of bricks in front of a mountain landscape. The same wall of bricks appears transparent on the right of the image.');
}
```

```js
let img0;
let img1;

async function setup() {
  // Load the images.
  img0 = await loadImage('/assets/rockies.jpg');
  img1 = await loadImage('/assets/bricks_third.jpg');

  createCanvas(100, 100);

  // Use the mountains as the background.
  background(img0);

  // Display the bricks.
  image(img1, 0, 0);

  // Display the bricks washed out into the landscape.
  blend(img1, 0, 0, 33, 100, 67, 0, 33, 100, ADD);

  describe('A wall of bricks in front of a mountain landscape. The same wall of bricks appears washed out on the right of the image.');
}
```
