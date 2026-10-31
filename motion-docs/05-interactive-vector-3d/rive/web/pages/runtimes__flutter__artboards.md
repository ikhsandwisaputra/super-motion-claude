---
source: https://rive.app/docs/runtimes/flutter/artboards
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

### Creating an artboard

Manually create an artboard:

```dart theme={null}
// Default artboard
final artboard = riveFile.defaultArtboard();
// Artboard named
final artboard = riveFile.artboard('My Artboard');
// Artboard at index
final artboard = riveFile.artboardAt(0);
```

### Specifying an artboard

Specify the artboard to use in `RiveWidgetController` or `RiveWidgetBuilder`:

```dart theme={null}
// Default artboard
final artboardSelector = ArtboardSelector.byDefault();
// Artboard named
final artboardSelector = ArtboardSelector.byName('My Artboard');
// Artboard at index
final artboardSelector = ArtboardSelector.byIndex(0);

// Pass to RiveWidgetController
final controller = RiveWidgetController(
  riveFile,
  artboardSelector: artboardSelector,
);

// Pass to RiveWidgetBuilder
return RiveWidgetBuilder(
  fileLoader: fileLoader,
  artboardSelector: ArtboardSelector.byName('My Artboard'),
  builder: (context, state) {
    // return a widget
  },
);
```
