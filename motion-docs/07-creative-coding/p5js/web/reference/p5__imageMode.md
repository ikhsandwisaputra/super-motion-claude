---
source: https://p5js.org/reference/p5/imageMode/
title: "imageMode"
fetched: 2026-10-28
---

Changes the location from which images are drawn when [image()](https://p5js.org/reference/p5/image/) is called.

By default, the first two parameters of [image()](https://p5js.org/reference/p5/image/) are the x- and y-coordinates of the image's upper-left corner. The next parameters are its width and height. This is the same as calling `imageMode(CORNER)`.

`imageMode(CORNERS)` also uses the first two parameters of [image()](https://p5js.org/reference/p5/image/) as the x- and y-coordinates of the image's top-left corner. The third and fourth parameters are the coordinates of its bottom-right corner.

`imageMode(CENTER)` uses the first two parameters of [image()](https://p5js.org/reference/p5/image/) as the x- and y-coordinates of the image's center. The next parameters are its width and height.

Calling `imageMode()` without an argument returns the current image mode, either `CORNER`, `CORNERS`, or `CENTER`.

## Examples

## Syntax

`imageMode(mode)``imageMode()`

## Parameters

mode

CORNER|CORNERS|CENTER: either CORNER, CORNERS, or CENTER.

## Returns

CORNER|CORNERS|CENTER: the current image mode

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/image/loading\_displaying.js](https://github.com/processing/p5.js/blob/v2.3.3/src/image/loading_displaying.js#L1449) and open a pull request!

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
  img = await loadImage('/assets/bricks.jpg');

  createCanvas(100, 100);

  background(200);

  // Use CORNER mode.
  imageMode(CORNER);

  // Display the image.
  image(img, 10, 10, 50, 50);

  describe('A square image of a brick wall is drawn at the top left of a gray square.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/bricks.jpg');

  createCanvas(100, 100);

  background(200);

  // Use CORNERS mode.
  imageMode(CORNERS);

  // Display the image.
  image(img, 10, 10, 90, 40);

  describe('An image of a brick wall is drawn on a gray square. The image is squeezed into a small rectangular area.');
}
```

```js
let img;

async function setup() {
  // Load the image.
  img = await loadImage('/assets/bricks.jpg');

  createCanvas(100, 100);

  background(200);

  // Use CENTER mode.
  imageMode(CENTER);

  // Display the image.
  image(img, 50, 50, 80, 80);

  describe('A square image of a brick wall is drawn on a gray square.');
}
```
