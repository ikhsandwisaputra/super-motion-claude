---
source: https://p5js.org/reference/p5/strokeShader/
title: "strokeShader"
fetched: 2026-10-28
---

Sets the [p5.Shader](https://p5js.org/reference/p5/p5.Shader) object to apply for strokes.

This method applies the given shader to strokes, allowing customization of how lines and outlines are drawn in 3D space. The shader will be used for strokes until [resetShader()](https://p5js.org/reference/p5/resetShader/) is called or another strokeShader is applied.

The shader will be used for:

* Strokes only, regardless of whether the uniform `uStrokeWeight` is present.

To further customize its behavior, refer to the various hooks provided by the [baseStrokeShader()](https://p5js.org/reference/p5/baseStrokeShader/) method, which allow control over stroke weight, vertex positions, colors, and more.

## Examples

## Syntax

`strokeShader(s)`

## Parameters

s

p5.Shader: [p5.Shader](https://p5js.org/reference/p5/p5.Shader/) object to apply for strokes.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L1229) and open a pull request!

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
let animatedStrokeShader;

let vertSrc = `
precision mediump int;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float uStrokeWeight;

uniform bool uUseLineColor;
uniform vec4 uMaterialColor;

uniform vec4 uViewport;
uniform int uPerspective;
uniform int uStrokeJoin;

attribute vec4 aPosition;
attribute vec3 aTangentIn;
attribute vec3 aTangentOut;
attribute float aSide;
attribute vec4 aVertexColor;

void main() {
  vec4 posp = uModelViewMatrix * aPosition;
  vec4 posqIn = uModelViewMatrix * (aPosition + vec4(aTangentIn, 0));
  vec4 posqOut = uModelViewMatrix * (aPosition + vec4(aTangentOut, 0));

  float facingCamera = pow(
    abs(normalize(posqIn-posp).z),
    0.25
  );

  float scale = mix(1., 0.995, facingCamera);

  posp.xyz = posp.xyz * scale;
  posqIn.xyz = posqIn.xyz * scale;
  posqOut.xyz = posqOut.xyz * scale;

  vec4 p = uProjectionMatrix * posp;
  vec4 qIn = uProjectionMatrix * posqIn;
  vec4 qOut = uProjectionMatrix * posqOut;

  vec2 tangentIn = normalize((qIn.xy*p.w - p.xy*qIn.w) * uViewport.zw);
  vec2 tangentOut = normalize((qOut.xy*p.w - p.xy*qOut.w) * uViewport.zw);

  vec2 curPerspScale;
  if(uPerspective == 1) {
    curPerspScale = (uProjectionMatrix * vec4(1, sign(uProjectionMatrix[1][1]), 0, 0)).xy;
  } else {
    curPerspScale = p.w / (0.5 * uViewport.zw);
  }

  vec2 offset;
  vec2 tangent = aTangentIn == vec3(0.) ? tangentOut : tangentIn;
  vec2 normal = vec2(-tangent.y, tangent.x);
  float normalOffset = sign(aSide);
  float tangentOffset = abs(aSide) - 1.;
  offset = (normal * normalOffset + tangent * tangentOffset) *
    uStrokeWeight * 0.5;

  gl_Position.xy = p.xy + offset.xy * curPerspScale;
  gl_Position.zw = p.zw;
}
`;

let fragSrc = `
precision mediump float;
uniform float uTime;

void main() {
  float wave = sin(gl_FragCoord.x * 0.1 + uTime) * 0.5 + 0.5;
  gl_FragColor = vec4(wave, 0.5, 1.0, 1.0);  // Animated color based on time
}
`;

function setup() {
  createCanvas(200, 200, WEBGL);
  animatedStrokeShader = createShader(vertSrc, fragSrc);
  strokeShader(animatedStrokeShader);
  strokeWeight(4);

  describe('A hollow cube rotating continuously with its stroke colors changing dynamically over time against a static gray background.');
}

function draw() {
  animatedStrokeShader.setUniform('uTime', millis() / 1000.0);
  background(250);
  rotateY(frameCount * 0.02);
  noFill();
  orbitControl();
  box(50);
}
```

```js
let myShader;

function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = baseStrokeShader().modify({
    'float random': `(vec2 p) {
      vec3 p3  = fract(vec3(p.xyx) * .1471);
      p3 += dot(p3, p3.yzx + 32.33);
      return fract((p3.x + p3.y) * p3.z);
    }`,
    'Inputs getPixelInputs': `(Inputs inputs) {
      // Modify alpha with dithering effect
      float a = inputs.color.a;
      inputs.color.a = 1.0;
      inputs.color *= random(inputs.position.xy) > a ? 0.0 : 1.0;
      return inputs;
    }`
  });
}

function draw() {
  background(255);
  strokeShader(myShader);
  strokeWeight(12);
  beginShape();
  for (let i = 0; i <= 50; i++) {
    stroke(
      map(i, 0, 50, 150, 255),
      100 + 155 * sin(i / 5),
      255 * map(i, 0, 50, 1, 0)
    );
    vertex(
      map(i, 0, 50, 1, -1) * width / 3,
      50 * cos(i / 10 + frameCount / 80)
    );
  }
  endShape();
}
```
