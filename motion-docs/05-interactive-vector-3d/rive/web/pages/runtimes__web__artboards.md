---
source: https://rive.app/docs/runtimes/web/artboards
title: "Artboards"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Artboards

Selecting which artboard to render at runtime

For more information on creating artboards in the Rive editor, please refer to [Artboards](/docs/editor/fundamentals/artboards).

## Choosing an Artboard

When a Rive object is instantiated or when a Rive file is rendered, you can specify the artboard to use. If no artboard is given, the [default artboard](/docs/editor/fundamentals/artboards#default-state-machine), as set in the Rive editor, is used. If no default artboard is set, the first artboard is used.

Only one artboard can be rendered at a time.

```javascript theme={null}
  new rive.Rive({
      src: 'https://cdn.rive.app/animations/vehicles.riv',
      canvas: document.getElementById('canvas'),
      artboard: 'Truck',
      stateMachine: 'bumpy',
      autoplay: true
  });
```
