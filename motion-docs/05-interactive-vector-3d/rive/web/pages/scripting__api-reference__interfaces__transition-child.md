---
source: https://rive.app/docs/scripting/api-reference/interfaces/transition-child
title: "TransitionChild"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# TransitionChild

A handle to one child (a nested artboard) of a Transition, valid only for
the duration of the `draw` (and `changed`) call it is passed to. Draw it
with `child:draw(renderer)`, wrapping the call in renderer state
(save / modulateOpacity / transform / clipPath / restore) to author the
transition effect.

## Fields

### `width`

The child artboard's natural width, useful for slide/scale math.

### `height`

The child artboard's natural height.

## Methods

### `draw`

```lua theme={null}
draw(renderer: Renderer) -> ()
```

Draw this child's content at the renderer's current transform.
