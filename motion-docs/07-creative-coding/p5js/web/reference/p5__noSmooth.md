---
source: https://p5js.org/reference/p5/noSmooth/
title: "noSmooth"
fetched: 2026-10-28
---

Draws certain features with jagged (aliased) edges.

[smooth()](https://p5js.org/reference/p5/smooth/) is active by default. In 2D mode, `noSmooth()` is helpful for scaling up images without blurring. The functions don't affect shapes or fonts.

In WebGL mode, `noSmooth()` causes all shapes to be drawn with jagged (aliased) edges. The functions don't affect images or fonts.

Note: In WebGPU mode, you must `await` this function.

## Examples

## Syntax

`noSmooth()`

## Parameters

## Returns

void|Promise<void>:

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/attributes.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/attributes.js#L162) and open a pull request!

---

## Related References

* [ellipseMode

  Changes where ellipses, circles, and arcs are drawn.](https://p5js.org/reference/p5/ellipseMode/)
* [noSmooth

  Draws certain features with jagged (aliased) edges.](https://p5js.org/reference/p5/noSmooth/)
* [rectMode

  Changes where rectangles and squares are drawn.](https://p5js.org/reference/p5/rectMode/)
* [smooth

  Draws certain features with smooth (antialiased) edges.](https://p5js.org/reference/p5/smooth/)

## Example code (extracted)

```js
let heart;

async function setup() {
  // Load a pixelated heart image from an image data string.
  heart = await loadImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IArs4c6QAAAEZJREFUGFd9jcsNACAIQ9tB2MeR3YdBMBBq8CIXPi2vBICIiOwkOedatllqWO6Y8yOWoyuNf1GZwgmf+RRG2YXr+xVFmA8HZ9Mx/KGPMtcAAAAASUVORK5CYII=');
  createCanvas(100, 100);

  background(50);

  // Antialiased hearts.
  image(heart, 10, 10);
  image(heart, 20, 10, 16, 16);
  image(heart, 40, 10, 32, 32);

  // Aliased hearts.
  noSmooth();
  image(heart, 10, 60);
  image(heart, 20, 60, 16, 16);
  image(heart, 40, 60, 32, 32);
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  background(200);

  circle(0, 0, 80);

  describe('A white circle on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  // Disable smoothing.
  noSmooth();

  background(200);

  circle(0, 0, 80);

  describe('A pixelated white circle on a gray background.');
}
```
