---
source: https://rive.app/docs/scripting/api-reference/gpu/gpu-canvas
title: "GPUCanvas"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# GPUCanvas

A GPU canvas — a 1× presentation target, same role as a WebGPU surface
texture. Use `.image` with `renderer:drawImage()` to composite the
result. Render to it via `canvas:beginRenderPass({ color = {{ loadOp =
'clear', storeOp = 'store', ... }} })`. MSAA requires a user-allocated
`GPUTexture.new({ sampleCount = N, renderTarget = true })` as the
explicit color view, with the canvas's `colorView()` as `resolveTarget`.
Its format is always 'rgba8unorm', reported before a deferred canvas
allocates its texture.

## Fields

### `image`

Backing image for `renderer:drawImage()`.

## Methods

### `resize`

```lua theme={null}
resize(width: number, height: number) -> ()
```

Resize the canvas. Recreates the 1× backing texture. Any
user-allocated MSAA / depth textures must be recreated by the
script to match the new dimensions.

### `colorView`

```lua theme={null}
colorView() -> GPUTextureView
```

View of the canvas backing texture. Use as a color attachment, an
MSAA resolve target, or a sampler input in a subsequent pass.
