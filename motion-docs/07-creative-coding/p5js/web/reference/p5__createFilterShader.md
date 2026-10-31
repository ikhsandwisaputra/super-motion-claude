---
source: https://p5js.org/reference/p5/createFilterShader/
title: "createFilterShader"
fetched: 2026-10-28
---

Creates a [p5.Shader](https://p5js.org/reference/p5/p5.Shader) object to be used with the [filter()](https://p5js.org/reference/p5/filter/) function using GLSL.

Since this method requires you to write your shaders in GLSL, it is most suitable for advanced use cases. Consider using [`buildFilterShader`](https://p5js.org/reference/p5/buildFilterShader/) first, as a way to create filters in JavaScript using p5.strands.

`createFilterShader()` works like [createShader()](https://p5js.org/reference/p5/createShader/) but has a default vertex shader included. `createFilterShader()` is intended to be used along with [filter()](https://p5js.org/reference/p5/filter/) for filtering the contents of a canvas. A filter shader will be applied to the whole canvas instead of just [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry) objects.

The parameter, `fragSrc`, sets the fragment shader. It’s a string that contains the fragment shader program written in [GLSL](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders/).

The [p5.Shader](https://p5js.org/reference/p5/p5.Shader) object that's created has some uniforms that can be set:

* `sampler2D tex0`, which contains the canvas contents as a texture.
* `vec2 canvasSize`, which is the width and height of the canvas, not including pixel density.
* `vec2 texelSize`, which is the size of a physical pixel including pixel density. This is calculated as `1.0 / (width * density)` for the pixel width and `1.0 / (height * density)` for the pixel height.

The [p5.Shader](https://p5js.org/reference/p5/p5.Shader) that's created also provides `varying vec2 vTexCoord`, a coordinate with values between 0 and 1. `vTexCoord` describes where on the canvas the pixel will be drawn.

For more info about filters and shaders, see Adam Ferriss' [repo of shader examples](https://github.com/aferriss/p5jsShaderExamples/) or the [Introduction to Shaders](https://p5js.org/learn/getting-started-in-webgl-shaders.html) tutorial.

## Examples

## Syntax

`createFilterShader(fragSrc)`

## Parameters

fragSrc

String: source code for the fragment shader.

## Returns

p5.Shader: new shader object created from the fragment shader.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L832) and open a pull request!

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
function setup() {
  let fragSrc = `precision highp float;
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  }`;

  createCanvas(100, 100, WEBGL);
  let s = createFilterShader(fragSrc);
  filter(s);
  describe('a yellow canvas');
}
```

```js
let img, s;
async function setup() {
  img = await loadImage('/assets/bricks.jpg');
  let fragSrc = `precision highp float;

  // x,y coordinates, given from the vertex shader
  varying vec2 vTexCoord;

  // the canvas contents, given from filter()
  uniform sampler2D tex0;
  // other useful information from the canvas
  uniform vec2 texelSize;
  uniform vec2 canvasSize;
  // a custom variable from this sketch
  uniform float darkness;

  void main() {
    // get the color at current pixel
    vec4 color = texture2D(tex0, vTexCoord);
    // set the output color
    color.b = 1.0;
    color *= darkness;
    gl_FragColor = vec4(color.rgb, 1.0);
  }`;

  createCanvas(100, 100, WEBGL);
  s = createFilterShader(fragSrc);
}

function draw() {
  image(img, -50, -50);
  s.setUniform('darkness', 0.5);
  filter(s);
  describe('a image of bricks tinted dark blue');
}
```
