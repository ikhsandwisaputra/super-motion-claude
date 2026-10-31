---
source: https://p5js.org/reference/p5/createShader/
title: "createShader"
fetched: 2026-10-28
---

Creates a new [p5.Shader](https://p5js.org/reference/p5/p5.Shader) object using GLSL.

If you are interested in writing shaders, consider using p5.strands shaders using [`buildMaterialShader`](https://p5js.org/reference/p5/buildMaterialShader/),[`buildStrokeShader`](https://p5js.org/reference/p5/buildStrokeShader/), or [`buildFilterShader`](https://p5js.org/reference/p5/buildFilterShader/). With p5.strands, you can modify existing shaders using JavaScript. With `createShader`, shaders are made from scratch, and are written in GLSL. This will be most useful for advanced cases, and for authors of add-on libraries.

Shaders are programs that run on the graphics processing unit (GPU). They can process many pixels at the same time, making them fast for many graphics tasks.

Once the [p5.Shader](https://p5js.org/reference/p5/p5.Shader) object is created, it can be used with the [shader()](https://p5js.org/reference/p5/shader/) function, as in `shader(myShader)`. A GLSL shader program consists of two parts, a vertex shader and a fragment shader. The vertex shader affects where 3D geometry is drawn on the screen and the fragment shader affects color.

The first parameter, `vertSrc`, sets the vertex shader. It’s a string that contains the vertex shader program written in GLSL.

The second parameter, `fragSrc`, sets the fragment shader. It’s a string that contains the fragment shader program written in GLSL.

Here is a simple example with a simple vertex shader that applies whatevre transformations have been set, and a simple fragment shader that ignores all material settings and just outputs yellow:

Fragment shaders are often the fastest way to dynamically create per-pixel textures. Here is an example of a fractal being drawn in the fragment shader. It also creates custom uniform variables in the shader, which can be set from your main sketch code. By passing the time in as a uniform, we can animate the fractal in the shader.

A shader can optionally describe hooks, which are functions in GLSL that users may choose to provide to customize the behavior of the shader using the [`modify()`](https://p5js.org/reference/p5.Shader/modify/) method of `p5.Shader`. Users can write their modifications using p5.strands, without needing to learn GLSL.

These are added by describing the hooks in a third parameter, `options`, and referencing the hooks in your `vertSrc` or `fragSrc`. Hooks for the vertex or fragment shader are described under the `vertex` and `fragment` keys of `options`. Each one is an object. where each key is the type and name of a hook function, and each value is a string with the parameter list and default implementation of the hook. For example, to let users optionally run code at the start of the vertex shader, the options object could include:

```js
{
  vertex: {
    'void beforeVertex': '() {}'
  }
}
```

Then, in your vertex shader source, you can run a hook by calling a function with the same name prefixed by `HOOK_`. If you want to check if the default hook has been replaced, maybe to avoid extra overhead, you can check if the same name prefixed by `AUGMENTED_HOOK_` has been defined:

```glsl
void main() {
  // In most cases, just calling the hook is fine:
  HOOK_beforeVertex();

  // Alternatively, for more efficiency:
  #ifdef AUGMENTED_HOOK_beforeVertex
  HOOK_beforeVertex();
  #endif

  // Add the rest of your shader code here!
}
```

Then, a user of your shader can modify it with p5.strands. Here is what that looks like when we put everything together:

Note: Only filter shaders can be used in 2D mode. All shaders can be used in WebGL mode.

## Examples

## Syntax

`createShader(vertSrc, fragSrc, [options])`

## Parameters

vertSrc

String: source code for the vertex shader.

fragSrc

String: source code for the fragment shader.

options

Object: An optional object describing how this shader can be augmented with hooks. It can include:

## Returns

p5.Shader: new shader object created from the vertex and fragment shaders.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L450) and open a pull request!

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
precision highp float;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
`;

// Create a string with the fragment shader program.
// The fragment shader is called for each pixel.
let fragSrc = `
precision highp float;

void main() {
  // Set each pixel's RGBA value to yellow.
  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}
`;

function setup() {
  createCanvas(100, 100, WEBGL);

  // Create a p5.Shader object.
  let shaderProgram = createShader(vertSrc, fragSrc);

  // Compile and apply the p5.Shader object.
  shader(shaderProgram);

  // Style the drawing surface.
  noStroke();

  // Add a plane as a drawing surface.
  plane(100, 100);

  describe('A yellow square.');
}
```

```js
// Create a string with the vertex shader program.
// The vertex shader is called for each vertex.
let vertSrc = `
precision highp float;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
`;

// Create a string with the fragment shader program.
// The fragment shader is called for each pixel.
let fragSrc = `
precision highp float;
uniform vec2 p;
uniform float r;
const int numIterations = 500;
varying vec2 vTexCoord;

void main() {
  vec2 c = p + gl_FragCoord.xy * r;
  vec2 z = c;
  float n = 0.0;

  for (int i = numIterations; i > 0; i--) {
    if (z.x * z.x + z.y * z.y > 4.0) {
      n = float(i) / float(numIterations);
      break;
    }

    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
  }

  gl_FragColor = vec4(
    0.5 - cos(n * 17.0) / 2.0,
    0.5 - cos(n * 13.0) / 2.0,
    0.5 - cos(n * 23.0) / 2.0,
    1.0
  );
}
`;

let mandelbrot;

function setup() {
  createCanvas(100, 100, WEBGL);

  // Create a p5.Shader object.
  mandelbrot = createShader(vertSrc, fragSrc);

  // Apply the p5.Shader object.
  shader(mandelbrot);

  // Set the shader uniform p to an array.
  // p is the center point of the Mandelbrot image.
  mandelbrot.setUniform('p', [-0.74364388703, 0.13182590421]);

  describe('A fractal image zooms in and out of focus.');
}

function draw() {
  // Set the shader uniform r to a value that oscillates
  // between 0 and 0.005.
  // r is the size of the image in Mandelbrot-space.
  let radius = 0.005 * (sin(frameCount * 0.01) + 1);
  mandelbrot.setUniform('r', radius);

  // Add a plane as a drawing surface.
  noStroke();
  plane(100, 100);
}
```

```js
// A shader with hooks.
let myShader;

// A shader with modified hooks.
let modifiedShader;

// Create a string with the vertex shader program.
// The vertex shader is called for each vertex.
let vertSrc = `
precision highp float;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

attribute vec3 aPosition;
attribute vec2 aTexCoord;

void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
`;

// Create a fragment shader that uses a hook.
let fragSrc = `
precision highp float;
void main() {
  // Let users override the color
  gl_FragColor = HOOK_getColor(vec4(1., 0., 0., 1.));
}
`;

function setup() {
  createCanvas(100, 100, WEBGL);

  // Create a shader with hooks. By default, this hook returns
  // the initial value.
  myShader = createShader(vertSrc, fragSrc, {
    fragment: {
      'vec4 getColor': '(vec4 color) { return color; }'
    }
  });

  // Make a version of the shader with a hook overridden
  modifiedShader = myShader.modify(() => {
    // Create new uniforms and override the getColor hook
    let t = millis() / 1000;
    getColor(() => {
      return [0, 0.5 + 0.5 * sin(t), 1, 1];
    });
  });
}

function draw() {
  noStroke();

  push();
  shader(myShader);
  translate(-width/3, 0);
  sphere(20);
  pop();

  push();
  shader(modifiedShader);
  translate(width/3, 0);
  sphere(20);
  pop();
}
```
