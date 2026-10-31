---
source: https://rive.app/docs/scripting/api-reference/artboards/drawable
title: "Drawable"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Drawable

A drawable that carries custom properties, handed to the visitor of
`artboard:draw(renderer, visitor)`. It is only valid inside that visitor
call.

## Methods

### `number`

```lua theme={null}
number(key: PropertyKey) -> number?
```

The custom number property of this key, nil when there is none.

### `boolean`

```lua theme={null}
boolean(key: PropertyKey) -> boolean?
```

The custom boolean property of this key, nil when there is none.

### `color`

```lua theme={null}
color(key: PropertyKey) -> Color?
```

The custom color property of this key, nil when there is none.

### `string`

```lua theme={null}
string(key: PropertyKey) -> string?
```

The custom string property of this key, nil when there is none.

### `properties`

```lua theme={null}
properties() -> {DrawableProperty}
```

Every custom property on the drawable. For tooling and debugging:
the editor and rive-cli have it, a shipping runtime does not, so do
not call it from a script you ship.

### `draw`

```lua theme={null}
draw(renderer: Renderer) -> ()
```

Draws the drawable under the renderer's current state.
