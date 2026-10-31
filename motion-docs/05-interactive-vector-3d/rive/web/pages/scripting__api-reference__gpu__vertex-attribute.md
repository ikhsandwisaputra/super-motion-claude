---
source: https://rive.app/docs/scripting/api-reference/gpu/vertex-attribute
title: "VertexAttribute"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# VertexAttribute

Per-vertex attribute within a vertex buffer layout.
`offset` is the byte offset of this attribute within the vertex (default 0).
For interleaved layouts with multiple attributes you must set offset explicitly,
e.g. offset = 0 for position (float3 = 12 bytes), offset = 12 for normal, etc.

## Fields

### `format`

### `slot`

### `offset`
