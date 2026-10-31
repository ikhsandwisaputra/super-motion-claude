---
source: https://rive.app/docs/scripting/api-reference/path/path-data
title: "PathData"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# PathData

PathData is an indexed collection of [PathCommand](/docs/scripting/api-reference/path/path-command) objects.
Both Path and PathData behave like arrays of commands and support iteration via ipairs.

## Methods

### `__len`

```lua theme={null}
__len() -> number
```

Each entry is a [PathCommand](/docs/scripting/api-reference/path/path-command) describing one segment or action in the path.

```lua theme={null}
for i, command in ipairs(pathData) do
  print(i, command.type)
end
```

Returns the number of commands in the path.

```lua theme={null}
local count = #pathData
print(count)
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
local contour = pathData:contours()
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
local measure = pathData:measure()
print(measure.length)
```
