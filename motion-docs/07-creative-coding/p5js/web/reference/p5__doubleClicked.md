---
source: https://p5js.org/reference/p5/doubleClicked/
title: "doubleClicked"
fetched: 2026-10-28
---

A function that's called once when a mouse button is clicked twice quickly.

Declaring the function `doubleClicked()` sets a code block to run automatically when the user presses and releases the mouse button twice quickly:

```js
function doubleClicked() {
  // Code to run.
}
```

The mouse system variables, such as [mouseX](https://p5js.org/reference/p5/mouseX/) and [mouseY](https://p5js.org/reference/p5/mouseY/), will be updated with their most recent value when `doubleClicked()` is called by p5.js:

```js
function doubleClicked() {
  if (mouseX < 50) {
    // Code to run if the mouse is on the left.
  }

  if (mouseY > 50) {
    // Code to run if the mouse is near the bottom.
  }
}
```

The parameter, `event`, is optional. `doubleClicked()` is always passed a [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/) object with properties that describe the double-click event:

```js
function doubleClicked(event) {
  // Code to run that uses the event.
  console.log(event);
}
```

On touchscreen devices, code placed in `doubleClicked()` will run after two touches that occur within a short time.

Browsers may have default behaviors attached to various mouse events. For example, some browsers highlight text when the user moves the mouse while pressing a mouse button. To prevent any default behavior for this event, add `return false;` to the end of the function.

## Examples

## Syntax

`doubleClicked([event])`

## Parameters

event

MouseEvent: optional `MouseEvent` argument.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/pointer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/pointer.js#L1671) and open a pull request!

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
    'A gray square with a black square at its center. The inner square changes color when the user double-clicks.'
  );
}

function draw() {
  background(200);

  // Style the square.
  fill(value);

  // Draw the square.
  square(25, 25, 50);
}

// Toggle the square's color when the user double-clicks.
function doubleClicked() {
  if (value === 0) {
    value = 255;
  } else {
    value = 0;
  }
  // Uncomment to prevent any default behavior.
  // return false;
}
```

```js
let value = 0;

function setup() {
  createCanvas(100, 100);

  describe(
    'A gray square with a black circle at its center. When the user double-clicks on the circle, it changes color to white.'
  );
}

function draw() {
  background(200);

  // Style the circle.
  fill(value);

  // Draw the circle.
  circle(50, 50, 80);
}

// Reassign value to 255 when the user double-clicks on the circle.
function doubleClicked() {
  if (dist(50, 50, mouseX, mouseY) < 40) {
    value = 255;
  }
  // Uncomment to prevent any default behavior.
  // return false;
}
```
