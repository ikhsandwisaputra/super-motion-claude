---
source: https://p5js.org/reference/p5/smoothstep/
title: "smoothstep"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

A shader function that performs smooth Hermite interpolation between `0.0` and `1.0`.

This function is equivalent to the GLSL built-in `smoothstep(edge0, edge1, x)` and is available inside p5.strands shader callbacks. It is commonly used to create soft transitions, smooth edges, fades, and anti-aliased effects.

Smoothstep is useful when a threshold or cutoff is needed, but with a gradual transition instead of a hard edge.

* Returns `0.0` when `x` is less than or equal to `edge0`
* Returns `1.0` when `x` is greater than or equal to `edge1`
* Smoothly interpolates between `0.0` and `1.0` when `x` is between them

## Examples

## Syntax

`smoothstep(edge0, edge1, x)`

## Parameters

edge0

Number: Lower edge of the transition

edge1

Number: Upper edge of the transition

x

Number: Input value to interpolate

## Returns

Number: A value between `0.0` and `1.0`

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
// Example 1: A soft vertical fade using smoothstep

let fadeShader;

function fadeCallback() {
  getColor((inputs) => {
    // x goes from 0 → 1 across the canvas
    let x = inputs.texCoord.x;

    // smoothstep creates a soft transition instead of a hard edge
    let t = smoothstep(0.25, 0.35, x);

    // Use t directly as brightness
    return [t, t, t, 1];
  });
}

function setup() {
  createCanvas(300, 200, WEBGL);
  fadeShader = buildFilterShader(fadeCallback);
}

function draw() {
  background(0);
  filter(fadeShader);
}
```

```js
// Example 2: Animate the smooth transition over time

let animatedShader;

function animatedFadeCallback() {
  getColor((inputs) => {
    let x = inputs.texCoord.x;

    // Move the smoothstep band back and forth over time
    let center = 0.5 + 0.25 * sin(millis() * 0.001);
    let t = smoothstep(center - 0.05, center + 0.05, x);

    return [t, t, t, 1];
  });
}

function setup() {
  createCanvas(300, 200, WEBGL);
  animatedShader = buildFilterShader(animatedFadeCallback);
}

function draw() {
  background(0);
  filter(animatedShader);
}
```
