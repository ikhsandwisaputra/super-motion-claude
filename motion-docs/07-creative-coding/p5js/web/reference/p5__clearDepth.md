---
source: https://p5js.org/reference/p5/clearDepth/
title: "clearDepth"
fetched: 2026-10-28
---

Clears the depth buffer in WebGL mode.

`clearDepth()` clears information about how far objects are from the camera in 3D space. This information is stored in an object called the depth buffer. Clearing the depth buffer ensures new objects aren't drawn behind old ones. Doing so can be useful for feedback effects in which the previous frame serves as the background for the current frame.

The parameter, `depth`, is optional. If a number is passed, as in `clearDepth(0.5)`, it determines the range of objects to clear from the depth buffer. 0 doesn't clear any depth information, 0.5 clears depth information halfway between the near and far clipping planes, and 1 clears depth information all the way to the far clipping plane. By default, `depth` is 1.

Note: `clearDepth()` can only be used in WebGL mode.

## Examples

## Syntax

`clearDepth([depth])`

## Parameters

depth

Number: amount of the depth buffer to clear between 0 (none) and 1 (far clipping plane). Defaults to 1.

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
let previous;
let current;

function setup() {
  createCanvas(100, 100, WEBGL);

  // Create the p5.Framebuffer objects.
  previous = createFramebuffer({ format: FLOAT });
  current = createFramebuffer({ format: FLOAT });

  describe(
    'A multicolor box drifts from side to side on a white background. It leaves a trail that fades over time.'
  );
}

function draw() {
  // Swap the previous p5.Framebuffer and the
  // current one so it can be used as a texture.
  [previous, current] = [current, previous];

  // Start drawing to the current p5.Framebuffer.
  current.begin();

  // Paint the background.
  background(255);

  // Draw the previous p5.Framebuffer.
  // Clear the depth buffer so the previous
  // frame doesn't block the current one.
  push();
  tint(255, 250);
  image(previous, -50, -50);
  clearDepth();
  pop();

  // Draw the box on top of the previous frame.
  push();
  let x = 25 * sin(frameCount * 0.01);
  let y = 25 * sin(frameCount * 0.02);
  translate(x, y, 0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  normalMaterial();
  box(12);
  pop();

  // Stop drawing to the current p5.Framebuffer.
  current.end();

  // Display the current p5.Framebuffer.
  image(current, -50, -50);
}
```
