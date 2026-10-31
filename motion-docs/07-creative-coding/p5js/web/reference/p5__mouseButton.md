---
source: https://p5js.org/reference/p5/mouseButton/
title: "mouseButton"
fetched: 2026-10-28
---

An object that tracks the current state of mouse buttons, showing which buttons are pressed at any given moment.

The `mouseButton` object has three properties:

* `left`: A boolean indicating whether the left mouse button is pressed.
* `right`: A boolean indicating whether the right mouse button is pressed.
* `center`: A boolean indicating whether the middle mouse button (scroll wheel button) is pressed.

Note: Different browsers may track `mouseButton` differently. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons/) for more information.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/pointer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/pointer.js#L690) and open a pull request!

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
  createCanvas(200, 200);

  describe(
    'A gray square with black text at its center. The text changes from 0 to either "left" or "right" when the user clicks a mouse button.'
  );
}

function draw() {
  background(200);

  // Style the text.
  textAlign(CENTER, CENTER);
  textSize(16);

  // Display the mouse button.
  text(`Left: ${mouseButton.left}`, width / 2, height / 2 - 20);
  text(`Right: ${mouseButton.right}`, width / 2, height / 2);
  text(`Center: ${mouseButton.center}`, width / 2, height / 2 + 20);
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe(
    "A gray square. Different shapes appear at its center depending on the mouse button that's clicked."
  );
}

function draw() {
  background(200);

  if (mouseIsPressed === true) {
    if (mouseButton.left) {
      circle(50, 50, 50);
    }
    if (mouseButton.right) {
      square(25, 25, 50);
    }
    if (mouseButton.center) {
      triangle(23, 75, 50, 20, 78, 75);
    }
  }
}
```
