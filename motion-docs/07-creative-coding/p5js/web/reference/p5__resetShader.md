---
source: https://p5js.org/reference/p5/resetShader/
title: "resetShader"
fetched: 2026-10-28
---

Restores the default shaders.

`resetShader()` deactivates any shaders previously applied by [shader()](https://p5js.org/reference/p5/shader/), [strokeShader()](https://p5js.org/reference/p5/strokeShader/), or [imageShader()](https://p5js.org/reference/p5/imageShader/).

Note: Shaders can only be used in WebGL mode.

## Examples

## Syntax

`resetShader()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L2387) and open a pull request!

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
// Create a string with the vertex shader program.
// The vertex shader is called for each vertex.
let vertSrc = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  vec4 position = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * position;
}
`;

// Create a string with the fragment shader program.
// The fragment shader is called for each pixel.
let fragSrc = `
precision mediump float;
varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;
  vec3 color = vec3(uv.x, uv.y, min(uv.x + uv.y, 1.0));
  gl_FragColor = vec4(color, 1.0);
}
`;

let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);

  // Create a p5.Shader object.
  myShader = createShader(vertSrc, fragSrc);

  describe(
    'Two rotating cubes on a gray background. The left one has a blue-purple gradient on each face. The right one is red.'
  );
}

function draw() {
  background(200);

  // Draw a box using the p5.Shader.
  // shader() sets the active shader to myShader.
  shader(myShader);
  push();
  translate(-25, 0, 0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(width / 4);
  pop();

  // Draw a box using the default fill shader.
  // resetShader() restores the default fill shader.
  resetShader();
  fill(255, 0, 0);
  push();
  translate(25, 0, 0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(width / 4);
  pop();
}
```
