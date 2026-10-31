---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/state-machines.md
title: ""
fetched: 2026-10-28
---

# State Machines
Define state machines in your .lottie file, load and start them in the web player, and drive transitions with inputs, events, and interactions.

To make an animation react to users — hover states, click counters, form feedback — define a state machine inside your `.lottie` file and drive it from JavaScript. You author the logic (states, transitions, interactions, inputs) in the file; the player executes it at runtime.

The workflow:

1. **Define:** Author your state machine in your `.lottie` file — states, transitions, interactions, and inputs.
2. **Load animation:** Instantiate the `DotLottie` player with your `.lottie` file.
3. **Load state machine:** After the animation loads, call `stateMachineLoad` with the state machine's ID.
4. **Start state machine:** Call `stateMachineStart` to make it active and responsive to events.
5. **Drive inputs:** Set input values or fire events from your application code to drive transitions.
6. **Stop (optional):** Call `stateMachineStop` when interactivity is no longer needed.

## Define the state machine

State machines are JSON files stored in the `s/` directory of a `.lottie` file. The top-level structure is:

```json
{
  "initial": "StateName",
  "states": [],
  "interactions": [],
  "inputs": []
}
```

| Field          | Required | Description                                                      |
| :------------- | :------- | :--------------------------------------------------------------- |
| `initial`      | Yes      | Name of the starting state                                       |
| `states`       | Yes      | Array of state definitions                                       |
| `interactions` | No       | Array of interaction handlers (pointer events, animation events) |
| `inputs`       | No       | Array of named input variables                                   |

### Define states

Two state types are available:

**`PlaybackState`** — controls animation playback while the state is active:

| Property          | Required | Type      | Description                                                     |
| :---------------- | :------- | :-------- | :-------------------------------------------------------------- |
| `name`            | Yes      | `string`  | Unique identifier used to reference this state                  |
| `type`            | Yes      | `string`  | Must be `"PlaybackState"`                                       |
| `animation`       | Yes      | `string`  | ID of the animation to play                                     |
| `transitions`     | Yes      | `array`   | Transition rules that can leave this state                      |
| `loop`            | No       | `boolean` | Whether the animation loops continuously                        |
| `loopCount`       | No       | `integer` | Number of loop iterations (minimum 1)                           |
| `autoplay`        | No       | `boolean` | Whether the animation plays immediately on entering the state   |
| `final`           | No       | `boolean` | If `true`, no further transitions are evaluated from this state |
| `mode`            | No       | `string`  | `"Forward"`, `"Reverse"`, `"Bounce"`, or `"ReverseBounce"`      |
| `speed`           | No       | `number`  | Playback speed multiplier                                       |
| `segment`         | No       | `string`  | Named animation segment or frame range to play                  |
| `backgroundColor` | No       | `string`  | Hex color applied as background while this state is active      |
| `entryActions`    | No       | `array`   | Actions executed when entering this state                       |
| `exitActions`     | No       | `array`   | Actions executed when leaving this state                        |

**`GlobalState`** — overrides behaviors across all other states:

| Property       | Required | Description                                                             |
| :------------- | :------- | :---------------------------------------------------------------------- |
| `name`         | Yes      | Unique identifier                                                       |
| `type`         | Yes      | Must be `"GlobalState"`                                                 |
| `transitions`  | Yes      | Transitions that take precedence over state-level transitions           |
| `entryActions` | No       | Actions executed on entering any state while the global state is active |
| `exitActions`  | No       | Actions executed on leaving any state                                   |

### Define transitions

Transitions are defined inside each state's `transitions` array. Two types are available:

**Standard transition** — immediate state change:

```json
{
  "type": "Transition",
  "toState": "NextState",
  "guards": []
}
```

**Tweened transition** — animated crossfade over a duration:

```json
{
  "type": "Transition",
  "toState": "NextState",
  "duration": 0.4,
  "easing": [0.4, 0.0, 0.2, 1.0],
  "guards": []
}
```

| Property   | Required for tween | Description                                              |
| :--------- | :----------------- | :------------------------------------------------------- |
| `toState`  | Yes                | Name of the target state                                 |
| `guards`   | No                 | Conditions that must all pass for the transition to fire |
| `duration` | Yes                | Duration of the tween in seconds                         |
| `easing`   | Yes                | Cubic Bézier control points: `[x1, y1, x2, y2]`          |

Transitions are evaluated in declaration order — the first matching transition fires. Tweened transitions block new state changes until the animation completes.

### Add guards

Guards are conditions on a transition that must all evaluate to `true` for the transition to fire.

**Numeric guard:**

```json
{
  "type": "Numeric",
  "inputName": "score",
  "conditionType": "GreaterThanOrEqual",
  "compareTo": 10
}
```

Supported `conditionType` values: `Equal`, `NotEqual`, `GreaterThan`, `GreaterThanOrEqual`, `LessThan`, `LessThanOrEqual`.

**String guard:**

```json
{
  "type": "String",
  "inputName": "mode",
  "conditionType": "Equal",
  "compareTo": "active"
}
```

Supported `conditionType` values: `Equal`, `NotEqual`.

**Boolean guard:**

```json
{
  "type": "Boolean",
  "inputName": "isLoggedIn",
  "conditionType": "Equal",
  "compareTo": true
}
```

**Event guard:**

```json
{
  "type": "Event",
  "inputName": "OnClick"
}
```

Event guards check whether the named event input has been fired. Events are edge-triggered and consumed after processing.

### Add interactions

Interactions respond to user or animation events and execute a list of actions. They are defined at the top level of the state machine, not inside individual states.

| Type             | Trigger                                        |
| :--------------- | :--------------------------------------------- |
| `PointerEnter`   | Pointer enters the canvas (or specified layer) |
| `PointerExit`    | Pointer leaves the canvas (or specified layer) |
| `PointerDown`    | Pointer pressed down                           |
| `PointerUp`      | Pointer released                               |
| `PointerMove`    | Pointer moves                                  |
| `Click`          | Click on the canvas (or specified layer)       |
| `OnComplete`     | Animation in a named state reaches its end     |
| `OnLoopComplete` | Animation in a named state completes one loop  |

Pointer-based interactions accept an optional `layerName` to restrict them to a specific animation layer. `OnComplete` and `OnLoopComplete` require a `stateName` field.

```json
{
  "type": "PointerEnter",
  "layerName": "button_layer",
  "actions": [{ "type": "Fire", "inputName": "OnHover" }]
}
```

### Add actions

Actions execute during interactions or in a state's `entryActions`/`exitActions`. Available action types:

| Action            | Description                                            |
| :---------------- | :----------------------------------------------------- |
| `Fire`            | Fires a named event input                              |
| `SetBoolean`      | Sets a boolean input to a specified value              |
| `SetNumeric`      | Sets a numeric input to a specified value              |
| `SetString`       | Sets a string input to a specified value               |
| `Increment`       | Increases a numeric input by a given amount            |
| `Decrement`       | Decreases a numeric input by a given amount            |
| `Toggle`          | Flips a boolean input                                  |
| `Reset`           | Returns an input to its initial value                  |
| `SetFrame`        | Jumps the animation to a specific frame number         |
| `SetProgress`     | Sets animation progress as a value between `0` and `1` |
| `SetTheme`        | Applies a theme by ID                                  |
| `OpenUrl`         | Opens a URL — requires `url` and `target` fields       |
| `FireCustomEvent` | Sends a named custom event to the host application     |

### Declare inputs

Inputs are named variables stored in the state machine. Set them at runtime to drive guard conditions.

| Type      | Fields                    | Description                                   |
| :-------- | :------------------------ | :-------------------------------------------- |
| `Numeric` | `name`, `value` (number)  | A numeric variable                            |
| `String`  | `name`, `value` (string)  | A string variable                             |
| `Boolean` | `name`, `value` (boolean) | A boolean variable                            |
| `Event`   | `name`                    | An edge-triggered event — no persistent value |

## Load and start the state machine

| Method                                                      | Description                                                                       |
| :---------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| `stateMachineLoad(id: string)`                              | Loads a state machine by ID from the `.lottie` file. Call after the `load` event. |
| `stateMachineLoadData(json: string)`                        | Loads a state machine from a raw JSON string.                                     |
| `stateMachineStart()`                                       | Starts the loaded state machine.                                                  |
| `stateMachineStop()`                                        | Stops the active state machine.                                                   |
| `stateMachineSetConfig(config: StateMachineConfig \| null)` | Configures security settings, e.g. `openUrlPolicy` for `OpenUrl` actions.         |

```javascript
import { DotLottie } from "@lottiefiles/dotlottie-web";

const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "interactive.lottie",
  autoplay: false,
});

dotLottie.addEventListener("load", () => {
  const loaded = dotLottie.stateMachineLoad("myFSM");
  if (loaded) {
    dotLottie.stateMachineStart();
  } else {
    console.error("State machine not found: myFSM");
  }
});

dotLottie.addEventListener("loadError", (err) => {
  console.error("Failed to load animation:", err);
});
```

Always call `stateMachineLoad` inside the `load` event handler. Calling it before the animation has loaded will fail.

## Query the current state

| Method                                                         | Return Type | Description                                  |
| :------------------------------------------------------------- | :---------- | :------------------------------------------- |
| `stateMachineGetStatus()`                                      | `string`    | Current status of the state machine.         |
| `stateMachineGetCurrentState()`                                | `string`    | Name of the currently active state.          |
| `stateMachineGetActiveId()`                                    | `string`    | ID of the currently loaded state machine.    |
| `stateMachineGet(id: string)`                                  | `string`    | State machine definition JSON by ID.         |
| `stateMachineGetListeners()`                                   | `string[]`  | Names of all active listeners.               |
| `stateMachineOverrideState(state: string, immediate: boolean)` | `boolean`   | Forces the state machine into a given state. |

## Set and read inputs

| Method                                     | Return Type            | Description                                |
| :----------------------------------------- | :--------------------- | :----------------------------------------- |
| `stateMachineSetBooleanInput(name, value)` | `boolean`              | Sets a boolean input.                      |
| `stateMachineSetNumericInput(name, value)` | `boolean`              | Sets a numeric input.                      |
| `stateMachineSetStringInput(name, value)`  | `boolean`              | Sets a string input.                       |
| `stateMachineGetBooleanInput(name)`        | `boolean \| undefined` | Gets the current value of a boolean input. |
| `stateMachineGetNumericInput(name)`        | `number \| undefined`  | Gets the current value of a numeric input. |
| `stateMachineGetStringInput(name)`         | `string \| undefined`  | Gets the current value of a string input.  |
| `stateMachineGetInputs()`                  | `string[]`             | Names of all defined inputs.               |

```javascript
dotLottie.addEventListener("load", () => {
  dotLottie.stateMachineLoad("myFSM");
  dotLottie.stateMachineStart();

  // Set inputs before firing events to influence guard evaluation
  dotLottie.stateMachineSetNumericInput("score", 10);
  dotLottie.stateMachineSetBooleanInput("isLoggedIn", true);
  dotLottie.stateMachineSetStringInput("mode", "active");

  const inputs = dotLottie.stateMachineGetInputs();
  console.log("Available inputs:", inputs);
});
```

## Fire events

| Method                                    | Description                                        |
| :---------------------------------------- | :------------------------------------------------- |
| `stateMachineFireEvent(name: string)`     | Fires a named event input.                         |
| `stateMachinePostClickEvent(x, y)`        | Posts a click event at canvas coordinates.         |
| `stateMachinePostPointerUpEvent(x, y)`    | Posts a pointer-up event at canvas coordinates.    |
| `stateMachinePostPointerDownEvent(x, y)`  | Posts a pointer-down event at canvas coordinates.  |
| `stateMachinePostPointerMoveEvent(x, y)`  | Posts a pointer-move event at canvas coordinates.  |
| `stateMachinePostPointerEnterEvent(x, y)` | Posts a pointer-enter event at canvas coordinates. |
| `stateMachinePostPointerExitEvent(x, y)`  | Posts a pointer-exit event at canvas coordinates.  |

Pointer interactions defined in the state machine's `interactions` array are handled automatically — you only need the manual `Post*` methods when you want to synthesize events programmatically.

## Listen for state machine events

Listen for these events via `addEventListener`:

| Event                                 | Payload                                   | Description                              |
| :------------------------------------ | :---------------------------------------- | :--------------------------------------- |
| `stateMachineStart`                   | `{ type }`                                | State machine started.                   |
| `stateMachineStop`                    | `{ type }`                                | State machine stopped.                   |
| `stateMachineTransition`              | `{ type, fromState, toState }`            | State transition occurred.               |
| `stateMachineStateEntered`            | `{ type, state }`                         | Entered a new state.                     |
| `stateMachineStateExit`               | `{ type, state }`                         | Exited a state.                          |
| `stateMachineCustomEvent`             | `{ type, eventName }`                     | A `FireCustomEvent` action was executed. |
| `stateMachineError`                   | `{ type, error }`                         | State machine encountered an error.      |
| `stateMachineBooleanInputValueChange` | `{ type, inputName, oldValue, newValue }` | A boolean input changed.                 |
| `stateMachineNumericInputValueChange` | `{ type, inputName, oldValue, newValue }` | A numeric input changed.                 |
| `stateMachineStringInputValueChange`  | `{ type, inputName, oldValue, newValue }` | A string input changed.                  |
| `stateMachineInputFired`              | `{ type, inputName }`                     | An event input was fired.                |
| `stateMachineInternalMessage`         | `{ type, message }`                       | Internal state machine message.          |

```javascript
dotLottie.addEventListener("stateMachineStateEntered", (event) => {
  console.log("Entered:", event.state);
});

dotLottie.addEventListener("stateMachineTransition", (event) => {
  console.log(`${event.fromState} → ${event.toState}`);
});

dotLottie.addEventListener("stateMachineNumericInputValueChange", (event) => {
  console.log(`${event.inputName}: ${event.oldValue} → ${event.newValue}`);
});
```

## Debug common problems

**State machine not loading:**

- Verify the ID passed to `stateMachineLoad` exactly matches the state machine ID in your `.lottie` file.
- Confirm `stateMachineLoad` is called inside the `load` event handler, not before it.
- Call `stateMachineGetStatus()` to inspect the current status.

**Transitions not firing:**

- Check that all guard conditions are met — set input values _before_ firing the triggering event.
- Confirm `stateMachineStart()` was called successfully (check its return value).
- Add `stateMachineStateEntered` and `stateMachineTransition` listeners to trace execution.

**Animation not playing in a state:**

- Verify the `animation` ID in your `PlaybackState` matches an animation ID in your `.lottie` file.
- Check the `segment` name or frame range is valid for the referenced animation.

## Related

- [State machine examples](/en/runtimes/distributions/js/v0.x/state-machines/examples) — practical code examples for common patterns
- [dotLottie 2.0 Spec — State Machines](https://dotlottie.io/spec/2.0/#state-machines) — complete format specification
- [API Reference](../api/reference) — full `DotLottie` class reference
