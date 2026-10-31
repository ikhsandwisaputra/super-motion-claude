---
source: https://rive.app/docs/scripting/api-reference/interfaces/property-enum
title: "PropertyEnum"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# PropertyEnum

PropertyEnum is a [Property](/docs/scripting/api-reference/data-value/property) with additional enum-specific APIs.

## Methods

### `values`

```lua theme={null}
values() -> EnumValues
```

Returns the available enum values

```lua highlight={6} theme={null}
local vmi = context:viewModel()
if vmi then
    local textAlignment = vmi:getEnum('textAlignment')

    if textAlignment then
        local values = textAlignment:values()
    end
end
```
