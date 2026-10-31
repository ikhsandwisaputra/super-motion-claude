---
source: https://p5js.org/reference/p5/isLooping/
title: "isLooping"
fetched: 2026-10-28
---

Returns `true` if the draw loop is running and `false` if not.

By default, [draw()](https://p5js.org/reference/p5/draw/) tries to run 60 times per second. Calling [noLoop()](https://p5js.org/reference/p5/noLoop/) stops [draw()](https://p5js.org/reference/p5/draw/) from repeating. The draw loop can be restarted by calling [loop()](https://p5js.org/reference/p5/loop/).

The `isLooping()` function can be used to check whether a sketch is looping, as in `isLooping() === true`.

## Examples

## Syntax

`isLooping()`

## Parameters

## Returns

boolean:

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/structure.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/structure.js#L243) and open a pull request!

---

## Related References

* [disableFriendlyErrors

  Turns off the parts of the Friendly Error System (FES) that impact performance.](https://p5js.org/reference/p5/disableFriendlyErrors/)
* [draw

  A function that's called repeatedly while the sketch runs.](https://p5js.org/reference/p5/draw/)
* [isLooping

  Returns true if the draw loop is running and false if not.](https://p5js.org/reference/p5/isLooping/)
* [loop

  Resumes the draw loop after noLoop() has been called.](https://p5js.org/reference/p5/loop/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  describe('A white circle drawn against a gray background. When the user double-clicks, the circle stops or resumes following the mouse.');
}

function draw() {
  background(200);

  // Draw the circle at the mouse's position.
  circle(mouseX, mouseY, 20);
}

// Toggle the draw loop when the user double-clicks.
function doubleClicked() {
  if (isLooping() === true) {
    noLoop();
  } else {
    loop();
  }
}
```
