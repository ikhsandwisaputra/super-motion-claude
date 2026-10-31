---
source: https://p5js.org/reference/p5/clear/
title: "clear"
fetched: 2026-10-28
---

Clears the pixels on the canvas.

`clear()` makes every pixel 100% transparent. Calling `clear()` doesn't clear objects created by `createX()` functions such as [createGraphics()](https://p5js.org/reference/p5/createGraphics/), [createVideo()](https://p5js.org/reference/p5/createVideo/), and [createImg()](https://p5js.org/reference/p5/createImg/). These objects will remain unchanged after calling `clear()` and can be redrawn.

In WebGL mode, this function can clear the screen to a specific color. It interprets four numeric parameters as normalized RGBA color values. It also clears the depth buffer. If you are not using the WebGL renderer, these parameters will have no effect.

## Examples

## Syntax

`clear([r], [g], [b], [a])``clear()`

## Parameters

r

Number: normalized red value.

g

Number: normalized green value.

b

Number: normalized blue value.

a

Number: normalized alpha value.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/io/files.js](https://github.com/processing/p5.js/blob/v2.3.3/src/io/files.js#L1471) and open a pull request!

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

  background(200);

  describe('A gray square. White circles are drawn as the user moves the mouse. The circles disappear when the user presses the mouse.');
}

function draw() {
  circle(mouseX, mouseY, 20);
}

function mousePressed() {
  clear();
  background(200);
}
```

```js
let pg;

function setup() {
  createCanvas(100, 100);
  background(200);

  pg = createGraphics(60, 60);
  pg.background(200);
  pg.noStroke();
  pg.circle(pg.width / 2, pg.height / 2, 15);
  image(pg, 20, 20);

  describe('A white circle drawn on a gray square. The square gets smaller when the mouse is pressed.');
}

function mousePressed() {
  clear();
  image(pg, 20, 20);
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the text.
  textAlign(LEFT, CENTER);
  textFont('Courier New');
  textSize(12);

  // Display instructions.
  text('Double-click to save', 5, 50, 90);

  describe('The text "Double-click to save" written in black on a gray background.');
}

// Save the file when the user double-clicks.
function doubleClicked() {
  // Create a p5.PrintWriter object.
  let myWriter = createWriter('numbers.txt');

  // Add some data to the print stream.
  myWriter.print('Hello p5*js!');

  // Clear the print stream.
  myWriter.clear();

  // Save the file and close the print stream.
  myWriter.close();
}
```
