---
source: https://docs.lottiefiles.com/en/format/dotlottie/structure.md
title: ""
fetched: 2026-10-28
---

# dotLottie Format Structure
Explore the dotLottie format structure. Learn about the manifest file, its properties, and best practices for organizing your Lottie animations.

# Format Structure

The dotLottie format (`.lottie`) is a unified container format designed to package and distribute Lottie animations efficiently. It's essentially a zip file with a standardized structure that can contain multiple animations, themes, and interactive states.

For detailed technical specifications of the format, visit [dotlottie.io↗](https://dotlottie.io).

## Basic Structure

A `.lottie` file typically contains:

```
my-animation.lottie
├── manifest.json        # Configuration and metadata
├── a/                   # Directory containing animations
│   ├── animation1.json  # Lottie JSON animation file
│   └── animation2.json  # Additional animations
├── i/                   # Optional image assets
│   └── logo.webp
├── t/                   # Optional themes directory
│   ├── light.json       # Theme configuration
│   └── dark.json        # Additional themes
└── s/                   # Optional state machines
    └── button.json      # State machine configuration
```

## Manifest File

The `manifest.json` file is the heart of a dotLottie file, containing metadata and configuration for the animations. This guide explains the structure and properties of the manifest.

### Basic Structure

```json
{
  "version": "2",
  "generator": "dotlottie-js v2.0.0",
  "initial": {
    "animation": "main-animation"
  },
  "animations": [
    {
      "id": "main-animation",
      "initialTheme": "light",
      "background": "#FFFFFF",
      "themes": ["light", "dark"]
    }
  ],
  "themes": [
    {
      "id": "light",
      "name": "Light Theme"
    },
    {
      "id": "dark",
      "name": "Dark Theme"
    }
  ],
  "stateMachines": [
    {
      "id": "button-states",
      "name": "Button States"
    }
  ]
}
```

### Top-Level Properties

| Property        | Type   | Required | Description                                              |
| --------------- | ------ | -------- | -------------------------------------------------------- |
| `version`       | string | Yes      | dotLottie spec version. Must be `"2"` for v2 files.      |
| `generator`     | string | No       | Name and version of the tool that created the file       |
| `animations`    | array  | Yes      | Array of animation descriptors                           |
| `themes`        | array  | No       | Array of theme descriptors                               |
| `stateMachines` | array  | No       | Array of state machine descriptors                       |
| `initial`       | object | No       | Specifies which animation or state machine to load first |

### Animation Properties

Each animation in the `animations` array describes an entry in the `a/` directory:

| Property       | Type         | Required | Description                                                       |
| -------------- | ------------ | -------- | ----------------------------------------------------------------- |
| `id`           | string       | Yes      | Unique identifier matching the filename in `a/` (without `.json`) |
| `initialTheme` | string       | No       | ID of the theme to apply on load, corresponding to a file in `t/` |
| `background`   | string (hex) | No       | Background color (e.g., `#FFFFFF`)                                |
| `themes`       | string\[]    | No       | Array of theme IDs scoped to this animation                       |

### Theme Properties

Each theme in the `themes` array describes an entry in the `t/` directory:

| Property | Type   | Required | Description                                     |
| -------- | ------ | -------- | ----------------------------------------------- |
| `id`     | string | Yes      | Unique identifier matching the filename in `t/` |
| `name`   | string | No       | Human-readable name for the theme               |

### Accessing the Manifest

You can access the manifest through the `manifest` property of the DotLottie instance:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "animation.lottie",
});

dotLottie.addEventListener("load", () => {
  // Access manifest properties
  console.log(dotLottie.manifest.animations);
  console.log(dotLottie.manifest.initial);
});
```

### Best Practices

1. **Animation IDs**
   - Use descriptive, unique IDs
   - Follow a consistent naming convention
   - Only alphanumeric characters, dots, underscores, spaces, and hyphens

2. **Themes**
   - Use semantic theme names (e.g., `light`, `dark`, `brand`)
   - Scope themes to specific animations using the `themes` array on the animation object
   - Set `initialTheme` to specify which theme loads by default

3. **Initial Loading**
   - Use `initial.animation` to specify which animation loads first in a multi-animation file
   - Use `initial.stateMachine` when the file has an interactive state machine that should start immediately

## Creating dotLottie Files

To create `.lottie` files, you can use:

- [dotlottie-js↗](https://github.com/LottieFiles/dotlottie-js) library
- [Lottie Creator↗](https://lottiefiles.com/lottie-creator) tool
- [LottieFiles Platform↗](https://lottiefiles.com)

For detailed format specifications and tooling information, visit [dotlottie.io↗](https://dotlottie.io).
