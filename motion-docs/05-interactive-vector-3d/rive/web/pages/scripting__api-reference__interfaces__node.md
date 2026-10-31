---
source: https://rive.app/docs/scripting/api-reference/interfaces/node
title: "Node"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Node

Node scripts can be used to render shapes, images, text, artboards, and more.
A scripted node can be attached to any Node and is rendered
in the local transform space of the hosting Node.

For more information, see [Node Scripts](/docs/scripting/protocols/node-scripts).

## Methods

### `init`

```lua theme={null}
init(self: T, context: Context) -> boolean
```

Called once when the node is created. Returns true if initialization
succeeds.

For a more complete example using `init`, see [Instantiating Components](/docs/scripting/protocols/node-scripts#instantiating-components).

```lua highlight={5,6,7,12} theme={null}
-- Define the script's data and inputs.
type MyNode = {}

-- Called once when the script initializes.
function init(self: MyNode, context: Context): boolean
  return true
end

-- Return a factory function that Rive uses to build the Node instance.
return function(): Node<MyNode>
  return {
    init = init
  }
end
```

### `advance`

```lua theme={null}
advance(self: T, seconds: number) -> boolean
```

Optional per-frame update. Returns true if the node should continue
receiving advance calls.

For a more complete example using `advance`, see [Fixed-step Advanced](/docs/scripting/protocols/node-scripts#fixed-step-advance).

```lua highlight={6,7,8,13} theme={null}
-- Define the script's data and inputs.
type MyNode = {}

-- Called every frame to advance the simulation.
-- 'seconds' is the elapsed time since the previous frame.
function advance(self: MyNode, seconds: number): boolean
  return false
end

-- Return a factory function that Rive uses to build the Node instance.
return function(): Node<MyNode>
  return {
    advance = advance,
  }
end
```

### `update`

```lua theme={null}
update(self: T) -> ()
```

Called when an input value changes.

```lua highlight={5,6,7,12} theme={null}
-- Define the script's data and inputs.
type MyNode = {}

-- Called when any input value changes.
function update(self: MyNode)
  print('An script input value has changed.')
end

-- Return a factory function that Rive uses to build the Node instance.
return function(): Node<MyNode>
  return {
    update = update,
  }
end
```

### `draw`

```lua theme={null}
draw(self: T, renderer: Renderer) -> ()
```

Called to render the node using the provided [Renderer](/docs/scripting/api-reference/renderer/renderer).

For a more complete example using draw, see [Instantiating Components](/docs/scripting/protocols/node-scripts#instantiating-components).

```lua highlight={5,10} theme={null}
-- Define the script's data and inputs.
type MyNode = {}

-- Called every frame (after advance) to render the content.
function draw(self: MyNode, renderer: Renderer) end

-- Return a factory function that Rive uses to build the Node instance.
return function(): Node<MyNode>
  return {
    draw = draw,
  }
end
```

GPU canvas work (canvas:beginFrame, gpuCanvas:beginRenderPass) also
happens here, in any order; replay schedules canvas dependencies. The
former drawCanvas callback was removed: move its body into draw.

### `pointerDown`

```lua theme={null}
pointerDown(self: T, event: PointerEvent) -> ()
```

Pointer event down handler.

```lua theme={null}
function handlePointerDown(self: MyGame, event: PointerEvent)
  print('Pointer Position: ', event.position.x, event.position.y)

  event:hit()
end

return function(): Node<MyGame>
    return {
        init = init,
        advance = advance,
        draw = draw,
        pointerDown = handlePointerDown,
    }
end
```

### `pointerMove`

```lua theme={null}
pointerMove(self: T, event: PointerEvent) -> ()
```

Pointer event move handler.

```lua theme={null}
function handlePointerMove(self: MyGame, event: PointerEvent)
  print('Pointer Position: ', event.position.x, event.position.y)

  event:hit()
end

return function(): Node<MyGame>
    return {
        init = init,
        advance = advance,
        draw = draw,
        pointerMove = handlePointerMove,
    }
end
```

### `pointerUp`

```lua theme={null}
pointerUp(self: T, event: PointerEvent) -> ()
```

Pointer event up handler.

```lua theme={null}
function handlePointerUp(self: MyGame, event: PointerEvent)
  print('Pointer Position: ', event.position.x, event.position.y)

  event:hit()
end

return function(): Node<MyGame>
    return {
        init = init,
        advance = advance,
        draw = draw,
        pointerUp = handlePointerUp,
    }
end
```

### `pointerExit`

```lua theme={null}
pointerExit(self: T, event: PointerEvent) -> ()
```

Pointer event exit handler.

```lua theme={null}
function handlePointerExit(self: MyGame, event: PointerEvent)
  print('Pointer Position: ', event.position.x, event.position.y)

  event:hit()
end

return function(): Node<MyGame>
    return {
        init = init,
        advance = advance,
        draw = draw,
        pointerExit = handlePointerExit,
    }
end
```

### `pointerScroll`

```lua theme={null}
pointerScroll(self: T, event: ScrollEvent) -> ()
```

Mouse wheel and trackpad scroll handler. Call `event:hit()` to claim
the scroll; otherwise it passes to whatever lies behind, such as a
`ScrollConstraint` view.

```lua theme={null}
function handlePointerScroll(self: MyZoomView, event: ScrollEvent)
  self.zoom *= math.exp(-event.delta.y * 0.01)
  event:hit()
end

return function(): Node<MyZoomView>
    return {
        init = init,
        draw = draw,
        pointerScroll = handlePointerScroll,
    }
end
```

### `gamepadConnected`

```lua theme={null}
gamepadConnected(self: T, event: GamepadConnected) -> ()
```

### `gamepadEvent`

```lua theme={null}
gamepadEvent(self: T, event: GamepadEvent) -> ()
```

### `gamepadDisconnected`

```lua theme={null}
gamepadDisconnected(self: T, event: GamepadDisconnected) -> ()
```
