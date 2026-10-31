---
source: https://www.unicorn.studio/docs/events
title: "Events - Unicorn Studio"
fetched: 2026-10-28
---

# Events

Events bring your scenes to life by connecting animations to real user interactions. Instead of static visuals, you can create experiences that respond to scrolling, hovering, mouse movement, and more.

When you're working with WebGL, motion isn't an add-on — it's fundamental. Almost any property of any layer can respond to events:

* **Appear** — entrance animations when the scene comes into view
* **Scroll** — tie animations to scroll position or velocity
* **Hover** — respond when users mouse over the scene
* **Mouse move** — react to cursor speed and motion

There's also a [timeline](https://www.unicorn.studio/docs/events/#interaction-timeline) for sequencing appear and scroll events, but in many cases interaction alone is enough. A subtle depth shift tied to the mouse, a scroll-driven mask reveal, or a gentle reactive bloom can add dimensionality without overwhelming the design.

---

## Appear Events

Make a memorable first impression with entrance animations that trigger when your scene scrolls into view.

[](https://assets.unicorn.studio/media/docs/appear.mp4)

When you add an appear event, the **Timeline** opens—giving you a visual way to sequence, edit, and preview all entrance animations across layers.

### Configuration

* **Property**: Any animatable value (color, position, scale, opacity, etc.)
* **Start Value**: Where the animation begins
* **End Value**: Where it lands
* **Duration**: How long the animation takes (0–1000ms)
* **Delay**: Wait time before starting (0–2500ms)
* **Easing**: Choose from smooth, bouncy, elastic, and other timing curves
* **Loop**: Optionally repeat the animation forwards or in reverse
* **Loop Delay**: Pause between repetitions

### Behavior

* Animations fire the moment your scene enters the viewport
* Stack multiple appear events on different properties for layered effects
* Use the **Preview** button to test animations without scrolling
* Progress indicators help you visualize timing

---

## Scroll Events

Tie animations directly to the scroll position for parallax effects, progress reveals, and scroll-driven storytelling.

[](https://assets.unicorn.studio/media/docs/scroll.mp4)

### Scroll Into View Mode

Animate a property as the scene moves through the viewport. Each scroll event is a bar on the **Scroll** tab of the [Timeline](https://www.unicorn.studio/docs/events/#interaction-timeline).

* **Property**: The value to animate
* **From**: Where the animation begins. Until you set it, it's the layer's value, or where the previous event on this property ends
* **To**: Where it lands
* **Ease**: Same timing curves as Appear events
* **Delay**: How far the scene's top edge has scrolled past the top of the viewport when the animation begins (−100–200% of the viewport height). Below 0 it begins while the scene is still coming up from the bottom
* **Duration**: How far the animation runs (0–200% of the viewport height)

The **Scroll trigger** settings apply to every scroll bar on the layer:

* **Momentum**: Add smoothness to the scroll response (0–100%)
* **Spring**: Add springy overshoot (0–100%)

### While Scrolling Mode

React to active scrolling rather than scroll position—great for velocity-based effects. While Scrolling events stay in the Events panel instead of the Timeline.

* **Property**: The value to animate
* **To**: Target state while scrolling
* **Ignore Direction**: Keep values positive regardless of scroll direction
* **Momentum**: Smoothing/inertia (0–100%)
* **Spring**: Add springy overshoot (0–100%)

### Behavior

* Animations can track position directly or use momentum for smoother results
* The Timeline's Scroll ruler shows each bar's range, and scrolling the canvas moves its playhead
* Works with both directional and absolute scroll values
* Combine with other event types for rich, layered interactions

---

## Hover Events

Add interactivity that responds when users mouse over your scene.

[](https://assets.unicorn.studio/media/docs/hover.mp4)

### Configuration

* **Property**: The value to animate on hover
* **Hover Value**: Target state while hovering
* **Duration**: Animation length (0–1000ms)
* **Delay**: Wait time before animating (0–2500ms)
* **Easing**: Same timing curves as Appear events
* **Forwards Only**: When enabled, the animation only plays on mouse enter and doesn't reverse on leave
* **Trigger On**: Whether the animation should fire while hovering on the whole canvas or the element bounding box. Effect layers can only use "Element" if they are a child of a Shape/Image/Text layer.

### Behavior

* Triggers instantly when the cursor enters the scene
* Smoothly reverses when the cursor leaves (unless Forwards Only is on)
* Test with the **Preview** button—just hover it
* Progress bar shows real-time animation state

---

## Mousemove Events

Create effects that respond to the speed and motion of the cursor—perfect for adding energy and fluidity to your scenes.

[](https://assets.unicorn.studio/media/docs/mousemove2.mp4)

### Configuration

* **Property**: The value to animate based on mouse movement
* **Target Value**: The state to animate toward when movement is detected
* **Sensitivity**: How quickly the effect responds to motion (0–1). Higher values mean faster, more dramatic reactions.
* **Momentum**: Smoothing applied to the animation (0–1). Higher values create a more gradual, eased response.
* **Delay**: Time (in ms) before the animation returns to its initial state after the mouse stops moving. Set to 0 for instant reset.

### Behavior

* The effect intensity builds as the user moves the mouse faster
* When movement stops, the animation smoothly returns to its original value (after the delay)
* Use momentum to control how fluid or snappy the response feels
* Combine with other events for interactive, motion-driven experiences

---

## Interaction Timeline

The interaction timeline needs SDK v2.4.0+ in your embed. It puts scroll events on the **Timeline** beside appear events, with a tab for each: **Appear** and **Scroll**. Each event is a bar on its trigger's ruler, and you edit it the same way on both. Hover, Mousemove, and While Scrolling events keep their own panels, since they follow the cursor or how fast the page scrolls rather than a position. Set a scroll bar's **Mode** to **While scrolling** to move it to the Events panel.

* **Appear** rulers are time (ms).
* **Scroll** rulers are distance, as a percentage of the viewport the scene's top edge has scrolled past the top of the viewport. They start at −100%, where the top edge enters at the bottom. Scrolling the canvas moves the playhead. Turn on **Fixed mode** beside the Scroll tab to fit the scene in the window and hold it still while you scroll through its events.

### Stages

Several scroll bars on one property play in order, so a scroll can reveal and then fade. Each bar plays from the previous bar's end value, or from the layer's value, until you edit its **From** value.

Events on different triggers add up on the same property, so a layer can drift with the mouse while it fades in on scroll. While Scrolling events add up with a property's scroll bars the same way.

### Trigger settings

The **Scroll trigger** section of the bar's inspector holds the settings shared by a layer's scroll bars: Momentum and Spring.

### Moving events between triggers

Right-click a bar and choose **Move to…** or **Copy to…** to put it on the other trigger, keeping its values and easing. One second of time becomes half a viewport of scroll, so an intro animation becomes a scroll reveal in one step.

Scroll events made before the interaction timeline keep playing as they did, and become bars on the ruler the first time you edit them there. Bars that had a Start Position keep their place on the ruler, with it folded into their Delay.

---

## Breakpoints

Breakpoints let you limit an event to specific screen sizes. Want an animation to fire on Desktop only? Check the "Desktop" checkbox.

This also lets you create different animations per breakpoint. To change an animation on Mobile, create two events: one with "Desktop" and "Tablet" checked, and a second, altered one with "Mobile" checked.

Checking none or all three lets the event fire on all breakpoints.
