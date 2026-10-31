---
source: https://rive.app/docs/editor/animate-mode/animating-draw-order
title: "Animating Draw Order"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Animating Draw Order

You can change the draw order of your graphics at design time by moving items up and down the [Hierarchy](/docs/editor/interface-overview/hierarchy)– but what if you want to change the draw order during an animation? Or what if you want to change the draw order without breaking the current hierarchical structure? Rive allows you to accomplish this with Draw Order Rules.

[YouTube video player](https://www.youtube.com/embed/6J3JIwgUwe0)

## Draw Order rules

To animate the draw order of a group or shape, start by selecting it. Use the Draw Order section of the Inspector to create Draw Order Rules.

> **[Learn by remixing](https://rive.app/community/files/26116-animating-draw-order?utm_source=docs\&utm_medium=docs_link_card\&utm_campaign=docs_to_marketplace_links)**
>
> Open this file on Marketplace, then click Remix to experiment in the Rive Editor.

![Image](https://mintcdn.com/rive/LTt3dbNyEAMvuJ4M/images/editor/animate-mode/426adab7-b1d3-47bc-bc42-c5cc397fa9d6.webp?fit=max\&auto=format\&n=LTt3dbNyEAMvuJ4M\&q=85\&s=c00eb06083812410bb31e2db382eaed9)

The Normal rule is the default order (based on [Hierarchy](/docs/editor/interface-overview/hierarchy) order). When the radio button next to this rule is active, the shape appears at its default draw order.

Draw Order Rules allow you to select a target (note that this must be a drawable item, not a group) and whether to draw above or below the target.

> [!NOTE]
>
> The target must be a drawable item, like a shape. It cannot be a group.

In Animate mode, use the radio button next to the Draw Order Rules to set a key. Note that these are [Hold keys](/docs/editor/animate-mode/interpolation-easing#hold) as Draw Order cannot be interpolated.

![Image](https://ucarecdn.com/32925768-cbcf-461c-9fe1-b745bf90a34d/)
