---
source: https://p5js.org/reference/p5/touches/
title: "touches"
fetched: 2026-10-28
---

An `Array` of all the current touch points on a touchscreen device.

The `touches` array is empty by default. When the user touches their screen, a new touch point is tracked and added to the array. Touch points are `Objects` with the following properties:

```js
// Iterate over the touches array.
for (let touch of touches) {
  // x-coordinate relative to the top-left
  // corner of the canvas.
  console.log(touch.x);

  // y-coordinate relative to the top-left
  // corner of the canvas.
  console.log(touch.y);

  // x-coordinate relative to the top-left
  // corner of the browser.
  console.log(touch.winX);

  // y-coordinate relative to the top-left
  // corner of the browser.
  console.log(touch.winY);

  // ID number
  console.log(touch.id);
}
```

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/pointer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/pointer.js#L772) and open a pull request!

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
// On a touchscreen device, touch the canvas using one or more fingers
// at the same time.

function setup() {
  createCanvas(100, 100);

  describe(
    'A gray square. White circles appear where the user touches the square.'
  );
}

function draw() {
  background(200);

  // Draw a circle at each touch point.
  for (let touch of touches) {
    circle(touch.x, touch.y, 40);
  }
}
```

```js
// On a touchscreen device, touch the canvas using one or more fingers
// at the same time.

function setup() {
  createCanvas(100, 100);

  describe(
    'A gray square. Labels appear where the user touches the square, displaying the coordinates.'
  );
}

function draw() {
  background(200);

  // Draw a label above each touch point.
  for (let touch of touches) {
    text(`${touch.x}, ${touch.y}`, touch.x, touch.y - 40);
  }
}
```
