---
source: https://docs.lottiefiles.com/en/format/dotlottie/interactivity.md
title: ""
fetched: 2026-10-28
---

# Interactive & Themed Animations
Explore advanced interactivity using state machines and dynamic theming in Lottie animations. Learn how dotlottie-js and dotLottie Players enable rich experiences.

# Interactive & Themed Animations: Technical Guide

The `.lottie` format extends standard Lottie JSON with support for state machines and dynamic theming. This guide provides technical implementation details for building interactive, themeable animations using `dotlottie-js` for authoring and the dotLottie Player suite for runtime execution.

## Introduction

Standard Lottie animations provide timeline-based playback. The `.lottie` format adds:

- **State Machines**: Event-driven animation control using finite state machine (FSM) logic
- **Dynamic Theming**: Runtime color and style customization without re-authoring

These features enable:

- Complex user interactions (multi-step flows, branching logic)
- Visual adaptation (dark mode, brand customization, user preferences)
- Context-aware animations (state-dependent behaviors)
- Reduced asset duplication (one animation, multiple visual variants)

**Architecture**: State machines and themes are embedded as JSON manifests within the `.lottie` archive alongside animation data. Players parse and execute these manifests at runtime.

## State Machines Deep Dive

### Core Concepts

State machines provide deterministic animation control through:

**States**: Discrete animation behaviors (play segment, loop, hold frame)

- Each state defines playback parameters
- One state is active at any time
- States can reference specific animation IDs in multi-animation `.lottie` files

**Transitions**: State change rules triggered by events

- Define source state, target state, and trigger event
- Can include guard conditions for conditional logic
- Support multiple transitions from a single state

**Events**: Named triggers posted from application code

- String identifiers (e.g., "OnClick", "OnHover", "OnComplete")
- Can carry numeric payloads for parametric behavior
- Special events: `OnComplete` (animation/state finishes), `OnPointerDown`, `OnPointerUp`, etc.

**Guards**: Boolean conditions that gate transitions

- Evaluate context variables or numeric comparisons
- Enable conditional branching based on application state
- Support logical operators (AND, OR, NOT)

**Context Variables**: Named numeric values stored in state machine

- Can be modified by transitions
- Used in guard conditions
- Persist across state changes

### State Machine JSON Structure

State machines are defined in the `.lottie` manifest using the [dotLottie state machine specification](https://dotlottie.io/spec/2.0/#state-machines).

**Basic Structure:**

```json
{
  "descriptor": {
    "id": "stateмашine_id",
    "initial": "initial_state_id"
  },
  "states": {
    "state_id": {
      "type": "PlaybackState",
      "animationId": "animation_1",
      "loop": false,
      "autoplay": true,
      "mode": "Forward",
      "speed": 1.0,
      "useFrameInterpolation": true,
      "marker": "segment_name",
      "segment": [0, 60]
    }
  },
  "transitions": [
    {
      "type": "Transition",
      "fromState": "state_id",
      "toState": "next_state_id",
      "guards": [],
      "onPointerDown": {},
      "onPointerUp": {},
      "onComplete": {},
      "StringEvent": {
        "value": "OnClick"
      }
    }
  ],
  "context_variables": []
}
```

**State Types and Properties:**

| Property                | Type              | Description                                                |
| ----------------------- | ----------------- | ---------------------------------------------------------- |
| `type`                  | string            | Always "PlaybackState"                                     |
| `animationId`           | string            | Optional. Animation ID to play (for multi-animation files) |
| `loop`                  | boolean/number    | Loop behavior: false, true, or integer count               |
| `autoplay`              | boolean           | Start playback on state entry                              |
| `mode`                  | string            | "Forward", "Reverse", "Bounce", "ReverseBounce"            |
| `speed`                 | number            | Playback speed multiplier (1.0 = normal)                   |
| `useFrameInterpolation` | boolean           | Enable sub-frame rendering                                 |
| `marker`                | string            | Named marker to play (alternative to segment)              |
| `segment`               | \[number, number] | Frame range \[start, end]                                  |
| `reset_context`         | string            | Context variable to reset on entry                         |

**Transition Structure:**

```json
{
  "type": "Transition",
  "fromState": "idle",
  "toState": "active",
  "guards": [
    {
      "type": "Guard",
      "contextKey": "click_count",
      "conditionType": "Greater",
      "compare": 0
    }
  ],
  "StringEvent": {
    "value": "OnClick"
  },
  "numeric_event": {
    "value": "OnProgress",
    "contextKey": "progress_value"
  }
}
```

**Transition Event Types:**

- `StringEvent`: Named string triggers
- `numeric_event`: Events with numeric payload
- `onPointerDown`: Pointer/mouse down
- `onPointerUp`: Pointer/mouse up
- `onPointerEnter`: Pointer enter animation bounds
- `onPointerExit`: Pointer exit animation bounds
- `onPointerMove`: Pointer movement
- `onComplete`: State/animation completion

**Guard Conditions:**

```json
{
  "type": "Guard",
  "contextKey": "variable_name",
  "conditionType": "Equal" | "NotEqual" | "Greater" | "GreaterEqual" | "Less" | "LessEqual",
  "compare": 5
}
```

**Context Variables:**

```json
{
  "context_variables": [
    {
      "type": "Numeric",
      "key": "counter",
      "value": 0
    },
    {
      "type": "String",
      "key": "state_name",
      "value": "idle"
    }
  ]
}
```

### Creating State Machines with dotlottie-js

Install `dotlottie-js`:

```bash
npm install @lottiefiles/dotlottie-js
```

**Example: Multi-State Button Animation**

```typescript
import { DotLottie } from "@lottiefiles/dotlottie-js";

// Initialize DotLottie with animation
const dotLottie = new DotLottie();

// Add animation from JSON
const animationData = {
  /* Lottie JSON */
};
await dotLottie.addAnimation({
  id: "button_anim",
  data: animationData,
});

// Define state machine
const stateMachine = {
  descriptor: {
    id: "button_interaction",
    initial: "idle",
  },
  states: {
    idle: {
      type: "PlaybackState",
      animationId: "button_anim",
      loop: true,
      autoplay: true,
      segment: [0, 30],
      speed: 1.0,
    },
    hover: {
      type: "PlaybackState",
      animationId: "button_anim",
      loop: false,
      autoplay: true,
      segment: [30, 60],
      speed: 1.2,
    },
    pressed: {
      type: "PlaybackState",
      animationId: "button_anim",
      loop: false,
      autoplay: true,
      segment: [60, 90],
      speed: 1.5,
    },
    disabled: {
      type: "PlaybackState",
      animationId: "button_anim",
      loop: false,
      autoplay: false,
      segment: [90, 100],
      speed: 1.0,
    },
  },
  transitions: [
    {
      type: "Transition",
      fromState: "idle",
      toState: "hover",
      onPointerEnter: {},
    },
    {
      type: "Transition",
      fromState: "hover",
      toState: "idle",
      onPointerExit: {},
    },
    {
      type: "Transition",
      fromState: "hover",
      toState: "pressed",
      onPointerDown: {},
    },
    {
      type: "Transition",
      fromState: "pressed",
      toState: "hover",
      onComplete: {},
    },
    {
      type: "Transition",
      fromState: "idle",
      toState: "disabled",
      StringEvent: { value: "Disable" },
    },
    {
      type: "Transition",
      fromState: "disabled",
      toState: "idle",
      StringEvent: { value: "Enable" },
    },
  ],
  context_variables: [],
};

// Add state machine to .lottie
await dotLottie.addStateMachine({
  id: "button_interaction",
  data: stateMachine,
});

// Export as .lottie file
const arrayBuffer = await dotLottie.build();
// Save to file or serve to client
```

**Example: Counter with Context Variables**

```typescript
const counterStateMachine = {
  descriptor: {
    id: "counter_sm",
    initial: "counting",
  },
  states: {
    counting: {
      type: "PlaybackState",
      animationId: "counter_anim",
      loop: true,
      autoplay: true,
    },
    max_reached: {
      type: "PlaybackState",
      animationId: "counter_anim",
      loop: false,
      autoplay: true,
      segment: [0, 30],
    },
  },
  transitions: [
    {
      type: "Transition",
      fromState: "counting",
      toState: "counting",
      numeric_event: {
        value: "Increment",
        contextKey: "count",
      },
    },
    {
      type: "Transition",
      fromState: "counting",
      toState: "max_reached",
      guards: [
        {
          type: "Guard",
          contextKey: "count",
          conditionType: "GreaterEqual",
          compare: 10,
        },
      ],
      numeric_event: {
        value: "Increment",
        contextKey: "count",
      },
    },
    {
      type: "Transition",
      fromState: "max_reached",
      toState: "counting",
      StringEvent: { value: "Reset" },
    },
  ],
  context_variables: [
    {
      type: "Numeric",
      key: "count",
      value: 0,
    },
  ],
};

await dotLottie.addStateMachine({
  id: "counter_sm",
  data: counterStateMachine,
});
```

**Retrieving and Updating State Machines:**

```typescript
// Get existing state machine
const existingSM = await dotLottie.getStateMachine("button_interaction");

// Update state machine data
existingSM.data.states.idle.speed = 0.8;
await dotLottie.addStateMachine({
  id: "button_interaction",
  data: existingSM.data,
});

// List all state machines
const stateMachines = await dotLottie.getStateMachines();
console.log(stateMachines.map((sm) => sm.id));
```

### Using State Machines with Players

**Web Player:**

```typescript
import { DotLottie as DotLottiePlayer } from "@lottiefiles/dotlottie-web";

const player = new DotLottiePlayer({
  canvas: document.getElementById("canvas"),
  src: "/animations/button.lottie",
});

// Wait for load
player.addEventListener("load", () => {
  // Load and start state machine
  player.loadStateMachine("button_interaction");
  player.startStateMachine();

  // Listen for state changes
  player.addEventListener("state:entered", (e) => {
    console.log("Entered state:", e.detail.state);
  });

  player.addEventListener("transition", (e) => {
    console.log("Transition:", e.detail.fromState, "->", e.detail.toState);
  });
});

// Post events from application code
document.getElementById("button").addEventListener("click", () => {
  player.postStateMachineEvent("OnClick");
});

// Post numeric events
player.postStateMachineEvent({
  type: "Increment",
  value: 1,
});

// Stop state machine
player.stopStateMachine();

// Get current state
const currentState = player.getStateMachineState();
console.log("Current state:", currentState);
```

**React Component Example:**

```tsx
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRef } from "react";

function InteractiveButton() {
  const playerRef = useRef(null);

  const handleClick = () => {
    playerRef.current?.postStateMachineEvent("OnClick");
  };

  const handleDisable = () => {
    playerRef.current?.postStateMachineEvent("Disable");
  };

  const handleEnable = () => {
    playerRef.current?.postStateMachineEvent("Enable");
  };

  return (
    <div>
      <DotLottieReact
        ref={playerRef}
        src="/button.lottie"
        stateMachineId="button_interaction"
        autoplay
        onClick={handleClick}
      />
      <button onClick={handleDisable}>Disable</button>
      <button onClick={handleEnable}>Enable</button>
    </div>
  );
}
```

**iOS Player (Swift):**

```swift
import DotLottie
import UIKit

class InteractiveViewController: UIViewController {
    var animationView: DotLottieView!

    override func viewDidLoad() {
        super.viewDidLoad()

        // Initialize player
        animationView = DotLottieView()
        animationView.frame = view.bounds
        view.addSubview(animationView)

        // Load .lottie file
        if let url = Bundle.main.url(forResource: "button", withExtension: "lottie") {
            animationView.loadAnimation(from: url)
        }

        // Load and start state machine
        animationView.loadStateMachine(id: "button_interaction")
        animationView.startStateMachine()

        // Observe state changes
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(stateChanged(_:)),
            name: .dotLottieStateChanged,
            object: animationView
        )

        // Add gesture recognizer
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(handleTap))
        animationView.addGestureRecognizer(tapGesture)
    }

    @objc func handleTap() {
        // Post event to state machine
        animationView.postStateMachineEvent("OnClick")
    }

    @objc func stateChanged(_ notification: Notification) {
        if let state = notification.userInfo?["state"] as? String {
            print("Entered state: \(state)")
        }
    }

    func disableButton() {
        animationView.postStateMachineEvent("Disable")
    }

    func enableButton() {
        animationView.postStateMachineEvent("Enable")
    }
}
```

**Android Player (Kotlin):**

```kotlin
import com.lottiefiles.dotlottie.core.DotLottiePlayer
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class InteractiveActivity : AppCompatActivity() {
    private lateinit var player: DotLottiePlayer

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize player
        player = DotLottiePlayer(this)
        player.load("button.lottie")

        // Load and start state machine
        player.loadStateMachine("button_interaction")
        player.startStateMachine()

        // Listen for state changes
        player.setStateChangeListener { fromState, toState ->
            println("Transition: $fromState -> $toState")
        }

        // Post events
        findViewById<View>(R.id.button).setOnClickListener {
            player.postStateMachineEvent("OnClick")
        }

        findViewById<View>(R.id.disable_btn).setOnClickListener {
            player.postStateMachineEvent("Disable")
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        player.stopStateMachine()
        player.destroy()
    }
}
```

### Platform Support

| Feature                 | Web | React | iOS | Android | React Native |
| ----------------------- | --- | ----- | --- | ------- | ------------ |
| Basic State Machines    | ✅   | ✅     | ✅   | ✅       | ✅            |
| String Events           | ✅   | ✅     | ✅   | ✅       | ✅            |
| Numeric Events          | ✅   | ✅     | ✅   | ✅       | ✅            |
| Pointer Events          | ✅   | ✅     | ✅   | ✅       | ✅            |
| Guards                  | ✅   | ✅     | ✅   | ✅       | ✅            |
| Context Variables       | ✅   | ✅     | ✅   | ✅       | ✅            |
| State Change Listeners  | ✅   | ✅     | ✅   | ✅       | ✅            |
| Multi-Animation Support | ✅   | ✅     | ✅   | ✅       | ✅            |

**Version Requirements:**

- Web: `@lottiefiles/dotlottie-web` >= 0.30.0
- React: `@lottiefiles/dotlottie-react` >= 0.8.0
- iOS: `DotLottie` >= 0.3.0
- Android: `dotlottie-android` >= 0.3.0
- React Native: `@lottiefiles/dotlottie-react-native` >= 0.4.0

### State Machine Use Cases

**1. Interactive UI Components**

```typescript
// Toggle switch with smooth transitions
const toggleStateMachine = {
  descriptor: { id: "toggle_sm", initial: "off" },
  states: {
    off: {
      type: "PlaybackState",
      segment: [0, 30],
      loop: false,
      autoplay: true,
    },
    on: {
      type: "PlaybackState",
      segment: [30, 60],
      loop: false,
      autoplay: true,
    },
  },
  transitions: [
    {
      type: "Transition",
      fromState: "off",
      toState: "on",
      StringEvent: { value: "Toggle" },
    },
    {
      type: "Transition",
      fromState: "on",
      toState: "off",
      StringEvent: { value: "Toggle" },
    },
  ],
};
```

**2. Multi-Step Forms/Wizards**

```typescript
// Step-by-step progress animation
const wizardStateMachine = {
  descriptor: { id: "wizard_sm", initial: "step1" },
  states: {
    step1: { type: "PlaybackState", segment: [0, 30], loop: true },
    step2: { type: "PlaybackState", segment: [30, 60], loop: true },
    step3: { type: "PlaybackState", segment: [60, 90], loop: true },
    complete: { type: "PlaybackState", segment: [90, 120], loop: false },
  },
  transitions: [
    { fromState: "step1", toState: "step2", StringEvent: { value: "Next" } },
    { fromState: "step2", toState: "step1", StringEvent: { value: "Back" } },
    { fromState: "step2", toState: "step3", StringEvent: { value: "Next" } },
    { fromState: "step3", toState: "step2", StringEvent: { value: "Back" } },
    { fromState: "step3", toState: "complete", StringEvent: { value: "Submit" } },
  ],
};
```

**3. Loading States**

```typescript
// Loading with success/error states
const loadingStateMachine = {
  descriptor: { id: "loading_sm", initial: "idle" },
  states: {
    idle: { type: "PlaybackState", segment: [0, 1], loop: false },
    loading: { type: "PlaybackState", segment: [0, 60], loop: true, speed: 1.5 },
    success: { type: "PlaybackState", segment: [60, 90], loop: false },
    error: { type: "PlaybackState", segment: [90, 120], loop: false },
  },
  transitions: [
    { fromState: "idle", toState: "loading", StringEvent: { value: "StartLoad" } },
    { fromState: "loading", toState: "success", StringEvent: { value: "LoadSuccess" } },
    { fromState: "loading", toState: "error", StringEvent: { value: "LoadError" } },
    { fromState: "success", toState: "idle", onComplete: {} },
    { fromState: "error", toState: "idle", StringEvent: { value: "Retry" } },
  ],
};
```

**4. Character Animations**

```typescript
// Character with multiple actions
const characterStateMachine = {
  descriptor: { id: "character_sm", initial: "idle" },
  states: {
    idle: { type: "PlaybackState", animationId: "idle", loop: true },
    walk: { type: "PlaybackState", animationId: "walk", loop: true },
    run: { type: "PlaybackState", animationId: "run", loop: true },
    jump: { type: "PlaybackState", animationId: "jump", loop: false },
    attack: { type: "PlaybackState", animationId: "attack", loop: false },
  },
  transitions: [
    { fromState: "idle", toState: "walk", StringEvent: { value: "MoveStart" } },
    { fromState: "walk", toState: "idle", StringEvent: { value: "MoveStop" } },
    { fromState: "walk", toState: "run", StringEvent: { value: "Sprint" } },
    { fromState: "run", toState: "walk", StringEvent: { value: "SprintStop" } },
    { fromState: "idle", toState: "jump", StringEvent: { value: "Jump" } },
    { fromState: "walk", toState: "jump", StringEvent: { value: "Jump" } },
    { fromState: "jump", toState: "idle", onComplete: {} },
    { fromState: "idle", toState: "attack", StringEvent: { value: "Attack" } },
    { fromState: "attack", toState: "idle", onComplete: {} },
  ],
};
```

**5. Progress Indicators with Thresholds**

```typescript
const progressStateMachine = {
  descriptor: { id: "progress_sm", initial: "low" },
  states: {
    low: { type: "PlaybackState", segment: [0, 30], loop: true },
    medium: { type: "PlaybackState", segment: [30, 60], loop: true },
    high: { type: "PlaybackState", segment: [60, 90], loop: true },
    complete: { type: "PlaybackState", segment: [90, 120], loop: false },
  },
  transitions: [
    {
      fromState: "low",
      toState: "medium",
      guards: [{ contextKey: "progress", conditionType: "GreaterEqual", compare: 33 }],
      numeric_event: { value: "UpdateProgress", contextKey: "progress" },
    },
    {
      fromState: "medium",
      toState: "high",
      guards: [{ contextKey: "progress", conditionType: "GreaterEqual", compare: 66 }],
      numeric_event: { value: "UpdateProgress", contextKey: "progress" },
    },
    {
      fromState: "high",
      toState: "complete",
      guards: [{ contextKey: "progress", conditionType: "GreaterEqual", compare: 100 }],
      numeric_event: { value: "UpdateProgress", contextKey: "progress" },
    },
  ],
  context_variables: [{ type: "Numeric", key: "progress", value: 0 }],
};
```

## Dynamic Theming Deep Dive

### Core Concepts

Dynamic theming enables runtime visual customization through:

**Themes**: Named sets of visual property overrides

- Each theme has a unique ID
- Contains mappings from layer properties to new values
- Multiple themes can be defined in a single `.lottie` file

**Color Overrides**: Primary use case for theming

- Map layer IDs or names to new color values
- Support for fills, strokes, gradients
- Hex color format (#RRGGBB or #RRGGBBAA)

**Property Mapping**: Structured color assignments

- Target specific layers by ID or name
- Support for nested compositions
- Can override multiple properties per layer

### Theme JSON Structure

Themes are defined in the `.lottie` manifest:

```json
{
  "id": "theme_id",
  "animations": [
    {
      "animationId": "animation_1",
      "layers": [
        {
          "layerId": "layer_1",
          "fills": [
            {
              "index": 0,
              "color": "#FF5733"
            }
          ],
          "strokes": [
            {
              "index": 0,
              "color": "#C70039"
            }
          ]
        },
        {
          "layerName": "background",
          "fills": [
            {
              "index": 0,
              "color": "#1A1A1A"
            }
          ]
        }
      ]
    }
  ]
}
```

**Theme Structure Properties:**

| Property          | Type   | Description                                               |
| ----------------- | ------ | --------------------------------------------------------- |
| `id`              | string | Unique theme identifier                                   |
| `animations`      | array  | Animation-specific overrides                              |
| `animationId`     | string | Target animation ID (optional for single-animation files) |
| `layers`          | array  | Layer property overrides                                  |
| `layerId`         | string | Target layer by ID                                        |
| `layerName`       | string | Target layer by name (alternative to layerId)             |
| `fills`           | array  | Fill color overrides                                      |
| `strokes`         | array  | Stroke color overrides                                    |
| `gradientFills`   | array  | Gradient fill overrides                                   |
| `gradientStrokes` | array  | Gradient stroke overrides                                 |
| `index`           | number | Property index (0 for first fill/stroke)                  |
| `color`           | string | Hex color value                                           |

**Gradient Override Structure:**

```json
{
  "layerId": "gradient_layer",
  "gradientFills": [
    {
      "index": 0,
      "stops": [
        {
          "index": 0,
          "color": "#FF0000"
        },
        {
          "index": 1,
          "color": "#00FF00"
        }
      ]
    }
  ]
}
```

### Creating Themes with dotlottie-js

**Example: Light/Dark Theme**

```typescript
import { DotLottie } from "@lottiefiles/dotlottie-js";

const dotLottie = new DotLottie();

// Add animation
await dotLottie.addAnimation({
  id: "icon_anim",
  data: animationData,
});

// Define light theme
const lightTheme = {
  id: "light",
  animations: [
    {
      animationId: "icon_anim",
      layers: [
        {
          layerName: "background",
          fills: [{ index: 0, color: "#FFFFFF" }],
        },
        {
          layerName: "icon",
          fills: [{ index: 0, color: "#333333" }],
          strokes: [{ index: 0, color: "#666666" }],
        },
        {
          layerName: "accent",
          fills: [{ index: 0, color: "#007AFF" }],
        },
      ],
    },
  ],
};

// Define dark theme
const darkTheme = {
  id: "dark",
  animations: [
    {
      animationId: "icon_anim",
      layers: [
        {
          layerName: "background",
          fills: [{ index: 0, color: "#1C1C1E" }],
        },
        {
          layerName: "icon",
          fills: [{ index: 0, color: "#FFFFFF" }],
          strokes: [{ index: 0, color: "#E5E5E7" }],
        },
        {
          layerName: "accent",
          fills: [{ index: 0, color: "#0A84FF" }],
        },
      ],
    },
  ],
};

// Add themes to .lottie
await dotLottie.addTheme(lightTheme);
await dotLottie.addTheme(darkTheme);

// Build .lottie file
const arrayBuffer = await dotLottie.build();
```

**Example: Brand Color Variations**

```typescript
const brandThemes = [
  {
    id: "brand_primary",
    animations: [
      {
        layers: [
          { layerName: "primary", fills: [{ index: 0, color: "#FF5733" }] },
          { layerName: "secondary", fills: [{ index: 0, color: "#C70039" }] },
          { layerName: "accent", fills: [{ index: 0, color: "#900C3F" }] },
        ],
      },
    ],
  },
  {
    id: "brand_blue",
    animations: [
      {
        layers: [
          { layerName: "primary", fills: [{ index: 0, color: "#3357FF" }] },
          { layerName: "secondary", fills: [{ index: 0, color: "#0039C7" }] },
          { layerName: "accent", fills: [{ index: 0, color: "#0C3F90" }] },
        ],
      },
    ],
  },
  {
    id: "brand_green",
    animations: [
      {
        layers: [
          { layerName: "primary", fills: [{ index: 0, color: "#33FF57" }] },
          { layerName: "secondary", fills: [{ index: 0, color: "#00C739" }] },
          { layerName: "accent", fills: [{ index: 0, color: "#0C903F" }] },
        ],
      },
    ],
  },
];

for (const theme of brandThemes) {
  await dotLottie.addTheme(theme);
}
```

**Example: User Customizable Colors**

```typescript
async function createCustomTheme(userId, colorPreferences) {
  const customTheme = {
    id: `user_${userId}`,
    animations: [
      {
        layers: Object.entries(colorPreferences).map(([layerName, color]) => ({
          layerName,
          fills: [{ index: 0, color }],
        })),
      },
    ],
  };

  await dotLottie.addTheme(customTheme);
  return customTheme.id;
}

// Usage
const themeId = await createCustomTheme("user123", {
  background: "#F0F0F0",
  primary: "#FF6B6B",
  secondary: "#4ECDC4",
  text: "#2C3E50",
});
```

**Retrieving and Updating Themes:**

```typescript
// Get existing theme
const existingTheme = await dotLottie.getTheme("light");

// Modify theme
existingTheme.animations[0].layers[0].fills[0].color = "#F5F5F5";

// Update theme
await dotLottie.addTheme(existingTheme);

// List all themes
const themes = await dotLottie.getThemes();
console.log(
  "Available themes:",
  themes.map((t) => t.id)
);

// Remove theme
await dotLottie.removeTheme("old_theme");
```

### Applying Themes with Players

**Web Player:**

```typescript
import { DotLottie as DotLottiePlayer } from "@lottiefiles/dotlottie-web";

// Initialize with theme
const player = new DotLottiePlayer({
  canvas: document.getElementById("canvas"),
  src: "/animations/icon.lottie",
  themeId: "dark", // Apply theme on load
  autoplay: true,
});

// Switch theme dynamically
function switchTheme(themeId) {
  player.setTheme(themeId);
}

// Listen for theme changes
player.addEventListener("theme:change", (e) => {
  console.log("Theme changed to:", e.detail.themeId);
});

// Get available themes
const themes = player.getThemes();
console.log("Available themes:", themes);

// Respond to system theme
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  player.setTheme("dark");
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  player.setTheme(e.matches ? "dark" : "light");
});
```

**React Component with Theme Switching:**

```tsx
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState, useEffect, useRef } from "react";

function ThemedAnimation() {
  const [theme, setTheme] = useState("light");
  const playerRef = useRef(null);

  // Detect system theme
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(darkModeQuery.matches ? "dark" : "light");

    const handler = (e) => setTheme(e.matches ? "dark" : "light");
    darkModeQuery.addEventListener("change", handler);

    return () => darkModeQuery.removeEventListener("change", handler);
  }, []);

  // Apply theme when it changes
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setTheme(theme);
    }
  }, [theme]);

  return (
    <div>
      <DotLottieReact ref={playerRef} src="/icon.lottie" autoplay loop />
      <div>
        <button onClick={() => setTheme("light")}>Light</button>
        <button onClick={() => setTheme("dark")}>Dark</button>
        <button onClick={() => setTheme("brand_blue")}>Blue</button>
      </div>
    </div>
  );
}
```

**iOS Player (Swift):**

```swift
import DotLottie
import UIKit

class ThemedViewController: UIViewController {
    var animationView: DotLottieView!

    override func viewDidLoad() {
        super.viewDidLoad()

        // Initialize player
        animationView = DotLottieView()
        animationView.frame = view.bounds
        view.addSubview(animationView)

        // Load with theme
        if let url = Bundle.main.url(forResource: "icon", withExtension: "lottie") {
            animationView.loadAnimation(from: url, themeId: "light")
        }

        // Detect system theme
        if traitCollection.userInterfaceStyle == .dark {
            animationView.setTheme("dark")
        }

        animationView.play()
    }

    override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
        super.traitCollectionDidChange(previousTraitCollection)

        // Respond to system theme changes
        if traitCollection.hasDifferentColorAppearance(comparedTo: previousTraitCollection) {
            let themeId = traitCollection.userInterfaceStyle == .dark ? "dark" : "light"
            animationView.setTheme(themeId)
        }
    }

    func switchToBrandTheme(_ brandId: String) {
        // Switch to brand-specific theme
        animationView.setTheme("brand_\(brandId)")
    }

    func getAvailableThemes() -> [String] {
        return animationView.getThemes()
    }
}
```

**Android Player (Kotlin):**

```kotlin
import com.lottiefiles.dotlottie.core.DotLottiePlayer
import android.content.res.Configuration
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class ThemedActivity : AppCompatActivity() {
    private lateinit var player: DotLottiePlayer

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize player
        player = DotLottiePlayer(this)

        // Load with theme based on system
        val themeId = if (isSystemInDarkMode()) "dark" else "light"
        player.load("icon.lottie", themeId = themeId)

        player.play()
    }

    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)

        // Respond to theme changes
        val themeId = if (isSystemInDarkMode()) "dark" else "light"
        player.setTheme(themeId)
    }

    private fun isSystemInDarkMode(): Boolean {
        return resources.configuration.uiMode and
               Configuration.UI_MODE_NIGHT_MASK ==
               Configuration.UI_MODE_NIGHT_YES
    }

    fun switchTheme(themeId: String) {
        player.setTheme(themeId)
    }

    fun getAvailableThemes(): List<String> {
        return player.getThemes()
    }
}
```

### Platform Support

| Feature                 | Web | React | iOS | Android | React Native |
| ----------------------- | --- | ----- | --- | ------- | ------------ |
| Basic Theming           | ✅   | ✅     | ✅   | ✅       | ✅            |
| Runtime Theme Switching | ✅   | ✅     | ✅   | ✅       | ✅            |
| Fill Color Override     | ✅   | ✅     | ✅   | ✅       | ✅            |
| Stroke Color Override   | ✅   | ✅     | ✅   | ✅       | ✅            |
| Gradient Override       | ✅   | ✅     | ✅   | ✅       | ⚠️           |
| Layer Name Targeting    | ✅   | ✅     | ✅   | ✅       | ✅            |
| Layer ID Targeting      | ✅   | ✅     | ✅   | ✅       | ✅            |
| Multi-Animation Themes  | ✅   | ✅     | ✅   | ✅       | ✅            |
| Theme Change Events     | ✅   | ✅     | ✅   | ✅       | ✅            |

**Version Requirements:**

- Web: `@lottiefiles/dotlottie-web` >= 0.25.0
- React: `@lottiefiles/dotlottie-react` >= 0.7.0
- iOS: `DotLottie` >= 0.2.0
- Android: `dotlottie-android` >= 0.2.0
- React Native: `@lottiefiles/dotlottie-react-native` >= 0.3.0 (gradient override partial)

### Theming Use Cases

**1. System Theme Adaptation**

```typescript
// Automatically match system theme
const player = new DotLottiePlayer({
  canvas: document.getElementById("canvas"),
  src: "/icon.lottie",
  themeId: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
});

// Update on system change
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  player.setTheme(e.matches ? "dark" : "light");
});
```

**2. Brand Customization**

```typescript
// Multi-tenant application with brand themes
async function loadBrandedAnimation(tenantId) {
  const brandConfig = await fetch(`/api/brands/${tenantId}`).then((r) => r.json());

  // Create theme from brand config
  const brandTheme = {
    id: `brand_${tenantId}`,
    animations: [
      {
        layers: [
          { layerName: "logo", fills: [{ index: 0, color: brandConfig.primaryColor }] },
          { layerName: "background", fills: [{ index: 0, color: brandConfig.backgroundColor }] },
          { layerName: "accent", fills: [{ index: 0, color: brandConfig.accentColor }] },
        ],
      },
    ],
  };

  const dotLottie = new DotLottie();
  await dotLottie.load("/template.lottie");
  await dotLottie.addTheme(brandTheme);

  const arrayBuffer = await dotLottie.build();
  return arrayBuffer;
}
```

**3. User Preferences**

```typescript
// User-customizable color schemes
function ThemeCustomizer() {
  const [colors, setColors] = useState({
    primary: '#FF5733',
    secondary: '#C70039',
    background: '#FFFFFF'
  });

  const playerRef = useRef(null);

  const applyCustomColors = async () => {
    const dotLottie = new DotLottie();
    await dotLottie.load('/animation.lottie');

    const customTheme = {
      id: 'user_custom',
      animations: [{
        layers: [
          { layerName: 'primary', fills: [{ index: 0, color: colors.primary }] },
          { layerName: 'secondary', fills: [{ index: 0, color: colors.secondary }] },
          { layerName: 'background', fills: [{ index: 0, color: colors.background }] }
        ]
      }]
    };

    await dotLottie.addTheme(customTheme);
    const arrayBuffer = await dotLottie.build();

    // Load updated animation
    const blob = new Blob([arrayBuffer]);
    playerRef.current.load(URL.createObjectURL(blob));
    playerRef.current.setTheme('user_custom');
  };

  return (
    <div>
      <DotLottieReact ref={playerRef} src="/animation.lottie" />
      <ColorPicker color={colors.primary} onChange={c => setColors({...colors, primary: c})} />
      <ColorPicker color={colors.secondary} onChange={c => setColors({...colors, secondary: c})} />
      <ColorPicker color={colors.background} onChange={c => setColors({...colors, background: c})} />
      <button onClick={applyCustomColors}>Apply</button>
    </div>
  );
}
```

**4. Accessibility Themes**

```typescript
const accessibilityThemes = [
  {
    id: "high_contrast",
    animations: [
      {
        layers: [
          { layerName: "foreground", fills: [{ index: 0, color: "#000000" }] },
          { layerName: "background", fills: [{ index: 0, color: "#FFFFFF" }] },
          { layerName: "accent", fills: [{ index: 0, color: "#0000FF" }] },
        ],
      },
    ],
  },
  {
    id: "colorblind_deuteranopia",
    animations: [
      {
        layers: [
          { layerName: "primary", fills: [{ index: 0, color: "#0075FF" }] },
          { layerName: "secondary", fills: [{ index: 0, color: "#FFB500" }] },
          { layerName: "accent", fills: [{ index: 0, color: "#00D4FF" }] },
        ],
      },
    ],
  },
];

// Apply based on user preference
const userAccessibilityPref = localStorage.getItem("accessibility_theme");
if (userAccessibilityPref) {
  player.setTheme(userAccessibilityPref);
}
```

**5. Seasonal/Promotional Themes**

```typescript
// Rotate themes based on calendar events
function getSeasonalTheme() {
  const now = new Date();
  const month = now.getMonth();

  if (month === 11 || month === 0) return "winter_holiday";
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";

  return "default";
}

player.setTheme(getSeasonalTheme());
```

## Combined Workflows

### State Machines + Theming

Combine interactive states with visual themes for rich experiences:

**Example: Themed Button with States**

```typescript
const dotLottie = new DotLottie();

// Add animation
await dotLottie.addAnimation({
  id: "button",
  data: buttonAnimation,
});

// Add state machine
await dotLottie.addStateMachine({
  id: "button_sm",
  data: {
    descriptor: { id: "button_sm", initial: "idle" },
    states: {
      idle: { type: "PlaybackState", segment: [0, 30], loop: true },
      hover: { type: "PlaybackState", segment: [30, 60], loop: false },
      pressed: { type: "PlaybackState", segment: [60, 90], loop: false },
    },
    transitions: [
      { fromState: "idle", toState: "hover", onPointerEnter: {} },
      { fromState: "hover", toState: "idle", onPointerExit: {} },
      { fromState: "hover", toState: "pressed", onPointerDown: {} },
      { fromState: "pressed", toState: "hover", onComplete: {} },
    ],
  },
});

// Add themes
await dotLottie.addTheme({
  id: "light",
  animations: [
    {
      layers: [
        { layerName: "button_bg", fills: [{ index: 0, color: "#FFFFFF" }] },
        { layerName: "button_text", fills: [{ index: 0, color: "#000000" }] },
      ],
    },
  ],
});

await dotLottie.addTheme({
  id: "dark",
  animations: [
    {
      layers: [
        { layerName: "button_bg", fills: [{ index: 0, color: "#1C1C1E" }] },
        { layerName: "button_text", fills: [{ index: 0, color: "#FFFFFF" }] },
      ],
    },
  ],
});

const arrayBuffer = await dotLottie.build();
```

**Using the Combined Animation:**

```typescript
const player = new DotLottiePlayer({
  canvas: document.getElementById("canvas"),
  src: "/button.lottie",
  themeId: "dark", // Apply theme
});

player.addEventListener("load", () => {
  player.loadStateMachine("button_sm");
  player.startStateMachine();
});

// Theme persists across state changes
document.getElementById("theme-toggle").addEventListener("click", () => {
  const currentTheme = player.getTheme();
  player.setTheme(currentTheme === "light" ? "dark" : "light");
  // State machine continues running with new theme
});
```

**Example: Multi-State Loading with Theme**

```typescript
// Loading animation that adapts to theme and responds to events
const loadingSetup = {
  stateMachine: {
    descriptor: { id: "loading_sm", initial: "idle" },
    states: {
      idle: { type: "PlaybackState", segment: [0, 1], loop: false },
      loading: { type: "PlaybackState", segment: [0, 90], loop: true },
      success: { type: "PlaybackState", segment: [90, 120], loop: false },
      error: { type: "PlaybackState", segment: [120, 150], loop: false },
    },
    transitions: [
      { fromState: "idle", toState: "loading", StringEvent: { value: "Start" } },
      { fromState: "loading", toState: "success", StringEvent: { value: "Success" } },
      { fromState: "loading", toState: "error", StringEvent: { value: "Error" } },
      { fromState: "success", toState: "idle", onComplete: {} },
      { fromState: "error", toState: "idle", StringEvent: { value: "Retry" } },
    ],
  },
  themes: {
    light: {
      id: "light",
      animations: [
        {
          layers: [
            { layerName: "spinner", fills: [{ index: 0, color: "#007AFF" }] },
            { layerName: "success_icon", fills: [{ index: 0, color: "#34C759" }] },
            { layerName: "error_icon", fills: [{ index: 0, color: "#FF3B30" }] },
          ],
        },
      ],
    },
    dark: {
      id: "dark",
      animations: [
        {
          layers: [
            { layerName: "spinner", fills: [{ index: 0, color: "#0A84FF" }] },
            { layerName: "success_icon", fills: [{ index: 0, color: "#30D158" }] },
            { layerName: "error_icon", fills: [{ index: 0, color: "#FF453A" }] },
          ],
        },
      ],
    },
  },
};

// Application usage
async function loadData() {
  player.postStateMachineEvent("Start");

  try {
    const data = await fetch("/api/data");
    player.postStateMachineEvent("Success");
  } catch (error) {
    player.postStateMachineEvent("Error");
  }
}
```

## Best Practices

### State Machine Design

**1. Keep States Focused**

```typescript
// Good: Clear, single-purpose states
const states = {
  idle: { segment: [0, 30], loop: true },
  active: { segment: [30, 60], loop: true },
  transitioning: { segment: [60, 90], loop: false },
};

// Avoid: Overloaded states with complex logic
```

**2. Use Descriptive Event Names**

```typescript
// Good: Clear intent
player.postStateMachineEvent("OnUserClickSubmit");
player.postStateMachineEvent("OnDataLoadComplete");

// Avoid: Generic names
player.postStateMachineEvent("Event1");
player.postStateMachineEvent("Click");
```

**3. Implement Proper State Cleanup**

```typescript
// Always stop state machines when unmounting
useEffect(() => {
  player.loadStateMachine("my_sm");
  player.startStateMachine();

  return () => {
    player.stopStateMachine();
  };
}, []);
```

**4. Handle Edge Cases**

```typescript
// Check if state machine is loaded before posting events
if (player.isStateMachineLoaded()) {
  player.postStateMachineEvent("OnClick");
} else {
  console.warn("State machine not ready");
}
```

**5. Use Guards for Complex Logic**

```typescript
// Good: Guard conditions for branching
{
  fromState: 'idle',
  toState: 'premium_feature',
  guards: [
    { contextKey: 'user_tier', conditionType: 'Equal', compare: 2 }
  ],
  StringEvent: { value: 'OpenFeature' }
}
```

**6. Limit State Machine Complexity**

- Keep state count under 10 for maintainability
- Use multiple simpler state machines over one complex one
- Document state diagrams for team understanding

### Theming Best Practices

**1. Use Consistent Layer Naming**

```typescript
// Establish naming conventions
const layerNamingConvention = {
  bg_: "Background layers",
  fg_: "Foreground layers",
  icon_: "Icon layers",
  text_: "Text layers",
  accent_: "Accent/highlight layers",
};

// Example
const theme = {
  layers: [
    { layerName: "bg_primary", fills: [{ index: 0, color: "#FFFFFF" }] },
    { layerName: "fg_icon", fills: [{ index: 0, color: "#000000" }] },
    { layerName: "accent_highlight", fills: [{ index: 0, color: "#007AFF" }] },
  ],
};
```

**2. Test Color Contrast**

```typescript
// Ensure WCAG AA contrast ratios
function validateThemeContrast(theme) {
  const contrastRatio = calculateContrast(theme.foreground, theme.background);

  if (contrastRatio < 4.5) {
    console.warn("Theme fails WCAG AA contrast requirements");
  }
}
```

**3. Provide Fallback Themes**

```typescript
// Always include a default theme
const player = new DotLottiePlayer({
  canvas: canvas,
  src: "/animation.lottie",
  themeId: userPreferredTheme || "default",
});
```

**4. Optimize Theme Switching**

```typescript
// Debounce rapid theme changes
let themeChangeTimeout;
function switchTheme(themeId) {
  clearTimeout(themeChangeTimeout);
  themeChangeTimeout = setTimeout(() => {
    player.setTheme(themeId);
  }, 100);
}
```

**5. Document Themeable Layers**

```typescript
// Maintain theme documentation
const themeableLayersDocumentation = {
  background: "Main background fill",
  primary_icon: "Primary icon color",
  secondary_icon: "Secondary icon color",
  accent_stroke: "Accent stroke color",
  gradient_bg: "Gradient background (2 stops)",
};
```

### Performance Considerations

**1. State Machine Performance**

- Event posting is synchronous; avoid posting in tight loops
- State transitions trigger re-renders; batch events when possible
- Guard evaluation happens on every transition attempt

```typescript
// Avoid: Posting events in animation frame loop
function animationLoop() {
  player.postStateMachineEvent("OnFrame"); // Called 60 times/sec
  requestAnimationFrame(animationLoop);
}

// Better: Use debouncing or throttling
let lastEventTime = 0;
function animationLoop() {
  const now = Date.now();
  if (now - lastEventTime > 100) {
    player.postStateMachineEvent("OnFrame");
    lastEventTime = now;
  }
  requestAnimationFrame(animationLoop);
}
```

**2. Theme Switching Performance**

- Theme changes re-render animation; minimize during active playback
- Pre-load themes on initialization
- Cache theme objects to avoid repeated parsing

```typescript
// Good: Switch themes during idle states
player.addEventListener("state:entered", (e) => {
  if (e.detail.state === "idle") {
    player.setTheme(newTheme);
  }
});
```

**3. Memory Management**

```typescript
// Clean up resources
function cleanup() {
  player.stopStateMachine();
  player.destroy();
}

// In React
useEffect(() => {
  return () => cleanup();
}, []);
```

**4. Bundle Size Optimization**

- State machines add \~1-5KB per machine to `.lottie` files
- Themes add \~0.5-2KB per theme
- Consider dynamic loading for theme-heavy applications

```typescript
// Lazy load themes
async function loadTheme(themeId) {
  const themeData = await fetch(`/themes/${themeId}.json`).then((r) => r.json());
  const dotLottie = new DotLottie();
  await dotLottie.load("/base-animation.lottie");
  await dotLottie.addTheme(themeData);
  return await dotLottie.build();
}
```

### Architecture Patterns

**State Machine as Controller Pattern:**

```typescript
// State machine controls application state
class AnimationController {
  constructor(player) {
    this.player = player;
    this.setupStateMachine();
  }

  setupStateMachine() {
    this.player.addEventListener("state:entered", (e) => {
      this.onStateChange(e.detail.state);
    });
  }

  onStateChange(state) {
    // Update application state based on animation state
    switch (state) {
      case "loading":
        this.showLoadingUI();
        break;
      case "success":
        this.showSuccessUI();
        break;
      case "error":
        this.showErrorUI();
        break;
    }
  }

  triggerAction(action) {
    this.player.postStateMachineEvent(action);
  }
}
```

**Theme Provider Pattern:**

```typescript
// React context for global theme management
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const switchTheme = (newTheme) => {
    setTheme(newTheme);
    // Update all animations with new theme
    document.querySelectorAll('.lottie-animation').forEach(el => {
      const player = el.player;
      if (player) player.setTheme(newTheme);
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## Troubleshooting

### State Machine Issues

**Problem: Events not triggering transitions**

```typescript
// Debug: Enable state machine logging
player.addEventListener("state:entered", (e) => {
  console.log("Entered state:", e.detail.state);
});

player.addEventListener("transition", (e) => {
  console.log("Transition:", e.detail.fromState, "->", e.detail.toState);
});

// Check if state machine is loaded
console.log("SM loaded:", player.isStateMachineLoaded());

// Verify event name matches
player.postStateMachineEvent("OnClick"); // Case sensitive!
```

**Problem: Guard conditions not working**

```typescript
// Debug: Log context variables
const context = player.getStateMachineContext();
console.log("Context variables:", context);

// Verify guard syntax
{
  guards: [
    {
      type: "Guard",
      contextKey: "counter", // Must match context variable key exactly
      conditionType: "Greater", // Check spelling
      compare: 5,
    },
  ];
}
```

**Problem: State machine not starting**

```typescript
// Ensure animation is loaded first
player.addEventListener("load", () => {
  player.loadStateMachine("my_sm");
  player.startStateMachine();
});

// Check for errors
player.addEventListener("error", (e) => {
  console.error("Player error:", e.detail);
});
```

### Theming Issues

**Problem: Theme not applying**

```typescript
// Verify theme exists
const themes = player.getThemes();
console.log("Available themes:", themes);

// Check theme ID matches
player.setTheme("dark"); // Must match exactly

// Verify layer names in animation
// Use After Effects or layer inspection tools to confirm layer names
```

**Problem: Colors not changing**

```typescript
// Debug: Inspect layer structure
const animation = await dotLottie.getAnimation('animation_id');
console.log('Animation layers:', animation.layers);

// Ensure layer is not a precomp
// Themes cannot override layers inside precompositions by default

// Check fill/stroke index
{
  layerName: 'icon',
  fills: [
    { index: 0, color: '#FF0000' } // First fill
    { index: 1, color: '#00FF00' } // Second fill (if exists)
  ]
}
```

**Problem: Theme switching causes flicker**

```typescript
// Switch during appropriate states
player.addEventListener("loopComplete", () => {
  player.setTheme(newTheme);
});

// Or pause before switching
player.pause();
player.setTheme(newTheme);
player.play();
```

### Performance Issues

**Problem: Animation stuttering with state machine**

```typescript
// Reduce guard complexity
// Avoid deeply nested conditions

// Optimize transition frequency
// Don't post events every frame

// Profile with DevTools
performance.mark("transition-start");
player.postStateMachineEvent("OnClick");
performance.mark("transition-end");
performance.measure("transition", "transition-start", "transition-end");
```

**Problem: Large file sizes**

```typescript
// Audit state machine complexity
const stateMachines = await dotLottie.getStateMachines();
stateMachines.forEach((sm) => {
  console.log(`${sm.id}: ${JSON.stringify(sm.data).length} bytes`);
});

// Reduce redundant themes
// Combine similar themes
// Remove unused state machines
```

## Resources

### Documentation

- [dotLottie State Machine Specification](https://dotlottie.io/spec/2.0/#state-machines)
- [dotlottie-js Introduction](/docs/tools/dotlottie-js)
- [Managing State Machines with dotlottie-js](dotlottie-js-Core-Managing-State-Machines)
- [Advanced State Machines with dotlottie-js](dotlottie-js-Advanced-State-Machines)
- [Managing Themes with dotlottie-js](dotlottie-js-Core-Managing-Themes)
- [Advanced Theming with dotlottie-js](dotlottie-js-Advanced-Theming)
- [Web Player: State Machines](dotLottie-Web-State-Machines)
- [Web Player: Theming](dotLottie-Web-Theming)
- [iOS Player: State Machines](dotLottie-iOS-State-Machines)
- [dotLottie Player Introduction](/en/runtimes/)
- [Interactivity Overview](dotLottie-Interactivity)

### Tools

- [dotlottie-js on npm](https://www.npmjs.com/package/@lottiefiles/dotlottie-js)
- [dotlottie-web on npm](https://www.npmjs.com/package/@lottiefiles/dotlottie-web)
- [dotlottie-react on npm](https://www.npmjs.com/package/@lottiefiles/dotlottie-react)
- [GitHub: dotlottie-js](https://github.com/LottieFiles/dotlottie-js)
- [GitHub: dotlottie-web](https://github.com/LottieFiles/dotlottie-web)

### Examples

- [CodeSandbox: Interactive Button](https://codesandbox.io/s/dotlottie-state-machine-button)
- [CodeSandbox: Theme Switcher](https://codesandbox.io/s/dotlottie-theme-switcher)
- [GitHub Examples Repository](https://github.com/LottieFiles/dotlottie-web/tree/main/examples)

### Community

- [Discord: LottieFiles Community](https://discord.gg/lottiefiles)
- [GitHub Discussions](https://github.com/LottieFiles/dotlottie-web/discussions)
- [Stack Overflow: \[lottie\] tag](https://stackoverflow.com/questions/tagged/lottie)
