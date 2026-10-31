---
source: https://rive.app/docs/scripting/protocols/overview
title: "Protocols"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Protocols

Protocols are the structured categories of scripts that tell the Editor what you’re trying to make.

Rive currently ships with the following protocols, with more to come:

* [Node](/docs/scripting/protocols/node-scripts)
* [Layout](/docs/scripting/protocols/layout-scripts)
* [Converter](/docs/scripting/protocols/converter-scripts)
* [Path Effect](/docs/scripting/protocols/path-effect-scripts) - Create custom path effects.
* [Transition Conditions](/docs/scripting/protocols/transition-condition-scripts) - Create custom state machine transition conditions.
* [Listener Actions](/docs/scripting/protocols/listener-action-scripts) - React to state machine listeners.
* [Blank](/docs/scripting/protocols/util-scripts) - Share helper logic across scripts.
* [Test](/docs/scripting/protocols/test-scripts) - Unit test your functions.
* **File Format** - Read and write a binary file format.
* **Text File Format** - Read and write a text file format.

Each protocol represents a different kind of script the Editor can generate: a converter that shapes data, a custom drawing function, a layout helper, a testing harness, a path effect you can attach to strokes, and so on.

Selecting a protocol generates a typed scaffold that defines the surface area you’re allowed to operate on. From there, you work with Rive-native concepts — paths, shapes, view models, artboards, state machines, timelines — but always through the lens of the protocol you picked. It keeps scripts specific and prevents “do anything anywhere” chaos.
