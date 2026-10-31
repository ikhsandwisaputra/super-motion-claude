---
source: https://rive.app/docs/scripting/api-reference/artboards/node-data
title: "NodeData"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# NodeData

Represents a node in the hierarchy, providing transform properties and
access to parent and child nodes.

## Fields

### `children`

The node’s children.

```lua highlight={5} theme={null}
if self.instance then
  local node = self.instance:node('Hips')
  if node then
    local hipsFirstChild = node.children[1]
    print(hipsFirstChild)
    local m = Mat2D.withTranslation(100, 100)

    if hipsFirstChild then
      hipsFirstChild:decompose(m)
    end
  end
end
```

### `parent`

The parent of the node, or nil if it has none.

```lua highlight={4} theme={null}
if self.instance then
  local node = self.instance:node('Hips')
  if node then
    local hipsParent = node.parent
    local m = Mat2D.withTranslation(100, 100)
    if hipsParent then
      hipsParent:decompose(m)
    end
  end
end
```

## Methods

### `decompose`

```lua theme={null}
decompose(worldTransform: Mat2D) -> ()
```

Updates the node’s position, rotation, and scale from the given world
transform.

```lua highlight={5} theme={null}
if self.instance then
  local node = self.instance:node('Root')
  if node then
    local m = Mat2D.withTranslation(100, 100)
    node:decompose(m)
  end
end
```
