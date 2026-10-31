---
source: https://p5js.org/reference/p5/loadShader/
title: "loadShader"
fetched: 2026-10-28
---

Loads vertex and fragment shaders to create a [p5.Shader](https://p5js.org/reference/p5/p5.Shader) object.

Shaders are programs that run on the graphics processing unit (GPU). They can process many pixels at the same time, making them fast for many graphics tasks. They’re written in a language called [GLSL](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders/) and run along with the rest of the code in a sketch.

Once the [p5.Shader](https://p5js.org/reference/p5/p5.Shader) object is created, it can be used with the [shader()](https://p5js.org/reference/p5/shader/) function, as in `shader(myShader)`. A shader program consists of two files, a vertex shader and a fragment shader. The vertex shader affects where 3D geometry is drawn on the screen and the fragment shader affects color.

`loadShader()` loads the vertex and fragment shaders from their `.vert` and `.frag` files. For example, calling `loadShader('/assets/shader.vert', '/assets/shader.frag')` loads both required shaders and returns a [p5.Shader](https://p5js.org/reference/p5/p5.Shader) object.

The third parameter, `successCallback`, is optional. If a function is passed, it will be called once the shader has loaded. The callback function can use the new [p5.Shader](https://p5js.org/reference/p5/p5.Shader) object as its parameter. The return value of the `successCallback()` function will be used as the final return value of `loadShader()`.

The fourth parameter, `failureCallback`, is also optional. If a function is passed, it will be called if the shader fails to load. The callback function can use the event error as its parameter. The return value of the `failureCallback()` function will be used as the final return value of `loadShader()`.

This function returns a `Promise` and should be used in an `async` setup with `await`. See the examples for the usage syntax.

Note: Shaders can only be used in WebGL mode.

## Examples

## Syntax

`loadShader(vertFilename, fragFilename, [successCallback], [failureCallback])`

## Parameters

vertFilename

String|Request: path of the vertex shader to be loaded.

fragFilename

String|Request: path of the fragment shader to be loaded.

successCallback

Function: function to call once the shader is loaded. Can be passed the [p5.Shader](https://p5js.org/reference/p5/p5.Shader/) object.

failureCallback

Function: function to call if the shader fails to load. Can be passed an `Error` event object.

## Returns

Promise<p5.Shader>: new shader created from the vertex and fragment shader files.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L129) and open a pull request!

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
// Note: A "uniform" is a global variable within a shader program.

let mandelbrot;

// Load the shader and create a p5.Shader object.
async function setup() {
  mandelbrot = await loadShader('/assets/shader.vert', '/assets/shader.frag');

  createCanvas(100, 100, WEBGL);

  // Compile and apply the p5.Shader object.
  shader(mandelbrot);

  // Set the shader uniform p to an array.
  mandelbrot.setUniform('p', [-0.74364388703, 0.13182590421]);

  // Set the shader uniform r to the value 1.5.
  mandelbrot.setUniform('r', 1.5);

  // Add a quad as a display surface for the shader.
  quad(-1, -1, 1, -1, 1, 1, -1, 1);

  describe('A black fractal image on a magenta background.');
}
```

```js
// Note: A "uniform" is a global variable within a shader program.

let mandelbrot;

// Load the shader and create a p5.Shader object.
async function setup() {
  mandelbrot = await loadShader('/assets/shader.vert', '/assets/shader.frag');

  createCanvas(100, 100, WEBGL);

  // Use the p5.Shader object.
  shader(mandelbrot);

  // Set the shader uniform p to an array.
  mandelbrot.setUniform('p', [-0.74364388703, 0.13182590421]);

  describe('A fractal image zooms in and out of focus.');
}

function draw() {
  // Set the shader uniform r to a value that oscillates between 0 and 2.
  mandelbrot.setUniform('r', sin(frameCount * 0.01) + 1);

  // Add a quad as a display surface for the shader.
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
```
