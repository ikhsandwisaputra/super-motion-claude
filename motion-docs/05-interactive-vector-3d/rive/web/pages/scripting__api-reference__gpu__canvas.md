---
source: https://rive.app/docs/scripting/api-reference/gpu/canvas
title: "Canvas"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Canvas

A Rive 2-D renderer canvas. Use `.image` with `renderer:drawImage()`.
Call `beginFrame()` to get a Renderer, issue draw calls, then `endFrame()`.
Its contents last until the next `beginFrame()`, so a frame that skips it
still draws or samples the last one.

## Fields

### `image`

Backing image for `renderer:drawImage()`.

### `width`

Width in pixels.

### `height`

Height in pixels.

## Methods

### `resize`

```lua theme={null}
resize(width: number, height: number) -> ()
```

Resize the canvas. Must not be called between beginFrame() and endFrame().

### `beginFrame`

```lua theme={null}
beginFrame(desc: {clearColor: Color?}?) -> Renderer
```

Begin a Rive frame. Returns a Renderer valid until endFrame().
clearColor is an ARGB integer (e.g. 0xFF000000 = opaque black; default transparent).

### `endFrame`

```lua theme={null}
endFrame() -> ()
```

Flush draw calls to the backing texture and release the Renderer.
