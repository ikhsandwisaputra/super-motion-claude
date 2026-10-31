---
source: https://rive.app/docs/scripting/api-reference/text/text-run-style
title: "TextRunStyle"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# TextRunStyle

Style of one run appended to a [Text](/docs/scripting/api-reference/text/text).

## Fields

### `font`

### `size`

Font size, 16 when omitted.

### `lineHeight`

Line height, the font's own when omitted.

### `letterSpacing`

### `paint`

Runs sharing a paint draw as one path. A run without a paint only
draws when `Text:draw` is given one.

### `foregroundColor`

Color used by emoji layers that take the text color.
