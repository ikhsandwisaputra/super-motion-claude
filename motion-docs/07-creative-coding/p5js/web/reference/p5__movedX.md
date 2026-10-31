---
source: https://p5js.org/reference/p5/movedX/
title: "movedX"
fetched: 2026-10-28
---

A `Number` system variable that tracks the mouse's horizontal movement.

`movedX` tracks how many pixels the mouse moves left or right between frames. `movedX` will have a negative value if the mouse moves left between frames and a positive value if it moves right. `movedX` can be calculated as `mouseX - pmouseX`.

Note: `movedX` continues updating even when [requestPointerLock()](https://p5js.org/reference/p5/requestPointerLock/) is active.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/pointer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/pointer.js#L71) and open a pull request!

---

## Related References

* [doubleClicked

  A function that's called once when a mouse button is clicked twice quickly.](https://p5js.org/reference/p5/doubleClicked/)
* [exitPointerLock

  Exits a pointer lock started with requestPointerLock.](https://p5js.org/reference/p5/exitPointerLock/)
* [mouseButton

  An object that tracks the current state of mouse buttons, showing which buttons are pressed at any given moment.](https://p5js.org/reference/p5/mouseButton/)
* [mouseClicked

  A function that's called once after a mouse button is pressed and released.](https://p5js.org/reference/p5/mouseClicked/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  describe(
    'A gray square. The text ">>" appears when the user moves the mouse to the right. The text "<<" appears when the user moves the mouse to the left.'
  );
}

function draw() {
  background(200);

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Display >> when movedX is positive and
  // << when it's negative.
  if (movedX > 0) {
    text('>>', 50, 50);
  } else if (movedX < 0) {
    text('<<', 50, 50);
  }
}
```
