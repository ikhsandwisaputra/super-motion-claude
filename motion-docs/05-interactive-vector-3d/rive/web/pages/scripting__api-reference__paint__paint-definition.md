---
source: https://rive.app/docs/scripting/api-reference/paint/paint-definition
title: "PaintDefinition"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# PaintDefinition

A partial set of paint properties used to initialize or update a Paint
instance. All fields are optional.

## Fields

### `style`

The painting style (stroke or fill).

```lua theme={null}
local paint = Paint.new()
paint.style = 'fill'
```

### `join`

Stroke join behavior for corners.

```lua theme={null}
local paint = Paint.new()
paint.join = 'round'
```

### `cap`

Stroke cap used for line endings.

```lua theme={null}
local paint = Paint.new()
paint.cap = 'round'
```

### `thickness`

Thickness of the stroked path.

```lua theme={null}
local paint = Paint.new()
paint.thickness = 4
```

### `blendMode`

Blending mode used when compositing.

```lua theme={null}
local paint = Paint.new()
paint.blendMode = 'multiply'
```

### `feather`

Feathering amount.

```lua theme={null}
local paint = Paint.new()
paint.feather = 3
```

### `gradient`

[Gradient](/docs/scripting/api-reference/gradient/gradient) fill applied to the paint.
If explicitly set to `false`, removes any existing gradient.

```lua highlight={7} theme={null}
local g = Gradient.linear(Vector.xy(0, 0), Vector.xy(10, 0), {
  { position = 0, color = Color.rgb(255, 0, 0) },
  { position = 1, color = Color.rgb(0, 0, 255) },
})

local paint = Paint.new()
paint.gradient = g
```

### `gradientTransform`

Transform applied to the paint's gradient.

```lua theme={null}
local paint = Paint.new()
paint.gradientTransform = Mat2D.withTranslation(10, 0)
```

### `color`

Color. See [Color](/docs/scripting/api-reference/color/color).
