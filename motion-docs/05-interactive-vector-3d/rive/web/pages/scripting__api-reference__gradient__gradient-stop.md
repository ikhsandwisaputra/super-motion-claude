---
source: https://rive.app/docs/scripting/api-reference/gradient/gradient-stop
title: "GradientStop"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# GradientStop

A color stop in a [Gradient](/docs/scripting/api-reference/gradient/gradient), defined by its position in the range \[0, 1] and
the color at that position.

## Fields

### `position`

Position of the stop along the gradient, where 0 is the start and 1 is
the end.

```lua highlight={3,7} theme={null}
local g = Gradient.linear(Vector.xy(0, 0), Vector.xy(100, 0), {
    {
        position = 0,
        color = Color.rgb(255, 0, 0)
    },
    {
        position = 1,
        color = Color.rgb(0, 0, 255)
    },
})
```

### `color`

[Color](/docs/scripting/api-reference/color/color) at the specified position.

```lua highlight={4,8} theme={null}
local g = Gradient.linear(Vector.xy(0, 0), Vector.xy(100, 0), {
    {
        position = 0,
        color = Color.rgb(255, 0, 0)
    },
    {
        position = 1,
        color = Color.rgb(0, 0, 255)
    },
})
```
