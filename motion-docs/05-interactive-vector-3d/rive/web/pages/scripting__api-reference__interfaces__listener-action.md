---
source: https://rive.app/docs/scripting/api-reference/interfaces/listener-action
title: "ListenerAction"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# ListenerAction

An action performed when an associated [State Machine Listener](/docs/editor/state-machine/listeners) is triggered.

For more information, see [Listener Action Scripts](/docs/scripting/protocols/listener-action-scripts).

## Methods

### `init`

```lua theme={null}
init(self: T, context: Context) -> boolean
```

Called once when the listener is created or attached.

```lua highlight={4,5,6,12} theme={null}
type MyListenerAction = {}

-- Called once when the script initializes.
function init(self: MyListenerAction, context: Context): boolean
  return true
end

function perform(self: MyListenerAction, pointerEvent: PointerEvent) end

return function(): ListenerAction<MyListenerAction>
  return {
    init = init,
    perform = perform,
  }
end
```

### `perform`

```lua theme={null}
perform(self: T, pointerEvent: PointerEvent) -> ()
```

Called when the associated [State Machine Listener](/docs/editor/state-machine/listeners) is triggered.
This method includes a [PointerEvent](/docs/scripting/api-reference/artboards/pointer-event) parameter containing details about the triggering interaction.

**Deprecated.** Prefer `performAction` with [ListenerContext](/docs/scripting/api-reference/artboards/listener-context); this overload may be removed.

```lua highlight={9,10,11,17} theme={null}
type MyListenerAction = {}

function init(self: MyListenerAction, context: Context): boolean
  return true
end

-- Add your transition logic here.
function perform(self: MyListenerAction, pointerEvent: PointerEvent)
  -- perform action here
end

-- Return a factory function that Rive uses to build the Listener Action instance.
return function(): ListenerAction<MyListenerAction>
  return {
    init = init,
    perform = perform,
  }
end
```

### `performAction`

```lua theme={null}
performAction(self: T, listenerContext: ListenerContext) -> ()
```

Called when the associated [State Machine Listener](/docs/editor/state-machine/listeners) is triggered.
This method includes a [ListenerContext](/docs/scripting/api-reference/artboards/listener-context) parameter containing details about the triggering interaction.

```lua highlight={7,8,9,10,11,12,18} theme={null}
type MyListenerAction = {}

function init(self: MyListenerAction, context: Context): boolean
  return true
end

-- Called each time the listener fires.
function performAction(self: MyListenerAction, listenerContext: ListenerContext)
  if listenerContext:isPointerEvent() then
    print('clicked')
  end
end

-- Return a factory function that Rive uses to build the Listener Action instance.
return function(): ListenerAction<MyListenerAction>
  return {
    init = init,
    performAction = performAction,
  }
end
```
