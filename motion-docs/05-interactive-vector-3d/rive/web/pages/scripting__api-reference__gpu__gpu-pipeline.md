---
source: https://rive.app/docs/scripting/api-reference/gpu/gpu-pipeline
title: "GPUPipeline"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# GPUPipeline

A compiled GPU render pipeline (shaders + fixed-function state).

## Constructors

### `new`

```lua theme={null}
new(desc: {vertex: PipelineStage, fragment: PipelineStage?, vertexLayout:{VertexBufferLayout}, bindGroupLayouts:{GPUBindGroupLayout}?, colorTargets:{ColorTarget}?, depthStencil: DepthStencilState?, cullMode: CullMode?, topology: PrimitiveTopology?, sampleCount: number?,}) -> GPUPipeline
```

## Methods

### `getBindGroupLayout`

```lua theme={null}
getBindGroupLayout(groupIndex: number) -> GPUBindGroupLayout
```

Returns the layout the pipeline auto-derived for `@group(N)`.
Errors if `bindGroupLayouts` was supplied at construction (reuse
the explicit one) or if the pipeline's entry points do not bind N.
Mirrors WebGPU's `pipeline.getBindGroupLayout(index)`.
