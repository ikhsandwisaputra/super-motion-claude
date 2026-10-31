---
source: https://rive.app/docs/scripting/api-reference/paint/paint-style
title: "PaintStyle"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# PaintStyle

Specifies how the shape should be painted.

* `stroke`
* `fill`

```lua highlight={3} theme={null}
self.paint = Paint.with({
  color = Color.rgb(255, 100, 50),
  style = 'stroke',
})
```
