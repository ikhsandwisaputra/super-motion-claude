---
source: https://rive.app/docs/scripting/api-reference/interfaces/property-list
title: "PropertyList"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# PropertyList

[PropertyList](/docs/scripting/api-reference/interfaces/property-list) is a mutable list of [ViewModel](/docs/scripting/api-reference/interfaces/view-model) items.

Use it to manage repeating data collections from scripts (for example, menu
items, inventory entries, or dynamic UI rows). A [PropertyList](/docs/scripting/api-reference/interfaces/property-list) supports:

* Reading item count via `length`
* 1-based indexed access (`list[1]`, `list[2]`, ...)
* Mutations (`push`, `insert`, `swap`, `pop`, `shift`, `clear`)
* Change notifications via `addListener` and `removeListener`

For a complete working example, see the [Scripting Lists](https://rive.app/community/files/27098-51051-scripting-lists/?utm_source=docs\&utm_medium=scripting_api\&utm_campaign=docs_to_marketplace_links) demo.

## Fields

### `length`

The current number of items in the list.

```lua highlight={3} theme={null}
function handleSwap(self: MenuListController)
  if self.menu and self.menu.length >= 2 then
    self.menu:swap(1, 2)
  end
end
```

### `addListener`

Adds a listener that is called when the list changes.

```lua highlight={6} theme={null}
function init(self: MenuListController, context: Context): boolean
  local vmi = context:rootViewModel() :: Data.Main
  if vmi then
    self.menu = vmi.menu
    self.listChanged = listChanged

    self.menu:addListener(self.listChanged)
  else
    print('[MenuListController] Warning: Could not find Main ViewModel.')
  end

  return true
end
```

### `removeListener`

Removes a previously added list-change listener.

```lua highlight={3} theme={null}
function handleRemoveListener(self: MenuListController)
  if self.menu and self.listChanged then
    self.menu:removeListener(self.listChanged)
  end
end
```

## Methods

### `push`

```lua theme={null}
push(vm: ViewModel) -> ()
```

Get the list item by index.

```lua highlight={3} theme={null}
function setItemLabel(menu: PropertyList, index: number, label: string)
  if index >= 1 and index <= menu.length then
    local item = menu[index] :: Data.Button
    local itemLabel = item:getString('label')
    if itemLabel then
      itemLabel.value = label
    end
  end
end
```

Adds a view model to the end of the list.

```lua highlight={9} theme={null}
function addButton(menu: PropertyList, label: string)
  local buttonVm = Data.Button.new()

    local buttonLabel = buttonVm:getString('label')
    if buttonLabel then
      buttonLabel.value = label
    end

    menu:push(buttonVm)
end
```

### `insert`

```lua theme={null}
insert(vm: ViewModel, index: number) -> ()
```

Inserts a view model at the given index.

```lua highlight={10} theme={null}
function insertAt(menu: PropertyList, label: string, index: number)
  local buttonVm = Data.Button.new()

  local buttonLabel = buttonVm:getString('label')
  if buttonLabel then
    buttonLabel.value = label
  end

  local insertIndex = math.max(1, math.min(index, menu.length + 1))
  menu:insert(buttonVm, insertIndex)
end
```

### `swap`

```lua theme={null}
swap(index1: number, index2: number) -> ()
```

Swaps the positions of the view models at `index1` and `index2`.

```lua highlight={5} theme={null}
function swapItems(menu: PropertyList, index1: number, index2: number)
  local highestIndex = math.max(index1, index2)

  if menu and menu.length >= highestIndex then
    menu:swap(index1, index2)
  end
end
```

### `pop`

```lua theme={null}
pop() -> ViewModel?
```

Removes and returns the last view model in the list.

```lua highlight={3} theme={null}
function handlePop(self: MenuListController)
  if self.menu then
    self.menu:pop()
  end
end
```

### `shift`

```lua theme={null}
shift() -> ViewModel?
```

Removes and returns the first view model in the list.

```lua highlight={2} theme={null}
function handleShift(self: MenuListController)
  if self.menu then
    self.menu:shift()
  end
end
```

### `clear`

```lua theme={null}
clear() -> ()
```

Removes all view models from the list.

```lua highlight={3} theme={null}
function handleClearItems(self: MenuListController)
  if self.menu then
    self.menu:clear()
  end
end
```

### `remove`

```lua theme={null}
remove(viewModel: ViewModel) -> ()
```

Removes a view model from the list.

### `removeAllOf`

```lua theme={null}
removeAllOf(viewModel: ViewModel) -> ()
```

Removes every list entry that references the given view model instance.

### `removeAt`

```lua theme={null}
removeAt(index: number) -> ()
```

Removes the view model at the given 1-based index from the list.
