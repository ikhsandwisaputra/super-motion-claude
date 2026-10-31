---
source: https://rive.app/docs/scripting/api-reference/artboards/node-read-data
title: "NodeReadData"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# NodeReadData

Represents a node in the hierarchy, providing transform properties and
access to parent and child nodes.

## Fields

### `position`

The local position of the node.

```lua highlight={4} theme={null}
if self.instance then
  local node = self.instance:node('Hips')
  if node then
    node.position = Vector.xy(199, 299)
  end
end
```

### `rotation`

The local rotation of the node in radians.

```lua highlight={4} theme={null}
if self.instance then
  local node = self.instance:node('Hips')
  if node then
    node.rotation = math.rad(45)
  end
end
```

### `scale`

The local scale of the node.

```lua highlight={4} theme={null}
if self.instance then
  local node = self.instance:node('Hips')
  if node then
    node.scale = Vector.xy(1.4, 2)
  end
end
```

### `worldTransform`

The read-only world transform of the node.

```lua highlight={4,5,6,7} theme={null}
if self.instance then
  local node = self.instance:node('Hips')
  if node then
    local wt = node.worldTransform
    print("world xx:", wt.xx, "xy:", wt.xy)
    print("world yx:", wt.yx, "yy:", wt.yy)
    print("world tx:", wt.tx, "ty:", wt.ty)
  end
end
```

### `x`

The x-coordinate of the local position.

```lua highlight={4} theme={null}
if self.instance then
  local node = self.instance:node('Hips')
  if node then
    node.x = 100
  end
end
```

### `y`

The y-coordinate of the local position.

```lua highlight={4} theme={null}
if self.instance then
  local node = self.instance:node('Hips')
  if node then
    node.y = 200
  end
end
```

### `scaleX`

The x component of the local scale.

```lua highlight={4} theme={null}
if self.instance then
  local node = self.instance:node('Hips')
  if node then
    node.scaleX = 2
  end
end
```

### `scaleY`

The y component of the local scale.

```lua highlight={4} theme={null}
if self.instance then
  local node = self.instance:node('Hips')
  if node then
    node.scaleY = 2
  end
end
```

### `paint`

The stroke or fill a path effect applies to, on the node its `update`
receives, otherwise nil. The same as `asPaint`.

```lua highlight={2} theme={null}
function update(self: MyEffect, path: PathData, node: NodeReadData): PathData
  local paint = node.paint
  if paint then
    print(paint.color)
  end
  return path
end
```

## Methods

### `asPath`

```lua theme={null}
asPath() -> PathData?
```

If node is a Path, returns the node as [PathData](/docs/scripting/api-reference/path/path-data).

```lua highlight={5} theme={null}
function pointerDown(self: PaintInstance, event: PointerEvent)
  if self.instance then
    local myPath = self.instance:node('MyPath')
    if myPath then
      local path = myPath:asPath()
      if path then
        local cmd: PathCommand = path[1]
        print(cmd.type) -- moveTo
      end
    end
  end
end
```

### `asPaint`

```lua theme={null}
asPaint() -> Paint?
```

Returns the stroke or fill a path effect applies to, on the node its
`update` receives, otherwise nil.

```lua highlight={2} theme={null}
function update(self: MyEffect, path: PathData, node: NodeReadData): PathData
  local paint = node:asPaint()
  if paint then
    print(paint.thickness)
  end
  return path
end
```
