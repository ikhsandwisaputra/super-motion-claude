---
source: https://p5js.org/reference/p5/draw/
title: "draw"
fetched: 2026-10-28
---

A function that's called repeatedly while the sketch runs.

Declaring the function `draw()` sets a code block to run repeatedly once the sketch starts. It’s used to create animations and respond to user inputs:

```js
function draw() {
  // Code to run repeatedly.
}
```

This is often called the "draw loop" because p5.js calls the code in `draw()` in a loop behind the scenes. By default, `draw()` tries to run 60 times per second. The actual rate depends on many factors. The drawing rate, called the "frame rate", can be controlled by calling [frameRate()](https://p5js.org/reference/p5/frameRate/). The number of times `draw()` has run is stored in the system variable [frameCount()](https://p5js.org/reference/p5/frameCount/).

Code placed within `draw()` begins looping after [setup()](https://p5js.org/reference/p5/setup/) runs. `draw()` will run until the user closes the sketch. `draw()` can be stopped by calling the [noLoop()](https://p5js.org/reference/p5/noLoop/) function. `draw()` can be resumed by calling the [loop()](https://p5js.org/reference/p5/loop/) function.

## Examples

## Syntax

`draw()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/main.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/main.js#L652) and open a pull request!

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
function setup() {
  createCanvas(100, 100);

  // Paint the background once.
  background(200);

  describe(
    'A white circle on a gray background. The circle follows the mouse as the user moves, leaving a trail.'
  );
}

function draw() {
  // Draw circles repeatedly.
  circle(mouseX, mouseY, 40);
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe(
    'A white circle on a gray background. The circle follows the mouse as the user moves.'
  );
}

function draw() {
  // Paint the background repeatedly.
  background(200);

  // Draw circles repeatedly.
  circle(mouseX, mouseY, 40);
}
```

```js
// Double-click the canvas to change the circle's color.

function setup() {
  createCanvas(100, 100);

  describe(
    'A white circle on a gray background. The circle follows the mouse as the user moves. The circle changes color to pink when the user double-clicks.'
  );
}

function draw() {
  // Paint the background repeatedly.
  background(200);

  // Draw circles repeatedly.
  circle(mouseX, mouseY, 40);
}

// Change the fill color when the user double-clicks.
function doubleClicked() {
  fill('deeppink');
}
```
