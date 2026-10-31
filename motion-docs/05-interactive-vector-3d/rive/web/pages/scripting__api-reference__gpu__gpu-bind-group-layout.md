---
source: https://rive.app/docs/scripting/api-reference/gpu/gpu-bind-group-layout
title: "GPUBindGroupLayout"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# GPUBindGroupLayout

Public BindGroupLayout — describes the contract a BindGroup conforms
to and a Pipeline references for one of its `@group(N)` slots.

You typically don't construct one directly. Two paths:

1. Auto (default) — omit `bindGroupLayouts` on `GPUPipeline.new` and
   retrieve via `pipeline:getBindGroupLayout(N)` for `GPUBindGroup.new`.
   Holds only what the pipeline's own entry points bind. Mirrors
   WebGPU's `layout: 'auto'`.
2. Explicit — call `GPUBindGroupLayout.new` and pass the layout to N
   pipelines via `bindGroupLayouts = { sharedLayout }`. ONE BindGroup
   then binds across all those pipelines (e.g. a per-frame
   camera/lights group reused by many materials), avoiding per-
   pipeline BindGroup duplication and reducing descriptor traffic.

## Constructors

### `new`

```lua theme={null}
new(desc: BindGroupLayoutDesc) -> GPUBindGroupLayout
```
