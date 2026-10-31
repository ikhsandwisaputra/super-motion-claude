---
source: https://paperjs.org/reference/symboldefinition/
title: "Paper.js — SymbolDefinition"
fetched: 2026-10-28
---

# SymbolDefinition

Symbols allow you to place multiple instances of an item in your project. This can save memory, since all instances of a symbol simply refer to the original item and it can speed up moving around complex objects, since internal properties such as segment lists and gradient positions don’t need to be updated with every transformation.

## Constructors

[**SymbolDefinition**(item[, dontCenter])](https://paperjs.org/reference/symboldefinition/#symboldefinition-item)

Creates a Symbol definition.

#### Parameters:

* item:
  [Item](https://paperjs.org/reference/item)
  — the source item which is removed from the scene graph and becomes the symbol’s definition.
* dontCenter:
  Boolean
  — optional, default: false

#### Returns:

* [SymbolDefinition](https://paperjs.org/reference/symboldefinition)

#### Example:Placing 100 instances of a symbol:

Run

## Properties

[**project**](https://paperjs.org/reference/symboldefinition/#project)

The project that this symbol belongs to.

Read only.

#### Type:

* [Project](https://paperjs.org/reference/project)

[**item**](https://paperjs.org/reference/symboldefinition/#item)

The item used as the symbol’s definition.

#### Type:

* [Item](https://paperjs.org/reference/item)

## Methods

[**place**([position])](https://paperjs.org/reference/symboldefinition/#place)

Places in instance of the symbol in the project.

#### Parameters:

* position:
  [Point](https://paperjs.org/reference/point)
  — the position of the placed symbol
  — optional

#### Returns:

* [SymbolItem](https://paperjs.org/reference/symbolitem)

[**clone**()](https://paperjs.org/reference/symboldefinition/#clone)

Returns a copy of the symbol.

#### Returns:

* [SymbolDefinition](https://paperjs.org/reference/symboldefinition)

[**equals**(symbol)](https://paperjs.org/reference/symboldefinition/#equals-symbol)

Checks whether the symbol’s definition is equal to the supplied symbol.

#### Parameters:

* symbol:
  [SymbolDefinition](https://paperjs.org/reference/symboldefinition)

#### Returns:

* Boolean — true if they are equal, false otherwise
