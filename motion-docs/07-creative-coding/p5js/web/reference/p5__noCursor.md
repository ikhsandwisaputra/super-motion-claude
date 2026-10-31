---
source: https://p5js.org/reference/p5/noCursor/
title: "noCursor"
fetched: 2026-10-28
---

Hides the cursor from view.

## Examples

## Syntax

`noCursor()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L485) and open a pull request!

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
  // Hide the cursor.
  noCursor();
}

function draw() {
  background(200);

  circle(mouseX, mouseY, 10);

  describe('A white circle on a gray background. The circle follows the mouse as it moves. The cursor is hidden.');
}
```
