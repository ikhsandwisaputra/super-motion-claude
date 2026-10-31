---
source: https://rive.app/docs/scripting/api-reference/path/path
title: "Path"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Path

Path is a mutable path object that can be drawn by a Renderer. An unchanged
path can be drawn multiple times per frame. However, if you mutate it (via
moveTo, lineTo, cubicTo, add, etc.) after drawing, you must wait until the
next frame to draw it again.

## Constructors

### `new`

```lua theme={null}
new() -> Path
```

```lua highlight={2} theme={null}
local path = Path.new()
path:moveTo(Vector.xy(0, 0))
```

## Methods

### `moveTo`

```lua theme={null}
moveTo(to: Vector) -> ()
```

Moves the current point to the specified location, starting a new contour.

```lua theme={null}
path:moveTo(Vector.xy(0, 0))
```

### `lineTo`

```lua theme={null}
lineTo(to: Vector) -> ()
```

Adds a straight line segment from the current point to the specified point.

```lua theme={null}
path:lineTo(Vector.xy(10, 0))
```

### `quadTo`

```lua theme={null}
quadTo(control: Vector, to: Vector) -> ()
```

Adds a quadratic Bézier curve from the current point to the specified point,
using the control point to define the curve shape.

```lua theme={null}
path:quadTo(
  Vector.xy(-50, -50), -- control point
  Vector.xy(0, 0)      -- end point
)
```

### `cubicTo`

```lua theme={null}
cubicTo(controlOut: Vector, controlIn: Vector, to: Vector) -> ()
```

Adds a cubic Bézier curve from the current point to the specified point,
using `controlOut` for the start tangent and `controlIn` for the end tangent.

```lua theme={null}
path:cubicTo(
  Vector.xy(25, -40),  -- control point out
  Vector.xy(75, 40),   -- control point in
  Vector.xy(100, 0)    -- end point
)
```

### `close`

```lua theme={null}
close() -> ()
```

Closes the current contour by adding a line segment from the current point
back to the first point of the contour (the last `moveTo`).

```lua theme={null}
-- Draw a rectangle
path:moveTo(Vector.xy(-10, -10))
path:lineTo(Vector.xy(10, -10))
path:lineTo(Vector.xy(10, 10))
path:lineTo(Vector.xy(-10, 10))
-- Close the path
path:close()
```

### `__len`

```lua theme={null}
__len() -> number
```

Each entry is a [PathCommand](/docs/scripting/api-reference/path/path-command) describing one segment or action in the path.

```lua theme={null}
local cmd = path[1]
print(cmd.type)
```

Returns the number of commands in the path.

```lua theme={null}
local count = #path
print(count)
```

### `reset`

```lua theme={null}
reset() -> ()
```

Do not mutate or reset a [Path](/docs/scripting/api-reference/path/path) in the same frame after drawing it.
If you need to change it, wait until the next frame.
Only call `reset` on subsequent frames if you've called `Renderer.drawPath`
with it.

```lua theme={null}
path:reset()
```

### `add`

```lua theme={null}
add(other: PathData, transform: Mat2D?) -> ()
```

Appends the commands from `other` onto this path. If `transform` is provided,
the appended commands are transformed as they are added.

```lua theme={null}
local dst = Path.new()
local src = Path.new()

src:moveTo(Vector.xy(0, 0))
src:lineTo(Vector.xy(10, 0))
src:lineTo(Vector.xy(10, 10))
src:close()

-- Add `src` into `dst` (optionally with a transform)
dst:add(src)
```

### `contours`

```lua theme={null}
contours() -> ContourMeasure?
```

Returns a [ContourMeasure](/docs/scripting/api-reference/path/contour-measure) for the first contour in the path. A contour is a
sequence of path segments starting at a `moveTo` and ending before the next
`moveTo` (or end of path). Use the `next` property on the returned
[ContourMeasure](/docs/scripting/api-reference/path/contour-measure) to iterate through subsequent contours. Returns `nil` if the
path has no contours.

```lua theme={null}
local contour = path:contours()
while contour do
  print(contour.length)
  contour = contour.next
end
```

### `measure`

```lua theme={null}
measure() -> PathMeasure
```

Returns a [PathMeasure](/docs/scripting/api-reference/path/path-measure) that measures the entire path across all contours.
This provides the total length and allows operations on the path as a whole.

```lua theme={null}
local measure = path:measure()
local pathLength = measure.length
print(pathLength)
```
