---
source: https://rive.app/docs/game-runtimes/unreal/using-triggers
title: "Using Triggers"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Using Triggers

Using triggers in the Rive plugin.

In the Unreal runtime, "events" are modeled as **ViewModel Trigger Properties**.

Fire and observe triggers through the **ViewModel Instance**.

> [!NOTE]
>
> Use **Trigger Properties** for one-shot actions (clicks, milestones, transitions).

## Recommended flow

1. Define a **Trigger Property** in your Rive ViewModel (for example `OnClick`).
2. In Unreal, create and bind a **ViewModel Instance** to your Rive widget or artboard.
3. Fire the trigger from Blueprint using **Call&#x20;**.
4. Respond to the trigger in Blueprint using **Bind Event to&#x20;**.

## Blueprint setup

1. Create a Rive widget from your imported `.riv` file.
2. Create a **ViewModel Instance** using **Make View Model**.
3. Assign that instance to the widget/artboard.
4. Keep a reference to the bound ViewModel instance.

> [!TIP]
>
> Keep ViewModel creation and delegate binding in the same owning Blueprint so lifetime is clear.

## Firing a trigger in Blueprint

When you want to fire an event (button press, gameplay action, etc.), call the trigger function exposed on the bound ViewModel instance.

Typical pattern:

1. Get your bound ViewModel instance reference.
2. Call **Call&#x20;**&#x20;(for example `Call OnClick`).
3. Pass any required inputs for the generated function signature.

The trigger is consumed during the next artboard tick and resets automatically.

In the following image, the trigger "loaded" is being fired from Blueprint:

![Blueprint graph calling the generated Call OnClick node on the bound ViewModel instance](https://mintcdn.com/rive/UZ6IpVoGAVEZtBOW/images/unreal/DuelistCallEvent.png?fit=max\&auto=format\&n=UZ6IpVoGAVEZtBOW\&q=85\&s=f002fdd764a4e65166feb20c61ace7b3)

## Observing trigger results

If Unreal needs to react when the trigger is fired:

* Use **Bind Event to&#x20;**&#x20;on the ViewModel instance.
* Handle callbacks synchronously during the update cycle.
* Unbind delegates before destroying the ViewModel instance.

In the following image, a custom event is bound to the trigger "loaded":

![Blueprint graph using Bind Event to OnClick to bind a custom event to the ViewModel instance](https://mintcdn.com/rive/UZ6IpVoGAVEZtBOW/images/unreal/DuelistBindTrigger.png?fit=max\&auto=format\&n=UZ6IpVoGAVEZtBOW\&q=85\&s=99f412f2a124a228a758056b59748004)
