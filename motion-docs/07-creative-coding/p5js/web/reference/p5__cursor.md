---
source: https://p5js.org/reference/p5/cursor/
title: "cursor"
fetched: 2026-10-28
---

Changes the cursor's appearance.

The first parameter, `type`, sets the type of cursor to display. The built-in options are `ARROW`, `CROSS`, `HAND`, `MOVE`, `TEXT`, and `WAIT`. `cursor()` also recognizes standard CSS cursor properties passed as strings: `'help'`, `'wait'`, `'crosshair'`, `'not-allowed'`, `'zoom-in'`, and `'grab'`. If the path to an image is passed, as in `cursor('/assets/target.png')`, then the image will be used as the cursor. Images must be in .cur, .gif, .jpg, .jpeg, or .png format and should be [at most 32 by 32 pixels large.](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#icon_size_limits)

The parameters `x` and `y` are optional. If an image is used for the cursor, `x` and `y` set the location pointed to within the image. They are both 0 by default, so the cursor points to the image's top-left corner. `x` and `y` must be less than the image's width and height, respectively.

Calling `cursor()` without an argument returns the current cursor type as a string.

## Examples

## Syntax

`cursor(type, [x], [y])``cursor()`

## Parameters

type

ARROW|CROSS|HAND|MOVE|TEXT|WAIT|String: Built-in: either ARROW, CROSS, HAND, MOVE, TEXT, or WAIT. Native CSS properties: 'grab', 'progress', and so on. Path to cursor image.

x

Number: horizontal active spot of the cursor.

y

Number: vertical active spot of the cursor.

## Returns

ARROW|CROSS|HAND|MOVE|TEXT|WAIT|String: the current cursor type

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L291) and open a pull request!

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

  describe('A gray square. The cursor appears as crosshairs.');
}

function draw() {
  background(200);

  // Set the cursor to crosshairs: +
  cursor(CROSS);
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('A gray square divided into quadrants. The cursor image changes when the mouse moves to each quadrant.');
}

function draw() {
  background(200);

  // Divide the canvas into quadrants.
  line(50, 0, 50, 100);
  line(0, 50, 100, 50);

  // Change cursor based on mouse position.
  if (mouseX < 50 && mouseY < 50) {
    cursor(CROSS);
  } else if (mouseX > 50 && mouseY < 50) {
    cursor('progress');
  } else if (mouseX > 50 && mouseY > 50) {
    cursor('https://avatars0.githubusercontent.com/u/1617169?s=16');
  } else {
    cursor('grab');
  }
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('An image of three purple curves follows the mouse. The image shifts when the mouse is pressed.');
}

function draw() {
  background(200);

  // Change the cursor's active spot
  // when the mouse is pressed.
  if (mouseIsPressed === true) {
    cursor('https://avatars0.githubusercontent.com/u/1617169?s=16', 8, 8);
  } else {
    cursor('https://avatars0.githubusercontent.com/u/1617169?s=16');
  }
}
```
