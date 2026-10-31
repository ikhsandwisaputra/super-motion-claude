---
source: https://paperjs.org/reference/tween/
title: "Paper.js — Tween"
fetched: 2026-10-28
---

# Tween

Allows tweening `Object` properties between two states for a given duration. To tween properties on Paper.js [Item](https://paperjs.org/reference/item) instances, [item.tween(from, to, options)](https://paperjs.org/reference/item#tween-from-to-options) can be used, which returns created tween instance.

#### See also:

* [item.tween(from, to, options)](https://paperjs.org/reference/item#tween-from-to-options)
* [item.tween(to, options)](https://paperjs.org/reference/item#tween-to-options)
* [item.tween(options)](https://paperjs.org/reference/item#tween-options)
* [item.tweenTo(to, options)](https://paperjs.org/reference/item#tweento-to-options)
* [item.tweenFrom(from, options)](https://paperjs.org/reference/item#tweenfrom-from-options)

## Constructors

[**Tween**(object, from, to, duration[, easing[, start]])](https://paperjs.org/reference/tween/#tween-object-from-to-duration)

Creates a new tween.

#### Parameters:

* object:
  Object
  — the object to tween the properties on
* from:
  Object
  — the state at the start of the tweening
* to:
  Object
  — the state at the end of the tweening
* duration:
  Number
  — the duration of the tweening
* easing:
  String⟋Function
  — the type of the easing function or the easing function
  — optional, default: ‘linear’
* start:
  Boolean
  — whether to start tweening automatically
  — optional, default: true

#### Returns:

* [Tween](https://paperjs.org/reference/tween) — the newly created tween

## Properties

### Event Handlers

[**onUpdate**](https://paperjs.org/reference/tween/#onupdate)

The function to be called when the tween is updated. It receives an object as its sole argument, containing the current progress of the tweening and the factor calculated by the easing function.

#### Type:

* Function⟋null

#### Example:Display tween progression values:

Run

## Methods

[**then**(function)](https://paperjs.org/reference/tween/#then-function)

Set a function that will be executed when the tween completes.

#### Parameters:

* function:
  Function
  — the function to execute when the tween completes

#### Returns:

* [Tween](https://paperjs.org/reference/tween)

#### Example:Tweens chaining:

Run

[**start**()](https://paperjs.org/reference/tween/#start)

Start tweening.

#### Returns:

* [Tween](https://paperjs.org/reference/tween)

#### Example:Manually start tweening.

Run

[**stop**()](https://paperjs.org/reference/tween/#stop)

Stop tweening.

#### Returns:

* [Tween](https://paperjs.org/reference/tween)

#### Example:Stop a tween before it completes.

Run
