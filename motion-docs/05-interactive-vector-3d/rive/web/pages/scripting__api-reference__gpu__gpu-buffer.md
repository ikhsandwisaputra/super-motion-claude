---
source: https://rive.app/docs/scripting/api-reference/gpu/gpu-buffer
title: "GPUBuffer"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# GPUBuffer

A GPU buffer for vertex, index, or uniform data.

## Fields

### `size`

Size in bytes.

## Constructors

### `new`

```lua theme={null}
new(desc: GPUBufferDesc) -> GPUBuffer
```

## Methods

### `write`

```lua theme={null}
write(data: buffer, offset: number?, srcOffset: number?, byteLength: number?) -> ()
```

Copy CPU data into the buffer.
@param data       Source bytes.
@param offset     Byte offset into the GPU buffer (default 0).
@param srcOffset  Byte offset into `data` to copy from (default 0).
@param byteLength Bytes to copy (default: the rest of `data` from
`srcOffset`). Lets a script upload a prefix of an
oversized staging buffer without slicing it.
