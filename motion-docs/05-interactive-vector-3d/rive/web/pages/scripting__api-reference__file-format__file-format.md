---
source: https://rive.app/docs/scripting/api-reference/file-format/file-format
title: "FileFormat"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# FileFormat

Implement this protocol to add editor support for a custom binary file
format. Files with a claimed extension import as blobs, keeping their raw
bytes, and get previews from `view`. For text formats that should be
editable in the editor, implement TextFileFormat instead.

```lua theme={null}
local format: FileFormat = {
    name = 'Model',
    extensions = { 'glb' },
}

return function(): FileFormat
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
