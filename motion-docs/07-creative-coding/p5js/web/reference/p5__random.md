---
source: https://p5js.org/reference/p5/random/
title: "random"
fetched: 2026-10-28
---

Returns a random number or a random element from an array.

`random()` follows uniform distribution, which means that all outcomes are equally likely. When `random()` is used to generate numbers, all numbers in the output range are equally likely to be returned. When `random()` is used to select elements from an array, all elements are equally likely to be chosen.

By default, `random()` produces different results each time a sketch runs. The [randomSeed()](https://p5js.org/reference/p5/randomSeed/) function can be used to generate the same sequence of numbers or choices each time a sketch runs.

The version of `random()` with no parameters returns a random number from 0 up to but not including 1.

The version of `random()` with one parameter works one of two ways. If the argument passed is a number, `random()` returns a random number from 0 up to but not including the number. For example, calling `random(5)` returns values between 0 and 5. If the argument passed is an array, `random()` returns a random element from that array. For example, calling `random(['🦁', '🐯', '🐻'])` returns either a lion, tiger, or bear emoji.

The version of `random()` with two parameters returns a random number from a given range. The arguments passed set the range's lower and upper bounds. For example, calling `random(-5, 10.2)` returns values from -5 up to but not including 10.2.

`random()` can also be used in shaders with p5.strands. The following example uses `random()` to create varying colors on a shape.

## Examples

## Syntax

`random([min], [max])``random(choices)`

## Parameters

min

Number: lower bound (inclusive).

max

Number: upper bound (exclusive).

choices

Array: array to choose from.

## Returns

Number: random number.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/random.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/random.js#L274) and open a pull request!

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

  // Get random coordinates between 0 and 100.
  let x = random(0, 100);
  let y = random(0, 100);

  // Draw a point.
  strokeWeight(5);
  point(x, y);

  describe('A black dot appears in a random position on a gray square.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Get random coordinates between 0 and 100.
  let x = random(100);
  let y = random(100);

  // Draw the point.
  strokeWeight(5);
  point(x, y);

  describe('A black dot appears in a random position on a gray square.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create an array of emoji strings.
  let animals = ['🦁', '🐯', '🐻'];

  // Choose a random element from the array.
  let choice = random(animals);

  // Style the text.
  textAlign(CENTER);
  textSize(20);

  // Display the emoji.
  text(choice, 50, 50);

  describe('An animal face is displayed at random. Either a lion, tiger, or bear.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Slow the frame rate.
  frameRate(5);

  describe('A black dot moves around randomly on a gray square.');
}

function draw() {
  background(200);

  // Get random coordinates between 0 and 100.
  let x = random(100);
  let y = random(100);

  // Draw the point.
  strokeWeight(5);
  point(x, y);
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Slow the frame rate.
  frameRate(5);

  describe('A black dot moves around randomly in the middle of a gray square.');
}

function draw() {
  background(200);

  // Get random coordinates between 45 and 55.
  let x = random(45, 55);
  let y = random(45, 55);

  // Draw the point.
  strokeWeight(5);
  point(x, y);
}
```

```js
let x = 50;
let y = 50;

function setup() {
  createCanvas(100, 100);

  background(200);

  describe('A black dot moves around randomly leaving a trail.');
}

function draw() {
  // Update x and y randomly.
  x += random(-1, 1);
  y += random(-1, 1);

  // Draw the point.
  point(x, y);
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere with randomly varying colors.');
}

function shaderCallback() {
  let r = random();
  let g = random();
  let b = random();
  finalColor.begin();
  finalColor.set([r, g, b, 1]);
  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
