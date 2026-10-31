---
source: https://rive.app/docs/scripting/api-reference/interfaces/path-effect
title: "PathEffect"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# PathEffect

A scripted effect applied to a path
For effects that can change over time, even
when the path does not change, markNeedsUpdate()
should be called on its context in the advance function

For more information, see [Path Effect Scripts](/docs/scripting/protocols/path-effect-scripts).

## Methods

### `init`

```lua theme={null}
init(self: T, context: Context) -> boolean
```

Called once when the effect is created or attached.
Return `true` to keep the effect active, or `false` to disable it.

```lua theme={null}
-- Called once when the script initializes.
function init(self: MyPathEffect, context: Context): boolean

    -- Return false to stop the script.
    return true
end
```

### `update`

```lua theme={null}
update(self: T, path: PathData, node: NodeReadData) -> PathData
```

Called any time an input changes or an update is requested.
You receive the original [PathData](/docs/scripting/api-reference/path/path-data) and the node it belongs to, and
must return the path that should be used for rendering.

```lua theme={null}
function update(self: MyPathEffect, inPath: PathData, node: NodeReadData): PathData
    local path = Path.new()
    return path
end
```

### `advance`

```lua theme={null}
advance(self: T, seconds: number) -> boolean
```

Called every frame to advance the effect over time.
`seconds` is the time delta since the last frame.
Return `true` to keep the effect active, or `false` to disable it.

```lua theme={null}
function advance(self: MyPathEffect, seconds: number): boolean
  return false
end
```
