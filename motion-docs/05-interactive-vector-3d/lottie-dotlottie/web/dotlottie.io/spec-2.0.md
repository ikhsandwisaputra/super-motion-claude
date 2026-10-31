---
source: https://dotlottie.io/spec/2.0/
title: "dotLottie v2.0 Specification | dotLottie"
fetched: 2026-10-28
---

# [#](https://dotlottie.io/spec/2.0/#dotlottie-v2-0-specification) dotLottie v2.0 Specification

dotLottie is an open-source file format designed to package one or more [Lottie animations (opens new window)](https://lottie.github.io/) along with their associated resources, such as images, themes, state machines, into a single, compressed file. A dotLottie file is a ZIP archive compressed using the Deflate method, identified by the `.lottie` file extension and the MIME type `application/zip+dotlottie`.

## [#](https://dotlottie.io/spec/2.0/#file-structure) File Structure

A dotLottie file is structured as a ZIP archive with a specific layout to organize its contents efficiently:

```text
.
ââ manifest.json          # Required: Metadata file describing the package
ââ a/                       # Required: Directory containing Lottie JSON animations
â  ââ animation_1.json    # Example animation file
â  ââ animation_2.json    # Another animation file
ââ i/                     # Optional: Directory for image assets
â  ââ img_1.webp          # Example image asset
â  ââ img_2.png           # Another image asset
ââ s/                     # Optional: Directory for state machine files
â  ââ state_machine_1.json # Example state machine file
â  ââ state_machine_2.json # Another state machine file
ââ t/                     # Optional: Directory for theme files
â  ââ theme_1.json        # Example theme file
â  ââ theme_2.json        # Another theme file
ââ f/                     # Optional: Directory for font assets
   ââ BrandFont-Bold.ttf  # Example font file
   ââ BrandFont-Regular.woff2 # Another font file
```

* **`manifest.json`**: A required JSON file at the root that provides metadata and configuration details.
* **`a/`**: A required folder containing one or more Lottie JSON animation files.
* **`i/`**: An optional folder for storing Lottie image assets referenced by the animations.
* **`t/`**: An optional folder for storing theme files.
* **`s/`**: An optional folder for storing state machine files.
* **`f/`**: An optional folder for storing font assets referenced by themes.

## [#](https://dotlottie.io/spec/2.0/#manifest) Manifest

The `manifest.json` is a JSON file placed at the root of the dotLottie file and serves as the backbone of the dotLottie format, detailing the animations, themes, state machines available in the dotLottie file.

### [#](https://dotlottie.io/spec/2.0/#properties) Properties

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `version` | â yes | String | The version number of the dotLottie file. ex. "2" |
| `generator` | no | String | Name and version of the tool or software that generated the dotLottie file. |
| `animations` | â yes | Array<[Animation](https://dotlottie.io/spec/2.0/#animation)> | An array containing metadata for each animation in the archive. |
| `themes` | no | Array<[Theme](https://dotlottie.io/spec/2.0/#theme)> | An array of metadata for each theme asset in the archive. |
| `stateMachines` | no | Array<[StateMachine](https://dotlottie.io/spec/2.0/#state-machine)> | An array of metadata for each state machine asset in the archive. |
| `initial` | no | [Initial](https://dotlottie.io/spec/2.0/#initial) | Information about which asset to load first by the player. |

#### [#](https://dotlottie.io/spec/2.0/#initial) Initial

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `stateMachine` | no | String | The ID of the state machine to load initially, corresponding to a file in the `s/` directory. |
| `animation` | no | String | The ID of the animation to load initially, corresponding to a file in the `a/` directory. |

> **Note**: Players shall load the first animation by default if no initial animation/state machine is specified.

#### [#](https://dotlottie.io/spec/2.0/#animation) Animation

Each object in the `animations` array has the following properties:

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `id` | â yes | String | Unique identifier for the animation, corresponding to a file in the `a/` directory (e.g., `a/animation_01.json`). |
| `initialTheme` | no | String | ID of the theme to apply initially, corresponding to a file in the `t/` directory. |
| `background` | no | Number (u32) | Background color for the animation as a u32 RGBA representation (e.g., `0xFFFFFFFF` for opaque white). |
| `themes` | no | Array<String> | An array of theme IDs, each corresponding to a scoped theme file in the `t/` directory, for the animation with `id` |

#### [#](https://dotlottie.io/spec/2.0/#theme) Theme

Each object in the `themes` array has the following properties:

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `id` | â yes | String | Unique identifier for the theme, corresponding to a file in the `t/` directory. |
| `name` | no | String | A descriptive name for the theme. |

#### [#](https://dotlottie.io/spec/2.0/#state-machine) State Machine

Each object in the `stateMachines` array has the following properties:

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `id` | â yes | String | Unique identifier for the state machine, corresponding to a file in the `s/` directory. |
| `name` | no | String | A descriptive name for the state machine. |

### [#](https://dotlottie.io/spec/2.0/#manifest-example) Manifest Example

Below is an example `manifest.json` file for a dotLottie file:

```json
{
  "version": "2",
  "generator": "dotLottie-cli@v2.0",
  "initial": {
    "animation": "animation_02"
  },
  "animations": [
    {
      "id": "animation_01"
    },
    {
      "id": "animation_02",
      "initialTheme": "theme_01",
      "background": 4126537471
    }
  ],
  "themes": [
    {
      "id": "theme_01",
      "name": "Light Theme"
    },
    {
      "id": "theme_02",
      "name": "Dark Theme"
    }
  ],
  "stateMachines": [
    {
      "id": "state_machine_01",
      "name": "Button States"
    },
    {
      "id": "state_machine_02",
      "name": "Loading States"
    }
  ]
}
```

This manifest describes a dotLottie file with:

* Two animations: `animation_01` and `animation_02` (with `animation_02` having an initial theme and background color)
* Two themes: `theme_01` and `theme_02`, with descriptive names
* Two state machines: `state_machine_01` and `state_machine_02`, also with descriptive names
* Configuration to load `animation_02` initially when the dotLottie file is opened

The corresponding dotLottie file structure would look like this:

```text
.
âââ manifest.json             # The manifest file shown above
âââ a/                        # Animations directory
â   âââ animation_01.json     # First animation
â   âââ animation_02.json     # Second animation (loaded initially)
âââ s/                        # State machines directory
â   âââ state_machine_01.json # "Button States" state machine
â   âââ state_machine_02.json # "Loading States" state machine
âââ t/                        # Themes directory
    âââ theme_01.json         # "Light Theme"
    âââ theme_02.json         # "Dark Theme"
```

Note: This example assumes the animations don't reference any external assets. If they did, the structure would also include `i/` (images).

### [#](https://dotlottie.io/spec/2.0/#manifest-json-schema) Manifest JSON Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "dotLottie Manifest",
  "description": "Schema for the manifest file in a dotLottie archive",
  "type": "object",
  "required": ["version", "animations"],
  "properties": {
    "version": {
      "type": "string",
      "const": "2",
      "description": "Version of the dotLottie manifest"
    },
    "generator": {
      "type": "string",
      "description": "Tool or software used to generate the dotLottie file"
    },
    "animations": {
      "type": "array",
      "description": "Array of animation metadata objects",
      "minItems": 1,
      "items": {
        "type": "object",
        "minItems": 1,
        "required": ["id"],
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique identifier for the animation",
            "pattern": "^[a-zA-Z0-9._ -]+$"
          },
          "initialTheme": {
            "type": "string",
            "description": "ID of the initial theme to apply when the animation is loaded",
            "pattern": "^[a-zA-Z0-9._ -]+$"
          },
          "background": {
            "type": "integer",
            "description": "Background color as a u32 RGBA representation (e.g., 0xFFFFFFFF for opaque white)"
          },
          "themes": {
            "type": "array",
            "description": "Array of scoped theme IDs, only one of these themes can be applied to the animation",
            "items": {
              "type": "string",
              "description": "Theme ID corresponding to a file in the 't/' directory",
              "maxLength": 256,
              "pattern": "^[a-zA-Z0-9._ -]+$"
            }
          }
        },
        "additionalProperties": false
      }
    },
    "themes": {
      "type": "array",
      "description": "Array of theme objects",
      "items": {
        "type": "object",
        "required": ["id"],
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique identifier for the theme, corresponding to a file in the 't/' directory",
            "pattern": "^[a-zA-Z0-9._ -]+$"
          },
          "name": {
            "type": "string",
            "description": "A descriptive name for the theme"
          }
        },
        "additionalProperties": false
      }
    },
    "stateMachines": {
      "type": "array",
      "description": "Array of state machine objects",
      "items": {
        "type": "object",
        "required": ["id"],
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique identifier for the state machine, corresponding to a file in the 's/' directory",
            "pattern": "^[a-zA-Z0-9._ -]+$"
          },
          "name": {
            "type": "string",
            "description": "A descriptive name for the state machine"
          }
        },
        "additionalProperties": false
      }
    }
  },
  "additionalProperties": false
}
```

## [#](https://dotlottie.io/spec/2.0/#animations) Animations

Animations are Lottie animations, the primary content of a dotLottie file, stored as JSON files in the `a/` directory at the root of the archive.

> **Note**: A valid dotLottie file must contain at least one Lottie animation.

Animation filenames must follow these requirements:

* POSIX-compliant containing only alphanumeric characters, dots, underscores, spaces and hyphens
* Valid filename pattern: `^[a-zA-Z0-9._\- ]+$`

### [#](https://dotlottie.io/spec/2.0/#animation-format) Animation Format

Animation files must adhere to the [Lottie JSON specification (opens new window)](https://lottie.github.io/lottie-spec/latest/).

## [#](https://dotlottie.io/spec/2.0/#assets) Assets

dotLottie provides an efficient way to package and reference assets used by Lottie animations. These assets can include:

* **Images**: Visual elements like illustrations, photos, or textures
* **Fonts**: Custom typography used in text layers

### [#](https://dotlottie.io/spec/2.0/#asset-storage) Asset Storage

Assets in a dotLottie file are organized in dedicated directories:

| Asset Type | Directory | Description |
| --- | --- | --- |
| Images | `i/` | Contains image files (PNG, JPG, WebP, SVG, etc.) |
| Fonts | `f/` | Contains font files (TTF, OTF, WOFF, WOFF2, etc.) |

When a Lottie animation has assets, it can be referenced in several ways:

1. **Path Reference**: The animation references assets by relative path
2. **Data URI**: Assets are embedded directly in the animation as Base64-encoded data
3. **URL**: Assets are loaded from external sources via URLs

For more details, kindly refer to the [Lottie Image Assets Specification (opens new window)](https://lottiefiles.github.io/lottie-docs/assets/) and the [Lottie Font List Specification (opens new window)](https://lottiefiles.github.io/lottie-docs/text/#font-list).

### [#](https://dotlottie.io/spec/2.0/#asset-reference) Asset Reference

When creating a dotLottie file its Lottie animations can reference assets in the following ways:

1. **Assets Extracted**: Assets from all animations can be extracted and placed in the appropriate directories (`i/`). This approach:

   * Allows multiple animations to reference the same assets without duplication
   * Reduces the overall file size when animations share common assets
   * Makes asset management more organized
2. **Assets Inlined**: Assets can remain embedded in the Lottie animations as Data URIs. This approach:

   * Maintains the original Lottie file structure
   * May result in larger file sizes if assets are duplicated
   * Is simpler for single-animation dotLottie files

> **Note**: Extracting and centralizing assets is recommended but not mandatory. The benefit becomes significant when multiple animations share the same assets.

## animation-with-image.lottie

### Contents

Loading...

Loading dotLottie file...

## [#](https://dotlottie.io/spec/2.0/#themes) Themes

Themes are optional JSON files stored in the `t/` directory. Each theme defines how to override the values of animated properties in a Lottie animation.

A dotLottie theme is made up of **rules** that are mapped at runtime to [Lottie Slots (opens new window)](https://lottie.github.io/lottie-spec/1.0/specs/helpers/#slots). Lottie Slots are a feature of the Lottie spec that lets you override some animated properties, but every property you want to theme must first be given a unique **slot ID**. Only properties with a slot ID can be targeted by theme rules.

**Theme System Behavior:**

* `SetTheme` actions require the theme to exist in the manifest and be compatible with the current animation
* Dynamic theme loading and theme inheritance are not supported
* Theme changes apply to the renderer immediately; unknown themes are rejected during validation
* Named colors are not supported; color validation is renderer-backed

Supported themeable [Lottie properties (opens new window)](https://lottie.github.io/lottie-spec/1.0/specs/properties/#properties) type:

* **Color** (e.g., Fill, Stroke Color, Text Color)
* **Vector** (e.g., Scale, Size, ..etc)
* **Scalar** (e.g., Stroke Width, Opacity, Rotation, ..etc)
* **Position** (e.g., Position, Anchor Point, Gradient Start Point, Gradient End Point)
* **Gradient** (e.g., Gradient Color)
* **Image** (e.g., Image Asset)
* **Text** (e.g., Text Document properties)

Example dotLottie with theme assets:

## animation.lottie

### Contents

Loading...

Loading dotLottie file...

### [#](https://dotlottie.io/spec/2.0/#theme-format) Theme Format

The theme is an array of rules, each rule describes how to override a specific animated property.

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `rules` | â yes | Array<[Rule](https://dotlottie.io/spec/2.0/#rule)> | List of property overrides. Each entry targets exactly one slotted Lottie property. |

### [#](https://dotlottie.io/spec/2.0/#rule) Rule

A rule is the core building block of a theme. Each rule targets a specific property in a Lottie animation that has been designated with a slot ID.

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `id` | â yes | String | Slot ID inside the Lottie animation that this rule will override. Case-sensitive. |
| `type` | â yes | `"Color"`, `"Scalar"`, `"Position"`, `"Vector"`, `"Gradient"`, `"Image"`, or `"Text"` | Declares which type of rule to use, matching the Lottie property type that is being overridden. |
| `animations` | no | Array of animation IDs (strings) | Limit the rule to specific animations in a multi-animation package. If omitted, the rule applies to *all* animations. |
| `value` | yes\* | See per-type tables | Static override value that replaces the original property value. Required if `keyframes` is not provided. |
| `keyframes` | yes\* | Array of type-specific Keyframe objects | Time-varying override. Required if `value` is not provided. When present, takes precedence over `value`. |
| `expression` | no | String | Lottie Expression to evaluate, offering a programmatic way to define dynamic values. |

\* Either `value` or `keyframes` must be provided, but not both.

### [#](https://dotlottie.io/spec/2.0/#expression-system) Expression System

The `expression` field in theme rules enables dynamic property values using Lottie expressions. Expressions are JavaScript-like scripts based on the Adobe After Effects expression language that can create time-based, interactive, or calculated property overrides.

**Expression Behavior:**

* Expressions take precedence over both `value` and `keyframes` when present
* Expressions are evaluated continuously during animation playback
* The expression result must match the expected data type for the rule (Color, Scalar, Vector, etc.)
* Invalid expressions should fallback to the original property value

**Available Global Objects:**

* `time`: Current animation time in seconds from the start of the animation
* `value`: Original property value from the Lottie animation (before theming)
* `thisComp`: Reference to the current composition
* `thisLayer`: Reference to the current layer (if applicable)

**Built-in Functions:**

* **Math**: `Math.sin()`, `Math.cos()`, `Math.PI`, `Math.random()`, etc.
* **Interpolation**: `linear(t, value1, value2)` - Linear interpolation between two values
* **Conversion**: `degreesToRadians(degrees)`, `timeToFrames(time, fps)`
* **Utilities**: `clamp(value, min, max)`, `ease(t, value1, value2)`

**Expression Syntax:**
All expressions must declare and return a value using the `$bm_rt` variable:

```javascript
var $bm_rt;
// Your expression logic here
$bm_rt = calculatedValue;
```

#### [#](https://dotlottie.io/spec/2.0/#expression-examples) Expression Examples

**Time-based Color Animation:**

```json
{
  "id": "background_color",
  "type": "Color",
  "expression": "var $bm_rt; var t = Math.sin(time * 2); $bm_rt = [0.5 + t * 0.5, 0.3, 0.8];"
}
```

**Dynamic Opacity Based on Time:**

```json
{
  "id": "fade_opacity",
  "type": "Scalar",
  "expression": "var $bm_rt; $bm_rt = Math.abs(Math.sin(time)) * 100;"
}
```

**Position Following Circular Path:**

```json
{
  "id": "circular_position",
  "type": "Position",
  "expression": "var $bm_rt; var radius = 100; $bm_rt = [value[0] + Math.cos(time) * radius, value[1] + Math.sin(time) * radius];"
}
```

**Scale with Bounce Effect:**

```json
{
  "id": "bounce_scale",
  "type": "Vector",
  "expression": "var $bm_rt; var bounce = 1 + Math.sin(time * 6) * 0.1; $bm_rt = [bounce, bounce];"
}
```

**Expression Reference:**
For comprehensive documentation on Lottie expressions, including advanced functions, mathematical operations, and detailed syntax specifications, refer to the official Lottie expressions documentation:

* **Lottie Expressions Documentation**: https://lottiefiles.github.io/lottie-docs/expressions/

### [#](https://dotlottie.io/spec/2.0/#color-rule) Color Rule

A Color rule overrides color properties in the Lottie animation, such as fill colors, stroke colors, or text colors.

| Field (in addition to common) | Required | Value type | Notes |
| --- | --- | --- | --- |
| `id` | â yes | String | Slot ID inside the Lottie animation. Case-sensitive. |
| `type` | â yes | `"Color"` | Identifies this as a Color rule. |
| `value` | yes\* | Array of 3 numbers in **0-1** range: `[R, G, B]` | Static Color represented as normalized RGB values. Required if `keyframes` is not provided. |
| `keyframes` | yes\* | Array<[Color Keyframe](https://dotlottie.io/spec/2.0/#color-keyframe)> | Use instead of `value` for animated color transitions. Required if `value` is not provided. |

### [#](https://dotlottie.io/spec/2.0/#color-keyframe) Color Keyframe

Color keyframes define how a color changes over time, allowing for smooth transitions between different colors.

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `frame` | â yes | Number | Timeline position in animation frames where this color should be applied. |
| `value` | â yes | Array of 3 numbers in **0-1** range: `[R, G, B]` | Color value at this keyframe, represented as normalized RGB values. |
| `inTangent` | no | Object  `x`: number or number[]  `y`: number or number[] | Incoming BÃ©zier handle that controls how animation eases into this keyframe (same format as Lottie, see [Lottie spec (opens new window)](https://lottie.github.io/lottie-spec/1.0/specs/properties/#easing-handle)). |
| `outTangent` | no | Object  `x`: number or number[]  `y`: number or number[] | Outgoing BÃ©zier handle that controls how animation eases out of this keyframe (same format as Lottie, see [Lottie spec (opens new window)](https://lottie.github.io/lottie-spec/1.0/specs/properties/#easing-handle)). |
| `hold` | no | Boolean | When `true`, the value doesn't interpolate to the next keyframe but holds until the next frame is reached. |

### [#](https://dotlottie.io/spec/2.0/#color-rule-example) Color Rule Example

## rect.lottie

### Contents

Loading...

Loading dotLottie file...

### [#](https://dotlottie.io/spec/2.0/#scalar-rule) Scalar Rule

A Scalar rule overrides numeric properties in the Lottie animation, such as opacity, stroke width, rotation, or other single-value properties.

| Field (in addition to common) | Required | Value type | Notes |
| --- | --- | --- | --- |
| `id` | â yes | String | Slot ID inside the Lottie animation. Case-sensitive. |
| `type` | â yes | `"Scalar"` | Identifies this as a Scalar rule. |
| `value` | yes\* | Number | Static numeric value (opacity, stroke width, etc). Required if `keyframes` is not provided. |
| `keyframes` | yes\* | Array<[Scalar Keyframe](https://dotlottie.io/spec/2.0/#scalar-keyframe)> | Use instead of `value` for animated numeric properties over time. Required if `value` is not provided. |

### [#](https://dotlottie.io/spec/2.0/#scalar-keyframe) Scalar Keyframe

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `frame` | â yes | Number | Timeline position in animation frames. |
| `value` | â yes | Number | Numeric value at this frame. |
| `inTangent` | no | Object  `x`: number or number[]  `y`: number or number[] | Incoming BÃ©zier handle (same format as Lottie, see [Lottie spec (opens new window)](https://lottie.github.io/lottie-spec/1.0/specs/properties/#easing-handle) . |
| `outTangent` | no | Object  `x`: number or number[]  `y`: number or number[] | Outgoing BÃ©zier handle. (same format as Lottie, see [Lottie spec (opens new window)](https://lottie.github.io/lottie-spec/1.0/specs/properties/#easing-handle) . |
| `hold` | no | Boolean | `true` = step-hold at this key. |

### [#](https://dotlottie.io/spec/2.0/#scalar-rule-example) Scalar Rule Example

This example shows the opacity change using scalar rule, there are other types of scalar properties that can be animated like `stroke width`, `rotation`, `scale`, etc, please refer to the [Lottie spec (opens new window)](https://lottie.github.io/lottie-spec/1.0/specs/properties/#scalar-property) for more details.

## opacity.lottie

### Contents

Loading...

Loading dotLottie file...

## rotation.lottie

### Contents

Loading...

Loading dotLottie file...

### [#](https://dotlottie.io/spec/2.0/#position-rule) Position Rule

A Position rule overrides position properties in the Lottie animation, controlling where elements are located.

| Field (in addition to common) | Required | Value type | Notes |
| --- | --- | --- | --- |
| `id` | â yes | String | Slot ID inside the Lottie animation. Case-sensitive. |
| `type` | â yes | `"Position"` | Identifies this as a Position rule. |
| `value` | yes\* | Array `[x, y]` or `[x, y, z]` | Static position coordinates. Requires 2D or 3D coordinates. Required if `keyframes` is not provided. |
| `keyframes` | yes\* | Array<[Position Keyframe](https://dotlottie.io/spec/2.0/#position-keyframe)> | Animated position curve for movement over time. Required if `value` is not provided. |

### [#](https://dotlottie.io/spec/2.0/#position-keyframe) Position Keyframe

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `frame` | â yes | Number | Timeline position in animation frames. |
| `value` | â yes | Array `[x, y]` or `[x, y, z]` | Position at this frame. |
| `inTangent` | no | Object  `x`: number or number[]  `y`: number or number[] | Incoming BÃ©zier handle (same format as Lottie, see [Lottie spec (opens new window)](https://lottie.github.io/lottie-spec/1.0/specs/properties/#easing-handle) . |
| `outTangent` | no | Object  `x`: number or number[]  `y`: number or number[] | Outgoing BÃ©zier handle. (same format as Lottie, see [Lottie spec (opens new window)](https://lottie.github.io/lottie-spec/1.0/specs/properties/#easing-handle) . |
| `hold` | no | Boolean | `true` = step-hold at this key. |
| `valueInTangent` | no | Number[] | Tangent for values (eg: moving position around a curved path) |
| `valueOutTangent` | no | Number[] | Tangent for values (eg: moving position around a curved path) |

### [#](https://dotlottie.io/spec/2.0/#position-rule-example) Position Rule Example

## position.lottie

### Contents

Loading...

Loading dotLottie file...

### [#](https://dotlottie.io/spec/2.0/#vector-rule) Vector Rule

A Vector rule overrides vector properties in the Lottie animation, such as scale, size, or other properties that require two coordinated values.

| Field (in addition to common) | Required | Value type | Notes |
| --- | --- | --- | --- |
| `id` | â yes | String | Slot ID inside the Lottie animation. Case-sensitive. |
| `type` | â yes | `"Vector"` | Identifies this as a Vector rule. |
| `value` | yes\* | Array of numbers `[x, y]` | Static vector value (scale, size, etc). Requires two coordinates. Required if `keyframes` is not provided. |
| `keyframes` | yes\* | Array<[Vector Keyframe](https://dotlottie.io/spec/2.0/#vector-keyframe)> | Use instead of `value` for animated vectors that change over time. Required if `value` is not provided. |

### [#](https://dotlottie.io/spec/2.0/#vector-keyframe) Vector Keyframe

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `frame` | â yes | Number | Timeline position in animation frames. |
| `value` | â yes | Array of numbers `[x, y]` | Vector value at this frame. |
| `inTangent` | no | Object  `x`: number or number[]  `y`: number or number[] | Incoming BÃ©zier handle (same format as Lottie, see [Lottie spec (opens new window)](https://lottie.github.io/lottie-spec/1.0/specs/properties/#easing-handle) . |
| `outTangent` | no | Object  `x`: number or number[]  `y`: number or number[] | Outgoing BÃ©zier handle. (same format as Lottie, see [Lottie spec (opens new window)](https://lottie.github.io/lottie-spec/1.0/specs/properties/#easing-handle) . |
| `hold` | no | Boolean | `true` = step-hold at this key. |

## scale.lottie

### Contents

Loading...

Loading dotLottie file...

### [#](https://dotlottie.io/spec/2.0/#gradient-rule) Gradient Rule

A Gradient rule overrides gradient properties in the Lottie animation, such as gradient fills or strokes, defining multiple color stops along a path.

| Field (in addition to common) | Required | Value type | Notes |
| --- | --- | --- | --- |
| `id` | â yes | String | Slot ID inside the Lottie animation. Case-sensitive. |
| `type` | â yes | `"Gradient"` | Identifies this as a Gradient rule. |
| `value` | yes\* | Array<[Gradient Stop](https://dotlottie.io/spec/2.0/#gradient-stop)> | Static gradient with multiple color stops. Required if `keyframes` is not provided. |
| `keyframes` | yes\* | Array<[Gradient Keyframe](https://dotlottie.io/spec/2.0/#gradient-keyframe)> | Animated gradient that changes over time. Required if `value` is not provided. |

### [#](https://dotlottie.io/spec/2.0/#gradient-stop) Gradient Stop

A Gradient Stop defines a color at a specific position along the gradient line.

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `color` | â yes | Array `[R,G,B]` or `[R,G,B,A]` (0-1 floats) | Color value at this stop, as normalized RGB or RGBA values (0-1 range). |
| `offset` | â yes | Number 0-1 | Position along the gradient line, normalized from 0 (start) to 1 (end). |

### [#](https://dotlottie.io/spec/2.0/#gradient-keyframe) Gradient Keyframe

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `frame` | â yes | Number | Timeline position in animation frames. |
| `value` | â yes | Array of<[Gradient Stop](https://dotlottie.io/spec/2.0/#gradient-stop)> | Gradient configuration at this frame. |
| `inTangent` | no | Object  `x`: number or number[]  `y`: number or number[] | Incoming BÃ©zier handle (same format as Lottie, see [Lottie spec (opens new window)](https://lottie.github.io/lottie-spec/1.0/specs/properties/#easing-handle) . |
| `outTangent` | no | Object  `x`: number or number[]  `y`: number or number[] | Outgoing BÃ©zier handle. (same format as Lottie, see [Lottie spec (opens new window)](https://lottie.github.io/lottie-spec/1.0/specs/properties/#easing-handle) . |
| `hold` | no | Boolean | `true` = step-hold at this key. |

### [#](https://dotlottie.io/spec/2.0/#gradient-rule-example) Gradient Rule Example

## gradient.lottie

### Contents

Loading...

Loading dotLottie file...

### [#](https://dotlottie.io/spec/2.0/#image-rule) Image Rule

An Image rule overrides image assets in the Lottie animation, allowing for dynamic replacement of images.

| Field (in addition to common) | Required | Value type | Description |
| --- | --- | --- | --- |
| `id` | â yes | String | Slot ID inside the Lottie animation. Case-sensitive. |
| `type` | â yes | `"Image"` | Identifies this as an Image rule. |
| `value` | â yes | Object<[Image Value](https://dotlottie.io/spec/2.0/#image-value)> | Replacement image configuration. |

### [#](https://dotlottie.io/spec/2.0/#image-value) Image Value

Image Value defines the replacement image to use: a file bundled in the dotLottie package, a remote URL, or an inline data URI.

| Field | Required | Value type | Notes |
| --- | --- | --- | --- |
| `src` | â yes | String | Source of the replacement image. One of: a file in the package `i/` folder referenced by its bare filename, without the `i/` prefix (e.g. `logo_dark.png` â `/i/logo_dark.png`); an `http(s)://` URL; or a `data:` URI. |
| `width` | no | Number (pixels) | Declared source width of the replacement (the slot's `w`). If omitted, the image's natural width is used. |
| `height` | no | Number (pixels) | Declared source height of the replacement (the slot's `h`). If omitted, the image's natural height is used. |

> **Resolution.** The runtime selects the source by `src`'s prefix: `data:` â inline embedded image; `http://` or `https://` â remote image (fetched when the theme is applied); otherwise â a file in the package `i/` folder, matched by name.
>
> Writers must emit the bare filename (`logo_dark.png`, not `i/logo_dark.png`).

### [#](https://dotlottie.io/spec/2.0/#text-rule) Text Rule

A Text rule overrides text document properties in the Lottie animation, allowing for dynamic control of text content, styling, and formatting.

| Field (in addition to common) | Required | Value type | Description |
| --- | --- | --- | --- |
| `id` | â yes | String | Slot ID inside the Lottie animation. Case-sensitive. |
| `type` | â yes | `"Text"` | Identifies this as a Text rule. |
| `value` | yes\* | Object<[Text Document](https://dotlottie.io/spec/2.0/#text-document)> | Static text document configuration. Required if `keyframes` is not provided. |
| `keyframes` | yes\* | Array<[Text Keyframe](https://dotlottie.io/spec/2.0/#text-keyframe)> | Animated text document that changes over time. Required if `value` is not provided. |

### [#](https://dotlottie.io/spec/2.0/#text-document) Text Document

Text Document defines the comprehensive styling and content configuration for text layers.

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `text` | no | String | The text content to display. |
| `fontName` | no | String | Name of the font family to use. |
| `fontSize` | no | Number | Font size in points. |
| `fillColor` | no | Array of 3 or 4 numbers in **0-1** range: `[R, G, B]` or `[R, G, B, A]` | Text fill color as normalized RGB or RGBA values. |
| `strokeColor` | no | Array of 3 or 4 numbers in **0-1** range: `[R, G, B]` or `[R, G, B, A]` | Text stroke color as normalized RGB or RGBA values. |
| `strokeWidth` | no | Number | Width of the text stroke in pixels. |
| `strokeOverFill` | no | Boolean | When `true`, stroke is rendered over the fill. When `false`, fill is rendered over stroke. |
| `lineHeight` | no | Number | Line height spacing multiplier (e.g., 1.2 for 120% line height). |
| `tracking` | no | Number | Letter spacing adjustment in 1/1000 em units. |
| `justify` | no | `"Left"`, `"Right"`, `"Center"`, `"JustifyLastLeft"`, `"JustifyLastRight"`, `"JustifyLastCenter"`, `"JustifyLastFull"` | Text alignment and justification mode. |
| `textCaps` | no | `"Regular"`, `"AllCaps"`, or `"SmallCaps"` | Text capitalization style. |
| `baselineShift` | no | Number | Vertical offset from the baseline in pixels (positive = up, negative = down). |
| `wrapSize` | no | Array of 2 numbers: `[width, height]` | Bounding box dimensions for text wrapping in pixels. |
| `wrapPosition` | no | Array of 2 numbers: `[x, y]` | Position of the text wrap bounding box origin. |

### [#](https://dotlottie.io/spec/2.0/#text-keyframe) Text Keyframe

Text keyframes allow text properties to change over time during animation playback.

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `frame` | â yes | Number | Timeline position in animation frames where this text should be applied. |
| `value` | â yes | Object<[Text Document](https://dotlottie.io/spec/2.0/#text-document)> | Text document configuration at this frame. |

### [#](https://dotlottie.io/spec/2.0/#text-rule-example) Text Rule Example

```json
{
  "id": "title_text",
  "type": "Text",
  "value": {
    "text": "Hello World",
    "fontName": "Arial-Bold",
    "fontSize": 48,
    "fillColor": [1, 0, 0],
    "strokeColor": [0, 0, 0],
    "strokeWidth": 2,
    "strokeOverFill": false,
    "lineHeight": 1.2,
    "tracking": 50,
    "justify": "Center",
    "textCaps": "Regular"
  }
}
```

**Animated Text Example:**

```json
{
  "id": "animated_text",
  "type": "Text",
  "keyframes": [
    {
      "frame": 0,
      "value": {
        "text": "Start",
        "fillColor": [1, 0, 0]
      }
    },
    {
      "frame": 30,
      "value": {
        "text": "End",
        "fillColor": [0, 1, 0]
      }
    }
  ]
}
```

### [#](https://dotlottie.io/spec/2.0/#theme-json-schema) Theme JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "dotLottie Theme Schema",
  "description": "Schema for theme files in a dotLottie archive",
  "type": "object",
  "required": ["rules"],
  "properties": {
    "rules": {
      "type": "array",
      "description": "List of property overrides",
      "items": {
        "type": "object",
        "oneOf": [
          { "$ref": "#/definitions/ColorRule" },
          { "$ref": "#/definitions/ScalarRule" },
          { "$ref": "#/definitions/VectorRule" },
          { "$ref": "#/definitions/PositionRule" },
          { "$ref": "#/definitions/GradientRule" },
          { "$ref": "#/definitions/ImageRule" },
          { "$ref": "#/definitions/TextRule" }
        ]
      }
    }
  },
  "definitions": {
    "Tangent": {
      "type": "object",
      "properties": {
        "x": {
          "oneOf": [
            { "type": "number" },
            { "type": "array", "items": { "type": "number" } }
          ],
          "description": "X-component of the BÃ©zier handle that controls animation easing."
        },
        "y": {
          "oneOf": [
            { "type": "number" },
            { "type": "array", "items": { "type": "number" } }
          ],
          "description": "Y-component of the BÃ©zier handle that controls animation easing."
        }
      },
      "description": "BÃ©zier handle defining how animation eases between keyframes."
    },
    "BaseKeyframe": {
      "type": "object",
      "required": ["frame"],
      "properties": {
        "frame": {
          "type": "number",
          "description": "Timeline position in animation frames where this keyframe should be applied."
        },
        "inTangent": {
          "$ref": "#/definitions/Tangent",
          "description": "Incoming BÃ©zier handle that controls how animation eases into this keyframe."
        },
        "outTangent": {
          "$ref": "#/definitions/Tangent",
          "description": "Outgoing BÃ©zier handle that controls how animation eases out of this keyframe."
        },
        "hold": {
          "type": "boolean",
          "description": "When true, the value doesn't interpolate to the next keyframe but holds until the next frame is reached."
        }
      },
      "description": "Base properties for all keyframe types that define timing and easing."
    },
    "BaseRule": {
      "type": "object",
      "required": ["id", "type"],
      "properties": {
        "id": {
          "type": "string",
          "description": "Slot ID inside the Lottie animation that this rule will override. Case-sensitive."
        },
        "animations": {
          "type": "array",
          "items": { "type": "string" },
          "description": "Limit the rule to specific animations in a multi-animation package. If omitted, the rule applies to all animations."
        },
        "expression": {
          "type": "string",
          "description": "Lottie Expression to evaluate, offering a programmatic way to define dynamic values."
        }
      }
    },
    "ScalarKeyframe": {
      "allOf": [
        { "$ref": "#/definitions/BaseKeyframe" },
        {
          "type": "object",
          "required": ["value"],
          "properties": {
            "value": {
              "type": "number",
              "description": "Numeric value at this keyframe."
            }
          }
        }
      ]
    },
    "ColorKeyframe": {
      "allOf": [
        { "$ref": "#/definitions/BaseKeyframe" },
        {
          "type": "object",
          "required": ["value"],
          "properties": {
            "value": {
              "type": "array",
              "items": { "type": "number" },
              "minItems": 3,
              "maxItems": 4,
              "description": "Color value at this keyframe, represented as normalized RGB or RGBA values (0-1 range)."
            }
          }
        }
      ]
    },
    "VectorKeyframe": {
      "allOf": [
        { "$ref": "#/definitions/BaseKeyframe" },
        {
          "type": "object",
          "required": ["value"],
          "properties": {
            "value": {
              "type": "array",
              "items": { "type": "number" },
              "description": "Vector value at this keyframe."
            }
          }
        }
      ]
    },
    "PositionKeyframe": {
      "allOf": [
        { "$ref": "#/definitions/BaseKeyframe" },
        {
          "type": "object",
          "required": ["value"],
          "properties": {
            "value": {
              "type": "array",
              "items": { "type": "number" },
              "minItems": 2,
              "maxItems": 3,
              "description": "Position coordinates at this keyframe."
            },
            "inTangent": {
              "type": "array",
              "items": { "type": "number" },
              "description": "Incoming tangent for spatial interpolation."
            },
            "outTangent": {
              "type": "array",
              "items": { "type": "number" },
              "description": "Outgoing tangent for spatial interpolation."
            }
          }
        }
      ]
    },
    "GradientStop": {
      "type": "object",
      "required": ["color", "offset"],
      "properties": {
        "color": {
          "type": "array",
          "items": { "type": "number" },
          "minItems": 3,
          "maxItems": 4,
          "description": "Color value at this stop, as normalized RGB or RGBA values (0-1 range)."
        },
        "offset": {
          "type": "number",
          "minimum": 0,
          "maximum": 1,
          "description": "Position along the gradient line, normalized from 0 (start) to 1 (end)."
        }
      }
    },
    "GradientKeyframe": {
      "allOf": [
        { "$ref": "#/definitions/BaseKeyframe" },
        {
          "type": "object",
          "required": ["value"],
          "properties": {
            "value": {
              "type": "array",
              "items": { "$ref": "#/definitions/GradientStop" },
              "description": "Gradient configuration at this keyframe."
            }
          }
        }
      ]
    },
    "ImageValue": {
      "type": "object",
      "required": ["src"],
      "properties": {
        "src": {
          "type": "string",
          "description": "Source of the replacement image: a file in the package `i/` folder referenced by its bare filename without the `i/` prefix (e.g. `logo_dark.png`), an HTTP/HTTPS URL, or a `data:` URI."
        },
        "width": {
          "type": "number",
          "description": "Declared source width in pixels of the replacement image. If omitted, the image's natural width is used."
        },
        "height": {
          "type": "number",
          "description": "Declared source height in pixels of the replacement image. If omitted, the image's natural height is used."
        }
      }
    },
    "ScalarRule": {
      "allOf": [
        { "$ref": "#/definitions/BaseRule" },
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "const": "Scalar"
            },
            "value": {
              "type": "number",
              "description": "Static numeric value (opacity, stroke width, etc)"
            },
            "keyframes": {
              "type": "array",
              "items": { "$ref": "#/definitions/ScalarKeyframe" },
              "description": "Animated numeric properties that change over time"
            }
          },
          "oneOf": [{ "required": ["value"] }, { "required": ["keyframes"] }]
        }
      ]
    },
    "ColorRule": {
      "allOf": [
        { "$ref": "#/definitions/BaseRule" },
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "const": "Color"
            },
            "value": {
              "type": "array",
              "items": { "type": "number" },
              "minItems": 3,
              "maxItems": 4,
              "description": "Static color represented as normalized RGB or RGBA values (0-1 range)"
            },
            "keyframes": {
              "type": "array",
              "items": { "$ref": "#/definitions/ColorKeyframe" },
              "description": "Animated color transitions over time"
            }
          },
          "oneOf": [{ "required": ["value"] }, { "required": ["keyframes"] }]
        }
      ]
    },
    "PositionRule": {
      "allOf": [
        { "$ref": "#/definitions/BaseRule" },
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "const": "Position"
            },
            "value": {
              "type": "array",
              "items": { "type": "number" },
              "minItems": 2,
              "maxItems": 3,
              "description": "Static position coordinates in 2D [x,y] or 3D [x,y,z] format"
            },
            "keyframes": {
              "type": "array",
              "items": { "$ref": "#/definitions/PositionKeyframe" },
              "description": "Animated position curve for movement over time"
            }
          },
          "oneOf": [{ "required": ["value"] }, { "required": ["keyframes"] }]
        }
      ]
    },
    "GradientRule": {
      "allOf": [
        { "$ref": "#/definitions/BaseRule" },
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "const": "Gradient"
            },
            "value": {
              "type": "array",
              "items": { "$ref": "#/definitions/GradientStop" },
              "description": "Static gradient with multiple color stops"
            },
            "keyframes": {
              "type": "array",
              "items": { "$ref": "#/definitions/GradientKeyframe" },
              "description": "Animated gradient that changes over time"
            }
          },
          "oneOf": [{ "required": ["value"] }, { "required": ["keyframes"] }]
        }
      ]
    },
    "ImageRule": {
      "allOf": [
        { "$ref": "#/definitions/BaseRule" },
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "const": "Image"
            },
            "value": {
              "$ref": "#/definitions/ImageValue",
              "description": "Replacement image configuration"
            }
          },
          "required": ["value"],
          "not": {
            "anyOf": [{ "required": ["expression"] }, { "required": ["keyframes"] }]
          }
        }
      ]
    },
    "TextRule": {
      "allOf": [
        { "$ref": "#/definitions/BaseRule" },
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "const": "Text"
            },
            "value": {
              "$ref": "#/definitions/TextDocument",
              "description": "Static text document configuration"
            },
            "keyframes": {
              "type": "array",
              "items": { "$ref": "#/definitions/TextKeyframe" },
              "description": "Animated text document that changes over time"
            }
          },
          "oneOf": [
            { "required": ["value"] },
            { "required": ["keyframes"] }
          ]
        }
      ]
    },
    "TextDocument": {
      "type": "object",
      "properties": {
        "text": {
          "type": "string",
          "description": "The text content to display"
        },
        "fontName": {
          "type": "string",
          "description": "Name of the font family to use"
        },
        "fontSize": {
          "type": "number",
          "description": "Font size in points"
        },
        "fillColor": {
          "type": "array",
          "items": { "type": "number", "minimum": 0, "maximum": 1 },
          "minItems": 3,
          "maxItems": 4,
          "description": "Text fill color as normalized RGB or RGBA values"
        },
        "strokeColor": {
          "type": "array",
          "items": { "type": "number", "minimum": 0, "maximum": 1 },
          "minItems": 3,
          "maxItems": 4,
          "description": "Text stroke color as normalized RGB or RGBA values"
        },
        "strokeWidth": {
          "type": "number",
          "description": "Width of the text stroke in pixels"
        },
        "strokeOverFill": {
          "type": "boolean",
          "description": "When true, stroke is rendered over the fill"
        },
        "lineHeight": {
          "type": "number",
          "description": "Line height spacing multiplier"
        },
        "tracking": {
          "type": "number",
          "description": "Letter spacing adjustment in 1/1000 em units"
        },
        "justify": {
          "type": "string",
          "enum": ["Left", "Right", "Center", "JustifyLastLeft", "JustifyLastRight", "JustifyLastCenter", "JustifyLastFull"],
          "description": "Text alignment and justification mode"
        },
        "textCaps": {
          "type": "string",
          "enum": ["Regular", "AllCaps", "SmallCaps"],
          "description": "Text capitalization style"
        },
        "baselineShift": {
          "type": "number",
          "description": "Vertical offset from the baseline in pixels"
        },
        "wrapSize": {
          "type": "array",
          "items": { "type": "number" },
          "minItems": 2,
          "maxItems": 2,
          "description": "Bounding box dimensions for text wrapping [width, height]"
        },
        "wrapPosition": {
          "type": "array",
          "items": { "type": "number" },
          "minItems": 2,
          "maxItems": 2,
          "description": "Position of the text wrap bounding box origin [x, y]"
        }
      }
    },
    "TextKeyframe": {
      "type": "object",
      "required": ["frame", "value"],
      "properties": {
        "frame": {
          "type": "number",
          "description": "Timeline position in animation frames"
        },
        "value": {
          "$ref": "#/definitions/TextDocument",
          "description": "Text document configuration at this frame"
        }
      }
    }
  }
}
```

## [#](https://dotlottie.io/spec/2.0/#state-machines) State Machines

State machines are optional JSON files stored in the `s/` directory. Each state machine defines a set of states, transitions between those states, and the conditions and actions that should occur during state transitions.

A dotLottie state machine controls animation playback and interactivity through a finite state machine model. Each state machine is made up of **states** that control animation playback, **transitions** that define how to move between states, **guards** that control when transitions occur, and **actions** that execute during transitions.

Quick examples:

## star-rating.lottie

### Contents

Loading...

Loading dotLottie file...

> Star rating interactive example.

## toggle.lottie

### Contents

Loading...

Loading dotLottie file...

> Toggle between two different states.

## hover.lottie

### Contents

Loading...

Loading dotLottie file...

> Hover over the animation to see the state machine in action.

## smiley\_slider.lottie

### Contents

Loading...

Loading dotLottie file...

> Click on any emoji to see the state machine in action.

### [#](https://dotlottie.io/spec/2.0/#state-machine-format) State Machine Format

Each state machine file must conform to the following structure:

```json
{
  "initial": "stateName",
  "states": [
    {
      "name": "stateName",
      "type": "PlaybackState",
      "animation": "animation_id",
      "transitions": [
        {
          "type": "Transition",
          "toState": "anotherState",
          "guards": []
        }
      ]
    }
  ],
  "interactions": [],
  "inputs": []
}
```

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `initial` | â yes | String | The initial state to enter when the state machine is started |
| `states` | â yes | Array of [State](https://dotlottie.io/spec/2.0/#state) objects | List of states in the state machine |
| `interactions` | no | Array of [Interaction](https://dotlottie.io/spec/2.0/#interaction) objects | List of interactions that can trigger actions |
| `inputs` | no | Array of [Input](https://dotlottie.io/spec/2.0/#input) objects | List of input variables used by the state machine |

### [#](https://dotlottie.io/spec/2.0/#state) State

A state represents a specific configuration of the state machine. There are two types of states:

1. **PlaybackState**: Controls the playback of a specific animation
2. **GlobalState**: Represents a special state type that acts as an override mechanism. It's transitions are checked first regardless of the current state, allowing to define global behaviors without duplicating transitions across multiple states.

#### [#](https://dotlottie.io/spec/2.0/#playbackstate) PlaybackState

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `name` | â yes | String | Unique identifier for the state, used to reference this state in transitions and interactions |
| `type` | â yes | `"PlaybackState"` | Specifies that this state controls animation playback |
| `animation` | â yes | String | ID of the animation to play in this state, corresponding to a file in the 'a/' directory |
| `loop` | no | Boolean | When true, the animation will continuously repeat from start to end |
| `loopCount` | no | Integer (â¥ 1) | Total number of loop iterations when `loop` is true. If omitted, loops infinitely. Ignored when `loop` is false |
| `autoplay` | no | Boolean | When true, the animation will start playing immediately when entering this state |
| `final` | no | Boolean | When true, this state cannot transition to other states, effectively ending the state machine |
| `mode` | no | "Forward" | "Reverse" | "Bounce" | "ReverseBounce" | Controls the direction and behavior of animation playback: Forward (normal), Reverse (backwards), Bounce (forward then reverse), or ReverseBounce (reverse then forward) |
| `speed` | no | Number | Multiplier for the animation's playback speed (1.0 is normal speed, 2.0 is twice as fast, 0.5 is half speed) |
| `segment` | no | String | Name of a Lottie marker that defines the frame range to play, resolved via the marker's start frame and duration. If the named marker is missing, playback falls back to the full animation range. |
| `backgroundColor` | no | Number (u32) | Background color for the animation as a u32 RGBA representation (e.g., 0xFFFFFFFF for opaque white) |
| `entryActions` | no | Array<[Action](https://dotlottie.io/spec/2.0/#action)> | List of actions to execute when transitioning into this state |
| `exitActions` | no | Array<[Action](https://dotlottie.io/spec/2.0/#action)> | List of actions to execute when transitioning out of this state |
| `transitions` | â yes | Array<[Transition](https://dotlottie.io/spec/2.0/#transition)> | Rules defining when and how this state can transition to other states |

#### [#](https://dotlottie.io/spec/2.0/#globalstate) GlobalState

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `name` | â yes | String | Unique identifier for the global state, used to reference this state in transitions and interactions |
| `type` | â yes | `"GlobalState"` | Specifies that this state can override behaviors across all other states |
| `entryActions` | no | Array<[Action](https://dotlottie.io/spec/2.0/#action)> | List of actions to execute when transitioning into this global state, which can override current state behavior |
| `exitActions` | no | Array<[Action](https://dotlottie.io/spec/2.0/#action)> | List of actions to execute when transitioning out of this global state |
| `transitions` | â yes | Array<[Transition](https://dotlottie.io/spec/2.0/#transition)> | Rules defining when and how this global state can transition to other states, taking precedence over regular state transitions |

### [#](https://dotlottie.io/spec/2.0/#transition) Transition

Transitions define how to move from one state to another. There are two types of transitions:

1. **Transition**: An immediate state change
2. **Tweened**: A gradual state change with animation

**Transition Evaluation Behavior:**

* Transitions are evaluated in their declaration order within a state's transitions array
* The first transition whose guards all evaluate to true will fire
* Guardless transitions act as fallbacks and are checked after guarded ones within the same transition list
* All guards on a single transition are ANDed together (all must pass for the transition to occur)

#### [#](https://dotlottie.io/spec/2.0/#transition-2) Transition

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"Transition"` | Specifies an immediate state transition |
| `toState` | â yes | String | Name of the target state to transition to |
| `guards` | no | Array<[Guard](https://dotlottie.io/spec/2.0/#guard)> | List of conditions that must all be satisfied for this transition to occur |

#### [#](https://dotlottie.io/spec/2.0/#tweened-transition) Tweened Transition

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"Tweened"` | Specifies a gradual state transition with animation over time |
| `toState` | â yes | String | Name of the target state to transition to |
| `guards` | no | Array<[Guard](https://dotlottie.io/spec/2.0/#guard)> | List of conditions that must all be satisfied for this transition to occur |
| `duration` | â yes | Number | Duration of the transition animation in seconds |
| `easing` | â yes | Array<[Number, Number, Number, Number]> | Cubic BÃ©zier curve control points [x1, y1, x2, y2] defining the easing function for the transition animation |

**Tween Behavior:**

* Input modifications that would change state are ignored/blocked during tween execution
* The target state is saved and applied only after tween completion, then entry actions run
* While tweening, the state machine doesn't evaluate new transitions
* Tween timing uses its own duration/easing parameters, separate from animation playback speed

### [#](https://dotlottie.io/spec/2.0/#guard) Guard

Guards are conditions that determine whether a transition can occur. There are four types of guards:

1. **Numeric**: Compares a numeric input value
2. **String**: Compares a string input value
3. **Boolean**: Compares a boolean input value
4. **Event**: Checks if an event has occurred

**Guard System Behavior:**

* Numeric comparisons support `Equal`, `NotEqual`, `LessThan`, `GreaterThan`, `LessThanOrEqual`, `GreaterThanOrEqual`
* String and event matching is exact and case-sensitive
* OR/NOT operations and complex expression precedence are not supported

#### [#](https://dotlottie.io/spec/2.0/#numeric-guard) Numeric Guard

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"Numeric"` | Specifies a numeric comparison guard that evaluates a numeric input value |
| `inputName` | â yes | String | Name of the numeric input variable to evaluate |
| `conditionType` | â yes | `"Equal"`, `"NotEqual"`, `"GreaterThan"`, `"GreaterThanOrEqual"`, `"LessThan"`, `"LessThanOrEqual"` | Type of numeric comparison to perform between the input value and compareTo value |
| `compareTo` | â yes | Number, String | Value to compare against. Can be a number or a reference to another numeric input (e.g., '$inputName') |

#### [#](https://dotlottie.io/spec/2.0/#string-guard) String Guard

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"String"` | Specifies a string comparison guard that evaluates a string input value |
| `inputName` | â yes | String | Name of the string input variable to evaluate |
| `conditionType` | â yes | `"Equal"`, `"NotEqual"` | Type of string comparison to perform between the input value and compareTo value |
| `compareTo` | â yes | String | String value to compare against. Can be a literal string or a reference to another string input (e.g., '$inputName') |

#### [#](https://dotlottie.io/spec/2.0/#boolean-guard) Boolean Guard

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"Boolean"` | Specifies a boolean comparison guard that evaluates a boolean input value |
| `inputName` | â yes | String | Name of the boolean input variable to evaluate |
| `conditionType` | â yes | `"Equal"`, `"NotEqual"` | Type of boolean comparison to perform between the input value and compareTo value |
| `compareTo` | â yes | String or Boolean | Boolean value to compare against. Can be a literal boolean or a reference to another boolean input (e.g., '$inputName') |

#### [#](https://dotlottie.io/spec/2.0/#event-guard) Event Guard

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"Event"` | Specifies an event guard that triggers when a specific event occurs |
| `inputName` | â yes | String | Name of the event input to monitor for triggering the transition |

**Event Processing Behavior:**

* Events are edge-triggered and processed immediately when the state machine pipeline runs
* No event queuing: only one current event slot exists (new events overwrite previous ones before processing)
* Events are consumed after a successful pipeline run
* Rapid-fire events follow "last one wins" behavior with no additional prioritization

### [#](https://dotlottie.io/spec/2.0/#action) Action

Actions perform operations when triggered by state changes or interactions. There are multiple action types:

**Action Execution Timing:**

* **Exit Actions**: Run immediately before the state change (or before a tween transition starts)
* **Entry Actions**:
  + For non-tween transitions: Run immediately after assigning the target state
  + For tween transitions: Run only after the tween animation completes
* **Synchronous Processing**: Actions are synchronous with no built-in timeout or cancellation mechanism

#### [#](https://dotlottie.io/spec/2.0/#url-action) URL Action

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"OpenUrl"` | Opens a URL |
| `url` | â yes | String | The URL to open. Can be a literal string or a reference to a string input (e.g., '$inputName') |
| `target` | â yes | String | Target window (`_blank`, `_self`, `_parent`, `_top`, `_unfencedTop`), similar to HTML Link `target` attribute |

#### [#](https://dotlottie.io/spec/2.0/#theme-action) Theme Action

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"SetTheme"` | Sets a theme |
| `value` | â yes | String | ID of the dotLottie theme to apply. Can be a literal string or a reference to a string input (e.g., '$inputName') |

#### [#](https://dotlottie.io/spec/2.0/#increment-action) Increment Action

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"Increment"` | Increments a numeric input |
| `inputName` | â yes | String | Name of the input to increment |
| `value` | no | Number or String | Amount to increment by (defaults to 1), if it's a String, it must be prefixed with `$` referencing another Numeric input (e.g., `$inputName`) |

#### [#](https://dotlottie.io/spec/2.0/#decrement-action) Decrement Action

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"Decrement"` | Decrements a numeric input |
| `inputName` | â yes | String | Name of the input to decrement |
| `value` | no | Number or String | Amount to decrement by (defaults to 1), if it's a String, it must be prefixed with `$` referencing another Numeric input (e.g., `$inputName`) |

#### [#](https://dotlottie.io/spec/2.0/#toggle-action) Toggle Action

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"Toggle"` | Toggles a boolean input |
| `inputName` | â yes | String | Name of the input to toggle |

#### [#](https://dotlottie.io/spec/2.0/#set-boolean-action) Set Boolean Action

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"SetBoolean"` | Sets a boolean input |
| `inputName` | â yes | String | Name of the input to set |
| `value` | â yes | Boolean | Value to set |

#### [#](https://dotlottie.io/spec/2.0/#set-string-action) Set String Action

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"SetString"` | Sets a string input |
| `inputName` | â yes | String | Name of the input to set |
| `value` | â yes | String | Value to set |

#### [#](https://dotlottie.io/spec/2.0/#set-numeric-action) Set Numeric Action

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"SetNumeric"` | Sets a numeric input |
| `inputName` | â yes | String | Name of the input to set |
| `value` | â yes | Number | Value to set |

#### [#](https://dotlottie.io/spec/2.0/#fire-action) Fire Action

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"Fire"` | Fires an event |
| `inputName` | â yes | String | Name of the input of type Event to fire |

#### [#](https://dotlottie.io/spec/2.0/#reset-action) Reset Action

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"Reset"` | Resets an input to its initial value |
| `inputName` | â yes | String | Name of the input to reset, reset the input to its initial value |

#### [#](https://dotlottie.io/spec/2.0/#set-frame-action) Set Frame Action

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"SetFrame"` | Sets the current frame of the animation |
| `value` | â yes | Number or String | Frame number or expression, if it's a String it must start with $ referencing another Numeric input (e.g., `$inputName`) |

#### [#](https://dotlottie.io/spec/2.0/#set-progress-action) Set Progress Action

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"SetProgress"` | Sets the progress (0-1) of the animation |
| `value` | â yes | Number or String | Progress value or expression, if it's a String it must start with $ referencing another Numeric input (e.g., `$inputName`) |

**Animation Control Behavior:**

* `SetFrame` and `SetProgress` actions operate on the currently active animation
* The player maintains a single active\_animation\_id with no explicit targeting by ID or broadcasting
* Implementation assumes an animation is always active (behavior with "no active animation" is not defined)

#### [#](https://dotlottie.io/spec/2.0/#fire-custom-event-action) Fire Custom Event Action

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"FireCustomEvent"` | Fires a custom event to the host application |
| `value` | â yes | String | Any data |

### [#](https://dotlottie.io/spec/2.0/#interaction) Interaction

Interactions define how users can interact with the animation. There are several types:

**Interaction Behavior:**

* PointerEnter/Exit events are tracked per layer with cross-platform event normalization handled in implementation code
* Exact layer name matching is required for layer-scoped interactions (case-sensitive)
* **Animation Event Timing:**
  + `OnComplete`: Emitted when playback reaches the final end:
    - When `loop: false` - fires after the single playback iteration
    - When `loop: true` with `loopCount` - fires after the final (Nth) iteration completes
    - When `loop: true` without `loopCount` (infinite) - never fires
  + `OnLoopComplete`: Emitted after each loop iteration completes:
    - Fires after every iteration, including the final one when `loopCount` is specified
    - For infinite loops, continues firing indefinitely
    - In bounce mode, loop counting increments on full cycle completion (forward + backward)
* Event emission is driven by the player, not by manual seek operations

#### [#](https://dotlottie.io/spec/2.0/#pointer-up-interaction) Pointer Up Interaction

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"PointerUp"` | Specifies that this interaction is triggered when a pointer is released over the target area |
| `layerName` | no | String | Optional layer name to restrict the interaction to a specific layer |
| `actions` | â yes | Array<[Action](https://dotlottie.io/spec/2.0/#action)> | List of actions to execute when the pointer up event occurs |

#### [#](https://dotlottie.io/spec/2.0/#pointer-down-interaction) Pointer Down Interaction

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"PointerDown"` | Specifies that this interaction is triggered when a pointer is pressed over the target area |
| `layerName` | no | String | Optional layer name to restrict the interaction to a specific layer |
| `actions` | â yes | Array<[Action](https://dotlottie.io/spec/2.0/#action)> | List of actions to execute when the pointer down event occurs |

#### [#](https://dotlottie.io/spec/2.0/#pointer-enter-interaction) Pointer Enter Interaction

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"PointerEnter"` | Specifies that this interaction is triggered when a pointer enters the target area |
| `layerName` | no | String | Optional layer name to restrict the interaction to a specific layer |
| `actions` | â yes | Array<[Action](https://dotlottie.io/spec/2.0/#action)> | List of actions to execute when the pointer enter event occurs |

#### [#](https://dotlottie.io/spec/2.0/#pointer-move-interaction) Pointer Move Interaction

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"PointerMove"` | Specifies that this interaction is triggered when a pointer moves over the target area |
| `layerName` | no | String | Optional layer name to restrict the interaction to a specific layer |
| `actions` | â yes | Array<[Action](https://dotlottie.io/spec/2.0/#action)> | List of actions to execute when the pointer move event occurs |

#### [#](https://dotlottie.io/spec/2.0/#pointer-exit-interaction) Pointer Exit Interaction

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"PointerExit"` | Specifies that this interaction is triggered when a pointer exits the target area |
| `layerName` | no | String | Optional layer name to restrict the interaction to a specific layer |
| `actions` | â yes | Array<[Action](https://dotlottie.io/spec/2.0/#action)> | List of actions to execute when the pointer exit event occurs |

#### [#](https://dotlottie.io/spec/2.0/#click-interaction) Click Interaction

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"Click"` | Specifies that this interaction is triggered when a click/tap occurs on the target area |
| `layerName` | no | String | Optional layer name to restrict the interaction to a specific layer |
| `actions` | â yes | Array<[Action](https://dotlottie.io/spec/2.0/#action)> | List of actions to execute when the click event occurs |

#### [#](https://dotlottie.io/spec/2.0/#on-complete-interaction) On Complete Interaction

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"OnComplete"` | Specifies that this interaction is triggered when the specified state's animation completes |
| `stateName` | â yes | String | Name of the state to monitor for completion |
| `actions` | â yes | Array<[Action](https://dotlottie.io/spec/2.0/#action)> | List of actions to execute when the state's animation completes |

#### [#](https://dotlottie.io/spec/2.0/#on-loop-complete-interaction) On Loop Complete Interaction

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"OnLoopComplete"` | Specifies that this interaction is triggered when the specified state's animation loop completes |
| `stateName` | â yes | String | Name of the state to monitor for loop completion |
| `actions` | â yes | Array<[Action](https://dotlottie.io/spec/2.0/#action)> | List of actions to execute when the state's animation loop completes |

### [#](https://dotlottie.io/spec/2.0/#input) Input

Inputs represent variables that the state machine can access and modify. There are four types:

#### [#](https://dotlottie.io/spec/2.0/#numeric-input) Numeric Input

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"Numeric"` | Specifies that this input stores a numeric value that can be used in numeric guards and actions |
| `name` | â yes | String | Unique identifier for this numeric input, used to reference it in guards and actions |
| `value` | â yes | Number | Initial numeric value for this input |

#### [#](https://dotlottie.io/spec/2.0/#string-input) String Input

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"String"` | Specifies that this input stores a string value that can be used in string guards and actions |
| `name` | â yes | String | Unique identifier for this string input, used to reference it in guards and actions |
| `value` | â yes | String | Initial string value for this input |

#### [#](https://dotlottie.io/spec/2.0/#boolean-input) Boolean Input

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"Boolean"` | Specifies that this input stores a boolean value that can be used in boolean guards and actions |
| `name` | â yes | String | Unique identifier for this boolean input, used to reference it in guards and actions |
| `value` | â yes | Boolean | Initial boolean value for this input |

#### [#](https://dotlottie.io/spec/2.0/#event-input) Event Input

| Field | Required | Value type | Description |
| --- | --- | --- | --- |
| `type` | â yes | `"Event"` | Specifies that this input represents an event that can trigger state transitions |
| `name` | â yes | String | Unique identifier for this event input, used to reference it in event guards |

### [#](https://dotlottie.io/spec/2.0/#state-machine-example) State Machine Example

```json
{
  "initial": "idle",
  "states": [
    {
      "name": "idle",
      "type": "PlaybackState",
      "animation": "animation_01",
      "loop": true,
      "transitions": [
        {
          "type": "Transition",
          "toState": "active",
          "guards": [
            {
              "type": "Boolean",
              "inputName": "isActive",
              "conditionType": "equals",
              "compareTo": true
            }
          ]
        }
      ]
    },
    {
      "name": "active",
      "type": "PlaybackState",
      "animation": "animation_02",
      "loop": false,
      "entryActions": [
        {
          "type": "SetTheme",
          "value": "active_theme"
        }
      ],
      "transitions": [
        {
          "type": "Transition",
          "toState": "idle",
          "guards": [
            {
              "type": "Boolean",
              "inputName": "isActive",
              "conditionType": "equals",
              "compareTo": false
            }
          ]
        }
      ]
    }
  ],
  "interactions": [
    {
      "type": "Click",
      "actions": [
        {
          "type": "Toggle",
          "inputName": "isActive"
        }
      ]
    }
  ],
  "inputs": [
    {
      "type": "Boolean",
      "name": "isActive",
      "value": false
    }
  ]
}
```

### [#](https://dotlottie.io/spec/2.0/#state-machine-json-schema) State Machine JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "dotLottie State Machine Schema",
  "description": "Schema for state machine files in a dotLottie archive",
  "type": "object",
  "required": ["initial", "states"],
  "properties": {
    "initial": {
      "type": "string",
      "description": "The initial state to enter when the state machine is started"
    },
    "states": {
      "type": "array",
      "description": "List of states in the state machine",
      "items": {
        "oneOf": [
          { "$ref": "#/definitions/PlaybackState" },
          { "$ref": "#/definitions/GlobalState" }
        ]
      }
    },
    "interactions": {
      "type": "array",
      "description": "List of interactions that can trigger actions",
      "items": {
        "oneOf": [
          { "$ref": "#/definitions/PointerUpInteraction" },
          { "$ref": "#/definitions/PointerDownInteraction" },
          { "$ref": "#/definitions/PointerEnterInteraction" },
          { "$ref": "#/definitions/PointerMoveInteraction" },
          { "$ref": "#/definitions/PointerExitInteraction" },
          { "$ref": "#/definitions/ClickInteraction" },
          { "$ref": "#/definitions/OnCompleteInteraction" },
          { "$ref": "#/definitions/OnLoopCompleteInteraction" }
        ]
      }
    },
    "inputs": {
      "type": "array",
      "description": "List of input variables used by the state machine",
      "items": {
        "oneOf": [
          { "$ref": "#/definitions/NumericInput" },
          { "$ref": "#/definitions/StringInput" },
          { "$ref": "#/definitions/BooleanInput" },
          { "$ref": "#/definitions/EventInput" }
        ]
      }
    }
  },
  "definitions": {
    "PlaybackState": {
      "type": "object",
      "required": ["name", "type", "animation"],
      "properties": {
        "name": {
          "type": "string",
          "description": "Unique identifier for the state, used to reference this state in transitions and interactions"
        },
        "type": {
          "type": "string",
          "const": "PlaybackState",
          "description": "Specifies that this state controls animation playback"
        },
        "animation": {
          "type": "string",
          "description": "ID of the animation to play in this state, corresponding to a file in the 'a/' directory"
        },
        "loop": {
          "type": "boolean",
          "description": "When true, the animation will continuously repeat from start to end"
        },
        "loopCount": {
          "type": "integer",
          "minimum": 1,
          "description": "Total number of loop iterations when loop is true. If omitted, loops infinitely. Ignored when loop is false"
        },
        "autoplay": {
          "type": "boolean",
          "description": "When true, the animation will start playing immediately when entering this state"
        },
        "final": {
          "type": "boolean",
          "description": "When true, this state cannot transition to other states, effectively ending the state machine"
        },
        "mode": {
          "type": "string",
          "enum": ["Forward", "Reverse", "Bounce", "ReverseBounce"],
          "description": "Controls the direction and behavior of animation playback: Forward (normal), Reverse (backwards), Bounce (forward then reverse), or ReverseBounce (reverse then forward)"
        },
        "speed": {
          "type": "number",
          "description": "Multiplier for the animation's playback speed (1.0 is normal speed, 2.0 is twice as fast, 0.5 is half speed)"
        },
        "segment": {
          "type": "string",
          "description": "Name of a Lottie marker that defines the frame range to play, resolved via the marker's start frame and duration. Falls back to the full animation range if the marker is missing."
        },
        "backgroundColor": {
          "type": "integer",
          "description": "Background color for the animation as a u32 RGBA representation (e.g., 0xFFFFFFFF for opaque white)"
        },
        "entryActions": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Action"
          },
          "description": "List of actions to execute when transitioning into this state"
        },
        "exitActions": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Action"
          },
          "description": "List of actions to execute when transitioning out of this state"
        },
        "transitions": {
          "type": "array",
          "items": {
            "oneOf": [
              { "$ref": "#/definitions/Transition" },
              { "$ref": "#/definitions/TweenedTransition" }
            ]
          },
          "description": "Rules defining when and how this state can transition to other states"
        }
      },
      "additionalProperties": false
    },
    "GlobalState": {
      "type": "object",
      "required": ["name", "type"],
      "properties": {
        "name": {
          "type": "string",
          "description": "Unique identifier for the global state, used to reference this state in transitions and interactions"
        },
        "type": {
          "type": "string",
          "const": "GlobalState",
          "description": "Specifies that this state can override behaviors across all other states"
        },
        "entryActions": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Action"
          },
          "description": "List of actions to execute when transitioning into this global state, which can override current state behavior"
        },
        "exitActions": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Action"
          },
          "description": "List of actions to execute when transitioning out of this global state"
        },
        "transitions": {
          "type": "array",
          "items": {
            "oneOf": [
              { "$ref": "#/definitions/Transition" },
              { "$ref": "#/definitions/TweenedTransition" }
            ]
          },
          "description": "Rules defining when and how this global state can transition to other states, taking precedence over regular state transitions"
        }
      },
      "additionalProperties": false
    },
    "Transition": {
      "type": "object",
      "required": ["type", "toState"],
      "properties": {
        "type": {
          "type": "string",
          "const": "Transition",
          "description": "Specifies an immediate state transition"
        },
        "toState": {
          "type": "string",
          "description": "Name of the target state to transition to"
        },
        "guards": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Guard"
          },
          "description": "List of conditions that must all be satisfied for this transition to occur"
        }
      }
    },
    "TweenedTransition": {
      "type": "object",
      "required": ["type", "toState", "duration", "easing"],
      "properties": {
        "type": {
          "type": "string",
          "const": "Tweened",
          "description": "Specifies a gradual state transition with animation over time"
        },
        "toState": {
          "type": "string",
          "description": "Name of the target state to transition to"
        },
        "guards": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Guard"
          },
          "description": "List of conditions that must all be satisfied for this transition to occur"
        },
        "duration": {
          "type": "number",
          "description": "Duration of the transition animation in seconds"
        },
        "easing": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "description": "Cubic BÃ©zier curve control points [x1, y1, x2, y2] defining the easing function for the transition animation"
        }
      }
    },
    "Guard": {
      "oneOf": [
        { "$ref": "#/definitions/NumericGuard" },
        { "$ref": "#/definitions/StringGuard" },
        { "$ref": "#/definitions/BooleanGuard" },
        { "$ref": "#/definitions/EventGuard" }
      ]
    },
    "NumericGuard": {
      "type": "object",
      "required": ["type", "inputName", "conditionType", "compareTo"],
      "properties": {
        "type": {
          "type": "string",
          "const": "Numeric",
          "description": "Specifies a numeric comparison guard that evaluates a numeric input value"
        },
        "inputName": {
          "type": "string",
          "description": "Name of the numeric input variable to evaluate"
        },
        "conditionType": {
          "type": "string",
          "enum": [
            "Equal",
            "NotEqual",
            "GreaterThan",
            "GreaterThanOrEqual",
            "LessThan",
            "LessThanOrEqual"
          ],
          "description": "Type of numeric comparison to perform between the input value and compareTo value"
        },
        "compareTo": {
          "oneOf": [{ "type": "number" }, { "type": "string" }],
          "description": "Value to compare against. Can be a number or a reference to another numeric input (e.g., '$inputName')"
        }
      }
    },
    "StringGuard": {
      "type": "object",
      "required": ["type", "inputName", "conditionType", "compareTo"],
      "properties": {
        "type": {
          "type": "string",
          "const": "String",
          "description": "Specifies a string comparison guard that evaluates a string input value"
        },
        "inputName": {
          "type": "string",
          "description": "Name of the string input variable to evaluate"
        },
        "conditionType": {
          "type": "string",
          "enum": ["Equal", "NotEqual"],
          "description": "Type of string comparison to perform between the input value and compareTo value"
        },
        "compareTo": {
          "type": "string",
          "description": "String value to compare against. Can be a literal string or a reference to another string input (e.g., '$inputName')"
        }
      }
    },
    "BooleanGuard": {
      "type": "object",
      "required": ["type", "inputName", "conditionType", "compareTo"],
      "properties": {
        "type": {
          "type": "string",
          "const": "Boolean",
          "description": "Specifies a boolean comparison guard that evaluates a boolean input value"
        },
        "inputName": {
          "type": "string",
          "description": "Name of the boolean input variable to evaluate"
        },
        "conditionType": {
          "type": "string",
          "enum": ["Equal", "NotEqual"],
          "description": "Type of boolean comparison to perform between the input value and compareTo value"
        },
        "compareTo": {
          "oneOf": [{ "type": "string" }, { "type": "boolean" }],
          "description": "Boolean value to compare against. Can be a literal boolean or a reference to another boolean input (e.g., '$inputName')"
        }
      }
    },
    "EventGuard": {
      "type": "object",
      "required": ["type", "inputName"],
      "properties": {
        "type": {
          "type": "string",
          "const": "Event",
          "description": "Specifies an event guard that triggers when a specific event occurs"
        },
        "inputName": {
          "type": "string",
          "description": "Name of the event input to monitor for triggering the transition"
        }
      }
    },
    "Action": {
      "oneOf": [
        { "$ref": "#/definitions/OpenUrlAction" },
        { "$ref": "#/definitions/SetThemeAction" },
        { "$ref": "#/definitions/IncrementAction" },
        { "$ref": "#/definitions/DecrementAction" },
        { "$ref": "#/definitions/ToggleAction" },
        { "$ref": "#/definitions/SetBooleanAction" },
        { "$ref": "#/definitions/SetStringAction" },
        { "$ref": "#/definitions/SetNumericAction" },
        { "$ref": "#/definitions/FireAction" },
        { "$ref": "#/definitions/ResetAction" },
        { "$ref": "#/definitions/SetFrameAction" },
        { "$ref": "#/definitions/SetProgressAction" },
        { "$ref": "#/definitions/FireCustomEventAction" }
      ]
    },
    "OpenUrlAction": {
      "type": "object",
      "required": ["type", "url", "target"],
      "properties": {
        "type": {
          "type": "string",
          "const": "OpenUrl",
          "description": "Opens a URL"
        },
        "url": {
          "type": "string",
          "description": "The URL to open. Can be a literal string or a reference to a string input (e.g., '$inputName')"
        },
        "target": {
          "type": "string",
          "enum": ["_blank", "_self", "_parent", "_top", "_unfencedTop"],
          "description": "Target window"
        }
      }
    },
    "SetThemeAction": {
      "type": "object",
      "required": ["type", "value"],
      "properties": {
        "type": {
          "type": "string",
          "const": "SetTheme",
          "description": "Sets a theme"
        },
        "value": {
          "type": "string",
          "description": "ID of the theme to apply. Can be a literal string or a reference to a string input (e.g., '$inputName')"
        }
      }
    },
    "IncrementAction": {
      "type": "object",
      "required": ["type", "inputName"],
      "properties": {
        "type": {
          "type": "string",
          "const": "Increment",
          "description": "Increments a numeric input"
        },
        "inputName": {
          "type": "string",
          "description": "Name of the input to increment"
        },
        "value": {
          "oneOf": [{ "type": "number" }, { "type": "string" }],
          "description": "Amount to increment by (defaults to 1)"
        }
      }
    },
    "DecrementAction": {
      "type": "object",
      "required": ["type", "inputName"],
      "properties": {
        "type": {
          "type": "string",
          "const": "Decrement",
          "description": "Decrements a numeric input"
        },
        "inputName": {
          "type": "string",
          "description": "Name of the input to decrement"
        },
        "value": {
          "oneOf": [{ "type": "number" }, { "type": "string" }],
          "description": "Amount to decrement by (defaults to 1)"
        }
      }
    },
    "ToggleAction": {
      "type": "object",
      "required": ["type", "inputName"],
      "properties": {
        "type": {
          "type": "string",
          "const": "Toggle",
          "description": "Toggles a boolean input"
        },
        "inputName": {
          "type": "string",
          "description": "Name of the input to toggle"
        }
      }
    },
    "SetBooleanAction": {
      "type": "object",
      "required": ["type", "inputName"],
      "properties": {
        "type": {
          "type": "string",
          "const": "SetBoolean",
          "description": "Sets a boolean input"
        },
        "inputName": {
          "type": "string",
          "description": "Name of the input to set"
        },
        "value": {
          "type": "boolean",
          "description": "Value to set (defaults to true)"
        }
      }
    },
    "SetStringAction": {
      "type": "object",
      "required": ["type", "inputName"],
      "properties": {
        "type": {
          "type": "string",
          "const": "SetString",
          "description": "Sets a string input"
        },
        "inputName": {
          "type": "string",
          "description": "Name of the input to set"
        },
        "value": {
          "type": "string",
          "description": "Value to set (defaults to empty string)"
        }
      }
    },
    "SetNumericAction": {
      "type": "object",
      "required": ["type", "inputName"],
      "properties": {
        "type": {
          "type": "string",
          "const": "SetNumeric",
          "description": "Sets a numeric input"
        },
        "inputName": {
          "type": "string",
          "description": "Name of the input to set"
        },
        "value": {
          "type": "number",
          "description": "Value to set (defaults to 0)"
        }
      }
    },
    "FireAction": {
      "type": "object",
      "required": ["type", "inputName"],
      "properties": {
        "type": {
          "type": "string",
          "const": "Fire",
          "description": "Fires an event"
        },
        "inputName": {
          "type": "string",
          "description": "Name of the event to fire"
        }
      }
    },
    "ResetAction": {
      "type": "object",
      "required": ["type", "inputName"],
      "properties": {
        "type": {
          "type": "string",
          "const": "Reset",
          "description": "Resets an input to its default value"
        },
        "inputName": {
          "type": "string",
          "description": "Name of the input to reset"
        }
      }
    },
    "SetFrameAction": {
      "type": "object",
      "required": ["type", "value"],
      "properties": {
        "type": {
          "type": "string",
          "const": "SetFrame",
          "description": "Sets the current frame of the animation"
        },
        "value": {
          "oneOf": [{ "type": "number" }, { "type": "string" }],
          "description": "Frame number or expression"
        }
      }
    },
    "SetProgressAction": {
      "type": "object",
      "required": ["type", "value"],
      "properties": {
        "type": {
          "type": "string",
          "const": "SetProgress",
          "description": "Sets the progress (0-1) of the animation"
        },
        "value": {
          "oneOf": [{ "type": "number" }, { "type": "string" }],
          "description": "Progress value or expression"
        }
      }
    },
    "FireCustomEventAction": {
      "type": "object",
      "required": ["type", "value"],
      "properties": {
        "type": {
          "type": "string",
          "const": "FireCustomEvent",
          "description": "Fires a custom event to the host application"
        },
        "value": {
          "type": "string",
          "description": "Event name/value"
        }
      }
    },
    "InteractionBase": {
      "type": "object",
      "required": ["actions"],
      "properties": {
        "actions": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Action"
          },
          "description": "Actions to perform when triggered"
        }
      }
    },
    "PointerUpInteraction": {
      "allOf": [
        { "$ref": "#/definitions/InteractionBase" },
        {
          "type": "object",
          "required": ["type"],
          "properties": {
            "type": {
              "type": "string",
              "const": "PointerUp",
              "description": "Triggered when pointer is released"
            },
            "layerName": {
              "type": "string",
              "description": "Optional layer to restrict interaction to"
            }
          }
        }
      ]
    },
    "PointerDownInteraction": {
      "allOf": [
        { "$ref": "#/definitions/InteractionBase" },
        {
          "type": "object",
          "required": ["type"],
          "properties": {
            "type": {
              "type": "string",
              "const": "PointerDown",
              "description": "Triggered when pointer is pressed"
            },
            "layerName": {
              "type": "string",
              "description": "Optional layer to restrict interaction to"
            }
          }
        }
      ]
    },
    "PointerEnterInteraction": {
      "allOf": [
        { "$ref": "#/definitions/InteractionBase" },
        {
          "type": "object",
          "required": ["type"],
          "properties": {
            "type": {
              "type": "string",
              "const": "PointerEnter",
              "description": "Triggered when pointer enters area"
            },
            "layerName": {
              "type": "string",
              "description": "Optional layer to restrict interaction to"
            }
          }
        }
      ]
    },
    "PointerMoveInteraction": {
      "allOf": [
        { "$ref": "#/definitions/InteractionBase" },
        {
          "type": "object",
          "required": ["type"],
          "properties": {
            "type": {
              "type": "string",
              "const": "PointerMove",
              "description": "Triggered when pointer moves over area"
            }
          }
        }
      ]
    },
    "PointerExitInteraction": {
      "allOf": [
        { "$ref": "#/definitions/InteractionBase" },
        {
          "type": "object",
          "required": ["type"],
          "properties": {
            "type": {
              "type": "string",
              "const": "PointerExit",
              "description": "Triggered when pointer exits area"
            },
            "layerName": {
              "type": "string",
              "description": "Optional layer to restrict interaction to"
            }
          }
        }
      ]
    },
    "ClickInteraction": {
      "allOf": [
        { "$ref": "#/definitions/InteractionBase" },
        {
          "type": "object",
          "required": ["type"],
          "properties": {
            "type": {
              "type": "string",
              "const": "Click",
              "description": "Triggered on click/tap"
            },
            "layerName": {
              "type": "string",
              "description": "Optional layer to restrict interaction to"
            }
          }
        }
      ]
    },
    "OnCompleteInteraction": {
      "allOf": [
        { "$ref": "#/definitions/InteractionBase" },
        {
          "type": "object",
          "required": ["type", "stateName"],
          "properties": {
            "type": {
              "type": "string",
              "const": "OnComplete",
              "description": "Triggered when animation completes"
            },
            "stateName": {
              "type": "string",
              "description": "State name to listen for completion"
            }
          }
        }
      ]
    },
    "OnLoopCompleteInteraction": {
      "allOf": [
        { "$ref": "#/definitions/InteractionBase" },
        {
          "type": "object",
          "required": ["type", "stateName"],
          "properties": {
            "type": {
              "type": "string",
              "const": "OnLoopComplete",
              "description": "Triggered when animation loop completes"
            },
            "stateName": {
              "type": "string",
              "description": "State name to listen for loop completion"
            }
          }
        }
      ]
    },
    "NumericInput": {
      "type": "object",
      "required": ["type", "name", "value"],
      "properties": {
        "type": {
          "type": "string",
          "const": "Numeric",
          "description": "Specifies that this input stores a numeric value that can be used in numeric guards and actions"
        },
        "name": {
          "type": "string",
          "description": "Unique identifier for this numeric input, used to reference it in guards and actions"
        },
        "value": {
          "type": "number",
          "description": "Initial numeric value for this input"
        }
      }
    },
    "StringInput": {
      "type": "object",
      "required": ["type", "name", "value"],
      "properties": {
        "type": {
          "type": "string",
          "const": "String",
          "description": "Specifies that this input stores a string value that can be used in string guards and actions"
        },
        "name": {
          "type": "string",
          "description": "Unique identifier for this string input, used to reference it in guards and actions"
        },
        "value": {
          "type": "string",
          "description": "Initial string value for this input"
        }
      }
    },
    "BooleanInput": {
      "type": "object",
      "required": ["type", "name", "value"],
      "properties": {
        "type": {
          "type": "string",
          "const": "Boolean",
          "description": "Specifies that this input stores a boolean value that can be used in boolean guards and actions"
        },
        "name": {
          "type": "string",
          "description": "Unique identifier for this boolean input, used to reference it in guards and actions"
        },
        "value": {
          "type": "boolean",
          "description": "Initial boolean value for this input"
        }
      }
    },
    "EventInput": {
      "type": "object",
      "required": ["type", "name"],
      "properties": {
        "type": {
          "type": "string",
          "const": "Event",
          "description": "Specifies that this input represents an event that can trigger state transitions"
        },
        "name": {
          "type": "string",
          "description": "Unique identifier for this event input, used to reference it in event guards"
        }
      }
    }
  }
}
```

â
[v1.0](https://dotlottie.io/spec/1.0/)
