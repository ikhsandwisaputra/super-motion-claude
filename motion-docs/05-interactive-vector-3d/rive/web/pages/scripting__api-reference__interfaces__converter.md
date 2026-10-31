---
source: https://rive.app/docs/scripting/api-reference/interfaces/converter
title: "Converter"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Converter

A scripted converter used for transforming values between ViewModel data
bindings and Rive properties.

Type parameters:
T: The converter type
I: The input type, must be a DataValue type
(DataValueNumber, DataValueString, DataValueBoolean, DataValueColor, etc)
O: The output type, must be a DataValue type
(DataValueNumber, DataValueString, DataValueBoolean, DataValueColor, etc)

For more information, see [Converter Scripts](/docs/scripting/protocols/converter-scripts).

## Methods

### `init`

```lua theme={null}
init(self: T, context: Context) -> boolean
```

Called once when the converter is created. Returns true if initialization
succeeds.

```lua theme={null}
-- Called once when the script initializes.
function init(self: MyConverter, context: Context): boolean

    -- Return false to stop the script.
    return true
end
```

### `convert`

```lua theme={null}
convert(self: T, input: I) -> O
```

Converts the input value (a view model property) to an output value.
The input parameter must be a DataValue type.

```lua theme={null}
-- Converts the value when binding from source to target.
function convert(self: MyConverter, input: DataInputs): DataOutput

  local dv: DataValueNumber = DataValue.number()
  if input:isNumber() then
    -- Example: Add 1 to the incoming number
    dv.value = (input :: DataValueNumber).value + 1
  end
  return dv
end
```

### `reverseConvert`

```lua theme={null}
reverseConvert(self: T, input: O) -> I
```

Converts the output value back to an input value (a view model property).
The input parameter must be a DataValue type.

```lua theme={null}
function reverseConvert(
  self: MyConverter,
  input: DataOutput
): DataInputs
  local dv: DataValueNumber = DataValue.number()
  if input:isNumber() then
    -- Example: Subract 1 from the target number
    dv.value = (input :: DataValueNumber).value - 1
  end
  return dv
end
```

### `advance`

```lua theme={null}
advance(self: T, seconds: number) -> boolean
```

Optional per-frame update. Returns true if the converter should continue
receiving advance calls.

```lua theme={null}
function advance(self: MyConverter, seconds: number): boolean
  return false
end
```
