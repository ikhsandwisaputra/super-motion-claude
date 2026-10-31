---
source: https://rive.app/docs/scripting/protocols/converter-scripts
title: "Converter Scripts"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Converter Scripts

Create custom converters using Rive scripting

Rive includes several built-in converters like **Convert to String** and **Round**.
Scripting lets you create your own custom converters when you need behavior that isn’t covered by the built-ins.

For background on converters and data binding, see [Data Converters](/docs/editor/data-binding/converters).

[YouTube video player](https://www.youtube.com/embed/rPIEATBt4Qo)

## Examples

## Creating a Converter

[Create a new script](/docs/scripting/creating-scripts) and select **Converter** as the type.

## Anatomy of a Converter Script

```lua theme={null}
type MyConverter = {}

-- Called once when the script initializes.
function init(self: MyConverter): boolean
  return true
end

-- Converts the property value.
function convert(self: MyConverter, input: DataInputs): DataOutput
  local dv: DataValueNumber = DataValue.number()

  if input:isNumber() then
    dv.value = (input :: DataValueNumber).value + 1
  else
    dv.value = 0 -- 0 if input is not a number
  end

  return dv
end

-- For 2-way data binding, converts the target value back to the source
function reverseConvert(self: MyConverter, input: DataOutput): DataInputs
  local dv: DataValueNumber = DataValue.number()

  if input:isNumber() then
    -- Example: Subtract 1 from the target number
    dv.value = (input :: DataValueNumber).value - 1
  else
    dv.value = 0 -- 0 if target is not a number
  end

  return dv
end

-- Return a factory function that builds the converter instance.
-- Rive calls this when the script is created, passing back a table
-- containing its lifecycle functions and any default values.
return function(): Converter<MyConverter, DataValueNumber, DataValueNumber>
  return {
    init = init,
    convert = convert,
    reverseConvert = reverseConvert,
  }
end
```

## Creating a Converter using your Script

Create a new converter using your new converter script:

1. In the Data panel, click the `+` button.
2. Choose **Converters → Script → MyConverter**.

![Create converter with a script](https://mintcdn.com/rive/PNFYxEcCteEOymSI/images/scripting/create-converter-with-script.png?fit=max\&auto=format\&n=PNFYxEcCteEOymSI\&q=85\&s=dcbc8e4131599f6bcdcc763fd42a2ed7)

## Adding inputs

See [Script Inputs](/docs/scripting/script-inputs).
