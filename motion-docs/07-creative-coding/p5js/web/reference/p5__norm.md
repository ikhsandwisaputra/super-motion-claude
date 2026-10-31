---
source: https://p5js.org/reference/p5/norm/
title: "norm"
fetched: 2026-10-28
---

Maps a number from one range to a value between 0 and 1.

For example, `norm(2, 0, 10)` returns 0.2. 2's position in the original range [0, 10] is proportional to 0.2's position in the range [0, 1]. This is the same as calling `map(2, 0, 10, 0, 1)`.

Numbers outside of the original range are not constrained between 0 and 1. Out-of-range values are often intentional and useful.

## Examples

## Syntax

`norm(value, start, stop)`

## Parameters

value

Number: incoming value to be normalized.

start

Number: lower bound of the value's current range.

stop

Number: upper bound of the value's current range.

## Returns

Number: normalized number.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L1151) and open a pull request!

---

## Related References

* [abs

  Calculates the absolute value of a number.](https://p5js.org/reference/p5/abs/)
* [ceil

  Calculates the closest integer value that is greater than or equal to a number.](https://p5js.org/reference/p5/ceil/)
* [constrain

  Constrains a number between a minimum and maximum value.](https://p5js.org/reference/p5/constrain/)
* [dist

  Calculates the distance between two points.](https://p5js.org/reference/p5/dist/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  // Use RGB color with values from 0 to 1.
  colorMode(RGB, 1);

  describe('A square changes color from black to red as the mouse moves from left to right.');
}

function draw() {
  // Calculate the redValue.
  let redValue = norm(mouseX, 0, 100);

  // Paint the background.
  background(redValue, 0, 0);
}
```
