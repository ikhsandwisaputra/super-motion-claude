---
source: https://rive.app/docs/scripting/api-reference/artboards/artboard
title: "Artboard"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Artboard

Represents a Rive artboard instance, providing drawing, advancing,
interaction handling, and access to [named nodes](/docs/editor/exporting/exporting-names) and data.

## Fields

### `frameOrigin`

If true, the artboard’s origin is treated as the frame origin.

```lua highlight={6} theme={null}
function init(self: RenderInstance, context: Context): boolean
  local vm = Data.Character.new()

  self.instance = self.character:instance(vm)
  if self.instance then
    self.instance.frameOrigin = true
  end

  return true
end
```

### `data`

The typed data associated with the artboard.

```lua highlight={9,10,11,12} theme={null}
function init(self: RenderInstance, context: Context): boolean
  local vm = Data.Character.new()

  self.instance = self.character:instance(vm)

  if self.instance then
    self.instance.frameOrigin = true

    local data = self.instance.data
    if data then
      print(data.nickname)
    end
  end

  return true
end
```

### `width`

The width of the artboard.

```lua theme={null}
self.instance = self.character:instance(vm)
  if self.instance then
    print(self.instance.width)
  end
end
```

### `height`

The height of the artboard.

```lua theme={null}
self.instance = self.character:instance(vm)
  if self.instance then
    print(self.instance.height)
  end
end
```

## Methods

### `draw`

```lua theme={null}
draw(renderer: Renderer, visitor: ((context: any, drawable: Drawable, renderer: Renderer) ->())?, context: any?) -> ()
```

Draws the artboard using the provided renderer.

```lua highlight={20} theme={null}
type RenderInstances = {
  character: Input<Artboard<Data.Character>>,

  instance: Artboard<Data.Character>?,
}

function init(self: RenderInstances, context: Context): boolean
  local vm = Data.Character.new()

  self.instance = self.character:instance(vm)

  return true
end

function draw(self: RenderInstances, renderer: Renderer)
  local instance = self.instance

  if instance then
    renderer:save()
    instance:draw(renderer)
    renderer:restore()
  end
end

return function(): Node<RenderInstances>
  return {
    character = late(),
    instance = nil,
    init = init,
    draw = draw,
  }
end
```

With a `visitor`, each drawable that has custom properties is handed
to it instead of being drawn: the visitor decides whether to call
`drawable:draw(renderer)` and under what renderer state. Whatever it
sets on the renderer ends with that visit. Every other drawable draws
as usual, and clipping still applies. `context` is passed through to
the visitor untouched.

```lua theme={null}
-- In init: local GLOW = artboard:propertyKey("glow")
-- Draw only the drawables tagged `glow`, in their own paint.
artboard:draw(renderer, function(context, drawable, renderer)
  if drawable:boolean(GLOW) then
    drawable:draw(renderer)
  end
end)
```

Drawing a tagged nested artboard visits the tagged drawables inside
it from within that `drawable:draw` call, so a value carries down in
a local:

```lua theme={null}
local level = 1
artboard:draw(renderer, function(context, drawable, renderer)
  local outer = level
  level = outer * math.min(drawable:number(EMISSIVE) or 0, 1)
  local c = math.floor(level * 255)
  renderer:setColorModulation(Color.rgba(c, c, c, 255))
  drawable:draw(renderer)
  level = outer
end)
```

### `drawModulated`

```lua theme={null}
drawModulated(renderer: Renderer, key: PropertyKey) -> ()
```

Draws the artboard with the color modulation set, per drawable, from
its custom property of this key: a number as a gray level clamped to
0..1, a color as is. Drawables without it draw under the renderer's
current state. Levels multiply down through tagged drawables that
hold others: inside a nested artboard tagged 0.5, a shape tagged 0.2
draws at 0.1 and an untagged one at 0.5. Nothing calls back into the
script, so this is the cheapest way to draw a pass like emission.

```lua theme={null}
-- In init: local EMISSIVE = artboard:propertyKey("emissive")
-- Everything black except drawables tagged `emissive`.
renderer:save()
renderer:setColorModulation(Color.rgba(0, 0, 0, 255))
artboard:drawModulated(renderer, EMISSIVE)
renderer:restore()
```

### `propertyKey`

```lua theme={null}
propertyKey(name: string) -> PropertyKey
```

The key custom properties called `name` are read by. When no
property in the file carries that name the key matches nothing, so
every read by it comes back nil. Custom properties are added to a
drawable in the editor's inspector.

### `advance`

```lua theme={null}
advance(seconds: number) -> boolean
```

Advances the artboard by the given time in seconds. Returns true if the
artboard should continue receiving advance calls.

```lua highlight={17} theme={null}
type RenderInstances = {
  character: Input<Artboard<Data.Character>>,

  instance: Artboard<Data.Character>?,
}

function init(self: RenderInstances, context: Context): boolean
  local vm = Data.Character.new()

  self.instance = self.character:instance(vm)

  return true
end

function advance(self: RenderInstances, seconds: number): boolean
  if self.instance then
    return self.instance:advance(seconds)
  end
  return true
end

return function(): Node<RenderInstances>
  return {
    character = late(),
    instance = nil,
    init = init,
    advance = advance,
  }
end
```

### `instance`

```lua theme={null}
instance(viewModel: ViewModel?) -> Artboard<T>
```

Creates a new instance of the artboard with independent state.

```lua highlight={8} theme={null}
type ViewModelExample = {
  character: Input<Artboard<Data.Character>>,
  instance: Artboard<Data.Character>?,
}

function init(self: ViewModelExample, context: Context): boolean
  local vm = Data.Character.new()
  self.instance = self.character:instance(vm)
  return true
end

return function(): Node<ViewModelExample>
  return {
    character = late(),
    instance = nil,
    init = init,
  }
end
```

### `animation`

```lua theme={null}
animation(name: string) -> Animation?
```

Creates an animation instance linked to the artboard instance

### `bounds`

```lua theme={null}
bounds() -> (Vector, Vector)
```

Returns the bounding box of the artboard as two [Vector](/docs/scripting/api-reference/vector/vector) values: the
minimum point and the maximum point.

```lua theme={null}
local minPt, maxPt = self.instance:bounds()
print("Bounds width", maxPt.x - minPt.x)
print("Bounds height", maxPt.y - minPt.y)
```

### `node`

```lua theme={null}
node(name: string) -> NodeData?
```

Returns the node with the given name, or nil if no such node exists.

```lua highlight={2} theme={null}
if self.instance then
  local node = self.instance:node('Root')
  if node then
    local m = Mat2D.withTranslation(100, 100)
    node:decompose(m)
  end
end
```

### `pointerDown`

```lua theme={null}
pointerDown(event: PointerEvent) -> number
```

Pointer event down handler. Returns a hit-test result (0 = no hit).
Only returns a non-zero value if a hit-testable object inside the nested
artboard is hit.

```lua highlight={3} theme={null}
function handlePointerDown(self: PointerExample, event: PointerEvent)
  if self.instance then
    local hit = self.instance:pointerDown(event)
    if hit ~= 0 then
      print(event.id)
      print(event.position)
    end
  end
end
```

### `pointerUp`

```lua theme={null}
pointerUp(event: PointerEvent) -> number
```

Pointer event up handler. Returns a hit-test result (0 = no hit).
Only returns a non-zero value if a hit-testable object inside the nested
artboard is hit.

```lua highlight={3} theme={null}
function handlePointerUp(self: PointerExample, event: PointerEvent)
  if self.instance then
    local hit = self.instance:pointerUp(event)
    if hit ~= 0 then
      print(event.id)
      print(event.position)
    end
  end
end
```

### `pointerMove`

```lua theme={null}
pointerMove(event: PointerEvent) -> number
```

Pointer event move handler. Returns a hit-test result (0 = no hit).
Only returns a non-zero value if a hit-testable object inside the nested
artboard is hit.

```lua highlight={3} theme={null}
function handlePointerMove(self: PointerExample, event: PointerEvent)
  if self.instance then
    local hit = self.instance:pointerMove(event)
    if hit ~= 0 then
      print(event.id)
      print(event.position)
    end
  end
end
```

### `pointerExit`

```lua theme={null}
pointerExit(event: PointerEvent) -> number
```

Pointer event exit handler. Returns a hit-test result (0 = no hit).
Only returns a non-zero value if a hit-testable object inside the nested
artboard is hit.

```lua highlight={3} theme={null}
function handlePointerExit(self: PointerExample, event: PointerEvent)
  if self.instance then
    local hit = self.instance:pointerExit(event)
    if hit ~= 0 then
      print(event.id)
      print(event.position)
    end
  end
end
```

### `pointerScroll`

```lua theme={null}
pointerScroll(event: ScrollEvent) -> number
```

Scroll handler. Returns a hit-test result (0 = no hit), non-zero when
a `ScrollConstraint` view inside the artboard took the scroll. Claim
the outer event when it does, so the gesture stays with this node.

```lua highlight={12} theme={null}
function handlePointerScroll(self: RenderInstance, event: ScrollEvent)
  if self.instance then
    local localPos = event.position - Vector.xy(self.x, self.y)
    local localEvent = ScrollEvent.new(
      event.id,
      localPos,
      event.delta,
      event.phase,
      event.precise,
      event.timeStamp
    )
    if self.instance:pointerScroll(localEvent) ~= 0 then
      event:hit()
    end
  end
end
```

### `addToPath`

```lua theme={null}
addToPath(path: Path, transform: Mat2D?) -> ()
```

Adds the artboard’s geometry to the given path, optionally transformed
by the provided matrix.

For a complete working example, see the [Add to Path](https://rive.app/community/files/27188-51290-add-to-path-scripting-demo?utm_source=docs\&utm_medium=scripting_api\&utm_campaign=docs_to_marketplace_links) demo.

```lua highlight={18} theme={null}
function draw(self: AddToPathExample, renderer: Renderer)
  local instance = self.instance
  if not instance then
    return
  end

  -- Draw the artboard normally first.
  renderer:save()
  instance:draw(renderer)
  renderer:restore()

  -- Reset the path each frame, then rebuild it from the artboard's geometry.
  self.outlinePath:reset()

  -- Add the artboard's geometry into the path with an optional transform.
  -- Here we apply a slight offset via Mat2D to show the transform parameter.
  local transform = Mat2D.withTranslation(8, 8)
  instance:addToPath(self.outlinePath, transform)

  -- Draw the extracted path with a custom stroke paint as an outline / shadow effect.
  renderer:drawPath(self.outlinePath, self.outlinePaint)
end
```

### `gamepadConnected`

```lua theme={null}
gamepadConnected(event: GamepadConnected) -> number
```

Forwards a gamepad connection to the artboard: its focused control
first, then every scripted node that did not take it. Returns how
many scripted nodes received it.

```lua theme={null}
function gamepadConnected(self: Forwarder, event: GamepadConnected)
  self.instance:gamepadConnected(event)
end
```

### `gamepadEvent`

```lua theme={null}
gamepadEvent(event: GamepadEvent) -> number
```

Forwards a gamepad button or axis change to the artboard, the same way
as `gamepadConnected`.

### `gamepadDisconnected`

```lua theme={null}
gamepadDisconnected(event: GamepadDisconnected) -> number
```

Forwards a gamepad disconnection to the artboard, the same way as
`gamepadConnected`.
