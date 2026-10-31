---
source: https://rive.app/docs/runtimes/web/rive-events.md
title: ""
fetched: 2026-10-28
---

> ## Documentation Index
> Fetch the complete documentation index at: https://rive.app/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Rive Events

> ⚠️ DEPRECATED: Use Data Binding instead of Events

> [!WARNING]
>
> **DEPRECATION NOTICE:** This entire page documents the legacy Events system.
> **For new projects:** Use [Data Binding](https://rive.app/docs/runtimes/web/data-binding.md) instead.
> **For existing projects:** Plan to migrate from Events to Data Binding as soon
> as possible. **This content is provided for legacy support only.**

[YouTube video player](https://www.youtube.com/embed/M5DIDVtYI_Y)

With Rive events, you have the ability to subscribe to meaningful signals that get reported from animations, state machines, and Rive listeners, all created at design time from the Rive editor. These signals can be subscribed to at runtime and have a specific name, type, and various custom metadata that may accompany the event to help inform the context surrounding its meaning.

For more on the Events feature in general, check out the [Events](https://rive.app/docs/editor/events/overview.md) page in the editor section of the docs. The Event system has also been expanded to support [Audio Events ](https://rive.app/docs/editor/events/audio-events.md)to trigger audio to play in the editor and at runtime.

For example, in a Rive graphic simulating a loader, there may be an event named `LoadComplete` fired when transitioning from a `complete` timeline animation state to an `idle` state. You can subscribe to Rive events with a callback that the runtime may invoke, and from there, your callback can handle extra functionality at just the right moment when the event fired.

Other practical use cases for events:

* Coordinating audio playback at specific moments in an animation, see [Audio Events](https://rive.app/docs/editor/events/audio-events.md)
* Opening a URL when specific interactions have occurred
* Adding haptic feedback on meaningful touch interactions
* Implementing functionality on Buttons and other UI elements
* Send semantic information
* Communicate any information your runtime needs at the right moment

## Subscribing to events

When you subscribe to Rive events at runtime, you subscribe to **all** Rive events that may be emitted from a state machine, and you can parse through each event by name or type to execute conditional logic.

Let's use a 5-star rater Rive example to set any text supplied with events and open a URL if one is given.

### Examples

* [Star rating example](https://codesandbox.io/p/sandbox/rive-events-js-forked-gkwjqr)
* [Neostream example (Chrome only)](https://codesandbox.io/p/sandbox/neostream-rive-events-js-forked-g7t3xl) (This example does not make use of the new [Audio Events ](https://rive.app/docs/editor/events/audio-events.md)feature)

### High-level API usage

#### Adding an event listener

Similar to the `addEventListener()` / `removeEventListener()` API for DOM elements, you'll use the Rive instance's `on()` / `off()` API to subscribe to Rive events. Simply supply the RiveEvent enum and a callback for the runtime to call at the appropriate moment any Rive event gets detected.

#### Example usage

```javascript theme={null}
import { Rive, EventType, RiveEventType } from '@rive-app/canvas'

const r = new Rive({
src: "/static-assets/star-rating.riv",
artboard: "my-artboard-name",
autoplay: true,
stateMachines: "State Machine 1",
// automaticallyHandleEvents: true, // Automatically handle OpenUrl events
onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();
},
});

function onRiveEventReceived(riveEvent) {
const eventData = riveEvent.data;
const eventProperties = eventData.properties;
if (eventData.type === RiveEventType.General) {
    console.log("Event name", eventData.name);
    // Added relevant metadata from the event
    console.log("Rating", eventProperties.rating);
    console.log("Message", eventProperties.message);
} else if (eventData.type === RiveEventType.OpenUrl) {
    console.log("Event name", eventData.name);
    window.open(eventData.url);
}
}

// Add event listener and provide callback to handle Rive Event
r.on(EventType.RiveEvent, onRiveEventReceived);
// Can unsubscribe to Rive Events at any time via the off() API like below
// r.off(EventType.RiveEvent, onRiveEventReceived);
```

### Low-level API usage

When using the low-level APIs (i.e. `@rive-app/canvas-advanced`), you'll need to catch Rive events reported during the render loop yourself via your created state machine instance (see docs on [Low-level API Usage](https://rive.app/docs/runtimes/web/low-level-api-usage.md)). To achieve this, before advancing the state machine:

* Determine the number of Rive events reported since the last frame via the state machine's `reportedEventCount()` API
* Iterate over the events and grab a reference to an Event via the state machine's `reportedEventAt(idx)` API

```javascript theme={null}
import RiveCanvas, {RiveEventType} from '@rive-app/canvas-advanced';

...
// render loop
function myCustomRenderLoop(timestamp) {
    ...
    const elapsedTimeSec = (timestamp - prevTimestamp) / 1000;
    if (stateMachine) {
    const numFiredEvents = stateMachine.reportedEventCount();
    for (let i = 0; i < numFiredEvents; i++) {
        const event = stateMachine.reportedEventAt(i);
        // Run any Event-based logic now
        if (event.type === RiveEventType.OpenUrl) {
        const a = document.createElement("a");
        a.setAttribute("href", event.url);
        a.setAttribute("target", event.target);
        a.click();
        }
    }
    }
    // Now advance
    stateMachine.advance(elapsedTimeSec);
    ...
    rive.requestAnimationFrame(myCustomRenderLoop);
}
rive.requestAnimationFrame(myCustomRenderLoop);
```

## Additional resources

[YouTube video player](https://www.youtube.com/embed/e2bshfKuu8U)
