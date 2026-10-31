---
source: https://paperjs.org/tutorials/interaction/keyboard-interaction
title: "Paper.js — Keyboard Interaction"
fetched: 2026-10-28
---

# Keyboard Interaction

Paper.js allows you to interact with the keyboard in two ways: You can either intercept key events and respond to these, or you can check the state of a given key at any moment, to see if it is pressed or not. This tutorial explains both approaches.

## Receiving Key Events

To receive information about key presses, define an onKeyDown or onKeyUp handler function in your script.

In the following example, we give feedback to the user about which key was pressed / released by creating a text item and changing its content:

Source

#### Please note:

The onKeyDown event is fired continuously while a key is held down.

## The Event Object

The example above uses the [event.key](https://paperjs.org/reference/keyevent#key) property to see which key was pressed. The [event](https://paperjs.org/reference/keyevent) object contains several properties that describe the key event:

[event.key](https://paperjs.org/reference/keyevent#key): the key that was pressed.

[event.character](https://paperjs.org/reference/keyevent#key): the character that the key press generated. This will, for example show a capitalized A when both shift and a are pressed.

[event.type](https://paperjs.org/reference/keyevent#key): the type of key event, either 'keydown' or 'keyup'

## Checking Whether a Key is Pressed

To check whether a key is currently being held down, we can use the [Key.isDown(key)](https://paperjs.org/reference/key#key-isdown-key) function.

In the following example we create a path and add segments to it while the user drags the mouse. When the 'a' key is pressed while dragging, instead of adding new segments, we move the last segment to the position of the mouse.

Source

## Modifier Keys

The [event](https://paperjs.org/reference/toolevent) object that is passed to mouse event handlers such as [onMouseDown](https://paperjs.org/reference/tool#onmousedown) also contain information about which modifier keys were pressed. Modifier keys are keys that don't directly produce a character: capsLock, command, control, option, shift

The [event.modifiers](https://paperjs.org/reference/toolevent#modifiers) property is an object with boolean values for the different modifier keys. So for example, to check if the shift key is down you would do:

```
function onMouseDrag(event) {
	if (event.modifiers.shift) {
		// Do something when the shift key is down
	}
}
```

For example if we wanted to make the same example script as above, but using the shift key:

Source

## Having Fun with Keys

The following example creates a path on execution and then adds segment points to it when you press one of **wasd** keys in the direction of the key.

Click in the view below so it gets keyboard focus and press one of the **wasd** keys.

Source
