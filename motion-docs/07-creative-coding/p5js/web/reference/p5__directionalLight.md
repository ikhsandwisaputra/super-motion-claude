---
source: https://p5js.org/reference/p5/directionalLight/
title: "directionalLight"
fetched: 2026-10-28
---

Creates a light that shines in one direction.

Directional lights don’t shine from a specific point. They’re like a sun that shines from somewhere offscreen. The light’s direction is set using three `(x, y, z)` values between -1 and 1. For example, setting a light’s direction as `(1, 0, 0)` will light [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry) objects from the left since the light faces directly to the right. A maximum of 5 directional lights can be active at once.

There are four ways to call `directionalLight()` with parameters to set the light’s color and direction.

The first way to call `directionalLight()` has six parameters. The first three parameters, `v1`, `v2`, and `v3`, set the light’s color using the current [colorMode()](https://p5js.org/reference/p5/colorMode/). The last three parameters, `x`, `y`, and `z`, set the light’s direction. For example, `directionalLight(255, 0, 0, 1, 0, 0)` creates a red `(255, 0, 0)` light that shines to the right `(1, 0, 0)`.

The second way to call `directionalLight()` has four parameters. The first three parameters, `v1`, `v2`, and `v3`, set the light’s color using the current [colorMode()](https://p5js.org/reference/p5/colorMode/). The last parameter, `direction` sets the light’s direction using a [p5.Vector](https://p5js.org/reference/p5/p5.Vector) object. For example, `directionalLight(255, 0, 0, lightDir)` creates a red `(255, 0, 0)` light that shines in the direction the `lightDir` vector points.

The third way to call `directionalLight()` has four parameters. The first parameter, `color`, sets the light’s color using a [p5.Color](https://p5js.org/reference/p5/p5.Color) object or an array of color values. The last three parameters, `x`, `y`, and `z`, set the light’s direction. For example, `directionalLight(myColor, 1, 0, 0)` creates a light that shines to the right `(1, 0, 0)` with the color value of `myColor`.

The fourth way to call `directionalLight()` has two parameters. The first parameter, `color`, sets the light’s color using a [p5.Color](https://p5js.org/reference/p5/p5.Color) object or an array of color values. The second parameter, `direction`, sets the light’s direction using a [p5.Vector](https://p5js.org/reference/p5/p5.Vector) object. For example, `directionalLight(myColor, lightDir)` creates a light that shines in the direction the `lightDir` vector points with the color value of `myColor`.

## Examples

## Syntax

`directionalLight(v1, v2, v3, x, y, z)``directionalLight(v1, v2, v3, direction)``directionalLight(color, x, y, z)``directionalLight(color, direction)`

## Parameters

v1

Number: red or hue value in the current [colorMode()](https://p5js.org/reference/p5/directionalLight/#/p5/colorMode).

v2

Number: green or saturation value in the current [colorMode()](https://p5js.org/reference/p5/directionalLight/#/p5/colorMode).

v3

Number: blue, brightness, or lightness value in the current [colorMode()](https://p5js.org/reference/p5/directionalLight/#/p5/colorMode).

x

Number: x-component of the light's direction between -1 and 1.

y

Number: y-component of the light's direction between -1 and 1.

z

Number: z-component of the light's direction between -1 and 1.

direction

p5.Vector: direction of the light as a [p5.Vector](https://p5js.org/reference/p5/p5.Vector/) object.

color

p5.Color|Number[]|String: color as a [p5.Color](https://p5js.org/reference/p5/p5.Color/) object, an array of color values, or as a CSS string.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/light.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/light.js#L585) and open a pull request!

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
// Double-click to turn on the directional light.

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
    // Add a red directional light from above.
    // Use RGB values and XYZ directions.
    directionalLight(255, 0, 0, 0, 1, 0);
  }

  // Style the sphere.
  noStroke();

  // Draw the sphere.
  sphere(30);
}

function doubleClicked() {
  isLit = !isLit;
  return false;
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

  // Add a red directional light from above.
  // Use a p5.Color object and XYZ directions.
  let c = color(255, 0, 0);
  directionalLight(c, 0, 1, 0);

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

  // Add a red directional light from above.
  // Use a p5.Color object and a p5.Vector object.
  let c = color(255, 0, 0);
  let lightDir = createVector(0, 1, 0);
  directionalLight(c, lightDir);

  // Style the sphere.
  noStroke();

  // Draw the sphere.
  sphere(30);
}
```
