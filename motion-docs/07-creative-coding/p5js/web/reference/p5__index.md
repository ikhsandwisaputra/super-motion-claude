---
source: https://p5js.org/reference/p5/index/
title: "index"
fetched: 2026-10-28
---

##### This feature requires the p5.webgpu.js addon.

##### This API is experimental

Its behavior may change in a future version of p5.js.

Information about the current iteration of a compute shader.

Use it inside a [`buildComputeShader()`](https://p5js.org/reference/p5/buildComputeShader/) function to write a loop that runs in parallel on the GPU.

`index` is a three-component vector with the current index across all dimensions passed to [`compute()`](https://p5js.org/reference/p5/compute/). For example, use `index.x` to get the index when looping in one dimension.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/p5.Renderer3D.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/p5.Renderer3D.js#L2574) and open a pull request!

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
