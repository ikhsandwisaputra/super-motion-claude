---
source: https://rive.app/docs/scripting/api-reference/gpu/gpu-texture
title: "GPUTexture"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# GPUTexture

A GPU texture (2-D, cube, 3-D, or array).

## Fields

### `width`

Width of mip 0 in texels.

### `height`

Height of mip 0 in texels.

### `format`

Pixel format.

## Constructors

### `new`

```lua theme={null}
new(desc: {width: number, height: number, format: TextureFormat?, type: TextureType?, renderTarget: boolean?, mipmaps: number?, layers: number?, sampleCount: number?, label: string?,}) -> GPUTexture
```

## Methods

### `view`

```lua theme={null}
view(desc: {dimension: TextureType?, aspect: TextureAspect?, baseMipLevel: number?, mipCount: number?, baseLayer: number?, layerCount: number?,}?) -> GPUTextureView
```

Create a view into a sub-range of this texture. All fields optional;
omit desc entirely for a full-texture view.
Views are immutable. Create them once at init next to the texture and
reuse them every frame. Calling view() in a per-frame draw callback
creates and destroys a native GPU object each frame.

### `upload`

```lua theme={null}
upload(desc: {data: buffer, mipLevel: number?, layer: number?, width: number?, height: number?,}) -> ()
```

Upload pixel data to a specific mip / layer.
