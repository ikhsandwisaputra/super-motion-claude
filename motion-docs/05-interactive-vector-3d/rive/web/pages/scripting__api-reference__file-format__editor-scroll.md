---
source: https://rive.app/docs/scripting/api-reference/file-format/editor-scroll
title: "EditorScroll"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# EditorScroll

Scroll position of the text editor pane showing this document. `line` is
the fractional 0-based line at the top of the viewport: 10.5 means the
viewport top sits halfway through line 10. `percent` runs 0 to 1 across
the editor's scrollable range.

## Fields

### `percent`

### `line`

### `maxLine`

Scrollable range in line units (the top line when fully scrolled).

### `cursorLine`

The primary cursor's line, and where it sits in the viewport
(0 top to 1 bottom, outside that range when off screen). Nil when
the editor has no cursor.

### `cursorFraction`
