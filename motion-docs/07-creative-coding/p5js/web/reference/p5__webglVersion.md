---
source: https://p5js.org/reference/p5/webglVersion/
title: "webglVersion"
fetched: 2026-10-28
---

A `String` variable with the WebGL version in use.

`webglVersion`'s value equals one of the following string constants:

* `WEBGL2` whose value is `'webgl2'`,
* `WEBGL` whose value is `'webgl'`, or
* `P2D` whose value is `'p2d'`. This is the default for 2D sketches.
* `P2DP3` whose value is `'p2d-p3'` (used for P3 2D sketches, if available).

See [setAttributes()](https://p5js.org/reference/p5/setAttributes/) for ways to set the WebGL version.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L556) and open a pull request!

---

## Related References

* [cursor

  Changes the cursor's appearance.](https://p5js.org/reference/p5/cursor/)
* [deltaTime

  A Number variable that tracks the number of milliseconds it took to draw the last frame.](https://p5js.org/reference/p5/deltaTime/)
* [describe

  Creates a screen reader-accessible description of the canvas.](https://p5js.org/reference/p5/describe/)
* [describeElement

  Creates a screen reader-accessible description of elements in the canvas.](https://p5js.org/reference/p5/describeElement/)

## Example code (extracted)

```js
function setup() {
  background(200);

  // Display the current WebGL version.
  text(webglVersion, 42, 54);

  describe('The text "p2d" written in black on a gray background.');
}
```

```js
let font;

async function setup() {
  // Load a font to use.
  font = await loadFont('/assets/inconsolata.otf');

  // Create a canvas using WEBGL mode.
  createCanvas(100, 50, WEBGL);
  background(200);

  // Display the current WebGL version.
  fill(0);
  textFont(font);
  text(webglVersion, -15, 5);

  describe('The text "webgl2" written in black on a gray background.');
}
```

```js
let font;

async function setup() {
  // Load a font to use.
  font = await loadFont('/assets/inconsolata.otf');

  // Create a canvas using WEBGL mode.
  createCanvas(100, 50, WEBGL);

  // Set WebGL to version 1.
  setAttributes({ version: 1 });

  background(200);

  // Display the current WebGL version.
  fill(0);
  textFont(font);
  text(webglVersion, -14, 5);

  describe('The text "webgl" written in black on a gray background.');
}
```
