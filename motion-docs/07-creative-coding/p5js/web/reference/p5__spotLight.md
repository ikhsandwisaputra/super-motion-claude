---
source: https://p5js.org/reference/p5/spotLight/
title: "spotLight"
fetched: 2026-10-28
---

Creates a light that shines from a point in one direction.

Spot lights are like flashlights that shine in one direction creating a cone of light. The shape of the cone can be controlled using the angle and concentration parameters. A maximum of 5 spot lights can be active at once.

There are eight ways to call `spotLight()` with parameters to set the light’s color, position, direction. For example, `spotLight(255, 0, 0, 0, 0, 0, 1, 0, 0)` creates a red `(255, 0, 0)` light at the origin `(0, 0, 0)` that points to the right `(1, 0, 0)`.

The `angle` parameter is optional. It sets the radius of the light cone. For example, `spotLight(255, 0, 0, 0, 0, 0, 1, 0, 0, PI / 16)` creates a red `(255, 0, 0)` light at the origin `(0, 0, 0)` that points to the right `(1, 0, 0)` with an angle of `PI / 16` radians. By default, `angle` is `PI / 3` radians.

The `concentration` parameter is also optional. It focuses the light towards the center of the light cone. For example, `spotLight(255, 0, 0, 0, 0, 0, 1, 0, 0, PI / 16, 50)` creates a red `(255, 0, 0)` light at the origin `(0, 0, 0)` that points to the right `(1, 0, 0)` with an angle of `PI / 16` radians at concentration of 50. By default, `concentration` is 100.

## Examples

## Syntax

`spotLight(v1, v2, v3, x, y, z, rx, ry, rz, [angle], [concentration])``spotLight(color, position, direction, [angle], [concentration])``spotLight(v1, v2, v3, position, direction, [angle], [concentration])``spotLight(color, x, y, z, direction, [angle], [concentration])``spotLight(color, position, rx, ry, rz, [angle], [concentration])``spotLight(v1, v2, v3, x, y, z, direction, [angle], [concentration])``spotLight(v1, v2, v3, position, rx, ry, rz, [angle], [concentration])``spotLight(color, x, y, z, rx, ry, rz, [angle], [concentration])`

## Parameters

v1

Number: red or hue value in the current [colorMode()](https://p5js.org/reference/p5/spotLight/#/p5/colorMode).

v2

Number: green or saturation value in the current [colorMode()](https://p5js.org/reference/p5/spotLight/#/p5/colorMode).

v3

Number: blue, brightness, or lightness value in the current [colorMode()](https://p5js.org/reference/p5/spotLight/#/p5/colorMode).

x

Number: x-coordinate of the light.

y

Number: y-coordinate of the light.

z

Number: z-coordinate of the light.

rx

Number: x-component of light direction between -1 and 1.

ry

Number: y-component of light direction between -1 and 1.

rz

Number: z-component of light direction between -1 and 1.

angle

Number: angle of the light cone. Defaults to `PI / 3`.

concentration

Number: concentration of the light. Defaults to 100.

color

p5.Color|Number[]|String: color as a [p5.Color](https://p5js.org/reference/p5/p5.Color/) object, an array of color values, or a CSS string.

position

p5.Vector: position of the light as a [p5.Vector](https://p5js.org/reference/p5/p5.Vector/) object.

direction

p5.Vector: direction of light as a [p5.Vector](https://p5js.org/reference/p5/p5.Vector/) object.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/light.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/light.js#L1275) and open a pull request!

---

## Related References

* [ambientLight

  Creates a light that shines from all directions.](https://p5js.org/reference/p5/ambientLight/)
* [directionalLight

  Creates a light that shines in one direction.](https://p5js.org/reference/p5/directionalLight/)
* [imageLight

  Creates an ambient light from an image.](https://p5js.org/reference/p5/imageLight/)
* [lightFalloff

  Sets the falloff rate for pointLight() and spotLight().](https://p5js.org/reference/p5/lightFalloff/)

## Example code (extracted)

```js
// Click and drag the mouse to view the scene from different angles.
// Double-click to adjust the spotlight.

let isLit = false;

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white sphere drawn on a gray background. A red spotlight starts shining when the user double-clicks.');
}

function draw() {
  background(50);

  // Enable orbiting with the mouse.
  orbitControl();

  // Turn on the lights.
  lights();

  // Control the spotlight.
  if (isLit === true) {
    // Add a red spot light that shines into the screen.
    // Set its angle to PI / 32 radians.
    spotLight(255, 0, 0, 0, 0, 100, 0, 0, -1, PI / 32);
  }

  // Draw the sphere.
  sphere(30);
}

// Turn on the spotlight when the user double-clicks.
function doubleClicked() {
  isLit = true;
}
```

```js
// Click and drag the mouse to view the scene from different angles.
// Double-click to adjust the spotlight.

let isLit = false;

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white sphere drawn on a gray background. A red spotlight starts shining when the user double-clicks.');
}

function draw() {
  background(50);

  // Enable orbiting with the mouse.
  orbitControl();

  // Turn on the lights.
  lights();

  // Control the spotlight.
  if (isLit === true) {
    // Add a red spot light that shines into the screen.
    // Set its angle to PI / 3 radians (default).
    // Set its concentration to 1000.
    let c = color(255, 0, 0);
    let position = createVector(0, 0, 100);
    let direction = createVector(0, 0, -1);
    spotLight(c, position, direction, PI / 3, 1000);
  }

  // Draw the sphere.
  sphere(30);
}

// Turn on the spotlight when the user double-clicks.
function doubleClicked() {
  isLit = true;
}
```
