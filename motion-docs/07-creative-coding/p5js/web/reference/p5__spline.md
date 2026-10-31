---
source: https://p5js.org/reference/p5/spline/
title: "spline"
fetched: 2026-10-28
---

Draws a curve using a Catmull-Rom spline.

Spline curves can form shapes and curves that slope gently. They’re like cables that are attached to a set of points. By default (`ends: INCLUDE`), the curve passes through all four points you provide, in order `p0(x1,y1)` -> `p1(x2,y2)` -> `p2(x3,y3)` -> `p3(x4,y4)`. Think of them as points on a curve. If you switch to `ends: EXCLUDE`, p0 and p3 act like control points and only the middle span `p1->p2` is drawn.

Spline curves can also be drawn in 3D using WebGL mode. The 3D version of `spline()` has twelve arguments because each point has x-, y-, and z-coordinates.

## Examples

## Syntax

`spline(x1, y1, x2, y2, x3, y3, x4, y4)``spline(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)`

## Parameters

x1

Number: x-coordinate of point p0.

y1

Number: y-coordinate of point p0.

x2

Number: x-coordinate of point p1.

y2

Number: y-coordinate of point p1.

x3

Number: x-coordinate of point p2.

y3

Number: y-coordinate of point p2.

x4

Number: x-coordinate of point p3.

y4

Number: y-coordinate of point p3.

z1

Number: z-coordinate of point p0.

z2

Number: z-coordinate of point p1.

z3

Number: z-coordinate of point p2.

z4

Number: z-coordinate of point p3.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/curves.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/curves.js#L680) and open a pull request!

---

## Related References

* [bezier

  Draws a Bézier curve.](https://p5js.org/reference/p5/bezier/)
* [bezierPoint

  Calculates coordinates along a Bézier curve using interpolation.](https://p5js.org/reference/p5/bezierPoint/)
* [bezierTangent

  Calculates coordinates along a line that's tangent to a Bézier curve.](https://p5js.org/reference/p5/bezierTangent/)
* [spline

  Draws a curve using a Catmull-Rom spline.](https://p5js.org/reference/p5/spline/)

## Example code (extracted)

```js
function setup() {
  createCanvas(200, 200);
  background(240);
  noFill();

  stroke(0);
  strokeWeight(2);
  spline(40, 60, 100, 40, 120, 120, 60, 140);

  strokeWeight(5);
  point(40, 60);
  point(100, 40);
  point(120, 120);
  point(60, 140);

  describe('A black spline passes smoothly through four points');
}
```

```js
function setup() {
  createCanvas(200, 200);
  background(245);

  // Ensure the curve includes both end spans p0->p1 and p2->p3
  splineProperty('ends', INCLUDE);

  // Control / anchor points
  const p0 = createVector(30, 160);
  const p1 = createVector(60, 40);
  const p2 = createVector(140, 40);
  const p3 = createVector(170, 160);

  // Draw the spline that passes through ALL four points (INCLUDE)
  noFill();
  stroke(0);
  strokeWeight(2);
  spline(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);

  // Draw markers + labels
  fill(255);
  stroke(0);
  const r = 6;
  circle(p0.x, p0.y, r);
  circle(p1.x, p1.y, r);
  circle(p2.x, p2.y, r);
  circle(p3.x, p3.y, r);

  noStroke();
  fill(0);
  text('p0', p0.x - 14, p0.y + 14);
  text('p1', p1.x - 14, p1.y - 8);
  text('p2', p2.x + 4, p2.y - 8);
  text('p3', p3.x + 4, p3.y + 14);

  describe('A black Catmull-Rom spline passes through p0, p1, p2, p3 with endpoints included.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Exclude the ends—skip the outer spans (p0→p1 and p2→p3) so only the middle span (p1→p2) is drawn.
  splineProperty('ends', EXCLUDE);

  // Draw a black spline curve.
  noFill();
  strokeWeight(1);
  stroke(0);
  spline(5, 26, 73, 24, 73, 61, 15, 65);

  // Draw red spline curves from the points.
  stroke(255, 0, 0);
  spline(5, 26, 5, 26, 73, 24, 73, 61);
  spline(73, 24, 73, 61, 15, 65, 15, 65);

  // Draw the points in black.
  strokeWeight(5);
  stroke(0);
  point(73, 24);
  point(73, 61);

  // Draw the points in red.
  stroke(255, 0, 0);
  point(5, 26);
  point(15, 65);

  describe(
    'A gray square with a curve drawn in three segments. The curve is a sideways U shape with red segments on top and bottom, and a black segment on the right. The endpoints of all the segments are marked with dots.'
  );
}
```

```js
let x1 = 5;
let y1 = 26;
let isChanging = false;

function setup() {
  createCanvas(100, 100);

  describe(
    'A gray square with a curve drawn in three segments. The curve is a sideways U shape with red segments on top and bottom, and a black segment on the right. The endpoints of all the segments are marked with dots.'
  );
}

function draw() {
  background(200);

  // Exclude the ends—skip the outer spans (p0→p1 and p2→p3) so only the middle span (p1→p2) is drawn.
  splineProperty('ends', EXCLUDE);

  // Draw a black spline curve.
  noFill();
  strokeWeight(1);
  stroke(0);
  spline(x1, y1, 73, 24, 73, 61, 15, 65);

  // Draw red spline curves from the points.
  stroke(255, 0, 0);
  spline(x1, y1, x1, y1, 73, 24, 73, 61);
  spline(73, 24, 73, 61, 15, 65, 15, 65);

  // Draw the anchor points in black.
  strokeWeight(5);
  stroke(0);
  point(73, 24);
  point(73, 61);

  // Draw the points in red.
  stroke(255, 0, 0);
  point(x1, y1);
  point(15, 65);
}

// Start changing the first point if the user clicks near it.
function mousePressed() {
  if (dist(mouseX, mouseY, x1, y1) < 20) {
    isChanging = true;
  }
}

// Stop changing the first point when the user releases the mouse.
function mouseReleased() {
  isChanging = false;
}

// Update the first point while the user drags the mouse.
function mouseDragged() {
  if (isChanging === true) {
    x1 = mouseX;
    y1 = mouseY;
  }
}
```

```js
function setup() {
  createCanvas(100, 100);

  background('skyblue');

  // Exclude the ends—skip the outer spans (p0→p1 and p2→p3) so only the middle span (p1→p2) is drawn.
  splineProperty('ends', EXCLUDE);

  // Draw the red balloon.
  fill('red');
  spline(-150, 275, 50, 60, 50, 60, 250, 275);

  // Draw the balloon string.
  line(50, 60, 50, 80);

  describe('A red balloon in a blue sky.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A red balloon in a blue sky.');
}

function draw() {
  background('skyblue');

  // Exclude the ends—skip the outer spans (p0→p1 and p2→p3) so only the middle span (p1→p2) is drawn.
  splineProperty('ends', EXCLUDE);

  // Rotate around the y-axis.
  rotateY(frameCount * 0.01);

  // Draw the red balloon.
  fill('red');
  spline(-200, 225, 0, 0, 10, 0, 0, 10, 0, 200, 225, 0);

  // Draw the balloon string.
  line(0, 10, 0, 0, 30, 0);
}
```
