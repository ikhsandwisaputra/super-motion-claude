---
source: https://p5js.org/reference/p5/vertexProperty/
title: "vertexProperty"
fetched: 2026-10-28
---

Sets the shader's vertex property or attribute variables.

A vertex property, or vertex attribute, is a variable belonging to a vertex in a shader. p5.js provides some default properties, such as `aPosition`, `aNormal`, `aVertexColor`, etc. These are set using [vertex()](https://p5js.org/reference/p5/vertex/), [normal()](https://p5js.org/reference/p5/normal/) and [fill()](https://p5js.org/reference/p5/fill/) respectively. Custom properties can also be defined within [beginShape()](https://p5js.org/reference/p5/beginShape/) and [endShape()](https://p5js.org/reference/p5/endShape/).

The first parameter, `propertyName`, is a string with the property's name. This is the same variable name which should be declared in the shader, such as `in vec3 aProperty`, similar to .`setUniform()`.

The second parameter, `data`, is the value assigned to the shader variable. This value will be applied to subsequent vertices created with [vertex()](https://p5js.org/reference/p5/vertex/). It can be a Number or an array of numbers, and in the shader program the type can be declared according to the WebGL specification. Common types include `float`, `vec2`, `vec3`, `vec4` or matrices.

See also the [vertexProperty()](https://p5js.org/reference/p5/vertexProperty/) method on [Geometry](https://p5js.org/reference/p5/Geometry/) objects.

## Examples

## Syntax

`vertexProperty(attributeName, data)`

## Parameters

attributeName

String: the name of the vertex attribute.

data

Number|Number[]: the data tied to the vertex attribute.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/vertex.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/vertex.js#L1186) and open a pull request!

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
const vertSrc = `#version 300 es
 precision mediump float;
 uniform mat4 uModelViewMatrix;
 uniform mat4 uProjectionMatrix;

 in vec3 aPosition;
 in vec2 aOffset;

 void main(){
   vec4 positionVec4 = vec4(aPosition.xyz, 1.0);
   positionVec4.xy += aOffset;
   gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
 }
`;

const fragSrc = `#version 300 es
 precision mediump float;
 out vec4 outColor;
 void main(){
   outColor = vec4(0.0, 1.0, 1.0, 1.0);
 }
`;

function setup(){
  createCanvas(100, 100, WEBGL);

  // Create and use the custom shader.
  const myShader = createShader(vertSrc, fragSrc);
  shader(myShader);

  describe('A wobbly, cyan circle on a gray background.');
}

function draw(){
  // Set the styles
  background(125);
  noStroke();

  // Draw the circle.
  beginShape();
  for (let i = 0; i < 30; i++){
    const x = 40 * cos(i/30 * TWO_PI);
    const y = 40 * sin(i/30 * TWO_PI);

    // Apply some noise to the coordinates.
    const xOff = 10 * noise(x + millis()/1000) - 5;
    const yOff = 10 * noise(y + millis()/1000) - 5;

    // Apply these noise values to the following vertex.
    vertexProperty('aOffset', [xOff, yOff]);
    vertex(x, y);
  }
  endShape(CLOSE);
}
```

```js
let myShader;
const cols = 10;
const rows = 10;
const cellSize = 6;

const vertSrc = `#version 300 es
  precision mediump float;
  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelViewMatrix;

  in vec3 aPosition;
  in vec3 aNormal;
  in vec3 aVertexColor;
  in float aDistance;

  out vec3 vVertexColor;

  void main(){
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xyz += aDistance * aNormal * 2.0;;
    vVertexColor = aVertexColor;
    gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
  }
`;

const fragSrc = `#version 300 es
  precision mediump float;

  in vec3 vVertexColor;
  out vec4 outColor;

  void main(){
    outColor = vec4(vVertexColor, 1.0);
  }
`;

function setup(){
  createCanvas(100, 100, WEBGL);

  // Create and apply the custom shader.
  myShader = createShader(vertSrc, fragSrc);
  shader(myShader);
  noStroke();
  describe('A blue grid, which moves away from the mouse position, on a gray background.');
}

function draw(){
  background(200);

  // Draw the grid in the middle of the screen.
  translate(-cols*cellSize/2, -rows*cellSize/2);
  beginShape(QUADS);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      // Calculate the cell position.
      let x = i * cellSize;
      let y = j * cellSize;

      fill(j/rows*255, j/cols*255, 255);

      // Calculate the distance from the corner of each cell to the mouse.
      let distance = dist(x, y, mouseX, mouseY);

      // Send the distance to the shader.
      vertexProperty('aDistance', min(distance, 100));

      vertex(x, y);
      vertex(x + cellSize, y);
      vertex(x + cellSize, y + cellSize);
      vertex(x, y + cellSize);
    }
  }
  endShape();
}
```
