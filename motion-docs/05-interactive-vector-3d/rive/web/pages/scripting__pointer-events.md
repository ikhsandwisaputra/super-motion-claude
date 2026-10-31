---
source: https://rive.app/docs/scripting/pointer-events
title: "Pointer Events"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Pointer Events

You can listen for pointer events inside any script that implements `pointerDown`, `pointerMove`, `pointerUp`, or `pointerExit`. These functions can be defined in [Node Scripts](/docs/scripting/protocols/node-scripts) and [Layout Scripts](/docs/scripting/protocols/layout-scripts).

```lua theme={null}
-- Pointer event callbacks have parameters of `self` and a `PointerEvent`.
function handlePointerDown(self: MyNode, event: PointerEvent)
  -- Pointer location in local coordinates relative to the script.
  print(event.position.x, event.position.y)

  -- the pointer identifier (useful for multi-touch)
  print(event.id)

  -- Marks the event as handled and prevents propagation.
  event:hit()
  -- event:hit(true) -- handled, but allowed to pass through translucent elements
end

-- Register your pointer handlers by assigning functions to pointerDown,
-- pointerUp, pointerMove, or pointerExit in the script’s returned table.
return function(): Node<MyScript>
  return {
    init = init,
    draw = draw,
    advance = advance,
    pointerDown = myPointerDownFunction,
  }
end

```

## Multi-touch

Using `event.id`, you can track multiple active pointers.

```lua theme={null}
type ActiveId = {
  position: Vec2D,
}

export type TrackPointers = {
  -- Keep track of the position for each of the pointers
  activePointers: { ActiveId },
}

function onPointerDown(self: TrackPointers, event: PointerEvent)
  -- Save an item in the table for each pointer down
  self.activePointers[event.id] = {
    position = event.position,
  }

  print('New pointer down: ' .. event.id)
  print('Position: ' .. event.position.x .. event.position.y)

  event:hit()
end

function onPointerMove(self: TrackPointers, event: PointerEvent)
  if self.activePointers[event.id] then
    self.activePointers[event.id].position = event.position

    -- Print all currently active pointer IDs
    print('Active pointer IDs:')
    for id, pointer in self.activePointers do
      print('  id: ', id)
      print('    x:', pointer.position.x)
      print('    y:', pointer.position.y)
    end
  end

  event:hit()
end

function onPointerUp(self: TrackPointers, event: PointerEvent)
  self.activePointers[event.id] = nil

  print('Pointer up: ' .. event.id)
  print('Position: ' .. event.position.x .. event.position.y)

  event:hit()
end

return function(): Node<TrackPointers>
  return {
    init = init,
    advance = advance,
    draw = draw,
    pointerDown = onPointerDown,
    pointerMove = onPointerMove,
    pointerUp = onPointerUp,
    activePointers = {},
  }
end

```

## Nested pointer events

Rive only listens for Pointer Events on the main artboard.
If you need to listen for Pointer Events in your [instantiated artboards](/docs/scripting/protocols/node-scripts#instanting-components),
you must forward them manually.

```lua theme={null}
-- Handle pointer events in the main script
function handlePointerDown(self: MyScript, event: PointerEvent)
  -- self.enemy.pointerDown(self.enemy, event)
  for _, enemy in self.enemies do
    -- Convert the incoming pointer position into the enemy's local space.
    -- This example assumes enemy.position is in the same coordinate system.
    local localEvent = PointerEvent.new(
      event.id,
      Vec2D.xy(
        -- Normalize the pointer position based on the artboard's position
        event.position.x - enemy.position.x,
        event.position.y - enemy.position.y
      )
    )

    -- Forward the event into the instantiated artboard
    self.enemy:pointerDown(localEvent)
  end
end
```
