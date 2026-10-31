---
source: https://paperjs.org/reference/view/
title: "Paper.js — View"
fetched: 2026-10-28
---

# View

The View object wraps an HTML element and handles drawing and user interaction through mouse and keyboard for it. It offer means to scroll the view, find the currently visible bounds in project coordinates, or the center, both useful for constructing artwork that should appear centered on screen.

If the canvas element has a `resize` or `data-paper-resize` attribute, the view adjusts its size to the size of the element whenever the window is resized. The element itself needs to be sized through CSS, e.g. with `html, body { height: 100%; }` and `canvas[resize] { width: 100%; height:
100%; }` for a canvas that fills the window. Without such CSS, the view does not follow the window, and on HiDPI screens it grows with each resize. Without the attribute, the view sets the element’s CSS width and height to its own size, see [viewSize](https://paperjs.org/reference/view#viewsize).

## Properties

[**autoUpdate**](https://paperjs.org/reference/view/#autoupdate)

Controls whether the view is automatically updated in the next animation frame on changes, or whether you prefer to manually call [update](https://paperjs.org/reference/view#update)() or [requestUpdate](https://paperjs.org/reference/view#requestupdate)() after changes. Note that this is `true` by default, except for Node.js, where manual updates make more sense.

#### Type:

* Boolean

[**element**](https://paperjs.org/reference/view/#element)

The underlying native element.

Read only.

#### Type:

* HTMLCanvasElement

[**project**](https://paperjs.org/reference/view/#project)

The project that this view displays.

Read only.

#### Type:

* [Project](https://paperjs.org/reference/project)

[**scope**](https://paperjs.org/reference/view/#scope)

The scope that this view belongs to.

Read only.

#### Type:

* [PaperScope](https://paperjs.org/reference/paperscope)

[**pixelRatio**](https://paperjs.org/reference/view/#pixelratio)

The ratio between physical pixels and device-independent pixels (DIPs) of the underlying canvas / device. It is `1` for normal displays, and `2` or more for high-resolution displays.

Read only.

#### Type:

* Number

[**resolution**](https://paperjs.org/reference/view/#resolution)

The resolution of the underlying canvas / device in pixel per inch (DPI). It is `72` for normal displays, and `144` for high-resolution displays with a pixel-ratio of `2`.

Read only.

#### Type:

* Number

[**viewSize**](https://paperjs.org/reference/view/#viewsize)

The size of the view. Changing the view’s size will resize it’s underlying element.

#### Type:

* [Size](https://paperjs.org/reference/size)

[**bounds**](https://paperjs.org/reference/view/#bounds)

The bounds of the currently visible area in project coordinates. Setting them fits the view to the given rectangle, as [fitBounds(rectangle)](https://paperjs.org/reference/view#fitbounds-rectangle) does. Since the view keeps its aspect ratio, the bounds read back can be larger than the rectangle in one direction.

#### Type:

* [Rectangle](https://paperjs.org/reference/rectangle)

[**size**](https://paperjs.org/reference/view/#size)

The size of the visible area in project coordinates.

Read only.

#### Type:

* [Size](https://paperjs.org/reference/size)

[**center**](https://paperjs.org/reference/view/#center)

The center of the visible area in project coordinates.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**zoom**](https://paperjs.org/reference/view/#zoom)

The view’s zoom factor by which the project coordinates are magnified. Setting it to a value that isn’t a positive number has no effect.

#### Type:

* Number

#### See also:

* [scaling](https://paperjs.org/reference/view#scaling)

[**rotation**](https://paperjs.org/reference/view/#rotation)

The current rotation angle of the view, as described by its [matrix](https://paperjs.org/reference/view#matrix).

#### Type:

* Number

[**scaling**](https://paperjs.org/reference/view/#scaling)

The current scale factor of the view, as described by its [matrix](https://paperjs.org/reference/view#matrix).

#### Type:

* [Point](https://paperjs.org/reference/point)

#### See also:

* [zoom](https://paperjs.org/reference/view#zoom)

[**matrix**](https://paperjs.org/reference/view/#matrix)

The view’s transformation matrix, defining the view onto the project’s contents (position, zoom level, rotation, etc).

#### Type:

* [Matrix](https://paperjs.org/reference/matrix)

### Event Handlers

[**onFrame**](https://paperjs.org/reference/view/#onframe)

Handler function to be called on each frame of an animation. The function receives an event object which contains information about the frame event:

#### Type:

* Function⟋null

#### Options:

* event.count: Number — the number of times the frame event was fired
* event.time: Number — the total amount of time passed since the first frame event in seconds
* event.delta: Number — the time passed in seconds since the last frame event

#### See also:

* [item.onFrame](https://paperjs.org/reference/item#onframe)

#### Example:Creating an animation:

Run

[**onResize**](https://paperjs.org/reference/view/#onresize)

Handler function that is called whenever a view is resized.

#### Type:

* Function⟋null

#### Example:Repositioning items when a view is resized:

```
// Create a circle shaped path in the center of the view:
var path = new Path.Circle(view.bounds.center, 30);
path.fillColor = 'red';

view.onResize = function(event) {
    // Whenever the view is resized, move the path to its center:
    path.position = view.center;
}
```

[**onMouseDown**](https://paperjs.org/reference/view/#onmousedown)

The function to be called when the mouse button is pushed down on the view. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy, reaching the view at the end, unless they are stopped before with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from a handler.

#### Type:

* Function⟋null

#### See also:

* [item.onMouseDown](https://paperjs.org/reference/item#onmousedown)

[**onMouseDrag**](https://paperjs.org/reference/view/#onmousedrag)

The function to be called when the mouse position changes while the mouse is being dragged over the view. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy, reaching the view at the end, unless they are stopped before with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from a handler.

#### Type:

* Function⟋null

#### See also:

* [item.onMouseDrag](https://paperjs.org/reference/item#onmousedrag)

[**onMouseUp**](https://paperjs.org/reference/view/#onmouseup)

The function to be called when the mouse button is released over the item. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event.

#### Type:

* Function⟋null

#### See also:

* [item.onMouseUp](https://paperjs.org/reference/item#onmouseup)

[**onClick**](https://paperjs.org/reference/view/#onclick)

The function to be called when the mouse clicks on the view. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy, reaching the view at the end, unless they are stopped before with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from a handler.

#### Type:

* Function⟋null

#### See also:

* [item.onClick](https://paperjs.org/reference/item#onclick)

[**onDoubleClick**](https://paperjs.org/reference/view/#ondoubleclick)

The function to be called when the mouse double clicks on the view. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy, reaching the view at the end, unless they are stopped before with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from a handler.

#### Type:

* Function⟋null

#### See also:

* [item.onDoubleClick](https://paperjs.org/reference/item#ondoubleclick)

[**onMouseMove**](https://paperjs.org/reference/view/#onmousemove)

The function to be called repeatedly while the mouse moves over the view. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy, reaching the view at the end, unless they are stopped before with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from a handler.

#### Type:

* Function⟋null

#### See also:

* [item.onMouseMove](https://paperjs.org/reference/item#onmousemove)

[**onMouseEnter**](https://paperjs.org/reference/view/#onmouseenter)

The function to be called when the mouse moves over the view. This function will only be called again, once the mouse moved outside of the view first. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy, reaching the view at the end, unless they are stopped before with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from a handler.

#### Type:

* Function⟋null

#### See also:

* [item.onMouseEnter](https://paperjs.org/reference/item#onmouseenter)

[**onMouseLeave**](https://paperjs.org/reference/view/#onmouseleave)

The function to be called when the mouse moves out of the view. The function receives a [MouseEvent](https://paperjs.org/reference/mouseevent) object which contains information about the mouse event. Note that such mouse events bubble up the scene graph hierarchy, reaching the view at the end, unless they are stopped before with [event.stopPropagation](https://paperjs.org/reference/event#stoppropagation)() or by returning `false` from a handler.

#### Type:

* Function⟋null

#### See also:

* [view.onMouseLeave](https://paperjs.org/reference/view#onmouseleave)

[**onKeyDown**](https://paperjs.org/reference/view/#onkeydown)

The function to be called when the user presses a key on the keyboard. The function receives a [KeyEvent](https://paperjs.org/reference/keyevent) object which contains information about the keyboard event.

If the function returns `false`, the keyboard event will be prevented from bubbling up. This can be used for example to stop the window from scrolling, when you need the user to interact with arrow keys.

#### Type:

* Function⟋null

#### Example:Scaling a path whenever the user presses the space bar:

Run

[**onKeyUp**](https://paperjs.org/reference/view/#onkeyup)

The function to be called when the user releases a key on the keyboard. The function receives a [KeyEvent](https://paperjs.org/reference/keyevent) object which contains information about the keyboard event.

If the function returns `false`, the keyboard event will be prevented from bubbling up. This can be used for example to stop the window from scrolling, when you need the user to interact with arrow keys.

#### Type:

* Function⟋null

#### Example:

```
view.onKeyUp = function(event) {
    if (event.key == 'space') {
        console.log('The spacebar was released!');
    }
}
```

## Methods

[**remove**()](https://paperjs.org/reference/view/#remove)

Removes this view from the project and frees the associated element.

[**update**([force])](https://paperjs.org/reference/view/#update)

Updates the view if there are changes. Note that when using built-in event handlers for interaction, animation and load events, this method is invoked for you automatically at the end.

#### Parameters:

* force:
  Boolean
  — whether to redraw the view even if nothing has changed, e.g. after a web font used by text items has finished loading
  — optional, default: false

#### Returns:

* Boolean — true if the view was updated, false otherwise

[**requestUpdate**()](https://paperjs.org/reference/view/#requestupdate)

Requests an update of the view if there are changes through the browser’s requestAnimationFrame() mechanism for smooth animation. Note that when using built-in event handlers for interaction, animation and load events, updates are automatically invoked for you automatically at the end.

[**play**()](https://paperjs.org/reference/view/#play)

Makes all animation play by adding the view to the request animation loop.

[**pause**()](https://paperjs.org/reference/view/#pause)

Makes all animation pause by removing the view from the request animation loop.

[**isVisible**()](https://paperjs.org/reference/view/#isvisible)

Checks whether the view is currently visible within the current browser viewport.

#### Returns:

* Boolean — true if the view is visible, false otherwise

[**isInserted**()](https://paperjs.org/reference/view/#isinserted)

Checks whether the view is inserted into the browser DOM.

#### Returns:

* Boolean — true if the view is inserted, false otherwise

### Transform Functions

[**translate**(delta)](https://paperjs.org/reference/view/#translate-delta)

Translates (scrolls) the view by the given offset vector.

#### Parameters:

* delta:
  [Point](https://paperjs.org/reference/point)
  — the offset to translate the view by

[**rotate**(angle[, center])](https://paperjs.org/reference/view/#rotate-angle)

Rotates the view by a given angle around the given center point.

Angles are oriented clockwise and measured in degrees.

#### Parameters:

* angle:
  Number
  — the rotation angle
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [view.center](https://paperjs.org/reference/view#center)

#### See also:

* [matrix.rotate(angle[, center])](https://paperjs.org/reference/matrix#rotate-angle)

[**scale**(scale[, center])](https://paperjs.org/reference/view/#scale-scale)

Scales the view by the given value from its center point, or optionally from a supplied point.

#### Parameters:

* scale:
  Number
  — the scale factor
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [view.center](https://paperjs.org/reference/view#center)

[**scale**(hor, ver[, center])](https://paperjs.org/reference/view/#scale-hor-ver)

Scales the view by the given values from its center point, or optionally from a supplied point.

#### Parameters:

* hor:
  Number
  — the horizontal scale factor
* ver:
  Number
  — the vertical scale factor
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [view.center](https://paperjs.org/reference/view#center)

[**shear**(shear[, center])](https://paperjs.org/reference/view/#shear-shear)

Shears the view by the given value from its center point, or optionally by a supplied point.

#### Parameters:

* shear:
  [Point](https://paperjs.org/reference/point)
  — the horizontal and vertical shear factors as a point
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [view.center](https://paperjs.org/reference/view#center)

#### See also:

* [matrix.shear(shear[, center])](https://paperjs.org/reference/matrix#shear-shear)

[**shear**(hor, ver[, center])](https://paperjs.org/reference/view/#shear-hor-ver)

Shears the view by the given values from its center point, or optionally by a supplied point.

#### Parameters:

* hor:
  Number
  — the horizontal shear factor
* ver:
  Number
  — the vertical shear factor
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [view.center](https://paperjs.org/reference/view#center)

#### See also:

* [matrix.shear(hor, ver[, center])](https://paperjs.org/reference/matrix#shear-hor-ver)

[**skew**(skew[, center])](https://paperjs.org/reference/view/#skew-skew)

Skews the view by the given angles from its center point, or optionally by a supplied point.

#### Parameters:

* skew:
  [Point](https://paperjs.org/reference/point)
  — the horizontal and vertical skew angles in degrees
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [view.center](https://paperjs.org/reference/view#center)

#### See also:

* [matrix.shear(skew[, center])](https://paperjs.org/reference/matrix#shear-skew)

[**skew**(hor, ver[, center])](https://paperjs.org/reference/view/#skew-hor-ver)

Skews the view by the given angles from its center point, or optionally by a supplied point.

#### Parameters:

* hor:
  Number
  — the horizontal skew angle in degrees
* ver:
  Number
  — the vertical sskew angle in degrees
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [view.center](https://paperjs.org/reference/view#center)

#### See also:

* [matrix.shear(hor, ver[, center])](https://paperjs.org/reference/matrix#shear-hor-ver)

[**transform**(matrix)](https://paperjs.org/reference/view/#transform-matrix)

Transform the view.

#### Parameters:

* matrix:
  [Matrix](https://paperjs.org/reference/matrix)
  — the matrix by which the view shall be transformed

[**fitBounds**(rectangle[, fit])](https://paperjs.org/reference/view/#fitbounds-rectangle)

Transform the view so that the specified rectangle is centered in it and fitted to it as described by `fit`, keeping the view’s rotation and mirroring.

#### Parameters:

* rectangle:
  [Rectangle](https://paperjs.org/reference/rectangle)
  — the rectangle to fit, in project coordinates
* fit:
  String
  — how to fit the rectangle, as in CSS’s `object-fit`: `'contain'` shows all of it, and `'cover'` fills the whole view with it, cropping the parts that don’t fit
  — optional, default: ‘contain’

#### Example:Fitting the view to the bounds of an item:

Run

[**projectToView**(point)](https://paperjs.org/reference/view/#projecttoview-point)

Converts the passed point from project coordinate space to view coordinate space, which is measured in browser pixels in relation to the position of the view element.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point in project coordinates to be converted

#### Returns:

* [Point](https://paperjs.org/reference/point) — the point converted into view coordinates

[**viewToProject**(point)](https://paperjs.org/reference/view/#viewtoproject-point)

Converts the passed point from view coordinate space to project coordinate space.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point in view coordinates to be converted

#### Returns:

* [Point](https://paperjs.org/reference/point) — the point converted into project coordinates

[**getEventPoint**(event)](https://paperjs.org/reference/view/#geteventpoint-event)

Determines and returns the event location in project coordinate space.

#### Parameters:

* event:
  [Event](https://paperjs.org/reference/event)
  — the native event object for which to determine the location.

#### Returns:

* [Point](https://paperjs.org/reference/point) — the event point in project coordinates.

### Event Handling

[**on**(type, function)](https://paperjs.org/reference/view/#on-type-function)

Attach an event handler to the view.

#### Parameters:

* type:
  String
  — the type of event: ‘frame’, ‘resize’, ‘mousedown’, ‘mouseup’, ‘mousedrag’, ‘click’, ‘doubleclick’, ‘mousemove’, ‘mouseenter’, ‘mouseleave’
* function:
  Function
  — the function to be called when the event occurs, receiving a [MouseEvent](https://paperjs.org/reference/mouseevent) or [Event](https://paperjs.org/reference/event) object as its sole argument

#### Returns:

* [View](https://paperjs.org/reference/view) — this view itself, so calls can be chained

#### Example:Create a rectangle shaped path with its top left point at: {x: 50, y: 25} and a size of {width: 50, height: 50}

Run

[**on**(param)](https://paperjs.org/reference/view/#on-param)

Attach one or more event handlers to the view.

#### Parameters:

* param:
  Object
  — an object literal containing one or more of the following properties: frame, resize

#### Returns:

* [View](https://paperjs.org/reference/view) — this view itself, so calls can be chained

#### Example:Create a rectangle shaped path with its top left point at: {x: 50, y: 25} and a size of {width: 50, height: 50}

Run

[**off**(type, function)](https://paperjs.org/reference/view/#off-type-function)

Detach an event handler from the view.

#### Parameters:

* type:
  String
  — the event type: ‘frame’, ‘resize’, ‘mousedown’, ‘mouseup’, ‘mousedrag’, ‘click’, ‘doubleclick’, ‘mousemove’, ‘mouseenter’, ‘mouseleave’
* function:
  Function
  — the function to be detached

#### Returns:

* [View](https://paperjs.org/reference/view) — this view itself, so calls can be chained

#### Example:Create a rectangle shaped path with its top left point at: {x: 50, y: 25} and a size of {width: 50, height: 50}

Run

[**off**(param)](https://paperjs.org/reference/view/#off-param)

Detach one or more event handlers from the view.

#### Parameters:

* param:
  Object
  — an object literal containing one or more of the following properties: frame, resize

#### Returns:

* [View](https://paperjs.org/reference/view) — this view itself, so calls can be chained

[**emit**(type, event)](https://paperjs.org/reference/view/#emit-type-event)

Emit an event on the view.

#### Parameters:

* type:
  String
  — the event type: ‘frame’, ‘resize’, ‘mousedown’, ‘mouseup’, ‘mousedrag’, ‘click’, ‘doubleclick’, ‘mousemove’, ‘mouseenter’, ‘mouseleave’
* event:
  Object
  — an object literal containing properties describing the event

#### Returns:

* Boolean — true if the event had listeners, false otherwise

[**responds**(type)](https://paperjs.org/reference/view/#responds-type)

Check if the view has one or more event handlers of the specified type.

#### Parameters:

* type:
  String
  — the event type: ‘frame’, ‘resize’, ‘mousedown’, ‘mouseup’, ‘mousedrag’, ‘click’, ‘doubleclick’, ‘mousemove’, ‘mouseenter’, ‘mouseleave’

#### Returns:

* Boolean — true if the view has one or more event handlers of the specified type, false otherwise

[**dispatchMouseEvent**(type, point[, options])](https://paperjs.org/reference/view/#dispatchmouseevent-type-point)

Handles a mouse event that the host provides, for hosts without a DOM, such as workers, or with their own event source. It runs the same handling as the DOM’s mouse events: the active tool’s handlers, with [tool.minDistance](https://paperjs.org/reference/tool#mindistance) and the like, then those of the items under the point and of the view, including the events that Paper.js derives itself: `'mousedrag'`, `'click'`, `'doubleclick'`, `'mouseenter'` and `'mouseleave'`. Points outside the view’s bounds are handled too, since the host decides which events belong to its drawing surface.

#### Options:

* [options.modifiers] {Object} the state of the modifier keys,
  see {@link Key#modifiers}
* options.button: Number — the mouse button — default: 0
* options.time: Number — the time of the event in seconds, see [event.time](https://paperjs.org/reference/event#time) — default: Date.now() / 1000

#### Parameters:

* type:
  String
  — the type of the event: ‘mousedown’, ‘mousemove’, ‘mouseup’
* point:
  [Point](https://paperjs.org/reference/point)
  — the location of the mouse in project coordinates
* options:
  Object
  — the details of the event
  — optional

#### Returns:

* Boolean — true if a handler prevented the event’s default, false otherwise

[**dispatchKeyEvent**(type, key[, options])](https://paperjs.org/reference/view/#dispatchkeyevent-type-key)

Handles a key event that the host provides, for hosts without a DOM, such as workers, or with their own event source. It updates Key#modifiers and Key#isDown(key), and calls the view’s and the active tool’s handlers, as the DOM’s key events do.

#### Options:

* [options.character] {String} the character that the key
  produces. By default, keydown takes the key itself if it is a
  single character, the space, carriage return and tab characters
  for 'space', 'enter' and 'tab', and keyup the character of its
  keydown
* [options.modifiers] {Object} the state of the modifier keys,
  see {@link Key#modifiers}
* options.time: Number — the time of the event in seconds, see [event.time](https://paperjs.org/reference/event#time) — default: Date.now() / 1000

#### Parameters:

* type:
  String
  — the type of the event: ‘keydown’, ‘keyup’
* key:
  String
  — the key, as in [keyEvent.key](https://paperjs.org/reference/keyevent#key)
* options:
  Object
  — the details of the event
  — optional
