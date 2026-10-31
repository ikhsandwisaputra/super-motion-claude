---
source: https://rive.app/docs/editor/data-binding/controlling-data
title: "Controlling Data"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Controlling Data

Update and react to data from within Rive or from your application code.

Once you've bound data to properties in your file, changing that data will automatically update the connected elements.

You can control data from within your Rive file, or from your application at runtime.

## Controlling data within Rive

Rive includes several ways to update data directly inside your file:

> **[State machine actions](/docs/editor/state-machine/states#actions)**
>
> Update property values when [transitions](/docs/editor/state-machine/transitions#actions) or [state changes](/docs/editor/state-machine/states#actions) occur.

> **[Listener actions](/docs/editor/state-machine/listeners)**
>
> Update data in response to interactions and events.

> **[Scripting](/docs/scripting/data-binding)**
>
> Write custom logic that reads and updates data.

> **[Target-to-source Binding](/docs/editor/data-binding/overview#bind-direction)**
>
> Update data using an element's property value.

> **[Property Groups](/docs/editor/data-binding/property-groups)**
>
> Animate values and bind them back to data.

## Controlling data from code

Your application can also update data at runtime. For example, you might:

* Update a player's score
* Change a username or profile image
* Display live stock prices
* Trigger UI states based on user interaction

See the [Runtime Data Binding Overview](/docs/runtimes/data-binding) for implementation details.
