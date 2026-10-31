---
source: https://p5js.org/reference/p5/splineVertex/
title: "splineVertex"
fetched: 2026-10-28
---

Connects points with a smooth curve (a spline).

`splineVertex()` adds a curved segment to custom shapes. The curve it creates follows the same rules as the ones made with the [spline()](https://p5js.org/reference/p5/spline/) function. `splineVertex()` must be called between the [beginShape()](https://p5js.org/reference/p5/beginShape/) and [endShape()](https://p5js.org/reference/p5/endShape/) functions.

Spline curves can form shapes and curves that slope gently. They’re like cables that are attached to a set of points. `splineVertex()` draws a smooth curve through the points you give it. [beginShape()](https://p5js.org/reference/p5/beginShape/) and [endShape()](https://p5js.org/reference/p5/endShape/) in order to draw a curve:

If you provide three points, the spline will pass through them. It works the same way with any number of points.

```js
beginShape();

// Add the first point.
splineVertex(25, 80);

// Add the second point.
splineVertex(20, 30);

// Add the last point.
splineVertex(85, 60);

endShape();
```

![](https://p5js.org/assets/openCurveSpline.png)

Passing in `CLOSE` to `endShape()` closes the spline smoothly.

```js
beginShape();

// Add the first point.
splineVertex(25, 80);

// Add the second point.
splineVertex(20, 30);

// Add the second point.
splineVertex(85, 60);

endShape(CLOSE);
```

![](https://p5js.org/assets/closeCurveSpline.png)

By default (`ends: INCLUDE`), the curve passes through all the points you add with `splineVertex()`, similar to the [spline()](https://p5js.org/reference/p5/spline/) function. To draw only the middle span p1->p2 (skipping p0->p1 and p2->p3), set `splineProperty('ends', EXCLUDE)`. You don’t need to duplicate vertices to draw those spans.

Spline curves can also be drawn in 3D using WebGL mode. The 3D version of `splineVertex()` has three arguments because each point has x-, y-, and z-coordinates. By default, the vertex’s z-coordinate is set to 0.

Note: `splineVertex()` won’t work when an argument is passed to [beginShape()](https://p5js.org/reference/p5/beginShape/).

## Examples

## Syntax

`splineVertex(x, y)``splineVertex(x, y, [z])``splineVertex(x, y, [u], [v])``splineVertex(x, y, z, [u], [v])`

## Parameters

x

Number: x-coordinate of the vertex

y

Number: y-coordinate of the vertex

z

Number: z-coordinate of the vertex.

u

Number:

v

Number:

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/custom\_shapes.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/custom_shapes.js#L2417) and open a pull request!

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

  background(220);
  noFill();
  strokeWeight(1);

  beginShape();
  splineVertex(25, 80);
  splineVertex(20, 30);
  splineVertex(85, 60);
  endShape();

  strokeWeight(5);
  stroke(0);

  point(25, 80);
  point(20, 30);
  point(85, 60);

  describe(
    'On a gray background, a black spline passes through three marked points.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);
  background(220);

  beginShape();
  splineVertex(25, 80);
  splineVertex(20, 30);
  splineVertex(85, 60);
  endShape(CLOSE);

  describe(
    'On a gray background, a closed black spline with a white interior forms a triangular shape with smooth corners.'
  );
}
```

```js
let ringInnerRadius, ringWidth;
let radius, dRadius;
let theta, dTheta;
let time, dTime;
let vertexCount, unit, offset;

function setup() {
  createCanvas(400, 400);

  vertexCount = 15;
  unit = createVector(1, 0);
  dTheta = TAU / vertexCount;
  dTime = 0.004;

  ringInnerRadius = 25;
  ringWidth = 5 * ringInnerRadius;

  offset = width;

  describe(
    'A white blob with a black outline changes its shape over time.'
  );
}

function draw() {
  background(220);
  strokeWeight(2);
  translate(width / 2, height / 2);

  time = dTime * frameCount;

  beginShape();
  for (let i = 0; i < vertexCount; i++) {
    unit.rotate(dTheta);
    dRadius = noise(offset + unit.x, offset + unit.y, time) * ringWidth;
    radius = ringInnerRadius + dRadius;
    splineVertex(radius * unit.x, radius * unit.y);
  }
  endShape(CLOSE);
}
```

```js
let vertexA;
let vertexB;
let vertexC;
let vertexD;
let vertexE;
let vertexF;

let markerRadius;

let vectorAB;
let vectorFE;

let endOfTangentB;
let endOfTangentE;

function setup() {
  createCanvas(100, 100);

  // Initialize variables
  // Adjusting vertices A and F affects the slopes at B and E

  vertexA = createVector(35, 85);
  vertexB = createVector(25, 70);
  vertexC = createVector(30, 30);
  vertexD = createVector(70, 30);
  vertexE = createVector(75, 70);
  vertexF = createVector(65, 85);

  markerRadius = 4;

  vectorAB = p5.Vector.sub(vertexB, vertexA);
  vectorFE = p5.Vector.sub(vertexE, vertexF);

  endOfTangentB = p5.Vector.add(vertexC, vectorAB);
  endOfTangentE = p5.Vector.add(vertexD, vectorFE);

  splineProperty(`ends`, EXCLUDE);

  // Draw figure

  background(220);

  noFill();

  beginShape();
  splineVertex(vertexA.x, vertexA.y);
  splineVertex(vertexB.x, vertexB.y);
  splineVertex(vertexC.x, vertexC.y);
  splineVertex(vertexD.x, vertexD.y);
  splineVertex(vertexE.x, vertexE.y);
  splineVertex(vertexF.x, vertexF.y);
  endShape();

  stroke('red');
  line(vertexA.x, vertexA.y, vertexC.x, vertexC.y);
  line(vertexB.x, vertexB.y, endOfTangentB.x, endOfTangentB.y);

  stroke('blue');
  line(vertexD.x, vertexD.y, vertexF.x, vertexF.y);
  line(vertexE.x, vertexE.y, endOfTangentE.x, endOfTangentE.y);

  fill('white');
  stroke('black');
  circle(vertexA.x, vertexA.y, markerRadius);
  circle(vertexB.x, vertexB.y, markerRadius);
  circle(vertexC.x, vertexC.y, markerRadius);
  circle(vertexD.x, vertexD.y, markerRadius);
  circle(vertexE.x, vertexE.y, markerRadius);
  circle(vertexF.x, vertexF.y, markerRadius);

  fill('black');
  noStroke();
  text('A', vertexA.x - 15, vertexA.y + 5);
  text('B', vertexB.x - 15, vertexB.y + 5);
  text('C', vertexC.x - 5, vertexC.y - 5);
  text('D', vertexD.x - 5, vertexD.y - 5);
  text('E', vertexE.x + 5, vertexE.y + 5);
  text('F', vertexF.x + 5, vertexF.y + 5);

  describe('On a gray background, a black spline passes through vertices A, B, C, D, E, and F, shown as white circles. A red line segment joining vertices A and C has the same slope as the red tangent segment at B. Similarly, the blue line segment joining vertices D and F has the same slope as the blue tangent at E.');
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A ghost shape drawn in white on a blue background. When the user drags the mouse, the scene rotates to reveal the outline of a second ghost.');
}

function draw() {
  background('midnightblue');

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the first ghost.
  noStroke();
  fill('ghostwhite');

  beginShape();
  splineVertex(-28, 41, 0);
  splineVertex(-28, 41, 0);
  splineVertex(-29, -33, 0);
  splineVertex(18, -31, 0);
  splineVertex(34, 41, 0);
  splineVertex(34, 41, 0);
  endShape();

  // Draw the second ghost.
  noFill();
  stroke('ghostwhite');

  beginShape();
  splineVertex(-28, 41, -20);
  splineVertex(-28, 41, -20);
  splineVertex(-29, -33, -20);
  splineVertex(18, -31, -20);
  splineVertex(34, 41, -20);
  splineVertex(34, 41, -20);
  endShape();
}
```
