---
source: https://paperjs.org/reference/tool/
title: "Paper.js — Tool"
fetched: 2026-10-28
---

# Tool

The Tool object refers to a script that the user can interact with by using the mouse and keyboard and can be accessed through the global `tool` variable. All its properties are also available in the paper scope.

The global `tool` variable only exists in scripts that contain mouse handler functions ([onMouseMove](https://paperjs.org/reference/tool#onmousemove), [onMouseDown](https://paperjs.org/reference/tool#onmousedown), [onMouseDrag](https://paperjs.org/reference/tool#onmousedrag), [onMouseUp](https://paperjs.org/reference/tool#onmouseup)) or a keyboard handler function ([onKeyDown](https://paperjs.org/reference/tool#onkeydown), [onKeyUp](https://paperjs.org/reference/tool#onkeyup)).

#### Example:

Run

## Properties

[**scope**](https://paperjs.org/reference/tool/#scope)

The scope that this tool belongs to.

Read only.

#### Type:

* [PaperScope](https://paperjs.org/reference/paperscope)

[**minDistance**](https://paperjs.org/reference/tool/#mindistance)

The minimum distance the mouse has to drag before firing the onMouseDrag event, since the last onMouseDrag event.

#### Type:

* Number

[**maxDistance**](https://paperjs.org/reference/tool/#maxdistance)

The maximum distance the mouse has to drag before firing the onMouseDrag event, since the last onMouseDrag event.

#### Type:

* Number

[**eventInterval**](https://paperjs.org/reference/tool/#eventinterval)

The interval in milliseconds at which the onMouseDrag event fires again while the mouse button is held, also when the mouse doesn’t move. The repeated events are at the last point, with a zero [toolEvent.delta](https://paperjs.org/reference/toolevent#delta). `null`, the default, or anything up to 0 turns it off.

#### Default:

* null

#### Type:

* Number

#### Example:Fire the onMouseDrag event 10 times a second, while the mouse button is held:

```
tool.eventInterval = 100;
```

[**fixedDistance**](https://paperjs.org/reference/tool/#fixeddistance)

#### Type:

* Number

### Mouse Event Handlers

[**onMouseDown**](https://paperjs.org/reference/tool/#onmousedown)

The function to be called when the mouse button is pushed down. The function receives a [ToolEvent](https://paperjs.org/reference/toolevent) object which contains information about the tool event.

#### Type:

* Function⟋null

#### Example:Creating circle shaped paths where the user presses the mouse button:

Run

[**onMouseDrag**](https://paperjs.org/reference/tool/#onmousedrag)

The function to be called when the mouse position changes while the mouse is being dragged. The function receives a [ToolEvent](https://paperjs.org/reference/toolevent) object which contains information about the tool event.

#### Type:

* Function⟋null

#### Example:Draw a line by adding a segment to a path on every mouse drag event:

Run

[**onMouseMove**](https://paperjs.org/reference/tool/#onmousemove)

The function to be called the mouse moves within the project view. The function receives a [ToolEvent](https://paperjs.org/reference/toolevent) object which contains information about the tool event.

While the mouse button is held down, the tool calls [onMouseDrag](https://paperjs.org/reference/tool#onmousedrag) instead, if it defines one, and `onMouseMove` only otherwise.

#### Type:

* Function⟋null

#### Example:Moving a path to the position of the mouse:

Run

[**onMouseUp**](https://paperjs.org/reference/tool/#onmouseup)

The function to be called when the mouse button is released. The function receives a [ToolEvent](https://paperjs.org/reference/toolevent) object which contains information about the tool event.

#### Type:

* Function⟋null

#### Example:Creating circle shaped paths where the user releases the mouse:

Run

### Keyboard Event Handlers

[**onKeyDown**](https://paperjs.org/reference/tool/#onkeydown)

The function to be called when the user presses a key on the keyboard. The function receives a [KeyEvent](https://paperjs.org/reference/keyevent) object which contains information about the keyboard event.

If the function returns `false`, the keyboard event will be prevented from bubbling up. This can be used for example to stop the window from scrolling, when you need the user to interact with arrow keys.

#### Type:

* Function⟋null

#### Example:Scaling a path whenever the user presses the space bar:

Run

[**onKeyUp**](https://paperjs.org/reference/tool/#onkeyup)

The function to be called when the user releases a key on the keyboard. The function receives a [KeyEvent](https://paperjs.org/reference/keyevent) object which contains information about the keyboard event.

If the function returns `false`, the keyboard event will be prevented from bubbling up. This can be used for example to stop the window from scrolling, when you need the user to interact with arrow keys.

#### Type:

* Function⟋null

#### Example:

```
tool.onKeyUp = function(event) {
    if (event.key == 'space') {
        console.log('The spacebar was released!');
    }
}
```

### Activation Event Handlers

[**onActivate**](https://paperjs.org/reference/tool/#onactivate)

The function to be called when the tool is activated through [activate](https://paperjs.org/reference/tool#activate)(). The function receives the previously active tool, which is the tool itself when it was already active.

#### Type:

* Function⟋null

#### Example:

```
tool.onActivate = function(previous) {
    if (previous == tool) {
        console.log('The tool was activated again!');
    }
}
```

[**onDeactivate**](https://paperjs.org/reference/tool/#ondeactivate)

The function to be called when another tool is activated through [activate](https://paperjs.org/reference/tool#activate)(), while this one is active.

#### Type:

* Function⟋null

## Methods

[**activate**()](https://paperjs.org/reference/tool/#activate)

Activates this tool, meaning [paperScope.tool](https://paperjs.org/reference/paperscope#tool) will point to it and it will be the one that receives tool events.

[**remove**()](https://paperjs.org/reference/tool/#remove)

Removes this tool from the [paperScope.tools](https://paperjs.org/reference/paperscope#tools) list.

### Event Handling

[**on**(type, function)](https://paperjs.org/reference/tool/#on-type-function)

Attach an event handler to the tool.

#### Parameters:

* type:
  String
  — the event type: ‘mousedown’, ‘mouseup’, ‘mousedrag’, ‘mousemove’, ‘keydown’, ‘keyup’
* function:
  Function
  — the function to be called when the event occurs, receiving a [ToolEvent](https://paperjs.org/reference/toolevent) object as its sole argument

#### Returns:

* [Tool](https://paperjs.org/reference/tool) — this tool itself, so calls can be chained

[**on**(param)](https://paperjs.org/reference/tool/#on-param)

Attach one or more event handlers to the tool.

#### Parameters:

* param:
  Object
  — an object literal containing one or more of the following properties: mousedown, mouseup, mousedrag, mousemove, keydown, keyup

#### Returns:

* [Tool](https://paperjs.org/reference/tool) — this tool itself, so calls can be chained

[**off**(type, function)](https://paperjs.org/reference/tool/#off-type-function)

Detach an event handler from the tool.

#### Parameters:

* type:
  String
  — the event type: ‘mousedown’, ‘mouseup’, ‘mousedrag’, ‘mousemove’, ‘keydown’, ‘keyup’
* function:
  Function
  — the function to be detached

#### Returns:

* [Tool](https://paperjs.org/reference/tool) — this tool itself, so calls can be chained

[**off**(param)](https://paperjs.org/reference/tool/#off-param)

Detach one or more event handlers from the tool.

#### Parameters:

* param:
  Object
  — an object literal containing one or more of the following properties: mousedown, mouseup, mousedrag, mousemove, keydown, keyup

#### Returns:

* [Tool](https://paperjs.org/reference/tool) — this tool itself, so calls can be chained

[**emit**(type, event)](https://paperjs.org/reference/tool/#emit-type-event)

Emit an event on the tool.

#### Parameters:

* type:
  String
  — the event type: ‘mousedown’, ‘mouseup’, ‘mousedrag’, ‘mousemove’, ‘keydown’, ‘keyup’
* event:
  Object
  — an object literal containing properties describing the event

#### Returns:

* Boolean — true if the event had listeners, false otherwise

[**responds**(type)](https://paperjs.org/reference/tool/#responds-type)

Check if the tool has one or more event handlers of the specified type.

#### Parameters:

* type:
  String
  — the event type: ‘mousedown’, ‘mouseup’, ‘mousedrag’, ‘mousemove’, ‘keydown’, ‘keyup’

#### Returns:

* Boolean — true if the tool has one or more event handlers of the specified type, false otherwise
