---
source: https://p5js.org/reference/p5/linePerspective/
title: "linePerspective"
fetched: 2026-10-28
---

Enables or disables perspective for lines in 3D sketches.

In WebGL mode, lines can be drawn with a thinner stroke when they’re further from the camera. Doing so gives them a more realistic appearance.

By default, lines are drawn differently based on the type of perspective being used:

* `perspective()` and `frustum()` simulate a realistic perspective. In these modes, stroke weight is affected by the line’s distance from the camera. Doing so results in a more natural appearance. `perspective()` is the default mode for 3D sketches.
* `ortho()` doesn’t simulate a realistic perspective. In this mode, stroke weights are consistent regardless of the line’s distance from the camera. Doing so results in a more predictable and consistent appearance.

`linePerspective()` can override the default line drawing mode.

The parameter, `enable`, is optional. It’s a `Boolean` value that sets the way lines are drawn. If `true` is passed, as in `linePerspective(true)`, then lines will appear thinner when they are further from the camera. If `false` is passed, as in `linePerspective(false)`, then lines will have consistent stroke weights regardless of their distance from the camera. By default, `linePerspective()` is enabled.

Calling `linePerspective()` without passing an argument returns `true` if it's enabled and `false` if not.

Note: `linePerspective()` can only be used in WebGL mode.

## Examples

## Syntax

`linePerspective(enable)``linePerspective()`

## Parameters

enable

Boolean: whether to enable line perspective.

## Returns

boolean: whether line perspective is enabled.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/p5.Camera.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/p5.Camera.js#L2392) and open a pull request!

---

## Related References

* [camera

  Sets the position and orientation of the camera.](https://p5js.org/reference/p5.Camera/camera/)
* [centerX

  The x-coordinate of the place where the camera looks.](https://p5js.org/reference/p5.Camera/centerX/)
* [centerY

  The y-coordinate of the place where the camera looks.](https://p5js.org/reference/p5.Camera/centerY/)
* [centerZ

  The y-coordinate of the place where the camera looks.](https://p5js.org/reference/p5.Camera/centerZ/)

## Example code (extracted)

```js
// Double-click the canvas to toggle the line perspective.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe(
    'A white cube with black edges on a gray background. Its edges toggle between thick and thin when the user double-clicks.'
  );
}

function draw() {
  background(200);

  // Translate the origin toward the camera.
  translate(-10, 10, 600);

  // Rotate the coordinate system.
  rotateY(-0.1);
  rotateX(-0.1);

  // Draw the row of boxes.
  for (let i = 0; i < 6; i += 1) {
    translate(0, 0, -40);
    box(10);
  }
}

// Toggle the line perspective when the user double-clicks.
function doubleClicked() {
  let isEnabled = linePerspective();
  linePerspective(!isEnabled);
}
```

```js
// Double-click the canvas to toggle the line perspective.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe(
    'A row of cubes with black edges on a gray background. Their edges toggle between thick and thin when the user double-clicks.'
  );
}

function draw() {
  background(200);

  // Use an orthographic projection.
  ortho();

  // Translate the origin toward the camera.
  translate(-10, 10, 600);

  // Rotate the coordinate system.
  rotateY(-0.1);
  rotateX(-0.1);

  // Draw the row of boxes.
  for (let i = 0; i < 6; i += 1) {
    translate(0, 0, -40);
    box(10);
  }
}

// Toggle the line perspective when the user double-clicks.
function doubleClicked() {
  let isEnabled = linePerspective();
  linePerspective(!isEnabled);
}
```
