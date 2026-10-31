---
source: https://rive.app/docs/scripting/api-reference/mesh/mesh-instances
title: "MeshInstances"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# MeshInstances

Holds the per instance data for `Renderer:drawImageMeshInstanced`. Unlike
the mesh buffers it is meant to be rewritten every frame.

## Methods

### `resize`

```lua theme={null}
resize(count: number) -> ()
```

Sets the number of instances.

```lua theme={null}
local mi = MeshInstances()
mi:resize(3)
```

### `set`

```lua theme={null}
set(index: number, transform: Mat2D, opacity: number?, additiveness: number?, uvTranslate: Vector?, uvScale: Vector?) -> ()
```

Writes the instance at `index`, which is zero based. Everything past
`transform` is optional.

```lua theme={null}
local mi = MeshInstances(2)
mi:set(0, Mat2D.withTranslation(Vector.xy(10, 20)))
mi:set(1, Mat2D.identity(), 0.5, 0, Vector.xy(0, 0), Vector.xy(0.5, 0.5))
```
