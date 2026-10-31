---
source: https://rive.app/docs/scripting/protocols/listener-action-scripts
title: "Listener Action Scripts"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Listener Action Scripts

Run custom logic when a state machine listener fires

[Listeners](/docs/editor/state-machine/listeners) fire when a specific event occurs in a State Machine.
Listener Action Scripts let you run custom logic in response to those events.

Use Listener Action Scripts when you need to perform side effects—such as updating view model values, responding to pointer input, or triggering external behavior—without changing state.

## Creating a Listener Action Script

[Create a new script](/docs/scripting/creating-scripts) and select **Listener Action Script** as the type.

## Anatomy of a Listener Action

```lua theme={null}
type MyListenerAction = {
  context: Context,
}

-- Called once when the script initializes.
function init(self: MyListenerAction, context: Context): boolean
  -- Context gives you access to your main view model and other data.
  self.context = context
  return true
end

-- Called when the Listener fires.
-- Use this to perform side effects (no return value).
function perform(self: MyListenerAction, pointerEvent: PointerEvent)

end

-- Return a factory function that Rive uses to build the Listener Action instance.
return function(): ListenerAction<MyListenerAction>
  return {
    init = init,
    perform = perform,
    context = late(),
  }
end

```

## Adding your Listener Action

**1. Select a Listener**

**2. Click + and select Scripted Action**

**3. From the Run dropdown, select your script**

![Add a custom listener action](https://mintcdn.com/rive/c6Shdr6bTbiqaAny/images/scripting/add-listener-action.gif?s=072cbfbb2c2681d30edc891ca8ed46b9)

## Script inputs

Inputs let you add parameters to a listener action without changing script logic—making the same script reusable across different listeners. For more information on adding inputs to your scripts, see [Script Inputs](/docs/scripting/script-inputs).

> [!NOTE]
>
> Inputs can control scripts, but scripts can't change the value of inputs.
>
> If you need to control a view model property from your script, access the [Main View model through context](/docs/scripting/data-binding#accessing-the-main-view-model) or [View Model Inputs](/docs/scripting/script-inputs#view-model-inputs).

### Setting an input

To set the value of an input, select the Properties icon next to the listener script.

![listener action script inputs](https://mintcdn.com/rive/G2J2SST696k_ww2Y/images/scripting/listener-action-script-input.png?fit=max\&auto=format\&n=G2J2SST696k_ww2Y\&q=85\&s=bf62790188304ae9e34a197422daa0d1)

### Data Binding an input

Right-click your property and select Data Bind to bind your input to a view model property.

![listener action script inputs](https://mintcdn.com/rive/G2J2SST696k_ww2Y/images/scripting/listener-action-script-input-binding.png?fit=max\&auto=format\&n=G2J2SST696k_ww2Y\&q=85\&s=b1478ea2796ad18a565659288986e0ad)
