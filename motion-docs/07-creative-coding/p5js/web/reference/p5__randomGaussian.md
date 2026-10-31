---
source: https://p5js.org/reference/p5/randomGaussian/
title: "randomGaussian"
fetched: 2026-10-28
---

Returns a random number fitting a Gaussian, or normal, distribution.

Normal distributions look like bell curves when plotted. Values from a normal distribution cluster around a central value called the mean. The cluster's standard deviation describes its spread.

By default, `randomGaussian()` produces different results each time a sketch runs. The [randomSeed()](https://p5js.org/reference/p5/randomSeed/) function can be used to generate the same sequence of numbers each time a sketch runs.

There's no minimum or maximum value that `randomGaussian()` might return. Values far from the mean are very unlikely and values near the mean are very likely.

The version of `randomGaussian()` with no parameters returns values with a mean of 0 and standard deviation of 1.

The version of `randomGaussian()` with one parameter interprets the argument passed as the mean. The standard deviation is 1.

The version of `randomGaussian()` with two parameters interprets the first argument passed as the mean and the second as the standard deviation.

## Examples

## Syntax

`randomGaussian([mean], [sd])`

## Parameters

mean

Number: mean.

sd

Number: standard deviation.

## Returns

Number: random number.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/random.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/random.js#L360) and open a pull request!

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

  describe('Three horizontal black lines are filled in randomly. The top line spans entire canvas. The middle line is very short. The bottom line spans two-thirds of the canvas.');
}

function draw() {
  // Style the circles.
  noStroke();
  fill(0, 10);

  // Uniform distribution between 0 and 100.
  let x = random(100);
  let y = 25;
  circle(x, y, 5);

  // Gaussian distribution with a mean of 50 and sd of 1.
  x = randomGaussian(50);
  y = 50;
  circle(x, y, 5);

  // Gaussian distribution with a mean of 50 and sd of 10.
  x = randomGaussian(50, 10);
  y = 75;
  circle(x, y, 5);
}
```
