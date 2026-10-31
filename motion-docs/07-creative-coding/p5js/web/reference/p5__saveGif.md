---
source: https://p5js.org/reference/p5/saveGif/
title: "saveGif"
fetched: 2026-10-28
---

Generates a gif from a sketch and saves it to a file.

`saveGif()` may be called in [setup()](https://p5js.org/reference/p5/setup/) or at any point while a sketch is running.

The first parameter, `fileName`, sets the gif's file name.

The second parameter, `duration`, sets the gif's duration in seconds.

The third parameter, `options`, is optional. If an object is passed, `saveGif()` will use its properties to customize the gif. `saveGif()` recognizes the properties `delay`, `units`, `silent`, `notificationDuration`, and `notificationID`.

## Examples

## Syntax

`saveGif(filename, duration, [options])`

## Parameters

filename

String: file name of gif.

duration

Number: duration in seconds to capture from the sketch.

options

Object: an object that can contain five more properties:

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/image/loading\_displaying.js](https://github.com/processing/p5.js/blob/v2.3.3/src/image/loading_displaying.js#L283) and open a pull request!

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
function setup() {
  createCanvas(100, 100);

  describe('A circle drawn in the middle of a gray square. The circle changes color from black to white, then repeats.');
}

function draw() {
  background(200);

  // Style the circle.
  let c = frameCount % 255;
  fill(c);

  // Display the circle.
  circle(50, 50, 25);
}

// Save a 5-second gif when the user presses the 's' key.
function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5);
  }
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('A circle drawn in the middle of a gray square. The circle changes color from black to white, then repeats.');
}

function draw() {
  background(200);

  // Style the circle.
  let c = frameCount % 255;
  fill(c);

  // Display the circle.
  circle(50, 50, 25);
}

// Save a 5-second gif when the user presses the 's' key.
// Wait 1 second after the key press before recording.
function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5, { delay: 1 });
  }
}
```
