---
source: https://rive.app/docs/scripting/api-reference/mesh/vertex-buffer
title: "VertexBuffer"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# VertexBuffer

Stores a list of 2D vertex positions for use with image meshes.

## Methods

### `add`

```lua theme={null}
add(...Vector) -> ()
```

Adds one or more vertices to the buffer.

```lua theme={null}
local vb = VertexBuffer()
vb:add(Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(1, 1))
```

### `reset`

```lua theme={null}
reset() -> ()
```

Clears all vertices from the buffer.

```lua theme={null}
local vb = VertexBuffer()
vb:reset()
```
