---
source: https://p5js.org/reference/p5/millis/
title: "millis"
fetched: 2026-10-28
---

Returns the number of milliseconds since a sketch started running.

`millis()` keeps track of how long a sketch has been running in milliseconds (thousandths of a second). This information is often helpful for timing events and animations.

If a sketch has a [setup()](https://p5js.org/reference/p5/setup/) function, then `millis()` begins tracking time before the code in [setup()](https://p5js.org/reference/p5/setup/) runs. If a sketch includes asynchronous loading using `async`/`await`, then `millis()` begins tracking time as soon as the asynchronous code starts running.

`millis()` can also be used in shaders with p5.strands. The following example uses `millis()` to create time-based color transitions on a shape.

## Examples

## Syntax

`millis()`

## Parameters

## Returns

Number: number of milliseconds since starting the sketch.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/utilities/time\_date.js](https://github.com/processing/p5.js/blob/v2.3.3/src/utilities/time_date.js#L237) and open a pull request!

---

## Related References

* [day

  Returns the current day as a number from 1–31.](https://p5js.org/reference/p5/day/)
* [hour

  Returns the current hour as a number from 0–23.](https://p5js.org/reference/p5/hour/)
* [millis

  Returns the number of milliseconds since a sketch started running.](https://p5js.org/reference/p5/millis/)
* [minute

  Returns the current minute as a number from 0–59.](https://p5js.org/reference/p5/minute/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Get the number of milliseconds the sketch has run.
  let ms = millis();

  // Style the text.
  textAlign(LEFT, CENTER);
  textSize(10);
  textFont('Courier New');

  // Display how long it took setup() to be called.
  text(`Startup time: ${round(ms, 2)} ms`, 5, 50, 90);

  describe(
    `The text 'Startup time: ${round(ms, 2)} ms' written in black on a gray background.`
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('The text "Running time: S sec" written in black on a gray background. The number S increases as the sketch runs.');
}

function draw() {
  background(200);

  // Get the number of seconds the sketch has run.
  let s = millis() / 1000;

  // Style the text.
  textAlign(LEFT, CENTER);
  textSize(10);
  textFont('Courier New');

  // Display how long the sketch has run.
  text(`Running time: ${nf(s, 1, 1)} sec`, 5, 50, 90);
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('A white circle oscillates left and right on a gray background.');
}

function draw() {
  background(200);

  // Get the number of seconds the sketch has run.
  let s = millis() / 1000;

  // Calculate an x-coordinate.
  let x = 30 * sin(s) + 50;

  // Draw the circle.
  circle(x, 50, 30);
}
```

```js
async function setup() {
  // Load the GeoJSON.
  await loadJSON('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
  createCanvas(100, 100);

  background(200);

  // Get the number of milliseconds the sketch has run.
  let ms = millis();

  // Style the text.
  textAlign(LEFT, CENTER);
  textFont('Courier New');
  textSize(11);

  // Display how long it took to load the data.
  text(`It took ${round(ms, 2)} ms to load the data`, 5, 50, 100);

  describe(
    `The text "It took ${round(ms, 2)} ms to load the data" written in black on a gray background.`
  );
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere whose color shifts over time.');
}

function shaderCallback() {
  let t = millis() * 0.001;
  let value = 0.5 + 0.5 * sin(t);
  let skyBlue = [0.2, 0.6, 0.8, 1];
  let magenta = [0.8, 0.2, 0.6, 1];
  finalColor.begin();
  finalColor.set(mix(skyBlue, magenta, value));
  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
