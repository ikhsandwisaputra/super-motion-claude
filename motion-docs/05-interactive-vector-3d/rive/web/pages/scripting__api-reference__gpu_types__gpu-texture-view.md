---
source: https://rive.app/docs/scripting/api-reference/gpu_types/gpu-texture-view
title: "GPUTextureView"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# GPUTextureView

A view into a GPUTexture or canvas backing store.
Used as attachment and sampler handles in render passes.

## Fields

### `format`

Pixel format of the underlying texture.
Check this when pairing an MSAA view with a resolveTarget — formats must match.
