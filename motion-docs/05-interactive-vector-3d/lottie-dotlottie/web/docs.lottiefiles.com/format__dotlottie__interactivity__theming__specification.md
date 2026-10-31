---
source: https://docs.lottiefiles.com/en/format/dotlottie/interactivity/theming/specification.md
title: ""
fetched: 2026-10-28
---

# Theme Specification
Complete technical specification for dotLottie dynamic theming

# Theme Specification

Dynamic theming enables runtime customization of Lottie animations by overriding animated property values without modifying the original animation file.

## Version

Current specification version: **1.0**

## Overview

Themes are JSON files stored in the `t/` directory of a `.lottie` archive. Each theme file contains an array of **rules** that override specific animated properties. Rules target properties by their [Lottie Slot](https://lottie.github.io/lottie-spec/1.0/specs/helpers/#slots) ID — only properties that have been assigned a slot ID in the Lottie animation can be themed.

### Use Cases

- Light/dark mode switching
- Brand color customization
- Accessibility adjustments (high contrast)
- Seasonal or contextual styling

## File Location

Theme files are stored in the `t/` directory and referenced from the manifest:

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

The `id` values correspond to files in the archive: `"light"` → `t/light.json`.

## Theme File Format

A theme file is a JSON object with a single `rules` array:

| Field   | Required | Type             | Description                                                                         |
| ------- | -------- | ---------------- | ----------------------------------------------------------------------------------- |
| `rules` | Yes      | [Rule](#rule)\[] | List of property overrides. Each entry targets exactly one slotted Lottie property. |

### Example Theme File

```json
{
  "rules": [
    {
      "id": "background_color",
      "type": "Color",
      "value": [0.12, 0.12, 0.12]
    },
    {
      "id": "icon_opacity",
      "type": "Scalar",
      "value": 80
    },
    {
      "id": "brand_color",
      "type": "Color",
      "animations": ["animation_01"],
      "value": [0.0, 0.48, 1.0]
    }
  ]
}
```

## Rule

A rule targets a specific slotted property in a Lottie animation.

| Field        | Required | Type                                                                                           | Description                                                                                  |
| ------------ | -------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `id`         | Yes      | String                                                                                         | Slot ID of the property to override. Case-sensitive.                                         |
| `type`       | Yes      | `"Color"` \| `"Scalar"` \| `"Position"` \| `"Vector"` \| `"Gradient"` \| `"Image"` \| `"Text"` | The rule type, matching the Lottie property type being overridden.                           |
| `animations` | No       | `string[]`                                                                                     | Limit the rule to specific animations by ID. If omitted, the rule applies to all animations. |
| `value`      | Yes\*    | See per-type tables below                                                                      | Static override value. Required if `keyframes` is not provided.                              |
| `keyframes`  | Yes\*    | Type-specific Keyframe objects                                                                 | Animated override. Required if `value` is not provided. Takes precedence over `value`.       |
| `expression` | No       | String                                                                                         | Lottie expression for dynamic values. Takes precedence over `value` and `keyframes`.         |

\* Either `value` or `keyframes` must be provided, but not both.

## Rule Types

### Color Rule

Overrides color properties (fill color, stroke color, text color).

| Field       | Type                                     | Description                             |
| ----------- | ---------------------------------------- | --------------------------------------- |
| `value`     | `[R, G, B]` (0–1 normalized per channel) | Static color. e.g. `[1, 0, 0]` for red. |
| `keyframes` | [Color Keyframe](#color-keyframe)\[]     | Animated color transitions.             |

#### Color Keyframe

| Field        | Required | Type                                           | Description                                         |
| ------------ | -------- | ---------------------------------------------- | --------------------------------------------------- |
| `frame`      | Yes      | Number                                         | Animation frame number where this color is applied. |
| `value`      | Yes      | `[R, G, B]` (0–1 normalized)                   | Color at this keyframe.                             |
| `inTangent`  | No       | `{ x: number\|number[], y: number\|number[] }` | Incoming Bézier easing handle.                      |
| `outTangent` | No       | `{ x: number\|number[], y: number\|number[] }` | Outgoing Bézier easing handle.                      |
| `hold`       | No       | Boolean                                        | If `true`, hold value without interpolating.        |

#### Example: Static Color

```json
{
  "id": "fill_color",
  "type": "Color",
  "value": [0.0, 0.47, 1.0]
}
```

#### Example: Animated Color

```json
{
  "id": "background",
  "type": "Color",
  "keyframes": [
    { "frame": 0, "value": [1, 1, 1] },
    { "frame": 30, "value": [0.12, 0.12, 0.12] }
  ]
}
```

---

### Scalar Rule

Overrides single-value numeric properties (opacity, stroke width, rotation, etc.).

| Field       | Type                                   | Description                        |
| ----------- | -------------------------------------- | ---------------------------------- |
| `value`     | Number                                 | Static numeric value.              |
| `keyframes` | [Scalar Keyframe](#scalar-keyframe)\[] | Animated numeric values over time. |

#### Scalar Keyframe

| Field        | Required | Type                                           | Description                                  |
| ------------ | -------- | ---------------------------------------------- | -------------------------------------------- |
| `frame`      | Yes      | Number                                         | Animation frame number.                      |
| `value`      | Yes      | Number                                         | Numeric value at this keyframe.              |
| `inTangent`  | No       | `{ x: number\|number[], y: number\|number[] }` | Incoming Bézier easing handle.               |
| `outTangent` | No       | `{ x: number\|number[], y: number\|number[] }` | Outgoing Bézier easing handle.               |
| `hold`       | No       | Boolean                                        | If `true`, hold value without interpolating. |

#### Example

```json
{
  "id": "icon_opacity",
  "type": "Scalar",
  "value": 75
}
```

---

### Position Rule

Overrides position properties (position, anchor point, gradient start/end point).

| Field       | Type                                       | Description                  |
| ----------- | ------------------------------------------ | ---------------------------- |
| `value`     | `[x, y]` or `[x, y, z]`                    | Static position coordinates. |
| `keyframes` | [Position Keyframe](#position-keyframe)\[] | Animated position over time. |

#### Position Keyframe

| Field             | Required | Type                                           | Description                                  |
| ----------------- | -------- | ---------------------------------------------- | -------------------------------------------- |
| `frame`           | Yes      | Number                                         | Animation frame number.                      |
| `value`           | Yes      | `[x, y]` or `[x, y, z]`                        | Position at this keyframe.                   |
| `inTangent`       | No       | `{ x: number\|number[], y: number\|number[] }` | Incoming Bézier easing handle.               |
| `outTangent`      | No       | `{ x: number\|number[], y: number\|number[] }` | Outgoing Bézier easing handle.               |
| `hold`            | No       | Boolean                                        | If `true`, hold value without interpolating. |
| `valueInTangent`  | No       | Number\[]                                      | Tangent for curved path movement.            |
| `valueOutTangent` | No       | Number\[]                                      | Tangent for curved path movement.            |

#### Example

```json
{
  "id": "element_position",
  "type": "Position",
  "value": [100, 200]
}
```

---

### Vector Rule

Overrides vector properties (scale, size).

| Field       | Type                                   | Description                |
| ----------- | -------------------------------------- | -------------------------- |
| `value`     | `[x, y]`                               | Static vector value.       |
| `keyframes` | [Vector Keyframe](#vector-keyframe)\[] | Animated vector over time. |

#### Vector Keyframe

| Field        | Required | Type                                           | Description                                  |
| ------------ | -------- | ---------------------------------------------- | -------------------------------------------- |
| `frame`      | Yes      | Number                                         | Animation frame number.                      |
| `value`      | Yes      | `[x, y]`                                       | Vector at this keyframe.                     |
| `inTangent`  | No       | `{ x: number\|number[], y: number\|number[] }` | Incoming Bézier easing handle.               |
| `outTangent` | No       | `{ x: number\|number[], y: number\|number[] }` | Outgoing Bézier easing handle.               |
| `hold`       | No       | Boolean                                        | If `true`, hold value without interpolating. |

#### Example

```json
{
  "id": "icon_scale",
  "type": "Vector",
  "value": [1.5, 1.5]
}
```

---

### Gradient Rule

Overrides gradient properties with a list of color stops.

| Field       | Type                                       | Description                  |
| ----------- | ------------------------------------------ | ---------------------------- |
| `value`     | [Gradient Stop](#gradient-stop)\[]         | Static gradient color stops. |
| `keyframes` | [Gradient Keyframe](#gradient-keyframe)\[] | Animated gradient over time. |

#### Gradient Stop

| Field    | Required | Type                         | Description                                   |
| -------- | -------- | ---------------------------- | --------------------------------------------- |
| `color`  | Yes      | `[R, G, B]` (0–1 normalized) | Color at this stop.                           |
| `offset` | Yes      | Number (0–1)                 | Stop position along the gradient (0 = start). |

#### Gradient Keyframe

| Field   | Required | Type                               | Description                            |
| ------- | -------- | ---------------------------------- | -------------------------------------- |
| `frame` | Yes      | Number                             | Animation frame number.                |
| `value` | Yes      | [Gradient Stop](#gradient-stop)\[] | Gradient stops at this frame.          |
| `hold`  | No       | Boolean                            | If `true`, hold without interpolating. |

#### Example

```json
{
  "id": "background_gradient",
  "type": "Gradient",
  "value": [
    { "color": [0.0, 0.0, 0.5], "offset": 0 },
    { "color": [0.0, 0.5, 1.0], "offset": 1 }
  ]
}
```

---

### Image Rule

Replaces an image asset in the animation.

| Field   | Type                        | Description                |
| ------- | --------------------------- | -------------------------- |
| `value` | [Image Value](#image-value) | Replacement image details. |

#### Image Value

| Field    | Required | Type   | Description                           |
| -------- | -------- | ------ | ------------------------------------- |
| `id`     | Yes      | String | Asset identifier.                     |
| `width`  | Yes      | Number | Image width in pixels.                |
| `height` | Yes      | Number | Image height in pixels.               |
| `url`    | Yes      | String | URL or path to the replacement image. |

#### Example

```json
{
  "id": "logo_image",
  "type": "Image",
  "value": {
    "id": "brand_logo",
    "width": 200,
    "height": 100,
    "url": "i/brand_logo.png"
  }
}
```

---

### Text Rule

Overrides text document properties.

| Field   | Type        | Description                           |
| ------- | ----------- | ------------------------------------- |
| `value` | Text object | Replacement text and style properties |

Text rule values can include: text content, font family, font size, fill color, stroke color, styling (bold, italic), and alignment.

#### Example

```json
{
  "id": "headline_text",
  "type": "Text",
  "value": {
    "t": "Hello World",
    "s": 48,
    "fc": [1, 1, 1]
  }
}
```

---

## Expression System

The `expression` field on any rule enables dynamic values using Lottie expressions. Expressions take precedence over both `value` and `keyframes`.

**Available globals:**

- `time` — Current animation time in seconds
- `value` — Original property value from the Lottie animation
- `thisComp` — Reference to the current composition
- `thisLayer` — Reference to the current layer

All expressions must return a value via `$bm_rt`:

```javascript
var $bm_rt;
$bm_rt = calculatedValue;
```

**Example: Time-based color animation**

```json
{
  "id": "background_color",
  "type": "Color",
  "expression": "var $bm_rt; var t = Math.sin(time * 2); $bm_rt = [0.5 + t * 0.5, 0.3, 0.8];"
}
```

For comprehensive expression documentation, refer to the [Lottie Expressions Documentation](https://lottiefiles.github.io/lottie-docs/expressions/).

## System Behavior

- `SetTheme` actions require the theme to exist in the manifest and be compatible with the current animation
- Dynamic theme loading and theme inheritance are not supported
- Theme changes apply to the renderer immediately
- Unknown themes are rejected during validation
- Named colors (e.g. CSS color names) are not supported in Color rules; use normalized `[R, G, B]` arrays

## References

- [Lottie Slots Specification](https://lottie.github.io/lottie-spec/1.0/specs/helpers/#slots)
- [Lottie Properties Specification](https://lottie.github.io/lottie-spec/1.0/specs/properties/#properties)
- [Lottie Expressions Documentation](https://lottiefiles.github.io/lottie-docs/expressions/)
- [dotLottie Format Specification](/format/dotlottie/specification)
