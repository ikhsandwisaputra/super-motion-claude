---
source: https://paperjs.org/reference/gradientstop/
title: "Paper.js — GradientStop"
fetched: 2026-10-28
---

# GradientStop

The GradientStop object.

## Constructors

[**GradientStop**([color[, offset]])](https://paperjs.org/reference/gradientstop/#gradientstop)

Creates a GradientStop object.

#### Parameters:

* color:
  [Color](https://paperjs.org/reference/color)
  — the color of the stop
  — optional, default: new Color(0, 0, 0)
* offset:
  Number
  — the position of the stop on the gradient ramp as a value between `0` and `1`; `null` or `undefined` for automatic assignment.
  — optional, default: null

#### Returns:

* [GradientStop](https://paperjs.org/reference/gradientstop)

## Properties

[**offset**](https://paperjs.org/reference/gradientstop/#offset)

The ramp-point of the gradient stop as a value between `0` and `1`.

#### Type:

* Number

#### Example:Animating a gradient's ramp points:

Run

[**color**](https://paperjs.org/reference/gradientstop/#color)

The color of the gradient stop.

#### Type:

* [Color](https://paperjs.org/reference/color)

#### Example:Animating a gradient's ramp points:

Run

## Methods

[**clone**()](https://paperjs.org/reference/gradientstop/#clone)

#### Returns:

* [GradientStop](https://paperjs.org/reference/gradientstop) — a copy of the gradient-stop
