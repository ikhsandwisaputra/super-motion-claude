---
source: https://rive.app/docs/scripting/api-reference/text/text-line
title: "TextLine"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# TextLine

One line of a [Text](/docs/scripting/api-reference/text/text) after wrapping. Iterate it to visit its glyphs in
visual order, left to right, whatever the writing direction.

```lua theme={null}
for _, line in text:lines() do
  for _, glyph in line do
    renderer:save()
    renderer:transform(glyph.transform)
    renderer:drawPath(glyph.font:glyphPath(glyph.id), paint)
    renderer:restore()
  end
end
```

## Fields

### `index`

1 based index of the line within the text.

### `x`

Left edge after alignment.

### `top`

### `baseline`

### `bottom`

### `width`

### `direction`

Base direction of the paragraph the line belongs to.

### `firstIndex`

First and last codepoint index on the line, 1 based.

### `lastIndex`

### `glyphCount`

## Methods

### `glyph`

```lua theme={null}
glyph(index: number) -> Glyph
```

The glyph at a 1 based visual position.

### `glyphs`

```lua theme={null}
glyphs() -> {Glyph}
```

All glyphs in visual order.

### `__iter`

```lua theme={null}
__iter() -> ((TextLine, number) ->(number?, Glyph), TextLine, number)
```

Iterates the glyphs in visual order: `for _, glyph in line do`.
