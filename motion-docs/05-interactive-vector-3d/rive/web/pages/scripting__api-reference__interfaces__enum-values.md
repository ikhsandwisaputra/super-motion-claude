---
source: https://rive.app/docs/scripting/api-reference/interfaces/enum-values
title: "EnumValues"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# EnumValues

## Methods

### `__len`

```lua theme={null}
__len() -> number
```

Get the number of enum values.

```lua highlight={7} theme={null}
local vmi = context:viewModel()
if vmi then
    local textAlignment = vmi:getEnum('textAlignment')

    if textAlignment then
        local values = textAlignment:values()
        print('count: ', #values)
    end
end
```
