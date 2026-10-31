---
source: https://p5js.org/reference/p5/mouseWheel/
title: "mouseWheel"
fetched: 2026-10-28
---

A function that's called once when the mouse wheel moves.

Declaring the function `mouseWheel()` sets a code block to run automatically when the user scrolls with the mouse wheel:

```js
function mouseWheel() {
  // Code to run.
}
```

The mouse system variables, such as [mouseX](https://p5js.org/reference/p5/mouseX/) and [mouseY](https://p5js.org/reference/p5/mouseY/), will be updated with their most recent value when `mouseWheel()` is called by p5.js:

```js
function mouseWheel() {
  if (mouseX < 50) {
    // Code to run if the mouse is on the left.
  }

  if (mouseY > 50) {
    // Code to run if the mouse is near the bottom.
  }
}
```

The parameter, `event`, is optional. `mouseWheel()` is always passed a [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/) object with properties that describe the mouse scroll event:

```js
function mouseWheel(event) {
  // Code to run that uses the event.
  console.log(event);
}
```

The `event` object has many properties including `delta`, a `Number` containing the distance that the user scrolled. For example, `event.delta` might have the value 5 when the user scrolls up. `event.delta` is positive if the user scrolls up and negative if they scroll down. The signs are opposite on macOS with "natural" scrolling enabled.

Browsers may have default behaviors attached to various mouse events. For example, some browsers highlight text when the user moves the mouse while pressing a mouse button. To prevent any default behavior for this event, add `return false;` to the end of the function.

Note: On Safari, `mouseWheel()` may only work as expected if `return false;` is added at the end of the function.

## Examples

## Syntax

`mouseWheel([event])`

## Parameters

event

WheelEvent: optional `WheelEvent` argument.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/pointer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/pointer.js#L1811) and open a pull request!

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
let circleSize = 0;

function setup() {
  createCanvas(100, 100);

  describe(
    'A gray square. A white circle at its center grows up when the user scrolls the mouse wheel.'
  );
}

function draw() {
  background(200);

  // Draw the circle
  circle(circleSize, 50, 50);
}

// Increment circleSize when the user scrolls the mouse wheel.
function mouseWheel() {
  circleSize += 1;
  // Uncomment to prevent any default behavior.
  // return false;
}
```

```js
let direction = '';

function setup() {
  createCanvas(100, 100);

  describe(
    'A gray square. An arrow at its center points up when the user scrolls up. The arrow points down when the user scrolls down.'
  );
}

function draw() {
  background(200);

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Draw an arrow that points where
  // the mouse last scrolled.
  text(direction, 50, 50);
}

// Change direction when the user scrolls the mouse wheel.
function mouseWheel(event) {
  if (event.delta > 0) {
    direction = '▲';
  } else {
    direction = '▼';
  }
  // Uncomment to prevent any default behavior.
  // return false;
}
```
