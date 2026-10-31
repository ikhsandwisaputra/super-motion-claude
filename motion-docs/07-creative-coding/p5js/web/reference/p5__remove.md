---
source: https://p5js.org/reference/p5/remove/
title: "remove"
fetched: 2026-10-28
---

Removes the sketch from the web page.

Calling `remove()` stops the draw loop and removes any HTML elements created by the sketch, including the canvas. A new sketch can be created by using the [p5()](https://p5js.org/reference/p5/p5/) constructor, as in `new p5()`.

## Examples

## Syntax

`remove()``remove()``remove()``remove()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/main.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/main.js#L368) and open a pull request!

---

## Related References

* [disableFriendlyErrors

  Turns off the parts of the Friendly Error System (FES) that impact performance.](https://p5js.org/reference/p5/disableFriendlyErrors/)
* [draw

  A function that's called repeatedly while the sketch runs.](https://p5js.org/reference/p5/draw/)
* [isLooping

  Returns true if the draw loop is running and false if not.](https://p5js.org/reference/p5/isLooping/)
* [loop

  Resumes the draw loop after noLoop() has been called.](https://p5js.org/reference/p5/loop/)

## Example code (extracted)

```js
// Double-click to remove the canvas.

function setup() {
  createCanvas(100, 100);

  describe(
    'A white circle on a gray background. The circle follows the mouse as the user moves. The sketch disappears when the user double-clicks.'
  );
}

function draw() {
  // Paint the background repeatedly.
  background(200);

  // Draw circles repeatedly.
  circle(mouseX, mouseY, 40);
}

// Remove the sketch when the user double-clicks.
function doubleClicked() {
  remove();
}
```

```js
// Double-click to remove the canvas.

function setup() {
  createCanvas(100, 100);

  describe(
    'A white circle on a gray background. The circle follows the mouse as the user moves. The sketch disappears when the user double-clicks.'
  );
}

function draw() {
  // Paint the background repeatedly.
  background(200);

  // Draw circles repeatedly.
  circle(mouseX, mouseY, 40);
}

// Remove the sketch when the user double-clicks.
function doubleClicked() {
  remove();
}
```

```js
// Double-click to remove the canvas.

function setup() {
  createCanvas(100, 100);

  describe(
    'A white circle on a gray background. The circle follows the mouse as the user moves. The sketch disappears when the user double-clicks.'
  );
}

function draw() {
  // Paint the background repeatedly.
  background(200);

  // Draw circles repeatedly.
  circle(mouseX, mouseY, 40);
}

// Remove the sketch when the user double-clicks.
function doubleClicked() {
  remove();
}
```

```js
// Double-click to remove the canvas.

function setup() {
  createCanvas(100, 100);

  describe(
    'A white circle on a gray background. The circle follows the mouse as the user moves. The sketch disappears when the user double-clicks.'
  );
}

function draw() {
  // Paint the background repeatedly.
  background(200);

  // Draw circles repeatedly.
  circle(mouseX, mouseY, 40);
}

// Remove the sketch when the user double-clicks.
function doubleClicked() {
  remove();
}
```
