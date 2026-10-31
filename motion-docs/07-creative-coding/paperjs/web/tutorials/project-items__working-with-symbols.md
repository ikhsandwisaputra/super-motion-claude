---
source: https://paperjs.org/tutorials/project-items/working-with-symbols
title: "Paper.js — Working with Symbols"
fetched: 2026-10-28
---

# Working with Symbols

Symbols allow you to place multiple instances of an item in your project. This can save memory, since all instances of a symbol simply refer to the original item and it can speed up moving around complex objects, since internal properties such as segment lists and gradient positions don't need to be updated with every transformation.

## Creating Symbols

To create a symbol from an item, just pass the item to the [new SymbolDefinition(item)](https://paperjs.org/reference/symboldefinition#symboldefinition-item) constructor. When you create a symbol definition using an item, that item is automatically removed from the document.

To place instances of the symbol in your project, you can call [symbolDefinition.place(position)](https://paperjs.org/reference/symboldefinition#place) on it, with the position where you want to place it.

For example, lets create a circle shaped path and place a few instances of it:

Source

## Placed Symbols

A placed instance of a symbol is a [SymbolItem](https://paperjs.org/reference/symbolitem) and can be manipulated like any other [Item](https://paperjs.org/reference/item).

Source

## Selecting Placed Symbols

When you select a [SymbolItem](https://paperjs.org/reference/symbolitem) by setting [item.selected](https://paperjs.org/reference/item#selected) to true, Paper.js draws its bounding box. This allows you to see how it has been transformed.

Source

## Symbol Definition

When you create a symbol definition from an item, that item becomes its [symbolDefinition.item](https://paperjs.org/reference/symboldefinition#item). Editing the item is reflected in all its [SymbolItem](https://paperjs.org/reference/symbolitem) instances.

Source
