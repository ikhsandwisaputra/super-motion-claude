---
source: https://rive.app/docs/scripting/api-reference/text/text
title: "Text"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Text

Shapes and lays out styled runs of text with the runtime's shaper, so
scripts get real line breaking and bidirectional ordering. Append runs,
set the box, then draw it in one call or walk its lines and glyphs to draw
them yourself. Codepoint indices are 1 based like `utf8.offset`.

```lua highlight={8,9,10,11,15} theme={null}
type Label = {
  text: Text,
  paint: Paint,
}

function init(self: Label, context: Context): boolean
  local font = context:font('IBM Plex Sans Arabic')
  self.text:append('مرحبا بالعالم', { font = font, size = 32, paint = self.paint })
  self.text.sizing = 'fixed'
  self.text.maxWidth = 240
  self.text.align = 'start'
  return true
end

function draw(self: Label, renderer: Renderer)
  self.text:draw(renderer)
end
```

## Fields

### `sizing`

### `overflow`

### `align`

### `wrap`

### `wordBreak`

### `origin`

### `direction`

### `maxWidth`

Wrap width when sizing is not 'autoWidth'.

### `maxHeight`

Height the text overflows at when sizing is 'fixed'.

### `paragraphSpacing`

Space between paragraphs separated by a newline.

### `length`

Number of codepoints appended.

### `isEmpty`

### `lineCount`

## Constructors

### `new`

```lua theme={null}
new() -> Text
```

Creates an empty text.

## Methods

### `append`

```lua theme={null}
append(text: string, style: TextRunStyle) -> ()
```

Appends a styled run. Runs join into one string; a newline starts a paragraph.

### `clear`

```lua theme={null}
clear() -> ()
```

Removes every run.

### `draw`

```lua theme={null}
draw(renderer: Renderer, paint: Paint?) -> ()
```

Draws every run with its own paint, or all of them with the given paint.

### `bounds`

```lua theme={null}
bounds() -> (Vector, Vector)
```

Minimum and maximum corner of the laid out text.

### `line`

```lua theme={null}
line(index: number) -> TextLine
```

The line at a 1 based index, top to bottom.

### `lines`

```lua theme={null}
lines() -> {TextLine}
```

Every line, top to bottom.

### `hitTest`

```lua theme={null}
hitTest(position: Vector) -> number
```

The codepoint index nearest a point in the text's local space.

### `caret`

```lua theme={null}
caret(index: number) -> (number, number, number)
```

The caret before the codepoint at index: its x, top and bottom. Nil when the text is empty.

### `selectionRects`

```lua theme={null}
selectionRects(from: number, to: number) -> {{min: Vector, max: Vector}}
```

Rectangles covering the codepoints from one index to another, one per glyph.
