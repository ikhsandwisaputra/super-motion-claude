---
source: https://p5js.org/reference/p5/imageLight/
title: "imageLight"
fetched: 2026-10-28
---

Creates an ambient light from an image.

`imageLight()` simulates a light shining from all directions. The effect is like placing the sketch at the center of a giant sphere that uses the image as its texture. The image's diffuse light will be affected by [fill()](https://p5js.org/reference/p5/fill/) and the specular reflections will be affected by [specularMaterial()](https://p5js.org/reference/p5/specularMaterial/) and [shininess()](https://p5js.org/reference/p5/shininess/).

The parameter, `img`, is the [p5.Image](https://p5js.org/reference/p5/p5.Image) object to use as the light source.

## Examples

## Syntax

`imageLight(img)`

## Parameters

img

p5.Image: image to use as the light source.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/light.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/light.js#L873) and open a pull request!

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

  describe('A sphere floating above a landscape. The surface of the sphere reflects the landscape.');
}

function draw() {
  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the image as a panorama (360˚ background).
  panorama(img);

  // Add a soft ambient light.
  ambientLight(50);

  // Add light from the image.
  imageLight(img);

  // Style the sphere.
  specularMaterial(20);
  shininess(100);
  noStroke();

  // Draw the sphere.
  sphere(30);
}
```
