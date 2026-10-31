---
source: https://paperjs.org/reference/gradient/
title: "Paper.js — Gradient"
fetched: 2026-10-28
---

# Gradient

The Gradient object.

#### Example:Applying a linear gradient color containing evenly distributed color stops:

Run

#### Example:Create a circle shaped path at the center of the view, using 40% of the height of the view as its radius and fill it with a radial gradient color:

Run

## Properties

[**stops**](https://paperjs.org/reference/gradient/#stops)

The gradient stops on the gradient ramp.

#### Type:

* Array of [GradientStop](https://paperjs.org/reference/gradientstop) objects

[**radial**](https://paperjs.org/reference/gradient/#radial)

Specifies whether the gradient is radial or linear.

#### Type:

* Boolean

## Methods

[**clone**()](https://paperjs.org/reference/gradient/#clone)

#### Returns:

* [Gradient](https://paperjs.org/reference/gradient) — a copy of the gradient

[**equals**(gradient)](https://paperjs.org/reference/gradient/#equals-gradient)

Checks whether the gradient is equal to the supplied gradient.

#### Parameters:

* gradient:
  [Gradient](https://paperjs.org/reference/gradient)

#### Returns:

* Boolean — true if they are equal, false otherwise
