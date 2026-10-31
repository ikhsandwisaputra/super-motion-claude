---
source: https://rive.app/docs/scripting/api-reference/artboards/animation
title: "Animation"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Animation

## Fields

### `duration`

The duration of the animation.

```lua highlight={3} theme={null}
function advance(self: AnimationExample, seconds: number): boolean
  if self.anim
    print(self.anim.duration)
  end
  return true
end
```

## Methods

### `advance`

```lua theme={null}
advance(seconds: number) -> boolean
```

Advances the animation by the given time in seconds. Returns true if the
animation hasn't reached its end. If the animation is set to loop or ping
pong, it will always return true

```lua highlight={23} theme={null}
type AnimationExample = {
  -- Artboard input, assigned in the Rive editor by the designer
  character: Input<Artboard<nil>>,

  -- The live instance and its animation
  artboardInstance: Artboard<nil>?,
  anim: Animation?,
}

function init(self: AnimationExample, context: Context): boolean
  self.artboardInstance = self.character:instance()

  if self.artboardInstance then
    self.anim = self.artboardInstance:animation('Idle')
  end

  return true
end

function advance(self: AnimationExample, seconds: number): boolean
  if self.anim and self.artboardInstance then
    -- Advance the animation to apply keyframe values to the artboard
    self.anim:advance(seconds * 2)
    -- Advance the artboard with 0 to propagate changes without double-counting time
    self.artboardInstance:advance(0)
  end
  return true
end

function draw(self: AnimationExample, renderer: Renderer)
  if self.artboardInstance then
    renderer:save()
    self.artboardInstance:draw(renderer)
    renderer:restore()
  end
end

return function(): Node<AnimationExample>
  return {
    character = late(),
    artboardInstance = nil,
    anim = nil,
    init = init,
    advance = advance,
    draw = draw,
  }
end
```

### `setTime`

```lua theme={null}
setTime(time: number) -> ()
```

set the animation time in seconds

```lua highlight={4} theme={null}
function advance(self: AnimationExample, seconds: number): boolean
  if self.anim and self.artboardInstance then
    -- Set the animation to a specific time in seconds
    self.anim:setTime(0.3)
    -- Advance the artboard with 0 to propagate changes without double-counting time
    self.artboardInstance:advance(0)
  end
  return true
end
```

### `setTimeFrames`

```lua theme={null}
setTimeFrames(frames: number) -> ()
```

set the animation time in frames

```lua highlight={4} theme={null}
function advance(self: AnimationExample, seconds: number): boolean
  if self.anim and self.artboardInstance then
    -- Set the animation to a specific frame
    self.anim:setTimeFrames(3)
    -- Advance the artboard with 0 to propagate changes without double-counting time
    self.artboardInstance:advance(0)
  end
  return true
end
```

### `setTimePercentage`

```lua theme={null}
setTimePercentage(percentage: number) -> ()
```

set the animation time as a percentage of the duration

```lua highlight={4} theme={null}
function advance(self: AnimationExample, seconds: number): boolean
  if self.anim and self.artboardInstance then
    -- Set the animation to a specific percentage of the duration.
    self.anim:setTimePercentage(.5)
    -- Advance the artboard with 0 to propagate changes without double-counting time
    self.artboardInstance:advance(0)
  end
  return true
end
```
