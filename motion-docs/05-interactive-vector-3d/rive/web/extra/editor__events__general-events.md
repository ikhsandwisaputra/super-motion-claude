---
source: https://rive.app/docs/editor/events/general-events.md
title: ""
fetched: 2026-10-28
---

> ## Documentation Index
> Fetch the complete documentation index at: https://rive.app/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Events at Runtime

> Using events to communicate with runtime code (deprecated)

> [!WARNING]
>
> **DEPRECATION NOTICE:**
>
> [Rive Events](https://rive.app/docs/editor/events/overview.md) are still fully supported within a Rive file. However, using events to communicate with runtime code is deprecated.
>
> **For new projects:** Use [Data Binding](https://rive.app/docs/editor/data-binding) instead.
>
> **This content is provided for legacy support only.**

For general information about adding, creating, and signaling events, see [Rive Events](https://rive.app/docs/editor/events/overview.md).

[YouTube video player](https://www.youtube.com/embed/M5DIDVtYI_Y)

General Events were previously used to send signals from a Rive file to runtime code. They allowed designers and developers to coordinate behavior by passing event data at specific moments in an animation.

This approach has been deprecated in favor of [Data Binding](https://rive.app/docs/editor/data-binding/), which provides a more structured and predictable way to communicate with runtime code.

## Properties

Properties allow you to attach additional data to an Event that can be read by the runtime.

To add a new property, click the `+` button next to Properties.

![Add New Property](https://ucarecdn.com/d4cd3b8f-3765-4c28-9204-e5daf7fff0d8/)

Give your property a clear name, then choose the type of value it represents, which can be a Number, Boolean, or String.

![Rename and select input](https://ucarecdn.com/73d05fb1-7c9c-4c9c-a17c-51781ef30d0e/)

You can key a property on the timeline to update its value over time. When the Event is reported, the runtime receives the current value of each property.
