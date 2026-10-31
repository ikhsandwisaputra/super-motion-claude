---
source: https://rive.app/docs/editor/events/overview
title: "Events Overview"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Events Overview

Creating and signaling Rive Events

Events live within an artboard and are used to signal that something has happened. They can be fired from timelines, states, transitions, or listeners.

Rive supports three types of Events:

* [Open URL Event](/docs/editor/events/open-url-events) — Opens a URL at runtime
* [Audio Event](/docs/editor/events/audio-events) — Plays a sound
* [General Event (deprecated)](/docs/editor/events/general-events) — Previously used to communicate with runtime code

## Creating an event

**1. Create an Event**

Use the Events tool located in the Toolbar and click anywhere on the artboard.

![Adding a new event](https://ucarecdn.com/4ed6c563-4c59-42c8-b40c-f502d5a8e1a4/)

You'll notice that the Event is displayed on the artboard and in the Hierarchy.

**2. Name your Event**

Give your event a name so it’s easy to identify and reference.

You can rename it using the **Name** field, or by double-clicking the name directly on the artboard.

![Renaming an Event](https://ucarecdn.com/4558fb61-4649-4210-9ec6-c828c48ab2b2/)

**3. Select an Event type**

The Type dropdown allows you to change the Event type between Audio, URL, and General.

![Image](https://ucarecdn.com/9621c007-de2e-428c-95d7-837615a37caa/)

**4. Set your Event Properties**

Each Event type has its own set of properties.

For more information on the specific event types, see [Open URL Events](/docs/editor/events/open-url-events), [Audio Events](/docs/editor/events/audio-events), and [General Events (deprecated)](/docs/editor/events/general-events).

> [!TIP]
>
> If events aren't visible on the stage, open the **View Options** menu and make sure **Events** is enabled.
>
> ![toggle events visibility](https://mintcdn.com/rive/Ij2wXPG9-c5w_HuM/images/editor/interface/toggle-show-events.gif?s=9a89c40be91104ae88c902c527e6fd1b)

## Signaling an event

We can signal an Event in four ways: from a timeline, a listener, a state, or a transition.

### Timeline

Signaling an Event from the timeline lets you control the exact moment in an animation when the Event fires.

First, select the timeline you want to add the Event to. Then use the **Report Event** button in the Inspector.

![Keying an Event on the timeline](https://ucarecdn.com/bd8d36f9-9cd1-4eec-9c37-85d4a0a19643/)

### Transition & state

You can report an event on a Transition or a State. To report an event, select the desired State or Transition and use the `+` button next to the Events section in the Inspector.

![Signaling an Event via State or Transition](https://ucarecdn.com/d1a63666-0cce-408f-9364-826eed66b241/)

Now that we've selected the Event, we can decide whether it is signaled at the start or end of the Transition or State.

### Listeners

With your [Listener](/docs/editor/state-machine/listeners) selected, click the `+` below the State Machine Graph, and select **Report Event**.

![Trigger an Event with a listener](https://mintcdn.com/rive/b9R1HdOZkGPAd4X9/images/editor/events/trigger-events-with-listeners.gif?s=d92c2f461b21fa43e0e87d0508be71fe)
