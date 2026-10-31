---
source: https://rive.app/docs/scripting/api-reference/image/image-filter
title: "ImageFilter"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# ImageFilter

Defines how image sampling is performed when scaling or transforming the
image.

* `bilinear`
* `nearest`

See [ImageSampler](/docs/scripting/api-reference/image/image-sampler) for usage.

```lua highlight={6} theme={null}
function init(self: DrawImage, context: Context): boolean
  self.myImage = context:image('myImage')
  self.sampler = ImageSampler(
    'clamp',
    'clamp',
    'bilinear'
  )

  return true
end
```
