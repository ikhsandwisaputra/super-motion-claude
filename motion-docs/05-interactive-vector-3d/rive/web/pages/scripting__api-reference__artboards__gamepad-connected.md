---
source: https://rive.app/docs/scripting/api-reference/artboards/gamepad-connected
title: "GamepadConnected"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# GamepadConnected

Full gamepad state when a device is first seen (`gamepadConnected`).
Aligned with W3C Standard Gamepad when `mapping` is `'standard'`.

## Fields

### `deviceId`

Embedder-stable device id for this logical gamepad session.

### `buttonMask`

Bit *i* set when W3C standard button index *i* is pressed.

### `buttons`

Analog value per button (0–1), same order as W3C `buttons[]` / `buttonValues` (1-based).

### `axes`

Analog axes (1-based). Standard layout uses at least six entries (sticks and triggers).

### `isStandardMapping`

Whether the embedder normalized to the standard layout.

### `mapping`

`'standard'` or `'unknown'` (semantic names match only when standard).

### `gamepadMapping`

Raw enum value: 0 = standard, 1 = unknown (same as [GamepadMappingKind](/docs/scripting/api-reference/artboards/gamepad-mapping-kind) order).

### `west`

Face buttons (standard mapping only; otherwise false).

### `south`

### `north`

### `east`

### `leftShoulder`

### `rightShoulder`

### `back`

Select / Start (W3C back / forward).

### `forward`

### `leftStickButton`

Stick click buttons.

### `rightStickButton`

### `dpadUp`

### `dpadDown`

### `dpadLeft`

### `dpadRight`

### `start`

### `leftStick`

Left and right analog stick deflection (axes 0–3 when standard).

### `rightStick`

### `leftTrigger`

Analog shoulder triggers (axes 4–5 when standard).

### `rightTrigger`

### `leftTriggerPressed`

Digital trigger buttons (indices 6–7 when standard).

### `rightTriggerPressed`

## Methods

### `buttonPressed`

```lua theme={null}
buttonPressed(index: number) -> boolean
```

True if W3C button index `index` is pressed (1-based, matches `buttons` / bitmask).

### `buttonValue`

```lua theme={null}
buttonValue(index: number) -> number
```

`GamepadButton.value` for the given 1-based button index.

### `axis`

```lua theme={null}
axis(index: number) -> number
```

Axis value for the given 1-based axis index.
