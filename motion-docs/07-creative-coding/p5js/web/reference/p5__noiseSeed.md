---
source: https://p5js.org/reference/p5/noiseSeed/
title: "noiseSeed"
fetched: 2026-10-28
---

Sets the seed value for the [noise()](https://p5js.org/reference/p5/noise/) function.

By default, [noise()](https://p5js.org/reference/p5/noise/) produces different results each time a sketch is run. Calling `noiseSeed()` with a constant argument, such as `noiseSeed(99)`, makes [noise()](https://p5js.org/reference/p5/noise/) produce the same results each time a sketch is run.

## Examples

## Syntax

`noiseSeed(seed)`

## Parameters

seed

Number: seed value.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/noise.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/noise.js#L466) and open a pull request!

---

## Related References

* [noise

  Returns random numbers that can be tuned to feel organic.](https://p5js.org/reference/p5/noise/)
* [noiseDetail

  Adjusts the character of the noise produced by the noise() function.](https://p5js.org/reference/p5/noiseDetail/)
* [noiseSeed

  Sets the seed value for the noise() function.](https://p5js.org/reference/p5/noiseSeed/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Set the noise seed for consistent results.
  noiseSeed(99);

  describe('A black rectangle that grows randomly, first to the right and then to the left.');
}

function draw() {
  // Set the noise level and scale.
  let noiseLevel = 100;
  let noiseScale = 0.005;

  // Scale the input coordinate.
  let nt = noiseScale * frameCount;

  // Compute the noise value.
  let x = noiseLevel * noise(nt);

  // Draw the line.
  line(x, 0, x, height);
}
```
