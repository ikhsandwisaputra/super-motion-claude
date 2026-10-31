---
source: https://p5js.org/reference/p5/mouseX/
title: "mouseX"
fetched: 2026-10-28
---

A `Number` system variable that tracks the mouse's horizontal position.

`mouseX` keeps track of the mouse's position relative to the top-left corner of the canvas. For example, if the mouse is 50 pixels from the left edge of the canvas, then `mouseX` will be 50.

If touch is used instead of the mouse, then `mouseX` will hold the x-coordinate of the most recent touch point.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/pointer.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/pointer.js#L212) and open a pull request!

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

  describe("A vertical black line moves left and right following the mouse's x-position.");
}

function draw() {
  background(200);

  // Draw a vertical line that follows the mouse's x-coordinate.
  line(mouseX, 0, mouseX, 100);
}
```

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

  // Display the mouse's coordinates.
  text(`x: ${int(mouseX)} y: ${int(mouseY)}`, 50, 50);
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  describe("A vertical black line moves left and right following the mouse's x-position.");
}

function draw() {
  background(200);

  // Adjust coordinates for WebGL mode.
  // The origin (0, 0) is at the center of the canvas.
  let mx = mouseX - 50;

  // Draw the line.
  line(mx, -50, mx, 50);
}
```

```js
let font;

async function setup() {
  // Load a font for WebGL mode.
  font = await loadFont('/assets/inconsolata.otf');

  createCanvas(100, 100, WEBGL);

  describe(
    "A gray square. The mouse's x- and y-coordinates are displayed as the user moves the mouse."
  );
}

function draw() {
  background(200);

  // Style the text.
  textAlign(CENTER);
  textSize(16);
  textFont(font);
  fill(0);

  // Display the mouse's coordinates.
  text(`x: ${int(mouseX)} y: ${int(mouseY)}`, 0, 0);
}
```
