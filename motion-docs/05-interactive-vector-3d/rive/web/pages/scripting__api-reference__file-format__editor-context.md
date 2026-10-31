---
source: https://rive.app/docs/scripting/api-reference/file-format/editor-context
title: "EditorContext"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# EditorContext

Edit time context handed to FileFormat views. Everything it returns is
either immutable or a private instance; nothing reaches back into the
open file's live state.

## Methods

### `image`

```lua theme={null}
image(name: string) -> Image?
```

Looks up an image asset by name, or nil when missing.

### `blob`

```lua theme={null}
blob(name: string) -> Blob?
```

Looks up a blob asset by name, or nil when missing.

### `artboard`

```lua theme={null}
artboard(name: string) -> Artboard<ViewModel?>?
```

A fresh instance of a named artboard, private to this view. The
artboard's default view model instance is bound and reachable through
`data`, nil when the artboard has no view model.

Names resolve against this script's own file, so a format shipped in a
library reaches that library's artboards. Prefix a name with a
library's namespace (`markdown@0/Document`) to name one explicitly,
and use `hostArtboard` for the file being edited.

### `hostArtboard`

```lua theme={null}
hostArtboard(name: string) -> Artboard<ViewModel?>?
```

Like `artboard`, but always resolves in the file being edited. When
this script is authored in that same file the two are identical, so a
library developed in place behaves as it does once shipped.

### `theme`

```lua theme={null}
theme() -> EditorTheme
```

The editor's current theme.

### `openUrl`

```lua theme={null}
openUrl(url: string)
```

Opens a url in the user's browser.

### `themeFont`

```lua theme={null}
themeFont() -> Font?
```

The font the code editor renders with, for previews that want to
match its typography. Assign to a view model font property.

### `defaultFont`

```lua theme={null}
defaultFont() -> Font?
```

The editor's default UI font, for preview prose. Assign to a view
model font property.

### `codeFont`

```lua theme={null}
codeFont() -> Font?
```

The editor's built-in code font, for preview code regions. Assign to
a view model font property.

### `editorScroll`

```lua theme={null}
editorScroll() -> EditorScroll?
```

The text editor's scroll position, refreshed each draw while the user
scrolls, or nil on surfaces without an attached editor (inspector,
viewer tab). Use with `scrollTo` to keep the preview in sync.

### `scrollTo`

```lua theme={null}
scrollTo(x: number, y: number) -> ()
```

Scrolls the pane hosting this view to a content offset, clamped to
the measured content. Only meaningful for pane views with `measure`;
elsewhere it is ignored.

### `scrollEditorTo`

```lua theme={null}
scrollEditorTo(line: number) -> ()
```

Scrolls the attached text editor to a fractional line factor (the
same unit `editorScroll` reports), clamped to the editor's range.
Ignored without an attached editor. Guard against ping-pong when
combining with `editorScroll` driven syncing.

### `requestDraw`

```lua theme={null}
requestDraw() -> ()
```

Asks the host to repaint the view outside the advance loop, e.g. when
an async decode completes.

### `shader`

```lua theme={null}
shader(name: string) -> Shader?
```

Looks up a compiled shader by name, or nil when missing.

### `canvas`

```lua theme={null}
canvas(desc: {width: number?, height: number?}?) -> Canvas
```

Creates a CPU canvas. Zero or missing size defers the backing
texture.

### `gpuCanvas`

```lua theme={null}
gpuCanvas(desc: {width: number?, height: number?}?) -> GPUCanvas
```

Creates a GPU canvas for render pass drawing. Zero or missing size
defers the backing texture.

### `features`

```lua theme={null}
features() -> GPUFeatures
```

Capabilities of the active GPU device.

### `decodeImage`

```lua theme={null}
decodeImage(data: buffer) -> Promise<DecodedImage>
```

Decodes an encoded image (png, jpeg, webp) into a drawable image.
