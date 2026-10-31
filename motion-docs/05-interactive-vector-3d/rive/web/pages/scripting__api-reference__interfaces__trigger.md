---
source: https://rive.app/docs/scripting/api-reference/interfaces/trigger
title: "Trigger"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Trigger

A function that triggers an action when invoked.

```lua highlight={3} theme={null}
-- Define the script's data and inputs.
type MyNode = {
  onReset: Input<Trigger>,
}

-- Return a factory function that Rive uses to build the Node instance.
return function(): Node<MyNode>
  return {
    onReset = function() end,
  }
end
```
