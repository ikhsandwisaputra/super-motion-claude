---
source: https://p5js.org/reference/p5/focused/
title: "focused"
fetched: 2026-10-28
---

A `Boolean` variable that's `true` if the browser is focused and `false` if not.

Note: The browser window can only receive input if it's focused.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L202) and open a pull request!

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
// Open this example in two separate browser
// windows placed side-by-side to demonstrate.

function setup() {
  createCanvas(100, 100);

  describe('A square changes color from green to red when the browser window is out of focus.');
}

function draw() {
  // Change the background color
  // when the browser window
  // goes in/out of focus.
  if (focused === true) {
    background(0, 255, 0);
  } else {
    background(255, 0, 0);
  }
}
```
