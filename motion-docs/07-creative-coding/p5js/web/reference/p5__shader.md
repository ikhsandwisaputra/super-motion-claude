---
source: https://p5js.org/reference/p5/shader/
title: "shader"
fetched: 2026-10-28
---

Sets the [p5.Shader](https://p5js.org/reference/p5/p5.Shader) object to apply while drawing.

Shaders are programs that run on the graphics processing unit (GPU). They can process many pixels or vertices at the same time, making them fast for many graphics tasks.

You can make new shaders using p5.strands with the [`buildMaterialShader`](https://p5js.org/reference/p5/buildMaterialShader/), [`buildColorShader`](https://p5js.org/reference/p5/buildColorShader/), and [`buildNormalShader`](https://p5js.org/reference/p5/buildNormalShader/) functions. You can also use [`buildFilterShader`](https://p5js.org/reference/p5/buildFilterShader/) alongside [`filter`](https://p5js.org/reference/p5/filter/), and [`buildStrokeShader`](https://p5js.org/reference/p5/buildStrokeShader/) alongside [`stroke`](https://p5js.org/reference/p5/stroke/).

The parameter, `s`, is the [p5.Shader](https://p5js.org/reference/p5/p5.Shader) object to apply. For example, calling `shader(myShader)` applies `myShader` to process each pixel on the canvas. This only changes the fill (the inner part of shapes), but does not affect the outlines (strokes) or any images drawn using the `image()` function. The source code from a [p5.Shader](https://p5js.org/reference/p5/p5.Shader) object's fragment and vertex shaders will be compiled the first time it's passed to `shader()`.

Calling [resetShader()](https://p5js.org/reference/p5/resetShader/) restores a sketch’s default shaders.

Note: Shaders can only be used in WebGL mode.

For advanced usage, shaders can be written in a language called [GLSL](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders/). [p5.Shader](https://p5js.org/reference/p5/p5.Shader) objects can be created in this way using the [createShader()](https://p5js.org/reference/p5/createShader/) and [loadShader()](https://p5js.org/reference/p5/loadShader/) functions.

```js
let fillShader;

let vertSrc = `
precision highp float;
attribute vec3 aPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
varying vec3 vPosition;

void main() {
  vPosition = aPosition;
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
`;

let fragSrc = `
precision highp float;
uniform vec3 uLightDir;
varying vec3 vPosition;

void main() {
  vec3 lightDir = normalize(uLightDir);
  float brightness = dot(lightDir, normalize(vPosition));
  brightness = clamp(brightness, 0.4, 1.0);
  vec3 color = vec3(0.3, 0.5, 1.0);
  color = color * brightness * 3.0;
  gl_FragColor = vec4(color, 1.0);
}
`;

function setup() {
  createCanvas(200, 200, WEBGL);
  fillShader = createShader(vertSrc, fragSrc);
  noStroke();
  describe('A rotating torus with simulated directional lighting.');
}

function draw() {
  background(20, 20, 40);
  let lightDir = [0.5, 0.5, 1.0];
  fillShader.setUniform('uLightDir', lightDir);
  shader(fillShader);
  rotateY(frameCount * 0.02);
  rotateX(frameCount * 0.02);
  torus(25, 10, 30, 30);
}
```

If you want to apply shaders to strokes or images, use the following methods:

* [strokeShader()](https://p5js.org/reference/p5/strokeShader/) : Applies a shader to the stroke (outline) of shapes, allowing independent control over the stroke rendering using shaders.
* [imageShader()](https://p5js.org/reference/p5/imageShader/) : Applies a shader to images or textures, controlling how the shader modifies their appearance during rendering.

## Examples

## Syntax

`shader(s)`

## Parameters

s

p5.Shader: [p5.Shader](https://p5js.org/reference/p5/p5.Shader/) object to apply.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L1065) and open a pull request!

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
let myShader;

function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = buildMaterialShader(material);
  noStroke();
  describe('A square with dynamically changing colors on a beige background.');
}

function material() {
  let time = millis() / 1000;
  finalColor.begin();
  let r = 0.2 + 0.5 * abs(sin(time + 0));
  let g = 0.2 + 0.5 * abs(sin(time + 1));
  let b = 0.2 + 0.5 * abs(sin(time + 2));
  finalColor.set([r, g, b, 1]);
  finalColor.end();
}

function draw() {
  background(245, 245, 220);
  shader(myShader);

  rectMode(CENTER);
  rect(0, 0, 50, 50);
}
```

```js
let fillShader;

let vertSrc = `
precision highp float;
attribute vec3 aPosition;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
varying vec3 vPosition;
void main() {
  vPosition = aPosition;
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
`;

let fragSrc = `
precision highp float;
uniform vec3 uLightPos;
uniform vec3 uFillColor;
varying vec3 vPosition;
void main() {
  float brightness = dot(normalize(uLightPos), normalize(vPosition));
  brightness = clamp(brightness, 0.0, 1.0);
  vec3 color = uFillColor * brightness;
  gl_FragColor = vec4(color, 1.0);
}
`;

function setup() {
  createCanvas(200, 200, WEBGL);
  fillShader = createShader(vertSrc, fragSrc);
  shader(fillShader);
  noStroke();
  describe('A square affected by both fill color and lighting, with lights controlled by mouse.');
}

function draw() {
  let lightPos = [(mouseX - width / 2) / width,
    (mouseY - height / 2) / height, 1.0];
  fillShader.setUniform('uLightPos', lightPos);
  let fillColor = [map(mouseX, 0, width, 0, 1),
    map(mouseY, 0, height, 0, 1), 0.5];
  fillShader.setUniform('uFillColor', fillColor);
  plane(width, height);
}
```
