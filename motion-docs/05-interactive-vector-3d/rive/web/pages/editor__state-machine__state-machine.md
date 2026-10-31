---
source: https://rive.app/docs/editor/state-machine/state-machine
title: "State Machine Overview"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# State Machine Overview

Add intelligence to your animations.

## Overview

State Machines are a visual way to connect animations together and define the logic that drives the transitions. They allow you to build interactive motion graphics that are ready to be implemented in your product, app, game, or website.

State machines create a new level of collaboration between designers and developers, allowing both teams to iterate deep in the development process without the need for a complicated handoff.

Using the State Machine requires designers and animators to think more like a developer but in a straightforward, visual way.

Every artboard has at least one State Machine by default, but you can create as many as you’d like. To create a new state machine, hit the plus button in the Animations List and select the State Machine option.

### Anatomy of a State Machine

A basic state machine will consist of a Graph, [States](/docs/editor/state-machine/states), [Transitions](/docs/editor/state-machine/transitions), and [Layers](/docs/editor/state-machine/layers). We’ll explore each of these pieces and more throughout this section.

The Graph is the space in which you’ll be adding States and connecting Transitions. It appears in place of the Timeline when a state machine is selected in the animations list.

![State Machine Graph](https://mintcdn.com/rive/IMrXM-oXoMvrTV9Y/images/editor/state-machine/307461c0-2006-4fdf-bdc3-61875d40f422.webp?fit=max\&auto=format\&n=IMrXM-oXoMvrTV9Y\&q=85\&s=cea85534542814a5aa2e48c2e51fb478)

States are simply timeline animations that can play in your state machine. Typically, these will represent some state that your animated content is in. For example, a button will typically have an Idle state (the button is stationary), a Hovered state (what the button looks like when it is hovered), and a Clicked state (what the button looks like when it’s been clicked).

![Preview of States](https://ucarecdn.com/ca93f148-a38c-4eac-a166-8399065315c2/)

Once we have defined the States of our content, we can tie them together with transitions to create a logical path that our State Machine can take through these different timelines. We’re creating a map that our State Machine can use to get from one animation to the next.

![Creating Transitions](https://ucarecdn.com/cf0f53e3-abc9-43a9-b43a-e18483fe2613/)
