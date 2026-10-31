---
source: https://p5js.org/reference/p5/setShakeThreshold/
title: "setShakeThreshold"
fetched: 2026-10-28
---

The [setShakeThreshold()](https://p5js.org/reference/p5/setShakeThreshold/) function is used to set the movement threshold for the [deviceShaken()](https://p5js.org/reference/p5/deviceShaken/) function. The default threshold is set to 30.

## Examples

## Syntax

`setShakeThreshold(value)`

## Parameters

value

Number: The threshold value

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/events/acceleration.js](https://github.com/processing/p5.js/blob/v2.3.3/src/events/acceleration.js#L465) and open a pull request!

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
// You will need to shake the device more firmly
// the closer the box's fill gets to white in order to change the value.

let value = 0;
let threshold = 30;
function setup() {
  setShakeThreshold(threshold);
}
function draw() {
  fill(value);
  rect(25, 25, 50, 50);
  describe(`50-by-50 black rect in center of canvas.
    turns white on mobile when device is being shaked`);
}
function deviceMoved() {
  value = value + 5;
  threshold = threshold + 5;
  if (value > 255) {
    value = 0;
    threshold = 30;
  }
  setShakeThreshold(threshold);
}
```
