---
source: https://p5js.org/reference/p5/image/
title: "image"
fetched: 2026-10-28
---

Draws an image to the canvas.

The first parameter, `img`, is the source image to be drawn. `img` can be any of the following objects:

* [p5.Image](https://p5js.org/reference/p5/p5.Image)
* [p5.Element](https://p5js.org/reference/p5/p5.Element)
* [p5.Texture](https://p5js.org/reference/p5/p5.Texture)
* [p5.Framebuffer](https://p5js.org/reference/p5/p5.Framebuffer)
* [p5.FramebufferTexture](https://p5js.org/reference/p5/p5.FramebufferTexture)

The second and third parameters, `dx` and `dy`, set the coordinates of the destination image's top left corner. See [imageMode()](https://p5js.org/reference/p5/imageMode/) for other ways to position images.

Here's a diagram that explains how optional parameters work in `image()`:

![](https://p5js.org/assets/drawImage.png)

The fourth and fifth parameters, `dw` and `dh`, are optional. They set the the width and height to draw the destination image. By default, `image()` draws the full source image at its original size.

The sixth and seventh parameters, `sx` and `sy`, are also optional. These coordinates define the top left corner of a subsection to draw from the source image.

The eighth and ninth parameters, `sw` and `sh`, are also optional. They define the width and height of a subsection to draw from the source image. By default, `image()` draws the full subsection that begins at `(sx, sy)` and extends to the edges of the source image.

The ninth parameter, `fit`, is also optional. It enables a subsection of the source image to be drawn without affecting its aspect ratio. If `CONTAIN` is passed, the full subsection will appear within the destination rectangle. If `COVER` is passed, the subsection will completely cover the destination rectangle. This may have the effect of zooming into the subsection.

The tenth and eleventh paremeters, `xAlign` and `yAlign`, are also optional. They determine how to align the fitted subsection. `xAlign` can be set to either `LEFT`, `RIGHT`, or `CENTER`. `yAlign` can be set to either `TOP`, `BOTTOM`, or `CENTER`. By default, both `xAlign` and `yAlign` are set to `CENTER`.

## Examples

## Syntax

`image(img, x, y, [width], [height])``image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight], [fit], [xAlign], [yAlign])`

## Parameters

img

p5.Image|p5.Element|p5.Texture|p5.Framebuffer|p5.FramebufferTexture|p5.Renderer|p5.Graphics: image to display.

x

Number: x-coordinate of the top-left corner of the image.

y

Number: y-coordinate of the top-left corner of the image.

width

Number: width to draw the image.

height

Number: height to draw the image.

dx

Number: the x-coordinate of the destination rectangle in which to draw the source image

dy

Number: the y-coordinate of the destination rectangle in which to draw the source image

dWidth

Number: the width of the destination rectangle

dHeight

Number: the height of the destination rectangle

sx

Number: the x-coordinate of the subsection of the source image to draw into the destination rectangle

sy

Number: the y-coordinate of the subsection of the source image to draw into the destination rectangle

sWidth

Number: the width of the subsection of the source image to draw into the destination rectangle

sHeight

Number: the height of the subsection of the source image to draw into the destination rectangle

fit

CONTAIN|COVER: either CONTAIN or COVER

xAlign

LEFT|RIGHT|CENTER: either LEFT, RIGHT or CENTER default is CENTER

yAlign

TOP|BOTTOM|CENTER: either TOP, BOTTOM or CENTER default is CENTER

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/image/loading\_displaying.js](https://github.com/processing/p5.js/blob/v2.3.3/src/image/loading_displaying.js#L1077) and open a pull request!

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

  background(50);

  // Draw the image.
  image(img, 0, 0);

  describe('An image of the underside of a white umbrella with a gridded ceiling above.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/laDefense.jpg');

  createCanvas(100, 100);

  background(50);

  // Draw the image.
  image(img, 10, 10);

  describe('An image of the underside of a white umbrella with a gridded ceiling above. The image has dark gray borders on its left and top.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/laDefense.jpg');

  createCanvas(100, 100);

  background(50);

  // Draw the image 50x50.
  image(img, 0, 0, 50, 50);

  describe('An image of the underside of a white umbrella with a gridded ceiling above. The image is drawn in the top left corner of a dark gray square.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/laDefense.jpg');

  createCanvas(100, 100);

  background(50);

  // Draw the center of the image.
  image(img, 25, 25, 50, 50, 25, 25, 50, 50);

  describe('An image of a gridded ceiling drawn in the center of a dark gray square.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/moonwalk.jpg');
  createCanvas(100, 100);

  background(50);

  // Draw the image and scale it to fit within the canvas.
  image(img, 0, 0, width, height, 0, 0, img.width, img.height, CONTAIN);

  describe('An image of an astronaut on the moon. The top and bottom borders of the image are dark gray.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/laDefense50.png');

  createCanvas(100, 100);

  background(50);

  // Draw the image and scale it to cover the canvas.
  image(img, 0, 0, width, height, 0, 0, img.width, img.height, COVER);

  describe('A pixelated image of the underside of a white umbrella with a gridded ceiling above.');
}
```
