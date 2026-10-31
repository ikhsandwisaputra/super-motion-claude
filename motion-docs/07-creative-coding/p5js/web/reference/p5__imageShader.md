---
source: https://p5js.org/reference/p5/imageShader/
title: "imageShader"
fetched: 2026-10-28
---

Sets the [p5.Shader](https://p5js.org/reference/p5/p5.Shader) object to apply for images.

This method allows the user to apply a custom shader to images, enabling advanced visual effects such as pixel manipulation, color adjustments, or dynamic behavior. The shader will be applied to the image drawn using the [image()](https://p5js.org/reference/p5/image/) function.

The shader will be used exclusively for:

* `image()` calls, applying only when drawing 2D images.
* This shader will NOT apply to images used in [texture()](https://p5js.org/reference/p5/texture/) or other 3D contexts. Any attempts to use the imageShader in these cases will be ignored.

## Examples

## Syntax

`imageShader(s)`

## Parameters

s

p5.Shader: [p5.Shader](https://p5js.org/reference/p5/p5.Shader/) object to apply for images.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L1374) and open a pull request!

---

## Related References

* [copyToContext

  Copies the shader from one drawing context to another.](https://p5js.org/reference/p5.Shader/copyToContext/)
* [inspectHooks

  Logs the hooks available in this shader, and their current implementation.](https://p5js.org/reference/p5.Shader/inspectHooks/)
* [modify

  Returns a new shader, based on the original, but with custom snippets of shader code replacing default behaviour.](https://p5js.org/reference/p5.Shader/modify/)
* [setUniform

  Sets the shader’s uniform (global) variables.](https://p5js.org/reference/p5.Shader/setUniform/)

## Example code (extracted)

```js
let img;
let imgShader;

async function setup() {
  img = await loadImage('/assets/outdoor_image.jpg');

  createCanvas(200, 200, WEBGL);
  noStroke();

  imgShader = createShader(`
    precision mediump float;
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;
    varying vec2 vTexCoord;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      vTexCoord = aTexCoord;
      gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
    }
  `, `
    precision mediump float;
    varying vec2 vTexCoord;
    uniform sampler2D uTexture;
    uniform vec2 uMousePos;

    void main() {
      vec4 texColor = texture2D(uTexture, vTexCoord);
      // Adjust the color based on mouse position
      float r = uMousePos.x * texColor.r;
      float g = uMousePos.y * texColor.g;
      gl_FragColor = vec4(r, g, texColor.b, texColor.a);
    }
  `);

  describe(
    'An image on a gray background where the colors change based on the mouse position.'
  );
}

function draw() {
  background(220);

  imageShader(imgShader);

  // Map the mouse position to a range between 0 and 1
  let mousePosX = map(mouseX, 0, width, 0, 1);
  let mousePosY = map(mouseY, 0, height, 0, 1);

  // Pass the mouse position to the shader as a uniform
  imgShader.setUniform('uMousePos', [mousePosX, mousePosY]);

  // Bind the image texture to the shader
  imgShader.setUniform('uTexture', img);

  image(img, -width / 2, -height / 2, width, height);
}
```

```js
let img;
let imgShader;

async function setup() {
  img = await loadImage('/assets/outdoor_image.jpg');

  createCanvas(200, 200, WEBGL);
  noStroke();

  imgShader = createShader(`
    precision mediump float;
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;
    varying vec2 vTexCoord;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      vTexCoord = aTexCoord;
      gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
    }
  `, `
    precision mediump float;
    varying vec2 vTexCoord;
    uniform sampler2D uTexture;
    uniform vec2 uMousePos;

    void main() {
      // Distance from the current pixel to the mouse
      float distFromMouse = distance(vTexCoord, uMousePos);

      // Adjust pixelation based on distance (closer = more detail, farther = blockier)
      float pixelSize = mix(0.002, 0.05, distFromMouse);
      vec2 pixelatedCoord = vec2(floor(vTexCoord.x / pixelSize) * pixelSize,
                                 floor(vTexCoord.y / pixelSize) * pixelSize);

      vec4 texColor = texture2D(uTexture, pixelatedCoord);
      gl_FragColor = texColor;
    }
  `);

  describe('A static image with a grid-like, pixelated effect created by the shader. Each cell in the grid alternates visibility, producing a dithered visual effect.');
}

function draw() {
  background(220);
  imageShader(imgShader);

  let mousePosX = map(mouseX, 0, width, 0, 1);
  let mousePosY = map(mouseY, 0, height, 0, 1);

  imgShader.setUniform('uMousePos', [mousePosX, mousePosY]);
  imgShader.setUniform('uTexture', img);
  image(img, -width / 2, -height / 2, width, height);
}
```
