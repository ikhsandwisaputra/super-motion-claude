---
source: https://rive.app/docs/scripting/api-reference/mesh/triangle-buffer
title: "TriangleBuffer"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# TriangleBuffer

Stores triangle index data for use with image meshes.

## Methods

### `add`

```lua theme={null}
add(v1: number, v2: number, v3: number) -> ()
```

Adds a triangle defined by the three vertex indices `v1`, `v2`, and `v3`.

```lua theme={null}
local tb = TriangleBuffer()
tb:add(1, 2, 3)
```

### `reset`

```lua theme={null}
reset() -> ()
```

Clears all triangle indices from the buffer.

```lua theme={null}
local tb = TriangleBuffer()
tb:reset()
```
