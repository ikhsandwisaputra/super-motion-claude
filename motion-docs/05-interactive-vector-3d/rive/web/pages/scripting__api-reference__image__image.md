---
source: https://rive.app/docs/scripting/api-reference/image/image
title: "Image"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Image

Represents an image asset that can be drawn by the [Renderer](/docs/scripting/api-reference/renderer/renderer).

```lua highlight={2,7,15} theme={null}
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

## Fields

### `width`

Width of the image, or `0` until it has decoded. Web runtimes and the
CLI preview decode images after `init` runs, so read it when you use
it, not once in `init`.

```lua highlight={4} theme={null}
self.myImage = context:image('myImage')

if self.myImage then
    print("myImage width:", self.myImage.width)
end
```

### `height`

Height of the image, or `0` until it has decoded. Web runtimes and the
CLI preview decode images after `init` runs, so read it when you use
it, not once in `init`.

```lua highlight={4} theme={null}
self.myImage = context:image('myImage')

if self.myImage then
    print("myImage height:", self.myImage.height)
end
```

## Methods

### `view`

```lua theme={null}
view() -> GPUTextureView
```

Returns a GPUTextureView for sampling this image in WGSL shaders.
The view wraps the underlying GPU texture directly — no copy or decode.
Requires a GPU context (only available when the file uses GPU canvases).
An `ImageAsset`'s view samples its pixels once the image has decoded;
on the web that is after `init`, so take the view once `width` is
above 0.
