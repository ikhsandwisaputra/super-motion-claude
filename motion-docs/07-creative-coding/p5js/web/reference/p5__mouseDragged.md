---
source: https://p5js.org/reference/p5/mouseDragged/
title: "mouseDragged"
fetched: 2026-10-28
---

A function that's called when the mouse moves while a button is pressed.

Declaring the function `mouseDragged()` sets a code block to run automatically when the user clicks and drags the mouse:

```js
function mouseDragged() {
  // Code to run.
}
```

The mouse system variables, such as [mouseX](https://p5js.org/reference/p5/mouseX/) and [mouseY](https://p5js.org/reference/p5/mouseY/), will be updated with their most recent value when `mouseDragged()` is called by p5.js:

```js
function mouseDragged() {
  if (mouseX < 50) {
    // Code to run if the mouse is on the left.
  }

  if (mouseY > 50) {
    // Code to run if the mouse is near the bottom.
  }
}
```

The parameter, `event`, is optional. `mouseDragged()` is always passed a [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/) object with properties that describe the mouse drag event:

```js
function mouseDragged(event) {
  // Code to run that uses the event.
  console.log(event);
}
```

On touchscreen devices, `mouseDragged()` will run when a user moves a touch point.

Browsers may have default behaviors attached to various mouse events. For example, some browsers highlight text when the user moves the mouse while pressing a mouse button. To prevent any default behavior for this event, add `return false;` to the end of the function.

## Examples

## Syntax

`mouseDragged([event])`

## Parameters

event

MouseEvent: optional `MouseEvent` argument.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/pointer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/pointer.js#L1066) and open a pull request!

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
let value = 0;

function setup() {
  createCanvas(100, 100);

  describe(
    'A gray square with a black square at its center. The inner square becomes lighter as the user drags the mouse.'
  );
}

function draw() {
  background(200);

  // Style the square.
  fill(value);

  // Draw the square.
  square(25, 25, 50);
}

function mouseDragged() {
  // Update the grayscale value.
  value += 5;

  // Reset the grayscale value.
  if (value > 255) {
    value = 0;
  }
  // Uncomment to prevent any default behavior.
  // return false;
}
```
