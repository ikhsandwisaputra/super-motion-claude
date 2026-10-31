---
source: https://p5js.org/reference/p5/getURLPath/
title: "getURLPath"
fetched: 2026-10-28
---

Returns the current [URL](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL#path_to_resource) path as an `Array` of `String`s.

For example, consider a sketch hosted at the URL `https://example.com/sketchbook`. Calling `getURLPath()` returns `['sketchbook']`. For a sketch hosted at the URL `https://example.com/sketchbook/monday`, `getURLPath()` returns `['sketchbook', 'monday']`.

## Examples

## Syntax

`getURLPath()`

## Parameters

## Returns

String[]: path components.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L1000) and open a pull request!

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
  background(200);

  // Get the sketch's URL path
  // and display the first
  // part.
  let path = getURLPath();
  text(path[0], 25, 54);

  describe('The word "reference" written in black on a gray background.');
}
```
