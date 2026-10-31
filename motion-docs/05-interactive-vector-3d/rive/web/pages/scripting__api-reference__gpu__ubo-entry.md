---
source: https://rive.app/docs/scripting/api-reference/gpu/ubo-entry
title: "UBOEntry"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# UBOEntry

An entry binding a uniform buffer into a BindGroup.
Dynamic-offset UBOs are declared on the layout, by listing their
bindings in `dynamicUBOs` of `GPUBindGroupLayout.new`, matching
WebGPU/Vulkan's layout-level ownership model.
`size` defaults to the rest of the buffer past `offset`. The bound range
must cover the shader's uniform block or GPUBindGroup.new errors.

## Fields

### `slot`

### `buffer`

### `offset`

### `size`
