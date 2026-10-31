---
source: https://p5js.org/reference/p5/exitPointerLock/
title: "exitPointerLock"
fetched: 2026-10-28
---

Exits a pointer lock started with [requestPointerLock](https://p5js.org/reference/p5/requestPointerLock/).

Calling `requestPointerLock()` locks the values of [mouseX](https://p5js.org/reference/p5/mouseX/), [mouseY](https://p5js.org/reference/p5/mouseY/), [pmouseX](https://p5js.org/reference/p5/pmouseX/), and [pmouseY](https://p5js.org/reference/p5/pmouseY/). Calling `exitPointerLock()` resumes updating the mouse system variables.

Note: Most browsers require an input, such as a click, before calling `requestPointerLock()`. It’s recommended to call `requestPointerLock()` in an event function such as [doubleClicked()](https://p5js.org/reference/p5/doubleClicked/).

## Examples

## Syntax

`exitPointerLock()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/pointer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/pointer.js#L1936) and open a pull request!

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
let isLocked = false;

function setup() {
  createCanvas(100, 100);

  describe(
    'A gray square with a word at its center. The word changes between "Unlocked" and "Locked" when the user double-clicks.'
  );
}

function draw() {
  background(200);

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Tell the user whether the pointer is locked.
  if (isLocked === true) {
    text('Locked', 50, 50);
  } else {
    text('Unlocked', 50, 50);
  }
}

// Toggle the pointer lock when the user double-clicks.
function doubleClicked() {
  if (isLocked === true) {
    exitPointerLock();
    isLocked = false;
  } else {
    requestPointerLock();
    isLocked = true;
  }
}
```
