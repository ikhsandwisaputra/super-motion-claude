---
source: https://p5js.org/reference/p5/requestPointerLock/
title: "requestPointerLock"
fetched: 2026-10-28
---

Locks the mouse pointer to its current position and makes it invisible.

`requestPointerLock()` allows the mouse to move forever without leaving the screen. Calling `requestPointerLock()` locks the values of [mouseX](https://p5js.org/reference/p5/mouseX/), [mouseY](https://p5js.org/reference/p5/mouseY/), [pmouseX](https://p5js.org/reference/p5/pmouseX/), and [pmouseY](https://p5js.org/reference/p5/pmouseY/). [movedX](https://p5js.org/reference/p5/movedX/) and [movedY](https://p5js.org/reference/p5/movedY/) continue updating and can be used to get the distance the mouse moved since the last frame was drawn. Calling [exitPointerLock()](https://p5js.org/reference/p5/exitPointerLock/) resumes updating the mouse system variables.

Note: Most browsers require an input, such as a click, before calling `requestPointerLock()`. It’s recommended to call `requestPointerLock()` in an event function such as [doubleClicked()](https://p5js.org/reference/p5/doubleClicked/).

## Examples

## Syntax

`requestPointerLock()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/pointer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/pointer.js#L1871) and open a pull request!

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
let score = 0;

function setup() {
  createCanvas(100, 100);

  describe(
    'A gray square with the text "Score: X" at its center. The score increases when the user moves the mouse upward. It decreases when the user moves the mouse downward.'
  );
}

function draw() {
  background(200);

  // Update the score.
  score -= movedY;

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Display the score.
  text(`Score: ${score}`, 50, 50);
}

// Lock the pointer when the user double-clicks.
function doubleClicked() {
  requestPointerLock();
}
```
