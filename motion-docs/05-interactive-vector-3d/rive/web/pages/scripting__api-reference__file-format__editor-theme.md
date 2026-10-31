---
source: https://rive.app/docs/scripting/api-reference/file-format/editor-theme
title: "EditorTheme"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# EditorTheme

The editor's resolved code theme (defaults, the user's Luau config, and
overrides already merged). Values refresh live when the user's config
changes; read inside draw/measure rather than caching across frames.

## Fields

### `scopes`

Per-scope styles, the same palette the editor uses for this
document's highlight tokens.

### `background`

### `divider`

### `dividerHighlight`

### `error`

### `warning`

### `lineNumber`

### `fontSize`

### `lineHeight`
