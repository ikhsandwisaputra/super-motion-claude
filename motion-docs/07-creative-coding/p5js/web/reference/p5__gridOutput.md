---
source: https://p5js.org/reference/p5/gridOutput/
title: "gridOutput"
fetched: 2026-10-28
---

Creates a screen reader-accessible description of shapes on the canvas.

`gridOutput()` adds a general description, table of shapes, and list of shapes to the web page. The general description includes the canvas size, canvas color, and number of shapes. For example, `gray canvas, 100 by 100 pixels, contains 2 shapes: 1 circle 1 square`.

`gridOutput()` uses its table of shapes as a grid. Each shape in the grid is placed in a cell whose row and column correspond to the shape's location on the canvas. The grid cells describe the color and type of shape at that location. For example, `red circle`. These descriptions can be selected individually to get more details. This is different from [textOutput()](https://p5js.org/reference/p5/textOutput/), which uses its table as a list.

A list of shapes follows the table. The list describes the color, type, location, and area of each shape. For example, `red circle, location = middle, area = 3 %`.

The `display` parameter is optional. It determines how the description is displayed. If `LABEL` is passed, as in `gridOutput(LABEL)`, the description will be visible in a div element next to the canvas. Using `LABEL` creates unhelpful duplicates for screen readers. Only use `LABEL` during development. If `FALLBACK` is passed, as in `gridOutput(FALLBACK)`, the description will only be visible to screen readers. This is the default mode.

Read [Writing accessible canvas descriptions](https://p5js.org/learn/accessible-labels.html) to learn more about making sketches accessible.

## Examples

## Syntax

`gridOutput([display])`

## Parameters

display

FALLBACK|LABEL: either FALLBACK or LABEL.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/accessibility/outputs.js](https://github.com/processing/p5.js/blob/v2.3.3/src/accessibility/outputs.js#L246) and open a pull request!

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
  // Add the grid description.
  gridOutput();

  // Draw a couple of shapes.
  background(200);
  fill(255, 0, 0);
  circle(20, 20, 20);
  fill(0, 0, 255);
  square(50, 50, 50);

  // Add a general description of the canvas.
  describe('A red circle and a blue square on a gray background.');
}
```

```js
function setup() {
  // Add the grid description and
  // display it for debugging.
  gridOutput(LABEL);

  // Draw a couple of shapes.
  background(200);
  fill(255, 0, 0);
  circle(20, 20, 20);
  fill(0, 0, 255);
  square(50, 50, 50);

  // Add a general description of the canvas.
  describe('A red circle and a blue square on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);
}

function draw() {
  // Add the grid description.
  gridOutput();

  // Draw a moving circle.
  background(200);
  let x = frameCount * 0.1;
  fill(255, 0, 0);
  circle(x, 20, 20);
  fill(0, 0, 255);
  square(50, 50, 50);

  // Add a general description of the canvas.
  describe('A red circle moves from left to right above a blue square.');
}
```

```js
function setup(){
 createCanvas(100, 100);
}

function draw() {
  // Add the grid description and
  // display it for debugging.
  gridOutput(LABEL);

  // Draw a moving circle.
  background(200);
  let x = frameCount * 0.1;
  fill(255, 0, 0);
  circle(x, 20, 20);
  fill(0, 0, 255);
  square(50, 50, 50);

  // Add a general description of the canvas.
  describe('A red circle moves from left to right above a blue square.');
}
```
