---
source: https://p5js.org/reference/p5/deltaTime/
title: "deltaTime"
fetched: 2026-10-28
---

A `Number` variable that tracks the number of milliseconds it took to draw the last frame.

`deltaTime` contains the amount of time it took [draw()](https://p5js.org/reference/p5/draw/) to execute during the previous frame. It's useful for simulating physics.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L171) and open a pull request!

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
let x = 0;
let speed = 0.05;

function setup()  {
  createCanvas(100, 100);

  // Set the frameRate to 30.
  frameRate(30);

  describe('A white circle moves from left to right on a gray background. It reappears on the left side when it reaches the right side.');
}

function draw() {
  background(200);

  // Use deltaTime to calculate
  // a change in position.
  let deltaX = speed * deltaTime;

  // Update the x variable.
  x += deltaX;

  // Reset x to 0 if it's
  // greater than 100.
  if (x > 100)  {
    x = 0;
  }

  // Use x to set the circle's
  // position.
  circle(x, 50, 20);
}
```
