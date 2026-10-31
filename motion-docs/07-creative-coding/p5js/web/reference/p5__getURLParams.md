---
source: https://p5js.org/reference/p5/getURLParams/
title: "getURLParams"
fetched: 2026-10-28
---

Returns the current [URL parameters](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL#parameters) in an `Object`.

For example, calling `getURLParams()` in a sketch hosted at the URL `https://p5js.org?year=2014&month=May&day=15` returns `{ year: 2014, month: 'May', day: 15 }`.

## Examples

## Syntax

`getURLParams()`

## Parameters

## Returns

Object: URL params

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L1036) and open a pull request!

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
// Imagine this sketch is hosted at the following URL:
// https://p5js.org?year=2014&month=May&day=15

function setup() {
  background(200);

  // Get the sketch's URL
  // parameters and display
  // them.
  let params = getURLParams();
  text(params.day, 10, 20);
  text(params.month, 10, 40);
  text(params.year, 10, 60);

  describe('The text "15", "May", and "2014" written in black on separate lines.');
}
```
