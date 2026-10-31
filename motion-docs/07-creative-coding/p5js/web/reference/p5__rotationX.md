---
source: https://p5js.org/reference/p5/rotationX/
title: "rotationX"
fetched: 2026-10-28
---

The system variable rotationX always contains the rotation of the device along the x axis. If the sketch [angleMode()](https://p5js.org/reference/p5/angleMode/) is set to DEGREES, the value will be -180 to 180. If it is set to RADIANS, the value will be -PI to PI.

Note: The order the rotations are called is important, ie. if used together, it must be called in the order Z-X-Y or there might be unexpected behaviour.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/acceleration.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/acceleration.js#L161) and open a pull request!

---

## Related References

* [accelerationX

  The system variable accelerationX always contains the acceleration of the device along the x axis.](https://p5js.org/reference/p5/accelerationX/)
* [accelerationY

  The system variable accelerationY always contains the acceleration of the device along the y axis.](https://p5js.org/reference/p5/accelerationY/)
* [accelerationZ

  The system variable accelerationZ always contains the acceleration of the device along the z axis.](https://p5js.org/reference/p5/accelerationZ/)
* [deviceMoved

  The deviceMoved() function is called when the device is moved by more than the threshold value along X, Y or Z axis.](https://p5js.org/reference/p5/deviceMoved/)

## Example code (extracted)

```js
let rotationX = 0;            // Angle in degrees

function setup() {
  createCanvas(200, 200, WEBGL);   // Create 3D canvas
}

function draw() {
  background(220);                 // Set light gray background
  rotateX(radians(rotationX));     // Rotate around X-axis
  normalMaterial();                // Apply simple shaded material
  box(60);                         // Draw 3D cube (60 units wide)
  rotationX = (rotationX + 2) % 360; // Increment rotation (2° per frame)
}
```
