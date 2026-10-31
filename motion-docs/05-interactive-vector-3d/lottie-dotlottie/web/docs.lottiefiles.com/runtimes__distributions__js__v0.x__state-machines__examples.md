---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/state-machines/examples.md
title: ""
fetched: 2026-10-28
---

# State Machine Examples
Practical code examples for using state machines with the dotLottie Web Player — hover effects, click counters, tweened transitions, and custom events.

These examples show common patterns for building interactive animations with state machines in the dotLottie web player. Each example includes the state machine definition and the corresponding JavaScript setup code.

For the full workflow and API, see [Use state machines](/en/runtimes/distributions/js/v0.x/state-machines).

State machine definitions are stored as JSON in the `s/` directory of your `.lottie` file. The examples below show both the definition (what you author in your `.lottie`) and the runtime code (what you write in JavaScript).

## Hover Effect

A two-state animation that plays an idle loop by default and switches to a hover loop when the pointer enters the canvas.

**State machine definition:**

```json
{
  "initial": "Idle",
  "inputs": [
    { "type": "Event", "name": "OnEnter" },
    { "type": "Event", "name": "OnExit" }
  ],
  "interactions": [
    {
      "type": "PointerEnter",
      "actions": [{ "type": "Fire", "inputName": "OnEnter" }]
    },
    {
      "type": "PointerExit",
      "actions": [{ "type": "Fire", "inputName": "OnExit" }]
    }
  ],
  "states": [
    {
      "name": "Idle",
      "type": "PlaybackState",
      "animation": "idle",
      "loop": true,
      "autoplay": true,
      "transitions": [
        {
          "type": "Transition",
          "toState": "Hover",
          "guards": [{ "type": "Event", "inputName": "OnEnter" }]
        }
      ]
    },
    {
      "name": "Hover",
      "type": "PlaybackState",
      "animation": "hover",
      "loop": true,
      "autoplay": true,
      "transitions": [
        {
          "type": "Transition",
          "toState": "Idle",
          "guards": [{ "type": "Event", "inputName": "OnExit" }]
        }
      ]
    }
  ]
}
```

**JavaScript setup:**

Pointer interactions defined in the state machine are handled automatically once it starts. No manual event wiring is needed.

```javascript
import { DotLottie } from "@lottiefiles/dotlottie-web";

const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "button.lottie",
  autoplay: false,
});

dotLottie.addEventListener("load", () => {
  dotLottie.stateMachineLoad("hoverFSM");
  dotLottie.stateMachineStart();
});

dotLottie.addEventListener("loadError", (err) => {
  console.error("Failed to load animation:", err);
});
```

---

## Click Counter with a Guard

A numeric input tracks a click count. A guard prevents the transition to a "complete" state until the count reaches 3.

**State machine definition:**

```json
{
  "initial": "Counting",
  "inputs": [
    { "type": "Numeric", "name": "clicks", "value": 0 },
    { "type": "Event", "name": "OnClick" }
  ],
  "interactions": [
    {
      "type": "Click",
      "actions": [
        { "type": "Increment", "inputName": "clicks", "value": 1 },
        { "type": "Fire", "inputName": "OnClick" }
      ]
    }
  ],
  "states": [
    {
      "name": "Counting",
      "type": "PlaybackState",
      "animation": "counting",
      "loop": true,
      "autoplay": true,
      "transitions": [
        {
          "type": "Transition",
          "toState": "Complete",
          "guards": [
            { "type": "Event", "inputName": "OnClick" },
            { "type": "Numeric", "inputName": "clicks", "conditionType": "GreaterThanOrEqual", "compareTo": 3 }
          ]
        }
      ]
    },
    {
      "name": "Complete",
      "type": "PlaybackState",
      "animation": "complete",
      "loop": false,
      "autoplay": true,
      "final": true,
      "transitions": []
    }
  ]
}
```

**JavaScript setup:**

Read the `clicks` input value at any point to reflect it in your UI:

```javascript
import { DotLottie } from "@lottiefiles/dotlottie-web";

const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "counter.lottie",
  autoplay: false,
});

dotLottie.addEventListener("load", () => {
  dotLottie.stateMachineLoad("counterFSM");
  dotLottie.stateMachineStart();
});

dotLottie.addEventListener("stateMachineNumericInputValueChange", (event) => {
  if (event.inputName === "clicks") {
    document.querySelector("#count-label").textContent = `Clicks: ${event.newValue}`;
  }
});

dotLottie.addEventListener("stateMachineStateEntered", (event) => {
  if (event.state === "Complete") {
    console.log("Animation complete!");
  }
});
```

---

## Tweened Transition

Use a tweened transition to animate smoothly between two states over a fixed duration instead of cutting immediately.

**State machine definition:**

The `duration` (in seconds) and `easing` (cubic Bézier control points) are set on the transition:

```json
{
  "initial": "Idle",
  "inputs": [
    { "type": "Event", "name": "OnEnter" },
    { "type": "Event", "name": "OnExit" }
  ],
  "interactions": [
    {
      "type": "PointerEnter",
      "actions": [{ "type": "Fire", "inputName": "OnEnter" }]
    },
    {
      "type": "PointerExit",
      "actions": [{ "type": "Fire", "inputName": "OnExit" }]
    }
  ],
  "states": [
    {
      "name": "Idle",
      "type": "PlaybackState",
      "animation": "idle",
      "loop": true,
      "autoplay": true,
      "transitions": [
        {
          "type": "Transition",
          "toState": "Active",
          "duration": 0.4,
          "easing": [0.4, 0.0, 0.2, 1.0],
          "guards": [{ "type": "Event", "inputName": "OnEnter" }]
        }
      ]
    },
    {
      "name": "Active",
      "type": "PlaybackState",
      "animation": "active",
      "loop": true,
      "autoplay": true,
      "transitions": [
        {
          "type": "Transition",
          "toState": "Idle",
          "duration": 0.3,
          "easing": [0.4, 0.0, 0.2, 1.0],
          "guards": [{ "type": "Event", "inputName": "OnExit" }]
        }
      ]
    }
  ]
}
```

During a tweened transition, new state changes are blocked until the animation completes. Entry actions run after the tween finishes.

---

## Custom Events from JavaScript

Fire named events from your own UI code to drive state machine transitions — for example, reacting to a form submission or an API response.

**State machine definition:**

```json
{
  "initial": "Idle",
  "inputs": [
    { "type": "Event", "name": "submit" },
    { "type": "Event", "name": "reset" }
  ],
  "states": [
    {
      "name": "Idle",
      "type": "PlaybackState",
      "animation": "idle",
      "loop": true,
      "autoplay": true,
      "transitions": [
        {
          "type": "Transition",
          "toState": "Loading",
          "guards": [{ "type": "Event", "inputName": "submit" }]
        }
      ]
    },
    {
      "name": "Loading",
      "type": "PlaybackState",
      "animation": "loading",
      "loop": true,
      "autoplay": true,
      "transitions": [
        {
          "type": "Transition",
          "toState": "Idle",
          "guards": [{ "type": "Event", "inputName": "reset" }]
        }
      ]
    }
  ]
}
```

**JavaScript setup:**

Call `stateMachineFireEvent` with the event name defined in your `inputs` array:

```javascript
import { DotLottie } from "@lottiefiles/dotlottie-web";

const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "form.lottie",
  autoplay: false,
});

dotLottie.addEventListener("load", () => {
  dotLottie.stateMachineLoad("formFSM");
  dotLottie.stateMachineStart();
});

document.querySelector("#submit-btn").addEventListener("click", async () => {
  dotLottie.stateMachineFireEvent("submit");

  try {
    await submitForm();
  } finally {
    dotLottie.stateMachineFireEvent("reset");
  }
});
```

---

## Listening to State Machine Events

Use `addEventListener` to observe state transitions and input changes at runtime:

```javascript
// Log every state transition
dotLottie.addEventListener("stateMachineTransition", (event) => {
  console.log(`Transition: ${event.fromState} → ${event.toState}`);
});

// React when a specific state is entered
dotLottie.addEventListener("stateMachineStateEntered", (event) => {
  if (event.state === "Complete") {
    document.querySelector("#cta").style.display = "block";
  }
});

// Watch a string input change
dotLottie.addEventListener("stateMachineStringInputValueChange", (event) => {
  console.log(`${event.inputName}: "${event.oldValue}" → "${event.newValue}"`);
});

// Catch errors
dotLottie.addEventListener("stateMachineError", (event) => {
  console.error("State machine error:", event.error);
});
```

---

## Related

- [Use state machines](/en/runtimes/distributions/js/v0.x/state-machines) — the full workflow, API, and troubleshooting
- [dotLottie 2.0 Spec — State Machines](https://dotlottie.io/spec/2.0/#state-machines) — complete format specification
- [API Reference](../api/reference) — full `DotLottie` class reference
