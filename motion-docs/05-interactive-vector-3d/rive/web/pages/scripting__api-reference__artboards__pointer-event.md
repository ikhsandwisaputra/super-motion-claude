---
source: https://rive.app/docs/scripting/api-reference/artboards/pointer-event
title: "PointerEvent"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# PointerEvent

Represents a pointer interaction event containing position and pointer id.

## Fields

### `position`

The position of the pointer in local coordinates.

```lua highlight={10,11} theme={null}
function handlePointerDown(self: RenderInstance, event: PointerEvent)
  if self.instance then
    local localPos = event.position - Vector.xy(self.x, self.y)
    local localEvent = PointerEvent.new(event.id, localPos)
    local hit = self.instance:pointerDown(localEvent)
    if hit ~= 0 then
      print(
        string.format(
          'Local hit at (%.1f, %.1f)',
          localEvent.position.x,
          localEvent.position.y
        )
      )
    end
  end
end
```

### `id`

The unique identifier for the pointer.

```lua highlight={7} theme={null}
function handlePointerDown(self: RenderInstance, event: PointerEvent)
  if self.instance then
    local localPos = event.position - Vector.xy(self.x, self.y)
    local localEvent = PointerEvent.new(event.id, localPos)
    local hit = self.instance:pointerDown(localEvent)
    if hit ~= 0 then
      print(localEvent.id)
    end
  end
end
```

### `type`

The type of event (pointerDown, pointerUp, click, pointerEnter, pointerMove, etc).

### `previousPosition`

The pointer's previous position in local coordinates. Node pointer
handlers read the origin.

### `timeStamp`

When the interaction happened, in seconds.

## Constructors

### `new`

```lua theme={null}
new(id: number, position: Vector) -> PointerEvent
```

Creates a new [PointerEvent](/docs/scripting/api-reference/artboards/pointer-event) with the given id and position.

```lua highlight={4} theme={null}
function handlePointerDown(self: RenderInstance, event: PointerEvent)
  if self.instance then
    local localPos = event.position - Vector.xy(self.x, self.y)
    local localEvent = PointerEvent.new(event.id, localPos)
    local hit = self.instance:pointerDown(localEvent)
    if hit ~= 0 then
      print(
        string.format(
          'Local hit at (%.1f, %.1f)',
          localEvent.position.x,
          localEvent.position.y
        )
      )
    end
  end
end
```

## Methods

### `hit`

```lua theme={null}
hit(isTranslucent: boolean?) -> ()
```

Consumes the event. Call it on every event a script owns -- the press,
each move of a drag, and the release -- or the event keeps travelling
outward and an enclosing hit target claims the gesture. A
`ScrollConstraint` viewport is the usual one: without this, dragging a
control inside a scroll view scrolls the view instead.

The argument inverts. Bare `hit()` is opaque and stops there;
`hit(true)` marks this target translucent, so the event continues to
whatever is behind it.

```lua highlight={6} theme={null}
function handlePointerDown(self: PointerExample, event: PointerEvent)
  if self.instance then
    local hit = self.instance:pointerDown(event)
    if hit ~= 0 then
      -- Mark as handled but still allow translucent targets behind to receive it.
      event:hit(true)
    end
  end
end
```
