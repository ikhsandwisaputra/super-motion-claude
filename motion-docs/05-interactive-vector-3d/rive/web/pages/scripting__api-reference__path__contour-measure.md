---
source: https://rive.app/docs/scripting/api-reference/path/contour-measure
title: "ContourMeasure"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# ContourMeasure

A ContourMeasure is a way to measure and manipulate a single contour within a path.
A contour is one continuous drawing sequence that starts with a `moveTo` and continues until the next `moveTo` (or the end of the path).

## Fields

### `next`

Returns the next [ContourMeasure](/docs/scripting/api-reference/path/contour-measure) in the path, or nil if this is the last
contour. Use this to iterate through all contours in a path after calling
path:contours(). Each read advances through the path, so read it once
per contour.

```lua theme={null}
local contour = pathData:contours()
while contour do
  print(contour.length)
  contour = contour.next
end
```
