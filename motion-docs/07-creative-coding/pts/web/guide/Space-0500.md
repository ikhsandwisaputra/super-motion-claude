---
source: https://ptsjs.org/guide/Space-0500
title: "Space"
fetched: 2026-10-28
---

# Space

[`Space`](https://ptsjs.org/docs/?p=Space_Space) provides a general context for its points to be expressed. Each subclass of `Space` represents a specific context. **`Pts`** includes [`CanvasSpace`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace) which corresponds to the [`canvas`](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) element, and [`SVGSpace`](https://ptsjs.org/docs/?p=Svg_SVGSpace) which lets you create vector graphics in svg format instead. There is also a deprecated [`HTMLSpace`](https://ptsjs.org/docs/?p=Dom_HTMLSpace) which renders forms in basic html elements.

[`CanvasSpace`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace) can be created like this:

```
let space = new CanvasSpace( "#hello" );
space.setup({ bgcolor: "#123", retina: true });
```

The "#hello" is a [`selector string`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) that selects an element in the html page. If the element is a `<canvas>`, it will be used by CanvasSpace. If the element is a `<div>` or other block element, a new `<canvas>` will be appended into it. You may also pass a HTMLElement directly, instead of a query selector string.

Once the space is created, you can optionally call the [`setup`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#function_setup) function to specify its background color (`bgcolor`) and other properties. Take a look at the [`setup`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#function_setup) documentation for more.

Now the space is set up, let's look at what it can do.

### Players

A space by itself is void of form. Let's add a "player" to it. A player can be either a function or an object with specific properties.

```
space.add( (time, ftime) => {
  // do things
});
```

In the above, we use [`add`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#function_add) to add a simple callback function. It has 2 parameters: `time` which gives the current running time, and `ftime` which gives the time taken to draw the previous frame. This callback is like an animation loop, which will be called continuously when the player plays.

Let's look at a more elaborate player:

```
space.add( {
  start: (bound, space) => {
    // code for init
  },
  animate: (time, ftime, space) => {
    // code for animation
  },
  action: (type, x, y, event) => {
    // code for interaction
  },
  resize: (size, event) => {
    // code for resize
  }
} );
```

Here we add an object that conforms to the [IPlayer](https://ptsjs.org/docs/?p=Types_IPlayer) interface, which defines 4 optional callback functions:

* `start` function is called when the space is ready. It includes 2 parameters: `bound` which returns the bounding box, and `space` which returns its space.

* `animate` function is called continuously when the space plays. It includes 2 parameters: `time` which gives the current running time, and `ftime` which gives the time taken to draw the previous frame.
* `action` function is called when a user event is detected. It includes 4 parameters: `type` is a string that returns the action's name. Common types include "up", "down", "move", "drag", "drop", "over", "out", "click", "contextmenu", "pointerdown", "pointerup", "keydown", and "keyup". `x` and `y` return the position at which the action happened, and `event` returns the actual event object. See also: [`bindMouse`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#function_bindMouse), [`bindTouch`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#function_bindTouch), and [`bindKeyboard`](https://ptsjs.org/docs/?p=Space_MultiTouchSpace#function_bindKeyboard).
* `resize` function is called when the space is resized. It includes 2 parameter: `size` which returns the new size, and event which returns the event object. You'll also need to add `{resize: true}` in [`setup`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#function_setup) to enable tracking.

You may add multiple players into a space, each taking care of specific parts of a scene. Use [`add`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#function_add) and [`remove`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#function_remove) to manage a space's players.

### Animation and interaction

You can tell a space to play or stop its players using [`play`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#function_play), [`stop`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#function_stop) and other functions:

```
space.play();
space.playOnce( 1000 ); // play 1 sec then stop
space.pause();
space.resume();
space.stop();
```

Using [`bindMouse`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#function_bindMouse), [`bindTouch`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#function_bindTouch), and [`bindKeyboard`](https://ptsjs.org/docs/?p=Space_MultiTouchSpace#function_bindKeyboard), you can easily make the space respond to user interactions. Once the space can receive events, you can track them using a player's `action` callback function, as described above.

```
// You can chain multiple functions together
space.bindMouse().bindTouch().play();
```

If you use interactive [`UI`](https://ptsjs.org/docs/?p=UI_UI) elements like [`UIButton`](https://ptsjs.org/docs/?p=UI_UIButton) or [`UIDragger`](https://ptsjs.org/docs/?p=UI_UIDragger), you can skip the `action` callback entirely: [`track`](https://ptsjs.org/docs/?p=Space_MultiTouchSpace#function_track) forwards the space's events to them for you.

```
space.track( myButton ); // myButton now receives clicks, hovers, drags...
space.untrack( myButton ); // ...until you stop tracking it
```

CanvasSpace also provides a couple convenient properties which you may access once the space is initiated. [`.pointer`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#accessor_pointer) gives you the current pointer position. [`.size`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#accessor_size), [`.center`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#accessor_center), [`.width`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#accessor_width), [`.height`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#accessor_height) and [`.innerBound`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#accessor_innerBound) are handy to get a space's size and center point. [`.element`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#accessor_element) and [`.parent`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace#accessor_parent) returns the html elements of this space.

CanvasSpace also supports offscreen rendering which may help with rendering complex scene. Take a look at the source code of [this study](https://ptsjs.org/study/index.html?name=CanvasSpace.offscreen) for more.

### Form

In the [Get Started](https://ptsjs.org/guide/Get-started-0100.html) guide, we made an analogy of paper and pencil when introducing Space and Form. So [`CanvasForm`](https://ptsjs.org/docs/?p=Canvas_CanvasForm) represents a pencil to draw on CanvasSpace. You can get the form with a single function call.

```
let space = new CanvasSpace("#paper");
let form = space.getForm(); // get default CanvasForm
```

[`CanvasForm`](https://ptsjs.org/docs/?p=Canvas_CanvasForm) includes many convenient functions to draw shapes on `<canvas>` element. Usually, you'll use these drawing functions in a player's `animate` function like this:

```
// Draw points inside the animate callback function
space.add( (time, ftime) => {
    form.stroke("#fff").fill("#f03").circle( c );
    form.point( p, 10 );
} );
```

If you need more advanced canvas functions, you can get canvas' rendering context by accessing `ctx` property. For example: `form.ctx.clip()`.

![js:space_form](https://ptsjs.org/guide/assets/bg.png)

##### A demo of drawing different shapes

And since both Space and Form are javascript classes, you can extend them to override its functions and add new ones.

### SVG Space

For supported drawing functions, you can switch your code from [`CanvasSpace`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace) to [`SVGSpace`](https://ptsjs.org/docs/?p=Svg_SVGSpace) without changing your drawing code: initiate the space as `SVGSpace` instead of `CanvasSpace`, and `space.getForm()` will return an [`SVGForm`](https://ptsjs.org/docs/?p=Svg_SVGForm), which shares the `CanvasForm` drawing API — shapes, gradients, dashes, text and more render as svg automatically.

```
const space = new SVGSpace( "#elem" ).setup({ bgcolor: "#123", resize: true });
const form = space.getForm();
// ... the same drawing code as canvas
```

If you use [`quickStart`](https://ptsjs.org/demo/?name=pts.quickStart), it picks the space for you: mount on an `<svg>` element and you get an `SVGSpace`; mount on a `<canvas>` or `<div>` and you get a `CanvasSpace`.

SVG does not currently support clipping, image-data writes, source-cropped image drawing, canvas patterns (`Img.pattern`), canvas offscreen buffers, or Porter-Duff composites such as `source-in`. Each warns once and draws nothing. Use `CanvasSpace` if your sketch needs these functions.

`SVGSpace.refresh(false)` keeps the last nonempty frame; it does not accumulate trails across frames. Drawing in `action` callbacks is discarded when the next frame begins. Store input in your action callback and draw the stored scene in `animate`, or use `CanvasSpace` for persistent drawing.

Consecutive shapes that share styles are merged into single svg elements when they do not overlap, or when they are in one opaque color. Overlapping translucent shapes keep separate elements, so they blend like canvas. Where the edges of merged opaque shapes coincide or run close together, their antialiased pixels are blended once rather than twice, so those edges can look slightly lighter than on canvas. Give the shapes a class with `form.cls("name")` to keep each one as its own element. To export the current frame as an svg file, use [`SVGSpace.toSVG`](https://ptsjs.org/docs/?p=Svg_SVGSpace#function_toSVG) — pass `true` to get one element per shape, which is easier to edit in vector graphics tools.

(In earlier versions of Pts, SVG rendering required a `form.scope(this)` call in each animate callback. This is no longer needed — existing code that calls it will still run, as the function is kept as a harmless no-op.)

### HTML Space

There is also an [`HTMLSpace`](https://ptsjs.org/docs/?p=Dom_HTMLSpace) that renders forms in basic html elements. It is deprecated and will be removed in a future major version — use [`SVGSpace`](https://ptsjs.org/docs/?p=Svg_SVGSpace) for DOM-based output instead. Because of the limitations of HTML, it cannot draw polygon, arc, and some other shapes.

If you use Pts with React or other web rendering frameworks, it will be better to use the props and states of their virtual DOM implementations instead.

### Cheat sheet

The quickest way to start is to use the `quickStart` function, which initiates a [`CanvasSpace`](https://ptsjs.org/docs/?p=Canvas_CanvasSpace) and adds `space` and `form` instances into current scope. You can create an interactive piece in 2 lines of code:

```
Pts.namespace( this ); // not needed if using npm package

let run = Pts.quickStart( "elemID", "#f03" )
run( (time, ftime) => form.fill("#f03").point( space.pointer, 10, "circle" ) );
```

The following snippet is a typical template for creating a Pts space and form. Use this if you need more than an animation loop. You can add either an animation function or an `IPlayer` object to a space. (See above for details)

```
Pts.namespace( this ); // not needed if using npm package

var space = new CanvasSpace("elemID").setup({ retina: true });
var form = space.getForm();

space.add( (time, ftime) => {
  form.fill("#f03").point( space.pointer, 10, "circle" );
} );

space.bindMouse().bindTouch().play();
```
