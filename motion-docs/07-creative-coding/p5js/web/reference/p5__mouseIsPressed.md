---
source: https://p5js.org/reference/p5/mouseIsPressed/
title: "mouseIsPressed"
fetched: 2026-10-28
---

A `Boolean` system variable that's `true` if the mouse is pressed and `false` if not.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/pointer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/pointer.js#L825) and open a pull request!

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

  describe(
    'A gray square with the word "false" at its center. The word changes to "true" when the user presses a mouse button.'
  );
}

function draw() {
  background(200);

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Display the mouseIsPressed variable.
  text(mouseIsPressed, 25, 50);
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe(
    'A gray square with a white square at its center. The inner square turns black when the user presses the mouse.'
  );
}

function draw() {
  background(200);

  // Style the square.
  if (mouseIsPressed === true) {
    fill(0);
  } else {
    fill(255);
  }

  // Draw the square.
  square(25, 25, 50);
}
```
