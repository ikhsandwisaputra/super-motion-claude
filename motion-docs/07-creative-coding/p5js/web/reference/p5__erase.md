---
source: https://p5js.org/reference/p5/erase/
title: "erase"
fetched: 2026-10-28
---

Starts using shapes to erase parts of the canvas.

All drawing that follows `erase()` will subtract from the canvas, revealing the web page underneath. The erased areas will become transparent, allowing the content behind the canvas to show through. The [fill()](https://p5js.org/reference/p5/fill/), [stroke()](https://p5js.org/reference/p5/stroke/), and [blendMode()](https://p5js.org/reference/p5/blendMode/) have no effect once `erase()` is called.

The `erase()` function has two optional parameters. The first parameter sets the strength of erasing by the shape's interior. A value of 0 means that no erasing will occur. A value of 255 means that the shape's interior will fully erase the content underneath. The default value is 255 (full strength).

The second parameter sets the strength of erasing by the shape's edge. A value of 0 means that no erasing will occur. A value of 255 means that the shape's edge will fully erase the content underneath. The default value is 255 (full strength).

To cancel the erasing effect, use the [noErase()](https://p5js.org/reference/p5/noErase/) function.

`erase()` has no effect on drawing done with the [image()](https://p5js.org/reference/p5/image/) and [background()](https://p5js.org/reference/p5/background/) functions.

## Examples

## Syntax

`erase([strengthFill], [strengthStroke])`

## Parameters

strengthFill

Number: a number (0-255) for the strength of erasing under a shape's interior. Defaults to 255, which is full strength.

strengthStroke

Number: a number (0-255) for the strength of erasing under a shape's edge. Defaults to 255, which is full strength.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/setting.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/setting.js#L1689) and open a pull request!

---

## Related References

* [background

  Sets the color used for the background of the canvas.](https://p5js.org/reference/p5/background/)
* [beginClip

  Starts defining a shape that will mask any shapes drawn afterward.](https://p5js.org/reference/p5/beginClip/)
* [blendMode

  Sets the way colors blend when added to the canvas.](https://p5js.org/reference/p5/blendMode/)
* [clear

  Clears the pixels on the canvas.](https://p5js.org/reference/p5/clear/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(100, 100, 250);

  // Draw a pink square.
  fill(250, 100, 100);
  square(20, 20, 60);

  // Erase a circular area.
  erase();
  circle(25, 30, 30);
  noErase();

  describe('A purple canvas with a pink square in the middle. A circle is erased from the top-left, leaving a hole.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(100, 100, 250);

  // Draw a pink square.
  fill(250, 100, 100);
  square(20, 20, 60);

  // Erase a circular area.
  strokeWeight(5);
  erase(150, 255);
  circle(25, 30, 30);
  noErase();

  describe('A purple canvas with a pink square in the middle. A circle at the top-left partially erases its interior and a fully erases its outline.');
}
```
