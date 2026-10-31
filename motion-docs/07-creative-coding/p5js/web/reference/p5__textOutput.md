---
source: https://p5js.org/reference/p5/textOutput/
title: "textOutput"
fetched: 2026-10-28
---

Creates a screen reader-accessible description of shapes on the canvas.

`textOutput()` adds a general description, list of shapes, and table of shapes to the web page. The general description includes the canvas size, canvas color, and number of shapes. For example, `Your output is a, 100 by 100 pixels, gray canvas containing the following 2 shapes:`.

A list of shapes follows the general description. The list describes the color, location, and area of each shape. For example, `a red circle at middle covering 3% of the canvas`. Each shape can be selected to get more details.

`textOutput()` uses its table of shapes as a list. The table describes the shape, color, location, coordinates and area. For example, `red circle location = middle area = 3%`. This is different from [gridOutput()](https://p5js.org/reference/p5/gridOutput/), which uses its table as a grid.

The `display` parameter is optional. It determines how the description is displayed. If `LABEL` is passed, as in `textOutput(LABEL)`, the description will be visible in a div element next to the canvas. Using `LABEL` creates unhelpful duplicates for screen readers. Only use `LABEL` during development. If `FALLBACK` is passed, as in `textOutput(FALLBACK)`, the description will only be visible to screen readers. This is the default mode.

Read [Writing accessible canvas descriptions](https://p5js.org/learn/accessible-labels.html) to learn more about making sketches accessible.

## Examples

## Syntax

`textOutput([display])`

## Parameters

display

FALLBACK|LABEL: either FALLBACK or LABEL.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/accessibility/outputs.js](https://github.com/processing/p5.js/blob/v2.3.3/src/accessibility/outputs.js#L117) and open a pull request!

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
  // Add the text description.
  textOutput();

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
  // Add the text description and
  // display it for debugging.
  textOutput(LABEL);

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
function setup(){
 createCanvas(100, 100);
}

function draw() {
  // Add the text description.
  textOutput();

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
  // Add the text description and
  // display it for debugging.
  textOutput(LABEL);

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
