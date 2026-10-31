---
source: https://rive.app/docs/scripting/protocols/transition-condition-scripts
title: "Transition Condition Scripts"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Transition Condition Scripts

Create custom state machine transitions using scripts

[Conditions](/docs/editor/state-machine/transitions#conditions) are the rules that determine when the State Machine transitions from one state to another. Transition Condition Scripts let you define custom conditions when built-in comparisons aren’t enough—such as transitions that depend on complex logic or multiple view model properties evaluated together.

## Creating a Transition Condition Script

[Create a new script](/docs/scripting/creating-scripts) and select **Transition Condition** as the type.

## Anatomy of a Transition Condition

```lua theme={null}
type MyTransitionCondition = {
  context: Context,
}

-- Called once when the script initializes.
function init(self: MyTransitionCondition, context: Context): boolean
  -- Context gives you access to your main view model and other data.
  self.context = context

  return true
end

-- Add your transition logic here.
-- `evaluate` is fired every frame while the transition is active.
-- Returning false prevents a transition, true allows a transition.
function evaluate(self: MyTransitionCondition): boolean
  return false
end

-- Return a factory function that Rive uses to build the Transition Condition instance.
return function(): TransitionCondition<MyTransitionCondition>
  return {
    init = init,
    evaluate = evaluate,
    context = late(),
  }
end
```

> [!NOTE]
>
> `evaluate` runs every frame while the transition is active.
>
> It should be fast and side-effect free, and only return whether the transition is allowed.

## Adding your Transition Condition

**1. Select a Transition**

**2. Click + to add a new Condition**

**3. Select your Script**

![Add a custom transition](https://mintcdn.com/rive/JjU0q55-K2f1gZny/images/scripting/add-transition-condition.gif?s=e4d72b842a1076948b2429c65f84faf2)

## Script inputs

Inputs let you add parameters a transition without changing script logic—making the same condition reusable across different transitions or states. For more information on adding inputs to your scripts, see [Script Inputs](/docs/scripting/script-inputs).

> [!NOTE]
>
> Inputs can control scripts, but scripts can't change the value of inputs.
>
> If you need to control a view model property from your script, access the [Main View model through context](/docs/scripting/data-binding#accessing-the-main-view-model) or [View Model Inputs](/docs/scripting/script-inputs#view-model-inputs).

### Setting an input

To set the value of an input, select the Properties icon next to the transition.

![transition script inputs](https://mintcdn.com/rive/I7V7AMXE2CuuPyMc/images/scripting/transition-condition-input.png?fit=max\&auto=format\&n=I7V7AMXE2CuuPyMc\&q=85\&s=f5b3028a2c126c9a828cc548d71122a3)

### Data Binding an input

Right-click your property and select Data Bind to bind your input to a view model property.

![data binding transition script inputs](https://mintcdn.com/rive/I7V7AMXE2CuuPyMc/images/scripting/transition-condition-input-binding.png?fit=max\&auto=format\&n=I7V7AMXE2CuuPyMc\&q=85\&s=047fe0158fbc5f7070d4123ad39a50a6)
