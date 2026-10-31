---
source: https://p5js.org/reference/p5/getTargetFrameRate/
title: "getTargetFrameRate"
fetched: 2026-10-28
---

Returns the target frame rate.

The value is either the system frame rate or the last value passed to [frameRate()](https://p5js.org/reference/p5/frameRate/).

## Examples

## Syntax

`getTargetFrameRate()`

## Parameters

## Returns

Number: \_targetFrameRate

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L463) and open a pull request!

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
  createCanvas(100, 100);

  describe('The number 20 written in black on a gray background.');
}

function draw() {
  background(200);

  // Set the frame rate to 20.
  frameRate(20);

  // Get the target frame rate and
  // display it.
  let fps = getTargetFrameRate();
  text(fps, 43, 54);
}
```
