---
source: https://p5js.org/reference/p5/winMouseY/
title: "winMouseY"
fetched: 2026-10-28
---

A `Number` variable that tracks the mouse's vertical position within the browser.

`winMouseY` keeps track of the mouse's position relative to the top-left corner of the browser window. For example, if the mouse is 50 pixels from the top edge of the browser, then `winMouseY` will be 50.

On a touchscreen device, `winMouseY` will hold the y-coordinate of the most recent touch point.

Note: Use [mouseY](https://p5js.org/reference/p5/mouseY/) to track the mouse’s y-coordinate within the canvas.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/pointer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/pointer.js#L494) and open a pull request!

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

  describe("A gray square. The mouse's x- and y-coordinates are displayed as the user moves the mouse.");
}

function draw() {
  background(200);

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Display the mouse's coordinates within the browser window.
  text(`x: ${int(winMouseX)} y: ${int(winMouseY)}`, 50, 50);
}
```
