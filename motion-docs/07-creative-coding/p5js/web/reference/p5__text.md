---
source: https://p5js.org/reference/p5/text/
title: "text"
fetched: 2026-10-28
---

Draws text to the canvas.

The first parameter, `str`, is the text to be drawn. The second and third parameters, `x` and `y`, set the coordinates of the text's bottom-left corner. See [textAlign()](https://p5js.org/reference/p5/textAlign/) for other ways to align text.

The fourth and fifth parameters, `maxWidth` and `maxHeight`, are optional. They set the dimensions of the invisible rectangle containing the text. By default, they set its maximum width and height. See [rectMode()](https://p5js.org/reference/p5/rectMode/) for other ways to define the rectangular text box. Text will wrap to fit within the text box. Text outside of the box won't be drawn.

Text can be styled a few ways. Call the [fill()](https://p5js.org/reference/p5/fill/) function to set the text's fill color. Call [stroke()](https://p5js.org/reference/p5/stroke/) and [strokeWeight()](https://p5js.org/reference/p5/strokeWeight/) to set the text's outline. Call [textSize()](https://p5js.org/reference/p5/textSize/) and [textFont()](https://p5js.org/reference/p5/textFont/) to set the text's size and font, respectively.

Note: `WEBGL` mode only supports fonts loaded with [loadFont()](https://p5js.org/reference/p5/loadFont/). Calling [stroke()](https://p5js.org/reference/p5/stroke/) has no effect in `WEBGL` mode.

## Examples

## Syntax

`text(str, x, y, [maxWidth], [maxHeight])`

## Parameters

str

String|Object|Array|Number|Boolean: text to be displayed.

x

Number: x-coordinate of the text box.

y

Number: y-coordinate of the text box.

maxWidth

Number: maximum width of the text box. See [rectMode()](https://p5js.org/reference/p5/text/#/p5/rectMode) for other options.

maxHeight

Number: maximum height of the text box. See [rectMode()](https://p5js.org/reference/p5/text/#/p5/rectMode) for other options.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/type/textCore.js](https://github.com/processing/p5.js/blob/v2.3.3/src/type/textCore.js#L1297) and open a pull request!

---

## Related References

* [textToContours

  Returns an array of arrays of points outlining a string of text written using the font.](https://p5js.org/reference/p5.Font/textToContours/)
* [textToModel

  Converts text into a 3D model that can be rendered in WebGL mode.](https://p5js.org/reference/p5.Font/textToModel/)
* [textToPaths

  Returns a flat array of path commands that describe the outlines of a string of text.](https://p5js.org/reference/p5.Font/textToPaths/)
* [textToPoints

  Returns an array of points outlining a string of text written using the font.](https://p5js.org/reference/p5.Font/textToPoints/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);
  background(200);
  text('hi', 50, 50);

  describe('The text "hi" written in black in the middle of a gray square.');
}
```

```js
function setup() {
  createCanvas(100, 100);
  background('skyblue');
  textSize(100);
  text('🌈', 0, 100);

  describe('A rainbow in a blue sky.');
}
```

```js
function setup() {
  createCanvas(100, 100);
  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(4);
  text('hi', 50, 50);

  describe('The text "hi" written in white with a black outline.');
}
```

```js
function setup() {
  createCanvas(100, 100);
  background('black');
  textSize(22);
  fill('yellow');
  text('rainbows', 6, 20);
  fill('cornflowerblue');
  text('rainbows', 6, 45);
  fill('tomato');
  text('rainbows', 6, 70);
  fill('limegreen');
  text('rainbows', 6, 95);

  describe('The text "rainbows" written on several lines, each in a different color.');
}
```

```js
function setup() {
  createCanvas(100, 100);
  background(200);
  let s = 'The quick brown fox jumps over the lazy dog.';
  text(s, 10, 10, 70, 80);

  describe('The sample text "The quick brown fox..." written in black across several lines.');
}
```

```js
function setup() {
  createCanvas(100, 100);
  background(200);
  rectMode(CENTER);
  let s = 'The quick brown fox jumps over the lazy dog.';
  text(s, 50, 50, 70, 80);

  describe('The sample text "The quick brown fox..." written in black across several lines.');
}
```

```js
let font;

async function setup() {
  createCanvas(100, 100, WEBGL);
  font = await loadFont('/assets/inconsolata.otf');
  textFont(font);
  textSize(32);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(200);
  rotateY(frameCount / 30);
  text('p5*js', 0, 0);

  describe('The text "p5*js" written in white and spinning in 3D.');
}
```
