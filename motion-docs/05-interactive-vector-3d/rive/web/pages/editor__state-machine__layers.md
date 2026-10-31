---
source: https://rive.app/docs/editor/state-machine/layers
title: "Layers"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Layers

Layers let you build more complex logic and animation with the state machine. 

[YouTube video player](https://www.youtube.com/embed/7Vb1LosMzwk)

A state machine layer can play one state at a time. Add multiple layers when you want a state machine to play multiple animations or interactions at once.

For example, one layer might control a character's idle and walk animations, while another layer controls a separate hover or selected state.

## Creating a new layer

To create a layer, click the **+** button in the **Layers** tab.

![Adding a new layer](https://mintcdn.com/rive/pLsCQ22KrzSgrXYc/images/editor/state-machine/state-machine-layer-create.gif?s=78e7c3f7ae20858e848b6bae2f56c747)

## Layer order

Layer order determines which layer takes priority when multiple layers animate the same property.

Layers farther down the list take priority over layers above them. In most cases, this does not matter. However, if multiple layers control the same object property, the animation in the lower layer takes priority as the layers mix.

[YouTube video player](https://www.youtube.com/embed/Fc9MutscvAo)

### Changing layer order

To change layer order, drag layers up or down in the **Layers** tab.

![Reorder state machine layers](https://mintcdn.com/rive/pLsCQ22KrzSgrXYc/images/editor/state-machine/state-machine-layer-order.gif?s=024118dee9e4e6414c04dda9180b216c)

## Layer menu

Click the **...** button next to a layer name to open the layer menu.

![Layer menu](https://mintcdn.com/rive/pLsCQ22KrzSgrXYc/images/editor/state-machine/layer-menu.png?fit=max\&auto=format\&n=pLsCQ22KrzSgrXYc\&q=85\&s=98d04f68158659330c5e5864c276a1eb)

| Option | Description |
| - | - |
| **Delete** | Deletes the layer. |
| **Duplicate** | Creates a copy of the layer. |
| **Disable** | Disables the layer without deleting it. |
| **Snapping** | Enables or disables snapping for states and transitions in the layer. |
