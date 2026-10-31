---
source: https://paperjs.org/reference/keyevent/
title: "Paper.js — KeyEvent"
fetched: 2026-10-28
---

# KeyEvent

Extends **[Event](https://paperjs.org/reference/event)**

The KeyEvent object is received by the [Tool](https://paperjs.org/reference/tool)’s keyboard handlers [tool.onKeyDown](https://paperjs.org/reference/tool#onkeydown), [tool.onKeyUp](https://paperjs.org/reference/tool#onkeyup). The KeyEvent object is the only parameter passed to these functions and contains information about the keyboard event.

## Properties

[**type**](https://paperjs.org/reference/keyevent/#type)

The type of mouse event.

#### Values:

* 'keydown', 'keyup'

#### Type:

* String

[**character**](https://paperjs.org/reference/keyevent/#character)

The character representation of the key that caused this key event, taking into account the current key-modifiers (e.g. shift, control, caps-lock, etc.)

#### Type:

* String

[**key**](https://paperjs.org/reference/keyevent/#key)

The key that caused this key event, either as a lower-case character or special key descriptor.

#### Values:

* 'enter', 'space', 'shift', 'control', 'alt', 'meta', 'caps-lock', 'left', 'up', 'right', 'down', 'escape', 'delete', …

#### Type:

* String

## Methods

[**toString**()](https://paperjs.org/reference/keyevent/#tostring)

#### Returns:

* String — a string representation of the key event

## Properties inherited from [Event](https://paperjs.org/reference/event)

[**time**](https://paperjs.org/reference/keyevent/#time)

The time at which the event was created, in seconds, as the times of frame events are. Browsers count from the page’s time origin, as `performance.now()` does, while [view.dispatchMouseEvent(type, point[, options])](https://paperjs.org/reference/view#dispatchmouseevent-type-point) and [view.dispatchKeyEvent(type, key[, options])](https://paperjs.org/reference/view#dispatchkeyevent-type-key) use `Date.now()` unless the host passes a time, so only compare the times of events from the same source.

Read only.

#### Type:

* Number

[**modifiers**](https://paperjs.org/reference/keyevent/#modifiers)

The current state of the keyboard modifiers.

Read only.

#### Type:

* object

#### See also:

* [Key.modifiers](https://paperjs.org/reference/key#modifiers)

## Methods inherited from [Event](https://paperjs.org/reference/event)

[**preventDefault**()](https://paperjs.org/reference/keyevent/#preventdefault)

Cancels the event if it is cancelable, without stopping further propagation of the event.

[**stopPropagation**()](https://paperjs.org/reference/keyevent/#stoppropagation)

Prevents further propagation of the current event.

[**stop**()](https://paperjs.org/reference/keyevent/#stop)

Cancels the event if it is cancelable, and stops stopping further propagation of the event. This is has the same effect as calling both [stopPropagation](https://paperjs.org/reference/event#stoppropagation)() and [preventDefault](https://paperjs.org/reference/event#preventdefault)().

Any handler can also return `false` to indicate that `stop()` should be called right after.
