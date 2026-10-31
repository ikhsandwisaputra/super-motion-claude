---
source: https://p5js.org/reference/p5/describe/
title: "describe"
fetched: 2026-10-28
---

Creates a screen reader-accessible description of the canvas.

The first parameter, `text`, is the description of the canvas.

The second parameter, `display`, is optional. It determines how the description is displayed. If `LABEL` is passed, as in `describe('A description.', LABEL)`, the description will be visible in a div element next to the canvas. If `FALLBACK` is passed, as in `describe('A description.', FALLBACK)`, the description will only be visible to screen readers. This is the default mode.

Read [Writing accessible canvas descriptions](https://p5js.org/learn/accessible-labels.html) to learn more about making sketches accessible.

## Examples

## Syntax

`describe(text, [display])`

## Parameters

text

String: description of the canvas.

display

FALLBACK|LABEL: either LABEL or FALLBACK.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/accessibility/describe.js](https://github.com/processing/p5.js/blob/v2.3.3/src/accessibility/describe.js#L113) and open a pull request!

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
  background('pink');

  // Draw a heart.
  fill('red');
  noStroke();
  circle(67, 67, 20);
  circle(83, 67, 20);
  triangle(91, 73, 75, 95, 59, 73);

  // Add a general description of the canvas.
  describe('A pink square with a red heart in the bottom-right corner.');
}
```

```js
function setup() {
  background('pink');

  // Draw a heart.
  fill('red');
  noStroke();
  circle(67, 67, 20);
  circle(83, 67, 20);
  triangle(91, 73, 75, 95, 59, 73);

  // Add a general description of the canvas
  // and display it for debugging.
  describe('A pink square with a red heart in the bottom-right corner.', LABEL);
}
```

```js
function setup(){
 createCanvas(100, 100);
};

function draw() {
  background(200);

  // The expression
  // frameCount % 100
  // causes x to increase from 0
  // to 99, then restart from 0.
  let x = frameCount % 100;

  // Draw the circle.
  fill(0, 255, 0);
  circle(x, 50, 40);

  // Add a general description of the canvas.
  describe(`A green circle at (${x}, 50) moves from left to right on a gray square.`);
}
```

```js
function setup(){
createCanvas(100, 100);
}

function draw() {
  background(200);

  // The expression
  // frameCount % 100
  // causes x to increase from 0
  // to 99, then restart from 0.
  let x = frameCount % 100;

  // Draw the circle.
  fill(0, 255, 0);
  circle(x, 50, 40);

  // Add a general description of the canvas
  // and display it for debugging.
  describe(`A green circle at (${x}, 50) moves from left to right on a gray square.`, LABEL);
}
```
