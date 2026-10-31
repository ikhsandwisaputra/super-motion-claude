---
source: https://rive.app/docs/scripting/api-reference/gradient/gradient
title: "Gradient"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Gradient

Represents a gradient used for filling or stroking a shape. A gradient is
defined by a set of color stops ([GradientStop](/docs/scripting/api-reference/gradient/gradient-stop)) and either a linear or radial configuration.

## Constructors

### `linear`

```lua theme={null}
linear(from: Vector, to: Vector, stops: {GradientStop}) -> Gradient
```

Creates a linear gradient that transitions between the specified color
stops along the line from 'from' to 'to'.

```lua theme={null}
local g = Gradient.linear(Vector.xy(0, 0), Vector.xy(100, 0), {
  { position = 0, color = Color.rgb(255, 0, 0) },
  { position = 1, color = Color.rgb(0, 0, 255) },
})
```

### `radial`

```lua theme={null}
radial(from: Vector, radius: number, stops: {GradientStop}) -> Gradient
```

Creates a radial gradient centered at 'from', extending outward to the
given radius, using the specified color stops.

```lua theme={null}
local g = Gradient.radial(Vector.xy(50, 50), 40, {
  { position = 0, color = Color.rgb(255, 0, 0) },
  { position = 1, color = Color.rgb(0, 0, 255) },
})
```
