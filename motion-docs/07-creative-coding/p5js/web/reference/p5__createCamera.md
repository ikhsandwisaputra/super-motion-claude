---
source: https://p5js.org/reference/p5/createCamera/
title: "createCamera"
fetched: 2026-10-28
---

Creates a new [p5.Camera](https://p5js.org/reference/p5/p5.Camera) object.

The new camera is initialized with a default position `(0, 0, 800)` and a default perspective projection. Its properties can be controlled with [p5.Camera](https://p5js.org/reference/p5/p5.Camera) methods such as `myCamera.lookAt(0, 0, 0)`.

Note: Every 3D sketch starts with a default camera initialized. This camera can be controlled with the functions [camera()](https://p5js.org/reference/p5/camera/), [perspective()](https://p5js.org/reference/p5/perspective/), [ortho()](https://p5js.org/reference/p5/ortho/), and [frustum()](https://p5js.org/reference/p5/frustum/) if it's the only camera in the scene.

Note: `createCamera()` can only be used in WebGL mode.

## Examples

## Syntax

`createCamera()`

## Parameters

## Returns

p5.Camera: the new camera.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/p5.Camera.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/p5.Camera.js#L2675) and open a pull request!

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
// Double-click to toggle between cameras.

let cam1;
let cam2;
let usingCam1 = true;

function setup() {
  createCanvas(100, 100, WEBGL);

  // Create the first camera.
  // Keep its default settings.
  cam1 = createCamera();

  // Create the second camera.
  // Place it at the top-left.
  // Point it at the origin.
  cam2 = createCamera();
  cam2.setPosition(400, -400, 800);
  cam2.lookAt(0, 0, 0);

  // Set the current camera to cam1.
  setCamera(cam1);

  describe('A white cube on a gray background. The camera toggles between frontal and aerial views when the user double-clicks.');
}

function draw() {
  background(200);

  // Draw the box.
  box();
}

// Toggle the current camera when the user double-clicks.
function doubleClicked() {
  if (usingCam1 === true) {
    setCamera(cam2);
    usingCam1 = false;
  } else {
    setCamera(cam1);
    usingCam1 = true;
  }
}
```
