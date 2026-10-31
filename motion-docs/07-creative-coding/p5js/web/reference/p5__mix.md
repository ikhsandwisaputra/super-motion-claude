---
source: https://p5js.org/reference/p5/mix/
title: "mix"
fetched: 2026-10-28
---

Performs linear interpolation between two values.

The `mix()` function linearly interpolates between two values based on a third parameter. It's a GLSL built-in function available in p5.strands shaders.

The function computes: `x * (1 - a) + y * a`

When `a` is 0.0, the function returns `x`. When `a` is 1.0, it returns `y`. Values between 0.0 and 1.0 produce a linear blend between the two values.

This function works with scalars, vectors (vec2, vec3, vec4), and can also accept a boolean for the third parameter to select between the two values.

Note: This function is only available inside shader code created with [buildMaterialShader()](https://p5js.org/reference/p5/buildMaterialShader/), [buildColorShader()](https://p5js.org/reference/p5/buildColorShader/), or similar functions. For regular p5.js code, use [lerp()](https://p5js.org/reference/p5/lerp/) instead.

## Examples

## Syntax

`mix(x, y, a)`

## Parameters

x

Number|p5.Vector: first value to interpolate from.

y

Number|p5.Vector: second value to interpolate to.

a

Number|Boolean: interpolation amount (0.0-1.0) or boolean selector.

## Returns

Number|p5.Vector: interpolated value.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/strands/p5.strands.js](https://github.com/processing/p5.js/blob/v2.3.3/src/strands/p5.strands.js#L212) and open a pull request!

---

## Related References

* [read

  Reads data from a storage buffer back into JavaScript.](https://p5js.org/reference/p5.StorageBuffer/read/)
* [set

  Updates a single element in the buffer at a given index.](https://p5js.org/reference/p5.StorageBuffer/set/)
* [update

  Updates the data in the buffer with new values.](https://p5js.org/reference/p5.StorageBuffer/update/)
* [baseColorShader

  Returns the default shader used for fills when no lights or textures are activate.](https://p5js.org/reference/p5/baseColorShader/)

## Example code (extracted)

```js
let myShader;

function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = buildMaterialShader(applyMix);
  describe('A sphere that transitions smoothly between red and blue.');
}

function applyMix() {
  let factor = uniformFloat();

  pixelInputs.begin();
  // Mix between red and blue based on factor
  let red = vec3(1, 0, 0);
  let blue = vec3(0, 0, 1);
  let mixedColor = mix(red, blue, factor);
  pixelInputs.color = vec4(mixedColor, 1);
  // Set ambient color to match to avoid default ambient lighting
  pixelInputs.ambientColor = pixelInputs.color.rgb;
  pixelInputs.end();
}

function draw() {
  background(255);
  shader(myShader);
  // Oscillate factor between 0 and 1
  let factor = (sin(frameCount * 0.02) + 1) / 2;
  myShader.setUniform('factor', factor);
  noStroke();
  sphere(80);
}
```

```js
let myShader;

function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = buildMaterialShader(positionMix);
  describe('A sphere with vertices that blend between two positions.');
}

function positionMix() {
  let time = uniformFloat();

  worldInputs.begin();
  // Blend vertex position between original and modified
  let originalPos = worldInputs.position;
  let modifiedPos = originalPos + vec3(0, sin(time * 0.001) * 20, 0);
  let factor = (sin(worldInputs.position.x * 0.1) + 1) / 2;
  worldInputs.position = mix(originalPos, modifiedPos, factor);
  worldInputs.end();
}

function draw() {
  background(220);
  shader(myShader);
  myShader.setUniform('time', millis());
  lights();
  noStroke();
  fill('red');
  sphere(70);
}
```

```js
let myShader;

function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = buildMaterialShader(gradientMix);
  describe('A torus with a color gradient created using mix().');
}

function gradientMix() {
  pixelInputs.begin();
  // Create a gradient based on texture coordinates
  let gradient = pixelInputs.texCoord.x;
  let color1 = vec3(1, 0.5, 0); // Orange
  let color2 = vec3(0.5, 0, 1); // Purple
  let mixedColor = mix(color1, color2, gradient);
  pixelInputs.color = vec4(mixedColor, 1);
  // Set ambient color to match to avoid default ambient lighting
  pixelInputs.ambientColor = pixelInputs.color.rgb;
  pixelInputs.end();
}

function draw() {
  background(200);
  shader(myShader);
  lights();
  noStroke();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(60, 20);
}
```
