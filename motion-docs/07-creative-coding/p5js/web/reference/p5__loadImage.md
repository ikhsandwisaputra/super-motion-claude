---
source: https://p5js.org/reference/p5/loadImage/
title: "loadImage"
fetched: 2026-10-28
---

Loads an image to create a [p5.Image](https://p5js.org/reference/p5/p5.Image) object.

`loadImage()` interprets the first parameter one of three ways. If the path to an image file is provided, `loadImage()` will load it. Paths to local files should be relative, such as `'/assets/thundercat.jpg'`. URLs such as `'https://example.com/thundercat.jpg'` may be blocked due to browser security. Raw image data can also be passed as a base64 encoded image in the form `'data:image/png;base64,arandomsequenceofcharacters'`. The `path` parameter can also be defined as a `Request` object for more advanced usage.

The second parameter is optional. If a function is passed, it will be called once the image has loaded. The callback function can optionally use the new [p5.Image](https://p5js.org/reference/p5/p5.Image) object. The return value of the function will be used as the final return value of `loadImage()`.

The third parameter is also optional. If a function is passed, it will be called if the image fails to load. The callback function can optionally use the event error. The return value of the function will be used as the final return value of `loadImage()`.

This function returns a `Promise` and should be used in an `async` setup with `await`. See the examples for the usage syntax.

## Examples

## Syntax

`loadImage(path, [successCallback], [failureCallback])`

## Parameters

path

String|Request: path of the image to be loaded or base64 encoded image.

successCallback

function(p5.Image): function called with [p5.Image](https://p5js.org/reference/p5/p5.Image/) once it loads.

failureCallback

function(Event): function called with event error if the image fails to load.

## Returns

Promise<p5.Image>: the [p5.Image](https://p5js.org/reference/p5/p5.Image/) object.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/image/loading\_displaying.js](https://github.com/processing/p5.js/blob/v2.3.3/src/image/loading_displaying.js#L128) and open a pull request!

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

// Load the image and create a p5.Image object.
async function setup() {
  img = await loadImage('/assets/laDefense.jpg');
  createCanvas(100, 100);

  // Draw the image.
  image(img, 0, 0);

  describe('Image of the underside of a white umbrella and a gridded ceiling.');
}
```

```js
async function setup() {
  // Call handleImage() once the image loads.
  await loadImage('/assets/laDefense.jpg', handleImage);

  describe('Image of the underside of a white umbrella and a gridded ceiling.');
}

// Display the image.
function handleImage(img) {
  image(img, 0, 0);
}
```

```js
async function setup() {
  // Call handleImage() once the image loads or
  // call handleError() if an error occurs.
  await loadImage('/assets/laDefense.jpg', handleImage, handleError);
}

// Display the image.
function handleImage(img) {
  image(img, 0, 0);

  describe('Image of the underside of a white umbrella and a gridded ceiling.');
}

// Log the error.
function handleError(event) {
  console.error('Oops!', event);
}
```
