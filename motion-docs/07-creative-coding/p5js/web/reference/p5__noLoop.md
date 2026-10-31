---
source: https://p5js.org/reference/p5/noLoop/
title: "noLoop"
fetched: 2026-10-28
---

Stops the code in [draw()](https://p5js.org/reference/p5/draw/) from running repeatedly.

By default, [draw()](https://p5js.org/reference/p5/draw/) tries to run 60 times per second. Calling `noLoop()` stops [draw()](https://p5js.org/reference/p5/draw/) from repeating. The draw loop can be restarted by calling [loop()](https://p5js.org/reference/p5/loop/). [draw()](https://p5js.org/reference/p5/draw/) can be run once by calling [redraw()](https://p5js.org/reference/p5/redraw/).

The [isLooping()](https://p5js.org/reference/p5/isLooping/) function can be used to check whether a sketch is looping, as in `isLooping() === true`.

## Examples

## Syntax

`noLoop()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/structure.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/structure.js#L112) and open a pull request!

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

  // Turn off the draw loop.
  noLoop();

  describe('A white half-circle on the left edge of a gray square.');
}

function draw() {
  background(200);

  // Calculate the circle's x-coordinate.
  let x = frameCount;

  // Draw the circle.
  // Normally, the circle would move from left to right.
  circle(x, 50, 20);
}
```

```js
// Double-click to stop the draw loop.

function setup() {
  createCanvas(100, 100);

  // Slow the frame rate.
  frameRate(5);

  describe('A white circle moves randomly on a gray background. It stops moving when the user double-clicks.');
}

function draw() {
  background(200);

  // Calculate the circle's coordinates.
  let x = random(0, 100);
  let y = random(0, 100);

  // Draw the circle.
  // Normally, the circle would move from left to right.
  circle(x, y, 20);
}

// Stop the draw loop when the user double-clicks.
function doubleClicked() {
  noLoop();
}
```

```js
let startButton;
let stopButton;

function setup() {
  createCanvas(100, 100);

  // Create the button elements and place them
  // beneath the canvas.
  startButton = createButton('▶');
  startButton.position(0, 100);
  startButton.size(50, 20);
  stopButton = createButton('◾');
  stopButton.position(50, 100);
  stopButton.size(50, 20);

  // Set functions to call when the buttons are pressed.
  startButton.mousePressed(loop);
  stopButton.mousePressed(noLoop);

  // Slow the frame rate.
  frameRate(5);

  describe(
    'A white circle moves randomly on a gray background. Play and stop buttons are shown beneath the canvas. The circle stops or starts moving when the user presses a button.'
  );
}

function draw() {
  background(200);

  // Calculate the circle's coordinates.
  let x = random(0, 100);
  let y = random(0, 100);

  // Draw the circle.
  // Normally, the circle would move from left to right.
  circle(x, y, 20);
}
```
