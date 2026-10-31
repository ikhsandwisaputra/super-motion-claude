---
source: https://p5js.org/reference/p5/pwinMouseX/
title: "pwinMouseX"
fetched: 2026-10-28
---

A `Number` variable that tracks the mouse's previous horizontal position within the browser.

`pwinMouseX` keeps track of the mouse's position relative to the top-left corner of the browser window. Its value is [winMouseX](https://p5js.org/reference/p5/winMouseX/) from the previous frame. For example, if the mouse was 50 pixels from the left edge of the browser during the last frame, then `pwinMouseX` will be 50.

On a touchscreen device, `pwinMouseX` will hold the x-coordinate of the most recent touch point. `pwinMouseX` is reset to the current [winMouseX](https://p5js.org/reference/p5/winMouseX/) value at the start of each touch event.

Note: Use [pmouseX](https://p5js.org/reference/p5/pmouseX/) to track the mouse’s previous x-coordinate within the canvas.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/pointer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/pointer.js#L558) and open a pull request!

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

  describe('A gray square. A white circle at its center grows larger when the mouse moves horizontally.');
}

function draw() {
  background(200);

  // Calculate the circle's diameter.
  let d = winMouseX - pwinMouseX;

  // Draw the circle.
  circle(50, 50, d);
}
```

```js
function setup() {
  // Create the canvas and set its position.
  let cnv = createCanvas(100, 100);
  cnv.position(20, 20);

  describe('A gray square with a number at its center. The number changes as the user moves the mouse vertically.');
}

function draw() {
  background(200);

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Display pwinMouseX.
  text(pwinMouseX, 50, 50);
}
```
