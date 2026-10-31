---
source: https://rive.app/docs/scripting/api-reference/gpu/gpu-sampler
title: "GPUSampler"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# GPUSampler

GPUTextureView is declared in the shared "rive/gpu\_types" builtin
(loaded before rive/image) so that a single nominal type is used
everywhere — both Image:view() and GPU render-pass APIs.
Describes how a texture is sampled in a shader.

## Constructors

### `new`

```lua theme={null}
new(desc: {min: Filter?, mag: Filter?, mipmap: Filter?, wrapU: WrapMode?, wrapV: WrapMode?, compare: CompareFunction?, maxAnisotropy: number?,}?) -> GPUSampler
```
