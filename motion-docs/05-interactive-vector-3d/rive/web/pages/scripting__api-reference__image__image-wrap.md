---
source: https://rive.app/docs/scripting/api-reference/image/image-wrap
title: "ImageWrap"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# ImageWrap

Defines how texture coordinates outside the \[0, 1] range are handled.

* `clamp`
* `repeat`
* `mirror`

See [ImageSampler](/docs/scripting/api-reference/image/image-sampler) for usage.

```lua highlight={5,7} theme={null}
function init(self: DrawImage, context: Context): boolean
  self.myImage = context:image('myImage')
  self.sampler = ImageSampler(
    -- Image wrap X
    'clamp',
    -- Image wrap Y
    'clamp',
    'bilinear'
  )

  return true
end
```
