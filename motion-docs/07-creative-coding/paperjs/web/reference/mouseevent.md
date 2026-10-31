---
source: https://paperjs.org/reference/mouseevent/
title: "Paper.js — MouseEvent"
fetched: 2026-10-28
---

# MouseEvent

Extends **[Event](https://paperjs.org/reference/event)**

The MouseEvent object is received by the [Item](https://paperjs.org/reference/item)’s mouse event handlers [item.onMouseDown](https://paperjs.org/reference/item#onmousedown), [item.onMouseDrag](https://paperjs.org/reference/item#onmousedrag), [item.onMouseMove](https://paperjs.org/reference/item#onmousemove), [item.onMouseUp](https://paperjs.org/reference/item#onmouseup), [item.onClick](https://paperjs.org/reference/item#onclick), [item.onDoubleClick](https://paperjs.org/reference/item#ondoubleclick), [item.onMouseEnter](https://paperjs.org/reference/item#onmouseenter) and [item.onMouseLeave](https://paperjs.org/reference/item#onmouseleave). The MouseEvent object is the only parameter passed to these functions and contains information about the mouse event.

## Properties

[**type**](https://paperjs.org/reference/mouseevent/#type)

The type of mouse event.

#### Values:

* 'mousedown', 'mouseup', 'mousedrag', 'click', 'doubleclick', 'mousemove', 'mouseenter', 'mouseleave'

#### Type:

* String

[**point**](https://paperjs.org/reference/mouseevent/#point)

The position of the mouse in project coordinates when the event was fired.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**target**](https://paperjs.org/reference/mouseevent/#target)

The item that dispatched the event. It is different from [currentTarget](https://paperjs.org/reference/mouseevent#currenttarget) when the event handler is called during the bubbling phase of the event.

#### Type:

* [Item](https://paperjs.org/reference/item)

[**currentTarget**](https://paperjs.org/reference/mouseevent/#currenttarget)

The current target for the event, as the event traverses the scene graph. It always refers to the element the event handler has been attached to as opposed to [target](https://paperjs.org/reference/mouseevent#target) which identifies the element on which the event occurred.

#### Type:

* [Item](https://paperjs.org/reference/item)

[**delta**](https://paperjs.org/reference/mouseevent/#delta)

#### Type:

* [Point](https://paperjs.org/reference/point)

## Methods

[**toString**()](https://paperjs.org/reference/mouseevent/#tostring)

#### Returns:

* String — a string representation of the mouse event

## Properties inherited from [Event](https://paperjs.org/reference/event)

[**time**](https://paperjs.org/reference/mouseevent/#time)

The time at which the event was created, in seconds, as the times of frame events are. Browsers count from the page’s time origin, as `performance.now()` does, while [view.dispatchMouseEvent(type, point[, options])](https://paperjs.org/reference/view#dispatchmouseevent-type-point) and [view.dispatchKeyEvent(type, key[, options])](https://paperjs.org/reference/view#dispatchkeyevent-type-key) use `Date.now()` unless the host passes a time, so only compare the times of events from the same source.

Read only.

#### Type:

* Number

[**modifiers**](https://paperjs.org/reference/mouseevent/#modifiers)

The current state of the keyboard modifiers.

Read only.

#### Type:

* object

#### See also:

* [Key.modifiers](https://paperjs.org/reference/key#modifiers)

## Methods inherited from [Event](https://paperjs.org/reference/event)

[**preventDefault**()](https://paperjs.org/reference/mouseevent/#preventdefault)

Cancels the event if it is cancelable, without stopping further propagation of the event.

[**stopPropagation**()](https://paperjs.org/reference/mouseevent/#stoppropagation)

Prevents further propagation of the current event.

[**stop**()](https://paperjs.org/reference/mouseevent/#stop)

Cancels the event if it is cancelable, and stops stopping further propagation of the event. This is has the same effect as calling both [stopPropagation](https://paperjs.org/reference/event#stoppropagation)() and [preventDefault](https://paperjs.org/reference/event#preventdefault)().

Any handler can also return `false` to indicate that `stop()` should be called right after.
