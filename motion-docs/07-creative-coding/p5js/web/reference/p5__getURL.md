---
source: https://p5js.org/reference/p5/getURL/
title: "getURL"
fetched: 2026-10-28
---

Returns the sketch's current [URL](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL/) as a `String`.

## Examples

## Syntax

`getURL()`

## Parameters

## Returns

String: url

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L972) and open a pull request!

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

  // Get the sketch's URL
  // and display it.
  let url = getURL();
  textWrap(CHAR);
  text(url, 0, 40, 100);

  describe('The URL "https://p5js.org/reference/p5/getURL" written in black on a gray background.');
}
```
