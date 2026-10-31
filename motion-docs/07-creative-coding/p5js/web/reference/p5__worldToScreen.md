---
source: https://p5js.org/reference/p5/worldToScreen/
title: "worldToScreen"
fetched: 2026-10-28
---

Converts 3D world coordinates to 2D screen coordinates.

This function takes a 3D vector and converts its coordinates from the world space to screen space. This can be useful for placing 2D elements in a 3D scene or for determining the screen position of 3D objects.

## Examples

## Syntax

`worldToScreen(x, y, [z])`

## Parameters

x

Number|p5.Vector: The x coordinate in world space. (Or a vector for all three coordinates.)

y

Number: The y coordinate in world space.

z

Number: The z coordinate in world space.

## Returns

p5.Vector: A vector containing the 2D screen coordinates.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/environment.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/environment.js#L1161) and open a pull request!

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
  createCanvas(150, 150);
  let vertices = [
    createVector(-20, -20),
    createVector(20, -20),
    createVector(20, 20),
    createVector(-20, 20)
  ];

  push();
  translate(75, 55);
  rotate(PI / 4);

  // Convert world coordinates to screen coordinates
  let screenPos = vertices.map(v => worldToScreen(v));
  pop();

  background(200);

  stroke(0);
  fill(100, 150, 255, 100);
  beginShape();
  screenPos.forEach(pos => vertex(pos.x, pos.y));
  endShape(CLOSE);

  screenPos.forEach((pos, i) => {
    fill(0);
    textSize(10);
    if (i === 0) {
      text(i + 1, pos.x + 3, pos.y - 7);
    } else if (i === 1) {
      text(i + 1, pos.x + 7, pos.y + 2);
    } else if (i === 2) {
      text(i + 1, pos.x - 2, pos.y + 12);
    } else if (i === 3) {
      text(i + 1, pos.x - 12, pos.y - 2);
    }
  });

  fill(0);
  noStroke();
  textSize(10);
  let legendY = height - 35;
  screenPos.forEach((pos, i) => {
    text(`Vertex ${i + 1}: (${pos.x.toFixed(1)}, ${pos.y.toFixed(1)})`, 5, legendY + i * 10);
  });

  describe('A rotating square is transformed and drawn using screen coordinates.');

}
```

```js
let vertices;

function setup() {
  createCanvas(100, 100, WEBGL);
  vertices = [
    createVector(-25, -25, -25),
    createVector(25, -25, -25),
    createVector(25, 25, -25),
    createVector(-25, 25, -25),
    createVector(-25, -25, 25),
    createVector(25, -25, 25),
    createVector(25, 25, 25),
    createVector(-25, 25, 25)
  ];

  describe('A rotating cube with points mapped to 2D screen space and displayed as ellipses.');

}

function draw() {
  background(200);

  // Animate rotation
  let rotationX = millis() / 1000;
  let rotationY = millis() / 1200;

  push();

  rotateX(rotationX);
  rotateY(rotationY);

  // Convert world coordinates to screen coordinates
  let screenPos = vertices.map(v => worldToScreen(v));

  pop();

  screenPos.forEach((pos, i) => {

    let screenX = pos.x - width / 2;
    let screenY = pos.y - height / 2;
    fill(0);
    noStroke();
    ellipse(screenX, screenY, 3, 3);
  });
}
```
