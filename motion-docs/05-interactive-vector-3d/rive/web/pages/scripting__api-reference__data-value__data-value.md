---
source: https://rive.app/docs/scripting/api-reference/data-value/data-value
title: "DataValue"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# DataValue

Base type for values that can be stored in inputs. Provides
functions for checking the underlying value type.

## Static Functions

### `number`

```lua theme={null}
number() -> DataValueNumber
```

Creates a [DataValueNumber](/docs/scripting/api-reference/data-value/data-value-number) that stores a number.

```lua theme={null}
local data = DataValue.number()
data.value = 42

print(data.value) -- 42
```

### `string`

```lua theme={null}
string() -> DataValueString
```

Creates a [DataValueString](/docs/scripting/api-reference/data-value/data-value-string) that stores a string.

```lua theme={null}
local data = DataValue.string()
data.value = 'Rive for life!'

print(data.value) -- Rive for life!
```

### `boolean`

```lua theme={null}
boolean() -> DataValueBoolean
```

Creates a [DataValueBoolean](/docs/scripting/api-reference/data-value/data-value-boolean) that stores a boolean.

```lua theme={null}
local data = DataValue.boolean()
data.value = false

print(data.value) -- false
```

### `color`

```lua theme={null}
color() -> DataValueColor
```

Creates a [DataValueColor](/docs/scripting/api-reference/data-value/data-value-color) that stores a [Color](/docs/scripting/api-reference/color/color).

```lua theme={null}
local data = DataValue.color()
data.value = Color.rgba(128, 55, 12, 128)

print(Color.red(data.value)) -- 255
```

## Methods

### `isNumber`

```lua theme={null}
isNumber() -> boolean
```

Returns true if the value is a number.

```lua theme={null}
local dv: DataValueNumber = DataValue.number()
print(dv.isNumber) -- true
```

### `isString`

```lua theme={null}
isString() -> boolean
```

Returns true if the value is a string.

```lua theme={null}
local dv: DataValueNumber = DataValue.number()
print(dv.isString) -- false
```

### `isBoolean`

```lua theme={null}
isBoolean() -> boolean
```

Returns true if the value is a boolean.

```lua theme={null}
local dv: DataValueNumber = DataValue.number()
print(dv.isBoolean) -- false
```

### `isColor`

```lua theme={null}
isColor() -> boolean
```

Returns true if the value is a color.

```lua theme={null}
local dv: DataValueNumber = DataValue.number()
print(dv.isColor) -- false
```
