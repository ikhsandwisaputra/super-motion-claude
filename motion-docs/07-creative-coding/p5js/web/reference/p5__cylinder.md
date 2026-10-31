---
source: https://p5js.org/reference/p5/cylinder/
title: "cylinder"
fetched: 2026-10-28
---

Draws a cylinder.

A cylinder is a 3D shape with triangular faces that connect a flat bottom to a flat top. Cylinders with few faces look like boxes. Cylinders with many faces have smooth surfaces.

The first parameter, `radius`, is optional. If a `Number` is passed, as in `cylinder(20)`, it sets the radius of the cylinder’s base. By default, `radius` is 50.

The second parameter, `height`, is also optional. If a `Number` is passed, as in `cylinder(20, 30)`, it sets the cylinder’s height. By default, `height` is set to the cylinder’s `radius`.

The third parameter, `detailX`, is also optional. If a `Number` is passed, as in `cylinder(20, 30, 5)`, it sets the number of edges used to form the cylinder's top and bottom. Using more edges makes the top and bottom look more like circles. By default, `detailX` is 24.

The fourth parameter, `detailY`, is also optional. If a `Number` is passed, as in `cylinder(20, 30, 5, 2)`, it sets the number of triangle subdivisions to use along the y-axis, between cylinder's the top and bottom. All 3D shapes are made by connecting triangles to form their surfaces. By default, `detailY` is 1.

The fifth parameter, `bottomCap`, is also optional. If a `false` is passed, as in `cylinder(20, 30, 5, 2, false)` the cylinder’s bottom won’t be drawn. By default, `bottomCap` is `true`.

The sixth parameter, `topCap`, is also optional. If a `false` is passed, as in `cylinder(20, 30, 5, 2, false, false)` the cylinder’s top won’t be drawn. By default, `topCap` is `true`.

Note: `cylinder()` can only be used in WebGL mode.

## Examples

## Syntax

`cylinder([radius], [height], [detailX], [detailY], [bottomCap], [topCap])`

## Parameters

radius

Number: radius of the cylinder. Defaults to 50.

height

Number: height of the cylinder. Defaults to the value of `radius`.

detailX

Integer: number of edges along the top and bottom. Defaults to 24.

detailY

Integer: number of triangle subdivisions along the y-axis. Defaults to 1.

bottomCap

Boolean: whether to draw the cylinder's bottom. Defaults to `true`.

topCap

Boolean: whether to draw the cylinder's top. Defaults to `true`.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/3d\_primitives.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/3d_primitives.js#L938) and open a pull request!

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
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white cylinder on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the cylinder.
  cylinder();
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white cylinder on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the cylinder.
  // Set its radius and height to 30.
  cylinder(30);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white cylinder on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the cylinder.
  // Set its radius to 30 and height to 50.
  cylinder(30, 50);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white box on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the cylinder.
  // Set its radius to 30 and height to 50.
  // Set its detailX to 5.
  cylinder(30, 50, 5);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white cylinder on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the cylinder.
  // Set its radius to 30 and height to 50.
  // Set its detailX to 24 and detailY to 2.
  cylinder(30, 50, 24, 2);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white cylinder on a gray background. Its top is missing.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the cylinder.
  // Set its radius to 30 and height to 50.
  // Set its detailX to 24 and detailY to 1.
  // Don't draw its bottom.
  cylinder(30, 50, 24, 1, false);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white cylinder on a gray background. Its top and bottom are missing.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the cylinder.
  // Set its radius to 30 and height to 50.
  // Set its detailX to 24 and detailY to 1.
  // Don't draw its bottom or top.
  cylinder(30, 50, 24, 1, false, false);
}
```
