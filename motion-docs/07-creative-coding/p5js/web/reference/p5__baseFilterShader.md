---
source: https://p5js.org/reference/p5/baseFilterShader/
title: "baseFilterShader"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

Returns the base shader used for filters.

Calling [`buildFilterShader(shaderFunction)`](https://p5js.org/reference/p5/buildFilterShader/) is equivalent to calling `baseFilterShader().modify(shaderFunction)`.

Read [the `buildFilterShader` reference](https://p5js.org/reference/p5/buildFilterShader/) or call `baseFilterShader().inspectHooks()` for more information on what you can do with the base filter shader.

## Examples

## Syntax

`baseFilterShader()`

## Parameters

## Returns

p5.Shader: The base filter shader.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L1681) and open a pull request!

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
