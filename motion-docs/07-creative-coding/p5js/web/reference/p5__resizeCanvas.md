---
source: https://p5js.org/reference/p5/resizeCanvas/
title: "resizeCanvas"
fetched: 2026-10-28
---

Resizes the canvas to a given width and height.

`resizeCanvas()` immediately clears the canvas and calls [redraw()](https://p5js.org/reference/p5/redraw/). It's common to call `resizeCanvas()` within the body of [windowResized()](https://p5js.org/reference/p5/windowResized/) like so:

```js
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

The first two parameters, `width` and `height`, set the dimensions of the canvas. They also the values of the [width](https://p5js.org/reference/p5/width/) and [height](https://p5js.org/reference/p5/height/) system variables. For example, calling `resizeCanvas(300, 500)` resizes the canvas to 300×500 pixels, then sets [width](https://p5js.org/reference/p5/width/) to 300 and [height](https://p5js.org/reference/p5/height/) 500.

The third parameter, `noRedraw`, is optional. If `true` is passed, as in `resizeCanvas(300, 500, true)`, then the canvas will be canvas to 300×500 pixels but the [redraw()](https://p5js.org/reference/p5/redraw/) function won't be called immediately. By default, [redraw()](https://p5js.org/reference/p5/redraw/) is called immediately when `resizeCanvas()` finishes executing.

## Examples

## Syntax

`resizeCanvas(width, height, [noRedraw])`

## Parameters

width

Number: width of the canvas.

height

Number: height of the canvas.

noRedraw

Boolean: whether to delay calling [redraw()](https://p5js.org/reference/p5/resizeCanvas/#/p5/redraw). Defaults to `false`.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/rendering.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/rendering.js#L247) and open a pull request!

---

## Related References

* [createFramebuffer

  Creates a new p5.Framebuffer object with the same WebGL context as the graphics buffer.](https://p5js.org/reference/p5.Graphics/createFramebuffer/)
* [remove

  Removes the graphics buffer from the web page.](https://p5js.org/reference/p5.Graphics/remove/)
* [reset

  Resets the graphics buffer's transformations and lighting.](https://p5js.org/reference/p5.Graphics/reset/)
* [clearDepth

  Clears the depth buffer in WebGL mode.](https://p5js.org/reference/p5/clearDepth/)

## Example code (extracted)

```js
// Double-click to resize the canvas.

function setup() {
  createCanvas(100, 100);

  describe(
    'A white circle drawn on a gray background. The canvas shrinks by half the first time the user double-clicks.'
  );
}

function draw() {
  background(200);

  // Draw a circle at the center of the canvas.
  circle(width / 2, height / 2, 20);
}

// Resize the canvas when the user double-clicks.
function doubleClicked() {
  resizeCanvas(50, 50);
}
```

```js
// Resize the web browser to change the canvas size.

function setup() {
  createCanvas(windowWidth, windowHeight);

  describe('A white circle drawn on a gray background.');
}

function draw() {
  background(200);

  // Draw a circle at the center of the canvas.
  circle(width / 2, height / 2, 20);
}

// Always resize the canvas to fill the browser window.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```
