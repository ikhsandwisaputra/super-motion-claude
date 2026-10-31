---
source: https://p5js.org/reference/p5/mousePressed/
title: "mousePressed"
fetched: 2026-10-28
---

A function that's called once when a mouse button is pressed.

Declaring the function `mousePressed()` sets a code block to run automatically when the user presses a mouse button:

```js
function mousePressed() {
  // Code to run.
}
```

The mouse system variables, such as [mouseX](https://p5js.org/reference/p5/mouseX/) and [mouseY](https://p5js.org/reference/p5/mouseY/), will be updated with their most recent value when `mousePressed()` is called by p5.js:

```js
function mousePressed() {
  if (mouseX < 50) {
    // Code to run if the mouse is on the left.
  }

  if (mouseY > 50) {
    // Code to run if the mouse is near the bottom.
  }
}
```

The parameter, `event`, is optional. `mousePressed()` is always passed a [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/) object with properties that describe the mouse press event:

```js
function mousePressed(event) {
  // Code to run that uses the event.
  console.log(event);
}
```

On touchscreen devices, `mousePressed()` will run when a user’s touch begins.

Browsers may have default behaviors attached to various mouse events. For example, some browsers highlight text when the user moves the mouse while pressing a mouse button. To prevent any default behavior for this event, add `return false;` to the end of the function.

Note: `mousePressed()`, [mouseReleased()](https://p5js.org/reference/p5/mouseReleased/), and [mouseClicked()](https://p5js.org/reference/p5/mouseClicked/) are all related. `mousePressed()` runs as soon as the user clicks the mouse. [mouseReleased()](https://p5js.org/reference/p5/mouseReleased/) runs as soon as the user releases the mouse click. [mouseClicked()](https://p5js.org/reference/p5/mouseClicked/) runs immediately after [mouseReleased()](https://p5js.org/reference/p5/mouseReleased/).

## Examples

## Syntax

`mousePressed([event])`

## Parameters

event

MouseEvent: optional `MouseEvent` argument.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/pointer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/pointer.js#L1230) and open a pull request!

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
    'A gray square with a black square at its center. The inner square becomes lighter when the user presses a mouse button.'
  );
}

function draw() {
  background(200);

  // Style the square.
  fill(value);

  // Draw the square.
  square(25, 25, 50);
}

function mousePressed() {
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

```js
function setup() {
  createCanvas(100, 100);

  // Style the circle.
  fill('orange');
  stroke('royalblue');
  strokeWeight(10);

  describe(
    'An orange circle with a thick, blue border drawn on a gray background. When the user presses and holds the mouse, the border becomes thin and pink. When the user releases the mouse, the border becomes thicker and changes color to blue.'
  );
}

function draw() {
  background(220);

  // Draw the circle.
  circle(50, 50, 20);
}

// Set the stroke color and weight as soon as the user clicks.
function mousePressed() {
  stroke('deeppink');
  strokeWeight(3);
}

// Set the stroke and fill colors as soon as the user releases
// the mouse.
function mouseReleased() {
  stroke('royalblue');

  // This is never visible because fill() is called
  // in mouseClicked() which runs immediately after
  // mouseReleased();
  fill('limegreen');
}

// Set the fill color and stroke weight after
// mousePressed() and mouseReleased() are called.
function mouseClicked() {
  fill('orange');
  strokeWeight(10);
}
```
