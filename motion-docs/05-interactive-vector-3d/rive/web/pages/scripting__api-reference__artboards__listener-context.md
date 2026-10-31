---
source: https://rive.app/docs/scripting/api-reference/artboards/listener-context
title: "ListenerContext"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# ListenerContext

Provides access to the context that triggered a listener action.

A [ListenerContext](/docs/scripting/api-reference/artboards/listener-context) can represent different event types (pointer, keyboard,
text input, focus, view model changes, or reported events). Use the
`is...` methods to check the type, and the corresponding `as...` methods
to retrieve the event data.

## Methods

### `isPointerEvent`

```lua theme={null}
isPointerEvent() -> boolean
```

Returns true if the action was triggered by a pointer event.

### `isKeyboardEvent`

```lua theme={null}
isKeyboardEvent() -> boolean
```

Returns true if the action was triggered by a keyboard event.

### `isTextInput`

```lua theme={null}
isTextInput() -> boolean
```

Returns true if the action was triggered by a text input event.

### `isFocus`

```lua theme={null}
isFocus() -> boolean
```

Returns true if the action was triggered by a focus change.

### `isReportedEvent`

```lua theme={null}
isReportedEvent() -> boolean
```

Returns true if the action was triggered by a reported Rive event.

### `isViewModelChange`

```lua theme={null}
isViewModelChange() -> boolean
```

Returns true if the action was triggered by a view model change.

### `isGamepadConnected`

```lua theme={null}
isGamepadConnected() -> boolean
```

### `isGamepadEvent`

```lua theme={null}
isGamepadEvent() -> boolean
```

### `isGamepadDisconnected`

```lua theme={null}
isGamepadDisconnected() -> boolean
```

### `isNone`

```lua theme={null}
isNone() -> boolean
```

Returns true if the action was triggered by an unknown or unsupported event type.

### `asPointerEvent`

```lua theme={null}
asPointerEvent() -> PointerEvent?
```

Returns the pointer event if applicable, otherwise nil.

### `asKeyboardEvent`

```lua theme={null}
asKeyboardEvent() -> KeyboardEvent?
```

Returns the keyboard event if applicable, otherwise nil.

### `asTextInput`

```lua theme={null}
asTextInput() -> TextInput?
```

Returns the text input event if applicable, otherwise nil.

### `asFocus`

```lua theme={null}
asFocus() -> FocusEvent?
```

Returns the focus event if applicable, otherwise nil.

### `asReportedEvent`

```lua theme={null}
asReportedEvent() -> ReportedEvent?
```

Returns the reported event if applicable, otherwise nil.

### `asViewModelChange`

```lua theme={null}
asViewModelChange() -> ViewModelChange?
```

Returns the view model change if applicable, otherwise nil.

### `asGamepadConnected`

```lua theme={null}
asGamepadConnected() -> GamepadConnected?
```

### `asGamepadEvent`

```lua theme={null}
asGamepadEvent() -> GamepadEvent?
```

### `asGamepadDisconnected`

```lua theme={null}
asGamepadDisconnected() -> GamepadDisconnected?
```

### `asNone`

```lua theme={null}
asNone() -> NoneEvent?
```

Returns a none event if applicable, otherwise nil.
