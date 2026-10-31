---
source: https://rive.app/docs/scripting/api-reference/file-format/format-view
title: "FormatView"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# FormatView

A live preview of one document on one surface. Created by
`FileFormat.view`; disposed when its surface closes.

## Methods

### `draw`

```lua theme={null}
draw(renderer: Renderer, width: number, height: number) -> ()
```

Draws the current frame into a viewport of width by height.

### `measure`

```lua theme={null}
measure(viewportWidth: number, viewportHeight: number) -> (number, number)
```

Pane surfaces only: the content's intrinsic size for the given
viewport, driving the pane's scrollbars. Called when the view is
created, the document changes, the viewport resizes, or requestDraw
fires. Omit for fit-to-viewport views; the inspector never measures.

### `advance`

```lua theme={null}
advance(seconds: number) -> boolean
```

Advances animation state. Return true to keep receiving frames.

### `textScrolled`

```lua theme={null}
textScrolled(x: number, y: number, line: number, maxLine: number) -> ()
```

The user scrolled the text editor. x/y are scroll percentages and
line is the fractional top visible line. Never fired for scrolls the
host performed on the view's behalf (scrollEditorTo), so handlers can
follow without echo bookkeeping.

### `paneScrolled`

```lua theme={null}
paneScrolled(x: number, y: number) -> ()
```

The user scrolled the preview pane (measured views only). x/y are the
new offsets in content coordinates. Never fired for scrolls the host
applied from `editor:scrollTo`.

### `paneWheel`

```lua theme={null}
paneWheel(dx: number, dy: number) -> ()
```

Raw wheel/trackpad input over an unmeasured (self-scrolling) preview,
in pixels with positive y scrolling down. Implement to route pane
input into the view's own scrolling; without it the host falls back
to scrolling the paired text editor.

### `pointerDown`

```lua theme={null}
pointerDown(event: PointerEvent) -> ()
```

Pointer input over the preview surface, in the same coordinate space
draw receives. Signatures match the Layout protocol so live artboards
can forward events directly (board:pointerDown(event), ...).

### `pointerMove`

```lua theme={null}
pointerMove(event: PointerEvent) -> ()
```

### `pointerUp`

```lua theme={null}
pointerUp(event: PointerEvent) -> ()
```

### `documentChanged`

```lua theme={null}
documentChanged(doc: FormatDocument, parsed: buffer?) -> ()
```

Text documents only: the document changed; refresh derived state.

### `selectionChanged`

```lua theme={null}
selectionChanged(line: number, column: number) -> ()
```

Text documents only: the primary cursor moved. line and column are
zero based code point coordinates.

### `dispose`

```lua theme={null}
dispose() -> ()
```

The surface is closing; release resources.
