---
source: https://p5js.org/reference/p5/setCamera/
title: "setCamera"
fetched: 2026-10-28
---

Sets the current (active) camera of a 3D sketch.

`setCamera()` allows for switching between multiple cameras created with [createCamera()](https://p5js.org/reference/p5/createCamera/).

Note: `setCamera()` can only be used in WebGL mode.

## Examples

## Syntax

`setCamera(cam)`

## Parameters

cam

p5.Camera: camera that should be made active.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/p5.Camera.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/p5.Camera.js#L2738) and open a pull request!

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
