---
source: https://rive.app/docs/scripting/api-reference/paint/stroke-cap
title: "StrokeCap"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# StrokeCap

Defines the shape used at the ends of open stroke segments.

* `butt` — Squared end with no extension.
* `round` — Semicircular cap.
* `square` — Squared cap that extends past the end point.

```lua highlight={3} theme={null}
self.paint = Paint.with({
  color = Color.rgb(255, 100, 50),
  cap = 'round',
  style = 'stroke',
})
```
