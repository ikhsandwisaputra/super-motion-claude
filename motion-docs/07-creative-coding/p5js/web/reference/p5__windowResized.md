---
source: https://p5js.org/reference/p5/windowResized/
title: "windowResized"
fetched: 2026-10-28
---

A function that's called when the browser window is resized.

Code placed in the body of `windowResized()` will run when the browser window's size changes. It's a good place to call [resizeCanvas()](https://p5js.org/reference/p5/resizeCanvas/) or make other adjustments to accommodate the new window size.

The `event` parameter is optional. If added to the function declaration, it can be used for debugging or other purposes.

## Examples

## Syntax

`windowResized([event])`

## Parameters

event

Event: optional resize Event.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L725) and open a pull request!

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
  createCanvas(windowWidth, windowHeight);

  describe('A gray canvas with a white circle at its center. The canvas takes up the entire browser window. It changes size to match the browser window.');
}

function draw() {
  background(200);

  // Draw a circle at the center.
  circle(width / 2, height / 2, 50);
}

// Resize the canvas when the
// browser's size changes.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

```js
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200);

  describe('A gray canvas that takes up the entire browser window. It changes size to match the browser window.');
}

function windowResized(event) {
  // Resize the canvas when the
  // browser's size changes.
  resizeCanvas(windowWidth, windowHeight);

  // Print the resize event to the console for debugging.
  print(event);
}
```
