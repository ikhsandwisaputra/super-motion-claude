---
source: https://p5js.org/reference/p5/windowHeight/
title: "windowHeight"
fetched: 2026-10-28
---

A `Number` variable that stores the height of the browser's viewport.

The [layout viewport](https://developer.mozilla.org/en-US/docs/Glossary/Layout_viewport/) is the area within the browser that's available for drawing.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L662) and open a pull request!

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
  // Set the canvas' width and height
  // using the browser's dimensions.
  createCanvas(windowWidth, windowHeight);

  background(200);

  describe('A gray canvas that takes up the entire browser window.');
}
```
