---
source: https://rive.app/docs/scripting/api-reference/gpu/render-pass-desc
title: "RenderPassDesc"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# RenderPassDesc

Render pass descriptor for canvas:beginRenderPass. Must include at
least one color attachment or a depthStencil attachment. All attachments
(color views + depth) must share one sampleCount, derived per WebGPU
rules — pass sampleCount is inferred from the views, not declared.

## Fields

### `color`

### `depthStencil`

### `label`

Names the pass in Vulkan GPU profiles and Metal or WebGPU debug captures.
