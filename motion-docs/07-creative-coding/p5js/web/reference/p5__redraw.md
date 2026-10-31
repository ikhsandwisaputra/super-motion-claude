---
source: https://p5js.org/reference/p5/redraw/
title: "redraw"
fetched: 2026-10-28
---

Runs the code in [draw()](https://p5js.org/reference/p5/draw/) once.

By default, [draw()](https://p5js.org/reference/p5/draw/) tries to run 60 times per second. Calling [noLoop()](https://p5js.org/reference/p5/noLoop/) stops [draw()](https://p5js.org/reference/p5/draw/) from repeating. Calling `redraw()` will execute the code in the [draw()](https://p5js.org/reference/p5/draw/) function a set number of times. `await` the result of `redraw` to make sure it has finished.

The parameter, `n`, is optional. If a number is passed, as in `redraw(5)`, then the draw loop will run the given number of times. By default, `n` is 1.

## Examples

## Syntax

`redraw([n])`

## Parameters

n

Integer: number of times to run [draw()](https://p5js.org/reference/p5/redraw/#/p5/draw). Defaults to 1.

## Returns

Promise<void>:

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/structure.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/structure.js#L326) and open a pull request!

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
// Double-click the canvas to move the circle.

let x = 0;

function setup() {
  createCanvas(100, 100);

  // Turn off the draw loop.
  noLoop();

  describe(
    'A white half-circle on the left edge of a gray square. The circle moves a little to the right when the user double-clicks.'
  );
}

function draw() {
  background(200);

  // Draw the circle.
  circle(x, 50, 20);

  // Increment x.
  x += 5;
}

// Run the draw loop when the user double-clicks.
async function doubleClicked() {
  await redraw();
}
```

```js
// Double-click the canvas to move the circle.

let x = 0;

function setup() {
  createCanvas(100, 100);

  // Turn off the draw loop.
  noLoop();

  describe(
    'A white half-circle on the left edge of a gray square. The circle hops to the right when the user double-clicks.'
  );
}

function draw() {
  background(200);

  // Draw the circle.
  circle(x, 50, 20);

  // Increment x.
  x += 5;
}

// Run the draw loop three times when the user double-clicks.
async function doubleClicked() {
  await redraw(3);
}
```
