---
source: https://p5js.org/reference/p5/baseComputeShader/
title: "baseComputeShader"
fetched: 2026-10-28
---

##### This feature requires the p5.webgpu.js addon.

##### This API is experimental

Its behavior may change in a future version of p5.js.

Returns the default shader used for compute operations.

Calling [`buildComputeShader(shaderFunction)`](https://p5js.org/reference/p5/buildComputeShader/) is equivalent to calling `baseComputeShader().modify(shaderFunction)`.

Read [the `buildComputeShader` reference](https://p5js.org/reference/p5/buildComputeShader/) or call `baseComputeShader().inspectHooks()` for more information on what you can do with the base compute shader.

## Examples

## Syntax

`baseComputeShader()`

## Parameters

## Returns

p5.Shader: The base compute shader.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/p5.Renderer3D.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/p5.Renderer3D.js#L2211) and open a pull request!

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
