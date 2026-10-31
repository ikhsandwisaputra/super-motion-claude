---
source: https://p5js.org/reference/p5/panorama/
title: "panorama"
fetched: 2026-10-28
---

Creates an immersive 3D background.

`panorama()` transforms images containing 360˚ content, such as maps or HDRIs, into immersive 3D backgrounds that surround a sketch. Exploring the space requires changing the camera's perspective with functions such as [orbitControl()](https://p5js.org/reference/p5/orbitControl/) or [camera()](https://p5js.org/reference/p5/camera/).

## Examples

## Syntax

`panorama(img)`

## Parameters

img

p5.Image: 360˚ image to use as the background.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/light.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/light.js#L923) and open a pull request!

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

let img;

async function setup() {
  // Load an image and create a p5.Image object.
  img = await loadImage('/assets/outdoor_spheremap.jpg');

  createCanvas(100, 100, WEBGL);

  describe('A sphere floating above a landscape. The surface of the sphere reflects the landscape. The full landscape is viewable in 3D as the user drags the mouse.');
}

function draw() {
  // Add the panorama.
  panorama(img);

  // Enable orbiting with the mouse.
  orbitControl();

  // Use the image as a light source.
  imageLight(img);

  // Style the sphere.
  noStroke();
  specularMaterial(50);
  shininess(200);
  metalness(100);

  // Draw the sphere.
  sphere(30);
}
```
