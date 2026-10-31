---
source: https://p5js.org/reference/p5/strokeCap/
title: "strokeCap"
fetched: 2026-10-28
---

Sets the style for rendering the ends of lines.

The caps for line endings are either rounded (`ROUND`), squared (`SQUARE`), or extended (`PROJECT`). The default cap is `ROUND`.

The argument passed to `strokeCap()` must be written in ALL CAPS because the constants `ROUND`, `SQUARE`, and `PROJECT` are defined this way. JavaScript is a case-sensitive language.

## Examples

## Syntax

`strokeCap(cap)`

## Parameters

cap

ROUND|SQUARE|PROJECT: either ROUND, SQUARE, or PROJECT

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/attributes.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/attributes.js#L399) and open a pull request!

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
function setup() {
  createCanvas(100, 100);

  background(200);

  strokeWeight(12);

  // Top.
  strokeCap(ROUND);
  line(20, 30, 80, 30);

  // Middle.
  strokeCap(SQUARE);
  line(20, 50, 80, 50);

  // Bottom.
  strokeCap(PROJECT);
  line(20, 70, 80, 70);

  describe(
    'Three horizontal lines. The top line has rounded ends, the middle line has squared ends, and the bottom line has longer, squared ends.'
  );
}
```
