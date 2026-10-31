---
source: https://p5js.org/reference/p5/deviceTurned/
title: "deviceTurned"
fetched: 2026-10-28
---

The [deviceTurned()](https://p5js.org/reference/p5/deviceTurned/) function is called when the device rotates by more than 90 degrees continuously.

The axis that triggers the [deviceTurned()](https://p5js.org/reference/p5/deviceTurned/) method is stored in the turnAxis variable. The [deviceTurned()](https://p5js.org/reference/p5/deviceTurned/) method can be locked to trigger on any axis: X, Y or Z by comparing the turnAxis variable to 'X', 'Y' or 'Z'.

## Examples

## Syntax

`deviceTurned()`

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
// Rotate the device by 90 degrees
// to change the value.

let value = 0;
function draw() {
  fill(value);
  rect(25, 25, 50, 50);
  describe(`50-by-50 black rect in center of canvas.
    turns white on mobile when device turns`);
}
function deviceTurned() {
  if (value === 0) {
    value = 255;
  } else if (value === 255) {
    value = 0;
  }
}
```

```js
// Run this example on a mobile device
// Rotate the device by 90 degrees in the
// X-axis to change the value.

let value = 0;
function draw() {
  fill(value);
  rect(25, 25, 50, 50);
  describe(`50-by-50 black rect in center of canvas.
    turns white on mobile when x-axis turns`);
}
function deviceTurned() {
  if (turnAxis === 'X') {
    if (value === 0) {
      value = 255;
    } else if (value === 255) {
      value = 0;
    }
  }
}
```
