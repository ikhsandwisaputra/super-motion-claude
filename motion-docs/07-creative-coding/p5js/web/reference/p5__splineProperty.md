---
source: https://p5js.org/reference/p5/splineProperty/
title: "splineProperty"
fetched: 2026-10-28
---

Gets or sets a given spline property.

Use `splineProperty()` to adjust the behavior of splines created with `splineVertex()` or `spline()`. You can control two key aspects of a spline: its end behavior (`ends`) and its curvature (`tightness`).

By default, the ends property is set to `INCLUDE`, which means the spline passes through every point, including the endpoints. You can also set it to `EXCLUDE` i.e. `splineProperty('ends', EXCLUDE)`, which makes the spline pass through all points except the endpoints.

`INCLUDE` case will have the spline passing through all points, like this:

```js
splineProperty('ends', INCLUDE); // no need to set this, as it is the default
spline(25, 46, 93, 44, 93, 81, 35, 85);

point(25, 46);
point(93, 44);
point(93, 81);
point(35, 85);
```

![](https://p5js.org/assets/includeSpline.png)

EXCLUDE case will have the spline passing through the middle points, like this:

```js
splineProperty('ends', EXCLUDE);
spline(25, 46, 93, 44, 93, 81, 35, 85);

point(25, 46);
point(93, 44);
point(93, 81);
point(35, 85);
```

![](https://p5js.org/assets/excludeSpline.png)

By default, the tightness property is set to `0`, producing a smooth curve that passes evenly through the vertices. Negative values make the curve looser, while positive values make it tighter. Common values range between -1 and 1, though values outside this range can also be used for different effects.

For example, To set tightness, use `splineProperty('tightness', t)`, (default: t = 0).

Here's the example showing negetive value of tightness, which creates a rounder bulge:

```js
splineProperty('tightness', -5)
stroke(0);
strokeWeight(2);
spline(25, 46, 93, 44, 93, 81, 35, 85);
```

![](https://p5js.org/assets/roundBulge.png) Here's the example showing positive value of tightness, which makes the curve tighter and more angular:

```js
splineProperty('tightness', 5)
stroke(0);
strokeWeight(2);
spline(25, 46, 93, 44, 93, 81, 35, 85);
```

![](https://p5js.org/assets/anglurBulge.png)

In all cases, the splines in p5.js are [cardinal splines](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline). When tightness is 0, these splines are often known as [Catmull-Rom splines](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull%E2%80%93Rom_spline/)

## Examples

## Syntax

`splineProperty(property, value)``splineProperty(property)`

## Parameters

property

String:

value

Value to set the given property to.

## Returns

The current value for the given property.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/custom\_shapes.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/custom_shapes.js#L2702) and open a pull request!

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
// Move the mouse left and right to see the curve change.

let t;

function setup() {
  createCanvas(100, 100);
}

function draw() {
  background(240);

  t = map(mouseX, 0, width, -5, 5, true);
  splineProperty('tightness', t);

  noFill();
  stroke(0);
  strokeWeight(2);

  beginShape();
  splineVertex(10, 26);
  splineVertex(83, 24);

  splineVertex(83, 61);
  splineVertex(25, 65);
  endShape();

  push();
  strokeWeight(5);
  point(10, 26);
  point(83, 24);
  point(83, 61);
  point(25, 65);
  pop();

  fill(0);
  noStroke();
  textSize(10);
  text(`tightness: ${round(t, 1)}`, 15, 90);
  describe('A black spline forms a sideways U shape through four points. The spline passes through the points more loosely as the mouse moves left of center (negative tightness), and more tightly as it moves right of center (positive tightness). The tightness is displayed at the bottom.');
}
```

```js
function setup() {
  createCanvas(360, 140);
  background(240);
  noFill();

  // Right panel: ends = INCLUDE (all spans).
  push();
  translate(10, 10);
  stroke(220);
  rect(0, 0, 160, 120);
  fill(30);
  textSize(11);
  text('ends: INCLUDE (all spans)', 8, 16);
  noFill();

  splineProperty('ends', INCLUDE);
  stroke(0);
  strokeWeight(2);
  spline(25, 46, 93, 44, 93, 81, 35, 85);

  // vertices
  strokeWeight(5);
  stroke(0);
  point(25, 46);
  point(93, 44);
  point(93, 81);
  point(35, 85);
  pop();

  // Right panel: ends = EXCLUDE (middle only).
  push();
  translate(190, 10);
  stroke(220);
  rect(0, 0, 160, 120);
  noStroke();
  fill(30);
  text('ends: EXCLUDE ', 18, 16);
  noFill();

  splineProperty('ends', EXCLUDE);
  stroke(0);
  strokeWeight(2);
  spline(25, 46, 93, 44, 93, 81, 35, 85);

  // vertices
  strokeWeight(5);
  stroke(0);
  point(25, 46);
  point(93, 44);
  point(93, 81);
  point(35, 85);
  pop();

  describe('Left panel shows spline with ends INCLUDE (three spans). Right panel shows EXCLUDE (only the middle span). Four black points mark the vertices.');
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
