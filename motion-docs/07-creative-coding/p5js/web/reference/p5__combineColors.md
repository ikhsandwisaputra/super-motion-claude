---
source: https://p5js.org/reference/p5/combineColors/
title: "combineColors"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

A shader hook block that modifies how color components are combined in the fragment shader. This hook can be used inside [`buildMaterialShader()`](https://p5js.org/reference/p5/buildMaterialShader/) and similar shader [`modify()`](https://p5js.org/reference/p5.Shader/modify/) calls to control the final color output of a material. Modifications happen between the `.begin()` and `.end()` methods of the hook.

`combineColors` has the following properties:

* `baseColor`: a three-component vector representing the base color (red, green, blue).
* `diffuse`: a single number representing the diffuse reflection.
* `ambientColor`: a three-component vector representing the ambient color.
* `ambient`: a single number representing the ambient reflection.
* `specularColor`: a three-component vector representing the specular color.
* `specular`: a single number representing the specular reflection.
* `emissive`: a three-component vector representing the emissive color.
* `opacity`: a single number representing the opacity.

Call `.set()` on the hook with a vector with four components (red, green, blue, alpha) for the final color.

This hook is available in:

* [`buildMaterialShader()`](https://p5js.org/reference/p5/buildMaterialShader/)

## Examples

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
  myShader = buildMaterialShader(material);
}

function material() {
  combineColors.begin();
  // Custom color combination: add a green tint using vector properties
  combineColors.set([
    combineColors.baseColor * combineColors.diffuse +
      combineColors.ambientColor * combineColors.ambient +
      combineColors.specularColor * combineColors.specular +
      combineColors.emissive +
      [0, 0.2, 0], // Green tint
    combineColors.opacity
  ]);
  combineColors.end();
}

function draw() {
  background(255);
  shader(myShader);
  lights();
  noStroke();
  fill('white');
  sphere(50);
}
```
