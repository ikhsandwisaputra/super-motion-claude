---
source: https://rive.app/docs/scripting/api-reference/interfaces/data
title: "Data"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Data

The file's view model factories, keyed by view model name.
`Data.MyViewModel.new()` creates a fresh instance of the view model named
`MyViewModel`; pass an instance name to copy an existing instance from the
file. Looking up a name with no matching view model returns nil.

```lua theme={null}
local button = Data.Button.new()
local label = button:getString('label')
if label then
  label.value = 'Play'
end
```

## Static Functions

### `new`

```lua theme={null}
new(instanceName: string?) -> ViewModel
```
