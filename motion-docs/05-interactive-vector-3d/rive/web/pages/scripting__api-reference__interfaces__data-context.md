---
source: https://rive.app/docs/scripting/api-reference/interfaces/data-context
title: "DataContext"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# DataContext

Provides access to hierarchical data and its associated ViewModel.

## Methods

### `parent`

```lua theme={null}
parent() -> DataContext?
```

Returns the parent DataContext, if one exists.

```lua highlight={4} theme={null}
function init(self: MyNode, context: Context): boolean
  local dc = context:dataContext()
  if dc then
     local parentDC = dc:parent()
     local vm = dc:viewModel()
  end

  return true
end
```

### `viewModel`

```lua theme={null}
viewModel() -> ViewModel?
```

Returns the ViewModel associated with this context.

```lua highlight={5} theme={null}
function init(self: MyNode, context: Context): boolean
  local dc = context:dataContext()
  if dc then
     local parentDC = dc:parent()
     local vm = dc:viewModel()
  end

  return true
end
```
