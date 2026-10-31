---
source: https://rive.app/docs/scripting/api-reference/text/font
title: "Font"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Font

A font that shapes and draws text. Fonts come from the file's assets with
`context:font(name)`, from a view model `Property<Font>`, or from bytes with
`Font.decode`. Metrics are for a 1 point font and grow negative upwards,
so multiply by the size and expect `ascent` below zero.

```lua highlight={6} theme={null}
type Label = {
  text: Text,
}

function init(self: Label, context: Context): boolean
  local font = context:font('Inter')
  if font then
    self.text:append('Hello', { font = font, size = 24, paint = Paint.new() })
  end
  return true
end
```

## Fields

### `ascent`

Distance from the baseline to the top of the em box for a 1 point font, negative.

### `descent`

Distance from the baseline to the bottom of the em box for a 1 point font.

### `capHeight`

Distance from the baseline to the top of capital letters, negative.

### `xHeight`

Distance from the baseline to the top of lowercase letters, negative.

### `weight`

Weight from 1 to 1000, 400 being regular.

### `isItalic`

### `axes`

Variable axes the font offers.

### `features`

Four letter OpenType feature tags the font offers, such as 'liga'.

## Static Functions

### `decode`

```lua theme={null}
decode(bytes: buffer) -> Font?
```

Decodes a TrueType or OpenType font from bytes a script obtained
itself, such as a downloaded file. Font files in a project are font
assets, reached with `context:font`, not blobs. Returns nil when the
bytes are not a font.

```lua theme={null}
local font = Font.decode(downloadedBytes)
```

## Methods

### `lineHeight`

```lua theme={null}
lineHeight(size: number) -> number
```

Height of one line of text at the given size.

### `hasGlyph`

```lua theme={null}
hasGlyph(codepoint: number) -> boolean
```

Whether the font has a glyph for the unicode codepoint.

### `axisValue`

```lua theme={null}
axisValue(tag: string) -> number
```

Current value of a variable axis, by tag.

### `withOptions`

```lua theme={null}
withOptions(axes: {[string]: number}?, features: {[string]: number}?) -> Font
```

A new font at the given axis values and feature settings.

```lua theme={null}
local bold = font:withOptions({ wght = 700 }, { liga = 0 })
```

### `glyphPath`

```lua theme={null}
glyphPath(glyphId: number) -> Path
```

Outline of one glyph in 1 point units with the baseline at y 0, wound
for a clockwise fill. Scale by the font size to draw it.
