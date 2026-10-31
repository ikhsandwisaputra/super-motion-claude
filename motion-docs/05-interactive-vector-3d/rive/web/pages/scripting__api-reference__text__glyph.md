---
source: https://rive.app/docs/scripting/api-reference/text/glyph
title: "Glyph"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Glyph

One glyph placed by a [Text](/docs/scripting/api-reference/text/text) layout, in the text's local space.

## Fields

### `id`

Glyph id within `font`.

### `font`

### `size`

### `x`

Pen position on the baseline, the shaper's offset included.

### `y`

### `advance`

### `textIndex`

Index of the first codepoint this glyph draws, 1 based.

### `direction`

Direction of the run the glyph belongs to.

### `isColor`

Whether this is a color glyph (emoji) drawn as layers rather than one outline.

### `transform`

Places the 1 point outline from `Font:glyphPath` at this glyph's size and position.

## Methods

### `path`

```lua theme={null}
path() -> Path
```

The outline placed by `transform`, as a new [Path](/docs/scripting/api-reference/path/path).
