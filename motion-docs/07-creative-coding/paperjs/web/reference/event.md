---
source: https://paperjs.org/reference/event/
title: "Paper.js — Event"
fetched: 2026-10-28
---

# Event

The Event object is the base class for any of the other event types, such as [MouseEvent](https://paperjs.org/reference/mouseevent), [ToolEvent](https://paperjs.org/reference/toolevent) and [KeyEvent](https://paperjs.org/reference/keyevent).

## Properties

[**time**](https://paperjs.org/reference/event/#time)

The time at which the event was created, in seconds, as the times of frame events are. Browsers count from the page’s time origin, as `performance.now()` does, while [view.dispatchMouseEvent(type, point[, options])](https://paperjs.org/reference/view#dispatchmouseevent-type-point) and [view.dispatchKeyEvent(type, key[, options])](https://paperjs.org/reference/view#dispatchkeyevent-type-key) use `Date.now()` unless the host passes a time, so only compare the times of events from the same source.

Read only.

#### Type:

* Number

[**modifiers**](https://paperjs.org/reference/event/#modifiers)

The current state of the keyboard modifiers.

Read only.

#### Type:

* object

#### See also:

* [Key.modifiers](https://paperjs.org/reference/key#modifiers)

## Methods

[**preventDefault**()](https://paperjs.org/reference/event/#preventdefault)

Cancels the event if it is cancelable, without stopping further propagation of the event.

[**stopPropagation**()](https://paperjs.org/reference/event/#stoppropagation)

Prevents further propagation of the current event.

[**stop**()](https://paperjs.org/reference/event/#stop)

Cancels the event if it is cancelable, and stops stopping further propagation of the event. This is has the same effect as calling both [stopPropagation](https://paperjs.org/reference/event#stoppropagation)() and [preventDefault](https://paperjs.org/reference/event#preventdefault)().

Any handler can also return `false` to indicate that `stop()` should be called right after.
