---
source: https://p5js.org/reference/p5/setup/
title: "setup"
fetched: 2026-10-28
---

A function that's called once when the sketch begins running.

Declaring the function `setup()` sets a code block to run once automatically when the sketch starts running. It's used to perform setup tasks such as creating the canvas and initializing variables:

```js
function setup() {
  // Code to run once at the start of the sketch.
}
```

Code placed in `setup()` will run once before code placed in [draw()](https://p5js.org/reference/p5/draw/) begins looping. If `setup()` is declared `async` (e.g. `async function setup()`), execution pauses at each `await` until its promise resolves. For example, `font = await loadFont(...)` waits for the font asset to load because `loadFont()` function returns a promise, and the await keyword means the program will wait for the promise to resolve. This ensures that all assets are fully loaded before the sketch continues.

loading assets.

Note: `setup()` doesn’t have to be declared, but it’s common practice to do so.

## Examples

## Syntax

`setup()`

## Parameters

## Returns

void|Promise<void>:

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

  background(200);

  // Draw the circle.
  circle(50, 50, 40);

  describe('A white circle on a gray background.');
}
```

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
let img;

async function setup() {
  img = await loadImage('/assets/bricks.jpg');

  createCanvas(100, 100);

  // Draw the image.
  image(img, 0, 0);

  describe(
    'A white circle on a brick wall. The circle follows the mouse as the user moves, leaving a trail.'
  );
}

function draw() {
  // Style the circle.
  noStroke();

  // Draw the circle.
  circle(mouseX, mouseY, 10);
}
```
