---
source: https://p5js.org/reference/p5/camera/
title: "camera"
fetched: 2026-10-28
---

Sets the position and orientation of the current camera in a 3D sketch.

`camera()` allows objects to be viewed from different angles. It has nine parameters that are all optional.

The first three parameters, `x`, `y`, and `z`, are the coordinates of the camera’s position. For example, calling `camera(0, 0, 0)` places the camera at the origin `(0, 0, 0)`. By default, the camera is placed at `(0, 0, 800)`.

The next three parameters, `centerX`, `centerY`, and `centerZ` are the coordinates of the point where the camera faces. For example, calling `camera(0, 0, 0, 10, 20, 30)` places the camera at the origin `(0, 0, 0)` and points it at `(10, 20, 30)`. By default, the camera points at the origin `(0, 0, 0)`.

The last three parameters, `upX`, `upY`, and `upZ` are the components of the "up" vector. The "up" vector orients the camera’s y-axis. For example, calling `camera(0, 0, 0, 10, 20, 30, 0, -1, 0)` places the camera at the origin `(0, 0, 0)`, points it at `(10, 20, 30)`, and sets the "up" vector to `(0, -1, 0)` which is like holding it upside-down. By default, the "up" vector is `(0, 1, 0)`.

Note: `camera()` can only be used in WebGL mode.

## Examples

## Syntax

`camera([x], [y], [z], [centerX], [centerY], [centerZ], [upX], [upY], [upZ])`

## Parameters

x

Number: x-coordinate of the camera. Defaults to 0.

y

Number: y-coordinate of the camera. Defaults to 0.

z

Number: z-coordinate of the camera. Defaults to 800.

centerX

Number: x-coordinate of the point the camera faces. Defaults to 0.

centerY

Number: y-coordinate of the point the camera faces. Defaults to 0.

centerZ

Number: z-coordinate of the point the camera faces. Defaults to 0.

upX

Number: x-component of the camera’s "up" vector. Defaults to 0.

upY

Number: y-component of the camera’s "up" vector. Defaults to 1.

upZ

Number: z-component of the camera’s "up" vector. Defaults to 0.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/p5.Camera.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/p5.Camera.js#L2152) and open a pull request!

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
function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white cube on a gray background.');
}

function draw() {
  background(200);

  // Move the camera to the top-right.
  camera(200, -400, 800);

  // Draw the box.
  box();
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white cube apperas to sway left and right on a gray background.');
}

function draw() {
  background(200);

  // Calculate the camera's x-coordinate.
  let x = 400 * cos(frameCount * 0.01);

  // Orbit the camera around the box.
  camera(x, -400, 800);

  // Draw the box.
  box();
}
```

```js
// Adjust the range sliders to change the camera's position.

let xSlider;
let ySlider;
let zSlider;

function setup() {
  createCanvas(100, 100, WEBGL);

  // Create slider objects to set the camera's coordinates.
  xSlider = createSlider(-400, 400, 400);
  xSlider.position(0, 100);
  xSlider.size(100);
  ySlider = createSlider(-400, 400, -200);
  ySlider.position(0, 120);
  ySlider.size(100);
  zSlider = createSlider(0, 1600, 800);
  zSlider.position(0, 140);
  zSlider.size(100);

  describe(
    'A white cube drawn against a gray background. Three range sliders appear beneath the image. The camera position changes when the user moves the sliders.'
  );
}

function draw() {
  background(200);

  // Get the camera's coordinates from the sliders.
  let x = xSlider.value();
  let y = ySlider.value();
  let z = zSlider.value();

  // Move the camera.
  camera(x, y, z);

  // Draw the box.
  box();
}
```
