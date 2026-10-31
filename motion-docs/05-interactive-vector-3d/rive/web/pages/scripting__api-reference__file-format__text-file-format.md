---
source: https://rive.app/docs/scripting/api-reference/file-format/text-file-format
title: "TextFileFormat"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# TextFileFormat

A FileFormat for text. Files with a claimed extension import as in-band
text documents, editable in the editor and synced across collaborators,
and the callbacks below drive the text editor's intelligence. Documents
export as plain blobs, so scripts read them via `context:blob(name)` at
both edit time and runtime.

Analysis callbacks are pure functions of `(doc, parsed)`; state lives
only in views. `parsed` carries the cached result of `parse`, or nil when
`parse` is not implemented.

```lua theme={null}
local format: TextFileFormat = {
    name = 'Markdown',
    extensions = { 'md' },
}

return function(): TextFileFormat
    return format
end
```

## Fields

### `name`

Display name of the format, e.g. "Markdown".

### `extensions`

File extensions handled, without dots, e.g. `{"md", "markdown"}`.

## Methods

### `parse`

```lua theme={null}
parse(doc: FormatDocument) -> buffer?
```

Optional. Called once per document version; the returned buffer is
cached by Rive, keyed to the document's content, and passed back into
every other callback. Within one VM the same buffer object is reused;
across VMs the bytes are copied once.

### `view`

```lua theme={null}
view(doc: FormatDocument, editor: EditorContext, surface: FormatSurface, parsed: buffer?) -> FormatView?
```

Creates the preview for a document on a surface. Each surface gets
its own view; a document can be visible on several at once.

### `highlight`

```lua theme={null}
highlight(doc: FormatDocument, parsed: buffer?) -> {FormatToken}
```

Returns highlight tokens for the document.

### `diagnostics`

```lua theme={null}
diagnostics(doc: FormatDocument, parsed: buffer?) -> {FormatDiagnostic}
```

Returns problems for the document.

### `completions`

```lua theme={null}
completions(doc: FormatDocument, line: number, column: number, parsed: buffer?) -> {FormatCompletion}
```

Returns completions at the given position.

### `hover`

```lua theme={null}
hover(doc: FormatDocument, line: number, column: number, parsed: buffer?) -> FormatHover?
```

Returns hover documentation at the given position, or nil.

### `format`

```lua theme={null}
format(doc: FormatDocument, parsed: buffer?) -> string?
```

Returns the fully formatted text, or nil to leave the document
unchanged. Rive diffs the result against the current text and applies
minimal edits.
