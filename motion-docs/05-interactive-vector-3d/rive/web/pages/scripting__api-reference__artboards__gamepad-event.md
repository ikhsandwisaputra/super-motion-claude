---
source: https://rive.app/docs/scripting/api-reference/artboards/gamepad-event
title: "GamepadEvent"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# GamepadEvent

One field change on an already-connected gamepad (`gamepadEvent`); includes
the full post-update state and optional standard-layout intent.

## Fields

### `changeKind`

W3C change kind: `"button"` or `"axis"`.

### `changeIndex`

1-based W3C button or axis index for this change.

### `changeValue`

### `hasStandardButtonIntent`

### `hasStandardAxisIntent`

### `intentButton`

### `intentAxis`

### `deviceId`

Read-only full device state after the change (same fields as \[GamepadConnected]).

### `buttonMask`

### `buttons`

### `axes`

### `isStandardMapping`

### `mapping`

### `gamepadMapping`

### `west`

### `south`

### `north`

### `east`

### `leftShoulder`

### `rightShoulder`

### `back`

### `forward`

### `leftStickButton`

### `rightStickButton`

### `dpadUp`

### `dpadDown`

### `dpadLeft`

### `dpadRight`

### `start`

### `leftStick`

### `rightStick`

### `leftTrigger`

### `rightTrigger`

### `leftTriggerPressed`

### `rightTriggerPressed`

## Methods

### `buttonPressed`

```lua theme={null}
buttonPressed(index: number) -> boolean
```

### `buttonValue`

```lua theme={null}
buttonValue(index: number) -> number
```

### `axis`

```lua theme={null}
axis(index: number) -> number
```
