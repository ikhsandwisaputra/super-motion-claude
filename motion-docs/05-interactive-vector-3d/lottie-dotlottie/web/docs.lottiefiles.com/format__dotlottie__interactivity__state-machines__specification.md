---
source: https://docs.lottiefiles.com/en/format/dotlottie/interactivity/state-machines/specification.md
title: ""
fetched: 2026-10-28
---

# State Machine Specification
Complete technical specification for the dotLottie state machine file format

# State Machine Specification

## Version

Current specification version: **1.0**

## Overview

A state machine is a JSON file embedded in a `.lottie` archive that makes an animation interactive. Rather than playing a fixed sequence, an animation with a state machine can respond to user input — clicks, pointer events, custom signals — and drive different playback states in response.

The state machine logic is self-contained inside the `.lottie` file. Behaviour is portable across platforms without rewriting per-platform interaction code.

### Architecture

A state machine is built from four cooperating parts:

| Part             | Description                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Inputs**       | Named typed variables (numeric, string, boolean) and named event signals. Guards read inputs; actions write them.              |
| **Interactions** | Declarations that bind user gestures or animation lifecycle events to actions. Interactions fire actions, which update inputs. |
| **States**       | Named playback configurations. The machine is always in exactly one state at a time.                                           |
| **Transitions**  | Rules attached to a state that move to another state when guards pass. Guards check input values.                              |

The typical flow: an **interaction** fires → executes **actions** that update **inputs** → the state machine re-evaluates **transitions** (which check guards on inputs) → a matching transition fires → the machine moves to the new **state**.

## File Location

State machine files are stored in the `s/` directory and registered in `manifest.json`:

```json
{
  "version": "2",
  "animations": [{ "id": "button" }],
  "stateMachines": [{ "id": "button-states", "name": "Button States" }],
  "initial": { "stateMachine": "button-states" }
}
```

The `id` must match the filename (without `.json`). For example, `"id": "button-states"` references `s/button-states.json`.

## Schema

### Top-Level Structure

A state machine file is a JSON object with the following top-level fields:

| Field          | Required | Type                            | Description                                               |
| -------------- | -------- | ------------------------------- | --------------------------------------------------------- |
| `initial`      | Yes      | String                          | Name of the state to enter when the state machine starts. |
| `states`       | Yes      | [State](#states)\[]             | List of state definitions. Must contain at least one.     |
| `interactions` | No       | [Interaction](#interactions)\[] | User or lifecycle events that trigger actions.            |
| `inputs`       | No       | [Input](#inputs)\[]             | Typed variables available to guards and actions.          |

---

### States

A state defines the animation playback configuration while the machine is in that state.

#### PlaybackState

Controls the playback of a specific animation.

| Field             | Required | Type                                                          | Default | Description                                                                                                          |
| ----------------- | -------- | ------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `name`            | Yes      | String                                                        | —       | Unique identifier for this state, referenced in transitions and interactions.                                        |
| `type`            | Yes      | `"PlaybackState"`                                             | —       | Declares this as a playback-controlling state.                                                                       |
| `animation`       | Yes      | String                                                        | —       | ID of the animation to play, corresponding to a file in `a/`.                                                        |
| `autoplay`        | No       | Boolean                                                       | —       | When `true`, animation starts playing immediately on entry.                                                          |
| `loop`            | No       | Boolean                                                       | —       | When `true`, animation loops continuously.                                                                           |
| `loopCount`       | No       | Integer (≥ 1)                                                 | —       | Total loop iterations when `loop` is `true`. Omit for infinite. Ignored when `loop` is `false`.                      |
| `mode`            | No       | `"Forward"` \| `"Reverse"` \| `"Bounce"` \| `"ReverseBounce"` | —       | Playback direction. `Bounce` plays forward then reverse; `ReverseBounce` plays reverse then forward.                 |
| `speed`           | No       | Number                                                        | `1.0`   | Playback speed multiplier. `2.0` is twice as fast; `0.5` is half speed.                                              |
| `segment`         | No       | String                                                        | —       | Name of a marker or frame range to play within the animation. Missing markers fall back to the full animation range. |
| `backgroundColor` | No       | Number                                                        | —       | Background color as a hexadecimal number (e.g., `0xFFFFFF` for white).                                               |
| `final`           | No       | Boolean                                                       | `false` | When `true`, this state cannot transition to other states, ending the machine.                                       |
| `entryActions`    | No       | [Action](#actions)\[]                                         | `[]`    | Actions executed when entering this state.                                                                           |
| `exitActions`     | No       | [Action](#actions)\[]                                         | `[]`    | Actions executed when leaving this state.                                                                            |
| `transitions`     | Yes      | [Transition](#transitions)\[]                                 | —       | Rules defining when and how to leave this state.                                                                     |

```json
{
  "name": "idle",
  "type": "PlaybackState",
  "animation": "button",
  "autoplay": true,
  "loop": true,
  "transitions": [
    {
      "type": "Transition",
      "toState": "active",
      "guards": [{ "type": "Boolean", "inputName": "isActive", "conditionType": "Equal", "compareTo": true }]
    }
  ]
}
```

#### GlobalState

A special state whose transitions are checked first, regardless of the current state. Use it to define global behaviors — like a universal reset or escape route — without duplicating transitions across every other state.

| Field          | Required | Type                          | Description                                                 |
| -------------- | -------- | ----------------------------- | ----------------------------------------------------------- |
| `name`         | Yes      | String                        | Unique identifier for this global state.                    |
| `type`         | Yes      | `"GlobalState"`               | Declares this as a global override state.                   |
| `entryActions` | No       | [Action](#actions)\[]         | Actions executed when entering this state.                  |
| `exitActions`  | No       | [Action](#actions)\[]         | Actions executed when leaving this state.                   |
| `transitions`  | Yes      | [Transition](#transitions)\[] | Transitions evaluated before all regular state transitions. |

---

### Transitions

Transitions define when and how to move from one state to another.

**Evaluation order:**

1. `GlobalState` transitions are checked first
2. Then the current state's transitions, in declaration order
3. The first transition whose guards all pass fires
4. Guardless transitions act as fallbacks, checked after guarded ones

#### Transition

An immediate state change.

| Field     | Required | Type                | Description                                                            |
| --------- | -------- | ------------------- | ---------------------------------------------------------------------- |
| `type`    | Yes      | `"Transition"`      | Declares an immediate state change.                                    |
| `toState` | Yes      | String              | Name of the target state.                                              |
| `guards`  | No       | [Guard](#guards)\[] | Conditions that must all pass for this transition to fire (AND logic). |

```json
{
  "type": "Transition",
  "toState": "hover",
  "guards": [{ "type": "Boolean", "inputName": "isHovered", "conditionType": "Equal", "compareTo": true }]
}
```

#### Tweened Transition

A gradual state change with an animation over a specified duration.

| Field      | Required | Type                | Description                                                     |
| ---------- | -------- | ------------------- | --------------------------------------------------------------- |
| `type`     | Yes      | `"Tweened"`         | Declares an animated transition.                                |
| `toState`  | Yes      | String              | Name of the target state.                                       |
| `guards`   | No       | [Guard](#guards)\[] | Conditions that must all pass (AND logic).                      |
| `duration` | Yes      | Number              | Duration of the transition animation in seconds.                |
| `easing`   | Yes      | `[x1, y1, x2, y2]`  | Cubic Bézier curve control points defining the easing function. |

> During a tween, input changes that would trigger further transitions are ignored. Entry actions on the target state run only after the tween completes.

```json
{
  "type": "Tweened",
  "toState": "expanded",
  "duration": 0.3,
  "easing": [0.4, 0, 0.2, 1]
}
```

---

### Guards

Guards are conditions evaluated against input values. All guards on a transition must pass for it to fire.

#### Numeric Guard

Compares a numeric input against a value.

| Field           | Required | Type                                                                                                          | Description                                                                                                   |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `type`          | Yes      | `"Numeric"`                                                                                                   |                                                                                                               |
| `inputName`     | Yes      | String                                                                                                        | Name of a numeric input to evaluate.                                                                          |
| `conditionType` | Yes      | `"Equal"` \| `"NotEqual"` \| `"GreaterThan"` \| `"GreaterThanOrEqual"` \| `"LessThan"` \| `"LessThanOrEqual"` | Comparison to perform.                                                                                        |
| `compareTo`     | Yes      | Number \| String                                                                                              | Value to compare against. Use a `$`-prefixed string to reference another numeric input (e.g., `"$maxCount"`). |

```json
{ "type": "Numeric", "inputName": "rating", "conditionType": "GreaterThan", "compareTo": 3 }
```

#### String Guard

Compares a string input against a value.

| Field           | Required | Type                      | Description                                                                            |
| --------------- | -------- | ------------------------- | -------------------------------------------------------------------------------------- |
| `type`          | Yes      | `"String"`                |                                                                                        |
| `inputName`     | Yes      | String                    | Name of a string input to evaluate.                                                    |
| `conditionType` | Yes      | `"Equal"` \| `"NotEqual"` | Comparison to perform.                                                                 |
| `compareTo`     | Yes      | String                    | Value to compare against. Use a `$`-prefixed string to reference another string input. |

```json
{ "type": "String", "inputName": "theme", "conditionType": "Equal", "compareTo": "dark" }
```

#### Boolean Guard

Compares a boolean input against a value.

| Field           | Required | Type                      | Description                                                                             |
| --------------- | -------- | ------------------------- | --------------------------------------------------------------------------------------- |
| `type`          | Yes      | `"Boolean"`               |                                                                                         |
| `inputName`     | Yes      | String                    | Name of a boolean input to evaluate.                                                    |
| `conditionType` | Yes      | `"Equal"` \| `"NotEqual"` | Comparison to perform.                                                                  |
| `compareTo`     | Yes      | Boolean \| String         | Value to compare against. Use a `$`-prefixed string to reference another boolean input. |

```json
{ "type": "Boolean", "inputName": "isEnabled", "conditionType": "Equal", "compareTo": true }
```

#### Event Guard

Passes when a named event input has been fired. Events are edge-triggered — consumed after a successful evaluation, not re-used.

| Field       | Required | Type      | Description                         |
| ----------- | -------- | --------- | ----------------------------------- |
| `type`      | Yes      | `"Event"` |                                     |
| `inputName` | Yes      | String    | Name of the event input to monitor. |

```json
{ "type": "Event", "inputName": "onSubmit" }
```

---

### Actions

Actions perform operations when triggered by interactions or state entry/exit. Actions that modify inputs may cause transitions to re-evaluate.

#### Input Modification Actions

| Type         | Description                                                     | Fields                                                                         |
| ------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `SetNumeric` | Sets a numeric input to a value.                                | `inputName` (String), `value` (Number)                                         |
| `SetString`  | Sets a string input to a value.                                 | `inputName` (String), `value` (String)                                         |
| `SetBoolean` | Sets a boolean input to a value.                                | `inputName` (String), `value` (Boolean)                                        |
| `Toggle`     | Flips a boolean input.                                          | `inputName` (String)                                                           |
| `Increment`  | Adds to a numeric input.                                        | `inputName` (String), `value` (Number or `$`-prefixed input name, default `1`) |
| `Decrement`  | Subtracts from a numeric input.                                 | `inputName` (String), `value` (Number or `$`-prefixed input name, default `1`) |
| `Fire`       | Fires a named event input, triggering any guards that watch it. | `inputName` (String)                                                           |
| `Reset`      | Restores an input to its initial value.                         | `inputName` (String)                                                           |

```json
{ "type": "Increment", "inputName": "rating", "value": 1 }
```

```json
{ "type": "Toggle", "inputName": "isActive" }
```

```json
{ "type": "Fire", "inputName": "onSubmit" }
```

#### Playback Actions

| Type          | Description                              | Fields                                               |
| ------------- | ---------------------------------------- | ---------------------------------------------------- |
| `SetFrame`    | Jumps the animation to a specific frame. | `value` (Number, or `$`-prefixed numeric input name) |
| `SetProgress` | Sets the animation progress (0–1).       | `value` (Number, or `$`-prefixed numeric input name) |

> `SetFrame` and `SetProgress` operate on the currently active animation.

```json
{ "type": "SetProgress", "value": 0.5 }
```

#### Styling and Navigation Actions

| Type              | Description                                          | Fields                                                                                                     |
| ----------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `SetTheme`        | Applies a dotLottie theme by ID.                     | `value` (String, or `$`-prefixed string input name)                                                        |
| `OpenUrl`         | Opens a URL in a browser window.                     | `url` (String, or `$`-prefixed string input name), `target` (`"_blank"`, `"_self"`, `"_parent"`, `"_top"`) |
| `FireCustomEvent` | Emits a custom event string to the host application. | `value` (String)                                                                                           |

```json
{ "type": "SetTheme", "value": "dark-theme" }
```

```json
{ "type": "OpenUrl", "url": "https://example.com", "target": "_blank" }
```

---

### Interactions

Interactions bind user gestures or animation lifecycle events to a list of actions. They are declared at the top level and fire independently of the current state.

#### Pointer Interactions

All pointer interactions accept an optional `layerName` to restrict triggering to a specific named layer in the animation. Layer name matching is exact and case-sensitive.

| Type           | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `PointerEnter` | Fires when a pointer enters the animation (or layer) bounds. |
| `PointerExit`  | Fires when a pointer exits the animation (or layer) bounds.  |
| `PointerDown`  | Fires when a pointer is pressed within the bounds.           |
| `PointerUp`    | Fires when a pointer is released within the bounds.          |
| `PointerMove`  | Fires when a pointer moves over the bounds.                  |
| `Click`        | Fires on a complete click or tap gesture.                    |

| Field       | Required | Type                  | Description                                     |
| ----------- | -------- | --------------------- | ----------------------------------------------- |
| `type`      | Yes      | String                | One of the interaction types above.             |
| `layerName` | No       | String                | Restrict to a specific named layer.             |
| `actions`   | Yes      | [Action](#actions)\[] | Actions to execute when this interaction fires. |

```json
{
  "type": "Click",
  "actions": [{ "type": "Toggle", "inputName": "isActive" }]
}
```

```json
{
  "type": "PointerEnter",
  "layerName": "button-layer",
  "actions": [{ "type": "SetBoolean", "inputName": "isHovered", "value": true }]
}
```

#### Animation Lifecycle Interactions

| Type             | Description                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| `OnComplete`     | Fires when the specified state's animation finishes its final playback (not fired for infinite loops). |
| `OnLoopComplete` | Fires after each loop iteration of the specified state's animation completes.                          |

| Field       | Required | Type                                 | Description                        |
| ----------- | -------- | ------------------------------------ | ---------------------------------- |
| `type`      | Yes      | `"OnComplete"` \| `"OnLoopComplete"` |                                    |
| `stateName` | Yes      | String                               | Name of the state to monitor.      |
| `actions`   | Yes      | [Action](#actions)\[]                | Actions to execute when triggered. |

```json
{
  "type": "OnComplete",
  "stateName": "loading",
  "actions": [{ "type": "Fire", "inputName": "onLoadComplete" }]
}
```

---

### Inputs

Inputs are typed variables declared at the top level. Guards read them; actions write them.

#### Numeric Input

| Field   | Required | Type        | Description                                          |
| ------- | -------- | ----------- | ---------------------------------------------------- |
| `type`  | Yes      | `"Numeric"` |                                                      |
| `name`  | Yes      | String      | Unique identifier, referenced in guards and actions. |
| `value` | Yes      | Number      | Initial value.                                       |

```json
{ "type": "Numeric", "name": "rating", "value": 0 }
```

#### String Input

| Field   | Required | Type       | Description        |
| ------- | -------- | ---------- | ------------------ |
| `type`  | Yes      | `"String"` |                    |
| `name`  | Yes      | String     | Unique identifier. |
| `value` | Yes      | String     | Initial value.     |

```json
{ "type": "String", "name": "theme", "value": "light" }
```

#### Boolean Input

| Field   | Required | Type        | Description        |
| ------- | -------- | ----------- | ------------------ |
| `type`  | Yes      | `"Boolean"` |                    |
| `name`  | Yes      | String      | Unique identifier. |
| `value` | Yes      | Boolean     | Initial value.     |

```json
{ "type": "Boolean", "name": "isActive", "value": false }
```

#### Event Input

Represents a named signal with no persistent value. Fired by `Fire` actions; consumed by `Event` guards after evaluation.

| Field  | Required | Type      | Description        |
| ------ | -------- | --------- | ------------------ |
| `type` | Yes      | `"Event"` |                    |
| `name` | Yes      | String    | Unique identifier. |

```json
{ "type": "Event", "name": "onSubmit" }
```

---

## Validation Rules

1. `initial` must reference a state `name` that exists in the `states` array
2. `states` must contain at least one entry
3. Each state `name` must be unique within the state machine
4. Each transition `toState` must reference an existing state `name`
5. Each input `name` must be unique within the state machine
6. Guards and actions reference inputs by `name` — mismatched names are invalid
7. States with `final: true` should have no outgoing transitions

---

## Complete Examples

### Example 1: Toggle Button

A button that switches between two states on click, using a boolean input and a `GlobalState` to handle the toggle from any state.

```json
{
  "initial": "idle",
  "states": [
    {
      "name": "idle",
      "type": "PlaybackState",
      "animation": "button",
      "autoplay": true,
      "loop": true,
      "transitions": [
        {
          "type": "Transition",
          "toState": "active",
          "guards": [{ "type": "Boolean", "inputName": "isActive", "conditionType": "Equal", "compareTo": true }]
        }
      ]
    },
    {
      "name": "active",
      "type": "PlaybackState",
      "animation": "button",
      "autoplay": true,
      "loop": false,
      "entryActions": [{ "type": "SetTheme", "value": "active-theme" }],
      "transitions": [
        {
          "type": "Transition",
          "toState": "idle",
          "guards": [{ "type": "Boolean", "inputName": "isActive", "conditionType": "Equal", "compareTo": false }]
        }
      ]
    }
  ],
  "interactions": [
    {
      "type": "Click",
      "actions": [{ "type": "Toggle", "inputName": "isActive" }]
    }
  ],
  "inputs": [{ "type": "Boolean", "name": "isActive", "value": false }]
}
```

---

### Example 2: Star Rating

A 5-star rating selector. Pointer move updates a numeric input; the state machine plays the corresponding animation segment. Demonstrates numeric guards, `SetNumeric` actions, and layer-scoped pointer interactions.

```json
{
  "initial": "rating",
  "states": [
    {
      "name": "rating",
      "type": "PlaybackState",
      "animation": "stars",
      "autoplay": false,
      "transitions": [
        {
          "type": "Transition",
          "toState": "rating",
          "guards": [{ "type": "Numeric", "inputName": "frame", "conditionType": "GreaterThanOrEqual", "compareTo": 0 }]
        }
      ]
    }
  ],
  "interactions": [
    {
      "type": "PointerEnter",
      "layerName": "star-1",
      "actions": [{ "type": "SetNumeric", "inputName": "frame", "value": 20 }]
    },
    {
      "type": "PointerEnter",
      "layerName": "star-2",
      "actions": [{ "type": "SetNumeric", "inputName": "frame", "value": 40 }]
    },
    {
      "type": "PointerEnter",
      "layerName": "star-3",
      "actions": [{ "type": "SetNumeric", "inputName": "frame", "value": 60 }]
    },
    {
      "type": "PointerEnter",
      "layerName": "star-4",
      "actions": [{ "type": "SetNumeric", "inputName": "frame", "value": 80 }]
    },
    {
      "type": "PointerEnter",
      "layerName": "star-5",
      "actions": [{ "type": "SetNumeric", "inputName": "frame", "value": 100 }]
    },
    {
      "type": "Click",
      "actions": [{ "type": "Fire", "inputName": "onRatingSelected" }]
    }
  ],
  "inputs": [
    { "type": "Numeric", "name": "frame", "value": 0 },
    { "type": "Event", "name": "onRatingSelected" }
  ]
}
```

---

## References

- [dotLottie Format Specification](/format/dotlottie/specification)
- [Theme Specification](/format/dotlottie/interactivity/theming/specification)
