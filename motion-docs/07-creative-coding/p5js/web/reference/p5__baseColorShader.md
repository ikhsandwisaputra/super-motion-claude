---
source: https://p5js.org/reference/p5/baseColorShader/
title: "baseColorShader"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

Returns the default shader used for fills when no lights or textures are activate.

Calling [`buildColorShader(shaderFunction)`](https://p5js.org/reference/p5/buildColorShader/) is equivalent to calling `baseColorShader().modify(shaderFunction)`.

Read [the `buildColorShader` reference](https://p5js.org/reference/p5/buildColorShader/) or call `baseColorShader().inspectHooks()` for more information on what you can do with the base color shader.

## Examples

## Syntax

`baseColorShader()`

## Parameters

## Returns

p5.Shader: The base color shader.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L2042) and open a pull request!

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
