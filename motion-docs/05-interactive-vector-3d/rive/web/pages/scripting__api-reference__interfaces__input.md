---
source: https://rive.app/docs/scripting/api-reference/interfaces/input
title: "Input"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Input

Represents a typed input value.

```lua highlight={3,4,5,6} theme={null}
-- Define the script's data and inputs.
type MyNode = {
  speed: Input<number>,
  title: Input<string>,
  enabled: Input<boolean>,
  onReset: Input<Trigger>,
}

-- Return a factory function that Rive uses to build the Node instance.
return function(): Node<MyNode>
  return {
    speed = 1,
    title = 'Rive so coooool!',
    enabled = false,
    onReset = function() end,
  }
end
```
