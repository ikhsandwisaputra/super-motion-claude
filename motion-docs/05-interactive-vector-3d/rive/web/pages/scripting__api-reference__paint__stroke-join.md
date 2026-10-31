---
source: https://rive.app/docs/scripting/api-reference/paint/stroke-join
title: "StrokeJoin"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# StrokeJoin

Defines how two stroke segments are joined at a corner.

* `miter` — Sharp corner.
* `round` — Rounded corner.
* `bevel` — Flattened corner.

```lua highlight={3} theme={null}
self.paint = Paint.with({
  color = Color.rgb(255, 100, 50),
  join = 'round',
  style = 'stroke',
})
```
