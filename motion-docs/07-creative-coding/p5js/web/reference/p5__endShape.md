---
source: https://p5js.org/reference/p5/endShape/
title: "endShape"
fetched: 2026-10-28
---

Concludes the vertices of a custom shape.

The [beginShape()](https://p5js.org/reference/p5/beginShape/) and `endShape()` functions allow for creating custom shapes in 2D or 3D. [beginShape()](https://p5js.org/reference/p5/beginShape/) begins adding vertices to a custom shape and `endShape()` stops adding them.

The first parameter, `mode`, is optional. By default, the first and last vertices of a shape aren't connected. If the constant `CLOSE` is passed, as in `endShape(CLOSE)`, then the first and last vertices will be connected. When CLOSE mode is used for splines (with `splineVeertex()`), the shape is ended smoothly.

The second parameter, `count`, is also optional. In WebGL mode, it’s more efficient to draw many copies of the same shape using a technique called [instancing](https://webglfundamentals.org/webgl/lessons/webgl-instanced-drawing.html). The `count` parameter tells WebGL mode how many copies to draw. For example, calling `endShape(CLOSE, 400)` after drawing a custom shape will make it efficient to draw 400 copies. This feature requires [writing a custom shader](https://p5js.org/tutorials/intro-to-shaders/).

After calling [beginShape()](https://p5js.org/reference/p5/beginShape/), shapes can be built by calling [vertex()](https://p5js.org/reference/p5/vertex/), [bezierVertex()](https://p5js.org/reference/p5/bezierVertex/) and/or [splineVertex()](https://p5js.org/reference/p5/splineVertex/). Calling `endShape()` will stop adding vertices to the shape. Each shape will be outlined with the current stroke color and filled with the current fill color.

Transformations such as [translate()](https://p5js.org/reference/p5/translate/), [rotate()](https://p5js.org/reference/p5/rotate/), and [scale()](https://p5js.org/reference/p5/scale/) don't work between [beginShape()](https://p5js.org/reference/p5/beginShape/) and `endShape()`. It's also not possible to use other shapes, such as [ellipse()](https://p5js.org/reference/p5/ellipse/) or [rect()](https://p5js.org/reference/p5/rect/), between [beginShape()](https://p5js.org/reference/p5/beginShape/) and `endShape()`.

## Examples

## Syntax

`endShape([mode], [count])`

## Parameters

mode

CLOSE: use CLOSE to close the shape

count

Integer: number of times you want to draw/instance the shape (for WebGL mode).

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/vertex.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/vertex.js#L836) and open a pull request!

---

## Related References

* [beginContour

  Begins creating a hole within a flat shape.](https://p5js.org/reference/p5/beginContour/)
* [beginShape

  Begins adding vertices to a custom shape.](https://p5js.org/reference/p5/beginShape/)
* [bezierOrder

  Influences the shape of the Bézier curve segment in a custom shape.](https://p5js.org/reference/p5/bezierOrder/)
* [bezierVertex

  Adds a Bézier curve segment to a custom shape.](https://p5js.org/reference/p5/bezierVertex/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the shapes.
  noFill();

  // Left triangle.
  beginShape();
  vertex(20, 20);
  vertex(45, 20);
  vertex(45, 80);
  endShape(CLOSE);

  // Right triangle.
  beginShape();
  vertex(50, 20);
  vertex(75, 20);
  vertex(75, 80);
  endShape();

  describe(
    'Two sets of black lines drawn on a gray background. The three lines on the left form a right triangle. The two lines on the right form a right angle.'
  );
}
```

```js
function setup() {
  createCanvas(200, 100);

  background(240);

  noFill();
  stroke(0);

  // Open shape (left)
  beginShape();
  vertex(20, 20);
  vertex(80, 20);
  vertex(80, 80);
  endShape();  // Not closed

  // Closed shape (right)
  beginShape();
  vertex(120, 20);
  vertex(180, 20);
  vertex(180, 80);
  endShape(CLOSE);  // Closed

  describe(
    'Two right-angled shapes on a light gray background. The left shape is open with three lines. The right shape is closed, forming a triangle.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);
  background(200);

  beginShape();

  splineVertex(32, 91);
  splineVertex(21, 17);
  splineVertex(68, 19);
  splineVertex(82, 91);

  endShape(CLOSE);

  describe(
    'A curvy four-sided slightly lopsided blob.'
  );
}
```

```js
// Note: A "uniform" is a global variable within a shader program.

// Create a string with the vertex shader program.
// The vertex shader is called for each vertex.
let vertSrc = `#version 300 es

precision mediump float;

in vec3 aPosition;
flat out int instanceID;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {

  // Copy the instance ID to the fragment shader.
  instanceID = gl_InstanceID;
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // gl_InstanceID represents a numeric value for each instance.
  // Using gl_InstanceID allows us to move each instance separately.
  // Here we move each instance horizontally by ID * 23.
  float xOffset = float(gl_InstanceID) * 23.0;

  // Apply the offset to the final position.
  gl_Position = uProjectionMatrix * uModelViewMatrix * (positionVec4 -
    vec4(xOffset, 0.0, 0.0, 0.0));
}
`;

// Create a string with the fragment shader program.
// The fragment shader is called for each pixel.
let fragSrc = `#version 300 es

precision mediump float;

out vec4 outColor;
flat in int instanceID;
uniform float numInstances;

void main() {
  vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
  vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);

  // Normalize the instance ID.
  float normId = float(instanceID) / numInstances;

  // Mix between two colors using the normalized instance ID.
  outColor = mix(red, blue, normId);
}
`;

function setup() {
  createCanvas(100, 100, WEBGL);

  // Create a p5.Shader object.
  let myShader = createShader(vertSrc, fragSrc);

  background(220);

  // Compile and apply the p5.Shader.
  shader(myShader);

  // Set the numInstances uniform.
  myShader.setUniform('numInstances', 4);

  // Translate the origin to help align the drawing.
  translate(25, -10);

  // Style the shapes.
  noStroke();

  // Draw the shapes.
  beginShape();
  vertex(0, 0);
  vertex(0, 20);
  vertex(20, 20);
  vertex(20, 0);
  vertex(0, 0);
  endShape(CLOSE, 4);

  describe('A row of four squares. Their colors transition from purple on the left to red on the right');
}
```
