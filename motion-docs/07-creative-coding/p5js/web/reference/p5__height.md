---
source: https://p5js.org/reference/p5/height/
title: "height"
fetched: 2026-10-28
---

A `Number` variable that stores the height of the canvas in pixels.

`height`'s default value is 100. Calling [createCanvas()](https://p5js.org/reference/p5/createCanvas/) or [resizeCanvas()](https://p5js.org/reference/p5/resizeCanvas/) changes the value of `height`. Calling [noCanvas()](https://p5js.org/reference/p5/noCanvas/) sets its value to 0.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L1208) and open a pull request!

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

  // Display the canvas' height.
  text(height, 42, 54);

  describe('The number 100 written in black on a gray square.');
}
```

```js
function setup() {
  createCanvas(100, 50);

  background(200);

  // Display the canvas' height.
  text(height, 42, 27);

  describe('The number 50 written in black on a gray rectangle.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Display the canvas' height.
  text(height, 42, 54);

  describe('The number 100 written in black on a gray square. When the mouse is pressed, the square becomes a rectangle and the number becomes 50.');
}

// If the mouse is pressed, reisze
// the canvas and display its new
// height.
function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    resizeCanvas(100, 50);
    background(200);
    text(height, 42, 27);
  }
}
```
