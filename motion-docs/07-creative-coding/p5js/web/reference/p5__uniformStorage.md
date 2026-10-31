---
source: https://p5js.org/reference/p5/uniformStorage/
title: "uniformStorage"
fetched: 2026-10-28
---

##### This feature requires the p5.webgpu.js addon.

##### This API is experimental

Its behavior may change in a future version of p5.js.

Declares a storage buffer uniform inside a [modify()](https://p5js.org/reference/p5.Shader/modify/) callback, making a [createStorage()](https://p5js.org/reference/p5/createStorage/) buffer accessible in the shader.

Pass a `p5.StorageBuffer` (or a function returning one) as the second argument to set it as the default value, applied automatically each frame. Pass a plain object with the same field layout as the buffer's struct elements to declare the schema without binding a specific buffer.

When called without a name, p5.strands automatically uses the name of the variable it is assigned to as the uniform name.

Note: `uniformStorage` is only available when using p5.strands.

## Examples

## Syntax

`uniformStorage(name, [bufferOrSchema])``uniformStorage([bufferOrSchema])`

## Parameters

name

String: The name of the storage buffer uniform in the shader.

bufferOrSchema

p5.StorageBuffer|Function|Object: A storage buffer to bind, a function returning a storage buffer (called each frame), or a plain object describing the struct field layout.

## Returns

A strands node representing the storage buffer.

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
