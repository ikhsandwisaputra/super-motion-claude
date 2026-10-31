---
source: https://rive.app/docs/scripting/api-reference/artboards/view-model
title: "ViewModel"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# ViewModel

Represents a view model used for data binding.

A [ViewModel](/docs/scripting/api-reference/interfaces/view-model) provides structured data that can be read and modified at
runtime, allowing Rive files to react to application state.

```lua theme={null}
type ViewModelExample = {
  character: Input<Artboard<Data.Character>>,
  instance: Artboard<Data.Character>?,
}

function init(self: ViewModelExample, context: Context): boolean
  local vm = Data.Character.new()
  self.instance = self.character:instance(vm)
  return true
end

return function(): Node<ViewModelExample>
  return {
    character = late(),
    instance = nil,
    init = init,
  }
end
```
