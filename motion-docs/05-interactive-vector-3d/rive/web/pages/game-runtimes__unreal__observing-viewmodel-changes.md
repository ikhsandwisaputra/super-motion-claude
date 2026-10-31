---
source: https://rive.app/docs/game-runtimes/unreal/observing-viewmodel-changes
title: "Observing ViewModel Changes"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Observing ViewModel Changes

React to animation and state updates by observing ViewModel property changes.

In the Unreal runtime, **ViewModels** are the supported way for Rive content to communicate back to Unreal.

Legacy **State Machine** events and direct callback mechanisms are deprecated.\
New integrations should observe **ViewModel** property changes instead.

> [!NOTE]
>
> All runtime output from Rive should flow through a **ViewModel Instance**.

## How observation works

During the **Artboard** tick:

1. Unreal sets **ViewModel** values
2. The **State Machine** evaluates transitions
3. The **State Machine** may modify **ViewModel** values
4. Property change callbacks are emitted
5. Rendering occurs

Observation happens synchronously during this update cycle.

## Registering callbacks

Each property on a **ViewModel Instance** can be observed.

When a property changes:

* The callback is invoked
* The updated value is available
* Logic can react immediately

Callbacks should be:

* Registered after creating the **ViewModel Instance**
* Unregistered before destroying the instance
* Owned by the same system that owns the instance

  You can use the **Add Field Value Changed Delegate** to trigger events when a value is changed. The following image shows an example of a delegate being added to a **ViewModel** field.

  ![Duelist Delegate](https://mintcdn.com/rive/a3RZupK5rr01QGMI/images/unreal/DuelistDelegate.png?fit=max\&auto=format\&n=a3RZupK5rr01QGMI\&q=85\&s=19153923bae97ecadd907f4aca36e239)

> [!TIP]
>
> Use **Trigger Properties** for actions.\
> Use boolean or numeric properties for persistent state.

## Observing structured data

Because **ViewModels** may contain nested structures:

* Nested **ViewModel Instances** can also be observed
* Changes propagate through the same callback mechanism
* Observation remains consistent regardless of hierarchy depth

This allows complex UI or gameplay state to remain structured and predictable.

## Lifetime and safety

Observation follows the lifetime of the **ViewModel Instance**.

Important rules:

* Do not observe destroyed instances
* Unbind callbacks before destroying instances
* Do not assume callbacks persist after **Artboard** reinitialization

Callbacks are synchronous and not asynchronous events.

## Summary

**ViewModels** are both the input and output boundary of the runtime.

Unreal writes values.\
The **State Machine** evaluates.\
Unreal observes changes.
