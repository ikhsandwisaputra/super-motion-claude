---
source: https://rive.app/docs/scripting/api-reference/gpu/depth-stencil-attachment
title: "DepthStencilAttachment"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# DepthStencilAttachment

Depth/stencil attachment descriptor for canvas:beginRenderPass.

## Fields

### `view`

Required. Use GPUTexture:view().

### `depthLoadOp`

### `depthStoreOp`

Required; 'discard' for transient depth, 'store' to read it later.

### `depthClearValue`
