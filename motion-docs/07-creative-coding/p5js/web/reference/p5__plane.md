---
source: https://p5js.org/reference/p5/plane/
title: "plane"
fetched: 2026-10-28
---

Draws a plane.

A plane is a four-sided, flat shape with every angle measuring 90˚. It’s similar to a rectangle and offers advanced drawing features in WebGL mode.

The first parameter, `width`, is optional. If a `Number` is passed, as in `plane(20)`, it sets the plane’s width and height. By default, `width` is 50.

The second parameter, `height`, is also optional. If a `Number` is passed, as in `plane(20, 30)`, it sets the plane’s height. By default, `height` is set to the plane’s `width`.

The third parameter, `detailX`, is also optional. If a `Number` is passed, as in `plane(20, 30, 5)` it sets the number of triangle subdivisions to use along the x-axis. All 3D shapes are made by connecting triangles to form their surfaces. By default, `detailX` is 1.

The fourth parameter, `detailY`, is also optional. If a `Number` is passed, as in `plane(20, 30, 5, 7)` it sets the number of triangle subdivisions to use along the y-axis. All 3D shapes are made by connecting triangles to form their surfaces. By default, `detailY` is 1.

Note: `plane()` can only be used in WebGL mode.

## Examples

## Syntax

`plane([width], [height], [detailX], [detailY])`

## Parameters

width

Number: width of the plane.

height

Number: height of the plane.

detailX

Integer: number of triangle subdivisions along the x-axis.

detailY

Integer: number of triangle subdivisions along the y-axis.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/3d\_primitives.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/3d_primitives.js#L491) and open a pull request!

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

  describe('A white plane on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the plane.
  plane();
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white plane on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the plane.
  // Set its width and height to 30.
  plane(30);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white plane on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the plane.
  // Set its width to 30 and height to 50.
  plane(30, 50);
}
```
