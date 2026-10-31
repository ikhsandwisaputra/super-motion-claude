---
source: https://p5js.org/reference/p5/pmouseX/
title: "pmouseX"
fetched: 2026-10-28
---

A `Number` system variable that tracks the mouse's previous horizontal position.

`pmouseX` keeps track of the mouse's position relative to the top-left corner of the canvas. Its value is [mouseX](https://p5js.org/reference/p5/mouseX/) from the previous frame. For example, if the mouse was 50 pixels from the left edge of the canvas during the last frame, then `pmouseX` will be 50.

If touch is used instead of the mouse, then `pmouseX` will hold the x-coordinate of the last touch point.

Note: `pmouseX` is reset to the current [mouseX](https://p5js.org/reference/p5/mouseX/) value at the start of each touch event.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/pointer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/pointer.js#L362) and open a pull request!

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

  // Slow the frame rate.
  frameRate(10);

  describe('A line follows the mouse as it moves. The line grows longer with faster movements.');
}

function draw() {
  background(200);

  line(pmouseX, pmouseY, mouseX, mouseY);
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A line follows the mouse as it moves. The line grows longer with faster movements.');
}

function draw() {
  background(200);

  // Adjust coordinates for WebGL mode.
  // The origin (0, 0) is at the center of the canvas.
  let pmx = pmouseX - 50;
  let pmy = pmouseY - 50;
  let mx = mouseX - 50;
  let my = mouseY - 50;

  // Draw the line.
  line(pmx, pmy, mx, my);
}
```
