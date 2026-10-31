---
source: https://p5js.org/reference/p5/instanceID/
title: "instanceID"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

##### Warning

Use [`instanceIndex`](https://p5js.org/reference/p5/instanceID/#/p5/instanceIndex) instead.

A function alias for [`instanceIndex`](https://p5js.org/reference/p5/instanceIndex/), kept for compatibility. Prefer using [`instanceIndex`](https://p5js.org/reference/p5/instanceIndex/) directly as a value instead.

Returns the index of the current instance when drawing multiple copies of a shape with [`model(count)`](https://p5js.org/reference/p5/model/).

`instanceID()` can only be used inside a p5.strands shader callback.

## Examples

## Syntax

`instanceID()`

## Parameters

## Returns

The index of the current instance.

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
