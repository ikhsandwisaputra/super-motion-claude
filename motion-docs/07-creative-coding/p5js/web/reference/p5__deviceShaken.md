---
source: https://p5js.org/reference/p5/deviceShaken/
title: "deviceShaken"
fetched: 2026-10-28
---

The [deviceShaken()](https://p5js.org/reference/p5/deviceShaken/) function is called when the device total acceleration changes of accelerationX and accelerationY values is more than the threshold value. The default threshold is set to 30. The threshold value can be changed using [setShakeThreshold()](https://p5js.org/reference/p5/setShakeThreshold/).

## Examples

## Syntax

`deviceShaken()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/acceleration.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/acceleration.js#L576) and open a pull request!

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
// Run this example on a mobile device
// Shake the device to change the value.

let value = 0;
function draw() {
  fill(value);
  rect(25, 25, 50, 50);
  describe(`50-by-50 black rect in center of canvas.
    turns white on mobile when device shakes`);
}

function deviceShaken() {
  value = value + 5;
  if (value > 255) {
    value = 0;
  }
}
```
