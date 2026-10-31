---
source: https://p5js.org/reference/p5/describeElement/
title: "describeElement"
fetched: 2026-10-28
---

Creates a screen reader-accessible description of elements in the canvas.

Elements are shapes or groups of shapes that create meaning together. For example, a few overlapping circles could make an "eye" element.

The first parameter, `name`, is the name of the element.

The second parameter, `text`, is the description of the element.

The third parameter, `display`, is optional. It determines how the description is displayed. If `LABEL` is passed, as in `describe('A description.', LABEL)`, the description will be visible in a div element next to the canvas. Using `LABEL` creates unhelpful duplicates for screen readers. Only use `LABEL` during development. If `FALLBACK` is passed, as in `describe('A description.', FALLBACK)`, the description will only be visible to screen readers. This is the default mode.

Read [Writing accessible canvas descriptions](https://p5js.org/learn/accessible-labels.html) to learn more about making sketches accessible.

## Examples

## Syntax

`describeElement(name, text, [display])`

## Parameters

name

String: name of the element.

text

String: description of the element.

display

FALLBACK|LABEL: either LABEL or FALLBACK.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/accessibility/describe.js](https://github.com/processing/p5.js/blob/v2.3.3/src/accessibility/describe.js#L232) and open a pull request!

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
  background('pink');

  // Describe the first element
  // and draw it.
  describeElement('Circle', 'A yellow circle in the top-left corner.');
  noStroke();
  fill('yellow');
  circle(25, 25, 40);

  // Describe the second element
  // and draw it.
  describeElement('Heart', 'A red heart in the bottom-right corner.');
  fill('red');
  circle(66.6, 66.6, 20);
  circle(83.2, 66.6, 20);
  triangle(91.2, 72.6, 75, 95, 58.6, 72.6);

  // Add a general description of the canvas.
  describe('A red heart and yellow circle over a pink background.');
}
```

```js
function setup() {
  background('pink');

  // Describe the first element
  // and draw it. Display the
  // description for debugging.
  describeElement('Circle', 'A yellow circle in the top-left corner.', LABEL);
  noStroke();
  fill('yellow');
  circle(25, 25, 40);

  // Describe the second element
  // and draw it. Display the
  // description for debugging.
  describeElement('Heart', 'A red heart in the bottom-right corner.', LABEL);
  fill('red');
  circle(66.6, 66.6, 20);
  circle(83.2, 66.6, 20);
  triangle(91.2, 72.6, 75, 95, 58.6, 72.6);

  // Add a general description of the canvas.
  describe('A red heart and yellow circle over a pink background.');
}
```
