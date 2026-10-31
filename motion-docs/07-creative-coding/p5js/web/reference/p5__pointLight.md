---
source: https://p5js.org/reference/p5/pointLight/
title: "pointLight"
fetched: 2026-10-28
---

Creates a light that shines from a point in all directions.

Point lights are like light bulbs that shine in all directions. They can be placed at different positions to achieve different lighting effects. A maximum of 5 point lights can be active at once.

There are four ways to call `pointLight()` with parameters to set the light’s color and position.

The first way to call `pointLight()` has six parameters. The first three parameters, `v1`, `v2`, and `v3`, set the light’s color using the current [colorMode()](https://p5js.org/reference/p5/colorMode/). The last three parameters, `x`, `y`, and `z`, set the light’s position. For example, `pointLight(255, 0, 0, 50, 0, 0)` creates a red `(255, 0, 0)` light that shines from the coordinates `(50, 0, 0)`.

The second way to call `pointLight()` has four parameters. The first three parameters, `v1`, `v2`, and `v3`, set the light’s color using the current [colorMode()](https://p5js.org/reference/p5/colorMode/). The last parameter, position sets the light’s position using a [p5.Vector](https://p5js.org/reference/p5/p5.Vector) object. For example, `pointLight(255, 0, 0, lightPos)` creates a red `(255, 0, 0)` light that shines from the position set by the `lightPos` vector.

The third way to call `pointLight()` has four parameters. The first parameter, `color`, sets the light’s color using a [p5.Color](https://p5js.org/reference/p5/p5.Color) object or an array of color values. The last three parameters, `x`, `y`, and `z`, set the light’s position. For example, `directionalLight(myColor, 50, 0, 0)` creates a light that shines from the coordinates `(50, 0, 0)` with the color value of `myColor`.

The fourth way to call `pointLight()` has two parameters. The first parameter, `color`, sets the light’s color using a [p5.Color](https://p5js.org/reference/p5/p5.Color) object or an array of color values. The second parameter, `position`, sets the light’s position using a [p5.Vector](https://p5js.org/reference/p5/p5.Vector) object. For example, `directionalLight(myColor, lightPos)` creates a light that shines from the position set by the `lightPos` vector with the color value of `myColor`.

## Examples

## Syntax

`pointLight(v1, v2, v3, x, y, z)``pointLight(v1, v2, v3, position)``pointLight(color, x, y, z)``pointLight(color, position)`

## Parameters

v1

Number: red or hue value in the current [colorMode()](https://p5js.org/reference/p5/pointLight/#/p5/colorMode).

v2

Number: green or saturation value in the current [colorMode()](https://p5js.org/reference/p5/pointLight/#/p5/colorMode).

v3

Number: blue, brightness, or lightness value in the current [colorMode()](https://p5js.org/reference/p5/pointLight/#/p5/colorMode).

x

Number: x-coordinate of the light.

y

Number: y-coordinate of the light.

z

Number: z-coordinate of the light.

position

p5.Vector: position of the light as a [p5.Vector](https://p5js.org/reference/p5/p5.Vector/) object.

color

p5.Color|Number[]|String: color as a [p5.Color](https://p5js.org/reference/p5/p5.Color/) object, an array of color values, or a CSS string.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/light.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/light.js#L811) and open a pull request!

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
// Double-click to turn on the point light.

let isLit = false;

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A sphere drawn on a gray background. A red light starts shining from above when the user double-clicks.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Control the light.
  if (isLit === true) {
    // Add a red point light from above.
    // Use RGB values and XYZ coordinates.
    pointLight(255, 0, 0, 0, -150, 0);
  }

  // Style the sphere.
  noStroke();

  // Draw the sphere.
  sphere(30);
}

// Turn on the point light when the user double-clicks.
function doubleClicked() {
  isLit = true;
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A sphere drawn on a gray background. The top of the sphere appears bright red. The color gets darker toward the bottom.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Add a red point light from above.
  // Use a p5.Color object and XYZ directions.
  let c = color(255, 0, 0);
  pointLight(c, 0, -150, 0);

  // Style the sphere.
  noStroke();

  // Draw the sphere.
  sphere(30);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A sphere drawn on a gray background. The top of the sphere appears bright red. The color gets darker toward the bottom.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Add a red point light from above.
  // Use a p5.Color object and a p5.Vector object.
  let c = color(255, 0, 0);
  let lightPos = createVector(0, -150, 0);
  pointLight(c, lightPos);

  // Style the sphere.
  noStroke();

  // Draw the sphere.
  sphere(30);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('Four spheres arranged in a square and drawn on a gray background. The spheres appear bright red toward the center of the square. The color gets darker toward the corners of the square.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Add a red point light that points to the center of the scene.
  // Use a p5.Color object and a p5.Vector object.
  let c = color(255, 0, 0);
  let lightPos = createVector(0, 0, 65);
  pointLight(c, lightPos);

  // Style the spheres.
  noStroke();

  // Draw a sphere up and to the left.
  push();
  translate(-25, -25, 25);
  sphere(10);
  pop();

  // Draw a box up and to the right.
  push();
  translate(25, -25, 25);
  sphere(10);
  pop();

  // Draw a sphere down and to the left.
  push();
  translate(-25, 25, 25);
  sphere(10);
  pop();

  // Draw a box down and to the right.
  push();
  translate(25, 25, 25);
  sphere(10);
  pop();
}
```
