---
source: https://p5js.org/reference/p5/setMoveThreshold/
title: "setMoveThreshold"
fetched: 2026-10-28
---

The [setMoveThreshold()](https://p5js.org/reference/p5/setMoveThreshold/) function is used to set the movement threshold for the [deviceMoved()](https://p5js.org/reference/p5/deviceMoved/) function. The default threshold is set to 0.5.

## Examples

## Syntax

`setMoveThreshold(value)`

## Parameters

value

Number: The threshold value

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/acceleration.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/acceleration.js#L428) and open a pull request!

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
// You will need to move the device incrementally further
// the closer the square's color gets to white in order to change the value.

let value = 0;
let threshold = 0.5;
function setup() {
  setMoveThreshold(threshold);
}
function draw() {
  fill(value);
  rect(25, 25, 50, 50);
  describe(`50-by-50 black rect in center of canvas.
    turns white on mobile when device moves`);
}
function deviceMoved() {
  value = value + 5;
  threshold = threshold + 0.1;
  if (value > 255) {
    value = 0;
    threshold = 30;
  }
  setMoveThreshold(threshold);
}
```
