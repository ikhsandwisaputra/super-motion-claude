---
source: https://docs.lottiefiles.com/en/format/lottie-json/specification.md
title: ""
fetched: 2026-10-28
---

# Lottie JSON Format Specification
Complete technical specification for the Lottie JSON animation format

# Lottie JSON Format Specification

The Lottie JSON format is the original vector animation format created by Airbnb for After Effects animations. It describes animations as JSON objects that can be rendered natively on mobile and web platforms.

## Version

Current specification version: **5.12.0**

Official documentation: [Lottie Animation Community Docs](https://lottiefiles.github.io/lottie-docs/)

## Format Overview

A Lottie animation is a JSON object that describes vector graphics and their animations over time. The format supports:

- Vector shapes (paths, ellipses, rectangles, stars)
- Raster images (embedded or referenced)
- Text layers
- Masks and mattes
- Effects and expressions
- Pre-compositions (nested animations)

## MIME Type

```
application/json
```

## File Extension

```
.json
```

## Top-Level Schema

```typescript
interface LottieAnimation {
  v: string; // Version (Bodymovin version)
  fr: number; // Frame rate
  ip: number; // In point (start frame)
  op: number; // Out point (end frame)
  w: number; // Width in pixels
  h: number; // Height in pixels
  nm?: string; // Name
  ddd?: 0 | 1; // 3D layer flag (0 = 2D, 1 = 3D)
  assets?: Asset[]; // Assets list
  layers: Layer[]; // Layers array
  fonts?: FontList; // Fonts list
  chars?: Char[]; // Character data for text layers
  markers?: Marker[]; // Markers/named time points
  meta?: Metadata; // Metadata information
}
```

### Top-Level Properties

| Property  | Type      | Required | Default | Description                                   |
| --------- | --------- | -------- | ------- | --------------------------------------------- |
| `v`       | string    | Yes      | -       | Bodymovin version that exported the animation |
| `fr`      | number    | Yes      | -       | Frame rate (frames per second)                |
| `ip`      | number    | Yes      | -       | In point, start frame of the animation        |
| `op`      | number    | Yes      | -       | Out point, end frame of the animation         |
| `w`       | number    | Yes      | -       | Width of the composition in pixels            |
| `h`       | number    | Yes      | -       | Height of the composition in pixels           |
| `nm`      | string    | No       | `""`    | Name of the animation                         |
| `ddd`     | 0 \| 1    | No       | `0`     | Whether the animation uses 3D layers          |
| `assets`  | Asset\[]  | No       | `[]`    | Array of assets (images, precomps)            |
| `layers`  | Layer\[]  | Yes      | -       | Array of layers that make up the animation    |
| `fonts`   | FontList  | No       | -       | List of fonts used in the animation           |
| `chars`   | Char\[]   | No       | -       | Character shapes for text layers              |
| `markers` | Marker\[] | No       | -       | Named time markers in the animation           |
| `meta`    | Metadata  | No       | -       | Metadata about the animation                  |

### Example: Minimal Animation

```json
{
  "v": "5.12.0",
  "fr": 60,
  "ip": 0,
  "op": 180,
  "w": 500,
  "h": 500,
  "nm": "My Animation",
  "ddd": 0,
  "assets": [],
  "layers": []
}
```

## Assets

Assets are reusable elements like images, precompositions, and data sources.

```typescript
type Asset = ImageAsset | PrecompAsset | DataAsset;

interface BaseAsset {
  id: string; // Unique asset identifier
  nm?: string; // Asset name
}

interface ImageAsset extends BaseAsset {
  w: number; // Width in pixels
  h: number; // Height in pixels
  u?: string; // Path to the image directory
  p: string; // Image filename or data URI
  e?: 0 | 1; // Whether the image is embedded (base64)
}

interface PrecompAsset extends BaseAsset {
  layers: Layer[]; // Layers in the precomposition
  fr?: number; // Frame rate (inherits from main if not set)
  xt?: 0 | 1; // Extra composition flag
}

interface DataAsset extends BaseAsset {
  t?: number; // Asset type
  layers?: Layer[]; // Layers
}
```

### Image Asset Example

```json
{
  "id": "image_0",
  "w": 200,
  "h": 200,
  "u": "images/",
  "p": "my-image.png",
  "e": 0
}
```

### Precomposition Asset Example

```json
{
  "id": "comp_0",
  "layers": [
    {
      "ty": 4,
      "nm": "Shape Layer",
      "ip": 0,
      "op": 60,
      "st": 0,
      "ind": 1,
      "ks": {}
    }
  ]
}
```

## Layers

Layers are the building blocks of an animation. Each layer has a type and properties that define its appearance and behavior.

```typescript
type Layer = PrecompLayer | SolidLayer | ImageLayer | NullLayer | ShapeLayer | TextLayer | CameraLayer | LightLayer;

interface BaseLayer {
  ty: LayerType; // Layer type
  nm?: string; // Layer name
  ind: number; // Layer index
  parent?: number; // Parent layer index
  ip: number; // In point (start frame)
  op: number; // Out point (end frame)
  st: number; // Start time
  sr?: number; // Time stretch (1 = normal speed)
  ks: Transform; // Transform properties
  ao?: 0 | 1; // Auto-orient along path
  ddd?: 0 | 1; // 3D layer flag
  bm?: BlendMode; // Blend mode
  tt?: MatteMode; // Matte mode
  tp?: number; // Matte parent index
  td?: 0 | 1; // Is matte layer
  hd?: boolean; // Hidden flag
  cl?: string; // CSS class name
  ln?: string; // Layer HTML ID
  ef?: Effect[]; // Effects
  masksProperties?: Mask[]; // Masks
}

enum LayerType {
  Precomp = 0,
  Solid = 1,
  Image = 2,
  Null = 3,
  Shape = 4,
  Text = 5,
  Audio = 6,
  VideoPlaceholder = 7,
  ImageSequence = 8,
  Video = 9,
  ImagePlaceholder = 10,
  Guide = 11,
  Adjustment = 12,
  Camera = 13,
  Light = 14,
  Data = 15,
}

enum BlendMode {
  Normal = 0,
  Multiply = 1,
  Screen = 2,
  Overlay = 3,
  Darken = 4,
  Lighten = 5,
  ColorDodge = 6,
  ColorBurn = 7,
  HardLight = 8,
  SoftLight = 9,
  Difference = 10,
  Exclusion = 11,
  Hue = 12,
  Saturation = 13,
  Color = 14,
  Luminosity = 15,
}
```

### Layer Type Properties

| Property | Type      | Required | Default | Description                      |
| -------- | --------- | -------- | ------- | -------------------------------- |
| `ty`     | number    | Yes      | -       | Layer type (0-15)                |
| `nm`     | string    | No       | `""`    | Layer name                       |
| `ind`    | number    | Yes      | -       | Unique layer index               |
| `parent` | number    | No       | -       | Parent layer index for parenting |
| `ip`     | number    | Yes      | -       | In point, when layer starts      |
| `op`     | number    | Yes      | -       | Out point, when layer ends       |
| `st`     | number    | Yes      | -       | Start time offset                |
| `sr`     | number    | No       | `1`     | Time stretch factor              |
| `ks`     | Transform | Yes      | -       | Transform properties             |
| `ao`     | 0 \| 1    | No       | `0`     | Auto-orient along path           |
| `ddd`    | 0 \| 1    | No       | `0`     | 3D layer flag                    |
| `bm`     | number    | No       | `0`     | Blend mode                       |
| `tt`     | number    | No       | -       | Matte mode                       |
| `hd`     | boolean   | No       | `false` | Layer is hidden                  |

### Shape Layer

```typescript
interface ShapeLayer extends BaseLayer {
  ty: 4; // Shape layer type
  shapes: ShapeElement[]; // Shape elements
}
```

### Precomposition Layer

```typescript
interface PrecompLayer extends BaseLayer {
  ty: 0; // Precomp layer type
  refId: string; // Reference to asset ID
  w: number; // Composition width
  h: number; // Composition height
  tm?: AnimatedProperty; // Time remapping
}
```

### Solid Layer

```typescript
interface SolidLayer extends BaseLayer {
  ty: 1; // Solid layer type
  sc: string; // Solid color (hex)
  sw: number; // Solid width
  sh: number; // Solid height
}
```

### Image Layer

```typescript
interface ImageLayer extends BaseLayer {
  ty: 2; // Image layer type
  refId: string; // Reference to image asset ID
}
```

### Text Layer

```typescript
interface TextLayer extends BaseLayer {
  ty: 5; // Text layer type
  t: TextData; // Text data
}

interface TextData {
  d: TextDocument; // Text document data
  p?: AnimatedProperty; // Position
  m: TextMoreOptions; // Text more options
  a?: TextAnimator[]; // Text animators
}
```

### Layer Example

```json
{
  "ty": 4,
  "nm": "Shape Layer",
  "ind": 1,
  "ip": 0,
  "op": 180,
  "st": 0,
  "sr": 1,
  "ks": {
    "o": { "a": 0, "k": 100 },
    "r": { "a": 0, "k": 0 },
    "p": { "a": 0, "k": [250, 250, 0] },
    "a": { "a": 0, "k": [0, 0, 0] },
    "s": { "a": 0, "k": [100, 100, 100] }
  },
  "shapes": []
}
```

## Transform Properties

Transform properties control position, rotation, scale, and other spatial attributes.

```typescript
interface Transform {
  o: AnimatedProperty; // Opacity (0-100)
  r?: AnimatedProperty; // Rotation (degrees)
  p: AnimatedProperty; // Position [x, y] or [x, y, z]
  a: AnimatedProperty; // Anchor point [x, y] or [x, y, z]
  s: AnimatedProperty; // Scale [x, y] or [x, y, z] (percentage)
  sk?: AnimatedProperty; // Skew
  sa?: AnimatedProperty; // Skew axis
  rx?: AnimatedProperty; // X rotation (3D)
  ry?: AnimatedProperty; // Y rotation (3D)
  rz?: AnimatedProperty; // Z rotation (3D)
  or?: AnimatedProperty; // Orientation (3D)
}
```

### Transform Example

```json
{
  "o": { "a": 0, "k": 100 },
  "r": { "a": 0, "k": 0 },
  "p": { "a": 0, "k": [250, 250, 0] },
  "a": { "a": 0, "k": [0, 0, 0] },
  "s": { "a": 0, "k": [100, 100, 100] }
}
```

## Animated Properties

Properties can be static or animated with keyframes.

```typescript
interface AnimatedProperty {
  a: 0 | 1; // Animated flag (0 = static, 1 = animated)
  k: Value | Keyframe[]; // Value or keyframe array
  ix?: number; // Property index
  x?: string; // Expression
}

interface Keyframe {
  t: number; // Time (frame number)
  s?: Value; // Start value
  e?: Value; // End value
  i?: EasingHandle; // In easing handle
  o?: EasingHandle; // Out easing handle
  h?: 0 | 1; // Hold keyframe flag
  ti?: number[]; // Spatial tangent in
  to?: number[]; // Spatial tangent out
}

interface EasingHandle {
  x: number | number[]; // X easing value(s)
  y: number | number[]; // Y easing value(s)
}

type Value = number | number[] | string;
```

### Static Property Example

```json
{
  "a": 0,
  "k": 100
}
```

### Animated Property Example

```json
{
  "a": 1,
  "k": [
    {
      "t": 0,
      "s": [0],
      "e": [360],
      "i": { "x": [0.833], "y": [0.833] },
      "o": { "x": [0.167], "y": [0.167] }
    },
    {
      "t": 60,
      "s": [360]
    }
  ]
}
```

### Multi-Dimensional Animated Property Example

```json
{
  "a": 1,
  "k": [
    {
      "t": 0,
      "s": [100, 100],
      "e": [200, 300],
      "i": { "x": [0.833, 0.833], "y": [0.833, 0.833] },
      "o": { "x": [0.167, 0.167], "y": [0.167, 0.167] }
    },
    {
      "t": 30,
      "s": [200, 300]
    }
  ]
}
```

## Easing Functions

Easing functions control the interpolation between keyframes using Bezier curves.

### Bezier Easing

Easing is defined by cubic Bezier curves with two control points:

- In handle: `i.x` and `i.y`
- Out handle: `o.x` and `o.y`

Values range from 0 to 1, where:

- `x` represents time progression
- `y` represents value progression

### Common Easing Presets

| Easing      | In Handle            | Out Handle           |
| ----------- | -------------------- | -------------------- |
| Linear      | `{ x: 0.5, y: 0.5 }` | `{ x: 0.5, y: 0.5 }` |
| Ease In     | `{ x: 0.42, y: 0 }`  | `{ x: 1, y: 1 }`     |
| Ease Out    | `{ x: 0, y: 0 }`     | `{ x: 0.58, y: 1 }`  |
| Ease In Out | `{ x: 0.42, y: 0 }`  | `{ x: 0.58, y: 1 }`  |

### Hold Keyframes

Set `h: 1` to hold the value until the next keyframe (step animation).

```json
{
  "t": 0,
  "s": [100],
  "h": 1
}
```

## Shape Elements

Shape layers contain shape elements that define vector graphics.

```typescript
type ShapeElement =
  | Shape
  | Rect
  | Ellipse
  | Star
  | Fill
  | Stroke
  | GradientFill
  | GradientStroke
  | Group
  | Transform
  | Merge
  | Trim
  | Repeater
  | RoundedCorners;

interface BaseShape {
  ty: string; // Shape type
  nm?: string; // Shape name
  mn?: string; // Match name
  hd?: boolean; // Hidden
  ix?: number; // Index
}
```

### Path Shape

```typescript
interface Shape extends BaseShape {
  ty: "sh"; // Path shape
  ks: AnimatedProperty; // Path data (Bezier)
  d?: 1 | 2 | 3; // Direction (1=CW, 2=CCW, 3=auto)
}
```

### Rectangle

```typescript
interface Rect extends BaseShape {
  ty: "rc"; // Rectangle
  p: AnimatedProperty; // Position
  s: AnimatedProperty; // Size [width, height]
  r: AnimatedProperty; // Roundness
  d?: 1 | 2 | 3; // Direction
}
```

### Ellipse

```typescript
interface Ellipse extends BaseShape {
  ty: "el"; // Ellipse
  p: AnimatedProperty; // Position
  s: AnimatedProperty; // Size [width, height]
  d?: 1 | 2 | 3; // Direction
}
```

### Star/Polygon

```typescript
interface Star extends BaseShape {
  ty: "sr"; // Star/Polygon
  p: AnimatedProperty; // Position
  or: AnimatedProperty; // Outer radius
  os: AnimatedProperty; // Outer roundness
  ir?: AnimatedProperty; // Inner radius (star only)
  is?: AnimatedProperty; // Inner roundness (star only)
  r: AnimatedProperty; // Rotation
  pt: AnimatedProperty; // Points
  sy: 1 | 2; // Star type (1=star, 2=polygon)
  d?: 1 | 2 | 3; // Direction
}
```

### Fill

```typescript
interface Fill extends BaseShape {
  ty: "fl"; // Fill
  c: AnimatedProperty; // Color [r, g, b] (0-1)
  o: AnimatedProperty; // Opacity (0-100)
  r?: 1 | 2; // Fill rule (1=non-zero, 2=even-odd)
}
```

### Stroke

```typescript
interface Stroke extends BaseShape {
  ty: "st"; // Stroke
  c: AnimatedProperty; // Color [r, g, b] (0-1)
  o: AnimatedProperty; // Opacity (0-100)
  w: AnimatedProperty; // Width
  lc?: 1 | 2 | 3; // Line cap (1=butt, 2=round, 3=square)
  lj?: 1 | 2 | 3; // Line join (1=miter, 2=round, 3=bevel)
  ml?: number; // Miter limit
  ml2?: AnimatedProperty; // Animated miter limit
  d?: StrokeDash[]; // Dashes
}

interface StrokeDash {
  n: "d" | "g" | "o"; // Dash type (d=dash, g=gap, o=offset)
  nm?: string; // Name
  v: AnimatedProperty; // Value
}
```

### Gradient Fill

```typescript
interface GradientFill extends BaseShape {
  ty: "gf"; // Gradient fill
  o: AnimatedProperty; // Opacity (0-100)
  g: GradientData; // Gradient data
  s: AnimatedProperty; // Start point [x, y]
  e: AnimatedProperty; // End point [x, y]
  t: 1 | 2; // Gradient type (1=linear, 2=radial)
  h?: AnimatedProperty; // Highlight length (radial only)
  a?: AnimatedProperty; // Highlight angle (radial only)
  r?: 1 | 2; // Fill rule
}

interface GradientData {
  p: number; // Number of colors
  k: AnimatedProperty; // Gradient colors and stops
}
```

### Gradient Stroke

```typescript
interface GradientStroke extends BaseShape {
  ty: "gs"; // Gradient stroke
  o: AnimatedProperty; // Opacity (0-100)
  g: GradientData; // Gradient data
  s: AnimatedProperty; // Start point [x, y]
  e: AnimatedProperty; // End point [x, y]
  t: 1 | 2; // Gradient type (1=linear, 2=radial)
  h?: AnimatedProperty; // Highlight length (radial only)
  a?: AnimatedProperty; // Highlight angle (radial only)
  w: AnimatedProperty; // Width
  lc?: 1 | 2 | 3; // Line cap
  lj?: 1 | 2 | 3; // Line join
  ml?: number; // Miter limit
  d?: StrokeDash[]; // Dashes
}
```

### Group

```typescript
interface Group extends BaseShape {
  ty: "gr"; // Group
  it: ShapeElement[]; // Shape items
  np?: number; // Number of properties
  cix?: number; // Property index
}
```

### Transform

```typescript
interface ShapeTransform extends BaseShape {
  ty: "tr"; // Transform
  o: AnimatedProperty; // Opacity (0-100)
  r: AnimatedProperty; // Rotation
  p: AnimatedProperty; // Position [x, y]
  a: AnimatedProperty; // Anchor [x, y]
  s: AnimatedProperty; // Scale [x, y] (percentage)
  sk?: AnimatedProperty; // Skew
  sa?: AnimatedProperty; // Skew axis
}
```

### Trim Path

```typescript
interface Trim extends BaseShape {
  ty: "tm"; // Trim path
  s: AnimatedProperty; // Start (0-100)
  e: AnimatedProperty; // End (0-100)
  o: AnimatedProperty; // Offset
  m: 1 | 2; // Multiple shapes (1=simultaneously, 2=individually)
}
```

### Repeater

```typescript
interface Repeater extends BaseShape {
  ty: "rp"; // Repeater
  c: AnimatedProperty; // Copies
  o: AnimatedProperty; // Offset
  m: 1 | 2; // Composite (1=above, 2=below)
  tr: Transform; // Transform
}
```

### Merge Paths

```typescript
interface Merge extends BaseShape {
  ty: "mm"; // Merge
  mm: 1 | 2 | 3 | 4 | 5; // Merge mode (1=merge, 2=add, 3=subtract, 4=intersect, 5=exclude)
}
```

### Rounded Corners

```typescript
interface RoundedCorners extends BaseShape {
  ty: "rd"; // Rounded corners
  r: AnimatedProperty; // Radius
}
```

### Shape Example: Circle with Fill

```json
{
  "ty": "gr",
  "nm": "Circle",
  "it": [
    {
      "ty": "el",
      "nm": "Ellipse",
      "p": { "a": 0, "k": [0, 0] },
      "s": { "a": 0, "k": [100, 100] }
    },
    {
      "ty": "fl",
      "nm": "Fill",
      "c": { "a": 0, "k": [1, 0, 0] },
      "o": { "a": 0, "k": 100 }
    },
    {
      "ty": "tr",
      "nm": "Transform",
      "o": { "a": 0, "k": 100 },
      "r": { "a": 0, "k": 0 },
      "p": { "a": 0, "k": [250, 250] },
      "a": { "a": 0, "k": [0, 0] },
      "s": { "a": 0, "k": [100, 100] }
    }
  ]
}
```

## Masks

Masks define transparency or clipping regions for layers.

```typescript
interface Mask {
  nm?: string; // Mask name
  inv?: boolean; // Inverted
  mode: MaskMode; // Mask mode
  pt: AnimatedProperty; // Mask path
  o: AnimatedProperty; // Opacity (0-100)
  x?: AnimatedProperty; // Expansion
}

enum MaskMode {
  None = "n",
  Add = "a",
  Subtract = "s",
  Intersect = "i",
  Lighten = "l",
  Darken = "d",
  Difference = "f",
}
```

### Mask Example

```json
{
  "nm": "Mask 1",
  "inv": false,
  "mode": "a",
  "pt": {
    "a": 0,
    "k": {
      "c": true,
      "v": [
        [0, 0],
        [100, 0],
        [100, 100],
        [0, 100]
      ],
      "i": [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
      ],
      "o": [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
      ]
    }
  },
  "o": { "a": 0, "k": 100 }
}
```

## Effects

Effects are post-processing operations applied to layers.

```typescript
interface Effect {
  ty: number; // Effect type
  nm: string; // Effect name
  np?: number; // Number of properties
  mn?: string; // Match name
  ix?: number; // Index
  en?: 0 | 1; // Enabled
  ef: EffectValue[]; // Effect values
}

interface EffectValue {
  ty: number; // Value type
  nm: string; // Value name
  mn?: string; // Match name
  ix?: number; // Index
  v?: AnimatedProperty; // Value
}
```

### Common Effects

| Type | Name        | Description            |
| ---- | ----------- | ---------------------- |
| 21   | Fill        | Solid color fill       |
| 22   | Stroke      | Stroke/outline         |
| 23   | Tint        | Color tinting          |
| 24   | Tritone     | Three-color gradient   |
| 25   | Pro Levels  | Levels adjustment      |
| 28   | Drop Shadow | Drop shadow effect     |
| 29   | Radial Wipe | Radial wipe transition |

### Effect Example

```json
{
  "ty": 21,
  "nm": "Fill",
  "np": 9,
  "mn": "ADBE Fill",
  "en": 1,
  "ef": [
    {
      "ty": 2,
      "nm": "Color",
      "mn": "ADBE Fill-0001",
      "v": { "a": 0, "k": [1, 0, 0, 1] }
    },
    {
      "ty": 0,
      "nm": "Opacity",
      "mn": "ADBE Fill-0007",
      "v": { "a": 0, "k": 100 }
    }
  ]
}
```

## Fonts

Font definitions for text layers.

```typescript
interface FontList {
  list: Font[]; // Array of fonts
}

interface Font {
  fName: string; // Font name (PostScript name)
  fFamily: string; // Font family
  fStyle: string; // Font style
  ascent: number; // Ascent metric
  fPath?: string; // Font file path
  fWeight?: string; // Font weight
  origin?: number; // Font origin
  fClass?: string; // Font class
}
```

### Font Example

```json
{
  "list": [
    {
      "fName": "Roboto-Regular",
      "fFamily": "Roboto",
      "fStyle": "Regular",
      "ascent": 75.0
    }
  ]
}
```

## Characters

Character data for text layers using font glyphs.

```typescript
interface Char {
  ch: string; // Character
  fFamily: string; // Font family
  size: number; // Font size
  style: string; // Font style
  w: number; // Character width
  data: CharData; // Character shape data
}

interface CharData {
  shapes: ShapeElement[]; // Character shapes
}
```

## Markers

Named time markers in the animation timeline.

```typescript
interface Marker {
  tm: number; // Time (frame)
  cm: string; // Comment/name
  dr: number; // Duration (frames)
}
```

### Marker Example

```json
{
  "tm": 30,
  "cm": "Loop Start",
  "dr": 0
}
```

## Text Layers

Text layers support rich text with animators and styling.

```typescript
interface TextDocument {
  f: string; // Font family
  fc: number[]; // Fill color [r, g, b] (0-1)
  sc?: number[]; // Stroke color [r, g, b] (0-1)
  sw?: number; // Stroke width
  of?: boolean; // Stroke over fill
  s: number; // Font size
  lh?: number; // Line height
  ls?: number; // Letter spacing
  t: string; // Text content
  j: 0 | 1 | 2; // Justification (0=left, 1=right, 2=center)
  tr?: number; // Tracking
  ca?: 0 | 1 | 2; // Caps (0=regular, 1=all caps, 2=small caps)
  ps?: number[]; // Box position [x, y]
  sz?: number[]; // Box size [width, height]
}

interface TextAnimator {
  nm?: string; // Name
  s: AnimatedProperty; // Start
  e: AnimatedProperty; // End
  o: AnimatedProperty; // Offset
  m: 1 | 2 | 3 | 4; // Mode (1=characters, 2=words, 3=lines, 4=character-exclude)
  a: TextAnimatorData; // Animator data
}

interface TextAnimatorData {
  o?: AnimatedProperty; // Opacity
  r?: AnimatedProperty; // Rotation
  rx?: AnimatedProperty; // X rotation
  ry?: AnimatedProperty; // Y rotation
  p?: AnimatedProperty; // Position
  s?: AnimatedProperty; // Scale
  a?: AnimatedProperty; // Anchor point
  sk?: AnimatedProperty; // Skew
  sa?: AnimatedProperty; // Skew axis
  t?: AnimatedProperty; // Tracking
  fc?: AnimatedProperty; // Fill color
  sc?: AnimatedProperty; // Stroke color
  sw?: AnimatedProperty; // Stroke width
  fh?: AnimatedProperty; // Fill hue
  fs?: AnimatedProperty; // Fill saturation
  fb?: AnimatedProperty; // Fill brightness
}
```

### Text Layer Example

```json
{
  "ty": 5,
  "nm": "Text Layer",
  "ind": 1,
  "ip": 0,
  "op": 180,
  "st": 0,
  "ks": {},
  "t": {
    "d": {
      "k": [
        {
          "s": {
            "f": "Roboto-Regular",
            "fc": [0, 0, 0],
            "s": 48,
            "t": "Hello World",
            "j": 2
          },
          "t": 0
        }
      ]
    },
    "p": {},
    "m": {
      "g": 1,
      "a": { "a": 0, "k": [0, 0] }
    },
    "a": []
  }
}
```

## Bezier Path Data

Bezier paths define vector shapes.

```typescript
interface BezierPath {
  c: boolean; // Closed path flag
  v: number[][]; // Vertices [[x, y], ...]
  i: number[][]; // In tangents [[x, y], ...]
  o: number[][]; // Out tangents [[x, y], ...]
}
```

### Path Example: Square

```json
{
  "c": true,
  "v": [
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100]
  ],
  "i": [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
  ],
  "o": [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
  ]
}
```

### Path Example: Curved

```json
{
  "c": true,
  "v": [
    [50, 0],
    [100, 50],
    [50, 100],
    [0, 50]
  ],
  "i": [
    [13.81, 0],
    [0, 13.81],
    [-13.81, 0],
    [0, -13.81]
  ],
  "o": [
    [-13.81, 0],
    [0, -13.81],
    [13.81, 0],
    [0, 13.81]
  ]
}
```

## Metadata

Optional metadata about the animation.

```typescript
interface Metadata {
  g?: string; // Generator/creator tool
  a?: string; // Author
  k?: string[]; // Keywords
  d?: string; // Description
  tc?: string; // Theme color
}
```

### Metadata Example

```json
{
  "g": "LottieFiles AE Plugin 3.0",
  "a": "Designer Name",
  "k": ["icon", "animation", "loading"],
  "d": "A loading animation",
  "tc": "#FF0000"
}
```

## Validation Rules

### Required Properties

1. Top-level animation must have: `v`, `fr`, `ip`, `op`, `w`, `h`, `layers`
2. Each layer must have: `ty`, `ind`, `ip`, `op`, `st`, `ks`
3. Assets referenced by `refId` must exist in the `assets` array
4. Parent layer indices must refer to valid layers

### Constraints

1. Frame numbers (`ip`, `op`, `st`, `t`) must be non-negative
2. Layer indices (`ind`) must be unique within a composition
3. Opacity values are in the range 0-100
4. Color values are in the range 0-1 (RGB)
5. Scale values are percentages (100 = 100%)
6. Rotation values are in degrees

### Path Validation

1. Bezier paths must have equal-length `v`, `i`, and `o` arrays
2. Closed paths should have `c: true`
3. Tangent values are relative to their vertex

### Asset Validation

1. Asset `id` values must be unique
2. Image assets must have `w`, `h`, and `p`
3. Precomp assets must have `layers` array

## Performance Best Practices

1. **Minimize Keyframes**: Use only necessary keyframes
2. **Simplify Paths**: Reduce path complexity and point count
3. **Limit Layers**: Keep layer count reasonable
4. **Optimize Effects**: Effects can be computationally expensive
5. **Use Precomps Wisely**: Balance reusability with complexity
6. **Avoid Large Images**: Use appropriately sized raster assets
7. **Consider Frame Rate**: Higher frame rates increase file size

## Version Compatibility

The Lottie format has evolved over time. Key version considerations:

- **v5.0+**: Current standard with full feature support
- **v4.x**: Legacy version, limited feature support
- **v3.x and earlier**: Deprecated, minimal support

Always check the `v` property and ensure compatibility with your target renderer.

## Complete Example

```json
{
  "v": "5.12.0",
  "fr": 60,
  "ip": 0,
  "op": 180,
  "w": 500,
  "h": 500,
  "nm": "Bouncing Ball",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ty": 4,
      "nm": "Ball",
      "ind": 1,
      "ip": 0,
      "op": 180,
      "st": 0,
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": {
          "a": 1,
          "k": [
            {
              "t": 0,
              "s": [250, 100, 0],
              "e": [250, 400, 0],
              "i": { "x": 0.833, "y": 0.833 },
              "o": { "x": 0.167, "y": 0.167 }
            },
            {
              "t": 30,
              "s": [250, 400, 0],
              "e": [250, 100, 0],
              "i": { "x": 0.833, "y": 0.833 },
              "o": { "x": 0.167, "y": 0.167 }
            },
            {
              "t": 60,
              "s": [250, 100, 0]
            }
          ]
        },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "shapes": [
        {
          "ty": "gr",
          "nm": "Circle",
          "it": [
            {
              "ty": "el",
              "nm": "Ellipse",
              "p": { "a": 0, "k": [0, 0] },
              "s": { "a": 0, "k": [50, 50] }
            },
            {
              "ty": "fl",
              "nm": "Fill",
              "c": { "a": 0, "k": [1, 0.3, 0.3] },
              "o": { "a": 0, "k": 100 }
            },
            {
              "ty": "tr",
              "nm": "Transform",
              "o": { "a": 0, "k": 100 },
              "r": { "a": 0, "k": 0 },
              "p": { "a": 0, "k": [0, 0] },
              "a": { "a": 0, "k": [0, 0] },
              "s": { "a": 0, "k": [100, 100] }
            }
          ]
        }
      ]
    }
  ]
}
```

## References

- [Lottie Animation Community Documentation](https://lottiefiles.github.io/lottie-docs/)
- [Bodymovin Plugin](https://github.com/bodymovin/bodymovin)
- [Lottie Web Renderer](https://github.com/airbnb/lottie-web)
- [JSON Schema Specification](https://json-schema.org/)

## Related Specifications

- [dotLottie Format Specification](/format/dotlottie/specification)
- [State Machine Specification](/format/interactivity/state-machines/specification)
- [Theme Specification](/format/interactivity/theming/specification)
