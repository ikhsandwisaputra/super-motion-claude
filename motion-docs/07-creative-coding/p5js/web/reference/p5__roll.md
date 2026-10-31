---
source: https://p5js.org/reference/p5/roll/
title: "roll"
fetched: 2026-10-28
---

Rotates the camera in a clockwise/counter-clockwise direction.

Rolling rotates the camera without changing its orientation. The rotation happens in the camera’s "local" space.

The parameter, `angle`, is the angle the camera should rotate. Passing a positive angle, as in `myCamera.roll(0.001)`, rotates the camera in counter-clockwise direction. Passing a negative angle, as in `myCamera.roll(-0.001)`, rotates the camera in clockwise direction.

Note: Angles are interpreted based on the current [angleMode()](https://p5js.org/reference/p5/angleMode/).

## Examples

## Syntax

`roll(angle)`

## Parameters

angle

Number: amount to rotate camera in current [angleMode](https://p5js.org/reference/p5/roll/#/p5/angleMode) units.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/p5.Camera.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/p5.Camera.js#L672) and open a pull request!

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
let cam;
let delta = 0.01;

function setup() {
  createCanvas(100, 100, WEBGL);
  normalMaterial();
  // Create a p5.Camera object.
  cam = createCamera();

  // Set the camera
  setCamera(cam);
}

function draw() {
  background(200);

  // Roll camera according to angle 'delta'
  cam.roll(delta);

  translate(0, 0, 0);
  box(20);
  translate(0, 25, 0);
  box(20);
  translate(0, 26, 0);
  box(20);
  translate(0, 27, 0);
  box(20);
  translate(0, 28, 0);
  box(20);
  translate(0,29, 0);
  box(20);
  translate(0, 30, 0);
  box(20);
}
```
