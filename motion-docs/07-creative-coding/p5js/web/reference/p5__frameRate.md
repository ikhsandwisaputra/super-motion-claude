---
source: https://p5js.org/reference/p5/frameRate/
title: "frameRate"
fetched: 2026-10-28
---

Sets the number of frames to draw per second.

Calling `frameRate()` with one numeric argument, as in `frameRate(30)`, attempts to draw 30 frames per second (FPS). The target frame rate may not be achieved depending on the sketch's processing needs. Most computers default to a frame rate of 60 FPS. Frame rates of 24 FPS and above are fast enough for smooth animations.

Calling `frameRate()` without an argument returns the current frame rate. The value returned is an approximation.

## Examples

## Syntax

`frameRate(fps)``frameRate()`

## Parameters

fps

Number: number of frames to draw per second.

## Returns

Number: current frame rate.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L397) and open a pull request!

---

## Related References

* [cursor

  Changes the cursor's appearance.](https://p5js.org/reference/p5/cursor/)
* [deltaTime

  A Number variable that tracks the number of milliseconds it took to draw the last frame.](https://p5js.org/reference/p5/deltaTime/)
* [describe

  Creates a screen reader-accessible description of the canvas.](https://p5js.org/reference/p5/describe/)
* [describeElement

  Creates a screen reader-accessible description of elements in the canvas.](https://p5js.org/reference/p5/describeElement/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  describe('A white circle on a gray background. The circle moves from left to right in a loop. It slows down when the mouse is pressed.');
}

function draw() {
  background(200);

  // Set the x variable based
  // on the current frameCount.
  let x = frameCount % 100;

  // If the mouse is pressed,
  // decrease the frame rate.
  if (mouseIsPressed === true) {
    frameRate(10);
  } else {
    frameRate(60);
  }

  // Use x to set the circle's
  // position.
  circle(x, 50, 20);
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('A number written in black on a gray background. The number decreases when the mouse is pressed.');
}

function draw() {
  background(200);

  // If the mouse is pressed, do lots
  // of math to slow down drawing.
  if (mouseIsPressed === true) {
    for (let i = 0; i < 1000000; i += 1) {
      random();
    }
  }

  // Get the current frame rate
  // and display it.
  let fps = frameRate();
  text(fps, 50, 50);
}
```
