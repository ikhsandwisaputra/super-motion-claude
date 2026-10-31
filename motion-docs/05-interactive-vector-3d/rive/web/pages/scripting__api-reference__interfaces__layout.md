---
source: https://rive.app/docs/scripting/api-reference/interfaces/layout
title: "Layout"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Layout

A scripted Layout which can function just like a [Node](/docs/scripting/api-reference/interfaces/node) but
also has the ability to fit into a layout box provided via
resize. It can also be intrinsically sized allowing hosting
layouts to attempt to fit to its size by using the measure
function to report desired dimensions.

For more information, see [Layout Scripts](/docs/scripting/protocols/layout-scripts).

## Methods

### `measure`

```lua theme={null}
measure(self: T) -> Vector
```

When provided this Layout can be intrinsically sized/request
to be a specific size. This is not guaranteed as the layout
may have min/max dimensions. Resize will be called with the
granted size after being measured.

```lua theme={null}
-- Measure the computed size of the layout on resize
function measure(self: MyLayout): Vector
  return Vector.xy(100, 100)
end
```

### `resize`

```lua theme={null}
resize(self: T, size: Vector, scale: number) -> ()
```

When provided, called to set the initial size and again whenever
the size changes. Layouts that do not react to their box may omit
it; the runtime no-ops when it is not implemented.

```lua theme={null}
-- Called when the layout resizes based on the content
-- This only applies to Layouts with a fit type of Hug
-- scale is the presenting surface's device pixels per point.
function resize(self: MyLayout, size: Vector, scale: number)
  print('Resize:', size, scale)
end
```
