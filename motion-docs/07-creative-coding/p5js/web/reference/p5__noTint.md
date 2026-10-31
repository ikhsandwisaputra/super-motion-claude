---
source: https://p5js.org/reference/p5/noTint/
title: "noTint"
fetched: 2026-10-28
---

Removes the current tint set by [tint()](https://p5js.org/reference/p5/tint/).

`noTint()` restores images to their original colors.

## Examples

## Syntax

`noTint()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/image/loading\_displaying.js](https://github.com/processing/p5.js/blob/v2.3.3/src/image/loading_displaying.js#L1346) and open a pull request!

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

  // Left.
  // Tint with a CSS color string.
  tint('red');
  image(img, 0, 0);

  // Right.
  // Remove the tint.
  noTint();
  image(img, 50, 0);

  describe('Two images of an umbrella and a ceiling side-by-side. The image on the left has a red tint.');
}
```
