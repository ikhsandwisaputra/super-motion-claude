---
source: https://p5js.org/reference/p5/randomSeed/
title: "randomSeed"
fetched: 2026-10-28
---

Sets the seed value for the [random()](https://p5js.org/reference/p5/random/) and [randomGaussian()](https://p5js.org/reference/p5/randomGaussian/) functions.

By default, [random()](https://p5js.org/reference/p5/random/) and [randomGaussian()](https://p5js.org/reference/p5/randomGaussian/) produce different results each time a sketch is run. Calling `randomSeed()` with a constant argument, such as `randomSeed(99)`, makes these functions produce the same results each time a sketch is run.

## Examples

## Syntax

`randomSeed(seed)`

## Parameters

seed

Number: seed value.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/random.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/random.js#L75) and open a pull request!

---

## Related References

* [random

  Returns a random number or a random element from an array.](https://p5js.org/reference/p5/random/)
* [randomGaussian

  Returns a random number fitting a Gaussian, or normal, distribution.](https://p5js.org/reference/p5/randomGaussian/)
* [randomSeed

  Sets the seed value for the random() and randomGaussian() functions.](https://p5js.org/reference/p5/randomSeed/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Get random coordinates.
  let x = random(0, 100);
  let y = random(0, 100);

  // Draw the white circle.
  circle(x, y, 10);

  // Set a random seed for consistency.
  randomSeed(99);

  // Get random coordinates.
  x = random(0, 100);
  y = random(0, 100);

  // Draw the black circle.
  fill(0);
  circle(x, y, 10);

  describe('A white circle appears at a random position. A black circle appears at (27.4, 25.8).');
}
```
