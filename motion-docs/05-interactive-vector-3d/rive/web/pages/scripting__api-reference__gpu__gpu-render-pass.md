---
source: https://rive.app/docs/scripting/api-reference/gpu/gpu-render-pass
title: "GPURenderPass"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# GPURenderPass

An active render pass. Issue all draw calls before calling finish().

## Methods

### `setPipeline`

```lua theme={null}
setPipeline(pipeline: GPUPipeline) -> ()
```

Bind a pipeline for subsequent draw calls.

### `setVertexBuffer`

```lua theme={null}
setVertexBuffer(slot: number, buffer: GPUBuffer) -> ()
```

Bind a vertex buffer to slot (0-based).

### `setIndexBuffer`

```lua theme={null}
setIndexBuffer(buffer: GPUBuffer, format: ('uint16' | 'uint32')?) -> ()
```

Bind an index buffer. format defaults to 'uint16'.

### `setBindGroup`

```lua theme={null}
setBindGroup(groupIndex: number, bg: GPUBindGroup, dynamicOffsets: {number}?) -> ()
```

Bind a pre-created BindGroup to a group slot.
dynamicOffsets: one byte offset per dynamic UBO in this group
(dynamic UBOs are declared with `dynamicUBOs` on
`GPUBindGroupLayout.new`; auto-derived layouts have none). Order matches the UBOs' appearance
in `BindGroupDesc.ubos`. Typical 3D pattern: shared texture
BindGroup at group 1, per-object UBO dynamic offset at group 0.

### `setViewport`

```lua theme={null}
setViewport(x: number, y: number, w: number, h: number) -> ()
```

Set the render viewport in pixels. Origin is top-left on all backends except GL (bottom-left).

### `setScissorRect`

```lua theme={null}
setScissorRect(x: number, y: number, w: number, h: number) -> ()
```

Set the scissor rectangle in pixels.

### `setStencilReference`

```lua theme={null}
setStencilReference(ref: number) -> ()
```

Set the stencil reference value.

### `setBlendColor`

```lua theme={null}
setBlendColor(r: number, g: number, b: number, a: number) -> ()
```

Set the constant blend color, 0–1 per channel, for 'constant' /
'one-minus-constant' factors.

### `draw`

```lua theme={null}
draw(vertexCount: number, instanceCount: number?, firstVertex: number?) -> ()
```

Non-indexed draw. instanceCount defaults to 1, firstVertex to 0.

### `drawIndexed`

```lua theme={null}
drawIndexed(indexCount: number, instanceCount: number?, firstIndex: number?) -> ()
```

Indexed draw. instanceCount defaults to 1, firstIndex to 0.

### `finish`

```lua theme={null}
finish() -> ()
```

Submit the pass, along with any pass begun inside it that is still
open. Any further method calls on this object will error.
