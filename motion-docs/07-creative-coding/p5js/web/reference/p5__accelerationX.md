---
source: https://p5js.org/reference/p5/accelerationX/
title: "accelerationX"
fetched: 2026-10-28
---

The system variable accelerationX always contains the acceleration of the device along the x axis. Value is represented as meters per second squared.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/acceleration.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/acceleration.js#L54) and open a pull request!

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
// Move a touchscreen device to register
// acceleration changes.
function draw() {
  background(220, 50);
  fill('magenta');
  ellipse(width / 2, height / 2, accelerationX);
  describe('Magnitude of device acceleration is displayed as ellipse size.');
}
```
