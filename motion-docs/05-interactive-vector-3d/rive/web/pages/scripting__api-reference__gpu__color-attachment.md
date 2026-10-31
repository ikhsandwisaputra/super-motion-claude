---
source: https://rive.app/docs/scripting/api-reference/gpu/color-attachment
title: "ColorAttachment"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# ColorAttachment

Color attachment descriptor for canvas:beginRenderPass.

## Fields

### `view`

Optional render target view. Defaults to the receiving target's
own `view` when omitted. Provide an explicit view for cases
where the target differs — most commonly MSAA, where `view` is the
multisampled GPUTexture:view() and `resolveTarget` is the canvas's
1× colorView().

### `resolveTarget`

1× resolve target for MSAA (formats must match `view`).

### `loadOp`

### `storeOp`

Required; 'discard' after MSAA resolve, 'store' otherwise.

### `clearColor`
