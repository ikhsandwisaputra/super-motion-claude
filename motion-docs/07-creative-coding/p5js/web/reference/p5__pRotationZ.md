---
source: https://p5js.org/reference/p5/pRotationZ/
title: "pRotationZ"
fetched: 2026-10-28
---

The system variable pRotationZ always contains the rotation of the device along the z axis in the frame previous to the current frame. If the sketch [angleMode()](https://p5js.org/reference/p5/angleMode/) is set to DEGREES, the value will be 0 to 360. If it is set to RADIANS, the value will be 0 to 2\*PI.

pRotationZ can also be used with rotationZ to determine the rotate direction of the device along the Z-axis.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/acceleration.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/acceleration.js#L340) and open a pull request!

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
// A simple if statement looking at whether
// rotationZ - pRotationZ < 0 is true or not will be
// sufficient for determining the rotate direction
// in most cases.

// Some extra logic is needed to account for cases where
// the angles wrap around.
let rotateDirection = 'clockwise';

if (
  (rotationZ - pRotationZ > 0 && rotationZ - pRotationZ < 270) ||
  rotationZ - pRotationZ < -270
) {
  rotateDirection = 'clockwise';
} else if (rotationZ - pRotationZ < 0 || rotationZ - pRotationZ > 270) {
  rotateDirection = 'counter-clockwise';
}
print(rotateDirection);
describe('no image to display.');
```
