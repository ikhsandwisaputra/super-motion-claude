---
source: https://rive.app/docs/scripting/api-reference/paint/paint
title: "Paint"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Paint

Describes how shapes are drawn, including fill or stroke style, thickness,
color, gradient, and blending behavior.

## Fields

### `style`

Painting style of type [PaintStyle](/docs/scripting/api-reference/paint/paint-style).

```lua highlight={3} theme={null}
self.paint = Paint.with({
  color = Color.rgb(255, 100, 50),
  style = 'stroke',
})
```

### `join`

Stroke join behavior for corners. See [StrokeJoin](/docs/scripting/api-reference/paint/stroke-join).

```lua highlight={3} theme={null}
self.paint = Paint.with({
  color = Color.rgb(255, 100, 50),
  join = 'round',
  style = 'stroke',
})
```

### `cap`

Stroke cap used for line endings. See [StrokeCap](/docs/scripting/api-reference/paint/stroke-cap).

```lua highlight={3} theme={null}
self.paint = Paint.with({
  color = Color.rgb(255, 100, 50),
  cap = 'round',
  style = 'stroke',
})
```

### `thickness`

Thickness of the stroked path.

```lua highlight={3} theme={null}
self.paint = Paint.with({
  color = Color.rgb(255, 100, 50),
  thickness = 4,
  style = 'stroke',
})
```

### `blendMode`

Blending mode used when compositing. See [BlendMode](/docs/scripting/api-reference/paint/blend-mode).

```lua highlight={4} theme={null}
-- Create a new paint with a color and multiply blend mode
self.paint = Paint.with({
  color = Color.rgb(255, 100, 50),
  blendMode = 'multiply',
  style = 'fill',
})
```

### `feather`

Feathering amount.

```lua highlight={3} theme={null}
self.paint = Paint.with({
  color = Color.rgb(255, 100, 50),
  feather = 4,
  style = 'stroke',
})
```

### `gradient`

[Gradient](/docs/scripting/api-reference/gradient/gradient) applied to fill (if present).

```lua highlight={8} theme={null}
local g = Gradient.linear(Vector.xy(0, 0), Vector.xy(10, 0), {
  { position = 0, color = Color.rgb(255, 0, 0) },
  { position = 1, color = Color.rgb(0, 0, 255) },
})

self.paint = Paint.with({
  color = Color.rgb(255, 100, 50),
  gradient = g,
  style = 'fill',
})
```

### `gradientTransform`

Transform applied to the paint's `gradient`.

```lua highlight={9} theme={null}
local g = Gradient.linear(Vector.xy(0, 0), Vector.xy(10, 0), {
  { position = 0, color = Color.rgb(255, 0, 0) },
  { position = 1, color = Color.rgb(0, 0, 255) },
})

self.paint = Paint.with({
  gradient = g,
  gradientTransform = Mat2D.withTranslation(10, 0),
  style = 'fill',
})
```

### `color`

Color. See [Color](/docs/scripting/api-reference/color/color).

```lua highlight={2} theme={null}
self.paint = Paint.with({
  color = Color.rgb(255, 100, 50),
  style = 'fill',
})
```

## Constructors

### `new`

```lua theme={null}
new() -> Paint
```

Creates a new [Paint](/docs/scripting/api-reference/paint/paint) object with default settings.

```lua theme={null}
local paint = Paint.new()
paint.style = 'fill'
paint.color = Color.rgb(255, 200, 80)
```

### `with`

```lua theme={null}
with(values: PaintDefinition) -> Paint
```

Creates a new Paint initialized from the provided [PaintDefinition](/docs/scripting/api-reference/paint/paint-definition).

```lua theme={null}
local strokePaint = Paint.with({
  style = 'stroke',
  thickness = 3,
  color = Color.rgb(255, 0, 102),
  join = 'round',
  cap = 'round',
})
```

## Methods

### `copy`

```lua theme={null}
copy(values: PaintDefinition?) -> Paint
```

Returns a new Paint that copies this one, optionally overriding selected
properties with values from the provided [PaintDefinition](/docs/scripting/api-reference/paint/paint-definition).
Returns a new [Paint](/docs/scripting/api-reference/paint/paint) instance.

```lua highlight={6,7,8,9} theme={null}
local base = Paint.with({
  style = 'fill',
  color = Color.rgb(255, 0, 0),
})

local outline = base:copy({
  style = 'stroke',
  thickness = 4,
})
```
