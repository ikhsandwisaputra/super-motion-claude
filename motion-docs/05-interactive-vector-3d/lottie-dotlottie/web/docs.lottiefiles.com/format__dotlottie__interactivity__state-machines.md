---
source: https://docs.lottiefiles.com/en/format/dotlottie/interactivity/state-machines.md
title: ""
fetched: 2026-10-28
---

# State Machines
Interactive state-driven animations for dotLottie

# State Machines

dotLottie supports embedded state machines that make animations interactive. Rather than playing a fixed sequence, a state machine lets an animation respond to user input — clicks, pointer events, custom signals — and transition between different playback states in response.

State machine logic is self-contained inside the `.lottie` file, making interactive behaviour portable across platforms without rewriting per-platform interaction code.

A state machine is built from four cooperating parts:

| Part             | Description                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| **Inputs**       | Named typed variables (numeric, string, boolean) and event signals. Guards read inputs; actions write them. |
| **Interactions** | Declarations that bind user gestures or animation lifecycle events to actions.                              |
| **States**       | Named playback configurations. The machine is always in exactly one state at a time.                        |
| **Transitions**  | Rules attached to a state that move to another state when guards pass.                                      |

State machine files are stored in the `s/` directory of the `.lottie` archive and referenced from `manifest.json`:

```json
{
  "version": "2",
  "animations": [{ "id": "button" }],
  "stateMachines": [{ "id": "button-states", "name": "Button States" }],
  "initial": { "stateMachine": "button-states" }
}
```

## Learn More

- [State Machine Specification](/format/dotlottie/interactivity/state-machines/specification) — Complete state machine file format, states, transitions, guards, actions, and interactions
