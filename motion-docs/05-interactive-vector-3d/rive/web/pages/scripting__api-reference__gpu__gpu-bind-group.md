---
source: https://rive.app/docs/scripting/api-reference/gpu/gpu-bind-group
title: "GPUBindGroup"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# GPUBindGroup

Pre-baked resource bindings reusable across many draw calls.
Avoids creating new bind groups every draw — critical for 3D scene
performance. Holds strong references to all bound resources (Buffer,
TextureView, Sampler), keeping them alive for the BindGroup's lifetime.

## Constructors

### `new`

```lua theme={null}
new(desc: BindGroupDesc) -> GPUBindGroup
```
