---
source: https://rive.app/docs/scripting/api-reference/path/path-measure
title: "PathMeasure"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# PathMeasure

## Fields

### `length`

The total length of the path across all contours.

```lua highlight={11} theme={null}
local function buildPath(path: Path)
    path:reset()
    path:moveTo(Vector.xy(-150, 0))
    path:cubicTo(Vector.xy(-80, -120), Vector.xy(80, 120), Vector.xy(150, 0))
    path:close()
    end

    function init(self: PathMeasureDemo, _context: Context): boolean
    buildPath(self.path)

    local measure = self.path:measure()
    print('length:', measure.length)

    return true
end
```

### `isClosed`

Returns true only if the path has exactly one contour and that contour is
closed. Paths with multiple contours always return false, even if all
contours are closed.

```lua highlight={11} theme={null}
local function buildPath(path: Path)
    path:reset()
    path:moveTo(Vector.xy(-150, 0))
    path:cubicTo(Vector.xy(-80, -120), Vector.xy(80, 120), Vector.xy(150, 0))
    end

    function init(self: PathMeasureDemo, _context: Context): boolean
    buildPath(self.path)

    local measure = self.path:measure()
    print('isClosed:', measure.isClosed)

    return true
end
```

## Methods

### `positionAndTangent`

```lua theme={null}
positionAndTangent(distance: number) -> (Vector, Vector)
```

Returns the position and tangent vector at the given distance along the
path. The distance is clamped to the valid range \[0, length]. Returns two
[Vector](/docs/scripting/api-reference/vector/vector) values: the position and the normalized tangent vector.

```lua highlight={10} theme={null}
function draw(self: PathMeasureDemo, renderer: Renderer)
  -- Draw the base path
  renderer:drawPath(self.path, pathPaint)

  local measure = self.path:measure()
  local len = measure.length

  -- positionAndTangent: place a dot that travels along the path
  local distance = (self.elapsed * 0.3 % 1.0) * len
  local pos, _tan = measure:positionAndTangent(distance)

  self.traveler:reset()
  drawDot(self.traveler, pos.x, pos.y, 8)
  renderer:drawPath(self.traveler, travelerPaint)
end
```

### `warp`

```lua theme={null}
warp(source: Vector) -> Vector
```

Warps a point onto the path. The x-coordinate of the source point is
interpreted as a distance along the path, and the y-coordinate is used as
an offset along the tangent direction. Returns the warped position as a
[Vector](/docs/scripting/api-reference/vector/vector).

```lua highlight={17} theme={null}
function draw(self: PathMeasureDemo, renderer: Renderer)
  -- Draw the base path
  renderer:drawPath(self.path, pathPaint)

  local measure = self.path:measure()
  local len = measure.length

  -- warp: map a grid of points onto the path using distance (x) and
  -- perpendicular offset (y), then draw a dot at each warped position
  self.warpPath:reset()
  local cols, rows = 16, 3
  local gap = 20
  for col = 0, cols do
    for row = -rows, rows do
      local srcX = (col / cols) * len
      local srcY = row * gap
      local warped = measure:warp(Vector.xy(srcX, srcY))
      drawDot(self.warpPath, warped.x, warped.y, 3)
    end
  end
  renderer:drawPath(self.warpPath, warpPaint)
end
```

### `extract`

```lua theme={null}
extract(startDistance: number, endDistance: number, destination: Path, startWithMove: boolean?) -> ()
```

Extracts a sub-section of the path from startDistance to endDistance and
appends it to the destination path. Distances are clamped to the valid
range \[0, length]. If startWithMove is true (the default), the extracted
segment begins with a moveTo operation. If false, it continues from the
previous point in the destination path.

```lua highlight={14,17,18} theme={null}
function draw(self: PathMeasureDemo, renderer: Renderer)
  -- Draw the base path
  renderer:drawPath(self.path, pathPaint)

  local measure = self.path:measure()
  local len = measure.length

  -- extract: animate a highlight window traveling along the path
  local windowSize = len * 0.4
  local startD = (self.elapsed * 0.3 % 1.0) * len
  local endD = startD + windowSize
  self.extractedPath:reset()
  if endD <= len then
    measure:extract(startD, endD, self.extractedPath)
  else
    -- wrap around the end of the path
    measure:extract(startD, len, self.extractedPath)
    measure:extract(0, endD - len, self.extractedPath, false)
  end
  renderer:drawPath(self.extractedPath, extractPaint)
end
```
