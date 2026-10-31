---
source: https://p5js.org/reference/p5/fullscreen/
title: "fullscreen"
fetched: 2026-10-28
---

Toggles full-screen mode or returns the current mode.

Calling `fullscreen(true)` makes the sketch full-screen. Calling `fullscreen(false)` makes the sketch its original size.

Calling `fullscreen()` without an argument returns `true` if the sketch is in full-screen mode and `false` if not.

Note: Due to browser restrictions, `fullscreen()` can only be called with user input such as a mouse press.

## Examples

## Syntax

`fullscreen([val])`

## Parameters

val

Boolean: whether the sketch should be in fullscreen mode.

## Returns

Boolean: current fullscreen state.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L801) and open a pull request!

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

  describe('A gray canvas that switches between default and full-screen display when clicked.');
}

// If the mouse is pressed,
// toggle full-screen mode.
function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
```
