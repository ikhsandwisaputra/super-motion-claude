---
source: https://rive.app/docs/scripting/api-reference/interfaces/context
title: "Context"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Context

Context is an object provided to scripted nodes during initialization (via the `init` function).
It serves as a bridge between your script and the Rive runtime, giving you access to:

* Update scheduling — Request that your node be updated on the next frame.
* Data (ViewModels) — Access the ViewModel data context bound to the node or the root artboard.
* Assets — Retrieve named assets (images, blobs, and audio) that have been added to the Rive file.

## Methods

### `log`

```lua theme={null}
log(message: string) -> ()
```

Logs a message through the host: the CLI watch log and problems
surface, the editor console. Available on both script backends.

```lua theme={null}
function init(self: MyNode, context: Context): boolean
    context.log('hello')
    return true
end
```

### `markNeedsUpdate`

```lua theme={null}
markNeedsUpdate() -> ()
```

Marks the object as needing an update on the next frame.
Call this when something has changed (e.g., from a listener callback) and you need the runtime to re-invoke your node's update function.
Note: Calls to `markNeedsUpdate` from inside `update()` are ignored. Use it from `init()`, `advance()`, listener callbacks, or event handlers instead.

```lua highlight={11} theme={null}
function init(self: MyNode, context: Context): boolean
    self.context = context
    -- Access a ViewModel property and listen for changes
    local vm = context:viewModel()
    if vm then
        local name = vm:getString("name")
        if name then
            name:addListener(function()
                -- Re-trigger update when the data changes
                if self.context then
                    self.context:markNeedsUpdate()
                end
            end)
        end
    end
    return true
end
```

### `viewModel`

```lua theme={null}
viewModel() -> ViewModel?
```

Returns the [ViewModel](/docs/scripting/api-reference/interfaces/view-model) bound to the node's immediate data context. This is the most common way
to read data-bound properties from a script.

```lua highlight={2} theme={null}
function init(self: MyNode, context: Context): boolean
  local vmi = context:viewModel()
  if vmi then
    local cannon = vmi:getTrigger('cannon')
  end

  return true
end
```

### `rootViewModel`

```lua theme={null}
rootViewModel() -> ViewModel?
```

Returns the [ViewModel](/docs/scripting/api-reference/interfaces/view-model) bound to the root artboard's data context.
Useful when you need to access top-level data from a deeply nested node.

```lua highlight={2} theme={null}
function init(self: MyNode, context: Context): boolean
  local vmi = context:rootViewModel()
  if vmi then
    local cannon = vmi:getTrigger('cannon')
  end

  return true
end
```

### `globalViewModel`

```lua theme={null}
globalViewModel(name: string) -> ViewModel?
```

Returns the global [ViewModel](/docs/scripting/api-reference/interfaces/view-model) with the given name, or nil if there is no
global view model by that name or none is currently bound.
Global view models are shared, singleton-like view models addressed by name
rather than through the node's own data context.

```lua highlight={2} theme={null}
function init(self: MyNode, context: Context): boolean
  local settings = context:globalViewModel('AppSettings')
  if settings then
    local volume = settings:getNumber('volume')
  end

  return true
end
```

### `globalViewModelNames`

```lua theme={null}
globalViewModelNames() -> {string}
```

Returns a list of the names of all global view models defined in the file.
Pass any of these names to `globalViewModel` to fetch the corresponding view model.

```lua highlight={2} theme={null}
function init(self: MyNode, context: Context): boolean
  for _, name in ipairs(context:globalViewModelNames()) do
    print(name)
  end

  return true
end
```

### `dataContext`

```lua theme={null}
dataContext() -> DataContext?
```

Returns the data context provided to this node.

```lua highlight={2} theme={null}
function init(self: MyNode, context: Context): boolean
  local dc = context:dataContext()
  if dc then
     local parentDC = dc:parent()
     local vm = dc:viewModel()
  end

  return true
end
```

### `image`

```lua theme={null}
image(name: string) -> Image?
```

Returns an image asset by name, or nil if not found.
The returned [Image](/docs/scripting/api-reference/image/image) can be drawn via `drawImage`.

See also [ImageSampler](/docs/scripting/api-reference/image/image-sampler).

Check out [Scripting demos](/docs/scripting/demos) to see a working example.

```lua highlight={7,15} theme={null}
type DrawImage = {
  myImage: Image?,
  sampler: ImageSampler?,
}

function init(self: DrawImage, context: Context): boolean
  self.myImage = context:image('myImage')
  self.sampler = ImageSampler('clamp', 'clamp', 'bilinear')

  return true
end

function draw(self: DrawImage, renderer: Renderer)
  if self.myImage and self.sampler then
    renderer:drawImage(self.myImage, self.sampler, 'srcOver', 1)
  end
end

return function(): Node<DrawImage>
  return {
    myImage = nil,
    sampler = nil,
    init = init,
    draw = draw,
  }
end
```

### `blob`

```lua theme={null}
blob(name: string) -> Blob?
```

Returns a [Blob](/docs/scripting/api-reference/interfaces/blob) (raw binary data) asset by name, or nil if not found.
Useful for loading custom data files embedded in the Rive file.

```lua highlight={6} theme={null}
type DrawBlob = {
    myBlob: Blob?,
}

function init(self: DrawBlob, context: Context): boolean
    self.myBlob = context:blob('myBlob')

    if self.myBlob then
        print('Blob name:', self.myBlob.name)
        print('Blob size:', self.myBlob.size, 'bytes')
        print('First byte:', buffer.readu8(self.myBlob.data, 0))
    end

    return true
end

return function(): Node<DrawBlob>
    return {
        myBlob = nil,
        init = init,
    }
end
```

### `font`

```lua theme={null}
font(name: string) -> Font?
```

Returns a [Font](/docs/scripting/api-reference/text/font) asset by name, or nil if not found.

```lua highlight={2} theme={null}
function init(self: Label, context: Context): boolean
    local font = context:font('Inter')
    if font then
        self.text:append('Hello', { font = font, size = 24, paint = self.paint })
    end
    return true
end
```

### `audio`

```lua theme={null}
audio(name: string) -> AudioSource?
```

Returns an [AudioSource](/docs/scripting/api-reference/interfaces/audio-source) asset by name. The returned source can be played using the global `Audio` API.

```lua highlight={4,8} theme={null}
type AudioExample = {
  play: Input<Trigger>,

  source: AudioSource?,
}

function init(self: AudioExample, context: Context): boolean
  self.source = context:audio("myAudio")
  return true
end

function playSound(self: AudioExample)
  if self.source then
    Audio.play(self.source)
  end
end

return function(): Node<AudioExample>
  return {
    play = playSound,
    source = nil,
    init = init,
  }
end
```

### `canvas`

```lua theme={null}
canvas(desc: {width: number, height: number, clearColor: Color?,}?) -> Canvas
```

Create a 2D canvas for Rive Renderer drawing.
Use beginFrame/endFrame during draw to render.

The descriptor is optional. Omitting it (or passing width/height of
0\) creates a deferred canvas with no backing texture — useful in
layout scripts that don't know their size at init. Call
`canvas:resize(w, h)` once the real size is known. While deferred,
`canvas.image` is nil and `width`/`height` report 0; calling
`beginFrame()` raises an error pointing to `resize()`. Check
`canvas.width > 0` to gate work.

`clearColor` is ignored here; pass it to `beginFrame` instead.

### `gpuCanvas`

```lua theme={null}
gpuCanvas(desc: {width: number, height: number,}?) -> GPUCanvas
```

Create a GPU canvas — a 1× presentation target. Render to it via
`canvas:beginRenderPass(...)`. For MSAA, allocate the multisampled
color and depth textures yourself with `GPUTexture.new({
sampleCount = N, renderTarget = true })` and pass them in the
descriptor.

The descriptor is optional. Omitting it (or passing width/height of
0\) creates a deferred canvas with no backing texture — useful in
layout scripts that don't know their size at init. Call
`canvas:resize(w, h)` once the real size is known. While deferred,
`width`/`height` report 0 and calling `colorView()` raises an error
pointing to `resize()`. Check `canvas.width > 0` to gate work.

### `gpuTarget`

```lua theme={null}
gpuTarget() -> GPUTarget?
```

Rive's render target: passes into it land under all of Rive's
content. It cannot be sampled and starts each frame undefined, so the
first pass must clear or cover it. With a sampleCount of 1 it can
resolve a script's MSAA texture. On a frame the host hides it, `view`
is nil and passes into it drop. Nil where the host can never expose
one; keep a `gpuCanvas` and draw its image instead.

### `features`

```lua theme={null}
features() -> GPUFeatures
```

Query GPU capabilities. Returns a table of supported features
and limits for the current backend.

### `shader`

```lua theme={null}
shader(name: string) -> Shader?
```

Get a compiled shader by asset name (the name as added in the editor,
with no ".wgsl" extension). Returns a Shader ready for use in
GPUPipeline.new(), or nil if the named shader is not found.

### `decodeImage`

```lua theme={null}
decodeImage(data: buffer) -> Promise<DecodedImage>
```

Decode compressed image data (PNG, JPEG, WebP) into premultiplied RGBA8 pixels.
Returns a Promise that resolves with a DecodedImage table.
Use with await() inside async(), or chain with :andThen().
