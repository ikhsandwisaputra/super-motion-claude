---
source: https://rive.app/docs/scripting/api-reference/interfaces/transition-condition
title: "TransitionCondition"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# TransitionCondition

A condition to evaluate for a transition between state machine states to be taken.

For more information, see [Transition Condition Scripts](/docs/scripting/protocols/transition-condition-scripts).

## Methods

### `init`

```lua theme={null}
init(self: T, context: Context) -> boolean
```

Called once when the transition condition is created or attached.

```lua highlight={4,5,6,14} theme={null}
type MyTransitionCondition = {}

-- Called once when the script initializes.
function init(self: MyTransitionCondition, context: Context): boolean
  return true
end

function evaluate(self: MyTransitionCondition): boolean
  return false
end

return function(): TransitionCondition<MyTransitionCondition>
  return {
    init = init,
    evaluate = evaluate,
  }
end
```

### `evaluate`

```lua theme={null}
evaluate(self: T) -> boolean
```

Called every frame while the transition is active.

```lua highlight={4,5,6,14} theme={null}
type MyTransitionCondition = {}

function init(self: MyTransitionCondition, context: Context): boolean
  return true
end

-- Add your transition logic here.
-- `evaluate` is fired every frame while the transition is active.
-- Returning false prevents a transition, true allows a transition.
function evaluate(self: MyTransitionCondition): boolean
  return false
end

return function(): TransitionCondition<MyTransitionCondition>
  return {
    init = init,
    evaluate = evaluate,
  }
end
```
