---
source: https://docs.lottiefiles.com/en/creator/07_animation/easing.md
title: ""
fetched: 2026-10-28
---

# Easing
Easing controls how property values transition between keyframes, creating natural, expressive motion. Lottie Creator provides powerful easing tools including preset curves and a visual bezier curve editor.

## What is Easing?

Easing (also called timing functions or interpolation curves) determines the rate of change between keyframe values.

<Image src="https://assets.docs.lottiefiles.com/videos/gifs/Easing.gif" alt="Easing demonstration" caption="Easing demonstration" zoom variant="default" />

### Linear vs Eased Motion

**Linear Easing:**

<List type="bullet">
  <ListItem>Constant speed from start to finish</ListItem>
  <ListItem>Value changes at uniform rate</ListItem>
  <ListItem>Mechanical, robotic feeling</ListItem>
  <ListItem>Graph: straight diagonal line</ListItem>
</List>

**Eased Motion:**

<List type="bullet">
  <ListItem>Variable speed (acceleration/deceleration)</ListItem>
  <ListItem>Natural, organic movement</ListItem>
  <ListItem>Starts slow, speeds up, or slows down</ListItem>
  <ListItem>Graph: curved line (bezier curve)</ListItem>
</List>

## Easing Types

Lottie Creator provides separate easing control for incoming and outgoing tangents.

### Tangent Types

**Linear:**

<List type="bullet">
  <ListItem>No easing curve</ListItem>
  <ListItem>Constant speed</ListItem>
  <ListItem>Sharp transitions</ListItem>
  <ListItem>Icon: Sharp corner</ListItem>
</List>

**Smooth (Bezier):**

<List type="bullet">
  <ListItem>Custom bezier curve</ListItem>
  <ListItem>Variable speed</ListItem>
  <ListItem>Natural motion</ListItem>
  <ListItem>Icon: Rounded corner</ListItem>
</List>

## Easing Controls

Control easing through the property panel when keyframes are selected.

### Property Panel Easing

**Location:**

<List type="bullet">
  <ListItem>Select keyframe(s) in timeline</ListItem>
  <ListItem>Property panel shows easing controls</ListItem>
  <ListItem>Separate toggles for In and Out tangents</ListItem>
</List>

**Tangent Toggle Buttons:**

<List type="bullet">
  <ListItem>**Linear** button - Sharp, constant speed</ListItem>
  <ListItem>**Smooth** button - Bezier curve, variable speed</ListItem>
  <ListItem>Toggle independently for In and Out</ListItem>
</List>

### Edit Easing Button

**Easing Editor:**

<List type="bullet">
  <ListItem>"Edit Easing" button opens bezier curve editor</ListItem>
  <ListItem>Visual interface for custom curves</ListItem>
  <ListItem>Precise control over acceleration curves</ListItem>
</List>

## Bezier Curve Editor

Visual tool for creating custom easing curves.

### Control Points

**Two Control Points:**

<List type="bullet">
  <ListItem>**Point 1** (x1, y1) - Controls beginning of curve</ListItem>
  <ListItem>**Point 2** (x2, y2) - Controls end of curve</ListItem>
  <ListItem>Each point has X and Y coordinates</ListItem>
</List>

### Display Format

**Cubic-Bezier Notation:**

```
cubic-bezier(x1, y1, x2, y2)
```

**Example:**

```
cubic-bezier(0.42, 0, 0.58, 1)  // Ease In-Out
cubic-bezier(0.0, 0.0, 1, 1)     // Linear
cubic-bezier(0.68, -0.55, 0.265, 1.55) // Back In-Out
```
