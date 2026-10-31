---
source: https://rive.app/docs/runtimes/react-native/artboards
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

**New Runtime (Recommended)**

### Listing artboards

Once you have loaded a `RiveFile`, you can get the artboards it contains:

```tsx theme={null}
const { riveFile } = useRiveFile(require('./assets/my_file.riv'));

// Inside an effect or event handler
const artboardNames = await riveFile.getArtboardNamesAsync();
const artboardCount = await riveFile.getArtboardCountAsync();
```

### Displaying an artboard

Set the `artboardName` prop on `RiveView`. If you omit it, the default artboard is used.

```tsx highlight={7} theme={null}
export default function App() {
  const { riveFile } = useRiveFile(require('./assets/my_file.riv'));

  return riveFile ? (
    <RiveView
      file={riveFile}
      artboardName="My Artboard"
      style={{ width: 400, height: 400 }}
    />
  ) : null;
}
```

If no artboard has that name, `RiveView` reports an error through `onError`. See [Error Handling](/docs/runtimes/react-native/error-handling).

To render an artboard inside another artboard at runtime, use an [artboard property](/docs/runtimes/react-native/data-binding#artboards) in data binding.

**Legacy Runtime**

```javascript theme={null}
export default function App() {
  return (
    <View>
      <Rive resourceName="my_rive_file" artboardName="My Artboard" autoplay />
    </View>
  );
}
```
