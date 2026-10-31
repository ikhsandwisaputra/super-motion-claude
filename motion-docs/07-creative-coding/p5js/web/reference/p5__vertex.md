---
source: https://p5js.org/reference/p5/vertex/
title: "vertex"
fetched: 2026-10-28
---

Adds a vertex to a custom shape.

`vertex()` sets the coordinates of vertices drawn between the [beginShape()](https://p5js.org/reference/p5/beginShape/) and [endShape()](https://p5js.org/reference/p5/endShape/) functions.

The first two parameters, `x` and `y`, set the x- and y-coordinates of the vertex.

The third parameter, `z`, is optional. It sets the z-coordinate of the vertex in WebGL mode. By default, `z` is 0.

The fourth and fifth parameters, `u` and `v`, are also optional. They set the u- and v-coordinates for the vertex’s texture when used with [endShape()](https://p5js.org/reference/p5/endShape/). By default, `u` and `v` are both 0.

## Examples

## Syntax

`vertex(x, y)``vertex(x, y, [u], [v])``vertex(x, y, z, [u], [v])`

## Parameters

x

Number: x-coordinate of the vertex.

y

Number: y-coordinate of the vertex.

u

Number: u-coordinate of the vertex's texture.

v

Number: v-coordinate of the vertex's texture.

z

Number:

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/custom\_shapes.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/custom_shapes.js#L3016) and open a pull request!

---

## Related References

* [beginContour

  Begins creating a hole within a flat shape.](https://p5js.org/reference/p5/beginContour/)
* [beginShape

  Begins adding vertices to a custom shape.](https://p5js.org/reference/p5/beginShape/)
* [bezierOrder

  Influences the shape of the Bézier curve segment in a custom shape.](https://p5js.org/reference/p5/bezierOrder/)
* [bezierVertex

  Adds a Bézier curve segment to a custom shape.](https://p5js.org/reference/p5/bezierVertex/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the shape.
  strokeWeight(3);

  // Start drawing the shape.
  // Only draw the vertices.
  beginShape(POINTS);

  // Add the vertices.
  vertex(30, 20);
  vertex(85, 20);
  vertex(85, 75);
  vertex(30, 75);

  // Stop drawing the shape.
  endShape();

  describe('Four black dots that form a square are drawn on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Start drawing the shape.
  beginShape();

  // Add vertices.
  vertex(30, 20);
  vertex(85, 20);
  vertex(85, 75);
  vertex(30, 75);

  // Stop drawing the shape.
  endShape(CLOSE);

  describe('A white square on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  background(200);

  // Start drawing the shape.
  beginShape();

  // Add vertices.
  vertex(-20, -30, 0);
  vertex(35, -30, 0);
  vertex(35, 25, 0);
  vertex(-20, 25, 0);

  // Stop drawing the shape.
  endShape(CLOSE);

  describe('A white square on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white square spins around slowly on a gray background.');
}

function draw() {
  background(200);

  // Rotate around the y-axis.
  rotateY(frameCount * 0.01);

  // Start drawing the shape.
  beginShape();

  // Add vertices.
  vertex(-20, -30, 0);
  vertex(35, -30, 0);
  vertex(35, 25, 0);
  vertex(-20, 25, 0);

  // Stop drawing the shape.
  endShape(CLOSE);
}
```

```js
let img;

async function setup() {
  // Load an image to apply as a texture.
  img = await loadImage('/assets/laDefense.jpg');

  createCanvas(100, 100, WEBGL);

  describe('A photograph of a ceiling rotates slowly against a gray background.');
}

function draw() {
  background(200);

  // Rotate around the y-axis.
  rotateY(frameCount * 0.01);

  // Style the shape.
  noStroke();

  // Apply the texture.
  texture(img);
  textureMode(NORMAL);

  // Start drawing the shape
  beginShape();

  // Add vertices.
  vertex(-20, -30, 0, 0, 0);
  vertex(35, -30, 0, 1, 0);
  vertex(35, 25, 0, 1, 1);
  vertex(-20, 25, 0, 0, 1);

  // Stop drawing the shape.
  endShape();
}
```

```js
let vid;
function setup() {
  // Load a video and create a p5.MediaElement object.
  vid = createVideo('/assets/fingers.mov');
  createCanvas(100, 100, WEBGL);

  // Hide the video.
  vid.hide();

  // Set the video to loop.
  vid.loop();

  describe('A rectangle with video as texture');
}

function draw() {
  background(0);

  // Rotate around the y-axis.
  rotateY(frameCount * 0.01);

  // Set the texture mode.
  textureMode(NORMAL);

  // Apply the video as a texture.
  texture(vid);

  // Draw a custom shape using uv coordinates.
  beginShape();
  vertex(-40, -40, 0, 0);
  vertex(40, -40, 1, 0);
  vertex(40, 40, 1, 1);
  vertex(-40, 40, 0, 1);
  endShape();
}
```
