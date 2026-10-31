---
source: https://p5js.org/reference/p5/drawingContext/
title: "drawingContext"
fetched: 2026-10-28
---

A system variable that provides direct access to the sketch's `<canvas></canvas>` element.

The `<canvas></canvas>` element provides many specialized features that aren't included in the p5.js library. The `drawingContext` system variable provides access to these features by exposing the sketch's [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/) object.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/rendering.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/rendering.js#L621) and open a pull request!

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
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the circle using shadows.
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'black';

  // Draw the circle.
  circle(50, 50, 40);

  describe("A white circle on a gray background. The circle's edges are shadowy.");
}
```

```js
function setup() {
  createCanvas(100, 100);

  background('skyblue');

  // Style the circle using a color gradient.
  let myGradient = drawingContext.createRadialGradient(50, 50, 3, 50, 50, 40);
  myGradient.addColorStop(0, 'yellow');
  myGradient.addColorStop(0.6, 'orangered');
  myGradient.addColorStop(1, 'yellow');
  drawingContext.fillStyle = myGradient;
  drawingContext.strokeStyle = 'rgba(0, 0, 0, 0)';

  // Draw the circle.
  circle(50, 50, 40);

  describe('A fiery sun drawn on a light blue background.');
}
```
