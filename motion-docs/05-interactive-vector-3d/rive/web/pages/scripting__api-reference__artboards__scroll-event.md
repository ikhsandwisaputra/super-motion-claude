---
source: https://rive.app/docs/scripting/api-reference/artboards/scroll-event
title: "ScrollEvent"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# ScrollEvent

A scroll from a mouse wheel or a trackpad, delivered to `pointerScroll`.
Direct touch arrives as pointer events instead.

```lua theme={null}
function pointerScroll(self: ZoomView, event: ScrollEvent)
  self.zoom *= math.exp(-event.delta.y * 0.01)
  event:hit()
end
```

## Fields

### `id`

The unique identifier for the pointer.

### `position`

The pointer's position in local coordinates.

### `delta`

How far the content should travel, in local coordinates. It follows
the content, as a `ScrollConstraint` does, so revealing content
further down reads as a negative `y`.

### `phase`

Where the event sits within its gesture.

### `precise`

True for a pixel precise source like a trackpad, false for a mouse
wheel that moves in detents.

### `timeStamp`

When the scroll happened, in seconds.

## Constructors

### `new`

```lua theme={null}
new(id: number, position: Vector, delta: Vector, phase: ScrollPhase?, precise: boolean?, timeStamp: number?) -> ScrollEvent
```

Creates a new [ScrollEvent](/docs/scripting/api-reference/artboards/scroll-event). The phase defaults to `update` and precise
to false, as a mouse wheel reports them.

```lua highlight={1} theme={null}
local wheel = ScrollEvent.new(0, Vector.xy(10, 20), Vector.xy(0, -40))
print(wheel.phase, wheel.precise)
```

## Methods

### `hit`

```lua theme={null}
hit() -> ()
```

Claims the scroll. Without it the scroll passes to whatever lies
behind, such as a `ScrollConstraint` view. A claimed trackpad gesture
stays with this node until it ends.
