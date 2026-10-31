---
source: https://docs.lottiefiles.com/en/format/dotlottie/interactivity/theming.md
title: ""
fetched: 2026-10-28
---

# Theming
Dynamic theming for Lottie animations

# Theming

dotLottie supports dynamic theming, which lets you customize animation properties at runtime without modifying the original animation file. You can bundle multiple themes inside a single `.lottie` file and switch between them on the fly.

Themes work by targeting **Lottie Slots** — named property references embedded in the Lottie animation. A theme file contains an array of **rules**, each rule overriding the value of one slotted property. Supported property types include colors, scalars (opacity, stroke width), positions, vectors (scale), gradients, images, and text.

Theme files are stored in the `t/` directory of the `.lottie` archive and referenced from `manifest.json`:

```json
{
  "version": "2",
  "animations": [
    {
      "id": "my_animation",
      "initialTheme": "light",
      "themes": ["light", "dark"]
    }
  ],
  "themes": [
    { "id": "light", "name": "Light Theme" },
    { "id": "dark", "name": "Dark Theme" }
  ]
}
```

## Learn More

- [Theme Specification](/format/dotlottie/interactivity/theming/specification) — Complete theme file format, rule types, keyframes, and expressions
