---
source: https://p5js.org/reference/p5/screenToWorld/
title: "screenToWorld"
fetched: 2026-10-28
---

Converts 2D screen coordinates to 3D world coordinates.

This function takes a vector and converts its coordinates from coordinates on the screen to coordinates in the currently drawn object. This can be useful for determining the mouse position relative to a 2D or 3D object.

If given, the Z component of the input coordinates is treated as "depth", or distance from the camera.

## Examples

## Syntax

`screenToWorld(x, y, [z])`

## Parameters

x

Number|p5.Vector: The x coordinate in screen space. (Or a vector for all three coordinates.)

y

Number: The y coordinate in screen space.

z

Number: The z coordinate in screen space.

## Returns

p5.Vector: A vector containing the 3D world space coordinates.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L1208) and open a pull request!

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
  describe('A rotating square with a line passing through the mouse drawn across it.');
}

function draw() {
  background(220);

  // Move to center and rotate
  translate(width/2, height/2);
  rotate(millis() / 1000);
  rect(-30, -30, 60);

  // Compute the location of the mouse in the coordinates of the square
  let localMouse = screenToWorld(createVector(mouseX, mouseY));

  // Draw a line parallel to the local Y axis, passing through the mouse
  line(localMouse.x, -30, localMouse.x, 30);
}
```
