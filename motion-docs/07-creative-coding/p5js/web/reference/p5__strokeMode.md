---
source: https://p5js.org/reference/p5/strokeMode/
title: "strokeMode"
fetched: 2026-10-28
---

Sets the stroke rendering mode to balance performance and visual features when drawing lines.

`strokeMode()` offers two modes:

* `SIMPLE`: Optimizes for speed by disabling caps, joins, and stroke color features. Use this mode for faster line rendering when these visual details are unnecessary.
* `FULL`: Enables caps, joins, and stroke color for lines. This mode provides enhanced visuals but may reduce performance due to additional processing.

Choose the mode that best suits your application's needs to either improve rendering speed or enhance visual quality.

## Examples

## Syntax

`strokeMode(mode)`

## Parameters

mode

String:

The stroke mode to set. Possible values are:

* `'SIMPLE'`: Fast rendering without caps, joins, or stroke color.
* `'FULL'`: Detailed rendering with caps, joins, and stroke color.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/3d\_primitives.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/3d_primitives.js#L88) and open a pull request!

---

## Related References

* [calculateBoundingBox

  Calculates the position and size of the smallest box that contains the geometry.](https://p5js.org/reference/p5.Geometry/calculateBoundingBox/)
* [clearColors

  Removes the geometry’s internal colors.](https://p5js.org/reference/p5.Geometry/clearColors/)
* [computeFaces

  Computes the geometry's faces using its vertices.](https://p5js.org/reference/p5.Geometry/computeFaces/)
* [computeNormals

  Calculates the normal vector for each vertex on the geometry.](https://p5js.org/reference/p5.Geometry/computeNormals/)

## Example code (extracted)

```js
function setup() {
  createCanvas(300, 300, WEBGL);
  describe('A sphere with red stroke and a red, wavy line on a gray background. The wavy line have caps, joins and colors.');
}

function draw() {
  background(128);
  strokeMode(FULL); // Enables detailed rendering with caps, joins, and stroke color.
  push();
  strokeWeight(1);
  translate(0, -50, 0);
  sphere(50);
  pop();
  orbitControl();

  noFill();
  strokeWeight(15);
  stroke('red');
  beginShape();
  bezierOrder(2); // Sets the order of the Bezier curve.
  bezierVertex(80, 80);
  bezierVertex(50, -40);
  bezierVertex(-80, 80);
  endShape();
}
```

```js
function setup() {
  createCanvas(300, 300, WEBGL);
  describe('A sphere with red stroke and a  wavy line without full curve decorations without caps and color on a gray background.');
}

function draw() {
  background(128);
  strokeMode(SIMPLE); // Simplifies stroke rendering for better performance.

  // Draw sphere
  push();
  strokeWeight(1);
  translate(0, -50, 0);
  sphere(50);
  pop();
  orbitControl();

  // Draw modified wavy red line
  noFill();
  strokeWeight(15);
  stroke('red');
  beginShape();
  bezierOrder(2); // Sets the order of the Bezier curve.
  bezierVertex(80, 80);
  bezierVertex(50, -40);
  bezierVertex(-80, 80);
  endShape();
}
```
