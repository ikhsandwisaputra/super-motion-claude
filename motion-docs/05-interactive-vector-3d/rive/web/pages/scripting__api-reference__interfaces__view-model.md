---
source: https://rive.app/docs/scripting/api-reference/interfaces/view-model
title: "ViewModel"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# ViewModel

A [ViewModel](/docs/scripting/api-reference/interfaces/view-model) provides access to named properties used for data binding
between your application and a Rive file.

## Fields

### `name`

The name of the view model.

(Coming soon)

## Methods

### `getNumber`

```lua theme={null}
getNumber(name: string) -> Property<number>?
```

Returns the numeric property with the given name, or nil if not found.

```lua theme={null}
local vmi = context:viewModel()
if vmi then
  local score = vmi:getNumber('score')
  if score then
    print(score.value)
  end
end
```

### `getTrigger`

```lua theme={null}
getTrigger(name: string) -> PropertyTrigger?
```

Looks up a trigger property by name.
Returns a [PropertyTrigger](/docs/scripting/api-reference/data-value/property-trigger).

```lua theme={null}
local vmi = context:viewModel()
if vmi then
  local myTrigger = vmi:getTrigger('myTrigger')
  if myTrigger then
    myTrigger:fire()
  end
end
```

### `getString`

```lua theme={null}
getString(name: string) -> Property<string>?
```

Looks up a string property by name.
Returns a `Property<string>`, or nil when there is none.

```lua theme={null}
local vmi = context:viewModel()
if vmi then
  local heading = vmi:getString('heading')
  if heading then
    print(heading.value)
  end
end
```

### `getBoolean`

```lua theme={null}
getBoolean(name: string) -> Property<boolean>?
```

Looks up a boolean property by name.
Returns a `Property<boolean>`, or nil when there is none.

```lua theme={null}
local vmi = context:viewModel()
if vmi then
  local darkMode = vmi:getBoolean('darkMode')
  if darkMode then
    print(darkMode.value)
  end
end
```

### `getColor`

```lua theme={null}
getColor(name: string) -> Property<Color>?
```

Looks up a color property by name.
Returns a `Property<Color>`, or nil when there is none.

```lua theme={null}
local vmi = context:viewModel()
if vmi then
  local primaryColor = vmi:getColor('primaryColor')
  if primaryColor then
    primaryColor.value = Color.rgba(255, 0, 0, 155)
  end
end
```

### `getList`

```lua theme={null}
getList(name: string) -> PropertyList?
```

Looks up a List property by name.
Returns a [PropertyList](/docs/scripting/api-reference/interfaces/property-list).

```lua theme={null}
local vmi = context:viewModel()
if vmi then
  local enemies = vmi:getList('enemies')
  if enemies then
    enemies:pop()
  end
end
```

### `getViewModel`

```lua theme={null}
getViewModel(name: string) -> PropertyViewModel?
```

Looks up a view model property by name. Returns a [PropertyViewModel](/docs/scripting/api-reference/interfaces/property-view-model).

```lua highlight={3} theme={null}
local vmi = context:viewModel()
if vmi then
    local nestedVM = vmi:getViewModel('MyVM')
end
```

### `getEnum`

```lua theme={null}
getEnum(name: string) -> PropertyEnum?
```

Looks up an enum by name.
Returns a [PropertyEnum](/docs/scripting/api-reference/interfaces/property-enum).

```lua highlight={3} theme={null}
local vmi = context:viewModel()
if vmi then
    local textAlignment = vmi:getEnum('textAlignment')
end
```

### `instance`

```lua theme={null}
instance(instanceName: string?) -> ViewModel
```

Creates a new instance of the ViewModel.
Pass instanceName to specify an existing instance from the file to use as template

```lua highlight={4} theme={null}
function init(self: VMNameNode, context: Context): boolean
  local vm = context:viewModel()
  if vm then
    local newInstance = vm:instance()
    local age = newInstance:getNumber('age')
    if age then
      age.value = 99
    end
  end

  return true
end
```

### `getIndex`

```lua theme={null}
getIndex() -> number
```

Returns the index.
Returns -1 if view model does not have an index available.

### `getImage`

```lua theme={null}
getImage(name: string) -> Property<Image>?
```

Looks up an image by name.
Returns a `Property<Image>`.

```lua highlight={3} theme={null}
local vmi = context:viewModel()
if vmi then
    local image1 = vmi:getImage('avatar')
end
```

### `getFont`

```lua theme={null}
getFont(name: string) -> Property<Font>?
```

Looks up a font by name.
Returns a `Property<Font>`.

```lua highlight={3} theme={null}
local vm = context:viewModel()
if vm then
    local fontProperty = vm:getFont('Inter')
end
```

### `getBlob`

```lua theme={null}
getBlob(name: string) -> Property<Blob>?
```

Looks up a blob by name.
Returns a `Property<Blob>`.

```lua highlight={3} theme={null}
local vm = context:viewModel()
if vm then
    local blobProperty = vm:getBlob('myBlob')
end
```
