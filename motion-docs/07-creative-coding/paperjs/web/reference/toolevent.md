---
source: https://paperjs.org/reference/toolevent/
title: "Paper.js — ToolEvent"
fetched: 2026-10-28
---

# ToolEvent

Extends **[Event](https://paperjs.org/reference/event)**

ToolEvent The ToolEvent object is received by the [Tool](https://paperjs.org/reference/tool)’s mouse event handlers [tool.onMouseDown](https://paperjs.org/reference/tool#onmousedown), [tool.onMouseDrag](https://paperjs.org/reference/tool#onmousedrag), [tool.onMouseMove](https://paperjs.org/reference/tool#onmousemove) and [tool.onMouseUp](https://paperjs.org/reference/tool#onmouseup). The ToolEvent object is the only parameter passed to these functions and contains information about the mouse event.

## Properties

[**type**](https://paperjs.org/reference/toolevent/#type)

The type of tool event.

#### Values:

* 'mousedown', 'mouseup', 'mousemove', 'mousedrag'

#### Type:

* String

[**tool**](https://paperjs.org/reference/toolevent/#tool)

The tool that fired the event.

#### Type:

* [Tool](https://paperjs.org/reference/tool)

[**point**](https://paperjs.org/reference/toolevent/#point)

The position of the mouse in project coordinates when the event was fired.

#### Type:

* [Point](https://paperjs.org/reference/point)

#### Example:

```
function onMouseDrag(event) {
    // the position of the mouse when it is dragged
    console.log(event.point);
}

function onMouseUp(event) {
    // the position of the mouse when it is released
    console.log(event.point);
}
```

[**lastPoint**](https://paperjs.org/reference/toolevent/#lastpoint)

The position of the mouse in project coordinates when the previous event was fired.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**downPoint**](https://paperjs.org/reference/toolevent/#downpoint)

The position of the mouse in project coordinates when the mouse button was last clicked.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**middlePoint**](https://paperjs.org/reference/toolevent/#middlepoint)

The point in the middle between [lastPoint](https://paperjs.org/reference/toolevent#lastpoint) and [point](https://paperjs.org/reference/toolevent#point). This is a useful position to use when creating artwork based on the moving direction of the mouse, as returned by [delta](https://paperjs.org/reference/toolevent#delta).

#### Type:

* [Point](https://paperjs.org/reference/point)

[**delta**](https://paperjs.org/reference/toolevent/#delta)

The difference between the current position and the last position of the mouse when the event was fired. In case of the mouseup event, the difference to the mousedown position is returned.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**velocity**](https://paperjs.org/reference/toolevent/#velocity)

The velocity of the mouse, in points per second: the distance it moved since the last tool event, divided by the time between them, so it points in the direction of the move, and its length is the speed. It stays even when the system misses a mouse report. The events that [tool.maxDistance](https://paperjs.org/reference/tool#maxdistance) adds along one move share its velocity, and the repeats of [tool.eventInterval](https://paperjs.org/reference/tool#eventinterval) have none. On mousedown, and when no time passed, it’s zero.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**elapsed**](https://paperjs.org/reference/toolevent/#elapsed)

The time since the last tool event, in seconds, measured between the reports of the mouse as [velocity](https://paperjs.org/reference/toolevent#velocity) is: the events that [tool.maxDistance](https://paperjs.org/reference/tool#maxdistance) adds along one move share it, and the repeats of [tool.eventInterval](https://paperjs.org/reference/tool#eventinterval) have the interval. It’s zero on the first event.

#### Type:

* Number

[**count**](https://paperjs.org/reference/toolevent/#count)

The number of times the mouse event was fired.

#### Type:

* Number

[**item**](https://paperjs.org/reference/toolevent/#item)

The item at the position of the mouse (if any).

If the item is contained within one or more [Group](https://paperjs.org/reference/group) or [CompoundPath](https://paperjs.org/reference/compoundpath) items, the most top level group or compound path that it is contained within is returned.

#### Type:

* [Item](https://paperjs.org/reference/item)

## Methods

[**toString**()](https://paperjs.org/reference/toolevent/#tostring)

#### Returns:

* String — a string representation of the tool event

## Properties inherited from [Event](https://paperjs.org/reference/event)

[**time**](https://paperjs.org/reference/toolevent/#time)

The time at which the event was created, in seconds, as the times of frame events are. Browsers count from the page’s time origin, as `performance.now()` does, while [view.dispatchMouseEvent(type, point[, options])](https://paperjs.org/reference/view#dispatchmouseevent-type-point) and [view.dispatchKeyEvent(type, key[, options])](https://paperjs.org/reference/view#dispatchkeyevent-type-key) use `Date.now()` unless the host passes a time, so only compare the times of events from the same source.

Read only.

#### Type:

* Number

[**modifiers**](https://paperjs.org/reference/toolevent/#modifiers)

The current state of the keyboard modifiers.

Read only.

#### Type:

* object

#### See also:

* [Key.modifiers](https://paperjs.org/reference/key#modifiers)

## Methods inherited from [Event](https://paperjs.org/reference/event)

[**preventDefault**()](https://paperjs.org/reference/toolevent/#preventdefault)

Cancels the event if it is cancelable, without stopping further propagation of the event.

[**stopPropagation**()](https://paperjs.org/reference/toolevent/#stoppropagation)

Prevents further propagation of the current event.

[**stop**()](https://paperjs.org/reference/toolevent/#stop)

Cancels the event if it is cancelable, and stops stopping further propagation of the event. This is has the same effect as calling both [stopPropagation](https://paperjs.org/reference/event#stoppropagation)() and [preventDefault](https://paperjs.org/reference/event#preventdefault)().

Any handler can also return `false` to indicate that `stop()` should be called right after.
