---
source: https://p5js.org/reference/p5/frameCount/
title: "frameCount"
fetched: 2026-10-28
---

A `Number` variable that tracks the number of frames drawn since the sketch started.

`frameCount`'s value is 0 inside [setup()](https://p5js.org/reference/p5/setup/). It increments by 1 each time the code in [draw()](https://p5js.org/reference/p5/draw/) finishes executing.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L125) and open a pull request!

---

## Related References

* [cursor

  Changes the cursor's appearance.](https://p5js.org/reference/p5/cursor/)
* [deltaTime

  A Number variable that tracks the number of milliseconds it took to draw the last frame.](https://p5js.org/reference/p5/deltaTime/)
* [describe

  Creates a screen reader-accessible description of the canvas.](https://p5js.org/reference/p5/describe/)
* [describeElement

  Creates a screen reader-accessible description of elements in the canvas.](https://p5js.org/reference/p5/describeElement/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Display the value of
  // frameCount.
  textSize(30);
  textAlign(CENTER, CENTER);
  text(frameCount, 50, 50);

  describe('The number 0 written in black in the middle of a gray square.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Set the frameRate to 30.
  frameRate(30);

  textSize(30);
  textAlign(CENTER, CENTER);

  describe('A number written in black in the middle of a gray square. Its value increases rapidly.');
}

function draw() {
  background(200);

  // Display the value of
  // frameCount.
  text(frameCount, 50, 50);
}
```
